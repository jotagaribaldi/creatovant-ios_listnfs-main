import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import UsuariosDataService from "./services/usuarios.services";


const ListUsuario = ({ getUsuarioId }) => {
    const [users, setUsuarios] = useState([]);
    useEffect(() => {
      getUsuarios();
    }, []);
  
    const getUsuarios = async () => {
      const data = await UsuariosDataService.getAllUsuarios()
      console.log(data.docs);
      setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
  
    const deleteHandler = async (id) => {
      await UsuariosDataService.deleteUsuarios(id);
      getUsuarios();
    };

    return (
        <>
          <div className="mb-2">
            <Button variant="dark edit" onClick={getUsuarios}>
              Refresh List
            </Button>
          </div>
    
          {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Fone</th>
                <th>E-mail</th>
                <th>Cidade</th>
                <th>Registro CREA</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>{doc.nomeEng}</td>
                    <td>{doc.CPFEng}</td>
                    <td>{doc.foneEng}</td>
                    <td>{doc.emailEng}</td>
                    <td>{doc.cidade}</td>
                    <td>{doc.registro}</td>
                    <td>
                      <Button
                        variant="secondary"
                        className="edit"
                        onClick={(e) => getUsuarioId(doc.id)}
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


    export default ListUsuario;