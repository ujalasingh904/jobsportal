// 'use client'

// import { Fragment, useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { Textarea } from "../ui/textarea";
// import { Label } from "../ui/label";
// import { CirclePlus, Heart } from "lucide-react";
// import { Input } from "../ui/input";
// import { createClient } from "@supabase/supabase-js";
// import { createFeedPostAction, updateFeedPostAction } from "@/actions";
// import Image from "next/image";

// const supabaseClient = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL || '',
//     process.env.NEXT_PUBLIC_SUPABASE_API_KEY || ''
// )

// export default function Feed({ user, profileInfo, allFeedPosts }: any) {

//     const [showPostDialog, setShowPostDialog] = useState(false);
//     const [formData, setFormData] = useState({
//         message: "",
//         imageURL: ""
//     });
//     const [imageData, setImageData] = useState<any>(null);

//     function handleFileOnChange(e: any) {
//         e.preventDefault();
//         setImageData(e.target.files[0])
//     }

//     function handleFetchImagePublicUrl(getData: any) {
//         const { data } = supabaseClient.storage
//             .from("job-portal-public")
//             .getPublicUrl(getData.path)

//         if (data) {
//             setFormData({
//                 ...formData,
//                 imageURL: data.publicUrl
//             })
//         }
//     }

//     async function handleUploadImageToSupabase() {
//         const { data} = await supabaseClient.storage
//             .from("job-portal-public").upload(`/public/${imageData?.name}`, imageData, {
//                 cacheControl: "3600",
//                 upsert: false
//             })
//         if (data) handleFetchImagePublicUrl(data)
//     }

//     useEffect(() => {
//         if (imageData) handleUploadImageToSupabase();
//     }, [imageData])

//     async function handleSaveFeedPost() {
//         await createFeedPostAction({
//             userId: user?.id,
//             userName: profileInfo?.candidateInfo?.name ||
//                 profileInfo?.recruiterInfo?.name,
//             message: formData?.message,
//             image: formData?.imageURL,
//             likes: [],
//         }, '/feed')

//         setShowPostDialog(false);
//         setFormData({
//             message: "",
//             imageURL: ""
//         })
//     }

//     async function handleUpdateFeedPostLikes(CurrentfeedPostItem: any) {
//         const cpyLikesFromCurrentFeedPostItem = [...CurrentfeedPostItem?.likes];
//         const index = cpyLikesFromCurrentFeedPostItem.findIndex(
//             (likeItem: any) => likeItem.reactorUserId === user?.id);

//         if (index === -1) {
//             cpyLikesFromCurrentFeedPostItem.push({
//                 reactorUserId: user?.id,
//                 reactorUserName: profileInfo?.candidateInfo?.name ||
//                     profileInfo?.recruiterInfo?.name,
//             });
//         } else cpyLikesFromCurrentFeedPostItem.splice(index, 1);

//         CurrentfeedPostItem.likes = cpyLikesFromCurrentFeedPostItem;
//         await updateFeedPostAction(CurrentfeedPostItem, '/feed')
//     }

