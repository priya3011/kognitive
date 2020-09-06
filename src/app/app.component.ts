import { Component, OnInit } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "kognitive";
  // offline: boolean;

  constructor(
    private metaTags: Meta,
    private titleTags: Title,
  ) { }

  ngOnInit(): void {
    this.titleTags.setTitle(this.title);
    this.metaTags.addTags([
      { name: "description", content: "Daily Task Management Application" },
    ]);
    // window.addEventListener('online',  this.onNetworkStatusChange.bind(this));
    // window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }

  // onNetworkStatusChange() {
  //   this.offline = !navigator.onLine;
  //   console.log('offline ' + this.offline);
  // }
}
