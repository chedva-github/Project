import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import './locations.css'
import action from '../../redux/action'

export default function DateRange() {
  const [value, setValue] = React.useState([null, null]);
  const dispatch = useDispatch()
  const onDateChange = (date) => {
    console.log(date);
    setValue(date)
    dispatch(action.setDate(date))

  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='lacation-date'>
        <DateRangePicker
          startText="מתאריך"
          endText="לתאריך"
          value={value}
          onChange={(newValue) => {
            onDateChange(newValue);

          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}>עד </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </div>
    </LocalizationProvider>
  );
}