//     return (
//         <Fragment>
//             <div className="mx-auto max-w-7xl">
//                 <div className="flex items-baseline justify-between dark:border-white border-b pb-6 pt-6 sm:pt-12 md:pt-24">
//                     <h1 className="dark:text-white text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-gray-900">
//                         Explore Feed
//                     </h1>
//                     <div className="flex items-center">
//                         <Button
//                             onClick={() => setShowPostDialog(true)}
//                             className="flex h-11 items-center justify-center px-5"
//                         >
//                             Add New Post
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="py-12">
//                     <div className="container m-auto p-0 flex flex-col gap-5 text-gray-700">
//                         {allFeedPosts && allFeedPosts.length > 0 ? (
//                             allFeedPosts.map((feedPostItem: any) => (
//                                 <div
//                                     key={feedPostItem._id}
//                                     className="group relative -mx-4 p-6 rounded-3xl bg-gray-100 hover:bg-white hover:shadow-2xl cursor-auto shadow-2xl shadow-transparent gap-8 flex"
//                                 >
//                                     <div className="sm:w-2/6 rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-xl">
//                                         <Image
//                                             src={feedPostItem?.image}
//                                             alt="Post"
//                                             className="h-80 w-full object-cover object-top transition duration-500 group-hover:scale-105"
//                                         />
//                                     </div>
//                                     <div className="sm:p-2 sm:pl-0 sm:w-4/6">
//                                         <span className="mt-4 mb-2 inline-block font-medium text-gray-500 sm:mt-0">
//                                             {feedPostItem?.userName}
//                                         </span>
//                                         <h3 className="mb-6 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
//                                             {feedPostItem?.message}
//                                         </h3>
//                                         <div className="flex gap-5">
//                                             <Heart
//                                                 size={25}
//                                                 fill={
//                                                     feedPostItem?.likes?.length > 0
//                                                         ? "#FF0000"
//                                                         : "#ffffff"
//                                                 }
//                                                 className="cursor-pointer         text-[#FF0000]"
//                                                 onClick={() => handleUpdateFeedPostLikes(feedPostItem)}
//                                             />
//                                             <span className="font-semibold text-xl">
//                                                 {feedPostItem?.likes?.length}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <h1>No posts found!</h1>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <Dialog
//                 open={showPostDialog}
//                 onOpenChange={() => {
//                     setShowPostDialog(false);
//                     setFormData({
//                         message: "",
//                         imageURL: "",
//                     });
//                 }}
//             >
//                 <DialogContent className="h-[550px]">
//                     <Textarea
//                         name="message"
//                         value={formData?.message}
//                         onChange={(event) =>
//                             setFormData({
//                                 ...formData,
//                                 message: event.target.value,
//                             })
//                         }
//                         placeholder="What do you want to talk about?"
//                         className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[200px] text-2xl"
//                     />

//                     <div className="flex gap-5 items-center justify-between">
//                         <Label htmlFor="imageURL">
//                             <CirclePlus className="cursor-pointer" />
//                             <Input
//                                 onChange={handleFileOnChange}
//                                 className="hidden"
//                                 id="imageURL"
//                                 type="file"
//                             />
//                         </Label>
//                         <Button
//                             onClick={handleSaveFeedPost}
//                             disabled={formData?.imageURL === "" && formData?.message === ""}
//                             className="flex w-40 h-11 items-center justify-center px-5 disabled:opacity-65"
//                         >
//                             Post
//                         </Button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </Fragment>
//     )
// }

'use client';

import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { CirclePlus, Heart } from "lucide-react";
import { Input } from "../ui/input";
import { createClient } from "@supabase/supabase-js";
import { createFeedPostAction, updateFeedPostAction } from "@/actions";
import Image from "next/image";

const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY || ''
);

