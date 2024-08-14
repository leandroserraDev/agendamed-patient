import React, { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

export default ({ nestIndex, control, register, reset, data }) => {
  const[hours, setHours] = useState([]);

  const { fields, remove, append } = useFieldArray({
    control,
    name: `schedule.${nestIndex}.scheduleTime`
  });
  const[searchParams, setSearchParams] = useSearchParams();
  
useEffect(()=>{
console.log(fields)
reset({
  doctorID: localStorage.getItem("id")
});

var horas= [];
  for (var h = 10; h < (18 ); h++) {

    var horaInteira = (h + ":00").substring(-2);
    var horaEMeia =  h.toString().substring(-2) + ':30';


      horas.push({ horaNumero: h, horaExibicao: (h + ":00").substring(-2) });

      horas.push({ horaNumero: h+30, horaExibicao: h.toString().substring(-2) + ':30' });
    
    
  };
  setHours(horas);

},[])

function findArrayElementByEdit(array, hora) {
  return array.find((element) => {
    return element.time === hora;
  })
}

function RemoveHour (hour){
  console.log(hour)
  var index = hours.indexOf(hour)
  console.log(index);
}

  return (
    <div className="flex flex-col">
    
      
      <div className="flex  justify-center">

    
        
          <div className="w-full" style={{ marginLeft: 20 }}>
   
            <br></br>
            <div className="grid grid-cols-4 w-full">
            { hours && hours.map((item, k)=>{
              return(
                <div className="w-full" key={item.time}>
                <input className="m-2" 
                value={
                  fields.filter(obj =>obj.time == item.horaExibicao).length >0 ? 

                  fields.find((element) => element.time == item.horaExibicao).time
                :
                item.horaExibicao
                
              } 
              defaultChecked={
                fields.filter(obj =>obj.time == item.horaExibicao).length >0 ? 

                true
                :
                false
                
              } 

      
                type="checkbox"  {...register(`schedule.${nestIndex}.scheduleTime.${k}.time`)}/>
               {
                item.horaExibicao}
                </div>
               
              
              )
            })}

            </div>
          
          </div>
      </div>

      {/* <button
        type="button"
        onClick={() =>
          append({hour:null})
        }
      >
        Append Nested
      </button> */}

      <hr />
    </div>
  );
};
