import { Navigation } from './../../components/Navigation';
import Image from 'next/image';
import styles from './homepage.module.css';


export default function HomeStudent(){
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
        </div>
    )
}