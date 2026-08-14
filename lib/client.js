window.__ModuleLoader__.load({
	id: "@dsh-local/dsh-zen",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		const ZEN_ID = "dsh-zen-root";
		const ZEN_EVENT = "dsh-zen-change";

		const CSS = [
			"#" + ZEN_ID + "{position:fixed;right:14px;top:62px;z-index:2147483002;width:36px;height:36px;border-radius:50%;border:1px solid rgba(0,0,0,.18);background:rgba(255,255,255,.85);color:#3a4252;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;opacity:.45;transition:opacity .25s,transform .25s}",
			"#" + ZEN_ID + ":hover{opacity:1;transform:scale(1.08)}",
			"body[data-ds-dark-theme] #" + ZEN_ID + "{background:rgba(40,42,46,.9);color:#e8eaee;border-color:rgba(255,255,255,.2)}",
			"body.dsh-zen-active #" + ZEN_ID + "{opacity:1;background:rgba(90,140,120,.9);color:#fff;border-color:rgba(255,255,255,.25)}",
			// zen transition: smooth fade for the whole app shell
			"body.dsh-zen-active #root{transition:filter .35s ease}",
			// minimal state: force a plain background, desaturate the shell
			"body.dsh-zen-active{background:#f6f7f9 !important;color:#333}",
			"body[data-ds-dark-theme].dsh-zen-active{background:#16171a !important;color:#ddd}",
			"body.dsh-zen-active #root{filter:saturate(.85)}"
		].join("");

		function injectCss() {
			const tagId = "dsh-zen/style";
			if (document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]")) return;
			const tag = document.createElement("style");
			tag.dataset.pluginCss = tagId;
			tag.textContent = CSS;
			document.head.appendChild(tag);
		}

		// runtime layout probing: find chrome to hide — sidebar (left tall
		// strip), topbar (top short strip) and full-screen skin background
		// layers. Works for flex and fixed layouts alike (geometry based).
		function findChrome() {
			const targets = [];
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const all = document.querySelectorAll("body *");
			for (let i = 0; i < all.length; i++) {
				const el = all[i];
				if (el.id === ZEN_ID) continue;
				// NEVER hide anything that can take input, or contains the chat log
				if (el.querySelector("textarea") || el.querySelector("[contenteditable=true]")) continue;
				const cs = window.getComputedStyle(el);
				if (cs.display === "none" || cs.visibility === "hidden") continue;
				const r = el.getBoundingClientRect();
				if (r.width < 30 || r.height < 30) continue;
				const area = r.width * r.height;
				if (area < vw * vh * 0.08) continue; // only big blocks
				const textLen = (el.textContent || "").trim().length;
				// full-screen layer: only real backgrounds — z-index below 0, or
				// non-interactive (pointer-events:none) with almost no text
				if (r.width >= vw * 0.97 && r.height >= vh * 0.97) {
					const zi = parseInt(cs.zIndex, 10) || 0;
					if (zi < 0 || (zi <= 1 && cs.pointerEvents === "none" && textLen < 80)) { targets.push(el); continue; }
				}
				// skip text-heavy containers (chat log lives in big text blocks)
				if (textLen > 400) continue;
				// sidebar: tall narrow strip hugging the left edge
				if (r.left <= 4 && r.width <= vw * 0.35 && r.height >= vh * 0.5) { targets.push(el); continue; }
				// topbar: short wide strip hugging the top
				if (r.top <= 4 && r.height <= vh * 0.18 && r.width >= vw * 0.4) { targets.push(el); continue; }
			}
			// dedupe nested targets
			return targets.filter(function (el, i) {
				for (let j = 0; j < targets.length; j++) {
					if (j !== i && targets[j].contains(el)) return false;
				}
				return true;
			});
		}

		function apply(ctx) {
			injectCss();

			const btn = document.createElement("button");
			btn.id = ZEN_ID;
			btn.title = "禅模式 (Ctrl+Shift+Z)";
			btn.textContent = "禅";
			document.body.appendChild(btn);

			let active = false;
			let hidden = [];

			const setZen = function (on) {
				if (active === on) return;
				active = on;
				document.body.classList.toggle("dsh-zen-active", on);
				if (on) {
					hidden = findChrome();
					hidden.forEach(function (el) {
						// layout-preserving hide: element keeps its box (flex layout intact),
						// only visually gone and click-transparent.
						el.dataset.dshZenOpacity = el.style.opacity;
						el.dataset.dshZenPE = el.style.pointerEvents;
						el.dataset.dshZenTrans = el.style.transition;
						el.style.transition = "opacity .35s ease";
						el.style.opacity = "0";
						el.style.pointerEvents = "none";
					});
					btn.textContent = "出";
				} else {
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
				// notify companions (e.g. dsh-pet hides itself in zen mode)
				try {
					window.dispatchEvent(new CustomEvent(ZEN_EVENT, { detail: { active: on } }));
				} catch (e) {}
			};

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
