'use client'
import Link from 'next/link';
import axios from "axios";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`

export default function PublicacionesBienestar() {
    const [publicaciones, setPublicaciones] = useState([]);
  
    useEffect(() => {
      const queryBienestar = `
        query {
          getpublications{
            publication_id
            title
            publication_date
          }
        }
      `;
  
      axios.post(endpoint, { query: queryBienestar })
        .then(response => {
          if (response.data.hasOwnProperty('errors')) {
            console.log("USUARIO NO ENCONTRADO O CONTRASEÑA INVALIDA !!!");
            setErrorForm("true");
            setLoadingForm(false);
          } else {
            console.log("Datos recibidos:");
            console.log("Test1:", response.data.data.getpublications);
            setPublicaciones(response.data.data.getpublications);
          }
        })
        .catch(error => {
          console.log("Error:", error);
          // Aquí puedes manejar el error de acuerdo a tus necesidades
        });
    }, []); // Se ejecuta solo una vez al montar el componente
  
    return (
      <div>
        <h1>Bienestar component</h1>
        <section>
          {publicaciones.map(publicacion => (
            <article key={publicacion.publication_id}>
              <Link href='/UN-CampusConnect/bienestarpublications/[id]'as={`/UN-CampusConnect/bienestarpublications/${publicacion.publication_id}`}>
                <h2>{publicacion.title}</h2>
                <p>{publicacion.publication_date}</p>
              </Link>
            </article>
          ))}
        </section>
      </div>
    );
  }
  

