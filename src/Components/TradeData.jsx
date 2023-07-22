import React from "react";
import PnlLineChart from "../PnlLineChart";
import { UserContext } from "../UserContext";
import styles from "./Css/TradeData.module.css";
import Loading from "./Helper/Loading";

const TradeData = () => {
  const { agroupedTrades, loading } = React.useContext(UserContext);
  const [localTrades, setLocalTrades] = React.useState([]);

  React.useEffect(() => {
    setLocalTrades(JSON.parse(localStorage.getItem("trades")));
  }, []);

  return (
    <>
      {loading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {!loading && (
        <PnlLineChart
          className={styles.chart}
          data={
            localTrades && localTrades.length !== 0
              ? localTrades
              : agroupedTrades
          }
        />
      )}
    </>
  );
};

export default TradeData;
