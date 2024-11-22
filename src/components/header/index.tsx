'use client'

import Link from "next/link";
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { AlignJustify } from 'lucide-react';
import { UserButton } from "@clerk/nextjs";



export default function Header({ user , profileInfo }: any) {

    const menuItems = [
        {
            label: "Home",
            path: "/",
            show: true
        },
        {
            label: "Login",
            path: "/sign-in",
            show: !user
        },
        {
            label: "Register",
            path: "/sign-up",
            show: !user
        },
        {
            label: "Activity",
            path: "/activity",
            show: profileInfo?.role === 'candidate'
        },
        {
            label: "Jobs",
            path: "/jobs",
            show: user
        },
        {
            label: "Membership",
            path: "/membership",
            show: user
        },
        {
            label: "Account",
            path: "/account",
            show: user
        },

    ];



    return (
        <div>
            <header className="flex h-16 w-full shrink-0 items-center">
                {/* <h1 className="bg-red-500 text-red-500">ujala</h1> */}
                <Sheet>
                    <SheetTrigger>
                        <Button className="lg:hidden">
                            <AlignJustify className="h-6 w-6" />
                            <span className="sr-only">Toggle Navigation Menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link className="mr-6 hidden lg:flex" href={"#"}>
                            <h3>JobsWallah</h3>
                        </Link>
                        <div className="grid gap-2 py-6">
                            {
                                menuItems.map((menuItem, index) =>
                                    menuItem.show ? (
                                        <Link
                                            key={index}
                                            href={menuItem.path}
                                            className="flex w-full items-center py-2 text-lg font-semibold "
                                        >
                                            {menuItem.label}
                                        </Link>
                                    ) : null
                                )
                            }
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SheetContent>
                </Sheet>

                <Link className="hidden lg:flex mr-6" href={'/'}>
                    JobsWallah
                </Link>
                <nav className="ml-auto hidden lg:flex gap-6">
                    {
                        menuItems.map((menuItem, index) =>
                            menuItem.show ? (
                                <Link
                                    key={index}
                                    href={menuItem.path}
                                    className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium"
                                >
                                    {menuItem.label}
                                </Link>
                            ) : null
                        )
                    }
                    <UserButton afterSignOutUrl="/" />
                </nav>

            </header>

        </div>
    )
}