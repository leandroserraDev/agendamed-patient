import '../input.css';
import { IoHome, IoPeople  } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { GrSchedule } from "react-icons/gr";
import { IoPersonSharp } from "react-icons/io5";





function MenuItem(){

    function Logout(){
        localStorage.clear();
    }

    return  (
        <div 
        className='flex flex-col  text-center'
        > 
       <div className=' w-full hover:scale-105 duration-300 ' >
        <a href='/' className=' flex border-b-2 items-center  '>
            <div className=' ml-4  '>
            <IoHome className=' '/>

            </div>

            <span className='w-full  '>
            Início
            </span>
        </a>

        </div>

       
        <div className=' w-full hover:scale-105 duration-300' >
        <a href='/consultas' className=' flex border-b-2 items-center '>
            <div className=' ml-4 '>
            <RiCalendarScheduleFill className=''/>
            </div>

            <span className='w-full '>
            Consultas
            </span>

            

        </a>

        </div>

        <div className=' w-full hover:scale-105 duration-300' >
        <a href='/meus-dados' className=' flex border-b-2 items-center '>
            <div className=' ml-4 '>
            <IoPersonSharp className=''/>
            </div>

            <span className='w-full '>
            Meus dados
            </span>

            

        </a>

        </div>

        <div className=' w-full hover:scale-105 duration-300' >
        <a href='/' onClick={() =>Logout()} className=' flex border-b-2 items-center '>
            <div className=' ml-4 '>
            <IoPersonSharp className=''/>
            </div>

            <span className='w-full '>
            Sair
            </span>

            

        </a>

        </div>
               
    
    </div>
    )
}

export default MenuItem;