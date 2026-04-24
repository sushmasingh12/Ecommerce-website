import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormField from "../../../shared/components/Form/FormField";
import Input from "../../../shared/components/Form/Input";
import TextArea from "../../../shared/components/Form/TextArea";
import RadioGroup from "../../../shared/components/Form/RadioGroup";

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      inquiry: "Private Client",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    reset();
    // Revert success state after a few seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const inquiryOptions = [
    { label: "Private Client", value: "Private Client" },
    { label: "Press", value: "Press" },
    { label: "General", value: "General" },
  ];

  return (
    <main className="min-h-screen bg-surface pt-32 pb-24 selection:bg-secondary/20">
      {/* Hero Section */}
      <header className="mx-auto mb-32 max-w-screen-2xl px-8 md:px-12">
        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <span className="mb-6 block font-label text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
              Concierge & Enquiries
            </span>

            <h1 className="font-headline text-6xl leading-[0.9] tracking-tighter text-primary md:text-9xl">
              At your <br />
              <span className="italic text-secondary/40">service.</span>
            </h1>
          </div>

          <div className="md:col-span-4 lg:pl-12">
            <p className="max-w-sm font-body text-sm leading-loose text-on-surface-variant">
              Whether you seek a private appointment at The Atelier or have a
              question regarding our latest collection, our curators are here to
              assist you with meticulous attention to detail.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <section className="mx-auto max-w-screen-2xl px-8 md:px-12">
        <div className="grid grid-cols-1 gap-32 lg:grid-cols-2">
          {/* Contact Form Section */}
          <div className="order-2 lg:order-1">
            {isSubmitted ? (
              <div className="flex h-full flex-col items-start justify-center space-y-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="h-px w-24 bg-secondary"></div>
                <h2 className="font-headline text-5xl text-primary">Thank you.</h2>
                <p className="max-w-md font-body text-lg text-on-surface-variant leading-relaxed">
                  Your message has been received. One of our curators will reach out to you within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                  <FormField label="Full Name" error={errors.fullName}>
                    <Input
                      placeholder="E.g. Julian Vane"
                      {...register("fullName", { required: "Name is required" })}
                    />
                  </FormField>

                  <FormField label="Email Address" error={errors.email}>
                    <Input
                      type="email"
                      placeholder="julian@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </FormField>
                </div>

                <FormField label="Inquiry Type">
                  <RadioGroup
                    name="inquiry"
                    options={inquiryOptions}
                    register={register}
                  />
                </FormField>

                <FormField label="Message" error={errors.message}>
                  <TextArea
                    rows="4"
                    placeholder="How may we assist you?"
                    {...register("message", { required: "Message cannot be empty" })}
                  />
                </FormField>

                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-between overflow-hidden bg-primary px-10 py-6 font-label text-[10px] font-bold uppercase tracking-[0.3em] text-on-primary transition-all duration-500 hover:bg-secondary md:w-auto md:min-w-[300px]"
                >
                  <span className="relative z-10">Send Message</span>
                  <span className="material-symbols-outlined relative z-10 transition-transform duration-500 group-hover:translate-x-2">
                    arrow_forward
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Boutique Info */}
          <div className="order-1 space-y-32 lg:order-2">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
              <div className="space-y-6">
                <h3 className="font-headline text-2xl text-primary border-b border-outline-variant/30 pb-4">
                  The Atelier
                </h3>
                <address className="not-italic font-body text-sm leading-loose text-on-surface-variant">
                  42 Rue des Archives<br />
                  75004 Paris, France<br /><br />
                  <a href="tel:+33123456789" className="block transition-colors hover:text-secondary">+33 1 23 45 67 89</a>
                  <a href="mailto:atelier@curator.com" className="block transition-colors hover:text-secondary">atelier@curator.com</a>
                </address>
              </div>

              <div className="space-y-6">
                <h3 className="font-headline text-2xl text-primary border-b border-outline-variant/30 pb-4">
                  Global Support
                </h3>
                <div className="font-body text-sm leading-loose text-on-surface-variant">
                  <p>Monday — Friday</p>
                  <p>09:00 to 18:00 CET</p><br />
                  <a href="tel:+442079460000" className="block transition-colors hover:text-secondary">+44 20 7946 0000</a>
                  <a href="mailto:care@curator.com" className="block transition-colors hover:text-secondary">care@curator.com</a>
                </div>
              </div>
            </div>

            {/* Boutique Locator Preview */}
            <div className="relative group overflow-hidden bg-surface-container-low p-12 lg:p-16">
              <div className="relative z-10 max-w-xs space-y-8">
                <span className="font-label text-[10px] font-bold uppercase tracking-widest text-secondary">
                  Global Presence
                </span>
                <h3 className="font-headline text-4xl text-primary leading-tight">
                  Find a <br />Boutique
                </h3>
                <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                  Experience the tactile essence of our collections in person across Paris, London, and New York.
                </p>
                <Link
                  to="/boutiques"
                  className="inline-flex items-center gap-4 border-b border-primary/20 pb-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary transition-all hover:border-primary hover:text-secondary group/link"
                >
                  Discover Locations
                  <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                    location_on
                  </span>
                </Link>
              </div>
              
              <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 transition-opacity duration-700 group-hover:opacity-40">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOBfYJnhiSOJ92oPFoX6_aXt7rM22XmPtxumeE8q7D6KJgS2R2_GTilNioLzWPGYjcgX6bDjvcP1QBeUw8LmjlNUMBE6WwYXJ68y1QZ8WG4yghne-RezPIGtNfvOwXVHG5KFvfb3TnuVpthSZPCoKEH_-J3ujiG0WfJfssWjwIGlzVv-BIdr5rT5YDdxKYOVplETQWt419slDFA7Dc6mfD52YY73uwBeDd5e-uZZBywjxe2xV0jfJzaKj6V1IcZc9k8r24R4UvhQ0"
                  alt="Minimalist map"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Break Section */}
      <section className="mx-auto mt-40 max-w-screen-2xl px-8 md:px-12">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-primary/5">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDldd1Q1gx0hCmUf3VBwz4TAQWJ0m65jyMaYwznTB7FYTR-BM5ZmJ4810-E5wwNU97GVz1fP9L8MXu70AcwiI9Wg0ZKY-vSZnULVD6RZBE0pwtx99qK0n5NvKF3lc5ni42fn8sP5hMNOUxzQlL4DmUGrDlS4t5Ch4uYkeKWqatuPJGKdgebVzxUKzL6wyxyplHvZ4JNm8TUS4dtpHIrUQEUeEZzDbmZAMlwd9wbEvDniBjAHSSzRscihWuKF0kwigB0Z-e2iGQ-_Co"
            alt="Atelier interior"
            className="h-full w-full object-cover opacity-80 grayscale transition-transform duration-[2000ms] hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center backdrop-blur-[2px]">
            <h2 className="mb-6 font-headline text-4xl text-primary md:text-6xl">
              Private Appointments
            </h2>
            <p className="mb-12 max-w-xl font-body text-sm leading-relaxed text-on-surface-variant">
              Receive personalized styling and dedicated attention from our head curators in the heart of Paris.
            </p>
            <Link
              to="/appointments"
              className="border border-primary px-12 py-5 font-label text-[10px] font-bold uppercase tracking-[0.3em] text-primary transition-all hover:bg-primary hover:text-on-primary"
            >
              Request a Date
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;