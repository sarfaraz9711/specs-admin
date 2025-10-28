import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/core/admin/sales/layout/layout.service';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-return-order',
  templateUrl: './return-order.component.html',
  styleUrls: ['./return-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReturnOrderComponent implements OnInit {
  retuenOrderData: any[]=[];
  myArray: any;
  showAction: boolean = false;
  actualOrderList: any;
  maxPickerDate: any;
  startDateval: any;
  keywordInput: FormControl;
  public name: FormControl;
  public email: FormControl;
  public mobileNo: FormControl;
  public dateTo: FormControl;
  public newstartdate: FormControl;
  public paymentList: FormGroup;
  fromDate: any;
  toDate: any;
  status:any;
  endDate: string;
  startDate: string;
  public buttonActive = false;
  public filterEnable = true;
  keyword: string;
  buttonCheck = true
  queryData: any={};
  offset: number;
  index: number;
  public checkOrderData = [];


  constructor(private _service: LayoutService, private _router: Router, private _cd: ChangeDetectorRef,private excelService : ExcelService,
    public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,

  ) { }

  ngOnInit() {
    // this.getReturnOrderList()
    this.checkRequest(1);
    sessionStorage.removeItem("cancelReturnOrderId");
    sessionStorage.removeItem("cancelReturnOrderProductId");
    sessionStorage.removeItem("ACTION");
    sessionStorage.removeItem("isReplaceOrder")
    sessionStorage.removeItem("json")
    sessionStorage.removeItem("returnRequestData")
    sessionStorage.removeItem("replaceOrderPreId")
    sessionStorage.removeItem("returnRequestId")
    sessionStorage.removeItem("cancelReturnOrderPrefixId");
    sessionStorage.removeItem("returnOrderItemPrice");

    this.initForm();
    this.getCancelRequest();

  }
  initForm() {
    this.keywordInput = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.mobileNo = new FormControl('', [Validators.required]);
    this.dateTo = new FormControl('', [Validators.required]);
    this.newstartdate = new FormControl('', [Validators.required]);
    this.status = new FormControl('', [Validators.required]);


    this.paymentList = this.fb.group({
      keywordInput: this.keywordInput,
      name: this.name,
      email: this.email,
      mobileNo: this.mobileNo,
      fromDate:this.newstartdate,
      todate:this.dateTo,
      status:this.status

    });
  }

getProductDetails(orderData:any){
  console.log(orderData, "sssssssssss");
  sessionStorage.setItem("returnRequestData", JSON.stringify(orderData))
  if(orderData.returnType == "FULL_ORDER_RETURN"){
    sessionStorage.setItem("returnRequestId", orderData.id)
    sessionStorage.setItem("replaceOrderPreId", orderData.orderProductPrefixId)
    sessionStorage.setItem("ACTION", "FULL_ORDER_RETURN");
    sessionStorage.setItem("cancelReturnOrderPrefixId", orderData.orderPrefixId);
    sessionStorage.setItem("cancelReturnOrderId", orderData.orderId);
    sessionStorage.setItem("cancelReturnOrderProductId", orderData.orderProductId);
    sessionStorage.setItem("returnOrderItemPrice", orderData.totalAmount);
    this._router.navigate(['/sales/orders/vieworder', orderData.orderId], { queryParams: {index:0, offset:0} });
    sessionStorage.setItem("isReplaceOrder","NO")
    this._cd.detectChanges()
  }else{
  this._service.getVarientDetails(orderData.productId).subscribe((res:any)=>{
    sessionStorage.setItem("json", JSON.stringify(res))
    sessionStorage.setItem("returnRequestId", orderData.id)
    sessionStorage.setItem("replaceOrderPreId", orderData.orderProductPrefixId)
    sessionStorage.setItem("ACTION", orderData.returnType=='REPLACE_PRODUCT'?'REPLACE_PRODUCT':"RETURN_ORDER");
    sessionStorage.setItem("cancelReturnOrderPrefixId", orderData.orderPrefixId);
    sessionStorage.setItem("cancelReturnOrderId", orderData.orderId);
    sessionStorage.setItem("cancelReturnOrderProductId", orderData.orderProductId);
    sessionStorage.setItem("returnOrderItemPrice", orderData.totalAmount);
    this._router.navigate(['/sales/orders/vieworder', orderData.orderId], { queryParams: {index:0, offset:0} });
    sessionStorage.setItem("isReplaceOrder","YES")
    this._cd.detectChanges()
  },(err:any)=>{

  })
}
}

// getReturnOrderList(){
//   this._service.returnOrderList().subscribe((res:any)=>{
    
//     const actArray = res.data;
//     actArray.sort(function(a, b) {
//           return (a.id > b.id) ? -1 : ((a.id < b.id) ? 1 : 0);
//       });
//       this.myArray = actArray
//         this.retuenOrderData = this.myArray.filter(item=>item.returnStatus==1);
//         this.myArray = actArray
//         this.actualOrderList = actArray
//     this._cd.detectChanges()
//   },(err:any)=>{

//   })
// }
createOrder(orderdata:any){
  this.getProductDetails(orderdata)
  this._cd.detectChanges()
}

checkRequest(val:any){
  console.log(val);
  this.status = val
  const params ="?returnStatus="+val

  if(val == 1){
    this.showAction = true;
  }else{
    this.showAction = false;
  }
  // const status:any=val=='pending'?1:2
  // console.log(status);
  // console.log(this.myArray);
  
  // this.retuenOrderData = this.myArray.filter(item=>item.returnStatus==status)
  // console.log(this.retuenOrderData);

  // this._service.returnOrderList(params).subscribe((res:any)=>{
  //   var myArray = res.data;
  //    myArray.sort(function(a, b) {
  //      return (a.Id > b.Id) ? -1 : ((a.Id < b.Id) ? 1 : 0);
  //  });
  //    this.retuenOrderData = myArray
  //    this.actualOrderList = myArray
  //      console.log(this.retuenOrderData);
  //      this._cd.detectChanges()
  //  })
  
}

searchcancel(val:any, check:number){
  if(check==1){
  this.retuenOrderData = this.actualOrderList.filter((item:any)=>{
    return item.orderPrefixId==val
  })
}else{
  this.retuenOrderData=this.actualOrderList
}
}
checkOrder(event, list) {
  if(event.target.checked==true){
   this.checkOrderData.push(list);
  }else{
   const getIndex= this.checkOrderData.findIndex(item=>item.orderId==list.orderId)
   this.checkOrderData.splice(getIndex,1)
  }
 }
exportAsXLSX(){
  // const result = this.retuenOrderData.map(({orderPrefixId, returnType, returnReason,returnRemarkValue, createdDate}) => ({orderPrefixId, returnType, returnReason,returnRemarkValue, createdDate}));
 // const orderExportData=this.retuenOrderData;
  let orderExportData:any;
  if(this.checkOrderData.length>0){
   orderExportData=this.checkOrderData;
  }else{
     orderExportData=this.retuenOrderData;

  }

  // const result = this.orderList.map(({orderPrefixId, total, shippingFirstname,orderCancelReson,orderCancelRemark, createdDate}) => ({orderPrefixId, total, shippingFirstname,orderCancelReson,orderCancelRemark, createdDate}));
  let orderData:any[]=[]
  orderExportData.forEach((item:any, i)=>{
    const orderStatus:any = (this.retuenOrderData.filter(it=>it.orderStatusId==item.orderStatusId))[0]
    orderData.push({
     "Order Id": item.orderPrefixId,"Customer Name": item.shippingFirstname,"Email": item.email,"Mobile": item.mobile,"Return Type": item.returnType,"Reason":item.returnReason,"Remark": item.returnRemarkValue,"Date": item.createdDate
    })
  })

 this.excelService.exportAsExcelFile(orderData, 'Return_order_report')
}
viewOrders(orderId) {
  this._router.navigate(['/sales/orders/vieworder', orderId]);
}

changeFilter(event) {
  this.buttonCheck = event.target.checked;
  if (event.target.checked) {
    this.buttonActive = false;
    this.buttonCheck = event.target.checked;
    this.filterEnable = true;
  } else {
    this.buttonActive = true;
    this.buttonCheck = event.target.checked;
    this.filterEnable = false;
  }
}
getCancelRequest() {
  console.log("data",this.status,this.keywordInput.value, this.keywordInput)
  if(this.status.value == ""){
    this.status = 1
  }else{
    this.status
  }
  const params: any = {};
  params.returnStatus=this.status;
  params.orderId = this.keywordInput.value == '' || this.keywordInput.value == null?'':this.keywordInput.value;
  params.customerName = this.name.value == ''?'':this.name;
  params.email = this.email.value == ''?'':this.email;
  params.mobile = this.mobileNo.value == ''?'':this.mobileNo;
  params.fromDate = this.startDateval?this.startDateval:'';
  params.toDate = this.maxPickerDate?this.maxPickerDate:'';

  console.log("cancel", params)
  this._service.returnOrderList(params).subscribe((res:any)=>{
    var myArray = res.data;
   myArray.map((item:any)=>{
    console.log("item",item)
    const sku:any[] = item.returnOrderSku && item.returnOrderSku.split(',')
    const rvp:any[] = item.rpCode && item.rpCode.split(',')
    console.log("skuskusku",sku)
    console.log("skuskusku",rvp)
    const length:number=sku.length
    let skuRvp:any=''
    for(let i=0; i<length; i++){
      skuRvp+=`SKU: ${sku[i]}, RVP: ${rvp && rvp.length>0?rvp[i]:'NA'}<hr/>`
    }
    return Object.assign(item,{skuRvp})
   })

     this.retuenOrderData = myArray
     this.actualOrderList = myArray
       console.log(this.retuenOrderData);
       this._cd.detectChanges()
   })
   this.queryData.offset = this.offset || 0;
  this.queryData.index = this.index || 0;
  this.router.navigate(
    [],
    {
      relativeTo: this.route,
      queryParams: this.queryData,
      queryParamsHandling: 'merge', 
    });
}

getOrderList(val:any){
  this.status=val
}

onSubmit() {
  document.getElementById("focusOut").focus()
  const formData = this.paymentList.value;

  this.keyword = this.paymentList.value.keywordInput ? this.paymentList.value.keywordInput : '';  
  this.name = this.paymentList.value.name ? this.paymentList.value.name : '';
  this.email = this.paymentList.value.email ? this.paymentList.value.email : '';
  this.mobileNo = this.paymentList.value.mobileNo ? this.paymentList.value.mobileNo : '';
  this.fromDate = this.startDateval ? this.startDateval : '';
  this.toDate = this.maxPickerDate ? this.maxPickerDate : '';
  this.status = this.status ? this.status : '';
 
  if (this.keyword !== '' ||this.paymentList.value.name||this.paymentList.value.email|| this.paymentList.value.mobileNo||this.startDateval ||this.maxPickerDate || this.status) {
    this.getCancelRequest();
  }
  document.getElementById("focusOut").focus();
}

reset() {
  
  this.paymentList.reset();
  this.fromDate = '';
  this.keyword = '';
  this.toDate = '';
  this.status = 1;
  this.name = null;
  this.email = null;
  this.mobileNo = null;
  this.startDateval ='';
  this.maxPickerDate ='';
  this.getCancelRequest();
}
onToDateSelect(val:any) {
  this.maxPickerDate = val
}
onStartDateSelect(val:any) {
  this.startDateval = val
}


}
