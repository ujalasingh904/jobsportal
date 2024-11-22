'use client'

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";

interface RecruiterJobCardProps {
    profileInfo: any;
    jobItem: any;
    jobApplications: any;
}

export default function RecruiterJobCard({ jobItem, jobApplications }: RecruiterJobCardProps) {

    const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
    const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
    const [showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal] =
        useState(false);


    return (
        <div>
            <CommonCard
                icon={<JobIcon />}
                title={jobItem?.title}
                description={jobItem?.description}
                disabled={jobApplications.filter((item: any) => item.jobID === jobItem?._id).length === 0}
                footerContent={
                    <Button
                        onClick={() => setShowApplicantsDrawer(true)}
                        className="flex h-11 items-center justify-center px-5 mt-8">
                        {
                            jobApplications.filter((item: any) => item.jobID === jobItem?._id).length
                        } applicants
                    </Button>
                }
            />
            <JobApplicants
                showApplicantsDrawer={showApplicantsDrawer}
                setShowApplicantsDrawer={setShowApplicantsDrawer}
                showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
                setShowCurrentCandidateDetailsModal={
                    setShowCurrentCandidateDetailsModal
                }
                currentCandidateDetails={currentCandidateDetails}
                setCurrentCandidateDetails={setCurrentCandidateDetails}
                jobItem={jobItem}
                jobApplications={jobApplications.filter(
                    (jobApplicantItem: any) => jobApplicantItem.jobID === jobItem?._id
                )}
            />
        </div>
    )
}