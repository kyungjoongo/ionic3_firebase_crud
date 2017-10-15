import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "angularfire2/database";
import {LoadingController} from "ionic-angular";


@Injectable()
export class HttpServiceProvider {


    constructor(public http: Http, public angularfiredatabase: AngularFireDatabase, public loadingController: LoadingController) {


    }

    item;
    loadingImage: any;
    result: any;

    getItems() {

        this.result = this.http.get("http://kyungjoon.ipdisk.co.kr:3000/memo/_list").map(res => {
            return res.json()
        });

        return this.result;
    }


    addItem(content) {

        var _resultJson = this.http.get("http://kyungjoon.ipdisk.co.kr:3000/memo/_add?content="+ content);

        return _resultJson;

    }

    removeItem(id) {


        var _resultJson = this.http.get("http://kyungjoon.ipdisk.co.kr:3000/memo/_delete?id="+ id);

        return _resultJson;
    }

    modifyItem(content, id) {

        var _params = "content="+ content + "&id="+ id

//        alert(_params);

        var _resultJson = this.http.get("http://kyungjoon.ipdisk.co.kr:3000/memo/_update?"+ _params);

        return _resultJson;

    }


}
