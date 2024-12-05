---
Title: "GDG Palermo! 🚀 - Frontend Development with Angular"
Subtitle: ""
Date: 2024-12-01
Tags: ["newsletter", "GDGPalermo", "Innovazione", "ELCA", "Angular", "AI", "Kubernetes", "Sviluppo", "Palermo"]
image : "/img/meetings/meetings1.png"
Description: "In person Event GDG in Palermo December 2024. GDG is a community-driven event that brings the latest innovations from Google I/O directly to developers worldwide."
Draft: 
---

# Frontend Development with Angular (2024) ! 🚀
**Speaker:** Marco Martorana, Senior Software Developer at ELCA  
**Event:** GDG Palermo, December 4, 2024  

## Introduction

- **Overview:** Retrospective of Angular framework evolution with personal recommendations and lessons learned.  
- **Focus:** Simplifying state management with Angular Signals introduced in Angular 16.  

---

## **Evolution of Angular**

### Angular Milestones

1. **Angular @2010** - The I Revolution
    - Introduction of Binding
    - Single Page Applications (SPAs) introduced with client-side rendering
    - Challenges addressed: manual synchronization, boilerplate code, and tight coupling.

2. **Angular @2016** - The II Revolution
    - Rewritten in TypeScript.
    - Integration with Reactive Programming using RxJS.

3. **Modern Angular @2023** - The III Revolution
   - **Key Features:** 
     - Simplification with standalone components.
     - Introduction of *Signals*, improved server-side rendering (SSR), and lazy loading with `@defer`.
     - Enhanced hydration for better page load performance.

---

## **Signals in Angular**

### Definition

- **What are Signals?**
  Signals are wrappers around values that notify consumers of changes.  
  - **Writable Signals:** Values can be directly updated.
  - **Computed Signals:** Derive values based on other signals.

- **Key Benefits:**
  - Improved performance and optimized DOM updates.
  - Simpler syntax compared to RxJS for state management.
  - Reduced boilerplate code.
  - Native responsiveness without subscriptions.

### Code Example: Signals vs RxJS

#### Using RxJS for Component State

```typescript
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-counter',
  template: `
    <h1>Counter: {{ count$ | async }}</h1>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <button (click)="reset()">Reset</button>
  `
})
export class CounterComponent {
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  increment() {
    this.countSubject.next(this.countSubject.value + 1);
  }

  decrement() {
    this.countSubject.next(this.countSubject.value - 1);
  }

  reset() {
    this.countSubject.next(0);
  }
}
```

#### Using Signals for Component State

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <h1>Counter: {{ count() }}</h1>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <button (click)="reset()">Reset</button>
  `
})
export class CounterComponent {
  count = signal<number>(0);
  parityMessage = computed(() => this.count() % 2 === 0 ? 'Even' : 'Odd');

  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

  reset() {
    this.count.set(0);
  }
}
```


## **Best Practices for Modern Angular**

1. Use **Signals** for simple state management.
2. Employ **RxJS** for complex asynchronous operations.
3. Interoperate between signals and observables for advanced scenarios.
4. Leverage SSR and hydration for improved performance.
5. Follow Angular's [official roadmap](https://angular.dev/roadmap) to stay updated.

---

## **Lessons Learned**

- **KIS Principle:** Keep it simple is key.  
- **Quality Code:** Prioritize testing, clean code, and team conventions.  
- **AI in Development:** Utilize AI tools cautiously for repetitive tasks.  
- **Tool Selection:** Adapt tools and frameworks to specific project requirements.

More information:
{{< pdfReader "https://marcomartorana.it/download/GDG-Pa-Angular-Signals.pdf" >}}