'use client'

import Link from "next/link";
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { AlignJustify, Moon } from 'lucide-react';
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";



export default function Header({ user, profileInfo }: any) {

    const value = JSON.parse(profileInfo?.value)
    const { theme, setTheme } = useTheme()
    

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
            show: value?.role === 'candidate' 
        },
        {
            label: "Feed",
            path: "/feed",
            show: user
        },
        {
            label: "Companies",
            path: "/companies",
            show: value?.role === 'candidate' 
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
                                            onClick={() => sessionStorage.removeItem('filterParams')}
                                            className="flex w-full items-center py-2 text-lg font-semibold "
                                        >
                                            {menuItem.label}
                                        </Link>
                                    ) : null
                                )
                            }
                            <Moon
                                className="h-6 w-6 cursor-pointer mb-4"
                                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                fill={theme === 'dark' ? 'light' : 'dark'}
                            />
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SheetContent>
                </Sheet>

                <Link className="hidden font-bold text-4xl lg:flex mr-6" href={'/'}>
                    JobsWallah
                </Link>
                <nav className="ml-auto hidden   lg:flex gap-6 items-center">
                    {
                        menuItems.map((menuItem, index) =>
                            menuItem.show ? (
                                <Link
                                    key={index}
                                    href={menuItem.path}
                                    className="group inline-flex h-9 w-max items-center rounded-md dark:text-white px-4 py-2 font-[550] text-sm"
                                >
                                    {menuItem.label}
                                </Link>
                            ) : null
                        )
                    }
                    <Moon
                                className="h-6 w-6 cursor-pointer"
                                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                fill={theme === 'dark' ? 'white' : 'black'}
                            />
                    <UserButton afterSignOutUrl="/" />
                </nav>

            </header>

        </div>
    )
}