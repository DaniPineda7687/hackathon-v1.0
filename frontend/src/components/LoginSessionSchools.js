import { useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import "../styles/LoginSessionSchools.css"
export default function LoginSessionSchools(){
    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const navigate = useNavigate();
    const handleUser=(ev)=>{
        setUser(ev.target.value);
    }
    const handlePass=(e)=>{
        setPass(e.target.value)
    }
    const handleLogin=(e) => {
        navigate(`/MainPageSchools/${user}/${pass}`)
    }
    return(
        <div id="contenedor">
            <div id="central">
                <div id="login">
                    <div class="titulo">
                        Bienvenido
                    </div>
                    <form id="loginform">
                        <input type="text" name="usuario" value={user} onChange={handleUser} placeholder="Usuario" required/>
                        
                        <input type="password" placeholder="Contraseña" value={pass} onChange={handlePass} name="password" required/>
                        
                        <button type="button" onClick={handleLogin} title="Ingresar" name="Ingresar">Login</button>
                    </form>
                    <div class="pie-form">
                        <a href="#">¿Perdiste tu contraseña?</a>
                        <a href="#">¿No tienes Cuenta? Registrate</a>
                    </div>
                </div>
                <div class="inferior">
                    <a href="#">Volver</a>
                </div>
            </div>
        </div>
    )
}