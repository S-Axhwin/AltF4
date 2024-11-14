"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Ban, Check } from "lucide-react"
import { confirmPayment, rejectPayment } from "./action"

export function PopUp({ req }: any) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Accept/Decline</DialogTitle>
                    <DialogDescription>
                        If you accept the request money will be taken from your account and transfered
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>from: {req.child.name}</div>
                    <div>amount: {req.amount}</div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => confirmPayment(req.id)}><Check /></Button>
                    <Button type="submit" onClick={() => rejectPayment(req.id)}><Ban /></Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
