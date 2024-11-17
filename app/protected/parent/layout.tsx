"use client"
import { useEffect, } from "react"
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { redirect } from "next/navigation";


const layout = ({ children }: any) => {

    useEffect(() => {
        const supabase = createClient();
        const channel = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'money_requests', },
                async (payload: any) => {
                    const { data: childData,  } = await supabase
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
        <>
            {children}
        </>
    )
}

export default layout
