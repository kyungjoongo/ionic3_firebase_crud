import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireModule} from 'angularfire2'
import {AngularFireDatabaseModule} from "angularfire2/database";
import {HttpModule} from "@angular/http";
import {FirebaseServiceProvider} from '../providers/firebase-service/firebase-service';
import { DetailPage} from "../pages/detail/detail";
import { AboutPage} from "../pages/about/about";



var config = {
    apiKey: "AIzaSyDEzvhYyYPy2jRE-J2BweJKST22IKGEHzU",
    authDomain: "ionic1014.firebaseapp.com",
    databaseURL: "https://ionic1014.firebaseio.com",
    projectId: "ionic1014",
    storageBucket: "ionic1014.appspot.com",
    messagingSenderId: "502669542231"
};


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        DetailPage,
        AboutPage

    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(config),
        HttpModule


    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        DetailPage,
        AboutPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        FirebaseServiceProvider

    ]
})
export class AppModule {
}
