import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FieldArray from './NestedForm/fieldArray.js';
import '../../../input.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import { isDateAfterType } from "react-day-picker";
import { GiConsoleController } from "react-icons/gi";

export default function AgendaDoctorForm() {

  const[especialidades, setEspecialidades] = useState([]);
  const[agenda, setAgenda] = useState([]);

  const defaultValues = {
    speciality:"1",
    doctorID: localStorage.getItem("id"),
    schedule:[{}]
  };
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue
  } = useForm({defaultValues: defaultValues});

const[searchParams, setSearchParams] = useSearchParams();
  useEffect(() =>{
    const doctorID = searchParams.get("doctorID");
        const specialityID = searchParams.get("speciality");

          if(doctorID != null){
      
            fetch(`https://localhost:7036/api/Doctor/${doctorID}/schedule/${specialityID}`)
         .then( response => {
            return response.json() 
         }
       
        )
         .then(  data => {
          setAgenda(data);
          var scheduleAux=[];
          if(data.schedule.length > 0){
            console.log(data.schedule.length)
            reset({
              speciality:data.speciality,
              doctorID: localStorage.getItem("id"),
              schedule: data.schedule
            });
          }
         
         })
         .catch(error => console.error(error));
          }
      
    fetch(`https://localhost:7036/api/Doctor/${localStorage.getItem("id")}/speciality`)
    .then( response => {
       return response.json() 
    }
   )
    .then(  data => {
     setEspecialidades(data.data)
   return data;
    })
    .catch(error => console.error(error));

  },[]);

  




  function onSubmit(data) {


    data.schedule.map((item, k)=>{

          item.scheduleTime = item.scheduleTime.filter(s => s.time != false && s.time != true)

    })

    fetch(`https://localhost:7036/api/Doctor/schedule`, {
      method:  "POST",
      body: JSON.stringify(data),
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
     console.log("data",data);

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full text-center">
      <h1>Quadro de horário</h1>
      <p>
        Segue abaixo a configuração dos seus horários.
      </p>
      Especialidade da Agenda
      <select defaultValue={agenda && agenda.speciality} className="flex self-center" {...register("speciality")}>
        {especialidades && especialidades.map((item, index)=>{

            return (
                <option key={index} value={item.speciality} >{item.description}</option>
            )
        })}


    </select>
      <FieldArray
        {...{ control, register, defaultValues, getValues, setValue, errors,reset }}
      />

      <input type="submit" />
    </form>
  );
}
