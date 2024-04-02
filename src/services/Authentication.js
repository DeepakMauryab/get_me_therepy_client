import Screens from '../constants/screens';
import auth from '@react-native-firebase/auth';
import {addUser} from '../redux/User.slice';

export const loginUser = async (email, password, navigation, dispatch) => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    setUserDataWithSuccess(res.user, navigation, dispatch);
    return true;
  } catch (error) {
    return false;
  }
};
export const registerUser = async (
  email,
  username,
  password,
  navigation,
  dispatch,
) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, password);
    res.user.updateProfile({
      displayName: username,
    });
    const user = Object.assign({}, res.user?._user);
    user.displayName = username;
    setUserDataWithSuccess(user, navigation, dispatch);
    return true;
  } catch (error) {
    return false;
  }
};

export const setUserDataWithSuccess = async (user, navigation, dispatch) => {
  dispatch(addUser(user));
  navigation.reset({
    index: 0,
    routes: [{name: Screens.success, params: {from: 'login'}}],
  });
};
