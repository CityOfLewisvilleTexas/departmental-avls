Vue.component('traffic-layer', VueGoogleMap.MapComponent.extend({
	template: '',
	props: ['layer'],
	deferredReady: function(){
		var self = this;
		this.$trafficLayer = new google.maps.TrafficLayer();
		this.$trafficLayer.setMap(this.$map);
	},
	destroyed: function(){
		this.$trafficLayer.setMap(null);
	}
}));