import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        }
    })

    if(!store){
        return
    }

    return {
      title: `${store?.name} | Dashboard`,
    };
}

export default async function DashboardLayout ({
    children,
    params
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) {
    const { userId } = auth()
    if(!userId){
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    if(!store){
        redirect('/')
    }

    return (
        <>
            <div> NAVBAR </div>
            {children}
        </>        
    )
}