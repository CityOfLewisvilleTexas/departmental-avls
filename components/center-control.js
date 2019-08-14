Vue.component('center-control', VueGoogleMap.MapComponent.extend({
	props: '',
	template: '',
	deferredReady: function(){
		var self = this;
		
		var controlDiv = document.createElement('div');
		
		var controlUI = document.createElement('div');
		controlUI.className += ' controlUI';
		controlUI.title = "Click to re-center the map";
		controlDiv.appendChild(controlUI);
		
		var controlText = document.createElement('div');
		controlText.className += 'controlText controlBold';
		controlText.innerHTML = "Center Map";
		controlUI.appendChild(controlText);
		controlUI.addEventListener('click', function() {
			if(app.station == '' || app.station == 'ALL'){
				var bounds = new google.maps.LatLngBounds();
				bounds.extend(app.centerSW);
				bounds.extend(app.centerNE);
				self.$map.fitBounds(bounds);
			}
			else{
				self.$map.panTo(app.centerDefault);
				self.$map.setZoom(13);
			}
        });
		
		controlDiv.index = 2;
		this.$map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlDiv);
	},
	destroyed: function(){
	}
}));