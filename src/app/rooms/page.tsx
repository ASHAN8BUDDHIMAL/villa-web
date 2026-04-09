import RoomCard from "@/components/RoomCard";
import rooms from "../../../data/rooms.json";

export default function RoomsPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 bg-stone-900 text-center">
        <p className="text-sand-400 text-xs tracking-[0.3em] uppercase mb-3">Accommodations</p>
        <h1 className="font-display text-5xl text-ivory">Our Rooms</h1>
      </section>

      <section className="bg-ivory py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map(room => <RoomCard key={room.id} room={room} />)}
        </div>
      </section>
    </>
  );
}
