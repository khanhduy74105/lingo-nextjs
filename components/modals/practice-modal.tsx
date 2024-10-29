"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { usePracticeModal } from "@/store/use-practice-modal"

export const PracticeModal = () => {
    const [isClient, setIsClient] = useState(false)
    const { isOpen, close } = usePracticeModal()

    useEffect(() => setIsClient(true), [])

    if (!isClient) {
        return null
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                            src={'/heart.svg'}
                            alt="heart"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-current font-bold text-2xl">
                        Practice lesson
                    </DialogTitle>
                    <DialogDescription>
                        Use practice lessons to regain heart and points. You
                        cannot loose heart or points in practice lesson
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            variant={'primary'}
                            className="w-full"
                            size={'lg'}
                            onClick={close}
                        >
                            I understand
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}