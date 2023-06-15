import { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { TextInput } from 'react-native-element-textinput';
import { Colors } from '../../constants/colors';
import Button from '../../components/ui/Button';

const windowHeight = Dimensions.get('window').height;

import IconButton from '../../components/ui/IconButton';

function AdKayitEkrani({navigation}) {

  const [ad, setAd] = useState(' ');

  function sonrakiEkran(){
    navigation.navigate('YasKayitEkrani', {
      ad: ad,
    });
  }

  return(

    <View style={styles.enUstContainer}>
      <IconButton 
        icon="ios-arrow-back" 
        size={26} 
        color={Colors.colors.dark}
        onPress={()=>{navigation.navigate('GirisEkrani')}}
      />
    <View style={styles.container}>   
      <Text style={styles.text}>Adınız</Text>
      <TextInput
        value={ad}
        style={styles.input}
        inputStyle={styles.inputStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        placeholder="Adınızı Giriniz"
        placeholderTextColor= {Colors.colors.dark}
        focusColor= {Colors.colors.dark}
        maxLength={20}
        onChangeText={text => {
          setAd(text);
        }}
      />
      <Button style={{width: '40%'}} textStyle={{fontSize: 15}} onPress={sonrakiEkran}>Sonraki</Button> 
     </View>
    </View>
   
  );
}

export default AdKayitEkrani;

const styles = StyleSheet.create({
  enUstContainer:{
    marginTop: windowHeight/60
  },
  container: {
    marginTop: windowHeight/6,
    alignItems: 'center'
  },
  text:{
    fontSize: windowHeight/25,
    marginBottom: 20
  },
  input: {
    height: windowHeight/15,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.colors.textInputKenar,
    width: '80%',
    marginBottom: 20,
  },
  inputStyle: { 
    fontSize: 16 
  },
  placeholderStyle: { 
    fontSize: 16 
  },
  textErrorStyle: { 
    fontSize: 16 
  },
});