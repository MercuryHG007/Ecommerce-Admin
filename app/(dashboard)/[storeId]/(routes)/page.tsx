import {
    CreditCard,
    IndianRupee,
    Package
} from "lucide-react"

import { formatter } from "@/lib/utils"
import { getTotalRevenue } from "@/actions/get-total-revenue"
import { getSalesCount } from "@/actions/get-sales-count"
import { getStockCount } from "@/actions/get-stock-count"
import { getGraphRevenue } from "@/actions/get-graph-revenue"

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import Overview from "@/components/overview"

interface DashboardPageProps {
    params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {

    const totalRevenue = await getTotalRevenue(params.storeId)
    const salesCount = await getSalesCount(params.storeId)
    const stockCount = await getStockCount(params.storeId)
    const graphData = await getGraphRevenue(params.storeId)

    return (
        <div
            className="flex flex-col"
        >
            <div
                className="flex-1 space-y-4 p-8 pt-6 "
            >
                <Heading
                    title="Dashboard"
                    description="Overview of the store."
                />
                <Separator />
                <div
                    className="grid gap-4 grid-cols-2 md:grid-cols-3 "
                >
                    <Card
                        className="col-span-2 md:col-span-1 "
                    >
                        <CardHeader
                            className="flex flex-row items-center justify-between space-y-0 pb-2 "
                        >
                            <CardTitle
                                className="text-sm font-medium "
                            >
                                Total Revenue
                            </CardTitle>
                            <IndianRupee
                                className="h-4 w-4 text-muted-foreground "
                            />
                        </CardHeader>
                        <CardContent>
                            <div
                                className="text-2xl font-bold "
                            >
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            className="flex flex-row items-center justify-between space-y-0 pb-2 "
                        >
                            <CardTitle
                                className="text-sm font-medium "
                            >
                                Sales
                            </CardTitle>
                            <CreditCard
                                className="h-4 w-4 text-muted-foreground "
                            />
                        </CardHeader>
                        <CardContent>
                            <div
                                className="text-2xl font-bold "
                            >
                                +{salesCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            className="flex flex-row items-center justify-between space-y-0 pb-2 "
                        >
                            <CardTitle
                                className="text-sm font-medium capitalize "
                            >
                                Products in stock
                            </CardTitle>
                            <Package
                                className="h-4 w-4 text-muted-foreground "
                            />
                        </CardHeader>
                        <CardContent>
                            <div
                                className="text-2xl font-bold "
                            >
                                {stockCount}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card
                    className="col-span-4 "
                >
                    <CardHeader>
                        <CardTitle>
                            Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent
                        className="pl-2 "
                    >
                        <Overview
                            data={graphData}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardPage