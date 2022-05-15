import { TodoItem, TodoList, TodolistService } from './../todolist.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface TodoAll extends TodoList {
  nbRestantes: number;
  sontToutesCochees: boolean;
}

type FiltreFonction = (item: TodoItem) => boolean;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  readonly obsTodoAll: Observable<TodoAll>;
  readonly filtreTout: FiltreFonction = () => true;
  readonly filtreCochees: FiltreFonction = (item) => item.estCoche;
  readonly filtreNonCochees: FiltreFonction = (item) => !item.estCoche;
  filtreCourant: FiltreFonction = this.filtreTout;

  constructor(private TDLS: TodolistService) {
    this.obsTodoAll = this.TDLS.observable.pipe(
      map((tdl) => ({
        ...tdl,
        nbRestantes: tdl.items.reduce(
          (nb, item) => (item.estCoche ? nb : nb + 1),
          0
        ), // Calcule le nombre d'items pas encore faits
        sontToutesCochees: !tdl.items.find(this.filtreNonCochees), // Si trouve des items non cochés, mets a false, sinon true
      }))
    );
  }

  ngOnInit(): void {}

  ajouter(texte: string): void {
    this.TDLS.ajouter(texte);
  }

  majItem(item: TodoItem, maj: Partial<TodoItem>): void {
    this.TDLS.update(maj, item);
  }

  delete(item: TodoItem): void {
    this.TDLS.remove(item);
  }

  pisterParID(index: number, element: TodoItem): number {
    return element.id;
  }

  majItems(items: readonly TodoItem[], maj: Partial<TodoItem>): void {
    this.TDLS.update(maj, ...items);
  }

  supprimerItems(items: readonly TodoItem[]): void {
    this.TDLS.remove(...items);
  }
}
