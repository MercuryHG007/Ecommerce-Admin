import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        const { userId } = auth()
        const body = await req.json()
        const {
            label,
            labelColor,
            imageUrl
        } = body

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 })
        }

        if (!params.storeId) {
            return new NextResponse('StoreId is required', { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse('Unauthorised', { status: 403 })
        }

        if (!label) {
            return new NextResponse('Label is required', { status: 400 })
        }

        if (!labelColor) {
            return new NextResponse('LabelColor is required', { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse('ImageURL is required', { status: 400 })
        }

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                labelColor,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard)
    }
    catch (error: any) {
        console.log('[BILLBOARDS_POST]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) {
            return new NextResponse('StoreId is required', { status: 400 })
        }

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboards)
    }
    catch (error: any) {
        console.log('[BILLBOARDS_GET]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}