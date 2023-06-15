import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

import { getTodayDateWithoutClock, getMonthYear, getDay } from "../../util/date";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// timestramp'dan date nesnesine çevirdiğimizde saati türkiye saatine istersen egzersizGecmisiCtx.GecmisEgzersizData[2].egzersizPlaniBitisTarihi.toDate().toLocaleTimeString('tr-TR') bunu yaplmalısın

//console.log( egzersizGecmisiCtx.GecmisEgzersizData[0].egzersizPlaniBitisTarihi.toDate());

function FiltreListe({navigation,dizi,tur,tarih}){


    if(tur == 0){
        
        let baslikTarih = getTodayDateWithoutClock(tarih);
   
        return(
    
            <View style={styles.egzersizGecmisiMainContainer}>
                <View style={{padding: 15}}>
                    <Text style={styles.baslikText}>{baslikTarih}</Text>
                </View>
                
                {
                    dizi.map((item,index)=>{
    
                        let bolgeResim;
    
                        if(item.bolgeIsmi == 'Karın'){
                            bolgeResim =  
                            <View style={styles.bolgeResimContainer}>
                                <Image 
                                    source={require('../../assets/karin.png')}
                                    style={styles.bolgeImage}
                                />
                            </View> 
                        }
                        else if(item.bolgeIsmi == 'Kol Ve Göğüs'){
                            bolgeResim =  
                            <View style={styles.bolgeResimContainer}>
                                <Image 
                                    source={require('../../assets/kol.png')}
                                    style={styles.bolgeImage}
                                />
                            </View> 
                        }
                        else if(item.bolgeIsmi == 'Omuz Ve Sırt'){
                            bolgeResim =  
                            <View style={styles.bolgeResimContainer}>
                                <Image 
                                    source={require('../../assets/sirt.png')}
                                    style={styles.bolgeImage}
                                />
                            </View> 
                        }
                        else if(item.bolgeIsmi == 'Bacak'){
                            bolgeResim =  
                            <View style={styles.bolgeResimContainer}>
                                <Image 
                                    source={require('../../assets/bacak.png')}
                                    style={styles.bolgeImage}
                                />
                            </View> 
                        }
                        
                        let sure = (item.egzersizPlaniBitisTarihi.toDate().getTime()-item.egzersizPlaniBaslamaTarihi.toDate().getTime())/1000;
                        let sureDakika  = Math.floor(sure/60);
                        let sureSaniye = Math.round(sure % 60);
    
                        if(sureDakika<10){
                            sureDakika = '0' + sureDakika;
                        }
                        if(sureSaniye<10){
                            sureSaniye = '0' + sureSaniye;
                        }
    
    
                        return(
                            <View key={index} style={styles.bilgiMainContainer}>
                                {bolgeResim}
                                <View style={styles.bilgiContainer}>
                                    <View style={styles.bilgiBaslik}>
                                        <Text style={styles.bilgiBaslikText}>{item.bolgeIsmi} - {item.duzeyIsmi} - {item.yogunlukIsmi}</Text>
                                    </View>
                                    <View style={styles.ucBilgiMainContainer}>  
                                        <View style={styles.ucBilgiContainer}> 
                                            <Text style={styles.ucBilgiText}>{item.egzersizPlaniBitisTarihi.toDate().toLocaleTimeString('tr-TR')}</Text>
                                            <Text style={styles.ucAltBilgiText}>saat</Text>
                                        </View>
    
                                        <View style={styles.ucBilgiContainer}> 
                                            <Text style={styles.ucBilgiText}>{sureDakika} : {sureSaniye}</Text>
                                            <Text style={styles.ucAltBilgiText}>süre</Text>
                                        </View>
    
                                        <View style={styles.ucBilgiContainer}> 
                                            <Text style={styles.ucBilgiText}>{item.yakilanKalori}</Text>
                                            <Text style={styles.ucAltBilgiText}>kcal</Text>
                                        </View>
                                        
                                    </View>
                                    
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        );
    }

    if(tur == 1){

        let baslikTarih = getMonthYear(tarih);
   
        return(
    
            <View style={styles.egzersizGecmisiMainContainer}>
                <View style={{padding: 15}}>
                    <Text style={styles.baslikText}>{baslikTarih}</Text>
                </View>
                
                {
                    dizi.map((item,index)=>{
    
                        let bolgeResim;
    
                        if(item.bolgeIsmi == 'Karın'){
                            bolgeResim =  
                            <View style={styles.bolgeResimContainer}>
                                <Image 
                                    source={require('../../assets/karin.png')}
                                    style={styles.bolgeImage}
                                />
                            </View> 
                        }
                        else if(item.bolgeIsmi == 'Kol Ve Göğüs'){
                            bolgeResim =  
                            <View style={styles.bolgeResimContainer}>
                                <Image 
                                    source={require('../../assets/kol.png')}
                                    style={styles.bolgeImage}
                                />
                            </View> 
                        }
                        else if(item.bolgeIsmi == 'Omuz Ve Sırt'){
                            bolgeResim =  
                            <View style={styles.bolgeResimContainer}>
                                <Image 
                                    source={require('../../assets/sirt.png')}
                                    style={styles.bolgeImage}
                                />
                            </View> 
                        }
                        else if(item.bolgeIsmi == 'Bacak'){
                            bolgeResim =  
                            <View style={styles.bolgeResimContainer}>
                                <Image 
                                    source={require('../../assets/bacak.png')}
                                    style={styles.bolgeImage}
                                />
                            </View> 
                        }
                        
                        let sure = (item.egzersizPlaniBitisTarihi.toDate().getTime()-item.egzersizPlaniBaslamaTarihi.toDate().getTime())/1000;
                        let sureDakika  = Math.floor(sure/60);
                        let sureSaniye = Math.round(sure % 60);
    
                        if(sureDakika<10){
                            sureDakika = '0' + sureDakika;
                        }
                        if(sureSaniye<10){
                            sureSaniye = '0' + sureSaniye;
                        }

                        let gun = getDay(item.egzersizPlaniBaslamaTarihi.toDate());    
    
                        return(
                            <View key={index} style={styles.bilgiMainContainer}>
                                {bolgeResim}
                                <View style={styles.bilgiContainer}>
                                    <View style={styles.bilgiBaslik}>
                                        <Text style={styles.bilgiBaslikText}>{item.bolgeIsmi} - {item.duzeyIsmi} - {item.yogunlukIsmi}</Text>
                                    </View>
                                    <View style={styles.ucBilgiMainContainer}>  

                                        <View style={styles.ucBilgiContainer}> 
                                            <Text style={styles.ucBilgiText}>{gun}</Text>
                                            <Text style={styles.ucAltBilgiText}>gün</Text>
                                        </View>
                                        
                                        <View style={styles.ucBilgiContainer}> 
                                            <Text style={styles.ucBilgiText}>{item.egzersizPlaniBitisTarihi.toDate().toLocaleTimeString('tr-TR')}</Text>
                                            <Text style={styles.ucAltBilgiText}>saat</Text>
                                        </View>
    
                                        <View style={styles.ucBilgiContainer}> 
                                            <Text style={styles.ucBilgiText}>{sureDakika} : {sureSaniye}</Text>
                                            <Text style={styles.ucAltBilgiText}>süre</Text>
                                        </View>
    
                                        <View style={styles.ucBilgiContainer}> 
                                            <Text style={styles.ucBilgiText}>{item.yakilanKalori}</Text>
                                            <Text style={styles.ucAltBilgiText}>kcal</Text>
                                        </View>
                                        
                                    </View>
                                    
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        );
    }
   
}

export default FiltreListe;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    topMenuContanier:{
        flexDirection:'row',
        alignItems: 'center'
    },
    baslikText:{
        fontSize: 18,
        marginLeft: 30,
        fontFamily: 'GillSans-Italic',
        fontWeight:'600',
    },
    egzersizGecmisiContainer:{
        marginTop: 20,
        backgroundColor: 'white'
    },
    egzersizGecmisiMainContainer:{
        backgroundColor: 'white', 
        borderRadius: 20, 
        width: windowWidth-30,
        marginLeft: 15,
        marginTop: 20
    },
    bolgeResimContainer:{
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        backgroundColor: '#000000ff' ,
        alignItems: 'center',
        justifyContent:'center'
    },
    bolgeImage:{
        height: 40, 
        width: 40
    },
    bilgiMainContainer:{
        padding: 10, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    bilgiContainer:{
        flex: 1,
        marginLeft: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.4,
        borderBottomColor: '#b4b4b4ff' 
    },
    bilgiBaslik:{
        alignItem:'center', 
        justifyContent:'center'
    },
    bilgiBaslikText:{
        fontSize: 16,
        fontFamily: 'GillSans-Italic' 
    },
    ucBilgiMainContainer:{
        marginTop: 14,
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    ucBilgiContainer:{
        alignItems: 'center'
    },
    ucBilgiText:{
        fontSize: 14,
        fontFamily: 'GillSans-Italic' ,
        color: '#6e6e6eff' 
    },
    ucAltBilgiText:{
        fontSize: 13,
        fontFamily: 'GillSans-Italic' ,
        color: '#6e6e6eff' 
    },
  
});