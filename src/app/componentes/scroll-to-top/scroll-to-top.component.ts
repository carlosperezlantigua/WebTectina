import { DOCUMENT, CommonModule} from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

// CommonModule para activar ngClass 
@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [FormsModule,  CommonModule],

  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css'
})

export class ScrollToTopComponent {
  
  public windowScrolled: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (document.documentElement.scrollTop > 150 || document.body.scrollTop > 100) {
      this.windowScrolled = true;
      document.querySelector('.scroll-to-top')?.classList.add('show')
    }
    else if (document.documentElement.scrollTop < 150 || document.body.scrollTop < 10) {
      this.windowScrolled = false;
      document.querySelector('.scroll-to-top')?.classList.remove('show')
    }

//     if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
//       this.windowScrolled = true;
//     }
//     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
//       this.windowScrolled = false;
//     }
  }

  

  scrollToTop(): void {
    (function smoothscroll(): void {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            // window.scrollTo(0, currentScroll - (currentScroll / 8));
            window.scrollTo(0, currentScroll - (currentScroll / 4));
            
        }
    })();
}

}
