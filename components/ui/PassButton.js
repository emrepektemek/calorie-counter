import { Pressable, StyleSheet, Text } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

function PassButton({ icon, color, size, onPress, children, textStyle }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={[textStyle, {marginRight: 10}]}>{children}</Text>
      <Fontisto name={icon} color={color} size={size} />
    </Pressable>
  );
}

export default PassButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressed: {
    opacity: 0.7,
  },
});