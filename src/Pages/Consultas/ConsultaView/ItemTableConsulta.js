import { useNavigate , createSearchParams, Navigate } from "react-router-dom";
import dayjs from "dayjs";
function ItemTableConsulta({data}){
    const navigate =  useNavigate();

    const gotoConsulta = () =>
        navigate({
          pathname: '/agendar-consulta',
          search: `${createSearchParams(
            {
                id: data.id
          })}`,
        });
        const goToReagendar = () =>
            navigate({
              pathname: '/agendar-consulta',
              search: `${createSearchParams(
                {
                    id: data.id,
                    reagendar: true
              })}`,
            });
    return (
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {data.speciality.name}
                </td>

                <td className="px-6 py-4">
                {data.doctor.name + " " + data.doctor.lastName}
                </td>

                <td className="px-6 py-4">
                    { dayjs(data.date).locale("pt-br").format("DD/MM/YYYY hh:mm:ss")}
                </td>
                <td className="px-6 py-4">
                {data.deleted ? "Cancelada": " Ativa"}
                </td>

                <td className="px-6 py-4 text-right">
                
                <button  hidden={data.deleted}     onClick={goToReagendar}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Reagendar</button>
            
            
            </td>

                <td className="px-6 py-4 text-right">
                
                    <button  hidden={data.deleted}     onClick={gotoConsulta}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Cancelar</button>
                
                
                </td>
            </tr>
        </tbody>
   )
}

export default ItemTableConsulta;