"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e(require("jquery")) : e(jQuery);
}(function (e) {
  "use strict";

  var o = !1,
      t = !1,
      r = 0,
      i = 2e3,
      s = 0,
      n = e,
      l = document,
      a = window,
      c = n(a),
      d = [];
  var u = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || !1,
      h = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || !1;
  if (u) a.cancelAnimationFrame || (h = function h(e) {});else {
    var p = 0;
    u = function u(e, o) {
      var t = new Date().getTime(),
          r = Math.max(0, 16 - (t - p)),
          i = a.setTimeout(function () {
        e(t + r);
      }, r);
      return p = t + r, i;
    }, h = function h(e) {
      a.clearTimeout(e);
    };
  }

  var m,
      f,
      g,
      v = a.MutationObserver || a.WebKitMutationObserver || !1,
      w = Date.now || function () {
    return new Date().getTime();
  },
      b = {
    zindex: "auto",
    cursoropacitymin: 0,
    cursoropacitymax: 1,
    cursorcolor: "#424242",
    cursorwidth: "6px",
    cursorborder: "1px solid #fff",
    cursorborderradius: "5px",
    scrollspeed: 40,
    mousescrollstep: 27,
    touchbehavior: !1,
    emulatetouch: !1,
    hwacceleration: !0,
    usetransition: !0,
    boxzoom: !1,
    dblclickzoom: !0,
    gesturezoom: !0,
    grabcursorenabled: !0,
    autohidemode: !0,
    background: "",
    iframeautoresize: !0,
    cursorminheight: 32,
    preservenativescrolling: !0,
    railoffset: !1,
    railhoffset: !1,
    bouncescroll: !0,
    spacebarenabled: !0,
    railpadding: {
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    },
    disableoutline: !0,
    horizrailenabled: !0,
    railalign: "right",
    railvalign: "bottom",
    enabletranslate3d: !0,
    enablemousewheel: !0,
    enablekeyboard: !0,
    smoothscroll: !0,
    sensitiverail: !0,
    enablemouselockapi: !0,
    cursorfixedheight: !1,
    directionlockdeadzone: 6,
    hidecursordelay: 400,
    nativeparentscrolling: !0,
    enablescrollonselection: !0,
    overflowx: !0,
    overflowy: !0,
    cursordragspeed: .3,
    rtlmode: "auto",
    cursordragontouch: !1,
    oneaxismousemode: "auto",
    scriptpath: (f = l.currentScript || !!(m = l.getElementsByTagName("script")).length && m[m.length - 1], g = f ? f.src.split("?")[0] : "", g.split("/").length > 0 ? g.split("/").slice(0, -1).join("/") + "/" : ""),
    preventmultitouchscrolling: !0,
    disablemutationobserver: !1,
    enableobserver: !0,
    scrollbarid: !1
  },
      y = !1,
      x = function x(e, p) {
    var m = this;
    this.version = "3.7.6", this.name = "nicescroll", this.me = p;
    var f = n("body"),
        g = this.opt = {
      doc: f,
      win: !1
    };
    if (n.extend(g, b), g.snapbackspeed = 80, e) for (var x in g) {
      void 0 !== e[x] && (g[x] = e[x]);
    }

    if (g.disablemutationobserver && (v = !1), this.doc = g.doc, this.iddoc = this.doc && this.doc[0] && this.doc[0].id || "", this.ispage = /^BODY|HTML/.test(g.win ? g.win[0].nodeName : this.doc[0].nodeName), this.haswrapper = !1 !== g.win, this.win = g.win || (this.ispage ? c : this.doc), this.docscroll = this.ispage && !this.haswrapper ? c : this.win, this.body = f, this.viewport = !1, this.isfixed = !1, this.iframe = !1, this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName, this.istextarea = "TEXTAREA" == this.win[0].nodeName, this.forcescreen = !1, this.canshowonmouseevent = "scroll" != g.autohidemode, this.onmousedown = !1, this.onmouseup = !1, this.onmousemove = !1, this.onmousewheel = !1, this.onkeypress = !1, this.ongesturezoom = !1, this.onclick = !1, this.onscrollstart = !1, this.onscrollend = !1, this.onscrollcancel = !1, this.onzoomin = !1, this.onzoomout = !1, this.view = !1, this.page = !1, this.scroll = {
      x: 0,
      y: 0
    }, this.scrollratio = {
      x: 0,
      y: 0
    }, this.cursorheight = 20, this.scrollvaluemax = 0, "auto" == g.rtlmode) {
      var z = this.win[0] == a ? this.body : this.win,
          k = z.css("writing-mode") || z.css("-webkit-writing-mode") || z.css("-ms-writing-mode") || z.css("-moz-writing-mode");
      "horizontal-tb" == k || "lr-tb" == k || "" === k ? (this.isrtlmode = "rtl" == z.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == k || "tb" == k || "tb-rl" == k || "rl-tb" == k, this.isvertical = "vertical-rl" == k || "tb" == k || "tb-rl" == k);
    } else this.isrtlmode = !0 === g.rtlmode, this.isvertical = !1;

    if (this.scrollrunning = !1, this.scrollmom = !1, this.observer = !1, this.observerremover = !1, this.observerbody = !1, !1 !== g.scrollbarid) this.id = g.scrollbarid;else do {
      this.id = "ascrail" + i++;
    } while (l.getElementById(this.id));
    this.rail = !1, this.cursor = !1, this.cursorfreezed = !1, this.selectiondrag = !1, this.zoom = !1, this.zoomactive = !1, this.hasfocus = !1, this.hasmousefocus = !1, this.railslocked = !1, this.locked = !1, this.hidden = !1, this.cursoractive = !0, this.wheelprevented = !1, this.overflowx = g.overflowx, this.overflowy = g.overflowy, this.nativescrollingarea = !1, this.checkarea = 0, this.events = [], this.saved = {}, this.delaylist = {}, this.synclist = {}, this.lastdeltax = 0, this.lastdeltay = 0, this.detected = function () {
      if (y) return y;
      var e = l.createElement("DIV"),
          o = e.style,
          t = navigator.userAgent,
          r = navigator.platform,
          i = {};
      return i.haspointerlock = "pointerLockElement" in l || "webkitPointerLockElement" in l || "mozPointerLockElement" in l, i.isopera = "opera" in a, i.isopera12 = i.isopera && "getUserMedia" in navigator, i.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(a.operamini), i.isie = "all" in l && "attachEvent" in e && !i.isopera, i.isieold = i.isie && !("msInterpolationMode" in o), i.isie7 = i.isie && !i.isieold && (!("documentMode" in l) || 7 === l.documentMode), i.isie8 = i.isie && "documentMode" in l && 8 === l.documentMode, i.isie9 = i.isie && "performance" in a && 9 === l.documentMode, i.isie10 = i.isie && "performance" in a && 10 === l.documentMode, i.isie11 = "msRequestFullscreen" in e && l.documentMode >= 11, i.ismsedge = "msCredentials" in a, i.ismozilla = "MozAppearance" in o, i.iswebkit = !i.ismsedge && "WebkitAppearance" in o, i.ischrome = i.iswebkit && "chrome" in a, i.ischrome38 = i.ischrome && "touchAction" in o, i.ischrome22 = !i.ischrome38 && i.ischrome && i.haspointerlock, i.ischrome26 = !i.ischrome38 && i.ischrome && "transition" in o, i.cantouch = "ontouchstart" in l.documentElement || "ontouchstart" in a, i.hasw3ctouch = !!a.PointerEvent && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), i.hasmstouch = !i.hasw3ctouch && (a.MSPointerEvent || !1), i.ismac = /^mac$/i.test(r), i.isios = i.cantouch && /iphone|ipad|ipod/i.test(r), i.isios4 = i.isios && !("seal" in Object), i.isios7 = i.isios && "webkitHidden" in l, i.isios8 = i.isios && "hidden" in l, i.isios10 = i.isios && a.Proxy, i.isandroid = /android/i.test(t), i.haseventlistener = "addEventListener" in e, i.trstyle = !1, i.hastransform = !1, i.hastranslate3d = !1, i.transitionstyle = !1, i.hastransition = !1, i.transitionend = !1, i.trstyle = "transform", i.hastransform = "transform" in o || function () {
        for (var e = ["msTransform", "webkitTransform", "MozTransform", "OTransform"], t = 0, r = e.length; t < r; t++) {
          if (void 0 !== o[e[t]]) {
            i.trstyle = e[t];
            break;
          }
        }

        i.hastransform = !!i.trstyle;
      }(), i.hastransform && (o[i.trstyle] = "translate3d(1px,2px,3px)", i.hastranslate3d = /translate3d/.test(o[i.trstyle])), i.transitionstyle = "transition", i.prefixstyle = "", i.transitionend = "transitionend", i.hastransition = "transition" in o || function () {
        i.transitionend = !1;

        for (var e = ["webkitTransition", "msTransition", "MozTransition", "OTransition", "OTransition", "KhtmlTransition"], t = ["-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"], r = ["webkitTransitionEnd", "msTransitionEnd", "transitionend", "otransitionend", "oTransitionEnd", "KhtmlTransitionEnd"], s = 0, n = e.length; s < n; s++) {
          if (e[s] in o) {
            i.transitionstyle = e[s], i.prefixstyle = t[s], i.transitionend = r[s];
            break;
          }
        }

        i.ischrome26 && (i.prefixstyle = t[1]), i.hastransition = i.transitionstyle;
      }(), i.cursorgrabvalue = function () {
        var e = ["grab", "-webkit-grab", "-moz-grab"];
        (i.ischrome && !i.ischrome38 || i.isie) && (e = []);

        for (var t = 0, r = e.length; t < r; t++) {
          var s = e[t];
          if (o.cursor = s, o.cursor == s) return s;
        }

        return "url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize";
      }(), i.hasmousecapture = "setCapture" in e, i.hasMutationObserver = !1 !== v, e = null, y = i, i;
    }();
    var T = n.extend({}, this.detected);
    this.canhwscroll = T.hastransform && g.hwacceleration, this.ishwscroll = this.canhwscroll && m.haswrapper, this.isrtlmode ? this.isvertical ? this.hasreversehr = !(T.iswebkit || T.isie || T.isie11) : this.hasreversehr = !(T.iswebkit || T.isie && !T.isie10 && !T.isie11) : this.hasreversehr = !1, this.istouchcapable = !1, (T.cantouch || !T.hasw3ctouch && !T.hasmstouch) && (!T.cantouch || T.isios || T.isandroid || !T.iswebkit && !T.ismozilla) || (this.istouchcapable = !0), g.enablemouselockapi || (T.hasmousecapture = !1, T.haspointerlock = !1), this.debounced = function (e, o, t) {
      m && (m.delaylist[e] || !1 || (m.delaylist[e] = {
        h: u(function () {
          m.delaylist[e].fn.call(m), m.delaylist[e] = !1;
        }, t)
      }, o.call(m)), m.delaylist[e].fn = o);
    }, this.synched = function (e, o) {
      m.synclist[e] ? m.synclist[e] = o : (m.synclist[e] = o, u(function () {
        m && (m.synclist[e] && m.synclist[e].call(m), m.synclist[e] = null);
      }));
    }, this.unsynched = function (e) {
      m.synclist[e] && (m.synclist[e] = !1);
    }, this.css = function (e, o) {
      for (var t in o) {
        m.saved.css.push([e, t, e.css(t)]), e.css(t, o[t]);
      }
    }, this.scrollTop = function (e) {
      return void 0 === e ? m.getScrollTop() : m.setScrollTop(e);
    }, this.scrollLeft = function (e) {
      return void 0 === e ? m.getScrollLeft() : m.setScrollLeft(e);
    };

    var E = function E(e, o, t, r, i, s, n) {
      this.st = e, this.ed = o, this.spd = t, this.p1 = r || 0, this.p2 = i || 1, this.p3 = s || 0, this.p4 = n || 1, this.ts = w(), this.df = o - e;
    };

    function M() {
      var e = m.doc.css(T.trstyle);
      return !(!e || "matrix" != e.substr(0, 6)) && e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/);
    }

    if (E.prototype = {
      B2: function B2(e) {
        return 3 * (1 - e) * (1 - e) * e;
      },
      B3: function B3(e) {
        return 3 * (1 - e) * e * e;
      },
      B4: function B4(e) {
        return e * e * e;
      },
      getPos: function getPos() {
        return (w() - this.ts) / this.spd;
      },
      getNow: function getNow() {
        var e = (w() - this.ts) / this.spd,
            o = this.B2(e) + this.B3(e) + this.B4(e);
        return e >= 1 ? this.ed : this.st + this.df * o | 0;
      },
      update: function update(e, o) {
        return this.st = this.getNow(), this.ed = e, this.spd = o, this.ts = w(), this.df = this.ed - this.st, this;
      }
    }, this.ishwscroll) {
      this.doc.translate = {
        x: 0,
        y: 0,
        tx: "0px",
        ty: "0px"
      }, T.hastranslate3d && T.isios && this.doc.css("-webkit-backface-visibility", "hidden"), this.getScrollTop = function (e) {
        if (!e) {
          var o = M();
          if (o) return 16 == o.length ? -o[13] : -o[5];
          if (m.timerscroll && m.timerscroll.bz) return m.timerscroll.bz.getNow();
        }

        return m.doc.translate.y;
      }, this.getScrollLeft = function (e) {
        if (!e) {
          var o = M();
          if (o) return 16 == o.length ? -o[12] : -o[4];
          if (m.timerscroll && m.timerscroll.bh) return m.timerscroll.bh.getNow();
        }

        return m.doc.translate.x;
      }, this.notifyScrollEvent = function (e) {
        var o = l.createEvent("UIEvents");
        o.initUIEvent("scroll", !1, !1, a, 1), o.niceevent = !0, e.dispatchEvent(o);
      };
      var L = this.isrtlmode ? 1 : -1;
      T.hastranslate3d && g.enabletranslate3d ? (this.setScrollTop = function (e, o) {
        m.doc.translate.y = e, m.doc.translate.ty = -1 * e + "px", m.doc.css(T.trstyle, "translate3d(" + m.doc.translate.tx + "," + m.doc.translate.ty + ",0)"), o || m.notifyScrollEvent(m.win[0]);
      }, this.setScrollLeft = function (e, o) {
        m.doc.translate.x = e, m.doc.translate.tx = e * L + "px", m.doc.css(T.trstyle, "translate3d(" + m.doc.translate.tx + "," + m.doc.translate.ty + ",0)"), o || m.notifyScrollEvent(m.win[0]);
      }) : (this.setScrollTop = function (e, o) {
        m.doc.translate.y = e, m.doc.translate.ty = -1 * e + "px", m.doc.css(T.trstyle, "translate(" + m.doc.translate.tx + "," + m.doc.translate.ty + ")"), o || m.notifyScrollEvent(m.win[0]);
      }, this.setScrollLeft = function (e, o) {
        m.doc.translate.x = e, m.doc.translate.tx = e * L + "px", m.doc.css(T.trstyle, "translate(" + m.doc.translate.tx + "," + m.doc.translate.ty + ")"), o || m.notifyScrollEvent(m.win[0]);
      });
    } else this.getScrollTop = function () {
      return m.docscroll.scrollTop();
    }, this.setScrollTop = function (e) {
      m.docscroll.scrollTop(e);
    }, this.getScrollLeft = function () {
      return m.hasreversehr ? m.detected.ismozilla ? m.page.maxw - Math.abs(m.docscroll.scrollLeft()) : m.page.maxw - m.docscroll.scrollLeft() : m.docscroll.scrollLeft();
    }, this.setScrollLeft = function (e) {
      return setTimeout(function () {
        if (m) return m.hasreversehr && (e = m.detected.ismozilla ? -(m.page.maxw - e) : m.page.maxw - e), m.docscroll.scrollLeft(e);
      }, 1);
    };

    this.getTarget = function (e) {
      return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement);
    }, this.hasParent = function (e, o) {
      if (!e) return !1;

      for (var t = e.target || e.srcElement || e || !1; t && t.id != o;) {
        t = t.parentNode || !1;
      }

      return !1 !== t;
    };
    var C = {
      thin: 1,
      medium: 3,
      thick: 5
    };

    function N(e, o, t) {
      var r = e.css(o),
          i = parseFloat(r);

      if (isNaN(i)) {
        var s = 3 == (i = C[r] || 0) ? t ? m.win.outerHeight() - m.win.innerHeight() : m.win.outerWidth() - m.win.innerWidth() : 1;
        return m.isie8 && i && (i += 1), s ? i : 0;
      }

      return i;
    }

    this.getDocumentScrollOffset = function () {
      return {
        top: a.pageYOffset || l.documentElement.scrollTop,
        left: a.pageXOffset || l.documentElement.scrollLeft
      };
    }, this.getOffset = function () {
      if (m.isfixed) {
        var e = m.win.offset(),
            o = m.getDocumentScrollOffset();
        return e.top -= o.top, e.left -= o.left, e;
      }

      var t = m.win.offset();
      if (!m.viewport) return t;
      var r = m.viewport.offset();
      return {
        top: t.top - r.top,
        left: t.left - r.left
      };
    }, this.updateScrollBar = function (e) {
      var o, t;
      if (m.ishwscroll) m.rail.css({
        height: m.win.innerHeight() - (g.railpadding.top + g.railpadding.bottom)
      }), m.railh && m.railh.css({
        width: m.win.innerWidth() - (g.railpadding.left + g.railpadding.right)
      });else {
        var r = m.getOffset();

        if ((o = {
          top: r.top,
          left: r.left - (g.railpadding.left + g.railpadding.right)
        }).top += N(m.win, "border-top-width", !0), o.left += m.rail.align ? m.win.outerWidth() - N(m.win, "border-right-width") - m.rail.width : N(m.win, "border-left-width"), (t = g.railoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left)), m.railslocked || m.rail.css({
          top: o.top,
          left: o.left,
          height: (e ? e.h : m.win.innerHeight()) - (g.railpadding.top + g.railpadding.bottom)
        }), m.zoom && m.zoom.css({
          top: o.top + 1,
          left: 1 == m.rail.align ? o.left - 20 : o.left + m.rail.width + 4
        }), m.railh && !m.railslocked) {
          o = {
            top: r.top,
            left: r.left
          }, (t = g.railhoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left));
          var i = m.railh.align ? o.top + N(m.win, "border-top-width", !0) + m.win.innerHeight() - m.railh.height : o.top + N(m.win, "border-top-width", !0),
              s = o.left + N(m.win, "border-left-width");
          m.railh.css({
            top: i - (g.railpadding.top + g.railpadding.bottom),
            left: s,
            width: m.railh.width
          });
        }
      }
    }, this.doRailClick = function (e, o, t) {
      var r, i, s, n;
      m.railslocked || (m.cancelEvent(e), "pageY" in e || (e.pageX = e.clientX + l.documentElement.scrollLeft, e.pageY = e.clientY + l.documentElement.scrollTop), o ? (r = t ? m.doScrollLeft : m.doScrollTop, s = t ? (e.pageX - m.railh.offset().left - m.cursorwidth / 2) * m.scrollratio.x : (e.pageY - m.rail.offset().top - m.cursorheight / 2) * m.scrollratio.y, m.unsynched("relativexy"), r(0 | s)) : (r = t ? m.doScrollLeftBy : m.doScrollBy, s = t ? m.scroll.x : m.scroll.y, n = t ? e.pageX - m.railh.offset().left : e.pageY - m.rail.offset().top, i = t ? m.view.w : m.view.h, r(s >= n ? i : -i)));
    }, m.newscrolly = m.newscrollx = 0, m.hasanimationframe = "requestAnimationFrame" in a, m.hascancelanimationframe = "cancelAnimationFrame" in a, m.hasborderbox = !1, this.init = function () {
      if (m.saved.css = [], T.isoperamini) return !0;
      if (T.isandroid && !("hidden" in l)) return !0;
      g.emulatetouch = g.emulatetouch || g.touchbehavior, m.hasborderbox = a.getComputedStyle && "border-box" === a.getComputedStyle(l.body)["box-sizing"];
      var e = {
        "overflow-y": "hidden"
      };

      if ((T.isie11 || T.isie10) && (e["-ms-overflow-style"] = "none"), m.ishwscroll && (this.doc.css(T.transitionstyle, T.prefixstyle + "transform 0ms ease-out"), T.transitionend && m.bind(m.doc, T.transitionend, m.onScrollTransitionEnd, !1)), m.zindex = "auto", m.ispage || "auto" != g.zindex ? m.zindex = g.zindex : m.zindex = function () {
        var e = m.win;
        if ("zIndex" in e) return e.zIndex();

        for (; e.length > 0;) {
          if (9 == e[0].nodeType) return !1;
          var o = e.css("zIndex");
          if (!isNaN(o) && 0 !== o) return parseInt(o);
          e = e.parent();
        }

        return !1;
      }() || "auto", !m.ispage && "auto" != m.zindex && m.zindex > s && (s = m.zindex), m.isie && 0 === m.zindex && "auto" == g.zindex && (m.zindex = "auto"), !m.ispage || !T.isieold) {
        var i = m.docscroll;
        m.ispage && (i = m.haswrapper ? m.win : m.doc), m.css(i, e), m.ispage && (T.isie11 || T.isie) && m.css(n("html"), e), !T.isios || m.ispage || m.haswrapper || m.css(f, {
          "-webkit-overflow-scrolling": "touch"
        });
        var d = n(l.createElement("div"));
        d.css({
          position: "relative",
          top: 0,
          "float": "right",
          width: g.cursorwidth,
          height: 0,
          "background-color": g.cursorcolor,
          border: g.cursorborder,
          "background-clip": "padding-box",
          "-webkit-border-radius": g.cursorborderradius,
          "-moz-border-radius": g.cursorborderradius,
          "border-radius": g.cursorborderradius
        }), d.addClass("nicescroll-cursors"), m.cursor = d;
        var u = n(l.createElement("div"));
        u.attr("id", m.id), u.addClass("nicescroll-rails nicescroll-rails-vr");
        var h,
            p,
            w = ["left", "right", "top", "bottom"];

        for (var b in w) {
          p = w[b], (h = g.railpadding[p] || 0) && u.css("padding-" + p, h + "px");
        }

        u.append(d), u.width = Math.max(parseFloat(g.cursorwidth), d.outerWidth()), u.css({
          width: u.width + "px",
          zIndex: m.zindex,
          background: g.background,
          cursor: "default"
        }), u.visibility = !0, u.scrollable = !0, u.align = "left" == g.railalign ? 0 : 1, m.rail = u, m.rail.drag = !1;
        var y,
            x = !1;
        if (!g.boxzoom || m.ispage || T.isieold || (x = l.createElement("div"), m.bind(x, "click", m.doZoom), m.bind(x, "mouseenter", function () {
          m.zoom.css("opacity", g.cursoropacitymax);
        }), m.bind(x, "mouseleave", function () {
          m.zoom.css("opacity", g.cursoropacitymin);
        }), m.zoom = n(x), m.zoom.css({
          cursor: "pointer",
          zIndex: m.zindex,
          backgroundImage: "url(" + g.scriptpath + "zoomico.png)",
          height: 18,
          width: 18,
          backgroundPosition: "0 0"
        }), g.dblclickzoom && m.bind(m.win, "dblclick", m.doZoom), T.cantouch && g.gesturezoom && (m.ongesturezoom = function (e) {
          return e.scale > 1.5 && m.doZoomIn(e), e.scale < .8 && m.doZoomOut(e), m.cancelEvent(e);
        }, m.bind(m.win, "gestureend", m.ongesturezoom))), m.railh = !1, g.horizrailenabled && (m.css(i, {
          overflowX: "hidden"
        }), (d = n(l.createElement("div"))).css({
          position: "absolute",
          top: 0,
          height: g.cursorwidth,
          width: 0,
          backgroundColor: g.cursorcolor,
          border: g.cursorborder,
          backgroundClip: "padding-box",
          "-webkit-border-radius": g.cursorborderradius,
          "-moz-border-radius": g.cursorborderradius,
          "border-radius": g.cursorborderradius
        }), T.isieold && d.css("overflow", "hidden"), d.addClass("nicescroll-cursors"), m.cursorh = d, (y = n(l.createElement("div"))).attr("id", m.id + "-hr"), y.addClass("nicescroll-rails nicescroll-rails-hr"), y.height = Math.max(parseFloat(g.cursorwidth), d.outerHeight()), y.css({
          height: y.height + "px",
          zIndex: m.zindex,
          background: g.background
        }), y.append(d), y.visibility = !0, y.scrollable = !0, y.align = "top" == g.railvalign ? 0 : 1, m.railh = y, m.railh.drag = !1), m.ispage) u.css({
          position: "fixed",
          top: 0,
          height: "100%"
        }), u.css(u.align ? {
          right: 0
        } : {
          left: 0
        }), m.body.append(u), m.railh && (y.css({
          position: "fixed",
          left: 0,
          width: "100%"
        }), y.css(y.align ? {
          bottom: 0
        } : {
          top: 0
        }), m.body.append(y));else {
          if (m.ishwscroll) {
            "static" == m.win.css("position") && m.css(m.win, {
              position: "relative"
            });
            var z = "HTML" == m.win[0].nodeName ? m.body : m.win;
            n(z).scrollTop(0).scrollLeft(0), m.zoom && (m.zoom.css({
              position: "absolute",
              top: 1,
              right: 0,
              "margin-right": u.width + 4
            }), z.append(m.zoom)), u.css({
              position: "absolute",
              top: 0
            }), u.css(u.align ? {
              right: 0
            } : {
              left: 0
            }), z.append(u), y && (y.css({
              position: "absolute",
              left: 0,
              bottom: 0
            }), y.css(y.align ? {
              bottom: 0
            } : {
              top: 0
            }), z.append(y));
          } else {
            m.isfixed = "fixed" == m.win.css("position");
            var k = m.isfixed ? "fixed" : "absolute";
            m.isfixed || (m.viewport = m.getViewport(m.win[0])), m.viewport && (m.body = m.viewport, /fixed|absolute/.test(m.viewport.css("position")) || m.css(m.viewport, {
              position: "relative"
            })), u.css({
              position: k
            }), m.zoom && m.zoom.css({
              position: k
            }), m.updateScrollBar(), m.body.append(u), m.zoom && m.body.append(m.zoom), m.railh && (y.css({
              position: k
            }), m.body.append(y));
          }

          T.isios && m.css(m.win, {
            "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
            "-webkit-touch-callout": "none"
          }), g.disableoutline && (T.isie && m.win.attr("hideFocus", "true"), T.iswebkit && m.win.css("outline", "none"));
        }

        if (!1 === g.autohidemode ? (m.autohidedom = !1, m.rail.css({
          opacity: g.cursoropacitymax
        }), m.railh && m.railh.css({
          opacity: g.cursoropacitymax
        })) : !0 === g.autohidemode || "leave" === g.autohidemode ? (m.autohidedom = n().add(m.rail), T.isie8 && (m.autohidedom = m.autohidedom.add(m.cursor)), m.railh && (m.autohidedom = m.autohidedom.add(m.railh)), m.railh && T.isie8 && (m.autohidedom = m.autohidedom.add(m.cursorh))) : "scroll" == g.autohidemode ? (m.autohidedom = n().add(m.rail), m.railh && (m.autohidedom = m.autohidedom.add(m.railh))) : "cursor" == g.autohidemode ? (m.autohidedom = n().add(m.cursor), m.railh && (m.autohidedom = m.autohidedom.add(m.cursorh))) : "hidden" == g.autohidemode && (m.autohidedom = !1, m.hide(), m.railslocked = !1), T.cantouch || m.istouchcapable || g.emulatetouch || T.hasmstouch) {
          m.scrollmom = new S(m);
          m.ontouchstart = function (e) {
            if (m.locked) return !1;
            if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;

            if (m.hasmoving = !1, m.scrollmom.timer && (m.triggerScrollEnd(), m.scrollmom.stop()), !m.railslocked) {
              var o = m.getTarget(e);
              if (o) if (/INPUT/i.test(o.nodeName) && /range/i.test(o.type)) return m.stopPropagation(e);
              var t = "mousedown" === e.type;

              if (!("clientX" in e) && "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), m.forcescreen) {
                var r = e;
                (e = {
                  original: e.original ? e.original : e
                }).clientX = r.screenX, e.clientY = r.screenY;
              }

              if (m.rail.drag = {
                x: e.clientX,
                y: e.clientY,
                sx: m.scroll.x,
                sy: m.scroll.y,
                st: m.getScrollTop(),
                sl: m.getScrollLeft(),
                pt: 2,
                dl: !1,
                tg: o
              }, m.ispage || !g.directionlockdeadzone) m.rail.drag.dl = "f";else {
                var i = {
                  w: c.width(),
                  h: c.height()
                },
                    s = m.getContentSize(),
                    l = s.h - i.h,
                    a = s.w - i.w;
                m.rail.scrollable && !m.railh.scrollable ? m.rail.drag.ck = l > 0 && "v" : !m.rail.scrollable && m.railh.scrollable ? m.rail.drag.ck = a > 0 && "h" : m.rail.drag.ck = !1;
              }

              if (g.emulatetouch && m.isiframe && T.isie) {
                var d = m.win.position();
                m.rail.drag.x += d.left, m.rail.drag.y += d.top;
              }

              if (m.hasmoving = !1, m.lastmouseup = !1, m.scrollmom.reset(e.clientX, e.clientY), o && t) {
                if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName)) return T.hasmousecapture && o.setCapture(), g.emulatetouch ? (o.onclick && !o._onclick && (o._onclick = o.onclick, o.onclick = function (e) {
                  if (m.hasmoving) return !1;

                  o._onclick.call(this, e);
                }), m.cancelEvent(e)) : m.stopPropagation(e);
                /SUBMIT|CANCEL|BUTTON/i.test(n(o).attr("type")) && (m.preventclick = {
                  tg: o,
                  click: !1
                });
              }
            }
          }, m.ontouchend = function (e) {
            if (!m.rail.drag) return !0;

            if (2 == m.rail.drag.pt) {
              if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;
              m.rail.drag = !1;
              var o = "mouseup" === e.type;
              if (m.hasmoving && (m.scrollmom.doMomentum(), m.lastmouseup = !0, m.hideCursor(), T.hasmousecapture && l.releaseCapture(), o)) return m.cancelEvent(e);
            } else if (1 == m.rail.drag.pt) return m.onmouseup(e);
          };
          var E = g.emulatetouch && m.isiframe && !T.hasmousecapture,
              M = .3 * g.directionlockdeadzone | 0;
          m.ontouchmove = function (e, o) {
            if (!m.rail.drag) return !0;
            if (e.targetTouches && g.preventmultitouchscrolling && e.targetTouches.length > 1) return !0;
            if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !0;

            if (2 == m.rail.drag.pt) {
              var t, r;

              if ("changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), r = t = 0, E && !o) {
                var i = m.win.position();
                r = -i.left, t = -i.top;
              }

              var s = e.clientY + t,
                  n = s - m.rail.drag.y,
                  a = e.clientX + r,
                  c = a - m.rail.drag.x,
                  d = m.rail.drag.st - n;
              if (m.ishwscroll && g.bouncescroll) d < 0 ? d = Math.round(d / 2) : d > m.page.maxh && (d = m.page.maxh + Math.round((d - m.page.maxh) / 2));else if (d < 0 ? (d = 0, s = 0) : d > m.page.maxh && (d = m.page.maxh, s = 0), 0 === s && !m.hasmoving) return m.ispage || (m.rail.drag = !1), !0;
              var u = m.getScrollLeft();

              if (m.railh && m.railh.scrollable && (u = m.isrtlmode ? c - m.rail.drag.sl : m.rail.drag.sl - c, m.ishwscroll && g.bouncescroll ? u < 0 ? u = Math.round(u / 2) : u > m.page.maxw && (u = m.page.maxw + Math.round((u - m.page.maxw) / 2)) : (u < 0 && (u = 0, a = 0), u > m.page.maxw && (u = m.page.maxw, a = 0))), !m.hasmoving) {
                if (m.rail.drag.y === e.clientY && m.rail.drag.x === e.clientX) return m.cancelEvent(e);
                var h = Math.abs(n),
                    p = Math.abs(c),
                    f = g.directionlockdeadzone;
                if (m.rail.drag.ck ? "v" == m.rail.drag.ck ? p > f && h <= M ? m.rail.drag = !1 : h > f && (m.rail.drag.dl = "v") : "h" == m.rail.drag.ck && (h > f && p <= M ? m.rail.drag = !1 : p > f && (m.rail.drag.dl = "h")) : h > f && p > f ? m.rail.drag.dl = "f" : h > f ? m.rail.drag.dl = p > M ? "f" : "v" : p > f && (m.rail.drag.dl = h > M ? "f" : "h"), !m.rail.drag.dl) return m.cancelEvent(e);
                m.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), m.hasmoving = !0;
              }

              return m.preventclick && !m.preventclick.click && (m.preventclick.click = m.preventclick.tg.onclick || !1, m.preventclick.tg.onclick = m.onpreventclick), m.rail.drag.dl && ("v" == m.rail.drag.dl ? u = m.rail.drag.sl : "h" == m.rail.drag.dl && (d = m.rail.drag.st)), m.synched("touchmove", function () {
                m.rail.drag && 2 == m.rail.drag.pt && (m.prepareTransition && m.resetTransition(), m.rail.scrollable && m.setScrollTop(d), m.scrollmom.update(a, s), m.railh && m.railh.scrollable ? (m.setScrollLeft(u), m.showCursor(d, u)) : m.showCursor(d), T.isie10 && l.selection.clear());
              }), m.cancelEvent(e);
            }

            return 1 == m.rail.drag.pt ? m.onmousemove(e) : void 0;
          }, m.ontouchstartCursor = function (e, o) {
            if (!m.rail.drag || 3 == m.rail.drag.pt) {
              if (m.locked) return m.cancelEvent(e);
              m.cancelScroll(), m.rail.drag = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                sx: m.scroll.x,
                sy: m.scroll.y,
                pt: 3,
                hr: !!o
              };
              var t = m.getTarget(e);
              return !m.ispage && T.hasmousecapture && t.setCapture(), m.isiframe && !T.hasmousecapture && (m.saved.csspointerevents = m.doc.css("pointer-events"), m.css(m.doc, {
                "pointer-events": "none"
              })), m.cancelEvent(e);
            }
          }, m.ontouchendCursor = function (e) {
            if (m.rail.drag) {
              if (T.hasmousecapture && l.releaseCapture(), m.isiframe && !T.hasmousecapture && m.doc.css("pointer-events", m.saved.csspointerevents), 3 != m.rail.drag.pt) return;
              return m.rail.drag = !1, m.cancelEvent(e);
            }
          }, m.ontouchmoveCursor = function (e) {
            if (m.rail.drag) {
              if (3 != m.rail.drag.pt) return;

              if (m.cursorfreezed = !0, m.rail.drag.hr) {
                m.scroll.x = m.rail.drag.sx + (e.touches[0].clientX - m.rail.drag.x), m.scroll.x < 0 && (m.scroll.x = 0);
                var o = m.scrollvaluemaxw;
                m.scroll.x > o && (m.scroll.x = o);
              } else {
                m.scroll.y = m.rail.drag.sy + (e.touches[0].clientY - m.rail.drag.y), m.scroll.y < 0 && (m.scroll.y = 0);
                var t = m.scrollvaluemax;
                m.scroll.y > t && (m.scroll.y = t);
              }

              return m.synched("touchmove", function () {
                m.rail.drag && 3 == m.rail.drag.pt && (m.showCursor(), m.rail.drag.hr ? m.doScrollLeft(Math.round(m.scroll.x * m.scrollratio.x), g.cursordragspeed) : m.doScrollTop(Math.round(m.scroll.y * m.scrollratio.y), g.cursordragspeed));
              }), m.cancelEvent(e);
            }
          };
        }

        if (m.onmousedown = function (e, o) {
          if (!m.rail.drag || 1 == m.rail.drag.pt) {
            if (m.railslocked) return m.cancelEvent(e);
            m.cancelScroll(), m.rail.drag = {
              x: e.clientX,
              y: e.clientY,
              sx: m.scroll.x,
              sy: m.scroll.y,
              pt: 1,
              hr: o || !1
            };
            var t = m.getTarget(e);
            return T.hasmousecapture && t.setCapture(), m.isiframe && !T.hasmousecapture && (m.saved.csspointerevents = m.doc.css("pointer-events"), m.css(m.doc, {
              "pointer-events": "none"
            })), m.hasmoving = !1, m.cancelEvent(e);
          }
        }, m.onmouseup = function (e) {
          if (m.rail.drag) return 1 != m.rail.drag.pt || (T.hasmousecapture && l.releaseCapture(), m.isiframe && !T.hasmousecapture && m.doc.css("pointer-events", m.saved.csspointerevents), m.rail.drag = !1, m.cursorfreezed = !1, m.hasmoving && m.triggerScrollEnd(), m.cancelEvent(e));
        }, m.onmousemove = function (e) {
          if (m.rail.drag) {
            if (1 !== m.rail.drag.pt) return;
            if (T.ischrome && 0 === e.which) return m.onmouseup(e);

            if (m.cursorfreezed = !0, m.hasmoving || m.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), m.hasmoving = !0, m.rail.drag.hr) {
              m.scroll.x = m.rail.drag.sx + (e.clientX - m.rail.drag.x), m.scroll.x < 0 && (m.scroll.x = 0);
              var o = m.scrollvaluemaxw;
              m.scroll.x > o && (m.scroll.x = o);
            } else {
              m.scroll.y = m.rail.drag.sy + (e.clientY - m.rail.drag.y), m.scroll.y < 0 && (m.scroll.y = 0);
              var t = m.scrollvaluemax;
              m.scroll.y > t && (m.scroll.y = t);
            }

            return m.synched("mousemove", function () {
              m.cursorfreezed && (m.showCursor(), m.rail.drag.hr ? m.scrollLeft(Math.round(m.scroll.x * m.scrollratio.x)) : m.scrollTop(Math.round(m.scroll.y * m.scrollratio.y)));
            }), m.cancelEvent(e);
          }

          m.checkarea = 0;
        }, T.cantouch || g.emulatetouch) m.onpreventclick = function (e) {
          if (m.preventclick) return m.preventclick.tg.onclick = m.preventclick.click, m.preventclick = !1, m.cancelEvent(e);
        }, m.onclick = !T.isios && function (e) {
          return !m.lastmouseup || (m.lastmouseup = !1, m.cancelEvent(e));
        }, g.grabcursorenabled && T.cursorgrabvalue && (m.css(m.ispage ? m.doc : m.win, {
          cursor: T.cursorgrabvalue
        }), m.css(m.rail, {
          cursor: T.cursorgrabvalue
        }));else {
          var L = function L(e) {
            if (m.selectiondrag) {
              if (e) {
                var o = m.win.outerHeight(),
                    t = e.pageY - m.selectiondrag.top;
                t > 0 && t < o && (t = 0), t >= o && (t -= o), m.selectiondrag.df = t;
              }

              if (0 !== m.selectiondrag.df) {
                var r = -2 * m.selectiondrag.df / 6 | 0;
                m.doScrollBy(r), m.debounced("doselectionscroll", function () {
                  L();
                }, 50);
              }
            }
          };

          m.hasTextSelected = "getSelection" in l ? function () {
            return l.getSelection().rangeCount > 0;
          } : "selection" in l ? function () {
            return "None" != l.selection.type;
          } : function () {
            return !1;
          }, m.onselectionstart = function (e) {
            m.ispage || (m.selectiondrag = m.win.offset());
          }, m.onselectionend = function (e) {
            m.selectiondrag = !1;
          }, m.onselectiondrag = function (e) {
            m.selectiondrag && m.hasTextSelected() && m.debounced("selectionscroll", function () {
              L(e);
            }, 250);
          };
        }

        if (T.hasw3ctouch ? (m.css(m.ispage ? n("html") : m.win, {
          "touch-action": "none"
        }), m.css(m.rail, {
          "touch-action": "none"
        }), m.css(m.cursor, {
          "touch-action": "none"
        }), m.bind(m.win, "pointerdown", m.ontouchstart), m.bind(l, "pointerup", m.ontouchend), m.delegate(l, "pointermove", m.ontouchmove)) : T.hasmstouch ? (m.css(m.ispage ? n("html") : m.win, {
          "-ms-touch-action": "none"
        }), m.css(m.rail, {
          "-ms-touch-action": "none"
        }), m.css(m.cursor, {
          "-ms-touch-action": "none"
        }), m.bind(m.win, "MSPointerDown", m.ontouchstart), m.bind(l, "MSPointerUp", m.ontouchend), m.delegate(l, "MSPointerMove", m.ontouchmove), m.bind(m.cursor, "MSGestureHold", function (e) {
          e.preventDefault();
        }), m.bind(m.cursor, "contextmenu", function (e) {
          e.preventDefault();
        })) : T.cantouch && (m.bind(m.win, "touchstart", m.ontouchstart, !1, !0), m.bind(l, "touchend", m.ontouchend, !1, !0), m.bind(l, "touchcancel", m.ontouchend, !1, !0), m.delegate(l, "touchmove", m.ontouchmove, !1, !0)), g.emulatetouch && (m.bind(m.win, "mousedown", m.ontouchstart, !1, !0), m.bind(l, "mouseup", m.ontouchend, !1, !0), m.bind(l, "mousemove", m.ontouchmove, !1, !0)), (g.cursordragontouch || !T.cantouch && !g.emulatetouch) && (m.rail.css({
          cursor: "default"
        }), m.railh && m.railh.css({
          cursor: "default"
        }), m.jqbind(m.rail, "mouseenter", function () {
          if (!m.ispage && !m.win.is(":visible")) return !1;
          m.canshowonmouseevent && m.showCursor(), m.rail.active = !0;
        }), m.jqbind(m.rail, "mouseleave", function () {
          m.rail.active = !1, m.rail.drag || m.hideCursor();
        }), g.sensitiverail && (m.bind(m.rail, "click", function (e) {
          m.doRailClick(e, !1, !1);
        }), m.bind(m.rail, "dblclick", function (e) {
          m.doRailClick(e, !0, !1);
        }), m.bind(m.cursor, "click", function (e) {
          m.cancelEvent(e);
        }), m.bind(m.cursor, "dblclick", function (e) {
          m.cancelEvent(e);
        })), m.railh && (m.jqbind(m.railh, "mouseenter", function () {
          if (!m.ispage && !m.win.is(":visible")) return !1;
          m.canshowonmouseevent && m.showCursor(), m.rail.active = !0;
        }), m.jqbind(m.railh, "mouseleave", function () {
          m.rail.active = !1, m.rail.drag || m.hideCursor();
        }), g.sensitiverail && (m.bind(m.railh, "click", function (e) {
          m.doRailClick(e, !1, !0);
        }), m.bind(m.railh, "dblclick", function (e) {
          m.doRailClick(e, !0, !0);
        }), m.bind(m.cursorh, "click", function (e) {
          m.cancelEvent(e);
        }), m.bind(m.cursorh, "dblclick", function (e) {
          m.cancelEvent(e);
        })))), g.cursordragontouch && (this.istouchcapable || T.cantouch) && (m.bind(m.cursor, "touchstart", m.ontouchstartCursor), m.bind(m.cursor, "touchmove", m.ontouchmoveCursor), m.bind(m.cursor, "touchend", m.ontouchendCursor), m.cursorh && m.bind(m.cursorh, "touchstart", function (e) {
          m.ontouchstartCursor(e, !0);
        }), m.cursorh && m.bind(m.cursorh, "touchmove", m.ontouchmoveCursor), m.cursorh && m.bind(m.cursorh, "touchend", m.ontouchendCursor)), g.emulatetouch || T.isandroid || T.isios ? (m.bind(T.hasmousecapture ? m.win : l, "mouseup", m.ontouchend), m.onclick && m.bind(l, "click", m.onclick), g.cursordragontouch ? (m.bind(m.cursor, "mousedown", m.onmousedown), m.bind(m.cursor, "mouseup", m.onmouseup), m.cursorh && m.bind(m.cursorh, "mousedown", function (e) {
          m.onmousedown(e, !0);
        }), m.cursorh && m.bind(m.cursorh, "mouseup", m.onmouseup)) : (m.bind(m.rail, "mousedown", function (e) {
          e.preventDefault();
        }), m.railh && m.bind(m.railh, "mousedown", function (e) {
          e.preventDefault();
        }))) : (m.bind(T.hasmousecapture ? m.win : l, "mouseup", m.onmouseup), m.bind(l, "mousemove", m.onmousemove), m.onclick && m.bind(l, "click", m.onclick), m.bind(m.cursor, "mousedown", m.onmousedown), m.bind(m.cursor, "mouseup", m.onmouseup), m.railh && (m.bind(m.cursorh, "mousedown", function (e) {
          m.onmousedown(e, !0);
        }), m.bind(m.cursorh, "mouseup", m.onmouseup)), !m.ispage && g.enablescrollonselection && (m.bind(m.win[0], "mousedown", m.onselectionstart), m.bind(l, "mouseup", m.onselectionend), m.bind(m.cursor, "mouseup", m.onselectionend), m.cursorh && m.bind(m.cursorh, "mouseup", m.onselectionend), m.bind(l, "mousemove", m.onselectiondrag)), m.zoom && (m.jqbind(m.zoom, "mouseenter", function () {
          m.canshowonmouseevent && m.showCursor(), m.rail.active = !0;
        }), m.jqbind(m.zoom, "mouseleave", function () {
          m.rail.active = !1, m.rail.drag || m.hideCursor();
        }))), g.enablemousewheel && (m.isiframe || m.mousewheel(T.isie && m.ispage ? l : m.win, m.onmousewheel), m.mousewheel(m.rail, m.onmousewheel), m.railh && m.mousewheel(m.railh, m.onmousewheelhr)), m.ispage || T.cantouch || /HTML|^BODY/.test(m.win[0].nodeName) || (m.win.attr("tabindex") || m.win.attr({
          tabindex: ++r
        }), m.bind(m.win, "focus", function (e) {
          o = m.getTarget(e).id || m.getTarget(e) || !1, m.hasfocus = !0, m.canshowonmouseevent && m.noticeCursor();
        }), m.bind(m.win, "blur", function (e) {
          o = !1, m.hasfocus = !1;
        }), m.bind(m.win, "mouseenter", function (e) {
          t = m.getTarget(e).id || m.getTarget(e) || !1, m.hasmousefocus = !0, m.canshowonmouseevent && m.noticeCursor();
        }), m.bind(m.win, "mouseleave", function (e) {
          t = !1, m.hasmousefocus = !1, m.rail.drag || m.hideCursor();
        })), m.onkeypress = function (e) {
          if (m.railslocked && 0 === m.page.maxh) return !0;
          e = e || a.event;
          var r = m.getTarget(e);
          if (r && /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) && (!(r.getAttribute("type") || r.type || !1) || !/submit|button|cancel/i.tp)) return !0;
          if (n(r).attr("contenteditable")) return !0;

          if (m.hasfocus || m.hasmousefocus && !o || m.ispage && !o && !t) {
            var i = e.keyCode;
            if (m.railslocked && 27 != i) return m.cancelEvent(e);
            var s = e.ctrlKey || !1,
                l = e.shiftKey || !1,
                c = !1;

            switch (i) {
              case 38:
              case 63233:
                m.doScrollBy(72), c = !0;
                break;

              case 40:
              case 63235:
                m.doScrollBy(-72), c = !0;
                break;

              case 37:
              case 63232:
                m.railh && (s ? m.doScrollLeft(0) : m.doScrollLeftBy(72), c = !0);
                break;

              case 39:
              case 63234:
                m.railh && (s ? m.doScrollLeft(m.page.maxw) : m.doScrollLeftBy(-72), c = !0);
                break;

              case 33:
              case 63276:
                m.doScrollBy(m.view.h), c = !0;
                break;

              case 34:
              case 63277:
                m.doScrollBy(-m.view.h), c = !0;
                break;

              case 36:
              case 63273:
                m.railh && s ? m.doScrollPos(0, 0) : m.doScrollTo(0), c = !0;
                break;

              case 35:
              case 63275:
                m.railh && s ? m.doScrollPos(m.page.maxw, m.page.maxh) : m.doScrollTo(m.page.maxh), c = !0;
                break;

              case 32:
                g.spacebarenabled && (l ? m.doScrollBy(m.view.h) : m.doScrollBy(-m.view.h), c = !0);
                break;

              case 27:
                m.zoomactive && (m.doZoom(), c = !0);
            }

            if (c) return m.cancelEvent(e);
          }
        }, g.enablekeyboard && m.bind(l, T.isopera && !T.isopera12 ? "keypress" : "keydown", m.onkeypress), m.bind(l, "keydown", function (e) {
          (e.ctrlKey || !1) && (m.wheelprevented = !0);
        }), m.bind(l, "keyup", function (e) {
          e.ctrlKey || !1 || (m.wheelprevented = !1);
        }), m.bind(a, "blur", function (e) {
          m.wheelprevented = !1;
        }), m.bind(a, "resize", m.onscreenresize), m.bind(a, "orientationchange", m.onscreenresize), m.bind(a, "load", m.lazyResize), T.ischrome && !m.ispage && !m.haswrapper) {
          var C = m.win.attr("style"),
              N = parseFloat(m.win.css("width")) + 1;
          m.win.css("width", N), m.synched("chromefix", function () {
            m.win.attr("style", C);
          });
        }

        if (m.onAttributeChange = function (e) {
          m.lazyResize(m.isieold ? 250 : 30);
        }, g.enableobserver && (m.isie11 || !1 === v || (m.observerbody = new v(function (e) {
          if (e.forEach(function (e) {
            if ("attributes" == e.type) return f.hasClass("modal-open") && f.hasClass("modal-dialog") && !n.contains(n(".modal-dialog")[0], m.doc[0]) ? m.hide() : m.show();
          }), m.me.clientWidth != m.page.width || m.me.clientHeight != m.page.height) return m.lazyResize(30);
        }), m.observerbody.observe(l.body, {
          childList: !0,
          subtree: !0,
          characterData: !1,
          attributes: !0,
          attributeFilter: ["class"]
        })), !m.ispage && !m.haswrapper)) {
          var P = m.win[0];
          !1 !== v ? (m.observer = new v(function (e) {
            e.forEach(m.onAttributeChange);
          }), m.observer.observe(P, {
            childList: !0,
            characterData: !1,
            attributes: !0,
            subtree: !1
          }), m.observerremover = new v(function (e) {
            e.forEach(function (e) {
              if (e.removedNodes.length > 0) for (var o in e.removedNodes) {
                if (m && e.removedNodes[o] === P) return m.remove();
              }
            });
          }), m.observerremover.observe(P.parentNode, {
            childList: !0,
            characterData: !1,
            attributes: !1,
            subtree: !1
          })) : (m.bind(P, T.isie && !T.isie9 ? "propertychange" : "DOMAttrModified", m.onAttributeChange), T.isie9 && P.attachEvent("onpropertychange", m.onAttributeChange), m.bind(P, "DOMNodeRemoved", function (e) {
            e.target === P && m.remove();
          }));
        }

        !m.ispage && g.boxzoom && m.bind(a, "resize", m.resizeZoom), m.istextarea && (m.bind(m.win, "keydown", m.lazyResize), m.bind(m.win, "mouseup", m.lazyResize)), m.lazyResize(30);
      }

      if ("IFRAME" == this.doc[0].nodeName) {
        var R = function R() {
          var o;
          m.iframexd = !1;

          try {
            (o = "contentDocument" in this ? this.contentDocument : this.contentWindow._doc).domain;
          } catch (e) {
            m.iframexd = !0, o = !1;
          }

          if (m.iframexd) return "console" in a && console.log("NiceScroll error: policy restriced iframe"), !0;

          if (m.forcescreen = !0, m.isiframe && (m.iframe = {
            doc: n(o),
            html: m.doc.contents().find("html")[0],
            body: m.doc.contents().find("body")[0]
          }, m.getContentSize = function () {
            return {
              w: Math.max(m.iframe.html.scrollWidth, m.iframe.body.scrollWidth),
              h: Math.max(m.iframe.html.scrollHeight, m.iframe.body.scrollHeight)
            };
          }, m.docscroll = n(m.iframe.body)), !T.isios && g.iframeautoresize && !m.isiframe) {
            m.win.scrollTop(0), m.doc.height("");
            var t = Math.max(o.getElementsByTagName("html")[0].scrollHeight, o.body.scrollHeight);
            m.doc.height(t);
          }

          m.lazyResize(30), m.css(n(m.iframe.body), e), T.isios && m.haswrapper && m.css(n(o.body), {
            "-webkit-transform": "translate3d(0,0,0)"
          }), "contentWindow" in this ? m.bind(this.contentWindow, "scroll", m.onscroll) : m.bind(o, "scroll", m.onscroll), g.enablemousewheel && m.mousewheel(o, m.onmousewheel), g.enablekeyboard && m.bind(o, T.isopera ? "keypress" : "keydown", m.onkeypress), T.cantouch ? (m.bind(o, "touchstart", m.ontouchstart), m.bind(o, "touchmove", m.ontouchmove)) : g.emulatetouch && (m.bind(o, "mousedown", m.ontouchstart), m.bind(o, "mousemove", function (e) {
            return m.ontouchmove(e, !0);
          }), g.grabcursorenabled && T.cursorgrabvalue && m.css(n(o.body), {
            cursor: T.cursorgrabvalue
          })), m.bind(o, "mouseup", m.ontouchend), m.zoom && (g.dblclickzoom && m.bind(o, "dblclick", m.doZoom), m.ongesturezoom && m.bind(o, "gestureend", m.ongesturezoom));
        };

        this.doc[0].readyState && "complete" === this.doc[0].readyState && setTimeout(function () {
          R.call(m.doc[0], !1);
        }, 500), m.bind(this.doc, "load", R);
      }
    }, this.showCursor = function (e, o) {
      if (m.cursortimeout && (clearTimeout(m.cursortimeout), m.cursortimeout = 0), m.rail) {
        if (m.autohidedom && (m.autohidedom.stop().css({
          opacity: g.cursoropacitymax
        }), m.cursoractive = !0), m.rail.drag && 1 == m.rail.drag.pt || (void 0 !== e && !1 !== e && (m.scroll.y = e / m.scrollratio.y | 0), void 0 !== o && (m.scroll.x = o / m.scrollratio.x | 0)), m.cursor.css({
          height: m.cursorheight,
          top: m.scroll.y
        }), m.cursorh) {
          var t = m.hasreversehr ? m.scrollvaluemaxw - m.scroll.x : m.scroll.x;
          m.cursorh.css({
            width: m.cursorwidth,
            left: !m.rail.align && m.rail.visibility ? t + m.rail.width : t
          }), m.cursoractive = !0;
        }

        m.zoom && m.zoom.stop().css({
          opacity: g.cursoropacitymax
        });
      }
    }, this.hideCursor = function (e) {
      m.cursortimeout || m.rail && m.autohidedom && (m.hasmousefocus && "leave" === g.autohidemode || (m.cursortimeout = setTimeout(function () {
        m.rail.active && m.showonmouseevent || (m.autohidedom.stop().animate({
          opacity: g.cursoropacitymin
        }), m.zoom && m.zoom.stop().animate({
          opacity: g.cursoropacitymin
        }), m.cursoractive = !1), m.cursortimeout = 0;
      }, e || g.hidecursordelay)));
    }, this.noticeCursor = function (e, o, t) {
      m.showCursor(o, t), m.rail.active || m.hideCursor(e);
    }, this.getContentSize = m.ispage ? function () {
      return {
        w: Math.max(l.body.scrollWidth, l.documentElement.scrollWidth),
        h: Math.max(l.body.scrollHeight, l.documentElement.scrollHeight)
      };
    } : m.haswrapper ? function () {
      return {
        w: m.doc[0].offsetWidth,
        h: m.doc[0].offsetHeight
      };
    } : function () {
      return {
        w: m.docscroll[0].scrollWidth,
        h: m.docscroll[0].scrollHeight
      };
    }, this.onResize = function (e, o) {
      if (!m || !m.win) return !1;
      var t = m.page.maxh,
          r = m.page.maxw,
          i = m.view.h,
          s = m.view.w;

      if (m.view = {
        w: m.ispage ? m.win.width() : m.win[0].clientWidth,
        h: m.ispage ? m.win.height() : m.win[0].clientHeight
      }, m.page = o || m.getContentSize(), m.page.maxh = Math.max(0, m.page.h - m.view.h), m.page.maxw = Math.max(0, m.page.w - m.view.w), m.page.maxh == t && m.page.maxw == r && m.view.w == s && m.view.h == i) {
        if (m.ispage) return m;
        var n = m.win.offset();

        if (m.lastposition) {
          var l = m.lastposition;
          if (l.top == n.top && l.left == n.left) return m;
        }

        m.lastposition = n;
      }

      return 0 === m.page.maxh ? (m.hideRail(), m.scrollvaluemax = 0, m.scroll.y = 0, m.scrollratio.y = 0, m.cursorheight = 0, m.setScrollTop(0), m.rail && (m.rail.scrollable = !1)) : (m.page.maxh -= g.railpadding.top + g.railpadding.bottom, m.rail.scrollable = !0), 0 === m.page.maxw ? (m.hideRailHr(), m.scrollvaluemaxw = 0, m.scroll.x = 0, m.scrollratio.x = 0, m.cursorwidth = 0, m.setScrollLeft(0), m.railh && (m.railh.scrollable = !1)) : (m.page.maxw -= g.railpadding.left + g.railpadding.right, m.railh && (m.railh.scrollable = g.horizrailenabled)), m.railslocked = m.locked || 0 === m.page.maxh && 0 === m.page.maxw, m.railslocked ? (m.ispage || m.updateScrollBar(m.view), !1) : (m.hidden || (m.rail.visibility || m.showRail(), m.railh && !m.railh.visibility && m.showRailHr()), m.istextarea && m.win.css("resize") && "none" != m.win.css("resize") && (m.view.h -= 20), m.cursorheight = Math.min(m.view.h, Math.round(m.view.h * (m.view.h / m.page.h))), m.cursorheight = g.cursorfixedheight ? g.cursorfixedheight : Math.max(g.cursorminheight, m.cursorheight), m.cursorwidth = Math.min(m.view.w, Math.round(m.view.w * (m.view.w / m.page.w))), m.cursorwidth = g.cursorfixedheight ? g.cursorfixedheight : Math.max(g.cursorminheight, m.cursorwidth), m.scrollvaluemax = m.view.h - m.cursorheight - (g.railpadding.top + g.railpadding.bottom), m.hasborderbox || (m.scrollvaluemax -= m.cursor[0].offsetHeight - m.cursor[0].clientHeight), m.railh && (m.railh.width = m.page.maxh > 0 ? m.view.w - m.rail.width : m.view.w, m.scrollvaluemaxw = m.railh.width - m.cursorwidth - (g.railpadding.left + g.railpadding.right)), m.ispage || m.updateScrollBar(m.view), m.scrollratio = {
        x: m.page.maxw / m.scrollvaluemaxw,
        y: m.page.maxh / m.scrollvaluemax
      }, m.getScrollTop() > m.page.maxh ? m.doScrollTop(m.page.maxh) : (m.scroll.y = m.getScrollTop() / m.scrollratio.y | 0, m.scroll.x = m.getScrollLeft() / m.scrollratio.x | 0, m.cursoractive && m.noticeCursor()), m.scroll.y && 0 === m.getScrollTop() && m.doScrollTo(m.scroll.y * m.scrollratio.y | 0), m);
    }, this.resize = m.onResize;
    var P = 0;

    function R(e, o, t, r) {
      m._bind(e, o, function (r) {
        var i = {
          original: r = r || a.event,
          target: r.target || r.srcElement,
          type: "wheel",
          deltaMode: "MozMousePixelScroll" == r.type ? 0 : 1,
          deltaX: 0,
          deltaZ: 0,
          preventDefault: function preventDefault() {
            return r.preventDefault ? r.preventDefault() : r.returnValue = !1, !1;
          },
          stopImmediatePropagation: function stopImmediatePropagation() {
            r.stopImmediatePropagation ? r.stopImmediatePropagation() : r.cancelBubble = !0;
          }
        };
        return "mousewheel" == o ? (r.wheelDeltaX && (i.deltaX = -.025 * r.wheelDeltaX), r.wheelDeltaY && (i.deltaY = -.025 * r.wheelDeltaY), !i.deltaY && !i.deltaX && (i.deltaY = -.025 * r.wheelDelta)) : i.deltaY = r.detail, t.call(e, i);
      }, r);
    }

    this.onscreenresize = function (e) {
      clearTimeout(P);
      var o = !m.ispage && !m.haswrapper;
      o && m.hideRails(), P = setTimeout(function () {
        m && (o && m.showRails(), m.resize()), P = 0;
      }, 120);
    }, this.lazyResize = function (e) {
      return clearTimeout(P), e = isNaN(e) ? 240 : e, P = setTimeout(function () {
        m && m.resize(), P = 0;
      }, e), m;
    }, this.jqbind = function (e, o, t) {
      m.events.push({
        e: e,
        n: o,
        f: t,
        q: !0
      }), n(e).on(o, t);
    }, this.mousewheel = function (e, o, t) {
      var r = "jquery" in e ? e[0] : e;
      if ("onwheel" in l.createElement("div")) m._bind(r, "wheel", o, t || !1);else {
        var i = void 0 !== l.onmousewheel ? "mousewheel" : "DOMMouseScroll";
        R(r, i, o, t || !1), "DOMMouseScroll" == i && R(r, "MozMousePixelScroll", o, t || !1);
      }
    };

    var _ = !1;

    if (T.haseventlistener) {
      try {
        var I = Object.defineProperty({}, "passive", {
          get: function get() {
            _ = !0;
          }
        });
        a.addEventListener("test", null, I);
      } catch (e) {}

      this.stopPropagation = function (e) {
        return !!e && ((e = e.original ? e.original : e).stopPropagation(), !1);
      }, this.cancelEvent = function (e) {
        return e.cancelable && e.preventDefault(), e.stopImmediatePropagation(), e.preventManipulation && e.preventManipulation(), !1;
      };
    } else Event.prototype.preventDefault = function () {
      this.returnValue = !1;
    }, Event.prototype.stopPropagation = function () {
      this.cancelBubble = !0;
    }, a.constructor.prototype.addEventListener = l.constructor.prototype.addEventListener = Element.prototype.addEventListener = function (e, o, t) {
      this.attachEvent("on" + e, o);
    }, a.constructor.prototype.removeEventListener = l.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function (e, o, t) {
      this.detachEvent("on" + e, o);
    }, this.cancelEvent = function (e) {
      return (e = e || a.event) && (e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1), !1;
    }, this.stopPropagation = function (e) {
      return (e = e || a.event) && (e.cancelBubble = !0), !1;
    };

    this.delegate = function (e, o, t, r, i) {
      var s = d[o] || !1;
      s || (s = {
        a: [],
        l: [],
        f: function f(e) {
          for (var o = s.l, t = !1, r = o.length - 1; r >= 0; r--) {
            if (!1 === (t = o[r].call(e.target, e))) return !1;
          }

          return t;
        }
      }, m.bind(e, o, s.f, r, i), d[o] = s), m.ispage ? (s.a = [m.id].concat(s.a), s.l = [t].concat(s.l)) : (s.a.push(m.id), s.l.push(t));
    }, this.undelegate = function (e, o, t, r, i) {
      var s = d[o] || !1;
      if (s && s.l) for (var n = 0, l = s.l.length; n < l; n++) {
        s.a[n] === m.id && (s.a.splice(n), s.l.splice(n), 0 === s.a.length && (m._unbind(e, o, s.l.f), d[o] = null));
      }
    }, this.bind = function (e, o, t, r, i) {
      var s = "jquery" in e ? e[0] : e;

      m._bind(s, o, t, r || !1, i || !1);
    }, this._bind = function (e, o, t, r, i) {
      m.events.push({
        e: e,
        n: o,
        f: t,
        b: r,
        q: !1
      }), _ && i ? e.addEventListener(o, t, {
        passive: !1,
        capture: r
      }) : e.addEventListener(o, t, r || !1);
    }, this._unbind = function (e, o, t, r) {
      d[o] ? m.undelegate(e, o, t, r) : e.removeEventListener(o, t, r);
    }, this.unbindAll = function () {
      for (var e = 0; e < m.events.length; e++) {
        var o = m.events[e];
        o.q ? o.e.unbind(o.n, o.f) : m._unbind(o.e, o.n, o.f, o.b);
      }
    }, this.showRails = function () {
      return m.showRail().showRailHr();
    }, this.showRail = function () {
      return 0 === m.page.maxh || !m.ispage && "none" == m.win.css("display") || (m.rail.visibility = !0, m.rail.css("display", "block")), m;
    }, this.showRailHr = function () {
      return m.railh && (0 === m.page.maxw || !m.ispage && "none" == m.win.css("display") || (m.railh.visibility = !0, m.railh.css("display", "block"))), m;
    }, this.hideRails = function () {
      return m.hideRail().hideRailHr();
    }, this.hideRail = function () {
      return m.rail.visibility = !1, m.rail.css("display", "none"), m;
    }, this.hideRailHr = function () {
      return m.railh && (m.railh.visibility = !1, m.railh.css("display", "none")), m;
    }, this.show = function () {
      return m.hidden = !1, m.railslocked = !1, m.showRails();
    }, this.hide = function () {
      return m.hidden = !0, m.railslocked = !0, m.hideRails();
    }, this.toggle = function () {
      return m.hidden ? m.show() : m.hide();
    }, this.remove = function () {
      for (var e in m.stop(), m.cursortimeout && clearTimeout(m.cursortimeout), m.delaylist) {
        m.delaylist[e] && h(m.delaylist[e].h);
      }

      m.doZoomOut(), m.unbindAll(), T.isie9 && m.win[0].detachEvent("onpropertychange", m.onAttributeChange), !1 !== m.observer && m.observer.disconnect(), !1 !== m.observerremover && m.observerremover.disconnect(), !1 !== m.observerbody && m.observerbody.disconnect(), m.events = null, m.cursor && m.cursor.remove(), m.cursorh && m.cursorh.remove(), m.rail && m.rail.remove(), m.railh && m.railh.remove(), m.zoom && m.zoom.remove();

      for (var o = 0; o < m.saved.css.length; o++) {
        var t = m.saved.css[o];
        t[0].css(t[1], void 0 === t[2] ? "" : t[2]);
      }

      m.saved = !1, m.me.data("__nicescroll", "");
      var r = n.nicescroll;

      for (var i in r.each(function (e) {
        if (this && this.id === m.id) {
          delete r[e];

          for (var o = ++e; o < r.length; o++, e++) {
            r[e] = r[o];
          }

          r.length--, r.length && delete r[r.length];
        }
      }), m) {
        m[i] = null, delete m[i];
      }

      m = null;
    }, this.scrollstart = function (e) {
      return this.onscrollstart = e, m;
    }, this.scrollend = function (e) {
      return this.onscrollend = e, m;
    }, this.scrollcancel = function (e) {
      return this.onscrollcancel = e, m;
    }, this.zoomin = function (e) {
      return this.onzoomin = e, m;
    }, this.zoomout = function (e) {
      return this.onzoomout = e, m;
    }, this.isScrollable = function (e) {
      var o = e.target ? e.target : e;
      if ("OPTION" == o.nodeName) return !0;

      for (; o && 1 == o.nodeType && o !== this.me[0] && !/^BODY|HTML/.test(o.nodeName);) {
        var t = n(o),
            r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
        if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight;
        o = !!o.parentNode && o.parentNode;
      }

      return !1;
    }, this.getViewport = function (e) {
      for (var o = !(!e || !e.parentNode) && e.parentNode; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
        var t = n(o);
        if (/fixed|absolute/.test(t.css("position"))) return t;
        var r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
        if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight) return t;
        if (t.getNiceScroll().length > 0) return t;
        o = !!o.parentNode && o.parentNode;
      }

      return !1;
    }, this.triggerScrollStart = function (e, o, t, r, i) {
      if (m.onscrollstart) {
        var s = {
          type: "scrollstart",
          current: {
            x: e,
            y: o
          },
          request: {
            x: t,
            y: r
          },
          end: {
            x: m.newscrollx,
            y: m.newscrolly
          },
          speed: i
        };
        m.onscrollstart.call(m, s);
      }
    }, this.triggerScrollEnd = function () {
      if (m.onscrollend) {
        var e = m.getScrollLeft(),
            o = m.getScrollTop(),
            t = {
          type: "scrollend",
          current: {
            x: e,
            y: o
          },
          end: {
            x: e,
            y: o
          }
        };
        m.onscrollend.call(m, t);
      }
    };
    var O = 0,
        Y = 0,
        H = 0,
        B = 1;

    function X(e, o, t, r) {
      m.scrollrunning || (m.newscrolly = m.getScrollTop(), m.newscrollx = m.getScrollLeft(), H = w());
      var i = w() - H;

      if (H = w(), i > 350 ? B = 1 : B += (2 - B) / 10, o = o * B | 0, e = e * B | 0) {
        if (r) if (e < 0) {
          if (m.getScrollLeft() >= m.page.maxw) return !0;
        } else if (m.getScrollLeft() <= 0) return !0;
        var s = e > 0 ? 1 : -1;
        Y !== s && (m.scrollmom && m.scrollmom.stop(), m.newscrollx = m.getScrollLeft(), Y = s), m.lastdeltax -= e;
      }

      if (o) {
        if (function () {
          var e = m.getScrollTop();

          if (o < 0) {
            if (e >= m.page.maxh) return !0;
          } else if (e <= 0) return !0;
        }()) {
          if (g.nativeparentscrolling && t && !m.ispage && !m.zoomactive) return !0;
          var n = m.view.h >> 1;
          m.newscrolly < -n ? (m.newscrolly = -n, o = -1) : m.newscrolly > m.page.maxh + n ? (m.newscrolly = m.page.maxh + n, o = 1) : o = 0;
        }

        var l = o > 0 ? 1 : -1;
        O !== l && (m.scrollmom && m.scrollmom.stop(), m.newscrolly = m.getScrollTop(), O = l), m.lastdeltay -= o;
      }

      (o || e) && m.synched("relativexy", function () {
        var e = m.lastdeltay + m.newscrolly;
        m.lastdeltay = 0;
        var o = m.lastdeltax + m.newscrollx;
        m.lastdeltax = 0, m.rail.drag || m.doScrollPos(o, e);
      });
    }

    var D = !1;

    function A(e, o, t) {
      var r, i;
      if (!t && D) return !0;
      (0 === e.deltaMode ? (r = -e.deltaX * (g.mousescrollstep / 54) | 0, i = -e.deltaY * (g.mousescrollstep / 54) | 0) : 1 === e.deltaMode && (r = -e.deltaX * g.mousescrollstep * 50 / 80 | 0, i = -e.deltaY * g.mousescrollstep * 50 / 80 | 0), o && g.oneaxismousemode && 0 === r && i) && (r = i, i = 0, t && (r < 0 ? m.getScrollLeft() >= m.page.maxw : m.getScrollLeft() <= 0) && (i = r, r = 0));
      if (m.isrtlmode && (r = -r), !X(r, i, t, !0)) return D = !1, e.stopImmediatePropagation(), e.preventDefault();
      t && (D = !0);
    }

    if (this.onmousewheel = function (e) {
      if (m.wheelprevented || m.locked) return !1;
      if (m.railslocked) return m.debounced("checkunlock", m.resize, 250), !1;
      if (m.rail.drag) return m.cancelEvent(e);
      if ("auto" === g.oneaxismousemode && 0 !== e.deltaX && (g.oneaxismousemode = !1), g.oneaxismousemode && 0 === e.deltaX && !m.rail.scrollable) return !m.railh || !m.railh.scrollable || m.onmousewheelhr(e);
      var o = w(),
          t = !1;
      if (g.preservenativescrolling && m.checkarea + 600 < o && (m.nativescrollingarea = m.isScrollable(e), t = !0), m.checkarea = o, m.nativescrollingarea) return !0;
      var r = A(e, !1, t);
      return r && (m.checkarea = 0), r;
    }, this.onmousewheelhr = function (e) {
      if (!m.wheelprevented) {
        if (m.railslocked || !m.railh.scrollable) return !0;
        if (m.rail.drag) return m.cancelEvent(e);
        var o = w(),
            t = !1;
        return g.preservenativescrolling && m.checkarea + 600 < o && (m.nativescrollingarea = m.isScrollable(e), t = !0), m.checkarea = o, !!m.nativescrollingarea || (m.railslocked ? m.cancelEvent(e) : A(e, !0, t));
      }
    }, this.stop = function () {
      return m.cancelScroll(), m.scrollmon && m.scrollmon.stop(), m.cursorfreezed = !1, m.scroll.y = Math.round(m.getScrollTop() * (1 / m.scrollratio.y)), m.noticeCursor(), m;
    }, this.getTransitionSpeed = function (e) {
      return 80 + e / 72 * g.scrollspeed | 0;
    }, g.smoothscroll) {
      if (m.ishwscroll && T.hastransition && g.usetransition && g.smoothscroll) {
        var q = "";
        this.resetTransition = function () {
          q = "", m.doc.css(T.prefixstyle + "transition-duration", "0ms");
        }, this.prepareTransition = function (e, o) {
          var t = o ? e : m.getTransitionSpeed(e),
              r = t + "ms";
          return q !== r && (q = r, m.doc.css(T.prefixstyle + "transition-duration", r)), t;
        }, this.doScrollLeft = function (e, o) {
          var t = m.scrollrunning ? m.newscrolly : m.getScrollTop();
          m.doScrollPos(e, t, o);
        }, this.doScrollTop = function (e, o) {
          var t = m.scrollrunning ? m.newscrollx : m.getScrollLeft();
          m.doScrollPos(t, e, o);
        }, this.cursorupdate = {
          running: !1,
          start: function start() {
            var e = this;

            if (!e.running) {
              e.running = !0;

              var o = function o() {
                e.running && u(o), m.showCursor(m.getScrollTop(), m.getScrollLeft()), m.notifyScrollEvent(m.win[0]);
              };

              u(o);
            }
          },
          stop: function stop() {
            this.running = !1;
          }
        }, this.doScrollPos = function (e, o, t) {
          var r = m.getScrollTop(),
              i = m.getScrollLeft();
          if (((m.newscrolly - r) * (o - r) < 0 || (m.newscrollx - i) * (e - i) < 0) && m.cancelScroll(), g.bouncescroll ? (o < 0 ? o = o / 2 | 0 : o > m.page.maxh && (o = m.page.maxh + (o - m.page.maxh) / 2 | 0), e < 0 ? e = e / 2 | 0 : e > m.page.maxw && (e = m.page.maxw + (e - m.page.maxw) / 2 | 0)) : (o < 0 ? o = 0 : o > m.page.maxh && (o = m.page.maxh), e < 0 ? e = 0 : e > m.page.maxw && (e = m.page.maxw)), m.scrollrunning && e == m.newscrollx && o == m.newscrolly) return !1;
          m.newscrolly = o, m.newscrollx = e;
          var s = m.getScrollTop(),
              n = m.getScrollLeft(),
              l = {};
          l.x = e - n, l.y = o - s;
          var a = 0 | Math.sqrt(l.x * l.x + l.y * l.y),
              c = m.prepareTransition(a);
          m.scrollrunning || (m.scrollrunning = !0, m.triggerScrollStart(n, s, e, o, c), m.cursorupdate.start()), m.scrollendtrapped = !0, T.transitionend || (m.scrollendtrapped && clearTimeout(m.scrollendtrapped), m.scrollendtrapped = setTimeout(m.onScrollTransitionEnd, c)), m.setScrollTop(m.newscrolly), m.setScrollLeft(m.newscrollx);
        }, this.cancelScroll = function () {
          if (!m.scrollendtrapped) return !0;
          var e = m.getScrollTop(),
              o = m.getScrollLeft();
          return m.scrollrunning = !1, T.transitionend || clearTimeout(T.transitionend), m.scrollendtrapped = !1, m.resetTransition(), m.setScrollTop(e), m.railh && m.setScrollLeft(o), m.timerscroll && m.timerscroll.tm && clearInterval(m.timerscroll.tm), m.timerscroll = !1, m.cursorfreezed = !1, m.cursorupdate.stop(), m.showCursor(e, o), m;
        }, this.onScrollTransitionEnd = function () {
          if (m.scrollendtrapped) {
            var e = m.getScrollTop(),
                o = m.getScrollLeft();
            if (e < 0 ? e = 0 : e > m.page.maxh && (e = m.page.maxh), o < 0 ? o = 0 : o > m.page.maxw && (o = m.page.maxw), e != m.newscrolly || o != m.newscrollx) return m.doScrollPos(o, e, g.snapbackspeed);
            m.scrollrunning && m.triggerScrollEnd(), m.scrollrunning = !1, m.scrollendtrapped = !1, m.resetTransition(), m.timerscroll = !1, m.setScrollTop(e), m.railh && m.setScrollLeft(o), m.cursorupdate.stop(), m.noticeCursor(!1, e, o), m.cursorfreezed = !1;
          }
        };
      } else this.doScrollLeft = function (e, o) {
        var t = m.scrollrunning ? m.newscrolly : m.getScrollTop();
        m.doScrollPos(e, t, o);
      }, this.doScrollTop = function (e, o) {
        var t = m.scrollrunning ? m.newscrollx : m.getScrollLeft();
        m.doScrollPos(t, e, o);
      }, this.doScrollPos = function (e, o, t) {
        var r = m.getScrollTop(),
            i = m.getScrollLeft();
        ((m.newscrolly - r) * (o - r) < 0 || (m.newscrollx - i) * (e - i) < 0) && m.cancelScroll();
        var s = !1;
        if (m.bouncescroll && m.rail.visibility || (o < 0 ? (o = 0, s = !0) : o > m.page.maxh && (o = m.page.maxh, s = !0)), m.bouncescroll && m.railh.visibility || (e < 0 ? (e = 0, s = !0) : e > m.page.maxw && (e = m.page.maxw, s = !0)), m.scrollrunning && m.newscrolly === o && m.newscrollx === e) return !0;
        m.newscrolly = o, m.newscrollx = e, m.dst = {}, m.dst.x = e - i, m.dst.y = o - r, m.dst.px = i, m.dst.py = r;
        var n = 0 | Math.sqrt(m.dst.x * m.dst.x + m.dst.y * m.dst.y),
            l = m.getTransitionSpeed(n);
        m.bzscroll = {};
        var a = s ? 1 : .58;
        m.bzscroll.x = new E(i, m.newscrollx, l, 0, 0, a, 1), m.bzscroll.y = new E(r, m.newscrolly, l, 0, 0, a, 1);
        w();

        var c = function c() {
          if (m.scrollrunning) {
            var e = m.bzscroll.y.getPos();
            m.setScrollLeft(m.bzscroll.x.getNow()), m.setScrollTop(m.bzscroll.y.getNow()), e <= 1 ? m.timer = u(c) : (m.scrollrunning = !1, m.timer = 0, m.triggerScrollEnd());
          }
        };

        m.scrollrunning || (m.triggerScrollStart(i, r, e, o, l), m.scrollrunning = !0, m.timer = u(c));
      }, this.cancelScroll = function () {
        return m.timer && h(m.timer), m.timer = 0, m.bzscroll = !1, m.scrollrunning = !1, m;
      };
    } else this.doScrollLeft = function (e, o) {
      var t = m.getScrollTop();
      m.doScrollPos(e, t, o);
    }, this.doScrollTop = function (e, o) {
      var t = m.getScrollLeft();
      m.doScrollPos(t, e, o);
    }, this.doScrollPos = function (e, o, t) {
      var r = e > m.page.maxw ? m.page.maxw : e;
      r < 0 && (r = 0);
      var i = o > m.page.maxh ? m.page.maxh : o;
      i < 0 && (i = 0), m.synched("scroll", function () {
        m.setScrollTop(i), m.setScrollLeft(r);
      });
    }, this.cancelScroll = function () {};
    this.doScrollBy = function (e, o) {
      X(0, e);
    }, this.doScrollLeftBy = function (e, o) {
      X(e, 0);
    }, this.doScrollTo = function (e, o) {
      var t = o ? Math.round(e * m.scrollratio.y) : e;
      t < 0 ? t = 0 : t > m.page.maxh && (t = m.page.maxh), m.cursorfreezed = !1, m.doScrollTop(e);
    }, this.checkContentSize = function () {
      var e = m.getContentSize();
      e.h == m.page.h && e.w == m.page.w || m.resize(!1, e);
    }, m.onscroll = function (e) {
      m.rail.drag || m.cursorfreezed || m.synched("scroll", function () {
        m.scroll.y = Math.round(m.getScrollTop() / m.scrollratio.y), m.railh && (m.scroll.x = Math.round(m.getScrollLeft() / m.scrollratio.x)), m.noticeCursor();
      });
    }, m.bind(m.docscroll, "scroll", m.onscroll), this.doZoomIn = function (e) {
      if (!m.zoomactive) {
        m.zoomactive = !0, m.zoomrestore = {
          style: {}
        };
        var o = ["position", "top", "left", "zIndex", "backgroundColor", "marginTop", "marginBottom", "marginLeft", "marginRight"],
            t = m.win[0].style;

        for (var r in o) {
          var i = o[r];
          m.zoomrestore.style[i] = void 0 !== t[i] ? t[i] : "";
        }

        m.zoomrestore.style.width = m.win.css("width"), m.zoomrestore.style.height = m.win.css("height"), m.zoomrestore.padding = {
          w: m.win.outerWidth() - m.win.width(),
          h: m.win.outerHeight() - m.win.height()
        }, T.isios4 && (m.zoomrestore.scrollTop = c.scrollTop(), c.scrollTop(0)), m.win.css({
          position: T.isios4 ? "absolute" : "fixed",
          top: 0,
          left: 0,
          zIndex: s + 100,
          margin: 0
        });
        var n = m.win.css("backgroundColor");
        return ("" === n || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) && m.win.css("backgroundColor", "#fff"), m.rail.css({
          zIndex: s + 101
        }), m.zoom.css({
          zIndex: s + 102
        }), m.zoom.css("backgroundPosition", "0 -18px"), m.resizeZoom(), m.onzoomin && m.onzoomin.call(m), m.cancelEvent(e);
      }
    }, this.doZoomOut = function (e) {
      if (m.zoomactive) return m.zoomactive = !1, m.win.css("margin", ""), m.win.css(m.zoomrestore.style), T.isios4 && c.scrollTop(m.zoomrestore.scrollTop), m.rail.css({
        "z-index": m.zindex
      }), m.zoom.css({
        "z-index": m.zindex
      }), m.zoomrestore = !1, m.zoom.css("backgroundPosition", "0 0"), m.onResize(), m.onzoomout && m.onzoomout.call(m), m.cancelEvent(e);
    }, this.doZoom = function (e) {
      return m.zoomactive ? m.doZoomOut(e) : m.doZoomIn(e);
    }, this.resizeZoom = function () {
      if (m.zoomactive) {
        var e = m.getScrollTop();
        m.win.css({
          width: c.width() - m.zoomrestore.padding.w + "px",
          height: c.height() - m.zoomrestore.padding.h + "px"
        }), m.onResize(), m.setScrollTop(Math.min(m.page.maxh, e));
      }
    }, this.init(), n.nicescroll.push(this);
  },
      S = function S(e) {
    var o = this;
    this.nc = e, this.lastx = 0, this.lasty = 0, this.speedx = 0, this.speedy = 0, this.lasttime = 0, this.steptime = 0, this.snapx = !1, this.snapy = !1, this.demulx = 0, this.demuly = 0, this.lastscrollx = -1, this.lastscrolly = -1, this.chkx = 0, this.chky = 0, this.timer = 0, this.reset = function (e, t) {
      o.stop(), o.steptime = 0, o.lasttime = w(), o.speedx = 0, o.speedy = 0, o.lastx = e, o.lasty = t, o.lastscrollx = -1, o.lastscrolly = -1;
    }, this.update = function (e, t) {
      var r = w();
      o.steptime = r - o.lasttime, o.lasttime = r;
      var i = t - o.lasty,
          s = e - o.lastx,
          n = o.nc.getScrollTop() + i,
          l = o.nc.getScrollLeft() + s;
      o.snapx = l < 0 || l > o.nc.page.maxw, o.snapy = n < 0 || n > o.nc.page.maxh, o.speedx = s, o.speedy = i, o.lastx = e, o.lasty = t;
    }, this.stop = function () {
      o.nc.unsynched("domomentum2d"), o.timer && clearTimeout(o.timer), o.timer = 0, o.lastscrollx = -1, o.lastscrolly = -1;
    }, this.doSnapy = function (e, t) {
      var r = !1;
      t < 0 ? (t = 0, r = !0) : t > o.nc.page.maxh && (t = o.nc.page.maxh, r = !0), e < 0 ? (e = 0, r = !0) : e > o.nc.page.maxw && (e = o.nc.page.maxw, r = !0), r ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed) : o.nc.triggerScrollEnd();
    }, this.doMomentum = function (e) {
      var t = w(),
          r = e ? t + e : o.lasttime,
          i = o.nc.getScrollLeft(),
          s = o.nc.getScrollTop(),
          n = o.nc.page.maxh,
          l = o.nc.page.maxw;
      o.speedx = l > 0 ? Math.min(60, o.speedx) : 0, o.speedy = n > 0 ? Math.min(60, o.speedy) : 0;
      var a = r && t - r <= 60;
      (s < 0 || s > n || i < 0 || i > l) && (a = !1);
      var c = !(!o.speedy || !a) && o.speedy,
          d = !(!o.speedx || !a) && o.speedx;

      if (c || d) {
        var u = Math.max(16, o.steptime);

        if (u > 50) {
          var h = u / 50;
          o.speedx *= h, o.speedy *= h, u = 50;
        }

        o.demulxy = 0, o.lastscrollx = o.nc.getScrollLeft(), o.chkx = o.lastscrollx, o.lastscrolly = o.nc.getScrollTop(), o.chky = o.lastscrolly;

        var p = o.lastscrollx,
            m = o.lastscrolly,
            f = function f() {
          var e = w() - t > 600 ? .04 : .02;
          o.speedx && (p = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy)), o.lastscrollx = p, (p < 0 || p > l) && (e = .1)), o.speedy && (m = Math.floor(o.lastscrolly - o.speedy * (1 - o.demulxy)), o.lastscrolly = m, (m < 0 || m > n) && (e = .1)), o.demulxy = Math.min(1, o.demulxy + e), o.nc.synched("domomentum2d", function () {
            if (o.speedx) {
              o.nc.getScrollLeft();
              o.chkx = p, o.nc.setScrollLeft(p);
            }

            if (o.speedy) {
              o.nc.getScrollTop();
              o.chky = m, o.nc.setScrollTop(m);
            }

            o.timer || (o.nc.hideCursor(), o.doSnapy(p, m));
          }), o.demulxy < 1 ? o.timer = setTimeout(f, u) : (o.stop(), o.nc.hideCursor(), o.doSnapy(p, m));
        };

        f();
      } else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop());
    };
  },
      z = e.fn.scrollTop;

  e.cssHooks.pageYOffset = {
    get: function get(e, o, t) {
      var r = n.data(e, "__nicescroll") || !1;
      return r && r.ishwscroll ? r.getScrollTop() : z.call(e);
    },
    set: function set(e, o) {
      var t = n.data(e, "__nicescroll") || !1;
      return t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : z.call(e, o), this;
    }
  }, e.fn.scrollTop = function (e) {
    if (void 0 === e) {
      var o = this[0] && n.data(this[0], "__nicescroll") || !1;
      return o && o.ishwscroll ? o.getScrollTop() : z.call(this);
    }

    return this.each(function () {
      var o = n.data(this, "__nicescroll") || !1;
      o && o.ishwscroll ? o.setScrollTop(parseInt(e)) : z.call(n(this), e);
    });
  };
  var k = e.fn.scrollLeft;
  n.cssHooks.pageXOffset = {
    get: function get(e, o, t) {
      var r = n.data(e, "__nicescroll") || !1;
      return r && r.ishwscroll ? r.getScrollLeft() : k.call(e);
    },
    set: function set(e, o) {
      var t = n.data(e, "__nicescroll") || !1;
      return t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : k.call(e, o), this;
    }
  }, e.fn.scrollLeft = function (e) {
    if (void 0 === e) {
      var o = this[0] && n.data(this[0], "__nicescroll") || !1;
      return o && o.ishwscroll ? o.getScrollLeft() : k.call(this);
    }

    return this.each(function () {
      var o = n.data(this, "__nicescroll") || !1;
      o && o.ishwscroll ? o.setScrollLeft(parseInt(e)) : k.call(n(this), e);
    });
  };

  var T = function T(e) {
    var o = this;
    if (this.length = 0, this.name = "nicescrollarray", this.each = function (e) {
      return n.each(o, e), o;
    }, this.push = function (e) {
      o[o.length] = e, o.length++;
    }, this.eq = function (e) {
      return o[e];
    }, e) for (var t = 0; t < e.length; t++) {
      var r = n.data(e[t], "__nicescroll") || !1;
      r && (this[this.length] = r, this.length++);
    }
    return this;
  };

  !function (e, o, t) {
    for (var r = 0, i = o.length; r < i; r++) {
      t(e, o[r]);
    }
  }(T.prototype, ["show", "hide", "toggle", "onResize", "resize", "remove", "stop", "doScrollPos"], function (e, o) {
    e[o] = function () {
      var e = arguments;
      return this.each(function () {
        this[o].apply(this, e);
      });
    };
  }), e.fn.getNiceScroll = function (e) {
    return void 0 === e ? new T(this) : this[e] && n.data(this[e], "__nicescroll") || !1;
  }, (e.expr.pseudos || e.expr[":"]).nicescroll = function (e) {
    return void 0 !== n.data(e, "__nicescroll");
  }, n.fn.niceScroll = function (e, o) {
    void 0 !== o || "object" != _typeof(e) || "jquery" in e || (o = e, e = !1);
    var t = new T();
    return this.each(function () {
      var r = n(this),
          i = n.extend({}, o);

      if (e) {
        var s = n(e);
        i.doc = s.length > 1 ? n(e, r) : s, i.win = r;
      }

      !("doc" in i) || "win" in i || (i.win = r);
      var l = r.data("__nicescroll") || !1;
      l || (i.doc = i.doc || r, l = new x(i, r), r.data("__nicescroll", l)), t.push(l);
    }), 1 === t.length ? t[0] : t;
  }, a.NiceScroll = {
    getjQuery: function getjQuery() {
      return e;
    }
  }, n.nicescroll || (n.nicescroll = new T(), n.nicescroll.options = b);
});