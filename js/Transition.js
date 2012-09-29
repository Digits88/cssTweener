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
        for(var fld in obj) {
            args[fld] = obj[fld];
        }
        
        animID = makeID();
        
        // create new css animation with args
        animate();
        
//        console.dir(_target)
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
        fillmodestring = 'animation-fill-mode'
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
    
    // doesnt work, but if I uncomment the other animate function it works
    var animate = function() {
        
        setDefaults();
        
        if(animation === false) {
            // javascript fallback
        } else {
            
            var str = animID + ' '+args.time+'s '+args.transition+' '+args.repeat;
            
            
            
            var keyframes = '@' + keyframeprefix + 'keyframes ' + animID + ' { '+
                                'from { top: '+ _target.offsetTop +'px; left: '+ _target.offsetLeft +'px; opacity: '+ _target.style.opacity +'; } '+
                                'to { top: '+ args.y +'px; left: '+ args.x +'px; opacity: '+ args.alpha +'; } '+
                            '}';
                        
//            console.log(keyframes);
                        
            if( document.styleSheets && document.styleSheets.length ) {
                document.styleSheets[0].insertRule( keyframes, 0 );
            } else {
                var s = document.createElement( 'style' );
                s.innerHTML = keyframes;
                document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
            }
            

            //            console.log(str);
//            _target.style[ fillmodestring ] = args.fillMode;
            
            _target.style[ animationstring ] = animID + ' '+args.time+'s '+args.transition+' '+args.repeat + ' ' + args.fillMode;
            
//            _target.style
            
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
            
//            console.log(_target.style.opacity);
            
            args.alpha = _target.style.opacity;
        }
        
        if(typeof args.fillMode === "undefined") {
            args.fillMode = 'forwards';
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