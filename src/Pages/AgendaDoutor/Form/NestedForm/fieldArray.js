import React, { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import NestedArray from "./nestedFieldArray";
import '../../../../input.css';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useSearchParams } from "react-router-dom";
let renderCount = 0;

export default function Fields({ control, register, setValue, getValues,reset}) {
  const[searchParams, setSearchParams] = useSearchParams();
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "schedule"
  });


 const dayName =[

 {
  id: 1,
  name:"Segunda-Feira"

 },
 {
  id: 2,
  name:"Terça-Feira"

 },
 {
  id: 3,
  name:"Quarta-Feira"

 },
 {
  id: 4,
  name:"Quinta-Feira"

 },
 {
  id: 5,
  name:"Sexta-Feira"

 }
] 


  return (
    <div className="flex flex-col">
      Dia da Semana
      <ul>
        {fields.map((item, index) => {
          return (
            
            <li key={item.id}>
              <select  
              defaultValue={item.dayOfWeek}   {...register(`schedule.${index}.dayOfWeek`)}>
              <option disabled  selected>Selecione uma opção</option>

                {
                  dayName.map((item, index)=>{
                    return(
                      <>
                         {
                          
                         fields.filter(obj => obj.dayOfWeek == item.id
                          

                         ).length <=0 ?
                         
                        <option key={item.id} value={item.id}>{item.name}</option>
:
<option disabled={true} key={item.id} value={item.id}>{item.name}</option>


                        }
                      </>
                   

                    )
                  })
                }
              </select>

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
              <NestedArray nestIndex={index} {...{ control, register,reset,  }} />
            </li>
          );
        })}
      </ul>

      <section>
        <button

          type="button"
          onClick={() => {
            append();
          }}
        >
          +
        </button>

       
      </section>

    </div>
  );
}
