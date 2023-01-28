import { Component, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Item, Order } from '../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  @Output()
  onNewCart = new Subject<Order>()

  cartForm!: FormGroup
  items!: FormArray

  constructor(private fb: FormBuilder) {}

  ngOnInit():void {
    this.cartForm = this.createForm()
  }

  processForm() {
    const order: Order = this.cartForm.value as Order
    console.info(">>>> order: ", order)
    this.onNewCart.next(order)
    this.cartForm = this.createForm()
  }

  clearForm() {
    this.cartForm = this.createForm()
  }

  addItem() {
    this.items.push(this.createItem())
  }

  removeItem(i: number) {
    this.items.removeAt(i)
  }

  private createItem(): FormGroup {
		return this.fb.group({
			itemname: this.fb.control<string>(''),
			quantity: this.fb.control<number>(1),
			unitprice: this.fb.control<number>(1),
		})
	}

  private createForm(): FormGroup {
		this.items = this.fb.array([])
		return this.fb.group({
			name: this.fb.control<string>(''),
			address: this.fb.control<string>(''),
			email: this.fb.control<string>(''),
			phone: this.fb.control<string>(''),
			express: this.fb.control<boolean>(false),
			delivery: this.fb.control<string>(''),
			items: this.items
		})
	}
}
