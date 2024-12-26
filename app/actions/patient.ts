
"use server"

import db from "@/lib/db";
import { PatientFormSchema } from "@/lib/schema";
import { clerkClient } from "@clerk/nextjs/server";

export async function updatePatient(data: any, pid: string) {
    try {
        const validateData = PatientFormSchema.safeParse(data);
        if (!validateData.success) {
            return {
                sucess: false, error: true, msg: "Provide all Required fields",
                validationErrors: validateData.error.errors,
            };
        }
        const patientData = validateData.data;

        const client = await clerkClient();


        // Create a new Clerk user
        await client.users.updateUser(pid, {
            firstName: patientData.first_name,
            lastName: patientData.last_name,
        });


        await db.patient.update({
            data: {

                first_name: patientData.first_name,
                last_name: patientData.last_name,
                date_of_birth: patientData.date_of_birth,
                gender: patientData.gender,
                phone: patientData.phone,
                email: patientData.email,
                marital_status: patientData.marital_status,
                address: patientData.address,
                emergency_contact_name: patientData.emergency_contact_name,
                emergency_contact_number: patientData.emergency_contact_number,
                relation: patientData.relation,
                blood_group: patientData.blood_group || null, // Handle empty optional fields
                allergies: patientData.allergies || null,
                medical_conditions: patientData.medical_conditions || null,
                medical_history: patientData.medical_history || null,
                insurance_provider: patientData.insurance_provider || null,
                insurance_number: patientData.insurance_number || null,
                privacy_consent: patientData.privacy_consent,
                service_consent: patientData.service_consent,
                medical_consent: patientData.medical_consent,
                img: patientData.img || null, // Optional
            },
            where: { id: pid }
        });
        console.log(patientData);


        return {
            sucess: true,
            error: false,
            msg: "Patient update Successfully"
        }

    } catch (error: any) {
        console.log(error?.message)
        return { sucess: false, error: true, msg: error?.message };
    }

}
export async function createNewPatient(data: any, pid: string) {
    try {
        const validateData = PatientFormSchema.safeParse(data);
        if (!validateData.success) {
            return {
                sucess: false, error: true, msg: "Provide all Required fields",
                validationErrors: validateData.error.errors,
            };
        }
        const patientData = validateData.data;
        let patient_id = pid;
        // Initialize Clerk client
        const client = await clerkClient();

        if (pid === "new-patient") {
            // Create a new Clerk user
            const user = await client.users.createUser({
                emailAddress: [patientData.email],
                password: patientData.phone,
                firstName: patientData.first_name,
                lastName: patientData.last_name,
                publicMetadata: { role: "patient" },
            });

            patient_id = user?.id;
        } else {
            // Update existing Clerk user
            await client.users.updateUser(pid, {
                publicMetadata: { role: "patient" },
            });
        }
        await db.patient.create({
            data: {
                id: patient_id, // Clerk user ID
                first_name: patientData.first_name,
                last_name: patientData.last_name,
                date_of_birth: patientData.date_of_birth,
                gender: patientData.gender,
                phone: patientData.phone,
                email: patientData.email,
                marital_status: patientData.marital_status,
                address: patientData.address,
                emergency_contact_name: patientData.emergency_contact_name,
                emergency_contact_number: patientData.emergency_contact_number,
                relation: patientData.relation,
                blood_group: patientData.blood_group || null, // Handle empty optional fields
                allergies: patientData.allergies || null,
                medical_conditions: patientData.medical_conditions || null,
                medical_history: patientData.medical_history || null,
                insurance_provider: patientData.insurance_provider || null,
                insurance_number: patientData.insurance_number || null,
                privacy_consent: patientData.privacy_consent,
                service_consent: patientData.service_consent,
                medical_consent: patientData.medical_consent,
                img: patientData.img || null, // Optional
            }
        });
        console.log(patientData);


        return {
            sucess: true,
            error: false,
            msg: "Patient Created Successfully"
        }

    } catch (error: any) {
        console.log(error?.message)
        return { sucess: false, error: true, msg: error?.message };
    }

}