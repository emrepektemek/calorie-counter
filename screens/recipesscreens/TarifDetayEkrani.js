import { View, Text, StyleSheet, SafeAreaView, Dimensions, Image, ScrollView, Linking, Alert} from "react-native";

import IconButton from "../../components/ui/IconButton";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

import { PieChart } from "react-native-chart-kit";

import { Colors } from "../../constants/colors";

import Button from "react-native-really-awesome-button";

function TarifDetayEkrani({navigation,route}){
    
    const { tarifVerisi} = route.params;

    let porsiyon = Math.round(tarifVerisi.yield);

    let suMiktari = tarifVerisi.totalNutrients.WATER.quantity;

    let toplamYagMiktari = tarifVerisi.totalNutrients.FAT.quantity;
    let doymusYagMiktari = tarifVerisi.totalNutrients.FASAT.quantity;
    //let transYagMiktari = tarifVerisi.totalNutrients.FATRN.quantity;
    let tekliDoymamisYagMiktari = tarifVerisi.totalNutrients.FAMS.quantity;
    let cokluDoymamisYagMiktari = tarifVerisi.totalNutrients.FAPU.quantity;

    let toplamProteinMiktari = tarifVerisi.totalNutrients.PROCNT.quantity;

    let toplamKarbonhidratMiktari = tarifVerisi.totalNutrients.CHOCDF.quantity;
    let lifMiktari = tarifVerisi.totalNutrients.FIBTG.quantity;
    let sekerMiktari = tarifVerisi.totalNutrients.SUGAR.quantity;

    let kolesterolMiktari = tarifVerisi.totalNutrients.CHOLE.quantity; 

    const data = [
        { name: 'Yağ', miktar: Math.round(toplamYagMiktari/porsiyon), color: '#fdfd91', legendFontColor: '#696969', legendFontSize: windowHeight/65 },
        { name: 'Protein', miktar: Math.round(toplamProteinMiktari/porsiyon), color: '#fd9591', legendFontColor: '#696969', legendFontSize: windowHeight/65 },
        { name: 'Karbonhidrat', miktar: Math.round(toplamKarbonhidratMiktari/porsiyon), color: '#91fd91', legendFontColor: '#696969', legendFontSize: windowHeight/65 },
        { name: 'Su', miktar: Math.round(suMiktari/porsiyon), color: '#91d1fd', legendFontColor: '#696969', legendFontSize: windowHeight/65 },
        { name: 'Şeker', miktar: Math.round(sekerMiktari/porsiyon), color: '#f691fd', legendFontColor: '#696969', legendFontSize: windowHeight/65 }, 
        { name: 'Kolesterol', miktar: Math.round(kolesterolMiktari/(porsiyon*1000)), color: '#666666', legendFontColor: '#696969', legendFontSize: windowHeight/65 },
    ]

   async function linkeGit(){
        const supported = await Linking.canOpenURL(tarifVerisi.url);

        if (supported) {
            await Linking.openURL(tarifVerisi.url);
        } 
        else {
            Alert.alert(`${url} link açılamıyor kaldırılmış olabilir veya internet bağlantınız olmayabilir`);
        }  
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
                <Text style={styles.labelText}>{tarifVerisi.label}</Text>
            </View>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.image}
                        source={{
                            uri: tarifVerisi.image
                        }}
                    />   
                </View>

                <View>
                    <View style={styles.anaBilgilerMainContainer}>
                        <View style={styles.anaBilgilerContainer}>
                            <Image 
                                source={require('../../assets/porsiyon.png')}
                                style={styles.anaBilgilerImage}
                            />
                            <Text style={styles.anaBilgilerText}>{porsiyon} Porsiyon</Text>
                        </View>
                        <View style={styles.anaBilgilerContainer}>
                            <Image 
                                source={require('../../assets/kalori.png')}
                                style={styles.anaBilgilerImage}
                            />
                            <Text style={styles.anaBilgilerText}>{Math.round(tarifVerisi.calories)} kcal</Text>
                        </View>
                        <View style={styles.anaBilgilerContainer}>
                            <Image 
                                source={require('../../assets/mutfak.png')}
                                style={styles.anaBilgilerImage}
                            />
                            <Text style={styles.anaBilgilerText}>{tarifVerisi.cuisineType[0].charAt(0).toUpperCase()+tarifVerisi.cuisineType[0].slice(1)}</Text>
                        </View>
                       
                    </View>

                    <View style={styles.linkButtonContainer}>
                        <Text style={styles.linkButtonText}>Tarifi Görmek İçin</Text>
                        <Button
                            borderRadius={20}
                            height={windowHeight/20}
                            width={windowWidth/4}
                            style={{marginLeft:windowWidth/30}}
                            backgroundColor="black"    
                            textFontFamily="GillSans-Italic"
                            onPress={linkeGit}
                            backgroundDarker='#d8d8d8'
                        >
                        Basınız</Button>
                     </View>



                   <View style={styles.chartContainer}>
                        <Text style={styles.chartText}>1 Porsiyondaki Değerler</Text>
                        <PieChart
                            data={data}
                            width={windowWidth/1.2}
                            height={windowHeight/3.4}
                            accessor="miktar"
                            chartConfig={{
                                backgroundGradientFrom: '#0b0b0a',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            }}
                            paddingLeft={windowWidth/20}
                        />
                   </View>
                    
                </View>
                
                <View style={styles.iceriklerContainer}>
                    <View style={styles.anaDegerContainer}>
                        <Image 
                            source={require('../../assets/yag.png')}
                            style={styles.iceriklerImage}
                        />
                        <Text style={styles.icerikText}>Yağ</Text>
                    </View>
                    <Text style={styles.altIcerikText}>
                        %{Math.round((doymusYagMiktari/toplamYagMiktari)*100)} Doymuş Yağ ({Math.round(doymusYagMiktari/porsiyon)} g)   
                    </Text>
                   
                    <Text style={styles.altIcerikText}>
                        %{Math.round((tekliDoymamisYagMiktari/toplamYagMiktari)*100)} Tekli Doymamış Yağ ({Math.round(tekliDoymamisYagMiktari/porsiyon)} g)
                    </Text>
                    <Text style={styles.altIcerikText}>
                        %{Math.round((cokluDoymamisYagMiktari/toplamYagMiktari)*100)} Çoklu Doymamış Yağ ({Math.round(cokluDoymamisYagMiktari/porsiyon)} g)
                    </Text>
                    <Text style={[styles.altIcerikText,{marginTop: 10}]}>
                        Toplam Yağ {Math.round(toplamYagMiktari/porsiyon)} g
                    </Text>
                </View>

                <View style={styles.iceriklerContainer}>
                    <View style={styles.anaDegerContainer}>
                        <Image 
                            source={require('../../assets/protein.png')}
                            style={styles.iceriklerImage}
                        />
                        <Text style={styles.icerikText}>Protein</Text>
                    </View>
    
                    <Text style={[styles.altIcerikText,{marginTop: 10}]}>
                        {Math.round(toplamProteinMiktari/porsiyon)} g
                    </Text>
                </View>

                <View style={styles.iceriklerContainer}>
                    <View style={styles.anaDegerContainer}>
                        <Image 
                            source={require('../../assets/karbonhidrat.png')}
                            style={styles.iceriklerImage}
                        />
                        <Text style={styles.icerikText}>Karbonhidrat</Text>
                    </View>
                    <Text style={styles.altIcerikText}>
                        %{Math.round((lifMiktari/toplamKarbonhidratMiktari)*100)} Lif ({Math.round(lifMiktari/porsiyon)} g)
                    </Text>
                    <Text style={styles.altIcerikText}>
                        %{Math.round((sekerMiktari/toplamKarbonhidratMiktari)*100)} Şeker ({Math.round(sekerMiktari/porsiyon)} g)
                    </Text>
                    <Text style={[styles.altIcerikText,{marginTop: 10}]}>
                        Toplam Karbonhidrat {Math.round(toplamKarbonhidratMiktari/porsiyon)} g
                    </Text>
                </View>

                <View style={styles.iceriklerContainer}>
                    <View style={styles.anaDegerContainer}>
                        <Image 
                            source={require('../../assets/kolesterol.png')}
                            style={styles.iceriklerImage}
                        />
                        <Text style={styles.icerikText}>Kolesterol</Text>
                    </View>
                    <Text style={[styles.altIcerikText,{marginTop: 10}]}>
                        {Math.round(kolesterolMiktari/porsiyon)} mg
                    </Text>
                </View>

                <View style={styles.iceriklerContainer}>
                    <View style={styles.anaDegerContainer}>
                        <Image 
                            source={require('../../assets/su.png')}
                            style={styles.iceriklerImage}
                        />
                        <Text style={styles.icerikText}>Su</Text>
                    </View>
                    <Text style={[styles.altIcerikText,{marginTop: 10}]}>
                        {Math.round(suMiktari/porsiyon)} g
                    </Text>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
}

