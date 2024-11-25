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

export async function fetchJobsForCandidateAction(filterParams: { [key: string]: string } = {}) {
    await connecToDb();
    let updatedParams: { [key: string]: { $in: string[] } } = {};
    Object.keys(filterParams).forEach((filterKey) => {
        updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") }
    })
    const result = await Job.find(filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {});

    return JSON.parse(JSON.stringify(result));
}

export async function createJobApplicationAction(data: any, pathToRevalidate: any) {
    await connecToDb();
    await Application.create(data)
    revalidatePath(pathToRevalidate)
}

export async function fetchJobApplicationForCandidate(candidateId: any) {
    await connecToDb();
    const result = await Application.find({ candidateUserID: candidateId });
    return JSON.parse(JSON.stringify(result));
}

export async function fetchJobApllicationForRecruiter(recruiterId: any) {
    await connecToDb();
    const result = await Application.find({ recruiterUserID: recruiterId });
    return JSON.parse(JSON.stringify(result));
}

export async function getCandidateDetailsByIDAction(currentCandidateID: any) {
    await connecToDb();
    const result = await Profile.findOne({ userId: currentCandidateID });
    return JSON.parse(JSON.stringify(result));
}

export async function updateJobApplicationStatusAction(data: any, pathToRevalidate: any) {
    await connecToDb();

    const { recruiterUserID,
        name,
        email,
        candidateUserID,
        status,
        jobID,
        _id,
        jobAppliedDate,
    } = data

    await Application.findOneAndUpdate({ _id }, {
        recruiterUserID,
        name,
        email,
        candidateUserID,
        status,
        jobID,
        jobAppliedDate,
    }, { new: true })

    revalidatePath(pathToRevalidate)
}

export async function createFilterCategoryAction() {
    await connecToDb();
    const result = await Job.find({});
    return JSON.parse(JSON.stringify(result));
}

export async function updateProfileAction(data: any, pathToRevalidate: any) {
    await connecToDb();
    const { recruiterInfo, candidateInfo, memberShipEndDate, memberShipStartDate, memberShipType, _id, userId, role, email, isPremiumUser } = data;

    await Profile.findOneAndUpdate({ _id }, {
        recruiterInfo,
        candidateInfo,
        memberShipEndDate,
        memberShipStartDate,
        memberShipType,
        userId,
        role,
        email,
        isPremiumUser
    }, { new: true })

    revalidatePath(pathToRevalidate)
}


