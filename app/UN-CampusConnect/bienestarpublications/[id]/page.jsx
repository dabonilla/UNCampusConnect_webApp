'use client'
import Link from 'next/link';
import axios from "axios";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
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
  
    return (
        <div>
          <h1>Bienestar component</h1>
          <section>
            {publicaciones.map((publicacion) => (
              <article key={publicacion.publication_id}>
                <h2>{publicacion.title}</h2>
                <p>{publicacion.publication_date}</p>
                <p>{publicacion.content_publication}</p>
                <p>{username}</p>
                <img src={publicacion.image} alt={publicacion.title} />
              </article>
            ))}
          </section>
        </div>
      );
      
  }
  