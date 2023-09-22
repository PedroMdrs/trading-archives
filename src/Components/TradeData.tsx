import PnlLineChart from "./PnlLineChart";
import { useTrades } from "../UserContext";
import styles from "./Css/TradeData.module.css";
import Loading from "./Helper/Loading";
import Winrate from "./Winrate";
import TotalTrades from "./TotalTrades";

const TradeData = () => {
  const { agroupedTrades, loading, localTrades } = useTrades();

  return (
    <>
      {loading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {!loading && (
        <div className={styles.container}>
          <div className={styles.stats}>
            <Winrate />
            <TotalTrades></TotalTrades>
          </div>
          <PnlLineChart
            className={styles.chart}
            data={
              localTrades && localTrades.length !== 0
                ? localTrades
                : agroupedTrades
            }
          />{" "}
        </div>
      )}
    </>
  );
};

export default TradeData;
