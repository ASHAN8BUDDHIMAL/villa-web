const details = [
  { label: "Email",    value: "hello@villagalle.com", href: "mailto:hello@villagalle.com" },
  { label: "Phone",    value: "+94 00 000 0000",       href: "tel:+94000000000" },
  { label: "Address",  value: "Galle, Southern Province, Sri Lanka", href: null },
  { label: "Check-in", value: "From 2:00 PM",          href: null },
  { label: "Check-out",value: "Until 11:00 AM",        href: null },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 bg-stone-900 text-center">
        <p className="text-sand-400 text-xs tracking-[0.3em] uppercase mb-3">Get in Touch</p>
        <h1 className="font-display text-5xl text-ivory">Contact Us</h1>
      </section>

      <section className="bg-ivory py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-sand-500 text-xs tracking-[0.3em] uppercase mb-6">Details</p>
            <ul className="space-y-6">
              {details.map(d => (
                <li key={d.label} className="flex flex-col gap-1 border-b border-sand-100 pb-5">
                  <span className="text-xs text-stone-400 tracking-widest uppercase">{d.label}</span>
                  {d.href
                    ? <a href={d.href} className="text-stone-700 hover:text-sand-600 transition-colors">{d.value}</a>
                    : <span className="text-stone-700">{d.value}</span>
                  }
                </li>
              ))}
            </ul>
          </div>

          {/* Map placeholder */}
          <div className="bg-sand-100 flex items-center justify-center min-h-64 lg:min-h-0">
            <div className="text-center text-stone-400">
              <p className="text-4xl mb-3">📍</p>
              <p className="text-sm tracking-widest uppercase">Galle, Sri Lanka</p>
              <a
                href="https://maps.google.com/?q=Galle,Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-xs text-sand-600 underline underline-offset-4 hover:text-sand-800 transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
