"use server"
import { createClient } from "@/utils/supabase/server";

export default async (formData: FormData) => {
    const supabase = await createClient();
    const recipient_name = formData.get("recipient_name") as string;
    const amount = formData.get("amount");

    const { data: userData } = await supabase.auth.getUser();
    const { user } = userData;

    if (!amount || !recipient_name || !user || (+amount < 0)) return;


    const { data: sender } = await supabase
        .from("users")
        .select("*")
        .eq("name", recipient_name)
        .single();
    console.log(sender);

    if (!sender) return;
    console.log(sender);

    const { data, error } = await supabase
        .from("money_requests")
        .insert({ amount: +amount, child_id: user.id, recipient_id: sender.id });

    // const data = formData.getAll("");
    // console.log(error);
    // console.log(data);

}
