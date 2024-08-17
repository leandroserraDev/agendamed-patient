import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import '../../../input.css';
import { useNavigate, useSearchParams } from "react-router-dom";

function PatientForm() {
  const navigate = useNavigate();
  const { register, control, handleSubmit, reset, trigger, setError} = useForm({
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const[errorAPI, setErrorAPI] = useState([]);

  const [patient, setPatient] = useState();

  useEffect(() =>{

      fetch(`${process.env.REACT_APP_URI_API}/Patient`,{
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
   .then( response => {
      return response.json() 
   }
 
  )
   .then(  resp => {
      setPatient(resp.data)
      reset( resp.data);
   })
   .catch(error => console.error(error));
    
 },[])


  function submitData(data){
    fetch(`${process.env.REACT_APP_URI_API}/patient/${patient !=  null? patient.id:""}`, {
      method: `${patient != null ? "PUT" : "POST"}`,
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${localStorage.getItem("token")}`

      }
    })
    .then( response => {
      console.log(response)
       return response.json() 
    }
  
  )
    .then(  data => {

       if(data.success){
        alert(patient != null ? "Editado" : "Cadastrado")
        navigate({pathname:"/home"})

       }

       setErrorAPI(data)
  
    })
    .catch(error => console.error(error));
  };
  
  return (
    <div className="flex flex-col w-full justify-center items-center ">

    <form className="flex flex-col  w-[300px] border border-black rounded p-3 " onSubmit={handleSubmit(data =>submitData(data))}>
      <ul className="flex flex-col">

      <label for="Nome" class="block mb-1 ml-4 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
      <input
      className='
      pl-2
       self-center
       h-[25px]
   "block  rounded-md border-0 mb-4  w-[90%] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-white focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
       '
       
        {...register("nome",  {  required: "Please enter your email." })} // custom message
      />
               
      <label for="Sobrenome" class="block mb-1 ml-4 text-sm font-medium text-gray-900 dark:text-white">Sobrenome</label>
      <input
      className='
      pl-2
       self-center
       h-[25px]
   "block  rounded-md border-0 mb-4  w-[90%] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-white focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
       '
       
        {...register("sobrenome",  {  required: "Please enter your email." })} // custom message
      />

<label for="Email" class="block mb-1 ml-4 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
      <input
      disabled={patient != null}
      className='
      pl-2
       self-center
       h-[25px]
   "block  rounded-md border-0 mb-4  w-[90%] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-white focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
       '
       type='email'
        {...register("email",  {  required: "Please enter your email." })} // custom message
      />


      </ul>
      

      <input type="submit" />
      {
        errorAPI.error && errorAPI.error.map((item,index)=>{
          return(
            <li className=' h-[50px]  text-red-500' key={item.id}>
              <span>
                {item.message}
              </span>
              </li>
          )
        })
      }
    </form>

  
    </div>

  );
}

export default PatientForm;