import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div class="bg-white px-16 py-14 rounded-md text-center">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ModalComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
