import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, AlertTriangle, DollarSign, User, Calendar } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { confirmPayment, rejectPayment } from '../action'

export default async function EnhancedRequestViewer({ params }: any) {
    const { id } = (await params);
    const supabase = await createClient();
    const { data: request } = await supabase
        .from("money_requests")
        .select("*")
        .eq("id", id)
        .single() as any
    console.log(request);


    if (!request) {
        return (
            <Card className="w-full max-w-md mx-auto shadow-lg rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
                <CardHeader className="bg-red-500 text-white">
                    <CardTitle className="text-xl font-semibold flex items-center">
                        <AlertTriangle className="w-6 h-6 mr-2" />
                        No Request Data
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        Sorry, the request data is not available. Please try again later or contact support if the issue persists.
                    </p>
                </CardContent>
            </Card>
        )
    }

    const { data: child, error } = await supabase
        .from("children")
        .select("name")
        .eq("id", request.child_id)
        .single();
    console.log(error);

    const { amount, status, created_at } = request;
    const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg rounded-xl overflow-hidden bg-white dark:bg-gray-800">
            <CardHeader className="flex justify-center items-center from-blue-500 to-purple-600 text-white">
                <Badge
                    variant={status === 'pending' ? 'outline' : status === 'approved' ? 'default' : 'destructive'}
                    className={`w-fit capitalize text-sm font-medium px-3 py-1 rounded-full ${status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                        }`}
                >
                    {status === 'pending' && <Clock className="w-4 h-4 mr-1" />}
                    {status === 'approved' && <CheckCircle className="w-4 h-4 mr-1" />}
                    {status === 'rejected' && <XCircle className="w-4 h-4 mr-1" />}
                    {status}
                </Badge>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                        Amount:
                    </span>
                    <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                        ${amount.toFixed(2)}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center">
                        <User className="w-5 h-5 mr-2 text-blue-500" />
                        Requester:
                    </span>
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {child?.name}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                        Date:
                    </span>
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {formattedDate}
                    </span>
                </div>
            </CardContent>
            {status === 'pending' && (
                <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
                    <form className="flex gap-4 w-full">
                        <input type="hidden" name="id" value={id} />
                        <Button
                            formAction={async () => {
                                "use server"
                                await confirmPayment(request.id)
                            }}
                            type="submit"
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Approve
                        </Button>
                        <Button
                            formAction={async () => {
                                "use server"
                                await rejectPayment(request.id)
                            }}
                            type="submit"
                            variant="destructive"
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Reject
                        </Button>
                    </form>
                </CardFooter>
            )}
        </Card>
    )
}
