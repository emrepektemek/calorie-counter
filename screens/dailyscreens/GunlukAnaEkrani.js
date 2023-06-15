import { useContext, useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions, ScrollView } from "react-native";

import IconButton from "../../components/ui/IconButton";

import LoadingOverlay from "../../components/ui/LoadingOverlay";

import AsyncStorage from "@react-native-async-storage/async-storage";

import GunlukBesinEkleBileseni from "./GunlukBesinEkleBileseni";
import GunlukKaloriOzetiBileseni from "./GunlukKaloriOzetiBileseni";

import CalendarStrip from 'react-native-calendar-strip';

import { AuthContext } from "../../store/auth-context";
import { UserDataContext } from "../../store/user-data-context";
import { FavoriTariflerContext } from "../../store/tarifler-favori-context";
import { EgzersizGecmisiContext } from "../../store/egzersiz-gecmisi-context";
import { BesinGecmisiContext } from "../../store/besin-gecmisi-context";

import { getDbObject } from "../../firebase/FireBaseObjects";

import { collection,doc,setDoc, query, where, getDocs} from "firebase/firestore";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const locale = {
    name: 'tr',
    config: {
      months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
      weekdaysShort: 'Paz_Sal_Çar_Per_Cuma_Cmt_Paz'.split('_'),
    }
};


function GunlukAnaEkrani({navigation}){

    const [verilerGetirildiMi , setVerilerGetirildiMi ] = useState(true);

    const [secilenTarih , setSecilenTarih ] = useState(new Date());

    const authCtx = useContext(AuthContext);
    const userDataCtx = useContext(UserDataContext);
    const kullaniciFavorilerCtx = useContext(FavoriTariflerContext);
    const egzersizGecmisiCtx = useContext(EgzersizGecmisiContext);
    const besinGecmisiCtx = useContext(BesinGecmisiContext);

    const db = getDbObject();



    useEffect(() => {
        async function getGecmisBesinlerlerData(){ 
            setVerilerGetirildiMi(false);

            const referans = query(collection(db,"kullanicibesinleri",authCtx.uid,"besinkayitlari"));

            try {
                const querySnapshot = await getDocs(referans);
                querySnapshot.forEach( async (veri) => {
                    
                    besinGecmisiCtx.addGecmisBesinData(veri.data());
                });
                
            }catch (error){
                console.log(error.toString());
            } 
            setVerilerGetirildiMi(true); 
        } 
        
        getGecmisBesinlerlerData();
    },[]);

    useEffect(() => {
        async function getGecmisEgzersizlerData(){ 
            setVerilerGetirildiMi(false);

            const referans = query(collection(db,"kullaniciegzersizleri",authCtx.uid,"egzersizkayitlari"));

            try {
                const querySnapshot = await getDocs(referans);
                querySnapshot.forEach( async (veri) => {
                    
                    egzersizGecmisiCtx.addGecmisEgzersizData(veri.data());
                });
            }catch (error){
                console.log(error.toString());
            } 
            setVerilerGetirildiMi(true); 
        } 
        
        getGecmisEgzersizlerData();
    },[]);

    useEffect(() => {
        async function getUserData(){ 
            setVerilerGetirildiMi(false);

            try {
                const q = query(collection(db, "kullanicibilgileri"),where("userId", "==", authCtx.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc)=>{           
                    
                    userDataCtx.addUserData(doc.data());
                    userDataCtx.addBelgeId(doc.id);
                });
            } catch (error) {
                Alert.alert('Kullanıcı verileri getirilemedi lütfen internet bağlantınızı kontrol ediniz');
            }
            setVerilerGetirildiMi(true); 
        } 
        
        getUserData();
    },[]);

    useEffect(() => {
        async function getFavoriTariflerData(){ 
            setVerilerGetirildiMi(false);

            const referans = query(collection(db,"kullanicifavoritarifleri",authCtx.uid,"favoritariflerkayitlari"));

            try {
                const querySnapshot = await getDocs(referans);
                querySnapshot.forEach( async (veri) => {
                    
                    kullaniciFavorilerCtx.addTarifler(veri.data());
                });
            }catch (error){
                console.log(error.toString());
            } 
            setVerilerGetirildiMi(true); 
        } 
        
        getFavoriTariflerData();
    },[]);


    if(!verilerGetirildiMi){
        return(
            <LoadingOverlay color="black" />
        );
    }


    function uygulamadanCik(){
        egzersizGecmisiCtx.temizle();
        besinGecmisiCtx.temizle();
        kullaniciFavorilerCtx.temizle();
        userDataCtx.temizle();
        authCtx.logout();
    }

    return(
        
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.topMenuContanier}>

                <View style={{alignItems: 'flex-end',flex: 1.5}}>
                    <Text style={styles.topMenuText}>Günlük</Text>
                </View>

                <View style={{justifyContent: 'flex-end',flex: 1,marginRight:12,flexDirection:'row'}}>
                    <IconButton 
                        size={windowHeight/25}
                        icon="ios-exit-outline"
                        color= "black"
                        onPress={uygulamadanCik}
                    />
                </View>

            </View>

            <View style={{flex: 1,marginBottom: 120, zIndex: 2}}>
                <CalendarStrip
                    scrollable
                    style={{height:100, marginTop: 20, paddingBottom: 10,borderRadius: 20,paddingTop: 14}}
                    calendarColor={'#07ec5f8e'}
                    calendarHeaderStyle={{color: '#000000ff', fontSize: 17, fontFamily: 'GillSans-Italic',fontWeight: '400'}}
                    dateNumberStyle={{color: '#000000ff', fontSize: 15, fontFamily: 'GillSans-Italic',marginTop: 5,fontWeight: '400'}}
                    dateNameStyle={{color: '#000000ff', fontSize: 9, fontFamily: 'GillSans-Italic',marginTop: 12}}
                    iconContainer={{flex: 0.1}}
                    locale={locale}
                    onDateSelected={(secilenTarih)=> setSecilenTarih( new Date(secilenTarih))}       
                />
            </View>


            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        
                <GunlukKaloriOzetiBileseni tarih={secilenTarih} />

                <GunlukBesinEkleBileseni tarih={secilenTarih} />

            </ScrollView>


        </SafeAreaView>
         
    );

}

export default GunlukAnaEkrani;


const styles = StyleSheet.create({

    mainContainer:{
        flex: 1,
    },
    topMenuContanier:{
        flexDirection:'row',
        alignItems: 'center'
    },
    topMenuText:{
        fontSize: windowHeight/23,
        fontFamily: 'GillSans-Italic',
    },

});