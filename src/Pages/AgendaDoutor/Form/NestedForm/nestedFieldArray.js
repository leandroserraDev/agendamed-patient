import React, { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { MdDelete } from "react-icons/md";

export default ({ nestIndex, control, register }) => {
  const[hours, setHours] = useState([]);
  const { fields, remove, append } = useFieldArray({
    control,
    name: `schedule.${nestIndex}.scheduleHour`
  });
  
useEffect(()=>{
  var horas= [];
  for (var h = 10; h < (18 ); h++) {
      horas.push({ horaNumero: h, horaExibicao: (h + ":00").substring(-2) });
      horas.push({ horaNumero: h+30, horaExibicao: h.toString().substring(-2) + ':30' });
  }
  setHours(horas);

    

},[])

console.log(hours)
   

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
                <div className="w-full" key={item.horaExibicao}>
                <input className="m-2" type="checkbox"
                defaultValue={item.horaExibicao}
                {...register(`schedule.${nestIndex}.scheduleHour.${k}.hour`)}/>
                {item.horaExibicao}
                
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
