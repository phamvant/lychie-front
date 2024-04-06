import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const HeroHeader = () => {
  return (
    <section className="pb-12 mt-20 text-center lg:items-center lg:gap-8 h-screen bg-[url('/bg.jpeg')] bg-no-repeat bg-cover">
      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="space-y-4 backdrop-blur-md p-6 px-8 rounded-full">
          <h1 className="text-4xl font-bold lg:text-6xl text-white">
            Landing pages
          </h1>
          <h2 className="text-lg font-light text-muted-foreground lg:text-3xl text-white">
            Easy to setup. Customizable. Quick. Responsive.
          </h2>
        </div>
        <Link
          href="https://github.com/phamvant/dreamhacker"
          target="_blank"
          className={`w-[10rem] bg-slate-200/50 backdrop-blur-md text-black ${cn(
            buttonVariants({ size: "lg" })
          )}`}
        >
          Get started
        </Link>
      </div>
      {/* <div className="flex flex-1 justify-center lg:justify-end">
        <Image
          src={"/hero.png"}
          height={500}
          width={500}
          className="h-auto"
          alt="Header image"
        />
      </div> */}
    </section>
  );
};

export default HeroHeader;
