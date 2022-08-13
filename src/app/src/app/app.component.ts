import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WishlistItem, WishlistItemResult } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  selectedItem?: WishlistItem;
  filterDone = false;
  firstName: string = '';
  dialogFirstNameVisible = false;
  heartVisible = false;

  constructor(
    private http: HttpClient) {}

  ngOnInit(): void {
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
}
