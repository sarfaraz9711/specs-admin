import { Component } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    Validators,
    FormGroup,
    FormControl,
    FormBuilder
  } from '@angular/forms';
import { StoresService } from "src/core/admin/stores/stores.service";
import { ActivatedRoute, Router } from '@angular/router';
import { regexJson } from "src/theme/default/admin/shared/regex";
@Component({
    selector: 'app-store-add',
    templateUrl: 'add.component.html'
  })
  
  export class AddStoreComponent {
    constructor(
        public fb: FormBuilder,
        private _storesService: StoresService,
        private _router: Router,
    
      ) {
      }
    public addStoreForm : FormGroup;
    public isEdit: boolean = false;
    public storeEditId: number;
    public shopName: string;
    public firstName: string;
    public contactNo: string;
    public active: string = "";

    public cityCode: string;
    public storeCity: string;
    public storeState: string;
    public pincode: number;
    public address: string;
    public emailId: string;
    public latitude: string;
    public longitude: string;

    public pinCodeData: any = {}
    public storeData: any = {active: ""}
    public statelistData: any;
    public storeCode: string
    public storeOpeningDate: string
    public googleLocation: string
    public mobileNo: string;


    ngOnInit(){
        this.addStoreForm = this.fb.group({
            shopName: new FormControl(this.shopName, [Validators.required]),
            firstName: new FormControl(this.firstName, [Validators.required]),
            contactNo: new FormControl(this.contactNo, [Validators.required]),
            emailId: new FormControl(this.emailId, [Validators.pattern(regexJson.emailRegex)]),
            active: new FormControl('', [Validators.required]),

            cityCode: new FormControl(this.cityCode),
            storeCity: new FormControl(this.storeCity),
            storeState: new FormControl(this.storeState),

            pincode: new FormControl(this.pincode, [Validators.required]),
            address: new FormControl(this.address, [Validators.required]),
            latitude: new FormControl(this.latitude),
            longitude: new FormControl(this.longitude),
            storeCode:new FormControl(this.storeCode),
            storeOpeningDate:new FormControl(this.storeOpeningDate),
            googleLocation:new FormControl(this.googleLocation),
            mobileNo:new FormControl(this.mobileNo, [Validators.required, Validators.pattern(regexJson.mobileRegex)])

        })

        this.getStateData();
            this.setEditId()


        
    }
    setEditId(){
        this._storesService.sendEditId.subscribe(res=>{
            if(res){
                this.isEdit = true;
                this.getStoreDetail(res);
                this.storeEditId = res;
            }
        })
    }

    getStoreDetail (storeId: any) {
        this._storesService.getStoreById(storeId).subscribe((response:any)=> {
            if(response.status == 200){
                this.storeData = response.data;
                this.pinCodeData = {stateName: response.data.storeState,
                    cityName: response.data.storeCity,
                    districtName: response.data.cityCode
                }
            }
        }, (err) => {
                console.log(err, "Error: error occured")
        })
    }
    saveFormData(formData: any) {
        //this._storesService.sendEditId.unsubscribe()
        formData.googleLocation = window.btoa(formData.googleLocation)
        const apiPayload = formData;
        if(this.isEdit){
            formData.id = this.storeEditId;
        }
        this._storesService.addStore(apiPayload).subscribe((res) => {
            this._storesService.sendEditId.next(null);
          this._router.navigate(['/manage-stores/stores/list'])
        });
      }
      updateFormData(formData: any) {
        //this._storesService.sendEditId.unsubscribe()
        formData.googleLocation = window.btoa(formData.googleLocation)
        const apiPayload = formData;
        if(this.isEdit){
            formData.id = this.storeEditId;
        }
        this._storesService.updateStore(apiPayload).subscribe((res) => {
            this._storesService.sendEditId.next(null);
          this._router.navigate(['/manage-stores/stores/list'])
        });
      }
        
    onSubmits(){
       // addStore
       let submittedFormData = this.addStoreForm.value;
    //    submittedFormData.storeState = this.addStoreForm.value.storeState[0];
       console.log(submittedFormData, "Nero sssssss")
        if (this.isEdit) {
            this.updateFormData(submittedFormData)
          } else {
            this.saveFormData(submittedFormData)
      
          }
    }
    onCancel(){
        this._router.navigate(['/manage-stores/stores/list'])
    }

    getPinCodeData (pinCode: number){
        console.log(pinCode, "Nero")
        this._storesService.searchLocationWithPinCode(pinCode).subscribe((response:any)=> {
            
            if(response.status == 1 && response.data){
                console.log(response, "nero resssss")
                this.pinCodeData = response.data;
            }
        }, (err) => {
                console.log(err, "Error: error occured")
        })
    
    }
   
    getStateData (){
        this._storesService.stateList().subscribe((response:any)=> {
            
            if(response.status == 1 && response.data){
                console.log(response, "nero resssss")
                this.statelistData = response.data;

                console.log("print state", this.statelistData)
            }
        }, (err) => {
                console.log(err, "Error: error occured")
        })
    
    }

    encodeBase64(value: string): string {
        return btoa(value);
      }


  }