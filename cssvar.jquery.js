/*
 *  jquery-cssvar-fallback - v0.0.1
 *  A jquery plugin to automatically parse css vars for browsers without support.
 *
 *  Made by Lucas Leal
 *  Under MIT License
 */
;jQuery(function(){
    $.extend({
        cssVarFallback: function(options) {
			var defaults = {
				file: ""
			};
			options = $.extend( {}, defaults, options );
			$('body').append(`
				<style id="cssvartemp">
				:root{--vartest:100px;}
				#cssvartest{display:none;width:0px;width:var(--vartest);}
				</style>`);
			$('body').append('<div id="cssvartest">cssvartest</div>');
			var width = $('#cssvartest').css('width');
			$('#cssvartest').remove();
			$('#cssvartemp').remove();
			if (width=='100px'){
				return true;
			}else{
				return false;
			}
        }
    });
});
