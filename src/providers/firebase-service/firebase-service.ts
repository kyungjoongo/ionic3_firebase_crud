import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "angularfire2/database";
import {LoadingController} from "ionic-angular";


@Injectable()
export class FirebaseServiceProvider {

    constructor(public http: Http, public angularfiredatabase: AngularFireDatabase, public loadingController: LoadingController) {


    }

    item;
    loadingImage: any;

    getShoppingItems() {

        return this.angularfiredatabase.list('/shoppingItems/');


    }

    addItem(name) {

        this.item = {'value': name};
        this.loadingImage = this.loadingController.create({content: '<ion-spinner></ion-spinner>'});
        this.loadingImage.present();
        this.angularfiredatabase.list('/shoppingItems/').push(this.item).then(() => {

            this.loadingImage.dismiss();
        })
    }

    removeItem(id) {
        this.loadingImage = this.loadingController.create({content: '<ion-spinner></ion-spinner>'});
        this.loadingImage.present();
        this.angularfiredatabase.list('/shoppingItems/').remove(id).then(() => {
            this.loadingImage.dismiss();


        })
    }

    somePromiseMethod() {

        console.log('test');
    }

    modifyItem(value, key) {

        this.loadingImage = this.loadingController.create({content: '<ion-spinner></ion-spinner>'});
        this.loadingImage.present();
        this.angularfiredatabase.list('/shoppingItems/').update(key, {value: value}).then(() => {
            this.loadingImage.dismiss();
        });

    }


}
