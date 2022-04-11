import React, { useState } from 'react';
import { LayoutRectangle, View } from 'react-native';
import { PanGesture } from '../components/PanGesture';

export const GestureExample = () => {
  const [container, setContainer] = useState<null | LayoutRectangle>(null);

  return (
    <View
      style={{ backgroundColor: 'white', height: '100%' }}
      onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}>
      {container && <PanGesture {...container} />}
    </View>
  );
};
