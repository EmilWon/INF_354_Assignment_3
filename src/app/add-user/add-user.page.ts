import { MainService, Name } from './../services/main/main.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  userForm: FormGroup;
  constructor(private modal: ModalController, private fb: FormBuilder, private service: MainService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      title: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      role: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      confirmpassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
    }, {
      validators: this.password.bind(this)
    });
  }

  dismissModal(){
    this.modal.dismiss();
  }

  password(formGroup: FormGroup){
    const{value: password} = formGroup.get('password');
    const{value: confirmpassword} = formGroup.get('confirmpassword');
    return password === confirmpassword ? null : {passwordNotMatch: true};
  }

  async addUser(){
    const newUser: Name = this.userForm.value;
    await this.service.addName(newUser);
    this.dismissModal();
  }
}
