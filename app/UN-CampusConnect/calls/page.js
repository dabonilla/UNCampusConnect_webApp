'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ModalEdit from 'app/components/modalEdit'
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
    maximunParticipants: 15,
    nameGroup: "Grupo de yoga",
    place: "Gimnasio",
    schedule: "Lunes, Miercoles y Viernes de 7 a 8 de la noche",
    participants: [],
    status: "Abierta"
  },
  {
    maximunParticipants: 8,
    nameGroup: "Grupo de dibujo",
    place: "Casa de la cultura",
    schedule: "Sábados de 10 a 12 del mediodía",
    deadline: "30/06/2023",
    participants: [],
    status: "Abierta"
  },
  {
    maximunParticipants: 10,
    nameGroup: "Grupo de inglés",
    place: "Biblioteca pública",
    schedule: "Martes y Jueves de 3 a 5 de la tarde",
    deadline: "10/07/2023",
    participants: [],
    status: "Abierta"
  },
  {
    maximunParticipants: 12,
    nameGroup: "Grupo de fotografía",
    place: "Centro cultural",
    schedule: "Sábados de 2 a 4 de la tarde",
    deadline: "20/08/2023",
    participants: [],
    status: "Abierta"
  },
  {
    maximunParticipants: 8,
    nameGroup: "Grupo de cocina",
    place: "Casa de la cultura",
    schedule: "Lunes y Miércoles de 6 a 8 de la noche",
    deadline: "30/09/2023",
    participants: [],
    status: "Abierta"
  },
  {
    maximunParticipants: 15,
    nameGroup: "Grupo de lectura",
    place: "Biblioteca pública",
    schedule: "Martes y Jueves de 6 a 7 de la tarde",
    deadline: "10/10/2023",
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



const eventCreate = (i) => {
  console.log("click create", i)
}

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

  const handleShow = () => {
    const myModal = new bootstrap.Modal(document.getElementById('ModalEdit'))
    myModal.show();
  }
  const handleShowEdit = (index) => {
    setIdCall(index)
    const myModal = new bootstrap.Modal(document.getElementById('formEdit'))
    myModal.show();
};
const hideModal = () => {
    const myModal = document.getElementById('formEdit');
    const modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();
}



const eventEdit = (i) => {
  console.log("click edit", i)
  handleShow()
}


  useEffect(() => {
    async function getCalls() {
      const response = await axios.post(endpoint, { query: queryCall })
      console.log(response.data.data.getCalls)
      setCalls(response.data.data.getCalls)
    }
    getCalls()

  }, [])

  const eventDelete = ( i) => {
    console.log("click delete")
  }
  return (
    
<div className='container mt-6'>
      <button type="button" onClick={()=>eventCreate()} className="btn btn-primary" >Crear convocatoria</button>
      <ModalEdit id ={'formEdit'} idCall={idCall} hideModal = {()=>hideModal()} data = {calls}/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
            <th scope="col">Ver par.</th>
            <th scope="col">Nombre grupo</th>
            <th scope="col">Cupos</th>
            <th scope="col">Lugar</th>
            <th scope="col">Horario</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call,index) => (
            <tr key={call.nameGroup}>
              
              <td>
                <button type="button" onClick={()=>handleShowEdit(index)} className="btn btn-primary">Editar</button>
              </td>
              <td>
                <button type="button" onClick={()=>eventDelete(index)} className="btn btn-primary">Eliminar</button>
              </td>
              <td>
                <button type="button" onClick={()=>eventViewParticipants(index)} className="btn btn-primary">Ver </button>
              </td>
              <td >{call.nameGroup}</td>
              <td>{call.maximunParticipants}</td>
              <td>{call.place}</td>
              <td>{call.schedule}</td>
              <td>{call.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}