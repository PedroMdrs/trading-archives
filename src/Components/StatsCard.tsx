import React, { PropsWithChildren } from "react";

const StatsCard = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.5rem",
        backgroundColor: "var(--color-2)",
        padding: "1rem 2rem",
      }}
    >
      {children}
    </div>
  );
};

export default StatsCard;
