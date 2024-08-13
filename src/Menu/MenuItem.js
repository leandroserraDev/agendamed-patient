import '../input.css';
import { IoHome, IoPeople  } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { GrSchedule } from "react-icons/gr";



function MenuItem(){

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
        <a href='/especialidades/doctor' className=' flex border-b-2 items-center '>
            <div className=' ml-4'>
            <IoPeople className=''/>
            </div>

            <span className='w-full '>
            Especialidades
            </span>

            

        </a>

        </div>
        <div className=' w-full hover:scale-105 duration-300' >
        <a href='/agendas' className=' flex border-b-2 items-center '>
            <div className=' ml-4'>
            <GrSchedule className=''/>
            </div>

            <span className='w-full '>
            Agenda
            </span>

            

        </a>

        </div>
        <div className=' w-full hover:scale-105 duration-300' >
        <a href='/agenda' className=' flex border-b-2 items-center '>
            <div className=' ml-4 '>
            <RiCalendarScheduleFill className=''/>
            </div>

            <span className='w-full '>
            Agendamentos
            </span>

            

        </a>

        </div>
               
    
    </div>
    )
}

export default MenuItem;