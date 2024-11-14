import { createClient } from "../supabase/server"

export const getReq = async () => {
    const supabase = await createClient();
    const { data: requests, error } = await supabase
        .from("money_requests")
        .select("*, child_id(*)")
    // console.log(requests);

    if (error) {
        console.error("Error fetching data:", error);
        return;
    }
    return requests
}
