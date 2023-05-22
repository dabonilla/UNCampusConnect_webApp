"use client"
import React, { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import Link from 'next/link';
import Cookies from 'js-cookie';

const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`;

// Nuevo componente para realizar la consulta y obtener el rol
function RoleComponent({ token, onRoleFetched }) {
  const queryRole = `
    query {
      getMyInfo {
        role
      }
    }
  `;

  useEffect(() => {
    if (token) {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ query: queryRole })
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Error fetching data');
          } else {
            return response.json();
          }
        })
        .then((data) => {
          const role = data.data.getMyInfo.role;
          onRoleFetched(role);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const role = 'no hay';
      onRoleFetched(role);
    }
  }, [token, onRoleFetched]);

  // No se muestra nada en este componente, ya que el rol se obtiene a través de la llamada a la función onRoleFetched

  return null;
}

// Componente Navigation
export function Navigation() {
    const token = Cookies.get('myToken');
    const [role, setRole] = useState('');
  

    const logout = ()=>{
      localStorage.removeItem('token');
      Cookies.remove('myToken');
    }


    const handleRoleFetched = (role) => {
      setRole(role);
    };
  
    let linksSection;
  
    switch (role) {
      case 'tutor':
        linksSection = (
          <>
            <div className="nav">
                    <Link className="nav-link d-flex align-items-center" href='/UN-CampusConnect/bienestarpublications'as={`/UN-CampusConnect/bienestarpublications`}>
                        Bienestar
                    </Link>
                    <Link className="nav-link" href="/UN-CampusConnect/signin" as="/UN-CampusConnect/signin">
                        <button onClick={logout} type="button" className={`btn btn-sm ${styles.btncustom}`}>
                        Salir
                        </button>
                    </Link>
                </div>
            {/* Otros enlaces para el rol de tutor */}
          </>
        );
        break;
      case 'admin':
        linksSection = (
          <>
            {
                <div className="nav">
                    <Link className="nav-link d-flex align-items-center" href='/UN-CampusConnect/admin/calls'as={`/UN-CampusConnect/admin/calls`}>
                        Convocatorias
                    </Link>
                    <Link className="nav-link d-flex align-items-center" href='/UN-CampusConnect/bienestarpublications'as={`/UN-CampusConnect/bienestarpublications`}>
                        Bienestar
                    </Link>
                    <Link  className="nav-link" href="/UN-CampusConnect/signin" as="/UN-CampusConnect/signin">
                        <button onClick={logout} type="button" className={`btn btn-sm ${styles.btncustom}`}>
                        Salir
                        </button>
                    </Link>
                </div>
            }
          </>
        );
        break;
      case 'student':
        linksSection = (
          <>
            <div className="nav">
                    <Link className="nav-link d-flex align-items-center" href='/UN-CampusConnect/student/calls'as={`/UN-CampusConnect/student/calls`}>
                        Convocatorias
                    </Link>
                    <Link className="nav-link d-flex align-items-center" href='/UN-CampusConnect/bienestarpublications'as={`/UN-CampusConnect/bienestarpublications`}>
                        Bienestar
                    </Link>
                    <Link  className="nav-link" href="/UN-CampusConnect/signin" as="/UN-CampusConnect/signin">
                        <button onClick={logout} type="button" className={`btn btn-sm ${styles.btncustom}`}>
                        Salir
                        </button>
                    </Link>
                </div>
          </>
        );
        break;
      default:
        linksSection = (
            <>
                <div className="nav">
                    <Link className="nav-link d-flex align-items-center" href='/UN-CampusConnect/bienestarpublications'as={`/UN-CampusConnect/bienestarpublications`}>
                        Bienestar
                    </Link>
                    <Link className="nav-link" href="/UN-CampusConnect/signin" as="/UN-CampusConnect/signin">
                        <button type="button" className={`btn btn-sm ${styles.btncustom}`}>
                            Iniciar Sesión
                        </button>
                    </Link>
                    <Link className="nav-link" href="/UN-CampusConnect/signup" as="/UN-CampusConnect/signup">
                        <button type="button" className={`btn btn-sm ${styles.btncustom}`}>
                            Registrate
                        </button>
                    </Link>
                </div>
            </>
          );
        break;
    }
  
    return (
      <header className={styles.header}>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <div>
              <Link className="navbar-brand" href="/UN-CampusConnect/homepage" as="/UN-CampusConnect/homepage">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30" height="24" className="d-inline-block align-text-top mr-2" viewBox="0 0 40.000000 40.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,40.000000) scale(0.015625,-0.015625)" fill="white" stroke="none">
                        <path d="M782 2361 c-260 -65 -478 -123 -484 -129 -9 -9 -9 -15 2 -26 8 -7 232 -67 497 -132 l483 -118 282 69 c156 37 287 72 292 76 6 5 6 9 2 9 -21 0 -573 71 -588 76 -29 9 -33 56 -5 67 7 2 195 -19 418 -47 l405 -50 82 19 c89 20 115 37 91 59 -14 13 -961 247 -989 245 -8 -1 -228 -54 -488 -118z"/>
                        <path d="M2083 2077 l-43 -10 0 -119 c0 -66 5 -128 10 -139 12 -22 59 -26 78 -7 13 13 18 289 5 287 -5 -1 -27 -6 -50 -12z"/>
                        <path d="M760 1881 l0 -118 58 -26 c114 -51 270 -77 462 -77 192 0 348 26 463 77 l57 26 0 118 c0 94 -3 119 -14 119 -7 0 -124 -27 -259 -60 l-245 -60 -247 60 c-135 33 -252 60 -260 60 -12 0 -15 -21 -15 -119z"/>
                        <path d="M664 1689 c-56 -21 -179 -93 -179 -104 0 -4 24 -14 54 -21 130 -34 268 -111 384 -214 97 -87 221 -259 294 -407 24 -50 27 -53 63 -53 37 0 39 1 79 80 151 296 363 496 608 575 48 15 95 30 103 32 12 4 11 7 -5 19 -39 29 -107 67 -163 90 l-56 22 -55 -27 c-133 -67 -281 -94 -511 -94 -229 0 -378 27 -510 93 l-55 28 -51 -19z"/>
                        <path d="M80 1655 c0 -33 57 -131 108 -186 47 -52 73 -68 225 -143 267 -130 483 -284 627 -445 35 -39 67 -71 70 -71 3 0 18 12 34 26 l29 26 -29 61 c-73 155 -210 331 -326 420 -105 80 -200 124 -351 162 -151 38 -220 66 -306 124 -64 44 -81 49 -81 26z"/>
                        <path d="M2405 1633 c-78 -55 -169 -93 -312 -129 -152 -38 -246 -81 -351 -161 -116 -89 -242 -250 -323 -415 l-32 -66 29 -26 c16 -14 31 -26 34 -26 3 0 35 32 70 71 144 161 360 315 627 445 152 75 178 91 225 143 30 32 66 84 81 115 46 96 34 108 -48 49z"/>
                        <path d="M266 1253 c-51 -158 -71 -406 -43 -539 43 -201 170 -357 379 -469 221 -117 555 -182 803 -156 527 57 859 281 932 629 19 93 13 320 -12 422 -23 97 -45 160 -56 160 -11 0 -206 -93 -228 -108 -12 -9 -10 -16 13 -46 50 -66 70 -124 70 -206 1 -66 -4 -85 -32 -142 -72 -147 -224 -222 -373 -184 -72 19 -128 52 -177 105 -42 45 -53 34 -57 -56 -4 -84 -41 -214 -103 -358 -39 -91 -52 -111 -74 -119 -58 -20 -79 -1 -130 119 -63 147 -100 275 -103 358 -3 90 -15 101 -57 56 -49 -53 -105 -86 -177 -105 -149 -38 -301 37 -373 184 -28 57 -33 76 -32 142 0 82 20 140 70 206 23 30 25 37 13 46 -22 15 -217 108 -228 108 -5 0 -16 -21 -25 -47z"/>
                        <path d="M564 1103 c-38 -50 -53 -97 -54 -169 -1 -218 261 -336 426 -191 68 60 72 73 33 113 -38 39 -45 41 -54 15 -10 -32 -67 -81 -107 -92 -80 -21 -173 33 -198 117 -16 54 1 114 45 158 l34 34 -39 26 c-22 14 -44 26 -49 26 -5 0 -21 -16 -37 -37z"/>
                        <path d="M1908 1113 l-37 -25 34 -34 c44 -44 61 -104 45 -158 -25 -84 -118 -138 -199 -116 -37 10 -101 67 -113 101 -4 10 -15 5 -42 -20 -20 -19 -36 -39 -36 -45 0 -22 106 -112 146 -124 178 -53 344 65 343 243 0 33 -6 76 -13 96 -15 43 -64 109 -80 108 -6 0 -28 -12 -48 -26z"/>
                        <path d="M725 1018 c-32 -19 -44 -40 -45 -81 0 -82 91 -117 151 -58 42 42 38 71 -15 115 -48 39 -60 42 -91 24z"/>
                        <path d="M1742 992 c-51 -44 -54 -72 -13 -113 60 -59 151 -24 151 58 -1 42 -13 63 -47 81 -33 18 -44 15 -91 -26z"/>
                        <path d="M1209 793 c-84 -52 -78 -164 19 -415 24 -65 48 -118 52 -118 11 0 86 197 110 286 35 136 23 210 -40 248 -36 20 -107 20 -141 -1z"/>
                        </g>
                    </svg>
                Campus Connect
              </Link>
            </div>
              {linksSection}
          </div>
        </nav>
        <RoleComponent token={token} onRoleFetched={handleRoleFetched} />
      </header>
    );
  }