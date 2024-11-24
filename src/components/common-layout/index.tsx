import { ReactNode } from 'react';
import Header from '../header';
import { currentUser } from '@clerk/nextjs/server';
import { fetchProfileAction } from '@/actions';

interface CommonLayoutProps {
    children: ReactNode;
}


export async function CommonLayout({ children }: CommonLayoutProps) {

    const user = await currentUser();
    const profileInfo = fetchProfileAction(user?.id)

    return (
        <div className="mx-auto max-w-7xl p-6 lg:px-8">
            {/* header component */}
            <Header
                profileInfo={profileInfo} 
                user={JSON.parse(JSON.stringify(user))}
            />

            <main>{children}</main>

        </div>
    );
}