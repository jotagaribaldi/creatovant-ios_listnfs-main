import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import CidadesDataService from "./services/cidades.services";


const ListCidade = ({ getCidadeId }) => {
    const [books, setCidades] = useState([]);
    useEffect(() => {
      getCidades();
    }, []);
  
    const getCidades = async () => {
      const data = await CidadesDataService.getAllCidades()
      console.log(data.docs);
      setCidades(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
  
    const deleteHandler = async (id) => {
      await CidadesDataService.deleteCidades(id);
      getCidades();
    };

    return (
        <>
          <div className="mb-2">
            <Button variant="dark edit" onClick={getCidades}>
              Refresh List
            </Button>
          </div>
    
          {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Código</th>
                <th>Nome Cidade</th>
                <th>UF</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>{doc.codcity}</td>
                    <td>{doc.nomecidade}</td>
                    <td>{doc.ufcidade}</td>
                    <td>
                      <Button
                        variant="secondary"
                        className="edit"
                        onClick={(e) => getCidadeId(doc.id)}
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


    export default ListCidade;