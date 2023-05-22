'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ModalEdit from 'app/components/calls/modalEdit'
import FormCreateCall from 'app/components/calls/formCreateCall'
import ModalDelete from 'app/components/calls/modalDelete'
import * as bootstrap from 'bootstrap';

const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
const data1 = [
  {
    maximunParticipants: 20,
    nameGroup: "Grupo de tenis de mesa",
    place: "Polideportivo",
    schedule: "Lunes y Miercoles de 2 a 4 de la tarde",
    deadline: "05/04/2023",
    participants: [],
    status: "Abierta"
  },
  {
    maximunParticipants: 10,
    nameGroup: "Grupo de corredores",
    place: "Parque central",
    schedule: "Martes y Jueves de 6 a 7 de la mañana",
    participants: [],
    status: "Abierta"
  },
  {
    maximunParticipants: 10,
    nameGroup: "Grupo de baile",
    place: "Gimnasio del barrio",
    schedule: "Lunes, Miercoles y Viernes de 5 a 6 de la tarde",
    deadline: "15/11/2023",
    participants: [],
    status: "Abierta"
  }
]

const eventViewParticipants = (i) => {
  console.log("click participants", i)
}

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
export default function Form() {
  const [calls, setCalls] = useState(data1);
  const [idCall, setIdCall] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);
  const [nameModal, setNameModal] = useState('');
  const reloadPage = () => setReload(reload + 1);


  const handleShowDeleteView = (index,idModal,nameM) => {
    setIdCall(index)
    setNameModal(nameM)
    const myModal = new bootstrap.Modal(document.getElementById(idModal))
    myModal.show();
  };

  const hideModal = (idModal) => {
    const myModal = document.getElementById(idModal);
    const modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();
  }
  
  useEffect(() => {
    setCalls(null)
    async function getCalls() {
        const response = await axios.post(endpoint, { query: queryCall })
        console.log("response",response.data.data.getCalls)
        setCalls(response.data.data.getCalls)
    }
    
    getCalls()
  }, [reload])

    return (calls
      ?<div className='container mt-6'>
        <button type="button" onClick={() => handleShowDeleteView(1,'formCreate','create')} className="btn btn-primary" >Crear convocatoria</button>
        <ModalEdit id={'formEdit'} idCall={idCall}  hideModal={() => hideModal('formEdit')} data={calls} reloadPage={reloadPage} />
        <FormCreateCall hideModalCreate={() => hideModal('formCreate')} reloadPage={reloadPage} />
        <ModalDelete nameModal={nameModal}  data={calls} idCall={idCall} hideModal={() => hideModal('modalDelete')} reloadPage={reloadPage}/>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className='text-center' scope="col">Editar</th>
              <th className='text-center' scope="col">Eliminar</th>
              <th className='text-center' scope="col">Ver participantes</th>
              <th className='text-center' scope="col">Nombre grupo</th>
              <th className='text-center' scope="col">Cupos</th>
              <th className='text-center' scope="col">Lugar</th>
              <th className='text-center' scope="col">Horario</th>
              <th className='text-center' scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call, index) => (
              <tr key={call.nameGroup}>
                <td className='text-center'>
                  <button type="button" onClick={() => handleShowDeleteView(index,'formEdit','edit')} className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg></button>
                </td>
                <td className='text-center'>
                  <button type="button" onClick={() => handleShowDeleteView(index,'modalDelete','delete')} className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                  </svg></button>
                </td>
                <td className='text-center'>
                  <button type="button" onClick={() => handleShowDeleteView(index,'modalDelete','view')} className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg> </button>
                </td>
                <td className='text-center'>{call.nameGroup}</td>
                <td className='text-center'>{call.maximunParticipants}</td>
                <td className='text-center'>{call.place}</td>
                <td className='text-center'>{call.schedule}</td>
                <td className='text-center'>{call.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    :<div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
    )
}