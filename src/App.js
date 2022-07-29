import SelectCountry from './components/SelectCountry/SelectCountry';
import Highlight from './components/Highlight/Highlight';
import Summary from './components/Summary/Summary';
import { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './fetchData';
import { Typography, Container } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/vi';
import { sortBy } from 'lodash';
import '@fontsource/roboto';

moment.locale('vi');

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getCountries();
      const sortCountries = sortBy(res.data, 'Country');
      setCountries(sortCountries);
      setSelectedCountryId('vn');
    };
    fetchData();
  }, []);

  const handleChange = async (e) => {
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find((c) => c.ISO2.toLowerCase() === selectedCountryId);
      const fetchData = async () => {
        let res = await getReportByCountry(Slug);
        // xoa di item cuoi cung trong array res.data
        res.data.pop();
        setReport(res.data);
      };
      fetchData();
    }
  }, [countries, selectedCountryId]);

  return (
    <Container style={{ marginTop: 24 }}>
      <Typography variant='h2' component='h2'>
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>

      <SelectCountry countries={countries} handleChange={handleChange} value={selectedCountryId} />
      <Highlight report={report} />
      <Summary report={report} selectedCountryId={selectedCountryId} />
    </Container>
  );
}

export default App;
