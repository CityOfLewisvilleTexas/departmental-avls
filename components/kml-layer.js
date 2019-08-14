Vue.component('kml-layer', VueGoogleMap.MapComponent.extend({
	template: '',
	props: ['url'],
	deferredReady: function(){
		//console.log(this);
		//console.log(this.$map);
		this.$kml = new google.maps.KmlLayer({
			url: this.url,
			map: this.$map
		});
	},
	destroyed: function(){
		// nothing to put here? ...
	}
}));