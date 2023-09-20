import React, { PropsWithChildren } from "react";
import StatsCard from "./StatsCard";
import { ITrade } from "../UserContext";
import styles from "./Css/TotalTrades.module.css";
const TotalTrades = () => {
  const [localTrades, setLocalTrades] = React.useState<ITrade[] | []>([]);
  const winTrades = localTrades.filter((trade) => trade.realizedPnl > 0);
  const loserTrades = localTrades.filter((trade) => trade.realizedPnl < 0);

  React.useEffect(() => {
    setLocalTrades(JSON.parse(localStorage.getItem("trades") || ""));
  }, []);
  return (
    <StatsCard>
      <div className={styles.totalTrades}>Total Trades</div>
      <div className={`flex ${styles.stats}`}>
        <div>{localTrades.length}</div>
        <div>
          <span>{winTrades.length}</span>
          <span> / </span>
          <span>{loserTrades.length}</span>
        </div>
      </div>
    </StatsCard>
  );
};

export default TotalTrades;
