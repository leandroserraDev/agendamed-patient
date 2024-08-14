
import { es } from 'date-fns/locale/es';
import ItemTableEspecialidade from './ItemTableEspecialidade.js';

function TableEspecialidade({especialidades}){

    return (
    <div className=" absolute w-full h-full">
        
        <div className="flex flex-col justify-center content-center">


<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Nome
                </th>
                <th scope="col" className="px-6 py-3">
                    Descrição
                </th>
                <th scope="col" className="px-6 py-3">
                    Ativo
                </th>
            </tr>
        </thead>
        {especialidades && especialidades.map((item, index) =>{
                return(
                    <ItemTableEspecialidade key={index} data={item}/>   
                )

            })}
    </table>
</div>
</div>

    </div>
    )

}

export default TableEspecialidade;