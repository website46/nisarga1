window.onscroll = function(){
	var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	var o=document.getElementById('top_menu');
		if (scrolled > 670) o.setAttribute('class','menu fix-menu');
		else o.setAttribute('class','menu');
}

let burger = document.querySelector('.burger');
burger.addEventListener('click', function(e) {
  burger.classList.toggle('open');
});