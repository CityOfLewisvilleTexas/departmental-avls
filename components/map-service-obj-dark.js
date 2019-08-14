Vue.component('map-service-obj-dark', VueGoogleMap.MapComponent.extend({
	template: '',
	props: ['layer'],
	deferredReady: function(){
		var self = this;
		//console.log(this.$map);
		
		// Added layerids to handle error, haven't tested functionality
		if (this.layer.layerids){
			this.layer.layerids.split(",");
		}
		
		this.$service = new gmaps.ags.MapService(this.layer.urldark, {
			layerids: self.layer.layerids
		});
		
		this.$overlay = new gmaps.ags.MapOverlay(this.$service, {
			opacity: self.layer.opacity,
			__ZINDEX: self.layer.toggleOrder,
			__doOnDrawStart: function(){                                  // <---Custom property added to arcgislink.js module by JKIRKLAND 10/2016										
				setTimeout(function(){
					self.layer.isloading = true;
				},1)
			},									
			__doOnDrawEnd: function(){                                    // <---Custom property added to arcgislink.js module by JKIRKLAND 10/2016										
				setTimeout(function(){
					if(self.layer.legendshow.toLowerCase() == "true"){
						//console.log(self.$service.layers[0].legend);
						self.layer.legend = self.$service.layers[0].legend;
					}
					self.layer.isloading = false;
				},1)
			}
		});
		
		this.$overlay.setMap(this.$map);
		
	},
	destroyed: function(){
		this.$overlay.setMap(null);
	}
}));