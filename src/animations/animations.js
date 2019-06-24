import { swap, slideDownReturn, spaceInDown } from 'react-magic';
import { StyleSheet } from 'aphrodite';

export const Animations = StyleSheet.create({
  growFromBottomLeft: {
    animationName: swap,
    animationDuration: '1s'
  },
  slideInFromBottom: {
    animationName: slideDownReturn,
    animationDuration: '1s'
  },
  growFromCenter: {
    animationName: spaceInDown,
    animationDuration: '1s'
  }
});
