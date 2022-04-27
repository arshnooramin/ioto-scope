//document.getElementById("datetime").innerHTML = "WebSocket is not connected";

var websocket = new WebSocket('ws://'+location.hostname+'/');
document.getElementsByName("mode")[0].checked = true;
document.getElementsByName("level")[0].checked = true;
var selected = ""

// function sendMsg() {
// 	websocket.send("O");
// }

var arrayLength = 30
var dataArray = []

var curr = 0;
var cnt = 0;

TESTER = document.getElementById('tester');
Plotly.newPlot( TESTER, [{
	y: dataArray, mode: 'lines',}],  {
	paper_bgcolor: 'hsl(0, 0%, 21%)',
	plot_bgcolor:'hsl(0, 0%, 21%)',
	margin: { t: 0, b:20, r:0, l:20 },
	xaxis: {
	  range: [0, arrayLength],
	  zeroline: false,
	//   showline: true,
	  color: '#fff',
	},
	yaxis: {
	  range: [-2.5, 3],
	  zeroline: false,
	//   showline: true,
	  color: '#fff',
	}
  }, {displayModeBar: false} );

var getInput = setInterval(function() {	
	var x = document.getElementById("pins1").children;
	var i;
	for (i = 0; i < x.length; i++) {
		let pin = x[i].id.split("_")[0];
		console.log(pin)
		if (document.getElementById(pin) != null) {
			if (document.getElementById(pin).classList.contains('is-link')) {
				console.log('checking input at ', x[i].id);
				websocket.send('G ' + x[i].id);
			}
		}
	}
	var x = document.getElementById("pins2").children;
	var i;
	for (i = 0; i < x.length; i++) {
		let pin = x[i].id.split("_")[0];
		console.log(pin)
		if (document.getElementById(pin) != null) {
			if (document.getElementById(pin).classList.contains('is-link')) {
				console.log('checking input at ', x[i].id);
				websocket.send('G ' + x[i].id);
			}
		}
	}
	websocket.send('A GPIO2')
	// Plotly.extendTraces(TESTER, {
	// 	y: [[rand()]]
	//   }, [0])
	
	if(++cnt === 100) clearInterval(interval);
  }, 100);

function openModal() {
	document.getElementById('modal-title').innerHTML = "Setting " + event.target.id;
	selected = event.target.id;
	document.getElementById("modal-js").classList.add("is-active");
}

function closeModal() {
	document.getElementById("modal-js").classList.remove("is-active");
}

function update() {
	var data = "";
	var mode = document.getElementsByName("mode");
	if (mode[0].checked) { // Reset
		document.getElementById(selected).classList.remove("is-link", "is-warning");
		document.getElementById(selected).classList.add("is-black");
		data = "R ";
	}
	else if (mode[1].checked) {
		document.getElementById(selected).classList.remove("is-link", "is-black");
		document.getElementById(selected).classList.add("is-warning");
		data = "O ";
	}
	else if (mode[2].checked) {
		document.getElementById(selected).classList.remove("is-warning", "is-black");
		document.getElementById(selected).classList.add("is-link");
		data = "I ";
	}
	data += selected;
	var x = document.getElementsByName("level");
	var i;
	for (i = 0; i < x.length; i++) {
		if (x[i].checked) {
			document.getElementById(selected + "_span").innerHTML = x[i].value;
			if (x[i].value == "HIGH") {
				data += " 1";
				document.getElementById(selected + "_span").classList.remove("is-black", "is-danger");
				document.getElementById(selected + "_span").classList.add("is-success");
			} else if (x[i].value == "LOW") {
				data += " 0";
				document.getElementById(selected + "_span").classList.remove("is-black", "is-success");
				document.getElementById(selected + "_span").classList.add("is-danger");
			} else if (x[i].value == "None") {
				data += " 0";
				document.getElementById(selected + "_span").classList.remove("is-danger", "is-success");
				document.getElementById(selected + "_span").classList.add("is-black");
			}
		}
	}
	websocket.send(data);
	closeModal();
}


function getTextValueByName(name) {
	var textbox = document.getElementsByName(name)
	//console.log('name=', name);
	//console.log('textbox=', textbox);
	//console.log('textbox.length=', textbox.length);
	ret = new Array();
	for (var i=0;i<textbox.length;i++) {
		//console.log('textbox[%d].value=%s', i, textbox[i].value);
		ret[i] = textbox[i].value;
	}
	//console.log('typeof(ret)=', typeof(ret));
	//console.log('ret=', ret);
	return ret;
}


