'use client'
import { useForm } from "react-hook-form";
import React from "react";
import axios from "axios";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`

export default function Confirmation() {
  const [errorForm, setErrorForm] = useState('');
  const [loadingForm, setLoadingForm] = useState(false);
  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm();
const changeLoading = ()=>{
    setLoadingForm(true)
  }
  const onSubmit = data1 => {
    changeLoading()
    const confirmEmail = `
    mutation {
      confirmEmail(token: "${data1.token}")
    }
    `
    axios.post(endpoint, { query: confirmEmail })
      .then(response => {
        console.log(response)
        if (response.data.hasOwnProperty('errors')) {
          console.log("TOKEN NO VALIDO !!!")
          setErrorForm("true")
          setLoadingForm(false)
        }
        else {
          console.log("Token valido")
          setErrorForm("false")
          router.push('/UN-CampusConnect/signin')
        }

      })
      .catch(error => {
        console.log(error);
      });
      changeLoading()

  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex align-content-center justify-content-center vh-100">
          <div className="card my-auto">
            <div className="card-header">
              <div className="row">
                <div className="col-4">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="col-8">
                  <div className="d-flex justify-content-end align-content-center">
                    <div>
                      <div className="d-flex justify-content-end">
                        <b>
                          <span className="d-block signInTitle">Confirmación correo</span>
                        </b>
                      </div>
                      <div className="d-flex justify-content-end">
                        <span className="d-block qplTitle fw-lighter">UN-CampusConnect</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="token" className="form-label">Ingresa el token que hemos enviado a tu correo.</label>
                <input
                  type="text"
                  className="form-control"
                  name="token"
                  id="token"
                  
                  {...register("token", { required: true })}
                  aria-invalid={errors.token ? "true" : "false"}
                />
                {errors.token?.type === 'required' && <p role="alert">Ingresa el token.</p>}
              </div>
              {errorForm == "true" ? <p className="text-danger">El Token ha expirado o es inválido.</p> : <p></p>}
              {loadingForm == true ?<div className="mb-3">
                                          <div className='d-flex justify-content-center'>
                                            <button className="btn btn-dark" type="button" disabled>
                                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                              </span>Cargando...
                                            </button>
                                          </div>
                                        </div>
                                      :<div className="mb-3">
                                        <div className='d-flex justify-content-center'>
                                          <button type="submit" className="btn btn-dark mb-3">Aceptar
                                          </button>
                                        </div>
                                      </div>}
              
            </div>

            <div className="card-footer d-flex justify-content-center align-content-center">

            </div>
          </div>
        </div>

      </form>
    </div>
  )
}