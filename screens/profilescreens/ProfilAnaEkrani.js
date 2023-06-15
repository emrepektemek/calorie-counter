import { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions, ScrollView, Image, TextInput, Pressable, Alert } from "react-native";

import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import LoadingOverlay from "../../components/ui/LoadingOverlay";

import FavoriteButton from "../../components/ui/FavoriteButton";
import Button from "../../components/ui/Button";

import SwitchSelector from 'react-native-switch-selector';
import DropDownPicker from "react-native-dropdown-picker";

import { AntDesign } from '@expo/vector-icons';

import { getTodayDateWithoutClock } from '../../util/date';

import { getDbObject } from "../../firebase/FireBaseObjects";

import { doc, updateDoc, Timestamp } from "firebase/firestore";


import { AuthContext } from "../../store/auth-context";
import { UserDataContext } from "../../store/user-data-context";


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let profilFotografi;
let aktiviteDuzeyiAdi;
let aktiviteBilgi;

const options = [
    { label: "Erkek", value: 1},
    { label: "Kadın", value: 2}
];

function ProfilAnaEkrani(){

    const authCtx = useContext(AuthContext);
    const userDataCtx = useContext(UserDataContext);

    const [guncellendiMi , setGuncellendiMi ] = useState(true);

    const [kullaniciAdi , setKullaniciAdi ] = useState(userDataCtx.UserData.ad);
    const [kullaniciDogumTarihi , setKullaniciDogumTarihi] = useState(userDataCtx.UserData.dogumTarihi);
    const [kullaniciBoy, setKullaniciBoy] = useState(userDataCtx.UserData.boy);
    const [kullaniciKilo , setKullaniciKilo ] = useState(userDataCtx.UserData.kilo);
    const [kullaniciCinsiyet , setKullaniciCinsiyet ] = useState(userDataCtx.UserData.cinsiyet);
    const [kullaniciAktiviteDuzeyi , setKullaniciAktiviteDuzeyi ] = useState(userDataCtx.UserData.aktiviteDuzeyi);

    const [adModal , setAdModal] = useState(false);
    const [dogumTarihiModal , setDogumTarihiModal] = useState(false);
    const [boyModal , setBoyModal] = useState(false);
    const [kiloModal , setKiloModal] = useState(false);
    const [aktiviteDuzeyiModal , setAktiviteDuzeyiModal] = useState(false);
    const [aktiviteDuzeyiDropDownPicker , setAktiviteDuzeyiDropDownPicker] = useState(false);

    const db = getDbObject();

    function adModalAc(){
        setAdModal(true);
    }
   
    function adModalKapat(){
        setAdModal(!adModal);
        setKullaniciAdi(userDataCtx.UserData.ad);
    }

    function dogumTarihiModalAc(){
        setDogumTarihiModal(true);
    }
    
    function dogumTarihiModalKapat(){
        setDogumTarihiModal(false);
    }

    function boyModalAc(){
        setBoyModal(true);
    }

    function boyModalKapat(){
        setBoyModal(false);
        setKullaniciBoy(userDataCtx.UserData.boy);
    }

    function kiloModalAc(){
        setKiloModal(true);
    }

    function kiloModalKapat(){
        setKiloModal(false);
        setKullaniciKilo(userDataCtx.UserData.kilo);
    }

    function aktiviteDuzeyiModalAc(){
        setAktiviteDuzeyiModal(true);
    }

    function aktiviteDuzeyiModalKapat(){
        setAktiviteDuzeyiDropDownPicker(false);
        setAktiviteDuzeyiModal(false);
        setKullaniciAktiviteDuzeyi(userDataCtx.UserData.aktiviteDuzeyi);
    }

    async function adDuzenlemeyiKaydet(){

        setGuncellendiMi(false);

        try {

            const referans = doc(db, "kullanicibilgileri",userDataCtx.BelgeId);

            await updateDoc(referans, {
                ad: kullaniciAdi
            });

        } catch (error) {
            console.log(error.toString())
            Alert.alert('Adınız güncellenemedi lütfen internet bağlantınızı kontrol ediniz.');
        }

        userDataCtx.adGuncelle(kullaniciAdi);

        setAdModal(!adModal);

        setGuncellendiMi(true); 
    }

    async function dogumTarihiGuncelle(date){

        setGuncellendiMi(false);

        try {

            const referans = doc(db, "kullanicibilgileri",userDataCtx.BelgeId);

            await updateDoc(referans, {
                dogumTarihi: Timestamp.fromDate(date)
            });

        } catch (error) {
            console.log(error.toString())
            Alert.alert('Cinsiyetiniz güncellenemedi lütfen internet bağlantınızı kontrol ediniz.');
        }

        setKullaniciDogumTarihi(Timestamp.fromDate(date));

        userDataCtx.dogumTarihiGuncelle(Timestamp.fromDate(date));

        setDogumTarihiModal(!dogumTarihiModal);

        setGuncellendiMi(true);
    }

    async function boyDuzenlemeyiKaydet(){

        setGuncellendiMi(false);

        try {

            const referans = doc(db, "kullanicibilgileri",userDataCtx.BelgeId);

            await updateDoc(referans, {
                boy: parseInt(kullaniciBoy)
            });

        } catch (error) {
            console.log(error.toString())
            Alert.alert('Adınız güncellenemedi lütfen internet bağlantınızı kontrol ediniz.');
        }
       
        userDataCtx.boyGuncelle(parseInt(kullaniciBoy));

        setKullaniciBoy(parseInt(kullaniciBoy));

        setBoyModal(!boyModal);

        setGuncellendiMi(true); 
    }

    async function kiloDuzenlemeyiKaydet(){

        setGuncellendiMi(false);

        try {

            const referans = doc(db, "kullanicibilgileri",userDataCtx.BelgeId);

            await updateDoc(referans, {
                kilo: parseInt(kullaniciKilo)
            });

        } catch (error) {
            console.log(error.toString())
            Alert.alert('Kilonuz güncellenemedi lütfen internet bağlantınızı kontrol ediniz.');
        }
       
        userDataCtx.kiloGuncelle(parseInt(kullaniciKilo));

        setKullaniciKilo(parseInt(kullaniciKilo));

        setKiloModal(!kiloModal);

        setGuncellendiMi(true); 
    }

    async function aktiviteDuzeyiDuzenlemeyiKaydet(){

        setGuncellendiMi(false);

        try {

            const referans = doc(db, "kullanicibilgileri",userDataCtx.BelgeId);

            await updateDoc(referans, {
                aktiviteDuzeyi: kullaniciAktiviteDuzeyi
            });

        } catch (error) {
            console.log(error.toString())
            Alert.alert('Aktivite düzeyiniz güncellenemedi lütfen internet bağlantınızı kontrol ediniz.');
        }
       
        userDataCtx.aktiviteDuzeyiGuncelle(kullaniciAktiviteDuzeyi);

        setKullaniciAktiviteDuzeyi(kullaniciAktiviteDuzeyi);

        setAktiviteDuzeyiModal(!aktiviteDuzeyiAdi);

        setGuncellendiMi(true); 
    }

    if(!guncellendiMi){
        return(
            <LoadingOverlay color="black" />
        );
    }

    async function cinsiyetDegistir(cinsiyet){

        try {

            const referans = doc(db, "kullanicibilgileri",userDataCtx.BelgeId);

            await updateDoc(referans, {
                cinsiyet: cinsiyet
            });

        } catch (error) {
            console.log(error.toString())
            Alert.alert('Cinsiyetiniz güncellenemedi lütfen internet bağlantınızı kontrol ediniz.');
        }
        setKullaniciCinsiyet(cinsiyet);
        userDataCtx.cinsiyetGuncelle(cinsiyet);
    }
    

    if(userDataCtx.UserData.cinsiyet == 1){
        profilFotografi = 
            <View style={styles.profilImageContainer}>
                <Image 
                    source={require('../../assets/profilerkek.png')}
                    style={styles.profilImage}
                />
            </View>
           
    }
    else{
        profilFotografi = 
            <View style={styles.profilImageContainer}>
                <Image 
                    source={require('../../assets/profilkadin.png')}
                    style={styles.profilImage}
                />
            </View>
          
    }

    if(userDataCtx.UserData.aktiviteDuzeyi == "1"){
        aktiviteDuzeyiAdi = "Az veya hiç egzersiz";
    }
    else if(userDataCtx.UserData.aktiviteDuzeyi == "2"){
        aktiviteDuzeyiAdi = "Haftada 1-3 kez egzersiz";
    }
    else if(userDataCtx.UserData.aktiviteDuzeyi == "3"){
        aktiviteDuzeyiAdi = "Haftada 4-5 kez egzersiz";
    }
    else if(userDataCtx.UserData.aktiviteDuzeyi == "4"){
        aktiviteDuzeyiAdi = "Günlük egzersiz veya haftada 3-4 kez yoğun egzersiz";
    }
    else if(userDataCtx.UserData.aktiviteDuzeyi == "5"){
        aktiviteDuzeyiAdi = "Haftada 6-7 kez yoğun egzersiz";
    }
    else if(userDataCtx.UserData.aktiviteDuzeyi == "6"){
        aktiviteDuzeyiAdi = "Günlük çok yoğun egzersiz veya fiziksel iş";
    }
    

    if(kullaniciAktiviteDuzeyi == "1"){
        aktiviteBilgi = 'Egzersiz 15-30 dakika arası yüksek kalp hızı aktivitesi anlamına gelmektedir';
    }
    else if(kullaniciAktiviteDuzeyi == "2"){
        aktiviteBilgi = 'Egzersiz 15-30 dakika arası yüksek kalp hızı aktivitesi anlamına gelmektedir';
    }
    else if(kullaniciAktiviteDuzeyi == "3"){
        aktiviteBilgi = 'Egzersiz 15-30 dakika arası yüksek kalp hızı aktivitesi anlamına gelmektedir';
    }
    else if(kullaniciAktiviteDuzeyi == "4"){
        aktiviteBilgi = 'Yoğun egzersiz 45-120 dakika arası yüksek kalp hızı aktivitesi anlamına gelmektedir';
    }
    else if(kullaniciAktiviteDuzeyi == "5"){
        aktiviteBilgi = 'Yoğun egzersiz 45-120 dakika arası yüksek kalp hızı aktivitesi anlamına gelmektedir';
    }
    else if(kullaniciAktiviteDuzeyi == "6"){
        aktiviteBilgi = 'Çok yoğun egzersiz 2 satten fazla yüksek kalp hızı aktivitesi anlamına gelmektedir';
    }

    return(
        <SafeAreaView>
            {profilFotografi}

            <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center',flexDirection :'row'}}>
                <Text style={styles.adText}>{kullaniciAdi}</Text>
                <AntDesign name="edit" size={24} color="black" onPress={adModalAc} style={{marginLeft: 10}} />
            </View>

            <Modal 
                isVisible={adModal}
                coverScreen={true}
                hasBackdrop={false}  
            >
                <View style={styles.modalContainer}>
                    <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                        <FavoriteButton 
                            icon="close" 
                            size={23} 
                            color="black"  
                            onPress={adModalKapat}
                        />
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TextInput 
                            style={styles.textInputStyle}
                            maxLength={20}
                            value={kullaniciAdi}
                            onChangeText={text => setKullaniciAdi(text)}
                            returnKeyType="done"
                            textAlign="center"
                        />
                        <View style={{flexDirection: 'row',marginTop: 20}}>
                             <View style={{alignItems:'center',justifyContent:'center',marginRight: 20}}>
                                <Button onPress={adDuzenlemeyiKaydet} style={{width:80}} textStyle={styles.buttonText}>Kaydet</Button>
                            </View>
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Button onPress={adModalKapat} style={{width:80}} textStyle={styles.buttonText}>Vazgeç</Button>
                            </View>
                           
                        </View>
                      
                    </View>
                
                </View>
            </Modal>

            <Modal 
                isVisible={boyModal}
                coverScreen={true}
                hasBackdrop={false}  
            >
                <View style={styles.modalContainer}>
                    <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                        <FavoriteButton 
                            icon="close" 
                            size={23} 
                            color="black"  
                            onPress={boyModalKapat}
                        />
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TextInput 
                            style={styles.textInputStyle}
                            maxLength={3}
                            value={kullaniciBoy.toString()}
                            onChangeText={text => setKullaniciBoy(text)}
                            returnKeyType="done"
                            textAlign="center"
                            keyboardType="number-pad"
                        />
                        <View style={{flexDirection: 'row',marginTop: 20}}>
                             <View style={{alignItems:'center',justifyContent:'center',marginRight: 20}}>
                                <Button onPress={boyDuzenlemeyiKaydet} style={{width:80}} textStyle={styles.buttonText}>Kaydet</Button>
                            </View>
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Button onPress={boyModalKapat} style={{width:80}} textStyle={styles.buttonText}>Vazgeç</Button>
                            </View>
                           
                        </View>
                      
                    </View>
                
                </View>
            </Modal>

            <Modal 
                isVisible={kiloModal}
                coverScreen={true}
                hasBackdrop={false}  
            >
                <View style={styles.modalContainer}>
                    <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                        <FavoriteButton 
                            icon="close" 
                            size={23} 
                            color="black"  
                            onPress={kiloModalKapat}
                        />
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TextInput 
                            style={styles.textInputStyle}
                            maxLength={3}
                            value={kullaniciKilo.toString()}
                            onChangeText={text => setKullaniciKilo(text)}
                            returnKeyType="done"
                            textAlign="center"
                            keyboardType="number-pad"
                        />
                        <View style={{flexDirection: 'row',marginTop: 20}}>
                             <View style={{alignItems:'center',justifyContent:'center',marginRight: 20}}>
                                <Button onPress={kiloDuzenlemeyiKaydet} style={{width:80}} textStyle={styles.buttonText}>Kaydet</Button>
                            </View>
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Button onPress={kiloModalKapat} style={{width:80}} textStyle={styles.buttonText}>Vazgeç</Button>
                            </View>
                           
                        </View>
                      
                    </View>
                
                </View>
            </Modal>

            <Modal 
                isVisible={aktiviteDuzeyiModal}
                coverScreen={true}
                hasBackdrop={false}  
            >
                <View style={[styles.modalContainer,{ marginBottom: windowHeight/3.6}]}>
                    <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                        <FavoriteButton 
                            icon="close" 
                            size={23} 
                            color="black"  
                            onPress={aktiviteDuzeyiModalKapat}
                        />
                    </View>

                    <DropDownPicker
                        placeholder="Mutfaklar"
                        placeholderStyle={{
                            fontFamily: 'GillSans-Italic',
                            fontSize: 17,
                            fontWeight: '600'
                        }}
                        showTickIcon={true}
                        open={aktiviteDuzeyiDropDownPicker}
                        value={kullaniciAktiviteDuzeyi}
                        labelStyle={{fontFamily:'GillSans-Italic',fontSize:15}}
                        style={{width: 250}}
                        containerProps={{width: 250,marginLeft: 20}}
                        listItemLabelStyle={{fontFamily:'GillSans-Italic'}}       
                        items={[
                            {label: 'Az veya hiç egzersiz', value: "1",icon: () => <AntDesign name="checkcircle" size={20} color="black" />},
                            {label: 'Haftada 1-3 kez egzersiz', value: "2",icon: () => <AntDesign name="checkcircle" size={20} color="black" />},
                            {label: 'Haftada 4-5 kez egzersiz', value: "3",icon: () => <AntDesign name="checkcircle" size={20} color="black" />},
                            {label: 'Günlük egzersiz veya haftada 3-4 kez yoğun egzersiz', value: "4",icon: () => <AntDesign name="checkcircle" size={20} color="black" />},
                            {label: 'Haftada 6-7 kez yoğun egzersiz', value: "5",icon: () => <AntDesign name="checkcircle" size={20} color="black" />},
                            {label: 'Günlük çok yoğun egzersiz veya fiziksel iş', value: "6",icon: () => <AntDesign name="checkcircle" size={20} color="black" />},
                        ]}
                        setOpen={setAktiviteDuzeyiDropDownPicker}
                        setValue={setKullaniciAktiviteDuzeyi}
                    />   
                    


                    <View style={{flexDirection: 'row',alignItems:'center',marginTop: 25,marginRight: 40, marginLeft: 3}}>
                        <View style={{marginRight: 5,marginLeft: 7}}>
                            <AntDesign style={{marginTop:2}} name="exclamationcircle" size={23} color="black" />
                        </View>
                        <Text style={[styles.altText,{textAlign: 'center', fontSize: 14}]}>{aktiviteBilgi}</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        
                        <View style={{flexDirection: 'row',marginTop: 35}}>
                             <View style={{alignItems:'center',justifyContent:'center',marginRight: 20}}>
                                <Button onPress={aktiviteDuzeyiDuzenlemeyiKaydet} style={{width:80}} textStyle={styles.buttonText}>Kaydet</Button>
                            </View>
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Button onPress={aktiviteDuzeyiModalKapat} style={{width:80}} textStyle={styles.buttonText}>Vazgeç</Button>
                            </View>
                           
                        </View>
                      
                    </View>
                
                </View>
            </Modal>

            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center', width: windowWidth - 60, marginLeft: 30}}>
                <SwitchSelector
                    options={options}
                    initial={kullaniciCinsiyet-1}
                    onPress={value => {cinsiyetDegistir(value)}}
                    selectedColor= "black"
                    borderRadius={10}
                    style={{borderWidth: 0.5,marginTop: 30,borderRadius: 10,borderColor:'#000000'}}
                    textStyle={{fontSize: 15,fontFamily:'GillSans-Italic'}}
                    selectedTextStyle={{fontSize: 16,fontFamily:'GillSans-Italic', color: 'white'}}
                    buttonColor={'#000000'}
                    backgroundColor={'#ffffff00'}
                />
            </View>

            <Pressable onPress={dogumTarihiModalAc}>

                <View style={{marginTop: 20,alignItems: 'center',flexDirection :'row', width: windowWidth - 50, marginLeft: 30, height: 70, borderRadius: 20}}>
                    <View style={{flex: 1,alignItems: 'flex-start',marginLeft: 10}}>
                        <Text style={styles.altText}>Doğum Tarihi</Text>
                    </View>
                
                    <View style={{flex: 1, alignItems: 'flex-end', marginRight: 20}}>
                        <Text style={styles.usText}>{getTodayDateWithoutClock(kullaniciDogumTarihi.toDate())}</Text>
                    </View>
                </View>

            </Pressable>

            <Pressable onPress={boyModalAc}>
                <View style={{alignItems: 'center',flexDirection :'row', width: windowWidth - 50, marginLeft: 30, height: 70, borderRadius: 20}}>
                    <View style={{flex: 1,alignItems: 'flex-start',marginLeft: 10}}>
                        <Text style={styles.altText}>Boy</Text>
                    </View>
              
                    <View style={{flex: 1, alignItems: 'flex-end', marginRight: 20}}>
                        <Text style={styles.usText}>{kullaniciBoy} {userDataCtx.UserData.boyBirimi}</Text>
                    </View>
                </View>
            </Pressable>

            <Pressable onPress={kiloModalAc}>
                <View style={{alignItems: 'center',flexDirection :'row', width: windowWidth - 50, marginLeft: 30, height: 70, borderRadius: 20}}>
                    <View style={{flex: 1,alignItems: 'flex-start',marginLeft: 10}}>
                        <Text style={styles.altText}>Kilo</Text>
                    </View>
                
                    <View style={{flex: 1, alignItems: 'flex-end', marginRight: 20}}>
                        <Text style={styles.usText}>{kullaniciKilo} {userDataCtx.UserData.kiloBirimi}</Text>
                    </View>
                </View>
            </Pressable>

            <Pressable onPress={aktiviteDuzeyiModalAc}>
                <View style={{alignItems: 'center',flexDirection :'row', width: windowWidth - 50, marginLeft: 30, height: 70, borderRadius: 20}}>
                    <View style={{flex: 1,alignItems: 'flex-start',marginLeft: 10}}>
                        <Text style={styles.altText}>Aktivite Düzeyiniz</Text>
                    </View>
                
                    <View style={{flex: 1, alignItems: 'flex-end', marginRight: 20}}>
                        <Text style={[styles.usText,{textAlign: 'center'}]}>{aktiviteDuzeyiAdi}</Text>
                    </View>
                </View>
            </Pressable>
         
         
             

            <DateTimePickerModal
                locale="tr-TR"
                isVisible={dogumTarihiModal}
                mode="date"
                onConfirm={dogumTarihiGuncelle}
                onCancel={dogumTarihiModalKapat}
                buttonTextColorIOS="black"
                backdropStyleIOS={{backgroundColor: '#afafafff'}}
                confirmTextIOS="Kaydet"
                cancelTextIOS="Vazgeç"
                date={kullaniciDogumTarihi.toDate()}
            />

         
        </SafeAreaView>
    );
}

