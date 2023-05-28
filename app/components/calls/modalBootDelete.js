import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
export default function ModalBootDelete({show,idCall, data, reloadPage,setShow}) {
  const handleClose = () => {
    setShow(false)
  };
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
    handleClose()
    //hideModal('modalDelete')
    

  }

  return (<div>
        <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Eliminar convocatoria.</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              ¿Está seguro de eliminar esta convocatoria? {data[idCall].nameGroup} ?
              </Modal.Body>
              <Modal.Footer>
                <Button style={{ backgroundColor: "#61735A", color: 'white' }}  onClick={handleClose}>
                  Cancelar
                </Button>
                <Button style={{ backgroundColor: "#21413a", color: 'white' }} onClick={() => confirmDelete()} >Eliminar</Button>
              </Modal.Footer>
            </Modal>
  </div>)
}