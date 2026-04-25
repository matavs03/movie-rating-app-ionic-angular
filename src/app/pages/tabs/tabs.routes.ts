import {Routes} from "@angular/router";
import {TabsPage} from "./tabs.page";

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'movies',
        loadComponent: () => import('../movies/movies.page').then(m => m.MoviesPage),
      },
      {
        path: 'rated',
        loadComponent: () => import('../rated/rated.page').then(m => m.RatedPage),
      },
      {
        path: 'account',
        loadComponent: () => import('../account/account.page').then(m => m.AccountPage),
      },
      {
        path: '',
        redirectTo: '/tabs/movies',
        pathMatch: 'full',
      },
    ]
  }
]
