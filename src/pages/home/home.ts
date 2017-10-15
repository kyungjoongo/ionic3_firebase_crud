import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database'
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {FirebaseListObservable} from "angularfire2/database";
import {DetailPage} from "../detail/detail";
import {WritePage} from "../write/write";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    shoppingItems: FirebaseListObservable<any[]>;

    newItem = '';
    detailPage = DetailPage;
    writePage = WritePage;
    loadingImage : any = this.loadingController.create({content: '<ion-spinner></ion-spinner>'});

    constructor(public navCtrl: NavController, public fdb: AngularFireDatabase
        , public firebaseService: FirebaseServiceProvider
        , public loadingController: LoadingController) {

        this.shoppingItems = this.firebaseService.getShoppingItems();

        this.loadingImage.present();
        this.shoppingItems.subscribe(() => this.loadingImage.dismiss())

    }

    addItem() {
        this.firebaseService.addItem(this.newItem)
    }


    goWrite() {
        this.navCtrl.push(this.writePage)
    }

    goDetail(item) {

        //alert(item.$value);

        this.navCtrl.push(this.detailPage, {'value': item.value, 'key': item.$key})

    }

    removeItem(id) {

        this.firebaseService.removeItem(id)
    }


}
