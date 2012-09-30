/* 
 * Specific transition
 */


var Transition = function(elem,obj,keyframeprefix) {
    
/*  --------------------------------------------------
    Global
    -------------------------------------------------- */
    var target = elem,
        _target = elem[0],
        args = {}, 
        animID;

/*  --------------------------------------------------
    Init
    -------------------------------------------------- */
    
    var init = function() {
        
        setArgs();
        
        animID = makeID();
        
//        setAnimationStyles();
        setDefaults();
        
    };
    
    var setArgs = function() {
        for(var fld in obj) {
            args[fld] = obj[fld];
        }
    };
    
    this.getArgs = function() {
        return args;
    };
    
    var makeID = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    
/*  --------------------------------------------------
    Generate Animation
    -------------------------------------------------- */
    
//    var setAnimationStyles = function() {
//        setDefaults();
//    };
    
    // TODO: add support for rotation, etc.
    this.updateKeyframes = function(pArgs) {

        var from = {
            x: pArgs.x || _target.offsetLeft,
            y: pArgs.y || _target.offsetTop,
            opacity: pArgs.alpha || _target.style.opacity,
            width: pArgs.width || _target.offsetWidth,
            height: pArgs.height || _target.offsetHeight,
            color: pArgs.color || target.css('color'),
            backgroundColor: pArgs.backgroundColor || target.css('background-color')
        };
        var to = args;
        return genKeyframeRule(from, to);
    };
    
    this.getKeyframeRule = function() {

        var from = {
            y: _target.offsetTop,
            x: _target.offsetLeft,
            opacity: _target.style.opacity,
            width: _target.offsetWidth,
            height: _target.offsetHeight,
            color: target.css('color'),
            backgroundColor: target.css('background-color')
        };
        
        var to = args;

        return genKeyframeRule(from, to);
    };
    
    var genKeyframeRule = function(from, to) {
        var kf = '@' + keyframeprefix + 'keyframes ' + animID + ' { '+
                                'from { top: '+ from.y +'px; '+ 
                                        'left: '+ from.x +'px; '+ 
                                        'opacity: '+ from.opacity +'; '+ 
                                        'width: '+ from.width +'px; '+ 
                                        'height: '+ from.height +'px; '+
                                        'color: '+ from.color +'; '+
                                        'background-color: '+ from.backgroundColor +'; '+
                                    '} '+
                                'to {   top: '+ to.y +'px; '+ 
                                        'left: '+ to.x +'px; '+ 
                                        'opacity: '+ to.alpha +'; '+ 
                                        'width: '+ to.width +'px; '+ 
                                        'height: '+ to.height +'px; '+ 
                                        'color: '+ to.color +'; '+
                                        'background-color: '+ to.backgroundColor +'; '+
                                    '} '+
                            '}';
                        
        return kf;
    };
    
    this.getStyleRule = function() {
        
//        addCallback();
        
        return animID + ' '+args.time+'s '+args.transition+' ' + args.delay + 's '+args.repeat + ' ' + args.fillMode;
    };
    
//    var addCallback = function() {
//        _target.addEventListener('')
//    };
    
    // TODO: set defaults for color, background-color, border
    var setDefaults = function() {
        
//        console.dir(_target);
        

        args.transition =           (typeof args.transition === "undefined") ? 'linear' : args.transition;

        args.repeat =               (typeof args.repeat === "undefined") ? 1 : args.repeat;

        args.x =                    (typeof args.x === "undefined") ? _target.offsetLeft : args.x;
        
        args.y =                    (typeof args.y === "undefined") ? _target.offsetTop : args.y;
        
        args.width =                (typeof args.width === "undefined") ? _target.offsetWidth : args.width;
        
        args.height =               (typeof args.height === "undefined") ? _target.offsetHeight : args.height;
        
        args.backgroundColor =      (typeof args.backgroundColor === "undefined") ? target.css('background-color') : args.backgroundColor;
        
        args.color =                (typeof args.color === "undefined") ? target.css('color') : args.color;
        
        args.fillMode =             (typeof args.fillMode === "undefined") ? 'forwards' : args.fillMode;
        
        args.delay =                (typeof args.delay === "undefined") ? 0 : args.delay;
        
        if(typeof args.alpha === "undefined") {
            
            if(typeof _target.style.opacity === "undefined") {
                var o = target.css('opacity');
                _target.style.opacity = o;
            }
            
            if(_target.style.opacity === undefined) {
                var o = target.css('opacity');
                _target.style.opacity = o;
            }
            
            if(_target.style.opacity === '') {
                _target.style.opacity = 1;
            }
            
            args.alpha = _target.style.opacity;
        }
        
        if(typeof args.onComplete !== "undefined") {
            
            console.dir(args);
            
            var pfx = Tweener.pfx,
                str;
            
            switch(pfx) {
                case 'Moz':
                    str = 'animationend';
                    break;
                case 'Webkit':
                    str = 'webkitAnimationEnd';
                    break;
                case 'O':
                    str = 'oanimationend';
                    break;
                default:
                    str = 'animationend';
                    break;
            }
            
            _target.addEventListener(str, args.onComplete, false);
            
        }
        
        
    };
    
    init();
};