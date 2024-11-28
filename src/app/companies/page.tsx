import { fetchJobsForCandidateAction, fetchProfileAction } from "@/actions";
import Companies from "@/components/companies";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CompaniesPage() {

    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)

    if (!profileInfo) redirect('/onboard');
    const jobsList = await fetchJobsForCandidateAction({})


    return (
        <Companies
        jobsList={jobsList}
        />
    );
}