export enum ApplicationType{
  Request,
  Suggestion,
  Complaint
}
export enum ApplicationStatus{
  Submitted,
  Completed
}
export interface Application{
  guid:number,
  date:Date,
  type:ApplicationType,
  status:ApplicationStatus,
  message:string
}