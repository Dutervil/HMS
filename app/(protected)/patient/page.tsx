
import { getPatientDashboardStatistic } from '@/utils/services/patient';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React, { } from 'react'



const PatientDashboard = async () => {







    const user = await currentUser();

    const { data, appointmentCount, last5Records, totalAppointments, availableDoctor, monthlyData } = await getPatientDashboardStatistic(user?.id);
    console.log("user data", data)

    if (!user && !data) {
        redirect("/patient/registration");
    }

    return (
        <div className="py-6 px-3 flex flex-col rounded-xl xl:flex-row gap-6">
            <div className='w-full xl:w-[69%]'>
                <div className="bg-white rounded-xl p-4 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1>Welcome {data?.first_name + " " + data?.last_name || user?.lastName} </h1>
                    </div>
                </div>
            </div>
            <div className='w-full xl:w-[30%]'>
                OTHER
            </div>

        </div>
    )
}



export default PatientDashboard
