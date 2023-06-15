import { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { Colors } from '../../constants/colors';
import Button from '../../components/ui/Button';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {Picker} from '@react-native-picker/picker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

import IconButton from '../../components/ui/IconButton';


function AktiviteDuzeyiKayitEkrani({navigation,route}) {

    const { ad,dogumTarihi,cinsiyet,boy, boyBirimi,kilo,kiloBirimi} = route.params;

    const [secilenAktiviteDuzeyi, setSecilenAktiviteDuzeyi] = useState(1);

    
    function sonrakiEkran(){

       navigation.navigate('KayitEkrani', {
            ad: ad,
            dogumTarihi: dogumTarihi,
            cinsiyet: cinsiyet,
            boy: boy,
            boyBirimi : boyBirimi,
            kilo: kilo,
            kiloBirimi: kiloBirimi,
            aktiviteDuzeyi: secilenAktiviteDuzeyi
        });

    }

    let bilgi = 'Egzersiz 15-30 dakika arası yüksek kalp hızı aktivitesi anlamına gelmektedir';

    if(secilenAktiviteDuzeyi==1||secilenAktiviteDuzeyi==2 ||secilenAktiviteDuzeyi==3 ){
        bilgi = 'Egzersiz 15-30 dakika arası yüksek kalp hızı aktivitesi anlamına gelmektedir';
    }
    else if(secilenAktiviteDuzeyi==4 ||secilenAktiviteDuzeyi==5){
        bilgi = 'Yoğun egzersiz 45-120 dakika arası yüksek kalp hızı aktivitesi anlamına gelmektedir';
    }
    else if(secilenAktiviteDuzeyi==6){
        bilgi = 'Çok yoğun egzersiz 2 satten fazla yüksek kalp hızı aktivitesi anlamına gelmektedir';
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
            <Text style={styles.text}>Aktivite Düzeyiniz</Text>
            <Picker
                selectedValue={secilenAktiviteDuzeyi}
                onValueChange={(itemValue, itemIndex) =>
                    setSecilenAktiviteDuzeyi(itemValue)
                }
                style={{height: windowHeight/4, width: windowWidth}}
                itemStyle={{fontSize: windowWidth/26}}
            >
                <Picker.Item label="Az veya hiç egzersiz" value="1" />
                <Picker.Item label="Haftada 1-3 kez egzersiz" value="2" />
                <Picker.Item label="Haftada 4-5 kez egzersiz" value="3" />
                <Picker.Item label="Günlük egzersiz veya haftada 3-4 kez yoğun egzersiz" value="4" />
                <Picker.Item label="Haftada 6-7 kez yoğun egzersiz" value="5" />
                <Picker.Item label="Günlük çok yoğun egzersiz veya fiziksel iş" value="6" />
            </Picker>
            <Button style={{width: '40%'}} textStyle={{fontSize: 15}} onPress={sonrakiEkran}>Sonraki</Button>
            <View style={styles.bilgiContainer}>
                <View style={{flex:1}}>
                    <MaterialCommunityIcons style={{marginLeft:6,marginTop:2}} name="head-question-outline" size={windowHeight/24} color="black" />
                </View>
                <View style={{flex:7}}>
                    <Text style={styles.bilgiText}>{bilgi}</Text>
                </View>
            </View>
            </View>
        </View>  
    );
}

export default AktiviteDuzeyiKayitEkrani;

const styles = StyleSheet.create({
  enUstContainer:{
    marginTop: windowHeight/60
  },
  container: {
    marginTop: windowHeight/7,
    alignItems: 'center'
  },
  text:{ 
    fontSize: windowHeight/25
  },
  bilgiContainer:{
    marginTop: windowHeight/17,
    flexDirection: 'row',
  },
  bilgiText:{
    fontSize: windowHeight/40
  }
});