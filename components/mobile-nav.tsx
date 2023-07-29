'use client'

import { useParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
    Menu,
    LineChart,
    Wallpaper,
    LayoutList,
    Ruler,
    Palette,
    Package,
    BaggageClaim,
    Settings

} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MobileNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname()
    const params = useParams()
    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Dashboard',
            icon: <LineChart className="mr-2 h-4 w-4" />,
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Billboards',
            icon: <Wallpaper className="mr-2 h-4 w-4" />,
            active: pathname === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Categories',
            icon: <LayoutList className="mr-2 h-4 w-4" />,
            active: pathname === `/${params.storeId}/categories`,
        },
        {
            href: `/${params.storeId}/sizes`,
            label: 'Sizes',
            icon: <Ruler className="mr-2 h-4 w-4" />,
            active: pathname === `/${params.storeId}/sizes`,
        },
        {
            href: `/${params.storeId}/colors`,
            label: 'Colors',
            icon: <Palette className="mr-2 h-4 w-4" />,
            active: pathname === `/${params.storeId}/colors`,
        },
        {
            href: `/${params.storeId}/products`,
            label: 'Products',
            icon: <Package className="mr-2 h-4 w-4" />,
            active: pathname === `/${params.storeId}/products`,
        },
        {
            href: `/${params.storeId}/orders`,
            label: 'Orders',
            icon: <BaggageClaim className="mr-2 h-4 w-4" />,
            active: pathname === `/${params.storeId}/orders`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            icon: <Settings className="mr-2 h-4 w-4" />,
            active: pathname === `/${params.storeId}/settings`,
        },
    ]

    return (
        <nav
            className={cn(
                "flex lg:hidden items-center space-x-4 lg:space-x-6",
                className
            )}
        >
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild
                >
                    <Button
                        variant="link"
                        size="icon"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    // side="bottom"
                    // sideOffset={}
                    className="w-36"
                >
                    <DropdownMenuLabel>Sections</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {routes.map((route) => (
                            <DropdownMenuItem
                                key={route.href}
                            >
                                <Link
                                    href={route.href}
                                    className={cn(
                                        "flex items-center text-sm font-medium transition-colors hover:text-primary ",
                                        route.active ? 'font-semibold text-black dark:text-white' : 'text-muted-foreground'
                                    )}
                                >
                                    {route.icon}
                                    {route.label}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}