export default TarifDetayEkrani;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1
    },
    topMenuContanier:{
        flexDirection:'row',
        alignItems: 'center'
    },
    imageContainer:{
        alignItems:'center'
    },
    image:{
        height:windowHeight/2.4,
        width: windowWidth/1.2,
        borderRadius:20
    },
    labelContainer:{
        alignItems:'center',
        marginBottom: 14
    },
    labelText:{
        fontSize: windowHeight/32,
        fontWeight:'600',
        fontFamily: 'GillSans-Italic',
    },
    anaBilgilerMainContainer:{
        flexDirection:'row'
    },
    anaBilgilerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 15
    },
    anaBilgilerImage:{
        height: 40,
        width: 40,
    },
    anaBilgilerText:{
        marginTop: 10,
        color: '#696969',
        fontFamily: 'GillSans-Italic',
    },
    linkButtonContainer:{
        alignItems:'center',
        flexDirection:'row',
        marginTop: 40,
        marginBottom: 20
    },
    linkButtonText:{
        fontSize: 20,
        marginLeft:windowWidth/10,
        fontFamily: 'GillSans-Italic',
        fontWeight:'600'
    },
    chartContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:40, 
        marginBottom: 20
    },
    chartText:{
        fontSize: 20,
        fontFamily: 'GillSans-Italic',
        fontWeight: '600',
        marginBottom: 15
    },
    iceriklerContainer:{
        marginBottom: 20,
        marginLeft: 30
    },
    anaDegerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:5
    },
    iceriklerImage:{
        height: 35,
        width: 35,
    },
    iceriklerImage2:{
        height: 30,
        width: 30,
    },
    icerikText:{
        fontSize: windowHeight/35,
        marginLeft: 8,
        fontFamily: 'GillSans-Italic',
        fontWeight:'600'
    },
    altIcerikText:{
        fontSize: windowHeight/45,
        marginLeft: windowWidth/6,
        padding: 6,
        color: '#696969',
        fontFamily: 'Avenir',
    }
});

