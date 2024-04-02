import {ScrollView, StatusBar, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import styles from '../../styles/style';
import InputBox from '../../components/InputBox';
import {useForm} from 'react-hook-form';
import Validation from '../../constants/Validation';
import Screens from '../../constants/screens';
import FontSize from '../../constants/FontSize';
import AwesomeAlert from 'react-native-awesome-alerts';
import Font from '../../constants/fonts';
import {useResetPasswordMutation} from '../../services/Services';

const ForgotPassword = ({navigation}) => {
  const {control, handleSubmit, getValues} = useForm();
  const [showAlert, setShowAlert] = useState(false);
  const [resetPassword] = useResetPasswordMutation();

  const forgotHandler = async () => {
    const {email} = getValues();
    try {
      const res = await resetPassword({email});
      if (res?.data?.success) {
        navigation.navigate(Screens.OTP, {
          email,
          otp: res.data?.data?.otp,
        });
      } else {
        setShowAlert(true);
      }
    } catch (error) {}
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ScrollView
        style={styles.parentScroller}
        keyboardShouldPersistTaps="handled">
        <Text style={[styles.heading, {fontSize: FontSize.FONT_LARGE}]}>
          Forgot password?
        </Text>
        <Text style={styles.paragraph}>
          Enter your email address and we’ll send you confirmation code to reset
          your password
        </Text>
        <InputBox
          control={control}
          name={'email'}
          placeholder={'Enter Email'}
          label="Email Address"
          rules={Validation.email}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSubmit(forgotHandler)}
          style={[styles.button, styles.mt10]}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Invalid Email"
          message="User with this email not found !"
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

export default ForgotPassword;
