import { Component } from '@angular/core';
import { DemoSelectComponent } from './demo-select.component';

@Component({
  selector: 'chaapaar-select-test-root',
  template: `
    <chaapaar-select-test-demo-select></chaapaar-select-test-demo-select>
  `,
  standalone: true,
  imports: [DemoSelectComponent],
})
export class AppComponent {
  title = 'chaapaar-select-test';
}
