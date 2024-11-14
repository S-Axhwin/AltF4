import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { isUser } from "@/utils/functions/checks"
import { create } from "@/utils/functions/createAcc"
import { ArrowRight } from "lucide-react"
import { redirect } from "next/navigation"

const page = async () => {

    const { isUser: is } = await isUser();
    if (is) redirect("/protected");

    return (
        <form className="flex flex-col items-center justify-center p-20 gap-10">
            <h2 className="text-2xl font-bold">Welcome</h2>
            <div className="flex flex-col gap-5">
                <label htmlFor="childName" className="font-bold">Name:</label>
                <Input type="text" id="childName" name="childName" required />
            </div>
            <div className="flex flex-col gap-5">
                <label htmlFor="childAge" className="font-bold">Age:</label>
                <Input type="number" id="childAge" name="childAge" required />
            </div>
            <div>
                <label >Child:</label>
                <Switch name="isChild" />
            </div>
            <Button formAction={create} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next<ArrowRight /></Button>
        </form>
    )
}

export default page
