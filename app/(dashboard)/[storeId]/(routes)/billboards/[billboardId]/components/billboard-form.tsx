'use client'

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
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
import ImageUpload from "@/components/ui/image-upload"

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
    initialData: Billboard | null
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    })

    const params = useParams()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const title = initialData ? 'Edit billboard' : 'Create billboard'
    const description = initialData ? 'Edit the billboard for the store.' : 'Add a new billboard for the store.'
    const toastMessage = initialData ? 'Billboard updated successfully!' : 'Billboard added successfully!'
    const actionLabel = initialData ? 'Save Changes' : 'Create'

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setIsLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
            }
            else {
                await axios.post(`/api/${params.storeId}/billboards`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            router.push('/')
            toast.success('Billboard deleted successfully!')
        }
        catch (error) {
            toast.error('Make sure you remove all products and categories first!')
        }
        finally {
            setIsLoading(false)
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
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={isLoading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div
                        className="grid grid-cols-3 gap-8"
                    >
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Billboard Label"
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
            <Separator />
        </>
    )
}