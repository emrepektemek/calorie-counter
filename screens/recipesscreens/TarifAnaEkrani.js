import { useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions,ScrollView, Image, Pressable, Modal, Alert } from "react-native";

import { doc, collection, deleteDoc, getDocs, query } from "firebase/firestore";
import {getDbObject} from '../../firebase/FireBaseObjects'

import { FavoriTariflerContext } from "../../store/tarifler-favori-context";
import {AuthContext} from "../../store/auth-context";

import IconButton from "../../components/ui/IconButton";
import FilterIcon from "../../components/ui/FilterIcon";
import FavoriteButton from "../../components/ui/FavoriteButton";
import Button from "../../components/ui/Button";
import TarifFavoriButton from "../../components/ui/TarifFavoriButton";

import DropDownPicker from "react-native-dropdown-picker";
import SwitchSelector from 'react-native-switch-selector';

import MultiSlider from "@ptomasroos/react-native-multi-slider";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const db = getDbObject();

import { mutfagaGoreTarifAl, yemekCesidineGoreTarifAl, kaloriyeGoreTarifAl, oguneGoreTarifAl, diyeteGoreTarifAl, sagligaGoreTarifAl,filtreliTarifAl } from "../../util/apirequest";

import LoadingOverlay from "../../components/ui/LoadingOverlay";

