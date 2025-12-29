import { formatCurrency } from "@/helper/helper";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function CampaignBadgeCard({
    title,
    value,
    className,
    borderClassName,
    isCurrency = false,
    isPercentage = false,
}: {
    title: string,
    value: number,
    className?: string,
    borderClassName?: string,
    isCurrency?: boolean,
    isPercentage?: boolean,
}) {

    const numberRef = useRef<HTMLHeadingElement>(null);

    // useEffect(() => {
    //     if (!value) return;
    //     const obj = { val: 0 };
    //     const gl = gsap.to(obj, {
    //         val: value,
    //         duration: 1,
    //         onUpdate: () => {
    //             if (numberRef.current) {
    //                 numberRef.current.innerText = Math.floor(obj.val).toLocaleString();
    //             }
    //         }
    //     });

    //     return () => {
    //         gl.kill();
    //     };
    // }, [value]);


    return (
        <div className={`${className} border border-[#050505] bg-[#0c0c0c] rounded-md py-3 px-4`}>
            <h3 className="text-[11px] uppercase font-medium tracking-wider">{title}</h3>
            <h1 ref={numberRef} className="text-[23px] font-bold my-2">
                {isCurrency ? formatCurrency(value) : isPercentage ? `${value}%` : value.toLocaleString()}
            </h1>
            <div className={` bg-linear-to-br ${borderClassName || 'from-indigo-600 to-amber-500'} w-full h-1.25 rounded-full`}></div>
        </div>
    )
}