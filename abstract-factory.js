
(function() {

    var MockWidgetFactory = function(widget) {
        var CLASS_PREF = 'MockWidget_';
        return new this[CLASS_PREF + widget]();
    };

    var WidgetFactory = function(widget) {
        var CLASS_PREF = 'Widget_';
        return new this[CLASS_PREF + widget]();
    };

    // Abstract
    var Factory = (function() {
        var _widgetFactory = WidgetFactory;
        return {
            setFactory: function(factory) {
                _widgetFactory = factory;
            },
            widget: function(widget) {
                var instance = _widgetFactory(widget);
                instance.init();
                return instance;
            }
        }
    }());

    Widget_Slideshow = function() {
        return {
            init: function() {
                console.log('Widget slideshow initialized');
            }
        }
    };
    MockWidget_Slideshow = function() {
        return {
            init: function() {
                console.log('Mock widget slideshow initialized');
            }
        }
    };


    var widget = Factory.widget('Slideshow');
    Factory.setFactory(MockWidgetFactory);
    var widget2 = Factory.widget('Slideshow');

}());
