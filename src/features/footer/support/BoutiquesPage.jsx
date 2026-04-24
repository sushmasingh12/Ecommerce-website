import React from "react";

const boutiques = [
  {
    city: "Paris",
    name: "The Atelier",
    address: "42 Rue des Archives, 75004 Paris",
    phone: "+33 1 23 45 67 89",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOBfYJnhiSOJ92oPFoX6_aXt7rM22XmPtxumeE8q7D6KJgS2R2_GTilNioLzWPGYjcgX6bDjvcP1QBeUw8LmjlNUMBE6WwYXJ68y1QZ8WG4yghne-RezPIGtNfvOwXVHG5KFvfb3TnuVpthSZPCoKEH_-J3ujiG0WfJfssWjwIGlzVv-BIdr5rT5YDdxKYOVplETQWt419slDFA7Dc6mfD52YY73uwBeDd5e-uZZBywjxe2xV0jfJzaKj6V1IcZc9k8r24R4UvhQ0"
  },
  {
    city: "London",
    name: "Mayfair Flagship",
    address: "12 Savile Row, London W1S 3PQ",
    phone: "+44 20 7946 0000",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDldd1Q1gx0hCmUf3VBwz4TAQWJ0m65jyMaYwznTB7FYTR-BM5ZmJ4810-E5wwNU97GVz1fP9L8MXu70AcwiI9Wg0ZKY-vSZnULVD6RZBE0pwtx99qK0n5NvKF3lc5ni42fn8sP5hMNOUxzQlL4DmUGrDlS4t5Ch4uYkeKWqatuPJGKdgebVzxUKzL6wyxyplHvZ4JNm8TUS4dtpHIrUQEUeEZzDbmZAMlwd9wbEvDniBjAHSSzRscihWuKF0kwigB0Z-e2iGQ-_Co"
  }
];

const BoutiquesPage = () => {
  return (
    <main className="min-h-screen bg-surface pt-32 pb-24">
      <header className="mx-auto mb-24 max-w-screen-2xl px-8 text-center md:px-12">
        <span className="mb-4 block font-label text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
          Global Presence
        </span>
        <h1 className="font-headline text-5xl tracking-tighter text-primary md:text-8xl">
          Our Boutiques
        </h1>
      </header>

      <section className="mx-auto max-w-screen-2xl px-8 md:px-12">
        <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
          {boutiques.map((boutique) => (
            <div key={boutique.city} className="group space-y-8">
              <div className="aspect-[4/5] overflow-hidden bg-primary/5">
                <img 
                  src={boutique.image} 
                  alt={boutique.name} 
                  className="h-full w-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4">
                <h2 className="font-headline text-4xl text-primary">{boutique.city}</h2>
                <h3 className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary">{boutique.name}</h3>
                <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                  {boutique.address}<br />
                  <a href={`tel:${boutique.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-secondary">
                    {boutique.phone}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BoutiquesPage;
