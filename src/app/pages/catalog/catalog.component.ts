import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { ModalModule, PaginationModel, ModalService } from 'carbon-components-angular';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  currentTab: any;
  breakfastStyle: any[] = []
  itemList: any[] = [];
  public breakfastform: FormGroup;
  public lunchform: FormGroup;
  lunchtypes: any[] = [];
  lunchitemList: any[] = [];
  dinneritemList: any[] = [];
  breakfasttype: string = '';
  breakfastitem: string = '';
  bfcustomisation: string = '';
  lunchtype: string = '';
  lunchitem: string = '';
  lunchCustomisation: string;
  lunchQuantity: number = 1;
  bfQuantity: number = 1;
  toppings: any[] = [];
  availableToppings: any[];
  toppingsOpted: any[] = [];
  bfFormInvalid: boolean;
  lunchFormInvalid: boolean;
  dinnerFormInvalid: boolean;
  formValid: boolean;
  dinneritem: string = '';
  @Input() model = new PaginationModel();
  @Input() open = new ModalModule();
  @Input() skeleton = false;
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;

  @Input() get totalDataLength() {
    return this.model.totalDataLength;
  }
  totalOrders: any[] = []
  set totalDataLength(value) {
    this.model.totalDataLength = value;
  }
  constructor(private formBuilder: FormBuilder, private modalService: ModalService) {

  }

  ngOnInit() {
    this.bfFormInvalid = false
    this.lunchFormInvalid = false
    this.dinnerFormInvalid = false
    this.currentTab = 'Breakfast'
    this.availableToppings = [{ label: "Chicken", code: 'chk', checked: false },
    { label: "Panner", code: 'pan', checked: false },
    { label: "Mushrrom", code: 'mus', checked: false },
    { label: "Potato", code: 'pot', checked: false },
    { label: "Black olives", code: 'blo', checked: false },
    { label: "Sausage", code: 'sau', checked: false }
    ]
    this.breakfastStyle = [{ value: 'North Indian', label: 'North Indian', recipes: [{ value: 'Thali', label: 'Thali' }, { value: 'Poha', label: 'Poha' }] }, { value: 'South Indian', label: 'South Indian', recipes: [{ value: 'Idly', label: 'Idly', price: 100 }, { value: 'Dosa', label: 'Dosa', price: 200 }] }]
    this.lunchtypes = [{ value: 'Vegeterian', label: 'Vegeterian', recipes: [{ value: 'Veg Thali', label: 'Veg Thali' }, { value: 'Pulihora', label: 'Pulihora' }] }, { value: 'Non-Vegeterian', label: 'Non-Vegeterian', recipes: [{ value: 'Dum Biryani', label: 'Dum Biryani', price: 100 }, { value: 'Prawns', label: 'Prawns', price: 200 }] }]
    this.dinneritemList = [{ value: 'Pizza', label: 'Pizza' }]
    this.toppingsOpted = [];
    this.onChangeBreakfastStyle({ value: this.breakfastStyle[0].value })
    this.onChangelunchType({ value: this.lunchtypes[0].value })
    this.dinneritem = this.dinneritemList[0].value;
  }

  selected(value) {
    if (value && value.name) {
      this.currentTab = value.name;
    }
  }
  onChangeBreakfastStyle(value) {
    for (var i = 0; i < this.breakfastStyle.length; i++) {
      if (this.breakfastStyle[i].value == value.value) {
        this.breakfasttype = value.value;
        this.itemList = this.breakfastStyle[i].recipes
      }
    }
  }

  onChangelunchType(value) {
    for (var i = 0; i < this.lunchtypes.length; i++) {
      if (this.lunchtypes[i].value == value.value) {
        this.lunchtype = value.value;
        this.lunchitemList = this.lunchtypes[i].recipes
      }
    }
  }

  checkBoxselected(input, option) {
    if (input.checked == true) {
      for (var i = 0; i < this.availableToppings.length; i++) {
        if (option == this.availableToppings[i].code) {
          var duplicateFound = false;
          for (var j = 0; j < this.toppingsOpted.length; j++) {
            if (this.toppingsOpted[j] && this.toppingsOpted[j].topping_code && this.availableToppings[i].code == this.toppingsOpted[j].topping_code) {
              duplicateFound = true;
            }
          }
          if (!duplicateFound) {
            this.toppingsOpted.push({ topping: this.availableToppings[i].label, topping_code: this.availableToppings[i].code, weight: 0, extraCheese: 'no' })
          }

        }
      }
    } else {
      for (var j = 0; j < this.toppingsOpted.length; j++) {
        if (option == this.toppingsOpted[j].topping_code) {
          this.toppingsOpted.splice(j, 1)
        }
      }
    }
    // Set for pagination
    this.model.currentPage = 1;
    this.model.pageLength = 10;
    this.model.totalDataLength = this.toppingsOpted.length;
    this.selectPage(1);
  }

  ontoppingOpted(value, topping_code) {
    for (var j = 0; j < this.toppingsOpted.length; j++) {
      if (this.toppingsOpted[j] && this.toppingsOpted[j].topping_code == value) {
        this.toppingsOpted[j].extraCheese = 'yes'
      }
    }
  }


  saveData() {
    var userInput = {
      breakFast: {},
      lunch: {},
      dinner: {}
    }
    userInput.breakFast = {
      type: this.breakfasttype,
      item: this.breakfastitem,
      customisation: this.bfcustomisation,
      quantity: this.bfQuantity
    }
    userInput.lunch = {
      type: this.lunchtype,
      item: this.lunchitem,
      customisation: this.lunchCustomisation,
      quantity: this.lunchQuantity
    }
    userInput.dinner = {
      item: this.dinneritem,
      toppings: this.toppingsOpted,
    }


    if (this.breakfasttype && this.breakfastitem && this.bfQuantity) {
      this.bfFormInvalid = false
    } else {
      this.bfFormInvalid = true
    }
    if (this.lunchtype && this.lunchitem && this.lunchQuantity) {
      this.lunchFormInvalid = false
    } else {
      this.lunchFormInvalid = true
    }
    this.dinnerFormInvalid = false
    if (this.toppingsOpted.length > 0) {
      for (var i = 0; i < this.toppingsOpted.length; i++) {
        if (this.toppingsOpted[i].weight == '0') {
          this.dinnerFormInvalid = true
        }
      }
    } else {
      this.dinnerFormInvalid = true
    }

    if (this.dinnerFormInvalid || this.lunchFormInvalid || this.bfFormInvalid) {
      console.log("Please fill mandatory data.")
    } else {
      console.log("User Input --- Can make API to server to store in MONGODB using db.collection.insert(userInput)", userInput)

      if (sessionStorage.getItem('totalOrders')) {
        var totalOrders = JSON.parse(sessionStorage.getItem('totalOrders'))
        totalOrders.push(userInput)
      }
      sessionStorage.setItem('totalOrders', JSON.stringify(totalOrders))
      this.clearForm()
    }
  }
  clearForm() {
    this.lunchtype = '';
    this.lunchitemList = [];
    this.breakfasttype = '';
    this.breakfastitem = '';
    this.bfcustomisation = '';
    this.lunchtype = '';
    this.lunchitem = '';
    this.lunchCustomisation = '';
    this.lunchQuantity = 1;
    this.bfQuantity = 1;
    this.toppingsOpted = [];
    this.ngOnInit()
    console.log('Form Cleared ');

  }

  selectPage(page) {
    this.model.currentPage = page;
  }

}
