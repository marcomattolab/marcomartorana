---
Title: "Angular Signals VS RxJS: Can Signals Replace the RxJS Code and How ?"
Date: 2025-12-17
Tags: ["Angular", "frontend", "RxJS", "Signals", "State", "typescript"]
image: "/img/collections/angular-signals-vs-rxjs.png"
Description: "Angular Signals introduce a new way to manage reactivity with less complexity and more clarity. By reducing boilerplate and focusing on reactive state, Signals make it easier to build, read, and maintain Angular applications—often without the heavy use of RxJS."
Draft:
---

# Angular Signals
## How They Replace Half of Your RxJS Code

Angular is entering a new reactive era. With the maturation of **Signals**, developers now have a simpler and more intuitive way to manage state and reactivity — one that significantly reduces the amount of RxJS code needed in everyday Angular applications.

This shift does **not** mean RxJS is disappearing. Instead, Angular Signals redefine *where RxJS should be used* and where it no longer adds value.

Many Angular teams are discovering that Signals can replace up to **50% of their RxJS code**, especially in UI and local state management.

---

## Why Angular Introduced Signals

Before diving into code comparisons, it’s important to understand why Signals exist in the first place. Angular has relied on RxJS for years, but not every reactive problem is asynchronous or stream-based.

RxJS has long been the backbone of Angular’s reactivity, but it comes with trade-offs:

- Verbose boilerplate for simple state
- Manual subscription management
- Steep learning curve
- Overuse of streams for synchronous data

Angular Signals address these issues by offering:

- Synchronous reactive state
- Automatic dependency tracking
- Fine-grained change detection
- Zero subscription management


Signals are designed to make the common cases simple, while still allowing RxJS to shine in complex asynchronous scenarios.
---

## 1. Local State: From `BehaviorSubject` to `signal`

Local UI state is one of the most common use cases in Angular applications. 
Historically, developers used BehaviorSubject even when the state was purely synchronous.

Signals provide a cleaner and more direct alternative for this kind of state.


### RxJS Pattern

```ts
private user$ = new BehaviorSubject<User | null>(null);

setUser(user: User) {
  this.user$.next(user);
}
```

### Signals Pattern

```ts
user = signal<User | null>(null);

setUser(user: User) {
  this.user.set(user);
}
```

With Signals, state updates are explicit, synchronous, and easier to reason about.

---

## 2. Derived State with `computed()` Instead of `combineLatest`

A large portion of RxJS code exists just to derive state from other pieces of state. 
While powerful, operators like combineLatest add unnecessary complexity when dealing with synchronous data.

Signals offer computed() for exactly this purpose.


### RxJS Pattern

```ts
vm$ = combineLatest([
  this.user$,
  this.settings$
]).pipe(
  map(([user, settings]) => ({ user, settings }))
);
```

The result is less code, fewer abstractions, and a more readable mental model.

### Signals Pattern

```ts
vm = computed(() => ({
  user: this.user(),
  settings: this.settings()
}));
```

---

## 3. Side Effects Without `subscribe()` Using `effect()`

Side effects are another common reason developers reach for RxJS subscriptions. 
Logging, syncing with external APIs, or reacting to state changes often required manual subscriptions.

Signals introduce effect() to handle these cases safely and declaratively.


### RxJS Pattern

```ts
this.user$.subscribe(user => {
  console.log('User changed:', user);
});
```

### Signals Pattern

```ts
effect(() => {
  console.log('User changed:', this.user());
});
```

Effects automatically track dependencies and clean themselves up, reducing lifecycle-related bugs.
---

## 4. Eliminating Manual Subscription Management

One of the most error-prone aspects of RxJS is remembering to unsubscribe. 
Forgetting to do so can lead to memory leaks and unexpected behavior.

Signals eliminate this entire category of problems by design. There are no subscriptions to manage, no takeUntil, and no ngOnDestroy boilerplate for UI-driven state.

Signals eliminate manual cleanup and lifecycle management for UI state.

---

## 5. Replacing Small RxJS Stores with Signal-Based Stores

Many applications use RxJS to build small, local stores that manage component or feature-level state. 
Signals allow you to implement the same pattern with far less complexity.

```ts
class CounterStore {
  count = signal(0);
  isEven = computed(() => this.count() % 2 === 0);

  increment() {
    this.count.update(v => v + 1);
  }
}
```

---

## 6. Signals in Templates: No More `async` Pipe

Templates are where the simplicity of Signals truly shines. Instead of piping observables through async, you can access signal values directly.

```html
<p>{{ count() }}</p>
```

This removes template noise and makes the data flow immediately obvious.

---

## 7. RxJS vs Signals: When to Use What

Signals are not a universal replacement. Understanding when to use each tool is key to building scalable applications.


| Use Case | RxJS | Angular Signals |
|--------|------|-----------------|
| Local UI state | ❌ Overkill | ✅ Ideal |
| Derived state | ❌ Verbose | ✅ `computed()` |
| Side effects | ❌ `subscribe()` | ✅ `effect()` |
| Subscription management | ❌ Manual | ✅ Automatic |
| HTTP requests | ✅ Yes | ❌ No |
| WebSockets | ✅ Yes | ❌ No |
| Debounce / throttle | ✅ Yes | ❌ No |
| Complex async flows | ✅ Yes | ❌ No |

---

## Conclusion

### Signals don’t replace RxJS — they refine its role.

Angular Signals don’t replace RxJS — they refine its role.

RxJS remains essential for handling asynchronous streams, external events, and complex data flows. Signals, on the other hand, excel at managing synchronous state, derived values, and UI-driven reactivity.

By adopting Signals for local and derived state, teams can:
- Reduce boilerplate and cognitive overhead
- Improve readability and maintainability
- Eliminate entire classes of subscription-related bugs
- Make Angular code more approachable for new developers

The real power comes from using both tools together, each where it fits best. Signals simplify the majority of everyday state management, while RxJS continues to power Angular’s most advanced reactive use cases.

In practice, this balance leads to cleaner architecture, clearer intent, and faster development — a strong step forward for the Angular ecosystem.
