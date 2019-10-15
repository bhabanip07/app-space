import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'App Space';
  theme ="dark";
  breadcrumbLabel2 = '';
  breadcrumbLabel1 = '';
  pageTitle = '';

  switchTheme() {
    if(this.theme === "dark") {
       this.theme = "light";
    }
    else {
      this.theme = "dark";
    }

  };
  writeHeader(e, item) {
  let menuItems = document.querySelectorAll('sh-menu-item');
  menuItems.forEach(removeActive);
  function removeActive(item, index) {
    item.shadowRoot.getElementById('menuExpandWrapper').removeAttribute('active');
    // if(item.childElementCount > 0) {
    //   for(let i=0 ; i < item.children.length ; i++) {
    //     let child = item.children[i];
    //     child.shadowRoot.getElementById('menuExpandWrapper').removeAttribute('active');
    //   }
    // }
  }
  document.getElementById(e.target.id).shadowRoot.getElementById('menuExpandWrapper').setAttribute('active','active');
  };
  showLeftDrawer() {
   let drawer =  document.getElementById('drawer-left') as any;
   drawer.visible = true;
  }
  searchSite(){
    this.router.navigate(['/search']);
  }
}