function sendText(name) {
	console.log('sendText');
/*
	var array = ["11", "22", "33"];
	var data = {};
	//data["foo"] = "abc";
	data["foo"] = array;
	var array = ["aa"];
	data["bar"] = array;
	data["hoge"] = 100;
	json_data = JSON.stringify(data);
	console.log(json_data);
*/

	var data = {};
	data["id"] = name;
	data["host"] = getTextValueByName("host");
	console.log('data=', data);
	data["port"] = getTextValueByName("port");
	data["clientId"] = getTextValueByName("clientId");
	data["username"] = getTextValueByName("username");
	data["password"] = getTextValueByName("password");
	data["topic"] = getTextValueByName("topic");
	data["qos"] = getTextValueByName("qos");
	data["payload"] = getTextValueByName("payload");
	console.log('data=', data);
	json_data = JSON.stringify(data);
	console.log('json_data=' + json_data);
	websocket.send(json_data);

/*
	var data = {};
	data["id"] = "button";
	data["name"] = name;
	console.log('name=', name);
	console.log('data=', data);
	json_data = JSON.stringify(data);
	console.log('json_data=' + json_data);
	websocket.send(json_data);
*/
}

websocket.onopen = function(evt) {
	console.log('WebSocket connection opened');
	var data = {};
	data["id"] = "init";
	console.log('data=', data);
	json_data = JSON.stringify(data);
	console.log('json_data=' + json_data);
	websocket.send(json_data);
	document.getElementById("status").innerHTML = "Connected";
	document.getElementById("status").classList.add("is-success");
	document.getElementById("status").classList.remove("is-danger");
}

websocket.onmessage = function(evt) {
	var msg = evt.data;
	console.log("msg=" + msg);
	var values = msg.split('\4'); // \4 is EOT
	console.log("values=" + values);
	switch(values[0]) {
		case 'ID':
			console.log("ID values[1]=" + values[1]);
			console.log("ID values[2]=" + values[2]);
			console.log("ID values[3]=" + values[3]);
			break;

		case 'MQTT':
			console.log("MQTT values[1]=" + values[1]);
			console.log("MQTT values[2]=" + values[2]);
			const msg = document.createElement('div')
			msg.className = 'message-body';
			msg.innerText = values[2] + '\nOn topic: ' + values[1];
			document.getElementById('article').appendChild(msg);
			break;
		case 'IN':
			if (values[2] == '0') {
				document.getElementById(values[1] + "_span").innerHTML = "LOW";
				document.getElementById(values[1] + "_span").classList.remove("is-black", "is-success");
				document.getElementById(values[1] + "_span").classList.add("is-danger");
			} else if (values[2] == '1') {
				document.getElementById(values[1] + "_span").innerHTML = "HIGH";
				document.getElementById(values[1] + "_span").classList.remove("is-black", "is-danger");
				document.getElementById(values[1] + "_span").classList.add("is-success");
			} else {
				document.getElementById(values[1] + "_span").innerHTML = "None";
				document.getElementById(values[1] + "_span").classList.remove("is-success", "is-danger");
				document.getElementById(values[1] + "_span").classList.add("is-black");
			}
			break;
		case 'AN':
			dataArray = dataArray.concat(parseInt(values[2])/1000)
			if (curr == arrayLength) {
				dataArray.splice(0, 1)
			}
			else {
				curr++;
			}
		  
			var data_update = {
			  y: [dataArray]
			};
		  
			Plotly.update(TESTER, data_update)
			// Plotly.extendTraces(TESTER, {
			// 	y: [[parseInt(values[2])/1000]]
			//   }, [0])
			break;
				
/*
		case 'NAME':
			console.log("NAME values[1]=" + values[1]);
			console.log("NAME values[2]=" + values[2]);
			console.log("NAME values[3]=" + values[3]);
			var textbox = document.getElementsByName(values[1]);
			console.log('textbox[0]=', textbox[0]);
			textbox[0].value = values[3];
			break;
*/
		default:
			break;
	}
}

websocket.onclose = function(evt) {
	console.log('Websocket connection closed');
	document.getElementById("status").innerHTML = "Disconnected";
	document.getElementById("status").classList.add("is-danger");
	document.getElementById("status").classList.remove("is-success");
	//document.getElementById("datetime").innerHTML = "WebSocket closed";
}

websocket.onerror = function(evt) {
	console.log('Websocket error: ' + evt);
	document.getElementById("status").innerHTML = "Disconnected";
	document.getElementById("status").classList.add("is-danger");
	document.getElementById("status").classList.remove("is-success");
	//document.getElementById("datetime").innerHTML = "WebSocket error????!!!1!!";
}
