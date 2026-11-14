import { blindLinks, footerExplore } from "@/data/navigation";
import { site } from "@/lib/site";
import { ArrowRight } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <li>
      <a href={href} className="inline-flex min-h-9 items-center text-[#A8ADAD] transition-colors duration-300 ease-[ease] hover:text-accent">
        {children}
      </a>
    </li>
  );
}

export function Footer() {
  return (
    <footer data-screen-label="Footer" className="bg-black text-[#A8ADAD]">
      <div className="mx-auto max-w-[1440px] px-[clamp(20px,4.5vw,72px)] pt-[clamp(72px,8vw,112px)] pb-8">
        <div className="flex flex-wrap gap-x-[clamp(32px,4vw,64px)] gap-y-14">
          <div className="max-w-[440px] flex-[2_1_320px]">
            <a href="#home" aria-label="Mireva Window Studio, back to top" className="inline-flex items-center">
              <Logo tone="dark" markClassName="h-11 w-auto" />
            </a>
            <p className="mt-7 text-[15px] leading-[1.7] text-pretty text-[#A8ADAD]">
              A fictional made-to-measure window coverings studio concept for Christchurch and North Canterbury — personal advice, samples at home, and professional installation.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex min-h-11 items-center gap-2.5 font-heading text-[15px] font-semibold text-accent transition-colors duration-300 ease-[ease] hover:text-white"
            >
              Book a free measure &amp; quote
              <ArrowRight size={16} />
            </a>
          </div>

          <nav aria-label="Blinds" className="flex-[1_1_170px]">
            <h2 className="font-heading text-xs font-semibold tracking-[0.14em] text-white uppercase">Blinds</h2>
            <ul className="mt-5 flex list-none flex-col gap-0.5 p-0 text-[15px]">
              {blindLinks.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer" className="flex-[1_1_170px]">
            <h2 className="font-heading text-xs font-semibold tracking-[0.14em] text-white uppercase">Explore</h2>
            <ul className="mt-5 flex list-none flex-col gap-0.5 p-0 text-[15px]">
              {footerExplore.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </ul>
          </nav>

          <div className="flex-[1_1_220px]">
            <h2 className="font-heading text-xs font-semibold tracking-[0.14em] text-white uppercase">Contact</h2>
            <div className="mt-5 flex flex-col gap-5 text-[15px]">
              <div>
                <div className="text-[13px] text-[#7E8585]">Call</div>
                <div className="mt-0.5 font-heading text-[17px] font-semibold text-white">{site.phoneDisplay}</div>
              </div>
              <div>
                <div className="text-[13px] text-[#7E8585]">Enquiries</div>
                <a
                  href="#contact"
                  className="inline-flex min-h-8 items-center font-heading text-[17px] font-semibold text-white transition-colors duration-300 ease-[ease] hover:text-accent"
                >
                  Use the enquiry form
                </a>
              </div>
              <div>
                <div className="text-[13px] text-[#7E8585]">Service area</div>
                <div className="mt-1 font-medium text-white">{site.area}</div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-[13px] leading-relaxed text-[#7E8585]">
          Fictional website concept created by{" "}
          <a
            href={site.pegasusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A8ADAD] underline decoration-transparent transition-colors duration-300 hover:text-accent hover:decoration-current"
          >
            Pegasus Digital
          </a>
          . Mireva Window Studio is not a trading business.
        </p>
        <a
          href={site.pegasusRedesignsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-9 items-center text-[13px] font-medium text-[#A8ADAD] transition-colors duration-300 hover:text-accent"
        >
          Explore Pegasus Digital Website Redesigns
        </a>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t-2 border-[#1F2323] pt-6 text-[13px] text-[#7E8585]">
          <span>
            Website design © 2026{" "}
            <a
              href={site.pegasusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A8ADAD] transition-colors duration-300 hover:text-accent"
            >
              Pegasus Digital
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
