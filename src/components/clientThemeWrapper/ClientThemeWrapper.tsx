"use client";

import Header from "../header";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

interface ClientThemeWrapperProps {
    user: any;
    profileInfo: any;
    children: React.ReactNode;
}

export default function ClientThemeWrapper({
    user,
    profileInfo,
    children,
    ...props
}: ClientThemeWrapperProps) {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <NextThemesProvider {...props}>
            <div className="mx-auto max-w-7xl p-6 lg:px-8">
                <Header profileInfo={profileInfo} user={user} />
                <main>{children}</main>
            </div>
        </NextThemesProvider>
    );
}
