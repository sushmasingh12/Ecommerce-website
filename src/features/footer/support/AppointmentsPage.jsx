import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "../../../shared/components/Form/FormField";
import Input from "../../../shared/components/Form/Input";
import TextArea from "../../../shared/components/Form/TextArea";

const AppointmentsPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Appointment request:", data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <main className="min-h-screen bg-surface pt-32 pb-24">
      <header className="mx-auto mb-24 max-w-screen-xl px-8 text-center">
        <span className="mb-4 block font-label text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
          Exclusive Service
        </span>
        <h1 className="font-headline text-5xl tracking-tighter text-primary md:text-7xl">
          Private Appointment
        </h1>
        <p className="mx-auto mt-8 max-w-xl font-body text-sm leading-loose text-on-surface-variant">
          Experience a personalized styling session with our head curators at The Atelier. 
          Please submit your preferred dates and our concierge will contact you to finalize the details.
        </p>
      </header>

      <section className="mx-auto max-w-screen-md px-8">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center space-y-8 py-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="font-headline text-4xl text-primary">Request Sent.</h2>
            <p className="max-w-md font-body text-sm text-on-surface-variant leading-relaxed">
              We have received your request for a private appointment. 
              A curator will reach out to you within one business day.
            </p>
          </div>
        ) : (
          <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("email", { required: "Email is required" })}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <FormField label="Preferred Date" error={errors.date}>
                <Input
                  type="date"
                  {...register("date", { required: "Please select a date" })}
                />
              </FormField>

              <FormField label="Preferred Time" error={errors.time}>
                <Input
                  type="time"
                  {...register("time", { required: "Please select a time" })}
                />
              </FormField>
            </div>

            <FormField label="Special Requirements (Optional)">
              <TextArea
                rows="3"
                placeholder="Any specific collections or pieces you are interested in?"
                {...register("notes")}
              />
            </FormField>

            <button
              type="submit"
              className="w-full bg-primary py-6 font-label text-[10px] font-bold uppercase tracking-[0.3em] text-on-primary transition-all hover:bg-secondary"
            >
              Request Appointment
            </button>
          </form>
        )}
      </section>
    </main>
  );
};

export default AppointmentsPage;
