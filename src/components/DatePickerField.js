import React, { useEffect, useMemo } from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ja from 'date-fns/locale/ja';
import { getDay, isSameDay } from 'date-fns';
import { MuiThemeProvider, createMuiTheme, useTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const useUtilsProvider = (weekStartsOn) => {
  useEffect(() => {
    ja.options.weekStartsOn = weekStartsOn; 
  }, [weekStartsOn]);
  return element => (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
      {element}
    </MuiPickersUtilsProvider>
  );
};

const useThemeProvider = theme => {
  return element => (
    <MuiThemeProvider theme={theme}>
      {element}
    </MuiThemeProvider>
  );
};

const useCreateTheme = (dayOfWeek, weekStartsOn) => {
  const theme = useTheme();
  const primaryMain = blue[700];
  const sundayColor = theme.palette.secondary.main;
  const saturdayColor = theme.palette.success.dark; 
  const getWeekColor = dayOfWeek => (
    dayOfWeek === 0 ? sundayColor : (
    dayOfWeek === 6 ? saturdayColor: (
      undefined
  )));
  const weekColor = getWeekColor(dayOfWeek);
  const sundayPos = (0 - weekStartsOn + 7) % 7;
  const saturdayPos = (6 - weekStartsOn + 7) % 7;
  const createTheme = () => createMuiTheme({
    palette: {
      primary: {
        main: weekColor || primaryMain, 
      }, 
    }, 
    overrides: {
      MuiPickersDay: {
        current: {
          color: primaryMain
        }, 
      }, 
      MuiPickersCalendarHeader: {
        dayLabel: {
          [`&:nth-child(${sundayPos + 1})`]: { color: sundayColor }, 
          [`&:nth-child(${saturdayPos + 1})`]: { color: saturdayColor }, 
        }, 
      }, 
    }, 
  });
  const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => {
    const selected = isSameDay(day, selectedDate);
    const dayColor = selected ? undefined : getWeekColor(getDay(day));
    return React.cloneElement(dayComponent, {
      style: {
        color: dayColor,
      },  
    });
  };
  return [createTheme, renderDay];
};
const DatePickerField = ({
  value, 
  onChange, 
  label="納品日", 
  weekStartsOn = 0, 
  ...other
}) => {
  const dayOfWeek = useMemo(() => getDay(value), [value]);
  const [createTheme, renderDay] = useCreateTheme(dayOfWeek, weekStartsOn);
  const themeProvider = useThemeProvider(createTheme());
  const utilsProvider = useUtilsProvider(weekStartsOn)
  const all = (...a) => e => a.reduce((e, f) => f(e), e);
  const provider = all(
    themeProvider, 
    utilsProvider, 
  );
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
