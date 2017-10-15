import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams, Events} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database'
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {FirebaseListObservable} from "angularfire2/database";
import {DetailPage} from "../detail/detail";
import {WritePage} from "../write/write";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    shoppingItems = [];

    newItem = '';
    content = '';
    detailPage = DetailPage;
    writePage = WritePage;
    loadingImage: any;

    constructor(public navCtrl: NavController, public fdb: AngularFireDatabase
        , public httpService: HttpServiceProvider
        , public navParams: NavParams
        , public loadingController: LoadingController
        , public events: Events) {


        this.getShoppingItems();


        events.subscribe('getShoppingItems', () => {
            this.getShoppingItems();
        });


    }


    getShoppingItems() {

        this.loadingImage = this.loadingController.create({content: '<ion-spinner></ion-spinner>'});

        this.loadingImage.present();
        return this.httpService.getShoppingItems2().subscribe(jsonResult => {

                this.shoppingItems = jsonResult;

            },
            error => {
                alert('http fetch error!');
            },
            complete => {
                console.log('complat fetch')
                this.loadingImage.dismiss();
            }
        );
    }


    addItem() {

        this.httpService.addItem(this.content).subscribe(res => {
            this.getShoppingItems();
        })

    }


    removeItem(id) {

        //      alert(id);

        this.httpService.removeItem(id).subscribe(res => {
            this.getShoppingItems();
        })
    }


    pressEnter(code) {

        if (code == 13) {
            this.httpService.addItem(this.content).subscribe(res => {
                this.getShoppingItems();
            })
        }

    }


    goWrite() {
        this.navCtrl.push(this.writePage)
    }

    goDetail(item) {

        //alert(item.$value);

        this.navCtrl.push(this.detailPage, {
            'value': item.content, 'key': item.id
        }, '', hasCompleted => {



            // alert("sdlfksdlfksldkflksd콜픔리트")

        });


    }


}
