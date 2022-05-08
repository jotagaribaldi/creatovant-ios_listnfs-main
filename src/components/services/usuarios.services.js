import { db } from '../../firebase-conf';

import { collection, getDocs, getDoc, addDoc, updateDoc, query, orderBy, deleteDoc, doc } from 'firebase/firestore';



const usuarioCollectionRef = collection(db, "usuarios")
class UsuariosDataService {
    addUsuarios = ( newUsuario ) => {
        return addDoc(usuarioCollectionRef, newUsuario);
    }

    updateUsuarios = (id, updatedUsuarios) => {
        const usuarioDoc = doc(db, "usuarios", id);
        return updateDoc(usuarioDoc, updatedUsuarios);
    }

    deleteUsuarios = (id) => {
        const usuarioDoc = doc(db, "usuarios", id);
        return deleteDoc(usuarioDoc);
    }

    getAllUsuarios = () => {
        return getDocs(query(usuarioCollectionRef,  orderBy('nomeEng')))
    }

    getUsuario = (id) => {
        const usuarioDoc = doc(db, "usuarios", id);
        return getDoc(usuarioDoc);
    }
}


export default new UsuariosDataService();