function TarifAnaEkrani({navigation}){


  const [ekranTuru , setEkranTuru ] = useState(true);
  const [tarifGetirildiMi , setTarifGetirildiMi ] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [mutfakAcik, setMutfakAcik] = useState(false);
  const [secilenMutfak, setSecilenMutfak] = useState('');

  const [ogunAcik, setOgunAcik] = useState(false);
  const [secilenogun, setSecilenOgun] = useState('');
  
  const [diyetAcik, setDiyetAcik] = useState(false);
  const [secilenDiyet, setSecilenDiyet] = useState('');

  const [cesitAcik, setCesitAcik] = useState(false);
  const [secilenCesit, setSecilenCesit] = useState('');

  const [kaloriDegeri, setKaloriDegeri] = useState([0,2400]);

  const kullaniciFavorilerCtx = useContext(FavoriTariflerContext);
  const authCtx = useContext(AuthContext);

  const options = [
    { label: "Keşfet", value: true},
    { label: "Favoriler", value: false}
  ];


  async function filtrele(){
    setTarifGetirildiMi(false);
    try {  
        const tarifVerileri = await filtreliTarifAl(secilenMutfak,secilenogun,secilenDiyet,secilenCesit,kaloriDegeri);
        
        if(tarifVerileri.length>0){
          setModalVisible(!modalVisible);
          navigation.navigate('TarifKategoriEkrani',{tarifVerisi: tarifVerileri,baslik: 'Filtreleme Sonucu'});
        }
        else{
          Alert.alert(
            'Bu Filtreye Ait Tarif Bulunamamıştır',
            ' ',
            [
              {
                text: 'Tamam',
                onPress: () => {},
                style: 'default',
              },
             
          ],
          );
        }
        
    } catch (error) {
        
    }
    setTarifGetirildiMi(true); 
  }

  async function getMutfagaGoreTarifler(...mutfak){      

    setTarifGetirildiMi(false);
    try {  
      const tarifVerileri = await mutfagaGoreTarifAl(mutfak[0]);
      navigation.navigate('TarifKategoriEkrani',{tarifVerisi: tarifVerileri,baslik:mutfak[1]});
    } catch (error) {
        
    }
    setTarifGetirildiMi(true); 
        
  }

  async function getOguneGoreTarifler(...ogun){      

    setTarifGetirildiMi(false);
    try {  
        const tarifVerileri = await oguneGoreTarifAl(ogun[0]);
        navigation.navigate('TarifKategoriEkrani',{tarifVerisi: tarifVerileri,baslik: ogun[1]});
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

  async function getYemekCesidineGoreTarifler(...cesit){      

    setTarifGetirildiMi(false);
    try {  
        const tarifVerileri = await yemekCesidineGoreTarifAl(cesit[0]);
        navigation.navigate('TarifKategoriEkrani',{tarifVerisi: tarifVerileri,baslik: cesit[1]});
    } catch (error) {
        
    }
    setTarifGetirildiMi(true); 
    
  }

  async function getKaloriyeGoreTarifler(...kalori){      

    setTarifGetirildiMi(false);
    try {  
        const tarifVerileri = await kaloriyeGoreTarifAl(kalori[0]);
        navigation.navigate('TarifKategoriEkrani',{tarifVerisi: tarifVerileri,baslik: kalori[1]});
    } catch (error) {
        
    }
    setTarifGetirildiMi(true); 
    
  }

  function detayEkraninaGit(tarifVerisi){
    navigation.navigate('TarifDetayEkrani',{
      tarifVerisi: tarifVerisi
    });
  }
  
  async function favoriCikar(data){
    
    const referans = query(collection(db,"kullanicifavoritarifleri",authCtx.uid,"favoritariflerkayitlari"));

    try {
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
    kullaniciFavorilerCtx.deleteTarifler(data.label);
    
  }

  function filtreSifirla(){
    setSecilenMutfak('');
    setSecilenCesit('');
    setSecilenOgun('');
    setSecilenDiyet('');
    setKaloriDegeri([0,2400]);
  }
  

  let favoriler;

  if(!ekranTuru&&kullaniciFavorilerCtx.FavoriTarifler.length>0){

    favoriler = kullaniciFavorilerCtx.FavoriTarifler.map((data,index)=>{
      return(
        <Pressable onPress={detayEkraninaGit.bind(this,data)} key={index} >
            <View style={{justifyContent:'flex-end',flexDirection: 'row',marginTop:20}}>
            <TarifFavoriButton 
              onPress={favoriCikar.bind(this,data)}
            />
            </View>
            <View style={styles.mainImageContainer}>
              <View style={styles.imageContainer}>
                <Image 
                  style={styles.image}
                  source={{
                    uri: data.image
                  }}
                />
                <Text style={styles.imageText} >{data.label}</Text>
                <View style={styles.imageKisaBilgiContainer}>
                  <Text style={styles.imageText2}>{data.yield} porsiyon  </Text>
                  <Text style={styles.imageText2}>{Math.floor(data.calories)} kcal</Text>
                </View>
              </View>
            </View>     
        </Pressable>     
      );
      
    });
    
  }

  

  let mutfakTuru =  

    <View style={{marginTop: 20}}>
      <ScrollView
        decelerationRate={0.1}
        disableIntervalMomentum={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}  
      >
        <Pressable
          onPress={getMutfagaGoreTarifler.bind(this,'american','Amerikan Mutfağı')}
          style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
        >
            <View style={styles.mutfakTuruContainer}>
              <Image 
                source={require('../../assets/amerikan.png')}
                style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Amerikan Mutfağı</Text>
            </View>
          </Pressable>
        

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'asian','Asya Mutfağı')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
          >
            <View style={styles.mutfakTuruContainer}>
              <Image 
                source={require('../../assets/asya.png')}
                style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Asya Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'british','İngiliz Mutfağı')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
          >
            <View style={styles.mutfakTuruContainer}>
              <Image 
                source={require('../../assets/ingiliz.png')}
                style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>İngiliz Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'caribbean','Karayipler Mutfağı')}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/karayipler.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Karayipler Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'Central%20Europe','Orta Avrupa Mutfağı')}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/ortaavrupa.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Orta Avrupa Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
              onPress={getMutfagaGoreTarifler.bind(this,'chinese','Çin Mutfağı')}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/cin.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Çin Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
              onPress={getMutfagaGoreTarifler.bind(this,'Eastern%20Europe','Doğu Avrupa Mutfağı')}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/doguavrupa.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Doğu Avrupa Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'french','Fransız Mutfağı')}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/fransız.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Fransız Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
              onPress={getMutfagaGoreTarifler.bind(this,'greek','Yunan Mutfağı')}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/yunan.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Yunan Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
              onPress={getMutfagaGoreTarifler.bind(this,'indian','Hint Mutfağı')}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/hintli.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Hint Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'italian','İtalyan Mutfağı')}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/italyan.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>İtalyan Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'South%20East%20Asian','Güneydoğu Asya Mutfağı')}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/guneydoguasya.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Güneydoğu Asya Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'japanese','Japon Mutfağı')}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/japon.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Japon Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'korean','Kore Mutfağı')}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/koreli.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Kore Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
              onPress={getMutfagaGoreTarifler.bind(this,'mediterranean','Akdeniz Mutfağı')}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/akdeniz.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Akdeniz Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'south%20american','Güney Amerika Mutfağı')}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/guneyamerika.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Güney Amerika Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'mexican','Meksika Mutfağı')}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/meksika.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Meksika Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'nordic','İskandinav Mutfağı')}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/iskandinav.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>İskandinav Mutfağı</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={getMutfagaGoreTarifler.bind(this,'world','Dünya Mutfağı')}
            style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e7e7e7ff' : 'white',
                },
                {borderRadius: 20,marginRight: 10},
              ]}
          >
            <View style={styles.mutfakTuruContainer}>
                <Image 
                    source={require('../../assets/dunya.png')}
                    style={styles.mutfakTuruImage}
                />
                <Text style={styles.mutfakTuruText}>Dünya Mutfağı</Text>
            </View>
          </Pressable>

    </ScrollView>
  </View>

  let ogunTuru =  <View style={{marginTop: 20}}>
    <ScrollView
        decelerationRate={0.1}
        disableIntervalMomentum={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}  
    >
        <Pressable
          onPress={getOguneGoreTarifler.bind(this,'Breakfast','Kahvaltı')}
          style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
        >
          <View style={styles.mutfakTuruContainer}>
              <Image 
                  source={require('../../assets/kahvalti.png')}
                  style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Kahvaltı</Text>
          </View>
        </Pressable>
    
        <Pressable
          onPress={getOguneGoreTarifler.bind(this,'Lunch','Öğle Yemeği')}
          style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
        >
          <View style={styles.mutfakTuruContainer}>
              <Image 
                  source={require('../../assets/ogle.png')}
                  style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Öğle Yemeği</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={getOguneGoreTarifler.bind(this,'Dinner','Akşam Yemeği')}
          style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
        >
          <View style={styles.mutfakTuruContainer}>
              <Image 
                  source={require('../../assets/aksam.png')}
                  style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Akşam Yemeği</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={getOguneGoreTarifler.bind(this,'Snack','Atıştırmalık')}
          style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
        >
          <View style={styles.mutfakTuruContainer}>
              <Image 
                  source={require('../../assets/snack.png')}
                  style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Atıştırmalık</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={getOguneGoreTarifler.bind(this,'Teatime','Çay Zamanı')}
          style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
        >
          <View style={styles.mutfakTuruContainer}>
              <Image 
                  source={require('../../assets/yesilcay.png')}
                  style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Çay Zamanı</Text>
          </View>
        </Pressable>
    </ScrollView>
    </View>          

  let diyetTuru = 
  <View style={{marginTop: 20}}>
    <ScrollView
      decelerationRate={0.1}
      disableIntervalMomentum={true}
      horizontal={true}
      showsHorizontalScrollIndicator={false}  
    >
      <Pressable
        onPress={getDiyeteGoreTarifler.bind(this,'balanced','Dengeli Diyet')} 
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
      >
        <View style={styles.mutfakTuruContainer}>
          <Image 
            source={require('../../assets/dengelidiyet.png')}
            style={styles.mutfakTuruImage}
        />
            <Text style={styles.mutfakTuruText}>Dengeli Diyet</Text>
        </View>
        </Pressable>
      
        <Pressable
          onPress={getDiyeteGoreTarifler.bind(this,'high-fiber','Yüksek Lifli Diyet')} 
          style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
        >
          <View style={styles.mutfakTuruContainer}>
              <Image 
                  source={require('../../assets/yuksekliflidiyet.png')}
                  style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Yüksek Lifli Diyet</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={getDiyeteGoreTarifler.bind(this,'high-protein','Yüksek Proteinli Diyet')} 
          style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
        >
          <View style={styles.mutfakTuruContainer}>
              <Image 
                  source={require('../../assets/yuksekproteinlidiyet.png')}
                  style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Yüksek Proteinli Diyet</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={getDiyeteGoreTarifler.bind(this,'low-carb','Düşük karbonhidratlı Diyet')}
          style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
        >
          <View style={styles.mutfakTuruContainer}>
              <Image 
                  source={require('../../assets/dusukkarbonhidratlidiyet.png')}
                  style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Düşük karbonhidratlı Diyet</Text>
          </View>
        </Pressable>

        <Pressable
            onPress={getDiyeteGoreTarifler.bind(this,'low-fat','Düşük Yağlı Diyet')} 
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
        >
          <View style={styles.mutfakTuruContainer}>
              <Image 
                  source={require('../../assets/dusukyaglidiyet.png')}
                  style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Düşük Yağlı Diyet</Text>
          </View>
        </Pressable>

        <Pressable
            onPress={getSagligaGoreTarifler.bind(this,'vegan','Vegan Diyet')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},getSagligaGoreTarifler
            ]}
        >
          <View style={styles.mutfakTuruContainer}>
              <Image 
                  source={require('../../assets/vegandiyet.png')}
                  style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Vegan Diyet</Text>
          </View>
        </Pressable>

        <Pressable
            onPress={getSagligaGoreTarifler.bind(this,'vegetarian','Vejetaryen Diyet')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#e7e7e7ff' : 'white',
              },
              {borderRadius: 20,marginRight: 10},
            ]}
        >
          <View style={styles.mutfakTuruContainer}>
              <Image 
                  source={require('../../assets/vejeteryandiyet.png')}
                  style={styles.mutfakTuruImage}
              />
              <Text style={styles.mutfakTuruText}>Vejetaryen Diyet</Text>
          </View>
        </Pressable>

    </ScrollView>
