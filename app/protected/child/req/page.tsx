"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import action from '../action'
import { useEffect } from "react"
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { Send, DollarSign } from 'lucide-react'

export default function EnhancedMoneyRequestForm() {
    useEffect(() => {
        const supabase = createClient();
        console.log("inserted");

        const channel = supabase.channel('custom-all-channel2')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'money_requests', },
                async (payload: any) => {
                    toast(payload.new.status + " payment", {
                        description: `${payload.new.status} of amount ${payload.new.amount}`,
                        duration: 5000,
                    })
                }
            )
            .subscribe();
        return () => {
            channel.unsubscribe();
        };
    }, []);

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Child Accounts</CardTitle>
                <CardDescription>Send a money request to a child account</CardDescription>
            </CardHeader>
            <form>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="recipient_id">Recipient</Label>
                        <Input
                            id="recipient_id"
                            placeholder="Enter recipient's ID"
                            name="recipient_id"
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <Input
                                id="amount"
                                placeholder="Enter amount"
                                name="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                className="pl-10 w-full"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        formAction={action}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                        <Send className="w-4 h-4 mr-2" /> Send Request
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
