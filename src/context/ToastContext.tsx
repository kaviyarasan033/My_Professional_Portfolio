import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'loading' | 'blank';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  visible: boolean;
}

type ToastContextType = {
  toasts: Toast[];
  show: (message: string, type?: ToastType, duration?: number) => string;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  loading: (message: string) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const show = useCallback(
    (message: string, type: ToastType = 'blank', duration = 3000) => {
      const id = generateId();
      const newToast: Toast = { id, message, type, duration, visible: true };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [dismiss]
  );

  const success = useCallback((message: string, duration = 3000) => show(message, 'success', duration), [show]);
  const error = useCallback((message: string, duration = 4000) => show(message, 'error', duration), [show]);
  const loading = useCallback((message: string) => show(message, 'loading', 0), [show]);

  return (
    <ToastContext.Provider value={{ toasts, show, success, error, loading, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 transition-all duration-300 transform ${
            toast.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
          }`}
        >
          {toast.type === 'success' && (
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          )}
          {toast.type === 'error' && (
            <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
          )}
          {toast.type === 'loading' && (
            <div className="w-6 h-6 rounded-full border-2 border-slate-200 border-t-primary-green animate-spin shrink-0"></div>
          )}

          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {toast.message}
          </p>
        </div>
      ))}
    </div>
  );
};
