import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="bg-white gap-4 flex flex-col lg:flex-row mt-3 justify-between lg:justify-evenly w-full p-4 rounded-lg h-[calc(100vh-8.5rem)] lg:gap-16 ring-[2px] ring-gray-200 overflow-hidden grainy">
      <div className="flex-shrink-0 lg:w-1/2 justify-self-center  mt-2">
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl -top-24 sm:-top-60 lg:-top-90"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%)] aspect-[1155/678] w-[48rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#bf50c1] to-[#c23f3f] opacity-70 sm:opacity-30 sm:left-[calc(20%)] sm:w-[72.1875rem] lg:sm:w-[85rem] lg:-top-10"
            />
          </div>
        </div>

        <Image
          src={"/khukuri.png"}
          height={2251}
          width={3000}
          alt="khukuri image"
          className="w-full p-8 sm:p-6 md:p-4 lg:p-0 relative z-10 h-96 lg:h-[32rem] object-contain mx-auto flex-shrink-0 rounded-lg rotate-[4deg] lg:ml-8"
        />
      </div>

      <div className="flex relative gap-2 flex-col sm:gap-2 md:-mt-4 sm:-mt-9 md:gap-3 justify-center w-full flex-wrap shrink -mt-7 ">
        <div className="isolate hidden lg:block">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl -top-24 sm:-top-60 lg:-top-90"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%)] aspect-[1155/678] w-[48rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#e32b2b] to-[#e96f11]  sm:opacity-30 sm:left-[calc(50%)] sm:w-[72.1875rem] lg:sm:w-[85rem]"
            />
          </div>
        </div>

        <h2 className="font-bold text-3xl sm:text-4xl lg:text-6xl ">
          Handcrafted khukuri
        </h2>
        <h2 className="font-semibold text-xl sm:text-2xl lg:text-3xl shrink ">
          Nepal's Legendary Curved Knife, Artisanal Masterpiece .
        </h2>
        <Link href="/product/666e38c396774d226e1f2720">
        <Button className="self-start lg:mt-3" >Shop now</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

// bg-[url('/topi.png')] bg-no-repeat bg-[length:400px] sm:bg-[length:600px
