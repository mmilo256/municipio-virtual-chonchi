import React from 'react';

const LoadingOverlay = ({ show, text = 'Cargando...' }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="rounded-lg bg-white px-6 py-4 shadow-lg text-center">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
        <p className="font-medium text-slate-700">{text}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
