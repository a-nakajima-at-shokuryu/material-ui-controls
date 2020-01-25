import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider, 
  KeyboardDatePicker, 
} from '@material-ui/pickers';
import { 
  format, 
  getYear, 
  getMonth, 
  getDate,
  isWeekend,
} from 'date-fns'; 
import ja from 'date-fns/locale/ja';
import { useTheme, theme } from './muiTheme'; 
import { Toolbar, Typography, makeStyles } from '@material-ui/core';

const Datepicker = ({
  ...other
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
      <KeyboardDatePicker
        {...other}
        format="yyyy-MM-dd (eee)"
        variant="inline"
        autoOk
        ToolbarComponent={ToolbarComponent}
      />
    </MuiPickersUtilsProvider>
  )
}

export default useTheme(Datepicker);

const ToolbarComponent = ({
  date, 
  ...other
}) => {
  const classes = useToolbarClasses(date);
  let [ year, month, day, wday ] = [
    getYear(date), 
    getMonth(date), 
    getDate(date), 
    format(date, 'eee', { locale: ja })
  ]
  month++;
  const nn = n => ('00' + n).slice(-2);
  return (
    <Toolbar className={classes.toolbar}>
      <Typography className={classes.title}>
        {year}年{nn(month)}月{nn(day)}日({wday})
      </Typography>
    </Toolbar>
  );
}
const toolbarBackgroundColor = (theme, decorate = a=>a) => date => {
  return isWeekend(date) 
    ? decorate(theme.palette.secondary.main) 
    : decorate(theme.palette.primary.main) 
    ;
}
const useToolbarClasses = makeStyles(theme => {
  return {
    toolbar: {
      display: 'flex', 
      justifyContent: 'center', 
      backgroundColor: toolbarBackgroundColor(theme), 
      color: toolbarBackgroundColor(theme, theme.palette.getContrastText), 
    }, 
    title: {}, 
  }
});