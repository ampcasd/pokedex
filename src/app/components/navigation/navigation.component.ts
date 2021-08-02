import { Component, OnInit } from '@angular/core';
import { NavigationButton } from './navigation-button.interface';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  buttons: NavigationButton[] = [
    { url: '/explore', label: 'Explore Pokemon' },
    { url: '/collection', label: 'Pokemon I\'ve caught' },
    { url: '/wishlist', label: 'Pokemon Wishlist' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
