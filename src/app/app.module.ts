import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule, Pipe, PipeTransform} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireModule} from 'angularfire2'
import {AngularFireDatabaseModule} from "angularfire2/database";
import {HttpModule} from "@angular/http";
import {HttpServiceProvider} from '../providers/http-service/http-service';
import {WritePage} from "../pages/write/write";

import {DetailPage} from "../pages/detail/detail";
import {PopoverPage} from "../pages/popover/popover";
import {Printer} from "@ionic-native/printer";
import {AboutPage} from "../pages/about/about";
import {LongPressModule} from "ionic-long-press";
import { IonicStorageModule } from '@ionic/storage';
import { PipesModule} from "../pipes/pipes.module";


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
        DetailPage, WritePage,PopoverPage,AboutPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(config),
        HttpModule,
        LongPressModule,
        IonicStorageModule.forRoot({
            name: '_mydb3',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        PipesModule




    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        DetailPage, WritePage,PopoverPage,AboutPage

    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        HttpServiceProvider,
        Printer




    ]
})
export class AppModule {
}
