export interface Task {
    id: number;
    creator: string;
    owner: string;
    assignee: string;
    parent_id: null;
    start_dt: string;
    due_dt: string;
    reminder_dt: string;
    status: string;
    attr: TaskAttributes;
}

export interface TaskAttributes {
    body?: string;
    enrollment_id?: number;
    label: [string];
    permanent_flag?: number;
    priority: string;
    title?: string;
    type?: string;
    points?: number;
    rollover?: number;
    shift_id?: number;
}

export interface ListResponse {
    message: string;
    data: Task[];
}
