import { createContext, useReducer, useState } from "react";

export const FavoriTariflerContext = createContext({
    FavoriTarifler: [],
    addTarifler: () => {},
    deleteTarifler: ( id ) => {},
    temizle: () => {},
});

/*state dedigimiz buradaki tarifler dizisi, action dedigimiz ise 2 tane degeri olan nesne action.payload buraya gönderdiğimiz parametre 
action.type ise ne islemi yaptigimiz delete mi add mi update mi*/


function FavoriTariflerContexProvider({children}){

    const [ favoriTarifler , setFavoriTarifler ] =  useState([]);
    

    function addTarifler(data){

        setFavoriTarifler(oncekiVeriler=> [...oncekiVeriler,data]);
    }

    function deleteTarifler(label){
        setFavoriTarifler((oncekiVeriler)=>oncekiVeriler.filter((data)=> data.label != label))
    }

    function temizle(){
        setFavoriTarifler([]);
    }
    
    const value = {
        FavoriTarifler: favoriTarifler,
        addTarifler: addTarifler,
        deleteTarifler: deleteTarifler,  
        temizle: temizle 
    };

    return(
        <FavoriTariflerContext.Provider value={value}>{children}</FavoriTariflerContext.Provider>
    );
}

export default FavoriTariflerContexProvider;