import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import LeiturasDataService from "./services/leituras.services";
import EmpresasDataService from "./services/empresas.services";
import { BrowserRouter, Routes, Link, Route, Switch } from 'react-router-dom';
import { flushSync } from "react-dom";
import axios from "axios";

const ListLeitura = ({ getLeituraId }) => {
    const [leituras, setLeituras] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    useEffect(() => {
        getLeituras();
        console.log(empresas)
    }, []);
  
    const getLeituras = async () => {
      const data = await LeiturasDataService.getAllLeituras()
      //console.log(data.docs);
      setLeituras(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    
    const getEmpresasData = async (idcnpj) => {
      const datapj = await EmpresasDataService.getEmpresas(idcnpj)
      console.log("dentro do get: " +datapj.docs);
      setEmpresas(datapj.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const deleteHandler = async (id) => {
      await LeiturasDataService.deleteLeitura(id);
      getLeituras();
    };

    const convertOnlyNF =  (nfwhashcode) => {
      if (nfwhashcode){
        var chaveacesso = nfwhashcode.substr(0,44)
        return chaveacesso
        } else {
          return null
        }
    }

    const convertMesAno =  (nftrecho) => {
      if (nftrecho){
        return nftrecho.substr(2,4)
        } 
    }

    const cnpjNota =  (nfcnpj) => {
      if (nfcnpj){
        return nfcnpj.substr(6,14)
        } 
    }

    const numIDNota =  (IDnota) => {
      if (IDnota){
        return IDnota.substr(25,9)
        } 
    }

    const consultCNPF = (cadastro) => {
      const api = axios.create({
        baseURL: 'https://receitaws.com.br/v1/cnpj/${cadastro}', 
        timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}
      })
      //if(cadastro) {
       // fetch('https://receitaws.com.br/v1/cnpj/${cadastro}').then((res)=>res.json()).then((res) =>{
       const response =  api.get('')  
       console.log(response.data);
        //})
      //}
    }

    const consultlocalCNPJ = async (cadastropj) => {
       // console.log("dado passado: "+cadastropj)
      //  if(!isNaN(cadastropj) && (cadastropj.toString.length === 14 )){
        if(!isNaN(cadastropj)){
        
          await getEmpresasData(cadastropj)
          console.log("dados empresas: "+empresas)
        }else {
          return "Empresa nao cadastrada ou inválida"
        }
      }
      //if(cadastro) {
       // fetch('https://receitaws.com.br/v1/cnpj/${cadastro}').then((res)=>res.json()).then((res) =>{
    //   const response =  api.get('')  
    //   console.log(response.data);
        //})
      //}
  

    const convertDate = (date) => {
        // whatever formatting you want to do can be done here
        var d = date.toString()
        return d.substr(0, 21);
    };
    const style={
      marginBottom:'0px'
    }
    const list={
      display:'inline-flex',
      width:'100%',
      marginBottom:'10px'
    }
    
    
    
    
    return (
        <>
          <div className="mb-2">
            <Button variant="dark edit" onClick={getLeituras}>
              Refresh List
            </Button>
          </div>
    
          {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>UID</th>
                <th>Email</th>
                <th>Status</th>
                <th>URL QR</th>
                <th>Dados Nota</th>
                <th>Data</th>
                {/*
                <th>Status</th>
                 */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leituras.map((doc, index) => {
               
                return (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>A{/*{doc.uideng}*/}</td>
                    <td>{doc.emaillog}</td>
                    <td>{!doc.status ?  "Aguarde.. (****)"  : doc.status}</td>
                    <td><Link to={{ pathname: doc.urlQR  }} target="_blank" >Link SEFAZ</Link></td>
                    <td style={{fontSize: '12px', fontFamily:'Arial'}}> { !convertOnlyNF(doc.urlQR.split('?p=')[1]) ? doc.urlQR : convertOnlyNF(doc.urlQR.split('?p=')[1]) } 
                    <br/> ANO/MES: { !convertOnlyNF(doc.urlQR.split('?p=')[1]) ? convertMesAno(doc.urlQR) : convertMesAno(convertOnlyNF(doc.urlQR.split('?p=')[1])) }
                    <br/> CNPJ: { !convertOnlyNF(doc.urlQR.split('?p=')[1]) ? cnpjNota(doc.urlQR) : cnpjNota(convertOnlyNF(doc.urlQR.split('?p=')[1])) }
                    <br/> Empresa:  { /*  !convertOnlyNF(doc.urlQR.split('?p=')[1]) ? consultlocalCNPJ(cnpjNota(doc.urlQR)) : consultlocalCNPJ(cnpjNota(convertOnlyNF(doc.urlQR.split('?p=')[1]))) */ }
                      <br/> Num NF: {  !convertOnlyNF(doc.urlQR.split('?p=')[1]) ? numIDNota(doc.urlQR) : numIDNota(convertOnlyNF(doc.urlQR.split('?p=')[1]))  }
                      <br /> { doc.id }
                     </td>
                    <td>{convertDate(doc.readedAt.toDate())}</td>
                    
                    {/* 
                    <td>{doc.status}</td>
                    <td><Link to={{ pathname: {doc.urlQR}  }} target="_blank" /></td>
                     */}
                    <td>
                        <Button
                        variant="secondary"
                        className="edit"
                        onClick={(e) => getLeituraId(doc.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="delete"
                        onClick={(e) => deleteHandler(doc.id)}
                      >
                        Delete
                      </Button> 
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      );
    };


    export default ListLeitura;