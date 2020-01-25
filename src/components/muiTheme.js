import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

export const useTheme = Component => props => {
  return (
    <MuiThemeProvider theme={theme}>
      <Component {...props} />
    </MuiThemeProvider>
  )
};
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700], 
    },  
  }, 
  typography: {
    fontSizes: 12, 
  }, 
})