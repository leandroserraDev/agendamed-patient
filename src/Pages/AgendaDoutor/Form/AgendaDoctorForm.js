import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FieldArray from './NestedForm/fieldArray.js';
import '../../../input.css';
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AgendaDoctorForm() {

  const[especialidades, setEspecialidades] = useState([]);



  useEffect(() =>{
    
  const doctorID = localStorage.getItem("id");
  console.log(doctorID);
    fetch(`https://localhost:7036/api/Doctor/${localStorage.getItem("id")}/speciality`)
    .then( response => {
       return response.json() 
    }
   
   )
    .then(  data => {
   console.log(data)
   console.log(data.data)
   console.log(data.data)

     setEspecialidades(data.data)
   return data;
    })
    .catch(error => console.error(error));
    
  },[]);

  const defaultValues = {
    speciality:"1",
    doctorID: localStorage.getItem("id"),
    schedule: [
      {
        scheduleHour:[{}]
      }
    ]
  };
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue
  } = useForm({defaultValues:defaultValues});

  

  function onSubmit(data) {

    data.schedule.map((item, k)=>{
      item.scheduleHour.map((item2, index)=>{

          item.scheduleHour = item.scheduleHour.filter(s => s.hour != false && s.hour != true)

      })
    })
     console.log("data",data.schedule);

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full text-center">
      <h1>Quadro de horário</h1>
      <p>
        Segue abaixo a configuração dos seus horários.
      </p>
      Especialidade da Agenda
      <select className="flex self-center" {...register("speciality")}>
        {especialidades && especialidades.map((item, index)=>{

            return (
                <option key={index} value={item.speciality} >{item.description}</option>
            )
        })}


    </select>
      <FieldArray
        {...{ control, register, defaultValues, getValues, setValue, errors }}
      />

      <button type="button" onClick={() => reset(defaultValues)}>
        Reset
      </button>

      <input type="submit" />
    </form>
  );
}
