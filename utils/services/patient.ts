import db from "@/lib/db";




export async function getPatientDashboardStatistic(id: string) {

    try {

        if (!id) {
            return { success: false, message: "No Data Found", status: 404, data: null };
        }

        const data = await db.patient.findUnique({
            where: { id },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                gender: true,
                img: true
            }
        })
        if (!data) {
            return { success: false, message: "Patient not found", status: 404, data: null };

        }

        const appointments = db.appointment.findMany({
            where: { patient_id: data?.id },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        img: true,
                        specialization: true
                    }
                }
            },
            orderBy: { appointment_date: 'desc' }
        })
        // TODO: Process appointment info

        return {
            success: true,
            status: 202, data,
            appointmentCount: null,
            totalAppointments: (await appointments).length,
            availableDoctor: null,
            last5Records: null,
            monthlyData: null
        };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Internal Server Error", status: 500 };
    }

}

export async function getPatientById(id: string) {

    try {
        const patient = await db.patient.findUnique({
            where: { id }
        });
        if (!patient) {
            return { success: false, message: "Patient not found", status: 404, data: null };
        }
        return { success: true, status: 202, data: patient };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Internal Server Error", status: 500 };
    }

}