import { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Switch } from 'react-native';

import { TextInput } from 'react-native-element-textinput';
import { Colors } from '../../constants/colors';
import Button from '../../components/ui/Button';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

import IconButton from '../../components/ui/IconButton';

import { RulerPicker } from 'react-native-ruler-picker';

function KiloKayitEkrani({navigation,route}) {

  const { ad,dogumTarihi,cinsiyet,boy, boyBirimi} = route.params;

  const [kiloKg,setKiloKg] = useState(70.0);
  const [kiloLb,setKiloLb] = useState(170);

  const [isEnabled, setIsEnabled] = useState(false);

  function toggleSwitch(){

    setIsEnabled(previousState => !previousState);
  }

  function sonrakiEkran(){
    if(isEnabled){
      navigation.navigate('AktiviteDuzeyiKayitEkrani', {
        ad: ad,
        dogumTarihi: dogumTarihi,
        cinsiyet: cinsiyet,
        boy: boy,
        boyBirimi: boyBirimi,
        kilo: kiloLb,
        kiloBirimi: 'lb'
      });
    }
    else{
      navigation.navigate('AktiviteDuzeyiKayitEkrani', {
        ad: ad,
        dogumTarihi: dogumTarihi,
        cinsiyet: cinsiyet,
        boy: boy,
        boyBirimi: boyBirimi,
        kilo: kiloKg,
        kiloBirimi: 'kg'
      });
    }
      
  }
  
  let kgGoreCetvel =  <RulerPicker
      min={40}
      max={350}
      step={0.5}
      fractionDigits={1}
      initialValue={kiloKg}
      onValueChangeEnd={(number) => { 
        setKiloKg(parseFloat(number))
      }}
      unit="kg"
      height={windowHeight/4}
      indicatorHeight={62}
      shortStepHeight={16}
      longStepHeight={30}
      valueTextStyle={{
        fontSize: 20,
        fontWeight:'400'
      }}
      unitTextStyle={{
        fontSize: 20,
        height: 27,
        fontWeight:'400'
      }}
    />
  
  
  let lbGoreCetvel =  <RulerPicker
      min={85}
      max={700}
      step={1}
      fractionDigits={0}
      initialValue={kiloLb}
      onValueChangeEnd={(number) => { 
        setKiloLb(parseInt(number))
      }}
      unit="lb"
      height={windowHeight/4}
      indicatorHeight={62}
      shortStepHeight={16}
      longStepHeight={30}
      valueTextStyle={{
          fontSize: 20,
          fontWeight:'400'
      }}
      unitTextStyle={{
          fontSize: 20,
          height: 27,
          fontWeight:'400'
      }}
    />
  

  return(
      <View style={styles.enUstContainer}>
          <IconButton 
            icon="ios-arrow-back" 
            size={26} 
            color={Colors.colors.dark}
            onPress={()=>{navigation.goBack()}}
          />
          <View style={styles.container}> 
              <Text style={styles.text}>Kilonuz</Text>  
              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>kg</Text>
                <Switch
                  trackColor={{ true: '#b7b7b7'}}
                  thumbColor={isEnabled ? '#000000' : '#000000'}
                  onValueChange={toggleSwitch}
                  ios_backgroundColor="#b7b7b7"
                  value={isEnabled}
                  style={styles.switch}
                />      
                  <Text style={styles.switchText}>lb</Text>
              </View> 
              {!isEnabled && kgGoreCetvel }
              {isEnabled && lbGoreCetvel }
              <Button style={{width: '40%'}} textStyle={{fontSize: 15}} onPress={sonrakiEkran}>Sonraki</Button>   
          </View>
      </View>
   
  );
}

export default KiloKayitEkrani;

const styles = StyleSheet.create({
  enUstContainer:{
    marginTop: windowHeight/60
  },
  container: {
    marginTop: windowHeight/7,
    alignItems: 'center',
  },
  text:{ //margin bottom: 20 yi date time pickerdan yapabilirsin
    fontSize: windowHeight/25,
    marginBottom: 20
  },
  switchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: windowHeight/10,
    width: windowWidth/3
  },
  switchText:{
    fontSize: windowHeight/35
  },
});