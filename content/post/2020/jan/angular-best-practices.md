---
title: Angular Best Practice 2023 
date: 2024-04-02
tags: ["angular","best-practice"]
image : "/img/posts/img-3.jpg"
Description  : "In the article 20 rules related to Angular Best practices, covering the ‘**what**’ (the rule itself), ‘**why**’ (its importance), and ‘**how**’ (implementing it)."
featured: true
---

![Marco Martorana](https://miro.medium.com/v2/resize:fill:88:88/1*pOsuDHZGeo6_xn6VS3cUVw.jpeg)
[Marco Martorana](https://medium.com/@marcomatto)

**_Angular_**, developed by Google, is a powerful framework for dynamic programming of Single Page Application based on TypeScript .

It is a structured framework not a simple library such as _React_, so developers have to “_think_” like Angular. Behind the scene, it uses a lot of building blocks: modules, components, data binding, services, directives, and more. This story want to highlight Angular’s best practices for optimal implementation following simple rules

These rules are a starting point for novice developers in order to work with a well-done Angular project. You have to consider that this framework is **_complex_** and has a **_high learning curve_**, so these best practices want to _guide_ developers to create more maintainable and scalable Angular applications.

In the article I’ve written, each of the 20 rules is explained thoroughly, covering the ‘**what**’ (the rule itself), ‘**why**’ (its importance), and ‘**how**’ (implementing it).

For a visual representation, check out this picture featuring **Superman**, to grasp these concepts visually and make them as powerful as a superhero’s abilities.

1\. Use Angular CLI for Project Setup
-------------------------------------

**What**: Always use Angular CLI to create and manage your Angular projects.

**Why**: Angular CLI provides a standard and efficient way to bootstrap, develop, test, and deploy Angular applications.

**How**:

```
# Install Angular CLI globally (if not already installed)
npm install -g @angular/cli
# Create a new Angular project
ng new my-angular-app
# Navigate to the project directory
cd my-angular-app
# Generate a component 
ng generate component my-component
# Run the development server
ng serve
```


2\. Follow the Single Responsibility Principle (SRP)
----------------------------------------------------

**What**: Each component, service, or module should have a single responsibility.

**Why**: SRP promotes maintainability, readability, and reusability of code. It makes your codebase easier to understand and debug.

**How**:

```
// Example of a component with a single responsibility
import { Component } from '@angular/core';
@Component({
  selector: 'app-user',
  template: '<div>{{ user.name }}</div>',
})
export class UserComponent {
  user = { name: 'Marco Martorana' };
}
```


3\. Optimize Performance with OnPush Change Detection
-----------------------------------------------------

**What**: Use `ChangeDetectionStrategy.OnPush` to optimize change detection in components.

**Why**: OnPush change detection reduces the number of checks and enhances performance, especially in large applications.

**How**:

```
import { Component, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-user',
  template: '<div>{{ user.name }}</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  user = { name: 'Marco Martorana' };
}
```


4\. Use Reactive Forms
----------------------

**What**: Utilize Angular Reactive Forms with form validation.

**Why**: Angular provides two different kind of forms: Template Driven Forms and Reactive forms. A Reactive Form provides a more predictable and manageable way to handle form data, including validation and asynchronous operations. Furthermore Angular framework uses RxJS library so it based on reactive programming and Reactive forms leverage this.

**How**:

```
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registration',
  template: `
    <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
      <input formControlName="username" placeholder="Username" />
      <button type="submit" [disabled]="registrationForm.invalid">Register</button>
    </form>
  `,
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  onSubmit() {
    // Manage submission here
  }
}
```


5\. Lazy Load Modules
---------------------

**What**: Implement lazy loading for feature modules to load them on-demand.

**Why**: Lazy loading reduces the initial bundle size and speeds up the application’s initial loading time. This modularization improve performance and let to have a better application structure following a division by domain entities.

**How**:

```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  // Other routes...
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
```


6\. Use TrackBy with ngFor Directive
------------------------------------

**What**: Provide a function for trackBy in ngFor loops.

**Why**: Optimizes rendering performance for lists.

**How**:

```
// In component
trackByFn(index: number, item: any): number {
  return item.id;
}
<!-- In template -->
<div *ngFor="let item of items; trackBy: trackByFn">{{ item.name }}</div>
```


7\. Document Code
-----------------

**What**: Add meaningful comments and document your code.

**Why**: Improves code readability and helps other developers understand your code.

**How**:

```
/**
 * This is an sample function that print a message in console and return length of input parameter.
 * @param {string} param - Description of the parameter.
 * @returns {number} Description of the return value.
 */
function helloFunction(name: string): number {
  // Function logic here
  console.log(`Hello ${name} length: ${name.length}`);
  return name.length;
}
```


> **_Plus_**: In order to generate documentation of your Angular project can be used this tool Compodoc

8\. Use Async Pipe for Observables
----------------------------------

**What**: Use the async pipe to subscribe to observables in templates.

**Why**: Automatically manages subscriptions and avoids memory leaks.

**How**:

```
// In component
data$: Observable<Data>;
```


```
<!-- In template -->
<div *ngIf="data$ | async as data">{{ data }}</div>
```


9\. Follow the Angular Style Guide
----------------------------------

**What**: Adhere to the official Angular style guide for consistent coding standards.

**Why**: Consistency improves readability and maintainability.

**How**:

```
// Bad
function myComponent() {}
// Good
export class MyComponent {}
```


10\. Use Angular Services for Business Logic
--------------------------------------------

**What**: Place business logic in Angular services, not components.

**Why**: Separation of concerns and reusability of logic.

**How**:

```
@Injectable({
  providedIn: 'root',
})
export class MyService {
  getData(): Observable<Data> {
    // Write Service logic (business logic) here
  }
}
```


```

@Component({
  selector: 'app-my-component',
  templateUrl: 'my-component.component.html',
})
export class MyComponent {
   currentValue: Data;
      constructor(private myService: MyService) {
      myService.getData().subscribe(v => {
        this.currentValue = v;
      });
   }
}
```


11\. Use Lifecycle Hooks
------------------------

**What**: Angular provides lifecycle hooks to manage component behavior at key points. Use hooks like `ngOnInit`, `ngOnChanges`, and `ngOnDestroy` and so on appropriately. See Angular [lifecycle-hooks.](https://angular.io/guide/lifecycle-hooks)

**Why**: Proper use of lifecycle hooks ensures efficient component initialization, change detection, and cleanup.

**How**:

```
import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-example',
  template: '...',
})
export class ExampleComponent implements OnInit, OnDestroy {
  constructor(){}
  ngOnInit() {
    // Initialization logic here
  }
  ngOnDestroy() {
    // Cleanup logic here
  }
}
```


12\. Follow Proper Subscription/Unsubscription Patterns
-------------------------------------------------------

**What**: Avoid memory leaks by unsubscribing from observables when components are destroyed.

**Why**: Unsubscribing prevents lingering subscriptions, which can lead to memory leaks and unexpected behavior.

**How**:

```
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-example',
  template: '...',
})
export class ExampleComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor(private dataService: DataService) {
  }
  ngOnInit() {
   this.subscription = this.dataService.getData().subscribe(data => {
      // Handle data
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```


13\. Prefer interfaces over “any” type
--------------------------------------

**What**: Use interfaces to define the shape of objects rather than using the ‘any’ type.

**Why**: Interfaces provide type safety, better code readability. Writing with our preferred IDE (VSCode, IntelliJ Idea or other) we are “guided” during development. Furthermore we are using Angular, which is based on Typescript that support Object-Oriented Programming. OOP provides a way to organize code and create reusable and modular software applications. To do that we have inheritance, encapsulation and polymorphism, but first of all we have data types. So why don’t use them properly instead of use any?

**How**:

```
interface User {
  id: number;
  name: string;
}
function getUserInfo(user: User): string {
  // Access user properties safely
  return user.name + " (" + user.id + ")";
}
```


14\. Code Consistency and Style
-------------------------------

**What**: Follow a consistent coding style and adhere to the Angular style guide.

**Why**: Consistent code enhances readability and collaboration among developers.

**How**:

*   Use a linter like [ESLint](https://www.npmjs.com/package/eslint) or TSLint to enforce coding standards.
*   Follow the Angular style guide: [https://angular.io/guide/styleguide](https://angular.io/guide/styleguide)

15\. Unit testing and e2e testing
---------------------------------

**What**: Write unit tests using tools like Jasmine and Karma. Perform end-to-end testing using a specific tool for e2e such as Cypress.

**Why**: Testing ensures code reliability, catches bugs early, and facilitates future code changes.

**_Note_**_: About_ **_e2e tests_** _we are in the border territory of the framework compared to purely_ **_QA_** _territory. Furthermore, there are diverse tools such as Protractor, Cypress, Selenium and others with advantages and disadvantages and also several considerations to make (maybe in a separeted Post)._

**How** (Unit test):

```
// example.component.spec.ts
describe('ExampleComponent', () => {
  it('should create', () => {
    const component = new ExampleComponent();
    expect(component).toBeTruthy();
  });
});
```


**How** (e2e test):

```
// example.e2e-spec.ts
describe('Example App', () => {
  it('should display welcome message', () => {
    cy.visit('/');
    cy.get('app-root').contains('Welcome to your Angular App!');
  });
});
```


16\. Utilize RxJS Operators Effectively
---------------------------------------

**What**: RxJS operators like `map`, `filter`, and `mergeMap` transform and manipulate observables efficiently.

**Why**: Operators simplify complex asynchronous operations, making code concise and readable.

**How**:

```
import { from } from 'rxjs';
import { map, filter } from 'rxjs/operators';
const numbers = from([1, 2, 3, 4, 5]);
numbers.pipe(
  filter(num => num % 2 === 0), // Filters even numbers
  map(num => num * 2) // Doubles the filtered numbers
).subscribe(result => {
  console.log(result); // Output: 4, 8
});
```


```
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
// Example using map and filter operators
observable.pipe(
  filter(data => data !== null), // Filter out null values
  map(data => data.property),    // Extract a specific property
).subscribe(transformedData => {
  // Process transformed data
});
```


17: Avoid Nested Subscriptions
------------------------------

**What**: Avoid subscribing inside another subscription to prevent callback hell and improve code readability.

**Why**: Nested subscriptions can lead to difficult-to-maintain code, known as the “pyramid of doom.” It can also cause memory leaks if not properly managed.

**How**:

```
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// Bad Practice (Nested Subscriptions)
observable1.subscribe(data1 => {
  observable2.subscribe(data2 => {
    // Process data
  });
});
// Good Practice (Using switchMap)
observable1.pipe(
  switchMap(data1 => {
    return observable2;
  })
).subscribe(data2 => {
  // Process data
});
```


18: Reuse Components
--------------------

**What**: Create reusable components to encapsulate specific functionalities and UI elements.

**Why**: Reusing components enhances maintainability, reduces duplication, and improves the overall consistency of the application.

**How**:

```
// Reusable Component (Example)
@Component({
  selector: 'app-custom-button',
  template: '<button>{{label}}</button>'
})
export class CustomButtonComponent {
  @Input() label: string;
    // Component logic and methods
}
// Implementation in Parent Component
<app-custom-button [label]="'Click me'"></app-custom-button>
```


19: Leverage Higher-Order Mapping Operators
-------------------------------------------

**What**: Use higher-order mapping operators like `mergeMap`, `concatMap`, or `exhaustMap` based on specific use cases.

**Why**: Higher-order mapping operators allow you to manage concurrency and handle observable emissions in a controlled manner, preventing issues like race conditions.

**How**:

```
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// Using mergeMap to handle concurrent requests
observable.pipe(
  mergeMap(data => {
    return from(someAsyncOperation(data));
  })
).subscribe(result => {
  // Process the merged result
});
```


20: Use TakeUntil with Subject for Manual Unsubscription
--------------------------------------------------------

What:
-----

Use async pipe when possible (this is suggested by Angular). When you cannot use sync pipe than use the `takeUntil` operator along with a `Subject` to manually unsubscribe from observables.

Why:
----

`takeUntil` operator allows you to unsubscribe from observables when a specific event (controlled by the Subject) occurs, preventing memory leaks.

```
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-example',
  template: 'Example Component'
})
export class ExampleComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private dataService: DataService) {
    this.dataService.getData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        // Handle data
      });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
```

By following these **_best practices_**, Angular developers can create more efficient, readable and maintainable code while taking advantage of the powerful features provided by [RxJS](https://rxjs.dev/).
<!--Photo by Marco Martorana -->
