"use server"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";

export const confirmPayment = async (id: any) => {
    const supabase = await createClient();
    console.log(id);

    const { data, error } = await supabase
        .from('money_requests')
        .update({ status: "done" })
        .eq('id', id)
        .select("*")
        .single()
    if (data) {
        const { data: transactionData, error: error1 } = await supabase
            .from("transactions")
            .insert({
                amount: data.amount,
                sender_id: data.recipient_id,
                recipient_id: data.child_id
            })
            .select();
        console.log("checker", transactionData, error1);

    }
    revalidatePath("/protected/parent")
}

export const rejectPayment = async (id: any) => {
    const supabase = await createClient();
    console.log(id);
    const { data, error } = await supabase
        .from("money_requests")
        .update({ status: "rejected" })
        .eq("id", id)
        .select()
    console.log(data, error);
    revalidatePath("/protected/parent")

}
