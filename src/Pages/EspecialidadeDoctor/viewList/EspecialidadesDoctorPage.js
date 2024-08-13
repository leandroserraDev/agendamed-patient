import { useEffect, useState } from 'react';
import '../../../input.css';
import TableEspecialidade from './TableEspecialidade'
import { useNavigate,createSearchParams } from 'react-router-dom';




function EspecialidadesDoctorPage(){
    const [especialidades, setEspecialidade] = useState([]);
const navigate = useNavigate();
const goToNewEspecialidade = () =>
   navigate({
     pathname: '/especialidade/doctor'
   });
    useEffect(() =>{

        fetch(`https://localhost:7036/api/Doctor/${localStorage.getItem("id")}/speciality`)
     .then( response => {
        return response.json() 
     }
   
   )
     .then(  data => {

      setEspecialidade(data.data)
   
     })
     .catch(error => console.error(error));
     
   },[])
    return (
    <>
    <div className='flex  justify-end m-2 '>
      <button onClick={goToNewEspecialidade} className='
     duration-300
      hover:scale-105
      text-white
      bg-cyan-400 
                       rounded
                       p-1
                       bg-gradient-to-tr from-cyan-600 to-cyan-900
                       shadow-[0px_1px_6px_0px_#00000024]
                       shadow-black'>
         Nova especialidade
      </button>
    </div>
    <TableEspecialidade especialidades={especialidades}/>
    </>
    )
}

export default EspecialidadesDoctorPage;