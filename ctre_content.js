/**
 * Zapp
 * By elouan.xyz, based on a project by blade.sk
 * Third party libraries where noted.
 */

// @medv/finder@3.1.1 + priority mod - https://github.com/antonmedv/finder/blob/master/LICENSE
const cssFinder=(()=>{let e,t;function n(n,a){if(n.nodeType!==Node.ELEMENT_NODE)throw Error("Can't generate CSS selector for non-element node type.");if("html"===n.tagName.toLowerCase())return"html";let o={root:document.body,idName:e=>!0,className:e=>!0,tagName:e=>!0,attr:(e,t)=>!1,seedMinLength:1,optimizedMinLength:2,threshold:1e3,maxNumberOfTries:1e4};t=l((e={...o,...a}).root,o);let u=r(n,"all",()=>r(n,"two",()=>r(n,"one",()=>r(n,"none"))));if(u){let f=v(E(u,n));return f.length>0&&(u=f[0]),i(u)}throw Error("Selector was not found.")}function l(e,t){return e.nodeType===Node.DOCUMENT_NODE?e:e===t.root?e.ownerDocument:e}function r(t,n,l){let r=null,i=[],o=t,u=0;for(;o;){let s=_(f(o))||_(...c(o))||_(...m(o))||_($(o))||[p()],h=d(o);if("all"==n)h&&(s=s.concat(s.filter(y).map(e=>g(e,h))));else if("two"==n)s=s.slice(0,1),h&&(s=s.concat(s.filter(y).map(e=>g(e,h))));else if("one"==n){let[N]=s=s.slice(0,1);h&&y(N)&&(s=[g(N,h)])}else"none"==n&&(s=[p()],h&&(s=[g(s[0],h)]));for(let w of s)w.level=u;if(i.push(s),i.length>=e.seedMinLength&&(r=a(i,l)))break;o=o.parentElement,u++}return(r||(r=a(i,l)),!r&&l)?l():r}function a(t,n){let l=v(w(t));if(l.length>e.threshold)return n?n():null;for(let r of l)if(u(r))return r;return null}function i(e){let t=e[0],n=t.name;for(let l=1;l<e.length;l++){let r=e[l].level||0;n=t.level===r-1?`${e[l].name} > ${n}`:`${e[l].name} ${n}`,t=e[l]}return n}function o(e){return e.map(e=>e.penalty).reduce((e,t)=>e+t,0)}function u(e){let n=i(e);switch(t.querySelectorAll(n).length){case 0:throw Error(`Can't select any node with this selector: ${n}`);case 1:return!0;default:return!1}}function f(t){let n=t.getAttribute("id");return n&&e.idName(n)?{name:"#"+CSS.escape(n),penalty:0}:null}function c(t){let n=Array.from(t.attributes).filter(t=>e.attr(t.name,t.value));return n.map(e=>({name:`[${CSS.escape(e.name)}="${CSS.escape(e.value)}"]`,penalty:.5}))}function s(e){let t=e.length;return e.match(/[\-_][a-z0-9]*[0-9]+[a-z0-9]*/i)&&(t+=50),e.match(/video|player|embed|^ad/i)&&(t-=75),t}function m(t){let n=Array.from(t.classList).filter(e.className);n.sort((e,t)=>s(e)-s(t));let l=n.map(e=>({name:"."+CSS.escape(e),penalty:1})),r=t.tagName.toLowerCase();return(r.match(/video|iframe/)&&l.unshift({name:r,penalty:1}),l.length)?h(l,2).map(e=>e.reduce((e,t)=>(e.name+=t.name,e.penalty+=t.penalty,e.level=t.level,e),{name:"",penalty:0})):l}function h(e,t=2){let n=function(e,t,l,r){if(0==e){l.length>0&&r.push(l);return}for(let a=0;a<t.length;a++)n(e-1,t.slice(a+1),l.concat([t[a]]),r)},l=[];for(let r=0;r<Math.min(e.length,t+1);r++)n(r,e,[],l);return e.length<t+1&&l.push(e),l}function $(t){let n=t.tagName.toLowerCase();return e.tagName(n)?{name:n,penalty:2}:null}function p(){return{name:"*",penalty:3}}function d(e){let t=e.parentNode;if(!t)return null;let n=t.firstChild;if(!n)return null;let l=0;for(;n&&(n.nodeType===Node.ELEMENT_NODE&&l++,n!==e);)n=n.nextSibling;return l}function g(e,t){return{name:e.name+`:nth-child(${t})`,penalty:e.penalty+10}}function y(e){return"html"!==e.name&&!e.name.startsWith("#")}function _(...e){let t=e.filter(N);return t.length>0?t:null}function N(e){return null!=e}function*w(e,t=[]){if(e.length>0)for(let n of e[0])yield*w(e.slice(1,e.length),t.concat(n));else yield t}function v(e){return[...e].sort((e,t)=>o(e)-o(t))}function*E(t,n,l={counter:0,visited:new Map}){if(t.length>2&&t.length>e.optimizedMinLength)for(let r=1;r<t.length-1;r++){if(l.counter>e.maxNumberOfTries)return;l.counter+=1;let a=[...t];a.splice(r,1);let o=i(a);if(l.visited.has(o))return;u(a)&&L(a,n)&&(yield a,l.visited.set(o,!0),yield*E(a,n,l))}}function L(e,n){return t.querySelector(i(e))===n}return n})();

