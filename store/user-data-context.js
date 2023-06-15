import { createContext, useState } from "react";

export const UserDataContext = createContext({
    UserData: {},
    BelgeId: '',
    addUserData: () => {},
    addBelgeId: () => {},
    updateUserData: () => {},
    adGuncelle: ()=>{},
    cinsiyetGuncelle: ()=>{},
    dogumTarihiGuncelle: ()=>{},
    boyGuncelle: ()=>{},
    kiloGuncelle: ()=>{},
    aktiviteDuzeyiGuncelle: ()=>{},
    temizle: () => {},

});


/*state dedigimiz buradaki tarifler dizisi, action dedigimiz ise 2 tane degeri olan nesne action.payload buraya gönderdiğimiz parametre 
action.type ise ne islemi yaptigimiz delete mi add mi update mi*/

function UserDataContexProvider({children}){

    const [ userDataState , setUserDataState ] =  useState({});
    const [belgeId, setBelgeId] = useState('');

    function addUserData(data){
        setUserDataState(data);
    }

    function addBelgeId(id){
        setBelgeId(id);
    }


    function adGuncelle(ad){
        
        setUserDataState((oncekiVeriler)=>({
            ...oncekiVeriler,
            ad: ad
        }));
    }

    function dogumTarihiGuncelle(tarih){
        setUserDataState((oncekiVeriler)=>({
            ...oncekiVeriler,
            dogumTarihi: tarih
        }));
    }

    function boyGuncelle(boy){
        
        setUserDataState((oncekiVeriler)=>({
            ...oncekiVeriler,
            boy: boy
        }));
    }

    function kiloGuncelle(kilo){
        
        setUserDataState((oncekiVeriler)=>({
            ...oncekiVeriler,
            kilo: kilo
        }));
    }

    function aktiviteDuzeyiGuncelle(aktiviteDuzeyi){
        
        setUserDataState((oncekiVeriler)=>({
            ...oncekiVeriler,
            aktiviteDuzeyi: aktiviteDuzeyi
        }));
    }

    function cinsiyetGuncelle(cinsiyet){
        
        setUserDataState((oncekiVeriler)=>({
            ...oncekiVeriler,
            cinsiyet: cinsiyet
        }));
    }

    function updateUserData(data){  // const new_obj = { ...obj, name: { first: 'blah', last: 'ha'} }
        setUserDataState(data);
    }

    
    function temizle(){
        setUserDataState({});
        setBelgeId('');
    }

    const value = {
        UserData: userDataState,
        BelgeId: belgeId,
        addUserData: addUserData,  
        addBelgeId: addBelgeId,
        updateUserData: updateUserData,
        adGuncelle: adGuncelle,
        cinsiyetGuncelle: cinsiyetGuncelle,
        dogumTarihiGuncelle: dogumTarihiGuncelle,
        boyGuncelle: boyGuncelle,
        kiloGuncelle: kiloGuncelle,
        aktiviteDuzeyiGuncelle: aktiviteDuzeyiGuncelle,
        temizle: temizle
    };
    return(
        <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
    );
}

export default UserDataContexProvider;