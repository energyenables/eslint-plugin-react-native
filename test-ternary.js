import React from 'react';
import { View, Text } from 'react-native';

const Example = (props) => {
  const insets = { top: 10 };
  return (
    <View
      style={{
        height: props.insetTop ? insets.top : 0,  // This should not be reported
      }}
    >
      <Text>Test</Text>
    </View>
  );
};

export default Example;
