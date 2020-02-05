import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'; 
import DateFnsUtils from '@date-io/date-fns'; 
import ja from 'date-fns/locale/ja'; 
import { useTheme, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { getDay, isSameDay } from 'date-fns';

const useUtilsWrapper = (weekStartsOn) => {
  ja.options.weekStartsOn = weekStartsOn;

  return children => (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
      {children}
    </MuiPickersUtilsProvider>
  );
};

const useThemeWrapper = (theme) => {
  return children => (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
};

const useCreateTheme = (weekStartsOn, date) => {
  const theme = useTheme();
  const primaryMain = blue[700];
  const sundayColor = theme.palette.secondary.main;
  const saturdayColor = theme.palette.success.dark; 
  const switchWeekColor = date => {
    switch (getDay(date)) {
      case 0: return sundayColor; 
      case 6: return saturdayColor; 
      default: return undefined; 
    }
  };
  const weekColor = switchWeekColor(date) || primaryMain; 

  const sundayPos = (0 - weekStartsOn + 7) % 7;
  const saturdayPos = (6 - weekStartsOn + 7) % 7;


  const createTheme = () => createMuiTheme({
    palette: {
      primary: {
        main: weekColor, 
      }, 
    }, 
    overrides: {
      MuiPickersCalendarHeader: {
        dayLabel: {
          [`&:nth-child(${sundayPos + 1})`]: {
            color: sundayColor, 
          }, 
          [`&:nth-child(${saturdayPos + 1})`]: {
            color: saturdayColor, 
          }, 
        }, 
      }, 
      MuiPickersDay: {
        current: {
          color: primaryMain, 
        }, 
      }, 
    }, 
  });

  const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => {
    const selected = isSameDay(day, selectedDate);
    const weekColor = selected ? undefined : switchWeekColor(day);
    return React.cloneElement(dayComponent, {
      style: {
        color: weekColor, 
      },
    });
  };

  return [createTheme, renderDay];
};

const DatePickerField = ({
  value, 
  onChange, 
  weekStartsOn = 0, 
  ...other
}) => {
  const [createTheme, renderDay] = useCreateTheme(weekStartsOn);
  const utilsWrapper = useUtilsWrapper(weekStartsOn);
  const themeWrapper = useThemeWrapper(createTheme());
  const wrapper = c => [
    utilsWrapper, 
    themeWrapper, 
  ].reduce((c, w) => w(c), c);

  return wrapper(
    <KeyboardDatePicker 
      variant="inline"
      format="yyyy-MM-dd"
      autoOk

      renderDay={renderDay}

      value={value}
      onChange={onChange}
      {...other}
    />
  )
}

export default DatePickerField
