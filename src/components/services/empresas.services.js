import { db } from '../../firebase-conf';

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore';



const empresasCollectionRef = collection(db, "empresas")

class EmpresasDataService {
    addEmpresa = ( newEmpresa ) => {
        return addDoc(empresasCollectionRef, newEmpresa);
    }

    updateEmpresa = (id, updatedEmpresa) => {
        const empresaDoc = doc(db, "empresas", id);
        return updateDoc(empresaDoc, updatedEmpresa);
    }

    deleteEmpresa = (id) => {
        const EmpresaedDoc = doc(db, "empresas", id);
        return deleteDoc(EmpresaedDoc);
    }

    getEmpresas = (codigopj) => {  
       return getDocs(query(empresasCollectionRef, where('cnpj','==', codigopj)))
    }

    getEmpresa = (id) => {
        const empresalDoc = doc(db, "empresas", id);
        return getDoc(empresalDoc);
    }
}


export default new EmpresasDataService();