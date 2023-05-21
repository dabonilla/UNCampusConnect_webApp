'use client'
import Link from 'next/link';
import axios from "axios";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import styles from './Create.module.css'
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`


export default function CreatePublicacion ()  {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [loadingForm, setLoadingForm] = useState(false);
  const router = useRouter();
  console.log("TEST");

      
  const cookieValue = Cookies.get('myToken');
  const config ={
    headers: { Authorization: `Bearer ${cookieValue}` }
  }
  
  let author_id = "";
  
  const queryInfo = `
    query{
      getMyInfo {
        id
      },
    }
  `
  axios.post(endpoint, { query: queryInfo }, config)
  .then((response) => {
      if (response.data.hasOwnProperty('errors')) {
      console.log("USUARIO NO ENCONTRADO O CONTRASEÑA INVALIDA !!!");
      setErrorForm("true");
      setLoadingForm(false);
      } else {
      author_id = response.data.data.getMyInfo.id;
      }
  })
  .catch((error) => {
      console.log("Error:", error);
// Aquí puedes manejar el error de acuerdo a tus necesidades
});
  console.log(author_id);





  const onSubmit = async (data) => {
    const fecha = new Date();
    const fechaISO = fecha.toISOString();
    console.log(fechaISO);
    data.date = fechaISO;
    console.log(data);

    const queryCreatePublication = `
    mutation {
      createPublication(publication: {
        title: "${data.title}",
        content_publication: "${data.content}",
        publication_date: "${data.date}",
        image: "${data.image}"
      }) {
        message
          }
        }
        `;

    axios.post(endpoint, { query: queryCreatePublication }, config)
    .then((response) => {
        if (response.data.hasOwnProperty('errors')) {
          console.log("Error:", response.data.errors);
          setErrorForm("true");
          setLoadingForm(false);
        } else {
          router.push('/UN-CampusConnect/bienestarpublications')
          console.log("Datos recibidos:");
          console.log("Test1:", response.data.data.createPublication);
        }
    })
    .catch((error) => {
        console.log("Error:", error);
  // Aquí puedes manejar el error de acuerdo a tus necesidades
  });













  };

  return (
    <div className='container'>
      <div className='row'>
          <h1 className='text-center mt-3'>Crear Publicacion</h1>
        </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 mt-4">
        <h2 className="form-label">Titulo</h2>
        <input
          className="form-control form-control-lg"
          type="text"
          {...register("title", {
            required: "Este campo es requerido",
            maxLength: { value: 50, message: "Debe tener menos de 50 caracteres" }
          })}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
        <div className="mb-3 mt-4">
          <h2 className="form-label">Contenido</h2>
          <textarea className="form-control form-control-lg" {...register("content", { required: true })}></textarea>
          {errors.content && <span>This field is required</span>}
        </div>
        <div className="mb-3 mt-4">
          <h2 className="form-label">Imagen</h2>
          <input
            className="form-control form-control-lg"
            type="text"
            {...register("image", {
              required: "Este campo es requerido",
              maxLength: { value: 100, message: "Debe tener menos de 100 caracteres" }
            })}
          />
          {errors.image && <span>{errors.image.message}</span>}
        </div>
        <div className="d-grid gap-2 mt-5">
          <button className={`btn btn-primary btn-lg  ${styles.btncustom}`}type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
};


