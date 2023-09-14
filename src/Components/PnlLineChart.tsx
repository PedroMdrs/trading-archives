import React, { useState } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import pnlLineChartTheme from "./pnlLineChartTheme";
import styles from "./PnlLineChart.module.css";
import { IAgroupedTrade } from "../UserContext";
echarts.use([
  TitleComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  TooltipComponent,
  VisualMapComponent,
]);

echarts.registerTheme("pnl_line_chart_theme", pnlLineChartTheme);

function formatTime(time: number | string) {
  const date = new Date(time);
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const formattedHour = hour.toString().padStart(2, "0");
  const formattedMinute = minute.toString().padStart(2, "0");
  const formattedDate = {
    weekday,
    month,
    year,
    formattedHour,
    formattedMinute,
    day,
  };
  return formattedDate;
}

function formatDate(time: number) {
  if (!time) return;
  const { day, month, year } = formatTime(time);
  const yearSimplified = year.toString().slice(-2);
  return `${day}/${month}/${yearSimplified}`;
}

function getPeriod(startTime: number, endTime: number) {
  const initialDate = formatDate(startTime);
  const finalDate = formatDate(endTime);

  const timeDifference = Math.abs(endTime - startTime);

  const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return `${initialDate} - ${finalDate} (${days === 0 ? "1" : days} ${
    days >= 1 ? "Days" : "Day"
  })`;
}

function formatTooltipContent(
  params: { value: number; dataIndex: number }[],
  data: IAgroupedTrade
) {
  const value = params[0].value;
  const index = params[0].dataIndex - 1;

  const symbol = index >= 0 ? data[index].symbol : "";
  const totalPnl = index >= 0 ? data[index].realizedPnl : 0;
  const timeData = index >= 0 ? data[index].time : "";

  const { day, formattedHour, formattedMinute, month, weekday, year } =
    formatTime(timeData);

  const timeString = `${weekday}, ${day} ${month} ${year} - ${formattedHour}:${formattedMinute}`;

  const tooltipContent =
    value !== 0
      ? `
        <div class="${styles.tooltipContainer}">
          <div class="${styles.symbol}">${symbol}</div>
          <div>${timeString}</div>
          <div class="${styles.pnlContainer}">
            <div>
              <p>Realized PNL</p>
              <span>${
                totalPnl > 0
                  ? `+$${totalPnl.toFixed(2)}`
                  : `-$${Math.abs(totalPnl.toFixed(2))}`
              }</span>
            </div>
            <div>
              <p>Total PNL</p>
              <span>${value < 0 ? "-" : "+"}$${Math.abs(value).toFixed(
          2
        )}</span>
            </div>
          </div>
        </div>
      `
      : null;

  return tooltipContent;
}

function PnlLineChart({
  data,
  className,
}: {
  data: IAgroupedTrade;
  className: string;
}) {
  console.log(data);
  console.log(className);
  const [isHovered, setIsHovered] = useState(false);
  const [startTime, setStartTime] = React.useState<null | number>(null);
  const [endTime, setEndTime] = React.useState<null | number>(null);
  const pnlData = [0];
  const timeData: (number | string)[] = [0];
  let period = null;

  React.useEffect(() => {
    setStartTime(JSON.parse(localStorage.getItem("startTime") || ""));
    setEndTime(JSON.parse(localStorage.getItem("endTime") || ""));
  }, []);

  data.reduce((sum, { realizedPnl }) => {
    sum += realizedPnl;
    pnlData.push(sum);
    return sum;
  }, 0);

  if (endTime && endTime > Date.now()) setEndTime(Date.now());

  if (startTime && endTime) period = getPeriod(startTime, endTime);

  data.forEach(({ time }) => {
    const { day, formattedHour, formattedMinute, month, year } =
      formatTime(time);

    const timeString = `${day} ${month} ${year} - ${formattedHour}:${formattedMinute}`;
    timeData.push(timeString);
  });

  const option = {
    title: {
      text: [`PNL ($) {b| ${period ? period : ""} }`],
      textStyle: {
        rich: {
          b: {
            color: "#666666",
            fontSize: "1rem",
          },
        },
      },
    },

    visualMap: [
      {
        pieces: [
          {
            max: 0.000001,
            color: pnlLineChartTheme.color[0],
          },
          {
            max: 99999999999990,
            color: pnlLineChartTheme.color[1],
          },
        ],
      },
    ],
    xAxis: {
      data: timeData,
      boundaryGap: false,
      show: true,
      axisTick: { lineStyle: { color: "#767a8d", width: 1 } },
      axisLabel: { show: false },
    },
    yAxis: {
      axisPointer: { lineStyle: { color: "#7e7c7c" } },
    },
    tooltip: {
      formatter: function (
        params: {
          value: number;
          dataIndex: number;
        }[]
      ) {
        console.log(params);
        return formatTooltipContent(params, data);
      },
    },

    series: [
      {
        type: "line",
        data: pnlData.map((item) => item),
        symbol: isHovered ? "emptyCircle" : "none",
        symbolSize: 8,
        smooth: true,
        itemStyle: {
          color: isHovered ? "white" : "none",
        },
        areaStyle: {
          opacity: 0.2,
        },
        cap: "round",
      },
    ],
  };

  return (
    <>
      <section
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className={styles.container}
      >
        <ReactEChartsCore
          className={className}
          echarts={echarts}
          option={option}
          theme={"pnl_line_chart_theme"}
        />
      </section>
    </>
  );
}

export default PnlLineChart;
