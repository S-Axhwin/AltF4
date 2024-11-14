import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"
import { ArrowRight, Link as LinkIcon, Plus, QrCode, RefreshCcw, Search, Send } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Component() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const { data: userData } = await supabase
        .from("children")
        .select("*")
        .eq("id", data?.user?.id)
        .single();
    // console.log(userData);
    if (!userData) redirect("/protected/parent");

    const { data: transaction } = await supabase
        .from("transations")
        .select("*")

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available balance</CardTitle>
                    <RefreshCcw className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">&#8377;{userData.balance}</div>
                    <p className="text-xs text-muted-foreground">Last updated 2 mins ago</p>
                </CardContent>
            </Card>
            <div className="flex justify-between gap-4">
                <Link href={"/protected/child/req"} className="flex-1">
                    <Button className="w-full" variant="outline">

                        <Send className="mr-2 h-4 w-4" /> Request
                    </Button>
                </Link>
                <Button className="flex-1" variant="outline">
                    <QrCode className="mr-2 h-4 w-4" /> Scan
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { name: "Alice Johnson", amount: "-&#8377;50.00", date: "Today" },
                        { name: "Bob's Cafe", amount: "-&#8377;12.50", date: "Yesterday" },
                        { name: "Carol Smith", amount: "+&#8377;25.00", date: "2 days ago" },
                    ].map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{transaction.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium leading-none">{transaction.name}</p>
                                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                                </div>
                            </div>
                            <p className={`text-sm font-medium &#8377;{transaction.amount.startsWith("+") ? "text-green-500" : ""}`}>
                                {transaction.amount}
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <div className="grid grid-cols-4 gap-4">
                {["Food", "Transport", "Entertainment", "More"].map((category) => (
                    <Button key={category} variant="outline" className="h-20 flex-col" size="sm">
                        <div className="h-8 w-8 mb-2 rounded-full bg-gray-600 flex items-center justify-center">
                            <Plus className="h-4 w-4" />
                        </div>
                        <span className="text-xs">{category}</span>
                    </Button>
                ))}
            </div>

        </>

    )
}