let VERSION = chrome.runtime.getManifest().version

const ctre = {
	hoveredElement: null, // the element that is being hovered
	markedElement: null, // either the hovered elm or its parent selected by transposing
	previewedHiddenSelector: null, // selector to temporarily unhide
	targetingMode: false,
	transpose: 0, // how far to travel up the line of ancestors
	maxZIndex: 2147483647,
	hiddenElements: [], // each element: { selector, permanent, displayName }
	settings: {},
	preventHighlightingUntil: 0, // block highlighting until this timestamp is passed - workaround for flashing, see below
	activeDialog: null,
	showPermissionsWarning: false, // host_permissions need to be granted manually in Firefox, this is shown when the user denies them
	undoStack: [], // added selectors that can be undone using ctrl+z
	
	helpWindow: null,
	windowPosition: null, // {x, y, snapped: 'none'|'top'|'bottom'|'left'|'right'}
	dragging: false,
	dragOffsetX: 0,
	dragOffsetY: 0,
	SNAP_THRESHOLD: 20, // pixels from edge to trigger snap

	$: function(query) {
		if (!this.helpWindow) return null
		return this.helpWindow.shadowRoot.querySelector(query)
	},

	$$: function(query) {
		if (!this.helpWindow) return null
		return this.helpWindow.shadowRoot.querySelectorAll(query)
	},
		
	triggerResize: function() {
		let evt = document.createEvent('UIEvents')
		evt.initUIEvent('resize', true, false, window, 0)
		window.dispatchEvent(evt)

		setTimeout(function() { // also update overlays
			ctre.refreshOverlays()
		})
	},
	
	highlightElement: function() {
		if (!ctre.hoveredElement) return
		
		let markedElement = ctre.hoveredElement
		if (markedElement.className == "ctre_overlay") { // proxy for an iframe, not an actual element
			markedElement = markedElement.relatedElement
		}
		
		let i = 0
		for (i = 0; i < ctre.transpose; i++) {
			if (markedElement.parentNode != window.document) {
				markedElement = markedElement.parentNode
			} else {
				break
			}
		}

		ctre.transpose = i

		if (markedElement == ctre.markedElement) return
		ctre.markedElement = markedElement

		let highlighter = document.querySelector('#ctre_highlighter')

		if (!highlighter) {
			highlighter = document.createElement('div')
			highlighter.id = 'ctre_highlighter'
			highlighter.style.pointerEvents = 'none'
			highlighter.style.position = 'fixed'
			highlighter.style.background = 'rgba(255,128,128,0.4)'
			highlighter.style.zIndex = ctre.maxZIndex - 1
			document.body.appendChild(highlighter)
		}

		ctre.updateHighlighterPos()

		if (ctre.$('#ctre_current_elm')) {
			ctre.$('#ctre_current_elm').innerHTML = ctre.getPathHTML(ctre.hoveredElement, ctre.transpose)
			ctre.$('#ctre_current_elm .pathNode.active')?.scrollIntoView({ block: 'center' })
		}
	},

	unhighlightElement: function() {
		document.querySelector('#ctre_highlighter')?.remove()
		ctre.markedElement = null
		ctre.hoveredElement = null
		if (ctre.$('#ctre_current_elm')) {
			ctre.$('#ctre_current_elm').innerHTML = 'Use the mouse to select an element to remove.'
		}
	},

	updateHighlighterPos: function() {
		let rect = ctre.markedElement?.getBoundingClientRect()
		if (!rect) return
		let highlighter = document.querySelector('#ctre_highlighter')
		if (!highlighter) return

		highlighter.style.left = rect.x + 'px'
		highlighter.style.top = rect.y + 'px'
		highlighter.style.width = rect.width + 'px'
		highlighter.style.height = rect.height + 'px'
	},
	
	handleMouseover: function(e) {
		if (+new Date() < ctre.preventHighlightingUntil) {
			// workaround to avoid flashing when mousing over the CTRE window from top
			return
		}

		if (ctre.activeDialog) return

	if (ctre.isEventInCTREWindow(e)) {
			return
		}
		
		if (ctre.hoveredElement != e.target) {
			ctre.transpose = 0;
			ctre.hoveredElement = e.target
			ctre.highlightElement()
		}
	},

	isChildOfCTREWindow: function(elm) {
		// Check if element is within the helpWindow or its shadow DOM
		if (elm == ctre.helpWindow) return true
		
		// Check regular parent chain
		for (var i = 0; i < 8; i++) {
			if (elm == ctre.helpWindow) return true
			elm = elm.parentNode
			if (!elm) break
		}

		return false
	},
	
	isEventInCTREWindow: function(event) {
		// For events, use composedPath to traverse shadow DOM boundaries
		if (!event || !event.composedPath) return false
		const path = event.composedPath()
		return path.some(el => el === ctre.helpWindow || el === ctre.helpWindow?.shadowRoot)
	},
	
	handleKeydown: function(e) {
		if (!ctre.targetingMode) return

		if (ctre.activeDialog) {
			if (e.code == 'Escape') {
				ctre.deactivateDialog()

				e.stopPropagation()
				e.preventDefault()
			}
		} else {
			// Allow Ctrl+R and Ctrl+Shift+R to work (page refresh)
			if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
				return
			}

			if (e.code == 'Escape') {
				ctre.deactivate()
			} else if (e.code == 'Space') {
				if (ctre.markedElement) ctre.hideTarget()
			} else if (e.key == 'w') {
				if (ctre.transpose > 0) {
					ctre.transpose--
				}
				ctre.highlightElement()
			} else if (e.key == 'q') {
				ctre.transpose++
				ctre.highlightElement()
			} else if (e.key == 'z' && (e.ctrlKey || e.metaKey)) {
				ctre.maybeUndo()
			}

			e.stopPropagation()
			e.preventDefault()
		}
	},
	
	handleKeyup: function(e) {
		if (!ctre.targetingMode || ctre.activeDialog) return

		e.stopPropagation()
		e.preventDefault()
	},
	
	hideTarget: function(mouseEvt/* optional */) {
		if (!ctre.markedElement) return
		if (mouseEvt && ctre.isEventInCTREWindow(mouseEvt)) return

		let selector = ctre.getSelector(ctre.markedElement)
		if (!selector) return

		if (!selector || (mouseEvt && mouseEvt.button !== 0)) {
			mouseEvt?.preventDefault()
			mouseEvt?.stopPropagation()
			return
		}

		ctre.unhighlightElement()

		ctre.hiddenElements.push({
			selector,
			permanent: !!ctre.settings.remember,
			displayName: null, // will display selector if null
		})

		ctre.undoStack.push(selector)

		ctre.updateCSS()
		ctre.updateElementList()
		ctre.triggerResize()
		ctre.refreshOverlays()
		ctre.updateSavedElements()

		mouseEvt?.preventDefault()
		mouseEvt?.stopPropagation()
	},

	maybeUndo: function() {
		let selector

		while (selector = ctre.undoStack.pop()) {
			let newHiddenElements = ctre.hiddenElements.filter((item) => item.selector != selector)

			if (newHiddenElements.length < ctre.hiddenElements.length) {
				ctre.hiddenElements = newHiddenElements
				ctre.updateCSS()
				ctre.refreshOverlays()
				ctre.updateElementList()
				ctre.updateSavedElements()
				return
			}
		}
	},

	getSelector: function(element) {
		if (element.tagName == 'BODY') return 'body'
		if (element.tagName == 'HTML') return 'html'
		if (!element) return null

		return cssFinder(element, {
			// seedMinLength: 3,
			optimizedMinLength: 1,
		})
	},

	getPathHTML: function (element, transpose) {
		function getElmName (elm) {
			if (elm.id) {
				return "#" + elm.id
			} else if (typeof elm.className == "string" && elm.className.trim().length) {
				return elm.tagName.toLowerCase() + "." + elm.className.trim().split(" ").join(".")
			} else {
				return elm.tagName.toLowerCase()
			}
		}

		let path = []
		let currentElm = element

		if (currentElm.className == "ctre_overlay") { // this is just a proxy for an iframe
			currentElm = currentElm.relatedElement
		}

		while (currentElm) {
			path.push(currentElm)
			currentElm = currentElm.parentElement
		}

		path = path.reverse()

		let html = []
		for (let i = 0; i < path.length; i++) {
			html.push(`<span class="pathNode${path.length - 1 - i == transpose ? " active" : ""}">${getElmName(path[i])}</span>`)
		}

		return html.join('<span class="pathSeparator">&gt;</span>')
	},

	preventEvent: function(e) {
		if (ctre.isEventInCTREWindow(e)) return

		e.preventDefault()
		e.stopPropagation()
		return false
	},
	
	updateCSS: function() {
		let position = ''
		if (ctre.windowPosition && ctre.windowPosition.x !== undefined && ctre.windowPosition.y !== undefined) {
			position = `left: ${ctre.windowPosition.x}px; top: ${ctre.windowPosition.y}px;`
		} else {
			position = 'bottom: 0; right: 10px;'
		}

		let cssLines = [
			`
			#ctre_wnd {
				position: fixed; ${position}
				background: #fff; box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
				border-radius: 3px;
				z-index: ${ctre.maxZIndex};
			}

			@media (prefers-color-scheme: dark) {
				#ctre_wnd { background: #000; box-shadow: 0px 0px 20px rgba(255,255,255,0.08); }
			}
			`
		]

		for (let i in ctre.hiddenElements) {
			let selector = ctre.hiddenElements[i].selector
			if (selector == ctre.previewedHiddenSelector) {
				cssLines.push(selector + ' { outline: solid 5px rgba(0,214,255,0.5) !important; outline-offset: -5px; }')
			} else if (selector == 'body' || selector == 'html') {
				cssLines.push(selector + ' { background: transparent !important; }')
			} else {
				cssLines.push(selector + ' { display: none !important; }')
			}
		}

		if (ctre.hiddenElements.length) {
			cssLines.push(
				`
				html, html body, html body > #ctre_wnd { /* safeguard against "*" rules */
					display: block !important;
				}
				`
			)
		}

		let styleElm = document.querySelector('#ctre_styles')
		if (!styleElm) {
			styleElm = document.createElement('style')
			styleElm.type = "text/css"
			styleElm.id = "ctre_styles"
			document.head.appendChild(styleElm)
		}

		while (styleElm.firstChild) {
			styleElm.removeChild(styleElm.firstChild)
		}

		styleElm.appendChild(document.createTextNode(cssLines.join('\n')))
	},

	updateElementList: function() {
		if (!ctre.helpWindow) return

		let elmList = ctre.$('#ctre_elm_list')
		let lines = []

		if (ctre.hiddenElements.length) {
			lines.push('<table><tr class="ct_heading"><td>Removed element</td><td>Remember?</td><td></td></tr>')

			for (let elm of ctre.hiddenElements) {
				const displayText = elm.displayName || elm.selector
				lines.push(`<tr>
					<td class="ct_selector">
						<span class="ct_display_name" title="${escapeHTML(elm.selector)}">${escapeHTML(displayText)}</span>
						<a href="" class="ct_edit_selector">edit</a>
					</td>
					<td><input type="checkbox"${elm.permanent ? ' checked' : ''}></td>
					<td><span class="ct_preview">👁</span> <a href="" class="ct_delete">✖</a></td>
				</tr>`)
			}

			lines.push('</table>')
			elmList.classList.add('hasContent')
		} else {
			elmList.classList.remove('hasContent')
		}
		
		elmList.innerHTML = lines.join('\n')

		function onChangePermanent () {
			var tr = closest(this, 'tr')
			let index = ctre.hiddenElements.findIndex(elm => elm.selector == tr.selector)
			var hiddenElement = ctre.hiddenElements[index]
			hiddenElement.permanent = this.checked

			ctre.updateSavedElements()
		}

		function onDeleteClick (e) {
			let tr = closest(this, 'tr')

			if (tr.selector) {
				let index = ctre.hiddenElements.findIndex(elm => elm.selector == tr.selector)
				ctre.hiddenElements.splice(index, 1)
			}

			ctre.updateCSS()
			ctre.refreshOverlays()
			ctre.updateElementList()
			ctre.updateSavedElements()

			e.preventDefault()
			e.stopPropagation()
		}

		function onPreviewHoverOn (e) {
			let selector = closest(this, 'tr').selector
			if (!selector) return

			ctre.previewedHiddenSelector = selector
			ctre.updateCSS()
		}

		function onPreviewHoverOff (e) {
			let selector = closest(this, 'tr').selector
			if (!selector) return

			if (ctre.previewedHiddenSelector == selector) {
				ctre.previewedHiddenSelector = null
				ctre.updateCSS()
			}
		}

		function onEditSelector (e) {
			e.preventDefault()
			e.stopPropagation()

			let tr = closest(this, 'tr')

			if (tr.selector) {
				let hiddenElement = ctre.hiddenElements.find(elm => elm.selector == tr.selector)
				let newSelector = prompt('Customize CSS selector\n\nhints:\n[id^="Abc"] matches #AbcWhatever\n[class*="Abc"] matches .somethingAbcSomething', hiddenElement.selector)
				if (newSelector) {
					hiddenElement.selector = newSelector

					ctre.updateCSS()
					ctre.refreshOverlays()
					ctre.updateElementList()
					ctre.updateSavedElements()
				}
			}
		}

		function onDisplayNameDblClick(e) {
			let tr = closest(this, 'tr')
			let hiddenElement = ctre.hiddenElements.find(elm => elm.selector == tr.selector)
			if (!hiddenElement) return

			const displayNameSpan = this
			const currentText = hiddenElement.displayName || hiddenElement.selector
			
			// Create input element
			const input = document.createElement('input')
			input.type = 'text'
			input.className = 'ct_display_name_input'
			input.value = currentText
			
			let isSaving = false
			
			function saveDisplayName() {
				if (isSaving) return
				isSaving = true
				
				const newValue = input.value.trim()
				
				// Save the new display name
				if (newValue && newValue !== hiddenElement.selector) {
					hiddenElement.displayName = newValue
				} else {
					hiddenElement.displayName = null // Use selector as default
				}
				
				ctre.updateSavedElements()
				ctre.updateElementList()
			}
			
			// Prevent mousedown from causing blur
			input.addEventListener('mousedown', function(e) {
				e.stopPropagation()
			})
			
			input.addEventListener('click', function(e) {
				e.stopPropagation()
			})
			
			input.addEventListener('blur', function() {
				// Delay slightly to allow other events to complete
				setTimeout(saveDisplayName, 0)
			})
			
			input.addEventListener('keydown', function(e) {
				e.stopPropagation()
				if (e.key === 'Enter') {
					e.preventDefault()
					input.blur()
				} else if (e.key === 'Escape') {
					e.preventDefault()
					isSaving = true // Prevent save
					ctre.updateElementList() // Cancel edit
				}
			})
			
			// Replace span with input
			displayNameSpan.replaceWith(input)
			
			// Use setTimeout to ensure the input is in the DOM before focusing
			setTimeout(function() {
				input.focus()
				input.select()
			}, 0)
			
			e.stopPropagation()
		}

		let i = -1
		for (let tr of ctre.$$('#ctre_elm_list table tr')) {
			if (i < 0) { // skip heading
				i++
				continue
			}

			tr.selector = ctre.hiddenElements[i].selector

			tr.querySelector('input').addEventListener('change', onChangePermanent, false)
			tr.querySelector('a.ct_delete').addEventListener('click', onDeleteClick, false)
			tr.querySelector('.ct_preview').addEventListener('mouseenter', onPreviewHoverOn, false)
			tr.querySelector('.ct_preview').addEventListener('mouseleave', onPreviewHoverOff, false)
			tr.querySelector('a.ct_edit_selector').addEventListener('click', onEditSelector, false)
			tr.querySelector('.ct_display_name').addEventListener('dblclick', onDisplayNameDblClick, false)

			i++
		}
	},

	updateSavedElements: function () {
		chrome.runtime.sendMessage({
			action: 'set_saved_elms',
			website: location.hostname.replace(/^www\./, ''),
			data: JSON.stringify(ctre.hiddenElements.filter(elm => elm.permanent)),
		})
	},

	loadSavedElements: function () {
		chrome.runtime.sendMessage({
			action: 'get_saved_elms',
			website: location.hostname.replace(/^www\./, ''),
		}, function (data) {
			ctre.hiddenElements = JSON.parse(data)

			ctre.updateCSS()
			ctre.updateElementList()
		})

		chrome.runtime.sendMessage({
			action: 'get_settings',
		}, function (data) {
			ctre.settings = JSON.parse(data)
		})
	},

	updateSettingsUI: function() {
		ctre.$('#ctre_opt_remember').innerHTML = ctre.settings.remember
			? '<input type="checkbox" checked>'
			: '<input type="checkbox">'
	},

	saveSettings: function() {
		chrome.runtime.sendMessage({
			action: 'set_settings',
			data: JSON.stringify(ctre.settings),
		})
	},

	loadWindowPosition: function() {
		try {
			let stored = localStorage.getItem('ctre_window_position')
			if (stored) {
				ctre.windowPosition = JSON.parse(stored)
			}
		} catch (e) {
			console.error('Failed to load window position:', e)
		}
	},

	saveWindowPosition: function() {
		try {
			if (ctre.windowPosition) {
				localStorage.setItem('ctre_window_position', JSON.stringify(ctre.windowPosition))
			}
		} catch (e) {
			console.error('Failed to save window position:', e)
		}
	},

	updateWindowPosition: function(x, y) {
		if (!ctre.helpWindow) return

		const winWidth = window.innerWidth
		const winHeight = window.innerHeight
		const rect = ctre.helpWindow.getBoundingClientRect()
		const elmWidth = rect.width
		const elmHeight = rect.height
		const isMinimized = ctre.$('.mainWindow')?.classList.contains('minimized')

		// Detect edge snapping
		let snapped = 'none'
		if (x <= ctre.SNAP_THRESHOLD) {
			x = 0
			snapped = 'left'
		} else if (x + elmWidth >= winWidth - ctre.SNAP_THRESHOLD) {
			x = winWidth - elmWidth
			snapped = 'right'
		}

		if (y <= ctre.SNAP_THRESHOLD) {
			y = 0
			snapped = snapped === 'none' ? 'top' : snapped
		} else if (y + elmHeight >= winHeight - ctre.SNAP_THRESHOLD) {
			y = winHeight - elmHeight
			snapped = snapped === 'none' ? 'bottom' : snapped
		}

		ctre.helpWindow.style.left = x + 'px'
		ctre.helpWindow.style.top = y + 'px'
		ctre.helpWindow.style.right = 'auto'
		ctre.helpWindow.style.bottom = 'auto'

		ctre.windowPosition = { x, y, snapped }
		ctre.saveWindowPosition()
	},

	startDrag: function(e) {
		if (e.button !== 0) return // only left click

		// Get the composed path to check elements inside shadow DOM
		const path = e.composedPath()
		let target = path[0]
		
		// Check if clicking on a top button
		if (path.some(el => el.classList && el.classList.contains('topButton'))) return

		const isMinimized = ctre.$('.mainWindow')?.classList.contains('minimized')
		
		// Check if we're clicking on a draggable area
		const isDraggable = isMinimized 
			? path.some(el => el.classList && (el.classList.contains('header__logo') || el.classList.contains('header__logo_small')))
			: path.some(el => el.classList && el.classList.contains('header'))

		if (!isDraggable) return

		e.preventDefault()
		e.stopPropagation()
		ctre.dragging = true

		const rect = ctre.helpWindow.getBoundingClientRect()
		ctre.dragOffsetX = e.clientX - rect.left
		ctre.dragOffsetY = e.clientY - rect.top

		document.body.style.userSelect = 'none'
		ctre.helpWindow.style.cursor = 'grabbing'
	},

	handleDrag: function(e) {
		if (!ctre.dragging) return

		e.preventDefault()
		const x = e.clientX - ctre.dragOffsetX
		const y = e.clientY - ctre.dragOffsetY
		ctre.updateWindowPosition(x, y)
	},

	endDrag: function(e) {
		if (!ctre.dragging) return

		e.preventDefault()
		ctre.dragging = false
		document.body.style.userSelect = ''
		ctre.helpWindow.style.cursor = ''
	},

	activateDialog: function(cls) {
		ctre.activeDialog = new cls(ctre.helpWindow.shadowRoot, ctre.deactivateDialog)
		ctre.$('.mainWindow').style.display = 'none'
		ctre.unhighlightElement()
	},

	deactivateDialog: function() {
		ctre.activeDialog?.destroy()
		ctre.activeDialog = null
		ctre.$('.mainWindow').style.removeProperty('display')
	},
	
	activate: function() {
		if (!ctre.helpWindow) ctre.updateCSS()

		let shadowElm = document.createElement('div')
		shadowElm.setAttribute('id', 'ctre_wnd')
		shadowElm.attachShadow({ mode: 'open' })
		shadowElm.style.visibility = 'hidden'
		document.body.appendChild(shadowElm)

		ctre.helpWindow = shadowElm

		shadowElm.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="${chrome.runtime.getURL('content.css')}">
			<div class="mainWindow">
				<div class="header">
					<span class="header__logo">Zapp
						<img src="${chrome.runtime.getURL('icons/logo_app.png')}" width="16" height="16" style="vertical-align: -15%;">
					</span>
					<span class="header__version">${VERSION}</span>
					<span class="header__logo header__logo_small">Zapp
					</span>
				</div>
				
				<hr/>

				<div class="topButtons">
				<div class="topButton topButton_settings" title="Advanced options">⚙</div>
				<div class="topButton topButton_minimize" title="Minimize"><span class="minimize-icon">▼</span><span class="expand-icon">▲</span></div>
				<div class="topButton topButton_close" title="Close">×</div>
			</div>

			<div id="ctre_current_elm">Use the mouse to select an element to remove.</div>

			<div id=\"ctre_elm_list\"></div>
		</div>
	`

		ctre.$('link').addEventListener('load', () => {
			// prevent "flash of unstyled content" in the shadow DOM
			shadowElm.style.visibility = 'visible'
		})

		ctre.$('.topButton_close').addEventListener('click', function (e) {
			e.preventDefault()
			e.stopPropagation()
			ctre.deactivate()
		})

		ctre.$('.topButton_minimize').addEventListener('click', function (e) {
			ctre.$('.mainWindow').classList.toggle('minimized')
			e.preventDefault()
		})

		ctre.$('.topButton_settings').addEventListener('click', function (e) {
			ctre.activateDialog(AdvOptionsDialog)
			e.preventDefault()
		})

		// Setup drag functionality
		shadowElm.addEventListener('mousedown', ctre.startDrag)
		document.addEventListener('mousemove', ctre.handleDrag)
		document.addEventListener('mouseup', ctre.endDrag)

		// Apply saved position after CSS loads
		if (ctre.windowPosition && ctre.windowPosition.x !== undefined) {
			shadowElm.style.left = ctre.windowPosition.x + 'px'
			shadowElm.style.top = ctre.windowPosition.y + 'px'
			shadowElm.style.right = 'auto'
			shadowElm.style.bottom = 'auto'
		}

		ctre.updateElementList()
		
		ctre.targetingMode = true
		document.addEventListener('mouseover', ctre.handleMouseover, true)
		document.addEventListener('mousedown', ctre.hideTarget, true)
		document.addEventListener('mouseup', ctre.preventEvent, true)
		document.addEventListener('click', ctre.preventEvent, true)
		document.addEventListener('scroll', ctre.updateHighlighterPos, true)
		
		ctre.addOverlays()
		
		chrome.runtime.sendMessage({action: 'status', active: true})
	},
	
	deactivate: function() {
		ctre.targetingMode = false

		ctre.deactivateDialog()
		
		ctre.unhighlightElement()
		
		// Remove drag listeners
		document.removeEventListener('mousemove', ctre.handleDrag)
		document.removeEventListener('mouseup', ctre.endDrag)
		
		ctre.helpWindow.parentNode.removeChild(ctre.helpWindow)
		
		document.removeEventListener('mouseover', ctre.handleMouseover, true)
		document.removeEventListener('mousedown', ctre.hideTarget, true)
		document.removeEventListener('mouseup', ctre.preventEvent, true)
		document.removeEventListener('click', ctre.preventEvent, true)
		document.removeEventListener('scroll', ctre.updateHighlighterPos, true)
		
		ctre.removeOverlays()
		
		chrome.runtime.sendMessage({action: 'status', active: false})
	},
	
	toggle: function() {
		if (ctre.targetingMode) ctre.deactivate()
		else ctre.activate()
	},
	
	addOverlays: function() {
		// add overlay over each iframe / embed
		// this is needed for capturing mouseover over the whole document
		for (let e of document.querySelectorAll('iframe, embed')) {
			let rect = e.getBoundingClientRect()

			let overlayElm = document.createElement('div')
			overlayElm.className = 'ctre_overlay'
			overlayElm.style.position = 'absolute'
			overlayElm.style.left = rect.left + window.scrollX + 'px'
			overlayElm.style.top = rect.top + window.scrollY + 'px'
			overlayElm.style.width = rect.width + 'px'
			overlayElm.style.height = rect.height + 'px'
			overlayElm.style.background = 'rgba(128,128,128,0.2)'
			overlayElm.style.zIndex = ctre.maxZIndex - 2
			overlayElm.relatedElement = e
			
			document.body.appendChild(overlayElm)
		}
	},
	
	removeOverlays: function() {
		let elms = document.querySelectorAll('.ctre_overlay')
		for (i = 0; i < elms.length; i++) {
			let e = elms[i]
			e.parentNode.removeChild(e)
		}
	},

	refreshOverlays: function () {
		ctre.removeOverlays()
		ctre.addOverlays()
	},

	handleExtensionMessage: function(msg, sender, respond) {
		if (msg.action == 'toggle') {
			ctre.showPermissionsWarning = !msg.permissionsGranted
			ctre.toggle()
			respond(VERSION)
		} else if (msg.action == 'getStatus') {
			respond(ctre.targetingMode)
		}
	},
	
	init: function() {
		document.addEventListener('keydown', ctre.handleKeydown)
		document.addEventListener('keyup', ctre.handleKeyup)
		
		chrome.runtime.onMessage.addListener(ctre.handleExtensionMessage)

		ctre.loadSavedElements()
		ctre.loadWindowPosition()
	},
	
	destroy: function() {
		if (ctre.targetingMode) ctre.deactivate()
		document.removeEventListener('keydown', ctre.handleKeydown)
		document.removeEventListener('keyup', ctre.handleKeyup)
		
		chrome.runtime.onMessage.removeListener(ctre.handleExtensionMessage)

		let styleElm = document.querySelector('#ctre_styles')
		if (styleElm) styleElm.parentNode.removeChild(styleElm)
	},
}

ctre.init()

function closest(el, selector) {
	var retval = null
	while (el) {
		if (el.matches(selector)) {
			retval = el
			break
		}
		el = el.parentElement
	}
	return retval
}

function escapeHTML(str) {
	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}


class AdvOptionsDialog {
	constructor(shadowRoot, close) {
		this.elm = document.createElement('div')
		this.elm.className = 'dialog dialog_advOptions'
		this.elm.innerHTML = `
			<div class="header">
				<span class="header__logo">Advanced options</span>
			</div>

			<hr/>

			<div class="topButtons">
				<div class="topButton topButton_close" title="Close">×</div>
			</div>

			<div class="advOptions">
				<div class="advOptions__row">
					<label>
						Remember by default: <span id="ctre_opt_remember">?</span>
					</label>
					<p class="advOptions__rowHelp">When enabled, removed elements will be permanently hidden across sessions.</p>
				</div>

				<div class="advOptions__row">
					<button class="advOptions__export">Export elements</button>
					<p class="advOptions__rowHelp">Exports a list of all the permanently removed elements from all the websites to a JSON file.</p>
				</div>

				<div class="advOptions__row">
					<button class="advOptions__import"><input type="file">Import elements</button>
					<p class="advOptions__rowHelp">Loads a list of permanently removed elements from a previously exported file.</p>
				</div>
			</div>
		`
		shadowRoot.appendChild(this.elm)

		ctre.updateSettingsUI()

		this.elm.querySelector('.topButton_close').addEventListener('click', (e) => {
			close()
			e.preventDefault()
		})

		this.elm.querySelector('#ctre_opt_remember').addEventListener('click', (e) => {
			ctre.settings.remember = !ctre.settings.remember
			ctre.saveSettings()
			ctre.updateSettingsUI()
			e.preventDefault()
		})

		this.elm.querySelector('.advOptions__export').addEventListener('click', (e) => {
			chrome.runtime.sendMessage({ action: 'export_settings' })
				.then((data) => {
					let link = document.createElement('a')

					let blob = new Blob([ data ], { type: 'application/json' })
					let url = URL.createObjectURL(blob)
					setTimeout(() => URL.revokeObjectURL(url), 30000)

					link.href = url
					link.target = '_blank'
					link.rel = 'noopener'
					link.download = 'Zapp export ' + new Date().toLocaleString('sv-SE').replace(/[^0-9\- ]/g, '-') + '.json'
					link.click()
				})
			e.preventDefault()
		})

		this.elm.querySelector('.advOptions__import input').addEventListener('change', function(e) {
			let input = this
			let file = this.files[0]

			;(async () => {
				if (file.type != 'application/json') throw new Error('Invalid file type')

				let text = await new Promise((res, rej) => {
					// who the hell designed this API??
					let reader = new FileReader()
					reader.readAsText(file)
					reader.onload = () => res(reader.result)
					reader.onerror = rej
				})

				input.value = ''

				let json
				try {
					json = JSON.parse(text)
				} catch (ex) {
					throw new Error('Error parsing JSON data in file')
				}

				if (json.version != 1) throw new Error('Incorrect version number in imported data')

				let result = await chrome.runtime.sendMessage({ action: 'import_settings', data: text })
				if (result != 'SUCCESS') throw new Error(result)

				ctre.loadSavedElements()

				alert('Import successful')
				close()
			})()
				.catch((ex) => {
					alert(ex?.message || ex?.toString() || 'Error')
				})
		})
	}

	destroy() {
		this.elm.remove()
	}
}
