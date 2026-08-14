window.__ModuleLoader__.load({
	id: "@dsh-local/dsh-zen",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		const ZEN_ID = "dsh-zen-root";
		const ZEN_EVENT = "dsh-zen-change";
		const HUD_TITLE = "dsh-zen-title";
		const HUD_STATUS = "dsh-zen-status";
		const HUD_DETAIL = "dsh-zen-detail";
		const HUD_SUGGEST = "dsh-zen-suggest";
		const PH_ATTR = "data-dsh-zen-ph";
		const HUD_MARK = "data-dsh-zen-hud";
		const SHELL_MARK = "data-dsh-zen-shell";
		const SKIN_SCOPES = ["data-dsh-maid-atelier", "data-maid-composer-motion", "data-maid-sidebar-compact", "data-maid-sidebar-size"];

		// ---------- styles ----------
		const CSS = [
			"#" + ZEN_ID + "{position:fixed;right:14px;top:62px;z-index:2147483002;width:36px;height:36px;border-radius:50%;border:1px solid rgba(0,0,0,.18);background:rgba(255,255,255,.85);color:#3a4252;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;opacity:.45;transition:opacity .25s,transform .25s}",
			"#" + ZEN_ID + ":hover{opacity:1;transform:scale(1.08)}",
			"body[data-ds-dark-theme] #" + ZEN_ID + "{background:rgba(40,42,46,.9);color:#e8eaee;border-color:rgba(255,255,255,.2)}",
			"body.dsh-zen-active #" + ZEN_ID + "{opacity:1;background:rgba(90,140,120,.9);color:#fff;border-color:rgba(255,255,255,.25)}",
			// minimal plain state
			"html.dsh-zen-active,body.dsh-zen-active{background:#f6f7f9 !important;color:#333}",
			"html[data-ds-dark-theme].dsh-zen-active,body[data-ds-dark-theme].dsh-zen-active{background:#16171a !important;color:#ddd}",
			"body.dsh-zen-active [" + SHELL_MARK + "]{transition:filter .35s ease,background .35s ease;filter:saturate(.85)}",
			"body.dsh-zen-active [" + SHELL_MARK + "] > *{background-color:transparent !important}",
			// safety net: whatever skin decoration elements survive scope removal stay hidden
			"body.dsh-zen-active [data-maid-character],body.dsh-zen-active [data-skin-chrome],body.dsh-zen-active [data-skin-trim-layer],body.dsh-zen-active [data-skin-corner],body.dsh-zen-active [data-skin-ornament],body.dsh-zen-active [data-skin-decoration]{display:none !important}",
			// zen HUD
			"#" + HUD_TITLE + "{position:fixed;left:24px;top:20px;z-index:2147483003;max-width:38vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:15px;font-weight:600;letter-spacing:.2px;color:rgba(0,0,0,.5);pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif}",
			"body[data-ds-dark-theme] #" + HUD_TITLE + "{color:rgba(255,255,255,.55)}",
			"#" + HUD_STATUS + "{position:fixed;right:64px;top:22px;z-index:2147483003;display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600;color:rgba(0,0,0,.6);cursor:pointer;background:rgba(255,255,255,.7);border:1px solid rgba(0,0,0,.08);border-radius:999px;padding:5px 12px;box-shadow:0 1px 6px rgba(0,0,0,.08);transition:opacity .2s;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif}",
			"body[data-ds-dark-theme] #" + HUD_STATUS + "{background:rgba(40,42,46,.75);color:rgba(255,255,255,.8);border-color:rgba(255,255,255,.12)}",
			"#" + HUD_STATUS + ":hover{opacity:.85}",
			"#dsh-zen-dot{width:8px;height:8px;border-radius:50%;background:#9ca3af;flex:0 0 8px}",
			"#dsh-zen-dot[data-mode=working]{background:#34d399;animation:dshZenPulse 1.6s ease-in-out infinite}",
			"#dsh-zen-dot[data-mode=pending]{background:#fbbf24;animation:dshZenPulse 1.1s ease-in-out infinite}",
			"@keyframes dshZenPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.72)}}",
			"#" + HUD_DETAIL + "{position:fixed;right:64px;top:56px;z-index:2147483004;width:330px;max-height:60vh;overflow:auto;background:#fff;border:1px solid rgba(0,0,0,.12);border-radius:14px;box-shadow:0 10px 34px rgba(0,0,0,.18);padding:14px 16px;font-size:12.5px;color:#333;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif}",
			"body[data-ds-dark-theme] #" + HUD_DETAIL + "{background:#232427;color:#ddd;border-color:rgba(255,255,255,.14)}",
			"#" + HUD_DETAIL + " h4{margin:0 0 8px;font-size:12px;font-weight:600;color:#888}",
			"body[data-ds-dark-theme] #" + HUD_DETAIL + " h4{color:#9a9da5}",
			"#" + HUD_DETAIL + " .dshZenRow{display:flex;justify-content:space-between;gap:12px;margin:6px 0;line-height:1.5}",
			"#" + HUD_DETAIL + " .dshZenRow .k{color:#888;flex:0 0 auto}",
			"#" + HUD_DETAIL + " .dshZenRow .v{text-align:right;word-break:break-all}",
			"#" + HUD_DETAIL + " .dshZenHist{margin-top:4px;padding:0;list-style:none;max-height:160px;overflow:auto}",
			"#" + HUD_DETAIL + " .dshZenHist li{margin:5px 0;padding-left:12px;position:relative;color:#555;line-height:1.5;font-size:12px}",
			"body[data-ds-dark-theme] #" + HUD_DETAIL + " .dshZenHist li{color:#b8bac0}",
			"#" + HUD_DETAIL + " .dshZenHist li:before{content:'';position:absolute;left:0;top:7px;width:5px;height:5px;border-radius:50%;background:#9aa3af}",
			"#" + HUD_SUGGEST + "{position:fixed;z-index:2147483003;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;pointer-events:none}",
			"#" + HUD_SUGGEST + " button{pointer-events:auto;appearance:none;border:1px solid rgba(0,0,0,.14);background:rgba(255,255,255,.85);color:#444;border-radius:999px;padding:5px 14px;font-size:12.5px;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.07);transition:background .15s,transform .15s;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif}",
			"#" + HUD_SUGGEST + " button:hover{background:#fff;transform:translateY(-1px)}",
			"#" + HUD_SUGGEST + " button.dshZenPause{color:#c2410c;border-color:rgba(194,65,12,.4)}",
			"body[data-ds-dark-theme] #" + HUD_SUGGEST + " button{background:rgba(45,47,52,.85);color:#d6d8dc;border-color:rgba(255,255,255,.14)}",
			"body[data-ds-dark-theme] #" + HUD_SUGGEST + " button:hover{background:#35373c}",
			// composer: calmer in zen
			"body.dsh-zen-active textarea,body.dsh-zen-active [contenteditable]{font-size:15px !important;caret-color:#6b7280}",
			"#dsh-zen-diag{position:fixed;left:50%;top:10px;transform:translateX(-50%);z-index:2147483005;font-size:13px;font-weight:700;color:#b91c1c;background:rgba(255,255,255,.92);border:1px solid rgba(185,28,28,.4);border-radius:8px;padding:4px 12px;pointer-events:none;font-family:ui-monospace,Menlo,monospace;box-shadow:0 2px 8px rgba(0,0,0,.15)}",
			"body[data-ds-dark-theme] #dsh-zen-diag{color:#fca5a5;background:rgba(40,20,20,.92);border-color:rgba(252,165,165,.4)}",
			"@keyframes dshZenBreathe{0%,100%{opacity:1}50%{opacity:.96}}",
			"body.dsh-zen-active [data-conversation-scroll]{animation:dshZenBreathe 7s ease-in-out infinite}"
		].join("");

		function injectCss() {
			const tagId = "dsh-zen/style";
			if (document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]")) return;
			const tag = document.createElement("style");
			tag.dataset.pluginCss = tagId;
			tag.textContent = CSS;
			document.head.appendChild(tag);
		}

		// find the app shell root (hash-classed) by area
		function findShell() {
			const all = document.querySelectorAll("body [class*='_root']");
			let best = null, bestArea = 0;
			for (let i = 0; i < all.length; i++) {
				const el = all[i];
				const r = el.getBoundingClientRect();
				const a = r.width * r.height;
				if (a > bestArea && a >= window.innerWidth * window.innerHeight * 0.5) { best = el; bestArea = a; }
			}
			if (best) best.setAttribute(SHELL_MARK, "");
			else if (document.querySelector("#root")) document.querySelector("#root").setAttribute(SHELL_MARK, "");
			return best || document.querySelector("#root");
		}

		// geometry-based chrome probing; hides with opacity (layout preserved)
		function findChrome() {
			const targets = [];
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const all = document.querySelectorAll("body *");
			for (let i = 0; i < all.length; i++) {
				const el = all[i];
				if (el.closest("#" + ZEN_ID) || el.closest("[data-dsh-zen-hud]") || el.closest("[data-composer-seat]")) continue;
				if (el.querySelector("textarea") || el.querySelector("[contenteditable]")) continue;
				const cs = window.getComputedStyle(el);
				if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") continue;
				const r = el.getBoundingClientRect();
				if (r.width < 30 || r.height < 30) continue;
				const area = r.width * r.height;
				if (area < vw * vh * 0.08) continue;
				const textLen = (el.textContent || "").trim().length;
				if (r.width >= vw * 0.9 && r.height >= vh * 0.9) {
					if (el.hasAttribute("data-conversation-scroll")) continue;
					const zi = parseInt(cs.zIndex, 10) || 0;
					if (zi >= 100) continue;
					if (textLen > 300) continue;
					targets.push(el); continue;
				}
				if (r.left <= 4 && r.width <= vw * 0.35 && r.height >= vh * 0.5) { targets.push(el); continue; }
				if (r.top <= 4 && r.height <= vh * 0.18 && r.width >= vw * 0.4) { targets.push(el); continue; }
			}
			return targets.filter(function (el, i) {
				for (let j = 0; j < targets.length; j++) {
					if (j !== i && targets[j].contains(el)) return false;
				}
				return true;
			});
		}

		// ---------- DOM helpers ----------
		function composerSeat() { return document.querySelector("[data-composer-seat]"); }
		function composerTextarea() {
			const seat = composerSeat();
			const pool = [];
			const add = function (el) { if (el) pool.push(el); };
			if (seat) {
				const ts = seat.querySelectorAll("textarea,[contenteditable],[role=textbox],input[type=text]");
				for (let i = 0; i < ts.length; i++) add(ts[i]);
			} else {
				const ts = document.querySelectorAll("textarea,[contenteditable],[role=textbox],input[type=text]");
				for (let i = 0; i < ts.length; i++) add(ts[i]);
			}
			for (let i = 0; i < pool.length; i++) {
				const r = pool[i].getBoundingClientRect();
				if (r.width > 5 && r.height > 5) return pool[i];
			}
			return pool[0] || null;
		}
		function scrollArea() { return document.querySelector("[data-conversation-scroll]"); }

		function setNativeValue(el, value) {
			const proto = el.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : (el.tagName === "INPUT" ? window.HTMLInputElement.prototype : window.HTMLElement.prototype);
			const desc = Object.getOwnPropertyDescriptor(proto, "value");
			if (desc && desc.set) desc.set.call(el, value);
			el.dispatchEvent(new Event("input", { bubbles: true }));
		}

		function sendPrompt(text) {
			const ta = composerTextarea();
			if (!ta) return false;
			setNativeValue(ta, text);
			const seat = composerSeat();
			const btns = seat ? Array.from(seat.querySelectorAll("button")) : [];
			const send = btns.find(function (b) {
				if (b.disabled) return false;
				const a = (b.getAttribute("aria-label") || "").toLowerCase();
				const t = (b.textContent || "").trim();
				if (/stop|停止|中断/.test(a) || /停止|中断/.test(t)) return false;
				return b.type === "submit" || /send|发送|提交/.test(a) || /发送|提交/.test(t);
			});
			if (send) { send.click(); return true; }
			ta.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true, cancelable: true }));
			return true;
		}

		function findStopButton() {
			const seat = composerSeat();
			const pool = seat ? Array.from(seat.querySelectorAll("button")) : [];
			const btns = pool.concat(Array.from(document.querySelectorAll("button")));
			return btns.find(function (b) {
				const a = (b.getAttribute("aria-label") || "").toLowerCase();
				const t = (b.textContent || "").trim();
				return /stop|停止|中断/.test(a) || /停止|中断/.test(t);
			});
		}

		// ---------- apply ----------
		function apply(ctx) {
			injectCss();
			console.log("[dsh-zen] v6 loaded");

			const btn = document.createElement("button");
			btn.id = ZEN_ID;
			btn.title = "禅模式 (Ctrl+Shift+Z)";
			btn.textContent = "禅";
			document.body.appendChild(btn);

			let active = false;
			let hidden = [];
			let timers = [];
			let observers = [];
			let hudEls = [];
			let diagEl = null;

			const clean = function () {
				timers.forEach(clearInterval); timers = [];
				observers.forEach(function (o) { try { o.disconnect(); } catch (e) {} }); observers = [];
				hudEls.forEach(function (el) { try { el.remove(); } catch (e) {} }); hudEls = [];
				const ta = composerTextarea();
				if (ta) {
					const p = ta.getAttribute(PH_ATTR);
					if (p !== null) { ta.setAttribute("placeholder", p); ta.removeAttribute(PH_ATTR); }
					ta.style.borderRadius = ta.dataset.dshZenBr || "";
					ta.style.border = ta.dataset.dshZenBorder || "";
					ta.style.padding = ta.dataset.dshZenPad || "";
					ta.style.background = ta.dataset.dshZenBg2 || "";
					delete ta.dataset.dshZenBr;
					delete ta.dataset.dshZenBorder;
					delete ta.dataset.dshZenPad;
					delete ta.dataset.dshZenBg2;
				}
			};

			const titleEl = document.createElement("div");
			titleEl.id = HUD_TITLE;
			titleEl.setAttribute(HUD_MARK, "");
			titleEl.textContent = "新会话";

			const statusEl = document.createElement("div");
			statusEl.id = HUD_STATUS;
			statusEl.setAttribute(HUD_MARK, "");
			const dot = document.createElement("span");
			dot.id = "dsh-zen-dot";
			dot.dataset.mode = "done";
			const label = document.createElement("span");
			label.textContent = "✓ Done";
			statusEl.appendChild(dot);
			statusEl.appendChild(label);

			const detailEl = document.createElement("div");
			detailEl.id = HUD_DETAIL;
			detailEl.setAttribute(HUD_MARK, "");
			detailEl.hidden = true;
			statusEl.appendChild(detailEl);

			const suggestEl = document.createElement("div");
			suggestEl.id = HUD_SUGGEST;
			suggestEl.setAttribute(HUD_MARK, "");
			suggestEl.hidden = true;

			const SUGGESTIONS = ["继续研究", "整理成文章", "核对来源", "查看争议", "暂停"];
			const SUGGEST_PROMPTS = {
				"继续研究": "继续研究当前主题，深入下一步",
				"整理成文章": "把目前的进展整理成一篇完整的文章",
				"核对来源": "核对目前使用的所有来源，标注不确定之处",
				"查看争议": "列出目前存在的争议点与证据"
			};

			const state = {
				running: false,
				pending: false,
				startedAt: 0,
				lastDelta: "",
				history: [],
				title: "",
				skinScopeSaved: {},
				skinScopeActive: false
			};

			const pushHistory = function (text) {
				const t = text.replace(/\s+/g, " ").trim();
				if (!t) return;
				if (state.history[state.history.length - 1] === t) return;
				state.history.push(t);
				if (state.history.length > 30) state.history.shift();
			};

			function escapeHtml(s) {
				return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
			}

			const refreshHud = function () {
				let title = state.title, running = state.running, pending = state.pending;
				try {
					const sessions = ctx.get("sessions");
					if (sessions && typeof sessions.list === "function") {
						const st = sessions.list();
						if (st && st.current && st.byId && st.byId[st.current]) {
							const s = st.byId[st.current];
							title = s.displayTitle || state.title;
							running = !!s.running;
							pending = !!s.pendingInteraction;
						}
					}
				} catch (e) {}
				state.title = title; state.running = running; state.pending = pending;
				if (running && !state.startedAt) state.startedAt = Date.now();
				if (!running) state.startedAt = 0;

				titleEl.textContent = title || "新会话";
				dot.dataset.mode = running ? "working" : (pending ? "pending" : "done");
				label.textContent = running ? "● Working" : (pending ? "▲ 需要你" : "✓ Done");

				if (running && state.lastDelta) {
					label.textContent = state.lastDelta.length > 26 ? state.lastDelta.slice(0, 26) + "…" : state.lastDelta;
				}
				if (!running && state.lastDelta) {
					pushHistory(state.lastDelta);
					state.lastDelta = "";
				}

				if (!detailEl.hidden) {
					const mins = state.startedAt ? Math.floor((Date.now() - state.startedAt) / 60000) : 0;
					const secs = state.startedAt ? Math.floor((Date.now() - state.startedAt) / 1000) % 60 : 0;
					detailEl.innerHTML =
						"<h4>当前任务</h4>" +
						"<div class=dshZenRow><span class=k>任务</span><span class=v>" + escapeHtml(state.title || "新会话") + "</span></div>" +
						"<div class=dshZenRow><span class=k>状态</span><span class=v>" + (running ? "工作已进行 " + mins + "m " + secs + "s" : (pending ? "等待你的输入" : "已完成")) + "</span></div>" +
						(state.lastDelta ? "<div class=dshZenRow><span class=k>正在</span><span class=v>" + escapeHtml(state.lastDelta) + "</span></div>" : "") +
						"<h4>过程摘要</h4><ul class=dshZenHist>" +
						state.history.slice(-10).map(function (h) { return "<li>" + escapeHtml(h) + "</li>"; }).join("") +
						"</ul>";
				}

				suggestEl.textContent = "";
				const seat = composerSeat();
				if (seat) {
					const showPause = running && !!findStopButton();
					SUGGESTIONS.forEach(function (name) {
						if (name === "暂停" && !showPause) return;
						const b = document.createElement("button");
						b.textContent = name;
						if (name === "暂停") b.className = "dshZenPause";
						b.addEventListener("click", function () {
							if (name === "暂停") {
								const stop = findStopButton();
								if (stop) stop.click();
							} else {
								sendPrompt(SUGGEST_PROMPTS[name] || name);
							}
						});
						suggestEl.appendChild(b);
					});
					suggestEl.hidden = false;
					const r = seat.getBoundingClientRect();
					suggestEl.style.left = "50%";
					suggestEl.style.transform = "translateX(-50%)";
					suggestEl.style.bottom = (window.innerHeight - r.top + 10) + "px";
				} else {
					suggestEl.hidden = true;
				}

				if (diagEl) {
					const msg = "dsh-zen v6  shell=" + (document.querySelector("[" + SHELL_MARK + "]") ? "Y" : "N") + "  chrome=" + hidden.length + "  seat=" + (composerSeat() ? "Y" : "N") + "  ta=" + (composerTextarea() ? "Y" : "N") + "  skinOff=" + (state.skinScopeActive ? "Y" : "N");
					diagEl.textContent = msg;
					btn.title = "禅模式 v6 | " + msg + " (Ctrl+Shift+Z)";
				}
			};

			// stream delta observer
			const startObserver = function () {
				const target = scrollArea() || document.body;
				const obs = new MutationObserver(function (mutations) {
					for (let i = 0; i < mutations.length; i++) {
						const m = mutations[i];
						if (m.type === "characterData") {
							const parent = m.target.parentElement;
							if (!parent || parent.closest("[data-dsh-zen-hud]")) continue;
							const v = String(m.target.nodeValue || "").replace(/\s+/g, " ").trim();
							if (v) { state.lastDelta = v.slice(0, 160); }
						} else if (m.type === "childList") {
							for (let j = 0; j < m.addedNodes.length; j++) {
								const n = m.addedNodes[j];
								if (n.nodeType !== 1) continue;
								if (n.closest && n.closest("[data-dsh-zen-hud]")) continue;
								const t = (n.textContent || "").replace(/\s+/g, " ").trim();
								if (t) { state.lastDelta = t.slice(0, 160); break; }
							}
						}
					}
				});
				obs.observe(target, { childList: true, subtree: true, characterData: true });
				observers.push(obs);
			};

			const setZen = function (on) {
				if (active === on) return;
				active = on;
				document.body.classList.toggle("dsh-zen-active", on);
				document.documentElement.classList.toggle("dsh-zen-active", on);
				if (on) {
					findShell();
					// switch to the default skin: strip the skin scope attributes — all its
					// CSS lives under body[data-dsh-maid-atelier] etc, so the whole skin
					// deactivates in one shot
					state.skinScopeSaved = {};
					for (let i = 0; i < SKIN_SCOPES.length; i++) {
						const name = SKIN_SCOPES[i];
						if (document.body.hasAttribute(name)) {
							state.skinScopeSaved[name] = document.body.getAttribute(name);
							document.body.removeAttribute(name);
						}
					}
					state.skinScopeActive = true;
					hidden = findChrome();
					console.log("[dsh-zen] zen on. skinOff:", state.skinScopeActive, "chrome:", hidden.length, hidden.map(function (el) { return el.className || el.tagName; }).slice(0, 6));
					hidden.forEach(function (el) {
						el.dataset.dshZenOpacity = el.style.opacity;
						el.dataset.dshZenPE = el.style.pointerEvents;
						el.dataset.dshZenTrans = el.style.transition;
						el.style.transition = "opacity .35s ease";
						el.style.opacity = "0";
						el.style.pointerEvents = "none";
					});
					const ta = composerTextarea();
					if (ta) {
						ta.setAttribute(PH_ATTR, ta.getAttribute("placeholder") || "");
						ta.setAttribute("placeholder", "接下来做什么？");
					}
					document.body.appendChild(titleEl);
					document.body.appendChild(statusEl);
					document.body.appendChild(suggestEl);
					diagEl = document.createElement("div");
					diagEl.id = "dsh-zen-diag";
					diagEl.textContent = "dsh-zen …";
					document.body.appendChild(diagEl);
					hudEls = [titleEl, statusEl, suggestEl, detailEl, diagEl];
					startObserver();
					timers.push(setInterval(refreshHud, 800));
					refreshHud();
					btn.textContent = "出";
				} else {
					clean();
					const saved = state.skinScopeSaved;
					Object.keys(saved).forEach(function (name) {
						document.body.setAttribute(name, saved[name]);
					});
					state.skinScopeSaved = {};
					state.skinScopeActive = false;
					hidden.forEach(function (el) {
						el.style.opacity = el.dataset.dshZenOpacity || "";
						el.style.pointerEvents = el.dataset.dshZenPE || "";
						el.style.transition = el.dataset.dshZenTrans || "";
						delete el.dataset.dshZenOpacity;
						delete el.dataset.dshZenPE;
						delete el.dataset.dshZenTrans;
					});
					hidden = [];
					const shell = document.querySelector("[" + SHELL_MARK + "]");
					if (shell) shell.removeAttribute(SHELL_MARK);
					btn.textContent = "禅";
				}
				try {
					window.dispatchEvent(new CustomEvent(ZEN_EVENT, { detail: { active: on } }));
				} catch (e) {}
			};

			statusEl.addEventListener("click", function (e) {
				if (e.target === detailEl) return;
				detailEl.hidden = !detailEl.hidden;
				if (!detailEl.hidden) refreshHud();
			});

			btn.addEventListener("click", function () { setZen(!active); });
			document.addEventListener("keydown", function (e) {
				if (e.ctrlKey && e.shiftKey && (e.key === "Z" || e.key === "z")) {
					e.preventDefault();
					setZen(!active);
				}
			});

			ctx.effect(function () {
				return function () {
					if (active) setZen(false);
					btn.remove();
				};
			}, "dsh-zen: teardown");
		}

		const inject = ["sessions", "connection"];
		exports.inject = inject;
		exports.apply = apply;
		return module.exports;
	}
});
