interface Reader<T> {
  read(url: T);
}

interface Writer<T> {
  write(data: T);
}

class FileClient implements Reader<string>, Writer<string> {
  
  read(url) {
    console.log('read() =>', url);
    // logic ...
  }
  
  write(data) {
    console.log('write() =>', data);
    // logic ...
  }
}

const fileZila = new FileClient();

fileZila.read('www.example.com');
fileZila.write('mock data ...');