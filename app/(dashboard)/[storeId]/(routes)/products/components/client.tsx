'use client'

import { useParams, useRouter } from "next/navigation"
import { PlusIcon } from "lucide-react"
import { Product } from "@prisma/client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"
import { ProductColumn, columns } from "./columns"

interface ProductClientProps {
    data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {

    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div
                className="flex items-center justify-between "
            >
                <Heading
                    title={`Products (${data.length})`}
                    description="Manage products of your store."
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/products/new`)}
                >
                    <PlusIcon
                        className="mr-2 h-4 w-4"
                        size='icon'
                    />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                searchKey="name"
            />
            <Heading
                title="APIs"
                description="API calls for Products"
            />
            <Separator />
            <ApiList
                entityName="products"
                entityIdName="productId"
            />
        </>
    )
}