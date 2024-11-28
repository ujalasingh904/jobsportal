import { fetchAllFeedPostsAction, fetchProfileAction } from "@/actions";
import Feed from "@/components/feed";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function FeedPage() {
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)
    const allFeedPosts = await fetchAllFeedPostsAction()

    if (!profileInfo) redirect('/onboard')
    return (
        <Feed user={JSON.parse(JSON.stringify(user))} profileInfo={profileInfo} allFeedPosts={allFeedPosts} />
    )
} 