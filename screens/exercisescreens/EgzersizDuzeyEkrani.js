import { useState, useContext } from "react"
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Image, ScrollView, Pressable, Linking } from "react-native"

import { AnimatedScrollView } from "@kanelloc/react-native-animated-header-scroll-view";

import SwitchSelector from 'react-native-switch-selector';

import EGZERSIZLER from "../../constants/egzersizler";

import { 
    KARIN_EGZERSIZLERI_BASLANGIC_HAFIF, 
    KARIN_EGZERSIZLERI_BASLANGIC_ORTA,
    KARIN_EGZERSIZLERI_BASLANGIC_YUKSEK,

    KARIN_EGZERSIZLERI_ORTA_HAFIF,
    KARIN_EGZERSIZLERI_ORTA_ORTA,
    KARIN_EGZERSIZLERI_ORTA_YUKSEK,

    KARIN_EGZERSIZLERI_YUKSEK_HAFIF,
    KARIN_EGZERSIZLERI_YUKSEK_ORTA,
    KARIN_EGZERSIZLERI_YUKSEK_YUKSEK,

    OMUZVESIRT_EGZERSIZLERI_BASLANGIC_HAFIF,
    OMUZVESIRT_EGZERSIZLERI_BASLANGIC_ORTA,
    OMUZVESIRT_EGZERSIZLERI_BASLANGIC_YUKSEK,

    OMUZVESIRT_EGZERSIZLERI_ORTA_HAFIF,
    OMUZVESIRT_EGZERSIZLERI_ORTA_ORTA,
    OMUZVESIRT_EGZERSIZLERI_ORTA_YUKSEK,

    OMUZVESIRT_EGZERSIZLERI_YUSEK_HAFIF,
    OMUZVESIRT_EGZERSIZLERI_YUSEK_ORTA,
    OMUZVESIRT_EGZERSIZLERI_YUSEK_YUKSEK,

    KOLVEGOGUS_EGZERSIZLERI_DUSUK_DUSUK,
    KOLVEGOGUS_EGZERSIZLERI_DUSUK_ORTA,
    KOLVEGOGUS_EGZERSIZLERI_DUSUK_YUKSEK,

    KOLVEGOGUS_EGZERSIZLERI_ORTA_DUSUK,
    KOLVEGOGUS_EGZERSIZLERI_ORTA_ORTA,
    KOLVEGOGUS_EGZERSIZLERI_ORTA_YUKSEK,

    KOLVEGOGUS_EGZERSIZLERI_YUSEK_DUSUK,
    KOLVEGOGUS_EGZERSIZLERI_YUSEK_ORTA,
    KOLVEGOGUS_EGZERSIZLERI_YUSEK_YUKSEK,

    BACAK_EGZERSIZLERI_DUSUK_DUSUK,
    BACAK_EGZERSIZLERI_DUSUK_ORTA,
    BACAK_EGZERSIZLERI_DUSUK_YUKSEK,

    BACAK_EGZERSIZLERI_ORTA_DUSUK,
    BACAK_EGZERSIZLERI_ORTA_ORTA,
    BACAK_EGZERSIZLERI_ORTA_YUKSEK,

    BACAK_EGZERSIZLERI_YUKSEK_DUSUK,
    BACAK_EGZERSIZLERI_YUKSEK_ORTA,
    BACAK_EGZERSIZLERI_YUKSEK_YUKSEK

} from "../../constants/egzersizplanlari";

import IconButton from "../../components/ui/IconButton";
import FavoriteButton from "../../components/ui/FavoriteButton";
import Button from "../../components/ui/Button";

