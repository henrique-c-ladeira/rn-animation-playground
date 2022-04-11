import React from 'react';
import { View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import { Card, CARD_HEIGHT, CARD_WIDTH } from './Card';
import { clamp, withBouncing } from 'react-native-redash';

type PanGestureProps = {
  width: number;
  height: number;
};

export const PanGesture: React.FC<PanGestureProps> = ({ width, height }) => {
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetX: number;
      offsetY: number;
    }
  >({
    onStart: (event, context) => {
      context.offsetX = translateX.value;
      context.offsetY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = clamp(context.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(context.offsetY + event.translationY, 0, boundY);
    },
    onEnd: event => {
      translateX.value = withBouncing(
        withDecay({
          velocity: event.velocityX,
        }),
        0,
        boundX,
      );
      translateY.value = withBouncing(
        withDecay({
          velocity: event.velocityY,
        }),
        0,
        boundY,
      );
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  return (
    <View style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>
          <Card />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
