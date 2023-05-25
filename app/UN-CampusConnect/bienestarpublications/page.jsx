'use client'
import Link from 'next/link';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import styles from './Bienestar.module.css';
import moment from 'moment';
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`
import { Navigation } from './../../components/Navigation';

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
  
    const formatDate = (date) => {
      return moment(date).format('DD/MM/YYYY HH:mm');
    };

    return (
      <div>
        <div>
          <Navigation />
        </div>
        <div className="container">
          <div className='row'>
            <h1 className='text-center mt-3'>Publicaciones</h1>
          </div>

          <div className='row mt-2'>
            <div className='col-9'>
              <h3>Crea una nueva publicación aquí:</h3>
            </div>
            <div className='col-3 d-flex justify-content-end'>
              <Link class="nav-link" href='/UN-CampusConnect/bienestarpublications/create'as={`/UN-CampusConnect/bienestarpublications/create`}>
                <button type="button" className={`btn  ${styles.btncustom}`}>
                  Crear Publicación
                </button>
              </Link>
            </div>
          </div>

          <div className={`row mt-2`}>
            <div>
              {publicaciones.map(publicacion => (
                <article key={publicacion.publication_id} className={` ${styles.publicacion} rounded mt-2`}>
                  <Link class="nav-link" href='/UN-CampusConnect/bienestarpublications/[id]'as={`/UN-CampusConnect/bienestarpublications/${publicacion.publication_id}`}>
                    <h3 className={styles.title}>{publicacion.title}</h3>
                    <p className={styles.date}>{formatDate(publicacion.publication_date)}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

    );
  }
  

