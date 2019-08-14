Vue.component('night-control', VueGoogleMap.MapComponent.extend({
	props: '',
	template: '',
	deferredReady: function(){
		var self = this;
		
		var controlDiv = document.createElement('div');
		controlDiv.id = "night"
		
		var controlUI = document.createElement('div');
		controlUI.className = 'controlUI';
		controlUI.title = "Click to toggle night mode";
		controlDiv.appendChild(controlUI);
		
		var controlText = document.createElement('div');
		controlText.className = 'controlText';
		controlText.innerHTML = "Night Mode";
		controlUI.appendChild(controlText);
		controlUI.addEventListener('click', function() {
			app.nightMode = !(app.nightMode);
        });
		
		controlDiv.index = 1;
		this.$map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
	},
	destroyed: function(){
	}
}));