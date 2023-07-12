'use client'

import { useParams, useRouter } from "next/navigation"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export const BillboardClient = () => {
    
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div
                className="flex items-center justify-between "
            >
                <Heading
                    title="Billboards (0)"
                    description="Manage billboards of your store."
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/billboards/new`)}
                >
                    <PlusIcon
                        className="mr-2 h-4 w-4"
                        size='icon'
                    />
                    Add New
                </Button>
            </div>
            <Separator />
        </>
    )
}