import React from 'react';
import { View } from 'react-native';

export const CARD_WIDTH = 200;
export const CARD_HEIGHT = 100;

export const Card = () => (
  <View
    style={{ height: CARD_HEIGHT, width: CARD_WIDTH, backgroundColor: 'blue' }}
  />
);
