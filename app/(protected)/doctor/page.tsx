import { checkRole, getRole } from '@/utils/roles'
import { redirect } from 'next/dist/server/api-utils';
import React from 'react'



const DoctorDashboard = () => {
    const isDoctor = checkRole('DOCTOR');
    const role = getRole();

    if (!isDoctor) {
        redirect(`/${role}`)
    }
    return (
        <div>DoctorDashboard</div>
    )
}



export default DoctorDashboard
