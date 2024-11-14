import { Button } from "@/components/ui/button"
import { getReq } from "@/utils/functions/getPrevReq"
import { RefreshCcw } from "lucide-react"
import { revalidatePath } from "next/cache"

const hardReload = async () => {
    "use server"
    revalidatePath('/protected/parent')
    return 0;
}

const page = async () => {
    const requests = await getReq()
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 overflow-auto h-[60vh]" >
                {requests?.length != 0 ? requests?.map(i => {
                    return (
                        <div key={i.id} className="flex gap-4 justify-between items-center bg-slate-900 shadow rounded-lg p-4">
                            <div className="text-lg font-semibold">
                                {i.child_id.name}
                            </div>
                            <div className="text-lg font-semibold text-right">
                                {i.amount}
                            </div>
                            <div className={`&#8377;{i.status == "done" ? "text-green-400" : "text-orange-300"}`}>
                                {i.status}
                            </div>
                        </div>
                    )
                }) : <div>No Request Yet!</div>}
            </div>
            <form >
                <Button formAction={hardReload}>
                    <RefreshCcw />
                </Button>
            </form>
        </div>
    )
}

export default page
