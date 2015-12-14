(function(window){
	'use strict';

	var HSLAColorGen = function(){

		var _hue = 0,
			_saturation = 50,
			_lightness = 50,
			_alpha = 1;

		Object.defineProperty(this, 'hue', {
			get: function(){
				return _hue;
			},
			set: function(value){
				if(value !== parseInt(value, 10) || value < 0  || value > 360){
					throw new Error('hue value must be an integer between 0 and 360');
				}
				_hue = value;
			}
		});

		Object.defineProperty(this, 'saturation', {
			get: function(){
				return _saturation;
			},
			set: function(value){
				if(value !== parseInt(value, 10) || value < 0  || value > 100){
					throw new Error('saturation value must be an integer between 0 and 100');
				}
				_saturation = value;
			}
		});

		Object.defineProperty(this, 'lightness', {
			get: function(){
				return _lightness;
			},
			set: function(value){
				if(value !== parseInt(value, 10) || value < 0  || value > 100){
					throw new Error('lightness value must be an integer between 0 and 100');
				}
				_lightness = value;
			}
		});

		Object.defineProperty(this, 'alpha', {
			get: function(){
				return _alpha;
			},
			set: function(value){

				value = parseFloat(value).toFixed(2);

				if(value < 0  || value > 1){
					throw new Error('alpha value must be an integer between 0 and 1');
				}
				_alpha = value;
			}
		});

		this.init();

	};

	HSLAColorGen.prototype = {

		init: function(){
			this.getDOMElements();
			this.createInputEvents();
			this.setHSLAStyle();
		},

		getDOMElements: function(){
			this.bodyElement = document.getElementsByTagName('body')[0];
			this.hueInput = document.getElementById('hue');
			this.saturationInput = document.getElementById('saturation');
			this.lightnessInput = document.getElementById('lightness');
			this.alphaInput = document.getElementById('alpha');
			this.codeElement = document.getElementById('code');
		},

		createInputEvents: function(){

			var self = this;

			this.hueInput.addEventListener('input', function(){
				self.hue = parseInt(this.value);
				self.setHSLAStyle();

			}, false);
			
			this.saturationInput.addEventListener('input', function(){
				self.saturation = parseInt(this.value);
				self.setHSLAStyle();

			}, false);

			this.lightnessInput.addEventListener('input', function(){
				self.lightness = parseInt(this.value);
				self.setHSLAStyle();

			}, false);

			this.alphaInput.addEventListener('input', function(){
				self.alpha = this.value;
				self.setHSLAStyle();

			}, false);
			
		},

		setHSLAStyle: function(){
			
			var hsla = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, ' + this.alpha + ');';
			this.bodyElement.setAttribute("style", 'background:'+hsla);
			if(this.lightness < 30){
				this.bodyElement.style.color = "#fff";
			}else{
				this.bodyElement.style.color = "#000";
			}
			this.codeElement.innerHTML = hsla;
			this.createScheme();
		},

		createScheme: function(){

			var defaultScheme = {};

			for (var i = 0; i < 6; i++) {
				
				var hueValue = (360 - (this.hue + (60*i)));
				if(hueValue > 0){
					defaultScheme[i] = this.hue + (60*i);
				}else{
					defaultScheme[i] = Math.abs(hueValue);
				}
			};

			this.paintScheme(defaultScheme);

		},

		paintScheme: function(scheme){

			var self = this;
			var schemeItems = document.getElementsByClassName('color-scheme__item');
			
			[].forEach.call(schemeItems, function(item, index){
				
				item.setAttribute("style", 'background:hsla(' + scheme[index] + ', ' + self.saturation + '%, ' + self.lightness + '%, ' + self.alpha + ');');
				console.log(item);
				console.log(scheme[index]);
			});

		}

	};

	window.onload = function(){
		new HSLAColorGen();
	};

})(this);