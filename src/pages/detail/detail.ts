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

    id: string;
    content: string;
    loadingImage;

    constructor(public navCtrl: NavController,
                public events: Events,
                public navParams: NavParams, public httpService: HttpServiceProvider, public loadingController: LoadingController) {

        this.content = (this.navParams.get("value"));

        this.id = this.navParams.get("key");

    }

    pressModifyBtn() {


       this.modify();

    }


    pressEnter(code) {

        if (code == 13) {

            this.modify();
        }

    }

    modify(){
        this.httpService.modifyItem(this.content, this.id).subscribe(() => {

        })

        this.navCtrl.popTo("HomePage",'', hasCompleted => {

            this.events.publish('getShoppingItems');
        });

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutPage');
    }


}
