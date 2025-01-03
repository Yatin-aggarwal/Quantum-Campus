import {createContext, useContext} from "react";
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";


const firebaseConfig = {
  // Enter FireBase Config File 
};
const FirebaseContext = createContext(null);
export const Use_firebase = ()=> useContext(FirebaseContext);
 export const app = initializeApp(firebaseConfig);
 const firebaseAuth = getAuth(app)
 export const FirebaseProvider = (prop)=>{
     const User =  async(email, password)=>{
       const request = await signInWithEmailAndPassword(firebaseAuth, email, password)
       return request
     }

    const Get_token = async(userCredential)=>{
     return await firebaseAuth.currentUser.getIdToken(userCredential).then((e)=>{
                                       return e;
     })
}
     return(
         <FirebaseContext.Provider value={{User,Get_token}}>
             {prop.children}
         </FirebaseContext.Provider>
     )
};