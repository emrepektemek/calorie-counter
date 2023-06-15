import { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { Colors } from '../../constants/colors';
import Button from '../../components/ui/Button';

const windowHeight = Dimensions.get('window').height;

import IconButton from '../../components/ui/IconButton';


function CinsiyetKayitEkrani({navigation,route}) {

    const { ad,dogumTarihi } = route.params;
    
    function sonrakiEkran(cinsiyet){

      navigation.navigate('BoyKayitEkrani', {
        ad: ad,
        dogumTarihi: dogumTarihi,
        cinsiyet: cinsiyet
      });

    }

    return(

    <View style={styles.enUstContainer}>
        <IconButton 
        icon="ios-arrow-back" 
        size={26} 
        color={Colors.colors.dark}
        onPress={()=>{navigation.goBack()}}
        />
        <View style={styles.container}>   
          <Text style={styles.text}>Cinsiyetiniz</Text>
          <Button 
              style={{
                  width: '65%',
                  height: '21%',
                  justifyContent: 'center',
                  borderRadius: 6,
                  borderWidth: 0.5,
                  borderWidth: 0.8
              }} 
              textStyle={{
                  fontSize: 15,
                  alignItems:'center',      
              }} 
              onPress={sonrakiEkran.bind(this,1)}>ERKEK</Button> 
            <Button 
              style={{
                width: '65%',
                height: '21%',
                marginTop:20,
                justifyContent: 'center',       
                borderRadius: 6,
                borderWidth: 0.5,
                borderWidth: 0.8
              }} 
              textStyle={{
                fontSize: 15,
                alignItems:'center',
              }} 
              onPress={sonrakiEkran.bind(this,2)}>KADIN</Button>  
        </View>
    </View>
   
);
}

export default CinsiyetKayitEkrani;

const styles = StyleSheet.create({
  enUstContainer:{
    marginTop: windowHeight/60
  },
  container: {
    marginTop: windowHeight/7,
    alignItems: 'center'
  },
  text:{ //margin bottom: 20 yi date time pickerdan yapabilirsin
    fontSize: windowHeight/25,
    marginBottom: 25
  },
});