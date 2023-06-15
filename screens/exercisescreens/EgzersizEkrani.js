import { useContext, useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Pressable, Image, ScrollView, Alert, Linking } from "react-native";

import IconButton from "../../components/ui/IconButton";
import PassButton from '../../components/ui/PassButton';
import ExerciseInfoButton from '../../components/ui/ExerciseInfoButton';
import FavoriteButton from "../../components/ui/FavoriteButton";
import Button from "../../components/ui/Button";

import Modal from "react-native-modal";

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { UserDataContext } from "../../store/user-data-context";
import {AuthContext} from "../../store/auth-context";
import { EgzersizGecmisiContext } from "../../store/egzersiz-gecmisi-context";

import { addDoc, collection, Timestamp } from "firebase/firestore";
import {getDbObject} from '../../firebase/FireBaseObjects'

import LoadingOverlay from "../../components/ui/LoadingOverlay";

import EGZERSIZLER from "../../constants/egzersizler";

import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const db = getDbObject();

function EgzersizEkrani({navigation,route}){

    const { yapilacakEgzersiz, bolgeIsmi, duzeyIsmi, yogunlukIsmi, resim } = route.params;

    const [egzersizPlaniBaslamaTarihi, setEgzersizPlaniBaslamaTarihi] = useState();

    useLayoutEffect(()=>{
        setEgzersizPlaniBaslamaTarihi(new Date());
    },[]);

    const [veritabaninaKaydedildiMi , setVeritabaninaKaydedildiMi] = useState(true);

    const [beklemedeMi, setBeklemedeMi] = useState(true); 

    const [geriSayimBaslat, setGeriSayimBaslat] = useState(true); 

    const [modalVisible, setModalVisible] = useState(false);

    const [suAnYapilanEgzersizIndex, setSuAnYapilanEgzersizIndex] = useState(0); 

    const authCtx = useContext(AuthContext);
    const userDataCtx = useContext(UserDataContext);
    const egzersizGecmisiCtx = useContext(EgzersizGecmisiContext);

    const [yapilanEgzersizler, setYapilanEgzersizler] = useState([]);

    function geriSayimiBaslatDurdur(deger){

        setGeriSayimBaslat(deger);
    }

    function egzersizDetayinaBak(){
        setGeriSayimBaslat(false);
        setModalVisible(true);
    }

    function egzersiziGec(){
        setBeklemedeMi(true);
        setGeriSayimBaslat(true);
        setSuAnYapilanEgzersizIndex((index)=>index + 1);
    }

    async function antremandanCik(tarih){

        if(tarih == undefined){
          
            tarih = new Date();
        }

        if(yapilanEgzersizler.length>0){
            let egzersizSuresi = 0;
            let yakilanKalori = 0;

            yapilanEgzersizler.forEach((data)=>{
                egzersizSuresi += data.sure;
                yakilanKalori += (( data.sure/60 * EGZERSIZLER[data.index].metDegeri * 3.5 * userDataCtx.UserData.kilo) / 200 ); 
            });

            setVeritabaninaKaydedildiMi(false);

            try {
                const referans = collection(db,"kullaniciegzersizleri",authCtx.uid,"egzersizkayitlari");

                await addDoc(referans, {
                    bolgeIsmi: bolgeIsmi,
                    duzeyIsmi: duzeyIsmi,
                    yogunlukIsmi: yogunlukIsmi,
                    yapilanEgzersizSuresi: egzersizSuresi,
                    yakilanKalori: yakilanKalori.toFixed(2),
                    yapilanEgzersizSayisi: yapilanEgzersizler.length,
                    egzersizPlaniBaslamaTarihi: Timestamp.fromDate(egzersizPlaniBaslamaTarihi),
                    egzersizPlaniBitisTarihi: Timestamp.fromDate(tarih)
                });

                egzersizGecmisiCtx.addGecmisEgzersizData({
                    bolgeIsmi: bolgeIsmi,
                    duzeyIsmi: duzeyIsmi,
                    yogunlukIsmi: yogunlukIsmi,
                    yapilanEgzersizSuresi: egzersizSuresi,
                    yakilanKalori: yakilanKalori.toFixed(2),
                    yapilanEgzersizSayisi: yapilanEgzersizler.length,
                    egzersizPlaniBaslamaTarihi: Timestamp.fromDate(egzersizPlaniBaslamaTarihi),
                    egzersizPlaniBitisTarihi: Timestamp.fromDate(tarih)
                });

            } catch (error) {
                console.log(error.toString());
            }

            setVeritabaninaKaydedildiMi(true);
        }

        navigation.goBack();
    }

    
    if(!veritabaninaKaydedildiMi){
        return(
            <LoadingOverlay color="black" />
        );
    }   

    function oncekiEkranaGit(){

        setGeriSayimBaslat(false);

        Alert.alert(
            'Egzersiz bitmedi yorulduysanız durdurabilirsiniz',
            ' ',
            [
                {
                    text: 'Egzersizde Kal',
                    onPress: () => setGeriSayimBaslat(true),
                    style: 'destructive',
                },
                {
                    text: 'Egzersizden Çık',
                    onPress: antremandanCik,
                    style: 'destructive',
                },
            ],
        );

    }

    async function linkeGit(link){

        const supported = await Linking.canOpenURL(link);

        if (supported) {
            await Linking.openURL(link);
        } 
        else {
            Alert.alert(`${link} link açılamıyor kaldırılmış olabilir veya internet bağlantınız olmayabilir`);
        }  
   }

    if(suAnYapilanEgzersizIndex == yapilacakEgzersiz.length){ //antreman biterse bu öğeler renderlanacak

        let yakilanKalori;

        let egzersizPlaniBitisTarihi;

        if(yapilanEgzersizler.length>0){
            yakilanKalori = 0;
            egzersizPlaniBitisTarihi = new Date();
            yapilanEgzersizler.forEach((data)=>{
                yakilanKalori += (( data.sure/60 * EGZERSIZLER[data.index].metDegeri * 3.5 * userDataCtx.UserData.kilo) / 200 ); 
            });
        }
        else{
            yakilanKalori = 0;
            egzersizPlaniBitisTarihi = new Date();
        }

        let sure = (egzersizPlaniBitisTarihi.getTime()-egzersizPlaniBaslamaTarihi.getTime())/1000;
        let sureDakika  = Math.floor(sure/60);
        let sureSaniye = Math.round(sure % 60);

        if(sureDakika<10){
            sureDakika = '0' + sureDakika;
        }
        if(sureSaniye<10){
            sureSaniye = '0' + sureSaniye;
        }
        
        return(
            <SafeAreaView style={{flex: 1,backgroundColor: 'white'}}>

                <View style={{alignItems: 'center'}}>
                    <View style={{marginTop: 20, marginBottom: 8}}>
                        <Text style={styles.egzersizBitirmeBaslikText}>{bolgeIsmi} - {duzeyIsmi}</Text>
                    </View>
                    <View>
                        <Image 
                            source={require('../../assets/basari.png')}
                            style={{
                                width: 120,
                                height: 120,
                            }}
                        />
                    </View>
             
                    <View style={{marginTop: 8, marginBottom: 15}}>
                        <Text style={styles.egzersizBitirmeBaslikText}>{yogunlukIsmi}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row',justifyContent: 'space-between',  marginRight: 15, marginLeft: 15, marginTop: 10,marginBottom: 10}}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source={require('../../assets/toplamegzersiz.png')}
                            style={{
                                width: 30,
                                height: 30,
                                marginBottom: 5,
                               
                            }}
                        />
                        <Text style={styles.egzersizBitisGenelBilgilerText}>{yapilanEgzersizler.length} egzersiz</Text>
                    </View>

                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source={require('../../assets/toplamkalori.png')}
                            style={{
                                width: 30,
                                height: 30,
                                marginBottom: 5,
                               
                            }}
                        />
                        <Text style={styles.egzersizBitisGenelBilgilerText}>{yakilanKalori.toFixed(2)} kcal</Text>
                    </View>

                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source={require('../../assets/toplamsure.png')}
                            style={{
                                width: 30,
                                height: 30,
                                marginBottom: 5,
                               
                            }}
                        />
                        <Text style={styles.egzersizBitisGenelBilgilerText}>{sureDakika} : {sureSaniye}</Text>
                    </View>
                   
                </View>
              
               
                <View style={{marginTop: 8, marginBottom: 15}}>
                    <Text 
                    style={{ fontSize: windowHeight/34,
                        fontFamily: 'GillSans-Italic',
                        color: '#000000cc',
                        fontWeight: '600',
                    }}>Yapılan Egzersizler</Text>
                </View> 

                <ScrollView>
                    {
                        yapilanEgzersizler.map(((data,index) =>{
           
                            return(
                                <View 
                                    style={styles.egzersizMainContainer}
                                    key={index}
                                >
                                    <Image 
                                        source={{
                                            uri: EGZERSIZLER[data.index].gif
                                        }}
                                        style={styles.egzersizBitisImage}
                                        resizeMode="Stretch"
                                    />
                                    
                                    <View style={styles.egzersizBitisMainContainer}>
                                        <View style={{ flex: 1}}>
                                            <Text style={styles.egzersizBitisIsimText}>{EGZERSIZLER[data.index].isim}</Text>
                                        </View>
                                        
                                        <View style={styles.egzersizBitisBilgiContainer}>
                
                                            <View style={styles.egzersizBitisAltBilgiContainer}>
                                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                                <Text style={styles.egzersizBitisAltBilgiText}>{data.sure} saniye</Text>
                                            </View>
                                            
                                            <View style={styles.egzersizBitisbContainer}>
                                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                                <Text style={styles.egzersizBitisAltBilgiText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                                            </View>
                                        </View>
                                    </View>      
                                </View>  
                            );
                        }))
                    }
                </ScrollView>

                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Button
                        onPress={antremandanCik.bind(this,new Date())}
                        style={{
                            backgroundColor: 'black', 
                            width: windowWidth, 
                            height: 40,
                            alignItems: 'center', 
                            justifyContent: 'center',
                            borderRadius: 0
                        }}
                        textStyle={{ 
                            fontSize: windowHeight/42,
                            fontFamily: 'GillSans-Italic',
                            fontWeight: '400',
                            textAlign: 'center',
                        }}
                    >
                        Egzersizi Tamamla
                    </Button>
                </View>
                
            </SafeAreaView>
        );
    }

   
    let bekleme =  
        <View style={{flex: 1}}>

            {suAnYapilanEgzersizIndex == 0 && 
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text 
                        style={styles.baslikText}
                    >
                        Başlamaya
                    </Text>
                </View>
            }

            {suAnYapilanEgzersizIndex > 0 && 
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text 
                        style={styles.baslikText}
                    >
                        Sonraki Egzersiz
                    </Text>
                </View>
            }

            <View style={styles.countdownContainer}>
            
                <CountdownCircleTimer
                    isPlaying={geriSayimBaslat}
                    duration={30}
                    colors={['#000000']}
                    colorsTime={[30]}
                    strokeWidth={7}
                    onComplete={() => {
                        setBeklemedeMi(false);
                        return { shouldRepeat: false, delay: 0 } // repeat animation in 1.5 seconds
                    }}
                    size={100}
                    
                >
                    {({ remainingTime }) => {

                        return( 
                            <Text 
                                style={styles.countdownText}
                            >{remainingTime} s</Text>
                        );
                    }}
                </CountdownCircleTimer>
            </View>

            <View style={styles.egzersizImageContainer}>
                <Image 
                    source={{
                        uri: EGZERSIZLER[yapilacakEgzersiz[suAnYapilanEgzersizIndex].index].gif
                    }}
                    style={styles.egzersizImage}
                    resizeMode="Stretch"
                />
            </View>

            <View
                style={styles.egzersizInfoContainer}
            >
                <View style={styles.egzersizBaslikCoinater}>
                    <Text style={styles.egzersizBaslikText}>Egzersiz {suAnYapilanEgzersizIndex+1} / {yapilacakEgzersiz.length}  -  {EGZERSIZLER[yapilacakEgzersiz[suAnYapilanEgzersizIndex].index].isim}</Text>
                </View>
                
                <View style={styles.egzersizAltBilgiCoinater}>

                    <View style={styles.egzersizAltAltBilgiCoinater}>
                        <Ionicons name="ios-time-outline" size={windowHeight/27} color="black" style={{marginRight: 5}} />
                        <Text style={styles.egzersizText}>{yapilacakEgzersiz[suAnYapilanEgzersizIndex].sure} saniye</Text>
                    </View>
                    
                    <View style={styles.egzersizAltAltBilgiCoinater}>
                        <FontAwesome5 name="burn" size={windowHeight/30} color="black" style={{marginRight: 5}} />
                        <Text style={styles.egzersizText}>{(((yapilacakEgzersiz[suAnYapilanEgzersizIndex].sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[yapilacakEgzersiz[suAnYapilanEgzersizIndex].index].metDegeri)/200).toFixed(2)} kcal</Text>     
                    </View>

                </View>
            
            </View>

            <View style={styles.passButtonContainer}> 
                <PassButton 
                    icon="angle-right"
                    color="black"
                    size={windowHeight/36}
                    onPress={()=>{setBeklemedeMi(false)}}
                    textStyle={{
                        fontSize: windowHeight/38,
                        fontFamily: 'Avenir',
                        fontWeight:'600',
                        color: 'black'
                    }}
                >
                    Hemen Başla
                </PassButton>
            </View>

        </View>
       
    
    let egzersiz =  
        <View style={{flex: 1}}>

            <View style={{flex: 1, alignItems: 'center'}}>
                <Text 
                    style={styles.baslikText}
                >
                    Egzersizi Uygulayınız
                </Text>
            </View>
        
            <View style={styles.countdownContainer}>
            
                <CountdownCircleTimer
                    isPlaying={geriSayimBaslat}
                    duration={yapilacakEgzersiz[suAnYapilanEgzersizIndex].sure}
                    colors={['#000000']}
                    colorsTime={[15]}
                    strokeWidth={7}
                    onComplete={() => {
                        setBeklemedeMi(true);
                        setYapilanEgzersizler(oncekiVeriler=> [...oncekiVeriler,{index: yapilacakEgzersiz[suAnYapilanEgzersizIndex].index ,sure: yapilacakEgzersiz[suAnYapilanEgzersizIndex].sure}]);
                        setSuAnYapilanEgzersizIndex((index)=>index + 1);
                        return { shouldRepeat: false, delay: 0 }
                    }}
                    size={105}
                    
                >
                    {({ remainingTime }) => {

                        return( 
                            <Text 
                                style={{
                                    fontSize: windowHeight/36,
                                    fontFamily: 'GillSans-Italic',
                                    fontWeight:'600',
                                    letterSpacing: 1
                                }}
                            >{remainingTime} s</Text>
                        );
                    }}
                </CountdownCircleTimer>
            </View>

            <View style={[{flex: 5},styles.egzersizImageContainer]}>
                <Image 
                    source={{
                        uri: EGZERSIZLER[yapilacakEgzersiz[suAnYapilanEgzersizIndex].index].gif
                    }}
                    style={{
                        height: windowHeight/2.7, 
                        width: windowWidth-80,
                        borderRadius: 10,
                    }}
                    resizeMode="Stretch"
                />
            </View>     

            {geriSayimBaslat && 
                    <View style={styles.playpausebuttonContainer}>
                        <Pressable
                            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                            onPress={geriSayimiBaslatDurdur.bind(this,false)}
                        >
                            <Image 
                                source={require('../../assets/pause.png')}
                                style={styles.playpausebuttonImage}
                            />
                        </Pressable>
                    </View>}

                {!geriSayimBaslat && 
                    <View style={styles.playpausebuttonContainer}>
                        <Pressable
                            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                            onPress={geriSayimiBaslatDurdur.bind(this,true)}
                        >
                            <Image 
                                source={require('../../assets/play.png')}
                                style={styles.playpausebuttonImage}
                            />
                        </Pressable>
                    </View>}   

        </View>
    
    let beklemeTopButtonları = 
        <View style={styles.topMenuContanier}>
            <View style={{flex: 1}}>
                <IconButton 
                    icon="ios-arrow-back" 
                    size={26} 
                    color= "black"
                    onPress={oncekiEkranaGit}
                /> 
            </View>
               
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <ExerciseInfoButton 
                    icon="questioncircle" 
                    size={23} 
                    color= "black"
                    onPress={egzersizDetayinaBak}
                />
            </View>
            
        </View>
  

   let egzersizTopButtonları = 
        <View style={styles.topMenuContanier}>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <IconButton 
                    icon="ios-arrow-back" 
                    size={26} 
                    color= "black"
                    onPress={oncekiEkranaGit}
                /> 
            </View>
                
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ExerciseInfoButton 
                    icon="questioncircle" 
                    size={23} 
                    color= "black"
                    onPress={egzersizDetayinaBak}
                />
            </View>

            <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
                <Button textStyle={{color:'white'}} style={{backgroundColor:'black'}} onPress={egzersiziGec}>Geç</Button>
            </View>

        </View>
    

    return(
        <SafeAreaView style={styles.mainContainer}>

            {beklemedeMi && beklemeTopButtonları}   
            {!beklemedeMi && egzersizTopButtonları}   
           
            {beklemedeMi && bekleme}
            {!beklemedeMi && egzersiz}

            <Modal 
                isVisible={modalVisible}
                coverScreen={true}
                hasBackdrop={false}  
            >
                <View style={styles.modalContainer}>
                    <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                        <FavoriteButton 
                            icon="close" 
                            size={23} 
                            color="black"  
                            onPress={() => {
                                setGeriSayimBaslat(true);
                                setModalVisible(!modalVisible);
                            }}
                        />
                    </View>
                
                    <View style={{alignItems: 'center'}}>
                        <Image 
                            source={{
                                uri: EGZERSIZLER[yapilacakEgzersiz[suAnYapilanEgzersizIndex].index].gif
                            }}
                            style={{height: 150, width: 180,borderRadius: 20,marginBottom: 20}}
                            resizeMode="Stretch"
                        />
                        <Text style={[styles.egzersizBaslikText,{fontSize: windowHeight/35}]}>{EGZERSIZLER[yapilacakEgzersiz[suAnYapilanEgzersizIndex].index].isim}</Text>
                        <ScrollView style={{marginTop: 20,marginBottom: 20}}>
                            <Text style={styles.modalEgzersizBilgiText}>{EGZERSIZLER[yapilacakEgzersiz[suAnYapilanEgzersizIndex].index].talimat}</Text>
                        </ScrollView>
                        <Feather name="video" size={24} color="black" onPress={linkeGit.bind(this,EGZERSIZLER[yapilacakEgzersiz[suAnYapilanEgzersizIndex].index].youtubeLink)} />
                    </View>

                </View>
            </Modal>

        </SafeAreaView>
    );
    
}

export default EgzersizEkrani;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    topMenuContanier:{
        flexDirection:'row',
        alignItems: 'center',
    },
    baslikText:{
        fontSize: windowHeight/27,
        fontFamily: 'GillSans-Italic',
        fontWeight:'600',
        letterSpacing: 2
    },  fontSize: windowHeight/43,
    egzersizMainContainer:{
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor: '#4a4a4a37',
        padding: 4
    },
    countdownContainer:{
        flex: 2,
        alignItems: 'center', 
        justifyContent: 'flex-start'
    },
    countdownText:{
        fontSize: windowHeight/45,
        fontFamily: 'GillSans-Italic',
        fontWeight:'600',
        letterSpacing: 1
    },
    egzersizImageContainer:{
        flex: 4, 
        alignItems: 'center', 
        justifyContent: 'flex-start',
    },
    egzersizImage:{
        height: windowHeight/3, 
        width: windowWidth-100,
        borderRadius: 10
    },
    egzersizInfoContainer:{
        flex: 2,
        justifyContent: 'space-between',
    },
    egzersizBaslikText:{
        fontSize: windowHeight/34,
        fontFamily: 'GillSans-Italic',
        color: '#000000cc',
        fontWeight: '600',
        textAlign: 'center'
    },
    egzersizText:{
        fontSize: windowHeight/42,
        fontFamily: 'GillSans-Italic',
        color: '#4a4a4acc'
    },
    egzersizBaslikCoinater:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    egzersizAltBilgiCoinater:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    egzersizAltAltBilgiCoinater:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    passButtonContainer:{
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    playpausebuttonContainer:{
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    playpausebuttonImage:{
        height: 28,
        width: 28
    },
    modalContainer:{
        flex: 1, 
        marginTop: windowHeight/6.5,
        marginRight: windowWidth/16,
        marginLeft: windowWidth/16, 
        marginBottom: windowHeight/6.5,
        backgroundColor: 'white', 
        borderRadius: 20
    },
    modalEgzersizBilgiText:{
        fontSize: windowHeight/42,
        fontFamily: 'GillSans-Italic',
        color: '#000000cc',
        fontWeight: '400',
        textAlign: 'center',
    },
    egzersizBitisImage:{
        height: 90, 
        width: 115,
        borderRadius: 10
    },
    egzersizBitisMainContainer:{
        flex: 1,
        justifyContent: 'space-between'
    },
    egzersizBitisIsimText:{
        fontSize: windowHeight/43,
        fontFamily: 'GillSans-Italic',
        color: '#000000cc',
        fontWeight: '400',
        textAlign: 'center'
    },
    egzersizBitisBilgiContainer:{
        flex: 1.7,
        flexDirection: 'row'
    },
    egzersizBitisAltBilgiContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    egzersizBitisAltBilgiText:{
        fontSize: windowHeight/47,
        fontFamily: 'GillSans-Italic',
        color: '#4a4a4acc'
    },
    egzersizBitisbContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    egzersizBitirmeBaslikText:{
        fontSize: windowHeight/34,
        fontFamily: 'GillSans-Italic',
        color: '#46CC6B',
        fontWeight: '600',
        textAlign: 'center'
    },
    egzersizBitisGenelBilgilerText:{
        fontSize: windowHeight/44,
        fontFamily: 'GillSans-Italic',
        color: '#46CC6B',
        fontWeight: '600'
    }
   
});