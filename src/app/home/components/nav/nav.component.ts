import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  panelOpenState = false;

  logguedUser;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private paginator: MatPaginatorIntl,
    private router: Router,
    private auth: AuthService,
    ) {
      this.paginator.itemsPerPageLabel = 'Registros por página';
    }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      console.log(user);
      this.logguedUser = user;
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
