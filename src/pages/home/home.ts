import {Component, HostBinding, ViewChild} from '@angular/core';
import {NavController, LoadingController, NavParams, Events, PopoverController, AlertController} from 'ionic-angular';
import {DetailPage} from "../detail/detail";
import {WritePage} from "../write/write";
import {Content} from "ionic-angular";
import {PopoverPage} from "../popover/popover";
import {Printer} from "@ionic-native/printer";
import {Storage} from '@ionic/storage';
import * as moment from 'moment';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @HostBinding('style.font-family') fontFamily: string;

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
        , public alertCtrl: AlertController
        , public  popoverCtrl: PopoverController) {
        this.checkedValues = [];

        this.getNoteItems();

        /**
         * 다른 ts에서도 쓸수 있도록events.subscribe
         */
        events.subscribe('getShoppingItems', () => {
            this.getNoteItems();
        });


        events.subscribe('clearLocalStorage', () => {
            this.clearLocalStorage();
        });


        events.subscribe('changeFontFamily', (response) => {

           /* alert(response.fontName+ "eventsldkflsdkflksdflksdf========>");*/

            this.changeFontFamily(response.fontName);
        });


    }



    changeFontFamily(fontName) {

        this.fontFamily = fontName;
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


    getNoteItems() {

        this.loadingImage = this.loadingController.create({content: '<ion-spinner></ion-spinner>'});

        this.loadingImage.present();
        this.toDoListItems.length = 0;
        var toDoListItems3 = new Array();
        this.storage.forEach((value, key, index) => {
            toDoListItems3.push({'index': index, 'key': key, 'content': value});

        }).then(() => {

            toDoListItems3.sort((left, right) => {
                if (left.key > right.key) return -1;
                if (left.key < right.key) return 1;
                return 0;
            });

            toDoListItems3.forEach(element => {
                this.toDoListItems.push({'index': element.index, 'key': element.key, 'content': element.content});
            });

            //console.log('#########################', toDoListItems3);
            this.loadingImage.dismiss();
        })
    }

    clearLocalStorage() {
        console.log('클리어3333333333333333333333333333333333333333!')
        this.storage.clear().then(() => {
            this.getNoteItems();
        })

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

            this.getNoteItems();
        });


        this.content = '';
        setTimeout(() => {
            this.myInput.setFocus();

        }, 900);

    }


    removeItem(key) {

        this.storage.remove(key).then(() => {
            this.getNoteItems();
        });
    }

    goDetail(item) {

        this.navCtrl.push(this.detailPage, {'value': item.content, 'key': item.key});
    }


    goWrite() {
        this.navCtrl.push(this.writePage)
    }


}
