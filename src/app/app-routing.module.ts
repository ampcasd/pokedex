import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './components/collection/collection.component';
import { ExploreComponent } from './components/explore/explore.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: 'explore', component: ExploreComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: '**', redirectTo: '/explore' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
