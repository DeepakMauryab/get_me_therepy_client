import {Text, View} from 'react-native';
import styles from '../styles/style';

const TextOnLine = ({text = ''}) => {
  return (
    <View style={styles.lineForText}>
      <Text style={styles.lineText}>{text}</Text>
    </View>
  );
};

export default TextOnLine;
