import SiteLayout from "@/components/layout/SiteLayout";
import Reveal from "@/components/animations/Reveal";
import { siteData } from "@/data/siteData";
import Link from "next/link";

import Image from "next/image";

export default function ContactPage() {
  return (
    <SiteLayout>
      {/* bg3.svg as real background */}
      <section
        className="relative overflow-hidden bg-white pt-32 pb-32 md:pt-56 md:py-32"
        style={{
          backgroundImage: "url('/assets/bg/bg3.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-14 md:grid-cols-2 md:items-start lg:gap-20">
  <Reveal>
    {/* MOBILE: center everything */}
    <div className="pt-16 text-[#1A1A1A] mx-auto w-full max-w-[380px] text-center md:max-w-none md:mx-0 md:text-left">
      {/* main icon */}
      <div className="flex h-24 w-24 items-center justify-center mx-auto md:mx-0">
        <Image
          src="/assets/icons/contact-icon/contact.svg"
          alt="Contact icon"
          width={84}
          height={84}
        />
      </div>

      <div className="max-w-[550px] mx-auto md:mx-0">
        <h1 className="mt-6 text-[34px] font-extrabold md:text-[44px]">
          Contact Us
        </h1>

        <p className="mt-4 text-sm md:text-base">
          Have questions, need support, or want to learn more about our
          platform? We are here to help. Whether you are a contractor,
          estimator, or project manager, our team is ready to support
          your workflow.
        </p>
      </div>
  {/* social icons - centered on mobile */}
<div className="mt-8 flex items-center justify-center gap-8 md:justify-start">
  <Link
    href="https://x.com/Planformer"
    aria-label="X"
    className="group"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      src="/assets/icons/socialmedia-icons/twitterx.svg"
      alt="X"
      width={22}
      height={22}
      className="transition-opacity group-hover:opacity-60"
      style={{ filter: "brightness(0)" }}
    />
  </Link>

  <Link
    href="https://www.instagram.com/planformer/"
    aria-label="Instagram"
    className="group"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      src="/assets/icons/socialmedia-icons/insta.svg"
      alt="Instagram"
      width={22}
      height={22}
      className="transition-opacity group-hover:opacity-60"
      style={{ filter: "brightness(0)" }}
    />
  </Link>

  <Link
    href="https://www.facebook.com/profile.php?id=61584807632276"
    aria-label="Facebook"
    className="group"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      src="/assets/icons/socialmedia-icons/facebook.svg"
      alt="Facebook"
      width={22}
      height={22}
      className="transition-opacity group-hover:opacity-60"
      style={{ filter: "brightness(0)" }}
    />
  </Link>

  <Link
    href="https://www.youtube.com/channel/UC0dFj16ro_cHa2pd9y4Q29A"
    aria-label="YouTube"
    className="group"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      src="/assets/icons/socialmedia-icons/youtube.svg"
      alt="YouTube"
      width={22}
      height={22}
      className="transition-opacity group-hover:opacity-60"
      style={{ filter: "brightness(0)" }}
    />
  </Link>
</div>



      {/* social icons - centered on mobile */}
      <div className="mt-0lex items-center justify-center gap-8 md:justify-start">
        {/* your icons here */}
      </div>

      {/* email - centered on mobile */}
      <div className="mt-8 text-[#1A1A1A]">
        <p className="font-semibold text-[14px] md:text-[16px]">
          {siteData.email}
        </p>
      </div>
    </div>
  </Reveal>
  



            <Reveal delay={0.08}>
              {/* FORM: keep it (no hiding). Just center it on mobile too, without changing md+ */}
              <form className="space-y-5 mx-auto w-full max-w-[520px] md:mx-0 md:ml-auto md:flex md:w-[460px] md:flex-col md:max-w-none">
                <div className="w-full">
                  <label className="block text-sm">Name</label>
                  <input
                    type="text"
                    className="mt-2 h-14 w-full rounded-[10px] border border-transparent bg-[#F2F2F2] px-4 text-sm outline-none focus:border-[#0F83FF]/40 focus:ring-2 focus:ring-[#0F83FF]/20"
                    placeholder="what should we call you"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm">Email</label>
                  <input
                    type="email"
                    className="mt-2 h-14 w-full rounded-[10px] border border-transparent bg-[#F2F2F2] px-4 text-sm outline-none focus:border-[#0F83FF]/40 focus:ring-2 focus:ring-[#0F83FF]/20"
                    placeholder="enter your email"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm">Organization</label>
                  <textarea
                    className="mt-2 w-full min-h-[120px] rounded-[10px] border border-transparent bg-[#F2F2F2] px-4 py-3 text-sm outline-none resize-none focus:border-[#0F83FF]/40 focus:ring-2 focus:ring-[#0F83FF]/20"
                    placeholder="enter your organization"
                    rows={4}
                  />
                </div>

                <button
                  type="button"
                  className="btn-primary h-14 w-full text-sm text-white"
                >
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
