import SiteLayout from "@/components/layout/SiteLayout";
import Reveal from "@/components/animations/Reveal";
import Image from "next/image";

type DownloadCardProps = {
  label: string;
  title: string;
  description: string;
  image: string;
  heightClass?: string; // fixed height like h-[574px]
  buttons?: Array<{
    text: string;
    icon: string; // icon path from public
    href?: string;
  }>;
};

function DownloadCard({
  label,
  title,
  description,
  image,
  heightClass = "h-[574px]",
  buttons = [],
}: DownloadCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl ${heightClass}`}>
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 590px"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />

      {/* bottom-left content */}
      <div className="relative flex h-full flex-col justify-end p-6 text-left text-white">
        <p className="mb-2 text-3x1 text-white">{label}</p>
        <h3 className="mt-1 text-3xl font-extrabold">{title}</h3>
        <p className="mt-3 max-w-[420px] text-sm text-white/80">{description}</p>

        {/* buttons */}
        <div className="mt-5 flex flex-wrap gap-3">
          {buttons.map((b, idx) => (
           <a
  key={idx}
  href={b.href ?? "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex h-[50px] w-fit items-center gap-3 rounded-lg bg-[#0F83FF] px-4 text-sm font-semibold text-white transition hover:brightness-110"
>

              {/* increased icon size */}
              <Image
  src={b.icon}
  alt=""
  width={b.icon.includes("apple.svg") ? 26 : 22}
  height={b.icon.includes("apple.svg") ? 26 : 22}
/>

              {b.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <SiteLayout>
      <section className="py-24 pt-28 md:py-32 md:pt-56">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold text-[#1A1A1A] md:text-5xl">
                Download Planformer
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-[#1A1A1A]">
                Get the speed, accuracy, and simplicity of our takeoff software
                on any device. Whether you are in the office or on-site, you can
                measure, estimate, and plan without slowing down.
              </p>
            </div>
          </Reveal>

          {/* ROW 1 */}
          <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:gap-6">
            <Reveal>
              <div className="w-full lg:w-[590px]">
                <DownloadCard
                  label="Desktop"
                  title="macOS"
                  description="Smooth, optimized experience for measuring and exporting on macOS."
                  image="/assets/images/download/MacBook.webp"
                  heightClass="h-[574px]"
                  buttons={[
                    {
                      text: "Download for macOS",
                      icon: "/assets/icons/downloadpageicon/apple.svg",
                    },
                  ]}
                />
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="w-full lg:w-[590px]">
                <DownloadCard
                  label="Desktop"
                  title="Windows"
                  description="Get the complete takeoff experience with smooth, reliable performance on Windows."
                  image="/assets/images/download/Group 3.webp"
                  heightClass="h-[574px]"
                  buttons={[
                    {
                      text: "Download for Windows",
                      icon: "/assets/icons/downloadpageicon/window.svg",
                    },
                  ]}
                />
              </div>
            </Reveal>
          </div>

         {/* ROW 2 - match Windows width and align to right */}
<div className="mt-6 flex justify-left">
  <Reveal>
    <div className="w-full lg:w-[1204px]">
      <DownloadCard
        label="Mobile"
        title="iOS & Android"
        description="Access your plans, check measurements, and stay connected on the go."
        image="/assets/images/download/iPhone.webp"
        heightClass="h-[574px]"
       buttons={[
  {
    text: "Download on App Store",
    icon: "/assets/icons/downloadpageicon/appstore.svg",
    href: "https://apps.apple.com/pk/app/planformer-smart-takeoffs/id6741836313",
  },
  {
    text: "Download on Play Store",
    icon: "/assets/icons/downloadpageicon/playstore.svg",
    href: "https://play.google.com/store/apps/details?id=com.planformer.app&pcampaignid=web_share",
  },
]}

      />
    </div>
  </Reveal>
</div>


          {/* ROW 3 - iPad (icon changed to appstore.svg) */}
          <div className="mt-6">
            <Reveal delay={0.06}>
              <div className="w-full lg:w-[590px]">
                <DownloadCard
                  label="Tablet"
                  title="iPad"
                  description="Perfect for on-site reviews and quick markups with a touch-friendly experience."
                  image="/assets/images/download/iPad.webp"
                  heightClass="h-[574px]"
                 buttons={[
  {
    text: "Download on App Store",
    icon: "/assets/icons/downloadpageicon/appstore.svg",
    href: "https://apps.apple.com/pk/app/planformer-smart-takeoffs/id6741836313",
  },
]}

                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
