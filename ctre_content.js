(() => {
    function _slicedToArray(t, n) {
        return (
            _arrayWithHoles(t) ||
            _iterableToArrayLimit(t, n) ||
            _unsupportedIterableToArray(t, n) ||
            _nonIterableRest()
        );
    }
    function _nonIterableRest() {
        throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
    }
    function _unsupportedIterableToArray(t, n) {
        if (t) {
            if ("string" == typeof t) return _arrayLikeToArray(t, n);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            return (
                "Object" === r && t.constructor && (r = t.constructor.name),
                "Map" === r || "Set" === r
                    ? Array.from(t)
                    : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? _arrayLikeToArray(t, n)
                    : void 0
            );
        }
    }
    function _arrayLikeToArray(t, n) {
        (null == n || n > t.length) && (n = t.length);
        for (var r = 0, e = new Array(n); r < n; r++) e[r] = t[r];
        return e;
    }
    function _iterableToArrayLimit(t, n) {
        var r =
            null == t
                ? null
                : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                  t["@@iterator"];
        if (null != r) {
            var e,
                o,
                u = [],
                i = !0,
                a = !1;
            try {
                for (
                    r = r.call(t);
                    !(i = (e = r.next()).done) &&
                    (u.push(e.value), !n || u.length !== n);
                    i = !0
                );
            } catch (t) {
                (a = !0), (o = t);
            } finally {
                try {
                    i || null == r.return || r.return();
                } finally {
                    if (a) throw o;
                }
            }
            return u;
        }
    }
    function _arrayWithHoles(t) {
        if (Array.isArray(t)) return t;
    }
    function _typeof(t) {
        return (
            (_typeof =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                    ? function (t) {
                          return typeof t;
                      }
                    : function (t) {
                          return t &&
                              "function" == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? "symbol"
                              : typeof t;
                      }),
            _typeof(t)
        );
    }

    const cssFinder = (() => {
        let e, t;
        function n(n, a) {
            if (n.nodeType !== Node.ELEMENT_NODE)
                throw Error(
                    "Can't generate CSS selector for non-element node type."
                );
            if ("html" === n.tagName.toLowerCase()) return "html";
            let o = {
                root: document.body,
                idName: (e) => !0,
                className: (e) => !0,
                tagName: (e) => !0,
                attr: (e, t) => !1,
                seedMinLength: 1,
                optimizedMinLength: 2,
                threshold: 1e3,
                maxNumberOfTries: 1e4,
            };
            t = l((e = { ...o, ...a }).root, o);
            let u = r(n, "all", () =>
                r(n, "two", () => r(n, "one", () => r(n, "none")))
            );
            if (u) {
                let f = v(E(u, n));
                return f.length > 0 && (u = f[0]), i(u);
            }
            throw Error("Selector was not found.");
        }
        function l(e, t) {
            return e.nodeType === Node.DOCUMENT_NODE
                ? e
                : e === t.root
                ? e.ownerDocument
                : e;
        }
        function r(t, n, l) {
            let r = null,
                i = [],
                o = t,
                u = 0;
            for (; o; ) {
                let s = _(f(o)) || _(...c(o)) || _(...m(o)) || _($(o)) || [p()],
                    h = d(o);
                if ("all" == n)
                    h && (s = s.concat(s.filter(y).map((e) => g(e, h))));
                else if ("two" == n)
                    (s = s.slice(0, 1)),
                        h && (s = s.concat(s.filter(y).map((e) => g(e, h))));
                else if ("one" == n) {
                    let [N] = (s = s.slice(0, 1));
                    h && y(N) && (s = [g(N, h)]);
                } else "none" == n && ((s = [p()]), h && (s = [g(s[0], h)]));
                for (let w of s) w.level = u;
                if ((i.push(s), i.length >= e.seedMinLength && (r = a(i, l))))
                    break;
                (o = o.parentElement), u++;
            }
            return (r || (r = a(i, l)), !r && l) ? l() : r;
        }
        function a(t, n) {
            let l = v(w(t));
            if (l.length > e.threshold) return n ? n() : null;
            for (let r of l) if (u(r)) return r;
            return null;
        }
        function i(e) {
            let t = e[0],
                n = t.name;
            for (let l = 1; l < e.length; l++) {
                let r = e[l].level || 0;
                (n =
                    t.level === r - 1
                        ? `${e[l].name} > ${n}`
                        : `${e[l].name} ${n}`),
                    (t = e[l]);
            }
            return n;
        }
        function o(e) {
            return e.map((e) => e.penalty).reduce((e, t) => e + t, 0);
        }
        function u(e) {
            let n = i(e);
            if (!t || typeof t.querySelectorAll !== "function") {
                console.error(
                    "CSS Finder internal error: t.querySelectorAll is not a function."
                );
                return false;
            }
            try {
                switch (t.querySelectorAll(n).length) {
                    case 0:
                        console.error(
                            `CSS Finder: Can't select any node with this selector: ${n}`
                        );
                        return !1;
                    case 1:
                        return !0;
                    default:
                        return !1;
                }
            } catch (err) {
                console.error(
                    `CSS Finder: Error querying selector "${n}":`,
                    err
                );
                return false;
            }
        }
        function f(t) {
            let n = t.getAttribute("id");
            return n && e.idName(n)
                ? { name: "#" + CSS.escape(n), penalty: 0 }
                : null;
        }
        function c(t) {
            let n = Array.from(t.attributes).filter((t) =>
                e.attr(t.name, t.value)
            );
            return n.map((e) => ({
                name: `[${CSS.escape(e.name)}="${CSS.escape(e.value)}"]`,
                penalty: 0.5,
            }));
        }
        function s(e) {
            let t = e.length;
            return (
                e.match(/[\-_][a-z0-9]*[0-9]+[a-z0-9]*/i) && (t += 50),
                e.match(/video|player|embed|^ad/i) && (t -= 75),
                t
            );
        }
        function m(t) {
            let n = Array.from(t.classList).filter(e.className);
            n.sort((e, t) => s(e) - s(t));
            let l = n.map((e) => ({ name: "." + CSS.escape(e), penalty: 1 })),
                r = t.tagName.toLowerCase();
            return (r.match(/video|iframe/) &&
                l.unshift({ name: r, penalty: 1 }),
            l.length)
                ? h(l, 2).map((e) =>
                      e.reduce(
                          (e, t) => (
                              (e.name += t.name),
                              (e.penalty += t.penalty),
                              (e.level = t.level),
                              e
                          ),
                          { name: "", penalty: 0 }
                      )
                  )
                : l;
        }
        function h(e, t = 2) {
            let n = function (e, t, l, r) {
                    if (0 == e) {
                        l.length > 0 && r.push(l);
                        return;
                    }
                    for (let a = 0; a < t.length; a++)
                        n(e - 1, t.slice(a + 1), l.concat([t[a]]), r);
                },
                l = [];
            for (let r = 0; r < Math.min(e.length, t + 1); r++) n(r, e, [], l);
            return e.length < t + 1 && l.push(e), l;
        }
        function $(t) {
            let n = t.tagName.toLowerCase();
            return e.tagName(n) ? { name: n, penalty: 2 } : null;
        }
        function p() {
            return { name: "*", penalty: 3 };
        }
        function d(e) {
            let t = e.parentNode;
            if (!t) return null;
            let n = t.firstChild;
            if (!n) return null;
            let l = 0;
            for (; n && (n.nodeType === Node.ELEMENT_NODE && l++, n !== e); )
                n = n.nextSibling;
            return l;
        }
        function g(e, t) {
            return {
                name: e.name + `:nth-child(${t})`,
                penalty: e.penalty + 10,
            };
        }
        function y(e) {
            return "html" !== e.name && !e.name.startsWith("#");
        }
        function _(...e) {
            let t = e.filter(N);
            return t.length > 0 ? t : null;
        }
        function N(e) {
            return null != e;
        }
        function* w(e, t = []) {
            if (e.length > 0)
                for (let n of e[0]) yield* w(e.slice(1, e.length), t.concat(n));
            else yield t;
        }
        function v(e) {
            return [...e].sort((e, t) => o(e) - o(t));
        }
        function* E(t, n, l = { counter: 0, visited: new Map() }) {
            if (t.length > 2 && t.length > e.optimizedMinLength)
                for (let r = 1; r < t.length - 1; r++) {
                    if (l.counter > e.maxNumberOfTries) return;
                    l.counter += 1;
                    let a = [...t];
                    a.splice(r, 1);
                    let o = i(a);
                    if (l.visited.has(o)) continue;
                    u(a) &&
                        L(a, n) &&
                        (yield a, l.visited.set(o, !0), yield* E(a, n, l));
                }
        }
        function L(e, n) {
            try {
                if (!t || typeof t.querySelector !== "function") return false;
                return t.querySelector(i(e)) === n;
            } catch (err) {
                console.warn("CSS Finder: Error during L querySelector:", err);
                return false;
            }
        }
        return n;
    })();

    function hexToHSL(hex) {
        if (!hex || !/^#[0-9A-F]{6}$/i.test(hex))
            return { h: 217, s: 91, l: 60 };

        let r = 0,
            g = 0,
            b = 0;
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);

        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0) h = 0;
        else if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);
        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
    }

    function hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (300 <= h && h < 360) {
            r = c;
            g = 0;
            b = x;
        }

        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);

        if (r.length == 1) r = "0" + r;
        if (g.length == 1) g = "0" + g;
        if (b.length == 1) b = "0" + b;

        return "#" + r + g + b;
    }

    const VERSION = "3.1.5";

    const ctre = {
        hoveredElement: null,
        markedElement: null,
        previewedHiddenSelector: null,
        targetingMode: false,
        transpose: 0,
        maxZIndex: 2147483647,
        hiddenElements: [],
        settings: {},
        preventHighlightingUntil: 0,
        activeDialog: null,
        showPermissionsWarning: false,
        undoStack: [],
        helpWindow: null,
        isInitialized: false,

        applyUserTheme: function () {
            if (!ctre.helpWindow) return;

            const defaultHue = 217;
            const defaultSaturation = 91;
            const defaultLightness = 60;

            ctre.helpWindow.style.setProperty("--user-hue", defaultHue);
            ctre.helpWindow.style.setProperty(
                "--user-saturation",
                `${defaultSaturation}%`
            );
            ctre.helpWindow.style.setProperty(
                "--user-lightness",
                `${defaultLightness}%`
            );
        },

        $: function (query) {
            if (!this.helpWindow?.shadowRoot) return null;
            return this.helpWindow.shadowRoot.querySelector(query);
        },
        $$: function (query) {
            if (!this.helpWindow?.shadowRoot) return [];
            return this.helpWindow.shadowRoot.querySelectorAll(query);
        },

        triggerResize: function () {
            let evt = document.createEvent("UIEvents");
            evt.initUIEvent("resize", true, false, window, 0);
            window.dispatchEvent(evt);
            setTimeout(() => {
                ctre.refreshOverlays();
            }, 50);
        },

        highlightElement: function () {
            if (!ctre.hoveredElement) return;
            let markedElement = ctre.hoveredElement;
            if (markedElement.className == "ctre_overlay") {
                markedElement = markedElement.relatedElement;
            }
            if (!markedElement || !markedElement.parentNode) return;
            let i = 0;
            for (i = 0; i < ctre.transpose; i++) {
                if (
                    !markedElement.parentNode ||
                    markedElement.parentNode.nodeType !== Node.ELEMENT_NODE ||
                    markedElement.parentNode === document
                ) {
                    break;
                }
                markedElement = markedElement.parentNode;
            }
            ctre.transpose = i;
            if (markedElement == ctre.markedElement) return;
            ctre.markedElement = markedElement;
            let highlighter = document.getElementById("ctre_highlighter");
            if (!highlighter) {
                if (!document.body) return;
                highlighter = document.createElement("div");
                highlighter.id = "ctre_highlighter";
                highlighter.style.cssText = `pointer-events:none; position:fixed; background:rgba(255,128,128,0.4); z-index:${
                    ctre.maxZIndex - 1
                }; border:1px dashed red; margin:0; padding:0;`;
                document.body.appendChild(highlighter);
            }
            ctre.updateHighlighterPos();
            const currentElmDiv = ctre.$("#ctre_current_elm");
            if (currentElmDiv) {
                try {
                    currentElmDiv.innerHTML = ctre.getPathHTML(
                        ctre.hoveredElement,
                        ctre.transpose
                    );
                    const activeNode = ctre.$(
                        "#ctre_current_elm .pathNode.active"
                    );
                    if (activeNode?.scrollIntoView) {
                        activeNode.scrollIntoView({
                            block: "nearest",
                            inline: "nearest",
                        });
                    }
                } catch (e) {
                    console.error("Error updating path HTML:", e);
                    currentElmDiv.textContent = "Error generating path.";
                }
            }
        },

        unhighlightElement: function () {
            document.getElementById("ctre_highlighter")?.remove();
            ctre.markedElement = null;
            ctre.hoveredElement = null;
            const currentElmDiv = ctre.$("#ctre_current_elm");
            if (currentElmDiv) {
                currentElmDiv.textContent =
                    "Use the mouse to select an element to remove.";
            }
        },

        updateHighlighterPos: function () {
            if (!ctre.markedElement) return;
            let highlighter = document.getElementById("ctre_highlighter");
            if (!highlighter) return;
            try {
                const rect = ctre.markedElement.getBoundingClientRect();
                if (!rect || rect.width === 0 || rect.height === 0) {
                    highlighter.style.display = "none";
                    return;
                }
                highlighter.style.display = "block";
                highlighter.style.left = rect.left + "px";
                highlighter.style.top = rect.top + "px";
                highlighter.style.width = rect.width + "px";
                highlighter.style.height = rect.height + "px";
            } catch (e) {
                console.warn("Could not get bounding rect", e);
                highlighter.style.display = "none";
            }
        },

        handleMouseover: function (e) {
            if (+new Date() < ctre.preventHighlightingUntil) return;
            if (ctre.activeDialog) return;
            if (!ctre.targetingMode) return;
            if (
                e.target.id === "ctre_highlighter" ||
                ctre.isChildOfCTREWindow(e.target)
            ) {
                if (
                    ctre.hoveredElement &&
                    !ctre.isChildOfCTREWindow(ctre.hoveredElement) &&
                    ctre.hoveredElement.id !== "ctre_highlighter"
                ) {
                    ctre.unhighlightElement();
                    ctre.preventHighlightingUntil = +new Date() + 100;
                }
                return;
            }
            if (ctre.hoveredElement !== e.target) {
                ctre.transpose = 0;
                ctre.hoveredElement = e.target;
                ctre.highlightElement();
            }
        },

        isChildOfCTREWindow: function (elm) {
            if (!ctre.helpWindow) return false;
            return (
                elm === ctre.helpWindow ||
                ctre.helpWindow.shadowRoot?.contains(elm)
            );
        },

        handleKeydown: function (e) {
            if (!ctre.targetingMode) return;
            if (ctre.activeDialog) {
                if (e.code === "Escape") {
                    ctre.deactivateDialog();
                    e.stopPropagation();
                    e.preventDefault();
                }
            } else {
                let handled = false;
                if (e.code === "Escape") {
                    ctre.deactivate();
                    handled = true;
                } else if (e.code === "Space") {
                    if (ctre.markedElement) {
                        ctre.hideTarget();
                        handled = true;
                    }
                } else if (e.key === "w") {
                    if (ctre.transpose > 0) {
                        ctre.transpose--;
                        ctre.highlightElement();
                        handled = true;
                    }
                } else if (e.key === "q") {
                    ctre.transpose++;
                    ctre.highlightElement();
                    handled = true;
                } else if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
                    ctre.maybeUndo();
                    handled = true;
                }
                if (handled) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
        },
        handleKeyup: function (e) {
            if (!ctre.targetingMode || ctre.activeDialog) return;
            if (["Escape", "Space", "w", "q", "z"].includes(e.key)) {
                e.stopPropagation();
                e.preventDefault();
            }
        },

        hideTarget: function (mouseEvt) {
            if (!ctre.targetingMode || !ctre.markedElement) return;
            if (mouseEvt && ctre.isChildOfCTREWindow(mouseEvt.target)) return;
            if (mouseEvt && mouseEvt.button !== 0) {
                mouseEvt?.preventDefault();
                mouseEvt?.stopPropagation();
                return;
            }
            let selector;
            try {
                selector = ctre.getSelector(ctre.markedElement);
            } catch (e) {
                console.error("CTRE: Failed to get selector:", e);
                alert("Could not generate unique CSS selector.");
                return;
            }
            if (!selector) {
                console.warn("CTRE: Null selector generated.");
                alert("Could not generate selector.");
                return;
            }
            const elementToHide = ctre.markedElement;
            ctre.unhighlightElement();
            if (!ctre.hiddenElements.some((el) => el.selector === selector)) {
                ctre.hiddenElements.push({
                    selector,
                    permanent: !!ctre.settings.remember,
                });
                ctre.undoStack.push({
                    selector: selector,
                    element: elementToHide,
                });
                ctre.updateCSS();
                ctre.updateElementList();
                ctre.triggerResize();
                ctre.refreshOverlays();
                ctre.updateSavedElements();
            } else {
            }
            mouseEvt?.preventDefault();
            mouseEvt?.stopPropagation();
        },

        maybeUndo: function () {
            let itemToUndo = ctre.undoStack.pop();
            if (!itemToUndo) return;

            ctre.hiddenElements = ctre.hiddenElements.filter(
                (item) => item.selector !== itemToUndo.selector
            );
            ctre.updateCSS();
            ctre.refreshOverlays();
            ctre.updateElementList();
            ctre.updateSavedElements();
        },

        getSelector: function (element) {
            if (!element) return null;
            if (element.tagName === "BODY") return "body";
            if (element.tagName === "HTML") return "html";
            return cssFinder(element, { optimizedMinLength: 2 });
        },

        getPathHTML: function (element, transpose) {
            if (!element) return "No element selected.";
            function getElmName(elm) {
                if (elm.id) return "#" + elm.id;
                if (
                    typeof elm.className === "string" &&
                    elm.className.trim().length
                ) {
                    const classes = elm.className
                        .trim()
                        .split(/\s+/)
                        .slice(0, 2);
                    return elm.tagName.toLowerCase() + "." + classes.join(".");
                }
                return elm.tagName.toLowerCase();
            }
            let path = [];
            let currentElm = element;
            if (currentElm.className === "ctre_overlay")
                currentElm = currentElm.relatedElement;
            let count = 0;
            while (
                currentElm &&
                currentElm.nodeType === Node.ELEMENT_NODE &&
                count < 30
            ) {
                path.push(currentElm);
                if (currentElm.tagName === "HTML") break;
                currentElm = currentElm.parentElement;
                count++;
            }
            path = path.reverse();
            if (path.length === 0) return "Cannot generate path.";
            let html = [];
            const activeIndex = path.length - 1 - transpose;
            for (let i = 0; i < path.length; i++) {
                html.push(
                    `<span class="pathNode${
                        i === activeIndex ? " active" : ""
                    }">${escapeHTML(getElmName(path[i]))}</span>`
                );
            }
            return html.join(
                '<span class="pathSeparator" aria-hidden="true">></span>'
            );
        },

        preventEvent: function (e) {
            if (ctre.targetingMode && !ctre.isChildOfCTREWindow(e.target)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            return true;
        },

        updateCSS: function () {
            if (!document.head) return;
            let cssLines = [
                `
				  #ctre_wnd { display: block; position: fixed; bottom: 0; right: 10px; background: #fff; color: #000; box-shadow: 0px 0px 40px rgba(0,0,0,0.15); border-radius: 3px 3px 0 0; z-index: ${ctre.maxZIndex}; font-family: sans-serif; font-size: 13px; }
				  @media (prefers-color-scheme: dark) {
					  #ctre_wnd { background: #222; color: #eee; box-shadow: 0px 0px 40px rgba(255,255,255,0.15); }
				  }`,
            ];

            for (let i = 0; i < ctre.hiddenElements.length; i++) {
                let item = ctre.hiddenElements[i];
                if (!item || !item.selector) continue;
                let selector = item.selector;
                try {
                    if (
                        !selector.match(
                            /^[a-zA-Z0-9\s.#\[\]>+~*:\-_(),="'$%^&]+$/
                        )
                    ) {
                        console.warn(
                            "CTRE: Skipping potentially invalid selector:",
                            selector
                        );
                        continue;
                    }

                    let safeSelectorComment = selector.replace(/\*\//g, "* /");

                    if (selector === ctre.previewedHiddenSelector) {
                        cssLines.push(
                            ` ${selector} { outline: solid 5px rgba(0,214,255,0.5) !important; outline-offset: -5px; animation: ctrePreviewPulse 1s infinite; }`
                        );
                    } else if (selector === "body" || selector === "html") {
                        cssLines.push(
                            ` ${selector} { background: transparent !important; }`
                        );
                    } else {
                        cssLines.push(
                            ` ${selector} { display: none !important; }`
                        );
                    }
                } catch (e) {
                    console.error(
                        "CTRE: Error processing selector for CSS:",
                        selector,
                        e
                    );
                }
            }

            if (ctre.hiddenElements.length > 0) {
                cssLines.push(
                    ` html, html > body { display: block !important; } #ctre_wnd { display: block !important; }`
                );
            }

            cssLines.push(
                `@keyframes ctrePreviewPulse { 0% { outline-color: rgba(0,214,255,0.5); } 50% { outline-color: rgba(0,214,255,0.9); } 100% { outline-color: rgba(0,214,255,0.5); } }`
            );

            let styleElm = document.getElementById("ctre_styles");
            if (!styleElm) {
                styleElm = document.createElement("style");
                styleElm.id = "ctre_styles";

                document.head.insertBefore(styleElm, document.head.firstChild);
            }
            styleElm.textContent = cssLines.join("\n");
        },

        updateElementList: function () {
            if (!ctre.helpWindow) return;
            let elmList = ctre.$("#ctre_elm_list");
            if (!elmList) return;

            let lines = [];
            if (ctre.hiddenElements.length > 0) {
                lines.push(
                    '<table class="ct_element_table"><thead><tr class="ct_heading"><th>Removed Element</th><th>Remember?</th><th>Remove</th></tr></thead><tbody>'
                );

                for (let i = 0; i < ctre.hiddenElements.length; i++) {
                    const elm = ctre.hiddenElements[i];
                    if (!elm || !elm.selector) continue;

                    const dataIndex = i;

                    lines.push(`<tr data-selector="${escapeHTML(
                        elm.selector
                    )}" data-index="${dataIndex}">
						  <td class="ct_selector">
							<span class="ct_selector_text">${escapeHTML(elm.selector)}</span>
						  </td>
						  <td><input type="checkbox" class="ct_remember_cb" ${
                              elm.permanent ? " checked" : ""
                          } title="Remember this rule permanently"></td>
						  <td>
							 <button type="button" class="ct_preview" title="Preview (hover)"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"/></svg></button>
							 <button type="button" class="ct_delete" title="Remove this rule"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg></button>
						  </td>
					   </tr>`);
                }
                lines.push("</tbody></table>");
                elmList.classList.add("hasContent");
            } else {
                lines.push("<p>No elements removed in this session.</p>");
                elmList.classList.remove("hasContent");
            }
            elmList.innerHTML = lines.join("\n");

            elmList.removeEventListener("click", ctre.handleElementListClick);
            elmList.addEventListener("click", ctre.handleElementListClick);
            elmList.removeEventListener("change", ctre.handleElementListChange);
            elmList.addEventListener("change", ctre.handleElementListChange);
            elmList.removeEventListener(
                "mouseover",
                ctre.handleElementListMouseOver,
                true
            );
            elmList.addEventListener(
                "mouseover",
                ctre.handleElementListMouseOver,
                true
            );
            elmList.removeEventListener(
                "mouseout",
                ctre.handleElementListMouseOut,
                true
            );
            elmList.addEventListener(
                "mouseout",
                ctre.handleElementListMouseOut,
                true
            );
        },

        handleElementListClick: function (e) {
            const target = e.target;
            const tr = target.closest("tr");
            if (!tr) return;
            const index = parseInt(tr.dataset.index, 10);
            const hiddenElement = ctre.hiddenElements[index];
            if (!hiddenElement) return;

            if (target.classList.contains("ct_delete")) {
                e.preventDefault();
                ctre.hiddenElements.splice(index, 1);
                ctre.updateCSS();
                ctre.refreshOverlays();
                ctre.updateElementList();
                ctre.updateSavedElements();
            } else if (target.classList.contains("ct_edit_selector")) {
                e.preventDefault();
                const currentSelector = hiddenElement.selector;
                const newSelector = prompt(
                    'Customize CSS selector:\n\nHints:\n[id^="Abc"] matches #AbcWhatever\n[class*="Abc"] matches .somethingAbcSomething',
                    currentSelector
                );
                if (newSelector && newSelector !== currentSelector) {
                    hiddenElement.selector = newSelector;
                    tr.dataset.selector = newSelector;
                    tr.querySelector(".ct_selector_text").textContent =
                        newSelector;

                    ctre.updateCSS();
                    ctre.refreshOverlays();
                    ctre.updateSavedElements();
                }
            }
        },
        handleElementListChange: function (e) {
            const target = e.target;
            const tr = target.closest("tr");
            if (!tr || !target.classList.contains("ct_remember_cb")) return;

            const index = parseInt(tr.dataset.index, 10);
            const hiddenElement = ctre.hiddenElements[index];
            if (!hiddenElement) return;

            hiddenElement.permanent = target.checked;
            ctre.updateSavedElements();
        },
        handleElementListMouseOver: function (e) {
            if (e.target.classList.contains("ct_preview")) {
                const tr = e.target.closest("tr");
                if (tr && tr.dataset.selector) {
                    ctre.previewedHiddenSelector = tr.dataset.selector;
                    ctre.updateCSS();
                }
            }
        },
        handleElementListMouseOut: function (e) {
            if (e.target.classList.contains("ct_preview")) {
                const tr = e.target.closest("tr");
                if (
                    tr &&
                    tr.dataset.selector &&
                    ctre.previewedHiddenSelector === tr.dataset.selector
                ) {
                    ctre.previewedHiddenSelector = null;
                    ctre.updateCSS();
                }
            }
        },

        updateSavedElements: function () {
            const permanentElements = ctre.hiddenElements.filter(
                (elm) => elm && elm.permanent
            );
            try {
                chrome.runtime.sendMessage({
                    action: "set_saved_elms",
                    website: location.hostname.replace(/^www\./, ""),
                    data: JSON.stringify(permanentElements),
                });
            } catch (e) {
                console.error("CTRE: Error sending saved elements:", e.message);
            }
        },

        loadSavedElements: function () {
            const getSavedPromise = new Promise((resolve, reject) => {
                chrome.runtime.sendMessage(
                    {
                        action: "get_saved_elms",
                        website: location.hostname.replace(/^www\./, ""),
                    },
                    (response) => {
                        if (chrome.runtime.lastError)
                            reject(chrome.runtime.lastError);
                        else resolve(response);
                    }
                );
            });
            const getSettingsPromise = new Promise((resolve, reject) => {
                chrome.runtime.sendMessage(
                    { action: "get_settings" },
                    (response) => {
                        if (chrome.runtime.lastError)
                            reject(chrome.runtime.lastError);
                        else resolve(response);
                    }
                );
            });

            Promise.all([getSavedPromise, getSettingsPromise])
                .then(([savedData, settingsData]) => {
                    let loadedElements = [];
                    try {
                        if (
                            typeof savedData === "string" &&
                            savedData.trim().length > 0
                        ) {
                            const parsedData = JSON.parse(savedData);
                            if (Array.isArray(parsedData)) {
                                loadedElements = parsedData;
                            } else {
                                console.warn(
                                    "CTRE: Parsed saved elements data is not an array."
                                );
                            }
                        }
                    } catch (e) {
                        console.error(
                            "CTRE: Failed to parse saved elements JSON:",
                            e
                        );
                    }

                    try {
                        const settingsString =
                            typeof settingsData === "string" &&
                            settingsData.trim().length > 0
                                ? settingsData
                                : "{}";

                        ctre.settings = JSON.parse(settingsString);
                    } catch (e) {
                        console.error(
                            "CTRE: Failed to parse settings JSON:",
                            e,
                            "Raw data:",
                            settingsData
                        );
                        ctre.settings = {};
                    }

                    ctre.applyUserTheme();

                    const sessionOnlyElements = ctre.hiddenElements.filter(
                        (el) => el && !el.permanent
                    );
                    ctre.hiddenElements = [...sessionOnlyElements];
                    const currentSelectors = new Set(
                        ctre.hiddenElements.map((el) => el.selector)
                    );

                    loadedElements.forEach((loadedEl) => {
                        if (
                            loadedEl &&
                            typeof loadedEl.selector === "string" &&
                            loadedEl.selector &&
                            !currentSelectors.has(loadedEl.selector)
                        ) {
                            loadedEl.permanent = true;
                            ctre.hiddenElements.push(loadedEl);
                        } else if (
                            loadedEl &&
                            loadedEl.selector &&
                            currentSelectors.has(loadedEl.selector)
                        ) {
                        } else {
                            console.warn(
                                "CTRE: Skipping invalid loaded element:",
                                loadedEl
                            );
                        }
                    });

                    ctre.updateCSS();
                    if (ctre.targetingMode && ctre.helpWindow) {
                        ctre.updateElementList();
                    }
                })
                .catch((error) => {
                    console.error(
                        "CTRE: Error loading saved data/settings from background:",
                        error.message
                    );
                    ctre.hiddenElements = [];
                    ctre.settings = { remember: true };
                    ctre.applyUserTheme();
                    ctre.updateCSS();

                    if (ctre.targetingMode && ctre.helpWindow) {
                        ctre.updateElementList();
                    }
                });
        },

        activateDialog: function (cls) {
            if (!ctre.helpWindow?.shadowRoot) return;
            const closeCallback = () => {
                ctre.deactivateDialog();
            };
            ctre.activeDialog = new cls(
                ctre.helpWindow.shadowRoot,
                closeCallback
            );
            ctre.$(".mainWindow")?.style.setProperty("display", "none");
            ctre.unhighlightElement();
        },

        saveSettings: function () {
            try {
                const settingsToSave = {
                    remember: !!ctre.settings.remember,
                };
                chrome.runtime.sendMessage({
                    action: "set_settings",
                    data: JSON.stringify(settingsToSave),
                });
            } catch (e) {
                console.error("CTRE: Error sending settings:", e.message);
            }
        },
        saveSettings: function () {
            try {
                chrome.runtime.sendMessage({
                    action: "set_settings",
                    data: JSON.stringify(ctre.settings),
                });
            } catch (e) {
                console.error("CTRE: Error sending settings:", e.message);
            }
        },
        activateDialog: function (cls) {
            if (!ctre.helpWindow?.shadowRoot) return;
            ctre.activeDialog = new cls(
                ctre.helpWindow.shadowRoot,
                ctre.deactivateDialog
            );
            const mainWin = ctre.$(".mainWindow");
            if (mainWin) mainWin.style.display = "none";
            ctre.unhighlightElement();
        },
        deactivateDialog: function () {
            ctre.activeDialog?.destroy();
            ctre.activeDialog = null;
            const mainWin = ctre.$(".mainWindow");
            if (mainWin) mainWin.style.removeProperty("display");
        },

        activate: function () {
            if (ctre.targetingMode) return;

            ctre.loadSavedElements();
            if (!document.body) {
                console.error(
                    "CTRE: Cannot activate, document.body not ready."
                );
                return;
            }

            let createdHelpWindow = false;
            if (!ctre.helpWindow) {
                let shadowElm = document.createElement("div");
                shadowElm.setAttribute("id", "ctre_wnd");
                try {
                    shadowElm.attachShadow({ mode: "open" });
                } catch (e) {
                    console.error("CTRE: Failed to attach shadow DOM:", e);
                    return;
                }
                shadowElm.style.visibility = "hidden";
                document.body.appendChild(shadowElm);
                ctre.helpWindow = shadowElm;
                createdHelpWindow = true;

                let cssURL;
                try {
                    cssURL = chrome.runtime.getURL("content.css");
                } catch (e) {
                    console.error("CTRE: Failed to get CSS URL", e);
                    return;
                }

                shadowElm.shadowRoot.innerHTML = `
					  <link rel="stylesheet" href="${cssURL}">
					  <style>  .topButton svg, .dialog .topButton svg, .ct_preview svg, .ct_delete svg { width: 20px; height: 20px; fill: currentColor; pointer-events: none; vertical-align: middle; } </style>
					  <div class="mainWindow">
						  <div class="header">
							   <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="m339-288 141-141 141 141 51-51-141-141 141-141-51-51-141 141-141-141-51 51 141 141-141 141 51 51ZM480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>
							   <span class="header__logo">Zapp</span>
							   <span class="header__version">${VERSION}</span>
							   <span class="header__logo header__logo_small">zapp</span>
						  </div>
						  <hr/>
						  <div class="topButtons">
							   <div class="topButton topButton_settings" title="Advanced options"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="m403-96-22-114q-23-9-44.5-21T296-259l-110 37-77-133 87-76q-2-12-3-24t-1-25q0-13 1-25t3-24l-87-76 77-133 110 37q19-16 40.5-28t44.5-21l22-114h154l22 114q23 9 44.5 21t40.5 28l110-37 77 133-87 76q2 12 3 24t1 25q0 13-1 25t-3 24l87 76-77 133-110-37q-19 16-40.5 28T579-210L557-96H403Zm59-72h36l19-99q38-7 71-26t57-48l96 32 18-30-76-67q6-17 9.5-35.5T696-480q0-20-3.5-38.5T683-554l76-67-18-30-96 32q-24-29-57-48t-71-26l-19-99h-36l-19 99q-38 7-71 26t-57 48l-96-32-18 30 76 67q-6 17-9.5 35.5T264-480q0 20 3.5 38.5T277-406l-76 67 18 30 96-32q24 29 57 48t71 26l19 99Zm18-168q60 0 102-42t42-102q0-60-42-102t-102-42q-60 0-102 42t-42 102q0 60 42 102t102 42Zm0-144Z"/></svg></div>
							   <div class="topButton topButton_close" title="Close"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg></div>
						  </div>
						  <div class="ffWarning" style="display: ${
                              ctre.showPermissionsWarning ? "block" : "none"
                          };">...</div>
						  <div id="ctre_current_elm">...</div> <div id="ctre_elm_list">...</div>
						  <br>
						  <br>
					  </div>
				  `;

                const linkEl = ctre.$("link");
                const setupMainUIListeners = () => {
                    const safelyAddListener = (selector, event, handler) => {
                        try {
                            const el = ctre.$(selector);
                            if (el) el.addEventListener(event, handler);
                            else console.warn(`Element not found: ${selector}`);
                        } catch (e) {
                            console.error(
                                `Error adding listener for ${selector}`,
                                e
                            );
                        }
                    };

                    safelyAddListener(".topButton_close", "click", (e) => {
                        ctre.deactivate();
                        e.preventDefault();
                    });
                    safelyAddListener(".topButton_settings", "click", (e) => {
                        ctre.activateDialog(AdvOptionsDialog);
                        e.preventDefault();
                    });

                    const dragTarget = ctre.$(".header");
                    if (dragTarget) {
                        dragTarget.style.cursor = "move";
                        const host = shadowElm;
                        let isDragging = false,
                            offsetX = 0,
                            offsetY = 0;
                        const onHeaderMove = (e) => {
                            if (!isDragging) return;
                            host.style.left = e.clientX - offsetX + "px";
                            host.style.top = e.clientY - offsetY + "px";
                        };
                        const onHeaderUp = () => {
                            if (!isDragging) return;
                            isDragging = false;
                            document.removeEventListener(
                                "mousemove",
                                onHeaderMove
                            );
                            document.removeEventListener("mouseup", onHeaderUp);
                            host.style.cursor = "move";
                        };
                        dragTarget.addEventListener("mousedown", (e) => {
                            if (e.target.closest(".topButton")) return;
                            isDragging = true;
                            host.style.cursor = "grabbing";
                            const rect = host.getBoundingClientRect();
                            offsetX = e.clientX - rect.left;
                            offsetY = e.clientY - rect.top;
                            host.style.position = "fixed";
                            host.style.bottom = "auto";
                            host.style.right = "auto";
                            document.addEventListener(
                                "mousemove",
                                onHeaderMove
                            );
                            document.addEventListener("mouseup", onHeaderUp);
                            e.preventDefault();
                        });
                    } else {
                        console.warn(
                            "CTRE UI: Drag target (.header) not found."
                        );
                    }

                    ctre.updateElementList();
                    ctre.$("#ctre_current_elm").textContent =
                        "Use the mouse to select an element to remove.";
                    shadowElm.style.visibility = "visible";
                    setTimeout(() => {
                        ctre.$(".header__logo")?.classList.add(
                            "header__logo_anim"
                        );
                    }, 100);
                };

                if (!linkEl) {
                    console.warn("CTRE UI: Link element for CSS not found.");
                    setupMainUIListeners();
                } else {
                    let cssLoaded = false;
                    const handleLoad = () => {
                        cssLoaded = true;
                        setupMainUIListeners();
                        cleanup();
                    };
                    const handleError = (e) => {
                        cssLoaded = true;
                        setupMainUIListeners();
                        cleanup();
                    };
                    const cleanup = () => {
                        linkEl.removeEventListener("load", handleLoad);
                        linkEl.removeEventListener("error", handleError);
                    };
                    linkEl.addEventListener("load", handleLoad);
                    linkEl.addEventListener("error", handleError);
                    setTimeout(() => {
                        if (!cssLoaded) {
                            console.warn("CTRE: CSS load timeout");
                            setupMainUIListeners();
                            cleanup();
                        }
                    }, 3000);
                }
            } else {
                ctre.helpWindow.classList.add("visible");
                ctre.updateElementList();
                ctre.$("#ctre_current_elm").textContent =
                    "Use the mouse to select an element to remove.";
                const ffWarn = ctre.$(".ffWarning");
                if (ffWarn)
                    ffWarn.style.display = ctre.showPermissionsWarning
                        ? "block"
                        : "none";
            }

            document.removeEventListener(
                "mouseover",
                ctre.handleMouseover,
                true
            );
            document.addEventListener("mouseover", ctre.handleMouseover, true);
            document.removeEventListener("mousedown", ctre.hideTarget, true);
            document.addEventListener("mousedown", ctre.hideTarget, true);
            document.removeEventListener("mouseup", ctre.preventEvent, true);
            document.addEventListener("mouseup", ctre.preventEvent, true);
            document.removeEventListener("click", ctre.preventEvent, true);
            document.addEventListener("click", ctre.preventEvent, true);
            document.removeEventListener(
                "scroll",
                ctre.updateHighlighterPos,
                true
            );
            document.addEventListener(
                "scroll",
                ctre.updateHighlighterPos,
                true
            );

            ctre.addOverlays();
            ctre.targetingMode = true;
            chrome.runtime.sendMessage({
                action: "statusUpdate",
                active: true,
            });
        },

        deactivate: function () {
            if (!ctre.targetingMode && !ctre.helpWindow) return;

            ctre.targetingMode = false;
            ctre.deactivateDialog();
            ctre.unhighlightElement();

            document.removeEventListener(
                "mouseover",
                ctre.handleMouseover,
                true
            );
            document.removeEventListener("mousedown", ctre.hideTarget, true);
            document.removeEventListener("mouseup", ctre.preventEvent, true);
            document.removeEventListener("click", ctre.preventEvent, true);
            document.removeEventListener(
                "scroll",
                ctre.updateHighlighterPos,
                true
            );
            ctre.removeOverlays();

            ctre.helpWindow?.remove();
            ctre.helpWindow = null;

            try {
                chrome.runtime.sendMessage({
                    action: "statusUpdate",
                    active: false,
                });
            } catch (e) {
                console.warn(
                    "CTRE: Error sending deactivate status",
                    e.message
                );
            }
        },

        toggle: function () {
            if (ctre.targetingMode || ctre.helpWindow) {
                ctre.deactivate();
            } else {
                ctre.activate();
            }
        },

        addOverlays: function () {
            document.querySelectorAll("iframe, embed").forEach((e) => {
                if (e.id === "ctre_highlighter" || ctre.isChildOfCTREWindow(e))
                    return;
                try {
                    const rect = e.getBoundingClientRect();

                    if (rect.width < 5 || rect.height < 5) return;

                    let overlayElm = document.createElement("div");
                    overlayElm.className = "ctre_overlay";
                    overlayElm.style.position = "absolute";
                    overlayElm.style.left = rect.left + window.scrollX + "px";
                    overlayElm.style.top = rect.top + window.scrollY + "px";
                    overlayElm.style.width = rect.width + "px";
                    overlayElm.style.height = rect.height + "px";
                    overlayElm.style.background = "rgba(128,128,128,0.1)";
                    overlayElm.style.border =
                        "1px dotted rgba(128,128,128,0.3)";
                    overlayElm.style.zIndex = ctre.maxZIndex - 2;
                    overlayElm.style.pointerEvents = "auto";
                    overlayElm.relatedElement = e;

                    document.body.appendChild(overlayElm);
                } catch (err) {
                    console.warn(
                        "CTRE: Error creating overlay for element",
                        e,
                        err
                    );
                }
            });
        },
        removeOverlays: function () {
            document
                .querySelectorAll(".ctre_overlay")
                .forEach((e) => e.remove());
        },
        refreshOverlays: function () {
            ctre.removeOverlays();

            if (ctre.targetingMode) {
                ctre.addOverlays();
            }
        },

        handleExtensionMessage: function (msg, sender, sendResponse) {
            if (msg.action === "toggle") {
                ctre.showPermissionsWarning = !msg.permissionsGranted;

                const ffWarn = ctre.$(".ffWarning");
                if (ffWarn)
                    ffWarn.style.display = ctre.showPermissionsWarning
                        ? "block"
                        : "none";

                ctre.toggle();
                sendResponse({
                    version: VERSION,
                });
                return true;
            } else if (msg.action === "getStatus") {
                sendResponse(ctre.targetingMode);
                return false;
            } else {
                return false;
            }
        },

        init: function () {
            if (window.ctreScriptInitialized) {
                return;
            }
            window.ctreScriptInitialized = true;
            ctre.isInitialized = true;

            try {
                if (
                    chrome.runtime.onMessage.hasListener(
                        ctre.handleExtensionMessage
                    )
                ) {
                    chrome.runtime.onMessage.removeListener(
                        ctre.handleExtensionMessage
                    );
                    console.warn(
                        "CTRE Content Script: Removed existing message listener."
                    );
                }
                chrome.runtime.onMessage.addListener(
                    ctre.handleExtensionMessage
                );
            } catch (e) {
                console.error(
                    "CTRE Content Script: FAILED TO ADD MESSAGE LISTENER!",
                    e
                );
                return;
            }

            document.removeEventListener("keydown", ctre.handleKeydown);
            document.addEventListener("keydown", ctre.handleKeydown);
            document.removeEventListener("keyup", ctre.handleKeyup);
            document.addEventListener("keyup", ctre.handleKeyup);

            ctre.loadSavedElements();
        },
    };

    function closest(el, selector) {
        var retval = null;
        while (el) {
            if (el.matches && el.matches(selector)) {
                retval = el;
                break;
            }
            el = el.parentElement;
        }
        return retval;
    }

    function escapeHTML(str) {
        if (typeof str !== "string") {
            console.warn("escapeHTML called with non-string:", str);
            return "";
        }
        return str
            .replace(/&/g, "&")
            .replace(/</g, "<")
            .replace(/>/g, ">")
            .replace(/"/g, '"')
            .replace(/'/g, "&#039;");
    }

    class AdvOptionsDialog {
        constructor(shadowRoot, close) {
            this.elm = document.createElement("div");
            this.elm.className = "dialog dialog_advOptions";
            this.elm.innerHTML = `
			  <div class="header"><span class="header__logo">Advanced options</span></div>
			  <div class="topButtons"><div class="topButton topButton_close" title="Close"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg></div></div>
			  <div class="advOptions">
			  	<div class="settingsRow">
                    <label> Remember by default: <span id="ctre_opt_remember_dialog">?</span> </label>
                </div>
				<div class="advOptions__row"><button class="advOptions__export">Export elements</button><p class="advOptions__rowHelp">Exports a list of all the permanently removed elements from all the websites to a JSON file.</p></div>
				<div class="advOptions__row"><button class="advOptions__import"><input type="file" accept=".json">Import elements</button><p class="advOptions__rowHelp">Loads a list of permanently removed elements from a previously exported file.</p></div>
			  </div>`;
            shadowRoot.appendChild(this.elm);

            this.elm
                .querySelector(".topButton_close")
                .addEventListener("click", (e) => {
                    close();
                    e.preventDefault();
                });
            this.elm
                .querySelector(".advOptions__export")
                .addEventListener("click", (e) => {
                    chrome.runtime
                        .sendMessage({
                            action: "export_settings",
                        })
                        .then((data) => {
                            if (!data) {
                                alert(
                                    "Export failed. Check background console."
                                );
                                return;
                            }
                            let link = document.createElement("a");
                            let blob = new Blob([data], {
                                type: "application/json",
                            });
                            let url = URL.createObjectURL(blob);
                            link.href = url;
                            link.download =
                                "Zapp_export_" +
                                new Date().toISOString().slice(0, 10) +
                                ".json";
                            link.click();
                            setTimeout(() => URL.revokeObjectURL(url), 60000);
                        })
                        .catch((err) => {
                            alert("Export failed: " + err.message);
                        });
                    e.preventDefault();
                });
            this.elm
                .querySelector(".advOptions__import input")
                .addEventListener("change", function (e) {
                    let input = this;
                    let file = this.files[0];
                    if (!file) return;
                    (async () => {
                        if (file.type !== "application/json")
                            throw new Error(
                                "Invalid file type (expected .json)"
                            );
                        let text = await file.text();
                        input.value = "";
                        let json;
                        try {
                            json = JSON.parse(text);
                        } catch (ex) {
                            throw new Error("Error parsing JSON data in file");
                        }
                        if (json.version !== 1)
                            throw new Error(
                                "Incorrect version number in imported data"
                            );
                        let result = await chrome.runtime.sendMessage({
                            action: "import_settings",
                            data: text,
                        });
                        if (result !== "SUCCESS") throw new Error(result);
                        ctre.loadSavedElements();
                        alert("Import successful!");
                        close();
                    })().catch((ex) => {
                        alert(ex?.message || "Import Error");
                    });
                });

            const settingsLabel = this.elm.querySelector(".settingsRow label");
            const rememberSpan = this.elm.querySelector(
                "#ctre_opt_remember_dialog"
            );

            const updateDialogCheckbox = () => {
                if (rememberSpan) {
                    const isRememberChecked =
                        typeof ctre.settings === "object" &&
                        ctre.settings !== null
                            ? !!ctre.settings.remember
                            : true; // Default true if settings invalid
                    rememberSpan.innerHTML = `<input type="checkbox" id="ctre_remember_cb_ui_dialog" ${
                        isRememberChecked ? " checked" : ""
                    }>`;
                } else {
                    console.warn("Dialog: Remember span not found.");
                }
            };

            if (settingsLabel) {
                settingsLabel.addEventListener("click", (e) => {
                    const checkbox = rememberSpan?.querySelector(
                        'input[type="checkbox"]'
                    );

                    if (typeof ctre.settings === "string") {
                        console.warn(
                            "Settings Click: ctre.settings was a string! Attempting re-parse."
                        );
                        try {
                            ctre.settings = JSON.parse(
                                ctre.settings || '{"remember":true}'
                            );
                            if (typeof ctre.settings.remember === "undefined") {
                                ctre.settings.remember = true;
                            }
                        } catch (parseError) {
                            console.error(
                                "Settings Click: Failed to re-parse settings string, resetting.",
                                parseError
                            );
                            ctre.settings = { remember: true };
                        }
                    } else if (
                        typeof ctre.settings !== "object" ||
                        ctre.settings === null
                    ) {
                        console.warn(
                            "Settings Click: ctre.settings was not object/string, resetting."
                        );
                        ctre.settings = { remember: true };
                    }

                    if (checkbox && e.target !== checkbox) {
                        ctre.settings.remember = !ctre.settings.remember;
                        ctre.saveSettings();
                        updateDialogCheckbox();
                    } else if (checkbox && e.target === checkbox) {
                        setTimeout(() => {
                            ctre.settings.remember = checkbox.checked;
                            ctre.saveSettings();
                        }, 0);
                    }
                });
            } else {
                console.warn("Dialog: Settings row label not found.");
            }

            updateDialogCheckbox();
        }

        destroy() {
            this.elm?.remove();
        }
    }

    ctre.init();
})();
