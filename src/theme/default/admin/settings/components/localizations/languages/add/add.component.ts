/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { LanguagesService } from '../../../../../../../../core/admin/settings/localizations/languages/languages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings-language-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class LanguageAddComponent implements OnInit {
  private pagenationcount = true;
  public updateTitle: number;
  public ImageUrl: any = '';
  @ViewChild('filePath') filePath: ElementRef;
  public language: FormGroup;
  public submitted = false;
  public name: FormControl;
  public code: FormControl;
  public sortorder: FormControl;
  public status: FormControl;
  public postImageUrl: any;
  public imageUrl: string;
  public languageInfo: any = [];
  private editLanguageId: any;
  public pageSize: any = 5;
  private keyword = '';
  private offset: number;
  image: any;
  public redirectUrl: FormControl;

  constructor(
    public modalService: NgbActiveModal,
    public fb: FormBuilder,
    private changeDetectRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    public Sandbox: LanguagesSandbox,
    private router: Router,
    public service: LanguagesService,
    private configService: ConfigService
  ) { }

  get f() {
    return this.language.controls;
  }

  /**
   * Handles form 'ngOnInit' event. Calls initForm, languageList.
   *
   * get image url from configService.
   */
  ngOnInit() {
    this.imageUrl = this.configService.getImageUrl();
    this.postImageUrl = './assets/upload-banner/upload.png';
    this.initForm();
    this.editLanguageId = this.route.snapshot.paramMap.get('id');
    this.languageList();
  }

  initForm() {
    this.name = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(32)
    ]));
    this.code = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(5)
    ]));
    this.sortorder = new FormControl(null, [Validators.required]);
    this.status = new FormControl(null, [Validators.required]);
    this.redirectUrl = new FormControl('', Validators.compose([
      Validators.required
    ]));
    this.language = this.fb.group({
      name: this.name,
      code: this.code,
      sortorder: this.sortorder,
      status: this.status,
      redirectUrl: this.redirectUrl
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox Laguage UpdateLanguage and AddLanguage function if form is valid.
   *
   * @param language entire form value
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    // if (this.language.invalid || this.postImageUrl === './assets/upload-banner/upload.png') {
    //   this.validateAllFormFields(this.language);

    //   return;
    // }
    const params: any = {};
    params.code = this.language.value.code;
    params.name = this.language.value.name;
    params.status = this.language.value.status.toString();
    params.sortorder = Number(this.language.value.sortorder);
    params.image = this.ImageUrl;
    params.redirectUrl = this.language.value.redirectUrl;
    if (this.languageInfo && this.languageInfo[0]) {
      params.languageId = this.languageInfo[0].languageId;
      this.Sandbox.updateLanguage(params);
      this.languageList1(this.offset);
    } else {
      this.Sandbox.addLanguage(params);
      this.languageList1(this.offset);
    }
    this.languageList1(this.offset);

    this.modalService.close('close');
  }

  languageList1(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = '';
    this.Sandbox.languageList(params);
    if (this.pagenationcount) {
      params.count = 'true';
      this.Sandbox.languageListPagination(params);
    }
  }

  close() {
    this.modalService.close('close');

  }

  cancel() {
    this.service.languageSetData('');
    this.router.navigate(['/settings/local/language']);
  }

  languageList() {
    this.languageInfo.push(this.service.languageGetData());
    if (this.languageInfo[0] !== null) {
      if (this.languageInfo[0] && this.languageInfo[0].name) {
        this.updateTitle = 1;
        this.name = this.languageInfo[0].name;
        this.status = this.languageInfo[0].status;
        this.code = this.languageInfo[0].code;
        this.redirectUrl = this.languageInfo[0].redirectUrl;
        this.sortorder = this.languageInfo[0].sortorder;
        this.postImageUrl =
          this.imageUrl + '?path=' +
          `${this.languageInfo[0].imagePath}` + '&name=' +
          `${this.languageInfo[0].image}` +
          '&width=160&height=150';
        this.changeDetectRef.detectChanges();
        this.language.controls['name'].setValue(this.languageInfo[0].name);
        this.language.controls['code'].setValue(this.languageInfo[0].code);
        this.language.controls['redirectUrl'].setValue(this.languageInfo[0].redirectUrl);
        this.language.controls['sortorder'].setValue(
          this.languageInfo[0].sortOrder
        );
        this.language.controls['status'].setValue(
          this.languageInfo[0].isActive
        );
      }
    }
  }

  uploadButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  uploadChange($event): void {
    this.convertBase64($event.target);
    this.image = $event.target.files[0].name
  }

  convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = e => {
      this.postImageUrl = myReader.result;
      this.ImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }

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
}
