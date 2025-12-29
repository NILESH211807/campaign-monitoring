import { formatCurrency } from "@/helper/helper";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IoCopyOutline } from "react-icons/io5";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export type InsightItem = {
    key: string;
    title: string;
    subTitle: string;
    value: number;
    icon: typeof IoCopyOutline;
    color: string;
    isCurrency?: boolean;
    isPercentage?: boolean;
    isComma?: boolean;
};

type InsightsCardProps = {
    item: InsightItem;
};


export default function InsightsCard({ item }: InsightsCardProps) {

    const numberRef = useRef<HTMLHeadingElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);


    // useGSAP(() => {
    //     const tl = gsap.from(boxRef.current, {
    //         opacity: 0,
    //         y: 50,
    //         duration: 1,
    //         scrollTrigger: {
    //             trigger: boxRef.current,
    //             start: "top 80%",
    //             end: "top 30%",
    //         }
    //     });

    //     return () => {
    //         tl.kill();
    //     };
    // }, [])

    // useEffect(() => {
    //     if (!item.value) return;
    //     const obj = { val: 0 };
    //     const gl = gsap.to(obj, {
    //         val: item.value,
    //         duration: 1,
    //         onUpdate: () => {
    //             if (numberRef.current) {
    //                 numberRef.current.innerText = item.isCurrency
    //                     ? formatCurrency(obj.val) : item?.isPercentage
    //                         ? `${obj.val}%` : obj.val.toLocaleString();
    //             }
    //         }
    //     });

    //     return () => {
    //         gl.kill();
    //     };
    // }, [item.value])

    return (
        <div ref={boxRef} className=" bg-[#1a1a1aa9] backdrop-blur-2xl rounded-md p-5 relative shadow-md border border-[#131313]">
            <h2 className="text-white opacity-50 text-sm tracking-wide">{item.title}</h2>
            <h1 className="text-3xl font-bold my-3" ref={numberRef}>
                {item.isCurrency ? formatCurrency(item.value) : !item?.isPercentage ? item.value.toLocaleString() : item.value}
                {item?.isPercentage ? '%' : ""}
            </h1>
            <h3 className="text-white opacity-80 text-[12px] tracking-wider font-light">{item.subTitle}</h3>

            <span className="absolute right-5 top-6 flex items-center justify-center rounded-full">
                <item.icon size={40} color={item.color} />
            </span>
        </div>
    )
}