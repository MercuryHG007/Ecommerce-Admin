'use client'

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Size } from "@prisma/client"
import { useForm } from "react-hook-form"
import { Trash } from "lucide-react"
import { toast } from "react-hot-toast"

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { AlertModal } from "@/components/modals/alert-modal"

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type SizeFormValues = z.infer<typeof formSchema>

interface SizeFormProps {
    initialData: Size | null
}

export const SizeForm: React.FC<SizeFormProps> = ({
    initialData
}) => {

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    })

    const params = useParams()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const title = initialData ? 'Edit size' : 'Create size'
    const description = initialData ? 'Edit the size for the store.' : 'Add a new size for the store.'
    const toastMessage = initialData ? 'Size updated successfully!' : 'Size added successfully!'
    const actionLabel = initialData ? 'Save Changes' : 'Create'

    const onSubmit = async (data: SizeFormValues) => {
        try {
            setIsLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
            }
            else {
                await axios.post(`/api/${params.storeId}/sizes`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage)
        }
        catch (error) {
            toast.error('Something went wrong!')
        }
        finally {
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success('Size deleted successfully!')
        }
        catch (error) {
            toast.error('Make sure you remove all products using this size first!')
        }
        finally {
            setIsLoading(false)
            setIsOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={onDelete}
                isLoading={isLoading}
            />
            <div
                className="flex items-center justify-between"
            >
                <Heading
                    title={title}
                    description={description}
                />
                {
                    initialData && (
                        <Button
                            disabled={isLoading}
                            variant="destructive"
                            size="icon"
                            onClick={() => setIsOpen(true)}
                        >
                            <Trash
                                className="h-4 w-4"
                            />
                        </Button>
                    )
                }
            </div>
            <Separator />
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full "
                >
                    
                    <div
                        className="grid grid-cols-3 gap-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Size Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Size Value"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={isLoading}
                        className="ml-auto"
                        type="submit"
                    >
                        {actionLabel}
                    </Button>
                </form>
            </Form>
        </>
    )
}