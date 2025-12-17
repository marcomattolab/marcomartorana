---
Title: "Angular Signals VS RxJS: Can Signals Replace the RxJS Code and How ?"
Date: 2025-12-17
Tags: ["Angular", "frontend", "RxJS", "Signals", "State", "typescript"]
image: "/img/collections/angular-signals-vs-rxjs.png"
Description: "Angular Signals introduce a new way to manage reactivity with less complexity and more clarity. By reducing boilerplate and focusing on reactive state, Signals make it easier to build, read, and maintain Angular applications—often without the heavy use of RxJS."
Draft:
---

# Angular Signals: How They Replace Half of Your RxJS Code

Angular is entering a new reactive era. With the maturation of **Signals**, developers now have a simpler and more intuitive way to manage state and reactivity — one that significantly reduces the amount of RxJS code needed in everyday Angular applications.

This shift does **not** mean RxJS is disappearing. Instead, Angular Signals redefine *where RxJS should be used* and where it no longer adds value.

Many Angular teams are discovering that Signals can replace up to **50% of their RxJS code**, especially in UI and local state management.

---

## Why Angular Introduced Signals

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

---

## 1. Local State: From `BehaviorSubject` to `signal`

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

---

## 2. Derived State with `computed()` Instead of `combineLatest`

### RxJS Pattern

```ts
vm$ = combineLatest([
  this.user$,
  this.settings$
]).pipe(
  map(([user, settings]) => ({ user, settings }))
);
```

### Signals Pattern

```ts
vm = computed(() => ({
  user: this.user(),
  settings: this.settings()
}));
```

---

## 3. Side Effects Without `subscribe()` Using `effect()`

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

---

## 4. Eliminating Manual Subscription Management

Signals eliminate manual cleanup and lifecycle management for UI state.

---

## 5. Replacing Small RxJS Stores with Signal-Based Stores

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

```html
<p>{{ count() }}</p>
```

---

## 7. RxJS vs Signals: When to Use What

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

Signals don’t replace RxJS — they refine its role.
