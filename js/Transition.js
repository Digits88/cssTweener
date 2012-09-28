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
        
        animID = Math.floor(Math.random()*9999);
        
        // create new css animation with args
        animate();
        
        console.dir(_target)
    };
    
/*  --------------------------------------------------
    Configuration
    -------------------------------------------------- */
    var animation = false,
        animationstring = 'animation',
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
    
    var animate = function() {
        
        setDefaults();
        
        if(animation === false) {
            // javascript fallback
        } else {
            _target.style[ animationstring ] = animID + ' '+args.time+'s '+args.transition+' '+args.repeat+' ';
            
            var keyframes = '@' + keyframeprefix + 'keyframes ' + animID + ' { '+
                                'from {' + keyframeprefix + 'transform:rotate( 0deg ) }'+
                                'to {' + keyframeprefix + 'transform:rotate( 360deg ) }'+
                            '}';
        }
    };
    
    var setDefaults = function() {
        if(typeof args.transition === "undefined") {
            args.transition = 'linear';
        }
        
        if(typeof args.repeat === "undefined") {
            args.repeat = 1;
        }
    };
    
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