import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-required',
  standalone: true,
  imports: [],
  templateUrl: './input-required.component.html',
  styleUrl: './input-required.component.css'
})
export class InputRequiredComponent {
  @Input() InvalidFeedback: boolean = false;
  @Input() Comentario: string = "";
}
