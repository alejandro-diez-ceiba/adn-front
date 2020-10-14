import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CrudService } from '@app/core';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Kardex } from './../../models/kardex.model';
import { Module } from './../../models/module.model';
import { Provider } from './../../models/provider.model';
import { Customer } from './../../models/customer.model';
import { Game } from './../../models/game.model';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {

  @Input() id: number;
  @Input() module: Module;
  @Output() createOrUpdate = new EventEmitter<Kardex>();

  form: FormGroup;
  provider: Provider[];
  customer: Customer[];
  game: Game[];
  ready = false;

  constructor(
    private readonly crud: CrudService
  ) { }

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    forkJoin([
      this.loadProvider(),
      this.loadCustomer(),
      this.loadGame(),
      this.loadById()
    ]).pipe(
      tap(([provider, customer, game, kardex]: [Provider[], Customer[], Game[], Kardex]) => {
        this.provider = provider;
        this.customer = customer;
        this.game = game;
        this.createForm(kardex);
        this.ready = true;
      })
    ).subscribe();
  }

  private loadById(): Observable<Kardex> {
    return (!this.id)
      ? of(undefined)
      : this.crud.findById<Kardex>(this.module.type, this.id);
  }

  private loadProvider(): Observable<Provider[]> {
    return this.crud.findAll('provider');
  }

  private loadCustomer(): Observable<Customer[]> {
    return this.crud.findAll('customer');
  }

  private loadGame(): Observable<Game[]> {
    return this.crud.findAll('game');
  }

  private createForm(kardex?: Kardex): void {
    this.form = new FormGroup({
      transaction: new FormControl(null, []),
      entryOrExit: new FormControl(null, []),
      quantity: new FormControl(null, []),
      price: new FormControl(null, []),
      provider: new FormControl(null, []),
      customer: new FormControl(null, []),
      game: new FormControl(null, [])
    });
  }

  save(): void {
    this.createOrUpdate.emit(this.form.getRawValue());
  }

}
