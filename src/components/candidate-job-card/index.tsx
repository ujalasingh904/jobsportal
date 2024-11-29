'use client'

import { useState } from "react"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import {
    Drawer,  DrawerContent, DrawerDescription,  DrawerHeader, DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { createJobApplicationAction } from "@/actions"
import { useToast } from "@/hooks/use-toast"


export default function CandidateJobCard({ jobItem, profileInfo, jobApplications }: any) {

    const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false)
    const { toast } = useToast();




    async function handleJobApply() { 

        console.log('jobApplications', jobApplications)
        console.log('profileInfo', profileInfo?.isPremiumUser)

        if (!profileInfo?.isPremiumUser && jobApplications.length >= 3) {
            setShowJobDetailsDrawer(false)
            toast({
                variant: 'destructive',
                title: "You have reached the limit of job application",
                description: "please opt for premium plan to apply more jobs",
            })
            return;
        } else if (profileInfo?.isPremiumUser && jobApplications.length >= 5 && profileInfo?.memberShipType === 'Basic') {
            setShowJobDetailsDrawer(false)
            toast({
                variant: 'destructive',
                title: "You have reached the limit of job application",
                description: "please opt for premium plan to apply more jobs",
            })
            return;
        } else if (profileInfo?.isPremiumUser && jobApplications.length >= 9 && profileInfo?.memberShipType === 'Teams') {
            setShowJobDetailsDrawer(false)
            toast({
                variant: 'destructive',
                title: "You have reached the limit of job application",
                description: "please opt for premium plan to apply more jobs",
            })
            return;
        }

        await createJobApplicationAction({
            recruiterUserID: jobItem?.recruiterId,
            name: profileInfo?.candidateInfo?.name,
            email: profileInfo?.email,
            candidateUserID: profileInfo?.userId,
            status: ['Applied'],
            jobID: jobItem?._id,
            jobAppliedDate: new Date().toLocaleDateString(),
        }, '/jobs')
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
                                className="flex h-11 items-center justify-center px-5 mt-8 dark:bg-[#FFFA27]">
                                View Details
                            </Button>
                        </DrawerTrigger>
                    }
                />
                <DrawerContent className="p-6">
                    <DrawerHeader className="px-0">
                        <div className="flex justify-between ">
                            <DrawerTitle className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{jobItem?.title}</DrawerTitle>
                            <div className="flex gap-3">
                                <Button
                                    disabled={
                                        jobApplications.map((item: any) => item.jobID).includes(jobItem?._id)
                                    }
                                    onClick={handleJobApply}
                                    className="disabled:opacity-65 dark:disabled:opacity-30  flex h-11 items-center justify-center px-5 mt-8">{
                                        jobApplications.map((item: any) => item.jobID).includes(jobItem?._id) ? 'Applied' : 'Apply Now'
                                    }</Button>

                                <Button className=" flex h-11 items-center justify-center px-5 mt-8" onClick={() => setShowJobDetailsDrawer(false)}> Cancel  </Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerDescription className="text-2xl font-medium text-gray-600 dark:text-gray-300">
                        {jobItem?.description}
                        <span className="text-xl ml-4 font-normal text-gray-500">{jobItem?.location}</span>

                    </DrawerDescription>
                    <div className="w-[150px] mt-6 flex items-center justify-center h-[40px] bg-black dark:bg-[#FFFA27]  rounded-[4px]">
                        <h2 className="text-xl font-bold text-white dark:text-black">{jobItem?.type}</h2>

                    </div>
                    <h3 className="text-2xl font-medium text-black dark:text-gray-400 mt-3">Experience : {jobItem.experience} year</h3>
                    <div className="flex gap-4 mt-6">
                        {
                            jobItem?.skills.split(",").map((skillItem: any, index: any) => (
                                <div
                                    key={index}
                                    className="w-[100px] flex justify-center items-center h-[35px] bg-black dark:bg-[#FFFA27] rounded-[4px]">
                                    <h2 className="text-[13px] font-medium text-white dark:text-black">{skillItem}</h2>

                                </div>
                            ))
                        }
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}