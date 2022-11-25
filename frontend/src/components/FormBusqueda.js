import "../styles/FormBusqueda.css";
import { useContext } from "react";
import { LocationContext } from "../LocationProvider";
export default function FormBusqueda(){
    const [location, dispatch] = useContext(LocationContext);
    function handleSubmit(e) {
        e.preventDefault();
        
      }

    return(
        <div className="conditions__user">
            <form className="form__container" onSubmit={(e)=>handleSubmit(e)}>
                <input required placeholder="¿En cuantos kilometros (kms) a la redonda desea realizar la busqueda" type="number" className="inputDistancia" 
                
                />
                <select required>
                    <option selected disabled>Nivel educativo</option>
                    <option>Transición - Preescolar</option>
                    <option>Primaria</option>
                    <option>Secundaria</option>
                </select>
                <div className="select__jornada">
                    <p>Jornada estudiantil</p>
                    <label><input type="checkbox" value="morning" /> Mañana</label>
                    <label><input type="checkbox" value="evening" /> Tarde</label>
                    <label><input type="checkbox" value="night" /> Noche</label>
                </div>
                <input type="submit"/>
            </form>
        </div>
    )
}