/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  Input
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
// observable
import { Subscription } from 'rxjs';
// reactive forms
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
// sandbox
import { VariantsSandbox } from '../../../../../../../../core/admin/settings/siteSettings/variants/variants.sandbox';
import { VariantsService } from '../../../../../../../../core/admin/settings/siteSettings/variants/variants.service';
import { Router, ActivatedRoute } from '@angular/router';
// environment

@Component({
  selector: 'app-addproduct-option-variant',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss'],
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ]
})
export class VariantsAddComponent implements OnInit, OnDestroy {
  @Input() edit: any;
  @Input() id: any;
  public variantsForm: FormGroup;
  public optionName: FormControl;
  public type: FormControl;
  public sortOrder: FormControl;
  public optionNameImage: FormControl;
  public sortOrderImage: FormControl;
  public optionValue: FormArray;
  public productOptionsEditedValue: any;
  public variantValue: FormControl;
  public valueSortOrder: FormControl;
  public submittedValues = false;
  public optionsArray: any = ['Select', 'Radio'];
  public closeResult: string;
  private subscriptions: Array<Subscription> = [];
  public variantId: any;
  public categoryList: any;
  public parentInt: number;
  public category: FormControl;
  public varientDisplayName: FormControl
  variantInfo: any = {};
  variantValueArray: any = [];
  data: any = {};
  totalArray: any = [];
  buttonName: any = 'Add';
  selectedIndex: any;
  // category: FormControl;
  constructor(
    private modalService: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sandbox: VariantsSandbox,
    private changeDetectRef: ChangeDetectorRef,
    public service: VariantsService,
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrManager,
  ) { }




  // initially initialaize reactive form.And calls edit the form if data is available
  ngOnInit() {
this.getAllCategoryList()
    this.initVariantsForm();
    this.route.params.subscribe(data => {
      if (data) {
        this.variantId = data.id;
      }
    });
    this.changeDetectRef.detectChanges();

    const params: any = {};
    params.id = this.variantId;
    if (this.edit === 'edit') {
      this.setVariantForm(this.id);
    }

  }

  // getting value from reactive form
  initVariantsForm() {
    this.optionName = new FormControl('', [Validators.required]);
    this.type = new FormControl(null);
    this.sortOrder = new FormControl('', [Validators.required]);
    this.variantValue = new FormControl('');
    this.valueSortOrder = new FormControl('');
    this.category = new FormControl('')
    this.varientDisplayName = new FormControl('', [Validators.required])
    this.variantsForm = this.formBuilder.group({
      optionName: this.optionName,
      type: this.type,
      sortOrder: this.sortOrder,
      variantValue: this.variantValue,
      valueSortOrder: this.valueSortOrder,
      category: this.category,
      varientDisplayName: this.varientDisplayName
      // optionValue: this.formBuilder.array([this.optionsGroup()])
    });
  }

  // from group for form array
  optionsGroup() {
    return this.formBuilder.group({
      optionValueId: [''],
      optionNameImage: ['', Validators.required],
      sortOrderImage: [''],
    });
  }

  get optionArray() {
    return <FormArray>(this.variantsForm.get('optionValue'));
  }

  /**
   * calls sandbox doVariantsAdd,with parameters
   * @param name from reactive form
   * @param type from reactive form
   * @param sortOrder from reactive form
   * @param name from reactive form
   * @param image from reactive form
   * @param sortOrder from reactive form
   * @param category from reactive form
   * @param varientDisplayName from reactive form
   * */
  addVariants(productOptions) {
    this.submittedValues = true;

    if (this.variantsForm.invalid || !(this.variantValueArray.length)) {
      this.validateAllFormFields(this.variantsForm);
      return;
    }

    const params: any = {};
    let formarray: any = [];
    params.name = productOptions.optionName;
    params.type = productOptions.type;
    params.category = productOptions.category
    params.varientDisplayName = productOptions.varientDisplayName
    params.sortOrder = Number(productOptions.sortOrder);

    if (this.edit === 'edit') {

      params.varientsValue = this.variantValueArray;
      params.variantId = this.id.id;
      this.sandbox.doVariantsUpdate(params);
      this.modalService.close('close');
    } else {
      params.varientsValue = this.variantValueArray;
      this.sandbox.doVariantsAdd(params);
      this.modalService.close('close');
    }
console.log(params)
  }

