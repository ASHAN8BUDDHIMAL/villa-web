import Image from "next/image";
import RoomCard from "@/components/RoomCard";
import HeroSlider from "@/components/HeroSlider";
import { connectDB } from "@/lib/mongodb";
import { Room } from "@/models/Room";
import { SiteContent } from "@/models/SiteContent";
import { GalleryPhoto } from "@/models/GalleryPhoto";

export const dynamic = "force-dynamic";

const defaultHero = { tagline: "Southern Coast · Sri Lanka", title: "Villa Galle", subtitle: "A boutique luxury retreat where the Indian Ocean meets tropical serenity.", images: [] as string[], autoScroll: true, scrollInterval: 5 };
const defaultFeatures: { icon: string; title: string; desc: string }[] = [];

const staticContactDetails = [
  { label: "Email",     value: "hello@villagalle.com", href: "mailto:hello@villagalle.com" },
  { label: "Phone",     value: "+94 00 000 0000",      href: "tel:+94000000000" },
  { label: "Address",   value: "Galle, Southern Province, Sri Lanka", href: "" },
  { label: "Check-in",  value: "From 2:00 PM",         href: "" },
  { label: "Check-out", value: "Until 11:00 AM",       href: "" },
];

const staticFeatures = [
  { title: "Ocean Views",       desc: "Wake up to uninterrupted panoramas of the Indian Ocean from every suite. The horizon stretches endlessly, framed by swaying palms and morning mist." },
  { title: "Private Pool",      desc: "Each villa features a temperature-controlled private plunge pool set within a lush tropical garden — your own secluded sanctuary." },
  { title: "Curated Dining",    desc: "Our chef crafts daily menus inspired by Sri Lankan coastal flavours — fresh seafood, spiced curries, and tropical fruits from local farms." },
  { title: "Concierge Service", desc: "From sunrise yoga to sunset boat tours, our dedicated team curates every detail of your stay with warmth and precision." },
];

