import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";
import LeiturasDataService from "./services/leituras.services";
import ListLeitura from "./ListLeitura";



const Leituras = ({ id, setLeituraId }) => {
    
    const [uideng, setUideng] = useState("");
    const [emaillog, setEmaillog] = useState("");
    const [readedAt, setReadedat] = useState("");
    const [status, setStatus] = useState("");
    const [urlQR, setUrlqr] = useState("");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });

    const getLeituraIdHandler = (id) => {
        console.log("The ID of document to be edited: ", id);
        //setRegistro(id);
      };
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (uideng === "" || emaillog === "" || readedAt === "" || status === "" || urlQR === "" ) {
          setMessage({ error: true, msg: "All fields are mandatory!" });
          return;
        }
        const newLeitura = {
            uideng,
            emaillog, readedAt, status, urlQR
        };
        console.log(newLeitura);
    
        try {
          if (id !== undefined && id !== "") {
            await LeiturasDataService.updateLeitura(id, newLeitura);
            setLeituraId("");
            setMessage({ error: false, msg: "Updated successfully!" });
          } else {
            await LeiturasDataService.addLeitura(newLeitura);
            setMessage({ error: false, msg: "New leitura added successfully!" });
          }
        } catch (err) {
          setMessage({ error: true, msg: err.message });
        }
    
        setUideng("");
        setEmaillog("");
        setReadedat("");
        setStatus("");
        setUrlqr("");
      };
    
      const editHandler = async () => {
        setMessage("");
        try {
          const docSnap = await LeiturasDataService.getLeitura(id);
          console.log("the record is :", docSnap.data());
          setUideng(docSnap.data().uideng);
          setEmaillog(docSnap.data().emaillog);
          setReadedat(docSnap.data().readedAt);
          setStatus(docSnap.data().status);
          setUrlqr(docSnap.data().urlQR);
        } catch (err) {
          setMessage({ error: true, msg: err.message });
        }
      };
    
      useEffect(() => {
    //    console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
          editHandler();
        }
      }, [id]);
return (
    <>
     <div className="App">
        <h1>Leituras Cupons Fiscais</h1>
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

      {/* <Form onSubmit={handleSubmit}>
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
      </Form> */}
    </div>
    
    <Container>
    <Row>
      <Col>
            <ListLeitura getLeituraId={getLeituraIdHandler}/>
      </Col>
    </Row>    
    </Container>
  </>
)

}

export default Leituras;