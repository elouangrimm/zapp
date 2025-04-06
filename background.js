// FILE: background.js - CORRECTED VERSION 3 (Full Paste)

/**
 * Zapp Background Script v3.1.5 (Refactored)
 */

// Embedded idb-keyval library
// Ensures idbKeyval is available globally in SW scope
var idbKeyval; // Declare variable in the outer scope
(() => {
    function _slicedToArray(t, n) { return _arrayWithHoles(t) || _iterableToArrayLimit(t, n) || _unsupportedIterableToArray(t, n) || _nonIterableRest() } function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") } function _unsupportedIterableToArray(t, n) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, n); var r = Object.prototype.toString.call(t).slice(8, -1); return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(t, n) : void 0 } } function _arrayLikeToArray(t, n) { (null == n || n > t.length) && (n = t.length); for (var r = 0, e = new Array(n); r < n; r++) e[r] = t[r]; return e } function _iterableToArrayLimit(t, n) { var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"]; if (null != r) { var e, o, u = [], i = !0, a = !1; try { for (r = r.call(t); !(i = (e = r.next()).done) && (u.push(e.value), !n || u.length !== n); i = !0); } catch (t) { a = !0, o = t } finally { try { i || null == r.return || r.return() } finally { if (a) throw o } } return u } } function _arrayWithHoles(t) { if (Array.isArray(t)) return t } function _typeof(t) { return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t }, _typeof(t) }
    ! function (t, n) {
         // Assign exported object directly to our declared variable
         idbKeyval = n({});
    }(this, (function (t) { // Pass an empty object to be populated
        "use strict";
        function n(t) { return new Promise((function (n, r) { t.oncomplete = t.onsuccess = function () { return n(t.result) }, t.onabort = t.onerror = function () { return r(t.error) } })) } function r(t, r) { var e = indexedDB.open(t); e.onupgradeneeded = function () { return e.result.createObjectStore(r) }; var o = n(e); return function (t, n) { return o.then((function (e) { return n(e.transaction(r, t).objectStore(r)) })) } } var e; function o() { return e || (e = r("keyval-store", "keyval")), e } function u(t, r) { return t.openCursor().onsuccess = function () { this.result && (r(this.result), this.result.continue()) }, n(t.transaction) }
        t.clear = function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o(); return t("readwrite", (function (t) { return t.clear(), n(t.transaction) })) }; t.createStore = r; t.del = function (t) { var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o(); return r("readwrite", (function (r) { return r.delete(t), n(r.transaction) })) }; t.delMany = function (t) { var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o(); return r("readwrite", (function (r) { return t.forEach((function (t) { return r.delete(t) })), n(r.transaction) })) }; t.entries = function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o(); return t("readonly", (function (r) { if (r.getAll && r.getAllKeys) return Promise.all([n(r.getAllKeys()), n(r.getAll())]).then((function (t) { var n = _slicedToArray(t, 2), r = n[0], e = n[1]; return r.map((function (t, n) { return [t, e[n]] })) })); var e = []; return t("readonly", (function (t) { return u(t, (function (t) { return e.push([t.key, t.value]) })).then((function () { return e })) })) })) }; t.get = function (t) { var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o(); return r("readonly", (function (r) { return n(r.get(t)) })) }; t.getMany = function (t) { var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o(); return r("readonly", (function (r) { return Promise.all(t.map((function (t) { return n(r.get(t)) }))) })) }; t.keys = function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o(); return t("readonly", (function (t) { if (t.getAllKeys) return n(t.getAllKeys()); var r = []; return u(t, (function (t) { return r.push(t.key) })).then((function () { return r })) })) }; t.promisifyRequest = n; t.set = function (t, r) { var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : o(); return e("readwrite", (function (e) { return e.put(r, t), n(e.transaction) })) }; t.setMany = function (t) { var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o(); return r("readwrite", (function (r) { return t.forEach((function (t) { return r.put(t[1], t[0]) })), n(r.transaction) })) }; t.update = function (t, r) { var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : o(); return e("readwrite", (function (e) { return new Promise((function (o, u) { e.get(t).onsuccess = function () { try { e.put(r(this.result), t), o(n(e.transaction)) } catch (t) { u(t) } } })) })) }; t.values = function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o(); return t("readonly", (function (t) { if (t.getAll) return n(t.getAll()); var r = []; return u(t, (function (t) { return r.push(t.value) })).then((function () { return r })) })) };
        return t; // Return the populated object
    }));
})();
// --- End of idb-keyval code ---

