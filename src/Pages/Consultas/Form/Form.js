import { useNavigate } from 'react-router-dom';
import '../../../input.css'
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';
import moment from 'moment';

function Form({data}){

    const navigate = useNavigate();
    const { register, control, handleSubmit, reset, trigger, setError,getValues} = useForm({
    });
    const[doctors, setDoctors] = useState([]);
    const[schedule, setSchedule] = useState([]); 

    const[errorAPI, setErrorAPI] = useState([]);

    async function submitData(data){
       console.log(data)
    }

    const  GetDoctorBySpecialitySelected=()=>{
      var getValue =getValues();
      fetch(`https://localhost:7036/api/Doctor/speciality/${getValue.specialityID}`)
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
    function  GetHourScheduleDoctorDay(){
      var getValue = getValues();
      console.log(moment(getValue.data).format())

      console.log(getValue);
      fetch(`https://localhost:7036/api/Doctor/scheduleTime?` + new URLSearchParams({
        doctorID: getValue.doctorID,
        specialityID: getValue.specialityID,
        data: getValue.data
    }).toString())

      .then( response => {

         return response.json() 
      }
    
    )
      .then(  data => {
        console.log(data)
        setSchedule(data.data)
    
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
           
            {...register("specialityID",  {  required: "Please enter your email." }) } // custom message
            onChange={e =>{
             GetDoctorBySpecialitySelected()
            }}
          
          >
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
          className='
          pl-2
           self-center
           h-[25px]
       "block  rounded-md border-0 mb-4  w-[90%] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-white focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
           '
         

           type='date'
            {...register("data",  {  required: "Please enter your email." })} // custom message
            onChange={e =>{
              GetHourScheduleDoctorDay()
             }}
          />

<label for="Email" class="block mb-1 ml-4 text-sm font-medium text-gray-900 dark:text-white">Horários</label>
          <select
          className='
          pl-2
           self-center
           h-[25px]
       "block  rounded-md border-0 mb-4  w-[90%] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-white focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
           '
           type='email'
            {...register("email",  {  required: "Please enter your email." })} // custom message
          >
            {schedule.scheduleTime && schedule.scheduleTime.map((item,k)=>{
              return(
                <option key={k} value={item.time}>
                    {item.time}
                </option>
              )
            }) }
            </select>
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
)
}

export default Form;