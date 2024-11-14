"use server"

import { permanentRedirect, redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { headers } from "next/headers";
import { encodedRedirect } from "../utils";
import { revalidatePath } from "next/cache";

export const create = async (childData: FormData) => {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const { user: child } = data;
    if (!child) return;

    const isChild = (childData.get("isChild"));

    const name = childData.get("childName") as string;
    // const origin = (await headers()).get("origin");
    try {
        if (isChild == "on") {
            const { data, error } = await supabase
                .from('children')
                .insert({ name });
            if (error) throw error;
            // console.log(origin);

        } else {
            const { data, error } = await supabase
                .from('users')
                .insert({ name });
            if (error) throw error;
            // return redirect(origin + "/protected/parent")
        }
        // return data;
    } catch (error) {
        console.error(error);
        // throw error;
    }
    revalidatePath("/welcome")
};

export const createParent = async (parentData: any) => {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from('parents')
            .insert(parentData);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
