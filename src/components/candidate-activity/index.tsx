'use client'

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function CandidateActivity({ jobList, jobApplicants }: any) {

    const uniqueStatusArray = [...new Set(jobApplicants.map((item: any) => item.status).flat(1)
    )];

    console.log(uniqueStatusArray);

    return (
        <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="Applied" className="w-full">
                <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
                        Your Activity
                    </h1>
                    <TabsList>
                        {uniqueStatusArray.map((status:any,index:any) => (
                            <TabsTrigger key={index} value={status}>{status}</TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                <div className="pb-24 pt-6">
                    <div className="container mx-auto p-0 space-y-8">
                        <div className="flex flex-col gap-4">
                            {uniqueStatusArray.map((status:any) => (
                                <TabsContent value={status}>
                                    {jobList
                                        .filter(
                                            (jobItem:any) =>
                                                jobApplicants
                                                    .filter(
                                                        (jobApplication:any) =>
                                                            jobApplication.status.indexOf(status) > -1
                                                    )
                                                    .findIndex(
                                                        (filteredItemByStatus:any) =>
                                                            jobItem._id === filteredItemByStatus.jobID
                                                    ) > -1
                                        )
                                        .map((finalFilteredItem:any) => (
                                            <CommonCard
                                                icon={<JobIcon />}
                                                title={finalFilteredItem?.title}
                                                description={finalFilteredItem?.companyName}
                                                appliedDate={
                                                    jobApplicants
                                                        .filter(
                                                            (jobApplication:any) =>
                                                                jobApplication.status.indexOf(status) > -1
                                                        )
                                                        .find(
                                                            (filteredItemByStatus:any) =>
                                                                finalFilteredItem._id === filteredItemByStatus.jobID
                                                        ).jobAppliedDate
                                                }
                                            />
                                        ))}
                                </TabsContent>
                            ))}
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}