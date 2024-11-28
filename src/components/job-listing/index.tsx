"use client"

import { filterMenuDataArray, formUrlQuery } from "@/utils";
import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface JobListingProps {
    user: any;
    profileInfo: any;
    jobList: any;
    jobApplications: any;
    filterCategories: any;
}

export default function JobListing({ user, profileInfo, jobList, jobApplications, filterCategories }: JobListingProps) {

    const [filterParams, setFilterParams] = useState<{ [key: string]: string[] }>({})
    const searchParams = useSearchParams();
    const router = useRouter();

    function handleFilter(getSectionID: any, getCurrentOption: any) {
        let cpyFilterParams = { ...filterParams };
        const indexOfCurrentSection =
            Object.keys(cpyFilterParams).indexOf(getSectionID);
        if (indexOfCurrentSection === -1) {
            cpyFilterParams = {
                ...cpyFilterParams,
                [getSectionID]: [getCurrentOption],
            };
        } else {
            const indexOfCurrentOption =
                cpyFilterParams[getSectionID].indexOf(getCurrentOption);
            if (indexOfCurrentOption === -1)
                cpyFilterParams[getSectionID].push(getCurrentOption);
            else cpyFilterParams[getSectionID].splice(indexOfCurrentOption, 1);
        }
        setFilterParams(cpyFilterParams);
        sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterParams));
    }

    useEffect(() => {
        setFilterParams(JSON.parse(sessionStorage.getItem("filterParams") || "{}"));
    },
        [])

    useEffect(() => {
        if (filterParams && Object.keys(filterParams).length > 0) {
            let url = "";
            url = formUrlQuery({
                params: searchParams.toString(),
                dataToAdd: filterParams,
            });

            router.push(url,{scroll:false})
        }
    }, [filterParams, searchParams])




    const filterMenus = filterMenuDataArray.map((item: any, index: any) => ({
        id: item.id,
        label: item.label,
        options: [
            ...new Set(filterCategories.map((category: any) => category[item.id]))
        ],
    }))



    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-9000">
                    {
                        profileInfo?.role === 'candidate' ? "Explore All jobs" : "Jobs dashboard"
                    }
                </h1>
                <div className="flex items-center">
                    {
                        profileInfo?.role === 'candidate' ?
                            (
                                <Menubar>
                                    {
                                        filterMenus.map((filterMenu: any, index: any) => (
                                            <MenubarMenu key={index}>
                                                <MenubarTrigger> {filterMenu.label} </MenubarTrigger>
                                                <MenubarContent>
                                                    {
                                                        filterMenu.options.map((option: any, index: any) => (
                                                            <MenubarItem
                                                                key={index}
                                                                className="flex items-center"
                                                                onClick={() => handleFilter(filterMenu.id, option)}
                                                            >
                                                                <div className={`h-4 w-4 dark:border-white border rounded border-gray-900 ${filterParams &&
                                                                    Object.keys(filterParams).length > 0 &&
                                                                    filterParams[filterMenu.id] &&
                                                                    filterParams[filterMenu.id].indexOf(option) > -1
                                                                    ? "bg-black dark:bg-white"
                                                                    : ""
                                                                    } `} />
                                                                <Label className="ml-3 cursor-pointer text-sm text-gray-600 dark:text-white" >{option}</Label>
                                                            </MenubarItem>
                                                        ))
                                                    }
                                                </MenubarContent>
                                            </MenubarMenu>

                                        ))
                                    }
                                </Menubar>
                            ) : <PostNewJob jobList={jobList} profileInfo={profileInfo} user={user}
                            />
                    }
                </div>
            </div>
            <div className="pt-6 pb-24">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                    <div className="lg:col-span-4">
                        <div className="container mx-auto p-0 space-y-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                {jobList && jobList.length > 0
                                    ? jobList.map((jobItem: any, index: any) =>
                                        profileInfo?.role === "candidate" ? (
                                            <CandidateJobCard
                                                key={index}
                                                profileInfo={profileInfo}
                                                jobItem={jobItem}
                                                jobApplications={jobApplications}
                                            />
                                        ) : (
                                            <RecruiterJobCard
                                                key={index}
                                                profileInfo={profileInfo}
                                                jobItem={jobItem}
                                                jobApplications={jobApplications}
                                            />
                                        )
                                    )
                                    : null
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}