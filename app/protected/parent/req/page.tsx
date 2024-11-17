import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { getReq } from "@/utils/functions/getPrevReq"
import { RefreshCcw } from "lucide-react"
import { revalidatePath } from "next/cache"
import Link from "next/link"

const hardReload = async () => {
    "use server"
    revalidatePath('/protected/parent')
    return 0;
}

const page = async () => {
    const requests = await getReq()
    return (
        <div className="container mx-auto p-4">
            <div className="w-full max-w-4xl mx-auto">
                <Card className="w-full shadow-lg rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <CardTitle className="text-2xl font-bold">
                            Request
                        </CardTitle>
                        <CardDescription className="text-gray-100">

                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col gap-4 overflow-auto h-[60vh]" >
                                {requests?.length != 0 ? requests?.map(i => {
                                    return (
                                        <Link key={i.id} href={`/protected/parent/${i.id}`}>
                                            <div key={i.id} className="flex gap-4 justify-between items-center bg-slate-900 shadow rounded-lg p-4">
                                                <div className="text-lg font-semibold">
                                                    {i.child_id.name}
                                                </div>
                                                <div className="text-lg font-semibold text-right">
                                                    &#8377;{i.amount}
                                                </div>
                                                <div className={`${i.status == "done" ? "text-green-400" : i.status == "pending" ? "text-orange-300" : "text-red-600"}`}>
                                                    {i.status}
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }) : <div>No Request Yet!</div>}
                            </div>
                            <form >
                                <Button formAction={hardReload}>
                                    <RefreshCcw />
                                </Button>
                            </form>
                        </div >
                    </CardContent>
                </Card>
            </div>
        </div>

    )
}

export default page
