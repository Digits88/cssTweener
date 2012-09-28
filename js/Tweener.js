/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Tweener = {
    config: {},
    addTween: function(elem, args) {
        
        var tran = new Transition(elem, args);
        
        console.dir(tran);
    }
};