import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TodoItem } from '../todolist.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input()  item!  : TodoItem;
  @Output() update = new EventEmitter<Partial<TodoItem>>();
  @Output() remove = new EventEmitter<TodoItem>();
  @ViewChild('nouveauInputTexte') nouveauInputTexte! : ElementRef<HTMLInputElement>;
  private _estEdite = false;

  constructor() { }

  ngOnInit(): void {
  }

  get estEdite() : boolean {
    return this._estEdite;
  }

  // Donne le focus si on entre en mode édition
  set estEdite(estEdite : boolean) {
    this._estEdite = estEdite;
    if (estEdite) {
      requestAnimationFrame(
        () => this.nouveauInputTexte.nativeElement.focus()
      );
    }
  }

  majLabel(label : string) : void {
    this.update.emit({label}); // {label} équivaut à {label : label}
    this._estEdite = false;
  }
}
