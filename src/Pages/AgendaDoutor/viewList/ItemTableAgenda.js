import { useNavigate , createSearchParams, Navigate, useSearchParams } from "react-router-dom";


export default function ItemTableAgenda({data}){
    const navigate =  useNavigate();

        function MudarStatus(){
   
    fetch(`https://localhost:7036/api/Doctor/${data.doctorID}/speciality/${data.speciality}/mudarstatus`,{
        method:"PATCH"
    })
    .then( response => {
       return response.json() 
    }
  
  )
    .then(  data => {
        window.location.reload()
  
    })
    .catch(error => console.error(error));

}

    return (
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Especialidade
                </th>
        

            </tr>
        </tbody>
   )
}
