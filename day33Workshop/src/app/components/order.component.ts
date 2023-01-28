import { Component, Input, SimpleChanges } from '@angular/core';
import { Order } from '../models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  @Input()
  order: Order | null = null

  @Input()
  name!: string

  total = 0

  ngOnChanges(changes: SimpleChanges): void {
    console.info('changes: ', changes['order'])
    const o = changes['order'].currentValue as Order

    this.total = 0;
    for (let li of o?.items)
      this.total += li.quantity * li.unitprice
  }
}
