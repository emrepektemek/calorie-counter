import { useContext, useState } from "react";
import { View, StyleSheet, SafeAreaView, Dimensions, ScrollView } from "react-native";

import { EgzersizGecmisiContext } from "../../store/egzersiz-gecmisi-context";

import { TimeDatePicker, Modes } from "react-native-time-date-picker";

import FiltreListe from "./FiltreListe";

import IconButton from "../../components/ui/IconButton";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let filtrelenmisEgzersizGecmisiGun = [];
let filtrelenmisEgzersizGecmisiAyYil = [];

let gunListe;
let ayYilListe;

let hangiListe = true;

function EgzersizGecmisiEkrani({navigation}){

    const egzersizGecmisiCtx = useContext(EgzersizGecmisiContext);

    const [filtreGun, setFiltreGun] = useState([]);
    const [filtreAyYil, setFiltreAyYil] = useState([]);

    function guneGoreFiltrele(tarih){

        filtrelenmisEgzersizGecmisiGun = egzersizGecmisiCtx.GecmisEgzersizData.filter((data)=>{
           
            return tarih.getDate() == data.egzersizPlaniBaslamaTarihi.toDate().getDate() && tarih.getMonth() == data.egzersizPlaniBaslamaTarihi.toDate().getMonth() && tarih.getFullYear() == data.egzersizPlaniBaslamaTarihi.toDate().getFullYear()
        }); 

        setFiltreGun(...filtrelenmisEgzersizGecmisiGun);

        hangiListe = true;

        gunListe = <FiltreListe dizi={filtrelenmisEgzersizGecmisiGun} tarih={tarih} tur={0} />

    }

    function ayVeYilaGoreFiltrele(tarih){

        filtrelenmisEgzersizGecmisiAyYil = egzersizGecmisiCtx.GecmisEgzersizData.filter((data)=>{
           
            return tarih.getMonth() == data.egzersizPlaniBaslamaTarihi.toDate().getMonth() && tarih.getFullYear() == data.egzersizPlaniBaslamaTarihi.toDate().getFullYear()
        });  

        setFiltreAyYil(...filtrelenmisEgzersizGecmisiAyYil);

        hangiListe = false;

        ayYilListe = <FiltreListe dizi={filtrelenmisEgzersizGecmisiAyYil} tarih={tarih} tur={1} />

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

            <ScrollView showsVerticalScrollIndicator={false}>

                <TimeDatePicker
                    selectedDate={new Date()}
                    mode={Modes.calendar}
                    onSelectedChange={(selected) => guneGoreFiltrele(new Date(selected))}
                    onMonthYearChange={(selected) => ayVeYilaGoreFiltrele(new Date(selected))}
                    translation="tr"
                    style={{
                        borderRadius: 20,
                        width: windowWidth-30,
                        marginLeft: 15,
                        height: windowHeight/2.3
                    }}
                    options={{
                        textHeaderColor: '#000000',
                        textDefaultColor: '#a5a5a5',
                        selectedTextColor: '#ffffff',
                        mainColor: '#000000',
                        textSecondaryColor: '#000000',
                        defaultFont: 'GillSans-Italic',
                        headerFont: 'GillSans-Italic',
                        textFontSize: 14,
                        textHeaderFontSize: 18,
                    }}
                />
               
               { hangiListe && gunListe }
               { !hangiListe && ayYilListe }
                
            </ScrollView> 
        </SafeAreaView>
       
    );

}

export default EgzersizGecmisiEkrani;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    topMenuContanier:{
        flexDirection:'row',
        alignItems: 'center'
    },
  
});