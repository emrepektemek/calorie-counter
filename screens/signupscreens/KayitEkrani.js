import AuthContent from '../../components/Auth/AuthContent';

import { useState } from 'react';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { Alert, View,StyleSheet,Dimensions } from 'react-native';

import { Colors } from '../../constants/colors';

import IconButton from '../../components/ui/IconButton';

import { kayitOl } from '../../firebase/auth';

import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { getDbObject } from '../../firebase/FireBaseObjects';

const windowHeight = Dimensions.get('window').height;

function KayitEkrani({navigation,route}) {

  const [isAuthenticating , setIsAuthenticating ] = useState(false);

  const { ad,dogumTarihi,cinsiyet,boy, boyBirimi,kilo,kiloBirimi,aktiviteDuzeyi } = route.params;

  async function signupHandler({email , password}){
    
    setIsAuthenticating(true);
    try {

      const db = getDbObject();
      
      const id = await kayitOl(email,password);

      const docRef = await addDoc(collection(db, "kullanicibilgileri"), {
        userId: id.user.uid,
        ad: ad,
        dogumTarihi: Timestamp.fromDate(new Date(dogumTarihi)),
        cinsiyet: cinsiyet,
        boy: boy,
        boyBirimi: boyBirimi,
        kilo: kilo,
        kiloBirimi: kiloBirimi,
        aktiviteDuzeyi: aktiviteDuzeyi,
        eklemeTarihi: Timestamp.fromDate(new Date())
      });

      navigation.replace('GirisEkrani2',{ 
        email: email, password: password
      });

    } catch (error) {
      console.log(error);
      console.log(typeof(error));
      Alert.alert('Kayıt olunamadı lütfen internet bağlantınızı kontrol ediniz ve tekrar deneyiniz');
      setIsAuthenticating(false);
    }
   
  }

  if(isAuthenticating){

    return(
      <LoadingOverlay message="Kayıt Olunuyor..."/>
    );
  }

  return(

    <View style={styles.enUstContainer}>
      <IconButton 
          icon="ios-arrow-back" 
          size={26} 
          color={Colors.colors.dark}
          onPress={()=>{navigation.goBack()}}
      />
      <AuthContent 
        onAuthenticate={signupHandler}
      />
    </View>
   
    
  );
}

export default KayitEkrani;

const styles = StyleSheet.create({
  enUstContainer:{
    marginTop: windowHeight/60
  },
});
