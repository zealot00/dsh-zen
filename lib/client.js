window.__ModuleLoader__.load({
	id: "@dsh-local/dsh-zen",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		const ZEN_ID = "dsh-zen-root";
		const ZEN_EVENT = "dsh-zen-change";

		const CSS = [
			"#" + ZEN_ID + "{position:fixed;left:14px;top:14px;z-index:2147483002;width:36px;height:36px;border-radius:50%;border:1px solid rgba(0,0,0,.18);background:rgba(255,255,255,.85);color:#3a4252;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;opacity:.45;transition:opacity .25s,transform .25s}",
			"#" + ZEN_ID + ":hover{opacity:1;transform:scale(1.08)}",
			"body[data-ds-dark-theme] #" + ZEN_ID + "{background:rgba(40,42,46,.9);color:#e8eaee;border-color:rgba(255,255,255,.2)}",
			"body.dsh-zen-active #" + ZEN_ID + "{opacity:1;background:rgba(90,140,120,.9);color:#fff;border-color:rgba(255,255,255,.25)}",
			// zen transition: smooth fade for the whole app shell
			"body.dsh-zen-active #root{transition:filter .35s ease}",
			"body.dsh-zen-active{background:var(--dsw-alias-bg-base)}"
		].join("");

		function injectCss() {
			const tagId = "dsh-zen/style";
			if (document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]")) return;
			const tag = document.createElement("style");
			tag.dataset.pluginCss = tagId;
			tag.textContent = CSS;
			document.head.appendChild(tag);
		}

		// runtime layout probing: find fixed sidebar / topbar chrome elements.
		// The chat stream and composer stay untouched (that is the zen focus).
		function findChrome() {
			const targets = [];
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const all = document.querySelectorAll("body *");
			for (let i = 0; i < all.length; i++) {
				const el = all[i];
				const cs = window.getComputedStyle(el);
				if (cs.position !== "fixed" || cs.visibility === "hidden" || cs.display === "none") continue;
				const r = el.getBoundingClientRect();
				if (r.width < 20 || r.height < 20) continue;
				// sidebar: tall narrow strip pinned to the left edge
				if (r.left <= 2 && r.width < vw * 0.35 && r.height > vh * 0.45) { targets.push(el); continue; }
				// topbar: short wide strip pinned to the top (not the zen button itself)
				if (r.top <= 2 && r.height < vh * 0.18 && r.width > vw * 0.4 && el.id !== ZEN_ID) { targets.push(el); }
			}
			// dedupe: skip elements nested inside an already-targeted element
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
						el.dataset.dshZenDisplay = el.style.display;
						el.style.display = "none";
					});
					btn.textContent = "出";
				} else {
					hidden.forEach(function (el) {
						el.style.display = el.dataset.dshZenDisplay || "";
						delete el.dataset.dshZenDisplay;
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
