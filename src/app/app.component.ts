import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ProjektFront';

  constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {}

  setDocTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  ngOnInit(): void {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          // @ts-ignore
          if (child.snapshot.data.title) {
            // @ts-ignore
            return child.snapshot.data.title;
          }
          return appTitle;
        })
    ).subscribe( (ttl: string) => {
      this.titleService.setTitle(ttl);
    });
  }
}
