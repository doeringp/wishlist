import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Wishlist, WishlistAttributes, WishlistItem, WishlistItemResult } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  wishlist?: WishlistAttributes;
  wishlistItems: WishlistItem[] = [];
  selectedItem?: WishlistItem;
  filterDone = false;
  firstName: string = '';
  dialogFirstNameVisible = false;
  heartVisible = false;
  browserLang: string = 'en';

  constructor(
    translate: TranslateService,
    private http: HttpClient) {
      this.browserLang = translate.getBrowserLang() || 'en';
      translate.use(this.browserLang);
      moment.lang(this.browserLang);
    }

  ngOnInit(): void {
    this.getWishlist();
    this.getWishlistItems();
  }

  checkItem(item: WishlistItem, event: any) {
    this.selectedItem = item;
    let checked: boolean = event.target.checked;
    this.selectedItem.attributes.done = checked;

    if (checked) {
      this.selectedItem.attributes.assignedTo = this.firstName || null;
    } else {
      this.selectedItem.attributes.assignedTo = null;
    }
    this.saveWishlistItem(this.selectedItem);

    if (checked) {
      if (!this.firstName) {
        this.dialogFirstNameVisible = true;
      } else {
        this.showHeart();
      }
    }
  }

  closeFirstNameDialog() {
    this.dialogFirstNameVisible = false;
    if (this.firstName && this.selectedItem) {
      this.selectedItem.attributes.assignedTo = this.firstName;
      this.saveWishlistItem(this.selectedItem);
    }
    this.showHeart();
  }

  showHeart() {
    this.heartVisible = true;
    setTimeout(() => this.heartVisible = false, 1000);
  }

  getWishlist() {
    this.http.get<Wishlist>(`api/wishlist?locale=${this.browserLang}`)
      .subscribe(result => this.wishlist = result?.data?.attributes);
  }

  getWishlistItems() {
    let url = 'api/wishlist-items'
      + '?sort[0]=weight%3Adesc&sort[1]=name';
    if (this.filterDone) {
      url += '&filters[done][$eq]=false';
    }
    this.http.get<WishlistItemResult>(url)
      .subscribe(result => this.wishlistItems = result.data);
  }

  saveWishlistItem(item: WishlistItem) {
    const payload = { data: item.attributes }
    this.http.put<WishlistItem>(`api/wishlist-items/${item.id}`, payload)
      .subscribe(() => this.getWishlistItems());
  }

  prettyDate(date: Date): string {
    return moment(date).fromNow();
  }
}
