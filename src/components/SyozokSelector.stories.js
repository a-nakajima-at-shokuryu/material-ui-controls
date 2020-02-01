import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import SyozokSelector from '../components/SyozokSelector';

export default {
  title: 'SyozokSelector',
  decorators: [withKnobs],
};

export const Demo = () => {
  const [value, onChange] = useState('');
  return (
    <>
      <SyozokSelector onClick={action('clicked')}
        value={value}
        onChange={onChange}
      />
      {value}
    </>
  );
};