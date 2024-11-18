import { DOCUMENT, CommonModule } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top1.component.html',
  styleUrl: './scroll-to-top1.component.css'
})
export class ScrollToTop1Component {

  public windowScrolled: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      }
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }

  scrollToTop(): void {
    (function smoothscroll(): void {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            // window.scrollTo(0, currentScroll - (currentScroll / 8));
            window.scrollTo(0, currentScroll - (currentScroll / 2));
        }
    })();

  }

}
