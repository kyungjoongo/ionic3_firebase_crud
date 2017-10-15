import {Component, Renderer2, ViewChild} from '@angular/core';
import {NavController, LoadingController, NavParams, Events} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database'
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {DetailPage} from "../detail/detail";
import {WritePage} from "../write/write";
import {Content} from "ionic-angular";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild(Content) ionicContent: Content;

    toDoListItems = [];
    content = '';
    detailPage = DetailPage;
    writePage = WritePage;
    loadingImage: any;
    @ViewChild('myInput') myInput;


    constructor(public navCtrl: NavController, public fdb: AngularFireDatabase
        , public httpService: HttpServiceProvider
        , public navParams: NavParams
        , public loadingController: LoadingController
        , public events: Events
        ) {


        this.getShoppingItems();


        events.subscribe('getShoppingItems', () => {
            this.getShoppingItems();
        });


    }


    getShoppingItems() {

        this.loadingImage = this.loadingController.create({content: '<ion-spinner></ion-spinner>'});

        this.loadingImage.present();
        return this.httpService.getItems().subscribe(jsonResult => {
                this.toDoListItems = jsonResult;

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

    pressEnter(code) {
        if (code == 13) {
            this.writeMemo();
        }

    }


    addItem() {

        this.writeMemo();

        this.ionicContent.scrollToTop();

    }

    writeMemo() {

        this.httpService.addItem(this.content).subscribe(res => {
            this.getShoppingItems();

        })
        this.content = '';
        setTimeout(() => {
            this.myInput.setFocus();

        }, 900);

    }


    removeItem(id) {

        //      alert(id);

        this.httpService.removeItem(id).subscribe(res => {
            this.getShoppingItems();
        })
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
