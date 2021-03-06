var bikeApp = {};

bikeApp.init = function(){
  $('button').on('click', function(){

  bikeApp.level();

  });
}; 


bikeApp.dataCall = function() {
	$.ajax({
		url:'https://api.forecast.io/forecast/dd765a15b0032d14535547f74747db42/43.648566,-79.397875', 
		type:'GET',
		dataType: 'jsonp',
		data: {
			callback: 'callback',
			units: 'ca',
			exclude: 'alerts'
		},
		success: bikeApp.parseData
	});
};

bikeApp.parseData = function(responseData){
	bikeApp.precipData = responseData.hourly.data[0].precipIntensity;
	// bikeApp.futurePrecip = responseData.hourly.data[8].precipIntensity;
	
	bikeApp.tempData = responseData.hourly.data[0].apparentTemperature;

	bikeApp.windSpeed = responseData.hourly.data[0].windSpeed; 

	bikeApp.result();

	// if (bikeApp.level == true){
	// 	$('#result').text('youre hardcore. ride on, bike warrior.')
	// 	console.log('HARDCORE');
	// 	$('#resultimg').attr({
	// 		  src: 'images/thumbsup.png',
	// 		  alt: 'thumbsup'
	// 	});

	// } else if(bikeApp.level == false){
	// 	bikeApp.result();		
	// 	console.log('WUSSY')
	// }
};

bikeApp.evalLevel = function(){
	var level = bikeApp.level();
  	if (level === true) {
    console.log('HARDCORE!')
	}
};


bikeApp.level = function(){
	if( $('#level2').is(':checked') ) {
    return true;

  } else if ( $('#level1').is(':checked') ) {
    return false;
  }
  
};

bikeApp.hardcoreResult = function(){
	console.log('<YES class=""></YES>')
};

bikeApp.result = function(){
	if (bikeApp.precipData === 0 && bikeApp.tempData > 10){
	$('#result').text('Go for it! Easy, breezy ride awaits.');
	$('#resultimg').attr({
		  src: 'images/thumbsup.png',
		  alt: 'thumbsup'
	});

	// temp things
	} else if (bikeApp.tempData < 9){
	console.log('go for it!');
	$('#result').text('a little nippy, but it aint no thang. put on your best jacket and get out there!');
	$('#resultimg').attr({
		  src: 'images/warning.png',
		  alt: 'warning'
	});


	// rain things
	} else if (bikeApp.precipData > 0.1) {
	$('#result').text('a little drizzle never hurt anyone! buck up and get riding!');
	$('#resultimg').attr({
		  src: 'images/thumbsup.png',
		  alt: 'thumbsup'
	});

	} else if (bikeApp.precipData > 0.5) {
	$('#result').text('tread carefully! time to pull out that slicker, gunna be a wet one!.');
	$('#resultimg').attr({
		  src: 'images/warning.png',
		  alt: 'warning'
	});

	// wind

	} if (bikeApp.windSpeed > 10) {
	$('#result2').text('gusty too, get ready to work for it!')


	} else {
		$('#result').text('wouldnt do it if we were you. going to be a rough ride!');
		$('#resultimg').attr({
			  src: 'images/x.png',
			  alt: 'x'
		});

	}
};


$(document).ready(function(){
  bikeApp.init();
});