import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Name{
  title: string;
  fname: string;
  lname: string;
  email: string;
  role: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class MainService {

  private _storage: Storage | null = null;


  KEY = 'NAMES'
  constructor(private storage: Storage) {
      this.init()
   }

   async init() {
    const storage = await this.storage?.create();

    this._storage = storage;
  }

  async addName(name: Name){
    let currentNames: Name[] = await this.storage.get(this.KEY);

    if(currentNames){
      currentNames.push(name);
      await this._storage?.set(this.KEY, currentNames);
    }else{
      await this._storage?.set(this.KEY, [name]);
    }
  }

  async removeUser(id: number){
    let currentNames: Name[] = await this.storage.get(this.KEY);
    currentNames.splice(id, 1);
    await this._storage?.set(this.KEY, currentNames);
  }
  

  async readNames(): Promise<Name []>{
    const names = await this._storage?.get(this.KEY);

    if(!names){
      await this.addName({title: 'Mr',fname: 'Emil', lname: 'W', email:'emilw@gmail.com',role:'Admin', password:'1234'});
      return await this._storage?.get(this.KEY);
    }

    
    return names;
  }

  async getUser(id: number): Promise<Name []>{
    const names = await this._storage?.get(this.KEY);

    if(!names){
      
      return await this._storage?.get(this.KEY);
    }

    return names[id];
  }

  
}
