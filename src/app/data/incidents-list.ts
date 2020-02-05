import { Incident } from "./incident";

export const IncidentsList: Incident[] = [
  {"_id": "id000001", id: 1, name: "One", assignee: "Petrov", area: "IT", startDate: new Date("2020/1/16"), dueDate: new Date("2020/1/16"), status: "Close" },
  {"_id": "id000002", id: 2, name: "Two", assignee: "Ivanov", area: "IT", startDate: new Date("2019/10/16"), dueDate: new Date("2020/2/16"), status: "Open" },
  {"_id": "id000003", id: 3, name: "Three", assignee: "Turina", area: "QA", startDate: new Date("2019/12/1"), dueDate: new Date("2020/2/1"), status: "Work" },
  {"_id": "id000004", id: 4, name: "Four", assignee: "Titova", area: "QA", startDate: new Date("2020/1/3"), dueDate: new Date("2020/3/3"), status: "Open" },
  {"_id": "id000005", id: 5, name: "Five", assignee: "Igoshin", area: "QA", startDate: new Date("2020/1/27"), dueDate: new Date("2020/4/27"), status: "Open" },
  {"_id": "id000006", id: 6, name: "Six", assignee: "Shipanova", area: "IT", startDate: new Date("2019/12/30"), dueDate: new Date("2020/2/30"), status: "Open" },
];
