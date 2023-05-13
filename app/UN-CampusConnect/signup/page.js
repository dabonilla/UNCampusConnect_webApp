'use client'
import { useForm } from "react-hook-form";
import React from "react";
import axios from "axios";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'


const endpoint = 'http://127.0.0.1:5000/graphql'


export default function Signup() {
  const [errorForm, setErrorForm] = useState('');
  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = data1 => {
    const createUser = `
      mutation {
        signup(user: {
          username: "${data1.username}",
          email: "${data1.email}",
          password: "${data1.password}",
          role: "${data1.role}"
        })
      }
    `;

    axios.post(endpoint, { query: createUser })
      .then(response => {
        console.log(response)
        if (response.data.hasOwnProperty('errors')){
          console.log("CORREO O USUARIO YA EXISTEN !!!")
          setErrorForm("true")
        }
        else{
          console.log("REGISTRO VALIDO, FALTA CONFIRMAR")
          setErrorForm("false")
          router.push('/UN-CampusConnect/confirmation')
        }
        //console.log(response.data.errors[0].code)
        
      })
      .catch(error => {
        console.log(error);
      });

  };

  
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
                        <span className="d-block signInTitle">Registro</span>
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
              <label htmlFor="username" className="form-label">Nombre de usuario</label>
              <input 
                type="text" 
                className="form-control" 
                name="username"
                id="username" 
                {...register("username",{ required: true })}
                aria-invalid={errors.username ? "true" : "false"}
              />
              {errors.password?.type ==='required' && <p class="text-danger" role="alert">Ingrese un nombre de usuario.</p>}
              
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                id="exampleFormControlInput1"
                  {...register("email", { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                  aria-invalid={errors.email ? "true" : "false"} />
                {errors.email?.type === 'pattern' && <p class="text-danger" role="alert">Ingrese una dirección de correo válido</p>}
                {errors.email?.type === 'required' && <p class="text-danger" role="alert">Ingrese una dirección de correo.</p>}
              </div>
              <div className="mb-3 ">
                <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword" 
                  {...register("password",{ required: true })} 
                  aria-invalid={errors.password ? "true" : "false"} />
                  {errors.password?.type ==='required' && <p class="text-danger" role="alert">Ingrese una contraseña.</p>}

              </div>
            <div className="mb-3">
            <label htmlFor="selectRole" className="form-label">Seleccione un rol</label>
              <select 
                className="form-select" 
                aria-label="Default select example"
                {...register("role")}
                >
                <option value="student">Estudiante</option>
                <option value="tutor">Tutor</option>
                
              </select>
            </div>
            {errorForm =="true" ? <p class="text-danger" >Nombre de usuario o Correo electrónico ya existen</p>:<p></p>}
            <div className="mb-3">
              <div className='d-flex justify-content-center'>

                <button type="submit" className="btn btn-dark mb-3"  >Aceptar</button>
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-center align-content-center">

          </div>
        </div>
      </div>

      </form>
    </div>
  )
}