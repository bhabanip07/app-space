let setHoverEffects;
let setPressEffects;

setHoverEffects = function(element) {
  let el = element;
  el.addEventListener('mouseenter', setHoverClassOnHover);
  el.addEventListener('mouseover', setHoverClassOnHover);
	el.addEventListener('mousemove', setHoverClassOnHover);
	el.addEventListener('mouseleave', removeHoverClassOnHover);

	function setHoverClassOnHover() {
		el.classList.add('hover');		
	}
	function removeHoverClassOnHover() {
		el.classList.remove('hover');
	}
}

setPressEffects = function(element) {
	let el = element;
	el.addEventListener('mousedown', setActiveClassOnPress);
	el.addEventListener('mouseup', removeActiveClassOnPress);
	el.addEventListener('touchstart', setActiveClassOnPress);
	el.addEventListener('touchend', removeActiveClassOnPress);

	function setActiveClassOnPress(ev) {
    ev.preventDefault();
    el.classList.add('active');
	}
	function removeActiveClassOnPress(ev) {
    ev.preventDefault();
    el.classList.remove('active');
	}
}

export {setHoverEffects, setPressEffects};