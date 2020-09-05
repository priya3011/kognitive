import { Component, OnInit } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "kognitive";

  constructor(
    private metaTags: Meta,
    private titleTags: Title,
  ) { }

  ngOnInit(): void {
      this.titleTags.setTitle(this.title);
      this.metaTags.addTags([
        {name: "description", content: "Daily Task Management Application"},
      ]);
  }
}
