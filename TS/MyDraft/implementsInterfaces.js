var FileClient = /** @class */ (function () {
    function FileClient() {
    }
    FileClient.prototype.read = function (url) {
        console.log('read() =>', url);
        // logic ...
    };
    FileClient.prototype.write = function (data) {
        console.log('write() =>', data);
        // logic ...
    };
    return FileClient;
}());
var fileZila = new FileClient();
fileZila.read('www.example.com');
fileZila.write('mock data ...');
