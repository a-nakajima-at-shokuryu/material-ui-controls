import React, { useEffect } from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; 
import ja from 'date-fns/locale/ja'; 
import { blue } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider, useTheme } from '@material-ui/core';
import { getDay, isSameDay } from 'date-fns';

const useUtilsProvider = (weekStartsOn) => {
  useEffect(() => ja.options.weekStartsOn = weekStartsOn, [weekStartsOn]);
  const utilsProvider = element => (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
      {element}
    </MuiPickersUtilsProvider>
  );
  return utilsProvider;
};

const useThemeProvider = (date, weekStartsOn) => {
  const dayOfWeek = getDay(date);
  const theme = useTheme();
  const primaryMain = blue[700];
  const sundayColor = theme.palette.secondary.main;
  const saturdayColor = theme.palette.success.dark;
  const sundayPos = (0 - weekStartsOn + 7) % 7;
  const saturdayPos = (6 - weekStartsOn + 7) % 7;
  const getWeekColor = dayOfWeek => (
    dayOfWeek === 0 ? sundayColor: (
      dayOfWeek === 6 ? saturdayColor: undefined 
      ));
  const customedTheme = createMuiTheme({
    palette: {
      primary: {
        main: getWeekColor(dayOfWeek) || primaryMain, 
      }, 
    }, 
    overrides: {
      MuiPickersDay: {
        current: { color: primaryMain }, 
      }, 
      MuiPickersCalendarHeader: {
        dayLabel: {
          [`&:nth-child(${sundayPos + 1})`]: { color: sundayColor }, 
          [`&:nth-child(${saturdayPos + 1})`]: { color: saturdayColor }, 
        }, 
      }, 
    }, 
  })
  const themeProvider = element => (
    <MuiThemeProvider theme={customedTheme}>
      {element}
    </MuiThemeProvider>
  );
  const renderDay = (date, selectedDate, dayInCurrentMonth, dayComponent) => {
    const selected = isSameDay(date, selectedDate);
    return React.cloneElement(dayComponent, {
      style: {
        color: selected ? undefined : getWeekColor(getDay(date)),
      }, 
    });
  };
  return [themeProvider, renderDay];
}; 

const DatePickerField = ({
  value, 
  onChange, 
  label = '納品日', 
  weekStartsOn = 0, 
  ...other
}) => {
  
  const [themeProvider, renderDay] = useThemeProvider(value, weekStartsOn);
  const utilsProvider = useUtilsProvider(weekStartsOn);
  const combineProvider = (...a) => e => a.reduce((e, f) => f(e), e);
  const provider = combineProvider(
    themeProvider, 
    utilsProvider, 
  )
  return provider(
    <KeyboardDatePicker 
      variant="inline"
      format="yyyy-MM-dd"
      autoOk

      renderDay={renderDay}

      value={value}
      onChange={onChange}
      label={label}
      {...other}
    />
  )
}

export default DatePickerField
