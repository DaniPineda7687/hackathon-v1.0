import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SchoolInfo from "./SchoolInformation";
const colegioF = async(id,pass)=>{
    console.log(id + " aa "+pass)
    let resp = axios.post('http://localhost:5000/colegiosApi/colegios/LoginColegio',{id:id,pass:pass})
    const colegio =  (await resp);
    return colegio;
}

export default function MainPageSchools(){
    const {id,pass} = useParams();
    const [colegio,setColegio] = useState({})
    const [infoColegio,setInfoColegio] = useState(null);
    useEffect(()=>{
        if(id && pass){
            console.log(id,pass);
            colegioF(id,pass).then((resp) => {
                setColegio(resp.data);
                console.log("Promesa ",resp.data)
            }).catch((err) => {
                console.log("error");
            });
        }
    },[colegio.id,colegio.nombre,colegio.pass,id,pass]);

    useEffect(()=>{
        if(Object.entries(colegio).length!==0){
            console.log(colegio[0].nombre)
            
            axios.post('http://localhost:5000/colegiosApi/colegios/colegioInfo',{nombre:colegio[0].nombre}).then(resp=> setInfoColegio(resp.data));
            console.log(infoColegio)
        }
      },[colegio])

    return(
        Object.entries(colegio).length!==0 && infoColegio!=null ? 
        (
            <>
                <h1>Bienvenido {colegio[0].nombre}</h1>
                <SchoolInfo popupInfo={infoColegio[0]}/>
            </>

        )
        : 
        <h1>Adios</h1>
    )
}