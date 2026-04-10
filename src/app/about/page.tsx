import Image from "next/image";

const values = [
  { title: "Authenticity",  desc: "Every detail reflects the culture and craftsmanship of southern Sri Lanka." },
  { title: "Sustainability", desc: "Solar-powered, rainwater harvested, and committed to zero single-use plastics." },
  { title: "Intimacy",       desc: "With only three suites, every guest receives undivided personal attention." },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 bg-stone-900 text-center">
        <p className="text-sand-400 text-xs tracking-[0.3em] uppercase mb-3">Our Story</p>
        <h1 className="font-display text-5xl text-ivory">About Villa Galle</h1>
      </section>

      {/* Story */}
      <section className="bg-ivory py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="https://placehold.co/800x600/e8ddd0/9a7a4a?text=Villa+Story"
              alt="Villa Galle story"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sand-500 text-xs tracking-[0.3em] uppercase mb-4">Est. 2018</p>
            <h2 className="font-display text-4xl text-stone-900 mb-6">A Labour of Love</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Villa Galle was born from a deep love for Sri Lanka&apos;s southern coast — its unhurried pace,
              its warm people, and its extraordinary natural beauty. What began as a family home was
              thoughtfully transformed into a boutique retreat that honours the spirit of the place.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Every room, every garden path, every meal is crafted with intention — to give our guests
              not just a place to stay, but a place to truly arrive.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand-100 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sand-500 text-xs tracking-[0.3em] uppercase mb-3">What We Stand For</p>
            <h2 className="font-display text-4xl text-stone-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(v => (
              <div key={v.title} className="bg-ivory p-8">
                <h3 className="font-display text-xl text-stone-800 mb-3">{v.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
