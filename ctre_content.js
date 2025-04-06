(() => {
	function _slicedToArray(t, n) {
		return _arrayWithHoles(t) || _iterableToArrayLimit(t, n) || _unsupportedIterableToArray(t, n) || _nonIterableRest()
	}

	function _nonIterableRest() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
	}

	function _unsupportedIterableToArray(t, n) {
		if (t) {
			if ("string" == typeof t) return _arrayLikeToArray(t, n);
			var r = Object.prototype.toString.call(t).slice(8, -1);
			return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(t, n) : void 0
		}
	}

	function _arrayLikeToArray(t, n) {
		const cssFinder = (() => {
			let e, t;

			function n(n, a) {
				if (n.nodeType !== Node.ELEMENT_NODE) throw Error("Can't generate CSS selector for non-element node type.");
				if ("html" === n.tagName.toLowerCase()) return "html";
				let o = {
					root: document.body,
					idName: e => !0,
					className: e => !0,
					tagName: e => !0,
					attr: (e, t) => !1,
					seedMinLength: 1,
					optimizedMinLength: 2,
					threshold: 1e3,
					maxNumberOfTries: 1e4
				};
				t = l((e = {
					...o,
					...a
				}).root, o);
				let u = r(n, "all", () => r(n, "two", () => r(n, "one", () => r(n, "none"))));
				if (u) {
					let f = v(E(u, n));
					return f.length > 0 && (u = f[0]), i(u)
				}
				throw Error("Selector was not found.")
			}

			function l(e, t) {
				return e.nodeType === Node.DOCUMENT_NODE ? e : e === t.root ? e.ownerDocument : e
			}

			function r(t, n, l) {
				let r = null,
					i = [],
					o = t,
					u = 0;
				for (; o;) {
					let s = _(f(o)) || _(...c(o)) || _(...m(o)) || _($(o)) || [p()],
						h = d(o);
					if ("all" == n) h && (s = s.concat(s.filter(y).map(e => g(e, h))));
					else if ("two" == n) s = s.slice(0, 1), h && (s = s.concat(s.filter(y).map(e => g(e, h))));
					else if ("one" == n) {
						let [N] = s = s.slice(0, 1);
						h && y(N) && (s = [g(N, h)])
					} else "none" == n && (s = [p()], h && (s = [g(s[0], h)]));
					for (let w of s) w.level = u;
					if (i.push(s), i.length >= e.seedMinLength && (r = a(i, l))) break;
					o = o.parentElement, u++
				}
				return (r || (r = a(i, l)), !r && l) ? l() : r
			}

			function a(t, n) {
				let l = v(w(t));
				if (l.length > e.threshold) return n ? n() : null;
				for (let r of l)
					if (u(r)) return r;
				return null
			}

			function i(e) {
				let t = e[0],
					n = t.name;
				for (let l = 1; l < e.length; l++) {
					let r = e[l].level || 0;
					n = t.level === r - 1 ? `${e[l].name} > ${n}` : `${e[l].name} ${n}`, t = e[l]
				}
				return n
			}

			function o(e) {
				return e.map(e => e.penalty).reduce((e, t) => e + t, 0)
			}

			function u(e) {
				let n = i(e);
				switch (t.querySelectorAll(n).length) {
					case 0:
						throw Error(`Can't select any node with this selector: ${n}`);
					case 1:
						return !0;
					default:
						return !1
				}
			}

			function f(t) {
				let n = t.getAttribute("id");
				return n && e.idName(n) ? {
					name: "#" + CSS.escape(n),
					penalty: 0
				} : null
			}

			function c(t) {
				let n = Array.from(t.attributes).filter(t => e.attr(t.name, t.value));
				return n.map(e => ({
					name: `[${CSS.escape(e.name)}="${CSS.escape(e.value)}"]`,
					penalty: .5
				}))
			}

			function s(e) {
				let t = e.length;
				return e.match(/[\-_][a-z0-9]*[0-9]+[a-z0-9]*/i) && (t += 50), e.match(/video|player|embed|^ad/i) && (t -= 75), t
			}

			function m(t) {
				let n = Array.from(t.classList).filter(e.className);
				n.sort((e, t) => s(e) - s(t));
				let l = n.map(e => ({
						name: "." + CSS.escape(e),
						penalty: 1
					})),
					r = t.tagName.toLowerCase();
				return (r.match(/video|iframe/) && l.unshift({
					name: r,
					penalty: 1
				}), l.length) ? h(l, 2).map(e => e.reduce((e, t) => (e.name += t.name, e.penalty += t.penalty, e.level = t.level, e), {
					name: "",
					penalty: 0
				})) : l
			}

			function h(e, t = 2) {
				let n = function(e, t, l, r) {
						if (0 == e) {
							l.length > 0 && r.push(l);
							return
						}
						for (let a = 0; a < t.length; a++) n(e - 1, t.slice(a + 1), l.concat([t[a]]), r)
					},
					l = [];
				for (let r = 0; r < Math.min(e.length, t + 1); r++) n(r, e, [], l);
				return e.length < t + 1 && l.push(e), l
			}

			function $(t) {
				let n = t.tagName.toLowerCase();
				return e.tagName(n) ? {
					name: n,
					penalty: 2
				} : null
			}

			function p() {
				return {
					name: "*",
					penalty: 3
				}
			}

			function d(e) {
				let t = e.parentNode;
				if (!t) return null;
				let n = t.firstChild;
				if (!n) return null;
				let l = 0;
				for (; n && (n.nodeType === Node.ELEMENT_NODE && l++, n !== e);) n = n.nextSibling;
				return l
			}

			function g(e, t) {
				return {
					name: e.name + `:nth-child(${t})`,
					penalty: e.penalty + 10
				}
			}

			function y(e) {
				return "html" !== e.name && !e.name.startsWith("#")
			}

			function _(...e) {
				let t = e.filter(N);
				return t.length > 0 ? t : null
			}

			function N(e) {
				return null != e
			}

			function* w(e, t = []) {
				if (e.length > 0)
					for (let n of e[0]) yield* w(e.slice(1, e.length), t.concat(n));
				else yield t
			}

			function v(e) {
				return [...e].sort((e, t) => o(e) - o(t))
			}

			function* E(t, n, l = {
				counter: 0,
				visited: new Map
			}) {
				if (t.length > 2 && t.length > e.optimizedMinLength)
					for (let r = 1; r < t.length - 1; r++) {
						if (l.counter > e.maxNumberOfTries) return;
						l.counter += 1;
						let a = [...t];
						a.splice(r, 1);
						let o = i(a);
						if (l.visited.has(o)) return;
						u(a) && L(a, n) && (yield a, l.visited.set(o, !0), yield* E(a, n, l))
					}
			}

			function L(e, n) {
				return t.querySelector(i(e)) === n
			}
			return n
		})();

		const VERSION = '3.1.5'

		const ctre = {
			hoveredElement: null, // the element that is being hovered
			markedElement: null, // either the hovered elm or its parent selected by transposing
			previewedHiddenSelector: null, // selector to temporarily unhide
			targetingMode: false,
			transpose: 0, // how far to travel up the line of ancestors
			maxZIndex: 2147483647,
			hiddenElements: [],
			settings: {},
			preventHighlightingUntil: 0, // block highlighting until this timestamp is passed - workaround for flashing, see below
			activeDialog: null,
			showPermissionsWarning: false, // host_permissions need to be granted manually in Firefox, this is shown when the user denies them
			undoStack: [], // added selectors that can be undone using ctrl+z

			helpWindow: null,

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

				ctre.$('#ctre_current_elm').innerHTML = ctre.getPathHTML(ctre.hoveredElement, ctre.transpose)
				ctre.$('#ctre_current_elm .pathNode.active').scrollIntoView({
					block: 'center'
				})
				// ctre.$('#ctre_current_elm').scrollTop = 9999
			},

			unhighlightElement: function() {
				document.querySelector('#ctre_highlighter')?.remove()
				ctre.markedElement = null
				ctre.hoveredElement = null
				ctre.$('#ctre_current_elm').innerHTML = 'Use the mouse to select an element to remove.'
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

				if (ctre.isChildOfCTREWindow(e.target)) {
					ctre.unhighlightElement()
					ctre.preventHighlightingUntil = +new Date() + 100
					return
				}

				if (ctre.hoveredElement != e.target) {
					ctre.transpose = 0;
					ctre.hoveredElement = e.target
					ctre.highlightElement()
				}
			},

			isChildOfCTREWindow: function(elm) {
				for (var i = 0; i < 8; i++) {
					if (elm == ctre.helpWindow) return true
					elm = elm.parentNode
					if (!elm) break
				}

				return false
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
					if (e.code == 'Escape') {
						ctre.deactivate()
					} else if (e.code == 'Space') {
						if (ctre.markedElement) ctre.hideTarget()
					} else if (e.key == 'w') {
						if (ctre.transpose > 0) ctre.transpose--
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

			hideTarget: function(mouseEvt /* optional */ ) {
				if (!ctre.markedElement) return
				if (mouseEvt && ctre.isChildOfCTREWindow(mouseEvt.target)) return

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

			getPathHTML: function(element, transpose) {
				function getElmName(elm) {
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
				if (ctre.isChildOfCTREWindow(e.target)) return

				e.preventDefault()
				e.stopPropagation()
				return false
			},

			updateCSS: function() {
				let cssLines = [
					`
			#ctre_wnd {
				position: fixed; bottom: 0; right: 10px;
				background: #fff; box-shadow: 0px 0px 40px rgba(0,0,0,0.15);
				border-radius: 3px 3px 0 0;
				z-index: ${ctre.maxZIndex};
			}

			@media (prefers-color-scheme: dark) {
				#ctre_wnd { background: #000; box-shadow: 0px 0px 40px rgba(255,255,255,0.15); }
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
						lines.push(`<tr>
					<td class="ct_selector"><a href="" class="ct_edit_selector">edit</a>${escapeHTML(elm.selector)}</td>
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

				function onChangePermanent() {
					var tr = closest(this, 'tr')
					let index = ctre.hiddenElements.findIndex(elm => elm.selector == tr.selector)
					var hiddenElement = ctre.hiddenElements[index]
					hiddenElement.permanent = this.checked

					ctre.updateSavedElements()
				}

				function onDeleteClick(e) {
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

				function onPreviewHoverOn(e) {
					let selector = closest(this, 'tr').selector
					if (!selector) return

					ctre.previewedHiddenSelector = selector
					ctre.updateCSS()
				}

				function onPreviewHoverOff(e) {
					let selector = closest(this, 'tr').selector
					if (!selector) return

					if (ctre.previewedHiddenSelector == selector) {
						ctre.previewedHiddenSelector = null
						ctre.updateCSS()
					}
				}

				function onEditSelector(e) {
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

					i++
				}
			},

			updateSavedElements: function() {
				chrome.runtime.sendMessage({
					action: 'set_saved_elms',
					website: location.hostname.replace(/^www\./, ''),
					data: JSON.stringify(ctre.hiddenElements.filter(elm => elm.permanent)),
				})
			},

			loadSavedElements: function() {
				chrome.runtime.sendMessage({
					action: 'get_saved_elms',
					website: location.hostname.replace(/^www\./, ''),
				}, function(data) {
					ctre.hiddenElements = JSON.parse(data)

					ctre.updateCSS()
					ctre.updateElementList()
				})

				chrome.runtime.sendMessage({
					action: 'get_settings',
				}, function(data) {
					ctre.settings = JSON.parse(data)
				})
			},

			updateSettingsUI: function() {
				ctre.$('#ctre_opt_remember').innerHTML = ctre.settings.remember ?
					'<input type="checkbox" checked>' :
					'<input type="checkbox">'
			},

			saveSettings: function() {
				chrome.runtime.sendMessage({
					action: 'set_settings',
					data: JSON.stringify(ctre.settings),
				})
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
				shadowElm.attachShadow({
					mode: 'open'
				})
				shadowElm.style.visibility = 'hidden'
				document.body.appendChild(shadowElm)

				ctre.helpWindow = shadowElm

				shadowElm.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="${chrome.runtime.getURL('content.css')}">
			<div class="mainWindow">
				<div class="header">
					<span class="header__logo">Zapp
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="-300 -300 600 600">
						<circle r="50"/>
						<path d="M75,0 A 75,75 0 0,0 37.5,-64.952 L 125,-216.506 A 250,250 0 0,1 250,0 z" id="bld"/>
						<use xlink:href="#bld" transform="rotate(120)"/>
						<use xlink:href="#bld" transform="rotate(240)"/>
						</svg>
					</span>
					<span class="header__version">${VERSION}</span>
					<span class="header__logo header__logo_small">zapp</span>
				</div>
				
				<hr/>

				<div class="topButtons">
					<div class="topButton topButton_settings" title="Advanced options">
						<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
					</div>
            <div class="topButton topButton_drag" title="Drag window"><i>⇕</i></div>
					<div class="topButton topButton_minimize" title="Minimize"><i>➜</i></div>
					<div class="topButton topButton_close" title="Close">✖</div>
				</div>

				${ctre.showPermissionsWarning ? '<div class="ffWarning"><p>⚠ Your browser requires you to approve the website access permission <b>manually</b>. Zapp needs this permission in order to remove elements you chose to hide permanently.</p><p>You should be asked for this permission the next time you activate the extension.</p></div>' : ''}

				<div id="ctre_current_elm">Use the mouse to select an element to remove.</div>
				<div id="ctre_elm_list"></div>
				<div class="settingsRow">
					<label>
						Remember by default: <span id="ctre_opt_remember">?</span>
					</label>
				</div>
			</div>
		`

        const dragButton = ctre.$('.topButton_drag');
        const host = shadowElm; // the container element with id 'ctre_wnd'
        
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        
        dragButton.addEventListener('mousedown', function(e) {
            isDragging = true;
            // Get the current bounding rectangle of the host
            const rect = host.getBoundingClientRect();
            // Calculate the offset between the mouse click and the top-left corner of the window
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            // Optionally, change cursor or add a class to indicate dragging
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            e.preventDefault();
        });
        
        function onMouseMove(e) {
            if (!isDragging) return;
            // Update the host position so that the window follows the mouse
            host.style.position = 'fixed';
            host.style.left = (e.clientX - offsetX) + 'px';
            host.style.top = (e.clientY - offsetY) + 'px';
        }
        
        function onMouseUp(e) {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        
				ctre.$('link').addEventListener('load', () => {
					// prevent "flash of unstyled content" in the shadow DOM
					shadowElm.style.visibility = 'visible'
				})

				chrome.runtime.sendMessage({
					action: 'get_hotkey'
				}, (hotkey) => {
					if (!hotkey) return

					let keys = hotkey.split(/\+/)
					let elm = ctre.$('.activationKeys')
					let html = [
						...keys.map(key => `<span class="key">${key}</span>`),
						' : toggle CTRE',
					]

					if (elm) elm.innerHTML = html.join('')
				})

				ctre.$('.activationKeys_changeable')?.addEventListener('click', function(e) {
					chrome.runtime.sendMessage({
						action: 'goto_hotkey_settings'
					})
					e.preventDefault()
				})

				ctre.$('.topButton_close').addEventListener('click', function(e) {
					ctre.deactivate()
					e.preventDefault()
				})

				ctre.$('.topButton_minimize').addEventListener('click', function(e) {
					ctre.$('.mainWindow').classList.toggle('minimized')
					e.preventDefault()
				})

				ctre.$('.topButton_settings').addEventListener('click', function(e) {
					ctre.activateDialog(AdvOptionsDialog)
					e.preventDefault()
				})

				ctre.$('#ctre_opt_remember').addEventListener('click', function(e) {
					ctre.settings.remember = !ctre.settings.remember
					ctre.saveSettings()
					ctre.updateSettingsUI()
					e.preventDefault()
				})

				ctre.updateElementList()
				ctre.updateSettingsUI()

				ctre.targetingMode = true
				document.addEventListener('mouseover', ctre.handleMouseover, true)
				document.addEventListener('mousedown', ctre.hideTarget, true)
				document.addEventListener('mouseup', ctre.preventEvent, true)
				document.addEventListener('click', ctre.preventEvent, true)
				document.addEventListener('scroll', ctre.updateHighlighterPos, true)

				ctre.addOverlays()

				chrome.runtime.sendMessage({
					action: 'status',
					active: true
				})

				setTimeout(function() {
					ctre.$('.header__logo').classList.add('header__logo_anim')
				}, 100)
			},

			deactivate: function() {
				ctre.targetingMode = false

				ctre.deactivateDialog()

				ctre.unhighlightElement()

				ctre.helpWindow.parentNode.removeChild(ctre.helpWindow)

				document.removeEventListener('mouseover', ctre.handleMouseover, true)
				document.removeEventListener('mousedown', ctre.hideTarget, true)
				document.removeEventListener('mouseup', ctre.preventEvent, true)
				document.removeEventListener('click', ctre.preventEvent, true)
				document.removeEventListener('scroll', ctre.updateHighlighterPos, true)

				ctre.removeOverlays()

				chrome.runtime.sendMessage({
					action: 'status',
					active: false
				})
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

			refreshOverlays: function() {
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
				<div class="topButton topButton_close" title="Close">✖</div>
			</div>

			<div class="advOptions">
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

				this.elm.querySelector('.topButton_close').addEventListener('click', (e) => {
					close()
					e.preventDefault()
				})

				this.elm.querySelector('.advOptions__export').addEventListener('click', (e) => {
					chrome.runtime.sendMessage({
							action: 'export_settings'
						})
						.then((data) => {
							let link = document.createElement('a')

							let blob = new Blob([data], {
								type: 'application/json'
							})
							let url = URL.createObjectURL(blob)
							setTimeout(() => URL.revokeObjectURL(url), 30000)

							link.href = url
							link.target = '_blank'
							link.rel = 'noopener'
							link.download = 'CTRE export ' + new Date().toLocaleString('sv-SE').replace(/[^0-9\- ]/g, '-') + '.json'
							link.click()
						})
					e.preventDefault()
				})

				this.elm.querySelector('.advOptions__import input').addEventListener('change', function(e) {
					let input = this
					let file = this.files[0]

					;
					(async () => {
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

						let result = await chrome.runtime.sendMessage({
							action: 'import_settings',
							data: text
						})
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

		(null == n || n > t.length) && (n = t.length);
		for (var r = 0, e = new Array(n); r < n; r++) e[r] = t[r];
		return e
	}

	function _iterableToArrayLimit(t, n) {
		var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
		if (null != r) {
			var e, o, u = [],
				i = !0,
				a = !1;
			try {
				for (r = r.call(t); !(i = (e = r.next()).done) && (u.push(e.value), !n || u.length !== n); i = !0);
			} catch (t) {
				a = !0, o = t
			} finally {
				try {
					i || null == r.return || r.return()
				} finally {
					if (a) throw o
				}
			}
			return u
		}
	}

	function _arrayWithHoles(t) {
		if (Array.isArray(t)) return t
	}

	function _typeof(t) {
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, _typeof(t)
	}! function(t, n) {
		"object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n((t = "undefined" != typeof globalThis ? globalThis : t || self).idbKeyval = {})
	}(this, (function(t) {
		"use strict";

		function n(t) {
			return new Promise((function(n, r) {
				t.oncomplete = t.onsuccess = function() {
					return n(t.result)
				}, t.onabort = t.onerror = function() {
					return r(t.error)
				}
			}))
		}

		function r(t, r) {
			var e = indexedDB.open(t);
			e.onupgradeneeded = function() {
				return e.result.createObjectStore(r)
			};
			var o = n(e);
			return function(t, n) {
				return o.then((function(e) {
					return n(e.transaction(r, t).objectStore(r))
				}))
			}
		}
		var e;

		function o() {
			return e || (e = r("keyval-store", "keyval")), e
		}

		function u(t, r) {
			return t.openCursor().onsuccess = function() {
				this.result && (r(this.result), this.result.continue())
			}, n(t.transaction)
		}
		t.clear = function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o();
			return t("readwrite", (function(t) {
				return t.clear(), n(t.transaction)
			}))
		}, t.createStore = r, t.del = function(t) {
			var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o();
			return r("readwrite", (function(r) {
				return r.delete(t), n(r.transaction)
			}))
		}, t.delMany = function(t) {
			var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o();
			return r("readwrite", (function(r) {
				return t.forEach((function(t) {
					return r.delete(t)
				})), n(r.transaction)
			}))
		}, t.entries = function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o();
			return t("readonly", (function(r) {
				if (r.getAll && r.getAllKeys) return Promise.all([n(r.getAllKeys()), n(r.getAll())]).then((function(t) {
					var n = _slicedToArray(t, 2),
						r = n[0],
						e = n[1];
					return r.map((function(t, n) {
						return [t, e[n]]
					}))
				}));
				var e = [];
				return t("readonly", (function(t) {
					return u(t, (function(t) {
						return e.push([t.key, t.value])
					})).then((function() {
						return e
					}))
				}))
			}))
		}, t.get = function(t) {
			var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o();
			return r("readonly", (function(r) {
				return n(r.get(t))
			}))
		}, t.getMany = function(t) {
			var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o();
			return r("readonly", (function(r) {
				return Promise.all(t.map((function(t) {
					return n(r.get(t))
				})))
			}))
		}, t.keys = function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o();
			return t("readonly", (function(t) {
				if (t.getAllKeys) return n(t.getAllKeys());
				var r = [];
				return u(t, (function(t) {
					return r.push(t.key)
				})).then((function() {
					return r
				}))
			}))
		}, t.promisifyRequest = n, t.set = function(t, r) {
			var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : o();
			return e("readwrite", (function(e) {
				return e.put(r, t), n(e.transaction)
			}))
		}, t.setMany = function(t) {
			var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o();
			return r("readwrite", (function(r) {
				return t.forEach((function(t) {
					return r.put(t[1], t[0])
				})), n(r.transaction)
			}))
		}, t.update = function(t, r) {
			var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : o();
			return e("readwrite", (function(e) {
				return new Promise((function(o, u) {
					e.get(t).onsuccess = function() {
						try {
							e.put(r(this.result), t), o(n(e.transaction))
						} catch (t) {
							u(t)
						}
					}
				}))
			}))
		}, t.values = function() {
			var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o();
			return t("readonly", (function(t) {
				if (t.getAll) return n(t.getAll());
				var r = [];
				return u(t, (function(t) {
					return r.push(t.value)
				})).then((function() {
					return r
				}))
			}))
		}, Object.defineProperty(t, "__esModule", {
			value: !0
		})
	}));
})()

// We need this in Firefox, which treats host_permissions as optional (basically as non-existent)
// and we need to request '*://*/*' explicitly.
let permissionsGranted = true

function setActive() {
	chrome.action.setIcon({
		path: 'icons/action_active.png'
	})
	chrome.action.setTitle({
		title: 'Click to remove element [active]'
	})
}

function setInactive() {
	chrome.action.setIcon({
		path: 'icons/action_inactive.png'
	})
	chrome.action.setTitle({
		title: 'Click to remove element'
	})
}

async function checkActive() {
	let tabs = await chrome.tabs.query({
		active: true,
		currentWindow: true
	})
	if (!tabs || !tabs.length || tabs[0].id < 0) return // not really a tab, most likely a devtools window
	let tab = tabs[0]

	if (tab.url?.substr(0, 4) != 'http') {
		chrome.action.setIcon({
			path: 'icons/action_unavailable.png'
		})
		chrome.action.setTitle({
			title: 'Click to remove element [unavailable for this tab]'
		})
		return
	} else {}

	let isActive = await chrome.tabs.sendMessage(tab.id, {
		action: 'getStatus'
	}).catch(() => null)

	if (isActive) {
		setActive()
	} else {
		setInactive()
	}
}

async function handleActionClick() {
	if (!permissionsGranted) {
		// Firefox workaround - request permissions
		permissionsGranted = await chrome.permissions.request({
			origins: ['*://*/*']
		})
	}

	let tabs = await chrome.tabs.query({
		active: true,
		currentWindow: true
	})

	if (!tabs || !tabs.length || tabs[0].id < 0) return // not really a tab, most likely a devtools window
	let tab = tabs[0]

	let response = await chrome.tabs.sendMessage(tab.id, {
			action: 'toggle',
			permissionsGranted
		})
		.catch(() => null)

	if (!response) {
		try {
			await chrome.scripting.executeScript({
				files: ['ctre_content.js'],
				target: {
					tabId: tab.id
				}
			})
			await chrome.tabs.sendMessage(tab.id, {
				action: 'toggle',
				permissionsGranted
			})
		} catch (ex) {
			// this is likely a protected tab (chrome://, etc.) - ignore
		}
	}
}

function handleMessage(msg, sender, sendResponse) {
	const IS_ASYNC = true

	switch (msg.action) {
		case 'status':
			msg.active ? setActive() : setInactive()

			break

		case 'get_saved_elms':
			idbKeyval.get('web:' + msg.website).then(data => sendResponse(data || '[]'))

			return IS_ASYNC

		case 'set_saved_elms':
			idbKeyval.set('web:' + msg.website, msg.data)

			return IS_ASYNC

		case 'get_settings':
			idbKeyval.get('settings').then((data) => {
				let settings = JSON.parse(data || '{}')

				sendResponse(JSON.stringify(settings))
			})

			return IS_ASYNC

		case 'set_settings':
			let settings = JSON.parse(msg.data)
			if ('regInfo' in settings) delete settings.regInfo

			idbKeyval.set('settings', JSON.stringify(settings))

			return IS_ASYNC

		case 'get_hotkey':
			chrome.commands.getAll((cmds) => {
				sendResponse(cmds?.[0]?.shortcut || 'No key set')
			})

			return IS_ASYNC
		case 'goto_hotkey_settings':
			chrome.tabs.create({
					active: true,
					url: 'chrome://extensions/shortcuts'
				})
				.catch(() => {
					// firefox refuses to open this ¯\_(ツ)_/¯
					chrome.tabs.create({
						active: true,
						url: 'about:addons'
					})
				})

			break

		case 'export_settings':
			idbKeyval.entries().then((entries) => {
				entries = entries.filter((entry) => entry[1] != '[]' && entry[0] != 'license')
				let exportedObj = Object.fromEntries(entries)
				exportedObj.version = 1

				sendResponse(JSON.stringify(exportedObj, null, 2))
			})

			return IS_ASYNC

		case 'import_settings':
			(async () => {
				try {
					let obj = JSON.parse(msg.data)
					if (obj.version !== 1) throw new Error('Invalid version in data')

					let entries = Object.entries(obj)
					entries.filter(entry => entry[0].match(/^settings$|^version$|^web:/))

					await idbKeyval.clear()
					await idbKeyval.setMany(entries)

					sendResponse('SUCCESS')
				} catch (err) {
					sendResponse(err?.message || err?.toString() || 'Unknown error occured')
				}
			})()

			return IS_ASYNC

		default:
	}
}

chrome.permissions.contains({
	origins: ['*://*/*']
}).then(result => permissionsGranted = result)

chrome.action.onClicked.addListener(handleActionClick)

chrome.runtime.onMessage.addListener(handleMessage)

chrome.tabs.onActivated.addListener((activeInfo) => {
	checkActive()
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	checkActive()
})

checkActive()