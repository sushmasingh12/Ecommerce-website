const VerifySuccessBanner = ({ visible }) => {
   if (!visible) return null;

  return (
    <div className="w-full mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-3">
      <span className="material-symbols-outlined text-primary">
        check_circle
      </span>
      <p className="text-sm font-medium text-primary">
        Email verified! Redirecting...
      </p>
    </div>
  );
}

export default VerifySuccessBanner
