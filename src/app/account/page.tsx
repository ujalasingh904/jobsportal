import { fetchProfileAction } from "@/actions";
import AccountInfo from "@/components/account-info";
import { currentUser } from "@clerk/nextjs/server";

export default async function Account() {
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);
    return (

        <AccountInfo
            profileInfo={profileInfo}
        />

    )
}