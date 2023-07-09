import { UserButton } from "@clerk/nextjs"

const RootPage = () => {
    return (
        <div
            className="p-4"
        >
            <p
                className="text-base"
            >
                Hello Admin Dashboard
                <UserButton 
                    afterSignOutUrl="/"
                />
            </p>
        </div>
    )
}

export default RootPage