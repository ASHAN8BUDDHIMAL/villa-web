import Image from "next/image";

const photos = [
  { src: "https://placehold.co/800x600/e8ddd0/9a7a4a?text=Villa+View+1",  span: "lg:col-span-2" },
  { src: "https://placehold.co/800x600/ddd0c0/7d6038?text=Villa+View+2",  span: "" },
  { src: "https://placehold.co/800x600/d0c4b0/9a7a4a?text=Villa+View+3",  span: "" },
  { src: "https://placehold.co/800x600/e8ddd0/7d6038?text=Villa+View+4",  span: "lg:col-span-2" },
  { src: "https://placehold.co/800x600/ddd0c0/9a7a4a?text=Villa+View+5",  span: "" },
  { src: "https://placehold.co/800x600/d0c4b0/7d6038?text=Villa+View+6",  span: "lg:col-span-2" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 bg-stone-900 text-center">
        <p className="text-sand-400 text-xs tracking-[0.3em] uppercase mb-3">Visual Journey</p>
        <h1 className="font-display text-5xl text-ivory">Gallery</h1>
      </section>

      <section className="bg-ivory py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((p, i) => (
            <div key={i} className={`relative aspect-[4/3] overflow-hidden group ${p.span}`}>
              <Image
                src={p.src}
                alt={`Villa photo ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
