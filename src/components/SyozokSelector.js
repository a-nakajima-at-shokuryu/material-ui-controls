import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
import { TextField, MenuItem, makeStyles } from '@material-ui/core'

const SyozokSelector = ({
  onChange, 
  ...other
}) => {
  const buka = useBuka();
  const classes = useStyles();
  const handleChange = e => {
    onChange(e.target.value);
  }
  return (
    <TextField
      className={classes.root}
      label="所属CD"
      {...other}
      onChange={handleChange}
      select
    >
      {buka.map(({ syozok, bukm }) => (
        <MenuItem key={syozok} value={syozok}>
          {syozok} - {bukm}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default SyozokSelector;

const buka = [
  [170, '水産１課', ], 
  [150, '水産２課', ], 
  [131, '水産３課', ], 
  [141, '水産４課', ], 
  [160, '日配１課', ], 
  [134, '日配２課', ], 
  [165, '日配２課B', ], 
  [161, '日配３課', ], 
  [610, '東量販水産', ], 
  [620, '東量販日配', ], 
  [710, '山陰量販課', ], 
  [830, '中部加工', ], 
  [910, '西日本水産１課', ], 
  [920, '西日本水産２課', ], 
  [930, '西日本テナント', ], 
].map(([syozok, bukm]) => {
  return {syozok, bukm}
});
const bukaContext = createContext(buka);

const useBuka = () => {
  const buka = useContext(bukaContext);
  return buka;
}

const useStyles = makeStyles(theme => {
  return {
    root: {
      width: 200, 
    }, 
  };
})