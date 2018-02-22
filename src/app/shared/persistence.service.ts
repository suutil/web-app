import { BehaviorSubject } from 'rxjs'

function generateKey(target: Object, decoratedPropertyName?: string) {
  return 'suutil.' + target.constructor.name + '.' + decoratedPropertyName
}

function getStoredDataOrDefault(key, initialValue) {
    var storedValue = localStorage.getItem(key)
    if (storedValue) {
        return JSON.parse(storedValue).data
    } else {
        return initialValue
    }
}

function storeData(key, data) {
    localStorage.setItem(key, JSON.stringify({ data }));
}

export function PersistentBehaviorSubject(initial: Object) {
    return (target: Object, decoratedPropertyName?: string) => {
        let storageKey = generateKey(target, decoratedPropertyName)

        target[decoratedPropertyName] = new BehaviorSubject(getStoredDataOrDefault(storageKey, initial))

        let beahaviorSubject: BehaviorSubject<Object> = target[decoratedPropertyName]

        beahaviorSubject.subscribe(newValue => storeData(storageKey, newValue))
    }
}
