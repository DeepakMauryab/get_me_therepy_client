import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Controller} from 'react-hook-form';
import styles from '../styles/style';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState} from 'react';

const InputBox = ({
  name,
  control,
  placeholder,
  label = false,
  rules = {required: label + ' Is Required'},
  isReq = true,
  textarea = false,
  lines = 2,
  bg = false,
  secure = false,
}) => {
  const [showText, setShowText] = useState(secure);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: {onChange, onBlur, value, ref},
        fieldState: {error},
      }) => {
        return (
          <View style={{marginBottom: 15}}>
            {label && (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.label}>{label}</Text>
                {isReq ? (
                  <Text style={[styles.label, {color: 'red'}]}>*</Text>
                ) : null}
              </View>
            )}
            <TextInput
              style={[
                styles.inputBox,
                {
                  backgroundColor: bg ? bg : '#fff',
                  borderColor: error ? 'red' : '#EDEDED',
                },
              ]}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              ref={ref}
              placeholderTextColor={'#878787'}
              multiline={textarea}
              numberOfLines={lines}
              textAlignVertical={textarea ? 'top' : 'center'}
              secureTextEntry={showText}
            />
            {secure && (
              <TouchableOpacity
                onPress={() => setShowText(!showText)}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  padding: wp(2.5),
                }}>
                <Entypo
                  name={showText ? 'eye' : 'eye-with-line'}
                  color={Colors.black}
                  size={wp(6)}
                />
              </TouchableOpacity>
            )}
            {error && (
              <Text style={styles.errorText}>{error?.message + '*'}</Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default InputBox;
