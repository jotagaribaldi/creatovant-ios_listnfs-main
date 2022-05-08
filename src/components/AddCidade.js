import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import CidadesDataService from "../services/cidades.services";



const AddCidade = ({ id, setCidadeId }) => {
    const [codcity, setCodcity] = useState("");
    const [nomecidade, setNomecidade] = useState("");
    const [ufcidade, setUfcidade] = useState("TO");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (codcity === "" || nomecidade === "") {
          setMessage({ error: true, msg: "All fields are mandatory!" });
          return;
        }
        const newCidade = {
            codcity,
            nomecidade,
            ufcidade,
        };
        console.log(newCidade);
    
        try {
          if (id !== undefined && id !== "") {
            await CidadesDataService.updateCidades(id, newCidade);
            setCidadeId("");
            setMessage({ error: false, msg: "Updated successfully!" });
          } else {
            await CidadesDataService.addCidades(newCidade);
            setMessage({ error: false, msg: "New City added successfully!" });
          }
        } catch (err) {
          setMessage({ error: true, msg: err.message });
        }
    
        setCodcity("");
        setNomecidade("");
      };
    
      const editHandler = async () => {
        setMessage("");
        try {
          const docSnap = await CidadesDataService.getCidade(id);
          console.log("the record is :", docSnap.data());
          setCodcity(docSnap.data().codcity);
          setNomecidade(docSnap.data().nomecidade);
          setUfcidade(docSnap.data().ufcidade);
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
                  <InputGroup.Text id="formBookTitle">Cod</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Cod Cidade"
                    value={codcity}
                    onChange={(e) => setCodcity(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="formBookAuthor">
                <InputGroup>
                  <InputGroup.Text id="formBookAuthor">Nome</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Nome Cidade"
                    value={nomecidade}
                    onChange={(e) => setNomecidade(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <ButtonGroup aria-label="Basic example" className="mb-3">
                <Button
                  disabled={flag}
                  variant="success"
                  onClick={(e) => {
                    setUfcidade("TO");
                    setFlag(true);
                  }}
                >
                  Available
                </Button>
                <Button
                  variant="danger"
                  disabled={!flag}
                  onClick={(e) => {
                    setUfcidade("falso");
                    setFlag(false);
                  }}
                >
                  Not Available
                </Button>
              </ButtonGroup>
              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit">
                  Add/ Update
                </Button>
              </div>
            </Form>
          </div>
        </>
      );
    };
    
    export default AddCidade;