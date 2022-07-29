import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { ButtonGroup, Button } from '@material-ui/core';

const generateOption = (data) => {
  const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));

  return {
    chart: {
      height: 500,
    },
    title: {
      text: 'Tổng số ca nhiễm',
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F35858'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: 'right',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    series: [
      {
        name: 'Số ca nhiễm',
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

const LineChart = ({ data }) => {
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('all');

  useEffect(() => {
    setOptions(generateOption(data));
  }, [data]);

  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case 'all':
        customData = data;
        break;
      case '30':
        customData = data.slice(data.length - 30);
        break;
      case '7':
        customData = data.slice(data.length - 7);
        break;

      default:
        customData = data;
        break;
    }
    setOptions(generateOption(customData));
  }, [data, reportType]);

  return (
    <div>
      <ButtonGroup size='small' style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant={reportType === 'all' ? 'contained' : 'text'}
          color={reportType === 'all' ? 'secondary' : ''}
          onClick={() => setReportType('all')}
        >
          Tất cả
        </Button>
        <Button
          variant={reportType === '30' ? 'contained' : 'text'}
          color={reportType === '30' ? 'secondary' : ''}
          onClick={() => setReportType('30')}
        >
          30 ngày
        </Button>
        <Button
          variant={reportType === '7' ? 'contained' : 'text'}
          color={reportType === '7' ? 'secondary' : ''}
          onClick={() => setReportType('7')}
        >
          7 ngày
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default React.memo(LineChart);
