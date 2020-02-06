export interface Incident {
  _id?: string;
  id: number;
  svg?: string;
  name: string;
  assignee: string;
  area: string;
  startDate: Date | number;
  dueDate: Date;
  description?: string;
  priority?: string;
  status: string;
}
