import { doc, updateDoc,getDoc, arrayUnion} from "firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {app} from "../config.js";
const db = getFirestore(app)

export const add_today_date = async (email)=>{

    const Doc = doc(db, "users", email);
    var today = new Date();
    const date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
    return await updateDoc(Doc, {
    "Date": arrayUnion(date)
    });

 }

export default async (email)=>{
        const Doc = doc(db, "users", email);
        const docSnap = await getDoc(Doc)
        return docSnap.data()


}



