import { Component } from '@angular/core';
import firebase from "firebase/compat/app";
import { firebaseApp } from '../app.module';
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rolling',
  templateUrl: './rolling.component.html',
  styleUrls: ['./rolling.component.css']
})
export class RollingComponent {
    db = getFirestore(firebaseApp);
    team: string = "cprm";
    wish: string = "";
    comments: string = "";
    success: boolean = false;
    admin: boolean = false;
    notRolled: boolean = true;


    constructor(private datePipe: DatePipe) {}

    ngOnInit() {
      this.checkIfAdmin();
    }

    async checkIfAdmin() {
      const adminRef = doc(this.db, "Admin", "cprm");
      const docSnap = await getDoc(adminRef);
      
      if (docSnap.exists()) {
        console.log("User data:", docSnap.data());

        if (localStorage.getItem("username") != null && docSnap.data() != null){
          var username = localStorage.getItem("username");
          var data = docSnap.data()['username'];
          if (username == data) {
            this.admin = true;
          }
          else {
            this.admin = false;
          }

        }

      }
    }

    async rolling() {
      const userRef = doc(this.db, "User", "cprm");
      const docSnap = await getDoc(userRef);
      this.notRolled = false;
      if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
        const data = docSnap.data()['players'];
        var i = 0;
        var length = 0;
        for (var player of data) {
          length++;
        }
        var usedId: (number | undefined)[] = []
        var targetId = 0;
        for (var player of data) {

          do {
            targetId = Math.floor(Math.random() * length);
          }
          while (usedId.includes(targetId) || targetId == i);
          const resultRef = doc(this.db, "Result", player);
          await setDoc(resultRef, {
            targetName: data[targetId]
          }).then((response) => {
            console.log(response);
          });
          usedId.push(targetId);
          i++;

        }
        

      }

    }


    async registerPlayer() {
      // try {
      //   const docRef = await addDoc(collection(this.db, "Game"), {
      //     "{{this.team}}": {
      //       "{this.userId}": {
      //         wish: this.wish,
      //         comments: this.comments
      //       }
      //     }
      //   });
      //   console.log("Document written with ID: ", docRef.id);
      //   this.success = true;
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }
      const username = localStorage.getItem("username");
      const uid = localStorage.getItem("userId")
      if (username == null || username == "" || uid == null ){
        console.log("Please Login");
        return;
      }
        
      const gameRef = doc(this.db, this.team, username);
      
      await setDoc(gameRef, {
          wish: this.wish,
          comments: this.comments
      }).then((response) => {
        this.success = true;
        console.log(response);
      });
      
      const userRef = doc(this.db, "User", this.team);
      const docSnap = await getDoc(userRef);
      var data: any[] = [];
    
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        data = data.concat(docSnap.data()['players']);
        
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      if (!data.includes(username)){
        data.push(username);
        await setDoc(userRef, {
          players: data
        }).then((response) => {
          this.success = true;
          console.log(response);

        });
      }
      

      // To update age and favorite color:
      // await updateDoc(gameRef, {
      //     "age": 13,
      //     "favorites.color": "Red"
      // });
    }

    async downloadMatchingResult() {
      const userRef = doc(this.db, "User", this.team);
      const docSnap = await getDoc(userRef);
      var data: any[] = [];
      var targetList = [];
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        data = data.concat(docSnap.data()['players']);
        for (var name of data) {
          const resultRef = doc(this.db, "Result", name);
          const docSnapResult = await getDoc(resultRef);
          if(docSnapResult.exists()) {
            console.log("Document data:", docSnapResult.data());
            targetList.push({username: name, targetName: docSnapResult.data()['targetName']});
          }
          else {
            console.log("No such document!");
          }
        }
        this.downloadFile(targetList);
        
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      

    }

    downloadFile(data: any) {
      const replacer = (_key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
      const header = Object.keys(data[0]);
      let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
      csv.unshift(header.join(','));
      let csvArray = csv.join('\r\n');
  
      var blob = new Blob([csvArray], {type: 'text/csv' })
      let dateTime = new Date();
      var fileName = this.team + "_SantaRollingResult_" + this.datePipe.transform(dateTime,"YYYY.MM.dd.HH.mm.ss") + ".csv";
      saveAs(blob, fileName);
    }
}
