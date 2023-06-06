'use client'
import Link from 'next/link';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Navigation } from './../../components/Navigation';
import Image from 'next/image';
import styles from './homepage.module.css';

const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`

export default function HomeStudent(){

    const [publicaciones, setPublicaciones] = useState([]);
  
    useEffect(() => {
        const queryexterno = `
        query 
        {
            getExternalUsers {
                numUsers
            }
        }
      `;
    
        axios.post(endpoint, { query: queryexterno })
          .then(response => {
            if (response.data.hasOwnProperty('errors')) {
              console.log("USUARIO NO ENCONTRADO O CONTRASEÑA INVALIDA !!!");
            } else {
              console.log("Datos recibidos:");
              console.log("Test1:", response.data.data.getExternalUsers.numUsers);
              setPublicaciones(response.data.data.getExternalUsers.numUsers);
            }
          })
          .catch(error => {
            console.log("Error:", error);
            // Aquí puedes manejar el error de acuerdo a tus necesidades
          });
      }, []); // Se ejecuta solo una vez al montar el componente
    
    return(
        <div>
            <div className='fixed-top'>
                <Navigation />
            </div>
            <div className="container mt-4  ">
                <div className={` ${styles.padre} row`}>
                    <div className={` ${styles.titulo} col-6 d-flex align-items-center justify-content-center`}>
                       <h1 className="mb-4 mt-3">Bienvenido a <br /><span>UN Campus Connect</span></h1>
                    </div>
                    <div className='col-6 d-flex align-items-center justify-content-center'>
                        <Image
                            src="/Captura4-removebg-preview.png"
                            width={450}
                            height={450}
                            alt="Logo UnCampusConnect"
                            />
                    </div>  
                </div>
            </div>
            <div className="container">
                <div className={` ${styles.padre} row `}>
                    <div className='col-6 d-flex align-items-center justify-content-center'>
                        <Image
                            src="/table.png"
                            width={450}
                            height={450}
                            alt="Logo UnCampusConnect"
                            />
                    </div>  
                    <div className={`col-6 d-flex flex-column`}>
                       <h1 className="mb-4 mt-4">Aquí encontrarás</h1>
                       <p> Una plataforma para integrantes de la comunidad UNAL, que facilita el acceso a servicios relacionados con la vida universitaria en dos modalidades principales, la primera en función de la vida académica y la segunda enfocada en el bienestar.</p>
                        <div className={`d-flex flex-row row ${styles.titulointro} `}>
                            <div className='col-3 d-flex align-items-center justify-content-center'> 
                                <h5 className="mb-4 mt-3 text-center">Tutorías:</h5>
                            </div>
                            <div className='col-9'>
                                <p> Podrás ver información educativa relacionada con una asignatura.</p>
                            </div>
                        </div>
                        <div className='d-flex flex-row row'>
                            <div className='col-3 d-flex align-items-center justify-content-center text-center'>
                                <h5 className="mb-4 mt-3  ">Grupos deportivos:</h5>
                            </div>
                            <div className='col-9'>
                                <p> Dirigido a aquellos estudiantes que buscan participar en los diferentes grupos deportivos, artísticos o culturales que se encuentran en la universidad.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4  ">
                <div className={` ${styles.padre} row`}>
                    <div className={` ${styles.titulo1} col-6 d-flex flex-column`}>
                        <h1 className="mb-4 mt-4">Si no encuentras lo que buscabas</h1>
                        <p> Te recomendamos visitar TutoAcademy. TutoAcademy es una plataforma en línea que ofrece una amplia variedad de cursos y tutoriales en diversos temas. Con muchos de usuarios satisfechos, TutoAcademy puede ser una excelente opción para expandir tus conocimientos. ¡Visita su página web para descubrir todo lo que tienen para ofrecer!</p>
                            <div className={`d-flex flex-row row ${styles.titulointro} `}>
                                <div className='col-6 d-flex align-items-center justify-content-center'> 
                                    <h5 className="mb-4 mt-3 text-center">Numero de Usuarios:</h5>
                                </div>
                                <div className='col-6 d-flex align-items-center justify-content-center'>
                                    <h5> {publicaciones}</h5>
                                </div>
                            </div>
                    </div>
                    <div className='col-6 d-flex align-items-center justify-content-center'>
                        <Image
                            src="/NoBackgroundLogo.png"
                            width={450}
                            height={450}
                            alt="Logo UnCampusConnect"
                            />
                    </div>  
                </div>
            </div>
        </div>
    )
}