export default function Feed({ user, profileInfo, allFeedPosts }: any) {
    const [showPostDialog, setShowPostDialog] = useState(false);
    const [formData, setFormData] = useState({
        message: "",
        imageURL: ""
    });
    const [imageData, setImageData] = useState<any>(null);

    function handleFileOnChange(e: any) {
        e.preventDefault();
        setImageData(e.target.files[0] || null);
    }

    function handleFetchImagePublicUrl(getData: any) {
        const { data } = supabaseClient.storage
            .from("job-portal-public")
            .getPublicUrl(getData?.path || "");

        if (data) {
            setFormData((prev) => ({
                ...prev,
                imageURL: data.publicUrl || "",
            }));
        }
    }

    async function handleUploadImageToSupabase() {
        const { data } = await supabaseClient.storage
            .from("job-portal-public")
            .upload(`/public/${imageData?.name || "default-name"}`, imageData, {
                cacheControl: "3600",
                upsert: false,
            });

        if (data) handleFetchImagePublicUrl(data);
    }

    useEffect(() => {
        if (imageData) handleUploadImageToSupabase();
    }, [imageData]);

    async function handleSaveFeedPost() {
        await createFeedPostAction(
            {
                userId: user?.id || "",
                userName:
                    profileInfo?.candidateInfo?.name ||
                    profileInfo?.recruiterInfo?.name ||
                    "Unknown User",
                message: formData?.message || "",
                image: formData?.imageURL || "",
                likes: [],
            },
            '/feed'
        );

        setShowPostDialog(false);
        setFormData({
            message: "",
            imageURL: ""
        });
    }

    async function handleUpdateFeedPostLikes(CurrentfeedPostItem: any) {
        const cpyLikesFromCurrentFeedPostItem = [...(CurrentfeedPostItem?.likes || [])];
        const index = cpyLikesFromCurrentFeedPostItem.findIndex(
            (likeItem: any) => likeItem.reactorUserId === (user?.id || "")
        );

        if (index === -1) {
            cpyLikesFromCurrentFeedPostItem.push({
                reactorUserId: user?.id || "",
                reactorUserName:
                    profileInfo?.candidateInfo?.name ||
                    profileInfo?.recruiterInfo?.name ||
                    "Unknown User",
            });
        } else {
            cpyLikesFromCurrentFeedPostItem.splice(index, 1);
        }

        CurrentfeedPostItem.likes = cpyLikesFromCurrentFeedPostItem;
        await updateFeedPostAction(CurrentfeedPostItem, '/feed');
    }

    return (
        <Fragment>
            <div className="mx-auto max-w-7xl">
                <div className="flex items-baseline justify-between dark:border-white border-b pb-6 pt-6 sm:pt-12 md:pt-24">
                    <h1 className="dark:text-white text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-gray-900">
                        Explore Feed
                    </h1>
                    <div className="flex items-center">
                        <Button
                            onClick={() => setShowPostDialog(true)}
                            className="flex h-11 items-center justify-center px-5"
                        >
                            Add New Post
                        </Button>
                    </div>
                </div>
                <div className="py-12">
                    <div className="container m-auto p-0 flex flex-col gap-5 text-gray-700">
                        {allFeedPosts && allFeedPosts.length > 0 ? (
                            allFeedPosts.map((feedPostItem: any) => (
                                <div
                                    key={feedPostItem?._id || Math.random()}
                                    className="group relative -mx-4 p-6 rounded-3xl bg-gray-100 hover:bg-white hover:shadow-2xl cursor-auto shadow-2xl shadow-transparent gap-8 flex"
                                >
                                    <div className="sm:w-2/6 rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-xl">
                                        <Image
                                            src={feedPostItem?.image || ""}
                                            alt="Post"
                                            className="h-80 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="sm:p-2 sm:pl-0 sm:w-4/6">
                                        <span className="mt-4 mb-2 inline-block font-medium text-gray-500 sm:mt-0">
                                            {feedPostItem?.userName || "Anonymous"}
                                        </span>
                                        <h3 className="mb-6 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                                            {feedPostItem?.message || ""}
                                        </h3>
                                        <div className="flex gap-5">
                                            <Heart
                                                size={25}
                                                fill={feedPostItem?.likes?.length > 0 ? "#FF0000" : "#ffffff"}
                                                className="cursor-pointer text-[#FF0000]"
                                                onClick={() => handleUpdateFeedPostLikes(feedPostItem)}
                                            />
                                            <span className="font-semibold text-xl">
                                                {feedPostItem?.likes?.length || 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>No posts found!</h1>
                        )}
                    </div>
                </div>
            </div>
            <Dialog
                open={showPostDialog}
                onOpenChange={() => {
                    setShowPostDialog(false);
                    setFormData({
                        message: "",
                        imageURL: "",
                    });
                }}
            >
                <DialogContent className="h-[550px]">
                    <Textarea
                        name="message"
                        value={formData?.message || ""}
                        onChange={(event) =>
                            setFormData((prev) => ({
                                ...prev,
                                message: event.target.value,
                            }))
                        }
                        placeholder="What do you want to talk about?"
                        className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[200px] text-2xl"
                    />
                    <div className="flex gap-5 items-center justify-between">
                        <Label htmlFor="imageURL">
                            <CirclePlus className="cursor-pointer" />
                            <Input
                                onChange={handleFileOnChange}
                                className="hidden"
                                id="imageURL"
                                type="file"
                            />
                        </Label>
                        <Button
                            onClick={handleSaveFeedPost}
                            disabled={!formData?.imageURL && !formData?.message}
                            className="flex w-40 h-11 items-center justify-center px-5 disabled:opacity-65"
                        >
                            Post
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