// Test if idbKeyval loaded
if (typeof idbKeyval === 'undefined' || typeof idbKeyval.get !== 'function') {
    console.error("ZAPP BACKGROUND: idbKeyval library FAILED to load correctly!");
} else {
    console.log("ZAPP BACKGROUND: idbKeyval loaded.");
}

// --- Action Icon Management ---
function setActiveIcon(tabId) {
    try {
        chrome.action.setIcon({ tabId: tabId, path: 'icons/action_active.png' });
        chrome.action.setTitle({ tabId: tabId, title: 'Zapp - Click to exit selection mode' });
    } catch (e) { console.warn("Failed to set active icon:", e.message); }
}

function setInactiveIcon(tabId) {
     try {
        chrome.action.setIcon({ tabId: tabId, path: 'icons/action_inactive.png' });
        chrome.action.setTitle({ tabId: tabId, title: 'Zapp - Click to remove element' });
     } catch (e) { console.warn("Failed to set inactive icon:", e.message); }
}

function setUnavailableIcon(tabId) {
     try {
        chrome.action.setIcon({ tabId: tabId, path: 'icons/action_unavailable.png' });
        chrome.action.setTitle({ tabId: tabId, title: 'Zapp (Unavailable on this page)' });
     } catch (e) { console.warn("Failed to set unavailable icon:", e.message); }
}

// --- Check status on tab changes ---
async function checkTabStatus(tabId) {
    if (!tabId || tabId < 0) return;
    let tab;
    try {
        tab = await chrome.tabs.get(tabId);
        if (!tab.url?.startsWith('http')) {
            setUnavailableIcon(tabId);
            return;
        }
        // Ask content script if it's active
        const isActive = await chrome.tabs.sendMessage(tabId, { action: 'getStatus' });
        if (isActive) {
            setActiveIcon(tabId);
        } else {
            setInactiveIcon(tabId);
        }
    } catch (err) {
        // Error likely means content script isn't running or page is protected
        if (tab && tab.url?.startsWith('http')) {
            setInactiveIcon(tabId); // If it's a regular page, assume inactive
        } else if (tab) {
            setUnavailableIcon(tabId); // Otherwise set unavailable
        }
        // console.log(`checkTabStatus(${tabId}): Error checking status or content script not ready. ${err.message}`);
    }
}

