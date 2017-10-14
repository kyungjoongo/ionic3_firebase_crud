import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import { HomePage} from "../home/home";

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
