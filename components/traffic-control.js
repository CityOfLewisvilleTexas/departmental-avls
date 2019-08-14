Vue.component('traffic-control', VueGoogleMap.MapComponent.extend({
	props: '',
	template: '',
	deferredReady: function(){
		var self = this;
		
		var controlDiv = document.createElement('div');
		controlDiv.id = "traffic"
		if(app.showTrafficLayer){
			controlDiv.className = 'controlBold';
		}
		
		var controlUI = document.createElement('div');
		controlUI.className = 'controlUI';
		controlUI.title = "Click to toggle traffic layer";
		controlDiv.appendChild(controlUI);
		
		var controlText = document.createElement('div');
		controlText.className = 'controlText';
		controlText.innerHTML = "Traffic Layer";
		controlUI.appendChild(controlText);
		controlUI.addEventListener('click', function() {
			app.showTrafficLayer = !(app.showTrafficLayer);
        });
		
		controlDiv.index = 1;
		this.$map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv);
	},
	destroyed: function(){
	}
}));