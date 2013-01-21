/*
 * jQuery WebTools Plugin
 * http://
 *
 * Copyright 2012, Joel Dies
 * Author: Joel Dies
 * Version 0.0.1
 */

 /**
  * @fileOverview WebTools Plugin for jQuery
  * @author Joel T. Dies
  * @version: 0.1.3
  */
(function (jQuery) {
    
    /**
     * jQuery definition to anchor JsDoc comments.
     *
     * @see http://jQuery.com/
     * @name jQuery
     * @class jQuery Library
     */

    /**
     * jQuery 'fn' definition to anchor JsDoc comments.
     *
     * @see http://jQuery.com/
     * @name fn
     * @class jQuery Library
     * @memberOf jQuery
     */

    /**
     * jScrollPane definition to anchor JsDoc comments.
     *
     * @see http://jscrollpane.kelvinluck.com/
     * @name jscrollpane
     * @class jScrollPane
     * @memberOf jQuery
     */

    /**
     * Mouse Wheel definition to anchor JsDoc comments.
     *
     * @see http://brandonaaron.net
     * @name mousewheel
     * @class Mouse Wheel
     * @memberOf jQuery
     */

    /**
     * Mouse Wheel Intent definition to anchor JsDoc comments.
     *
     * @name mwheelIntent
     * @class Mouse Wheel Intent
     * @memberOf jQuery
     */
     
    var methods = {
        /**
         * Base initialization method
         *
         * @memberOf jQuery.webtools
         */
        init : function () {
            methods.buildOptions();
            methods.buildTopMenu();
        },

        /**
         * Private log function
         *
         * @memberOf jQuery.webtools
         */
        log : function(paramaters) {
            return;
            if (window.console && !console) console = window.console;
            if (console && console.log) {
                console.log(paramaters);
            }
        },

        /**
         * Creates an instance of the top menu panel.
         *
         * @memberOf jQuery.webtools
         * @param {object} options An object to hold various sub options.
         */
        buildTopMenu : function() {
            //"width": (jQuery('body').width()-14)
            var topMenuContainer = jQuery(document.createElement('section')).attr("id", "webtools_topcontainer").addClass('webtools gradient');
            jQuery("body").prepend(topMenuContainer);
            var topmovedistance = parseInt($(window).height()) - 37;
            topMenuContainer.animate({'top': (topmovedistance) + 'px'}, 750, function() { $(this).css({"top": '', 'bottom': '0px'}) })
            var tltriangle = jQuery(document.createElement('div')).addClass('tltriangle').appendTo(topMenuContainer);
            var brtriangle = jQuery(document.createElement('div')).addClass('brtriangle').appendTo(topMenuContainer);

            jQuery(document.createElement('section')).attr("id", "webtools_topcontainer").addClass('webtools gradient brtriangle');
            var topTitle = jQuery(document.createElement('span')).text("WEBTOOLS - ");
            var topPageTitleInput = jQuery(document.createElement('input')).attr({
                "id": "webtool_pagetitle_input",
                "type": "text"
            }).blur(function() {
                console.log($(this).val())
                $('#webtools_pagetitle').text($(this).val()).show();
                $(this).appendTo('body').hide()
            }).appendTo('body').hide();
            var topPageTitle = jQuery(document.createElement('span'))
                .attr({"id":"webtools_pagetitle"}).text('Demo Page')
                .css({"color": "rgb(191,255,255)", "margin-left": "4px", "text-shadow": "1px 1px #444"})
                .click(function() {
                    $('#webtool_pagetitle_input').show().val($(this).text()).appendTo("#webtools_topcontainer").focus()
                    $(this).hide()
                });
            var topToolbar = jQuery(document.createElement('span')).css({"float": "right"}).attr({"id": "webtools-toolbar"});

            var topOptions = jQuery(document.createElement('a'))
                .addClass('toolbar-options')
                .append(jQuery(document.createElement('span')).addClass('Options smbtn')).click(function() {
                    jQuery("a.TopbarOptions").toggleClass("toggled");
                    jQuery('.Options').toggleClass('toggled')
                    
                    jQuery('#webtools_options').toggle();
                    jQuery('#webtools_options_modal').toggle();
                    jQuery('#webtools-toolbar a span').not('.Options').toggle();
            });

            var topVR = jQuery(document.createElement('span')).addClass("vr").css({"float": "right", "margin-left": "16px"}).html('&nbsp;');
            //var topLogout = jQuery(document.createElement('div')).attr({"id": "logout"}).text('Logout').css({"float": "right"});

            //topLogout
                //.append(jQuery(document.createElement('span')).addClass("smbtn"));

            topMenuContainer
                //.append(topLogout)
                .append(topVR)
                .append(topToolbar)
                .append(topTitle)
                .append(topPageTitle);

            topToolbar
                .append(topOptions)
        },

        buildOptions : function() {
            jQuery('body')
                .append('<div id="webtools_options" class="gradient gray"></div>')
                .append('<div id="webtools_options_modal"></div>')
            
            jQuery('#webtools_options').hide()
                .append('<span id="webtools_options_title">Webtools Options</span>')
                .append('<div id="webtools_options_close">x</div>')
                .append('<fieldset id="webtools-general-options"><legend>General Options</legend></fieldset>')
                
            jQuery('#webtools_options_modal').hide()
            jQuery('#webtools_options_close, #webtools_options_modal').click(function() {
                jQuery('#webtools_options').hide();
                jQuery('#webtools_options_modal').hide();
                jQuery("#webtools-toolbar a.toolbar-options span").removeClass("toggled");
                jQuery('#webtools-toolbar a span').not('.Options').show();
            });
            
        }
    }

    /**
     * WebTools Class
     *
     * @namespace WebTools
     * @memberOf jQuery
     * @param {object} el Element
     * @param {object} options Options
     * @param {object} modes Avalible modes
     * @return {jQuery} chainable jQuery class
     * @requires jQuery 1.7
     * @requires jScrollPane
     * @requires Mouse Wheel
     * @requires Mouse Wheel Intent
     */
    jQuery.webtools = function (el, options, modes) {
        var defaultmodes = {
            "webtools": 0, // 0 = Idle, 1 = Ready, 2 = Drawing, 3 = End
            "Move": 0, // 0 = Idle, 1 = Ready, 2 = Moving, 3 = End
            "Resize": 0 // 0 = Idle, 1 = Ready, 2 = Resizing, 3 = End
        };
        var defaults = {};
        var base = this; // To avoid scope issues, use 'base' instead of 'this' to reference this class from internal events and functions.
        var options = jQuery.extend(defaults, options);
        var modes = jQuery.extend(defaultmodes, modes);

        base.jQueryEL = jQuery(el); // Access to jQuery version of element
        base.el = el; // Access to DOM version of element

        base.jQueryEL.data("webtools", base); // Add a reverse reference to the DOM object

        jQuery(window).resize(function() {
            $('#container').height($(window).height() - 36)
            if ($('#container').css("overflow/overflowX/overflowY")) {
                $('#container iframe').css({'width': '1006px'})
            }
            else {
                $('#container iframe').css({'width': '1023px'})
            }

        });

        /**
         * Creates an instance of.
         *
         * @memberOf jQuery.webtools
         * @param {object} options An object to hold various sub options.
         */
        jQuery(document).ready(function() {
            /*
            jQuery(window).resize(function() {
                jQuery('body div#container ').css({
                    "height" : (jQuery(this).parent().css("height")) - 80 + 'px'
                });
            });
        */
            methods.init(options);// Run initializer
        });
    };

    /**
     * All avalible options.
     *
     * @memberOf jQuery.webtools
     * @ignore
     */
    jQuery.webtools.defaultOptions = {
        "webtools"      : null,
        "keyctrl"       : false,
    };

    /**
     * A jQuery Wrapper Function to append WebTools formatted text to a
     * DOM object converted to HTML.
     *
     * @namespace WebTools
     * @memberOf jQuery.fn
     * @param {object}
     * @return {jQuery} chainable jQuery class
     */
    jQuery.fn.webtools = function (options) {
        return this.each(function() {
            (new jQuery.webtools(this, options));
        });
    };
    
    jQuery.fn.webtools.setCookie = function(c_name,value,exdays) {
        var exdate=new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
            document.cookie=c_name + "=" + c_value;
    }
        
    jQuery.fn.webtools.getCookie = function(c_name) {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++) {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name)
                return unescape(y);
        }
    }

    /**
     * This function breaks the chain, but returns the webtools if it has been
     * attached to the object.
     *
     * @namespace Get webtools
     * @memberOf jQuery.fn
     */
    jQuery.fn.getwebtools = function() {
        this.data("webtools");
    };
})(jQuery);
