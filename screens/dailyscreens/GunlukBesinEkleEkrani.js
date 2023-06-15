import { useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList, Pressable, Image,ScrollView } from "react-native";

import { SearchBar } from '@rneui/themed';
import DropDownPicker from "react-native-dropdown-picker";

import LoadingOverlay from "../../components/ui/LoadingOverlay";

import { addDoc, collection, Timestamp } from "firebase/firestore";
import {getDbObject} from '../../firebase/FireBaseObjects'

import {AuthContext} from "../../store/auth-context";
import { FavoriTariflerContext } from "../../store/tarifler-favori-context";
import { BesinGecmisiContext } from "../../store/besin-gecmisi-context";

import Modal from "react-native-modal";

import IconButton from "../../components/ui/IconButton";
import FavoriteButton from "../../components/ui/FavoriteButton";
import Button from "../../components/ui/Button";


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const db = getDbObject();

import { yiyecekAl } from "../../util/apirequest";

function GunlukBesinEkleEkrani({navigation, route}){

    const { ogunTuru} = route.params;
   
    const authCtx = useContext(AuthContext);
    const kullaniciFavorilerCtx = useContext(FavoriTariflerContext);
    const besinGecmisiCtx = useContext(BesinGecmisiContext);

    const [besinAdi, setBesinAdi] = useState("");

    const [yiyecekGetirildiMi , setYiyecekGetirildiMi ] = useState(true);
    const [veritabaninaKaydedildiMi , setVeritabaninaKaydedildiMi] = useState(true);

    const [besinTuru, setBesinTuru] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);

    const [yiyecekData, setYiyecekData] = useState([]);
    const [eklenmekIstenenYiyecekData, setEklenmekIstenenYiyecekData] = useState([]);

    const [besinAcik, setBesinAcik] = useState(false);
    const [secilenMiktar, setSecilenMiktar] = useState(1);

    let aramaCubugu;

    let yiyecekListe
    let tariflListe;

    function updateSearch(text){
        setBesinAdi(text);
    }

    function besinDegistir(besinTuru){
        setBesinTuru(besinTuru);
    }

    function detayEkraninaGit(tarifVerisi){
        navigation.navigate('TarifDetayEkrani',{
            tarifVerisi: tarifVerisi
        });
    }

    function besinEkle(eklenmekekIstenen){

        setEklenmekIstenenYiyecekData(eklenmekekIstenen);

        setModalVisible(true);

    }

    async function besinKaydet(veriler){

        setVeritabaninaKaydedildiMi(false);

        try {
            const referans = collection(db,"kullanicibesinleri",authCtx.uid,"besinkayitlari");

            await addDoc(referans, {
                besinAdi: veriler[0],
                ogunTuru: ogunTuru,
                miktar: secilenMiktar,
                alinanKalori: veriler[1],
                proteinMiktari: veriler[2],
                yagMiktari: veriler[3],
                karbonhidratMiktari: veriler[4],
                eklenmeTarihi: Timestamp.fromDate(new Date())
            });

            besinGecmisiCtx.addGecmisBesinData({
                besinAdi: veriler[0],
                ogunTuru: ogunTuru,
                miktar: secilenMiktar,
                alinanKalori: veriler[1],
                proteinMiktari: veriler[2],
                yagMiktari: veriler[3],
                karbonhidratMiktari: veriler[4],
                eklenmeTarihi: Timestamp.fromDate(new Date())
            });

        } catch (error) {
            console.log(error.toString());
        }

        setModalVisible(!modalVisible);
        
        setVeritabaninaKaydedildiMi(true);
        
    }

    async function yiyecekVerisiniGetir(){

        setYiyecekGetirildiMi(false);
        try {

            const tarifVerileri = await yiyecekAl(besinAdi);
            setYiyecekData(tarifVerileri);

        } catch (error) {
            console.log(error.toString());
        }
        setYiyecekGetirildiMi(true); 
    }

    function ModalTuru(){
        
        if(besinTuru && eklenmekIstenenYiyecekData != undefined){

            let besinAdi = eklenmekIstenenYiyecekData.food.label;
            let kalori = Math.round(eklenmekIstenenYiyecekData.food.nutrients.ENERC_KCAL)*secilenMiktar;
            let proteinMiktari = parseFloat(eklenmekIstenenYiyecekData.food.nutrients.PROCNT*secilenMiktar).toFixed(2);
            let yagMiktari = parseFloat(eklenmekIstenenYiyecekData.food.nutrients.FAT*secilenMiktar).toFixed(2);
            let karbonhidratMiktari =  parseFloat(eklenmekIstenenYiyecekData.food.nutrients.CHOCDF*secilenMiktar).toFixed(2);
           
            let dizi = [besinAdi,kalori,proteinMiktari,yagMiktari,karbonhidratMiktari];

            return(
                <View> 
                    <View style={{marginBottom: 40, alignItems: 'center'}}>
                        <Text style={{fontSize: 22, fontFamily: 'GillSans-Italic'}}>{besinAdi}</Text>
                    </View> 

                    <View style={{marginBottom: 20, alignItems: 'center', zIndex: 2,width: 160,marginLeft: 65}}>
                        <DropDownPicker
                            placeholder="Adetler"
                            placeholderStyle={{
                                fontFamily: 'GillSans-Italic',
                                fontSize: 17,
                                fontWeight: '600'
                            }}
                            showTickIcon={true}
                            open={besinAcik}
                            value={secilenMiktar}
                            labelStyle={{fontFamily:'GillSans-Italic',fontSize:16}}
                            listItemLabelStyle={{fontFamily:'GillSans-Italic'}}                      
                            items={[
                                {label: '1 Adet', value: 1,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '2 Adet', value: 2,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '3 Adet', value: 3,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '4 Adet', value: 4,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '5 Adet', value: 5,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '6 Adet', value: 6,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '7 Adet', value: 7,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '8 Adet', value: 8,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '9 Adet', value: 9,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '10 Adet', value: 10,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '11 Adet', value: 11,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '12 Adet', value: 12,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '13 Adet', value: 13,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '14 Adet', value: 14,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                                {label: '15 Adet', value: 15,icon: () => <Image source={require('../../assets/yemek.png')} style={styles.dropDownImage}/>},
                            ]}
                            setOpen={setBesinAcik}
                            setValue={setSecilenMiktar}
                        />    
                    </View> 

                    <View>

                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.kaloriText}>{kalori} kcal</Text>
                        </View> 

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40}}> 

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{yagMiktari} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Yağ</Text>
                            </View> 

                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{proteinMiktari} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Protein</Text>
                            </View> 
                           
                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{karbonhidratMiktari} g</Text>
                               
                                <Text style={styles.ogunAltBilgiText}>Karbonhidrat</Text>
                            </View> 
                        </View>

                    </View> 
                    <View style={{marginTop: 60, alignItems: 'center'}}>
                        <Button onPress={besinKaydet.bind(this,dizi)} style={{width:windowWidth/3}} textStyle={{fontSize:15,fontFamily: 'GillSans-Italic', }}>Ekle</Button>
                    </View>
                </View>
            );
        }
        else if(!besinTuru && eklenmekIstenenYiyecekData != undefined){

            let besinAdi = eklenmekIstenenYiyecekData.label;
            let kalori = Math.round(eklenmekIstenenYiyecekData.calories/eklenmekIstenenYiyecekData.yield)*secilenMiktar;
            let proteinMiktari = parseFloat(eklenmekIstenenYiyecekData.totalNutrients.PROCNT.quantity*secilenMiktar).toFixed(2);
            let yagMiktari = parseFloat(eklenmekIstenenYiyecekData.totalNutrients.FAT.quantity*secilenMiktar).toFixed(2);
            let karbonhidratMiktari = parseFloat(eklenmekIstenenYiyecekData.totalNutrients.CHOCDF.quantity*secilenMiktar).toFixed(2);

            let dizi = [besinAdi,kalori,proteinMiktari,yagMiktari,karbonhidratMiktari];

            return(
                <View> 
                    <View style={{marginBottom: 40, alignItems: 'center'}}>
                        <Text style={{fontSize: 22, fontFamily: 'GillSans-Italic'}}>{besinAdi}</Text>
                    </View> 

                    <View style={{marginBottom: 40, alignItems: 'center', zIndex: 2,width: 160,marginLeft: 65}}>
                        <DropDownPicker
                            placeholder="Adetler"
                            placeholderStyle={{
                                fontFamily: 'GillSans-Italic',
                                fontSize: 17,
                                fontWeight: '600'
                            }}
                            showTickIcon={true}
                            open={besinAcik}
                            value={secilenMiktar}
                            labelStyle={{fontFamily:'GillSans-Italic',fontSize:16}}
                            listItemLabelStyle={{fontFamily:'GillSans-Italic'}}                      
                            items={[
                                {label: '1 Porsiyon', value: 1,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '2 Porsiyon', value: 2,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '3 Porsiyon', value: 3,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '4 Porsiyon', value: 4,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '5 Porsiyon', value: 5,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '6 Porsiyon', value: 6,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '7 Porsiyon', value: 7,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '8 Porsiyon', value: 8,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '9 Porsiyon', value: 9,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '10 Porsiyon', value: 10,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '11 Porsiyon', value: 11,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '12 Porsiyon', value: 12,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '13 Porsiyon', value: 13,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '14 Porsiyon', value: 14,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                                {label: '15 Porsiyon', value: 15,icon: () => <Image source={require('../../assets/tarif.png')} style={styles.dropDownImage}/>},
                            ]}
                            setOpen={setBesinAcik}
                            setValue={setSecilenMiktar}
                        />    
                    </View> 

                    <View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.kaloriText}>{kalori} kcal</Text>
                        </View> 

                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40}}> 
                            <View style={styles.ogunAltBilgiContainer}>                     
                                <Text style={styles.ogunUsBilgiText}>{proteinMiktari} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Protein</Text>
                            </View> 
                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{yagMiktari} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Yağ</Text>
                            </View> 
                            <View style={styles.ogunAltBilgiContainer}>
                                <Text style={styles.ogunUsBilgiText}>{karbonhidratMiktari} g</Text>
                                <Text style={styles.ogunAltBilgiText}>Karbonhidrat</Text>
                            </View> 
                        </View>
                    </View> 
                    <View style={{marginTop: 60, alignItems: 'center'}}>
                        <Button onPress={besinKaydet.bind(this,dizi)} style={{width:windowWidth/3}} textStyle={{fontSize:15,fontFamily: 'GillSans-Italic'}}>Ekle</Button>
                    </View>
                </View>
            );
            
        }
    }
    
    if(besinTuru){

        aramaCubugu =

            <View style={{marginTop: 15}}>
                <SearchBar
                    placeholder="Yiyecekler"
                    clearIcon={{color:'black'}}
                    searchIcon={{color:'black'}}
                    onChangeText={updateSearch}
                    value={besinAdi}
                    containerStyle={{backgroundColor:'#ffffff00'}}
                    inputContainerStyle={{backgroundColor:'#e3e3e3ff',height: 20}}
                    inputStyle={{color: 'black',fontFamily:'GillSans-Italic'}}
                    platform="ios"
                    cancelButtonProps={{color:'black',backgroundColor:'#ffffff00'}}
                    returnKeyType="search"
                    selectionColor="black"
                    onSubmitEditing={yiyecekVerisiniGetir}
                    cancelButtonTitle="Vazgeç"   
                />
            </View>

        if(yiyecekData.length>0){

            yiyecekListe= 

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={yiyecekData}
                    decelerationRate={0.1}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={20}
                    renderItem={(data)=>{

                        return(
                            <View>

                                <View style={{flexDirection: 'row',  borderBottomWidth: 0.4,borderBottomColor: '#b4b4b4ff', padding: 10,  width: windowWidth-10,  marginLeft: 5,  borderRadius: 5 }}>
                                        
                                <View style={{flex: 5,justifyContent: 'space-between',alignItems: 'flex-start'}}>
                                    <Text style={{ fontSize: 17,fontFamily: 'GillSans-Italic' }}>{data.item.food.label}</Text>
                                    <Text style={{  fontSize: 14, fontFamily: 'GillSans-Italic' , color: '#6e6e6eff'}}>1 adet {Math.round(data.item.measures[0].weight)} g</Text>
                                </View>

                                <View style={{flex: 2,justifyContent: 'flex-end',alignItems: 'center',flexDirection: 'row'}}>
                                        
                                        <Text style={{ fontSize: 15,fontFamily: 'GillSans-Italic' }}>{Math.round(data.item.food.nutrients.ENERC_KCAL)} kcal</Text>
                                        
                                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                                        <IconButton 
                                                size={windowHeight/25}
                                                icon="ios-add-circle"
                                                color= "black"
                                                onPress={besinEkle.bind(this,data.item)}
                                            />
                                        </View>            
                                    </View>         

                                
                            </View>  

                            </View>      
                        );    
                    }}
                />  
        }
        else{

            yiyecekListe = 
                <View style={{flexDirection: 'row',alignItems: 'center', marginTop: 10}}>
                    <Image 
                        source={require('../../assets/bilgi.png')}
                        style={{height: 28, width: 28, marginRight: 10, marginLeft: 10}}
                    />
                    <Text style={styles.bilgiText}>Listenecek yiyecekler bulunamamıştır lütfen yazdığınız değeri tekrardan gözden geçiriniz veya bir arama yapınız.</Text>
                </View>
        }

    }
    else{
        
        if( kullaniciFavorilerCtx.FavoriTarifler.length == 0){
            tariflListe = 
                <View style={{flexDirection: 'row',alignItems: 'center', marginTop: 20, marginLeft: 10}}>
                    <Image 
                        source={require('../../assets/bilgi.png')}
                        style={{height: 28, width: 28, marginRight: 10}}
                    />
                    <Text style={styles.bilgiText}>Favorilerde kayıtlı tarifler bulunamamıştır. Tarifler ekranından istediğiniz tarifi favorilerinize ekleyebilirsiniz.</Text>
                </View>
        }
        else{

            tariflListe = 

            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{marginTop: 20}}
            >
                {
                    kullaniciFavorilerCtx.FavoriTarifler.map((data,index)=>{

                        return(
                            <Pressable 
                                onPress={detayEkraninaGit.bind(this,data)} 
                                key={index} 
                                style={({pressed}) => [
                                    {
                                        backgroundColor: pressed ? '#8a8a8a37' : '#ffffff00',
                                    },
                                ]}
                            >
                                <View style={{flexDirection: 'row',  borderBottomWidth: 0.4,borderBottomColor: '#b4b4b4ff', padding: 10,  width: windowWidth-10,  marginLeft: 5,  borderRadius: 5 }}>
                                    <View style={{flex: 1,justifyContent: 'center'}}>
                                        <Image 
                                            style={{height: 40, width: 40}}
                                            source={{
                                                uri: data.image
                                            }}
                                        />
                                    </View>
                                            
                                    <View style={{flex: 4,justifyContent: 'space-between',alignItems: 'center'}}>
                                        <Text style={{ fontSize: 15,fontFamily: 'GillSans-Italic' }}>{data.label}</Text>
                                        <Text style={{  fontSize: 14, fontFamily: 'GillSans-Italic' , color: '#6e6e6eff' }}>{data.yield} porsiyon  </Text>
                                    </View>

                                    <View style={{flex: 2,justifyContent: 'flex-end',alignItems: 'center',flexDirection: 'row'}}>
                                        
                                        <Text style={{ fontSize: 15,fontFamily: 'GillSans-Italic' }}>{Math.round(data.calories)} kcal</Text>
                                        
                                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                                        <IconButton 
                                                size={windowHeight/25}
                                                icon="ios-add-circle"
                                                color= "black"
                                                onPress={besinEkle.bind(this,data)}
                                            />
                                        </View>            
                                    </View>              
                                </View>                                      
                            </Pressable>     
                        );
                    })
                }
            </ScrollView>

        }
    }

    if(!yiyecekGetirildiMi){
        return(
            <LoadingOverlay color="black" />
        );
    }

    if(!veritabaninaKaydedildiMi){
        return(
            <LoadingOverlay color="black" />
        );
    }

    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.topMenuContanier}>
                <IconButton 
                    icon="ios-arrow-back" 
                    size={26} 
                    color= "black"
                    onPress={()=>{navigation.goBack()}}
                /> 
            </View>
        
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20}}>
                <View style={{alignItems: 'center'}}>
                    <Pressable
                        style={({pressed}) => [
                            {
                                backgroundColor: pressed ? '#8a8a8a37' : 'white',
                            },
                            styles.anaSecimContainer
                        ]}
                        onPress={besinDegistir.bind(this,true)}
                    
                    >
                        <View>
                            <Image 
                                source={require('../../assets/yemek.png')}
                                style={styles.ogunTuruImage}
                            />
                        </View>
                    </Pressable>
                    <Text style={styles.anaSecimText}>Yiyecekler</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Pressable
                        style={({pressed}) => [
                            {
                                backgroundColor: pressed ? '#8a8a8a37' : 'white',
                            },
                            styles.anaSecimContainer
                        ]}
                        onPress={besinDegistir.bind(this,false)}
                    
                    >
                        <View>
                            <Image 
                                source={require('../../assets/tarif.png')}
                                style={styles.ogunTuruImage}
                            />
                        </View>
                    </Pressable>
                    <Text style={styles.anaSecimText}>Tarifler</Text>
                </View>
            </View>

            {aramaCubugu}

            {yiyecekListe}
            {tariflListe}

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
                    <ModalTuru />
                </View>
            </Modal>
      
        </SafeAreaView>

    );
}

export default GunlukBesinEkleEkrani;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    topMenuContanier:{
        flexDirection:'row',
        alignItems: 'center'
    },
    ogunTuruImage:{
        height: 55,
        width: 55,
    },
    anaSecimContainer:{
        width: 110, 
        height: 110, 
        borderRadius: 20, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 8
    },
    anaSecimText:{
        fontSize: 18,
        fontFamily: 'GillSans-Italic',
        color: '#19191977'
    },
    bilgiText:{
        fontSize: 16,
        fontFamily: 'GillSans-Italic',
        color: '#191919c1',
        flex: 1,
        flexWrap: 'wrap'
    },
    image:{
        height: 30,
        width: 30,
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
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
    dropDownImage:{
        height:25,
        width: 25
    },
      ogunAltBilgiContainer:{
        alignItems: 'center',
    },
    kaloriText:{
        fontSize: 19, 
        fontFamily: 'GillSans-Italic'
    },
    ogunUsBilgiText:{
        fontSize: 17,
        fontFamily: 'GillSans-Italic' ,
        color: '#333333ff',
        marginBottom: 7
    },
    ogunAltBilgiText:{
        fontSize: 15,
        fontFamily: 'GillSans-Italic' ,
        color: '#6e6e6eff' 
    },

});