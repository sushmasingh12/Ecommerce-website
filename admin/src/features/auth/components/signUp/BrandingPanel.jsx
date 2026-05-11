import React from 'react'

const BrandingPanelx = () => {
   return (
    <section className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-primary text-white p-10 xl:p-14 min-h-[720px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_35%)]" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-white" />
          Admin Intelligence Suite
        </div>

        <h2 className="mt-8 text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
          Build a smarter control center for your business.
        </h2>

        <p className="mt-5 max-w-xl text-sm xl:text-base text-white/80 leading-7">
          Manage products, vendors, insights, operations, and platform activity
          from one elegant admin workspace.
        </p>
      </div>

      <div className="relative z-10 mt-10 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
        <p className="text-sm text-white/85 leading-7">
          “Precision-driven tools for modern store owners, analysts, and
          administrators.”
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
            AC
          </div>
          <div>
            <p className="text-sm font-semibold">Admin Console</p>
            <p className="text-xs text-white/70">Secure • Elegant • Scalable</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandingPanelx;

