import { useEffect, useState } from 'react';
import '../../input.css';
import TableConsulta from './ConsultaView/TableConsulta';
import { useNavigate } from 'react-router-dom';

export default function ConsultaPage(){
    const[consultas, setConsultas]= useState([]);
    const navigate = useNavigate();

    useEffect(() =>{

        fetch('https://localhost:7036/api/Doctor')
     .then( response => {
        return response.json() 
     }
   
   )
     .then(  data => {
        setConsultas(data)
   
     })
     .catch(error => console.error(error));
   },[])

   const goToNewConsulta = () =>
    navigate({
      pathname: '/agendar-consulta'
    });
    return (
        <div className='flex flex-col  justify-end m-2 '>
            <div className='flex  justify-end m-2 '>
      <button onClick={()=> goToNewConsulta()} className='
     duration-300
      hover:scale-105
      text-white
      bg-cyan-400 
                       rounded
                       p-1
                       bg-gradient-to-tr from-cyan-600 to-cyan-900
                       shadow-[0px_1px_6px_0px_#00000024]
                       shadow-black'>
         Nova Consulta
      </button>
    </div>
            <TableConsulta consultas={consultas}/>
        </div>
    )
}