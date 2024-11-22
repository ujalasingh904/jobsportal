"use client"

import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";

interface JobListingProps {
    user: any;
    profileInfo: any;
    jobList: any;
    jobApplications: any;
}

export default function JobListing({ user, profileInfo, jobList, jobApplications }: JobListingProps) {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-9000">
                    {
                        profileInfo?.role === 'candidate' ? "Explore All jobs" : "Jobs dashboard"
                    }
                </h1>
                <div className="flex items-center">
                    {
                        profileInfo?.role === 'candidate' ? <p>Filter</p> : <PostNewJob profileInfo={profileInfo} user={user}
                        />
                    }
                </div>
            </div>
            <div className="pt-6 pb-24">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                    <div className="lg:col-span-4">
                        <div className="container mx-auto p-0 space-y-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                {jobList && jobList.length > 0
                                    ? jobList.map((jobItem: any, index: any) =>
                                        profileInfo?.role === "candidate" ? (
                                            <CandidateJobCard
                                                key={index}
                                                profileInfo={profileInfo}
                                                jobItem={jobItem} 
                                                jobApplications={jobApplications}
                                            />
                                        ) : (
                                            <RecruiterJobCard
                                                key={index}
                                                profileInfo={profileInfo}
                                                jobItem={jobItem}
                                                jobApplications={jobApplications}
                                            />
                                        )
                                    )
                                    : null
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}