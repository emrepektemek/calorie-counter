import { Pressable, StyleSheet, Image } from 'react-native';

function FilterIcon({ imageStyle, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Image 
        source={require('../../assets/filtericon.png')}
        style={imageStyle}
      />
    </Pressable>
  );
}

export default FilterIcon;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },

});
