import { db } from '../../firebase-conf';

import { collection, getDocs, getDoc, addDoc, updateDoc, query, orderBy, deleteDoc, doc } from 'firebase/firestore';



const cidadeCollectionRef = collection(db, "cidades")
class CidadesDataService {
    addCidades = ( newCidade ) => {
        return addDoc(cidadeCollectionRef, newCidade);
    }

    updateCidades = (id, updatedCidades) => {
        const cidadeDoc = doc(db, "cidades", id);
        return updateDoc(cidadeDoc, updatedCidades);
    }

    deleteCidades = (id) => {
        const cidadeDoc = doc(db, "cidades", id);
        return deleteDoc(cidadeDoc);
    }

    getAllCidades = () => {
        return getDocs(query(cidadeCollectionRef,  orderBy('nomecidade')))
    }

    getCidade = (id) => {
        const cidadeDoc = doc(db, "cidades", id);
        return getDoc(cidadeDoc);
    }
}


export default new CidadesDataService();