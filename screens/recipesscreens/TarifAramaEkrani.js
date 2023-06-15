import { useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList, Pressable, Image,ScrollView } from "react-native";

import { addDoc, doc, collection, Timestamp, deleteDoc, getDocs, query } from "firebase/firestore";
import {getDbObject} from '../../firebase/FireBaseObjects'

import { FavoriTariflerContext } from "../../store/tarifler-favori-context";
import {AuthContext} from "../../store/auth-context";

import IconButton from "../../components/ui/IconButton";
import Button from "../../components/ui/Button";
import SwitchButton from "@freakycoder/react-native-switch-button";

import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { SearchBar } from '@rneui/themed';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const db = getDbObject();

import { tarifAl } from "../../util/apirequest";
import { oguneGoreTarifAl, diyeteGoreTarifAl, sagligaGoreTarifAl } from "../../util/apirequest";

import { Colors } from "../../constants/colors";

function TarifAramaEkrani({navigation}){
    
    const [tarifAdi, setTarifAdi] = useState("");
    const [tarifData, setTarifData] = useState([]);
    const [tarifGetirildiMi , setTarifGetirildiMi ] = useState(true);
    let liste;
    let kategori;

    const kullaniciFavorilerCtx = useContext(FavoriTariflerContext);
    const authCtx = useContext(AuthContext);


    function updateSearch(text){
        setTarifAdi(text);
    }

    function detayEkraninaGit(tarifVerisi){
        navigation.navigate('TarifDetayEkrani',{
            tarifVerisi: tarifVerisi
        });
    }
   
    async function getTarifler(){      
       
        setTarifGetirildiMi(false);
        try {  
            const tarifVerileri = await tarifAl(tarifAdi);
            setTarifData(tarifVerileri);
        } catch (error) {
            
        }
        setTarifGetirildiMi(true); 
    }

    async function getOguneGoreTarifler(...zaman){      

        setTarifGetirildiMi(false);
        try {  
            const tarifVerileri = await oguneGoreTarifAl(zaman[0]);
            navigation.navigate('TarifKategoriEkrani',{tarifVerisi: tarifVerileri,baslik: zaman[1]});
        } catch (error) {
            
        }
        setTarifGetirildiMi(true); 
        
    }

    async function getDiyeteGoreTarifler(...diyet){      

        setTarifGetirildiMi(false);
        try {  
            const tarifVerileri = await diyeteGoreTarifAl(diyet[0]);
            navigation.navigate('TarifKategoriEkrani',{tarifVerisi: tarifVerileri,baslik: diyet[1]});
        } catch (error) {
            
        }
        setTarifGetirildiMi(true); 
        
    }

    async function getSagligaGoreTarifler(...saglik){      

        setTarifGetirildiMi(false);
        try {  
            const tarifVerileri = await sagligaGoreTarifAl(saglik[0]);
            navigation.navigate('TarifKategoriEkrani',{tarifVerisi: tarifVerileri,baslik: saglik[1]});
        } catch (error) {
            
        }
        setTarifGetirildiMi(true); 
        
    }

    let favoriMi = false;

    function favoriKontrol(data){
        favoriMi = kullaniciFavorilerCtx.FavoriTarifler.some((diziData)=>diziData.label === data);
    }

    async function favoriEkleCikar(data){

        let varMi = kullaniciFavorilerCtx.FavoriTarifler.find(item => item.label === data.label);

        if(varMi === undefined){

            const referans = collection(db,"kullanicifavoritarifleri",authCtx.uid,"favoritariflerkayitlari");
    
            try {
                await addDoc(referans, {
                    label: data.label,
                    image: data.image,
                    yield: data.yield,
                    calories: data.calories,
                    cuisineType:[data.cuisineType[0]],
                    url: data.url,
                    totalNutrients:{
                        WATER:{
                            quantity: data.totalNutrients.WATER.quantity
                        },
                        FAT:{
                            quantity: data.totalNutrients.FAT.quantity
                        },
                        FASAT:{
                            quantity: data.totalNutrients.FASAT.quantity
                        },
                        FATRN:{
                            quantity: data.totalNutrients.FATRN.quantity
                        },
                        FAMS:{
                            quantity: data.totalNutrients.FAMS.quantity
                        },
                        FAPU:{
                            quantity: data.totalNutrients.FAPU.quantity
                        },
                        PROCNT:{
                            quantity: data.totalNutrients.PROCNT.quantity
                        },
                        CHOCDF:{
                            quantity: data.totalNutrients.CHOCDF.quantity
                        },
                        FIBTG:{
                            quantity: data.totalNutrients.FIBTG.quantity
                        },
                        SUGAR:{
                            quantity: data.totalNutrients.SUGAR.quantity
                        }, 
                        CHOLE:{
                            quantity: data.totalNutrients.CHOLE.quantity
                        },
                        VITA_RAE:{
                            quantity: data.totalNutrients.VITA_RAE.quantity
                        }, 
                        VITC:{
                            quantity: data.totalNutrients.VITC.quantity
                        }, 
                        VITD:{
                            quantity: data.totalNutrients.VITD.quantity
                        }, 
                        TOCPHA:{
                            quantity: data.totalNutrients.TOCPHA.quantity
                        }, 
                        VITK1:{
                            quantity: data.totalNutrients.VITK1.quantity
                        }, 
                        VITB12:{
                            quantity: data.totalNutrients.VITB12.quantity
                        }, 
                    },
                    eklenmeTarihi: Timestamp.fromDate(new Date())
                });
            } catch (error) {
                console.log(error.toString());
            }         

            kullaniciFavorilerCtx.addTarifler({
                label: data.label,
                image: data.image,
                yield: data.yield,
                calories: data.calories,
                cuisineType:[data.cuisineType[0]],
                url: data.url,
                totalNutrients:{
                    WATER:{
                        quantity: data.totalNutrients.WATER.quantity
                    },
                    FAT:{
                        quantity: data.totalNutrients.FAT.quantity
                    },
                    FASAT:{
                        quantity: data.totalNutrients.FASAT.quantity
                    },
                    FATRN:{
                        quantity: data.totalNutrients.FATRN.quantity
                    },
                    FAMS:{
                        quantity: data.totalNutrients.FAMS.quantity
                    },
                    FAPU:{
                        quantity: data.totalNutrients.FAPU.quantity
                    },
                    PROCNT:{
                        quantity: data.totalNutrients.PROCNT.quantity
                    },
                    CHOCDF:{
                        quantity: data.totalNutrients.CHOCDF.quantity
                    },
                    FIBTG:{
                        quantity: data.totalNutrients.FIBTG.quantity
                    },
                    SUGAR:{
                        quantity: data.totalNutrients.SUGAR.quantity
                    },  
                    CHOLE:{
                        quantity: data.totalNutrients.CHOLE.quantity
                    },
                    VITA_RAE:{
                        quantity: data.totalNutrients.VITA_RAE.quantity
                    }, 
                    VITC:{
                        quantity: data.totalNutrients.VITC.quantity
                    }, 
                    VITD:{
                        quantity: data.totalNutrients.VITD.quantity
                    }, 
                    TOCPHA:{
                        quantity: data.totalNutrients.TOCPHA.quantity
                    }, 
                    VITK1:{
                        quantity: data.totalNutrients.VITK1.quantity
                    }, 
                    VITB12:{
                        quantity: data.totalNutrients.VITB12.quantity
                    }, 
                }
            });
        }
        else{
            const referans = query(collection(db,"kullanicifavoritarifleri",authCtx.uid,"favoritariflerkayitlari"));

            try {

                kullaniciFavorilerCtx.deleteTarifler(data.label);

                const querySnapshot = await getDocs(referans);

                querySnapshot.forEach( async (veri) => {

                    if(veri.data().label == data.label){
                        
                        const silinecekReferans = doc(db,"kullanicifavoritarifleri",authCtx.uid,"favoritariflerkayitlari",veri.id);
                        await deleteDoc(silinecekReferans);
                    }  
                });
            } catch (error) {
                console.log(error.toString());
            } 
        }
    }

    if(tarifData.length>0&&tarifAdi.length>0){
        liste= <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={tarifData}
            decelerationRate={0.1}
            removeClippedSubviews={true}
            maxToRenderPerBatch={100}
            renderItem={(data)=>{
                return(
                    <Pressable onPress={detayEkraninaGit.bind(this,data.item.recipe)}>
                        <View style={{justifyContent:'flex-end',flexDirection: 'row',marginTop:10}}>
                            {favoriKontrol(data.item.recipe.label)}
                            <SwitchButton
                                inactiveImageSource={require('../../assets/favoridegil.png')}
                                activeImageSource={require('../../assets/favori.png')}
                                tintColor='#000000ff'
                                originalColor='#ffffffff'
                                mainColor='#ff0000ff'
                                disableText={true}
                                isActive={favoriMi}
                                onPress={favoriEkleCikar.bind(this,data.item.recipe)}
                                imageStyle={{width:25,height:25}}
                                style={{width:40,height:40}}
                            />
                        </View>
                        <View style={styles.mainImageContainer}>
                            <View style={styles.imageContainer}>
                                <Image 
                                    style={styles.image}
                                    source={{
                                        uri: data.item.recipe.image
                                    }}
                                />
                                <Text style={styles.imageText} >{data.item.recipe.label}</Text>
                                <View style={styles.imageKisaBilgiContainer}>
                                    <Text style={styles.imageText2}>{data.item.recipe.yield} porsiyon  </Text>
                                    <Text style={styles.imageText2}>{Math.floor(data.item.recipe.calories/data.item.recipe.yield)} kcal</Text>
                                </View>
                            
                            </View>
                        </View>
                       
                    </Pressable>
                  
                );
                
            }}
        />  
    }

    if(tarifAdi.length == 0){
        kategori=
        <ScrollView>
            <View style={styles.kategoriBaslikContainer}>
                <Text style={styles.kategoriBaslikText}>Popüler Kategoriler</Text>
                
            </View>

            <Button 
                onPress={getOguneGoreTarifler.bind(this,'Breakfast','Kahvaltı')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center'}} 
                textStyle={styles.kategoriButtonText}         
            >
                Kahvaltı
            </Button>

            <Button 
                onPress={getOguneGoreTarifler.bind(this,'Lunch','Öğle/Akşam Yemeği')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}            
            >
                Öğle/Akşam Yemeği
            </Button>

            <Button 
                onPress={getOguneGoreTarifler.bind(this,'Brunch','Brunch')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}           
            >
                Brunch
            </Button>

            <Button 
                onPress={getOguneGoreTarifler.bind(this,'Snack','Atıştırmalık')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}               
            >
                Atıştırmalık
            </Button>

            <Button 
                 
                onPress={getOguneGoreTarifler.bind(this,'Teatime','Çay Zamanı')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}               
            >
                Çay Zamanı
            </Button>

            <Button 
                onPress={getDiyeteGoreTarifler.bind(this,'balanced','Dengeli Diyet')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}         
            >
                Dengeli Diyet
            </Button>

            <Button 
                onPress={getDiyeteGoreTarifler.bind(this,'high-fiber','Yüksek Lifli Diyet')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}              
            >
                Yüksek Lifli Diyet
            </Button>
            

            <Button 
                onPress={getDiyeteGoreTarifler.bind(this,'high-protein','Yüksek Proteinli Diyet')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}               
            >
                Yüksek Proteinli Diyet
            </Button>

            <Button 
                onPress={getDiyeteGoreTarifler.bind(this,'low-carb','Düşük karbonhidratlı Diyet')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}            
            >
                Düşük karbonhidratlı Diyet
            </Button>

            <Button 
                onPress={getDiyeteGoreTarifler.bind(this,'low-fat','Düşük Yağlı Diyet')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}         
            >
                Düşük Yağlı Diyet
            </Button>

            <Button 
                onPress={getSagligaGoreTarifler.bind(this,'vegan','Vegan')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}  
            >
                Vegan
            </Button>


            <Button 
                onPress={getSagligaGoreTarifler.bind(this,'vegetarian','Vejetaryen')}
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}              
            >
                Vejetaryen
            </Button>
        

            <Button 
                onPress={getSagligaGoreTarifler.bind(this,'low-sugar','Az Şekerli')}
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText} 
            >
                Az Şekerli
            </Button>
           

            <Button 
                 onPress={getSagligaGoreTarifler.bind(this,'gluten-free','Glütensiz')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}          
            >
                Glütensiz
            </Button>


            <Button 
                onPress={getSagligaGoreTarifler.bind(this,'alcohol-free','Alkolsüz')} 
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}               
            >
                Alkolsüz
            </Button>


            <Button 
                onPress={getSagligaGoreTarifler.bind(this,'red-meat-free','Kırmızı Et İçermeyen')}
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}             
            >
                Kırmızı Et İçermeyen
            </Button>


            <Button 
                onPress={getSagligaGoreTarifler.bind(this,'immuno-supportive','Bağışıklık Destekleyici')}
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}             
            >
                Bağışıklık Destekleyici
            </Button>
           
            
            <Button 
                onPress={getSagligaGoreTarifler.bind(this,'pork-free','Domuz Eti İçermeyen')}
                style={{borderRadius:20,backgroundColor:'white',height: windowHeight/14,justifyContent:'center',marginTop: 10}} 
                textStyle={styles.kategoriButtonText}            
            >
                Domuz Eti İçermeyen
            </Button>

        </ScrollView>
    }

    if(!tarifGetirildiMi){
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
                    color={Colors.colors.dark}
                    onPress={()=>{navigation.goBack()}}
                /> 
            </View>

            <SearchBar
                placeholder="Tarifler"
                clearIcon={{color:'black'}}
                searchIcon={{color:'black'}}
                onChangeText={updateSearch}
                value={tarifAdi}
                containerStyle={{backgroundColor:'#ffffff00'}}
                inputContainerStyle={{backgroundColor:'#e3e3e3ff',height:windowHeight/50}}
                inputStyle={{color: 'black',fontFamily:'GillSans-Italic'}}
                platform="ios"
                cancelButtonProps={{color:'black',backgroundColor:'#ffffff00'}}
                returnKeyType="search"
                selectionColor="black"
                onSubmitEditing={getTarifler}
                cancelButtonTitle="Vazgeç"   
            />
            {liste}
            {kategori}
            
        </SafeAreaView>
    );
}

