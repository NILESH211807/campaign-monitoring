"use client";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import CampaignBadgeCard from "./CampaignBadgeCard";
import { formatDate, getPlatClass, getStatusClass } from "@/helper/helper";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { fetchCampaignById, fetchCampaignInsights } from "@/lib/api/fetch";
gsap.registerPlugin(useGSAP);


export default function Campaign() {

    const searchParams = useSearchParams();
    const campaignId = searchParams?.get("campaign") ?? null;
    const boxRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();

    useGSAP(() => {
        const tl = gsap.from(boxRef.current, {
            duration: 0.5,
            y: 100,
            ease: "power3.out"
        });

        return () => tl.kill();
    }, []);


    const updateQueryParam = (value: string | null) => {
        const params = new URLSearchParams(searchParams?.toString());
        if (!value) {
            params.delete("campaign");
        } else {
            params.set("campaign", value);
        }

        const query = params.toString();
        const newUrl = query ? `${pathname}?${query}` : pathname || "";

        if (!campaignId) {
            router.push(newUrl, { scroll: false });
        } else {
            router.replace(newUrl, { scroll: false });
        }
    };

    const close = () => {
        gsap.to(boxRef.current, {
            duration: 0.5,
            y: "100%",
            ease: "power3.out",
            onComplete: () => {
                updateQueryParam(null);
            }
        });
    }


    const { data: campData, isPending: campIsPending, isError: campIsError, error: campError } = useQuery({
        queryKey: ["campaign", campaignId],
        queryFn: async () => fetchCampaignById(campaignId),
        enabled: !!campaignId
    });

    const { data: insights, isPending: insightsIsPending, isError: insightsIsError, error: insightsError } = useQuery({
        queryKey: ["insights", campaignId],
        queryFn: async () => fetchCampaignInsights(campaignId),
        enabled: !!campaignId
    });

    const isLoading = (campIsPending || insightsIsPending);
    const isError = (campIsError || insightsIsError);
    const error = (campError || insightsError);


    return (
        <>
            <div className="w-full h-full bg-[#0000008c] fixed top-0 left-0 z-50 backdrop-blur-xs"></div>
            <div ref={boxRef} className="w-[95%] max-w-175 bg-[#111111] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-52 rounded-md shadow-md">

                {
                    isLoading ? (
                        <div className="w-full h-96 flex items-center justify-center">
                            <Loading />
                        </div>
                    ) : isError || error ? (
                        <div className="w-full h-60 flex items-center justify-center">
                            <h2 className="text-[16px] font-medium text-red-500">Error: {error?.message}</h2>
                        </div>
                    ) : (
                        <>
                            <div className="w-full px-4 py-1 flex items-center justify-between border-b-2 border-b-[#0e0e0e]">
                                <h2 className="text-[16px] font-medium">Campaign Details - {campData?.campaign?.id}
                                    <span className={`text-[12px] font-medium ml-3 py-0.75 rounded-full tracking-wide uppercase ${getStatusClass(campData?.campaign?.status)}`}>{campData?.campaign?.status}</span>
                                </h2>
                                <span onClick={close} className="w-12 h-12 cursor-pointer bg-[#111111] flex items-center justify-center rounded-full  top-2 right-2 hover:bg-[#0e0e0e] transition-all duration-300 ease-in-out">
                                    <IoMdClose size={25} />
                                </span>
                            </div>

                            <div className="w-full px-4 py-3">
                                <div className="w-full mb-5 mt-2 flex items-center justify-between gap-2">
                                    <h2 className="text-xl font-medium">{campData?.campaign?.name}</h2>
                                    <h2 className="text-[13px] font-medium">Created At {formatDate(campData?.campaign?.created_at)}</h2>
                                </div>
                                <div className="w-full grid grid-cols-2 gap-4 my-3 max-sm:grid-cols-1">
                                    <CampaignBadgeCard
                                        title="Total budget"
                                        isCurrency={true}
                                        value={campData?.campaign?.budget} />
                                    <CampaignBadgeCard
                                        title="Daily budget"
                                        isCurrency={true}
                                        value={campData?.campaign?.daily_budget} />
                                </div>
                                <div className="w-full">
                                    <h2 className="text-[13px] font-medium mb-2">Platforms</h2>
                                    {
                                        campData?.campaign?.platforms?.map((platform: string, index: number) => (
                                            <span
                                                key={index}
                                                className={`inline-flex items-center px-2 rounded-sm py-0.5 mx-1 text-sm font-medium border ${getPlatClass(platform)}`}
                                            >
                                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                            </span>
                                        ))
                                    }
                                </div>

                                <div className="w-full my-5 overflow-hidden">
                                    <h2 className="text-[16px] font-medium mb-2">Overview</h2>
                                    <div className="w-full scrollbar pb-3 flex overflow-x-auto whitespace-nowrap gap-2 my-3">
                                        <CampaignBadgeCard
                                            title="Total impressions"
                                            value={insights.insights.impressions}
                                            className="min-w-58"
                                            borderClassName="from-orange-500 to-emerald-500"
                                        />
                                        <CampaignBadgeCard
                                            title="Total clicks"
                                            value={insights.insights.clicks}
                                            className="min-w-58"
                                            borderClassName="from-orange-500 to-emerald-500" />
                                        <CampaignBadgeCard
                                            title="Total conversions"
                                            value={insights.insights.conversions}
                                            className="min-w-58"
                                            borderClassName="from-orange-500 to-emerald-500" />
                                        <CampaignBadgeCard
                                            title="Total spend"
                                            value={insights.insights.spend}
                                            className="min-w-58"
                                            isCurrency={true}
                                            borderClassName="from-orange-500 to-emerald-500" />
                                        <CampaignBadgeCard
                                            title="Total ctr"
                                            value={insights.insights.ctr}
                                            className="min-w-58"
                                            isPercentage={true}
                                            borderClassName="from-orange-500 to-emerald-500" />
                                        <CampaignBadgeCard
                                            title="Total cpc"
                                            value={insights.insights.cpc}
                                            className="min-w-58"
                                            isCurrency={true}
                                            borderClassName="from-orange-500 to-emerald-500" />
                                        <CampaignBadgeCard
                                            title="Total conversion rate"
                                            value={insights.insights.conversion_rate}
                                            className="min-w-58"
                                            isPercentage={true}
                                            borderClassName="from-orange-500 to-emerald-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-end px-5 pb-5 -mt-3">
                                <button type="button" onClick={close} className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-semibold cursor-pointer text-sm transition-all duration-300 ease-in-out">
                                    Close
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
};
