import { useState } from "react";
import { View,Text, StyleSheet, SafeAreaView, Dimensions, Image, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import IconButton from "../../components/ui/IconButton";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// 1200 x 400 exercise olarak aratıp resimleri buldum

function baslangicDuzeyEkrani(){

    const navigation = useNavigation();

    function duzeyEkraninaGit(...veriler){

        navigation.navigate('EgzersizDuzeyEkrani',{bolgeIsmi: veriler[0], bolge: veriler[1],duzeyIsmi: veriler[2],duzey: veriler[3], resim: veriler[4]});
    }
    
    return(
        <View style={styles.ekranMainContainer}>
            <View style={styles.ekranIcerikContainer}>
                <Image 
                    source={{
                        uri: 'https://masterleven.nl/wp-content/uploads/2022/09/ML-BLOG-13.png'
                    }}
                    style={styles.egzersizImage}
                />

                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                      onPress={duzeyEkraninaGit.bind(this,'Omuz Ve Sırt',1,'Başlangıç Düzey',1,'https://i0.wp.com/www.ishfitness-ne.com/wp-content/uploads/2020/10/15165sm.jpg?resize=800%2C533&ssl=1')}
                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://i0.wp.com/www.ishfitness-ne.com/wp-content/uploads/2020/10/15165sm.jpg?resize=800%2C533&ssl=1'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Omuz Ve Sırt - Başlangıç Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>

                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                      onPress={duzeyEkraninaGit.bind(this,'Kol Ve Göğüs',2,'Başlangıç Düzey',1,'https://venusmedical.ie/wp-content/uploads/2019/08/male_breast_reduction-1024x628.jpg')}
                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://venusmedical.ie/wp-content/uploads/2019/08/male_breast_reduction-1024x628.jpg'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Kol Ve Göğüs - Başlangıç Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>

               
                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                      onPress={duzeyEkraninaGit.bind(this,'Karın',3,'Başlangıç Düzey',1,'https://jorjani.de/wp-content/uploads/2020/10/sixpack-mann-1.jpg')}
                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://jorjani.de/wp-content/uploads/2020/10/sixpack-mann-1.jpg'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Karın - Başlangıç Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>

                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                      onPress={duzeyEkraninaGit.bind(this,'Bacak',4,'Başlangıç Düzey',1,'https://blog.nasm.org/hubfs/calf-workouts.jpg')}
                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://blog.nasm.org/hubfs/calf-workouts.jpg'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Bacak - Başlangıç Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>
                
            </View>
        </View>
    )
}

function ortaDuzeyEkrani(){

    const navigation = useNavigation();

    function duzeyEkraninaGit(...veriler){

        navigation.navigate('EgzersizDuzeyEkrani',{bolgeIsmi: veriler[0], bolge: veriler[1],duzeyIsmi: veriler[2],duzey: veriler[3], resim: veriler[4]});
    }

    return(
        <View style={styles.ekranMainContainer}>
            <View style={styles.ekranIcerikContainer}>
                <Image 
                    source={{
                        uri: 'https://www.theimperfectfitness.com/images/slider6/imperfect-fitness-slogan.jpeg'
                    }}
                    style={styles.egzersizImage}
                />

                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                      onPress={duzeyEkraninaGit.bind(this,'Omuz Ve Sırt',1,'Orta Düzey',2,'https://olimpsport.com/media/mageplaza/blog/post/image//t/r/trening-4_1.jpg')}
                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://olimpsport.com/media/mageplaza/blog/post/image//t/r/trening-4_1.jpg'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Omuz Ve Sırt - Orta Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>

                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                      onPress={duzeyEkraninaGit.bind(this,'Kol Ve Göğüs',2,'Orta Düzey',2,'https://bod-blog-assets.prod.cd.beachbodyondemand.com/bod-blog/wp-content/uploads/2022/06/15144207/chest-muscles-960.png')}
                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://bod-blog-assets.prod.cd.beachbodyondemand.com/bod-blog/wp-content/uploads/2022/06/15144207/chest-muscles-960.png'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Kol Ve Göğüs - Orta Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>

                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                      onPress={duzeyEkraninaGit.bind(this,'Karın',3,'Orta Düzey',2,'https://www.mensjournal.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM3MzI1Mjc2MDQ2NDgx/muscular_muscle_male_abs_arms_medicine_ball_main.jpg')}
                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://www.mensjournal.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM3MzI1Mjc2MDQ2NDgx/muscular_muscle_male_abs_arms_medicine_ball_main.jpg'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Karın - Orta Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>
               
                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                      onPress={duzeyEkraninaGit.bind(this,'Bacak',4,'Orta Düzey',2,'https://i.ytimg.com/vi/c6fELDw4yc0/maxresdefault.jpg')}
                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://i.ytimg.com/vi/c6fELDw4yc0/maxresdefault.jpg'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Bacak - Orta Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>

            </View>
        </View>
    )
}

function gelismisDuzeyEkrani(){

    const navigation = useNavigation();

    function duzeyEkraninaGit(...veriler){

        navigation.navigate('EgzersizDuzeyEkrani',{bolgeIsmi: veriler[0], bolge: veriler[1],duzeyIsmi: veriler[2],duzey: veriler[3], resim: veriler[4]});
    }
    return(
        <View style={styles.ekranMainContainer}>
            <View style={styles.ekranIcerikContainer}>
                <Image 
                    source={{
                        uri: 'https://ygo-assets-websites-legacy.yougov.net/cumulus_uploads/entry/2022-02-18/GettyImages-1324651131.jpg'
                    }}
                    style={styles.egzersizImage}
                />

                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                    onPress={duzeyEkraninaGit.bind(this,'Omuz Ve Sırt',1,'Gelişmiş Düzey',3,'https://www.muscleandfitness.com/wp-content/uploads/2019/02/back-flexing-arms-shoulders-bodybuilder-GettyImages-668640512.jpg?quality=86&strip=all')}

                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://www.muscleandfitness.com/wp-content/uploads/2019/02/back-flexing-arms-shoulders-bodybuilder-GettyImages-668640512.jpg?quality=86&strip=all'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Omuz Ve Sırt - Gelişmiş Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>

                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                      onPress={duzeyEkraninaGit.bind(this,'Kol Ve Göğüs',2,'Gelişmiş Düzey',3,'https://miro.medium.com/v2/resize:fit:1001/1*9OrxMWzC6ARoatL1rrufQg.jpeg')}
                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://miro.medium.com/v2/resize:fit:1001/1*9OrxMWzC6ARoatL1rrufQg.jpeg'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Kol Ve Göğüs - Gelişmiş Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>

                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                      onPress={duzeyEkraninaGit.bind(this,'Karın',3,'Gelişmiş Düzey',3,'https://cdn.shopify.com/s/files/1/0088/7576/9952/articles/823263ae20c5bdc76691a1530e54b43e_ebbdf775-d0c2-45db-9c47-3176dfbc1c43_1600x.png?v=1554317340')}
                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://cdn.shopify.com/s/files/1/0088/7576/9952/articles/823263ae20c5bdc76691a1530e54b43e_ebbdf775-d0c2-45db-9c47-3176dfbc1c43_1600x.png?v=1554317340'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Karın - Gelişmiş Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>

                <Pressable 
                    style={({pressed}) => [
                        {
                          backgroundColor: pressed ? '#4a4a4a37' : 'white',
                        },
                        styles.altEgzersizContainer
                      ]}
                    onPress={duzeyEkraninaGit.bind(this,'Bacak',4,'Gelişmiş Düzey',3,'https://fitnessvolt.com/wp-content/uploads/2022/06/30-Minute-Leg-Workout.jpg')}

                >
                    <View style={styles.altEgzersizImageContainer}>
                        <Image 
                            source={{
                                uri: 'https://fitnessvolt.com/wp-content/uploads/2022/06/30-Minute-Leg-Workout.jpg'
                            }}
                            style={styles.altEgzersizImage}
                        />
                        <Text style={styles.altEgzersizText}>Bacak - Gelişmiş Düzey</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </View>
                </Pressable>
                
                
            </View>
        </View>
    )
}

function renderTabBar(props){
    return(
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'black'}}
            style={{ backgroundColor: '#07ec5f8e',borderRadius: 10}}
            scrollEnabled={true}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color: 'black',fontFamily:'GillSans-Italic',fontSize:windowHeight/40 }}>
                  {route.title}
                </Text>
            )}
        />
    );
}