</View>


  let yemekCesitleri =  
  <ScrollView
    decelerationRate={0.1}
    disableIntervalMomentum={true}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    style={{marginTop: 20}}
  >

    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Soup','Çorbalar')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
        <Image 
            source={{
              uri: 'https://kristineskitchenblog.com/wp-content/uploads/2022/02/minestrone-soup-recipe-22.jpg'
          }}
            style={styles.yemekCesidiImage}
        />
        <Text style={styles.yemekCesidiText}>Çorbalar</Text>
      </View>
    </Pressable>

    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Starter','Başlangıçlar')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
          <Image 
              source={{
                uri: 'https://i2-prod.belfastlive.co.uk/incoming/article19532203.ece/ALTERNATES/s1200c/0_GettyImages-957729416.jpg'
            }}
              style={styles.yemekCesidiImage}
          />
          <Text style={styles.yemekCesidiText}>Başlangıçlar</Text>
      </View>
    </Pressable>

    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Sandwiches','Sandviçler')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
          <Image 
              source={{
                uri: 'https://somethingaboutsandwiches.com/wp-content/uploads/2022/04/ham-sandwich.jpg'
            }}
              style={styles.yemekCesidiImage}
          />
          <Text style={styles.yemekCesidiText}>Sandviçler</Text>
      </View>
    </Pressable>

    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Salad','Salatalar')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
          <Image 
              source={{
                uri: 'https://foodnheal.com/wp-content/uploads/2020/07/mixed-green-salad.F-1200x1200.jpg'
            }}
              style={styles.yemekCesidiImage}
          />
          <Text style={styles.yemekCesidiText}>Salatalar</Text>
      </View>
    </Pressable>
    

    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Main%20course','Ana Yemekler')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
          <Image 
              source={{
                uri: 'https://cookingchew.com/wp-content/uploads/2021/07/how-to-reheat-beef-wellington-CO1028-FE.jpg'
            }}
              style={styles.yemekCesidiImage}
          />
          <Text style={styles.yemekCesidiText}>Ana Yemekler</Text>
      </View>
    </Pressable>

    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Drinks','İçecekler')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
          <Image 
              source={{
                uri: 'https://www.kimschob.com/wp-content/uploads/2022/09/Refreshing-Bohemian-Cocktail-Recipe-1200.jpg'
            }}
              style={styles.yemekCesidiImage}
          />
          <Text style={styles.yemekCesidiText}>İçecekler</Text>
      </View>
    </Pressable>
    

    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Desserts','Tatlılar')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
          <Image 
              source={{
                uri: 'https://simplelivingrecipes.com/wp-content/uploads/2021/01/Date-night-dessert-sq.jpg'
            }}
              style={styles.yemekCesidiImage}
          />
          <Text style={styles.yemekCesidiText}>Tatlılar</Text>
      </View>
    </Pressable>

    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Condiments%20and%20sauces','Çeşniler Ve Soslar')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
          <Image 
              source={{
                uri: 'https://thewimpyvegetarian.com/wp-content/uploads/2023/03/Sauce-gribiche-main-1200.jpg.webp'
            }}
              style={styles.yemekCesidiImage}
          />
          <Text style={styles.yemekCesidiText}>Çeşniler Ve Soslar</Text>
      </View>
    </Pressable>

    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Cereals','Tahıllar')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
          <Image 
              source={{
                uri: 'https://hips.hearstapps.com/hmg-prod/images/milk-being-poured-on-a-bowl-of-cornflakes-with-royalty-free-image-1578952787.jpg?crop=0.66682xw:1xh;center,top&resize=1200:*'
            }}
              style={styles.yemekCesidiImage}
          />
          <Text style={styles.yemekCesidiText}>Tahıllar</Text>
      </View>
    </Pressable>

    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Bread','Ekmekler')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
          <Image 
              source={{
                uri: 'https://www.seasonsandsuppers.ca/wp-content/uploads/2020/03/basic-white-bread-1200.jpg'
            }}
              style={styles.yemekCesidiImage}
          />
          <Text style={styles.yemekCesidiText}>Ekmekler</Text>
      </View>
    </Pressable>

    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Biscuits%20and%20cookies','Bisküvi Ve Kurabiyeler')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
          <Image 
              source={{
                uri: 'https://www.abakingjourney.com/wp-content/uploads/2018/04/Almond-Cookies-Feature-1.jpg'
            }}
              style={styles.yemekCesidiImage}
          />
          <Text style={styles.yemekCesidiText}>Bisküvi Ve Kurabiyeler</Text>
      </View>
    </Pressable>
    
    <Pressable
      onPress={getYemekCesidineGoreTarifler.bind(this,'Preserve','Konserveler')}
      style={({pressed}) => [
          {
            backgroundColor: pressed ? '#e7e7e7ff' : 'white',
          },
          {borderRadius: 20,marginRight: 10},
        ]}
    >
      <View style={styles.yemekCesidiContainer}>
          <Image 
              source={{
                uri: 'https://www.lanascooking.com/wp-content/uploads/2017/07/home-canned-tomatoes-feature-1200x1200-1-1024x1024.jpg'
            }}
              style={styles.yemekCesidiImage}
          />
          <Text style={styles.yemekCesidiText}>Konserveler</Text>
      </View>
    </Pressable>
    

  </ScrollView>


  let kaloriMiktari = 
  <View style={styles.calorieMainContainer}>
    <View style={styles.calorieContainer}>
      <Pressable
        onPress={getKaloriyeGoreTarifler.bind(this,'0-50','0 - 50 kcal Arası')}
        style={({pressed}) => [
            {
              backgroundColor: pressed ? '#e7e7e7ff' : 'white',  flex:1
            
            },
            {borderRadius: 20,marginRight: 10},
          ]}
      >
        <View style={styles.calorieImageContainer}>
            <Image 
                source={require('../../assets/salata.png')}
                style={styles.calorieImage}
            />
            <Text style={styles.calorieText}>0-50 kcal</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={getKaloriyeGoreTarifler.bind(this,'50-100','50 - 100 kcal Arası')}
        style={({pressed}) => [
            {
              backgroundColor: pressed ? '#e7e7e7ff' : 'white', flex:1
            },
            {borderRadius: 20,marginRight: 10},
          ]}
      >
          <View style={styles.calorieImageContainer}>
            <Image 
                source={require('../../assets/portakal.png')}
                style={styles.calorieImage}
            />
            <Text style={styles.calorieText}>50-100 kcal</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={getKaloriyeGoreTarifler.bind(this,'100-200','100 - 200 kcal Arası')}
        style={({pressed}) => [
            {
              backgroundColor: pressed ? '#e7e7e7ff' : 'white',  flex:1
            },
            {borderRadius: 20,marginRight: 10},
          ]}
      >
          <View style={styles.calorieImageContainer}>
            <Image 
                source={require('../../assets/yumurta.png')}
                style={styles.calorieImage}
            />
            <Text style={styles.calorieText}>100-200 kcal</Text>
        </View>
      </Pressable>
    </View>
    
    <View style={styles.calorieContainer}>
      <Pressable
        onPress={getKaloriyeGoreTarifler.bind(this,'200-300','200 - 300 kcal Arası')}
        style={({pressed}) => [
            {
              backgroundColor: pressed ? '#e7e7e7ff' : 'white',  flex:1
            
            },
            {borderRadius: 20,marginRight: 10},
          ]}
      >
        <View style={styles.calorieImageContainer}>
            <Image 
                source={require('../../assets/makarna.png')}
                style={styles.calorieImage}
            />
            <Text style={styles.calorieText}>200-300 kcal</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={getKaloriyeGoreTarifler.bind(this,'300-400','300 - 400 kcal Arası')}
        style={({pressed}) => [
            {
              backgroundColor: pressed ? '#e7e7e7ff' : 'white', flex:1
            },
            {borderRadius: 20,marginRight: 10},
          ]}
      >
          <View style={styles.calorieImageContainer}>
            <Image 
                source={require('../../assets/cheesecake.png')}
                style={styles.calorieImage}
            />
            <Text style={styles.calorieText}>300-400 kcal</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={getKaloriyeGoreTarifler.bind(this,'400-500','400 - 500 kcal Arası')}
        style={({pressed}) => [
            {
              backgroundColor: pressed ? '#e7e7e7ff' : 'white',  flex:1
            },
            {borderRadius: 20,marginRight: 10},
          ]}
      >
          <View style={styles.calorieImageContainer}>
            <Image 
                source={require('../../assets/fistikezmesi.png')}
                style={styles.calorieImage}
            />
            <Text style={styles.calorieText}>400-500 kcal</Text>
        </View>
      </Pressable>
    </View>
    
    <View style={styles.calorieContainer}>
      <Pressable
        onPress={getKaloriyeGoreTarifler.bind(this,'500-600','500 - 600 kcal Arası')}
        style={({pressed}) => [
            {
              backgroundColor: pressed ? '#e7e7e7ff' : 'white',  flex:1
            
            },
            {borderRadius: 20,marginRight: 10},
          ]}
      >
        <View style={styles.calorieImageContainer}>
            <Image 
                source={require('../../assets/tavuk.png')}
                style={styles.calorieImage}
            />
            <Text style={styles.calorieText}>500-600 kcal</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={getKaloriyeGoreTarifler.bind(this,'600-700','600 - 700 kcal Arası')}
        style={({pressed}) => [
            {
              backgroundColor: pressed ? '#e7e7e7ff' : 'white', flex:1
            },
            {borderRadius: 20,marginRight: 10},
          ]}
      >
          <View style={styles.calorieImageContainer}>
            <Image 
                source={require('../../assets/meksika.png')}
                style={styles.calorieImage}
            />
            <Text style={styles.calorieText}>600-700 kcal</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={getKaloriyeGoreTarifler.bind(this,'700%2B','700 kcal Ve Fazlası')}
        style={({pressed}) => [
            {
              backgroundColor: pressed ? '#e7e7e7ff' : 'white',  flex:1
            },
            {borderRadius: 20,marginRight: 10},
          ]}
      >
          <View style={styles.calorieImageContainer}>
            <Image 
                source={require('../../assets/amerikan.png')}
                style={styles.calorieImage}
            />
            <Text style={styles.calorieText}>+700 kcal</Text>
        </View>
      </Pressable>
    </View>

  </View>
   
   
  if(!tarifGetirildiMi){
    return(
      <LoadingOverlay color="black" />
    );
  }   

  return(
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.topMenuContanier}>
          <View style={{alignItems: 'flex-end',flex: 1.5}}>
            <Text style={styles.topMenuText}>Tarifler</Text>
          </View>
            
          <View style={{justifyContent: 'flex-end',flex: 1,marginRight:12,flexDirection:'row'}}>
            <IconButton 
              icon="ios-search-outline"
              color="black"
              size={windowHeight/27}
              onPress={()=>{navigation.navigate('TarifAramaEkrani')}}
            />
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              presentationStyle="formSheet"
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={{flexDirection: 'row', alignItems: 'center',marginTop:4,marginBottom: 20}}>
                <View style={{flex: 1}}>
                  <FavoriteButton 
                    icon="close" 
                    size={23} 
                    color="black"  
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
                <View style={{flex: 1,alignItems:'center'}}>
                  <Text style={{fontSize: 25,fontFamily:'GillSans-Italic',fontWeight:'600'}}>Filtre</Text>
                </View>
                <View style={{flex: 1,alignItems: 'flex-end',marginRight:5}}>
                  <Button textStyle={{color:'black'}} style={{backgroundColor:'white'}} onPress={filtreSifirla}>Sıfırla</Button>
                </View>
              </View>          

              <View style={[{zIndex:4},styles.dropDownMainContainer]}>
                <View style={styles.dropDownContainer}>
                  <DropDownPicker
                    placeholder="Mutfaklar"
                    placeholderStyle={{
                      fontFamily: 'GillSans-Italic',
                      fontSize: 17,
                      fontWeight: '600'
                    }}
                    showTickIcon={true}
                    open={mutfakAcik}
                    value={secilenMutfak}
                    labelStyle={{fontFamily:'GillSans-Italic',fontSize:16}}
                    listItemLabelStyle={{fontFamily:'GillSans-Italic'}}                      
                    items={[
                      {label: 'Amerikan Mutfağı', value: 'american',icon: () => <Image source={require('../../assets/amerikan.png')} style={styles.dropDownImage}/>},
                      {label: 'Asya Mutfağı', value: 'asian',icon: () => <Image source={require('../../assets/asya.png')} style={styles.dropDownImage}/>},
                      {label: 'ingiliz Mutfağı', value: 'british',icon: () => <Image source={require('../../assets/ingiliz.png')} style={styles.dropDownImage}/>},
                      {label: 'Karayipler Mutfağı', value: 'caribbean',icon: () => <Image source={require('../../assets/karayipler.png')} style={styles.dropDownImage}/>},
                      {label: 'Orta Avrupa Mutfağı', value: 'Central%20Europe',icon: () => <Image source={require('../../assets/ortaavrupa.png')} style={styles.dropDownImage}/>},
                      {label: 'Çin Mutfağı', value: 'chinese',icon: () => <Image source={require('../../assets/cin.png')} style={styles.dropDownImage}/>},
                      {label: 'Doğu Avrupa Mutfağı', value: 'Eastern%20Europe',icon: () => <Image source={require('../../assets/doguavrupa.png')} style={styles.dropDownImage}/>},
                      {label: 'Fransız Mutfağı', value: 'french',icon: () => <Image source={require('../../assets/fransız.png')} style={styles.dropDownImage}/>},
                      {label: 'Yunan Mutfağı', value: 'greek',icon: () => <Image source={require('../../assets/yunan.png')} style={styles.dropDownImage}/>},
                      {label: 'Hint Mutfağı', value: 'indian',icon: () => <Image source={require('../../assets/hintli.png')} style={styles.dropDownImage}/>},
                      {label: 'İtalyan Mutfağı', value: 'italian',icon: () => <Image source={require('../../assets/italyan.png')} style={styles.dropDownImage}/>},
                      {label: 'Güneydoğu Asya Mutfağı', value: 'South%20East%20Asian',icon: () => <Image source={require('../../assets/guneydoguasya.png')} style={styles.dropDownImage}/>},
                      {label: 'Japon Mutfağı', value: 'japanese',icon: () => <Image source={require('../../assets/japon.png')} style={styles.dropDownImage}/>},
                      {label: 'Kore Mutfağı', value: 'korean',icon: () => <Image source={require('../../assets/koreli.png')} style={styles.dropDownImage}/>},
                      {label: 'Akdeniz Mutfağı', value: 'mediterranean',icon: () => <Image source={require('../../assets/akdeniz.png')} style={styles.dropDownImage}/>},
                      {label: 'Güney Amerika Mutfağı', value: 'south%20american',icon: () => <Image source={require('../../assets/guneyamerika.png')} style={styles.dropDownImage}/>},
                      {label: 'Meksika Mutfağı', value: 'mexican',icon: () => <Image source={require('../../assets/meksika.png')} style={styles.dropDownImage}/>},
                      {label: 'İskandinav Mutfağı', value: 'nordic',icon: () => <Image source={require('../../assets/iskandinav.png')} style={styles.dropDownImage}/>},
                      {label: 'Dünya Mutfağı', value: 'world',icon: () => <Image source={require('../../assets/dunya.png')} style={styles.dropDownImage}/>},
                    ]}
                    setOpen={setMutfakAcik}
                    setValue={setSecilenMutfak}
                  />    
                </View>
                
                <View style={styles.dropDownButtonContainer}>
                  <Button 
                    onPress={()=>{setSecilenMutfak('')}} 
                    style={{width: 75,backgroundColor:'#ffffff00'}}
                    textStyle={{color:'black'}}
                  >
                    Sıfırla
                  </Button>
                </View>
                
              </View> 

              <View style={[{zIndex:3},styles.dropDownMainContainer]}>
                <View style={styles.dropDownContainer}>
                  <DropDownPicker
                    placeholder="Öğünler"
                    placeholderStyle={{
                      fontFamily: 'GillSans-Italic',
                      fontSize: 17,
                      fontWeight: '600'
                    }}
                    showTickIcon={true}
                    open={ogunAcik}
                    value={secilenogun}    
                    labelStyle={{fontFamily:'GillSans-Italic',fontSize:16}}
                    listItemLabelStyle={{fontFamily:'GillSans-Italic'}}                         
                    items={[
                      {label: 'Kahvaltı', value: 'Breakfast',icon: () => <Image source={require('../../assets/kahvalti.png')} style={styles.dropDownImage}/>},
                      {label: 'Öğle Yemeği', value: 'Lunch',icon: () => <Image source={require('../../assets/ogle.png')} style={styles.dropDownImage}/>},
                      {label: 'Akşam Yemeği', value: 'Dinner',icon: () => <Image source={require('../../assets/aksam.png')} style={styles.dropDownImage}/>},
                      {label: 'Atıştırmalık', value: 'Snack',icon: () => <Image source={require('../../assets/snack.png')} style={styles.dropDownImage}/>},
                      {label: 'Çay Zamanı', value: 'Teatime%20Europe',icon: () => <Image source={require('../../assets/yesilcay.png')} style={styles.dropDownImage}/>},
                    ]}
                    setOpen={setOgunAcik}
                    setValue={setSecilenOgun}
                  />   
                </View>
                <View style={styles.dropDownButtonContainer}>
                  <Button 
                      onPress={()=>{setSecilenOgun('')}} 
                      style={{width: 75,backgroundColor:'#ffffff00'}}
                      textStyle={{color:'black'}}
                    >
                      Sıfırla
                  </Button>
                </View>        
              </View>

              <View style={[{zIndex:2},styles.dropDownMainContainer]}>
                <View style={styles.dropDownContainer}>
                  <DropDownPicker
                    placeholder="Diyetler"
                    placeholderStyle={{
                      fontFamily: 'GillSans-Italic',
                      fontSize: 17,
                      fontWeight: '600'
                    }}
                    showTickIcon={true}
                    open={diyetAcik}
                    value={secilenDiyet}
                    labelStyle={{fontFamily:'GillSans-Italic',fontSize:16}}
                    listItemLabelStyle={{fontFamily:'GillSans-Italic'}}   
                    items={[
                      {label: 'Dengeli Diyet', value: 'balanced',icon: () => <Image source={require('../../assets/dengelidiyet.png')} style={styles.dropDownImage}/>},
                      {label: 'Yüksek Lifli Diyet', value: 'high-fiber',icon: () => <Image source={require('../../assets/yuksekliflidiyet.png')} style={styles.dropDownImage}/>},
                      {label: 'Yüksek Proteinli Diyet', value: 'high-protein',icon: () => <Image source={require('../../assets/yuksekproteinlidiyet.png')} style={styles.dropDownImage}/>},
                      {label: 'Düşük Karbonhidratlo Diyet', value: 'low-carb',icon: () => <Image source={require('../../assets/dusukkarbonhidratlidiyet.png')} style={styles.dropDownImage}/>},
                      {label: 'Düşük Yağlı Diyet', value: 'low-fat',icon: () => <Image source={require('../../assets/dusukyaglidiyet.png')} style={styles.dropDownImage}/>},
                    ]}
                    setOpen={setDiyetAcik}
                    setValue={setSecilenDiyet}
                  />  
                </View>
                
                <View style={styles.dropDownButtonContainer}>
                  <Button 
                      onPress={()=>{setSecilenDiyet('')}} 
                      style={{width: 75,backgroundColor:'#ffffff00'}}
                      textStyle={{color:'black'}}
                    >
                      Sıfırla
                  </Button>
                </View>           
              </View>

              <View style={[{zIndex:1},styles.dropDownMainContainer]}>
                <View style={styles.dropDownContainer}>
                  <DropDownPicker
                    placeholder="Çeşitler"
                    placeholderStyle={{
                      fontFamily: 'GillSans-Italic',
                      fontSize: 17,
                      fontWeight: '600'
                    }}
                    showTickIcon={true}
                    open={cesitAcik}
                    value={secilenCesit}
                    labelStyle={{fontFamily:'GillSans-Italic',fontSize:16}}
                    listItemLabelStyle={{fontFamily:'GillSans-Italic'}}   
                    items={[
                      {label: 'Çorbalar', value: 'Soup',icon: () => <Image source={require('../../assets/corba.png')} style={styles.dropDownImage}/>},
                      {label: 'Başlangıçlar', value: 'Starter',icon: () => <Image source={require('../../assets/baslangic.png')} style={styles.dropDownImage}/>},
                      {label: 'Sandviçler', value: 'Sandwiches',icon: () => <Image source={require('../../assets/sandvicler.png')} style={styles.dropDownImage}/>},
                      {label: 'Salatalar', value: 'Salad',icon: () => <Image source={require('../../assets/vejeteryandiyet.png')} style={styles.dropDownImage}/>},
                      {label: 'Ana Yemekler', value: 'Main%20course',icon: () => <Image source={require('../../assets/tavuk.png')} style={styles.dropDownImage}/>},
                      {label: 'İçecekler', value: 'Drinks',icon: () => <Image source={require('../../assets/icecekler.png')} style={styles.dropDownImage}/>},
                      {label: 'Tatlılar', value: 'Desserts',icon: () => <Image source={require('../../assets/cheesecake.png')} style={styles.dropDownImage}/>},
                      {label: 'Çeşniler Ve Soslar', value: 'Condiments%20and%20sauces',icon: () => <Image source={require('../../assets/soslar.png')} style={styles.dropDownImage}/>},
                      {label: 'Tahıllar', value: 'Cereals',icon: () => <Image source={require('../../assets/yuksekliflidiyet.png')} style={styles.dropDownImage}/>},
                      {label: 'Ekmekler', value: 'Bread',icon: () => <Image source={require('../../assets/ekmek.png')} style={styles.dropDownImage}/>},
                      {label: 'Bisküvi Ve Kurabiyeler', value: 'Biscuits%20and%20cookies',icon: () => <Image source={require('../../assets/kurabiye.png')} style={styles.dropDownImage}/>},
                      {label: 'Konserveler', value: 'Preserve',icon: () => <Image source={require('../../assets/fistikezmesi.png')} style={styles.dropDownImage}/>},
                    ]}
                    setOpen={setCesitAcik}
                    setValue={setSecilenCesit}
                  />          
                </View>
                <View style={styles.dropDownButtonContainer}>                   
                  <Button 
                      onPress={()=>{setSecilenCesit('')}} 
                      style={{width: 75,backgroundColor:'#ffffff00'}}
                      textStyle={{color:'black'}}
                    >
                      Sıfırla
                  </Button>
                </View>

              </View>

              <View style={{alignItems:'center',marginTop:20}}>
                <Text 
                  style={{
                    fontFamily: 'GillSans-Italic',
                    fontSize: 17,fontWeight: '600',
                    marginBottom:40
                  }}
                >
                  Kalori Aralığı
                </Text>
                <MultiSlider 
                  values={kaloriDegeri}
                  min={0}
                  max={2400}
                  step={100}
                  onValuesChangeFinish={(value)=>setKaloriDegeri(value)}
                  enableLabel={true}
                  markerStyle={{backgroundColor:'black',shadowOffset:0}}
                  trackStyle={{backgroundColor:'#b3b3b3ff'}}
                  selectedStyle={{backgroundColor: '#b3b3b3ff'}}
                />
              </View>

              <View style={{alignItems:'center',justifyContent:'center',marginTop:60}}>
                <Button onPress={filtrele} style={{width:windowWidth/2.4}} textStyle={{fontSize:15,fontFamily: 'GillSans-Italic'}} >Filtrele</Button>
              </View>
              
            </Modal>

            <FilterIcon 
              imageStyle={{height: 26, width: 26}} 
              onPress={() => setModalVisible(true)}
            />
          </View>

        </View>

          <ScrollView
            showsVerticalScrollIndicator={false} 
          > 

            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={value => setEkranTuru(value)}
                selectedColor= "black"
                borderRadius={10}
                style={{borderWidth: 0.5,marginTop: 20,borderRadius: 10,borderColor:'#07ec5f8e'}}
                textStyle={{fontSize:windowHeight/50,fontFamily:'GillSans-Italic'}}
                selectedTextStyle={{fontSize:windowHeight/40,fontFamily:'GillSans-Italic'}}
                buttonColor={'#07ec5f8e'}
                backgroundColor={'#ffffff00'}
              />
            </View>
            {ekranTuru&&
              <View style={{marginTop: 25}}> 
                <Text style={{fontSize: windowHeight/30,fontFamily: 'GillSans-SemiBoldItalic',marginLeft: 20}}>Mutfaklar</Text>
                {mutfakTuru}
                <Text style={{fontSize: windowHeight/30,fontFamily: 'GillSans-SemiBoldItalic',marginLeft: 20,marginTop: 20}}>Öğünler</Text>
                {ogunTuru}
                <Text style={{fontSize: windowHeight/30,fontFamily: 'GillSans-SemiBoldItalic',marginLeft: 20,marginTop: 20}}>Diyetler</Text>
                {diyetTuru}
                <Text style={{fontSize: windowHeight/30,fontFamily: 'GillSans-SemiBoldItalic',marginLeft: 20,marginTop: 40}}>Çeşitler</Text>
                {yemekCesitleri}
                <Text style={{fontSize: windowHeight/30,fontFamily: 'GillSans-SemiBoldItalic',marginLeft: 20,marginTop: 40}}>Kalori Miktarı</Text>
                {kaloriMiktari}
              </View>
            }
            {favoriler}

          </ScrollView>
      </SafeAreaView>
  );
}

