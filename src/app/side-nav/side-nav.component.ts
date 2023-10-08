import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @Input() showFiller: boolean = true;
  @Output() changePageEvent = new EventEmitter<string>();

  changePage(value: string) {
    this.changePageEvent.emit(value);
  }


}
