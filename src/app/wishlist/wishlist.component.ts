import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { firebaseApp } from '../app.module';
import { getFirestore, doc, getDoc } from "firebase/firestore";

export interface WishList {
  wishItem: string;
  comments: string;
}

const rowData: WishList[] = [
  { wishItem: 'Toyota', comments: 'Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words Dummy words ' },
  { wishItem: 'Ford', comments: 'Mondeo' },
  { wishItem: 'Porsche', comments: 'Boxster' }
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
  displayedColumns: string[] = ['wishItem', 'comments'];
  dataSource: WishList[] = [];
  db = getFirestore(firebaseApp);
  wish: string = "";
  target: string = "";

    columnDefs: ColDef[] = [
        { field: 'wishItem' },
        { field: 'comments' },
        { field: 'price'}
    ];

  ngOnInit() {
    this.getWish();
    this.getAllWish();
    this.getTarget();
  }

  async getWish() {
    

    const username = localStorage.getItem("username");
    const uid = localStorage.getItem("userId")
    if (username == null || username == "" || uid == null ){
      console.log("Please Login");
      return;
    }
        
    const gameRef = doc(this.db, "cprm", username);
    const docSnap = await getDoc(gameRef);

    
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      this.wish = data['wish'];
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async getAllWish() {
    const userRef = doc(this.db, "User", "cprm");
    const docSnap = await getDoc(userRef);

  
    if (docSnap.exists()) {
      // console.log("User data:", docSnap.data());
      const data = docSnap.data()['players'];
      var wishList: WishList[] = [];
      for (var item of data) {
        console.log(item)
        const wishRef = doc(this.db, "cprm", item);
        const wishSnap = await getDoc(wishRef);
        if (wishSnap.exists()) {
          // console.log("Wish:", wishSnap.data());
          const w = wishSnap.data()
          wishList.push({
            wishItem: w['wish'], comments: w['comments']
          });
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such wish!");
        }
      }
      this.dataSource = wishList;
      
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such user!");
    }
  }

  async getTarget() {
    const username = localStorage.getItem("username");
    const uid = localStorage.getItem("userId");
    if (username == null || username == "" || uid == null ){
      console.log("Please Login");
      return;
    }
        
    const targetRef = doc(this.db, "Result", username);
    const docSnap = await getDoc(targetRef);

    
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      this.target = data['targetName'];
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
    

}
