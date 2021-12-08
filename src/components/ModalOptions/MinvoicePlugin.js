import { hubConnection } from 'signalr-no-jquery';

var url = "http://localhost:19898/signalr";
var options = {
    useDefaultPath: false
}
const connection = hubConnection(url, options);
const hubProxy = connection.createHubProxy('invoiceHub', options);

hubProxy.on('resCommand', function (message) {
    console.log(message);
});
connection.disconnected(function () {
    console.log('Connection disconnected');
    setTimeout(function () {
        connection.start();
    }, 2000);
});

connection.start()
    .done(function () { console.log('Now connected, connection ID=' + connection.id); })
    .fail(function () { console.log('Could not connect'); });


export function PluginMV() {
    return hubProxy;
}
export function PluginConn(){
    return connection;
}
