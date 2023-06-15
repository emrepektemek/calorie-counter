import { StatusBar } from 'expo-status-bar';
import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';

import LoadingOverlay from './components/ui/LoadingOverlay';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthContexProvider, { AuthContext } from './store/auth-context';
import UserDataContexProvider from './store/user-data-context';
import TariflerContexProvider from './store/tarifler-favori-context';
import EgzersizGecmisiContextProvider from './store/egzersiz-gecmisi-context';
import BesinGecmisiContextProvider from './store/besin-gecmisi-context';

import AsyncStorage from "@react-native-async-storage/async-storage";

import GunlukAnaEkrani from './screens/dailyscreens/GunlukAnaEkrani';
import GunlukBesinEkleEkrani from './screens/dailyscreens/GunlukBesinEkleEkrani';

import EgzersizAnaEkrani from './screens/exercisescreens/EgzersizAnaEkrani';
import EgzersizDuzeyEkrani from './screens/exercisescreens/EgzersizDuzeyEkrani';
import EgzersizEkrani from './screens/exercisescreens/EgzersizEkrani';
import EgzersizGecmisiEkrani from './screens/exercisescreens/EgzersizGecmisiEkrani';

import TarifAnaEkrani from './screens/recipesscreens/TarifAnaEkrani';
import TarifAramaEkrani from './screens/recipesscreens/TarifAramaEkrani';
import TarifDetayEkrani from './screens/recipesscreens/TarifDetayEkrani';
import TarifKategoriEkrani from './screens/recipesscreens/TarifKategoriEkrani';

import ProfilAnaEkrani from './screens/profilescreens/ProfilAnaEkrani';

import GirisEkrani from './screens/GirisEkrani';
import GirisEkrani2 from './screens/GirisEkrani2';

import KayitEkrani from './screens/signupscreens/KayitEkrani';
import AdKayitEkrani from './screens/signupscreens/AdKayitEkrani';
import YasKayitEkrani from './screens/signupscreens/YasKayitEkrani';
import CinsiyetKayitEkrani from './screens/signupscreens/CinsiyetKayitEkrani';
import BoyKayitEkrani from './screens/signupscreens/BoyKayitEkrani';
import KiloKayitEkrani from './screens/signupscreens/KiloKayitEkrani';
import AktiviteDuzeyiKayitEkrani from './screens/signupscreens/AktiviteDüzeyiKayitEkrani';



const Stack = createNativeStackNavigator();

const BottomTabs = createBottomTabNavigator();


function BottomTabsEkranlari(){

  return(
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle:{
          backgroundColor: '#ffffffff',
        },
        tabBarActiveTintColor:'#07ec5f8e',
      }}
    >
      <BottomTabs.Screen 
        name="GunlukAnaEkrani"
        component={GunlukAnaEkrani}
        options={{
          tabBarLabelStyle:{
            fontSize: 12,  
            fontWeight:'bold'
          },
          tabBarLabel:'Günlük',
          tabBarIcon:({color})=>{
            return(
              <Image 
                source={require('assets/gunluk.png')}
                style={{height:25,width:25,tintColor:color}}
              />
            );
          },
        }}
      />
      <BottomTabs.Screen 
        name="EgzersizAnaEkrani"
        component={EgzersizAnaEkrani}
        options={{
          tabBarLabelStyle:{        
            fontSize: 12,  
            fontWeight:'bold'
          },
          tabBarLabel:'Egzersizler',
          tabBarIcon:({color})=>{
            return(
              <Image 
                source={require('assets/egzersiz.png')}
                style={{height:25,width:25,tintColor:color}}
              />
            );
          },
        }}
      />
      <BottomTabs.Screen 
        name="TarifAnaEkrani"
        component={TarifAnaEkrani}
        options={{
          tabBarLabelStyle:{
            fontSize: 12,  
            fontWeight:'bold'  
          },
          tabBarLabel:'Tarifler',
          tabBarIcon:({color})=>{
            return(
              <Image 
                source={require('assets/tarifler.png')}
                style={{height:25,width:25,tintColor:color}}
              />
            );
          },
        }}
      />

      <BottomTabs.Screen 
        name="ProfilAnaEkrani"
        component={ProfilAnaEkrani}
        options={{
          tabBarLabelStyle:{
            fontSize: 12,  
            fontWeight:'bold'  
          },
          tabBarLabel:'Profil',
          tabBarIcon:({color})=>{
            return(
              <Image 
                source={require('assets/profil.png')}
                style={{height:25,width:25,tintColor:color}}
              />
            );
          },
        }}
      />
     
    </BottomTabs.Navigator>
  );
}

