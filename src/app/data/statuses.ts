import { Status } from "./status";

export const StatusesList: Status[] = [
  {status: "Open", description: ""}, /*grey*/
  {status: "In operation", description: " "}, /*green*/
  {status: "Additional information", description: ""}, /*Yellow*/
  {status: "Additional information received", description: ""}, /*Yellow*/
  {status: "Resolved", description: ""}, /*green*/
  {status: "Checked", description: ""}, /*green*/
  {status: "Closed", description: ""}, /*Red*/
  {status: "Re-start", description: ""}, /*Grey*/
  {status: "Marriage", description: ""}, /*Red*/
];
