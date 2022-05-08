import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import UsuariosDataService from "./services/usuarios.services";
import ListUsuario from "./ListUsuario";



const Usuarios = ({ id, setUsuarioId }) => {
    const [registro, setRegistro] = useState("");
    const [nomeEng, setNomeEng] = useState("");
    const [foneEng, setFoneEng] = useState("");
    const [cidade, setCidade] = useState("");
    const [CPFEng, setCPFEng] = useState("");
    const [emailEng, setEmailEng] = useState("");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });

    const getUsuarioIdHandler = (id) => {
        console.log("The ID of document to be edited: ", id);
        setRegistro(id);
      };
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (registro === "" || nomeEng === "" || cidade === "" || CPFEng === "" || foneEng === "" || emailEng === "" ) {
          setMessage({ error: true, msg: "All fields are mandatory!" });
          return;
        }
        const newUsuario = {
            registro,
            nomeEng,
            cidade, CPFEng, foneEng, emailEng
        };
        console.log(newUsuario);
    
        try {
          if (id !== undefined && id !== "") {
            await UsuariosDataService.updateUsuarios(id, newUsuario);
            setUsuarioId("");
            setMessage({ error: false, msg: "Updated successfully!" });
          } else {
            await UsuariosDataService.addUsuarios(newUsuario);
            setMessage({ error: false, msg: "New usuario added successfully!" });
          }
        } catch (err) {
          setMessage({ error: true, msg: err.message });
        }
    
        setRegistro("");
        setNomeEng("");
        setFoneEng("");
        setCidade("");
        setCPFEng("");
        setEmailEng();
      };
    
      const editHandler = async () => {
        setMessage("");
        try {
          const docSnap = await UsuariosDataService.getUsuario(id);
          console.log("the record is :", docSnap.data());
          setRegistro(docSnap.data().registro);
          setNomeEng(docSnap.data().nomeEng);
          setFoneEng(docSnap.data().foneEng);
          setCidade(docSnap.data().cidade);
          setCPFEng(docSnap.data().CPFEng);
          setEmailEng(docSnap.data().emailEng);

        } catch (err) {
          setMessage({ error: true, msg: err.message });
        }
      };
    
      useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
          editHandler();
        }
      }, [id]);
return (
    <>
     <div className="App">
        <h1>Cadastro de Usuarios</h1>
    </div>
    <div className="p-4 box">
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBookTitle">
          <InputGroup>
            <InputGroup.Text id="formBookTitle">REGISTRO</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Cod Cidade"
              value={registro}
              onChange={(e) => setRegistro(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookAuthor">
          <InputGroup>
            <InputGroup.Text id="formBookAuthor">ENGENHEIRO</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Nome Engenheiro"
              value={nomeEng}
              onChange={(e) => setNomeEng(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formCPFEng">
          <InputGroup>
            <InputGroup.Text id="formBookAuthor">CPF</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="CPF Engenheiro"
              value={CPFEng}
              onChange={(e) => setCPFEng(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        
        <div className="d-grid gap-2">
          <Button variant="primary" type="Submit">
            Add/ Update
          </Button>
        </div>
      </Form>
    </div>
    
    <Container>
    <Row>
      <Col>
            <ListUsuario getUsuarioId={getUsuarioIdHandler}/>
      </Col>
    </Row>    
    </Container>
  </>
)

}

export default Usuarios;