export default async function HomePage() {
  let rooms: { _id: unknown; name: string; price: number; image: string; description: string }[] = [];
  let hero = defaultHero;
  let features = defaultFeatures;
  let photos: { url: string; caption: string; span: string }[] = [];
  let contactDetails = staticContactDetails;

  try {
    await connectDB();
    const [dbRooms, dbPhotos, content] = await Promise.all([
      Room.find().lean(),
      GalleryPhoto.find().sort({ order: 1 }).lean(),
      SiteContent.findOne().lean(),
    ]);
    rooms    = dbRooms as typeof rooms;
    photos   = dbPhotos as typeof photos;
    hero     = (content?.hero ?? defaultHero) as typeof defaultHero;
    features = content?.features ?? defaultFeatures;
    if (content?.contact?.details?.length) contactDetails = content.contact.details;
  } catch {
    // DB unavailable — render with fallback defaults
  }

  const displayFeatures = features.length > 0 ? features : staticFeatures;

  return (
    <>
      {/* ── HERO ── */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroSlider images={hero.images ?? []} autoScroll={hero.autoScroll ?? true} scrollInterval={hero.scrollInterval ?? 5} />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-sand-300 text-sm tracking-[0.5em] uppercase mb-10 opacity-90">{hero.tagline}</p>
          <h1 className="font-display text-7xl md:text-9xl text-ivory leading-[1.0] mb-10 tracking-wide">{hero.title}</h1>
          <p className="text-ivory/65 text-xl md:text-2xl leading-relaxed mb-16 max-w-2xl mx-auto font-light">{hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#contact" className="px-14 py-6 bg-sand-600 text-ivory text-sm tracking-[0.3em] uppercase hover:bg-sand-700 transition-all duration-500">Contact Us</a>
            <a href="#rooms" className="px-14 py-6 border border-ivory/30 text-ivory text-sm tracking-[0.3em] uppercase hover:bg-ivory/10 hover:border-ivory/60 transition-all duration-500">Explore Rooms</a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-ivory/40 z-10">
          <span className="text-xs tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-ivory/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-ivory py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-sand-400 text-sm tracking-[0.4em] uppercase mb-6">The Experience</p>
            <h2 className="font-display text-6xl md:text-7xl text-stone-900 mb-8">Life at Villa Galle</h2>
            <p className="text-stone-400 text-xl max-w-2xl mx-auto leading-relaxed">Every element of your stay is thoughtfully designed to immerse you in the beauty and culture of Sri Lanka&apos;s southern coast.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-sand-200">
            {displayFeatures.map((f: { icon?: string; title: string; desc: string }) => (
              <div key={f.title} className="bg-ivory p-14 hover:bg-sand-100 hover:-translate-y-1 transition-all duration-500 group">
                <div className="w-10 h-px bg-sand-400 mb-10" />
                <h3 className="font-display text-3xl text-stone-800 mb-5 group-hover:text-sand-700 transition-colors duration-300">{f.title}</h3>
                <p className="text-lg text-stone-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROOMS ── */}
      <section id="rooms" className="bg-stone-200 py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sand-500 text-sm tracking-[0.4em] uppercase mb-6">Accommodations</p>
            <h2 className="font-display text-6xl md:text-7xl text-stone-900 mb-8">Our Rooms</h2>
            <p className="text-stone-400 text-xl max-w-2xl mx-auto leading-relaxed">Three distinct suites, each designed to offer a unique perspective on the villa&apos;s gardens, pool, and the Indian Ocean beyond.</p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-300 mb-20">
            {[{ label: "Suite Size", value: "From 65 m²" }, { label: "Occupancy", value: "Up to 3 Guests" }, { label: "Availability", value: "Year Round" }].map(s => (
              <div key={s.label} className="bg-stone-200 py-14 text-center">
                <p className="font-display text-5xl text-stone-800 mb-3">{s.value}</p>
                <p className="text-sm text-stone-400 tracking-[0.3em] uppercase">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {rooms.map(room => <RoomCard key={String(room._id)} room={{ ...room, _id: String(room._id) }} />)}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="bg-stone-900 py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <p className="text-sand-500 text-sm tracking-[0.4em] uppercase mb-8">Why Choose Us</p>
            <h2 className="font-display text-6xl md:text-7xl text-ivory mb-10 leading-tight">An Escape Crafted for the Discerning Traveller</h2>
            <div className="w-14 h-px bg-sand-600 mb-12" />
            <p className="text-stone-400 text-xl leading-relaxed mb-8">Villa Galle is not a hotel — it is a home. With only three private suites, we offer an intimacy that larger resorts simply cannot match. Every guest is known by name, every preference remembered, every moment elevated.</p>
            <p className="text-stone-400 text-xl leading-relaxed">All rates are inclusive of daily breakfast, afternoon tea, and access to the villa&apos;s shared spaces — the pool terrace, library, and tropical gardens.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-stone-700">
            {["Daily Breakfast", "Afternoon Tea", "Pool & Garden Access", "High-Speed Wi-Fi", "Airport Transfer", "Concierge Service", "Turndown Service", "Welcome Amenities"].map(item => (
              <div key={item} className="bg-stone-900 px-10 py-8 flex items-center gap-5">
                <span className="w-5 h-px bg-sand-600 shrink-0" />
                <span className="text-stone-300 text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="relative py-40 px-6 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/demo/video/upload/v1689861574/samples/sea-turtle.mp4" type="video/mp4" />
          <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-tropical-beach-1580/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-stone-900/70" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sand-400 text-sm tracking-[0.4em] uppercase mb-6">Visual Journey</p>
            <h2 className="font-display text-6xl md:text-7xl text-ivory mb-8">Gallery</h2>
            <p className="text-stone-300 text-xl max-w-2xl mx-auto leading-relaxed">A glimpse into the spaces, light, and textures that make Villa Galle a place unlike any other.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[360px]">
            {photos.length === 0 ? (
              <p className="col-span-3 text-center text-stone-400 text-lg py-20">No photos yet.</p>
            ) : photos.map((p, i) => (
              <div key={i} className={`relative overflow-hidden group cursor-pointer ${p.span ?? ""}`}>
                <Image src={p.url} alt={p.caption} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-ivory font-display text-2xl">{p.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-ivory py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sand-400 text-sm tracking-[0.4em] uppercase mb-6">Get in Touch</p>
            <h2 className="font-display text-6xl md:text-7xl text-stone-900 mb-8">Contact Us</h2>
            <p className="text-stone-400 text-xl max-w-2xl mx-auto leading-relaxed">We are always happy to hear from you. Reach out for reservations, questions, or simply to say hello.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
            <div>
              <p className="text-sand-400 text-sm tracking-[0.4em] uppercase mb-8">Contact Details</p>
              <ul className="space-y-0">
                {contactDetails.map(d => (
                  <li key={d.label} className="flex flex-col gap-3 border-b border-sand-100 py-7 first:pt-0">
                    <span className="text-sm text-stone-300 tracking-[0.3em] uppercase">{d.label}</span>
                    {d.href
                      ? <a href={d.href} className="text-stone-700 hover:text-sand-600 transition-colors duration-300 text-2xl">{d.value}</a>
                      : <span className="text-stone-700 text-2xl">{d.value}</span>
                    }
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-sand-400 text-sm tracking-[0.4em] uppercase">Location</p>
              <div className="bg-sand-100 flex flex-col items-center justify-center min-h-[22rem] gap-6 px-12 text-center">
                <div className="w-12 h-px bg-sand-400" />
                <p className="font-display text-5xl text-stone-700">Galle, Sri Lanka</p>
                <p className="text-sm text-stone-400 tracking-[0.3em] uppercase">Southern Province · Indian Ocean Coast</p>
                <p className="text-stone-400 text-lg leading-relaxed max-w-sm">Located within walking distance of the Galle Fort, 2 hours south of Colombo by expressway.</p>
                <a href="https://maps.google.com/?q=Galle,Sri+Lanka" target="_blank" rel="noopener noreferrer" className="text-sm text-sand-600 tracking-[0.3em] uppercase border-b border-sand-300 hover:border-sand-600 pb-0.5 transition-colors duration-300">Open in Google Maps</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