export default ProfilAnaEkrani;

const styles = StyleSheet.create({
    profilImageContainer:{
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 20,
    },
    profilImage:{
        height: 130 ,
        width: 130
    },
    adText:{
        color: '#000000ff', 
        fontSize: 24, 
        fontFamily: 'GillSans-Italic',
        fontWeight: '400'
    },
    textInputStyle:{
        height: 40, 
        width: 200, 
        borderRadius: 10, 
        borderWidth: 1 ,
        borderColor: '#b7b7b7ff', 
        fontFamily: 'GillSans-Italic',
        fontSize: 16
    },
    modalContainer:{
        flex: 1, 
        marginTop: windowHeight/3.2,
        marginRight: windowWidth/16,
        marginLeft: windowWidth/16, 
        marginBottom: windowHeight/2.5,
        backgroundColor: 'white', 
        borderRadius: 20
    },
    buttonText:{
        fontSize: 13, 
        fontFamily: 'GillSans-Italic',
    },
    usText:{
        color: '#000000ff', 
        fontSize: 16, 
        fontFamily: 'GillSans-Italic',
        fontWeight: '800'
    },
    altText:{
        color: '#3a3a3aff', 
        fontSize: 16, 
        fontFamily: 'GillSans-Italic',
        fontWeight: '600'
    },
    dropDownImage:{
        height:25,
        width: 25
    }
    
});

//  color: '#F71C55', 