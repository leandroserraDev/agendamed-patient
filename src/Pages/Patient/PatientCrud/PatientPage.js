import { useSearchParams } from 'react-router-dom';
import PatientForm from './PatientForm.js'
import { useEffect, useState } from 'react';

export default function PatientPage(){


    return(<div className='flex h-[90vh]  '>
    <PatientForm />
    </div>)
}
