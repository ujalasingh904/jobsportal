'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY || ''
)


export default function OnBoard() {

    const [currentTab, setCurrentTab] = useState('candidate')
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData)
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData)
    const { user } = useUser()
    const [file, setFile] = useState<File | null>(null)

    function handleFileChange(e: React.FormEvent) {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        if (target.files) {
            setFile(target.files[0]);
        }
    }

    async function handleUploadToSupabase() {
        if (!file) return;
        const { data, error } = await supabaseClient.storage
            .from("job-portal-public")
            .upload(`/public/${file.name}`, file,
                {
                    cacheControl: '3600',
                    upsert: false
                }
            )
 
        if (data) {
            setCandidateFormData({
                ...candidateFormData,
                resume: data.path
            })
        }
    }

    useEffect(() => {
        if (file) handleUploadToSupabase();
    }, [file])

    function handleRecruiterFormValid() {
        return (
            recruiterFormData &&
            recruiterFormData.name.trim() !== "" &&
            recruiterFormData.companyName.trim() !== "" &&
            recruiterFormData.companyRole.trim() !== ""
        )
    }

    function handleCandidateFormValid() {
        return (Object.keys(candidateFormData) as (keyof typeof candidateFormData)[]).every(key =>
            candidateFormData[key].trim() !== ""
        )
    }

    async function createProfile() {
        const data = currentTab === 'candidate' ? {
            userId: user?.id,
            role: 'candidate',
            email: user?.primaryEmailAddress?.emailAddress || '',
            isPremiumUser: false,
            candidateInfo: candidateFormData,
        } : {
            userId: user?.id,
            role: 'recruiter',
            email: user?.primaryEmailAddress?.emailAddress || '',
            isPremiumUser: false,
            recruiterInfo: recruiterFormData,
        }

        await createProfileAction(data, "/onboard")
    }

    function handleTabChange(value: any) {
        setCurrentTab(value)
    }

    return (
        <div className="bg-white">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="w-full">
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome to onboard</h1>

                        <TabsList>
                            <TabsTrigger value="candidate">Candidate</TabsTrigger>
                            <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value="candidate">
                    <CommonForm
                        formControls={candidateOnboardFormControls}
                        buttonText={'onboard as a candidate'}
                        formData={candidateFormData}
                        setFormData={setCandidateFormData}
                        handleFileChange={handleFileChange}
                        action={createProfile}
                        isBtndisabled={!handleCandidateFormValid()}
                    />
                </TabsContent>
                <TabsContent value="recruiter">
                    <CommonForm
                        formControls={recruiterOnboardFormControls}
                        buttonText={'onboard as a recruiter'}
                        formData={recruiterFormData}
                        setFormData={setRecruiterFormData}
                        handleFileChange={() => { }}
                        isBtndisabled={!handleRecruiterFormValid()}
                        action={createProfile}
                    />
                </TabsContent>
            </Tabs>

        </div>
    )
}