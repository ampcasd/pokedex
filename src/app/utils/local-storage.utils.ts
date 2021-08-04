import { LocalStorageKey } from '../enums/local-storage.enum';

export function getFromLocalStorage(key: LocalStorageKey): object {
  return JSON.parse(localStorage.getItem(key));
}

export function updateLocalStorage(key: LocalStorageKey, value: any): void {
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(value));
}

