import { useEffect, useState } from 'react';
import '../../../input.css';
import TableEspecialidade from './TableAgendaDoutor'
import { useNavigate,createSearchParams } from 'react-router-dom';
import TableAgendaDoutor from './TableAgendaDoutor';




function AgendasDoctorPage(){
    const [agenda, setAgenda] = useState([]);
const navigate = useNavigate();
const goToNewAgenda = () =>
   navigate({
     pathname: '/agenda/nova-agenda'
   });
    useEffect(() =>{

        fetch(`https://localhost:7036/api/Doctor/${localStorage.getItem("id")}/schedule`)
     .then( response => {
        return response.json() 
     }
   
   )
     .then(  data => {

      setAgenda(data)
   
     })
     .catch(error => console.error(error));
     
   },[])
    return (
    <>
    <div className='flex  justify-end m-2 '>
      <button onClick={goToNewAgenda} className='
     duration-300
      hover:scale-105
      text-white
      bg-cyan-400 
                       rounded
                       p-1
                       bg-gradient-to-tr from-cyan-600 to-cyan-900
                       shadow-[0px_1px_6px_0px_#00000024]
                       shadow-black'>
         Nova Agenda
      </button>
    </div>
    <TableAgendaDoutor agenda={agenda}/>
    </>
    )
}

export default AgendasDoctorPage;