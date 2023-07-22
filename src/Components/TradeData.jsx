import React from "react";
import PnlLineChart from "../PnlLineChart";
import { UserContext } from "../UserContext";
import styles from "./TradeData.module.css";

const TradeData = () => {
  const { agroupedTrades, loading, error } = React.useContext(UserContext);

  return (
    <>
      {loading && <div>Carregando</div>}
      {error ? (
        <div>Chave invalida</div>
      ) : (
        !error && (
          <PnlLineChart
            className={styles.chart}
            agroupedTrades={agroupedTrades}
          />
        )
      )}
    </>
  );
};

export default TradeData;
