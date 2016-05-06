    var BICINGLAYER_URL = 'http://www.bcn2006.com/Bicing/resources/data/opendataBicing.out.kml';
    var CARRILLAYER_URL = 'http://www.bcn2006.com/Bicing/resources/data/Carrils%20Bici.kmz';
    var ZONA30LAYER_URL = 'http://www.bcn2006.com/Bicing/resources/data/Zones%2030.kmz';
    var ANCORLAYER_URL = 'http://www.bcn2006.com/Bicing/resources/data/Ancoratges.kmz';
    var RONDALAYER_URL = 'http://www.bcn2006.com/Bicing/resources/data/Ronda%20Verda.kmz';
    var OFF_COLOR = '#ccc';
    var ON_COLOR = '#fff';
    
    var map,bicingLayer,carrilLayer,zona30Layer,ancorLayer,rondaLayer;
	
	function initMap() {
	  map = new google.maps.Map(document.getElementById('map'), {
	    	    zoom: 16,
	    	    center: {lat: 41.397952, lng: 2.180042},
				disableDefaultUI: true
	  });
		var myloc = new google.maps.Marker({
			clickable: false,
			icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',new google.maps.Size(22,22),new google.maps.Point(0,18),new google.maps.Point(11,11)),
			shadow: null,
			zIndex: 999,
			map : map
		});
	
		if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
			var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
			myloc.setPosition(me);
			map.setCenter(me);
		}, function(error) {
			alert('error in geolocation');
		});
	  
	  carrilLayer = new google.maps.KmlLayer({
		url: CARRILLAYER_URL,
		map: map,
		preserveViewport : true,
		suppressInfoWindows : true
	  });
	  zona30Layer = new google.maps.KmlLayer({
		url: ZONA30LAYER_URL,
		map: map,
		preserveViewport : true,
		suppressInfoWindows : true
	  });
	  ancorLayer = new google.maps.KmlLayer({
		url: ANCORLAYER_URL,
		map: null,
		preserveViewport : true,
		suppressInfoWindows : true
	  });
	  rondaLayer = new google.maps.KmlLayer({
		url: RONDALAYER_URL,
		map: map,
		preserveViewport : true,
		suppressInfoWindows : true
	  });
	  bicingLayer = new google.maps.KmlLayer({
			url: BICINGLAYER_URL,
			map: map,
			preserveViewport : true
		  });
	
	  var ControlDiv = document.getElementById('Controls');
	  ControlDiv.index = 1;
	  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(ControlDiv);
	
	  var RefreshDiv = document.getElementById('refresh');
	  RefreshDiv.index = 1;
	  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(RefreshDiv);
	}
	
	function toggleLayers(btn,layer) {
	  if (layer.getMap() == null) {
	    layer.setMap(map);
		document.getElementById(btn).style.backgroundColor=ON_COLOR;
	  } else {
	    layer.setMap(null);
		document.getElementById(btn).style.backgroundColor=OFF_COLOR;
	  }
	}
	
	function refreshBicingLayer(btn,layer) {
	    layer.setMap(null);
		layer.setUrl(BICINGLAYER_URL);
	    layer.setMap(map);
	}