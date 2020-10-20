import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService, PlatformService, LanguageService } from '@app/core';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Game } from './../../models/game.model';
import { Module } from './../../models/module.model';
import { Platform } from './../../models/platform.model';
import { Language } from './../../models/language.model';
import { decimalNumber } from './../../constants/pattern.constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() id: number;
  @Input() module: Module;
  @Output() createOrUpdate = new EventEmitter<Game>();
  @Output() errorLoad = new EventEmitter<void>();

  form: FormGroup;
  platform: Platform[] = [];
  language: Language[] = [];
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
        this.platform = platform || [];
        this.language = language || [];
        this.createForm(game);
        this.ready = true;
      })
    ).subscribe(() => { }, () => this.errorLoad.emit());
  }

  private loadById(): Observable<Game> {
    return (!this.id)
      ? of(undefined)
      : this.crud.findById<Game>(this.module.type, this.id);
  }

  private createForm(game?: Game): void {
    const dateLaunch = (game?.launch)
      ? new Date(game.launch) : null;

    this.form = new FormGroup({
      name: new FormControl(game?.name, [Validators.required, Validators.minLength(2)]),
      launch: new FormControl(dateLaunch, [Validators.required]),
      price: new FormControl(game?.price, [Validators.required, Validators.pattern(decimalNumber)]),
      platform: new FormControl(game?.platform?.id, [Validators.required]),
      language: new FormControl(game?.language?.id, [Validators.required])
    });
  }

  save(): void {
    (this.form.valid)
      ? this.createOrUpdate.emit({
        ...this.form.getRawValue(),
        id: (this.id === undefined) ? null : this.id,
        launch: (this.form.get('launch').value as Date).getTime()
      })
      : this.form.markAllAsTouched();
  }

}
