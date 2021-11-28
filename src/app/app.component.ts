import { TodolistService, TodoList, TodoItem } from './todolist.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private TDLS : TodolistService) {
  }

  get obsTodolist() : Observable<TodoList> {
    return this.TDLS.observable;
  }

  ajouter(texte : string) : void {
    this.TDLS.ajouter(texte);
  }

  updateItem(item : TodoItem, maj : Partial<TodoItem>) : void {
    this.TDLS.update(maj, item);
  }

  delete(item : TodoItem) : void {
    this.TDLS.remove(item);
  }
}
