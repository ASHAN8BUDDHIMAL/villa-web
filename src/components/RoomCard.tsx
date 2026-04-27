import Image from "next/image";
import Link from "next/link";

type Room = { _id?: string; id?: string; name: string; price: number; image: string; description: string };

const isValidUrl = (url: string) => url.startsWith('http://') || url.startsWith('https://');

export default function RoomCard({ room }: { room: Room }) {
  const validImage = isValidUrl(room.image);
  return (
    <div className="group bg-sand-50 border border-sand-200 overflow-hidden hover:shadow-xl hover:border-sand-300 transition-all duration-700">
      <div className="relative overflow-hidden bg-stone-100" style={{ aspectRatio: "3/2" }}>
        {validImage ? (
          <>
            <Image
              src={room.image}
              alt={room.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 text-sm tracking-widest uppercase">No image</div>
        )}
      </div>
      <div className="p-10">
        <h3 className="font-display text-3xl text-stone-800 mb-4 group-hover:text-sand-700 transition-colors duration-300">{room.name}</h3>
        <p className="text-lg text-stone-400 leading-relaxed mb-10">{room.description}</p>
        <div className="flex items-center justify-between pt-8 border-t border-sand-100">
          <div>
            <span className="text-xs text-stone-300 uppercase tracking-[0.2em]">From</span>
            <p className="text-sand-600 font-display text-4xl mt-1">${room.price} <span className="text-base text-stone-400 font-sans font-normal">/ night</span></p>
          </div>
          <Link
            href="/book"
            className="px-9 py-4 border border-sand-400 text-sand-600 text-sm tracking-[0.2em] uppercase hover:bg-sand-600 hover:text-ivory hover:border-sand-600 transition-all duration-500"
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
}
