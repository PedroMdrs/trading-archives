import { ITrade } from "../UserContext";
import styles from "./Css/Winrate.module.css";
import React from "react";
import StatsCard from "./StatsCard";

const Winrate = () => {
  const [localTrades, setLocalTrades] = React.useState<ITrade[] | []>([]);
  const winTrades = localTrades.filter((trade) => trade.realizedPnl > 0);
  const loserTrades = localTrades.filter((trade) => trade.realizedPnl < 0);
  const winRate = ((winTrades.length * 100) / localTrades.length).toFixed(2);
  React.useEffect(() => {
    setLocalTrades(JSON.parse(localStorage.getItem("trades") || ""));
  }, []);

  return (
    <StatsCard>
      <div className={styles.winrate}>Winrate</div>
      <div className={`flex ${styles.stats}`}>
        <span>{winRate}%</span>
        <span>
          <span>{winTrades.length}</span>
          <span> / </span>
          <span>{loserTrades.length}</span>
        </span>
      </div>
    </StatsCard>
  );
};

export default Winrate;
