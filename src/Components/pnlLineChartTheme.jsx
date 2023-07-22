const pnlLineChartTheme = {
  color: ["#dd6c66", "#47cc8e"],
  background: "transparent",
  title: {
    textStyle: {
      color: "#eeeeee",
      fontSize: 16,
    },
    subtextStyle: {
      color: "#aaaaaa",
    },
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 20,
    containLabel: true,
  },
  visualMap: { type: "piecewise", show: false },
  valueAxis: {
    axisLine: {
      lineStyle: {
        width: 1,
        color: "#696969",
      },
    },
    axisTick: { show: false },
    axisLabel: {
      show: true,
      color: "#eeeeee",
    },
    splitLine: {
      lineStyle: {
        color: ["#52525288"],
        type: "dashed",
      },
    },
  },
  tooltip: {
    show: true,
    trigger: "axis",
    backgroundColor: "#ffffff",
    axisPointer: {
      snap: true,
      type: "cross",
      label: { backgroundColor: "#666b8b" },
    },
  },
};
export default pnlLineChartTheme;
