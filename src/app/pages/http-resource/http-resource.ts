import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-http-resource',
  imports: [JsonPipe, FormsModule],
  templateUrl: './http-resource.html',
  styleUrl: './http-resource.css',
})
export class HttpResource {
  userId = signal(5);
  http = inject(HttpClient);
  userResource$ = rxResource({
    // 'params' tracks dependencies; when they change, the stream re-runs
    // 'stream' returns an Observable (perfect for HttpClient)
    params: () => ({ id: this.userId() }),
    stream: ({ params }) => this.http.get(`https://dummyjson.com/users/${params.id}`),
  });

  userResource = resource({
    params: () => ({ id: this.userId() }),
    loader: ({ params }) => fetch(`https://dummyjson.com/users/${params.id}`).then((res) => res.json()),
  });
}
