import { FormControl, InputLabel, NativeSelect, FormHelperText, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles((theme) => ({
  formControl: {
    margin: `${theme.spacing(3)}px 0`,
  },
}));

function SelectCountry({ value, handleChange, countries }) {
  const style = useStyle();

  return (
    <FormControl className={style.formControl}>
      <InputLabel htmlFor='' shrink>
        Quốc gia
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleChange}
        inputProps={{
          name: 'country',
          id: 'country-selector',
        }}
      >
        {countries &&
          countries.length > 0 &&
          countries.map((item, index) => {
            return (
              <option key={index} value={item.ISO2.toLowerCase()}>
                {item.Country}
              </option>
            );
          })}
      </NativeSelect>
      <FormHelperText>Lựa chọn quốc gia</FormHelperText>
    </FormControl>
  );
}

export default SelectCountry;
