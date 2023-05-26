'use client'
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import axios from "axios";
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
const FormEdit = ({ data, idCall, hideModal, reloadPage }) => {
  const [inputNameGroup, setInputNameGroup] = useState(data[idCall].nameGroup);
  const [inputMaximunParticipants, setInputMaximunParticipants] = useState(data[idCall].maximunParticipants);
  const [inputPlace, setInputPlace] = useState(data[idCall].place);
  const [inputSchedule, setInputSchedule] = useState(data[idCall].schedule);
  const router = useRouter();
  const [errores, setErrores] = useState({});
  const preloaded = {
    nameGroup: data[idCall].nameGroup
  }
  const [preLoad, setPreLoad] = useState(preloaded);

  const onSubmit = data1 => {
    hideModal()
    console.log(data1);
  }
  const eventSave = () => {
    console.log("idEdit: ", idCall)
    const nuevosErrores = {};
    if (inputNameGroup == '') {
      nuevosErrores.inputNameGroup = 'El nombre del grupo es obligatorio';
    }

    if (inputMaximunParticipants == '') {
      nuevosErrores.inputMaximunParticipants = 'El número de cupos es obligatorio';
    } else if (!/^([1-9]|[1-9][0-9]+)$/.test(inputMaximunParticipants)) {
      nuevosErrores.inputMaximunParticipants = 'El número de cupos debe ser un valor numérico positivo';
    }

    if (inputPlace == '') {
      nuevosErrores.inputPlace = 'El lugar es obligatorio';
    }

    if (inputSchedule == '') {
      nuevosErrores.inputSchedule = 'El horario es obligatorio';
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) {
      const queryUpdate = `
      mutation{
        updateCall(Call:{
          maximunParticipants: ${inputMaximunParticipants}
          nameGroup: "${inputNameGroup}"
          place: "${inputPlace}"
          schedule: "${inputSchedule}"
          deadline: "${data[idCall].deadline}"
          status: "Abierta"
          participants: []
        },id: "${data[idCall].id}"){
          nameGroup
        }
      }
      `
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      async function updateCall() {
        await axios.post(endpoint, { query: queryUpdate }, config)
          .then(response => {
            console.log("edir",response)
            reloadPage()
            //setCalls(response.data.data.getCalls)
          })
          .catch(error => {
            console.log(error)
          })
      }
      updateCall()
      
      hideModal('formEdit')
      //router.push('/UN-CampusConnect/admin/calls')
    }
  }

  useEffect(() => {
    setInputNameGroup(data[idCall].nameGroup)
    setInputMaximunParticipants(data[idCall].maximunParticipants)
    setInputPlace(data[idCall].place)
    setInputSchedule(data[idCall].schedule)

  }, [idCall, data])

  const { register, formState: { errors }, handleSubmit } = useForm(
    { defaultValues: preLoad }
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="nameGroup" className="form-label">Nombre de grupo</label>
        <input type="text" id='nameGroup' value={inputNameGroup} className="form-control" onChange={(e) => setInputNameGroup(e.target.value)} />
        {errores.inputNameGroup && <p className="text-danger">{errores.inputNameGroup}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="maximunParticipants" className="form-label">Cupos</label>
        <input type="number" id='maxParticipants' value={inputMaximunParticipants} className="form-control" onChange={(e) => setInputMaximunParticipants(e.target.value)} />
        {errores.inputMaximunParticipants && <p className="text-danger">{errores.inputMaximunParticipants}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="place" className="form-label">Lugar</label>
        <input type="text" id='place' value={inputPlace} className="form-control" onChange={(e) => setInputPlace(e.target.value)} />
        {errores.inputPlace && <p className="text-danger">{errores.inputPlace}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="schedule" className="form-label">Horario</label>
        <input type="text" id='schedule' value={inputSchedule} className="form-control" onChange={(e) => setInputSchedule(e.target.value)} />
        {errores.inputSchedule && <p className="text-danger">{errores.inputSchedule}</p>}
      </div>
      <div className="modal-footer">
        <button style={{backgroundColor: "#61735A", color: 'white'}} type="button" className="btn  mr-6" data-bs-dismiss="modal">Cancelar</button>
        <button style={{backgroundColor: "#21413a", color: 'white'}} type="button" onClick={() => eventSave()} className="btn " >Guardar</button>
      </div>

    </form>
  )
}
export default FormEdit
