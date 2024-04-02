import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../constants/screens';
import IntroScreen from '../screens/Introduction';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OTP from '../screens/auth/OTP';
import ResetPassword from '../screens/auth/ResetPassword';
import Font from '../constants/fonts';
import FontSize from '../constants/FontSize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../styles/style';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Success from '../screens/Success';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const navigation = useNavigation();
  const {user} = useSelector(s => s.UserSlice);

  return (
    <Stack.Navigator
      initialRouteName={user != null ? Screens.success : Screens.introduction}
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontFamily: Font.SemiBold,
          fontSize: FontSize.FONT_MEDIUM,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            style={styles.backButton}>
            <Feather
              name="chevron-left"
              color={'#101010'}
              size={widthPercentageToDP(7)}
            />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name={Screens.introduction} component={IntroScreen} />
      <Stack.Screen name={Screens.login} component={Login} />
      <Stack.Screen name={Screens.signUp} component={SignUp} />
      <Stack.Screen name={Screens.forgot} component={ForgotPassword} />
      <Stack.Screen
        name={Screens.success}
        component={Success}
        initialParams={{
          from: 'login',
        }}
      />
      <Stack.Screen
        name={Screens.OTP}
        component={OTP}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={Screens.resetPassword}
        component={ResetPassword}
        options={{
          headerShown: true,
          title: 'Reset Password',
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
