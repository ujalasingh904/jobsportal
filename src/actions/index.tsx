"use server"

import connecToDb from "@/database";
import Application from "@/models/application";
import Feed from "@/models/feed";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string)


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
    const updatedParams: { [key: string]: { $in: string[] } } = {};
    await Promise.resolve();  
    Object.keys(filterParams).forEach((filterKey) => {
        updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") }
    });
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

export async function createPriceIdAction(data: any) {
    const session = await stripe.prices.create({
        currency: "inr",
        unit_amount: data?.amount * 100,
        recurring: {
            interval: "year",
        },
        product_data: {
            name: "Premium plan"
        },
    });

    return {
        success: true,
        id: session?.id
    };
}

export async function createStripePaymentAction(data: any) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: data?.lineItems,
        mode: 'subscription',
        billing_address_collection: "required",
        success_url: `${process.env.URL}/membership` + "?status=success",
        cancel_url: `${process.env.URL}/membership` + "?status=cancel",
    });

    return {
        success: true,
        id: session?.id
    };
}

export async function createFeedPostAction(data: any, pathToRevalidate: any) {
    await connecToDb();
    await Feed.create(data)
    revalidatePath(pathToRevalidate)
}

export async function fetchAllFeedPostsAction() {
    await connecToDb();
    const result = await Feed.find({});
    return JSON.parse(JSON.stringify(result));
}

export async function updateFeedPostAction(data: any, pathToRevalidate: any) {
    await connecToDb();
    const { userId, userName, message, image, likes, _id } = data;

    await Feed.findOneAndUpdate(
        { _id },
        { userId, userName, message, image, likes },
        { new: true }
    )

    revalidatePath(pathToRevalidate)
}
