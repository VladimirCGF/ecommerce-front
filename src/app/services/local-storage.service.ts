export class LocalStorageService {

  constructor() {}

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  }

  setItem(key: string, value: any): void {
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
