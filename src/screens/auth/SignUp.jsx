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
import {useCreateUserMutation} from '../../services/Services';

const SignUp = ({navigation}) => {
  const {control, handleSubmit, getValues} = useForm();
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [createUser] = useCreateUserMutation();
  const loginHandler = async () => {
    if (!toggleCheckBox) {
      setAcceptPrivacy(true);
      return;
    }
    const {email, username, password} = getValues();
    const res = await createUser({email, username, password});

    if (res?.data?.success) {
      setUserDataWithSuccess(res.data?.newCustomer, navigation, dispatch);
    } else if (res.error?.status === 400) {
      setShowAlert(true);
    }
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

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSubmit(loginHandler)}
          style={[styles.button, styles.mt2]}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TextOnLine text={'Or sign in with'} />

        <TouchableOpacity activeOpacity={0.8} style={{alignSelf: 'center'}}>
          <Image source={require('../../assets/icons/google.png')} />
        </TouchableOpacity>
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
