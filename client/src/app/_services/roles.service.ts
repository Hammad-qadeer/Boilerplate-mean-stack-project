import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  postRole(data: any) {
    return this.http.post<any>("http://localhost:8080/api/role/", data);
  }

  getRoles() {
    return this.http.get<any>("http://localhost:8080/api/roles/");
  }

  putRole(data: any, id: number) {
    debugger
    return this.http.put<any>("http://localhost:8080/api/role/" + id, data)
  }

  deleteRole(id: number) {
    return this.http.delete<any>("http://localhost:8080/api/role/"+ id)
  }

}
