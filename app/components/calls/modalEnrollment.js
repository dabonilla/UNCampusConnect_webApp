'use client'
import axios from "axios";
import { useState } from 'react';
import * as bootstrap from 'bootstrap';
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
export default function ModalEnrollment({hideModal,idCall,data,reloadPage}) {
  const [loadingForm, setLoadingForm] = useState(false);
  const [modal, setModal] = useState(false);
  const changeLoading = ()=>{
    setLoadingForm(true)
  }
  const handleShowModal = () => {

    const myModal = new bootstrap.Modal(document.getElementById('modal'))
    myModal.show();
  };

  const enrollment= () =>{
    changeLoading()
    const queryEnrollment = `
    mutation{
      enrollmentCall(id: "${data[idCall].id}"){
        nameGroup
        participants
      }
    }
      `
      const token = localStorage.getItem('token');
      const config ={
        headers: { Authorization: `Bearer ${token}` }
      }
      async function enrollmentCall() {
        await axios.post(endpoint, { query: queryEnrollment },config)
                                      .then(response=>{
                                            handleShowModal()
                                            console.log(response)
                                            reloadPage()
                                            //hideModal2()
                                      })
                                      .catch(error =>{
                                      console.log(error)
                                      })
        }
        enrollmentCall()
        hideModal('modalEnrollment')
        
        
        
        


  }
  return (
    <div>
      <div className="modal fade" id='modalEnrollment' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Inscripción a una convocatoria</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <p>¿ Desea inscribirse a la convocatoria del  {data[idCall].nameGroup} ?</p>
          </div>
          {
        <div className="modal-footer">
          <button style={{backgroundColor: "#61735A", color: 'white'}} type="button" className="btn " data-bs-dismiss="modal">Cancelar</button>
          {loadingForm == true ? <div className="mb-3">
                                          <div className='d-flex justify-content-center'>
                                            <button className="btn btn-custom" type="button" disabled>
                                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                              </span>Cargando...
                                            </button>
                                          </div>
                                        </div>
                                :<button style={{backgroundColor: "#21413a", color: 'white'}} type="button" className="btn " onClick={enrollment}>Inscribir</button> }
        </div>
          }
        </div>
      </div>
    </div>
    <div className="modal fade" id='modal' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Inscripción a una convocatoria</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <p>Te has inscrito satisfactoriamente</p>
          </div>
          <div className="modal-footer">
          <button style={{backgroundColor: "#61735A", color: 'white'}} type="button" className="btn " data-bs-dismiss="modal">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}