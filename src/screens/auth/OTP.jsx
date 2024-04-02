import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import styles from '../../styles/style';
import Screens from '../../constants/screens';
import FontSize from '../../constants/FontSize';
import {OtpInput} from 'react-native-otp-entry';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Font from '../../constants/fonts';
import Feather from 'react-native-vector-icons/Feather';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useResetPasswordMutation} from '../../services/Services';
import LottieView from 'lottie-react-native';
import assets from '../../assets';

const OTP = ({navigation, route}) => {
  const [timer, setTimer] = useState(10);
  const [otp, setOtp] = useState(0);
  const [getOTP, setGetOTP] = useState(route.params.otp);
  const [showAlert, setShowAlert] = useState(false);
  const [resetPassword, response] = useResetPasswordMutation();
  const otpHandler = () => {
    if (otp !== getOTP) {
      setShowAlert(true);
      return;
    }
    navigation.navigate(Screens.resetPassword, {email: route.params?.email});
  };
  const resendHandler = async () => {
    try {
      const res = await resetPassword({email: route.params.email});
      if (res?.data?.success) {
        setTimer(10);
        setGetOTP(res.data?.data?.otp);
      }
    } catch (error) {}
  };
  useEffect(() => {
    const interVal = setTimeout(() => {
      let tempTime = timer - 1;
      setTimer(tempTime);
    }, 1000);
    if (timer == 0) {
      return clearTimeout(interVal);
    }
  }, [timer]);

  const timerShow = useMemo(() => {
    return (
      <View style={[styles.flexRow, styles.mv3, {gap: 5, alignSelf: 'center'}]}>
        <Feather
          name="clock"
          color={Colors.text_grey}
          size={widthPercentageToDP(5)}
        />
        <Text
          style={{color: Colors.text_grey, fontFamily: Font.SemiBold}}>{`00 : ${
          timer > 9 ? timer : `0${timer}`
        }`}</Text>
      </View>
    );
  }, [timer]);
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ScrollView
        style={[styles.parentScroller, {paddingTop: heightPercentageToDP(2)}]}
        keyboardShouldPersistTaps="handled">
        <Text style={[styles.heading, {fontSize: FontSize.FONT_LARGE}]}>
          Email verification
        </Text>
        <Text style={styles.paragraph}>
          Enter the verification code we send you on: {route.params?.email}|
        </Text>
        <OtpInput
          numberOfDigits={4}
          focusColor={Colors.theme_bg}
          theme={{
            inputsContainerStyle: {padding: widthPercentageToDP(4)},
            pinCodeContainerStyle: {
              height: heightPercentageToDP(8),
              width: widthPercentageToDP(18),
            },
            pinCodeTextStyle: {
              color: Colors.black,
              fontSize: FontSize.FONT_XL,
              fontFamily: Font.Regular,
            },
          }}
          onTextChange={text => setOtp(text)}
        />
        {timer == 0 ? (
          <View style={[styles.mv3, styles.flexRow, styles.xCenter]}>
            <Text style={styles.dontHaveAccount}>Didn’t receive code? </Text>
            <Text
              onPress={resendHandler}
              style={{...styles.forgot, marginVertical: 0}}>
              Resend
            </Text>
          </View>
        ) : (
          timerShow
        )}

        {response.isLoading ? (
          <View
            style={{
              height: 50,
              width: '90%',
              alignSelf: 'center',
            }}>
            <LottieView
              source={assets.btn_loader}
              style={{width: '100%', height: '100%'}}
              autoPlay
              loop
            />
          </View>
        ) : (
          <TouchableOpacity
            disabled={otp.length !== 4}
            onPress={otpHandler}
            activeOpacity={0.8}
            style={[
              styles.button,
              styles.mt10,
              {opacity: otp.length !== 4 ? 0.5 : 1},
            ]}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        )}
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Wrong OTP"
          message="OTP you entered is wrong, Enter correct OTP to continue"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          onDismiss={() => setShowAlert(false)}
          titleStyle={{
            fontSize: FontSize.FONT_MEDIUM,
            fontFamily: Font.Medium,
            color: '#101010',
          }}
          messageStyle={{
            fontSize: FontSize.FONT_XS,
            fontFamily: Font.Regular,
            color: '#777',
            textAlign: 'center',
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTP;
