import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database'
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {FirebaseListObservable} from "angularfire2/database";
import { AboutPage} from "../about/about";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    shoppingItems: FirebaseListObservable<any[]>;

    newItem = '';

    aboutPage = AboutPage;


    constructor(public navCtrl: NavController, public fdb: AngularFireDatabase, public firebaseService: FirebaseServiceProvider) {

        this.shoppingItems = this.firebaseService.getShoppingItems();
    }

    addItem() {

        this.firebaseService.addItem(this.newItem)
    }

    goDetail(item) {

        //alert(item.$value);

        this.navCtrl.push(this.aboutPage, {'value':item.value, 'key': item.$key })

    }

    removeItem(id) {

        this.firebaseService.removeItem(id)
    }


}
