import { oauthSignInAction, signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MailCheckIcon } from "lucide-react";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;
    return (
        <div className="grid place-items-center h-screen w-full">
            <form className="flex gap-3 flex-col justify-center items-center">
                <Button formAction={oauthSignInAction} >
                    <MailCheckIcon />
                </Button>
                <Switch title="parent" aria-description="parent" />
            </form>
        </div>
    );
}
