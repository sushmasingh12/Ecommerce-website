export default function OrDivider() {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-outline-variant/60" />
      </div>
      <div className="relative flex justify-center text-xs uppercase tracking-[0.2em]">
        <span className="bg-surface-container-lowest px-4 text-on-surface-variant">
          Or continue with
        </span>
      </div>
    </div>
  );
}