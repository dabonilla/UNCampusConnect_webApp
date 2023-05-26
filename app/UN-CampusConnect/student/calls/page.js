'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
//import ModalEnrollment from 'app/components/calls/modalEnrollment'
import * as bootstrap from 'bootstrap';
import dynamic from 'next/dynamic';
import { Navigation } from './../../../components/Navigation';
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
const ModalEnrollment = dynamic(() => import('app/components/calls/modalEnrollment'), { ssr: false });

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

  const hideModal = (idModal) => {
    if (typeof document !== 'undefined') {
      const myModal = document.getElementById(idModal);
      const modal = bootstrap.Modal.getInstance(myModal);
      modal.hide();
    }

  }
  const handleShow = (index) => {
    if (typeof document !== 'undefined') {
      setIdCall(index)
      const myModal = new bootstrap.Modal(document.getElementById('modalEnrollment'))
      myModal.show();
    }

  };



  useEffect(() => {
    setCalls(null)
    async function getCalls() {
      const response = await axios.post(endpoint, { query: queryCall })
      console.log("response", response.data.data.getCalls)
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


  return (calls
    ?
    <div>
      <div>
        <Navigation />
      </div>
      <div className='container mt-6'>
        {empty ? <div><h2>No hay convocatorias</h2></div> : <div>
        <ModalEnrollment hideModal={() => hideModal('modalEnrollment')} idCall={idCall} data={calls} reloadPage={reloadPage} />
        
        <table className="table table-striped">
          <thead>
            <tr>
              <th className='text-center' scope="col">Inscripción</th>
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
                  <button style={{ backgroundColor: "#21413a", color: 'white' }} type="button" onClick={() => handleShow(index)} className="btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-text-fill" viewBox="0 0 16 16">
                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
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
        </table></div>}

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