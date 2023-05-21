'use client'

import axios from "axios";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import styles from './Bienestarid.module.css';
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`


export default function PublicacionesBienestarId({ params }) {
    const { id } = params;
    const [username, setUsername] = useState("");
    const [publicaciones, setPublicaciones] = useState([]); 
    useEffect(() => {
      const queryBienestarPublicationsId = `
        query {
          getpublicationid(id:"${id}"){
            publication_id
            title
            author_publication
            publication_date
            content_publication
            image
          }
        }
      `;
  
      axios.post(endpoint, { query: queryBienestarPublicationsId })
        .then((response) => {
            if (response.data.hasOwnProperty('errors')) {
            console.log("USUARIO NO ENCONTRADO O CONTRASEÑA INVALIDA !!!");
            setErrorForm("true");
            setLoadingForm(false);
            } else {
            const autor_publicacion = response.data.data.getpublicationid.author_publication;
            let data = response.data.data.getpublicationid;
            // Crear un array con un solo elemento que contenga el objeto

            const cookieValue = Cookies.get('myToken');
            const config ={
              headers: { Authorization: `Bearer ${cookieValue}` }
            }
            
            const querygetusername = `
            query {
              getUserInfo(
                  id: "${autor_publicacion}"
              ){
                  username
              }
            }
                `;
            axios.post(endpoint, { query: querygetusername }, config)
            .then((response) => {
              if (response.data.hasOwnProperty('errors')) {
                console.log("USUARIO NO ENCONTRADO O CONTRASEÑA INVALIDA !!!");
                setErrorForm("true");
                setLoadingForm(false);
              } else {
                console.log(response.data.data.getUserInfo.username);
                setUsername(response.data.data.getUserInfo.username);
                data.username = response.data.data.getUserInfo.username;
              }
            })
            .catch((error) => {
              console.log("Error:", error);
            });
                  
            const publicationArray = [data];
            console.log(data);
            setPublicaciones(publicationArray);      
            }           
        })
        .catch((error) => {
            console.log("Error:", error);

    // Aquí puedes manejar el error de acuerdo a tus necesidades
  });

    }, []); // Se ejecuta solo una vez al montar el componente
  
    const formatDate = (date) => {
      return moment(date).format('DD/MM/YYYY HH:mm');
    };

    return (
      <div className="container">
        <section>
          {publicaciones.map((publicacion) => (
            <article key={publicacion.publication_id}>
              <div className="row">
                <h1 className="text-center mt-3">{publicacion.title}</h1>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <h3>Autor: {username}</h3>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <h3>Fecha: {formatDate(publicacion.publication_date)}</h3>
                </div>
              </div>
              <div className={styles['image-container']}>
                <img src={publicacion.image} alt={publicacion.title} className="img-fluid" />
              </div>
              <h4 className={`mt-4  ${styles['break-word']}`}>{publicacion.content_publication} </h4>
            </article>
          ))}
        </section>
      </div>
    );
      
  }
  