
(() => {
    // console.log("CTRE Content Script: Executing."); // Initial log

    // --- Helper functions (_slicedToArray, etc.) ---
    function _slicedToArray(t, n) { return _arrayWithHoles(t) || _iterableToArrayLimit(t, n) || _unsupportedIterableToArray(t, n) || _nonIterableRest() } function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") } function _unsupportedIterableToArray(t, n) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, n); var r = Object.prototype.toString.call(t).slice(8, -1); return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(t, n) : void 0 } } function _arrayLikeToArray(t, n) { (null == n || n > t.length) && (n = t.length); for (var r = 0, e = new Array(n); r < n; r++) e[r] = t[r]; return e } function _iterableToArrayLimit(t, n) { var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"]; if (null != r) { var e, o, u = [], i = !0, a = !1; try { for (r = r.call(t); !(i = (e = r.next()).done) && (u.push(e.value), !n || u.length !== n); i = !0); } catch (t) { a = !0, o = t } finally { try { i || null == r.return || r.return() } finally { if (a) throw o } } return u } } function _arrayWithHoles(t) { if (Array.isArray(t)) return t } function _typeof(t) { return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }, _typeof(t) }

    // --- cssFinder ---
    const cssFinder = (() => {
        let e, t; function n(n, a) { if (n.nodeType !== Node.ELEMENT_NODE) throw Error("Can't generate CSS selector for non-element node type."); if ("html" === n.tagName.toLowerCase()) return "html"; let o = { root: document.body, idName: e => !0, className: e => !0, tagName: e => !0, attr: (e, t) => !1, seedMinLength: 1, optimizedMinLength: 2, threshold: 1e3, maxNumberOfTries: 1e4 }; t = l((e = { ...o, ...a }).root, o); let u = r(n, "all", () => r(n, "two", () => r(n, "one", () => r(n, "none")))); if (u) { let f = v(E(u, n)); return f.length > 0 && (u = f[0]), i(u) } throw Error("Selector was not found.") } function l(e, t) { return e.nodeType === Node.DOCUMENT_NODE ? e : e === t.root ? e.ownerDocument : e } function r(t, n, l) { let r = null, i = [], o = t, u = 0; for (; o;) { let s = _(f(o)) || _(...c(o)) || _(...m(o)) || _($(o)) || [p()], h = d(o); if ("all" == n) h && (s = s.concat(s.filter(y).map(e => g(e, h)))); else if ("two" == n) s = s.slice(0, 1), h && (s = s.concat(s.filter(y).map(e => g(e, h)))); else if ("one" == n) { let [N] = s = s.slice(0, 1); h && y(N) && (s = [g(N, h)]) } else "none" == n && (s = [p()], h && (s = [g(s[0], h)])); for (let w of s) w.level = u; if (i.push(s), i.length >= e.seedMinLength && (r = a(i, l))) break; o = o.parentElement, u++ } return (r || (r = a(i, l)), !r && l) ? l() : r } function a(t, n) { let l = v(w(t)); if (l.length > e.threshold) return n ? n() : null; for (let r of l) if (u(r)) return r; return null } function i(e) { let t = e[0], n = t.name; for (let l = 1; l < e.length; l++) { let r = e[l].level || 0; n = t.level === r - 1 ? `${e[l].name} > ${n}` : `${e[l].name} ${n}`, t = e[l] } return n } function o(e) { return e.map(e => e.penalty).reduce((e, t) => e + t, 0) } function u(e) { let n = i(e); switch (t.querySelectorAll(n).length) { case 0: console.error(`CSS Finder: Can't select any node with this selector: ${n}`); return !1; /* throw Error(`Can't select any node with this selector: ${n}`); */ case 1: return !0; default: return !1 } } function f(t) { let n = t.getAttribute("id"); return n && e.idName(n) ? { name: "#" + CSS.escape(n), penalty: 0 } : null } function c(t) { let n = Array.from(t.attributes).filter(t => e.attr(t.name, t.value)); return n.map(e => ({ name: `[${CSS.escape(e.name)}="${CSS.escape(e.value)}"]`, penalty: .5 })) } function s(e) { let t = e.length; return e.match(/[\-_][a-z0-9]*[0-9]+[a-z0-9]*/i) && (t += 50), e.match(/video|player|embed|^ad/i) && (t -= 75), t } function m(t) { let n = Array.from(t.classList).filter(e.className); n.sort((e, t) => s(e) - s(t)); let l = n.map(e => ({ name: "." + CSS.escape(e), penalty: 1 })), r = t.tagName.toLowerCase(); return (r.match(/video|iframe/) && l.unshift({ name: r, penalty: 1 }), l.length) ? h(l, 2).map(e => e.reduce((e, t) => (e.name += t.name, e.penalty += t.penalty, e.level = t.level, e), { name: "", penalty: 0 })) : l } function h(e, t = 2) { let n = function (e, t, l, r) { if (0 == e) { l.length > 0 && r.push(l); return } for (let a = 0; a < t.length; a++) n(e - 1, t.slice(a + 1), l.concat([t[a]]), r) }, l = []; for (let r = 0; r < Math.min(e.length, t + 1); r++) n(r, e, [], l); return e.length < t + 1 && l.push(e), l } function $(t) { let n = t.tagName.toLowerCase(); return e.tagName(n) ? { name: n, penalty: 2 } : null } function p() { return { name: "*", penalty: 3 } } function d(e) { let t = e.parentNode; if (!t) return null; let n = t.firstChild; if (!n) return null; let l = 0; for (; n && (n.nodeType === Node.ELEMENT_NODE && l++, n !== e);) n = n.nextSibling; return l } function g(e, t) { return { name: e.name + `:nth-child(${t})`, penalty: e.penalty + 10 } } function y(e) { return "html" !== e.name && !e.name.startsWith("#") } function _(...e) { let t = e.filter(N); return t.length > 0 ? t : null } function N(e) { return null != e } function* w(e, t = []) { if (e.length > 0) for (let n of e[0]) yield* w(e.slice(1, e.length), t.concat(n)); else yield t } function v(e) { return [...e].sort((e, t) => o(e) - o(t)) } function* E(t, n, l = { counter: 0, visited: new Map }) { if (t.length > 2 && t.length > e.optimizedMinLength) for (let r = 1; r < t.length - 1; r++) { if (l.counter > e.maxNumberOfTries) return; l.counter += 1; let a = [...t]; a.splice(r, 1); let o = i(a); if (l.visited.has(o)) continue; /* return; */ u(a) && L(a, n) && (yield a, l.visited.set(o, !0), yield* E(a, n, l)) } } function L(e, n) { try { return t.querySelector(i(e)) === n } catch(err) { console.warn("CSS Finder: Error during L querySelector:", err); return false; } } return n
    })();

    const VERSION = '3.1.5';

    // --- Core CTRE Logic ---
    const ctre = {
        hoveredElement: null,
        markedElement: null,
        previewedHiddenSelector: null,
        targetingMode: false, // Is the selection UI active?
        transpose: 0,
        maxZIndex: 2147483647,
        hiddenElements: [], // Elements hidden in *this* session/page
        settings: {}, // Loaded from background
        preventHighlightingUntil: 0,
        activeDialog: null,
        showPermissionsWarning: false, // Set based on message from background
        undoStack: [],
        helpWindow: null, // Reference to the injected UI window
        isInitialized: false, // Prevent multiple initializations

        $: function(query) {
            if (!this.helpWindow?.shadowRoot) return null; // Add checks
            return this.helpWindow.shadowRoot.querySelector(query);
        },
        $$: function(query) {
            if (!this.helpWindow?.shadowRoot) return []; // Return empty array
            return this.helpWindow.shadowRoot.querySelectorAll(query);
        },

        triggerResize: function() {
            let evt = document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);
            // Debounce overlay refresh slightly
            setTimeout(() => { ctre.refreshOverlays(); }, 50);
        },

        highlightElement: function() {
            if (!ctre.hoveredElement) return;

            let markedElement = ctre.hoveredElement;
            if (markedElement.className == "ctre_overlay") {
                markedElement = markedElement.relatedElement;
            }
            if (!markedElement || !markedElement.parentNode) return; // Add check

            let i = 0;
            for (i = 0; i < ctre.transpose; i++) {
                // Stop if parent is null or not an ELEMENT node or document itself
                if (!markedElement.parentNode || markedElement.parentNode.nodeType !== Node.ELEMENT_NODE || markedElement.parentNode === document) {
                    break;
                }
                markedElement = markedElement.parentNode;
            }
            ctre.transpose = i;

            if (markedElement == ctre.markedElement) return;
            ctre.markedElement = markedElement;

            let highlighter = document.getElementById('ctre_highlighter'); // Use ID selector

            if (!highlighter) {
                if (!document.body) return; // Cannot append if body not ready
                highlighter = document.createElement('div');
                highlighter.id = 'ctre_highlighter';
                highlighter.style.pointerEvents = 'none';
                highlighter.style.position = 'fixed'; // Use fixed for viewport positioning
                highlighter.style.background = 'rgba(255,128,128,0.4)';
                highlighter.style.zIndex = ctre.maxZIndex - 1;
                highlighter.style.border = '1px dashed red'; // Make it more visible
                highlighter.style.margin = '0'; // Reset margin
                highlighter.style.padding = '0'; // Reset padding
                document.body.appendChild(highlighter);
            }

            ctre.updateHighlighterPos();

            const currentElmDiv = ctre.$('#ctre_current_elm');
            if (currentElmDiv) {
                try {
                    currentElmDiv.innerHTML = ctre.getPathHTML(ctre.hoveredElement, ctre.transpose);
                    const activeNode = ctre.$('#ctre_current_elm .pathNode.active');
                    if (activeNode && typeof activeNode.scrollIntoView === 'function') {
                         activeNode.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                    }
                } catch (e) {
                     console.error("Error updating path HTML:", e);
                     currentElmDiv.textContent = 'Error generating path.';
                }
            }
        },

        unhighlightElement: function() {
            document.getElementById('ctre_highlighter')?.remove(); // Use ID selector
            ctre.markedElement = null;
            ctre.hoveredElement = null;
            const currentElmDiv = ctre.$('#ctre_current_elm');
            if (currentElmDiv) { // Check if UI exists
                currentElmDiv.textContent = 'Use the mouse to select an element to remove.';
            }
        },

        updateHighlighterPos: function() {
            if (!ctre.markedElement) return; // Check if element still exists
            let highlighter = document.getElementById('ctre_highlighter'); // Use ID selector
            if (!highlighter) return;

            try {
                const rect = ctre.markedElement.getBoundingClientRect();
                if (!rect || rect.width === 0 || rect.height === 0) {
                    // Handle cases where element might be hidden or display:none
                    highlighter.style.display = 'none';
                    return;
                }
                highlighter.style.display = 'block'; // Ensure visible
                highlighter.style.left = rect.left + 'px';
                highlighter.style.top = rect.top + 'px';
                highlighter.style.width = rect.width + 'px';
                highlighter.style.height = rect.height + 'px';
            } catch (e) {
                 console.warn("Could not get bounding rect for marked element", e);
                 highlighter.style.display = 'none'; // Hide if error
            }
        },


        handleMouseover: function(e) {
            if (+new Date() < ctre.preventHighlightingUntil) return;
            if (ctre.activeDialog) return;
            if (!ctre.targetingMode) return; // Only highlight when active

             // Ignore events on the UI window itself or the highlighter
             if (e.target.id === 'ctre_highlighter' || ctre.isChildOfCTREWindow(e.target)) {
                 // Only unhighlight if the mouse *moves onto* the window/highlighter
                 if (ctre.hoveredElement && !ctre.isChildOfCTREWindow(ctre.hoveredElement) && ctre.hoveredElement.id !== 'ctre_highlighter') {
                     ctre.unhighlightElement();
                     ctre.preventHighlightingUntil = +new Date() + 100; // Prevent immediate re-highlighting
                 }
                 return;
             }

            if (ctre.hoveredElement !== e.target) {
                ctre.transpose = 0; // Reset transpose when element changes
                ctre.hoveredElement = e.target;
                ctre.highlightElement();
            }
        },

        isChildOfCTREWindow: function(elm) {
             if (!ctre.helpWindow) return false;
             // Check if elm is the host or inside its shadow root
             return elm === ctre.helpWindow || ctre.helpWindow.shadowRoot?.contains(elm);
             /* Old loop method is less reliable with shadow DOM
             for (var i = 0; i < 8; i++) {
                 if (!elm) break; // Stop if elm becomes null
                 if (elm === ctre.helpWindow) return true;
                 elm = elm.parentNode;
             }
             return false;
             */
        },

        handleKeydown: function(e) {
            if (!ctre.targetingMode) return;

            if (ctre.activeDialog) {
                if (e.code === 'Escape') {
                    ctre.deactivateDialog();
                    e.stopPropagation(); e.preventDefault();
                }
            } else {
                let handled = false;
                if (e.code === 'Escape') { ctre.deactivate(); handled = true; }
                else if (e.code === 'Space') { if (ctre.markedElement) { ctre.hideTarget(); handled = true; } }
                else if (e.key === 'w') { if (ctre.transpose > 0) { ctre.transpose--; ctre.highlightElement(); handled = true; } }
                else if (e.key === 'q') { ctre.transpose++; ctre.highlightElement(); handled = true; }
                else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) { ctre.maybeUndo(); handled = true; }

                if (handled) { e.stopPropagation(); e.preventDefault(); }
            }
        },

        handleKeyup: function(e) {
            if (!ctre.targetingMode || ctre.activeDialog) return;
            // Prevent default only if we actually handled the keydown
             if (['Escape', 'Space', 'w', 'q', 'z'].includes(e.key)) {
                 e.stopPropagation(); e.preventDefault();
             }
        },

        hideTarget: function(mouseEvt /* optional */ ) {
            if (!ctre.targetingMode) return; // Don't hide if not active
            if (!ctre.markedElement) return;
            // Allow clicking anywhere except the help window to hide
            if (mouseEvt && ctre.isChildOfCTREWindow(mouseEvt.target)) return;

            // Use left-click only for hiding via mouse
            if (mouseEvt && mouseEvt.button !== 0) {
                mouseEvt?.preventDefault(); mouseEvt?.stopPropagation();
                return;
            }

            let selector;
            try {
                 selector = ctre.getSelector(ctre.markedElement);
            } catch (e) {
                 console.error("CTRE: Failed to get selector:", e);
                 alert("Could not generate a unique CSS selector for this element.");
                 return;
            }

            if (!selector) {
                 console.warn("CTRE: Null selector generated.");
                 alert("Could not generate a selector for this element.");
                 return;
            }


            console.log("CTRE: Hiding target with selector:", selector);
            const elementToHide = ctre.markedElement; // Keep reference before unhighlighting
            ctre.unhighlightElement();

            if (!ctre.hiddenElements.some(el => el.selector === selector)) {
                 ctre.hiddenElements.push({
                    selector,
                    permanent: !!ctre.settings.remember,
                 });
                 ctre.undoStack.push({ selector: selector, element: elementToHide }); // Store element ref for potential undo display?
                 ctre.updateCSS();
                 ctre.updateElementList();
                 ctre.triggerResize();
                 ctre.refreshOverlays();
                 ctre.updateSavedElements();
            } else {
                 console.log("CTRE: Selector already hidden:", selector);
            }

            mouseEvt?.preventDefault();
            mouseEvt?.stopPropagation();
        },

        maybeUndo: function() {
            let itemToUndo = ctre.undoStack.pop();
            if (!itemToUndo) { console.log("CTRE: Undo stack empty."); return; }

            console.log("CTRE: Undoing hide for selector:", itemToUndo.selector);

            // Filter out the specific element based on selector
            ctre.hiddenElements = ctre.hiddenElements.filter(item => item.selector !== itemToUndo.selector);

            ctre.updateCSS();
            ctre.refreshOverlays(); // Refresh overlays as element reappears
            ctre.updateElementList(); // Update UI list
            ctre.updateSavedElements(); // Update persistent storage
            // Maybe briefly highlight the element that was restored? (optional)
        },

        getSelector: function(element) {
            if (!element) return null;
            if (element.tagName === 'BODY') return 'body';
            if (element.tagName === 'HTML') return 'html';
            // Call the cssFinder library
            return cssFinder(element, { optimizedMinLength: 2 }); // Adjust options if needed
        },

        getPathHTML: function(element, transpose) {
            if (!element) return 'No element selected.';
             function getElmName(elm) {
                 if (elm.id) { return "#" + elm.id; }
                 // Limit class name length/complexity
                 if (typeof elm.className === "string" && elm.className.trim().length) {
                      const classes = elm.className.trim().split(/\s+/).slice(0, 2); // Max 2 classes
                      return elm.tagName.toLowerCase() + "." + classes.join(".");
                 }
                 return elm.tagName.toLowerCase();
             }

            let path = [];
            let currentElm = element;
            if (currentElm.className === "ctre_overlay") {
                currentElm = currentElm.relatedElement;
            }

            let count = 0; // Prevent infinite loops
            while (currentElm && currentElm.nodeType === Node.ELEMENT_NODE && count < 30) {
                path.push(currentElm);
                if (currentElm.tagName === 'HTML') break; // Stop at HTML
                currentElm = currentElm.parentElement;
                count++;
            }
            if (count >= 30) console.warn("CTRE: Path generation stopped early.");

            path = path.reverse();
            if (path.length === 0) return 'Cannot generate path.';

            let html = [];
            const activeIndex = path.length - 1 - transpose;
            for (let i = 0; i < path.length; i++) {
                 html.push(`<span class="pathNode${i === activeIndex ? " active" : ""}">${escapeHTML(getElmName(path[i]))}</span>`);
            }
            return html.join('<span class="pathSeparator" aria-hidden="true">></span>');
        },

        preventEvent: function(e) {
            // Only prevent clicks etc. if targeting mode is on and event is outside help window
            if (ctre.targetingMode && !ctre.isChildOfCTREWindow(e.target)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            return true; // Allow event otherwise
        },

        updateCSS: function() {
             if (!document.head) return; // Cannot add style if head doesn't exist
            let cssLines = [
                `/* CTRE Base Styles */
                #ctre_wnd { display: block; position: fixed; bottom: 0; right: 10px; background: #fff; color: #000; box-shadow: 0px 0px 40px rgba(0,0,0,0.15); border-radius: 3px 3px 0 0; z-index: ${ctre.maxZIndex}; font-family: sans-serif; font-size: 13px; }
                @media (prefers-color-scheme: dark) {
                    #ctre_wnd { background: #222; color: #eee; box-shadow: 0px 0px 40px rgba(255,255,255,0.15); }
                }`
            ];

            for (let i = 0; i < ctre.hiddenElements.length; i++) { // Use standard loop
                let item = ctre.hiddenElements[i];
                if (!item || !item.selector) continue; // Skip invalid items
                let selector = item.selector;
                try {
                     // Basic validation - does it look like a selector?
                     if (!selector.match(/^[a-zA-Z0-9\s.#\[\]>+~*:\-_(),="'$%^&]+$/)) {
                         console.warn("CTRE: Skipping potentially invalid selector:", selector);
                         continue;
                     }
                     // Escape characters that might break CSS comment syntax if selector is user-edited
                     let safeSelectorComment = selector.replace(/\*\//g, '* /');

                    if (selector === ctre.previewedHiddenSelector) {
                        cssLines.push(`/* Previewing */ ${selector} { outline: solid 5px rgba(0,214,255,0.5) !important; outline-offset: -5px; animation: ctrePreviewPulse 1s infinite; }`);
                    } else if (selector === 'body' || selector === 'html') {
                        // Avoid display:none on body/html, make background transparent
                        cssLines.push(`/* Hiding ${safeSelectorComment} (background only) */ ${selector} { background: transparent !important; }`);
                    } else {
                        cssLines.push(`/* Hiding ${safeSelectorComment} */ ${selector} { display: none !important; }`);
                    }
                } catch (e) {
                     console.error("CTRE: Error processing selector for CSS:", selector, e);
                }
            }

            // Safeguard against hiding everything
            if (ctre.hiddenElements.length > 0) {
                cssLines.push(`/* Safeguards */ html, html > body { display: block !important; } #ctre_wnd { display: block !important; }`);
            }

            // Add preview pulse animation
            cssLines.push(`@keyframes ctrePreviewPulse { 0% { outline-color: rgba(0,214,255,0.5); } 50% { outline-color: rgba(0,214,255,0.9); } 100% { outline-color: rgba(0,214,255,0.5); } }`);


            let styleElm = document.getElementById('ctre_styles'); // Use ID
            if (!styleElm) {
                styleElm = document.createElement('style');
                styleElm.id = "ctre_styles";
                 // Prepend to head to ensure it loads early but allows page styles to override if needed (though !important helps)
                document.head.insertBefore(styleElm, document.head.firstChild);
            }
            styleElm.textContent = cssLines.join('\n'); // Use textContent for performance
        },

        updateElementList: function() {
            if (!ctre.helpWindow) return; // Check if UI exists
            let elmList = ctre.$('#ctre_elm_list');
            if (!elmList) return; // Check if list container exists

            let lines = [];
            if (ctre.hiddenElements.length > 0) {
                lines.push('<table class="ct_element_table"><thead><tr class="ct_heading"><th>Removed Element</th><th>Remember?</th><th>Actions</th></tr></thead><tbody>'); // Use thead/tbody

                for (let i = 0; i < ctre.hiddenElements.length; i++) { // Use standard loop
                     const elm = ctre.hiddenElements[i];
                     if (!elm || !elm.selector) continue; // Skip invalid entries

                     // Store index for easier reference in callbacks
                     const dataIndex = i;

                     lines.push(`<tr data-selector="${escapeHTML(elm.selector)}" data-index="${dataIndex}">
                        <td class="ct_selector">
                          <span class="ct_selector_text">${escapeHTML(elm.selector)}</span>
                        </td>
                        <td><input type="checkbox" class="ct_remember_cb" ${elm.permanent ? ' checked' : ''} title="Remember this rule permanently"></td>
                        <td>
                           <button type="button" class="ct_preview" title="Preview (hover)"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"/></svg></button>
                           <button type="button" class="ct_delete" title="Remove this rule"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg></button>
                        </td>
                     </tr>`);
                }
                lines.push('</tbody></table>');
                elmList.classList.add('hasContent');
            } else {
                 lines.push('<p>No elements removed in this session.</p>'); // Provide feedback
                elmList.classList.remove('hasContent');
            }
            elmList.innerHTML = lines.join('\n');

             // Add event listeners using event delegation on the container for efficiency
             elmList.removeEventListener('click', ctre.handleElementListClick); // Remove old listener first
             elmList.addEventListener('click', ctre.handleElementListClick);
             elmList.removeEventListener('change', ctre.handleElementListChange);
             elmList.addEventListener('change', ctre.handleElementListChange);
             elmList.removeEventListener('mouseover', ctre.handleElementListMouseOver, true); // Use capture for mouseover preview
             elmList.addEventListener('mouseover', ctre.handleElementListMouseOver, true);
             elmList.removeEventListener('mouseout', ctre.handleElementListMouseOut, true);
             elmList.addEventListener('mouseout', ctre.handleElementListMouseOut, true);
        },

        // Event handlers for element list using delegation
        handleElementListClick: function(e) {
            const target = e.target;
            const tr = target.closest('tr');
            if (!tr) return;
            const index = parseInt(tr.dataset.index, 10);
            const hiddenElement = ctre.hiddenElements[index];
            if (!hiddenElement) return;

            if (target.classList.contains('ct_delete')) {
                 e.preventDefault();
                 console.log("CTRE: Deleting rule at index", index, "selector:", hiddenElement.selector);
                 ctre.hiddenElements.splice(index, 1); // Remove by index
                 ctre.updateCSS();
                 ctre.refreshOverlays();
                 ctre.updateElementList(); // Re-render list
                 ctre.updateSavedElements();
                 // Add to undo stack? Maybe provide specific undo for deletion?
            } else if (target.classList.contains('ct_edit_selector')) {
                 e.preventDefault();
                 const currentSelector = hiddenElement.selector;
                 const newSelector = prompt('Customize CSS selector:\n\nHints:\n[id^="Abc"] matches #AbcWhatever\n[class*="Abc"] matches .somethingAbcSomething', currentSelector);
                 if (newSelector && newSelector !== currentSelector) {
                      console.log("CTRE: Editing selector at index", index, "from:", currentSelector, "to:", newSelector);
                      // TODO: Basic validation of newSelector?
                      hiddenElement.selector = newSelector;
                      tr.dataset.selector = newSelector; // Update data attribute
                      tr.querySelector('.ct_selector_text').textContent = newSelector; // Update displayed text

                      ctre.updateCSS();
                      ctre.refreshOverlays();
                      ctre.updateSavedElements();
                 }
            }
        },
        handleElementListChange: function(e) {
             const target = e.target;
             const tr = target.closest('tr');
             if (!tr || !target.classList.contains('ct_remember_cb')) return;

             const index = parseInt(tr.dataset.index, 10);
             const hiddenElement = ctre.hiddenElements[index];
             if (!hiddenElement) return;

             hiddenElement.permanent = target.checked;
             console.log("CTRE: Toggled permanent flag for index", index, "to", target.checked);
             ctre.updateSavedElements();
        },
         handleElementListMouseOver: function(e) {
              if (e.target.classList.contains('ct_preview')) {
                  const tr = e.target.closest('tr');
                  if (tr && tr.dataset.selector) {
                      ctre.previewedHiddenSelector = tr.dataset.selector;
                      ctre.updateCSS();
                  }
              }
         },
         handleElementListMouseOut: function(e) {
               if (e.target.classList.contains('ct_preview')) {
                   const tr = e.target.closest('tr');
                   if (tr && tr.dataset.selector && ctre.previewedHiddenSelector === tr.dataset.selector) {
                       ctre.previewedHiddenSelector = null;
                       ctre.updateCSS();
                   }
               }
         },

        // --- Communication WITH Background ---
        updateSavedElements: function() {
            const permanentElements = ctre.hiddenElements.filter(elm => elm && elm.permanent); // Add check for elm
            console.log("CTRE: Sending permanent elements to background:", permanentElements);
            try {
                 chrome.runtime.sendMessage({
                    action: 'set_saved_elms',
                    website: location.hostname.replace(/^www\./, ''),
                    data: JSON.stringify(permanentElements), // Ensure sending stringified JSON
                 });
            } catch (e) { console.error("CTRE: Error sending saved elements:", e.message); }
        },

        loadSavedElements: function() {
            console.log("CTRE: Requesting saved elements and settings.");
            const getSavedPromise = new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({ action: 'get_saved_elms', website: location.hostname.replace(/^www\./, '') }, (response) => {
                    if (chrome.runtime.lastError) reject(chrome.runtime.lastError); else resolve(response);
                });
            });
            const getSettingsPromise = new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({ action: 'get_settings' }, (response) => {
                     if (chrome.runtime.lastError) reject(chrome.runtime.lastError); else resolve(response);
                });
            });

            Promise.all([getSavedPromise, getSettingsPromise]).then(([savedData, settingsData]) => {
                console.log("CTRE: Received saved elements:", savedData);
                console.log("CTRE: Received settings:", settingsData);
                let loadedElements = [];
                try {
                    loadedElements = JSON.parse(savedData || '[]'); // Expecting stringified JSON
                } catch (e) { console.error("CTRE: Failed to parse saved elements:", e); }

                try {
                     ctre.settings = JSON.parse(settingsData || '{}'); // Expecting stringified JSON
                } catch (e) { console.error("CTRE: Failed to parse settings:", e); ctre.settings = {}; }

                 // Reset hidden elements (only keep non-permanent session ones if any)
                 const sessionOnlyElements = ctre.hiddenElements.filter(el => el && !el.permanent);
                 ctre.hiddenElements = [...sessionOnlyElements]; // Start with session hides
                 const currentSelectors = new Set(ctre.hiddenElements.map(el => el.selector));
                 // Add loaded permanent elements, avoiding duplicates
                 loadedElements.forEach(loadedEl => {
                     if (loadedEl && loadedEl.selector && !currentSelectors.has(loadedEl.selector)) {
                          loadedEl.permanent = true; // Ensure flag is set
                          ctre.hiddenElements.push(loadedEl);
                     }
                 });

                ctre.updateCSS();
                if (ctre.targetingMode && ctre.helpWindow) {
                     ctre.updateElementList();
                     ctre.updateSettingsUI();
                }
            }).catch(error => {
                 console.error("CTRE: Error loading saved data/settings:", error.message);
                 ctre.hiddenElements = ctre.hiddenElements || [];
                 ctre.settings = ctre.settings || {};
                 ctre.updateCSS(); // Still apply CSS even if load failed
            });
        },


        updateSettingsUI: function() {
             if (!ctre.helpWindow) return;
             const span = ctre.$('#ctre_opt_remember');
             if (span) {
                 // Recreate checkbox to ensure state is correct
                 span.innerHTML = `<input type="checkbox" id="ctre_remember_cb_ui" ${ctre.settings.remember ? ' checked' : ''}>`;
             }
        },
        saveSettings: function() {
             console.log("CTRE: Sending settings to background:", ctre.settings);
             try {
                 chrome.runtime.sendMessage({
                    action: 'set_settings',
                    data: JSON.stringify(ctre.settings), // Send stringified JSON
                 });
             } catch (e) { console.error("CTRE: Error sending settings:", e.message); }
        },
        activateDialog: function(cls) {
            if (!ctre.helpWindow?.shadowRoot) return; // Need shadow root
            ctre.activeDialog = new cls(ctre.helpWindow.shadowRoot, ctre.deactivateDialog);
            const mainWin = ctre.$('.mainWindow');
            if (mainWin) mainWin.style.display = 'none'; // Hide main UI
            ctre.unhighlightElement();
        },
        deactivateDialog: function() {
            ctre.activeDialog?.destroy();
            ctre.activeDialog = null;
            const mainWin = ctre.$('.mainWindow');
            if (mainWin) mainWin.style.removeProperty('display'); // Show main UI
        },

        // --- Activation / Deactivation ---
        activate: function() {
            if (ctre.targetingMode) return;
            console.log("CTRE: Activating targeting mode.");
            ctre.loadSavedElements(); // Load data before showing UI

            if (!document.body) { // Check if body is available
                 console.error("CTRE: Cannot activate, document.body not ready.");
                 return;
            }

            if (!ctre.helpWindow) {
                let shadowElm = document.createElement('div');
                shadowElm.setAttribute('id', 'ctre_wnd');
                try {
                     shadowElm.attachShadow({ mode: 'open' });
                } catch (e) {
                     console.error("CTRE: Failed to attach shadow DOM:", e);
                     // Fallback? Inject directly? For now, fail activation.
                     return;
                }
                shadowElm.style.visibility = 'hidden';
                document.body.appendChild(shadowElm);
                ctre.helpWindow = shadowElm;

                let cssURL;
                try { cssURL = chrome.runtime.getURL('content.css'); }
                catch (e) { console.error("CTRE: Failed to get CSS URL", e); return; }

                // *** USE THE FULL HTML STRUCTURE FROM YOUR ORIGINAL FILE HERE ***
                shadowElm.shadowRoot.innerHTML = `
                    <link rel="stylesheet" href="${cssURL}">

                    <div class="mainWindow">
                        <div class="header">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="m339-288 141-141 141 141 51-51-141-141 141-141-51-51-141 141-141-141-51 51 141 141-141 141 51 51ZM480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>                            
                            <span class="header__logo">Zapp</span>
                            <span class="header__version">${VERSION}</span>
                            <span class="header__logo header__logo_small">zapp</span>
                        </div>
                        <hr/>
                        <div class="topButtons">
                            <div class="topButton topButton_settings" title="Advanced options"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="m403-96-22-114q-23-9-44.5-21T296-259l-110 37-77-133 87-76q-2-12-3-24t-1-25q0-13 1-25t3-24l-87-76 77-133 110 37q19-16 40.5-28t44.5-21l22-114h154l22 114q23 9 44.5 21t40.5 28l110-37 77 133-87 76q2 12 3 24t1 25q0 13-1 25t-3 24l87 76-77 133-110-37q-19 16-40.5 28T579-210L557-96H403Zm59-72h36l19-99q38-7 71-26t57-48l96 32 18-30-76-67q6-17 9.5-35.5T696-480q0-20-3.5-38.5T683-554l76-67-18-30-96 32q-24-29-57-48t-71-26l-19-99h-36l-19 99q-38 7-71 26t-57 48l-96-32-18 30 76 67q-6 17-9.5 35.5T264-480q0 20 3.5 38.5T277-406l-76 67 18 30 96-32q24 29 57 48t71 26l19 99Zm18-168q60 0 102-42t42-102q0-60-42-102t-102-42q-60 0-102 42t-42 102q0 60 42 102t102 42Zm0-144Z"/></svg></div>
                            <div class="topButton topButton_minimize" title="Minimize"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M232-444v-72h496v72H232Z"/></svg></div>
                            <div class="topButton topButton_close" title="Close"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg></div>
                        </div>
                        <!-- Rest of the HTML remains unchanged -->
                        <div class="ffWarning" style="display: ${ctre.showPermissionsWarning ? 'block' : 'none'};"><p>⚠ Your browser requires you to approve the website access permission <b>manually</b>. Zapp needs this permission in order to remember removed elements permanently.</p><p>You should be asked for this permission if needed.</p></div>
                        <div id="ctre_current_elm">Use the mouse to select an element to remove.</div>
                        <div id="ctre_elm_list"></div>
                        <div class="settingsRow">
                            <label> Remember by default: <span id="ctre_opt_remember">?</span> </label>
                        </div>
                    </div>
                `;


                // Add UI Listeners after CSS loads
                const linkEl = ctre.$('link');
                const setupUIListeners = () => {
                    console.log("CTRE UI: Setting up listeners.");
                    const safelyAddListener = (selector, event, handler) => { try { const element = ctre.$(selector); if (element) { element.addEventListener(event, handler); } else { console.warn(`CTRE UI: Element not found for selector "${selector}"`); } } catch (e) { console.error(`CTRE UI: Error adding listener for "${selector}"`, e); } };

                    safelyAddListener('.topButton_close', 'click', (e) => { ctre.deactivate(); e.preventDefault(); });
                    safelyAddListener('.topButton_minimize', 'click', (e) => { ctre.$('.mainWindow').classList.toggle('minimized'); e.preventDefault(); });
                    safelyAddListener('.topButton_settings', 'click', (e) => { ctre.activateDialog(AdvOptionsDialog); e.preventDefault(); });
                    // Handle clicking the LABEL or the SPAN for the checkbox
                    safelyAddListener('.settingsRow label', 'click', (e) => {
                        // Prevent double toggle if click is on input itself
                        if (e.target.id !== 'ctre_remember_cb_ui') {
                           ctre.settings.remember = !ctre.settings.remember;
                           ctre.saveSettings();
                           ctre.updateSettingsUI(); // Update checkbox state visually
                        }
                        // Don't prevent default, allow label to toggle checkbox if needed
                    });

                    // Drag listeners
                    const dragTarget = ctre.$('.header'); // Target the whole header
                 // --- End Change ---

                 if (dragTarget) {
                     // Add cursor style to indicate draggability
                     dragTarget.style.cursor = 'move'; // Add this line

                     const host = shadowElm; // Host is still the main UI window (#ctre_wnd)
                     let isDragging = false, offsetX = 0, offsetY = 0;
                     const onMouseMove = (e) => {
                         if (!isDragging) return;
                         // Calculate new position based on mouse movement
                         host.style.left = (e.clientX - offsetX) + 'px';
                         host.style.top = (e.clientY - offsetY) + 'px';
                     };
                     const onMouseUp = () => {
                         if (!isDragging) return; // Prevent running if not dragging
                         isDragging = false;
                         document.removeEventListener('mousemove', onMouseMove);
                         document.removeEventListener('mouseup', onMouseUp);
                          // Optional: Remove cursor style when not dragging
                          // dragTarget.style.cursor = '';
                     };
                     // Attach listener to the dragTarget (the header)
                     dragTarget.addEventListener('mousedown', (e) => {
                          // Prevent dragging if clicking on a button inside the header
                          if (e.target.closest('.topButton')) {
                              return;
                          }
                         isDragging = true;
                         const rect = host.getBoundingClientRect();
                         offsetX = e.clientX - rect.left;
                         offsetY = e.clientY - rect.top;
                         // Make position fixed ONLY when starting drag, makes placement easier
                         host.style.position = 'fixed';
                         host.style.bottom = 'auto'; // Remove bottom constraint
                         host.style.right = 'auto';  // Remove right constraint
                         document.addEventListener('mousemove', onMouseMove);
                         document.addEventListener('mouseup', onMouseUp);
                         e.preventDefault(); // Prevent text selection during drag
                     });
                 } else {
                     console.warn("CTRE UI: Drag target (.header) not found.");
                 }

                    // Update UI content AFTER listeners are added
                    ctre.updateElementList();
                    ctre.updateSettingsUI();
                    ctre.$('#ctre_current_elm').textContent = 'Use the mouse to select an element to remove.'; // Use textContent
                    shadowElm.style.visibility = 'visible';

                     // Initial header animation
                     setTimeout(() => { ctre.$('.header__logo')?.classList.add('header__logo_anim'); }, 100);

                }; // end setupUIListeners

                if (linkEl) {
                    linkEl.addEventListener('load', setupUIListeners);
                    linkEl.addEventListener('error', () => { console.error("CTRE UI: Failed to load content.css."); setupUIListeners(); shadowElm.style.visibility = 'visible'; });
                } else { console.warn("CTRE UI: Link element for CSS not found."); setupUIListeners(); shadowElm.style.visibility = 'visible'; }

            } else {
                // UI exists, just show it and update
                ctre.helpWindow.style.display = '';
                ctre.$('.mainWindow')?.classList.remove('minimized'); // Use optional chaining
                // Update UI content
                ctre.updateElementList();
                ctre.updateSettingsUI();
                ctre.$('#ctre_current_elm').textContent = 'Use the mouse to select an element to remove.'; // Use textContent
                // Update permission warning visibility
                const ffWarn = ctre.$('.ffWarning');
                if (ffWarn) ffWarn.style.display = ctre.showPermissionsWarning ? 'block' : 'none';
            }

            // Add Page Interaction Listeners (redundancy check just in case)
            document.removeEventListener('mouseover', ctre.handleMouseover, true); // Remove first
            document.addEventListener('mouseover', ctre.handleMouseover, true);
            document.removeEventListener('mousedown', ctre.hideTarget, true);
            document.addEventListener('mousedown', ctre.hideTarget, true);
            document.removeEventListener('mouseup', ctre.preventEvent, true);
            document.addEventListener('mouseup', ctre.preventEvent, true);
            document.removeEventListener('click', ctre.preventEvent, true);
            document.addEventListener('click', ctre.preventEvent, true);
            document.removeEventListener('scroll', ctre.updateHighlighterPos, true);
            document.addEventListener('scroll', ctre.updateHighlighterPos, true);

            ctre.addOverlays();
            ctre.targetingMode = true; // Set flag AFTER setup
            chrome.runtime.sendMessage({ action: 'statusUpdate', active: true }); // Inform background
        },

        deactivate: function() {
            if (!ctre.targetingMode) return;
            console.log("CTRE: Deactivating targeting mode.");

            ctre.targetingMode = false;
            ctre.deactivateDialog();
            ctre.unhighlightElement(); // Remove highlighter

            ctre.removeOverlays();
          
            if (ctre.helpWindow) {
                 ctre.helpWindow.remove();
                 ctre.helpWindow = null;
            }

            // Remove Page Interaction Listeners
            document.removeEventListener('mouseover', ctre.handleMouseover, true);
            document.removeEventListener('mousedown', ctre.hideTarget, true);
            document.removeEventListener('mouseup', ctre.preventEvent, true);
            document.removeEventListener('click', ctre.preventEvent, true);
            document.removeEventListener('scroll', ctre.updateHighlighterPos, true);

            ctre.removeOverlays();

            chrome.runtime.sendMessage({ action: 'statusUpdate', active: false }); // Inform background
        },

        toggle: function() {
            console.log("CTRE: Toggle called. Current mode:", ctre.targetingMode);
            if (ctre.targetingMode) {
                ctre.deactivate();
            } else {
                ctre.activate();
            }
        },

        addOverlays: function() {
             // Add overlay over each iframe / embed
             document.querySelectorAll('iframe, embed').forEach(e => {
                  if (e.id === 'ctre_highlighter' || ctre.isChildOfCTREWindow(e)) return; // Skip our own UI/highlighter if it's an iframe
                  try {
                     const rect = e.getBoundingClientRect();
                     // Don't add overlay for tiny/invisible elements
                     if (rect.width < 5 || rect.height < 5) return;

                     let overlayElm = document.createElement('div');
                     overlayElm.className = 'ctre_overlay';
                     overlayElm.style.position = 'absolute'; // Position relative to document flow
                     overlayElm.style.left = rect.left + window.scrollX + 'px';
                     overlayElm.style.top = rect.top + window.scrollY + 'px';
                     overlayElm.style.width = rect.width + 'px';
                     overlayElm.style.height = rect.height + 'px';
                     overlayElm.style.background = 'rgba(128,128,128,0.1)'; // Make less intrusive
                     overlayElm.style.border = '1px dotted rgba(128,128,128,0.3)';
                     overlayElm.style.zIndex = ctre.maxZIndex - 2; // Below highlighter but above most content
                     overlayElm.style.pointerEvents = 'auto'; // Needs pointer events to be targetable
                     overlayElm.relatedElement = e; // Link back to original element

                     document.body.appendChild(overlayElm);
                  } catch (err) {
                       console.warn("CTRE: Error creating overlay for element", e, err);
                  }
             });
        },
        removeOverlays: function() {
            document.querySelectorAll('.ctre_overlay').forEach(e => e.remove());
        },
        refreshOverlays: function() {
            ctre.removeOverlays();
            // Only add overlays back if targeting mode is active
            if (ctre.targetingMode) {
                ctre.addOverlays();
            }
        },

        // --- Communication FROM Background ---
        handleExtensionMessage: function(msg, sender, sendResponse) {
            console.log("CTRE Content Script: Received message:", msg);
            if (msg.action === 'toggle') {
                 ctre.showPermissionsWarning = !msg.permissionsGranted;
                 // Update warning visibility if UI exists
                 const ffWarn = ctre.$('.ffWarning');
                 if (ffWarn) ffWarn.style.display = ctre.showPermissionsWarning ? 'block' : 'none';

                 ctre.toggle(); // Then toggle the UI activation/deactivation
                 sendResponse({ version: VERSION }); // Respond after handling
                 return true; // Indicate potential async work (though toggle is sync here)
            } else if (msg.action === 'getStatus') {
                 sendResponse(ctre.targetingMode); // Respond with current state
                 return false; // Synchronous response
            } else {
                 // Unhandled message for content script
                 return false; // Indicate not handled
            }
        },

        // --- Initialization ---
        init: function() {
            // Prevent multiple initializations
            if (window.ctreScriptInitialized) {
                console.log("CTRE Content Script: Already initialized, skipping.");
                return;
            }
            window.ctreScriptInitialized = true; // Set flag immediately
            ctre.isInitialized = true;
            console.log("CTRE Content Script: Initializing.");

            // Add listener for messages from background FIRST
            try {
                // Ensure no previous listener exists (important if script re-injected)
                 if (chrome.runtime.onMessage.hasListener(ctre.handleExtensionMessage)) {
                     chrome.runtime.onMessage.removeListener(ctre.handleExtensionMessage);
                     console.warn("CTRE Content Script: Removed existing message listener.");
                 }
                chrome.runtime.onMessage.addListener(ctre.handleExtensionMessage);
                console.log("CTRE Content Script: Message listener added.");
            } catch(e) {
                 console.error("CTRE Content Script: FAILED TO ADD MESSAGE LISTENER!", e);
                 return; // Stop initialization if listener fails
            }

            // Add persistent key listeners
            // Remove potential old ones first in case of re-injection
             document.removeEventListener('keydown', ctre.handleKeydown);
             document.addEventListener('keydown', ctre.handleKeydown);
             document.removeEventListener('keyup', ctre.handleKeyup);
             document.addEventListener('keyup', ctre.handleKeyup);

            // Load initial state (applies CSS rules immediately)
             ctre.loadSavedElements();

            console.log("CTRE Content Script: Initialized.");
        }
    }; // End ctre object

    // --- Other Helpers ---
    function closest(el, selector) { var retval = null; while (el) { if (el.matches && el.matches(selector)) { retval = el; break; } el = el.parentElement; } return retval; }
    function escapeHTML(str) {
        if (typeof str !== 'string') { // Add type check
            console.warn("escapeHTML called with non-string:", str);
            return '';
        }
        return str.replace(/&/g, '&')
                  .replace(/</g, '<')
                  .replace(/>/g, '>')
                  .replace(/"/g, '"')
                  .replace(/'/g, '&#039;'); // Replace single quote with its HTML entity code
    }
    // --- AdvOptionsDialog Class (Keep as is) ---
    class AdvOptionsDialog {
         constructor(shadowRoot, close) {
             this.elm = document.createElement('div');
             this.elm.className = 'dialog dialog_advOptions';
             this.elm.innerHTML = `
                 <div class="header"><span class="header__logo">Advanced options</span></div><hr/>
                 <div class="topButtons"><div class="topButton topButton_close" title="Close"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M232-444v-72h496v72H232Z"/></svg></div></div>
                 <div class="advOptions">
                     <div class="advOptions__row"><button class="advOptions__export">Export elements</button><p class="advOptions__rowHelp">Exports a list of all the permanently removed elements from all the websites to a JSON file.</p></div>
                     <div class="advOptions__row"><button class="advOptions__import"><input type="file" accept=".json">Import elements</button><p class="advOptions__rowHelp">Loads a list of permanently removed elements from a previously exported file.</p></div>
                 </div>`;
             shadowRoot.appendChild(this.elm);

             this.elm.querySelector('.topButton_close').addEventListener('click', (e) => { close(); e.preventDefault(); });
             this.elm.querySelector('.advOptions__export').addEventListener('click', (e) => {
                 chrome.runtime.sendMessage({ action: 'export_settings' }).then((data) => {
                      if (!data) { alert("Export failed. Check background console."); return; }
                      let link = document.createElement('a');
                      let blob = new Blob([data], { type: 'application/json' });
                      let url = URL.createObjectURL(blob);
                      link.href = url;
                      link.download = 'Zapp_export_' + new Date().toISOString().slice(0,10) + '.json';
                      link.click();
                      setTimeout(() => URL.revokeObjectURL(url), 60000);
                 }).catch(err => { alert("Export failed: " + err.message); });
                 e.preventDefault();
             });
             this.elm.querySelector('.advOptions__import input').addEventListener('change', function (e) {
                 let input = this; let file = this.files[0]; if (!file) return;
                 (async () => {
                     if (file.type !== 'application/json') throw new Error('Invalid file type (expected .json)');
                     let text = await file.text(); input.value = ''; // Clear input
                     let json; try { json = JSON.parse(text); } catch (ex) { throw new Error('Error parsing JSON data in file'); }
                     if (json.version !== 1) throw new Error('Incorrect version number in imported data');
                     let result = await chrome.runtime.sendMessage({ action: 'import_settings', data: text });
                     if (result !== 'SUCCESS') throw new Error(result);
                     ctre.loadSavedElements(); // Reload after import
                     alert('Import successful!');
                     close(); // Close dialog
                 })().catch((ex) => { alert(ex?.message || 'Import Error'); });
             });
         }
         destroy() { this.elm?.remove(); }
    }

    // --- Auto-Initialize ---
     ctre.init(); // Call init directly - injection ensures DOM is ready enough


})(); // End of Content Script IIFE