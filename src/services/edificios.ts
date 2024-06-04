'use server'
import { PrismaClient } from "@prisma/client"
/* import { NextResponse } from "next/server" */

const prisma = new PrismaClient()
//--------------------------------------------------
//////////////-----------------
// -----------------modifique esto ---------------
export const addEdificio = async (edificio: any, ancho: number, largo: number) => {
    const ed = await prisma.edificios.create({
        data: {
            ...edificio,
            ancho: ancho,
            largo: largo
        }
    });  
    return ed;
}
///--------------------------------------------
//------------------------------ esto modifique completo
//----------------------------------------------

export async function getEdificios(): Promise<any[]> {
    try {
        const edificios = await prisma.edificios.findMany({
            select: {
                id: true,
                name: true,
                ancho: true,
                largo: true,
                costo: true,
                cantidad: true,
                descripcion: true,
                // otros campos que necesites
            },
        });
        return edificios;
    } catch (error) {
        console.error("Error fetching edificios:", error);
        throw error;
    }
}






export const getEdificioById = async (Id: string) => {
    const edif = await prisma.edificios.findFirst({
        where:{
            id: Id
        }
    })
    return edif
}
export const getEdificioByName = async (Name: string) => {
    const edif = await prisma.edificios.findFirst({
        where:{
            name: Name
        }
    })
    return edif
}

// parece que no lo uso --seba
export const updateEdificioUltimaInteraccion = async (Id:any, UltimaInteraccion: any) => {
await prisma.edificios.update({
    where:{
        id:Id
    },
    data:{
        ultimaInteraccion: UltimaInteraccion
    }
})
}

export const deleteEdificios = async (Id:string) => {
    await prisma.edificios.delete({
        where:{
            id:Id
        }
    })    
    return true
}
export const getOneEdificio = async (Id:string) => {
    const e = await prisma.edificios.findUnique({
        where:{
            id:Id
        }
    })  
    return e
}


/* export const getRecursos = async () => {
    const muchos = await prisma.recursos.findMany()  
    console.log(muchos)        
    return muchos
}
export const addRecurso = async (recurso:any) => {
    const ed = await prisma.recursos.create({
        data: recurso
    })  
    return ed
}
export const deleteRecur = async (Id:string) => {
    await prisma.recursos.delete({
        where:{
            id:Id
        }
    })    
    return true
}
 */


  /* async function crearE() {

    //aca se crean las colecciones para la base de datos
     const torretas = await prisma.edificios.create({
        data:{
            name: 'Cañon',
            nivel: 0
        },
    })
    const ayunta = await prisma.edificios.create({
        data:{
            name: 'Ayuntamiento',
            nivel: 0
        }
    })
    const muros = await prisma.edificios.create({
        data:{
            name: 'Muros',
            nivel: 0
        }
    })
    const herreria = await prisma.edificios.create({
        data:{
            name: 'Herrería',
            nivel: 0
        }
    })
    const cantera = await prisma.edificios.create({
        data:{
            name: 'Cantera',
            nivel: 0
        }
    })
    const maderera = await prisma.edificios.create({
        data:{
            name: 'Maderera',
            nivel: 0
        }
    })
    const bosque = await prisma.edificios.create({
        data:{
            name: 'Bosque',
            nivel: 0
        }
    })
    const arr = [torretas, ayunta,muros, herreria, cantera, maderera, bosque] 
    return arr
}

export default crearE()    */