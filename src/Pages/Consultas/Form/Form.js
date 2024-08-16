import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../../input.css'
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';
import moment from 'moment';
import { parse, set } from 'date-fns';


function Form(){

    const navigate = useNavigate();
    const { register, control, handleSubmit, reset, trigger, setError,getValues} = useForm({
    });
    const[doctors, setDoctors] = useState([]);
    const[schedule, setSchedule] = useState([]); 
    const[consulta, setConsulta] = useState([]);

    const[errorAPI, setErrorAPI] = useState([]);
    const[searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{

      if(searchParams.get("id") != null){

        fetch(`${process.env.REACT_APP_URI_API}/patient/appointment/${searchParams.get("id")}`)
        .then( response => {
           return response.json() 
        }
      
       )
        .then(  data => {
          setConsulta(data.data)
           reset({
            specialityID:data.data.specialityID,
            doctorID:data.data.doctorID,
            data: moment(data.data.date).format("YYYY-MM-DD"),
            hora: data.data.date.split("T")[1]
           });
           GetDoctorBySpecialitySelected();
           GetHourScheduleDoctorDay();
        })
        .catch(error => console.error(error));
   

      }


    },[])
    async function submitData(data){
      var newDate ={
        data:data.data,
        doctorID:data.doctorID,
        patientID: localStorage.getItem("id"),
        dateAppointment: data.data + "T" +data.hora,
        hora:data.hora,
        SpecialityID: data.specialityID

      }

      fetch(`${process.env.REACT_APP_URI_API}/Appointment`, {
        method: `POST`,
        body: JSON.stringify(newDate),
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
  
         if(data.success){
          alert(consulta != null ? "Editado" : "Cadastrado")
          navigate({pathname:"/home"})
  
         }
  
         setErrorAPI(data)
    
      })
      .catch(error => console.error(error));
       console.log(newDate)
    }
    
    function CancelAppointment(){
      console.log(consulta.id)
      fetch(`${process.env.REACT_APP_URI_API}/Appointment/${consulta.id}`,{
        method:"PATCH",
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
       alert("Consulta cancelada");
       navigate({pathname:"/consultas"})
    
      })
      .catch(error => console.error(error));
    }
    function Reagendar(){
      var newData ={
        data:getValues().data,
        doctorID:getValues().doctorID,
        patientID: localStorage.getItem("id"),
        dateAppointment: getValues().data + "T" +getValues().hora,
        hora:getValues().hora,
        SpecialityID: getValues().specialityID

      }
      fetch(`${process.env.REACT_APP_URI_API}/Appointment/${searchParams.get("id")}/reagendar`, {
        method: `PUT`,
        body: JSON.stringify(newData),
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
  
         if(data.success){
          alert(consulta != null ? "Editado" : "Cadastrado")
          navigate({pathname:"/home"})
  
         }
  
         setErrorAPI(data)
    
      })
      .catch(error => console.error(error));
    }
    

    const  GetDoctorBySpecialitySelected=()=>{
      var getValue =getValues();

      if(getValue !=null){

      fetch(`${process.env.REACT_APP_URI_API}/Doctor/speciality/${getValue.specialityID}`)
      .then( response => {
         return response.json() 
      }
    
    )
      .then(  data => {
        console.log(data)
         setDoctors(data.data)
    
      })
      .catch(error => console.error(error));
    }

    }
    function  GetHourScheduleDoctorDay(){
      
      var getValue = getValues();

      fetch(`${process.env.REACT_APP_URI_API}/Doctor/scheduleTime?` + new URLSearchParams({
        doctorID: getValue.doctorID,
        specialityID: getValue.specialityID,
        data: getValue.data
    }).toString())

      .then( response => {

         return response.json() 
      }
    
    )
      .then(  data => {
console.log(data);

        if(data.success){
        data.data.scheduleTime.push({time:getValues().hora});

          setSchedule(data.data)
          setErrorAPI([])

        }else{

          setSchedule([])
       setErrorAPI(data)

        }
      })
      .catch(error => console.error(error));
    }
    return(
      <div className="flex flex-row w-full justify-center items-center ">

        <form className="flex flex-col  w-[300px] border border-black rounded p-3 " onSubmit={handleSubmit(data =>submitData(data))}>
          <ul className="flex flex-col">

          <label for="Nome" class="block mb-1 ml-4 text-sm font-medium text-gray-900 dark:text-white">Especialidade</label>
          <select

          className='
          pl-2
           self-center
           h-[25px]
       "block  rounded-md border-0 mb-4  w-[90%] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-white focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
           '
           disabled={searchParams.get("id")}
           defaultValue={consulta.specialityID}
            {...register("specialityID",  {  required: "Please enter your email." }) } // custom message
            onChange={() =>{


             GetDoctorBySpecialitySelected()
            }}
          
          >
              <option 
            selected
            disabled
            value={0}>
            Selecione uma opção
            </option>
            <option 
            
            value={1}>
            Geral
            </option>
            <option value={2}>
            Ortopedista
            </option>
            <option value={3}>
            Pediatra
            </option>
            </select>

<label for="Email" class="block mb-1 ml-4 text-sm font-medium text-gray-900 dark:text-white">Médicos</label>
          <select
                    defaultValue={consulta.doctorID}
                    value={consulta.doctorID}
             disabled={searchParams.get("id")}
          className='
          pl-2
           self-center
           h-[25px]
       "block  rounded-md border-0 mb-4  w-[90%] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-white focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
           '
           type='email'
            {...register("doctorID",  {  required: "Please enter your email." })} // custom message
          
          >
            <option  selected>
              Selecione um valor
            </option>

            {doctors && doctors.map((item,k)=>{
              return(
                <option key={k} value={item.id}>
                    {item.nome}
                </option>
              )
            }) }

            </select>

<label for="Data" class="block mb-1 ml-4 text-sm font-medium text-gray-900 dark:text-white">Data</label>
          

          <input
           disabled={!searchParams.get("reagendar") && searchParams.get("id") != null }
          defaultValue={consulta.dataAppointment}
          value={consulta.dateAppointment}
          min={new Date().toISOString().split('T')[0]}
          className='
          pl-2
           self-center
           h-[25px]
       "block  rounded-md border-0 mb-4  w-[90%] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-white focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
           '
         

           {...register("data",  {  required: "Please enter your email." })} // custom message
           onSelect={(e) =>{

             GetHourScheduleDoctorDay()

           }
            }

         
           type='date'
          
          />
 

<label for="Email" class="block mb-1 ml-4 text-sm font-medium text-gray-900 dark:text-white">Horários</label>
          <select
                defaultValue={getValues().hora}
             


     disabled={!searchParams.get("reagendar") && searchParams.get("id") != null }
          className='
          pl-2
           self-center
           h-[25px]
       "block  rounded-md border-0 mb-4  w-[90%] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-white focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
           '
          
            {...register("hora",  {  required: "Please enter your email." })} // custom message
          >

            { schedule != null && schedule.scheduleTime && schedule.scheduleTime.map((item,k)=>{
              return(
                
                <option 
                
                key={k} value={item.time}>
                    {item.time}
                </option>
              )
            }) }
            </select>
          </ul>
          <div className='flex flex-row justify-center pr-1'>
          
          <button type="submit" 
          hidden={consulta.id != null}
          className='border mr-1 rounded-md bg-blue-100 hover:bg-blue-200 duration-300 p-1' >
          Enviar
            
            </button>
         
          </div>
          <button type='button' 
              onClick={(e)=>{
              if(searchParams.get("reagendar")){
                Reagendar()
                
              }else{
                CancelAppointment()

              }
              
              }}

            hidden={consulta.id == null} className='border ml-1  rounded-md bg-blue-100 hover:bg-blue-200 duration-300 p-1  ' >
         {searchParams.get("reagendar") ? "Reagendar": "Cancelar Consulta" }
            </button>
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
)
}

export default Form;