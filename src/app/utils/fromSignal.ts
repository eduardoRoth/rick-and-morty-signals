import { computed, effect, Signal } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

export function fromSignal<T>(signal: Signal<T>) {
  return new Observable((subscriber: Subscriber<T>) => {
    const computedSignal = computed(() => signal());
    effect(() => {
      if (!subscriber.closed) {
        subscriber.next(computedSignal());
      }
    });
  });
}
