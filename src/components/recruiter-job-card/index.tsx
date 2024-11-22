'use client'

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";

interface RecruiterJobCardProps {
    profileInfo: any;
    jobItem: any;
    jobApplications: any;
}

export default function RecruiterJobCard({ profileInfo, jobItem, jobApplications }: RecruiterJobCardProps) {
    return (
        <CommonCard
            icon={<JobIcon />}
            title={jobItem?.title}
            description={jobItem?.description}
            footerContent={
                <Button className="flex h-11 items-center justify-center px-5 mt-8">
                    10 applicants
                </Button>
            }
        />
    )
}