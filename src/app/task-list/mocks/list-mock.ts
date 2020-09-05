import { ListResponse, Task, TaskAttributes } from "../models/list.model";

export const taskAttributesMock: TaskAttributes = {
  body: "Check in to your shift",
  label: ["timekeeping"],
  points: 5,
  priority: "High",
  rollover: 0,
  shift_id: 500127,
  title: "Check in to shift 500127",
  type: "checkin"
};
export const taskMock: Task[] = [{
  id: 23,
  creator: "0",
  owner: "72",
  assignee: "29",
  parent_id: null,
  start_dt: "2020-09-04",
  due_dt: "2020-09-04",
  reminder_dt: "2020-09-04",
  status: "pending",
  attr: taskAttributesMock
} as Task, {
  id: 24,
  creator: "0",
  owner: "75",
  assignee: "50",
  parent_id: null,
  start_dt: "2020-09-05",
  due_dt: "2020-09-05",
  reminder_dt: "2020-09-05",
  status: "pending",
  attr: taskAttributesMock
} as Task,
];
export const listResponseMock: ListResponse = {
  message: "success",
  data: taskMock
};