import Modal from "react-native-modal";

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { UserDataContext } from "../../store/user-data-context";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function EgzersizDuzeyEkrani({navigation,route}){

    const { bolgeIsmi, bolge, duzeyIsmi, duzey, resim} = route.params;

    const [secilenYogunluk,setSecilenYogunluk] = useState(1);
    const [secilenEgzersiz,setSecilenEgzersiz] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    let yapilacakEgzersiz = [];

    const userDataCtx = useContext(UserDataContext);

    const options = [
        { label: "Hafif Yoğunluk", value: 1},
        { label: "Orta Yoğunluk", value: 2},
        { label: "Yüksek Yoğunluk", value: 3},
    ];

    function egzersizDetayinaBak(egzersizIndex){
        setSecilenEgzersiz(egzersizIndex);
        setModalVisible(true);
    }

    function egzersizEkraninaGit(){
        navigation.navigate('EgzersizEkrani',{yapilacakEgzersiz: yapilacakEgzersiz, bolgeIsmi: bolgeIsmi,duzeyIsmi: duzeyIsmi, yogunlukIsmi:options[secilenYogunluk-1].label, resim: resim });
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

   
    let SecilenPlan;

    // karın kası 
    if(bolge == 3 && duzey == 1 && secilenYogunluk === 1){ // karın kası başlangıç düzeyi hafif yoğunluk

        yapilacakEgzersiz = [...KARIN_EGZERSIZLERI_BASLANGIC_HAFIF];

        SecilenPlan = KARIN_EGZERSIZLERI_BASLANGIC_HAFIF.map(((data,index) =>{
           
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 3 && duzey == 1 && secilenYogunluk === 2){ // karın kası başlangıç düzeyi orta yoğunluk

        yapilacakEgzersiz = [...KARIN_EGZERSIZLERI_BASLANGIC_ORTA];

        SecilenPlan = KARIN_EGZERSIZLERI_BASLANGIC_ORTA.map(((data,index) =>{
           
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 3 && duzey == 1 && secilenYogunluk === 3){ // karın kası başlangıç düzeyi yuksek yoğunluk

        yapilacakEgzersiz = [...KARIN_EGZERSIZLERI_BASLANGIC_YUKSEK];

        SecilenPlan = KARIN_EGZERSIZLERI_BASLANGIC_YUKSEK.map(((data,index) =>{
           
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                            backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 3 && duzey == 2 && secilenYogunluk === 1){ // karın kası orta  düzeyi hafif yoğunluk

        yapilacakEgzersiz = [...KARIN_EGZERSIZLERI_ORTA_HAFIF];

        SecilenPlan = KARIN_EGZERSIZLERI_ORTA_HAFIF.map(((data,index) =>{
           
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                            <View style={styles.egzersizAltBilgiCoinater}>

                                <View style={styles.egzersizAltAltBilgiCoinater}>
                                    <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                    <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                                </View>
                                
                                <View style={styles.egzersizAltAltBilgiCoinater}>
                                    <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                    <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                                </View>
            
                            </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 3 && duzey == 2 && secilenYogunluk === 2){ // karın kası orta  düzeyi orta yoğunluk

        yapilacakEgzersiz = [...KARIN_EGZERSIZLERI_ORTA_ORTA];

        SecilenPlan = KARIN_EGZERSIZLERI_ORTA_ORTA.map(((data,index) =>{
            
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 3 && duzey == 2 && secilenYogunluk === 3){ // karın kası orta  düzeyi yuksek yoğunluk

        yapilacakEgzersiz = [...KARIN_EGZERSIZLERI_ORTA_YUKSEK];

        SecilenPlan = KARIN_EGZERSIZLERI_ORTA_YUKSEK.map(((data,index) =>{
            
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 3 && duzey == 3 && secilenYogunluk === 1){ // karın kası yusek  düzeyi baslangıç yoğunluk

        yapilacakEgzersiz = [...KARIN_EGZERSIZLERI_YUKSEK_HAFIF];

        SecilenPlan = KARIN_EGZERSIZLERI_YUKSEK_HAFIF.map(((data,index) =>{
            
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 3 && duzey == 3 && secilenYogunluk === 2){ // karın kası yusek  düzeyi orta yoğunluk

        yapilacakEgzersiz = [...KARIN_EGZERSIZLERI_YUKSEK_ORTA];

        SecilenPlan = KARIN_EGZERSIZLERI_YUKSEK_ORTA.map(((data,index) =>{
            
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 3 && duzey == 3 && secilenYogunluk === 3){ // karın kası yusek  düzeyi yuksek yoğunluk

        yapilacakEgzersiz = [...KARIN_EGZERSIZLERI_YUKSEK_YUKSEK];

        SecilenPlan = KARIN_EGZERSIZLERI_YUKSEK_YUKSEK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    // omuz ve sırt
    if(bolge == 1 && duzey == 1 && secilenYogunluk === 1){ // omuz ve sırt  dusuk  düzey dusuk yoğunluk

        yapilacakEgzersiz = [...OMUZVESIRT_EGZERSIZLERI_BASLANGIC_HAFIF];

        SecilenPlan = OMUZVESIRT_EGZERSIZLERI_BASLANGIC_HAFIF.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 1 && duzey == 1 && secilenYogunluk === 2){ // omuz ve sırt  dusuk  düzey orta yoğunluk

        yapilacakEgzersiz = [...OMUZVESIRT_EGZERSIZLERI_BASLANGIC_ORTA];

        SecilenPlan = OMUZVESIRT_EGZERSIZLERI_BASLANGIC_ORTA.map(((data, index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 1 && duzey == 1 && secilenYogunluk === 3){ // omuz ve sırt  dusuk  düzey yuksek yoğunluk

        yapilacakEgzersiz = [...OMUZVESIRT_EGZERSIZLERI_BASLANGIC_YUKSEK];

        SecilenPlan = OMUZVESIRT_EGZERSIZLERI_BASLANGIC_YUKSEK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 1 && duzey == 2 && secilenYogunluk === 1){ // omuz ve sırt  orta  düzey dusuk yoğunluk

        yapilacakEgzersiz = [...OMUZVESIRT_EGZERSIZLERI_ORTA_HAFIF];

        SecilenPlan = OMUZVESIRT_EGZERSIZLERI_ORTA_HAFIF.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 1 && duzey == 2 && secilenYogunluk === 2){ // omuz ve sırt  orta  düzey orta yoğunluk

        yapilacakEgzersiz = [...OMUZVESIRT_EGZERSIZLERI_ORTA_ORTA];

        SecilenPlan = OMUZVESIRT_EGZERSIZLERI_ORTA_ORTA.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 1 && duzey == 2 && secilenYogunluk === 3){ // omuz ve sırt  orta  düzey yuksek yoğunluk

        yapilacakEgzersiz = [...OMUZVESIRT_EGZERSIZLERI_ORTA_YUKSEK];

        SecilenPlan = OMUZVESIRT_EGZERSIZLERI_ORTA_YUKSEK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 1 && duzey == 3 && secilenYogunluk === 1){ // omuz ve sırt  yusek  düzey dusuk yoğunluk

        yapilacakEgzersiz = [...OMUZVESIRT_EGZERSIZLERI_YUSEK_HAFIF];

        SecilenPlan = OMUZVESIRT_EGZERSIZLERI_YUSEK_HAFIF.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 1 && duzey == 3 && secilenYogunluk === 2){ // omuz ve sırt  yusek  düzey orta yoğunluk

        yapilacakEgzersiz = [...OMUZVESIRT_EGZERSIZLERI_YUSEK_ORTA];

        SecilenPlan = OMUZVESIRT_EGZERSIZLERI_YUSEK_ORTA.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 1 && duzey == 3 && secilenYogunluk === 3){ // omuz ve sırt  yusek  düzey yuksek yoğunluk

        yapilacakEgzersiz = [...OMUZVESIRT_EGZERSIZLERI_YUSEK_YUKSEK];

        SecilenPlan = OMUZVESIRT_EGZERSIZLERI_YUSEK_YUKSEK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    // kol ve göğüs
    if(bolge == 2 && duzey == 1 && secilenYogunluk === 1){ // kol ve göğüs  dusuk  düzey dusuk yoğunluk

        yapilacakEgzersiz = [...KOLVEGOGUS_EGZERSIZLERI_DUSUK_DUSUK];

        SecilenPlan = KOLVEGOGUS_EGZERSIZLERI_DUSUK_DUSUK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 2 && duzey == 1 && secilenYogunluk === 2){ // kol ve göğüs  dusuk  düzey orta yoğunluk

        yapilacakEgzersiz = [...KOLVEGOGUS_EGZERSIZLERI_DUSUK_ORTA];

        SecilenPlan = KOLVEGOGUS_EGZERSIZLERI_DUSUK_ORTA.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 2 && duzey == 1 && secilenYogunluk === 3){ // kol ve göğüs  dusuk  düzey yuksek yoğunluk

        yapilacakEgzersiz = [...KOLVEGOGUS_EGZERSIZLERI_DUSUK_YUKSEK];

        SecilenPlan = KOLVEGOGUS_EGZERSIZLERI_DUSUK_YUKSEK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 2 && duzey == 2 && secilenYogunluk === 1){ // kol ve göğüs  orta  düzey dusuk yoğunluk

        yapilacakEgzersiz = [...KOLVEGOGUS_EGZERSIZLERI_ORTA_DUSUK];

        SecilenPlan = KOLVEGOGUS_EGZERSIZLERI_ORTA_DUSUK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 2 && duzey == 2 && secilenYogunluk === 2){ // kol ve göğüs  orta  düzey orta yoğunluk

        yapilacakEgzersiz = [...KOLVEGOGUS_EGZERSIZLERI_ORTA_ORTA];

        SecilenPlan = KOLVEGOGUS_EGZERSIZLERI_ORTA_ORTA.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 2 && duzey == 2 && secilenYogunluk === 3){ // kol ve göğüs  orta  düzey yuksek yoğunluk

        yapilacakEgzersiz = [...KOLVEGOGUS_EGZERSIZLERI_ORTA_YUKSEK];

        SecilenPlan = KOLVEGOGUS_EGZERSIZLERI_ORTA_YUKSEK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 2 && duzey == 3 && secilenYogunluk === 1){ // kol ve göğüs  yuksek  düzey dusuk yoğunluk

        yapilacakEgzersiz = [...KOLVEGOGUS_EGZERSIZLERI_YUSEK_DUSUK];

        SecilenPlan = KOLVEGOGUS_EGZERSIZLERI_YUSEK_DUSUK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 2 && duzey == 3 && secilenYogunluk === 2){ // kol ve göğüs  yuksek  düzey orta yoğunluk

        yapilacakEgzersiz = [...KOLVEGOGUS_EGZERSIZLERI_YUSEK_ORTA];

        SecilenPlan = KOLVEGOGUS_EGZERSIZLERI_YUSEK_ORTA.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 2 && duzey == 3 && secilenYogunluk === 3){ // kol ve göğüs  yuksek  düzey orta yoğunluk

        yapilacakEgzersiz = [...KOLVEGOGUS_EGZERSIZLERI_YUSEK_YUKSEK];

        SecilenPlan = KOLVEGOGUS_EGZERSIZLERI_YUSEK_YUKSEK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    // bacak
    if(bolge == 4 && duzey == 1 && secilenYogunluk === 1){ // bacak  düsük  düzey düsük yoğunluk

        yapilacakEgzersiz = [...BACAK_EGZERSIZLERI_DUSUK_DUSUK];

        SecilenPlan = BACAK_EGZERSIZLERI_DUSUK_DUSUK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 4 && duzey == 1 && secilenYogunluk === 2){ // bacak  düsük  düzey orta yoğunluk

        yapilacakEgzersiz = [...BACAK_EGZERSIZLERI_DUSUK_ORTA];

        SecilenPlan = BACAK_EGZERSIZLERI_DUSUK_ORTA.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 4 && duzey == 1 && secilenYogunluk === 3){ // bacak  düsük  düzey yuksek yoğunluk

        yapilacakEgzersiz = [...BACAK_EGZERSIZLERI_DUSUK_YUKSEK];

        SecilenPlan = BACAK_EGZERSIZLERI_DUSUK_YUKSEK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}                     
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 4 && duzey == 2 && secilenYogunluk === 1){ // bacak  düsük  düzey yuksek yoğunluk

        yapilacakEgzersiz = [...BACAK_EGZERSIZLERI_ORTA_DUSUK];

        SecilenPlan = BACAK_EGZERSIZLERI_ORTA_DUSUK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 4 && duzey == 2 && secilenYogunluk === 2){ // bacak  orta  düzey yuksek yoğunluk

        yapilacakEgzersiz = [...BACAK_EGZERSIZLERI_ORTA_ORTA];

        SecilenPlan = BACAK_EGZERSIZLERI_ORTA_ORTA.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 4 && duzey == 2 && secilenYogunluk === 3){ // bacak  orta  düzey yuksek yoğunluk

        yapilacakEgzersiz = [...BACAK_EGZERSIZLERI_ORTA_YUKSEK];

        SecilenPlan = BACAK_EGZERSIZLERI_ORTA_YUKSEK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                        key={index}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }
    
    if(bolge == 4 && duzey == 3 && secilenYogunluk === 1){ // bacak  gelişmiş  düzey düşük yoğunluk

        yapilacakEgzersiz = [...BACAK_EGZERSIZLERI_YUKSEK_DUSUK];

        SecilenPlan = BACAK_EGZERSIZLERI_YUKSEK_DUSUK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}   
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 4 && duzey == 3 && secilenYogunluk === 2){ // bacak  gelişmiş  düzey düşük yoğunluk

        yapilacakEgzersiz = [...BACAK_EGZERSIZLERI_YUKSEK_ORTA];

        SecilenPlan = BACAK_EGZERSIZLERI_YUKSEK_ORTA.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }

    if(bolge == 4 && duzey == 3 && secilenYogunluk === 3){ // bacak  gelişmiş  düzey düşük yoğunluk

        yapilacakEgzersiz = [...BACAK_EGZERSIZLERI_YUKSEK_YUKSEK];

        SecilenPlan = BACAK_EGZERSIZLERI_YUKSEK_YUKSEK.map(((data,index) =>{
        
            return(
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                        },
                    ]}
                    onPress={egzersizDetayinaBak.bind(this,data.index)}
                    key={index}
                >
                    <View 
                        style={styles.egzersizMainContainer}
                    >
                        <Image 
                            source={{
                                uri: EGZERSIZLER[data.index].gif
                            }}
                            style={styles.egzersizImage}
                            resizeMode="Stretch"
                        />
                        <View
                            style={styles.egzersizInfoContainer}
                        >
                            <View style={styles.egzersizBaslikCoinater}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[data.index].isim}</Text>
                            </View>
                            
                        <View style={styles.egzersizAltBilgiCoinater}>

                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <Ionicons name="ios-time-outline" size={windowHeight/33} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{data.sure} saniye</Text>
                            </View>
                            
                            <View style={styles.egzersizAltAltBilgiCoinater}>
                                <FontAwesome5 name="burn" size={windowHeight/35} color="black" style={{marginRight: 5}} />
                                <Text style={styles.egzersizText}>{(((data.sure/60)*3.5*userDataCtx.UserData.kilo*EGZERSIZLER[data.index].metDegeri)/200).toFixed(2)} kcal</Text>     
                            </View>
        
                        </View>
                        
                        </View>
                        
                    </View>
                </Pressable>
            );
        }));
    }


    return(
        <SafeAreaView style={styles.mainContainer}>
            <AnimatedScrollView
                topBarHeight={125}
                HeaderNavbarComponent={ 
                    <View style={{width: windowWidth}}>
                        <View style={styles.topMenuContanier}>
                            <IconButton 
                                icon="ios-arrow-back" 
                                size={26} 
                                color="white"
                                onPress={()=>{navigation.goBack()}}
                            /> 
                            <Text style={[styles.baslikText,{color: 'white'}]}>{bolgeIsmi} - {duzeyIsmi}</Text>      
                        </View>     
                    </View>
                    
                }
                TopNavBarComponent={
                    <View>
                        <View style={styles.topMenuContanier}>
                            <IconButton 
                                icon="ios-arrow-back" 
                                size={26} 
                                color="black"
                                onPress={()=>{navigation.goBack()}}
                            /> 
                            <Text style={styles.baslikText}>{bolgeIsmi} - {duzeyIsmi}</Text>               
                        </View>     
                        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                            <SwitchSelector
                                options={options}
                                initial={0}
                                onPress={value => setSecilenYogunluk(value)}
                                selectedColor= "black"
                                borderRadius={5}
                                style={{borderWidth: 0,borderRadius: 5,borderColor:'#fffefeff'}}
                                textStyle={{fontSize:windowHeight/50,fontFamily:'GillSans-Italic',color: 'black'}}
                                selectedTextStyle={{fontSize:windowHeight/45,fontFamily:'GillSans-Italic', color: 'white'}}
                                buttonColor={'#000000ff'}
                                backgroundColor={'#ffffff00'}
                            />
                        </View>
                    </View>
                    
                } 
                headerImage={{uri: resim}}
                imageStyle={{
                    width: windowWidth,
                    height: windowHeight/3.5,
                }}
            >
                <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center',marginBottom: 30, marginTop: 1}}>
                    <SwitchSelector
                        options={options}
                        initial={0}
                        onPress={value => setSecilenYogunluk(value)}
                        selectedColor= "black"
                        borderRadius={5}
                        style={{borderWidth: 0.5,marginTop: 20,borderRadius: 5,borderColor:'#000000ff'}}
                        textStyle={{fontSize:windowHeight/50,fontFamily:'GillSans-Italic',color: 'black'}}
                        selectedTextStyle={{fontSize:windowHeight/45,fontFamily:'GillSans-Italic', color: 'white'}}
                        buttonColor={'#000000ff'}
                        backgroundColor={'#ffffff00'}
                    />
                </View>

                {SecilenPlan}
            
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
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                        </View>
                    
                        <View style={{alignItems: 'center'}}>
                            <Image 
                                source={{
                                    uri: EGZERSIZLER[secilenEgzersiz].gif
                                }}
                                style={{height: 150, width: 180,borderRadius: 20,marginBottom: 20}}
                                resizeMode="Stretch"
                            />
                            <Text style={[styles.egzersizBaslikText,{fontSize: windowHeight/35}]}>{EGZERSIZLER[secilenEgzersiz].isim}</Text>
                            <ScrollView style={{marginTop: 20,marginBottom: 20}}>
                                <Text style={styles.egzersizBaslikText}>{EGZERSIZLER[secilenEgzersiz].talimat}</Text>
                            </ScrollView>
                            <Feather name="video" size={24} color="black" onPress={linkeGit.bind(this,EGZERSIZLER[secilenEgzersiz].youtubeLink)} />
                        </View>
                    </View>
                </Modal>

            </AnimatedScrollView>
            <Button
                style={{borderRadius: 0,height: 45, justifyContent: 'center'}}
                textStyle={{
                    fontSize: windowHeight/42,
                    fontFamily: 'GillSans-Italic',
                    fontWeight: '400',
                    textAlign: 'center'
                }}
                onPress={egzersizEkraninaGit}
            >Egzersize Başla</Button>
        </SafeAreaView>
    );

}

export default EgzersizDuzeyEkrani;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    topMenuContanier:{
        flexDirection:'row',
        alignItems: 'center',
        marginBottom: 10
    },
    baslikText:{
        fontSize: windowHeight/30,
        marginLeft:30,
        fontFamily: 'GillSans-Italic',
        fontWeight:'600',
    },
    egzersizMainContainer:{
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor: '#4a4a4a37',
        padding: 4
    },
    egzersizInfoContainer:{
        flex: 1,
        justifyContent: 'space-between',
    },
    egzersizImage:{
        height: 90, 
        width: 115,
        borderRadius: 10
    },
    egzersizBaslikText:{
        fontSize: windowHeight/43,
        fontFamily: 'GillSans-Italic',
        color: '#000000cc',
        fontWeight: '400',
        textAlign: 'center',
    },
    egzersizText:{
        fontSize: windowHeight/47,
        fontFamily: 'GillSans-Italic',
        color: '#4a4a4acc'
    },
    egzersizBaslikCoinater:{
        flex: 1
    },
    egzersizAltBilgiCoinater:{
        flex: 1.7,
        flexDirection: 'row'
    },
    egzersizAltAltBilgiCoinater:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    modalContainer:{
        flex: 1, 
        marginTop: windowHeight/6.5,
        marginRight: windowWidth/16,
        marginLeft: windowWidth/16, 
        marginBottom: windowHeight/6.5,
        backgroundColor: 'white', 
        borderRadius: 20
    }
});