import { createClient } from "../supabase/server";

export const isUser = async () => {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const { user } = data;
    if (!user) return { isUser: false };
    const { data: isExist } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id);

    const { data: isExistChild } = await supabase
        .from("children")
        .select("id")
        .eq("id", user.id);

    console.log(isExist, isExistChild);

    if (isExist?.length || isExistChild?.length) return { isUser: true, isParent: !!isExist?.length };

    return { isUser: false };

}
