"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const layout = ({ children }: any) => {

    useEffect(() => {
        const supabase = createClient();
        const channel = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'money_requests', },
                async (payload: any) => {
                    const { data: childData, error } = await supabase
                        .from('children')
                        .select('*')
                        .eq('id', payload.new.child_id)
                        .single();
                    const combinedData = {
                        ...payload.new,
                        child: childData
                    };
                    toast("incoming money request", {
                        description: `${combinedData.amount} request by ${combinedData.child.name}`,
                        action: {
                            label: "View",
                            onClick: () => redirect(`/protected/parent/${combinedData.id}`),
                        },
                    })
                }
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, []);
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
                        {children}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default layout
