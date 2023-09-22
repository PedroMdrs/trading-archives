import { useTrades } from "../UserContext";
import styles from "./Css/Winrate.module.css";
import StatsCard from "./StatsCard";

const Winrate = () => {
  const { winRate, winTrades, loserTrades } = useTrades();

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
