import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'loading' | 'blank';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  show(message: string, type: ToastType = 'blank', duration = 3000): string {
    const id = this.generateId();
    const newToast: Toast = { id, message, type, duration, visible: true };
    
    this.toasts.update(toasts => [...toasts, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    return id;
  }

  success(message: string, duration = 3000): string {
    return this.show(message, 'success', duration);
  }

  error(message: string, duration = 4000): string {
    return this.show(message, 'error', duration);
  }

  loading(message: string): string {
    return this.show(message, 'loading', 0);
  }

  dismiss(id: string) {
    this.toasts.update(toasts => 
      toasts.map(t => t.id === id ? { ...t, visible: false } : t)
    );

    // Remove from array after animation completes
    setTimeout(() => {
      this.toasts.update(toasts => toasts.filter(t => t.id !== id));
    }, 300);
  }
}
