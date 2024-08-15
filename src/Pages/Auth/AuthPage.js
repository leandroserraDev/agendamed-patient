import { useState } from 'react';
import Login from './Login.js'
import '../../input.css';
import CreateUser from './CreateUser.js';
import { set } from 'date-fns';

export default function AuthPage(){
const[novoUsuario, setNovoUsuario]= useState(false);
    return(
        <div className='flex flex-col  justify-center h-[100vh] w-full '>

        <div className='flex self-center m-2 '>

            <button className='
            mr-1
    bg-slate-300
p-1 rounded 
hover:transition-all
hover:scale-105
hover:duration-300
hover:bg-blue-100
          
          ' onClick={()=> setNovoUsuario(false)}>
            Login
        </button>
        <button className='
    bg-slate-300
p-1 rounded 
hover:transition-all
hover:scale-105
hover:duration-300
hover:bg-blue-100
          
          ' onClick={() => setNovoUsuario(true)}> 
              Novo Usuario
          </button>
        </div>

        {novoUsuario? <CreateUser/>: 
       <Login/>
        
        }
       
        </div>
    )
}