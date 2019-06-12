import { swap } from 'react-magic';
import { StyleSheet } from 'aphrodite';

export const Animations = StyleSheet.create({
  growFromBottomLeft: {
    animationName: swap,
    animationDuration: '1s'
  }
});
