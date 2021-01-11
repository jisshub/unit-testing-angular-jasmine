import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
export class TodoService { 
  constructor(private http: HttpClient) { 
  }

  add(todo: { title: string; }) {
    return this.http.post('...', todo).map((r: { json: () => any; }) => r.json());
  }

  getTodos() { 
    return this.http.get('...').map((r: { json: () => any; }) => r.json());
  } 

  delete(id: any) {
    return this.http.delete('...').map((r: { json: () => any; }) => r.json());
  }
}