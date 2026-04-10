import Image from "next/image";
import Link from "next/link";

type Room = { id: string; name: string; price: number; image: string; description: string };

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="group bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-stone-800 mb-2">{room.name}</h3>
        <p className="text-sm text-stone-500 leading-relaxed mb-5">{room.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 uppercase tracking-widest">From</span>
            <p className="text-sand-600 font-semibold text-lg">${room.price} <span className="text-xs text-stone-400 font-normal">/ night</span></p>
          </div>
          <Link
            href="/book"
            className="px-5 py-2 border border-sand-600 text-sand-600 text-xs tracking-widest uppercase hover:bg-sand-600 hover:text-ivory transition-colors"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}
