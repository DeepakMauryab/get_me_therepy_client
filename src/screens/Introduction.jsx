import React, {useRef, useState} from 'react';
import Font from '../constants/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Screens from '../constants/screens';

const IntroScreen = ({navigation}) => {
  const _carousel = useRef();

  const navigate = () => {
    navigation.reset({
      index: 0,
      routes: [{name: Screens.login}],
    });
  };

  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const data = [
    {
      id: 1,
      title: 'We serve incomparable delicacies',
      description:
        'All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!',
      image: require('../assets/images/intro2.png'),
      bg: colors.theme_bg_three,
    },
    {
      id: 2,
      title: 'We serve incomparable delicacies',
      description:
        'All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!',
      image: require('../assets/images/intro1.png'),
      bg: colors.theme_bg_three,
    },
    {
      id: 3,
      title: 'We serve incomparable delicacies',
      description:
        'All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!',
      image: require('../assets/images/intro1.png'),
      bg: colors.theme_bg_three,
    },
  ];

  const _renderItem = ({item}) => {
    return (
      <ImageBackground
        source={item.image}
        resizeMode="cover"
        style={styles.slide}>
        <View
          style={{
            width: wp(85),
            height: hp(50),
            backgroundColor: colors.theme_bg,
            borderRadius: 20,
            padding: 20,
            position: 'absolute',
            bottom: hp(7),
          }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.description}</Text>
          <View
            style={{
              justifyContent: 'center',
              gap: 6,
              flexDirection: 'row',
              marginTop: 10,
            }}>
            {data.map(tab => (
              <View
                key={tab.id}
                style={{
                  ...styles.tabs,
                  backgroundColor:
                    tab.id === item.id ? colors.white : colors.text_grey,
                }}></View>
            ))}
          </View>
          {activeDotIndex !== data.length - 1 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                width: '100%',
                alignItems: 'center',
                bottom: hp(2),
                left: wp(5.5),
              }}>
              <TouchableOpacity
                // onPress={() => {
                //   _carousel.current.snapToItem(activeDotIndex - 1);
                // }}
                onPress={navigate}>
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: Font.Regular,
                    padding: 10,
                  }}>
                  Skip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                  padding: 10,
                }}
                onPress={() => {
                  _carousel.current.snapToItem(activeDotIndex + 1);
                  if (activeDotIndex === data.length - 1) {
                    // navigation.navigate(SCREENS.LOGIN);
                  }
                }}>
                <Text style={{color: colors.white, fontFamily: Font.Regular}}>
                  Next
                </Text>
                <AntDesign
                  name="arrowright"
                  color={colors.white}
                  size={wp(4)}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                width: wp(27),
                height: hp(12.3),
                borderRadius: wp(15),
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: colors.white,
                borderTopColor: 'transparent',
                marginTop: hp(4),
              }}>
              <TouchableOpacity
                onPress={navigate}
                style={{
                  backgroundColor: '#fff',
                  width: wp(20),
                  height: hp(9.3),
                  borderRadius: wp(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign
                  name="arrowright"
                  color={colors.theme_bg}
                  size={wp(7)}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <StatusBar translucent backgroundColor="transparent" />

      <Carousel
        ref={_carousel}
        data={data}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={index => setActiveDotIndex(index)}
      />
    </View>
  );
};

export default IntroScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textFieldcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 45,
  },
  textFieldIcon: {
    padding: 5,
  },
  textField: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    height: 45,
    backgroundColor: colors.theme_bg_three,
    fontSize: 14,
    color: colors.grey,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.theme_bg,
    width: '100%',
    height: 45,
  },
  flag_style: {
    width: 38,
    height: 24,
  },

  textFieldcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 45,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 96,
  },
  image: {
    width: 320,
    height: 320,
    marginTop: 32,
  },
  title: {
    fontSize: hp(4),
    color: colors.white,
    fontFamily: Font.Bold,
    textAlign: 'center',
  },
  text: {
    fontSize: hp(1.5),
    fontFamily: Font.Regular,
    color: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
  },
  tabs: {
    height: hp(0.8),
    width: wp(6),

    borderRadius: 10,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
