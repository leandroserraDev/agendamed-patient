
import ItemTableAgenda from './ItemTableAgenda.js';

function TableAgendaDoutor({agenda}){

    return (
    <div className=" absolute w-full h-full">
        
        <div className="flex flex-col justify-center content-center">


<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Especialidade
                </th>
               
            </tr>
        </thead>
        {agenda && agenda.map((item, index) =>{
                return(
                    <ItemTableAgenda key={index} data={item}/>   
                )

            })}
    </table>
</div>
</div>

    </div>
    )

}

export default TableAgendaDoutor;