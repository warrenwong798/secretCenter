import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

export interface WishList {
  wishItem: string;
  comments: string;
  price: number;
}

const rowData: WishList[] = [
  { wishItem: 'Toyota', comments: 'Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words ', price: 35000 },
  { wishItem: 'Ford', comments: 'Mondeo', price: 32000 },
  { wishItem: 'Porsche', comments: 'Boxster', price: 72000 }
];

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  hide = true;
  hideCenter = true;
  team: string = "";
  displayedColumns: string[] = ['wishItem', 'comments', 'price'];
  dataSource = rowData;

    columnDefs: ColDef[] = [
        { field: 'wishItem' },
        { field: 'comments' },
        { field: 'price'}
    ];

    

}
