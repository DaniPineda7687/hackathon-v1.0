import "../styles/FormBusqueda.css";
import { useContext, useState } from "react";
import { LocationContext } from "../LocationProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function FormBusqueda(){
    const [location, dispatch] = useContext(LocationContext);
    const [distance, setDistance]=useState(0);
    const [level, setLevel]=useState("");
    const [schedule, setSchedule]=useState([])
    function handleSubmit(e) {
        e.preventDefault();
        const scheduleOptions = document.querySelectorAll("#schedule-option");
        const optionsSchedule=[]
        scheduleOptions.forEach(item =>{
            if(item.checked){
                optionsSchedule.push(item.value)
            }
        })
        setSchedule(optionsSchedule);
        console.log(optionsSchedule.length);
        if((distance<=0||distance>=11)){
            console.log("Distancia no valida")
            toast.error("La distancia no es válida (1-10kms)",{
                position:"top-right",
                autoClose:1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if(level===""){
            console.log("Nivel no valido")
            toast.error("Seleccione un nivel educativo válido para continuar",{
                position:"top-right",
                autoClose:1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if(optionsSchedule.length===0){
            console.log("Horario no valido")
            toast.error("Seleccione un horario válido para continuar",{
                position:"top-right",
                autoClose:1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        console.log("todo bien")
        dispatch({type:"UPDATE_CONDITIONS", payload:{lat:location.lat,lng:location.lng,conditions:[{perimeter:distance,level:level,schedule:optionsSchedule}]}})
      }

    return(
        <div className="conditions__user">
            <form className="form__container" onSubmit={(e)=>handleSubmit(e)}>
                <div className="form">
                    <input required placeholder="¿En cuantos kilometros (kms) a la redonda desea realizar la busqueda" type="number" className="inputDistancia" onChange={(e)=>setDistance(Number(e.target.value))}/> <span className="input-border"></span>
                </div>
                <select required onChange={(e)=>setLevel(e.target.value)}>
                    <option selected disabled value="noNivel">Nivel educativo</option>
                    <option value="preescolar">Transición - Preescolar</option>
                    <option value="primaria">Primaria</option>
                    <option value="bachiller">Secundaria</option>
                </select>
                <div className="select__jornada">
                    <p>Jornada estudiantil</p>
                    <div id="checkbox">
                        <label className="containerCheck"><input type="checkbox" value="mañana" id="schedule-option"/><div className="checkmark"></div>Mañana</label>
                        <label className="containerCheck"><input type="checkbox" value="tarde" id="schedule-option"/><div className="checkmark"></div>Tarde</label>
                        <label className="containerCheck"><input type="checkbox" value="noche" id="schedule-option"/><div className="checkmark"></div>Noche</label>
                    </div>
                    
                </div>
                <button id="send" type="submit">Enviar consulta</button>
            </form>
            <ToastContainer />
        </div>
    )
}