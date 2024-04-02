import {
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
import CheckBox from 'react-native-check-box';
import {setUserDataWithSuccess} from '../../services/Authentication';
import AwesomeAlert from 'react-native-awesome-alerts';
import Font from '../../constants/fonts';
import FontSize from '../../constants/FontSize';
import {useDispatch} from 'react-redux';
import {
  useCreateEventMutation,
  useCreateUserMutation,
  useGoogleAuthMutation,
} from '../../services/Services';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import LottieView from 'lottie-react-native';
import assets from '../../assets';

GoogleSignin.configure({
  webClientId:
    '155533693467-voc18cs25vgga9fkh3jtnfe7195t9mer.apps.googleusercontent.com',
});

const SignUp = ({navigation}) => {
  const {control, handleSubmit, getValues} = useForm();
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // rtk queries
  const [createUser, response1] = useCreateUserMutation();
  const [googleAuth, response2] = useGoogleAuthMutation();
  const [createEvent, response3] = useCreateEventMutation();

  const loginHandler = async () => {
    if (!toggleCheckBox) {
      setAcceptPrivacy(true);
      return;
    }
    const {email, username, password} = getValues();
    const res = await createUser({email, username, password});
    if (res?.data?.success) {
      addEvent(username, email);
      setUserDataWithSuccess(res.data?.newCustomer, navigation, dispatch);
    } else if (res.error?.status === 400) {
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
        addEvent(username, email);
        setUserDataWithSuccess(res?.data?.data?.customer, navigation, dispatch);
      }
    } catch (error) {
      Alert.alert('Something Went Wrong');
    }
  };

  const addEvent = async (username, email) => {
    const res = await createEvent({username, email});
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ScrollView
        style={styles.parentScroller}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Create your new account</Text>
        <Text style={styles.paragraph}>
          Create an account to start looking for the food you like
        </Text>
        <InputBox
          control={control}
          name={'email'}
          placeholder={'Enter Email'}
          label="Email Address"
          rules={Validation.email}
        />
        <InputBox
          control={control}
          name={'username'}
          placeholder={'Enter User Name'}
          label="User name"
        />
        <InputBox
          control={control}
          name={'password'}
          placeholder={'Password'}
          label="Password"
          secure
          rules={Validation.password}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <CheckBox
            onClick={() => {
              setToggleCheckBox(!toggleCheckBox);
              setAcceptPrivacy(toggleCheckBox);
            }}
            isChecked={toggleCheckBox}
            checkedCheckBoxColor={Colors.theme_bg}
            uncheckedCheckBoxColor={Colors.theme_bg}
          />
          <Text style={styles.accept}>
            I Agree with{' '}
            <Text style={[styles.accept, {color: Colors.theme_bg}]}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={[styles.accept, {color: Colors.theme_bg}]}>
              Privacy Policy
            </Text>
            {acceptPrivacy && (
              <Text style={styles.errorText}> Please Accept T&C*</Text>
            )}
          </Text>
        </View>

        {response1.isLoading || response3.isLoading ? (
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
            style={[styles.button, styles.mt2]}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        )}

        <TextOnLine text={'Or sign in with'} />

        {response2.isLoading ? (
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
            onPress={googleLogin}
            activeOpacity={0.8}
            style={{alignSelf: 'center'}}>
            <Image source={require('../../assets/icons/google.png')} />
          </TouchableOpacity>
        )}
        <View style={[styles.mv3, styles.flexRow, styles.xCenter]}>
          <Text style={styles.dontHaveAccount}>Have an account? </Text>
          <Text
            onPress={() => {
              navigation.navigate(Screens.login);
            }}
            style={{...styles.forgot, marginVertical: 0}}>
            Sign In
          </Text>
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Email already exists !"
          message="User already exists with this email."
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

export default SignUp;
