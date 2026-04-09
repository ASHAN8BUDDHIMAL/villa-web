import BookingForm from "@/components/BookingForm";

export default function BookPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 bg-stone-900 text-center">
        <p className="text-sand-400 text-xs tracking-[0.3em] uppercase mb-3">Reservations</p>
        <h1 className="font-display text-5xl text-ivory">Book Your Stay</h1>
      </section>

      <section className="bg-ivory py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sand-500 text-xs tracking-[0.3em] uppercase mb-4">What to Expect</p>
            <h2 className="font-display text-3xl text-stone-900 mb-6">Your Inquiry</h2>
            <p className="text-stone-500 leading-relaxed mb-8">
              Fill in the form and our team will respond within 24 hours with availability,
              pricing and any special arrangements you may need.
            </p>
            <ul className="space-y-3 text-sm text-stone-600">
              {["Complimentary airport transfer", "Daily breakfast included", "Flexible check-in times", "Personalised itineraries"].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
