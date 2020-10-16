import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '@app/core';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Kardex } from './../../models/kardex.model';
import { Module } from './../../models/module.model';
import { Provider } from './../../models/provider.model';
import { Customer } from './../../models/customer.model';
import { Game } from './../../models/game.model';
import { decimalNumber, onlyNumber } from './../../constants/pattern.constants';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit, OnDestroy {

  @Input() id: number;
  @Input() module: Module;
  @Output() createOrUpdate = new EventEmitter<Kardex>();
  @Output() errorLoad = new EventEmitter<void>();

  private unsubscribe: Subscription;

  form: FormGroup;
  provider: Provider[] = [];
  customer: Customer[] = [];
  game: Game[] = [];
  isEntry: boolean;
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
    ).subscribe(() => { }, () => this.errorLoad.emit());
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
    const dateTransaction = (kardex?.transaction)
      ? new Date(kardex.transaction) : null;
    const entryOrExit = (kardex?.entryOrExit)
      ? kardex.entryOrExit : true;

    this.form = new FormGroup({
      transaction: new FormControl(dateTransaction, [Validators.required]),
      entryOrExit: new FormControl(entryOrExit, [Validators.required]),
      quantity: new FormControl(kardex?.quantity, [Validators.required, Validators.pattern(onlyNumber)]),
      price: new FormControl(kardex?.price, [Validators.required, Validators.pattern(decimalNumber)]),
      provider: new FormControl(kardex?.provider?.id, []),
      customer: new FormControl(kardex?.customer?.id, []),
      game: new FormControl(kardex?.game?.id, [Validators.required])
    });

    this.unsubscribe = this.form.get('entryOrExit')
      .valueChanges
      .subscribe((isEntry: boolean) => this.validateInput(isEntry));

    this.validateInput(entryOrExit);
  }

  private validateInput(isEntry: boolean): void {
    const provider = this.form.get('provider');
    const customer = this.form.get('customer');
    this.isEntry = isEntry;

    if (isEntry) {
      provider.setValidators([Validators.required]);
      customer.setValidators([]);
    } else {
      customer.setValidators([Validators.required]);
      provider.setValidators([]);
    }

    provider.updateValueAndValidity();
    customer.updateValueAndValidity();
  }

  save(): void {
    (this.form.valid)
      ? this.createOrUpdate.emit({
        ...this.form.getRawValue(),
        id: (this.id === undefined) ? null : this.id,
        transaction: (this.form.get('transaction').value as Date).getTime()
      })
      : this.form.markAllAsTouched();
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe.unsubscribe();
    }
  }

}
