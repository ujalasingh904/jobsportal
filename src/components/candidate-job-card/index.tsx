'use client'

import { useState } from "react"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import {
    Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { createJobApplicationAction } from "@/actions"


export default function CandidateJobCard({ jobItem, profileInfo ,jobApplications }: any) {

    const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false)

    console.log(jobApplications.map((item: any) => item.jobID));
    

    async function handleJobApply() {

        // console.log(jobApplications?.jobID,jobItem?._id)
        await createJobApplicationAction({
            recruiterUserID: jobItem?.recruiterId,
            name: profileInfo?.candidateInfo?.name,
            email: profileInfo?.email,
            candidateUserID: profileInfo?.userId,
            status: ['Applied'],
            jobID: jobItem?._id,
            jobAppliedDate: new Date().toLocaleDateString(),
        },'/jobs')
        setShowJobDetailsDrawer(false)
    }


    return (
        <>
            <Drawer open={showJobDetailsDrawer} onOpenChange={setShowJobDetailsDrawer}>
                <CommonCard
                    icon={<JobIcon />}
                    title={jobItem?.title}
                    description={jobItem?.companyName}
                    footerContent={
                        <DrawerTrigger>
                            <Button
                                className=" flex h-11 items-center justify-center px-5 mt-8">
                                View Details
                            </Button>
                        </DrawerTrigger>
                    }
                />
                <DrawerContent className="p-6">
                    <DrawerHeader className="px-0">
                        <div className="flex justify-between ">
                            <DrawerTitle className="text-4xl font-extrabold text-gray-800">{jobItem?.title}</DrawerTitle>
                            <div className="flex gap-3">
                                <Button
                                    disabled={
                                        jobApplications.map((item:any)=>item.jobID).includes(jobItem?._id)   
                                    }
                                    onClick={handleJobApply}
                                    className=" flex h-11 items-center justify-center px-5 mt-8">{
                                        jobApplications.map((item:any)=>item.jobID).includes(jobItem?._id) ? 'Applied' : 'Apply Now'
                                    }</Button>

                                <Button className=" flex h-11 items-center justify-center px-5 mt-8" onClick={() => setShowJobDetailsDrawer(false)}> Cancel  </Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerDescription className="text-2xl font-medium text-gray-600">
                        {jobItem?.description}
                        <span className="text-xl ml-4 font-normal text-gray-500">{jobItem?.location}</span>

                    </DrawerDescription>
                    <div className="w-[150px] mt-6 flex items-center justify-center h-[40px] bg-black rounded-[4px]">
                        <h2 className="text-xl font-bold text-white">{jobItem?.type}</h2>

                    </div>
                    <h3 className="text-2xl font-medium text-black mt-3">Experience : {jobItem.experience} year</h3>
                    <div className="flex gap-4 mt-6">
                        {
                            jobItem?.skills.split(",").map((skillItem: any, index: any) => (
                                <div
                                    key={index}
                                    className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                    <h2 className="text-[13px] font-medium text-white">{skillItem}</h2>

                                </div>
                            ))
                        }
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}