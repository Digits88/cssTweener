/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Tweener = {
    
    animation: false,
    animationstring: 'animation',
    translatestring: 'transform',
    fillmodestring: 'animation-fill-mode',
    keyframeprefix: '',
    domPrefixes: 'Webkit Moz O ms Khtml'.split(' '),
    pfx: '',
    
    elems: new Array(),
//    keyframes: new Array(),
//    styleRules: new Array(),
    
    init: function() {
        this.config();
    },
    
    config: function() {
        
        // grab a random element on the page
        
        var _target = document.getElementsByTagName('div');
        
//        console.dir(_target)
        
        if( _target[0].style.animationName ) {this.animation = true;}
        
        if( this.animation === false ) {
            for( var i = 0; i < this.domPrefixes.length; i++ ) {
                if( _target[0].style[ this.domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                    this.pfx = this.domPrefixes[ i ];
                    this.animationstring = this.pfx + 'Animation';
                    this.translatestring = this.pfx + 'Transform';
                    this.fillmodestring = this.pfx + 'AnimationFillMode';
                    this.keyframeprefix = '-' + this.pfx.toLowerCase() + '-';
                    this.animation = true;
                    break;
                }
            }
        }
    },
    
    addTween: function(elem, args) {
        
        var t = new Transition(elem, args, this.keyframeprefix);
        
        if(this.elems.length === 0) {
            this.createAnimationRule(t, elem);
        } else {
            for(var i = 0, l = this.elems.length; i < l; i++) {

                if(elem.attr('id') == this.elems[i][0]) {
                    this.appendAnimationRule(t, i);                
                } else {
                    this.createAnimationRule(t, elem);
                }

            } 
        }
        
    },
    appendAnimationRule: function(t, index) {
        
//        var style = new Array();
//
//        style.push(t.getKeyframes());
//        style.push(t.getStyleRule());
        
        this.elems[index].push(t);
    },
    createAnimationRule: function(t, elem) {
        var entry = new Array();
            
        entry.push(elem.attr('id'));
        entry.push(t);

//        var style = new Array();
//
//        style.push(t.getKeyframes());
//        style.push(t.getStyleRule());
//
//        entry.push(style);

        this.elems.push(entry);
    },
    
    run: function() {
        var styleRule, keyframeRule;
        
        for(var i = 0, l = this.elems.length; i < l; i++) {
            var id = this.elems[i][0];
            
            styleRule = '#' + id + ' { \n';
            keyframeRule = '';
            
            styleRule += this.keyframeprefix + 'animation: ';
            
            for(var k = 1, ll = this.elems[i].length; k < ll; k++) {
                
                if(this.elems[i].length > 2 && (k + 1) != ll) {
                    styleRule += ' ' + this.elems[i][k].getStyleRule() + ',';
                } else {
                    styleRule += ' ' + this.elems[i][k].getStyleRule() + ' ';
                }
                
                var key = this.elems[i][k].getKeyframeRule();
                keyframeRule += key + '\n';
            }
            
            styleRule += ';\n'
            
            styleRule += ' } ';
            
            console.log(styleRule)
            console.log(keyframeRule)
            
            var a = document.createElement( 'style' );
            a.innerHTML = styleRule + '\n' + keyframeRule;
            document.getElementsByTagName( 'head' )[ 0 ].appendChild( a );
        }
    }
    
//    appendedStyleRuleFormat: function() {
//        var rule = this.keyframeprefix + 'animation: ';
//        for(var i = 0, l = this.elems.length; i < l; i++) {
//            for(var k = 1, ll = this.elems[i].length; k < ll; k++) {
//                rule += ' ' + this.elems[i][k].getStyleRule() + ',';
//            }
//        }
//        rule += ';\n';
//        
//        return rule;
//    },
//    
//    singleStyleRuleFormat: function() {
//        var rule = this.keyframeprefix + 'animation: ';
//        for(var i = 0, l = this.elems.length; i < l; i++) {
//            for(var k = 1, ll = this.elems[i].length; k < ll; k++) {
//                rule += ' ' + this.elems[i][k].getStyleRule() + ' ';
//            }
//        }
//        rule += ';\n';
//        
//        return rule;
//    }
    
//    run: function() {
//        
//        var rule, keyframe;
//        
//        // go through the array and create style rules
//        for(var i = 0, l = this.elems.length; i < l; i++) {
//            
//            var id = this.elems[i][0]
//            
//            rule = '#' + id + ' { \n';
//            keyframe = '';
//                            
//            for(var k = 1, ll = this.elems[i].length; k < ll; k++) {
//                
//                var key = this.elems[i][k][0];
//                var anim = this.elems[i][k][1];
//                
//                if(ll > 2) {
//                    rulethis.appendedAnimationString
//                } else {
//                    rule += this.keyframeprefix + 'animation: ' + anim + ';\n';
//                }
//                
//                
//                
//                keyframe += key + '\n';
//                
//            }
//            
//            rule += ' } ';
//            
//            console.log(rule)
//            console.log(keyframe)
//            
//            var a = document.createElement( 'style' );
//            a.innerHTML = rule + '\n' + keyframe;
//            document.getElementsByTagName( 'head' )[ 0 ].appendChild( a );
//            
//        }
//        
//        
//        
//    }
};


(function($) {
    $(window).load(function() {
        Tweener.init();
    });
})(jQuery);
