import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { detectChanges } from '@angular/core/src/render3';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IncomeModel } from './income-model';
import { RouterTestingModule } from '@angular/router/testing';

describe('IncomeComponent', () => {
  let component: IncomeComponent;
  let fixture: ComponentFixture<IncomeComponent>;
  let incomeModel: IncomeModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [IncomeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeComponent);
    component = fixture.debugElement.componentInstance;
    incomeModel = new IncomeModel();
    fixture.detectChanges();
  });

  it('IncomeComponent should have created', () => {
    expect(component).toBeTruthy();
  });

  it('Title should be', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h4').textContent).toContain('Prediction Income of 5 years');
  });

  it('Should update=false', () => {
    fixture.detectChanges();
    expect(component.update).toEqual(false);
  });

  // it('Should be print button disabled on empty input field',()=>{   
  //   fixture.detectChanges();
  //   const button = fixture.debugElement.query(By.css('.btn'));
  //   expect(button.nativeElement.disabled).toBeTruthy();    
  // });

  it('Should be print button enabled on income & rate entered in 1st row as a base year income', () => {
    incomeModel.maleFYI = 100;
    incomeModel.femaleFYI = 200;
    incomeModel.firstYRC = 10;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.btn'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('Should onIncomePrediction() is called', () => {
    fixture.detectChanges();
    const callFunction = fixture.debugElement.query(By.css('input')).nativeElement;
    callFunction.click();
    expect(component.onIncomePrediction).toBeTruthy();
  });

  it('Should onSaveAndPrint() is called', () => {
    fixture.detectChanges();
    const callFunction = fixture.debugElement.query(By.css('button')).nativeElement;
    callFunction.click();
    expect(component.onSaveAndPrint).toBeTruthy();
  });

});
