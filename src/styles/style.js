import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Font from '../constants/fonts';
import Colors from '../constants/colors';
import FontSize from '../constants/FontSize';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
  heading: {
    color: '#101010',
    fontSize: FontSize.FONT_5,
    fontFamily: Font.Medium,
  },
  paragraph: {
    color: '#878787',
    fontSize: FontSize.FONT_SS,
    fontFamily: Font.Regular,
    marginBottom: hp(5),
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'red',
    gap: 50,
  },
  backButton: {
    borderRadius: wp(8),
    borderWidth: 0.5,
    borderColor: '#EDEDED',
    width: wp(11),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.black,
    fontFamily: Font.SemiBold,
    fontSize: FontSize.FONT_2,
    // textAlign: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  parentScroller: {
    backgroundColor: Colors.white,
    width: '100%',
    minHeight: '100%',
    paddingVertical: hp(5),
    paddingHorizontal: wp(6),
  },
  inputBox: {
    backgroundColor: '#fff',
    fontFamily: Font.Regular,
    color: '#000',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.1),
    marginTop: 10,
    borderRadius: 4,
    borderWidth: 0.5,
  },
  label: {
    color: '#101010',
    fontFamily: Font.Medium,
    fontSize: FontSize.FONT_SMALL,
  },
  errorText: {
    position: 'absolute',
    left: 0,
    top: '100%',
    marginLeft: 10,
    color: 'red',
    fontFamily: Font.Regular,
    fontSize: hp(1.4),
  },
  forgot: {
    color: Colors.theme_bg,
    fontSize: FontSize.FONT_SMALL,
    fontFamily: Font.SemiBold,
    textAlign: 'right',
    marginVertical: wp(4),
  },
  button: {
    backgroundColor: Colors.theme_bg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(3),
    borderRadius: wp(5),
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.FONT_SMALL,
    fontFamily: Font.SemiBold,
    letterSpacing: 0.2,
  },
  mt3: {
    marginTop: hp(3),
  },
  mt2: {
    marginTop: hp(2),
  },
  lineForText: {
    marginVertical: hp(4),
    width: '100%',
    borderColor: '#878787',
    borderTopWidth: 0.3,
  },
  lineText: {
    position: 'absolute',
    color: '#878787',
    top: hp(-1.3),
    left: '50%',
    textAlign: 'center',
    transform: [{translateX: -50}],
    backgroundColor: Colors.white,
    paddingHorizontal: 5,
    fontFamily: Font.Medium,
  },
  dontHaveAccount: {
    color: '#101010',
    fontFamily: Font.Medium,
    fontSize: FontSize.FONT_SMALL,
  },
  mv3: {
    marginVertical: hp(3),
  },
  mt10: {
    marginVertical: hp(10),
  },
  flexRow: {
    flexDirection: 'row',
  },
  xCenter: {
    justifyContent: 'center',
  },
  accept: {
    color: '#101010',
    fontFamily: Font.SemiBold,
    fontSize: FontSize.FONT_SS,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default styles;
