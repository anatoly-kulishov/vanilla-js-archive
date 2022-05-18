abstract class PersonAbstract {
  protected name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  abstract setAge(age: number): void;
  
  abstract getAge(): number;
  
  abstract getFullInfo(): {
    name: string,
    age: number
  };
}

class Person extends PersonAbstract {
  private age: number;
  
  constructor(name: string) {
    super(name);
    this.age;
  }
  
  setAge(age: number) {
    this.age = age
  }
  
  getAge() {
    return this.age;
  }
  
  getFullInfo() {
    return {
      name: this.name,
      age: this.age
    }
  }
  
}

const Anatoly = new Person('Anatoly');

Anatoly.setAge(22);

console.log(Anatoly.getAge());

Anatoly.setAge(23);

console.log(Anatoly.getFullInfo());