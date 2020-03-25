export interface Incident {
  _id?: string;
  id?: number;
  name: string;
  assignee: string;
  area: string;
  startDate: Date | number;
  dueDate: Date;
  description?: string;
  priority?: string;
  status: string;
}
