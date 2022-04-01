// using objects
function trackEvent1(evt, keypresses = []) {
    return [...keypresses, evt];
}

// track events using array
let keypresses1 = trackEvent1('press X', []);
keypresses1 = trackEvent1('press Ctrl + Y', keypresses1);
keypresses1 = trackEvent1('mouse click', keypresses1);
console.log(keypresses1);

// track events using closures
console.log('track events using closures')
function trackEvents2(evt, keypresses = () => []) {
    console.log('tracking event', evt)
    return function inner() {
        console.log('key presses at event', evt, 'are', keypresses())
        return [...keypresses(), evt];
    }
}

let keypresses2 = trackEvents2('clicked');
keypresses2 = trackEvents2('hovered', keypresses2);
keypresses2 = trackEvents2('delete', keypresses2);
keypresses2 = trackEvents2('drag', keypresses2);
console.log('final', keypresses2());
