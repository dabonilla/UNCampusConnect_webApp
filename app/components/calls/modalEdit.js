'use client'
import React from 'react';
import dynamic from 'next/dynamic';
//import FormEdit from 'app/components/calls/formEditCall'

const FormEdit = dynamic(() => import('app/components/calls/formEditCall'), { ssr: false });

const ModalEdit = ({id,hideModal,setCalls,data,idCall,reloadPage}) => {
  return (

    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Editar convocatoria</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          
        <FormEdit  reloadPage ={reloadPage}  data ={data} idCall={idCall} hideModal ={hideModal} />
        </div>
        {/*
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" className="btn btn-primary" onClick={hideModal}>Guardar</button>
        </div>*/
        }
      </div>
    </div>
  </div>
    
  )
}

export default ModalEdit