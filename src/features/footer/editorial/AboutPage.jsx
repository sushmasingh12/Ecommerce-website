import React from "react";

const AboutPage = () => {
    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="relative flex h-[921px] flex-col items-center justify-center overflow-hidden px-8 text-center">
                <div className="z-10 max-w-4xl">
                    <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-secondary font-label">
                        The Digital Curator
                    </p>

                    <h1 className="mb-12 text-6xl leading-none text-primary md:text-8xl font-headline kerning-tight">
                        A Legacy of <br />
                        <span className="serif-italic">Intentional</span> Design.
                    </h1>
                </div>

                <div className="absolute inset-0 z-0 opacity-20">
                    <img
                        className="h-full w-full object-cover"
                        alt="Close-up texture of high-end raw silk fabric with soft shadows and elegant folds in warm cream tones"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEAwbcJVIQ74HGavPn0F0zeqt486jPSiCrDGjMrkomRf1bjhUYA3lYSkYbZ1uTavZ-lxQrgQl-vTyiznMvxO-3I-F6PpRyCTbiVbDuh_zTwv_7fbiU6wp2WqQPRih22vxHzAChqqmMmnx3F7eS_HEZNrWoLIQDRsF_hMZz2ILA0XAJYnVf67EKTMFh0SNUyI8QA4LIv5wNJkPEHZCUFbDsJ81gdVGHaFWlPwrBA2np5KcloW0OTN5EvwyFFJFiXwnpsf4fQQbpW44"
                    />
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
                    <span className="material-symbols-outlined text-outline">
                        expand_more
                    </span>
                </div>
            </section>

            {/* The Ethos Section */}
            <section className="mx-auto max-w-screen-xl px-8 py-32">
                <div className="grid items-center gap-16 md:grid-cols-12">
                    <div className="overflow-hidden md:col-span-7">
                        <img
                            className="aspect-[4/5] w-full object-cover transition-transform duration-1000 hover:scale-105"
                            alt="Modernist architectural interior with minimalist furniture and dramatic sunlight streaming through large windows"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFVSueLAbRvvf_z2kSDJmFhSt4Q6w6ntFh_E3qhjaFmglouS281XWiDVXOBXDqjB9_T0XHvkCcUzRGWZpCVdsn9GXESjrCiFLMi4AiDXNKMXcZL_NaTnbR4iGWXDIpa9UIRt8wZxE0BHMm93WiHYoqz8s9cnErhRMsnqWveo8wpkFAr_G_SwohMAX4Y5ktDMPd2Qw2ZImguZAS8mvEwXOkG7GrYc8tGbsvjY47h8mfkH3lacEjkQVWegxvBkvuBj-G9mO4V0RrJaQ"
                        />
                    </div>

                    <div className="flex flex-col justify-center md:col-span-5">
                        <span className="mb-4 text-[10px] uppercase tracking-[0.1em] text-secondary font-label">
                            Chapter One
                        </span>

                        <h2 className="mb-8 text-5xl leading-tight font-headline">
                            The Ethos
                        </h2>

                        <p className="mb-8 text-lg leading-relaxed text-on-surface/80 font-body">
                            CURATOR was founded on the belief that clothing should be an
                            exhibition of one's inner narrative. We move beyond trends,
                            focusing on the dialogue between form, function, and the human
                            spirit.
                        </p>

                        <p className="border-l border-secondary pl-6 text-lg  leading-relaxed text-on-surface/80 font-body">
                            "Luxury is not loud; it is the quiet confidence of quality and the
                            space we allow for things that truly matter."
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Craftsmanship */}
            <section className="bg-surface-container-low py-32">
                <div className="mx-auto max-w-screen-2xl px-8">
                    <div className="mb-24 flex flex-col justify-between md:flex-row md:items-baseline">
                        <h2 className="mb-4 text-5xl font-headline md:mb-0 md:text-7xl">
                            Our Craftsmanship
                        </h2>

                        <p className="max-w-xs text-right text-[10px] uppercase tracking-widest text-on-surface/50 font-label">
                            Meticulously constructed by master artisans in our heritage
                            ateliers.
                        </p>
                    </div>

                    <div className="grid h-auto grid-cols-1 gap-6 md:h-[1200px] md:grid-cols-12">
                        {/* Large Feature Image */}
                        <div className="relative h-[500px] overflow-hidden md:col-span-8 md:h-full">
                            <img
                                className="absolute inset-0 h-full w-full object-cover"
                                alt="Artisanal tailor meticulously cutting high-quality wool fabric on a dark wood table in a sunlit atelier"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKyKyoDSQilY-sTMqWtQortDcHprPuS3q5-UhR5HyRTtim1hOcDQ1vNH5ltKg3FtbcwBglIFYYkRSPvav6uxG2fvqUzj5lGMNt700YCGgVogxNmHlgIcFYTJYATWQx9TBHejFgN8WeGkbfh-eD_PnlF-QbQapLLpSPv3EXvV1scXzqx4lFrXJFytvNg3TjWR5ZX1YZW4j1HUkEVWyAdMeOZiGYagwSjuz4KZr7dWxu4dDYeLySjzb5Vg0YVjBbICppHhu71yIKaCM"
                            />
                            <div className="absolute bottom-8 left-8 z-10 text-white">
                                <p className="text-[10px] uppercase tracking-[0.1em] font-label">
                                    The Master Cut
                                </p>
                            </div>
                        </div>

                        {/* Stacked Small Images */}
                        <div className="grid h-full grid-rows-2 gap-6 md:col-span-4">
                            <div className="group relative overflow-hidden">
                                <img
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt="Close-up of industrial sewing machine stitching delicate white linen with precision"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC5vS_VkNWFHCoUpjwM_P6HqVVxTUSzJ5ZuRRULgxEkx0AXKryDqS1RtZ-iGJTg5Sf3088oBZwWJNnWlMjOLFPfZXJYlTA2TONw72D55W_NEUcVmmfmM1XsW46L4a675VevoLMWDforcv7ErvUDHtzCIUsx50TiEJl1ZRwEEffmWy_TTwUwwHk8BgRxunhf0heQYmptUJyA1ss9djRi0t7QDOFVexTCYC1eXE1kTr59sH4ztjfbaKxOAEn97A0auCNgWrCgId0Lfc"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                                    <p className="text-[10px] uppercase tracking-widest text-white font-label">
                                        Technique
                                    </p>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden">
                                <img
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt="Rolls of premium organic textiles in muted earthy tones arranged on a shelf"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi9yBLQQw2d37I6z8Gs1CoYMMNioVnocY02irkZ7Z4ZLWPqNtYNh3Wb5fZihIOu3J6S9Ao26iTrmrt-Z-iDoWFGgleGOJG1lj2bDyO951pBvqfcA7h7G9TlR5x_Q2rxBrS3JEx3xvrpxV8i8f_U4yN2ahzITvTeFvs5gk4dBnpmUb2vfUQ4b_eqbxHZBDVx7BDij5axmiRcx-Xvfodg2beFr9PPur0TReoiIgjTA3qN7w8hJ3NjkEJGbzC7PtbKeuCbsNZKPCES3w"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                                    <p className="text-[10px] uppercase tracking-widest text-white font-label">
                                        Sourcing
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sustainability Section */}
            <section className="px-8 py-40">
                <div className="relative mx-auto max-w-screen-xl">
                    <div className="absolute top-10 -right-20 -z-10 hidden h-[500px] w-1/2 bg-surface-container-high md:block"></div>

                    <div className="grid items-end gap-12 md:grid-cols-12">
                        <div className="order-2 md:order-1 md:col-span-4">
                            <p className="mb-6 text-[10px] uppercase tracking-widest text-secondary font-label">
                                Circular Future
                            </p>

                            <h2 className="mb-8 text-5xl leading-tight font-headline">
                                A Commitment to Longevity.
                            </h2>

                            <div className="space-y-6 text-on-surface/70">
                                <p className="leading-relaxed">
                                    Sustainability isn't a feature; it's our foundation. We
                                    believe in the luxury of permanence—creating pieces designed
                                    to be cherished for decades, not seasons.
                                </p>

                                <p className="border-t border-outline-variant pt-6 leading-relaxed">
                                    100% Traceable Organic Fibers
                                    <br />
                                    Plastic-Free Supply Chain
                                    <br />
                                    Fair-Wage Certified Ateliers
                                </p>
                            </div>

                            <button className="group mt-12 flex items-center space-x-4 border-b border-primary pb-2 transition-all hover:border-secondary">
                                <span className="text-[10px] uppercase tracking-widest font-label">
                                    Read Our Impact Report
                                </span>
                                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-2">
                                    arrow_forward
                                </span>
                            </button>
                        </div>

                        <div className="order-1 md:order-2 md:col-span-8">
                            <img
                                className="h-[600px] w-full object-cover shadow-2xl"
                                alt="Vast serene landscape of rolling hills and sustainable cotton fields at sunrise"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxZbYpGPrAn9CWvLO7Ku8NmYh1qQ39QDfX5ZCN4XROluFhRdPK1C8Z4G0KyzlGwt7-GPMWOrA4yENIQbDv-IIEtC8YX5ZJVXEi4R9u5NQbvnos7DmZyeL7398PLWGdHQEibQJi4S_p9PMIzjZ6Crm4df1Vvtk0n17--VqH8xIOZgxermvlmOo3fOSd-YmK_LCD5A5sqtIy0GhrszFB1zNri6rUldKeca5UiHsTMBvHHlbRBoNn1SNfyO-6Ch9oj4D3uyyMoA6tJeI"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA / Quote */}
            <section className="bg-surface-container-low py-32 text-center">
                <div className="mx-auto max-w-3xl px-8">
                    <span className="material-symbols-outlined mb-8 text-4xl text-secondary">
                        spa
                    </span>

                    <blockquote className="mb-12 text-3xl leading-tight font-headline md:text-5xl">
                        "We do not inherit the earth from our ancestors; we borrow it from
                        our children."
                    </blockquote>

                    <div className="mx-auto h-16 w-px bg-secondary"></div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;