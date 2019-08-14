Vue.component('tile-cache-obj-dark', VueGoogleMap.MapComponent.extend({
	template: '',
	props: ['layer'],
	deferredReady: function(){
		var self = this;
		var url = this.layer.urldark + (this.layer.urldark.substr(this.layer.urldark.length - 1) == '/' ? '' : '/');
		
		function padZeros(number, length){
			var str = '' + number;
			while(str.length < length){
				str = '0' + str;
			}
			return str;
		}
		
		if( this.layer.urldark.toLowerCase().indexOf("mapserver/tile") > 0 ){
			this.$map.mapTypes.set(this.layer.id, new google.maps.ImageMapType({
				getTileUrl: function(coord, zoom){
					return url + zoom + '/' + coord.y + '/' + coord.x + "?" + (new Date()).getTime();
				},
				tileSize: new google.maps.Size(256, 256),
				name: "Topo (ESRI)",
				maxZoom: 19
			}));
		}
		else{
			if( url.indexOf("/layers/_alllayers") == -1 ){
				url = url + "layers/_alllayers/";
			}
			this.$map.mapTypes.set(this.layer.id, new google.maps.ImageMapType({
				getTileUrl: function(coord, zoom){
					var z = padZeros(zoom, 2);
					var x = padZeros(coord.x.toString(16), 8);
					var y = padZeros(coord.y.toString(16), 8);
					
					return url + 'L' + z + '/R' + y + '/C' + x + '.png';
					
				},
				tileSize: new google.maps.Size(256, 256),
				name: this.layer.id,
				maxZoom: 19
			}));
		}
		
		this.$map.setMapTypeId(this.layer.id);
		this.layer.isloading = false;
		
	},
	destroyed: function(){
		this.$map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
	}
}));