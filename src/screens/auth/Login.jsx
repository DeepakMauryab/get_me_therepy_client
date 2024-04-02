import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import styles from '../../styles/style';
import InputBox from '../../components/InputBox';
import {useForm} from 'react-hook-form';
import Validation from '../../constants/Validation';
import TextOnLine from '../../components/TextOnLine';
import Screens from '../../constants/screens';
import AwesomeAlert from 'react-native-awesome-alerts';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/fonts';
// import createEvent from '../../services/GoogleCalendar';
import {useDispatch} from 'react-redux';
import {
  useCreateUserMutation,
  useGoogleAuthMutation,
  useLoginUserMutation,
} from '../../services/Services';
import {setUserDataWithSuccess} from '../../services/Authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '155533693467-voc18cs25vgga9fkh3jtnfe7195t9mer.apps.googleusercontent.com',
});

const Login = ({navigation}) => {
  const {control, handleSubmit, getValues} = useForm();
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Invalid Credentials');
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();
  const [googleAuth] = useGoogleAuthMutation();
  const loginHandler = async () => {
    const {email, password} = getValues();
    const res = await loginUser({email, password});
    if (res?.data?.success) {
      setUserDataWithSuccess(res.data?.data?.customer, navigation, dispatch);
    } else if (res.error?.status === 404) {
      setErrorMsg('Wrong Password');
      setShowAlert(true);
    } else if (res.error?.status === 400) {
      setErrorMsg('Invalid Credentials');
      setShowAlert(true);
    }
  };
  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {email, name: username} = userInfo.user;
      const res = await googleAuth({email, username});
      if (res?.data?.success) {
        setUserDataWithSuccess(res?.data?.data?.customer, navigation, dispatch);
      }
    } catch (error) {
      Alert.alert('Something Went Wrong');
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ScrollView
        style={styles.parentScroller}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Login to your account.</Text>
        <Text style={styles.paragraph}>Please sign in to your account </Text>
        <InputBox
          control={control}
          name={'email'}
          placeholder={'Enter Email'}
          label="Email Address"
          rules={Validation.email}
        />
        <InputBox
          control={control}
          name={'password'}
          placeholder={'Password'}
          label="Password"
          secure
          rules={Validation.password}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.forgot)}
          activeOpacity={0.8}
          style={{alignSelf: 'flex-end'}}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSubmit(loginHandler)}
          style={[styles.button, styles.mt2]}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TextOnLine text={'Or sign in with'} />

        <TouchableOpacity
          onPress={() => googleLogin(navigation, dispatch)}
          activeOpacity={0.8}
          style={{alignSelf: 'center'}}>
          <Image source={require('../../assets/icons/google.png')} />
        </TouchableOpacity>
        <View style={[styles.mv3, styles.flexRow, styles.xCenter]}>
          <Text style={styles.dontHaveAccount}>Don't have an account? </Text>
          <Text
            onPress={() => {
              navigation.navigate(Screens.signUp);
            }}
            style={{...styles.forgot, marginVertical: 0}}>
            Register
          </Text>
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={errorMsg}
          message="Enter Correct details to login"
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
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
