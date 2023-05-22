'use client'
import axios from "axios";
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
export default function ModalDelete({ hideModal, idCall, data, reloadPage, nameModal }) {

  const confirmDelete = () => {
    console.log("idDelete: ",idCall)
    const queryDelete = `
    mutation{
      deleteCall(id: "${data[idCall].id}"){
        nameGroup
        id
      }
    }
      `
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    async function deleteCall() {
      await axios.post(endpoint, { query: queryDelete }, config)
        .then(response => {
          console.log("delete",response)
          reloadPage()
        })
        .catch(error => {
          console.log(error)
        })
      }
    deleteCall()
    hideModal('modalDelete')
    

  }
  return (
    <div className="modal fade" id='modalDelete' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar convocatoria</h1>

            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

            <p>¿Está seguro de eliminar esta convocatoria? {data[idCall].nameGroup} </p>
          </div>
           <div className="modal-footer">
              <button style={{backgroundColor: "#61735A", color: 'white'}} type="button" className="btn " data-bs-dismiss="modal">Cancelar</button>
              <button style={{backgroundColor: "#21413a", color: 'white'}} type="button" className="btn " onClick={confirmDelete}>Eliminar</button>
            </div>
        </div>
      </div>
    </div>
  )
}