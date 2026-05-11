import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const JournalPage = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log("Newsletter subscription:", data);
        alert(`Thank you! Request for ${data.email} has been sent.`);
        reset();
    };

    return (
        <main className="pt-32 pb-24">
            {/* Hero Section */}
            <header className="mx-auto mb-24 max-w-screen-2xl px-8">
                <div className="flex flex-col items-center text-center">
                    <span className="mb-4 font-label text-[10px] uppercase tracking-[0.2em] text-secondary">
                        The Archive
                    </span>

                    <h1 className="mb-8 font-serif text-7xl leading-tight tracking-tighter md:text-9xl">
                        The Journal
                    </h1>

                    <p className="max-w-xl font-light  leading-relaxed text-on-surface-variant">
                        A digital chronicle exploring the intersection of craftsmanship,
                        timeless silhouettes, and the philosophy of conscious curation.
                    </p>
                </div>
            </header>

            {/* Asymmetrical Editorial Grid */}
            <section className="mx-auto max-w-screen-2xl px-8">
                <div className="grid grid-cols-12 gap-y-24 md:gap-x-12">
                    {/* Main Featured Article */}
                    <article className="group col-span-12 lg:col-span-8">
                        <div className="relative mb-8 aspect-[16/9] overflow-hidden">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0SW24IynF3WWUZutdWTvpzXb0ZHPrKCM36jiOUSIRoV3gRxdC1fo-ayVozSAP9aIzo-xO0wmwjteRIJr5mMkJgXJSpHaC5lS_9MVc6gitcZ8DPOxBKkc2xFb4wXjSkLa2qQd9jDW-6gzRXAf08tmFU4NhVgc87HqU4pERtjL5HlCdT3a78xsYPK0fMUSlWLNBgRT2c_3Grf0cTV5vxXWq54OSTZDZToASwktV92e4uRp5APXreZZekegjc_7ZMeOx3Lpg0PaY74I"
                                alt="Featured Article"
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-primary/5"></div>
                        </div>

                        <div className="max-w-2xl">
                            <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                                Philosophy
                            </span>

                            <h2 className="mt-4 mb-6 font-serif text-4xl leading-tight md:text-5xl">
                                The Art of Slow Fashion
                            </h2>

                            <p className="mb-8 leading-relaxed text-on-surface-variant">
                                Investigating the deliberate pace of luxury, where every stitch
                                tells a story of patience and permanence. In a world of fleeting
                                trends, we explore the beauty of staying still.
                            </p>

                            <Link
                                to="/journal/slow-fashion"
                                className="group/link inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary"
                            >
                                <span>Read The Essay</span>
                                <span className="material-symbols-outlined text-xs transition-transform group-hover/link:translate-x-1">
                                    east
                                </span>
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar Secondary Article */}
                    <article className="group col-span-12 lg:col-span-4 lg:mt-32">
                        <div className="relative mb-6 aspect-[3/4] overflow-hidden">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwXbthGi0t8dte25Dm5nbcqhj2JGvCnh4gS2pueUwSYWc3a3Rfw66aFnfWeie5vLWna3QatlPBA1meJntxyBdZMNoRWUPj0MlVmBA-Otw6ANQuI1tl-ev0wGenQVgxRddFloBuglBpAWI_QMGZL6I0ZXY1Y81xLgJ7SVAfTitKHLtdO7dSCxFHXBmHbbAyW89Er9Ew8T1N_2DRdwFf9RKU-jqNk60ulwp8Oqy3DeqCkMyUgrGl2f-2kJm0ecX-QSR3Q_hJFbAJbmA"
                                alt="Inside the Atelier"
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>

                        <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                            Heritage
                        </span>

                        <h3 className="mt-3 mb-4 font-serif text-2xl">
                            Inside the Milan Atelier
                        </h3>

                        <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
                            A private viewing of the masterful techniques behind our signature
                            winter collection.
                        </p>

                        <Link
                            to="/journal/milan-atelier"
                            className="border-b border-outline-variant pb-1 text-[10px] font-bold uppercase tracking-widest transition-colors hover:border-primary"
                        >
                            Explore
                        </Link>
                    </article>

                    {/* Deep Row */}
                    <div className="col-span-12 mt-12 grid grid-cols-12 gap-12">
                        {/* Item 1 */}
                        <article className="group col-span-12 md:col-span-5 lg:col-span-4">
                            <div className="relative mb-6 aspect-square overflow-hidden bg-surface-container-low">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDstHsDJbKXLIPnPe0Q-oN21cTmVfb7WV_Ujoj0I9SUkJHyam03UERgFaP0zkIhdcTUOXQd0p7hdwYjPT9Ewz1qdhQXMPp5L8n1deLedSD1XIbaKIfxW1obyOJvvbuZgBVf3d9d58KSuTqOODFPamiUVUs5KAC7Jw4ilHx-QgjIEbU64hPdwZMlL1NP4GamL0g1-6LYSSGyjeBJuCqZ5gkKbNQj5-SIM9AistjmGzK_AopDDbdEI74CGUFz8NDlbBRsX9PejgkbMFE"
                                    alt="Seasonal Silhouettes"
                                    className="h-full w-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-105"
                                />
                            </div>

                            <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                                Edit
                            </span>

                            <h3 className="mt-3 mb-3 font-serif text-xl">
                                Seasonal Silhouettes
                            </h3>

                            <p className="text-sm leading-relaxed text-on-surface-variant">
                                The architecture of the overcoat: exploring volume and
                                structure for the coming months.
                            </p>
                        </article>

                        {/* Item 2 */}
                        <article className="relative col-span-12 flex flex-col justify-center bg-surface-container-high p-12 md:col-span-7 lg:col-span-8">
                            <div className="max-w-md">
                                <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                                    Conversation
                                </span>

                                <h2 className="mt-4 mb-6 font-serif text-3xl  md:text-4xl">
                                    "Luxury is not the absence of imperfection, but the presence
                                    of intent."
                                </h2>

                                <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant">
                                    — Julian V., Creative Director
                                </p>
                            </div>

                            <div className="absolute -right-8 -bottom-8 hidden h-80 w-64 overflow-hidden shadow-2xl lg:block">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-215YZVuaE9FXivpzSBX2mYPMHTBiF5btOj-Pc1JXrmY30akAZuySODpzOT8Kc4qiNQC8U9cqqD751BcYWZ2YvB8LDIvDCe8lvGihxcRmuvWyZwrBD5lmu8pRs33xYy3Rjai3c4B0AZkso-mTm47F3_yngIYdpLLgJNTzfYfSJROLVV7KQwT97P-yR5c59DuydsUcmGsnJH_c5zcJfXE18Ut2Lm82-krXtXRWXMlG7Nmz8RTQw8mxbl5FmsJlPnf1LZXJL-dSVqM"
                                    alt="Portrait"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </article>
                    </div>

                    {/* Final Grid Block */}
                    <article className="group col-span-12 mt-24 lg:col-span-5">
                        <div className="relative mb-6 aspect-video overflow-hidden">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZzXRqd9-s_kpLOi70d8jMSvNDjJnK4wf46GzOGslwf8VpdNMjNur8LVEeUdR4pa0H6tPf_DklBupxlJw2cKaHJcI9nJ16UHoKZXDjckxHwpcqAFOFutgvYL9j6v3gOdV25uZS7rD9Q61fTt6YdigcD-zdwKjXHw7JO6mUITdn0swGS_8fGWczbnwZDzXYFeIwlpAQ2JvWzqnVUt11GtaRN-7bkVJRwsr0Vk1KvxCzJj4VXHrszIuvG6W0ZcKGJNn99zAaxEnrcVg"
                                alt="The Landscape of Design"
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>

                        <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                            Environment
                        </span>

                        <h3 className="mt-3 mb-4 font-serif text-2xl">
                            Nature as Architect
                        </h3>

                        <p className="text-sm leading-relaxed text-on-surface-variant">
                            How the raw textures of the Icelandic coast inspired our tonal
                            palette this season.
                        </p>
                    </article>

                    <article className="group col-span-12 lg:col-span-6 lg:col-start-7 lg:mt-48">
                        <div className="border-l border-outline-variant py-12 pl-12">
                            <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                                The Archive
                            </span>

                            <h3 className="mt-4 mb-6 font-serif text-4xl leading-snug">
                                Curating the Permanent Wardrobe: A Ten-Step Guide
                            </h3>

                            <p className="mb-8 leading-relaxed text-on-surface-variant">
                                From identifying high-quality textiles to the art of the fit, we
                                break down the essentials of building a wardrobe that defies
                                time.
                            </p>

                            <Link
                                to="/journal/permanent-wardrobe-guide"
                                className="group inline-flex items-center space-x-4"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant transition-colors group-hover:bg-primary group-hover:text-on-primary">
                                    <span className="material-symbols-outlined">
                                        arrow_forward
                                    </span>
                                </div>

                                <span className="text-[10px] font-bold uppercase tracking-widest">
                                    Access the guide
                                </span>
                            </Link>
                        </div>
                    </article>
                </div>
            </section>

            {/* Newsletter Invitation */}
            <section className="mt-48 overflow-hidden bg-surface-container-low py-32">
                <div className="relative mx-auto max-w-screen-xl px-8">
                    <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
                        <div>
                            <h2 className="mb-8 font-serif text-5xl leading-tight tracking-tighter">
                                The Invitation
                            </h2>

                            <p className="mb-12 text-lg font-light leading-relaxed text-on-surface-variant">
                                Join a global collective of design enthusiasts. Receive our
                                monthly curated edit of editorial long-reads, private collection
                                previews, and invitations to intimate atelier events.
                            </p>

                            <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        {...register("email", { required: true })}
                                        className="w-full border-b border-outline-variant bg-transparent py-4 font-light  transition-colors focus:border-primary focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="self-start bg-primary px-12 py-4 text-[10px] uppercase tracking-[0.2em] text-on-primary transition-colors duration-500 hover:bg-secondary"
                                >
                                    Request Membership
                                </button>
                            </form>
                        </div>

                        <div className="relative">
                            <div className="flex aspect-[4/5] w-full items-center justify-center bg-surface-container-highest p-12">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8JB04P59Tsrv0CSG5k4NoNSV06RH3CCsa_uMKY6yl0Q0TcUxrQkL8uBYwJZo3Vw3zez-zN_YTOxi4y76YgeAFAopThVha3Qk2Laj_KH3_abOCNbnK4wXWxSUw4RRQ0hDpq_CyGwf9W2zpOXphIx-HvCgWXXdF1LACF_uvjsXvkZ1cwe7ylrMB7ziEhX3JH_2wv1wNVCClSgS8Yde-GSfvJOPmYTsT4hOczkqb-tg1P5s7Fnvn1hynoixBXLJozierzf7ib3qOwKo"
                                    alt="The Private Circle"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 border-[24px] border-surface-container-low opacity-50"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default JournalPage;