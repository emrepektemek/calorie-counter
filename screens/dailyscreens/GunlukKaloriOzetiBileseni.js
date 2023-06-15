import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

import CircularProgress from "react-native-circular-progress-indicator";
import * as Progress from 'react-native-progress';

import { UserDataContext } from "../../store/user-data-context";
import { EgzersizGecmisiContext } from "../../store/egzersiz-gecmisi-context";
import { BesinGecmisiContext } from "../../store/besin-gecmisi-context";

import { getTodayDateWithoutClock } from "../../util/date";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let gunlukYagIhtiyaci = 0;
let gunlukProteinIhtiyaci  = 0;
let gunlukKarbonhidratIhtiyaci  = 0;

const kaloriGram =  0.129598;

function GunlukKaloriOzetiBileseni({tarih}){

    const besinGecmisiCtx = useContext(BesinGecmisiContext);
    const egzersizGecmisiCtx = useContext(EgzersizGecmisiContext);
    const userDataCtx = useContext(UserDataContext);

    const [alinanKalori, setAlinanKalori] = useState(0);
    const [yakilanKalori, setYakilanKalori] = useState(0);
    const [gunlukBazalMetabolizmaHizi, setGunlukBazalMetabolizmaHizi] = useState(0);
    const [gunlukKaloriIhtiyaci, setGunlukKaloriIhtiyaci] = useState(0);
    const [alinanYag, setAlinanYag] = useState(0);
    const [alinanProtein, setAlinanProtein] = useState(0);
    const [alinanKarbonhidrat, setAlinanKarbonhidrat] = useState(0);

    

    useEffect(() => {
        function degerleriHesapla(){ 

            setAlinanKalori(0);
            setYakilanKalori(0);
            setGunlukKaloriIhtiyaci(0);
            setAlinanYag(0);
            setAlinanProtein(0);
            setAlinanKarbonhidrat(0);
 
            if(besinGecmisiCtx.BesinEgzersizData.length>0){
                
                besinGecmisiCtx.BesinEgzersizData.forEach((data)=>{

                    if(tarih.getDate() == data.eklenmeTarihi.toDate().getDate() && tarih.getMonth() == data.eklenmeTarihi.toDate().getMonth() && tarih.getFullYear() == data.eklenmeTarihi.toDate().getFullYear()){

                        setAlinanKalori(oncekiDeger => Math.round(oncekiDeger+data.alinanKalori));
                        setAlinanYag(oncekiDeger=> Math.round(parseFloat(oncekiDeger) + parseFloat(data.yagMiktari)));
                        setAlinanProtein(oncekiDeger=> Math.round(parseFloat(oncekiDeger)+parseFloat(data.proteinMiktari)));
                        setAlinanKarbonhidrat(oncekiDeger=>  Math.round(parseFloat(oncekiDeger)+parseFloat(data.karbonhidratMiktari)));
                        
                    } 
                 
                });
            }
            
            if(egzersizGecmisiCtx.GecmisEgzersizData.length>0){
                
                egzersizGecmisiCtx.GecmisEgzersizData.forEach((data)=>{

                    if(tarih.getDate() == data.egzersizPlaniBitisTarihi.toDate().getDate() && tarih.getMonth() == data.egzersizPlaniBitisTarihi.toDate().getMonth() && tarih.getFullYear() == data.egzersizPlaniBitisTarihi.toDate().getFullYear()){
                       
                        setYakilanKalori(oncekiDeger => (parseFloat(oncekiDeger) + parseFloat(data.yakilanKalori)).toFixed(2));
                    } 
                 
                });
            }


            if( userDataCtx.UserData.dogumTarihi != undefined){

                let bugun = new Date();
                let yas;
                let cinsiyetIcınDeger;
                let aktiviteDuzeyiKatSayisi;

                if(userDataCtx.UserData.dogumTarihi.toDate().getMonth()>bugun.getMonth()){
                    yas = bugun.getFullYear() - userDataCtx.UserData.dogumTarihi.toDate().getFullYear() - 1;
                }
                else{
                    yas = bugun.getFullYear() - userDataCtx.UserData.dogumTarihi.toDate().getFullYear();
                }

                if(userDataCtx.UserData.cinsiyet == 1){
                    cinsiyetIcınDeger = 5;
                }
                else{
                    cinsiyetIcınDeger = -161;
                }

                setGunlukBazalMetabolizmaHizi((Math.round((10*userDataCtx.UserData.kilo) + (6.25*userDataCtx.UserData.boy) - (5*yas) + cinsiyetIcınDeger)));

                if(userDataCtx.UserData.aktiviteDuzeyi == '1'){
                    aktiviteDuzeyiKatSayisi = 1.2;
                }
                else if(userDataCtx.UserData.aktiviteDuzeyi == '2'){
                    aktiviteDuzeyiKatSayisi = 1.37;
                }
                else if(userDataCtx.UserData.aktiviteDuzeyi == '3'){
                    aktiviteDuzeyiKatSayisi = 1.46;
                }
                else if(userDataCtx.UserData.aktiviteDuzeyi == '4'){
                    aktiviteDuzeyiKatSayisi = 1.55;
                }
                else if(userDataCtx.UserData.aktiviteDuzeyi == '5'){
                    aktiviteDuzeyiKatSayisi = 1.72;
                }
                else{
                    aktiviteDuzeyiKatSayisi = 1.9;
                }

                setGunlukKaloriIhtiyaci((Math.round((10*userDataCtx.UserData.kilo) + (6.25*userDataCtx.UserData.boy) - (5*yas) + cinsiyetIcınDeger))*aktiviteDuzeyiKatSayisi);

            }
  
        } 
        
        degerleriHesapla();
    },[besinGecmisiCtx,egzersizGecmisiCtx,userDataCtx,tarih]);

    if(gunlukKaloriIhtiyaci>0){
        gunlukProteinIhtiyaci = Math.round(((gunlukKaloriIhtiyaci* kaloriGram)*35)/100);
        gunlukYagIhtiyaci = Math.round(((gunlukKaloriIhtiyaci* kaloriGram)*20)/100);
        gunlukKarbonhidratIhtiyaci = Math.round(((gunlukKaloriIhtiyaci* kaloriGram)*45)/100);
    }
    else{
        gunlukProteinIhtiyaci = 0.1;
        gunlukYagIhtiyaci = 0.1;
        gunlukKarbonhidratIhtiyaci =0.1 
    }

    return(
        <View style={styles.mainContainer}>

            <View style={{alignItems: 'center',marginBottom: 20}}>
                <Text style={styles.tarihText}>{getTodayDateWithoutClock(tarih)}</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems :'center',justifyContent: 'space-between'}}>
             
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.ustText}>{alinanKalori} kcal</Text>
                    <Text style={styles.altText}>Alınan</Text>
                </View>
                <View>
                    <CircularProgress 
                        value={alinanKalori - yakilanKalori - gunlukBazalMetabolizmaHizi} 
                        progressValueStyle={{ fontSize: 20, fontFamily: 'GillSans-Italic',fontWeight: '400'}}
                        radius={60}
                        maxValue={5000}
                        title={'kcal'}
                        titleStyle={{fontSize: 16, fontFamily: 'GillSans-Italic', color: '#2d2d2dff' }}
                        inActiveStrokeColor = '#e7e7e7'
                        activeStrokeColor = '#000000ff'
                        activeStrokeWidth={6}
                        inActiveStrokeWidth={4}
                    />
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={styles.ustText}>{Math.round(parseFloat(yakilanKalori) + gunlukBazalMetabolizmaHizi)} kcal</Text>
                    <Text style={styles.altText}>Yakılan</Text>
                </View>
            
            </View>

            <View style={{marginTop: 10,alignItems: 'center'}}>
                <Text style={styles.ustText}>{Math.round(gunlukKaloriIhtiyaci)} kcal</Text>
                <Text style={styles.altText}>Günlük Kalori İhtiyacı</Text>
            </View>
            

            <View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop: 20}}>

            <View style={styles.progressBarContainer}>
                    <Text style={[{marginTop: 5},styles.ustText]}>Yağ</Text>
                    <Progress.Bar 
                        progress={alinanYag/gunlukYagIhtiyaci} 
                        width={80} 
                        color='#000000ff'
                        borderWidth={0.4}
                    />
                    <Text style={[{marginTop: 9},styles.altText]}>{alinanYag} / {gunlukYagIhtiyaci} g</Text>
                </View>

                <View style={styles.progressBarContainer}>
                    <Text style={[{marginTop: 5},styles.ustText]}>Protein</Text>
                    <Progress.Bar 
                        progress={alinanProtein/gunlukProteinIhtiyaci} 
                        width={80} 
                        color='#000000ff'
                        borderWidth={0.4}
                    />
                    <Text style={[{marginTop: 9},styles.altText]}>{alinanProtein} / {gunlukProteinIhtiyaci} g</Text>
                </View>

                <View style={styles.progressBarContainer}>
                    <Text style={[{marginTop: 5},styles.ustText]}>Karbonhidrat</Text>
                    <Progress.Bar 
                        progress={alinanKarbonhidrat/gunlukKarbonhidratIhtiyaci} 
                        width={80} 
                        color='#000000ff'
                        borderWidth={0.4}
                    />
                    <Text style={[{marginTop: 9},styles.altText]}>{alinanKarbonhidrat} / {gunlukKarbonhidratIhtiyaci} g</Text>
                </View>
               
            </View>

        </View>
        
    );

}

export default GunlukKaloriOzetiBileseni;

const styles = StyleSheet.create({

    mainContainer:{
        backgroundColor: 'white', 
        borderRadius: 20, 
        width: windowWidth-30,
        marginLeft: 15,
        marginTop: 20,
        padding: 20
    },
    tarihText:{
        fontSize: 19,
        fontFamily: 'GillSans-Italic',
    },
    ustText:{
        fontSize: 16,
        fontFamily: 'GillSans-Italic',
        marginBottom: 5
    },
    altText:{
        fontSize: 14,
        fontFamily: 'GillSans-Italic',
        color: '#6e6e6eff' 
    },
    progressBarContainer:{
       alignItems: 'center'
    }

   
   
   

});