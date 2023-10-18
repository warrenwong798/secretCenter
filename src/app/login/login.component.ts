import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword, User } from "firebase/auth";
import { firebaseApp } from '../app.module';
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  // team: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  auth = getAuth(firebaseApp);
  user: User | null = null;
  db = getFirestore(firebaseApp);

  constructor(public dialog: MatDialog) {}

  openDialog(login: boolean): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {email: this.email, username: this.username, password: this.password, login: login},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.username = result.username;
      this.email = result.email;
      this.password = result.password;
      console.log(result);
      if (login) {
        this.login();
      }
      else {
        this.register();
      }
      
    });
  }

  register() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      localStorage.setItem('email', this.email)
      localStorage.setItem('userId', user.uid)
      if (this.auth.currentUser) {
        updateProfile(this.auth.currentUser, {
          displayName: this.username
        }).then(() => {
          console.log("Profile Updated!")
          localStorage.setItem("username", this.username);
        }).catch((error) => {
          console.log(error);
        });
      }
      
      this.user = user;

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
    });
  }


  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      localStorage.setItem('email', this.email)
      localStorage.setItem('userId', user.uid)
      if (user.displayName != null)
        localStorage.setItem("username", user.displayName);
      this.user = user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  logout() {
    signOut(this.auth).then(() => {
      localStorage.setItem('email', "")
      localStorage.setItem('userId', "")
      localStorage.setItem("username", "");
      this.email = ""
      this.password = ""
      this.username = ""
      this.user = null;
    }).catch((error) => {
      console.log(error);
    });
  }

  // setUpUser() {
  //   const userRef = doc(this.db, "User", user.uid, this.username);
  //     await setDoc(gameRef, {
  //         wish: this.wish,
  //         comments: this.comments
  //     }).then((response) => {
  //       this.success = true;
  //       console.log(response);
  //     });

  // }

  
}
