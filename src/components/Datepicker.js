import React, { cloneElement, useCallback } from 'react';
import {
  KeyboardDatePicker as MuiDatePicker, 
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ja } from 'date-fns/locale';
import { useMuiTheme } from './muiTheme';
import { Toolbar, makeStyles } from '@material-ui/core';
import { isSameDay } from 'date-fns';
import { useStyles as useDayStyles } from '@material-ui/pickers/views/Calendar/Day';
import clsx from 'clsx'; 

const isWeekend = date => {
  const week = date.getDay();
  return week === 0 || week === 6;
};

const CalendarToolbar = ({
  date, 
  ...other
}) => {
  const year = date.getFullYear(date);
  const month = date.getMonth() + 1; 
  const nn = n => ('00' + n).slice(-2);
  const classes = useToolbarStyles(date);
  return (
    <Toolbar
      className={classes.root}
    >
      {year}年{nn(month)}月
    </Toolbar>
  )
}

const useToolbarStyles = makeStyles(theme => {
  const backgroundColor = date => {
    return isWeekend(date) 
      ? theme.palette.secondary.main
      : theme.palette.primary.main; 
  }
  return {
    root: {
      backgroundColor: date => backgroundColor(date), 
      color: date => theme.palette.getContrastText(backgroundColor(date))
    }, 
  };
});

const useWeekendDayComponent = () => {
  const classes = {
    ...useDayStyles(), 
    ...useWeekendStyles(), 
  };
  return element => cloneElement(element, {
    className: clsx(classes.day, {
      [classes.current]: element.props.current, 
      [classes.hidden]: element.props.hidden, 
      [classes.daySelected]: element.props.selected, 
      [classes.dayDisabled]: element.props.disabled, 
      [classes.weekend]: true, 
    }), 
  })
};

const useWeekendStyles = makeStyles(theme => {
  return {
    weekend: {
      color: theme.palette.secondary.contrastText, 
      backgroundColor: theme.palette.secondary.main, 
      '&:hover': {
        backgroundColor: theme.palette.secondary.light, 
      }, 
      '&:focus': {
        backgroundColor: theme.palette.secondary.light, 
      }, 
    }
  };
});

const withUtils = (children) => (
  <MuiPickersUtilsProvider 
    utils={DateFnsUtils}
    locale={ja}
  >
    {children}
  </MuiPickersUtilsProvider>
);

const Datepicker = ({
  value, 
  onChange, 
  ...other
}) => {
  ja.options.weekStartsOn = 0;

  const handleChange = (_, value) => {
    onChange(value);
  }

  const weekendDayComponent = useWeekendDayComponent();

  const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => {
    if (dayComponent.props.selected && isWeekend(day)) {
      return weekendDayComponent(dayComponent);
    }
    return dayComponent;
  }

  return withUtils(
    <MuiDatePicker
      {...other}
      variant="inline"
      inputValue={value}
      onChange={handleChange}
      format="yyyy-MM-dd"
      autoOk
      ToolbarComponent={CalendarToolbar}
      renderDay={renderDay}
    />
  );
}

export default useMuiTheme(Datepicker);

