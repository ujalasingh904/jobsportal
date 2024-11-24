import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import CommonForm from "../common-form";
import { postNewJobAction } from "@/actions";

export default function PostNewJob({ profileInfo, user }: any) {
    const [showJobDialog, setshowJobDialog] = useState(false)
    const [jobFormData, setJobFormData] = useState({
        ...initialPostNewJobFormData,
        companyName: profileInfo?.recruiterInfo?.companyName,
    })

    function handlePostNewBtnValid() {
        return Object.keys(jobFormData).every(
            (control) => jobFormData[control].trim() !== ""
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
 

    return (
        <div className="">
            <Button
                onClick={() => setshowJobDialog(true)}
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
