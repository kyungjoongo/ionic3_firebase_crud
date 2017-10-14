import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "angularfire2/database";

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

    constructor(public http: Http, public angularfiredatabase: AngularFireDatabase) {
    }

    item;


    getShoppingItems() {

        return this.angularfiredatabase.list('/shoppingItems/')

    }

    addItem(name) {

        this.item = {'value': name};


        this.angularfiredatabase.list('/shoppingItems/').push(this.item)
    }

    removeItem(id) {


        this.angularfiredatabase.list('/shoppingItems/').remove(id)
    }

    modifyItem(value, key) {

//        alert(value);

        this.angularfiredatabase.list('/shoppingItems/').update(key, {value: value}).then(() => {


           // alert('수정성공!');
        });

    }


}
