'use client'
import Link from 'next/link';
import axios from "axios";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
import { Navigation } from './../../components/Navigation';
export default function Signin() {
  const [errorForm, setErrorForm] = useState('');
  const [loadingForm, setLoadingForm] = useState(false);
  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const queryRole = `
    query{
      getMyInfo {
        role
      },
    }
  `

  const changeLoading = ()=>{
    setLoadingForm(true)
  }
  /*
  const changeLoadingFalse = ()=>{
    setLoadingForm(false)
  }*/
  const onSubmit = data1 =>{
    changeLoading()
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
          setLoadingForm(false)
        }
        else{
          console.log("login VALIDO")
          setErrorForm("false")
          const token = response.data.data.signin
          Cookies.set('myToken', token);
          localStorage.setItem('token', token);

          const config ={
            headers: { Authorization: `Bearer ${token}` }
          }
          axios.post(endpoint,{query: queryRole},config)
            .then(response =>{
              const role = response.data.data.getMyInfo.role
              if (role == "admin"){
                router.push('/UN-CampusConnect/bienestarpublications')
              }
              else if (role == "student"){
                router.push('/UN-CampusConnect/bienestarpublications')
              }
              else if (role == "tutor"){
                router.push('/UN-CampusConnect/bienestarpublications')
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
      changeLoading()
} 
    return (
      <div>
        <div>
          <Navigation />
        </div>
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
                      {errors.email?.type ==='pattern' && <p className="text-danger" role="alert">Ingrese una dirección de correo válido</p>}
                      {errors.email?.type ==='required' && <p className="text-danger" role="alert">Ingrese una dirección de correo.</p>}
                  </div>
                  <div className="mb-3 ">
                    <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="exampleFormControlInput2" 
                      {...register("password",{ required: true })} 
                      aria-invalid={errors.password ? "true" : "false"} />
                      {errors.password?.type ==='required' && <p className="text-danger" role="alert" >Ingrese una contraseña. </p> }
                  </div>
                  
                  <div className="mb-3">
      
                  </div>
                  {errorForm =="true" ? <p className="text-danger" >Credenciales invalidas</p>:<p></p>}
                  {loadingForm == true ?<div className="mb-3">
                                            <div className='d-flex justify-content-center'>
                                              <button className="btn btn-custom" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                                </span>Cargando...
                                              </button>
                                            </div>
                                          </div>
                                        :<div className="mb-3">
                                          <div className='d-flex justify-content-center'>
                                            <button style={{backgroundColor: "#21413a", color: 'white'}}  type="submit" className="btn btn-dark mb-3">Aceptar
                                            </button>
                                          </div>
                                        </div>}
                </div>
      
                <div className="card-footer d-flex justify-content-center align-content-center">
                  <p >¿Aún no tienes una cuenta?  </p>
                  <Link href="/UN-CampusConnect/signup"> registrate !</Link>
                </div>
              </div>
            </div>
      
          </form>
        </div>
      </div>
      )
}