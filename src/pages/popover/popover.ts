import {Component} from '@angular/core';
import {Events, NavController, NavParams, ViewController} from 'ionic-angular';
import {Printer} from "@ionic-native/printer";
import {HttpServiceProvider} from "../../providers/http-service/http-service";

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html'
})
export class PopoverPage {

    checkedValues = [];

    constructor(public navCtrl: NavController, public navParams: NavParams
        , public printer: Printer
        , public httpService: HttpServiceProvider
        , public events: Events
        , public viewCtrl: ViewController) {

        var _checkedValues = this.navParams.get("checkedValues")

        // alert(_checkedValues);

        this.checkedValues = _checkedValues;

        // alert(this.checkedValues);


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PopoverPage');

    }

    btnLearnIonic() {

        alert('sdlkflsdkflskdflkdslf!!')
        this.close();
    }

    doPrint() {

        var page = document.body;
        this.close();

        this.printer.print(page).then(() => {

        });
    }

    close() {
        this.viewCtrl.dismiss();
    }

    goAbout() {

        this.close();

        this.navCtrl.push("AboutPage");
    }


    deleteItems() {

        this.httpService.removeItem(this.checkedValues).subscribe(() => {

            this.close();

            this.checkedValues=[];

            this.events.publish('getShoppingItems');


        })



    }
}
