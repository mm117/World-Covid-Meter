import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import {Context} from '../store/context/AppContext';

function LineGraph({...props}) {
  const {chartData, setChartData,casesType } = React.useContext(Context);
  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
    },
    yAxes: [
      {
        gridlines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
               return numeral(value).format("0a");
          },
        },
        scaleLabel: {
            display: true,
            labelString: '1k = 1000'
        }
      }
    ],
  };
  useEffect(() => {
    const getGraphData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          console.table(data);
          const chartData = buildChart(data);
          setChartData(chartData);
        });
    };
    getGraphData();
  }, [casesType]);

  const buildChart = (data) => {
    const chartData = [];
    let lastDataPoint;
    for (const date in data[casesType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  return (
    <div className={props.className}>
      {chartData?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: casesType === 'recovered' ? "rgba(0,128,0,0.8)" : "rgba(204,16,52,0.8)",
                borderColor: casesType === 'recovered' ? "green" : "#cc1034",
                data: chartData,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;