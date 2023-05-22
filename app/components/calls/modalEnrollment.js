'use client'
import axios from "axios";
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
export default function ModalEnrollment({hideModal,idCall,data,reloadPage}) {

  const enrollment= () =>{
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
                                            console.log(response)
                                      })
                                      .catch(error =>{
                                      console.log(error)
                                      })
        }
        enrollmentCall()
        reloadPage()
        hideModal('modalEnrollment')

  }
  return (
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
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" className="btn btn-primary" onClick={enrollment}>Inscribir</button>
        </div>
          }
        </div>
      </div>
    </div>
  )
}