function EgzersizAnaEkrani({navigation}){

    const [ekranlar,setEkranlar] = useState({
        index: 0,
        routes: [
            { key: 'birinci', title: 'Başlangıç Düzey' },
            { key: 'ikinci', title: 'Orta Düzey' },
            { key: 'ucuncu', title: 'Gelişmiş Düzey' },
        ],
    });

    return(
        <SafeAreaView style={styles.mainContainer}>

            <View style={styles.topMenuContanier}> 
                <View style={{alignItems: 'flex-end',flex: 2}}>
                    <Text style={styles.topMenuText}>Egzersizler</Text>
                </View>
                <View style={{justifyContent: 'flex-end',flex: 1,marginRight:12,flexDirection:'row'}}> 
                    <IconButton 
                        icon="calendar-outline"
                        color="black"
                        size={windowHeight/27}
                        onPress={()=>{navigation.navigate('EgzersizGecmisiEkrani')}}
                    />
                </View>
            </View> 

           
            <TabView
                navigationState={ekranlar}
                renderScene={SceneMap({
                    birinci: baslangicDuzeyEkrani,
                    ikinci: ortaDuzeyEkrani,
                    ucuncu: gelismisDuzeyEkrani
                })}
                onIndexChange={index => setEkranlar({ 
                    index: index,
                    routes: [
                        { key: 'birinci', title: 'Başlangıç Düzey' },
                        { key: 'ikinci', title: 'Orta Düzey' },
                        { key: 'ucuncu', title: 'Gelişmiş Düzey' },
                    ],
                 })}
                initialLayout={{ width: windowWidth }}
                style={styles.tabContainer}
                labelStyle={{color: 'yellow'}}
                renderTabBar={renderTabBar}
            />
        </SafeAreaView>
    );
}

export default EgzersizAnaEkrani;

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
    tabContainer: {
        marginTop: 20,
    },
    ekranMainContainer:{
        flex:1 , 
        alignItems:'center',
        justifyContent: 'center'
    },
    ekranIcerikContainer:{
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 13
    },
    egzersizImage:{
        width: windowWidth-25,
        height:windowHeight/6,
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
    },
    altEgzersizContainer:{
        padding: 6,
        marginTop: 10,
        borderRadius: 13
    },
    altEgzersizImageContainer:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    altEgzersizImage:{
        width: 70,
        height: 60,
        marginBottom: 10,
        borderRadius: 13
    },
    altEgzersizText:{
        marginLeft: 10,
        fontFamily: 'GillSans-Italic',
        fontSize: 17
    },
});