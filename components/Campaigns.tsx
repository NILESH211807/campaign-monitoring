"use client";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { fetchCampaigns } from "@/lib/api/fetch";
import { MdError } from "react-icons/md";
import Loading from "./Loading";
import { FaEye } from "react-icons/fa";
import { formatCurrency, formatDate, getPlatClass, getStatusClass } from "@/helper/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export type Campaign = {
    id: string;
    name: string;
    brand_id: string;
    status: string;
    budget: number;
    daily_budget: number;
    platforms: string[];
    created_at: string;
}

type Campaigns = {
    campaigns: Campaign[];
    total: number;
}

export default function Campaigns() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const campaignId = searchParams?.get("campaign") ?? null;


    const updateQueryParam = (value: string | null) => {
        const params = new URLSearchParams(searchParams?.toString());
        if (!value) {
            params.delete("campaign");
        } else {
            params.set("campaign", value);
        }

        const query = params.toString();
        const newUrl = query ? `${pathname}?${query}` : pathname || "";

        if (campaignId === value) return;

        if (!campaignId) {
            router.push(newUrl, { scroll: false });
        } else {
            router.replace(newUrl, { scroll: false });
        }
    };

    const { data, isPending, isError, error, refetch } = useQuery<Campaigns>({
        queryKey: ["CAMPAIGNS"],
        queryFn: fetchCampaigns,
    });

    const handleClick = (camp: Campaign) => {
        const id = camp.id;
        updateQueryParam(id);
    };

    if (isPending) {
        return (
            <div className="w-full h-52 flex items-center justify-center border border-[#0c0c0c] bg-linear-to-br from-[#0c0c0c] to-[#111111] backdrop-blur-sm shadow-2xl overflow-hidden rounded-md flex-col gap-5">
                <Loading width="40px" height="40px" />
                <h1 className="text-sm text-center">Loading...</h1>
            </div>
        )
    }

    if (isError || error) {
        return (
            <div className="w-full h-52 flex items-center justify-center border border-[#462b2b70] bg-linear-to-br from-[#4d2a2a4d] to-[#271a1a46] backdrop-blur-sm shadow-2xl overflow-hidden rounded-md flex-col gap-2">
                <MdError className="text-4xl text-red-500" />
                <h1 className="text-xl">{error?.message || "Something went wrong"}</h1>
                <button
                    onClick={() => refetch()}
                    className="px-4 py-1 text-sm uppercase cursor-pointer bg-gray-800 text-white rounded-md hover:bg-gray-700"
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="rounded-md border border-[#0c0c0c] bg-linear-to-br from-[#0c0c0c] to-[#111111] backdrop-blur-sm shadow-2xl overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-[#0c0c0c] bg-[#131313]">
                        <TableHead className="text-gray-300 font-semibold text-xs capitalize tracking-wide py-4 px-6">
                            Campaign Name
                        </TableHead>
                        <TableHead className="text-gray-300 font-semibold text-xs capitalize tracking-wide py-4 px-6">
                            Status
                        </TableHead>
                        <TableHead className="text-gray-300 font-semibold text-xs capitalize tracking-wide py-4 px-6">
                            Budget
                        </TableHead>
                        <TableHead className="text-gray-300 font-semibold text-xs capitalize tracking-wide py-4 px-6 text-left">
                            Daily Budget
                        </TableHead>
                        <TableHead className="text-gray-300 font-semibold text-xs capitalize tracking-wide py-4 px-6 text-right">
                            Platforms
                        </TableHead>
                        <TableHead className="text-gray-300 font-semibold text-xs capitalize tracking-wide py-4 px-6 text-right">
                            Created
                        </TableHead>
                        <TableHead className="text-gray-300 font-semibold text-xs capitalize tracking-wide py-4 px-6 text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.campaigns?.map((camp, index) => (
                            <TableRow key={index} className="border-b border-[#0a0a0a] hover:bg-[#131313] transition-all duration-200 group">
                                <TableCell>
                                    <div className="font-medium pl-4 text-white group-hover:text-gray-100 transition-colors">
                                        {camp.name}
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusClass(camp.status)}`}>
                                        <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-75"></span>
                                        {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    <span className="text-white font-semibold">{formatCurrency(camp.budget)}</span>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-left">
                                    <span className="text-gray-300 font-medium">{formatCurrency(camp.daily_budget)}</span>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-right">
                                    <div className="flex flex-wrap gap-1.5 justify-end">
                                        {camp.platforms.map((platform, idx) => (
                                            <span
                                                key={idx}
                                                className={`inline-flex items-center px-2 rounded-full py-0.5 text-xs font-medium border ${getPlatClass(platform)}`}
                                            >
                                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-right">
                                    <span className="text-gray-400 text-sm">{formatDate(camp.created_at)}</span>
                                </TableCell>
                                <TableCell className="py-4 px-6 flex items-center justify-end">
                                    <span onClick={() => handleClick(camp)} className="text-gray-400 text-sm bg-[#0a0a0a] p-2 rounded-md cursor-pointer hover:bg-[#0e0e0e]">
                                        <FaEye size={18} />
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}
