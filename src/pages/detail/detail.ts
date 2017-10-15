import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpServiceProvider} from "../../providers/http-service/http-service";
/*import {HomePage} from "../home/home";*/
import {Events} from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
})
export class DetailPage {

    key: string;
    value: string;
    loadingImage;

    constructor(public navCtrl: NavController,
                public events: Events,
                public navParams: NavParams, public httpService: HttpServiceProvider, public loadingController: LoadingController) {

        this.value = (this.navParams.get("value"));

        this.key = this.navParams.get("key");

    }

    modifyContent(content, id) {

        this.httpService.modifyItem(content, id).subscribe(() => {

        })

        this.navCtrl.popTo("HomePage", {'status': 'complete'}, hasCompleted => {

            this.events.publish('getShoppingItems');
        });

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutPage');
    }


}
