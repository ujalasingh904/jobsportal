'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import CommonForm from "../common-form";
import { postNewJobAction } from "@/actions";
import { useToast } from "@/hooks/use-toast";

export default function PostNewJob({ profileInfo, user, jobList }: any) {
    const [showJobDialog, setshowJobDialog] = useState(false)
    const { toast } = useToast();
    const [jobFormData, setJobFormData] = useState<any>({
        ...initialPostNewJobFormData,
        companyName: profileInfo?.recruiterInfo?.companyName,
    })

    function handlePostNewBtnValid() {
        return Object.keys(jobFormData).every(
            (control) => jobFormData[control]?.trim() !== ""
        );
    }

    async function createNewJob() {
        await postNewJobAction({
            ...jobFormData,
            recruiterId: user?.id,
            applicants: []
        }, '/jobs')

        setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
        })
        setshowJobDialog(false)
    }

    function handleAddNewJob() {

        if (!profileInfo?.isPremiumUser && jobList.length >= 2) {
            toast({
                variant:'destructive',
                title: "You have reached the limit of job posting",
                description: "please opt for premium plan to post more jobs",
            })
            return;
        }
        else if (profileInfo?.isPremiumUser && jobList.length >= 5 && profileInfo?.membershipType === 'Basic') {
            toast({
                variant:'destructive',
                title: "You have reached the limit of job posting",
                description: "please opt for premium plan to post more jobs",
            })
            return;
        }
        else if (profileInfo?.isPremiumUser && jobList.length >= 10 && profileInfo?.membershipType === 'Teams') {
            toast({
                variant:'destructive',
                title: "You have reached the limit of job posting",
                description: "please opt for premium plan to post more jobs",
            })
            return;
        }
        setshowJobDialog(true)
    }


    return (
        <div className="">
            <Button
                onClick={handleAddNewJob}
                className="disabled:opactiy-60 flex h-11 items-center justify-center px-5 mt-8">
                Post a new job
            </Button>

            <Dialog open={showJobDialog} onOpenChange={() => {
                setshowJobDialog(false);
                setJobFormData({
                    ...initialPostNewJobFormData,
                    companyName: profileInfo?.recruiterInfo?.companyName,
                });
            }}>
                <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Post a new job</DialogTitle>
                        <div className="grid gap-4 py-4">
                            <CommonForm
                                action={createNewJob}
                                formControls={postNewJobFormControls}
                                buttonText={'Add'}
                                formData={jobFormData}
                                setFormData={setJobFormData}
                                isBtndisabled={!handlePostNewBtnValid()}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>

            </Dialog>

        </div>

    )
}