// --- Handle Action Button Click ---
async function handleActionClick(tab) {
    if (!tab || !tab.id || !tab.url?.startsWith('http')) {
        console.log("Zapp: Action clicked on invalid tab.", tab?.url);
        return;
    }
    const tabId = tab.id;
    console.log(`Zapp: Action clicked for tab ${tabId}`);

    // 1. Check/Request Host Permissions
    let hasPermissions = false;
    try {
        hasPermissions = await chrome.permissions.contains({ origins: ['*://*/*'] });
        if (!hasPermissions) {
            console.log("Zapp: Requesting host permissions...");
            hasPermissions = await chrome.permissions.request({ origins: ['*://*/*'] });
            if (!hasPermissions) {
                console.warn("Zapp: Host permissions denied.");
            }
        }
    } catch (e) {
        console.error("Zapp: Error checking/requesting permissions:", e);
    }

    // 2. Try sending 'toggle' - content script might exist
    try {
        console.log(`Zapp: Sending 'toggle' to tab ${tabId}. Permissions granted: ${hasPermissions}`);
        await chrome.tabs.sendMessage(tabId, {
            action: 'toggle',
            permissionsGranted: hasPermissions // Pass current status
        });
        console.log(`Zapp: Toggle message received by content script in tab ${tabId}.`);
    } catch (err) {
        // 3. If send fails, inject the script
        console.log(`Zapp: sendMessage failed ('${err.message}'), injecting content script into tab ${tabId}...`);
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['ctre_content.js']
            });
            console.log("Zapp: Injection successful. Waiting briefly...");

            // Wait a moment for the script to initialize
            await new Promise(resolve => setTimeout(resolve, 200)); // Increased delay slightly

            console.log(`Zapp: Sending 'toggle' again to tab ${tabId}. Permissions granted: ${hasPermissions}`);
            // 4. Send 'toggle' again
            await chrome.tabs.sendMessage(tabId, {
                action: 'toggle',
                permissionsGranted: hasPermissions
            });
            console.log(`Zapp: Second 'toggle' message received by content script in tab ${tabId}.`);
        } catch (injectionError) {
            console.error(`Zapp: Failed to inject script or send message after injection into tab ${tabId}:`, injectionError.message);
            if (injectionError.message.includes("Receiving end does not exist")) {
                 console.error(">>> ZAPP BACKGROUND: Injection seemed to succeed, but content script did not respond. Check the PAGE's console (Inspect Element -> Console) for errors in ctre_content.js. <<<");
            }
            setUnavailableIcon(tabId); // Set icon to unavailable as action failed
        }
    }
}

