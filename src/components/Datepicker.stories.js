import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import Datepicker from '../components/Datepicker';

export default {
  title: 'Datepicker',
  decorators: [withKnobs],
};

export const Demo = () => {
  const [value, onChange] = useState(null);
  return (
    <Datepicker onClick={action('clicked')}
      value={value}
      onChange={onChange}
      label="納品日"
    />
  );
};