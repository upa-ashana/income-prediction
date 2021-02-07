import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

export let browserRefresh = false;
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  maleIncome: number; femaleIncome: number; rate: any;
  maleIncomeArray: any = []; femaleIncomeArray: any = [];
  maleIncomeModel: any = [];
  femaleIncomeModel: any = [];
  rateModel: any = [];

  subscription: Subscription;
  constructor(private router: Router) {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        browserRefresh = !router.navigated;
        this.onPageRefreshed();
      }
    });
  }

  ngOnInit() {

  }

  // Income prediction on the basis of rate of base year
  onIncomePrediction() {
    this.maleIncome = this.maleIncomeModel.maleBYI; this.femaleIncome = this.femaleIncomeModel.femaleBYI;
    this.rate = this.rateModel.baseYRC;
    //income calcualtion       
    for (let i = 0; i <= 5; i++) {
      this.maleIncomeArray[i] = this.maleIncome;
      this.femaleIncomeArray[i] = this.femaleIncome;
      this.maleIncome = this.maleIncome + (this.rate / 100) * this.maleIncome;
      this.femaleIncome = this.femaleIncome + (this.rate / 100) * this.femaleIncome;
    }
    //assigning to male
    for (let i = 0; i <= 5; i++) {
      this.maleIncomeModel[i] = this.maleIncomeArray[i];
    }
    //assigning to female 
    for (let j = 0; j <= 5; j++) {
      this.femaleIncomeModel[j] = this.femaleIncomeArray[j];
    }

    //setting maleincome prediction
    this.maleIncomeModel.maleBYI = this.maleIncomeModel[0];
    this.maleIncomeModel.maleFYI = this.maleIncomeModel[1];
    this.maleIncomeModel.maleSYI = this.maleIncomeModel[2];
    this.maleIncomeModel.maleTYI = this.maleIncomeModel[3];
    this.maleIncomeModel.maleFRYI = this.maleIncomeModel[4];
    this.maleIncomeModel.maleFVYI = this.maleIncomeModel[5];

    //setting femaleincome prediction
    this.femaleIncomeModel.femaleBYI = this.femaleIncomeModel[0];
    this.femaleIncomeModel.femaleFYI = this.femaleIncomeModel[1];
    this.femaleIncomeModel.femaleSYI = this.femaleIncomeModel[2];
    this.femaleIncomeModel.femaleTYI = this.femaleIncomeModel[3];
    this.femaleIncomeModel.femaleFRYI = this.femaleIncomeModel[4];
    this.femaleIncomeModel.femaleFVYI = this.femaleIncomeModel[5];
  }

  //Save and Print
  onSaveAndPrint() {
    sessionStorage.setItem('MaleIncomes', this.maleIncomeArray);
    sessionStorage.setItem('FemaleIncomes', this.femaleIncomeArray);
    sessionStorage.setItem('Rate', this.rate);
    this.onPrint();
  }
  //print
  onPrint() {
    window.print();
  }

  // Page refresh
  onPageRefreshed() {
    let getMaleIncomes: any = [], getFemaleIncomes: any[], getRate;
    if (sessionStorage.reload) {
      sessionStorage.reload = true;
      //male
      let maleIncomeSession = sessionStorage.getItem('MaleIncomes');
      getMaleIncomes = maleIncomeSession.split(",");
      //female 
      let femaleIncomeSession = sessionStorage.getItem('FemaleIncomes');
      getFemaleIncomes = femaleIncomeSession.split(",");
      //rate
      getRate = sessionStorage.getItem('Rate');

    }
    else {
      sessionStorage.reload = false;
    }

    //reloading fron session maleincome prediction
    this.maleIncomeModel.maleBYI = getMaleIncomes[0];
    this.maleIncomeModel.maleFYI = getMaleIncomes[1];
    this.maleIncomeModel.maleSYI = getMaleIncomes[2];
    this.maleIncomeModel.maleTYI = getMaleIncomes[3];
    this.maleIncomeModel.maleFRYI = getMaleIncomes[4];
    this.maleIncomeModel.maleFVYI = getMaleIncomes[5];

    //reloading fron session  femaleincome prediction
    this.femaleIncomeModel.femaleBYI = getFemaleIncomes[0];
    this.femaleIncomeModel.femaleFYI = getFemaleIncomes[1];
    this.femaleIncomeModel.femaleSYI = getFemaleIncomes[2];
    this.femaleIncomeModel.femaleTYI = getFemaleIncomes[3];
    this.femaleIncomeModel.femaleFRYI = getFemaleIncomes[4];
    this.femaleIncomeModel.femaleFVYI = getFemaleIncomes[5];

    //reloading fron session rate
    this.rateModel.baseYRC = getRate;
  }
  //chnage traked on user change the prefilled income

  update=false;
  onChangedTrack(mess) {
    this.update=true;
    let message = mess + " " + "Year Income changed";
    console.log(message);
  }
}
