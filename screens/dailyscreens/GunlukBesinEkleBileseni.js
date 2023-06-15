import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Image, Pressable, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";

import IconButton from "../../components/ui/IconButton";
import FavoriteButton from "../../components/ui/FavoriteButton";

import { getTodayDateWithoutClock } from "../../util/date";

import { AnimatedCircularProgress } from "react-native-circular-progress";

import { BesinGecmisiContext } from "../../store/besin-gecmisi-context";

import Modal from "react-native-modal";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function GunlukBesinEkleBileseni({tarih}){

    const navigation = useNavigation();

    const besinGecmisiCtx = useContext(BesinGecmisiContext);

    const [modalVisible, setModalVisible] = useState(false);

    const [ogunTuru, setOgunTuru] = useState(1);

    const [kahvaltiVerileri, setKahvaltiVerileri] = useState([]);
    const [oglenYemegiVerileri, setOglenYemegiVerileri] = useState([]);
    const [aksamYemegiVerileri, setAksamYemegiVerileri] = useState([]);
    const [atistirmalikVerileri, setAtistirmalikVerileri] = useState([]);

    const [alinanKalori1 , setAlinanKalori1 ] = useState(0);
    const [alinanProtein1, setAlinanProtein1] = useState(0);
    const [alinanYag1 , setAlinanYag1] = useState(0);
    const [alinanKarbonhidrat1 , setalinanKarbonhidrat1] = useState(0.0);

    const [alinanKalori2 , setAlinanKalori2 ] = useState(0);
    const [alinanProtein2, setAlinanProtein2] = useState(0);
    const [alinanYag2 , setAlinanYag2] = useState(0);
    const [alinanKarbonhidrat2 , setalinanKarbonhidrat2] = useState(0);

    const [alinanKalori3 , setAlinanKalori3 ] = useState(0);
    const [alinanProtein3, setAlinanProtein3] = useState(0);
    const [alinanYag3 , setAlinanYag3] = useState(0);
    const [alinanKarbonhidrat3 , setalinanKarbonhidrat3] = useState(0);

    const [alinanKalori4 , setAlinanKalori4 ] = useState(0);
    const [alinanProtein4, setAlinanProtein4] = useState(0);
    const [alinanYag4 , setAlinanYag4] = useState(0);
    const [alinanKarbonhidrat4 , setalinanKarbonhidrat4] = useState(0);

    function besinEkle(ogunTuru){

        navigation.navigate('GunlukBesinEkleEkrani',{
            ogunTuru: ogunTuru
        });
    }

    function besinleriGoruntule(ogunTuru){

        setModalVisible(true);

        setOgunTuru(ogunTuru);

    }

    function ModalIcerik(){

        let baslik;
        let dizi;

        let tarihBaslik = getTodayDateWithoutClock(tarih);

        if(ogunTuru == 1){
            baslik = 'Kahvaltıda Tüketilenler';
            dizi = [...kahvaltiVerileri];
        }
        else if(ogunTuru == 2){
            baslik = 'Öğle Yemeğinde Tüketilenler';
            dizi = [...oglenYemegiVerileri];
        }
        else if(ogunTuru == 3){
            baslik = 'Akşam Yemeğinde Tüketilenler';
            dizi = [...aksamYemegiVerileri];
        }
        else if(ogunTuru == 4){
            baslik = 'Atıştırmalık Olarak Tüketilenler';
            dizi = [...atistirmalikVerileri];
        }
        
        return(
            <View>
                <View style={{marginBottom: 40, alignItems: 'center'}}>
                    <Text style={{fontSize: 19, fontFamily: 'GillSans-Italic'}}>{tarihBaslik}</Text>
                </View>

                <View style={{marginBottom: 20, alignItems: 'center'}}>
                    <Text style={{fontSize: 17, fontFamily: 'GillSans-Italic'}}>{baslik}</Text>
                </View>

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={dizi}
                    decelerationRate={0.1}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={20}
                    renderItem={(data)=>{
                        return(
                            <View>

                                <View style={{flexDirection: 'row',  borderBottomWidth: 0.4,borderBottomColor: '#b4b4b4ff', padding: 10,  width: windowWidth-10,  marginLeft: 5,  borderRadius: 5 }}>
                                            
                                    <View style={{flex: 5,justifyContent: 'space-between',alignItems: 'flex-start'}}>
                                        <Text style={{ fontSize: 15,fontFamily: 'GillSans-Italic', color: '#6e6e6eff'}}>{data.item.besinAdi}</Text>
                                        <View style={{flexDirection: 'row',alignItems: 'flex-start'}}>
                                            <Text style={{ fontSize: 13,fontFamily: 'GillSans-Italic', color: '#6e6e6eff'}}>{data.item.miktar} adet     </Text>
                                            <Text style={{ fontSize: 13,fontFamily: 'GillSans-Italic', color: '#6e6e6eff'}}>{Math.round(data.item.alinanKalori)} kcal</Text>
                                        </View>                                        
                                    </View>

                                </View>  

                            </View>      
                        );    
                    }}
                />  

            </View>
        );
    }


    useEffect(() => {
        function degerleriHesapla(){ 

            setAlinanKalori1(0);setAlinanKalori2(0);setAlinanKalori3(0);setAlinanKalori4(0);

            setAlinanProtein1(0); setAlinanProtein2(0); setAlinanProtein3(0); setAlinanProtein4(0);

            setAlinanYag1(0); setAlinanYag2(0); setAlinanYag3(0); setAlinanYag4(0);

            setalinanKarbonhidrat1(0); setalinanKarbonhidrat2(0); setalinanKarbonhidrat3(0); setalinanKarbonhidrat4(0);

            setKahvaltiVerileri([]);
            setOglenYemegiVerileri([]);
            setAksamYemegiVerileri([]);
            setAtistirmalikVerileri([]);
 
            if(besinGecmisiCtx.BesinEgzersizData.length>0){
                
                besinGecmisiCtx.BesinEgzersizData.forEach((data)=>{

                    if(tarih.getDate() == data.eklenmeTarihi.toDate().getDate() && tarih.getMonth() == data.eklenmeTarihi.toDate().getMonth() && tarih.getFullYear() == data.eklenmeTarihi.toDate().getFullYear()){
                        
                        if(data.ogunTuru == 1){

                            setKahvaltiVerileri(oncekiVeriler => [...oncekiVeriler,data]);

                            setAlinanKalori1(oncekiDeger => Math.round(oncekiDeger+data.alinanKalori));
                            setAlinanProtein1(oncekiDeger => (parseFloat(oncekiDeger)+parseFloat(data.proteinMiktari)).toFixed(2));
                            setAlinanYag1(oncekiDeger=> (parseFloat(oncekiDeger)+parseFloat(data.yagMiktari)).toFixed(2));
                            setalinanKarbonhidrat1(oncekiDeger=> (parseFloat(oncekiDeger)+parseFloat(data.karbonhidratMiktari)).toFixed(2));
                        }
                        else if(data.ogunTuru == 2){

                            setOglenYemegiVerileri(oncekiVeriler => [...oncekiVeriler,data]);

                            setAlinanKalori2(oncekiDeger => Math.round(oncekiDeger+data.alinanKalori));
                            setAlinanProtein2(oncekiDeger => (parseFloat(oncekiDeger)+parseFloat(data.proteinMiktari)).toFixed(2));
                            setAlinanYag2(oncekiDeger => (parseFloat(oncekiDeger)+parseFloat(data.yagMiktari)).toFixed(2));
                            setalinanKarbonhidrat2(oncekiDeger => (parseFloat(oncekiDeger)+parseFloat(data.karbonhidratMiktari)).toFixed(2));
                        }
                        else if(data.ogunTuru == 3){

                            setAksamYemegiVerileri(oncekiVeriler => [...oncekiVeriler,data]);

                            setAlinanKalori3(oncekiDeger => Math.round(oncekiDeger+data.alinanKalori));
                            setAlinanProtein3(oncekiDeger => (parseFloat(oncekiDeger)+parseFloat(data.proteinMiktari)).toFixed(2));
                            setAlinanYag3(oncekiDeger => (parseFloat(oncekiDeger)+parseFloat(data.yagMiktari)).toFixed(2));
                            setalinanKarbonhidrat3(oncekiDeger => (parseFloat(oncekiDeger)+parseFloat(data.karbonhidratMiktari)).toFixed(2));
                        }
                        else if(data.ogunTuru == 4){

                            setAtistirmalikVerileri(oncekiVeriler => [...oncekiVeriler,data]);

                            setAlinanKalori4(oncekiDeger => Math.round(oncekiDeger+data.alinanKalori));
                            setAlinanProtein4(oncekiDeger => (parseFloat(oncekiDeger)+parseFloat(data.proteinMiktari)).toFixed(2));
                            setAlinanYag4(oncekiDeger => (parseFloat(oncekiDeger)+parseFloat(data.yagMiktari)).toFixed(2));
                            setalinanKarbonhidrat4(oncekiDeger => (parseFloat(oncekiDeger)+parseFloat(data.karbonhidratMiktari)).toFixed(2));
                        }
                    }
                 
                });
            }
  
        } 
        
        degerleriHesapla();
    },[besinGecmisiCtx,tarih]);


    return(
        <View>

            <View style={styles.besinEkleMainMainContainer}>

                <Pressable onPress={besinleriGoruntule.bind(this,1)} style={styles.besinEkleMainContainer}>
                
                    <View style={styles.circleProgressContainer}>
                        <AnimatedCircularProgress
                            size={60}
                            width={4}
                            fill={(alinanKalori1*100)/500}
                            tintColor='#000000ff'
                            backgroundColor= "#e7e7e7"     
                        >
                            {
                                (fill) => (
                                    <Image 
                                        source={require('../../assets/kahvalti.png')}
                                        style={styles.ogunTuruImage}
                                    />
                                )
                            }       
                        </AnimatedCircularProgress>
                    </View>

                    <View style={{flex: 3}}>
                        <View style={styles.altBilgiUstContainer}>
                            <Text style={styles.ogunBaslikText}>Kahvaltı</Text>
                            <IconButton 
                                size={windowHeight/25}
                                icon="ios-add-circle"
                                color= "black"
                                onPress={besinEkle.bind(this,1)}
                            />
                        </View>

                        <View style={styles.altBilgiAltContainer}>

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanKalori1}/500</Text>
                                <Text style={styles.ogunAltBilgiText}>kcal</Text>
                            </View>

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanYag1} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Yağ</Text>
                            </View>
                       
                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanProtein1} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Protein</Text>
                            </View>

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanKarbonhidrat1} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Karb.</Text>
                            </View>
       
                        </View>
                    
                    </View>
                
                </Pressable>

                <Pressable onPress={besinleriGoruntule.bind(this,2)} style={styles.besinEkleMainContainer}>
                
                    <View style={styles.circleProgressContainer}>
                        <AnimatedCircularProgress
                            size={60}
                            width={4}
                            fill={(alinanKalori2*100)/700}
                            tintColor='#000000ff'
                            backgroundColor="#e7e7e7"     
                        >
                            {
                                (fill) => (
                                    <Image 
                                        source={require('../../assets/ogle.png')}
                                        style={styles.ogunTuruImage}
                                    />
                                )
                            }       
                        </AnimatedCircularProgress>
                    </View>

                    <View style={{flex: 3}}>
                        <View style={styles.altBilgiUstContainer}>
                            <Text style={styles.ogunBaslikText}>Öğle Yemeği</Text>
                            <IconButton 
                                size={windowHeight/25}
                                icon="ios-add-circle"
                                color= "black"
                                onPress={besinEkle.bind(this,2)}
                            />
                        </View>

                        <View style={styles.altBilgiAltContainer}>

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanKalori2}/700</Text>
                                <Text style={styles.ogunAltBilgiText}>kcal</Text>
                            </View>
                        
                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanYag2} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Yağ</Text>
                            </View>
    
                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanProtein2} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Protein</Text>
                            </View>

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanKarbonhidrat2} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Karb.</Text>
                            </View>

                        </View>
                    
                    </View>
                
                </Pressable>

                <Pressable onPress={besinleriGoruntule.bind(this,3)} style={styles.besinEkleMainContainer}>
                
                    <View style={styles.circleProgressContainer}>
                        <AnimatedCircularProgress
                            size={60}
                            width={4}
                            fill={(alinanKalori3*100)/700}
                            tintColor='#000000ff'
                            backgroundColor="#e7e7e7"     
                        >
                            {
                                (fill) => (
                                    <Image 
                                        source={require('../../assets/aksam.png')}
                                        style={styles.ogunTuruImage}
                                    />
                                )
                            }       
                        </AnimatedCircularProgress>
                    </View>

                    <View style={{flex: 3}}>
                        <View style={styles.altBilgiUstContainer}>
                            <Text style={styles.ogunBaslikText}>Akşam Yemeği</Text>
                            <IconButton 
                                size={windowHeight/25}
                                icon="ios-add-circle"
                                color= "black"
                                onPress={besinEkle.bind(this,3)}
                            />
                        </View>

                        <View style={styles.altBilgiAltContainer}>

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanKalori3}/700</Text>
                                <Text style={styles.ogunAltBilgiText}>kcal</Text>
                            </View>
                        
                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanYag3} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Yağ</Text>
                            </View>
                        
                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanProtein3} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Protein</Text>
                            </View>

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanKarbonhidrat3} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Karb.</Text>
                            </View>

                        </View>
                    
                    </View>
                
                </Pressable>

                <Pressable onPress={besinleriGoruntule.bind(this,4)} style={styles.besinEkleMainContainer}>
                
                    <View style={styles.circleProgressContainer}>
                        <AnimatedCircularProgress
                            size={60}
                            width={4}
                            fill={(alinanKalori4*100)/500}
                            tintColor='#000000ff'
                            backgroundColor="#e7e7e7"     
                        >
                            {
                                (fill) => (
                                    <Image 
                                        source={require('../../assets/snack.png')}
                                        style={styles.ogunTuruImage}
                                    />
                                )
                            }       
                        </AnimatedCircularProgress>
                    </View>

                    <View style={{flex: 3}}>
                        <View style={styles.altBilgiUstContainer}>
                            <Text style={styles.ogunBaslikText}>Atıştırmalık</Text>
                            <IconButton 
                                size={windowHeight/25}
                                icon="ios-add-circle"
                                color= "black"
                                onPress={besinEkle.bind(this,4)}
                            />
                        </View>

                        <View 
                        style={{  
                            flex: 1, 
                            flexDirection: 'row', 
                            justifyContent: 'space-between',
                            marginRight: 17,
                            paddingBottom: 10
                        }}>

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanKalori4}/500</Text>
                                <Text style={styles.ogunAltBilgiText}>kcal</Text>
                            </View>
                        
                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanYag4} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Yağ</Text>
                            </View>

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanProtein4} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Protein</Text>
                            </View>

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{alinanKarbonhidrat4} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Karb.</Text>
                            </View>

                        </View>
                    
                    </View>
                
                </Pressable>

            </View>

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
                                setModalVisible(!modalVisible);
                            }}
                        />
                    </View>

                    <ModalIcerik />

                </View>
            </Modal>
        
        </View>
    );
}

