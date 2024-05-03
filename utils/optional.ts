export class Optional<T> {
  private value: T | null;

  private constructor(value: T | null) {
    this.value = value;
  }

  static of<T>(value: T): Optional<T> {
    return new Optional(value);
  }

  static ofNullable<T>(value: T | null | undefined): Optional<T> {
    return new Optional(value === (null || undefined) ? null : value);
  }

  static empty<T>(): Optional<T> {
    return new Optional<T>(null);
  }

  isPresent(): boolean {
    return this.value !== null;
  }

  ifPresent(callback: (param: T) => void): void {
    if (this.value) {
      callback(this.value);
    }
  }

  isEmpty(): boolean {
    return this.value === null;
  }

  get(): T {
    if (this.value === null) {
      throw new Error("No value present");
    }
    return this.value;
  }

  orElse(defaultValue: T): T {
    return this.value === null ? defaultValue : this.value;
  }
}
