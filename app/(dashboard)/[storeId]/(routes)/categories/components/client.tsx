'use client'

import { useParams, useRouter } from "next/navigation"
import { PlusIcon } from "lucide-react"
import { Category } from "@prisma/client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"
import { CategoryColumn, columns } from "./columns"

interface CategoryClientProps {
    data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
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
                    title={`Categories (${data.length})`}
                    description="Manage categories of your store."
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/categories/new`)}
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
                description="API calls for Categories"
            />
            <Separator />
            <ApiList
                entityName="categories"
                entityIdName="categoryId"
            />
        </>
    )
}