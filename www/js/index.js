var intervalID;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // Update the loading screen....
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        $('#horseRace').on("pageshow", function () {
        	intervalID = setInterval(function () { movePonies(); }, 1000);
        });

        $.mobile.changePage("#Home", { transition: "fade" });
    },


};

function movePonies() {
	var candidates = [];
	$('.pony').each(function (index) {
		var padLeft = this.style['padding-left'];
		if (padLeft == '') {
			this.style['padding-left'] = '0%';
			padLeft = '0%';
		}
		var start = padLeft.substring(0, padLeft.length - 1);
		var end = parseInt(start) + getRandomInt(5, 10);
		// potential winner
		if (end > 90) {
			clearInterval(intervalID);
			candidates.push({ "Name": this.id, "distance": end });
		}

		this.style['padding-left'] = end + '%';
		
		
	});

	// if more than one crosses the finish line we pick the one that went 
	// the furthest. If there's a tie just pick the first one. 
	if (candidates.length > 0) {
		var max = 0;
		var bestIndex = 0;
		if (candidates.length > 1) {
			for (var i = 0; i < candidates.length; i++) {
				if (candidates[i].distance > max) {
					max = candidates[i].distance;
					bestIndex = i;
				}
			}
		}
		else {
			bestIndex = 0;
		}
		alert("And the winner is: " + candidates[bestIndex].Name);
	}
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}