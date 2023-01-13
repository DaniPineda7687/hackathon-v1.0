import { Link } from "react-router-dom"
import "../styles/Inicio.css"

const Inicio = ()=>{

    return(
        <div className="main__container__home">
        <header className="header__home">
		<a href="#" class="logo"><img src="/resources/logo.png" alt="logo"/></a>
		<ul class="navbar">
			<li><Link to="/mapa" class="active"><button><span>¡Buscar Colegio!</span><i></i></button></Link></li>
		</ul>

		<div class="main">
			<Link to="/LoginSessionSchools" class="user"><button>Inicio Sesion Colegios</button></Link>
		</div>
	    </header>
	    <div class="container">
		    <img src="/resources/navigation-animate.svg" alt=""/>
	    </div>
        </div>
    )
}
export default Inicio;