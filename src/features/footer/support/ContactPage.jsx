import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";

const CATEGORIES = [
  "Order & Delivery",
  "Returns & Refunds",
  "Payment Issues",
  "Product Query",
  "Account Help",
  "Bazario Coins",
  "Other",
];

const CHANNELS = [
  {
    icon: "chat",
    label: "Live Chat",
    sub: "Avg. 2 min wait",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: "call",
    label: "Call Us",
    sub: "1800-123-4567 (Free)",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    sub: "+91 98001 12345",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: "mail",
    label: "Email Support",
    sub: "Reply in 24 hrs",
    color: "text-[#FF9F00]",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
  },
];

const OFFICE_HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 9:00 PM IST" },
  { day: "Saturday", time: "10:00 AM – 7:00 PM IST" },
  { day: "Sunday & Holidays", time: "11:00 AM – 5:00 PM IST" },
];

const QUICK_LINKS = [
  {
    label: "Track My Order",
    path: "/account/orders",
    icon: "local_shipping",
  },
  {
    label: "Start a Return",
    path: "/returns",
    icon: "assignment_return",
  },
  {
    label: "Shipping Info",
    path: "/shipping",
    icon: "inventory_2",
  },
  {
    label: "Help & Support",
    path: "/account/help",
    icon: "help_outline",
  },
];

const ContactPage = () => {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      orderId: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Contact form submission:", data);
    setSent(true);
  };

  const Field = ({ label, required, error, children }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>

      {children}

      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-[1100px] mx-auto px-4">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#131921] to-[#232f3e] rounded-2xl px-8 py-12 mb-8 text-white relative overflow-hidden">
          <div className="absolute right-4 top-0 h-full opacity-10 flex items-center">
            <span className="material-symbols-outlined text-[180px]">
              support_agent
            </span>
          </div>

          <span className="text-[#FF9F00] text-xs font-bold uppercase tracking-widest block mb-3">
            We're Here for You
          </span>

          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Contact Us
          </h1>

          <p className="text-white/60 text-sm max-w-xl">
            Have a question, issue or feedback? Our team is available 7 days a
            week to help you.
          </p>
        </div>

        {/* Contact channels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {CHANNELS.map(({ icon, label, sub, color, bg, border }) => {
            const isWhatsapp = icon === "whatsapp";

            return (
              <button
                key={label}
                type="button"
                className={`${bg} border ${border} rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-md transition-all group`}
              >
                {isWhatsapp ? (
                  <FaWhatsapp
                    className={`text-3xl mb-2 ${color} group-hover:scale-110 transition-transform`}
                  />
                ) : (
                  <span
                    className={`material-symbols-outlined text-3xl mb-2 ${color} group-hover:scale-110 transition-transform`}
                  >
                    {icon}
                  </span>
                )}

                <span className="text-sm font-bold text-gray-800">
                  {label}
                </span>
                <span className="text-[10px] text-gray-500 mt-1">{sub}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FF9F00]">
                edit_note
              </span>
              <h2 className="font-bold text-gray-900">Send Us a Message</h2>
            </div>

            {sent ? (
              <div className="px-6 py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span
                    className="material-symbols-outlined text-green-500 text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>

                <p className="text-sm text-gray-500 mb-6">
                  Our support team will respond within 24 hours on your
                  registered email.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    reset();
                  }}
                  className="text-sm font-bold text-blue-600 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-6 py-6 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" required error={errors.name}>
                    <input
                      {...register("name", {
                        required: "Name is required",
                      })}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F00] transition-all ${errors.name
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200"
                        }`}
                    />
                  </Field>

                  <Field label="Email Address" required error={errors.email}>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email",
                        },
                      })}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F00] transition-all ${errors.email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200"
                        }`}
                    />
                  </Field>

                  <Field label="Phone Number (optional)" error={errors.phone}>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
                    />
                  </Field>

                  <Field label="Issue Category" error={errors.category}>
                    <select
                      {...register("category")}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Order ID (optional)" error={errors.orderId}>
                  <input
                    {...register("orderId")}
                    placeholder="e.g. BZ-20241201"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
                  />
                </Field>

                <Field
                  label="Describe Your Issue"
                  required
                  error={errors.message}
                >
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                    })}
                    rows={4}
                    placeholder="Please describe your issue in detail. The more info you share, the faster we can help."
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F00] resize-none transition-all ${errors.message
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200"
                      }`}
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#131921] text-white rounded-xl text-sm font-bold hover:bg-[#232f3e] transition-all flex items-center gap-2"
                >
                  Submit Request
                  <span className="material-symbols-outlined text-base">
                    send
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Office hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#FF9F00]">
                  schedule
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Support Hours
                </h3>
              </div>

              <div className="divide-y divide-gray-100">
                {OFFICE_HOURS.map(({ day, time }) => (
                  <div key={day} className="px-5 py-3">
                    <p className="text-xs font-semibold text-gray-800">
                      {day}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{time}</p>
                  </div>
                ))}
              </div>

              <div className="px-5 py-3 bg-green-50 border-t border-green-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></span>
                <p className="text-xs text-green-700 font-semibold">
                  Live chat available now
                </p>
              </div>
            </div>

            {/* HQ Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#FF9F00]">
                  location_on
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Bazario HQ
                </h3>
              </div>

              <address className="not-italic text-xs text-gray-600 leading-relaxed">
                Bazario Internet Pvt. Ltd.
                <br />
                12th Floor, Prestige Tech Park
                <br />
                Outer Ring Road, Marathahalli
                <br />
                Bengaluru, Karnataka — 560103
                <br />
                <a
                  href="mailto:support@bazario.in"
                  className="text-blue-600 hover:underline mt-2 block"
                >
                  support@bazario.in
                </a>
                <a
                  href="tel:18001234567"
                  className="text-blue-600 hover:underline"
                >
                  1800-123-4567 (Toll Free)
                </a>
              </address>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#FF9F00]">
                  quick_reference
                </span>
                <h3 className="font-bold text-gray-900 text-sm">
                  Quick Help
                </h3>
              </div>

              <div className="divide-y divide-gray-100">
                {QUICK_LINKS.map(({ label, path, icon }) => (
                  <Link
                    key={label}
                    to={path}
                    className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-gray-400 text-base group-hover:text-[#FF9F00] transition-colors">
                        {icon}
                      </span>
                      <span className="text-sm text-gray-700">{label}</span>
                    </div>

                    <span className="material-symbols-outlined text-gray-300 text-base">
                      chevron_right
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;