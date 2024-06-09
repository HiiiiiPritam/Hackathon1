

import NextTopLoader from "nextjs-toploader";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import HomeContent from "@/components/HomeContent";

export default function Home() {
    return (
        <>
            <NextTopLoader
                crawlSpeed={100}
                speed={200}
            />
            <div className="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
                <div className="invert absolute z-0 top-24 left-16 opacity-10 rotate-45 animate-pulse">
                    <Image src={"/dollar-sign.svg"} alt="dollar-sign" width={90} height={90} />
                </div>
                <div className="invert absolute z-0 top-[70%] left-[50%] opacity-10 rotate-45 animate-pulse">
                    <Image src={"/dollar-sign.svg"} alt="dollar-sign" width={90} height={90} />
                </div>
                <div className="invert absolute z-0 top-24 left-[80%] opacity-10 -rotate-12 animate-pulse">
                    <Image src={"/dollar-sign.svg"} alt="dollar-sign" width={90} height={90} />
                </div>
                <div className="invert absolute z-0 top-[80%] left-[10%] opacity-10 -rotate-45 animate-pulse">
                    <Image src={"/dollar-sign.svg"} alt="dollar-sign" width={90} height={90} />
                </div>
                <div className="invert absolute z-0 top-[80%] left-[90%] opacity-10 rotate-6 animate-pulse">
                    <Image src={"/dollar-sign.svg"} alt="dollar-sign" width={90} height={90} />
                </div>
                <div className="text-white">
                    <Navbar />
                    <div className="relative top-24">
                        <HomeContent />
                    </div>
                </div>
            </div>
        </>
    );
}