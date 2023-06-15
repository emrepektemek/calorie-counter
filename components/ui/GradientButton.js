import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';

import { LinearGradient } from 'expo-linear-gradient';

function GradientButton({ children, onPress, style, textStyle,gradientStyle,colors }) {


  return (
    <View>

      <LinearGradient
          colors={colors}
          style={[gradientStyle]}
      >
        <Pressable
          style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
          onPress={onPress}
        >
          <View>
            <Text style={[styles.buttonText,textStyle]}>{children}</Text>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
   
  );
}

export default GradientButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
});
