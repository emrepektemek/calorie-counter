import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { getAuthObject } from "./FireBaseObjects";

const auth = getAuthObject();

export async function kayitOl(email,password){
   
    const uid = await createUserWithEmailAndPassword(auth,email,password);
    
    return uid;
}


export async function girisYap(email,password){

    const uid = await signInWithEmailAndPassword(auth,email,password);

    return uid;
}

