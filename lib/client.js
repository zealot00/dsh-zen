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
			"#" + ZEN_ID + "{position:fixed;right:12px;top:104px;z-index:2147483002;width:32px;height:32px;border-radius:50%;border:1px solid rgba(0,0,0,.18);background:rgba(255,255,255,.85);color:#3a4252;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;opacity:.45;transition:opacity .25s,transform .25s}",
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
			// composer: calmer and roomier in zen — widen the chat column, seat padding
			"body.dsh-zen-active{--dsh-chat-content-width:clamp(620px, 46vw, 820px) !important}",
			"body.dsh-zen-active [data-composer-seat]{padding:10px 12px !important;border-radius:18px !important}",
			"body.dsh-zen-active textarea,body.dsh-zen-active [contenteditable]{font-size:15px !important;caret-color:#6b7280}",
			// intervention banner (level-3: human decision needed)
			"#dsh-zen-intervene{position:fixed;z-index:2147483003;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:8px;background:#fff7e6;border:1px solid #e5b45b;color:#8a5a00;border-radius:999px;padding:6px 16px;font-size:13px;font-weight:600;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.14);font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif}",
			"body[data-ds-dark-theme] #dsh-zen-intervene{background:#3a2f16;border-color:#8a6a2f;color:#f0c674}",
			"#dsh-zen-intervene:hover{filter:brightness(1.04)}",
			// delivery banner (task finished — work delivery, not chat reply)
			"#dsh-zen-delivery{position:fixed;z-index:2147483003;left:50%;transform:translateX(-50%);width:min(560px,92vw);background:#fff;border:1px solid rgba(0,0,0,.12);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.18);padding:16px 20px;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;transition:opacity .5s,transform .5s}",
			"body[data-ds-dark-theme] #dsh-zen-delivery{background:#232427;color:#ddd;border-color:rgba(255,255,255,.14)}",
			"#dsh-zen-delivery .dz-head{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:700;color:#1e7a46}",
			"body[data-ds-dark-theme] #dsh-zen-delivery .dz-head{color:#5fd08f}",
			"#dsh-zen-delivery .dz-title{margin:8px 0 10px;font-size:13px;color:#555;line-height:1.5;word-break:break-all}",
			"body[data-ds-dark-theme] #dsh-zen-delivery .dz-title{color:#b8bac0}",
			"#dsh-zen-delivery .dz-stats{display:flex;gap:10px;flex-wrap:wrap;font-size:12px;color:#777}",
			"#dsh-zen-delivery .dz-stats span{background:#f2f4f7;border-radius:999px;padding:3px 10px}",
			"body[data-ds-dark-theme] #dsh-zen-delivery .dz-stats span{background:#33353a;color:#c8cad0}",
			"#dsh-zen-delivery .dz-tools{margin-top:8px;font-size:11.5px;color:#999;word-break:break-all}",
			"#dsh-zen-delivery .dz-note{margin-top:10px;padding-top:10px;border-top:1px dashed rgba(0,0,0,.1);font-size:12.5px;color:#8a5a00}",
			"body[data-ds-dark-theme] #dsh-zen-delivery .dz-note{border-top-color:rgba(255,255,255,.12);color:#f0c674}",
			"#dsh-zen-delivery.dz-hide{opacity:0;transform:translateX(-50%) translateY(14px);pointer-events:none}",
			"#dsh-zen-delivery .dz-close{position:absolute;right:10px;top:8px;border:none;background:none;color:#aaa;font-size:14px;cursor:pointer;padding:2px 6px;border-radius:6px}",
			"#dsh-zen-delivery .dz-close:hover{color:#555;background:rgba(0,0,0,.05)}",
			// world card (empty-state: what you are working on, not New Chat)
			"#dsh-zen-world{position:fixed;z-index:2147483003;left:50%;top:46%;transform:translate(-50%,-50%);width:min(540px,92vw);max-height:70vh;overflow:auto;background:#fff;border:1px solid rgba(0,0,0,.12);border-radius:18px;box-shadow:0 14px 46px rgba(0,0,0,.16);padding:22px 24px;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif}",
			"body[data-ds-dark-theme] #dsh-zen-world{background:#232427;color:#ddd;border-color:rgba(255,255,255,.14)}",
			"#dsh-zen-world .zw-label{font-size:12px;font-weight:600;color:#999;letter-spacing:2px;margin-bottom:12px}",
			"#dsh-zen-world .zw-current{border:1px solid rgba(0,0,0,.1);border-radius:14px;padding:14px 16px;background:#f8fafc}",
			"body[data-ds-dark-theme] #dsh-zen-world .zw-current{background:#2a2c31;border-color:rgba(255,255,255,.1)}",
			"#dsh-zen-world .zw-title{font-size:16px;font-weight:700;color:#222;margin-bottom:6px}",
			"body[data-ds-dark-theme] #dsh-zen-world .zw-title{color:#eee}",
			"#dsh-zen-world .zw-state{font-size:12.5px;color:#777;line-height:1.7}",
			"#dsh-zen-world .zw-state b{color:#1e7a46}",
			"#dsh-zen-world .zw-recent{margin-top:16px}",
			"#dsh-zen-world .zw-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;cursor:pointer;transition:background .15s}",
			"#dsh-zen-world .zw-item:hover{background:#f2f4f7}",
			"body[data-ds-dark-theme] #dsh-zen-world .zw-item:hover{background:#2f3136}",
			"#dsh-zen-world .zw-item .zw-dot{width:7px;height:7px;border-radius:50%;flex:0 0 7px}",
			"#dsh-zen-world .zw-item .zw-dot[data-mode=working]{background:#34d399;animation:dshZenPulse 1.6s ease-in-out infinite}",
			"#dsh-zen-world .zw-item .zw-dot[data-mode=pending]{background:#fbbf24}",
			"#dsh-zen-world .zw-item .zw-dot[data-mode=done]{background:#9ca3af}",
			"#dsh-zen-world .zw-item .zw-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;color:#444}",
			"body[data-ds-dark-theme] #dsh-zen-world .zw-item .zw-name{color:#ccc}",
			"#dsh-zen-world .zw-item .zw-time{font-size:11px;color:#aaa;flex:0 0 auto}",
			"#dsh-zen-world .zw-hint{margin-top:18px;font-size:12.5px;color:#999;text-align:center}",
			"#dsh-zen-world .zw-hint b{color:#6b7280}",
			"#dsh-zen-world.dz-hide{opacity:0;transform:translate(-50%,-46%);pointer-events:none}",
			"#dsh-zen-world{transition:opacity .4s,transform .4s}",
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
			let interveneEl = null;
			let deliveryEl = null;
			let deliveryTimer = null;
			let worldEl = null;
			let hiddenBtns = [];

			const relTime = function (ts) {
				if (!ts) return "";
				const s = Math.max(1, Math.round((Date.now() - ts) / 1000));
				if (s < 60) return s + " 秒前";
				if (s < 3600) return Math.round(s / 60) + " 分钟前";
				if (s < 86400) return Math.round(s / 3600) + " 小时前";
				return Math.round(s / 86400) + " 天前";
			};

			const hideDelivery = function () {
				if (!deliveryEl) return;
				deliveryEl.classList.add("dz-hide");
				if (deliveryTimer) { clearTimeout(deliveryTimer); deliveryTimer = null; }
			};
			const showDelivery = function (title, statsHtml, toolsText, noteText) {
				if (!deliveryEl) return;
				deliveryEl.querySelector(".dz-title").textContent = title || "";
				deliveryEl.querySelector(".dz-stats").innerHTML = statsHtml;
				deliveryEl.querySelector(".dz-tools").textContent = toolsText || "";
				deliveryEl.querySelector(".dz-note").textContent = noteText || "";
				deliveryEl.style.bottom = "150px";
				deliveryEl.classList.remove("dz-hide");
				if (deliveryTimer) clearTimeout(deliveryTimer);
				deliveryTimer = setTimeout(hideDelivery, 9000);
			};

			const clean = function () {
				timers.forEach(clearInterval); timers = [];
				if (deliveryTimer) { clearTimeout(deliveryTimer); deliveryTimer = null; }
				hiddenBtns.forEach(function (b) { b.style.display = b.dataset.dshZenBtn || ""; delete b.dataset.dshZenBtn; });
				hiddenBtns = [];
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

			const SUGGESTIONS = ["继续研究", "整理成文章", "核对来源", "查看争议", "撤销上一步", "暂停"];
			const SUGGEST_PROMPTS = {
				"继续研究": "继续研究当前主题，深入下一步",
				"整理成文章": "把目前的进展整理成一篇完整的文章",
				"核对来源": "核对目前使用的所有来源，标注不确定之处",
				"查看争议": "列出目前存在的争议点与证据",
				"撤销上一步": "撤销你刚才完成的最后一步操作，恢复到那之前的状态，并简要说明你撤销了什么"
			};

			const TOOL_VERBS = {
				"web_search": "搜索资料", "web": "搜索资料", "search": "搜索资料",
				"bash": "执行命令", "pwsh": "执行命令", "terminal": "执行命令",
				"read": "阅读文档", "grep": "检索内容", "glob": "查找文件",
				"write": "写入文件", "edit": "修改文件", "str_replace": "修改文件",
				"workflow": "编排任务", "subagent": "调度子任务", "todo": "更新任务清单",
				"skill": "调用技能", "goal": "推进目标", "web_search_deepseek": "搜索资料"
			};

			const state = {
				running: false,
				pending: false,
				startedAt: 0,
				lastDelta: "",
				history: [],
				title: "",
				skinScopeSaved: {},
				skinScopeActive: false,
				turn: { tools: 0, toolNames: [], lastToolAt: 0, startedAt: 0, endedAt: 0 },
				deliveryShown: false
			};

			const toolSentence = function (name) {
				const v = TOOL_VERBS[name] || ("调用 " + name);
				return "正在" + v;
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
				if (running && !state.startedAt) { state.startedAt = Date.now(); state.turn = { tools: 0, toolNames: [], lastToolAt: 0, startedAt: Date.now(), endedAt: 0 }; }

				// world card: empty chat area -> show what you are working on
				if (worldEl) {
					const sc = scrollArea();
					const chatLen = sc ? (sc.textContent || "").trim().length : 0;
					const empty = chatLen < 40;
					if (empty) {
						let cur = null, recent = [], st = null;
						try {
							const sessions = ctx.get("sessions");
							if (sessions && typeof sessions.list === "function") {
								st = sessions.list();
								if (st && st.byId) {
									if (st.current && st.byId[st.current]) cur = st.byId[st.current];
									const ids = (st.ids || []).slice(0, 6);
									recent = ids.map(function (id) { return st.byId[id]; }).filter(Boolean);
								}
							}
						} catch (e) {}
						let html = "<div class=zw-label>当前世界</div>";
						if (cur) {
							const mode = cur.running ? "<b>● 进行中</b>" : (cur.pendingInteraction ? "<b style=color:#b45309>▲ 需要你</b>" : "✓ 已完成");
							html += "<div class=zw-current><div class=zw-title>" + escapeHtml(cur.displayTitle || "未命名任务") + "</div><div class=zw-state>" + mode + " · 最后更新 " + relTime(cur.updatedAt) + "</div></div>";
						} else {
							html += "<div class=zw-current><div class=zw-title>还没有进行中的任务</div><div class=zw-state>在下方说出你想推进的事，Agent 会接手。</div></div>";
						}
						if (recent.length > 1) {
							html += "<div class=zw-recent>";
							recent.forEach(function (s) {
								const m = s.running ? "working" : (s.pendingInteraction ? "pending" : "done");
								const active = st && st.current && s.id === st.current ? " style=background:#f2f4f7" : "";
								html += "<div class=zw-item" + active + " data-id=" + s.id + "><span class=zw-dot data-mode=" + m + "></span><span class=zw-name>" + escapeHtml(s.displayTitle || "未命名") + "</span><span class=zw-time>" + relTime(s.updatedAt) + "</span></div>";
							});
							html += "</div>";
						}
						html += "<div class=zw-hint><b>继续告诉我你想怎么推进。</b></div>";
						worldEl.innerHTML = html;
						worldEl.classList.remove("dz-hide");
						Array.prototype.forEach.call(worldEl.querySelectorAll(".zw-item"), function (item) {
							item.addEventListener("click", function () {
								try {
									const sessions = ctx.get("sessions");
									if (sessions && typeof sessions.open === "function") sessions.open(item.dataset.id);
								} catch (e) {}
							});
						});
					} else {
						worldEl.classList.add("dz-hide");
					}
				}
				if (!running) { if (state.startedAt && !state.turn.endedAt) state.turn.endedAt = Date.now(); state.startedAt = 0; }

				titleEl.textContent = title || "新会话";
				dot.dataset.mode = running ? "working" : (pending ? "pending" : "done");

				if (running && state.lastDelta) {
					label.textContent = state.lastDelta.length > 26 ? state.lastDelta.slice(0, 26) + "…" : state.lastDelta;
				} else if (pending) {
					label.textContent = "▲ 需要你";
				} else if (!running && state.turn.tools > 0) {
					const dur = state.turn.endedAt ? state.turn.endedAt - state.turn.startedAt : 0;
					const mins = dur ? Math.max(1, Math.round(dur / 60000)) : 0;
					label.textContent = "✓ Done · " + state.turn.tools + " 次调用" + (mins ? " · " + mins + "m" : "");
				} else {
					label.textContent = "✓ Done";
				}
				if (!running && state.lastDelta) {
					pushHistory(state.lastDelta);
					state.lastDelta = "";
				}

				// delivery banner: task finished (first time per run)
				if (!running && state.turn.endedAt && !state.deliveryShown) {
					state.deliveryShown = true;
					const dur = Math.max(1, Math.round((state.turn.endedAt - state.turn.startedAt) / 60000));
					const stats = "<span>" + state.turn.tools + " 次工具调用</span><span>" + dur + " 分钟</span>" + (pending ? "<span>▲ 需要你判断</span>" : "<span>✓ 全部完成</span>");
					const tools = state.turn.toolNames.slice(0, 6).join(" · ");
					showDelivery(state.title || "当前任务", stats, tools ? "工具：" + tools : "", pending ? "Agent 留下了需要你判断的问题，点击上方黄色提示查看。" : "");
				}
				if (running && state.deliveryShown) state.deliveryShown = false;
				if (running) hideDelivery();

				if (!detailEl.hidden) {
					const mins = state.startedAt ? Math.floor((Date.now() - state.startedAt) / 60000) : 0;
					const secs = state.startedAt ? Math.floor((Date.now() - state.startedAt) / 1000) % 60 : 0;
					const tDur = state.turn.endedAt && state.turn.startedAt ? Math.max(1, Math.round((state.turn.endedAt - state.turn.startedAt) / 60000)) : 0;
					detailEl.innerHTML =
						"<h4>当前任务</h4>" +
						"<div class=dshZenRow><span class=k>任务</span><span class=v>" + escapeHtml(state.title || "新会话") + "</span></div>" +
						"<div class=dshZenRow><span class=k>状态</span><span class=v>" + (running ? "工作已进行 " + mins + "m " + secs + "s" : (pending ? "等待你的输入" : "已完成")) + "</span></div>" +
						(state.lastDelta ? "<div class=dshZenRow><span class=k>正在</span><span class=v>" + escapeHtml(state.lastDelta) + "</span></div>" : "") +
						"<h4>本次运行</h4>" +
						"<div class=dshZenRow><span class=k>工具调用</span><span class=v>" + state.turn.tools + " 次" + (tDur ? " · " + tDur + "m" : "") + "</span></div>" +
						(state.turn.toolNames.length ? "<div class=dshZenRow><span class=k>工具</span><span class=v>" + escapeHtml(state.turn.toolNames.join(" · ")) + "</span></div>" : "") +
						"<h4>过程摘要</h4><ul class=dshZenHist>" +
						state.history.slice(-10).map(function (h) { return "<li>" + escapeHtml(h) + "</li>"; }).join("") +
						"</ul>";
				}

				// intervention banner (level 3: only when a human decision is needed)
				if (interveneEl) {
					interveneEl.hidden = !pending;
					if (pending) {
						const sc = scrollArea();
						interveneEl.style.bottom = (window.innerHeight - (sc ? sc.getBoundingClientRect().bottom : window.innerHeight - 120) + 70) + "px";
					}
				}

				suggestEl.textContent = "";
				const seat = composerSeat();
				if (seat) {
					const showPause = running && !!findStopButton();
					const showUndo = !running && state.turn.tools > 0;
					SUGGESTIONS.forEach(function (name) {
						if (name === "暂停" && !showPause) return;
						if (name === "撤销上一步" && !showUndo) return;
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

			// stream delta observer — recognizes tool-call lines for semantic status
			const TOOL_CALL_RE = /(?:calling|running|exec|调用|执行|tool[:\s]*)([a-z_0-9-]+)/i;
			const startObserver = function () {
				const target = scrollArea() || document.body;
				const obs = new MutationObserver(function (mutations) {
					for (let i = 0; i < mutations.length; i++) {
						const m = mutations[i];
						let text = "";
						if (m.type === "characterData") {
							const parent = m.target.parentElement;
							if (!parent || parent.closest("[data-dsh-zen-hud]")) continue;
							text = String(m.target.nodeValue || "");
						} else if (m.type === "childList") {
							for (let j = 0; j < m.addedNodes.length; j++) {
								const n = m.addedNodes[j];
								if (n.nodeType !== 1) continue;
								if (n.closest && n.closest("[data-dsh-zen-hud]")) continue;
								text = n.textContent || "";
								break;
							}
						}
						const clean = text.replace(/\s+/g, " ").trim();
						if (!clean) continue;
						const tmatch = clean.match(TOOL_CALL_RE);
						if (tmatch) {
							const tool = tmatch[1].toLowerCase().replace(/[^a-z0-9_]/g, "");
							if (tool.length > 1 && tool.length < 40) {
								state.lastDelta = toolSentence(tool);
								state.turn.tools++;
								if (state.turn.toolNames.indexOf(tool) === -1) state.turn.toolNames.push(tool);
								state.turn.lastToolAt = Date.now();
								continue;
							}
						}
						state.lastDelta = clean.slice(0, 160);
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
					// principle 8: the input is not a control panel — hide composer toolbar
					// buttons (attach/modes/model/…) keeping only send & stop
					const seatB = composerSeat();
					if (seatB) {
						const btns = seatB.querySelectorAll("button");
						for (let i = 0; i < btns.length; i++) {
							const bb = btns[i];
							const a = (bb.getAttribute("aria-label") || "").toLowerCase();
							const t = (bb.textContent || "").trim();
							if (bb.type === "submit" || /send|发送|stop|停止|submit/i.test(a) || /发送|停止/i.test(t)) continue;
							if (bb.disabled) continue;
							bb.dataset.dshZenBtn = bb.style.display;
							bb.style.display = "none";
							hiddenBtns.push(bb);
						}
						// safety: never leave the composer without a visible button
						const visibleBtns = Array.prototype.filter.call(seatB.querySelectorAll("button"), function (b) {
							return b.style.display !== "none" && b.getBoundingClientRect().width > 0;
						});
						if (visibleBtns.length === 0 && hiddenBtns.length) {
							const last = hiddenBtns.pop();
							last.style.display = last.dataset.dshZenBtn || "";
							delete last.dataset.dshZenBtn;
						}
					}
					document.body.appendChild(titleEl);
					document.body.appendChild(statusEl);
					interveneEl = document.createElement("div");
					interveneEl.id = "dsh-zen-intervene";
					interveneEl.textContent = "▲ Agent 需要你的决定";
					interveneEl.hidden = true;
					interveneEl.addEventListener("click", function () {
						const sc = scrollArea();
						if (sc) sc.scrollTop = sc.scrollHeight;
					});
					document.body.appendChild(interveneEl);
					deliveryEl = document.createElement("div");
					deliveryEl.id = "dsh-zen-delivery";
					deliveryEl.className = "dz-hide";
					deliveryEl.innerHTML =
						"<button class=dz-close aria-label=close>✕</button>" +
						"<div class=dz-head>✓ 已完成</div>" +
						"<div class=dz-title></div>" +
						"<div class=dz-stats></div>" +
						"<div class=dz-tools></div>" +
						"<div class=dz-note></div>";
					deliveryEl.querySelector(".dz-close").addEventListener("click", function () { hideDelivery(); });
					document.body.appendChild(deliveryEl);
					worldEl = document.createElement("div");
					worldEl.id = "dsh-zen-world";
					worldEl.className = "dz-hide";
					document.body.appendChild(worldEl);
					document.body.appendChild(suggestEl);
					diagEl = document.createElement("div");
					diagEl.id = "dsh-zen-diag";
					diagEl.textContent = "dsh-zen …";
					document.body.appendChild(diagEl);
					hudEls = [titleEl, statusEl, suggestEl, detailEl, interveneEl, deliveryEl, worldEl, diagEl];
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
