import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      @for (toast of toastService.toasts(); track toast.id) {
        <div 
          class="pointer-events-auto flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 transition-all duration-300 transform"
          [class.opacity-0]="!toast.visible"
          [class.opacity-100]="toast.visible"
          [class.-translate-y-4]="!toast.visible"
          [class.translate-y-0]="toast.visible"
          [class.scale-95]="!toast.visible"
          [class.scale-100]="toast.visible"
        >
          <!-- Icon -->
          @if (toast.type === 'success') {
            <div class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
              <mat-icon class="text-[16px] w-4 h-4">check</mat-icon>
            </div>
          } @else if (toast.type === 'error') {
            <div class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <mat-icon class="text-[16px] w-4 h-4">close</mat-icon>
            </div>
          } @else if (toast.type === 'loading') {
            <div class="w-6 h-6 rounded-full border-2 border-slate-200 border-t-primary-green animate-spin shrink-0"></div>
          }

          <!-- Message -->
          <p class="text-sm font-medium text-slate-800 dark:text-slate-200">
            {{ toast.message }}
          </p>
        </div>
      }
    </div>
  `
})
export class ToastContainerComponent {
  toastService = inject(ToastService);
}
