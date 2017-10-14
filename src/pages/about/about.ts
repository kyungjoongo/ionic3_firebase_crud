import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import { HomePage} from "../home/home";


@IonicPage()
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {

    key: string;
    value: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseServiceProvider) {

        this.value = (this.navParams.get("value"));

        this.key = this.navParams.get("key");

    }

    modifyContent(value,key) {

       // alert(value);

        this.firebaseService.modifyItem(value,key)

        this.navCtrl.popTo("HomePage");

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutPage');
    }

}
