import { useLayoutEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, FlatList, Pressable, Image } from "react-native";

import { FavoriTariflerContext } from "../../store/tarifler-favori-context";
import {AuthContext} from "../../store/auth-context";

import { addDoc, doc, collection, Timestamp, deleteDoc, getDocs, query } from "firebase/firestore";
import {getDbObject} from '../../firebase/FireBaseObjects'

import LoadingOverlay from "../../components/ui/LoadingOverlay";

import IconButton from "../../components/ui/IconButton";
import SwitchButton from "@freakycoder/react-native-switch-button";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const db = getDbObject();

import { Colors } from "../../constants/colors";

function TarifKategoriEkrani({navigation,route}){
    
    const { tarifVerisi,baslik } = route.params;

    const [tarifData, setTarifData] = useState([]);
    const [tarifGetirildiMi , setTarifGetirildiMi ] = useState(true);

    const kullaniciFavorilerCtx = useContext(FavoriTariflerContext);
    const authCtx = useContext(AuthContext);

    useLayoutEffect(() => {
        async function stateYukle(){
           
            setTarifGetirildiMi(false);
            setTarifData(tarifVerisi);
            setTarifGetirildiMi(true); 
        } 
        
        stateYukle();
    },[]);   
   
    let liste;

    function detayEkraninaGit(tarifVerisi){
        navigation.navigate('TarifDetayEkrani',{
            tarifVerisi: tarifVerisi
        });
    }

    if(!tarifGetirildiMi){
        return(
          <LoadingOverlay color="black" />
        );
    }   

    let favoriMi = false;
    function favoriKontrol(data){
        favoriMi = kullaniciFavorilerCtx.FavoriTarifler.some((diziData)=>diziData.label === data);
    }

    async function favoriEkleCikar(data){

        let varMi = kullaniciFavorilerCtx.FavoriTarifler.find(item => item.label === data.label);

        if(varMi === undefined){

            const referans = collection(db,"kullanicifavoritarifleri",authCtx.uid,"favoritariflerkayitlari");

            console.log(data);
    
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
    
    if(tarifVerisi.length>0){
        
        liste = <FlatList
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
                                    <Text style={styles.imageText2}>{Math.round(data.item.recipe.calories)} kcal</Text>
                                </View>
                            
                            </View>
                        </View>     
                    </Pressable>      
                );      
            }}
        />  
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
                <Text style={{ fontSize: windowHeight/30,marginLeft:30,fontFamily: 'GillSans-Italic',fontWeight:'600'}}>{baslik}</Text>      
            </View>         
            {liste}           
        </SafeAreaView>
    );
}

export default TarifKategoriEkrani;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1
    },
    topMenuContanier:{
        flexDirection:'row',
        alignItems: 'center',
    },
    mainImageContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 10,
        marginTop: 10
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
        fontFamily: 'GillSans-Italic',
    }
});

