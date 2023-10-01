import { Component, ElementRef, Renderer2, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})

export class SideNavComponent {
  title = 'PropNote';

  openSidebar: boolean = true;

  ngOnInit() {}

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle('showMenu');
  }

  constructor(private router: Router) {}
  //constructor(private router: Router, private elementRef: ElementRef, private renderer: Renderer2, private userActivityService: UserActivityService) { }

  //Responsive Navbar - trying
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    const windowWidth = window.innerWidth;

    if (windowWidth < 1000) {
      this.closeSideNavigation();
    }
  }

  // Trigger user activity when user interactions occur
  /*@HostListener('window:mousemove', ['$event'])
  @HostListener('window:keydown', ['$event'])
  onUserInteraction(event: Event): void {
    this.userActivityService.resetActivityTimer();
  }*/


  closeSideNavigation(): void {
    this.sidenav.close();
  }

  onClickHome() {
    this.router.navigate(['/home']);
  }

  onClickCalc() {
    this.router.navigate(['/calculator']);
  }

  onClickChat() {
    this.router.navigate(['/chatbot']);
  }

  onClickHelp() {
    this.router.navigate(['/help']);
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  toggleSidenav() {
    this.sidenav.toggle();
  }
  Logout() {
    localStorage.clear();
    this.router.navigate(['/landingPage']).then(() => {
      location.reload();
    });
    //TODO - Will Need to redirect back to Landing Page
  }
}
