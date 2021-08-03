import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CollectionComponent } from './components/collection/collection.component';
import { ExploreComponent } from './components/explore/explore.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonGridComponent } from './components/pokemon-grid/pokemon-grid.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LayoutModule } from '@angular/cdk/layout';
import { PokemonSummaryComponent } from './components/pokemon-summary/pokemon-summary.component';
import { NgxsModule } from '@ngxs/store';
import { PokemonState } from './store/pokemon.store';
import { ExponentialStrengthPipe } from './pipes/dash-to-whitespace.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PokemonGridComponent,
    PokemonDetailsComponent,
    WishlistComponent,
    PokemonListComponent,
    NavigationComponent,
    CollectionComponent,
    ExploreComponent,
    PokemonSummaryComponent,
    ExponentialStrengthPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    LayoutModule,
    MatPaginatorModule,
    MatDialogModule,
    NgxsModule.forRoot([PokemonState])
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
