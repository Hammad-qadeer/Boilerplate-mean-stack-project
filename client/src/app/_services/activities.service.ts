import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient) { }

  postActivity(data: any) {
    return this.http.post<any>("http://localhost:8080/api/activity/", data);
  }

  getActivities() {
    return this.http.get<any>("http://localhost:8080/api/activities/");
  }

  putActivity(data: any, id: number) {
    debugger
    return this.http.put<any>("http://localhost:8080/api/activity/" + id, data)
  }

  deleteActivity(id: number) {
    return this.http.delete<any>("http://localhost:8080/api/activity/"+ id)
  }

}
