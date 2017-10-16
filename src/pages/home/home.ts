import {Component,  ViewChild} from '@angular/core';
import {NavController, LoadingController, NavParams, Events, PopoverController} from 'ionic-angular';
import {DetailPage} from "../detail/detail";
import {WritePage} from "../write/write";
import {Content} from "ionic-angular";
import {PopoverPage} from "../popover/popover";
import {Printer} from "@ionic-native/printer";
import {Storage} from '@ionic/storage';
import * as moment from 'moment';
import { PipesModule} from "../../pipes/pipes.module";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild(Content) ionicContent: Content;
    @ViewChild('myInput') myInput;
    toDoListItems = [];
    content = '';
    detailPage = DetailPage;
    writePage = WritePage;
    popoverPage = PopoverPage;
    checkedValues = [];
    loadingImage: any;

    constructor(public navCtrl: NavController
        , public loadingController: LoadingController
        , public events: Events
        , public printer: Printer
        , private storage: Storage
        , public  popoverCtrl: PopoverController) {
        this.checkedValues = [];

        this.getShoppingItems();

        /**
         * 다른 ts에서도 쓸수 있도록events.subscribe
         */
        events.subscribe('getShoppingItems', () => {
            this.getShoppingItems();
        });


    }

    getGuid() {
        let now = moment().format('YYYYMMDDHHmmss');

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return now + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


    presentPopover(myEvent) {

        let popover = this.popoverCtrl.create(this.popoverPage, {checkedValues: this.checkedValues});


        popover.present({
            ev: myEvent
        });
    }

    getShoppingItems() {

        this.loadingImage = this.loadingController.create({content: '<ion-spinner></ion-spinner>'});

        this.loadingImage.present();
        this.toDoListItems.length = 0;

        this.storage.forEach((value, key, index) => {
            this.toDoListItems.push({'index': index, 'id': key, 'content': value});
        })
        this.loadingImage.dismiss();
    }

    pressEnter(code) {
        if (code == 13) {
            this.writeMemo();

            this.ionicContent.scrollToTop();
        }


    }



    writeMemo() {

        var _guid = this.getGuid();

        this.storage.set(_guid, this.content).then(() => {

            this.getShoppingItems();
        });


        this.content = '';
        setTimeout(() => {
            this.myInput.setFocus();

        }, 900);

    }


    removeItem(key) {

        this.storage.remove(key).then(() => {
            this.getShoppingItems();
        });

    }


    goWrite() {
        this.navCtrl.push(this.writePage)
    }

    goDetail(item) {

        this.navCtrl.push(this.detailPage, {'value': item.content, 'key': item.id});

    }

    ionViewWillEnter() {
        console.log('ionViewDidLoad AboutPage');
    }

}
