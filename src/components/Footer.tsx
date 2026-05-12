import Link from "next/link";
import VillaLogo from "@/components/VillaLogo";
import { connectDB } from "@/lib/mongodb";
import { SiteContent } from "@/models/SiteContent";

const defaultContact = [
  { label: "email", value: "villagalle@gmail.com", href: "mailto:villagalle@gmail.com" },
  { label: "phone", value: "+94 710474331", href: "tel:+94710474331" },
  { label: "address", value: "Villa Galle, Devata Road, Galla, Southern Province", href: "" },
];

const defaultFooter = {
  brandText: "An intimate escape where tropical gardens meet the Indian Ocean — crafted for those who seek stillness, beauty, and the unhurried pace of Sri Lankan coastal life.",
  tagline: "Galle · Sri Lanka · Est. 2018",
};

export default async function Footer() {
  let contactDetails = defaultContact;
  let footer = defaultFooter;

  try {
    await connectDB();
    const content = await SiteContent.findOne().lean() as {
      contact?: { details?: { label: string; value: string; href: string }[] };
      footer?: { brandText?: string; tagline?: string };
    } | null;
    if (content?.contact?.details?.length) contactDetails = content.contact.details;
    if (content?.footer?.brandText) footer = { brandText: content.footer.brandText, tagline: content.footer.tagline ?? defaultFooter.tagline };
  } catch {
    // fallback to defaults
  }

  const email   = contactDetails.find(d => d.href?.startsWith("mailto:")) ?? contactDetails[0];
  const phone   = contactDetails.find(d => d.href?.startsWith("tel:"))    ?? contactDetails[1];
  const address = contactDetails.find(d => !d.href)                       ?? contactDetails[2];

  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-24 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* Brand */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <VillaLogo color="#5B82B8" textColor="#FFFFFF" subColor="#ADBFDF" size={44} />
          </div>
          <p className="text-lg leading-relaxed text-stone-500 max-w-sm mb-6">{footer.brandText}</p>
          <p className="text-base text-stone-600 leading-relaxed">
            Three private suites. Two acres of gardens.<br />One unforgettable experience.
          </p>
        </div>

        {/* Explore */}
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-sand-500 mb-7">Explore</p>
          <ul className="space-y-4">
            {[["Rooms", "/#rooms"], ["Gallery", "/#gallery"], ["About", "/#about"], ["Contact", "/#contact"]].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-stone-500 text-lg hover:text-ivory transition-colors duration-300">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-sand-500 mb-7">Contact</p>
          <ul className="space-y-4 text-stone-500">
            {email && (
              <li>
                <a href={email.href} className="text-lg hover:text-ivory transition-colors duration-300">{email.value}</a>
              </li>
            )}
            {phone && (
              <li>
                <a href={phone.href} className="text-lg hover:text-ivory transition-colors duration-300">{phone.value}</a>
              </li>
            )}
            {address && (
              <li className="text-lg leading-relaxed">{address.value}</li>
            )}
            <li className="pt-2">
              <Link href="/#contact" className="inline-block px-6 py-3 border border-sand-700 text-sand-500 text-sm tracking-[0.2em] uppercase hover:bg-sand-600 hover:text-ivory hover:border-sand-600 transition-all duration-500">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

      </div>
      <div className="border-t border-stone-800/60 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-base text-stone-500">
        <span>© {new Date().getFullYear()} Villa Galle. All rights reserved.</span>
        <span className="text-sm tracking-widest uppercase text-stone-600">{footer.tagline}</span>
      </div>
    </footer>
  );
}
