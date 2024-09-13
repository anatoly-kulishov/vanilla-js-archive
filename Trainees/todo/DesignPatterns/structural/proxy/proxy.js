/**
 * Заместитель — это структурный паттерн проектирования,
 * который позволяет подставлять вместо реальных объектов специальные объекты-заменители.
 * Эти объекты перехватывают вызовы к оригинальному объекту,
 * позволяя сделать что-то до или после передачи вызова оригиналу.
 *
 * Преимущества:
 * 1) Позволяет контролировать сервисный объект незаметно для клиента.
 * 2) Может работать, даже если сервисный объект ещё не создан.
 * 3) Может контролировать жизненный цикл служебного объекта.
 *
 * Недостатки:
 * 1) Усложняет код программы из-за введения дополнительных классов.
 * 2) Увеличивает время отклика от сервиса.
 */

class CarAccess {
  open() {
    console.log('Opening car door')
  }

  close() {
    console.log('Closing the car door')
  }
}

class SecuritySystem {
  constructor(door) {
    this.door = door;
  }

  open(password) {
    if (this.authenticate(password)) {
      this.door.open();
    } else {
      console.log('Access denied!');
    }
  }

  authenticate(password) {
    return password === 'Ilon';
  }

  close() {
    this.door.close()
  }
}

const door = new SecuritySystem(new CarAccess());

door.open('Jack'); // Access denied!

door.open('Ilon'); // Opening car door

door.close(); // Closing the car door
