import { useSearchParams } from 'react-router-dom';
import AgendaDoctorForm from './AgendaDoctorForm';
import { useEffect, useState } from 'react';
export default function EspecialidadeDoctorPage(){

    const [searchParams, setSearchParams] = useSearchParams();
    const [agenda, setAgenda] = useState([]);
    

     

    return(<>
    <AgendaDoctorForm />
    </>)
}
