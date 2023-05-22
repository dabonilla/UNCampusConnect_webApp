'use client'
import axios from "axios";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRef, useState } from 'react';
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`

export default function Tutor() {
  const cookieValue = Cookies.get('myToken');
  const config = {
    headers: { Authorization: `Bearer ${cookieValue}` }
  }
  const username = Cookies.get('username');
  const email = Cookies.get('email');
  const [tutorProfile, setTutorProfile] = useState({});
  let id = '';
  const queryId = `
    query{
      getMyInfo {
        id
      }
    }
  `
  axios.post(endpoint, { query: queryId }, config)
    .then((response) => {
      if (response.data.hasOwnProperty('errors')) {
        console.log("No user found");
      } else {
        id = response.data.data.getMyInfo.id;
        console.log(id);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  const onSubmit = (data) => {
    const queryInfo = `
    query{
      getTutorProfile (id: "${id}") {
        name
        last_name
        birth_place
        birthdate
        address
        email
        phone
        description
        photo
        skills {
          id
          name}
        tutor_languages {
          language_id
          level}
        tutor_jobs {
          job_id
          position
          start_year
          end_year}
        tutor_schools {
          school_id
          start_year
          end_year
          title}
      }
    }
  `;
    axios.post(endpoint, { query: queryInfo })
      .then((response) => {
        if (response.data.hasOwnProperty('errors')) {
          console.log("Couldn't create profile");
        } else {
          setTutorProfile(response.data.data.getTutorProfile);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleShowForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
    setShowProfile(false);
  };
  const handleShowProfile = () => {
    setShowProfile((prevShowProfile) => !prevShowProfile);
    setShowForm(false);
  };
  function Sidebar() {
    const icon = useRef(null);
    const menu = useRef(null);
    const showMenu = (flag) => {
      if (flag) {
        icon.current.classList.toggle("rotate-180");
        menu.current.classList.toggle("hidden");
      }
    };
    return (
      <div style={{ minHeight: typeof window !== 'undefined' ? window.innerHeight : 768 }} className={`rounded-r ease-in-out transition duration-500 flex justify-start items-starts sm:w-64 bg-sidebar flex-col ${showForm ? '' : ''}`}>
        <div className="flex justify-start p-6 items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="40.000000pt" height="40.000000pt" viewBox="0 0 40.000000 40.000000" preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,40.000000) scale(0.015625,-0.015625)" fill="white" stroke="none">
              <path d="M782 2361 c-260 -65 -478 -123 -484 -129 -9 -9 -9 -15 2 -26 8 -7 232 -67 497 -132 l483 -118 282 69 c156 37 287 72 292 76 6 5 6 9 2 9 -21 0 -573 71 -588 76 -29 9 -33 56 -5 67 7 2 195 -19 418 -47 l405 -50 82 19 c89 20 115 37 91 59 -14 13 -961 247 -989 245 -8 -1 -228 -54 -488 -118z" />
              <path d="M2083 2077 l-43 -10 0 -119 c0 -66 5 -128 10 -139 12 -22 59 -26 78 -7 13 13 18 289 5 287 -5 -1 -27 -6 -50 -12z" />
              <path d="M760 1881 l0 -118 58 -26 c114 -51 270 -77 462 -77 192 0 348 26 463 77 l57 26 0 118 c0 94 -3 119 -14 119 -7 0 -124 -27 -259 -60 l-245 -60 -247 60 c-135 33 -252 60 -260 60 -12 0 -15 -21 -15 -119z" />
              <path d="M664 1689 c-56 -21 -179 -93 -179 -104 0 -4 24 -14 54 -21 130 -34 268 -111 384 -214 97 -87 221 -259 294 -407 24 -50 27 -53 63 -53 37 0 39 1 79 80 151 296 363 496 608 575 48 15 95 30 103 32 12 4 11 7 -5 19 -39 29 -107 67 -163 90 l-56 22 -55 -27 c-133 -67 -281 -94 -511 -94 -229 0 -378 27 -510 93 l-55 28 -51 -19z" />
              <path d="M80 1655 c0 -33 57 -131 108 -186 47 -52 73 -68 225 -143 267 -130 483 -284 627 -445 35 -39 67 -71 70 -71 3 0 18 12 34 26 l29 26 -29 61 c-73 155 -210 331 -326 420 -105 80 -200 124 -351 162 -151 38 -220 66 -306 124 -64 44 -81 49 -81 26z" />
              <path d="M2405 1633 c-78 -55 -169 -93 -312 -129 -152 -38 -246 -81 -351 -161 -116 -89 -242 -250 -323 -415 l-32 -66 29 -26 c16 -14 31 -26 34 -26 3 0 35 32 70 71 144 161 360 315 627 445 152 75 178 91 225 143 30 32 66 84 81 115 46 96 34 108 -48 49z" />
              <path d="M266 1253 c-51 -158 -71 -406 -43 -539 43 -201 170 -357 379 -469 221 -117 555 -182 803 -156 527 57 859 281 932 629 19 93 13 320 -12 422 -23 97 -45 160 -56 160 -11 0 -206 -93 -228 -108 -12 -9 -10 -16 13 -46 50 -66 70 -124 70 -206 1 -66 -4 -85 -32 -142 -72 -147 -224 -222 -373 -184 -72 19 -128 52 -177 105 -42 45 -53 34 -57 -56 -4 -84 -41 -214 -103 -358 -39 -91 -52 -111 -74 -119 -58 -20 -79 -1 -130 119 -63 147 -100 275 -103 358 -3 90 -15 101 -57 56 -49 -53 -105 -86 -177 -105 -149 -38 -301 37 -373 184 -28 57 -33 76 -32 142 0 82 20 140 70 206 23 30 25 37 13 46 -22 15 -217 108 -228 108 -5 0 -16 -21 -25 -47z" />
              <path d="M564 1103 c-38 -50 -53 -97 -54 -169 -1 -218 261 -336 426 -191 68 60 72 73 33 113 -38 39 -45 41 -54 15 -10 -32 -67 -81 -107 -92 -80 -21 -173 33 -198 117 -16 54 1 114 45 158 l34 34 -39 26 c-22 14 -44 26 -49 26 -5 0 -21 -16 -37 -37z" />
              <path d="M1908 1113 l-37 -25 34 -34 c44 -44 61 -104 45 -158 -25 -84 -118 -138 -199 -116 -37 10 -101 67 -113 101 -4 10 -15 5 -42 -20 -20 -19 -36 -39 -36 -45 0 -22 106 -112 146 -124 178 -53 344 65 343 243 0 33 -6 76 -13 96 -15 43 -64 109 -80 108 -6 0 -28 -12 -48 -26z" />
              <path d="M725 1018 c-32 -19 -44 -40 -45 -81 0 -82 91 -117 151 -58 42 42 38 71 -15 115 -48 39 -60 42 -91 24z" />
              <path d="M1742 992 c-51 -44 -54 -72 -13 -113 60 -59 151 -24 151 58 -1 42 -13 63 -47 81 -33 18 -44 15 -91 -26z" />
              <path d="M1209 793 c-84 -52 -78 -164 19 -415 24 -65 48 -118 52 -118 11 0 86 197 110 286 35 136 23 210 -40 248 -36 20 -107 20 -141 -1z" />
            </g>
          </svg>
          <p className="text-2xl leading-6 mb-0 text-white">Campus Connect</p>
        </div>
        <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full">
          <button onClick={() => showMenu(true)} className="focus:outline-none focus:text-indigo-400 text-left  text-white flex justify-between items-center w-full  mb-3">
            <p className="text-sm leading-5 mb-0 uppercase">Opciones de perfil</p>
            <svg ref={icon} className="transform" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div ref={menu} className="flex justify-start  flex-col w-full md:w-auto items-start pb-4 ">
            <button onClick={handleShowForm} className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p className="text-base leading-4 mb-0 ">Crear</p>
            </button>
            <button onClick={() => { handleShowProfile(); onSubmit(); }} className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-base leading-4 mb-0 ">Perfil</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-end items-center h-full pb-6 px-6 w-full">
          <div className=" flex justify-between items-center w-full">
            <div className="flex justify-center items-center  space-x-2">
              <div>
                <Image
                  src={ tutorProfile.photo ? tutorProfile.photo : '/photo.png'}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                  quality={100}
                />
              </div>
              <div className="flex justify-center flex-col items-center">
                <p className="text-sm leading-5 mb-0 text-white">{username ? username : 'Usuario'}</p>
                <p className="text-xs leading-3 mb-0 text-gray-300" >{email ? email : '@unal.edu.co'}</p>
              </div>
            </div>
            <svg style={{ cursor: 'pointer' }} className="h-6 w-6 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
          </div>
        </div>
      </div>
    );

  }

  function Form() {
    const [errorForm, setErrorForm] = useState('');
    const [loadingForm, setLoadingForm] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const changeLoading = () => {
      setLoadingForm(true);
    };
    const onSubmit = (data) => {
      changeLoading();
      const createTutorProfile = `
        mutation {
          createTutorProfile(tutor: {
            name: "${data.name}", 
            last_name: "${data.last_name}",
            birth_place: "${data.birth_place}", 
            birthdate: "${data.birthdate}", 
            address: "${data.address}", 
            email: "${data.email}", 
            phone: "${data.phone}", 
            description: "${data.description}", 
            photo: "${data.photo}", 
            skills_attributes: [{name: "Bailar"}, {name: "Correr"}], 
            languages_attributes: [{name: "Inglés", level: "C1"}, {name: "Coreano", level: "B1"}], 
            schools_attributes: [{name: "Colboy" start_year: "2002-02-02" end_year: "2003-02-02" title: "Ingeniero"}, {name: "UNAL" start_year: "2002-02-02" end_year: "2003-02-02" title: "Técnico"}], 
            jobs_attributes: [{name: "IBM" position: "contador" start_year: "2022-01-01" end_year: "2023-01-01"}, {name: "Google" position: "Operador" start_year: "2022-01-01" end_year: "2023-01-01"}]}) 
        }
      `;
      axios.post(endpoint, { query: createTutorProfile }, config)
        .then(response => {
          console.log(response);
          if (response.data.hasOwnProperty('errors')) {
            console.log("Perfil ya existe");
            setErrorForm("true");
            setLoadingForm(false);
          }
          else {
            console.log("Perfil creado");
            setErrorForm("false");
          }
        })
        .catch(error => {
          console.log(error);
        });
      changeLoading();
    };
    return (
      <div style={{ margin: '15px 0' }} className="bg-white rounded flex items-center justify-center shadow-lg p-2 px-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-span-2" >
            <div className="text-gray-600" style={{ display: 'flex', justifyContent: 'center' }}>
              <p className="font-medium text-lg">Datos Personales</p>
            </div>
            <div className="grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2">
                <label style={{ display: 'flex', justifyContent: 'center' }} htmlFor="name">Nombres</label>
                <input type="text" name="name" id="name" className="form-control h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Daniel" {...register("name", { required: true })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name?.type === 'required' && <p className="text-danger" role="alert">Ingrese un nombre</p>}
              </div>
              <div className="md:col-span-2 ">
                <label style={{ display: 'flex', justifyContent: 'center' }} htmlFor="last_name">Apellidos</label>
                <input type="text" name="last_name" id="last_name" className="form-control h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Gaitan" {...register("last_name", { required: true })}
                  aria-invalid={errors.last_name ? "true" : "false"}
                />
                {errors.last_name?.type === 'required' && <p className="text-danger" role="alert">Ingrese un apellido</p>}
              </div>
              <div className="md:col-span-2">
                <label style={{ display: 'flex', justifyContent: 'center' }} htmlFor="birthdate">Fecha de nacimiento</label>
                <input type="date" name="birthdate" id="birthdate" className="form-control h-10 border mt-1 rounded px-4 w-full bg-gray-50"{...register("birthdate", { required: true })}
                  aria-invalid={errors.birthdate ? "true" : "false"}
                />
                {errors.birthdate?.type === 'required' && <p className="text-danger" role="alert">Ingrese una fecha</p>}
              </div>
              <div className="md:col-span-2 ">
                <label style={{ display: 'flex', justifyContent: 'center' }} htmlFor="birth_place">Lugar de nacimiento</label>
                <input type="text" name="birth_place" id="birth_place" className="form-control h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Bogotá" {...register("birth_place", { required: true })}
                  aria-invalid={errors.birth_place ? "true" : "false"}
                />
                {errors.birth_place?.type === 'required' && <p className="text-danger" role="alert">Ingrese un lugar</p>}
              </div>
              <div className="md:col-span-5">
                <label htmlFor="email">Correo electrónico</label>
                <input type="text" name="email" id="email" className="form-control h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" {...register("email", { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                  aria-invalid={errors.email ? "true" : "false"} />
                {errors.email?.type === 'pattern' && <p className="text-danger" role="alert">Ingrese una dirección de correo válido</p>}
                {errors.email?.type === 'required' && <p className="text-danger" role="alert">Ingrese una dirección de correo</p>}
              </div>

              <div className="md:col-span-3">
                <label htmlFor="address">Dirección</label>
                <input type="text" name="address" id="address" className="form-control h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" {...register("address", { required: true })}
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address?.type === 'required' && <p className="text-danger" role="alert">Ingrese un dirección</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="city">Celular</label>
                <input type="number" name="phone" id="phone" className="form-control h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="312 434 8511" minLength="10" maxLength="10" pattern="[0-9]*"
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "e") {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue.length > 10) {
                      e.target.value = inputValue.slice(0, 10);
                    }
                  }}
                  {...register("phone", { required: true })}
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone?.type === 'required' && <p className="text-danger" role="alert">Ingrese un número celular</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="photo">Foto</label>
                <input type="text" name="photo" id="photo" className="form-control h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="URL" {...register("photo", { required: true })}
                  aria-invalid={errors.photo ? "true" : "false"}
                />
                {errors.photo?.type === 'required' && <p className="text-danger" role="alert">Ingrese una URL</p>}
              </div>
              <div className="md:col-span-5">
                <label htmlFor="description">Descripción</label>
                <textarea
                  name="description"
                  id="description"
                  className="form-control h-24 border mt-1 rounded px-4 w-full bg-gray-50 resize-none"
                  placeholder="Cúentanos sobre ti"
                  {...register("description", { required: true })}
                  aria-invalid={errors.description ? "true" : "false"}
                ></textarea>
                {errors.description?.type === 'required' && <p className="text-danger" role="alert">Ingrese una Descripción</p>}
              </div>

              {errorForm == "true" ? <p className="text-danger" >Ya existen datos asociados</p> : <p></p>}
              {loadingForm == true ? <div className="md:col-span-5 text-right">
                <div className='inline-flex items-end'>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                    </span> Cargando
                  </button>
                </div>
              </div>
                : <div className="md:col-span-5 text-right">
                  <div className='inline-flex items-end'>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Registrar</button>
                  </div>
                </div>}
            </div>
          </div>
        </form>
      </div>
    );
  }

  function Profile() {

    return (
      <div style={{ width: '400px', margin: '15px 0' }} className="bg-white rounded flex items-center justify-center shadow-lg p-2 px-2">
        <div className="col-span-2">
          <div className="flex items-center justify-center">
            <Image
              src={tutorProfile.photo ? tutorProfile.photo : '/photo.png'}
              width={128}
              height={128}
              className="rounded-full"
              quality={100}
              alt="Profile"
            />
          </div>
          <div className="text-gray-600" style={{ display: 'flex', paddingTop: 10, justifyContent: 'center' }}>
            <p className="font-medium text-lg">Datos Personales</p>
          </div>
          <div className="justify-items-center grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
            <div className="md:col-span-2 space-x-2">
              <span>{tutorProfile.name ? tutorProfile.name : "No hay datos disponibles"}</span>
              <span>{tutorProfile.last_name ? tutorProfile.last_name : ""}</span>
            </div>
            <div className="md:col-span-2">
              <span>{tutorProfile.birthdate ? tutorProfile.birthdate : ""}</span>
            </div>
            <div className="md:col-span-2">
              <span>{tutorProfile.birth_place ? tutorProfile.birth_place : ""}</span>
            </div>
            <div className="md:col-span-2">
              <span>{tutorProfile.email ? tutorProfile.email : ""}</span>
            </div>
            <div className="md:col-span-2">
              <span>{tutorProfile.address ? tutorProfile.address : ""}</span>
            </div>
            <div className="md:col-span-2">
              <span>{tutorProfile.phone ? tutorProfile.phone : ""}</span>
            </div>
            <div className="md:col-span-2">
              <span>{tutorProfile.description ? tutorProfile.description : ""}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div sytle={{ height: 'fit-content' }} className="flex">
      <Sidebar handleShowForm={handleShowForm} />
      <div style={{ display: showForm ? 'flex' : 'none', height: 'fit-content', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }} >
        {showForm && <Form />}
      </div>
      <div style={{ display: showProfile ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }} >
        {showProfile && <Profile />}
      </div>
    </div>
  );
}
