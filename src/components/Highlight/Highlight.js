import React from 'react';
import { Grid } from '@material-ui/core';
import HighlightCards from './HighlightCards';

function Highlight({ report }) {
  const data = report && report.length > 0 ? report[report.length - 1] : []; // lay item cuoi cung trong array report

  const arrSummary = [
    {
      title: 'Số ca nhiễm',
      count: data?.Confirmed,
      type: 'confirmed',
    },
    {
      title: 'Số ca khỏi',
      count: data?.Recovered,
      type: 'recovered',
    },
    {
      title: 'Số ca tử vong',
      count: data?.Deaths,
      type: 'deaths',
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        {arrSummary.map((item, index) => (
          <Grid item sm={4} xs={12} key={index}>
            <HighlightCards title={item.title} count={item.count} type={item.type} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Highlight;
