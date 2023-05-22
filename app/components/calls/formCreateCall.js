'use client'
import { useForm } from "react-hook-form";
import React from 'react';
import axios from "axios";
import { useState } from 'react';

const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
export default function FormCreateCall( {hideModalCreate, reloadPage}) {
  const [errorForm, setErrorForm] = useState('');
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = data => {
    const queryCreate = `
    mutation{
      addCall(Call:{
        maximunParticipants: ${data.maxParticipants},
        nameGroup: "${data.groupName}",
        place: "${data.place}",
        schedule: "${data.schedule}",
        deadline: "0/00/2023",
        participants: [],
        status: "Abierta"
      }){
        nameGroup
      }
    }
    `
    const token = localStorage.getItem('token');
      const config ={
        headers: { Authorization: `Bearer ${token}` }
      } 
      async function createCall() {
        await axios.post(endpoint, { query: queryCreate },config)
                                    .then(response=>{
                                      console.log("create",response)
                                      reloadPage()
                                    })
                                    .catch(error =>{
                                      console.log(error)
                                    })
      }
      createCall()
      
    hideModalCreate('formCreate')
  };
  return (
    <div className="modal fade" id='formCreate' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Crear convocatoria</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="groupName" className="form-label">Nombre de grupo</label>
                <input
                  type="text"
                  className="form-control"
                  name="groupName"
                  id="groupName"
                  {...register("groupName", { required: true })}
                  aria-invalid={errors.groupName ? "true" : "false"}
                />
                {errors.groupName?.type === 'required' && <p className="text-danger" role="alert">El nombre del grupo es obligatorio</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="maxParticipants" className="form-label">Número de cupos</label>
                <input
                  type="number"
                  className="form-control"
                  name="maxParticipants"
                  id="maxParticipants"
                  {...register("maxParticipants", { required: true })}
                  aria-invalid={errors.maxParticipants ? "true" : "false"}
                />
                {errors.maxParticipants?.type === 'required' && <p className="text-danger" role="alert">El número de cupos es obligatorio</p>}

              </div>

              <div className="mb-3">
                <label htmlFor="place" className="form-label">Lugar</label>
                <input
                  type="text"
                  className="form-control"
                  name="place"
                  id="place"
                  {...register("place", { required: true })}
                  aria-invalid={errors.place ? "true" : "false"}
                />
                {errors.place?.type === 'required' && <p className="text-danger" role="alert">El lugar es obligatorio</p>}

              </div>

              <div className="mb-3">
                <label htmlFor="schedule" className="form-label">Horario</label>
                <input
                  type="text"
                  className="form-control"
                  name="schedule"
                  id="schedule"
                  {...register("schedule", { required: true })}
                  aria-invalid={errors.schedule ? "true" : "false"}
                />
                {errors.schedule?.type === 'required' && <p className="text-danger" role="alert">El horario es obligatorio</p>}

              </div>
              <button style={{backgroundColor: "#61735A", color: 'white'}} type="button" className="btn  m-6" data-bs-dismiss="modal">Cancelar</button>
              <button style={{backgroundColor: "#21413a", color: 'white'}} type="submit" className="btn " >Aceptar</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}