import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastServiceService } from '../toast-service.service';

@Component({
  selector: 'app-toast-container',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hide)="toastService.remove(toast)"
    >
    <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.body"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.body }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'},
  styles: [
  ]
})
export class ToastContainerComponent implements OnInit {

  constructor(public toastService: ToastServiceService,) { }

  ngOnInit(): void {
  }

  isTemplate(toast) { return toast.body instanceof TemplateRef; }

}
