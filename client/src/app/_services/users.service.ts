import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  postUser(data: any) {
    return this.http.post<any>("http://localhost:8080/api/user/", data);
  }

  getUsers() {
    return this.http.get<any>("http://localhost:8080/api/users/")
  }

  getUserById(id: number) {
    return this.http.get<any>("http://localhost:8080/api/user/" + id)
  }

  putUser(data: any, id: number) {
    debugger
    return this.http.put<any>("http://localhost:8080/api/user/" + id, data)
  }

  deleteUser(id: number) {
    return this.http.delete<any>("http://localhost:8080/api/user/"+ id)
  }

  updateUserStatus(id: number, status: boolean): Observable<any> {
    debugger
    const data = { status: status };
    return this.http.put("http://localhost:8080/api/update-user-status/" + id, data);
  }
}