export default TarifAramaEkrani;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1
    },
    topMenuContanier:{
        flexDirection:'row',
        alignItems: 'center'
    },
    mainImageContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        marginBottom:10
    },
    imageContainer:{
        backgroundColor:'white',
        borderRadius: 13,
        alignItems:'center'
    },
    image:{
        height:windowHeight/2.4,
        width: windowWidth/1.2,
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
    },
    imageText:{
        marginTop:7,
        fontSize: windowHeight/42,
        color:'#3f3f3fff',
        fontFamily: 'GillSans-Italic'
    },
    imageKisaBilgiContainer:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginBottom:5
    },
    imageText2:{
        marginTop:3,
        fontSize: windowHeight/48,
        color:'#787777ff',
        fontFamily: 'GillSans-Italic'
    },
    kategoriBaslikContainer:{
        marginTop: 20,
        marginBottom: 30,
    },
    kategoriBaslikText:{
        fontSize: windowHeight/34,
        fontWeight: '700',
        marginLeft: 10,
        fontFamily: 'GillSans-Italic'
    },
    kategoriButton:{
        borderRadius: 0,
        borderRadius: 30,
        marginVertical: 10,
    },
    kategoriButtonText:{
        color: 'black',
        fontSize: windowHeight/45,
        fontFamily:'GillSans-Italic'
    }
});

