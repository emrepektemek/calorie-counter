import { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Switch } from 'react-native';

import { Colors } from '../../constants/colors';
import Button from '../../components/ui/Button';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

import IconButton from '../../components/ui/IconButton';

import { RulerPicker } from 'react-native-ruler-picker';

function BoyKayitEkrani({navigation,route}) {

  const { ad,dogumTarihi,cinsiyet } = route.params;

  const [boycm,setBoyCm] = useState(170);
  const [boyft,setBoyFt] = useState(5.0);

  const [isEnabled, setIsEnabled] = useState(false);

  function toggleSwitch(){
    setIsEnabled(previousState => !previousState);
  }

  function sonrakiEkran(){

    if(isEnabled){
      navigation.navigate('KiloKayitEkrani', {
        ad: ad,
        dogumTarihi: dogumTarihi,
        cinsiyet: cinsiyet,
        boy: boyft,
        boyBirimi: 'ft'
      });
    }
    else{
      navigation.navigate('KiloKayitEkrani', {
        ad: ad,
        dogumTarihi: dogumTarihi,
        cinsiyet: cinsiyet,
        boy: boycm,
        boyBirimi: 'cm'
      });
    }
  }
  
  let cmGoreCetvel =  <RulerPicker
      min={90}
      max={240}
      step={1}
      fractionDigits={0}
      initialValue={boycm}
      onValueChangeEnd={(number) => setBoyCm(parseInt(number))}
      unit="cm"
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
      decelerationRate={0}
  />
  
  
  let ftGoreCetvel=  <RulerPicker
      min={4}
      max={8}
      step={0.1}
      fractionDigits={1}
      initialValue={boyft}
      onValueChangeEnd={(number) => setBoyFt(parseFloat(number))}
      unit="ft"
      height={windowHeight/4}
      indicatorHeight={62}
      shortStepHeight={16}
      longStepHeight={30}
      gapBetweenSteps={35}
      valueTextStyle={{
        fontSize: 20,
        fontWeight:'400'
      }}
      unitTextStyle={{
        fontSize: 20,
        height: 27,
        fontWeight:'400'
      }}
      decelerationRate={0}
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
        <Text style={styles.text}>Boyunuz</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>cm</Text>
          <Switch
            trackColor={{ true: '#b7b7b7'}}
            thumbColor={isEnabled ? '#000000' : '#000000'}
            onValueChange={toggleSwitch}
            ios_backgroundColor="#b7b7b7"
            value={isEnabled}
            style={styles.switch}
          />     
          <Text style={styles.switchText}>ft</Text>
        </View>    
        {!isEnabled && cmGoreCetvel }
        {isEnabled && ftGoreCetvel }
        <Button style={{width: '40%'}} textStyle={{fontSize: 15}} onPress={sonrakiEkran}>Sonraki</Button> 
      </View>
    </View>
  );
}

export default BoyKayitEkrani;

const styles = StyleSheet.create({
  enUstContainer:{
    marginTop: windowHeight/60,
  },
  container: {
    marginTop: windowHeight/7,
    alignItems: 'center'
  },
  text:{
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