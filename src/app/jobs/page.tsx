import { fetchJobApllicationForRecruiter, fetchJobApplicationForCandidate, fetchJobsForCandidateAction, fetchJobsForRecuriterAction, fetchProfileAction } from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

export default async function JobsPage() {
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id)

    const jobList = profileInfo?.role === 'candidate' ? await fetchJobsForCandidateAction() :
        await fetchJobsForRecuriterAction(user?.id)

    const getJobApplicantsList = profileInfo?.role === 'candidate' ? await
        fetchJobApplicationForCandidate(user?.id) : await fetchJobApllicationForRecruiter(user?.id)

    

    return (
        <JobListing
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
            jobList={jobList}
            jobApplications={getJobApplicantsList}
        />
    )
}