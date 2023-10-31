import React from "react";
import { HmacSHA256, enc } from "crypto-js";
import axios from "axios";

type IGetFuturesTrades = (
  apiKey: string,
  apiSecret: string,
  startTime: number,
  endTime: number
) => Promise<void>;

export interface ITrade {
  buyer: boolean;
  commission: number;
  commissionAsset: string;
  id: number;
  maker: boolean;
  marginAsset: string;
  orderId: number;
  positionSide: string;
  price: string;
  qty: number;
  quoteQty: string;
  realizedPnl: number;
  side: "SELL" | "BUY";
  symbol: string;
  time: number;
}
type IRawTrade = Omit<ITrade, "commission" | "realizedPnl" | "qty"> & {
  commission: string;
  realizedPnl: string;
  qty: string;
};

export type IAgroupedTrade = ITrade[];

interface IUserContext {
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  apiSecret: string;
  setApiSecret: React.Dispatch<React.SetStateAction<string>>;
  agroupedTrades: IAgroupedTrade;
  setAgroupedTrades: React.Dispatch<React.SetStateAction<IAgroupedTrade | []>>;
  trades: IRawTrade[];
  error: boolean | null;
  setError: React.Dispatch<React.SetStateAction<boolean | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getFuturesTrades: IGetFuturesTrades;
  winTrades: ITrade[];
  loserTrades: ITrade[];
  winRate: string;
  localTrades: [] | ITrade[];
  setLocalTrades: React.Dispatch<React.SetStateAction<[] | ITrade[]>>;
}

const IUserContextState = {
  setApiKey: () => {},
  setApiSecret: () => {},
  apiKey: "",
  apiSecret: "",
  agroupedTrades: [],
  setAgroupedTrades: () => {},
  error: null,
  loading: false,
  trades: [],
  setError: () => {},
  setLoading: () => {},
  getFuturesTrades: async (
    apiKey: string,
    apiSecret: string,
    startTime: number,
    endTime: number
  ) => {},
  winTrades: [],
  loserTrades: [],
  winRate: "",
  localTrades: [],
  setLocalTrades: () => {},
};
export const UserContext = React.createContext<IUserContext>(IUserContextState);

