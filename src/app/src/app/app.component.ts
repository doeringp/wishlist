import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  wishlistItems: Array<any> = [];

  constructor(
    private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('api/wishlist-items')
      .subscribe((res: any) => this.wishlistItems = res.data);
  }
}
