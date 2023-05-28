'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Navigation } from './../../../components/Navigation';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`


const queryCall = `
    query{
      getCalls{
        id
        nameGroup
        maximunParticipants
        place
        schedule
        status
        participants
      }
    }
    `

export default function TableCalls() {
  const [calls, setCalls] = useState(null);
  const [idCall, setIdCall] = useState(0);
  const [empty, setEmpty] = useState(false);
  const [reload, setReload] = useState(0);
  const reloadPage = () => setReload(reload + 1);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    console.log(index)
    setIdCall(index)
    setShow(true)
  };
  useEffect(() => {
    setCalls(null)
    async function getCalls() {
      const response = await axios.post(endpoint, { query: queryCall })
      setCalls(response.data.data.getCalls)
      if (response.data.data.getCalls.length == 0) {
        setEmpty(true)
      }
      else {
        setEmpty(false)
      }
    }
    getCalls()
  }, [reload])
  const enrollment = () => {
    const queryEnrollment = `
    mutation{
      enrollmentCall(id: "${calls[idCall].id}"){
        nameGroup
        participants
      }
    }
      `
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    async function enrollmentCall() {
      await axios.post(endpoint, { query: queryEnrollment }, config)
        .then(response => {
          reloadPage()
        })
        .catch(error => {
          console.log(error)
        })
    }
    enrollmentCall()
    handleClose()
  }
  return (calls
    ?
    <div>
      <div>
        <Navigation />
      </div>
      <div className='container mt-6'>
        {empty ? <div><h2>No hay convocatorias</h2></div>
          : <div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Inscripción a una convocatoria.</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿ Desea inscribirse a la convocatoria del:{calls[idCall].nameGroup} ?
              </Modal.Body>
              <Modal.Footer>
                <Button style={{backgroundColor: "#61735A", color: 'white'}}  onClick={handleClose}>
                  Cancelar
                </Button>
                <Button style={{ backgroundColor: "#21413a", color: 'white' }} onClick={() => enrollment()} >Aceptar</Button>
              </Modal.Footer>
            </Modal>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className='text-center' >Inscripción</th>
                  <th className='text-center' >Nombre grupo</th>
                  <th className='text-center' >Cupos</th>
                  <th className='text-center' >Lugar</th>
                  <th className='text-center' >Horario</th>
                  <th className='text-center' >Estado</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((call, index) => (
                  <tr key={call.nameGroup}>
                    <td className='text-center'>
                      <Button style={{ backgroundColor: "#21413a", color: 'white' }} onClick={() => handleShow(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-text-fill" viewBox="0 0 16 16">
                          <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
                        </svg>
                      </Button>
                    </td>
                    <td className='text-center'>{call.nameGroup}</td>
                    <td className='text-center'>{call.maximunParticipants}</td>
                    <td className='text-center'>{call.place}</td>
                    <td className='text-center'>{call.schedule}</td>
                    <td className='text-center'>{call.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>}
      </div>
    </div>
    :
    <div>
      <div>
        <Navigation />
      </div>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

  )


}