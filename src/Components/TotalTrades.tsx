import StatsCard from "./StatsCard";
import { useTrades } from "../UserContext";
import styles from "./Css/TotalTrades.module.css";
const TotalTrades = () => {
  const { localTrades, winTrades, loserTrades } = useTrades();

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
