import { Component } from '@angular/core';
import { NavigationButton } from './navigation-button.interface';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss', '../../app.component.scss']
})
export class NavigationComponent {

  buttons: NavigationButton[] = [
    { url: '/explore', label: 'Explore' },
    { url: '/collection', label: 'Collection' },
    { url: '/wishlist', label: 'Wishlist' },
  ];

}
