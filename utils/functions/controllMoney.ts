"use server"

import { createClient } from "../supabase/server";

export const createMoneyRequest = async (amount: number, senderId: number, receiverId: number) => {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from('money_requests')
            .insert([{ amount, sender_id: senderId, receiver_id: receiverId }]);
        if (error) throw error;
        // return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const acceptMoneyRequest = async (requestId: number) => {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from('money_requests')
            .update({ id: requestId, status: 'accepted' });
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const rejectMoneyRequest = async (requestId: number) => {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from('money_requests')
            .update({ id: requestId, status: 'rejected' });
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
