import { JsonPipe } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { Component, inject, resource, signal, ChangeDetectionStrategy } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Card } from '../../components/card/card';
import { User } from '../../models/user';
import { HttpService } from '../../services/http';

@Component({
  selector: 'app-http-resource',
  imports: [FormsModule, Card],
  templateUrl: './http-resource.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './http-resource.css',
})
export class HttpResource {
  userId = signal(5);
  http = inject(HttpClient);
  httpService = inject(HttpService);
  
  userResource$ = rxResource({
    // 'params' tracks dependencies; when they change, the stream re-runs
    // 'stream' returns an Observable (perfect for HttpClient)
    params: () => ({ id: this.userId() }),
    stream: ({ params }) => this.httpService.getUser(params.id),
  });

  userResource = resource({
    params: () => ({ id: this.userId() }),
    loader: ({ params }) =>
      fetch(`https://dummyjson.com/users/${params.id}`).then((res) => res.json()),
  });

  httpUserResource = httpResource<User>(() => `https://dummyjson.com/users/${this.userId()}`);
}
