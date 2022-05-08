import { db } from '../../firebase-conf';

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore';



const leiturasCollectionRef = collection(db, "leituras")
let datalimit = new Date('2022-04-11');
class LeiturasDataService {
    addLeitura = ( newLeitura ) => {
        return addDoc(leiturasCollectionRef, newLeitura);
    }

    updateLeitura = (id, updatedLeitura) => {
        const leituraDoc = doc(db, "leituras", id);
        return updateDoc(leituraDoc, updatedLeitura);
    }

    deleteLeitura = (id) => {
        const leituradDoc = doc(db, "leituras", id);
        return deleteDoc(leituradDoc);
    }

    getAllLeituras = () => {  
       return getDocs(query(leiturasCollectionRef,  orderBy('readedAt', 'desc'), where('readedAt','>=', datalimit)))
    }

    getLeitura = (id) => {
        const leituralDoc = doc(db, "leituras", id);
        return getDoc(leituralDoc);
    }
}


export default new LeiturasDataService();