// --- Handle Messages from Content Scripts ---
function handleMessage(msg, sender, sendResponse) {
    const IS_ASYNC = true;
    const senderTabId = sender.tab?.id;

    // console.log("Background received message:", msg, "from tab:", senderTabId);

    if (typeof idbKeyval === 'undefined' || typeof idbKeyval.get !== 'function') {
        // Check only if action requires idbKeyval
        if (['get_saved_elms', 'set_saved_elms', 'get_settings', 'set_settings', 'export_settings', 'import_settings'].includes(msg.action)) {
             console.error("idbKeyval is not defined! Cannot handle storage action:", msg.action);
             sendResponse({ error: "Storage unavailable" });
             return false; // Must return sync false if not handling async
        }
    }

    switch (msg.action) {
        case 'statusUpdate': // Sent by content script when its state changes
            if (senderTabId) {
                console.log(`Zapp: Received status update from tab ${senderTabId}:`, msg.active);
                msg.active ? setActiveIcon(senderTabId) : setInactiveIcon(senderTabId);
            }
            sendResponse({ received: true }); // Acknowledge
            break; // Break is important

        case 'get_saved_elms':
            idbKeyval.get('web:' + msg.website)
                .then(data => { sendResponse(data || '[]'); }) // Send raw string or default
                .catch(err => { console.error("idbKeyval get error (saved_elms):", err); sendResponse('[]'); });
            return IS_ASYNC;
        case 'set_saved_elms':
             const dataToSave = typeof msg.data === 'string' ? msg.data : JSON.stringify(msg.data || []); // Ensure saving string
            idbKeyval.set('web:' + msg.website, dataToSave)
                .then(() => sendResponse({ success: true }))
                .catch(err => { console.error("idbKeyval set error (saved_elms):", err); sendResponse({ success: false }); });
            return IS_ASYNC;
        case 'get_settings':
            idbKeyval.get('settings')
                .then((data) => { sendResponse(data || '{}'); }) // Send raw string or default
                .catch(err => { console.error("idbKeyval get error (settings):", err); sendResponse('{}'); });
            return IS_ASYNC;
        case 'set_settings':
             (async () => {
                 try {
                     let settingsObj = typeof msg.data === 'string' ? JSON.parse(msg.data || '{}') : (msg.data || {});
                     if ('regInfo' in settingsObj) delete settingsObj.regInfo;
                     await idbKeyval.set('settings', JSON.stringify(settingsObj)); // Save as string
                     sendResponse({ success: true });
                 } catch (err) {
                     console.error("idbKeyval set error or JSON parse error (settings):", err);
                     sendResponse({ success: false });
                 }
             })();
            return IS_ASYNC;
        case 'get_hotkey':
            chrome.commands.getAll((cmds) => {
                sendResponse(cmds?.find(c => c.name === '_execute_action')?.shortcut || 'No key set');
            });
            return IS_ASYNC;
        case 'goto_hotkey_settings':
            chrome.tabs.create({ url: 'chrome://extensions/shortcuts' })
                .catch(() => { chrome.tabs.create({ url: 'about:addons' }) });
            break;
        case 'export_settings':
             (async () => {
                 try {
                     let entries = await idbKeyval.entries();
                     let webEntries = entries.filter((entry) => entry[0].startsWith('web:'));
                     let settingsEntry = entries.find((entry) => entry[0] === 'settings');

                     let exportedObj = {};
                     webEntries.forEach(entry => {
                         try { exportedObj[entry[0]] = JSON.parse(entry[1] || '[]'); }
                         catch(e) { console.warn(`Failed to parse web entry ${entry[0]} during export`, e); }
                     });
                     if (settingsEntry) {
                         try { exportedObj.settings = JSON.parse(settingsEntry[1] || '{}'); }
                         catch(e) { console.warn("Failed to parse settings during export", e); }
                     }
                     exportedObj.version = 1;
                     sendResponse(JSON.stringify(exportedObj, null, 2));
                 } catch(err) {
                      console.error("Export error:", err);
                      sendResponse(null);
                 }
             })();
            return IS_ASYNC;
        case 'import_settings':
             (async () => {
                 try {
                     let obj = JSON.parse(msg.data);
                     if (obj.version !== 1) throw new Error('Unsupported import version');
                     await idbKeyval.clear();
                     const entriesToImport = [];
                     for (const key in obj) {
                          if (key.startsWith('web:') || key === 'settings') {
                              entriesToImport.push([key, JSON.stringify(obj[key] || (key === 'settings' ? {} : []))]);
                          }
                     }
                     if (entriesToImport.length > 0) {
                         await idbKeyval.setMany(entriesToImport);
                     }
                     sendResponse('SUCCESS');
                 } catch (err) {
                     console.error("Import error:", err);
                     sendResponse(err?.message || 'Import failed');
                 }
             })();
            return IS_ASYNC;

        default:
            console.log("Background received unknown message action:", msg.action);
            return false; // Indicate sync completion for unhandled
    }
     // If a case doesn't return true for async, the response channel might close early.
     // Explicit return true is needed for async responses in onMessage.
     // Sync actions or unhandled should allow return false.
     return false; // Should be unreachable if all paths return or break, but safer
}

// --- Attach Listeners ---
chrome.action.onClicked.addListener(handleActionClick);
chrome.runtime.onMessage.addListener(handleMessage);
chrome.tabs.onActivated.addListener((activeInfo) => {
    checkTabStatus(activeInfo.tabId);
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check status when a tab finishes loading or URL changes significantly
    if (changeInfo.status === 'complete') { // Check on complete regardless of URL type
         checkTabStatus(tabId); // Let checkTabStatus handle URL check
    }
});
chrome.windows.onFocusChanged.addListener((windowId) => {
    // Check status when window focus changes
    if (windowId !== chrome.windows.WINDOW_ID_NONE) {
        chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
            if (tabs.length > 0) {
                checkTabStatus(tabs[0].id);
            }
        });
    }
});

// --- Initial State Check ---
console.log("Zapp Service Worker started.");
// Check status of currently active tab on startup
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
        checkTabStatus(tabs[0].id);
    }
});