export const UserStorage = ({ children }: React.PropsWithChildren) => {
  const [apiKey, setApiKey] = React.useState<string>("");
  const [apiSecret, setApiSecret] = React.useState<string>("");
  const [agroupedTrades, setAgroupedTrades] = React.useState<
    [] | IAgroupedTrade
  >([]);
  const [trades, setTrades] = React.useState<[] | IRawTrade[]>([]);
  const [error, setError] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [localTrades, setLocalTrades] = React.useState<[] | ITrade[]>([]);
  React.useEffect(() => {
    const localTrades = localStorage.getItem("trades");
    if (localTrades) setLocalTrades(JSON.parse(localTrades));
  }, [agroupedTrades]);

  const winTrades =
    localTrades && localTrades.length !== 0
      ? localTrades.filter((trade) => trade.realizedPnl > 0)
      : agroupedTrades.filter((trade) => trade.realizedPnl > 0);
  const loserTrades =
    localTrades && localTrades.length !== 0
      ? localTrades.filter((trade) => trade.realizedPnl < 0)
      : agroupedTrades.filter((trade) => trade.realizedPnl < 0);

  const winRate = ((winTrades.length * 100) / localTrades.length).toFixed(2);

  React.useEffect(() => {
    function processTradeData(tradesData: IRawTrade[]) {
      let organizedTrades = tradesData.reduce((acc: ITrade[], trade) => {
        const orderId = trade.orderId;
        const tradeCommission = Number(trade.commission);
        const tradeRealizedPnl = Number(trade.realizedPnl);
        const tradeQty = Number(trade.qty);
        const time = trade.time;

        const existingTrade = acc.find((item: ITrade | null) => {
          if (item) return item.orderId === orderId && item.time === time;
        });

        if (!existingTrade) {
          acc.push({
            ...trade,
            commission: tradeCommission,
            realizedPnl: tradeRealizedPnl,
            qty: tradeQty,
          });
        } else {
          existingTrade.commission = Number(
            (existingTrade.commission + tradeCommission).toFixed(3)
          );
          existingTrade.realizedPnl = Number(
            (existingTrade.realizedPnl + tradeRealizedPnl).toFixed(3)
          );
          existingTrade.qty = Number((existingTrade.qty + tradeQty).toFixed(3));
        }

        return acc;
      }, []);

      let processedTrades: IAgroupedTrade = [];

      organizedTrades.reduce((acc: { [key: string]: ITrade }, trade) => {
        if (!acc[trade.symbol]) {
          acc[trade.symbol] = {
            ...trade,
            commission: Number(trade.commission),
            qty: Number(trade.qty),
            realizedPnl: Number(trade.realizedPnl),
          };
        } else if (acc[trade.symbol].side === trade.side) {
          acc[trade.symbol].qty += Number(trade.qty);
          acc[trade.symbol].commission += Number(trade.commission);
          acc[trade.symbol].realizedPnl += Number(trade.realizedPnl);
          acc[trade.symbol].time = trade.time;
        } else if (
          acc[trade.symbol].side !== trade.side &&
          Number(
            acc[trade.symbol].qty - Number(Number(trade.qty).toFixed(3))
          ) === 0
        ) {
          acc[trade.symbol].qty = Number(
            (acc[trade.symbol].qty - Number(trade.qty)).toFixed(3)
          );

          acc[trade.symbol].commission = Number(
            (acc[trade.symbol].commission + Number(trade.commission)).toFixed(3)
          );
          if (acc[trade.symbol].commissionAsset === "USDT") {
            acc[trade.symbol].realizedPnl = Number(
              acc[trade.symbol].realizedPnl +
                Number(trade.realizedPnl) +
                acc[trade.symbol].commission * -(1).toFixed(3)
            );
          } else {
            acc[trade.symbol].realizedPnl = Number(
              acc[trade.symbol].realizedPnl + Number(trade.realizedPnl)
            );
          }
          acc[trade.symbol].time = trade.time;

          processedTrades.push({ ...acc[trade.symbol] });

          acc[trade.symbol].quoteQty = trade.quoteQty;

          delete acc[trade.symbol];
        } else if (acc[trade.symbol].side !== trade.side) {
          acc[trade.symbol].qty = Number(
            (acc[trade.symbol].qty - Number(trade.qty)).toFixed(3)
          );
          acc[trade.symbol].commission = Number(
            (acc[trade.symbol].commission + Number(trade.commission)).toFixed(3)
          );
          acc[trade.symbol].realizedPnl = Number(
            (acc[trade.symbol].realizedPnl + Number(trade.realizedPnl)).toFixed(
              3
            )
          );
          acc[trade.symbol].time = trade.time;
        }

        return acc;
      }, {});

      setAgroupedTrades(processedTrades);
      localStorage.setItem("trades", JSON.stringify(processedTrades));
    }
    if (error === false) processTradeData(trades);
  }, [trades, error]);

  async function getFuturesTrades(
    apiKey: string,
    apiSecret: string,
    startTime: number,
    endTime: number
  ) {
    const baseUrl = import.meta.env.VITE_REACT_API_URL;
    const endpoint = "/fapi/v1/userTrades";
    const headers = {
      "X-MBX-APIKEY": apiKey,
    };
    let timestamp = Date.now();
    const week = 1000 * 60 * 60 * 24 * 7;
    if (endTime > timestamp) endTime = timestamp;

    let period = Math.ceil((endTime - startTime) / (1000 * 60 * 60 * 24 * 7));

    let i = 0;
    let shouldContinue = true;

    let tradesData: IRawTrade[] = [];
    let setEndTime = () => {
      endTime = i === 0 ? startTime + week : startTime + week + week * i;
      return endTime;
    };

    while (i < period && shouldContinue && period >= 2) {
      timestamp = Date.now();
      endTime = setEndTime();

      if (endTime > timestamp) {
        endTime = Date.now();
      }
      const queryParams = `startTime=${
        startTime + i * week
      }&endTime=${endTime}&timestamp=${timestamp}`;

      const signature = HmacSHA256(queryParams, apiSecret).toString(enc.Hex);

      const url = `${baseUrl}${endpoint}?${queryParams}&signature=${signature}`;
      setLoading(true);
      await axios
        .get(url, { headers })
        .then((response) => {
          tradesData = [...tradesData, ...response.data];
          setError(false);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setLoading(false);
          shouldContinue = false;
        });
      i++;
    }

    if (period < 2) {
      const queryParams = `startTime=${startTime}&endTime=${endTime}&timestamp=${timestamp}`;

      const signature = HmacSHA256(queryParams, apiSecret).toString(enc.Hex);

      const url = `${baseUrl}${endpoint}?${queryParams}&signature=${signature}`;
      setLoading(true);
      await axios
        .get(url, { headers })
        .then((response) => {
          tradesData = [...tradesData, ...response.data];
          setError(false);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setLoading(false);
          shouldContinue = false;
        });
    }

    setTrades([...tradesData]);
    setLoading(false);
  }

  return (
    <UserContext.Provider
      value={{
        setApiKey,
        setApiSecret,
        apiKey,
        apiSecret,
        agroupedTrades,
        setAgroupedTrades,
        getFuturesTrades,
        error,
        loading,
        trades,
        setError,
        setLoading,
        winTrades,
        loserTrades,
        winRate,
        localTrades,
        setLocalTrades,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useTrades = () => {
  const context = React.useContext(UserContext);
  if (!context)
    throw new Error("User context must be contained inside provider");
  return context;
};
