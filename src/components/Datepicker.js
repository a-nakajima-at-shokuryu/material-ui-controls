import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ja from 'date-fns/locale/ja';
import { isWeekend, isSameDay } from 'date-fns';
import { pink, blue } from '@material-ui/core/colors';

const withUtils = Component => props => {
  ja.options.weekStartsOn = 0;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
      <Component {...props} />
    </MuiPickersUtilsProvider>
  );
};

const switchTheme = date => {
  const primaryColor = isWeekend(date) ? pink : blue;
  return createMuiTheme({
    palette: {
      primary: primaryColor, 
    }, 
    overrides: {
      MuiPickersDay: { 
        current: {
          color: blue[700], 
        }
      }, 
      MuiPickersCalendarHeader: {
        dayLabel: {
          '&:nth-child(1)': {
            color: pink[700],  
            fontWeight: 700, 
          }, 
          '&:nth-child(7)': {
            color: pink[700],  
            fontWeight: 700, 
          }, 
        }, 
      },       
    }, 
  });
};
const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => {
  const dayColor = !isSameDay(day, selectedDate) && isWeekend(day) ? pink[700] : undefined;
  return React.cloneElement(dayComponent, {
    style: {
      color: dayColor,  
    }, 
  }); 
}

const Datepicker = ({
  value, 
  onChange, 
  ...other
}) => {
  return (
    <MuiThemeProvider theme={switchTheme(value)}>
      <KeyboardDatePicker
        variant="inline"
        format="yyyy-MM-dd"
        autoOk
        onChange={onChange}
        value={value}
        renderDay={renderDay}
        {...other}
      />
    </MuiThemeProvider>
  )
}

export default withUtils(Datepicker);
