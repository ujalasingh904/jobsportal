"use server"
import connecToDb from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";



export async function createProfileAction(formData: any, pathToRevalidate: any) {
    await connecToDb();
    await Profile.create(formData)
    revalidatePath(pathToRevalidate)
}

export async function fetchProfileAction(id: any) {
    await connecToDb();
    const result = await Profile.findOne({ userId: id });

    return JSON.parse(JSON.stringify(result));
}


export async function postNewJobAction(formData: any, pathToRevalidate: any) {
    await connecToDb();
    await Job.create(formData)
    revalidatePath(pathToRevalidate)
}


export async function fetchJobsForRecuriterAction(id: any) {
    await connecToDb();
    const result = await Job.find({ recruiterId: id });
    return JSON.parse(JSON.stringify(result));
}

export async function fetchJobsForCandidateAction() {
    await connecToDb();
    const result = await Job.find();

    // return JSON.parse(JSON.stringify(result));
    return JSON.parse(JSON.stringify(result));
}

export async function createJobApplicationAction(data:any, pathToRevalidate:any) {
    await connecToDb();
    await Application.create(data)
    revalidatePath(pathToRevalidate)
}

export async function fetchJobApplicationForCandidate(candidateId:any) {
    await connecToDb();
    const result = await Application.find({ candidateUserID: candidateId });
    return JSON.parse(JSON.stringify(result));
}

export async function fetchJobApllicationForRecruiter(recruiterId:any) {
    await connecToDb();
    const result = await Application.find({ recruiterUserID: recruiterId });
    return JSON.parse(JSON.stringify(result));
}



