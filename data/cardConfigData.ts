import { FaMountain } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { GiClick } from "react-icons/gi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuMousePointerClick } from "react-icons/lu";
import { MdOutlineElectricBolt, MdOutlineMotionPhotosPaused } from "react-icons/md";
import { PiGraphFill, PiStrategy } from "react-icons/pi";
import { SiCampaignmonitor } from "react-icons/si";
import { VscLayersActive } from "react-icons/vsc";

export const cardConfig = [
    {
        key: "total_campaigns",
        title: "Total Campaigns",
        subTitle: "Total number of campaigns created",
        icon: PiGraphFill,
        color: "#ffffff"
    },
    {
        key: "active_campaigns",
        title: "Active Campaigns",
        subTitle: "Total number of active campaigns",
        icon: VscLayersActive,
        color: "#0981B5"
    },
    {
        key: "paused_campaigns",
        title: "Paused Campaigns",
        subTitle: "Total number of paused campaigns",
        icon: MdOutlineMotionPhotosPaused,
        color: "#E3B910"
    },
    {
        key: "completed_campaigns",
        title: "Completed Campaigns",
        subTitle: "Total number of completed campaigns",
        icon: IoMdCheckmarkCircleOutline,
        color: "#108954"
    },
];

export const cardPerformanceConfig = [
    {
        key: "total_impressions",
        title: "Total Impressions",
        subTitle: "Total number of impressions",
        value: 493264,
        icon: FaChartSimple,
        color: '#3239fa',
        isComma: true,
    },
    {
        key: "total_clicks",
        title: "Total Clicks",
        subTitle: "Total number of clicks",
        value: 19605,
        icon: GiClick,
        color: '#07f5c5',
        isComma: true,
    },
    {
        key: "total_conversions",
        title: "Total Conversions",
        subTitle: "Total number of conversions",
        value: 685,
        icon: SiCampaignmonitor,
        color: '#07bfed',
        isComma: true,
    },
    {
        key: "total_spend",
        title: "Total Spend",
        subTitle: "Total amount spent",
        value: '41420',
        icon: FaMountain,
        color: '#14dba6',
        isCurrency: true,
    },
    {
        key: "avg_ctr",
        title: "Average CTR",
        subTitle: "Average click-through rate",
        value: 3.97,
        icon: MdOutlineElectricBolt,
        color: '#f25d07',
        isPercentage: true,
    },
    {
        key: "avg_cpc",
        title: "Average CPC",
        subTitle: "Average cost per click",
        value: 2.11,
        icon: LuMousePointerClick,
        color: '#f20765',
        isCurrency: true,
    },
    {
        key: "avg_conversion_rate",
        title: "Average Conversion Rate",
        subTitle: "Average conversion rate",
        value: 3.49,
        icon: PiStrategy,
        color: '#7628eb',
        isPercentage: true,
    },
];