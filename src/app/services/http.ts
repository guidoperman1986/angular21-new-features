import { inject, Service } from "@angular/core";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";

@Service()
export class HttpService {
  private http = inject(HttpClient);

  getUser(id: number) {
    return this.http.get<User>(`https://dummyjson.com/users/${id}`);
  }
}   