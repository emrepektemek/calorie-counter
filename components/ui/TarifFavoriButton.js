import { Pressable, StyleSheet, Image, View } from 'react-native';

function TarifFavoriButton({ imageStyle, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
        <View style={styles.container}>
            <Image 
                source={require('../../assets/favori.png')}
                style={{width:25,height:25, tintColor: 'white'}}
            />
        </View>
      
    </Pressable>
  );
}

export default TarifFavoriButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  container:{
    width:40,
    height:40, 
    borderRadius: 20,
    backgroundColor: '#ff0000ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressed: {
    opacity: 0.7,
  },

});
