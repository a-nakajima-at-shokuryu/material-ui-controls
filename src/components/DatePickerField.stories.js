import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import DatePickerField from '../components/DatePickerField';

export default {
  title: 'DatePickerField',
  decorators: [withKnobs],
};

export const Demo = () => {
  const [value, onChange] = useState(null);

  return (
    <React.Fragment>
      <DatePickerField 
        // onClick={action('clicked')}
        value={value}
        onChange={onChange}
      />
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </React.Fragment>
  );
};  