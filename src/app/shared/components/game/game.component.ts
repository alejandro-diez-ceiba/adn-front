import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CrudService, PlatformService, LanguageService } from '@app/core';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Game } from './../../models/game.model';
import { Module } from './../../models/module.model';
import { Platform } from './../../models/platform.model';
import { Language } from './../../models/language.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() id: number;
  @Input() module: Module;
  @Output() createOrUpdate = new EventEmitter<Game>();

  form: FormGroup;
  platform: Platform[];
  language: Language[];
  ready = false;

  constructor(
    private readonly crud: CrudService,
    private readonly platformSv: PlatformService,
    private readonly languageSv: LanguageService
  ) { }

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    forkJoin([
      this.platformSv.getAll(),
      this.languageSv.getAll(),
      this.loadById()
    ]).pipe(
      tap(([platform, language, game]: [Platform[], Language[], Game]) => {
        this.platform = platform;
        this.language = language;
        this.createForm(game);
        this.ready = true;
      })
    ).subscribe();
  }

  private loadById(): Observable<Game> {
    return (!this.id)
      ? of(undefined)
      : this.crud.findById<Game>(this.module.type, this.id);
  }

  private createForm(game?: Game): void {
    this.form = new FormGroup({
      name: new FormControl(game?.name, []),
      launch: new FormControl(null, []),
      price: new FormControl(game?.price, []),
      platform: new FormControl(game?.platform?.id, []),
      language: new FormControl(game?.language?.id, [])
    });
  }

  save(): void {
    this.createOrUpdate.emit(this.form.getRawValue());
  }

}
