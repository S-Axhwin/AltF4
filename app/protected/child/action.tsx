"use server"
import { createClient } from "@/utils/supabase/server";

export default async (formData: FormData) => {
    const supabase = await createClient();
    const recipient_id = formData.get("recipient_id") as string;
    const amount = formData.get("amount");

    const { data: userData } = await supabase.auth.getUser();
    const { user } = userData;
    console.log(amount, recipient_id, );

    if (!amount || !recipient_id || !user) return;

    const { data, error } = await supabase
        .from("money_requests")
        .insert({ recipient_id, amount: +amount, child_id: user.id })
    // const data = formData.getAll("");
    console.log(error);
    console.log(data);

}
