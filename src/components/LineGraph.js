import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import {Context} from '../store/context/AppContext';
import {caseTypeColors} from '../constant/Constant';

function LineGraph({...props}) {
  const {chartData, setChartData,casesType,country } = React.useContext(Context);
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
     const url = country === 'worldwide' ? 'https://disease.sh/v3/covid-19/historical/all?lastdays=120' : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`;
     const getGraphData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.table(data);
          const chartData = data.timeline ? buildChart(data.timeline) :  buildChart(data);
          setChartData(chartData);
        });
    };
    getGraphData();
  }, [casesType,country]);

  const buildChart = (data) => {
    const chartData = [];
    let lastDataPoint;
    if(casesType !=='active') {
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
    } else{
      for (const date in data['cases']) {
        if (lastDataPoint) {
          const newDataPoint = {
            x: date,
            y: (data['cases'][date] - ( data['recovered'][date] +  data['deaths'][date])) - lastDataPoint,
          };
          chartData.push(newDataPoint);
        }
        lastDataPoint = data['cases'][date] - ( data['recovered'][date] +  data['deaths'][date]);
      }
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
                backgroundColor: caseTypeColors[casesType].rgba,
                borderColor: caseTypeColors[casesType].primary,
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
