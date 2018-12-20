/*
 *  jquery-cssvar-fallback - v1.0.0
 *  A jquery plugin to automatically parse css vars for browsers without support.
 *
 *  Made by Lucas Leal
 *  Under MIT License
 */
;jQuery(function(){
    $.extend({
        cssVarFallback: function(options) {

        	var getVars = function(str){
        		var regex = /--([A-z0-9:\s-_]+);/gm;
        		var m;
        		var format = [];

        		while ((m = regex.exec(str)) !== null) {
        		    if (m.index === regex.lastIndex) {
        		        regex.lastIndex++;
        		    }
        		    format.push( [ m[1].split(':')[0].trim() , m[1].split(':')[1].trim() ] );
        		}
        		return format;
        	}

        	var fix = function(file){
				$.ajax({
					method: "GET",
					url: file
				})
				.done(function(str) {
					var regex = '';
					var vars = getVars(str);
					for (var i = vars.length - 1; i >= 0; i--) {
						regex = new RegExp('var\\(\\s*--'+vars[i][0]+'\\s*\\)',"gm");
						str = str.replace(regex,vars[i][1]);
					}
					$('body').append('<style>'+str+'</style>');
				})
				.fail(function() {
					console.log('cssVarFallback:: it was not possible to download css file');
				});
        	}

			var defaults = {
				file: ""
			};
			options = $.extend( {}, defaults, options );
			$('body').append(
				'<style id="cssvartemp">'+
				':root{--vartest:100px;}'+
				'#cssvartest{display:none;width:0px;width:var(--vartest);}'+
				'</style>');
			$('body').append('<div id="cssvartest">cssvartest</div>');
			var width = $('#cssvartest').css('width');
			$('#cssvartest').remove();
			$('#cssvartemp').remove();
			if (width=='100px'){
				console.log('cssVarFallback:: browser already has support for var()');
			}else{
				if (options.file!==''){
					fix(options.file);
				}else{
					console.log('cssVarFallback:: no input css file');
				}
			}
        }
    });
});
