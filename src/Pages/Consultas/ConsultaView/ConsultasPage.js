import { useEffect, useState } from 'react';
import '../../../input.css';
import ConsultaPage from '../ConsultaPage.js';
import { useNavigate,createSearchParams } from 'react-router-dom';
import TableConsulta from './TableConsulta.js';




function ConsultasPage(){
    const [consultas, setConsultas] = useState([]);
const navigate = useNavigate();
const goToNewConsulta = () =>
   navigate({
     pathname: '/agendar-consulta'
   });
    useEffect(() =>{

        fetch(`${process.env.REACT_APP_URI_API}/patient/appointments`,{
          headers: {
         "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
     .then( response => {
        return response.json() 
     }
   
   )
     .then(  data => {
      console.log(data)
      setConsultas(data.data)
   
     })
     .catch(error => console.error(error));
   },[])
    return (
    <>
    <div className='flex  justify-end m-2 '>
      <button onClick={goToNewConsulta} className='
     duration-300
      hover:scale-105
      text-white
      bg-cyan-400 
                       rounded
                       p-1
                       bg-gradient-to-tr from-cyan-600 to-cyan-900
                       shadow-[0px_1px_6px_0px_#00000024]
                       shadow-black'>
         Agendar Consulta
      </button>
    </div>
    <TableConsulta consultas={consultas}/>
    </>
    )
}

export default ConsultasPage;