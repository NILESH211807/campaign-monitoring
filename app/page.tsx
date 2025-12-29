
"use client";
import { Activity, Suspense, useMemo } from "react";
import Campaigns from "@/components/Campaigns";
import InsightsCard from "@/components/InsightsCard";
import Navbar from "@/components/Navbar";
import { MdErrorOutline } from "react-icons/md";
import { fetchInsights } from "@/lib/api/fetch";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { cardConfig, cardPerformanceConfig } from "@/data/cardConfigData";
import { useSearchParams } from "next/navigation";
import Campaign from "@/components/Campaign";

function Dashboard() {

    const searchParams = useSearchParams();
    const campaignId = searchParams?.get("campaign") ?? null;

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["CAMP_INSIGHTS"],
        queryFn: fetchInsights,
    });

    // insights data
    const [insights, performanceData] = useMemo(() => {
        if (isPending || isError || !data) return [];
        const insights = cardConfig.map(card => ({
            ...card,
            value: data?.insights[card?.key]
        }));

        const performanceData = cardPerformanceConfig.map(item => ({
            ...item,
            value: data?.insights[item?.key]
        }));

        return [insights, performanceData];
    }, [data, isPending, isError]);


    if (isError || error) {
        return (
            <div className="w-full h-screen flex items-center justify-center flex-col gap-2">
                <MdErrorOutline size={60} className="text-red-600" />
                <h1 className="text-xl font-semibold text-red-600">{error?.message || "Something went wrong!"}</h1>
                <p className="text-sm text-gray-500">Please try again later.</p>
            </div>
        )
    }

    if (isPending) return (
        <div className="w-full h-screen flex items-center justify-center">
            <Loading />
        </div>
    );

    return (
        <div className="min-h-screen w-full relative">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(circle at top, #1c1c1c, #000000)",
                }}
            />
            <div className="relative z-10">
                <Navbar />
                <div className="w-full max-w-350 mx-auto px-5 py-10 max-sm:px-3">
                    <div className="w-full grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {
                            insights?.map((item, index) => (
                                <InsightsCard key={index} item={item} />
                            ))
                        }
                    </div>

                    <div className="w-full">
                        <h2 className="text-xl font-semibold my-5 text-white">Performance Insights</h2>

                        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-3 max-md:gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                            {
                                performanceData?.map((item, index) => (
                                    <InsightsCard key={index} item={item} />
                                ))
                            }
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="my-6">
                            <h1 className="text-2xl font-bold text-white mb-1">Campaigns</h1>
                            <p className="text-sm font-medium -my-1 text-[#666666]">Manage and monitor your advertising campaigns</p>
                        </div>
                        <Campaigns />
                    </div>
                </div>
                <Activity mode={campaignId ? "visible" : "hidden"}>
                    <Campaign />
                </Activity>
            </div>
        </div>
    );
}


export default function Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">
            <Loading />
        </div>}>
            <Dashboard />
        </Suspense>
    );
}