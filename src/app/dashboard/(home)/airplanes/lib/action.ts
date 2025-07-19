"use server"

import type { ActionResult } from "@/app/dashboard/(auth)/login/form/actions";
import { airplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { deleteFile, uploadFile } from "@/lib/supabase";
import prisma from "../../../../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { Airplane } from "@prisma/client";
import { lucia } from "@/lib/auth";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Catamaran } from "next/font/google";

export async function getAirplaneById(id: string): Promise<Airplane | null> {
    try {
        const airplaneData = await prisma.airplane.findFirst({
            where: {
                id: id
            }
        })
        return airplaneData
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function addAirplane(prevState: any, formData: FormData): Promise<ActionResult> {
    const image = formData.get("image");
    const name = formData.get("name");
    const code = formData.get("code");

    console.log("code is: " + code);

    const values = airplaneFormSchema.safeParse({
        name: name,
        image: image,
        code: code
    });

    if (!values.success) {
        const errorDesc = values.error.issues.map(issue => issue.message)

        return {
            errorTitle: 'Validation Error',
            errorDesc: errorDesc
        }
    }

    const fileUpload = await uploadFile(values.data.image)

    if (fileUpload instanceof Error) {
        return {
            errorTitle: "Uploading Images Error",
            errorDesc: ["There is an error while connecting to database. Try again later..."]
        }
    }

    try {
        const data = await prisma.airplane.create({
            data: {
                name: values.data.name,
                code: values.data.code,
                image: fileUpload as string
            }
        })
    } catch (error) {
        return {
            errorTitle: "Inserting Error",
            errorDesc: ["Error while inserting airplane data. Try again later..."]
        }
    }

    revalidatePath('/dashboard/airplanes')
    redirect('/dashboard/airplanes')
}

export async function editAirplane(
    prevState: any,
    formData: FormData,
    id: string
): Promise<ActionResult> {
    const image = formData.get('image') as File
    const name = formData.get("name");
    const code = formData.get("code");

    console.log("Image object:", image);
    console.log("Image name:", image.name);
    console.log("Image size:", image.size);
    console.log("Image type:", image.type);


    let airplaneFormSchemaUpdate;

    if (image.size === 0) {
        console.log("no image!!!!!!")
        airplaneFormSchemaUpdate = airplaneFormSchema.omit({ image: true })
    } else {
        console.log("there's image!!!!!!")
        airplaneFormSchemaUpdate = airplaneFormSchema
    }

    const values = airplaneFormSchemaUpdate.safeParse({
        name: name,
        image: image,
        code: code
    });

    if (!values.success) {
        const errorDesc = values.error.issues.map(issue => issue.message)

        return {
            errorTitle: 'Validation Error',
            errorDesc: errorDesc
        }
    }

    let fileName;

    if (image.size > 0) {
        const uploadedFile = await uploadFile(image)
        if (uploadFile instanceof Error) {
            return {
                errorTitle: "Uploading images error",
                errorDesc: ["There is an error while connecting to database. Try again later..."]
            }
        }

        fileName = uploadedFile as string;
    } else {
        const airplane = await prisma.airplane.findFirst({
            where: { id: id },
            select: {
                image: true
            }
        })
        fileName = airplane?.image
    }

    try {
        await prisma.airplane.update({
            where: { id: id },
            data: {
                name: values.data.name,
                code: values.data.code,
                image: fileName as string
            }
        })
    } catch (error) {
        return {
            errorTitle: "Inserting Error",
            errorDesc: ["Error while inserting airplane data. Try again later..."]
        }
    }

    revalidatePath('/dashboard/airplanes')
    redirect('/dashboard/airplanes')
}

export async function deleteAirplane(id: string): Promise<ActionResult | undefined>{
    const data = await prisma.airplane.findFirst({
        where: {id: id}
    })
    if(!data){
        return {
            errorTitle: "Data Not Found",
            errorDesc: ["Error while getting data. Try again later..."]
        }
    }

    const deletedFile = await deleteFile(data?.image)

    if(deletedFile instanceof Error){
        return{
            errorTitle: "Failed To Delete",
            errorDesc: ["Error in deleting data. Try again later..."]
        }
    }

    try{
        await prisma.airplane.delete({
            where:{id: id}
        })
    }catch (error){
        console.log(error)
        return
    }

    revalidatePath('/dashboard/airplane')
}