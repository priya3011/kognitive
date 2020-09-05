import { Component, OnInit, Input } from "@angular/core";
import { Task } from "../../task-list/models/list.model";
import * as moment from "moment";
@Component({
  selector: "app-task-view",
  templateUrl: "./task-view.component.html",
  styleUrls: ["./task-view.component.scss"]
})
export class TaskViewComponent implements OnInit {
    @Input() name: string;
    @Input() noOfTasks: number;
    @Input() taskList: Task[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getDueDate(dueDt) {
      return moment(dueDt).calendar(moment());
  }

  get className() {
      return this.name === "All" ? "all" : "critical";
  }

}
