import { useState } from 'react';
import '../../../input.css'
import Form from './Form.js';
import { set } from 'date-fns';

export default function FormPage(){
const[novoUsuario, setNovoUsuario]= useState(false);

    return(
        <div className='flex flex-col  justify-center h-[100vh] w-full '>
     
        <Form/>
       
        </div>
    )
}