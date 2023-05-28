
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import axios from "axios";

const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
export default function ModalBootCreate({show, reloadPage,setShow }) {
  const handleClose = () => {
    setShow(false)
  };
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
    handleClose()
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
              <button style={{backgroundColor: "#61735A", color: 'white'}} type="button" className="btn  m-6"onClick={handleClose}>Cancelar</button>
              <button style={{backgroundColor: "#21413a", color: 'white'}} type="submit" className="btn " >Aceptar</button>
      </form>

      </Modal.Body>
    </Modal>

  )
}