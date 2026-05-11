import React from 'react'

const SocialSignUp = () => {
   return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        className="rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm font-medium text-on-surface transition hover:bg-surface-container"
      >
        Google
      </button>
      <button
        type="button"
        className="rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm font-medium text-on-surface transition hover:bg-surface-container"
      >
        LinkedIn
      </button>
    </div>
  );
}

export default SocialSignUp


