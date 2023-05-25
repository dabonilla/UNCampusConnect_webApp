import Script from 'next/script';
export default function Homepage() {
	return (
		<div data-spy="scroll" data-target=".site-navbar-target" data-offset="300">

			<link rel="icon" type="image/x-icon" href="images/favicon.ico" />
			<title>UN-Campus Connect</title>
			<link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900" rel="stylesheet" />
			<link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css" />
			<link rel="stylesheet" href="/css/animate.css" />
			<link rel="stylesheet" href="/css/owl.carousel.min.css" />
			<link rel="stylesheet" href="/css/owl.theme.default.min.css" />
			<link rel="stylesheet" href="/css/magnific-popup.css" />
			<link rel="stylesheet" href="/css/aos.css" />
			<link rel="stylesheet" href="/css/ionicons.min.css" />
			<link rel="stylesheet" href="/css/flaticon.css" />
			<link rel="stylesheet" href="/css/icomoon.css" />
			<link rel="stylesheet" href="/css/style.css" />
			<nav className="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target" id="ftco-navbar">
				<div className="container">
					<span className="navbar-brand" style={{ userSelect: 'none' }}>Un Campus Connect</span>
					{/*<button className="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="true" aria-label="Toggle navigation">
						<span className="oi oi-menu"></span> Menu
					</button>
					<div className="collapse navbar-collapse" id="ftco-nav">
						<ul className="navbar-nav nav ml-auto">
							<li className="nav-item"><a href="#home-section" className="nav-link"><span>Home</span></a></li>
							<li className="nav-item"><a href="#about-section" className="nav-link"><span>About</span></a></li>
							<li className="nav-item"><a href="#resume-section" className="nav-link"><span>Tutor</span></a></li>
							<li className="nav-item"><a href="#services-section" className="nav-link"><span>Bienestar</span></a></li>
							<li className="nav-item"><a href="#contact-section" className="nav-link"><span>Contact</span></a></li>
						</ul>
	</div>*/}
				</div>
			</nav>
			<section id="home-section" className="hero">
				<div className="home-slider owl-carousel">
					<div className="slider-item">
						<div className="overlay"></div>
						<div className="container">
							<div className="row d-md-flex no-gutters slider-text align-items-end justify-content-end" data-scrollax-parent="true">
								<div className="one-third js-fullheight order-md-last img" style={{ backgroundImage: "url(/Captura4-removebg-preview.png)", backgroundPosition: "center 170px", backgroundSize: "70%" }}>
									<div className="overlay"></div>
								</div>
								<div className="one-forth d-flex align-items-center" data-scrollax=" properties: { translateY: '70%' }">
									<div className="text">
										<h1 className="mb-4 mt-3">Bienvenido a <br /><span>UN Campus Connect</span></h1>
										<br />
										<p><a href="/UN-CampusConnect/signin" className="btn btn-primary py-4 px-5">Ingresar</a> <a href="/UN-CampusConnect/signup" className="btn btn-white btn-outline-white py-4 px-5">Registrate</a></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="ftco-about img ftco-section ftco-no-pb" id="about-section">
				<div className="container">
					<div className="row d-flex">
						<div className="col-md-6 col-lg-5 d-flex">
							<div className="img-about img d-flex align-items-stretch">
								<div className="overlay"></div>
								<div className="img d-flex align-self-stretch align-items-center" style={{ backgroundImage: "url(/table.png)" }}>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-7 pl-lg-5 pb-5">
							<div className="row justify-content-start pb-3">
								<div className="col-md-12 heading-section ftco-animate">
									<h1 className="big">About</h1>
									<h2 className="mb-4">Aquí encontrarás</h2>
									<p style={{ textAlign: "justify" }}>Una plataforma para integrantes de la comunidad UNAL, que facilita el acceso a servicios relacionados con la vida universitaria en dos modalidades principales, la primera en función de la vida académica y la segunda enfocada en el bienestar.</p>
									<ul className="about-info mt-4 px-md-0 px-2">
										<li className="d-flex" style={{ textAlign: "justify" }}><span>Tutorías:</span> <span>Podrás ver información educativa relacionada con una asignatura.</span></li>
										<li className="d-flex" style={{ textAlign: "justify" }}><span>Grupos deportivos:</span> <span>Dirigido a aquellos estudiantes que buscan participar en los diferentes grupos deportivos, artísticos o culturales que se encuentran en la universidad.</span></li>
									</ul>
								</div>
							</div>
							<div className="counter-wrap ftco-animate d-flex mt-md-3">
								<div className="text">
									<p className="mb-4">
										<span>La universidad cuenta con más de </span>
										<span className="number" data-number="36">0</span>
										<span> espacios para la vida académica y estudiantil. </span>
									</p>
									<p><a href='/UN-CampusConnect/admin/calls' as={`/UN-CampusConnect/admin/calls`} className="btn btn-primary py-3 px-3">Conoce más!</a></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="ftco-section" id="services-section">
				<div className="container">
					<div className="row justify-content-center py-5 mt-5">
						<div className="col-md-12 heading-section text-center ftco-animate">
							<h1 className="big big-2">Explora más</h1>
							<h2 className="mb-4">Podrás escoger entre:</h2>
							<p>Es de vital importancia lograr un balance entre la vida académica y el bienestar universitario.</p>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4 text-center d-flex ftco-animate">
							<a href="#" className="services-1">
								<span className="icon" style={{ display: 'flex', height: 'fit-content', justifyContent: 'center', alignItems: 'center' }}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 35 35" strokeWidth={1.5} stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
											transform={`translate(${5}, ${5})`}
										/>
									</svg>

								</span>
								<div className="desc">
									<h3 className="mb-5">Tutorías</h3>
								</div>
							</a>
						</div>
						<div className="col-md-4 text-center d-flex ftco-animate">
							<a href='/UN-CampusConnect/bienestarpublications' as={`/UN-CampusConnect/bienestarpublications`} className="services-1">
								<span className="icon" style={{ display: 'flex', height: 'fit-content', justifyContent: 'center', alignItems: 'center' }}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 35 35" strokeWidth={1.5} stroke="currentColor" >
										<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" transform={`translate(${5}, ${5})`}
										/>
									</svg>


								</span>
								<div className="desc">
									<h3 className="mb-5">Bienestar Universitario</h3>
								</div>
							</a>
						</div>
						<div className="col-md-4 text-center d-flex ftco-animate">
							<a href="#" className="services-1">
								<span className="icon" style={{ display: 'flex', height: 'fit-content', justifyContent: 'center', alignItems: 'center' }}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 35 35" strokeWidth={1.5} stroke="currentColor" >
										<path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" transform={`translate(${5}, ${5})`} />
									</svg>


								</span>
								<div className="desc">
									<h3 className="mb-5">Ser tutor</h3>
								</div>
							</a>
						</div>
					</div>
				</div>
			</section>
			<section className="ftco-section contact-section ftco-no-pb" id="contact-section">
				<div className="container">
					<div className="row justify-content-center mb-5 pb-3">
						<div className="col-md-7 heading-section text-center ftco-animate">
							<h1 className="big big-2">:)</h1>
							<h2 className="mb-4">Contáctanos!</h2>
							<p>Aquí encontrarás una cajita para que puedas dejar tus preguntas, comentarios o sugerencias.</p>
						</div>
					</div>

					<div className="row d-flex contact-info mb-5">
						<div className="col-md-6 col-lg-3 d-flex ftco-animate">
							<div className="align-self-stretch box p-4 text-center">
								<div className="icon d-flex align-items-center justify-content-center">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
									</svg>

								</div>
								<h3 className="mb-4">Dirección</h3>
								<p>Universidad Nacional de Colombia</p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3 d-flex ftco-animate">
							<div className="align-self-stretch box p-4 text-center">
								<div className="icon d-flex align-items-center justify-content-center">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
									</svg>

								</div>
								<h3 className="mb-4">Número de contacto</h3>
								<p><a href="tel://1234567920">+ 1235 2355 98</a></p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3 d-flex ftco-animate">
							<div className="align-self-stretch box p-4 text-center">
								<div className="icon d-flex align-items-center justify-content-center">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
									</svg>

								</div>
								<h3 className="mb-4">Email</h3>
								<p><a href="mailto:un_campusconnect@unal.edu.c">un_campusconnect@unal.edu.co</a></p>
							</div>
						</div>
						<div className="col-md-6 col-lg-3 d-flex ftco-animate">
							<div className="align-self-stretch box p-4 text-center">
								<div className="icon d-flex align-items-center justify-content-center">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
									</svg>

								</div>
								<h3 className="mb-4">Website</h3>
								<p><a href="#">https://un-campusconnect.com</a></p>
							</div>
						</div>
					</div>

					<div className="row no-gutters block-9">
						<div className="col-md-6 order-md-last d-flex">
							<form action="#" className="bg-light p-4 p-md-5 contact-form">
								<div className="form-group">
									<input type="text" className="form-control" placeholder="Tu nombre" />
								</div>
								<div className="form-group">
									<input type="text" className="form-control" placeholder="Tu Email" />
								</div>
								<div className="form-group">
									<input type="text" className="form-control" placeholder="Descripción" />
								</div>
								<div className="form-group">
									<textarea name="" id="" cols="30" rows="7" className="form-control" placeholder="Mensaje"></textarea>
								</div>
								<div className="form-group">
									<input type="submit" value="Enviar" className="btn btn-primary py-3 px-5" />
								</div>
							</form>
						</div>

						<div className="col-md-6 d-flex">
							<div className="img" style={{ backgroundImage: "url(/logoCompleto.png)" }}></div>
						</div>
					</div>
				</div>
			</section>
			<footer className="ftco-footer ftco-section">
				<div className="container">
					<div className="row mb-5">
						<div className="col-md">
							<div className="row">
								<div className="col-md-12 text-center">
									<p>
										&copy;{new Date().getFullYear()} All rights reserved | UN CampusConnect
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>

			<Script src="/scripts/jquery.min.js" />
			<Script src="/scripts/jquery-migrate-3.0.1.min.js" />
			<Script src="/scripts/popper.min.js" />
			<Script src="/scripts/bootstrap.min.js" />
			<Script src="/scripts/jquery.easing.1.3.js" />
			<Script src="/scripts/jquery.waypoints.min.js" />
			<Script src="/scripts/jquery.stellar.min.js" />
			<Script src="/scripts/owl.carousel.min.js" />
			<Script src="/scripts/jquery.magnific-popup.min.js" />
			<Script src="/scripts/aos.js" />
			<Script src="/scripts/jquery.animateNumber.min.js" />
			<Script src="/scripts/scrollax.min.js" />
			<Script src="/scripts/main.js" />

		</div>
	);

}