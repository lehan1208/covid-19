import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import LineChart from '../Charts/LineChart/LineChart';
import HighMap from '../Charts/HighMap/HighMap';

function Summary({ report, selectedCountryId }) {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (selectedCountryId) {
      const fetchData = async () => {
        let res = await import(
          `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
        );
        setMapData(res);
      };
      fetchData();
    }
  }, [selectedCountryId]);

  return (
    <div style={{ marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMap mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Summary;
