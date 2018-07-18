var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 3000);
console.log("Server started");



// start
var device_list = JSON.stringify({});
var devices = {};
var epochs = [];
var prevDevice = "";

app.post("/:device_id/:epoch_time", function (request, response) {
    console.log("Initializing device");

    var curDevice = request.params.device_id;

    if (curDevice != prevDevice) {
        prevDevice = curDevice;
        epochs = [];
    }

    epochs.push(request.params.epoch_time);

    var key = request.params.device_id;
    devices[key] = epochs;

    device_list = JSON.stringify(devices);
    response.end();
});

app.post("/clear_Data", function (request, response) {
    console.log("clearing data");

    device_list = JSON.stringify({});

    response.end();
});

app.get("/devices", function (request, response) {
    console.log("getting devices");
    response.end(device_list);
});

app.get("/:device_id/:epoch_time", function(request, response) {
    console.log("sending data for device");

    var epoch = Math.round(new Date(request.params.epoch_time).getTime()/1000.0);
    var tomorrow = new Date(request.params.epoch_time);
    tomorrow.setHours(tomorrow.getHours() + 24);
    tomorrow = Math.round(new Date(tomorrow).getTime()/1000.0);

    if (request.params.device_id == "all") {
        var list = JSON.parse(device_list)
        var result = [];
        
        for (var x in list) {
            for (var y in list[x]) {
                if (epoch <= list[x][y] && list[x][y] < tomorrow)
                    result.push(list[x][y]);
            }
        }
        
        response.end(JSON.stringify({result}));
    } else {
        var result = JSON.stringify({epoch});
        response.end(result);
    }
});

app.get("/:device_id/:from/:to", function(request, response) {
    console.log("sending data for device with range of dates");

    var date = new Date(request.params.from)
    var validFrom = (date instanceof Date && !isNaN(date.valueOf()));

    date = new Date(request.params.to)
    var validTo = (date instanceof Date && !isNaN(date.valueOf()));

    var from;
    var to;
    var inclusive = false;

    if (validFrom && validTo) {
        from = Math.round(new Date(request.params.from).getTime()/1000.0);
        to = Math.round(new Date(request.params.to).getTime()/1000.0);
    } else if (!validFrom && !validTo) {
        from = request.params.from;
        to = request.params.to;
    }

    var list = JSON.parse(device_list);
    var result = [];

    if (request.params.device_id == "all") {
        // var list = JSON.parse(device_list);

        if (to == Object.keys(list)[Object.keys(list).length-1]) {
            inclusive = true;
        }

        for (var x in list) {
            for (var y in list[x]) {
                if (inclusive) {
                    if (from <= list[x][y] && list[x][y] <= to)
                        result.push(list[x][y]);
                } else {
                    if (from <= list[x][y] && list[x][y] < to)
                        result.push(list[x][y]);
                } 
            }
        }

        response.end(JSON.stringify({result}));
    } else {
        if (list.hasOwnProperty(request.params.device_id)) {
            list = list[request.params.device_id];

            if (to == Object.keys(list)[Object.keys(list).length-1]) {
                inclusive = true;
            }
    
            for (var x in list) {
                if (inclusive) {
                    if (from <= list[x] && list[x] <= to)
                        result.push(list[x]);
                } else {
                    if (from <= list[x] && list[x] < to)
                        result.push(list[x]);
                }
            }
            response.end(JSON.stringify(result));
        } else {
            response.end(JSON.stringify(result));
        }
    }
});