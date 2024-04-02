import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import styles from '../../styles/style';
import InputBox from '../../components/InputBox';
import {useForm} from 'react-hook-form';
import Validation, {confirmPassMessage} from '../../constants/Validation';
import Screens from '../../constants/screens';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useResetPasswordConfirmMutation} from '../../services/Services';
import LottieView from 'lottie-react-native';
import assets from '../../assets';

const ResetPassword = ({navigation, route}) => {
  const {control, getValues, handleSubmit, watch} = useForm();
  const [resetPasswordConfirm, response] = useResetPasswordConfirmMutation();
  const loginHandler = async () => {
    const {password} = getValues();
    const res = await resetPasswordConfirm({
      email: route.params.email,
      password,
    });
    if (res.data?.success) {
      navigation.navigate(Screens.success, {from: 'reset'});
    } else {
      Alert.alert('something went wrong');
    }
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ScrollView
        style={[styles.parentScroller, {paddingTop: heightPercentageToDP(2)}]}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Reset Password</Text>
        <Text style={styles.paragraph}>
          Your new password must be different from the previously used password
        </Text>
        <InputBox
          control={control}
          name={'password'}
          placeholder={'Enter new password'}
          label="New Password"
          rules={Validation.password}
          secure
        />
        <InputBox
          control={control}
          name={'confirm'}
          placeholder={'Confirm Password'}
          label="Confirm Password"
          secure
          rules={{
            validate: val => {
              if (watch('password') != val) {
                return confirmPassMessage;
              }
            },
          }}
        />

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
            activeOpacity={0.8}
            onPress={handleSubmit(loginHandler)}
            style={[styles.button, {marginTop: heightPercentageToDP(10)}]}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
