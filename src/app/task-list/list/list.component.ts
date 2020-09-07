import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/index";
import { takeUntil } from "rxjs/operators";
import { ListService } from "../services/list.service";
import { ListServiceState } from "../states/list.state";
import { Task } from "../models/list.model";
import * as moment from "moment";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject();
  private _criticalTasks: Task[];
  private _allTasks: Task[];

  constructor(private listService: ListService,
              private datePipe: DatePipe) { }

  ngOnInit() {

    this.listService.list$.pipe(takeUntil(this.destroyed$)).subscribe(
      state => {
        this.allTasks = state.tasks;
        this.criticalTasks = this.allTasks;
      }
    );
    this.listService.list();
  }

  get noOfAllTasks() {
    return this.allTasks.length;
  }
  get noOfCriticalTasks() {
    return this.criticalTasks.length;
  }

  get allTasks() {
    return this._allTasks;
  }
  set allTasks(at) {
    this._allTasks = at.filter(this.dueGreaterThanYesterday);
  }

  dueGreaterThanYesterday(t) {
    return moment(t.due_dt) > moment().subtract(1, "days");
  }


  get criticalTasks() {
    return this._criticalTasks;
  }
  set criticalTasks(at) {
    const myDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this._criticalTasks = at.filter(t => t.attr.priority === "High"
                            && t.status === "Pending" && t.due_dt === myDate );
  }

  getTodaysDoneTasks() {
    return this.allTasks.filter(this.filterDoneTasks);
  }

  filterDoneTasks(task) {
    return task.status === "Done";
  }

  get completedPercentage() {
    return (this.getTodaysDoneTasks().length/this.allTasks.length)*100;
  }



  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
}
