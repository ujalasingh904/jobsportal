'use client'

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { useEffect } from "react";

interface HomepageButtonControlsProps {
    user: any,
    profileInfo: any
}

export default function HomepageButtonControls({ user, profileInfo }: HomepageButtonControlsProps) {
    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, [])
    return (
        <div className="flex space-x-4">
            <Button
                onClick={() => router.push(
                    user ? '/jobs' : '/sign-in'
                )}
                className="flex h-11 items-center justify-center px-5">
                {user ? profileInfo?.role === 'candidate' ? 'Browse Jobs' : 'Jobs Dashboard' : 'Find Jobs'}
            </Button>
            <Button
                onClick={() => router.push(
                    user ? profileInfo?.role === 'candidate' ? '/activity' : '/jobs' : '/jobs'
                )}
                className="flex h-11 items-center justify-center px-5">
                {user ? profileInfo?.role === 'candidate' ? 'Your Activity' : 'Post New Job' : 'Post New Job'}
            </Button>

        </div>
    )
}