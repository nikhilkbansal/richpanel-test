import * as React from 'react';
import { TextInput } from 'react-native-paper';

export default function (props) {
  return (
    <TextInput
      style={{ backgroundColor: 'transparent' }}
      {...props}
    />
  );
}
