'use client'
import Link from 'next/link';
import axios from "axios";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
const endpoint = 'http://127.0.0.1:5000/graphql'
export default function Signin() {
  const [errorForm, setErrorForm] = useState('');
  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const queryRole = `
    query{
      getMyInfo {
        role
      },
    }
  `
  const onSubmit = data1 =>{
    const queryUser = `
    query{
    signin( user: {
        email: "${data1.email}",
        password: "${data1.password}"
    })
    }
    `
    axios.post(endpoint, { query: queryUser })
      .then(response => {
        if (response.data.hasOwnProperty('errors')){
          console.log("USUARIO NO ENCONTRADO O CONTRASEÑA INVALIDA !!!")
          setErrorForm("true")
        }
        else{
          console.log("login VALIDO")
          setErrorForm("false")
          const token = response.data.data.signin
          localStorage.setItem('token', token);
          const config ={
            headers: { Authorization: `Bearer ${token}` }
          }
          axios.post(endpoint,{query: queryRole},config)
            .then(response =>{
              const role = response.data.data.getMyInfo.role
              if (role == "admin"){
                router.push('/UN-CampusConnect/admin')
              }
              else if (role == "student"){
                router.push('/UN-CampusConnect/student')
              }
            })
            .catch(error=>{
              console.log(error)
            })
        }
      })
      .catch(error => {
        console.log(error);
      });
  } 
  return (
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
                        <span className="d-block signInTitle">Login</span>
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
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input 
                className="form-control" 
                id="exampleFormControlInput1"
                {...register("email",{required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/})}
                aria-invalid={errors.email ? "true" : "false"} />
                {errors.email?.type ==='pattern' && <p class="text-danger" role="alert">Ingrese una dirección de correo válido</p>}
                {errors.email?.type ==='required' && <p class="text-danger" role="alert">Ingrese una dirección de correo.</p>}
            </div>
            <div className="mb-3 ">
              <label htmlFor="inputPassword" className="form-label">Contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                id="exampleFormControlInput2" 
                {...register("password",{ required: true })} 
                aria-invalid={errors.password ? "true" : "false"} />
                {errors.password?.type ==='required' && <p class="text-danger" role="alert" >Ingrese una contraseña. </p> }
            </div>
            
            <div className="mb-3">

            </div>
            {errorForm =="true" ? <p class="text-danger" >Credenciales invalidas</p>:<p></p>}

            <div className="mb-3">
              <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-dark mb-3">Aceptar</button>
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-center align-content-center">
            <p >¿Aún no tienes una cuenta?  </p>
            <Link href="/UN-CampusConnect/signup"> registrate !</Link>
          </div>
        </div>
      </div>

    </form>


  )
}