  // validation for the formGroup
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // editing the reactive form Option Value
  setVariantForm(details) {
    if (this.edit === 'edit') {

      details = this.id;

      if (
        details.varientsValue.length > 0 &&
        details.varientsValue[0].id
      ) {
        this.variantValueArray = JSON.parse(JSON.stringify(details.varientsValue));


      }
      this.changeDetectRef.detectChanges();


      this.optionName.setValue(details.name);
      this.type.setValue(details.type);
      this.sortOrder.setValue(details.sortOrder);
      this.category.setValue(details.category);
      this.varientDisplayName.setValue(details.varientDisplayName);
      


    }


  }


  // add options in form array
  addOptions() {
    this.changeDetectRef.detectChanges();
    const control = <FormArray>this.variantsForm.controls['optionValue'];
    if (control.length < 5) {
      control.push(this.optionsGroup());
    }
  }

  // delete options  in form array
  deleteOptions(index) {
    const control = <FormArray>this.variantsForm.controls.optionValue;
    control.removeAt(index);
  }

  addVariantValues() {
    if (this.variantsForm.value.variantValue && this.variantsForm.value.valueSortOrder) {
      if (this.buttonName === 'Add') {
        this.data = {
          valueName: this.variantsForm.value.variantValue,
          sortOrder: this.variantsForm.value.valueSortOrder,
        };
        this.variantValueArray.push(this.data);

      } else {
        this.data = {
          valueName: this.variantsForm.value.variantValue,
          sortOrder: this.variantsForm.value.valueSortOrder,
        };
        if (this.selectedIndex !== undefined) {
          this.buttonName = 'Add';
          this.variantValueArray[this.selectedIndex].valueName = this.variantsForm.value.variantValue;
          this.variantValueArray[this.selectedIndex].sortOrder = this.variantsForm.value.valueSortOrder;
        }

      }
      this.variantsForm.controls['variantValue'].reset();
      this.variantsForm.controls['valueSortOrder'].reset();

    }

  }
  editVariantValue(index) {
    this.variantValueArray.forEach((data,i)=>{
      if((data && data.availedVarientValue === 1) && i == index){
        this.toastr.errorToastr("You cannot edit this varient, as products are mapped to it");
        this.variantsForm.controls['variantValue'].setValue('');
        this.variantsForm.controls['valueSortOrder'].setValue('');
        this.buttonName = 'Add';
      }
      else if((data && data.availedVarientValue === 0) && i == index){
        this.variantsForm.controls['variantValue'].setValue(this.variantValueArray[index].valueName);
        this.variantsForm.controls['valueSortOrder'].setValue(this.variantValueArray[index].sortOrder);
        this.buttonName = 'Update';
        this.buttonName = 'Update';
        this.selectedIndex = index;
      }
    })
  }

  // cancel add product options
  cancel() {
    this.variantInfo = null;
    this.variantInfo = ' ';
    this.modalService.close('close');
  }
  deleteVariant(index) {
    this.variantValueArray.forEach((data,i)=>{
      if((data && data.availedVarientValue === 1) && i == index){
        this.toastr.errorToastr("You cannot delete this varient, as products are mapped to it");
      }
      else if((data && data.availedVarientValue === 0) && i == index){
        this.variantValueArray.splice(index, 1);
      }
    })
    
  }

  getAllCategoryList(){
  
    let categoryListJson = {
      limit:"",
      offset:"",
      keyword:"",
      sortOrder:"",
      status:1
    }
    this.service.categoryData(categoryListJson).subscribe((res:any)=>{
      this.categoryList = res.data
      


      if(this.categoryList){
        // for(let i= 0; i< this.categoryList.length; i++){
        //   if(this.categoryList[i] && this.categoryList[i].parentInt == 0){
        //     console.log("gasxhavxh")
        //     this.totalArray.push(this.categoryList[i])
        //   }
        // }

        this.categoryList.forEach(element => {
          if(element.parentInt==0){
            this.totalArray.push(element)
          }
        });

        console.log(this.totalArray)
      }
      console.log(this.totalArray, "shagdkahgs")
      // if(this.categoryList){
      //   this.parentInt = 0;
      //   console.log(this.parentInt, "adjabdxhsa")
      // }
    },(err:any)=>{

    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());

  }
}
