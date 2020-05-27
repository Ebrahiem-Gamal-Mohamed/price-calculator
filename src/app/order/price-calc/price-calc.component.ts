import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from './../../shopping/item.model';

@Component({
  selector: 'app-price-calc',
  templateUrl: './price-calc.component.html',
  styleUrls: ['./price-calc.component.sass']
})
export class PriceCalcComponent implements OnInit {
  orderForm: FormGroup;
  items: Item[] = [];
  totalPrice: number = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      url: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  addItem() {
    if (!this.orderForm.valid) {
      return;
    }
    const itemData: Item = {
      name: this.orderForm.get('url').value,
      price: this.orderForm.get('price').value,
      weight: this.orderForm.get('weight').value,
      category: this.orderForm.get('category').value,
      color: this.orderForm.get('color').value,
    };
    this.items.push(itemData);
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

}
