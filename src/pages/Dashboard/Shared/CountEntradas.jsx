// BarChart.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Box, Card, CardHeader } from '@mui/material';
import { format } from 'date-fns';



const CountEntradas = ({data}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    var option;

    for (let i = 0; i < 5; ++i) {
        data.push(Math.round(Math.random() * 200));
    }
    const yAxisData = data.map(item => `${item.Area}`);
    option = {
        xAxis: {
            max: 'dataMax'
        },
        yAxis: {
            type: 'category',
            data: yAxisData,
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 2 // only the largest 3 bars will be displayed
        },
        series: [
            {
            realtimeSort: true,
            name: 'X',
            type: 'bar',
            data: data,
            label: {
                show: true,
                position: 'right',
                valueAnimation: true
            }
            }
        ],
        legend: {
            show: true
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    };
        function run() {
            for (var i = 0; i < data.length; ++i) {
                if (Math.random() > 0.9) {
                data[i] += Math.round(Math.random() * 2000);
                } else {
                data[i] += Math.round(Math.random() * 200);
                }
            }
            chart.setOption({
                series: [
                {
                    type: 'bar',
                    data
                }
                ]
            });
        }
        setTimeout(function () {
        run();
        }, 0);
        setInterval(function () {
        run();
        }, 3000);
    option && chart.setOption(option);


    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <Card>
      <CardHeader sx={{ textAlign: "center" }} title="ENTRADAS POR AREA" />
      <Box component="div" ref={chartRef} sx={{ width: '500px', height: '250px', marginBottom:"1rem"}} />
    </Card>
  )
};

export default CountEntradas;
