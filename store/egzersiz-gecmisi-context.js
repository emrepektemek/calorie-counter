import { createContext, useState } from "react";

export const EgzersizGecmisiContext = createContext({
    GecmisEgzersizData: [],
    addGecmisEgzersizData: () => {},
    updateGecmisEgzersizData: () => {},
    temizle: () => {},
});


/*state dedigimiz buradaki tarifler dizisi, action dedigimiz ise 2 tane degeri olan nesne action.payload buraya gönderdiğimiz parametre 
action.type ise ne islemi yaptigimiz delete mi add mi update mi*/

function EgzersizGecmisiContextProvider({children}){

    const [ egzersizGecmisi , setEgzersizGecmisi] =  useState([]);

    function addGecmisEgzersizData(data){

        setEgzersizGecmisi(oncekiVeriler=> [...oncekiVeriler,data]);
    }

    function updateGecmisEgzersizData(data){
        
        setEgzersizGecmisi(data);
    }

    function temizle(){
        setEgzersizGecmisi([]);
    }

    const value = {
        GecmisEgzersizData: egzersizGecmisi,
        addGecmisEgzersizData: addGecmisEgzersizData,  
        updateGecmisEgzersizData: updateGecmisEgzersizData,
        temizle: temizle
    };
    return(
        <EgzersizGecmisiContext.Provider value={value}>{children}</EgzersizGecmisiContext.Provider>
    );
}

export default EgzersizGecmisiContextProvider;