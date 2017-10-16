import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpServiceProvider} from "../../providers/http-service/http-service";
/*import {HomePage} from "../home/home";*/
import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
})
export class DetailPage {

    id: string;
    content: string;
    loadingImage;

    @ViewChild('text1') text1;

    constructor(public navCtrl: NavController,
                public events: Events, private storage: Storage,
                public navParams: NavParams, public httpService: HttpServiceProvider, public loadingController: LoadingController) {

        this.content = (this.navParams.get("value"));

        this.id = this.navParams.get("key");

        setTimeout(() => {
            this.text1.setFocus();

        }, 900);

    }

    pressModifyBtn() {


        this.modify();

    }


    pressEnter(code) {

        if (code == 13) {

            this.modify();
        }

    }

    modify() {

        this.storage.set(this.id, this.content).then(() => {
        });


        this.navCtrl.popTo("HomePage", '', hasCompleted => {

            this.events.publish('getShoppingItems');
        });

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutPage');
    }


}
