import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {AboutPage} from "../pages/about/about";
import {SettingPage} from "../pages/setting/setting";
import { AdMobPro} from "@ionic-native/admob-pro";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private admob : AdMobPro) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Note', component: HomePage }
      ,{ title: 'About', component: AboutPage }
/*        ,{ title: 'Setting', component: SettingPage }*/


    ];



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

        var admobid = {
            interstitial: 'ca-app-pub-6826082357124500/9307296734',
            banner: 'ca-app-pub-6826082357124500/7593091515'

        };

      /*  this.admob.createBanner({
            adId: admobid.banner,
            isTesting: false,
            autoShow: true,
            position: this.admob.AD_POSITION.BOTTOM_CENTER
        })
*/
        this.admob.prepareInterstitial({
            adId: admobid.interstitial,
            isTesting: false,
            autoShow: true
        })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
