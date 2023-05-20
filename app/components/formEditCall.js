'use client'
import { useForm } from "react-hook-form";
import React, { useState,useEffect} from 'react';
import axios from "axios";
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
const FormEdit = ({ data, idCall, hideModal, reloadPage }) => {
  const [inputValue2, setInputValue2] = useState(data[idCall].nameGroup);
  const [inputValue3, setInputValue3] = useState(data[idCall].maximunParticipants);
  const [inputValue4, setInputValue4] = useState(data[idCall].place);
  const [inputValue5, setInputValue5] = useState(data[idCall].schedule);
  const preloaded ={
    nameGroup:data[idCall].nameGroup}
  const [preLoad, setPreLoad] = useState(preloaded);
  
  const onSubmit = data1 =>{ 
    hideModal()
    console.log(data1);
  }
  
  const handleChange = (event) => {
    let idInput = event.target.id
    if (idInput == 'nameGroup'){
      setInputValue2(event.target.value);
    }
    else if (idInput == 'maxParticipants') {
      setInputValue3(event.target.value);
    }
    else if (idInput == 'place'){
      setInputValue4(event.target.value);
    }
    else if (idInput == 'schedule')
    setInputValue5(event.target.value);
  };

  const eventSave= () =>{
    var input = document.getElementById("nameGroup");
    var input2 = document.getElementById("maxParticipants");
    var input3 = document.getElementById("place");
    var input4 = document.getElementById("schedule");
    
    const queryUpdate = `
    mutation{
      updateCall(Call:{
        maximunParticipants: ${input2.value}
        nameGroup: "${input.value}"
        place: "${input3.value}"
        schedule: "${input4.value}"
        deadline: "${data[idCall].deadline}"
        status: "Abierta"
        participants: []
      },id: "${data[idCall].id}"){
        nameGroup
      }
    }
    `
    const token = localStorage.getItem('token');
    const config ={
      headers: { Authorization: `Bearer ${token}` }
    } 
    async function updateCall() {
      const response = await axios.post(endpoint, { query: queryUpdate },config)
      console.log("update")
      console.log(response)
    }
    updateCall()
    reloadPage()
    hideModal()

  }
  
  useEffect(() => {
    setInputValue2(data[idCall].nameGroup)
    setInputValue3(data[idCall].maximunParticipants)
    setInputValue4(data[idCall].place)
    setInputValue5(data[idCall].schedule)
    
  }, [idCall,data])
  
  const { register, formState: { errors }, handleSubmit } = useForm(
    {defaultValues:preLoad}
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="nameGroup" className="form-label">Nombre de grupo</label>
        <input type="text" id='nameGroup' value={inputValue2} className="form-control" onChange={handleChange} />
        </div>

      <div className="mb-3">
        <label htmlFor="maximunParticipants" className="form-label">Cupos</label>
        <input type="number" id='maxParticipants' value={inputValue3} className="form-control" onChange={handleChange} />
        </div>

      <div className="mb-3">
        <label htmlFor="place" className="form-label">Lugar</label>
        <input type="text" id='place' value={inputValue4} className="form-control" onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="schedule" className="form-label">Horario</label>
        <input type="text" id='schedule' value={inputValue5} className="form-control" onChange={handleChange} />
        </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary mr-6" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
        <button type="button" onClick={()=>eventSave()} className="btn btn-primary" >save</button>
      </div>
      
    </form>
  )
}
export default FormEdit
