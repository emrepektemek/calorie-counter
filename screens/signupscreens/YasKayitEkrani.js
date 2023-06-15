import { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { Colors } from '../../constants/colors';
import Button from '../../components/ui/Button';

const windowHeight = Dimensions.get('window').height;

import IconButton from '../../components/ui/IconButton';

import DateTimePicker from '@react-native-community/datetimepicker';

function YasKayitEkrani({navigation,route}) {

    const { ad } = route.params;
    const [dogumTarihi,setDogumTarihi] = useState(new Date());
    
    function sonrakiEkran(){
      navigation.navigate('CinsiyetKayitEkrani', {
        ad: ad,
        dogumTarihi: dogumTarihi.toISOString()
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
           
            <Text style={styles.text}>Doğum Tarihiniz</Text>
            <DateTimePicker 
              mode='date' 
              display='spinner'
              value={dogumTarihi}
              locale='tr-TR'
              onChange={(event, selectedDate)=>{
                const currentDate = selectedDate;
                setDogumTarihi(currentDate);
              }}
            />

            <Button style={{width: '40%',marginTop: 20}} textStyle={{fontSize: 15}} onPress={sonrakiEkran}>Sonraki</Button> 
        </View>
      </View>
   
  );
}

export default YasKayitEkrani;

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
    marginBottom: 30
  },
});