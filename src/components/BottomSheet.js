import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useImperativeHandle} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import styles from '../styles/style';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Font from '../constants/fonts';
import FontSize from '../constants/FontSize';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = React.forwardRef(
  ({heading, para, btnText, onButtonPress}, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback(destination => {
      'worklet';
      active.value = destination !== 0;

      translateY.value = withSpring(destination, {damping: 50});
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({scrollTo, isActive}), [
      scrollTo,
      isActive,
    ]);

    const context = useSharedValue({y: 0});
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          scrollTo(-450);
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP,
      );

      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={styles.line} />
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              marginVertical: 10,
              height: '100%',
              paddingHorizontal: widthPercentageToDP(5),
            }}>
            <Image source={require('../assets/images/Success.png')} />
            <Text
              style={[
                styles.heading,
                {fontSize: FontSize.FONT_LARGE, fontFamily: Font.SemiBold},
              ]}>
              {heading}
            </Text>
            <Text
              style={[
                styles.paragraph,
                {
                  textAlign: 'center',
                  marginTop: heightPercentageToDP(1),
                  fontFamily: Font.Medium,
                },
              ]}>
              {para}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onButtonPress}
              style={[styles.button, styles.mt2, {width: '100%'}]}>
              <Text style={styles.buttonText}>{btnText}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureDetector>
    );
  },
);

export default BottomSheet;
