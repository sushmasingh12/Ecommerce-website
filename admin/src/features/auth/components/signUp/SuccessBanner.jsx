const SuccessBanner = ({ visible, message = "Success" }) => {
  if (!visible) return null;

  return (
    <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
      <p className="text-sm font-medium text-emerald-700">{message}</p>
    </div>
  );
}

export default SuccessBanner
