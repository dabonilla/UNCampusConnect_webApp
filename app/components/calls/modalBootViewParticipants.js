import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`

export default function ModalBootViewParticipants({show,  idCall, data,setShow }) {
  const handleClose = () => {
    setShow(false)
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Lista de participantes.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Lista de participantes inscritos: {data[idCall].participants.map((p,index) => (<p key={index}>{p}</p>))}
      </Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor: "#61735A", color: 'white'}}  onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}