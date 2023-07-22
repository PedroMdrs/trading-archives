const pnlLineChartTheme = {
  color: [
    "#dd6c66",
    "#38c55b",
    "#e69d87",
    "#8dc1a9",
    "#ea7e53",
    "#eedd78",
    "#73a373",
    "#73b9bc",
    "#7289ab",
    "#91ca8c",
    "#f49f42",
  ],
  backgroundColor: "#222125",
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
        color: ["#292929"],
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
