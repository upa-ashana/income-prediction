# IncomePrediction

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9, and built in Nodejs: V10.15.0 and NPM: 6.4.1

## Setup
Any one to run this project on their computer/laptop require:
* `Nodejs version > 10` If you don't have, download from [NodeJS](https://nodejs.org/en/download/) 
* `Install Npm`
* `Angular CLI` you can follow steps to install [Angular CLI Install](https://angular.io/guide/setup-local)

## Run Project

After installation complete, enter `ng serve` command to run project on terminal. Navigate to `http://localhost:4200/`. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Package.json

This file contain all the dependecies and libraries required to run this project.

## Src folder

All the code of this project is reside in `src/app` folder.

### App Folder

this folder has  the root componet, module, routing, service, pipe, directives,etc. These can be create new and used as per requirement during application building. 

## Income Component

we can generate many other componet as per requirement using a command `ng generate component 'component-name'`. In this project, income component has been created to claculate income for next 5 year as per the income and rate of change entered by user of their and their spouse . 

## income.component.html

On tabular format form user enter his/her and his/her spouse their current year income and predict future year income based on rate of change entered.(current to year to next 5 year from the current year). 

* A table contain a form having 6 rows and 3 column user input field 
* On first row user have enter income and rate on which basis income will increase in future.
* On the rate entered income for next five year will be autofiled by calculating.

### Form Validation

* Validation for form has been applied using `NgForm` Directives, only on five years income autofilled `print` button will enabled.
* Validation for 1st input field (current year) has been applied using `NgModel`. If field is `touched`, `dirty`, and `invalid` it   will show an error message.

### [(ngModle)] Directives

*  For model to view and view to model communication two way data binding has been used.

### (input) event 

* This event is used in rate change field. On the rate entered, `incomePrediction()` will be called. It will calculate next five     years income.

### (change) event

* This event is used to track when user changed the autofilled income. 

### Print Button
* Once the all input field are autofilld, print button will be enable. On click on `print` button, print page will open.

## Income.component.ts 

 `onIncomePrediction()`,`onSaveAndPrint()`, `onPrint()`, `onPageRefreshed()`,and `onChangedTrack(argument)` are defined here.

### incomePrediction()
on a rate entered by user, this function will be called.

1. Variables

* An array `maleIncomeModel`, `femaleIncomeModel`, and `rateModel` has been created as a instance to communicate between model and   view.
* `maleIncome`, `femaleIncome`, and `rate` are variable declared as global. It is assigned inside the function. It hold current     year income and inside for loop hold calculated value and assigned to `maleIncomeArray` and `femaleIncomeArray` where        `rateModel` hold rate. 
* An array maleIncomeArray and femaleIncome Array has been declared to hold the calculated value insied for loop.

2. For Loop

   For loop will executed for 6 times

* First loop is for income calculation.
* Second loop is to set the calculated value to `maleIncomeModel` instance
* Third loop is to set the calculated value to `femaleIncomeModel` instance.

3. onSaveAndPrint()
   On a `print` button clicked, this function will be called. Firstly, it perform session storage task and then call `onPrint()` to print window page.

4. Session Storage

   It store the male's and female's income current and next five years calcualted income and rate on browser.

5. onPageRefreshed()

* A local variable `getMaleIncome`, `getFemaleIncome`, and `getRate` are declared to hold the income & rate from session storage.
* Check the session storage is reload to get the session value.
* If true, get the value from session: 
   - In first, variable `maleIncomeSession` store male income from session. `getMaleIncomes = maleIncomeSession.split(",")` is used remove a comma put the value on `getMaleIncome` variable.
   - In second, variable f`emaleIncomeSession` store female income from session. `getFemaleIncomes = femaleIncomeSession.split(",")` is used remove a comma put the value on g`etFemaleIncome` variable.
   - In third, variable `getRate` is used to get rate from session.
* After it, It set the vale to instance `maleIncomeModel`, `femaleIncomeModel`, and `rateModel`.

6. onChangedTrack(argument)

   When user change autofilled income, `(change)` event tigger. This function simply send message on console.

7. Constructor
   Inside the constructor, page refreshed has been traced and call the function `onChangedTrack()`. To track page refresh:

* `Subscription` has been imported from `import { Subscription } from 'rxjs'` and instance has created `subscription:Subscription`.
* `Router` & `NavigationEnd` from import `{ Router, NavigationEnd } from '@angular/router'`.

## income-model.ts

   All the variable to hold the value when user enter a input for base year and next five year are declared here. 

# Output of the Project

1. To see out put navigate to `http://localhost:4200/` and first view will be like this
    [before input](src/assets/img/beforeInput.png).
2. On entered in income and rate, eg:- male income 100, female income 200 and expected rate by which income will increase is 10% then output will look like this [after input](src/assets/img/afterInput.png).   
3. On click on print button output will be like this [print](src/assets/img/print.png). At the same time value will be store on session and output look like this [session storage](src/assets/img/sessionStorage.png).
4. When first row is touched, dirty and invalid, it will dispaly error messeage like this [error message](src/assets/img/errorMessage.png). 


















