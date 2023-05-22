'use client'

const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
export default function ModalViewParticipants({  idCall, data,   }) {


  return (
    <div className="modal fade" id='modalViewParticipants' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Lista de participantes</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Lista de participantes inscritos: {data[idCall].participants.map((p,index) => (<p key={index}>{p}</p>))}</p>
          </div>
          <div className="modal-footer">
            <button style={{ backgroundColor: "#61735A", color: 'white' }} type="button" className="btn " data-bs-dismiss="modal">Cerrar</button>
          </div>

        </div>
      </div>
    </div>
  )
}