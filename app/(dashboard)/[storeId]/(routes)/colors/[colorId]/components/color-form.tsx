'use client'

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
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
    value: z.string().min(4).regex(/^#/, {
        message: 'String must be a valid hex code'
    })
})

type ColorFormValues = z.infer<typeof formSchema>

interface ColorFormProps {
    initialData: Color | null
}

export const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) => {

    const form = useForm<ColorFormValues>({
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

    const title = initialData ? 'Edit color' : 'Create color'
    const description = initialData ? 'Edit the color for the store.' : 'Add a new color for the store.'
    const toastMessage = initialData ? 'Color updated successfully!' : 'Color added successfully!'
    const actionLabel = initialData ? 'Save Changes' : 'Create'

    const onSubmit = async (data: ColorFormValues) => {
        try {
            setIsLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
            }
            else {
                await axios.post(`/api/${params.storeId}/colors`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/colors`)
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
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success('Color deleted successfully!')
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
                                            placeholder="Color Name"
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
                                        <div
                                            className="flex items-center gap-x-4 "
                                        >
                                            <Input
                                                disabled={isLoading}
                                                placeholder="Color Value"
                                                {...field}
                                            />
                                            <div
                                                className="border p-4 rounded-full"
                                                style={{
                                                    backgroundColor: field.value
                                                }}
                                            />
                                        </div>
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