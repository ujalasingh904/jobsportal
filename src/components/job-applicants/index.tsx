'use client'
 
import CandidateList from "../candidate-list";
import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

interface JobApplicantsProps {
    showApplicantsDrawer: boolean;
    setShowApplicantsDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    showCurrentCandidateDetailsModal: boolean;
    setShowCurrentCandidateDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentCandidateDetails: any;
    setCurrentCandidateDetails: React.Dispatch<React.SetStateAction<any>>;
    jobApplications: any;
}

export default function JobApplicants({
    showApplicantsDrawer,
    setShowApplicantsDrawer,
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
    currentCandidateDetails,
    setCurrentCandidateDetails,
    jobApplications, }: JobApplicantsProps) {

    return (
        <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
            <DrawerContent className="max-h-[50vh]">
                <ScrollArea className="h-auto overflow-y-auto">
                    <CandidateList
                        currentCandidateDetails={currentCandidateDetails}
                        setCurrentCandidateDetails={setCurrentCandidateDetails}
                        jobApplications={jobApplications}
                        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
                        setShowCurrentCandidateDetailsModal={
                            setShowCurrentCandidateDetailsModal
                        }
                    />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}