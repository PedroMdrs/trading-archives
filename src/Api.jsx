import { HmacSHA256, enc } from "crypto-js";
import axios from "axios";
import React from "react";
import { UserContext } from "./UserContext";

export const baseUrl = "https://fapi.binance.com";
export function GET_FUTURES_WEEKLY_TRADE_DATA(apiKey, apiSecret) {
  const endpoint = "/fapi/v1/userTrades";
  const [trades, setTrades] = React.useState([]);
  const [error, SetError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { setAgroupedTrades, agroupedTrades } = React.useContext(UserContext);

  React.useEffect(() => {
    const headers = {
      "X-MBX-APIKEY": apiKey,
    };

    const timestamp = Date.now();
    const startDate = 1685415600000;
    const endDate = 1685934000000;
    const queryParams = `startTime=${startDate}&endTime=${endDate}&timestamp=${timestamp}`;

    const signature =
      apiSecret && apiKey !== null
        ? HmacSHA256(queryParams, apiSecret).toString(enc.Hex)
        : "";
    const url = `${baseUrl}${endpoint}?${queryParams}&signature=${signature}`;

    axios
      .get(url, { headers })
      .then((response) => {
        let trades = [];
        setLoading(true);
        if (response.status === 200) {
          trades = response.data;
          setTrades(trades);
          let sortedTrades = [];
          let finalTrades;

          trades.forEach((trade) => {
            const { symbol, side, commission, realizedPnl, qty } = trade;
            let tradeData = sortedTrades.find((item) => {
              item.symbol === symbol;
            });
            if (!tradeData) {
              tradeData = {
                symbol,
                buyCommission: 0,
                sellCommission: 0,
                buyPnl: 0,
                sellPnl: 0,
                time: 0,
                buyOrderId: "",
                sellOrderId: "",
                uniqueId: null,
                side,
                qty: parseFloat(qty),
              };
              sortedTrades.push(tradeData);
            }
            if (side === "BUY") {
              tradeData.buyCommission += parseFloat(commission) * -1;
              tradeData.buyPnl += parseFloat(realizedPnl);
            } else if (side === "SELL") {
              tradeData.sellCommission += parseFloat(commission) * -1;
              tradeData.sellPnl += parseFloat(realizedPnl);
            }
            tradeData.orderId = trade.orderId;
            tradeData.totalCommission =
              tradeData.sellCommission + tradeData.buyCommission;
            tradeData.totalPnl =
              tradeData.sellPnl + tradeData.buyPnl + tradeData.totalCommission;
            tradeData.time = trade.time;

            const groupedTrades = Object.values(
              sortedTrades.reduce((acc, trade) => {
                if (!acc[trade.orderId]) {
                  acc[trade.orderId] = { ...trade };
                } else {
                  acc[trade.orderId].totalPnl += trade.totalPnl;
                  acc[trade.orderId].qty += parseFloat(trade.qty);
                }
                return acc;
              }, {})
            );

            const final = Object.values(
              groupedTrades.reduce((acc, trade, index) => {
                let nextItem =
                  index < groupedTrades.length - 1
                    ? groupedTrades[index + 1]
                    : null;
                let prevItem = index > 0 ? groupedTrades[index - 1] : null;

                if (
                  nextItem !== null &&
                  trade.symbol === nextItem.symbol &&
                  trade.side !== nextItem.side
                ) {
                  const uniqueId = trade.orderId + nextItem.orderId;
                  acc[uniqueId] = { ...trade, uniqueId };
                  acc[uniqueId].totalPnl += nextItem.totalPnl;
                  acc[uniqueId].time = nextItem.time;
                }

                if (
                  prevItem !== null &&
                  nextItem !== null &&
                  nextItem.side === trade.side &&
                  nextItem.symbol === trade.symbol
                ) {
                  nextItem.qty + trade.qty === prevItem.qty
                    ? (acc[trade.orderId + prevItem.orderId].totalPnl +=
                        nextItem.totalPnl)
                    : "";
                }
                return acc;
              }, {})
            ).sort((a, b) => a.time - b.time);
            finalTrades = final;
          });
          setAgroupedTrades(finalTrades);
        }
        setLoading(false);
        SetError(null);
      })
      .catch((error) => {
        SetError(error);
      });
  }, [apiKey, apiSecret, agroupedTrades, setAgroupedTrades, setLoading]);

  return { trades, agroupedTrades, error, loading };
}

