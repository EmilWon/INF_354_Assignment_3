import { MainService, Name } from './../services/main/main.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  selectedUser: Name[] = [];
  editUserForm : FormGroup;
  @Input() id: number;
  
   
  constructor(private modal: ModalController, private fb: FormBuilder, private service: MainService) { }

  ngOnInit() {
    this.service.init();
    this.getUser(this.id);
    
    
    this.editUserForm = this.fb.group({
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

  password(formGroup: FormGroup){
    const{value: password} = formGroup.get('password');
    const{value: confirmpassword} = formGroup.get('confirmpassword');
    return password === confirmpassword ? null : {passwordNotMatch: true};
  }

  async updateUser(){
    const newUser: Name = this.editUserForm.value;
    await this.service.addName(newUser);
    await this.service.removeUser(this.id);
    this.dismissModal();
  }

  async getUser(id){
    this.selectedUser = await this.service.getUser(id);
  }

  dismissModal(){
    this.modal.dismiss();
  }



}
