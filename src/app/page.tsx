import Link from "next/link";
import Image from "next/image";
import RoomCard from "@/components/RoomCard";
import { connectDB } from "@/lib/mongodb";
import { SiteContent } from "@/models/SiteContent";
import { Room } from "@/models/Room";

async function getContent() {
  await connectDB();
  const content = await SiteContent.findOne().lean();
  if (content) return content;
  return (await SiteContent.create({})).toObject();
}

export default async function HomePage() {
  const [c, rooms] = await Promise.all([
    getContent(),
    (async () => { await connectDB(); return Room.find().lean(); })()
  ]);
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900">
          <Image
            src="https://placehold.co/1920x1080/2a2018/9a7a4a?text=Villa+Galle"
            alt="Villa Galle hero"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-sand-300 text-xs tracking-[0.4em] uppercase mb-6">{c.hero.tagline}</p>
          <h1 className="font-display text-5xl md:text-7xl text-ivory leading-tight mb-6">
            {c.hero.title}
          </h1>
          <p className="text-ivory/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            {c.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-3.5 bg-sand-600 text-ivory text-sm tracking-widest uppercase hover:bg-sand-700 transition-colors"
            >
              Book Your Stay
            </Link>
            <Link
              href="/rooms"
              className="px-8 py-3.5 border border-ivory/50 text-ivory text-sm tracking-widest uppercase hover:bg-ivory/10 transition-colors"
            >
              Explore Rooms
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-ivory/30 animate-pulse" />
        </div>
      </section>

      {/* Features */}
      <section className="bg-ivory py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sand-500 text-xs tracking-[0.3em] uppercase mb-3">The Experience</p>
            <h2 className="font-display text-4xl text-stone-900">Life at Villa Galle</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {c.features.map((f: { icon: string; title: string; desc: string }) => (
              <div key={f.title} className="text-center p-6">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-display text-lg text-stone-800 mb-2">{f.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms teaser */}
      <section className="bg-sand-100 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sand-500 text-xs tracking-[0.3em] uppercase mb-3">Accommodations</p>
              <h2 className="font-display text-4xl text-stone-900">Our Rooms</h2>
            </div>
            <Link href="/rooms" className="hidden sm:block text-sm text-sand-600 tracking-widest uppercase underline underline-offset-4 hover:text-sand-800 transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map(room => <RoomCard key={String(room._id)} room={room as never} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-24 px-6 text-center">
        <p className="text-sand-400 text-xs tracking-[0.3em] uppercase mb-4">Ready to escape?</p>
        <h2 className="font-display text-4xl md:text-5xl text-ivory mb-6">{c.cta.title}</h2>
        <p className="text-stone-400 max-w-md mx-auto mb-10 leading-relaxed">
          {c.cta.subtitle}
        </p>
        <Link
          href="/book"
          className="inline-block px-10 py-4 bg-sand-600 text-ivory text-sm tracking-widest uppercase hover:bg-sand-700 transition-colors"
        >
          Book Now
        </Link>
      </section>
    </>
  );
}