export default GunlukBesinEkleBileseni;

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
    ogunTuruImage:{
        height: 33,
        width: 33,
    },
    besinEkleMainMainContainer:{
        backgroundColor: 'white', 
        borderRadius: 20, 
        width: windowWidth-30,
        marginLeft: 15,
        marginTop: 20
    },
    besinEkleMainContainer:{
        marginTop: 8, 
        marginBottom: 8,
        flexDirection: 'row'
    },
    circleProgressContainer:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    altBilgiUstContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        flex: 1,
        alignItems: 'center',
        marginBottom: 6,
    },
    altBilgiAltContainer:{
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginRight: 17,
        paddingBottom: 10,
        borderBottomWidth: 0.4,
        borderBottomColor: '#b4b4b4ff' 
    },
    ogunBaslikText:{
        fontSize: 16,
        fontFamily: 'GillSans-Italic' 
    },
    ogunAltBilgiContainer:{
        alignItems: 'center'
    },
    ogunUsBilgiText:{
        fontSize: 14,
        fontFamily: 'GillSans-Italic' ,
        color: '#6e6e6eff' 
    },
    ogunAltBilgiText:{
        fontSize: 13,
        fontFamily: 'GillSans-Italic' ,
        color: '#6e6e6eff' 
    },
    modalContainer:{
        flex: 1, 
        marginTop: windowHeight/6.5,
        marginRight: windowWidth/16,
        marginLeft: windowWidth/16, 
        marginBottom: windowHeight/6.5,
        backgroundColor: '#fafafaff', 
        borderRadius: 20
    },

   

});

