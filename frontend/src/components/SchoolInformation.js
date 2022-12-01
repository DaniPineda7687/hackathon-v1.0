import { useContext } from "react"
import { LocationContext } from "../LocationProvider"
import textFormatter from "../services/utils";
import "../styles/InfoCards.css"

const SchoolInfo = ({popupInfo})=>{
    const [location,dispatch]= useContext(LocationContext);
    return (location.conditions ?
    <>
    <h2>{textFormatter(textFormatter(popupInfo.nombre))}</h2>
    <div>
        <h3>Cupos disponibles en {location.conditions[0].level}</h3>
        <ul>
            {
            location.conditions[0].schedule.map(horario=>{
                if(popupInfo.jornada[horario]){
                    return <><br/><h4>{horario}</h4>{Object.keys(popupInfo.jornada[horario].escolaridad[location.conditions[0]?.level]).filter(pos=>pos!==undefined).map(curso=><li>{`${curso}: ${popupInfo.jornada[horario].escolaridad[location.conditions[0].level][curso]}`}</li>)}</>
                }
            })}
        </ul>
    </div>
    </> :  
      <>
        <h2>{textFormatter(textFormatter(popupInfo.nombre))}</h2>
        <table>
          <tr>
            <th className="title__table">CUPOS DISPONIBLES SEGÚN JORNADA</th>
          </tr>
          <div className="horarios__container">
            {Object.keys(popupInfo.jornada).map((valor) => {
              return (
                <div className="jornada__container">
                  <tr>
                    <h3 className="title__jornada">
                      {textFormatter(`${valor}`)}
                    </h3>
                  </tr>
                  {Object.keys(popupInfo.jornada[valor].escolaridad).map(
                    (educacion) => {
                      return (
                        <>
                          <tr>
                            <h4 className="title__level">
                              {/*textFormatter(educacion)*/}
                            </h4>
                          </tr>
                          <ul>
                            {Object.keys(
                              popupInfo.jornada[valor].escolaridad[educacion]
                            ).map((grado) => {
                              return (
                                <li>
                                  {textFormatter(
                                    `${grado}: ${popupInfo.jornada[valor].escolaridad[educacion][grado]}`
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      );
                    }
                  )}
                </div>
              );
            })}
          </div>
        </table>
      </>
    );
}
export default SchoolInfo