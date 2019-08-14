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
			self.$map.panTo({lat: 33.04874516100256, lng: -96.9571323598633});
			self.$map.setZoom(13);
        });
		
		controlDiv.index = 2;
		this.$map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlDiv);
	},
	destroyed: function(){
	}
}));