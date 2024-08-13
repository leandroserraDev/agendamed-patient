import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import '../../../input.css';
import { useNavigate, useSearchParams } from "react-router-dom";

export default function EspecialidadeDoctorForm() {
  const navigate = useNavigate();
  const { register, control, handleSubmit, reset, trigger, setError} = useForm({
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctor, setDoctor] = useState();

//   useEffect(() =>{
//   const idParameter = searchParams.get("id");
//     if(idParameter != null){

//       fetch(`https://localhost:7036/api/Doctor/${idParameter}`)
//    .then( response => {
//       return response.json() 
//    }
 
//   )
//    .then(  data => {
//       setDoctor(data)
//       reset( data);
//    })
//    .catch(error => console.error(error));


//   }
    
//  },[])


  function submitData(data){
    
  var dataSend = {
    "speciality":  parseInt(data.speciality),
    "doctorID": localStorage.getItem("id")
  };
    fetch(`https://localhost:7036/api/Doctor/speciality`, {
      method:  "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then( response => {
       return response.json() 
    }
  
  )
    .then(  data => {
      // navigate({pathname:"/doctors"})
       return data;
  
    })
    .catch(error => console.error(error));
  };
  
  return (
    <div className="flex absolute w-full h-[90%]  justify-center items-center">

    <form className="flex flex-col w-[50%] border border-black " onSubmit={handleSubmit(data =>submitData(data))}>
      <ul className="flex flex-col">
        Especialidade
        <select {...register("speciality",  {  required: "Please enter your speciality." })}>
  <option value="1">Clínico Geral</option>
  <option value="2">Ortopedista</option>
  <option value="3">Pediatra</option>

</select>
  

      </ul>

      <input type="submit" />
    </form>
    </div>

  );
}
