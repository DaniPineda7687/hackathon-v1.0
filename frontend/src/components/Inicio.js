import { Link } from "react-router-dom"
import "../styles/Inicio.css"

export const Inicio = ()=>{

    return(
        <>
        <header>
		<a href="#" class="logo"><img src="/resources/logo.png" alt="logo"/></a>
		<ul class="navbar">
			<li><Link to="/mapa" class="active"><button><span>¡Buscar Colegio!</span><i></i></button></Link></li>
		</ul>

		<div class="main">
			<a href="#" class="user"><button>Manual</button></a>
		</div>
	    </header>
	    <div class="container">
		    <img src="/resources/navigation-animate.svg" alt=""/>
	    </div>
        </>
    )
}