import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../services/switch.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{

  constructor(private modalSS : SwitchService){}

    ngOnInit(): void {
        
    }

    closeModal(){
      this.modalSS.$modal.emit(false);

    }
}
