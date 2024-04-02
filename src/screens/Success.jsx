import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet from '../components/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Screens from '../constants/screens';
import {removeUser} from '../redux/User.slice';
import {useDispatch} from 'react-redux';

const Success = ({route}) => {
  const navigation = useNavigation();
  const [details, setDetails] = useState({});

  const dispatch = useDispatch();

  const ref = useRef(null);
  useEffect(() => {
    if (route.params?.from == 'login') {
      setDetails({
        heading: 'Login Successful',
        para: 'An event has been created and the invite has been sent to you on mail.',
        btnText: 'Logout',
      });
    } else {
      setDetails({
        heading: 'Password Changed',
        para: 'Password changed successfully, you can login again with a new password',
        btnText: 'Go To Login',
      });
    }
    if (ref) {
      ref?.current?.scrollTo(-500);
    }
  }, [details.heading]);

  const onButtonPress = async () => {
    if (route.params?.from == 'login') {
      dispatch(removeUser());
    }
    navigation.reset({
      index: 0,
      routes: [{name: Screens.login}],
    });
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <StatusBar backgroundColor={'transparent'} />
        <Image
          key={'blurryImage'}
          source={require('../assets/images/successBg.png')}
          style={styles.absolute}
        />
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,.3)',
            zIndex: 999,
            width: '100%',
            height: '100%',
          }}></View>
      </SafeAreaView>
      <BottomSheet
        ref={ref}
        heading={details.heading}
        para={details.para}
        btnText={details.btnText}
        onButtonPress={onButtonPress}
      />
    </GestureHandlerRootView>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
  },
});
