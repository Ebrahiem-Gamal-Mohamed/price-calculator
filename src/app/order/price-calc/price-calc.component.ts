import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Item } from "./../../shopping/item.model";
import * as AppEnums from "./../../shared/appEnums.enum";
import { BrowserStorageService } from "./../../shared/_services/browser-storage.service";
import { AuthService } from "src/app/auth/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";

interface ItemCategory {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  code?: string;
}

@Component({
  selector: "app-price-calc",
  templateUrl: "./price-calc.component.html",
  styleUrls: ["./price-calc.component.sass"],
})
export class PriceCalcComponent implements OnInit {
  orderForm: FormGroup;
  couponCode: FormControl = new FormControl('');
  isHaveCoupon: boolean = false;
  items: Item[] = [];
  categories: ItemCategory[] = [];
  totalPrice: number = 0;
  totalVAT: number = 0;
  itemsTotalCost: number = 0;
  customsCost: number = 0;
  companyFees: number = 0;
  internationalShippingFees: number = 0;
  discount: number = 0;
  isArabic: boolean = false;

  constructor(
    private fb: FormBuilder,
    private browserStorageService: BrowserStorageService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    const calture = this.browserStorageService.getLocal("calture");
    calture === AppEnums.Languages.AR
      ? (this.isArabic = true)
      : (this.isArabic = false);
    this.orderForm = this.fb.group({
      url: ["", [Validators.required, Validators.pattern("https://.*")]],
      price: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:.[0-9]{2})?|(?:.[0-9]{3})*(?:,[0-9]{2})?)$"
          ),
        ],
      ],
      category: [1, Validators.required],
      color: ["", Validators.required],
      weight: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:.[0-9]{2})?|(?:.[0-9]{3})*(?:,[0-9]{2})?)$"
          ),
        ],
      ],
    });

    this.categories = [
      {
        id: 1,
        nameEn: "Electronics",
        nameAr: "إلكترونيات",
        code: "EC",
      },
      {
        id: 2,
        nameEn: "Beauty",
        nameAr: "مساحيق",
        code: "BE",
      },
      {
        id: 3,
        nameEn: "Apparel, Shoes & Accessories",
        nameAr: "إكسسورات و أحذية",
        code: "ASA",
      },
      {
        id: 4,
        nameEn: "Health & Personal Care",
        nameAr: "الصحة والعتناء بالذات",
        code: "HPC",
      },
      {
        id: 5,
        nameEn: "Tools & Home Improvements",
        nameAr: "أدوارت تحسين المنزل",
        code: "THI",
      },
      {
        id: 6,
        nameEn: "Home Appliances",
        nameAr: "أثاث منزلي",
        code: "HA",
      },
      {
        id: 7,
        nameEn: "Kitchen Appliances",
        nameAr: "أثاث المطبخ",
        code: "KA",
      },
      {
        id: 8,
        nameEn: "Pet Food & Supplies",
        nameAr: "طعام حيوانات",
        code: "PFS",
      },
      {
        id: 9,
        nameEn: "Toys",
        nameAr: "لعب أطفال",
        code: "T",
      },
      {
        id: 10,
        nameEn: "Baby",
        nameAr: "مستلزمات الطفل",
        code: "B",
      },
    ];
  }

  addItem() {
    if (!this.orderForm.valid) {
      return;
    }
    const itemData: Item = {
      name: this.orderForm.get("url").value,
      price: this.orderForm.get("price").value,
      weight: this.orderForm.get("weight").value,
      category: this.orderForm.get("category").value,
      color: this.orderForm.get("color").value,
    };
    this.items.push(itemData);
    this.orderForm.reset();
    this.calcPrice();
  }

  calcPrice() {
    this.totalVAT = 0;
    this.itemsTotalCost = this.getItemsTotalCost();
    this.customsCost = 0;
    this.companyFees = (8 / 100) * this.itemsTotalCost;
    this.internationalShippingFees = this.getInternationalFees();
    this.totalPrice =
      this.totalVAT +
      this.itemsTotalCost +
      this.customsCost +
      this.companyFees +
      this.internationalShippingFees -
      this.discount;
  }

  getItemsTotalCost(): number {
    return this.items.reduce((p , c) => Math.round(p['price']) + Math.round(c['price']), 0);
  }

  getInternationalFees(): number {
    let fees: number;
    const itemsWeight = this.items.reduce((p, c) => Math.round(p['weight']) + Math.round(c['weight']), 0);
    if (itemsWeight < 1) {
      fees = 0;
    } else if (itemsWeight >= 1 && itemsWeight <= 5) {
      fees = 10 * itemsWeight;
    } else {
      fees = 25 * itemsWeight
    }
    return fees;
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  addItemsToCart() {
    if (this.authService.isAuthenticated) {
      if (this.items.length) {
        this.browserStorageService.setLocal("cart", this.items);
      }
    } else {
      this.translate.get("NotAuthenticated").subscribe((text) => {
        this._snackBar.open(text, null, {
          duration: 2000,
        });
      });
    }
  }

  toggleCouponCode() {
    this.isHaveCoupon = !this.isHaveCoupon;
  }

  applyCode() {
    const code = this.couponCode.value as string;
    if (code.startsWith('SHP')) {
      this.discount = (10 / 100) * this.internationalShippingFees;
    } else if (code.startsWith('CS')) {
      this.discount = (20 / 200) * this.customsCost;
    } else {
      this.discount = 0;
    }
    this.calcPrice();
  }
}
