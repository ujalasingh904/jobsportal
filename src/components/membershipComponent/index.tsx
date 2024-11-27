"use client"

import { membershipPlans } from "@/utils";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "../ui/button";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { createPriceIdAction, createStripePaymentAction, updateProfileAction } from "@/actions";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function Membership({ profileInfo }: any) {

    const pathName = useSearchParams();


    async function updateProfile() {
        const fetchCurrentPlanFromSessionStorage = JSON.parse(sessionStorage.getItem("currentPlan") as string);

        await updateProfileAction(
            {
                ...profileInfo,
                isPremiumUser: true,
                memberShipType: fetchCurrentPlanFromSessionStorage?.type,
                memberShipStartDate: new Date().toString(),
                memberShipEndDate: new Date(
                    new Date().getFullYear() +
                        fetchCurrentPlanFromSessionStorage?.type ===
                        "basic"
                        ? 1
                        : fetchCurrentPlanFromSessionStorage?.plan === "teams"
                            ? 2
                            : 5,
                    new Date().getMonth(),
                    new Date().getDay()
                ),
            }, "/membership"
        )
    }


    useEffect(() => {
        if (pathName.get("status") === "success") updateProfile();
    }, [pathName]);


    async function handlePayment(getCurrentPlan: any) {
        const stripe = await stripePromise;
        const extractPriceId = await createPriceIdAction({
            amount: Number(getCurrentPlan?.price)
        });

        if (extractPriceId) {
            sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));
            const result = await createStripePaymentAction({
                lineItems: [
                    {
                        price: extractPriceId?.id,
                        quantity: 1
                    }
                ]
            })

            await stripe?.redirectToCheckout({
                sessionId: result?.id
            })
        }
    }

    console.log("profileInfo", profileInfo);

    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
                    {profileInfo?.isPremiumUser
                        ? "You are a premium user"
                        : "Choose Your Best Plan"}
                </h1>
                <div>
                    {profileInfo?.isPremiumUser ? (
                        <Button className="flex h-11 items-center justify-center px-5">
                            {
                                membershipPlans.find(
                                    (planItem) => planItem.type === profileInfo?.memberShipType
                                )?.heading ?? "Default Plan"
                            }
                        </Button>
                    ) : null}
                </div>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                        {membershipPlans.map((plan, index) => (
                            <CommonCard
                                key={index}
                                icon={
                                    <div className="flex justify-center items-center mb-4">
                                        <div>
                                            <JobIcon />
                                        </div>
                                        <h1 className="font-bold text-2xl">{plan.heading}</h1>
                                    </div>
                                }
                                title={` ${plan.price} /yr`}
                                description={plan.type}
                                footerContent={
                                    (profileInfo?.memberShipType === "Enterprise") ||
                                    (profileInfo?.memberShipType === "Basic" && index === 0) ||
                                    (profileInfo?.memberShipType === "Teams" && index >= 0 && index < 2 ? null : (
                                        <Button
                                            onClick={() => handlePayment(plan)}
                                            className="disabled:opacity-65 dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
                                        >
                                            {profileInfo?.memberShipType === "Basic" ||
                                                profileInfo?.memberShipType === "Teams"
                                                ? "Update Plan"
                                                : "Get Premium"}
                                        </Button>
                                    ))
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}