export default TarifAnaEkrani;

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
    mutfakTuruContainer:{
      alignItems: 'center', 
      justifyContent: 'center',
      height: windowHeight/10,
      width: windowWidth/2.3,
    },
    mutfakTuruImage:{
      height: 30,
      width: 30,
      marginBottom: 3
    },
    mutfakTuruText:{
      fontFamily: 'GillSans-Italic'
    },
    yemekCesidiContainer:{
      alignItems: 'center', 
      justifyContent: 'center',
      height: windowHeight/4,
      width: windowWidth/2,
  },
    yemekCesidiImage:{
      height: windowHeight/5.5,
      width: windowWidth/3.2,
      marginBottom: 3,
      borderRadius: 20
  },
  yemekCesidiText:{
    fontFamily: 'GillSans-Italic',
    marginTop: 3,
    fontSize: windowHeight/38
 },
  calorieMainContainer:{
    marginTop: 20,
    marginBottom: 20
  },
  calorieContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom: 10
  },
  calorieImageContainer:{
    alignItems:'center',
    justifyContent: 'center'
  },
  calorieImage:{
    height: 40,
    width: 40,
    marginBottom: 3
  },
  calorieText:{
    fontFamily: 'GillSans-Italic',
    marginTop: 3,
    fontSize: 14
  },
  mainImageContainer:{
    alignItems:'center',
    justifyContent:'center',
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
    color:'#787777ff'
  },
  dropDownMainContainer:{
    alignItems: 'center',
    flexDirection:'row',
    marginTop: 8,
    marginBottom: 8,
  },
  dropDownContainer:{
    flex:3.7,
    marginLeft: 5
  },
  dropDownButtonContainer:{
    flex: 1,  
    marginLeft: 5
  },
  dropDownImage:{
    height:25,
    width: 25
  }

});

