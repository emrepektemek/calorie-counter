import { createContext, useState } from "react";

export const BesinGecmisiContext = createContext({
    BesinEgzersizData: [],
    addGecmisBesinData: () => {},
    updateGecmisBesinData: () => {},
    temizle: () => {},
});


function BesinGecmisiContextProvider({children}){

    const [ besinGecmisi , setBesinGecmisi] =  useState([]);

    function addGecmisBesinData(data){

        setBesinGecmisi(oncekiVeriler => [...oncekiVeriler,data]);
    }

    function updateGecmisBesinData(data){
        
        setBesinGecmisi(data);
    }
    
    function temizle(){
        setBesinGecmisi([]);
    }

    const value = {
        BesinEgzersizData: besinGecmisi,
        addGecmisBesinData: addGecmisBesinData,  
        updateGecmisBesinData: updateGecmisBesinData,
        temizle: temizle
    };
    return(
        <BesinGecmisiContext.Provider value={value}>{children}</BesinGecmisiContext.Provider>
    );
}

export default BesinGecmisiContextProvider;