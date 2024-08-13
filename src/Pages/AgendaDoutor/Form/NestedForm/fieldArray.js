import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import NestedArray from "./nestedFieldArray";
import '../../../../input.css';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
let renderCount = 0;

export default function Fields({ control, register, setValue, getValues }) {
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
  renderCount++;

  return (
    <div className="flex flex-col">
      Dia da Semana
      <ul>
        {fields.map((item, index) => {
          return (
            
            <li key={item.id}>
              <select  {...register(`schedule.${index}.dayOfWeek`)}>
              <option value="" disabled selected>Selecione uma opção</option>

                {
                  dayName.map((item, index)=>{
                    return(
                    <option value={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
              <NestedArray nestIndex={index} {...{ control, register }} />
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
          append
        </button>

        {/* <button
          type="button"
          onClick={() => {
            setValue("test", [
              ...(getValues().test || []),
              {
                name: "append",
                nestedArray: [{ field1: "append", field2: "append" }]
              }
            ]);
          }}
        >
          Append Nested
        </button> */}

        {/* <button
          type="button"
          onClick={() => {
            prepend({ name: "append" });
          }}
        >
          prepend
        </button> */}

        {/* <button
          type="button"
          onClick={() => {
            setValue("schedule", [
              {
                name: "dayOfWeek",
                nestedArray: []
              },
              ...(getValues().test || [])
            ]);
          }}
        >
          prepend Nested
        </button> */}
      </section>

      <span className="counter">Render Count: {renderCount}</span>
    </div>
  );
}
