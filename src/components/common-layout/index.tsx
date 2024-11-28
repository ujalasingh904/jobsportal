import { ReactNode } from 'react';
import Header from '../header';
import { currentUser } from '@clerk/nextjs/server';
import { fetchProfileAction } from '@/actions';
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface CommonLayoutProps {
    children: ReactNode;


}


export async function CommonLayout({ children, ...props }: CommonLayoutProps) {

    const user = await currentUser();
    const profileInfo = fetchProfileAction(user?.id)

    return (
        <NextThemesProvider {...props}>
            <div className="mx-auto max-w-7xl p-6 lg:px-8">
                {/* header component */}
                <Header
                    profileInfo={profileInfo}
                    user={JSON.parse(JSON.stringify(user))}
                />

                <main>{children}</main>

            </div>
        </NextThemesProvider>
    );
}