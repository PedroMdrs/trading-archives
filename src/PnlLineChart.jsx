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
echarts.use([
  TitleComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  TooltipComponent,
  VisualMapComponent,
]);

echarts.registerTheme("pnl_line_chart_theme", pnlLineChartTheme);

const PnlLineChart = ({ agroupedTrades, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  let pnlData = [0];
  agroupedTrades.reduce((sum, { totalPnl }) => {
    sum += totalPnl;
    pnlData.push(sum);
    return sum;
  }, 0);
  let timeData = [0];

  function formatateTime(time) {
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

  function formattedPeriod(time) {
    if (!time) return;
    const { day, month, year } = formatateTime(time);
    const yearSimplified = year.toString().slice(-2)
    return `${day}/${month}/${yearSimplified}`;
  }

  function getPeriod(startTime, endTime) {
    const initialDate = formattedPeriod(startTime);
    const finalDate = formattedPeriod(endTime);

    
    const difference = Math.abs(endTime - startTime);

    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return `${initialDate} - ${finalDate} (${days} days)`;
  }
  let period = null;

  if (agroupedTrades.length !== 0) {
    period = getPeriod(
      agroupedTrades[0].time,
      agroupedTrades[agroupedTrades.length - 1].time
    );
  }

  agroupedTrades.forEach(({ time }) => {
    const { day, formattedHour, formattedMinute, month, year } =
      formatateTime(time);

    const timeString = `${day} ${month} ${year} - ${formattedHour}:${formattedMinute}`;
    timeData.push(timeString);
  });

  const option = {
    title: {
      text: [
        `PNL ($) {b| ${period} }`, // Parte 1 do título entre as chaves "a"
      ],
      textStyle: {
        rich: {
          b: {
            color: "   #7c7c91",
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
      formatter: function (params) {
        const value = params[0].value;

        const symbol =
          params[0].dataIndex > 0
            ? agroupedTrades[params[0].dataIndex - 1].symbol
            : "";

        const totalPnl =
          params[0].dataIndex > 0
            ? agroupedTrades[params[0].dataIndex - 1].totalPnl
            : "";

        const timeData =
          params[0].dataIndex > 0
            ? agroupedTrades[params[0].dataIndex - 1].time
            : "";

        const { day, formattedHour, formattedMinute, month, weekday, year } =
          formatateTime(timeData);

        const timeString = `${weekday}, ${day} ${month} ${year} - ${formattedHour}:${formattedMinute}`;

        const tooltipContent =
          value !== 0
            ? ` <div class="${styles.container}"> 
             <div class="${styles.symbol}">  ${symbol}  </div> 
             <div> ${timeString} </div> 
              <div class="${styles.pnlContainer}">  
              <div>
               <p> Realized PNL </p> <span> ${
                 totalPnl > 0
                   ? ` +$${totalPnl.toFixed(2)}`
                   : `-$${Math.abs(totalPnl.toFixed(2))}`
               } </span> </div>
               
              <div> 
              <p> Total PNL </p> <span>${value < 0 ? "-" : ""}$${Math.abs(
                value
              ).toFixed(2)}</span>

              </div>
              </div>
               </div>`
            : null;
        return tooltipContent;
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
        className={styles.teste}
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
};

export default PnlLineChart;
