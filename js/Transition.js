/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var Transition = function(elem,obj) {
    
    
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
        
        // setup
        config();
        
        // set the arguments
        setArgs();
        
        animID = makeID();
        
        // create new css animation with args
        animate();
        
//        console.dir(_target)
    };
    
    var setArgs = function() {
        for(var fld in obj) {
            args[fld] = obj[fld];
        }
    };
    
    var makeID = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    
/*  --------------------------------------------------
    Configuration
    -------------------------------------------------- */
    var animation = false,
        animationstring = 'animation',
        translatestring = 'transform',
        fillmodestring = 'animation-fill-mode',
        keyframeprefix = '',
        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        pfx  = '';
        
    var config = function() {
        if( _target.style.animationName ) { animation = true; }
        
        if( animation === false ) {
            for( var i = 0; i < domPrefixes.length; i++ ) {
                if( _target.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                    pfx = domPrefixes[ i ];
                    animationstring = pfx + 'Animation';
                    translatestring = pfx + 'Transform';
                    fillmodestring = pfx + 'AnimationFillMode';
                    keyframeprefix = '-' + pfx.toLowerCase() + '-';
                    animation = true;
                    break;
                }
            }
        }
    };
    
/*  --------------------------------------------------
    Animate
    -------------------------------------------------- */
    
    // TODO: instantiate each animation so I can have multiple tweens per element
    var animate = function() {
        
        setDefaults();
        
        if(animation === false) {
            // javascript fallback
        } else {
            
//            var str = animID + ' '+args.time+'s '+args.transition+' '+args.repeat;
            
            var keyframes = '@' + keyframeprefix + 'keyframes ' + animID + ' { '+
                                'from { top: '+ _target.offsetTop +'px; left: '+ _target.offsetLeft +'px; opacity: '+ _target.style.opacity +'; } '+
                                'to { top: '+ args.y +'px; left: '+ args.x +'px; opacity: '+ args.alpha +'; } '+
                            '}';
                        
//            if( document.styleSheets && document.styleSheets.length ) {
//                document.styleSheets[0].insertRule( keyframes, 0 );
//            } else {
                var s = document.createElement( 'style' );
                s.innerHTML = keyframes;
                document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
//            }
            
            // animation:                       name        duration       timing-function     delay               iteration-count     direction;
//            _target.style[ animationstring ] = animID + ' '+args.time+'s '+args.transition+' ' + args.delay + 's '+args.repeat + ' ' + args.fillMode;
            
            var id = target.attr('id');
            
            var animationCall = '#' + id + ' { '+
                                    keyframeprefix + 'animation: ' + animID + ' '+args.time+'s '+args.transition+' ' + args.delay + 's '+args.repeat + ' ' + args.fillMode + ';' +
                                ' } ';
                            
//            if( document.styleSheets && document.styleSheets.length ) {
//                document.styleSheets[0].insertRule( animationCall, 0 );
//            } else {
                var a = document.createElement( 'style' );
                a.innerHTML = animationCall;
                document.getElementsByTagName( 'head' )[ 0 ].appendChild( a );
//            }
            
            console.dir(_target);
            
        }
    };
    
    var setDefaults = function() {
        if(typeof args.transition === "undefined") {
            args.transition = 'linear';
        }
        
        if(typeof args.repeat === "undefined") {
            args.repeat = 1;
        }
        
        if(typeof args.x === "undefined") {
            args.x = _target.offsetLeft;
        }
        
        if(typeof args.y === "undefined") {
            args.y = _target.offsetTop;
        }
        
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
        
        if(typeof args.fillMode === "undefined") {
            args.fillMode = 'forwards';
        }
        
        if(typeof args.delay === "undefined") {
            args.delay = 0;
        }
        
    };
    
    // works
//    var animate = function() {
//        if( animation === false ) {
//
//            // animate in JavaScript fallback
//
//        } else {
//            _target.style[ animationstring ] = 'rotate 1s linear infinite';
//
//            var keyframes = '@' + keyframeprefix + 'keyframes rotate { '+
//                        'from {' + keyframeprefix + 'transform:rotate( 0deg ) }'+
//                        'to {' + keyframeprefix + 'transform:rotate( 360deg ) }'+
//                      '}';
//
//            if( document.styleSheets && document.styleSheets.length ) {
//                document.styleSheets[0].insertRule( keyframes, 0 );
//            } else {
//                var s = document.createElement( 'style' );
//                s.innerHTML = keyframes;
//                document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
//            }
//
//        }
//    };
    
    init();
    
    return this;
};