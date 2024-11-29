import { getCandidateDetailsByIDAction, updateJobApplicationStatusAction } from "@/actions";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY || ''
)

export default function CandidateList({ currentCandidateDetails, setCurrentCandidateDetails, jobApplications, showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal }: any) {

    async function handleFetchCandidateDetails(getCurrentCandidateId: any) {
        const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);

        if (data) {
            setCurrentCandidateDetails(data);
            setShowCurrentCandidateDetailsModal(true);
        }
    }

    function handlePreviewResume() {
        const { data } = supabaseClient.storage.from("job-portal-public")
            .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume)

        const a = document.createElement("a");
        a.href = data?.publicUrl;
        a.setAttribute("download", "resume");
        a.setAttribute("target", "_blank");
        a.click();
        document.body.removeChild(a);
    }

    async function handleUpdateJobStatus(getCurrentStatus: any) {
        const cpyJobApplications = [...jobApplications];
        const indexOfCurrentJobApplicant = cpyJobApplications.findIndex((item: any) => item.candidateUserID === currentCandidateDetails?.userId);

        const jobApplicantsToUpdate = {
            ...cpyJobApplications[indexOfCurrentJobApplicant],
            status: cpyJobApplications[indexOfCurrentJobApplicant].status.concat(getCurrentStatus)
        }
        await updateJobApplicationStatusAction(jobApplicantsToUpdate, "/jobs")

    }

    return (
        <>
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {jobApplications && jobApplications.length > 0
                    ? jobApplications.map((jobApplicantItem: any, index: any) => (
                        <div key={index} className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                            <div className="px-4 my-6 flex justify-between items-center">
                                <h3 className="text-lg font-bold dark:text-black">
                                    {jobApplicantItem?.name}
                                </h3>
                                <Button
                                    onClick={() =>
                                        handleFetchCandidateDetails(
                                            jobApplicantItem?.candidateUserID
                                        )
                                    }
                                    className="dark:bg-[#fffa27]  flex h-11 items-center justify-center px-5"
                                >
                                    View Profile
                                </Button>
                            </div>
                        </div>
                    ))
                    : null}
            </div>
            <Dialog
                open={showCurrentCandidateDetailsModal}
                onOpenChange={() => {
                    setCurrentCandidateDetails(null);
                    setShowCurrentCandidateDetailsModal(false);
                }}
            >
                <DialogContent>
                    <div>
                        <h1 className="text-2xl font-bold dark:text-white text-black">
                            {currentCandidateDetails?.candidateInfo?.name},{" "}
                            {currentCandidateDetails?.email}
                        </h1>
                        <p className="text-xl font-medium dark:text-white text-black">
                            {currentCandidateDetails?.candidateInfo?.currentCompany}
                        </p>
                        <p className="text-sm font-normal dark:text-white text-black">
                            {currentCandidateDetails?.candidateInfo?.currentJobLocation}
                        </p>
                        <p className="dark:text-white">
                            Total Experience:
                            {currentCandidateDetails?.candidateInfo?.totalExperience} Years
                        </p>
                        <p className="dark:text-white">
                            Salary: {currentCandidateDetails?.candidateInfo?.currentSalary}{" "}
                            LPA
                        </p>
                        <p className="dark:text-white">
                            Notice Period:{" "}
                            {currentCandidateDetails?.candidateInfo?.noticePeriod} Days
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <h1 className="dark:text-white">Previous Companies</h1>
                            <div className="flex flex-wrap items-center gap-4 ">
                                {currentCandidateDetails?.candidateInfo?.previousCompanies
                                    .split(",")
                                    .map((skillItem: any, index: any) => (
                                        <div key={index} className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                            <h2 className="text-[13px]  dark:text-black font-medium text-white">
                                                {skillItem}
                                            </h2>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-6">
                            {currentCandidateDetails?.candidateInfo?.skills
                                .split(",")
                                .map((skillItem: any, index: any) => (
                                    <div key={index} className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                        <h2 className="text-[13px] dark:text-black font-medium text-white">
                                            {skillItem}
                                        </h2>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={handlePreviewResume}
                            className=" flex h-11 items-center justify-center px-5"
                        >
                            Resume
                        </Button>
                        <Button
                            onClick={() => handleUpdateJobStatus("selected")}
                            className=" disabled:opacity-65 dark:opacity-25 flex h-11 items-center justify-center px-5"
                            disabled={
                                jobApplications
                                    .find(
                                        (item:any) =>
                                            item.candidateUserID === currentCandidateDetails?.userId
                                    )
                                    ?.status.includes("selected") ||
                                    jobApplications
                                        .find(
                                            (item:any) =>
                                                item.candidateUserID === currentCandidateDetails?.userId
                                        )
                                        ?.status.includes("rejected")
                                    ? true
                                    : false
                            }
                        >
                            {jobApplications
                                .find(
                                    (item: any) =>
                                        item.candidateUserID === currentCandidateDetails?.userId
                                )
                                ?.status.includes("selected")
                                ? "Selected"
                                : "Select"}
                        </Button>
                        <Button
                            onClick={() => handleUpdateJobStatus("rejected")}
                            className=" disabled:opacity-65 dark:opacity-25 flex h-11 items-center justify-center px-5"
                            disabled={
                                jobApplications
                                    .find(
                                        (item: any) =>
                                            item.candidateUserID === currentCandidateDetails?.userId
                                    )
                                    ?.status.includes("selected") ||
                                    jobApplications
                                        .find(
                                            (item: any) =>
                                                item.candidateUserID === currentCandidateDetails?.userId
                                        )
                                        ?.status.includes("rejected")
                                    ? true
                                    : false
                            }
                        >
                            {jobApplications
                                .find(
                                    (item: any) =>
                                        item.candidateUserID === currentCandidateDetails?.userId
                                )
                                ?.status.includes("rejected")
                                ? "Rejected"
                                : "Reject"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}