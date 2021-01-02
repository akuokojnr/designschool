"use strict";
// Prevent older IE console errors
if (!window.console) {
	var console = {
		log : function(){}
	}
}
// Design School global 
window.DS = function () {
	// -------------------------------------------------------------
	// VARIABLES
	// -------------------------------------------------------------
	var modalTimer;
	// -------------------------------------------------------------
	// PRIVATE FUNCTIONS
	// -------------------------------------------------------------
	function init() {
		// Remember scroll position on course pages
		scrollPositionCache();
		// Edit link event
		document.querySelectorAll('.edit').forEach(function(editButton) {
			editButton.addEventListener('click', function(e) {
				e.preventDefault();
				modalShow();
			});
		});
	}
	function modalEvents() {
		// Prevent clicks on .modal from bubbling up
		document.querySelector('.modal_backdrop .modal').addEventListener('click', function(e) {
			e.stopPropagation(); 
		});
		// Close link click
		document.querySelector('.modal_close').addEventListener('click', function(e) {
			e.preventDefault();
			modalHide();
		});
		document.querySelector('.modal_backdrop').addEventListener('click', function(e) {
			e.preventDefault();
			modalHide();
		});
	}
	function modalHide() {
		var modalBackdrop = document.querySelector('.modal_backdrop');
		// Remove show class
		_classRemove(modalBackdrop, 'show')
		// Brief time out for transition
		clearTimeout(modalTimer);
		modalTimer = setTimeout(function () {
			// Display hide
			modalBackdrop.style.display = 'none';
		}, 200);
	}
	function modalShow(size) {
		var modalBackdrop = document.querySelector('.modal_backdrop');
		// Display block
		modalBackdrop.style.display = 'block';
		// Brief time out for transition
		clearTimeout(modalTimer);
		modalTimer = setTimeout(function () {
			// Add show class
			_classAdd(modalBackdrop, 'show');
			// Events
			modalEvents();
		}, 200);
	}
	function scrollPositionCache() {
		var path = window.location.pathname;
		// If homepage clear scroll position cache
		if (path === '/') {
			return localStorage.setItem('course-scroll', 0);
		}
		var body = document.querySelector('body');
		var hash = window.location.hash;
		var pathSplit = path.split('/');
		var two = pathSplit[1];
		var three = pathSplit[2];
		// If hash exists in URL, jump there
		if (hash) {
			return body.scrollTop = document.querySelector(hash).offsetTop;
		}
		// Only save scroll position on course pages
		if (two !== '' && two !== undefined && two !== 'about' && two !== 'changelog' && three === '' || two !== '' && two !== undefined && two !== 'about' && two !== 'changelog' && three === undefined) {
			var top = localStorage.getItem('course-scroll');
			// If there is a saved value, use it
			if (top !== null) {
			  body.scrollTop = parseInt(top, 10);
			}
			// Save new value before your leave the page
			window.addEventListener('beforeunload', () => {
			  localStorage.setItem('course-scroll', body.scrollTop);
			});
		}
	}
	// -------------------------------------------------------------
	// HELPER METHODS
	// -------------------------------------------------------------
	function _classAdd(el, cl) {
		if (el) {
			if (el.classList) {
				el.classList.add(cl);
			} else {
				el.className += ' ' + cl;
			}
		}
	}
	function _classRemove(el, cl) {
		if (el) {
			if (el.classList) {
				el.classList.remove(cl);
			} else {
				el.className = el.className.replace(new RegExp('(^|\\b)' + cl.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		}
	}
	// -------------------------------------------------------------
	// PUBLIC FACING FUNCTIONS
	// -------------------------------------------------------------
	return {
		init: function() {
			if (document.readyState === 'complete') {
				init();
			} else {
				window.addEventListener('load', init, false);
			}
		}
	};
} ();
window.DS.init();