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

		// ---------- styles ----------
		const CSS = [
			"#" + ZEN_ID + "{position:fixed;right:14px;top:62px;z-index:2147483002;width:36px;height:36px;border-radius:50%;border:1px solid rgba(0,0,0,.18);background:rgba(255,255,255,.85);color:#3a4252;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;opacity:.45;transition:opacity .25s,transform .25s}",
			"#" + ZEN_ID + ":hover{opacity:1;transform:scale(1.08)}",
			"body[data-ds-dark-theme] #" + ZEN_ID + "{background:rgba(40,42,46,.9);color:#e8eaee;border-color:rgba(255,255,255,.2)}",
			"body.dsh-zen-active #" + ZEN_ID + "{opacity:1;background:rgba(90,140,120,.9);color:#fff;border-color:rgba(255,255,255,.25)}",
			"body.dsh-zen-active #root{transition:filter .35s ease}",
			"body.dsh-zen-active{background:#f6f7f9 !important;color:#333}",
			"body[data-ds-dark-theme].dsh-zen-active{background:#16171a !important;color:#ddd}",
			"body.dsh-zen-active #root{filter:saturate(.85)}",
			// skin: kill characters / trims / corners — fixed & absolute overlays, no layout impact
			"body.dsh-zen-active [data-maid-character],body.dsh-zen-active [data-skin-chrome],body.dsh-zen-active [data-skin-trim-layer],body.dsh-zen-active [data-skin-corner]{display:none !important}",
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
			// detail panel (Level 1)
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
			// suggestion chips above composer
			"#" + HUD_SUGGEST + "{position:fixed;z-index:2147483003;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;pointer-events:none}",
			"#" + HUD_SUGGEST + " button{pointer-events:auto;appearance:none;border:1px solid rgba(0,0,0,.14);background:rgba(255,255,255,.85);color:#444;border-radius:999px;padding:5px 14px;font-size:12.5px;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.07);transition:background .15s,transform .15s;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif}",
			"#" + HUD_SUGGEST + " button:hover{background:#fff;transform:translateY(-1px)}",
			"#" + HUD_SUGGEST + " button.dshZenPause{color:#c2410c;border-color:rgba(194,65,12,.4)}",
			"body[data-ds-dark-theme] #" + HUD_SUGGEST + " button{background:rgba(45,47,52,.85);color:#d6d8dc;border-color:rgba(255,255,255,.14)}",
			"body[data-ds-dark-theme] #" + HUD_SUGGEST + " button:hover{background:#35373c}",
			// composer restyle in zen: calmer, command-like
			"body.dsh-zen-active [data-composer-seat] textarea{font-size:15px !important;letter-spacing:.2px;caret-color:#6b7280;transition:background .3s,box-shadow .3s}",
			"body.dsh-zen-active [data-composer-seat] textarea:focus{background:rgba(255,255,255,.5) !important;box-shadow:none !important}",
			"body[data-ds-dark-theme].dsh-zen-active [data-composer-seat] textarea:focus{background:rgba(255,255,255,.04) !important}",
			// breathing workspace
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

		// geometry-based chrome probing (layout-preserving hide)
		function findChrome() {
			const targets = [];
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const all = document.querySelectorAll("body *");
			for (let i = 0; i < all.length; i++) {
				const el = all[i];
				if (el.id === ZEN_ID || el.id === HUD_TITLE || el.id === HUD_STATUS || el.id === HUD_DETAIL || el.id === HUD_SUGGEST) continue;
				if (el.closest("[data-composer-seat]")) continue;
				if (el.hasAttribute("data-maid-character") || el.hasAttribute("data-skin-chrome") || el.hasAttribute("data-skin-trim-layer") || el.hasAttribute("data-skin-corner")) continue;
				if (el.querySelector("textarea") || el.querySelector("[contenteditable=true]")) continue;
				const cs = window.getComputedStyle(el);
				if (cs.display === "none" || cs.visibility === "hidden") continue;
				const r = el.getBoundingClientRect();
				if (r.width < 30 || r.height < 30) continue;
				const area = r.width * r.height;
				if (area < vw * vh * 0.08) continue;
				const textLen = (el.textContent || "").trim().length;
				if (r.width >= vw * 0.97 && r.height >= vh * 0.97) {
					const zi = parseInt(cs.zIndex, 10) || 0;
					if (zi < 0 || (zi <= 1 && cs.pointerEvents === "none" && textLen < 80)) { targets.push(el); continue; }
				}
				if (textLen > 400) continue;
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
			if (!seat) return null;
			return seat.querySelector("textarea") || seat.querySelector("[contenteditable=true]");
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
			// find the send button (skip stop buttons)
			const seat = composerSeat();
			const btns = seat ? Array.from(seat.querySelectorAll("button")) : [];
			const send = btns.find(function (b) {
				if (b.disabled) return false;
				const a = (b.getAttribute("aria-label") || "").toLowerCase();
				const t = (b.textContent || "").trim();
				if (/stop|停止|中断/.test(a) || /停止|中断/.test(t)) return false;
				return /send|发送|提交/.test(a) || /发送|提交/.test(t) || (b.type === "submit");
			}) || btns.find(function (b) { return !b.disabled && !/停止/.test(b.textContent || ""); });
			if (send) { send.click(); return true; }
			// fallback: Enter keydown
			ta.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true, cancelable: true }));
			ta.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", bubbles: true, cancelable: true }));
			return true;
		}

		function findStopButton() {
			const btns = Array.from(document.querySelectorAll("button"));
			return btns.find(function (b) {
				const a = (b.getAttribute("aria-label") || "").toLowerCase();
				const t = (b.textContent || "").trim();
				return /stop|停止|中断/.test(a) || /停止|中断/.test(t);
			});
		}

		// ---------- apply ----------
		function apply(ctx) {
			injectCss();

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

			const clean = function () {
				timers.forEach(clearInterval); timers = [];
				observers.forEach(function (o) { try { o.disconnect(); } catch (e) {} }); observers = [];
				hudEls.forEach(function (el) { try { el.remove(); } catch (e) {} }); hudEls = [];
				// restore placeholder
				const ta = composerTextarea();
				if (ta) { const p = ta.getAttribute(PH_ATTR); if (p !== null) { ta.setAttribute("placeholder", p); ta.removeAttribute(PH_ATTR); } }
			};

			// ---- HUD construction ----
			const titleEl = document.createElement("div");
			titleEl.id = HUD_TITLE;
			titleEl.textContent = "新会话";

			const statusEl = document.createElement("div");
			statusEl.id = HUD_STATUS;
			const dot = document.createElement("span");
			dot.id = "dsh-zen-dot";
			dot.dataset.mode = "done";
			const label = document.createElement("span");
			label.textContent = "✓ Done";
			statusEl.appendChild(dot);
			statusEl.appendChild(label);

			const detailEl = document.createElement("div");
			detailEl.id = HUD_DETAIL;
			detailEl.hidden = true;
			statusEl.appendChild(detailEl);

			const suggestEl = document.createElement("div");
			suggestEl.id = HUD_SUGGEST;
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
				title: ""
			};

			const pushHistory = function (text) {
				const t = text.replace(/\s+/g, " ").trim();
				if (!t) return;
				if (state.history[state.history.length - 1] === t) return;
				state.history.push(t);
				if (state.history.length > 30) state.history.shift();
			};

			const refreshHud = function () {
				// sessions feed
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

				// status sentence from stream delta
				if (running && state.lastDelta) {
					label.textContent = state.lastDelta.length > 26 ? state.lastDelta.slice(0, 26) + "…" : state.lastDelta;
				}
				if (!running && state.lastDelta) {
					pushHistory(state.lastDelta);
					state.lastDelta = "";
				}

				// detail panel content
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
						"</ul>" +
						"<h4>深度</h4><div class=dshZenRow><span class=k>Level 1</span><span class=v>过程摘要</span></div>" +
						"<div class=dshZenRow><span class=k>Level 2</span><span class=v>工具调用（即将推出）</span></div>";
				}

				// suggestion chips
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
			};

			function escapeHtml(s) {
				return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
			}

			// stream delta observer
			const startObserver = function () {
				let lastLen = 0;
				const target = scrollArea() || document.body;
				const obs = new MutationObserver(function () {
					const t = target.textContent || "";
					if (t.length > lastLen) {
						const delta = t.slice(lastLen, lastLen + 160);
						state.lastDelta = delta.replace(/\s+/g, " ").trim();
					} else if (t.length < lastLen) {
						lastLen = 0;
					}
					lastLen = t.length;
				});
				obs.observe(target, { childList: true, subtree: true, characterData: true });
				observers.push(obs);
			};

			const setZen = function (on) {
				if (active === on) return;
				active = on;
				document.body.classList.toggle("dsh-zen-active", on);
				if (on) {
					hidden = findChrome();
					hidden.forEach(function (el) {
						el.dataset.dshZenOpacity = el.style.opacity;
						el.dataset.dshZenPE = el.style.pointerEvents;
						el.dataset.dshZenTrans = el.style.transition;
						el.style.transition = "opacity .35s ease";
						el.style.opacity = "0";
						el.style.pointerEvents = "none";
					});
					// composer placeholder -> command style
					const ta = composerTextarea();
					if (ta) {
						ta.setAttribute(PH_ATTR, ta.getAttribute("placeholder") || "");
						ta.setAttribute("placeholder", "接下来做什么？");
					}
					document.body.appendChild(titleEl);
					document.body.appendChild(statusEl);
					document.body.appendChild(suggestEl);
					hudEls = [titleEl, statusEl, suggestEl, detailEl];
					startObserver();
					timers.push(setInterval(refreshHud, 800));
					refreshHud();
					btn.textContent = "出";
				} else {
					clean();
					hidden.forEach(function (el) {
						el.style.opacity = el.dataset.dshZenOpacity || "";
						el.style.pointerEvents = el.dataset.dshZenPE || "";
						el.style.transition = el.dataset.dshZenTrans || "";
						delete el.dataset.dshZenOpacity;
						delete el.dataset.dshZenPE;
						delete el.dataset.dshZenTrans;
					});
					hidden = [];
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

		exports.apply = apply;
		return module.exports;
	}
});