function GirisKayitEkranlari(){

  return(
    <Stack.Navigator
      screenOptions={{headerShown:false}}
    >
      <Stack.Screen 
        name="GirisEkrani"
        component={GirisEkrani}
      />
       <Stack.Screen 
        name="GirisEkrani2"
        component={GirisEkrani2}
      />
      <Stack.Screen
        name="AdKayitEkrani"
        component={AdKayitEkrani}
      />
       <Stack.Screen
        name="YasKayitEkrani"
        component={YasKayitEkrani}
      />
      <Stack.Screen
        name="CinsiyetKayitEkrani"
        component={CinsiyetKayitEkrani}
      />
      <Stack.Screen
        name="BoyKayitEkrani"
        component={BoyKayitEkrani}
      />
      <Stack.Screen
        name="KiloKayitEkrani"
        component={KiloKayitEkrani}
      />
      <Stack.Screen
        name="AktiviteDuzeyiKayitEkrani"
        component={AktiviteDuzeyiKayitEkrani}
      />
       <Stack.Screen
        name="KayitEkrani"
        component={KayitEkrani}
      />
    </Stack.Navigator>
  );
}

function UygulamaEkranlari(){

  return(
    <Stack.Navigator
      screenOptions={{headerShown:false}}
    >
      <Stack.Screen 
        name="BottomTabsEkranlari"
        component={BottomTabsEkranlari}
      />

      <Stack.Screen 
        name="GunlukBesinEkleEkrani"
        component={GunlukBesinEkleEkrani}
      />

      
      <Stack.Screen 
        name="TarifAramaEkrani"
        component={TarifAramaEkrani}
      />
      <Stack.Screen 
        name="TarifDetayEkrani"
        component={TarifDetayEkrani}
      />
      <Stack.Screen 
        name="TarifKategoriEkrani"
        component={TarifKategoriEkrani}
      />

      <Stack.Screen 
        name="EgzersizDuzeyEkrani"
        component={EgzersizDuzeyEkrani}
      />
      <Stack.Screen 
        name="EgzersizEkrani"
        component={EgzersizEkrani}
      />
      <Stack.Screen 
        name="EgzersizGecmisiEkrani"
        component={EgzersizGecmisiEkrani}
      />
    </Stack.Navigator>
  );

}

function Navigation() {

  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <GirisKayitEkranlari />}
      {authContext.isAuthenticated && <UygulamaEkranlari />}
    </NavigationContainer>
  );
}

function Root(){

  const [isTryingLogin , setIsTraingLogin] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {

    async function fetchToken(){

      const storedToken = await AsyncStorage.getItem('uid');
      
      if(storedToken){
        authContext.authenticate(storedToken);
      }
      setIsTraingLogin(false);
    }
    fetchToken();
    
  },[]);

  if(isTryingLogin){
    return <LoadingOverlay message="Giriş Yapılıyor..." />
  }

  return <Navigation />;
}

export default function App() {

  return ( 
    
    <BesinGecmisiContextProvider>
      <EgzersizGecmisiContextProvider>
        <UserDataContexProvider>
          <TariflerContexProvider>
              <AuthContexProvider>
                <StatusBar style='auto' />
                <Root /> 
              </AuthContexProvider>
          </TariflerContexProvider>
        </UserDataContexProvider> 
      </EgzersizGecmisiContextProvider>
    </BesinGecmisiContextProvider>
   
  );
}
