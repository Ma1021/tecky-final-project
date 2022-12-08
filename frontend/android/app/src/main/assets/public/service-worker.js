/*! For license information please see service-worker.js.LICENSE.txt */
!(function () {
  "use strict";
  var e = {
      923: function () {
        try {
          self["workbox:core:5.1.4"] && _();
        } catch (e) {}
      },
      190: function () {
        try {
          self["workbox:expiration:5.1.4"] && _();
        } catch (e) {}
      },
      437: function () {
        try {
          self["workbox:precaching:5.1.4"] && _();
        } catch (e) {}
      },
      185: function () {
        try {
          self["workbox:routing:5.1.4"] && _();
        } catch (e) {}
      },
      833: function () {
        try {
          self["workbox:strategies:5.1.4"] && _();
        } catch (e) {}
      },
    },
    t = {};
  function n(r) {
    var a = t[r];
    if (void 0 !== a) return a.exports;
    var i = (t[r] = { exports: {} });
    return e[r](i, i.exports, n), i.exports;
  }
  !(function () {
    n(923);
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function t(t, n, r) {
      return (
        n && e(t.prototype, n),
        r && e(t, r),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
    }
    function r(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(e, t) {
      return (
        (a = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (e, t) {
              return (e.__proto__ = t), e;
            }),
        a(e, t)
      );
    }
    function i(e, t) {
      if ("function" !== typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, "prototype", { writable: !1 }),
        t && a(e, t);
    }
    function c(e) {
      return (
        (c = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            }),
        c(e)
      );
    }
    function o() {
      if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" === typeof Proxy) return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch (e) {
        return !1;
      }
    }
    function u(e) {
      return (
        (u =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        u(e)
      );
    }
    function s(e, t) {
      if (t && ("object" === u(t) || "function" === typeof t)) return t;
      if (void 0 !== t)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return (function (e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      })(e);
    }
    function f(e) {
      var t = o();
      return function () {
        var n,
          r = c(e);
        if (t) {
          var a = c(this).constructor;
          n = Reflect.construct(r, arguments, a);
        } else n = r.apply(this, arguments);
        return s(this, n);
      };
    }
    function h(e, t, n) {
      return (
        (h = o()
          ? Reflect.construct.bind()
          : function (e, t, n) {
              var r = [null];
              r.push.apply(r, t);
              var i = new (Function.bind.apply(e, r))();
              return n && a(i, n.prototype), i;
            }),
        h.apply(null, arguments)
      );
    }
    function l(e) {
      var t = "function" === typeof Map ? new Map() : void 0;
      return (
        (l = function (e) {
          if (
            null === e ||
            ((n = e), -1 === Function.toString.call(n).indexOf("[native code]"))
          )
            return e;
          var n;
          if ("function" !== typeof e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          if ("undefined" !== typeof t) {
            if (t.has(e)) return t.get(e);
            t.set(e, r);
          }
          function r() {
            return h(e, arguments, c(this).constructor);
          }
          return (
            (r.prototype = Object.create(e.prototype, {
              constructor: {
                value: r,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            a(r, e)
          );
        }),
        l(e)
      );
    }
    var p = function (e) {
        for (
          var t = e,
            n = arguments.length,
            r = new Array(n > 1 ? n - 1 : 0),
            a = 1;
          a < n;
          a++
        )
          r[a - 1] = arguments[a];
        return r.length > 0 && (t += " :: ".concat(JSON.stringify(r))), t;
      },
      v = (function (e) {
        i(a, e);
        var n = f(a);
        function a(e, t) {
          var i;
          r(this, a);
          var c = p(e, t);
          return ((i = n.call(this, c)).name = e), (i.details = t), i;
        }
        return t(a);
      })(l(Error)),
      d = new Set();
    function y(e) {
      d.add(e);
    }
    var m = {
        googleAnalytics: "googleAnalytics",
        precache: "precache-v2",
        prefix: "workbox",
        runtime: "runtime",
        suffix: "undefined" !== typeof registration ? registration.scope : "",
      },
      x = function (e) {
        return [m.prefix, e, m.suffix]
          .filter(function (e) {
            return e && e.length > 0;
          })
          .join("-");
      },
      g = function (e) {
        return e || x(m.precache);
      },
      w = function (e) {
        return e || x(m.runtime);
      };
    function b() {
      b = function () {
        return e;
      };
      var e = {},
        t = Object.prototype,
        n = t.hasOwnProperty,
        r =
          Object.defineProperty ||
          function (e, t, n) {
            e[t] = n.value;
          },
        a = "function" == typeof Symbol ? Symbol : {},
        i = a.iterator || "@@iterator",
        c = a.asyncIterator || "@@asyncIterator",
        o = a.toStringTag || "@@toStringTag";
      function s(e, t, n) {
        return (
          Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          e[t]
        );
      }
      try {
        s({}, "");
      } catch (U) {
        s = function (e, t, n) {
          return (e[t] = n);
        };
      }
      function f(e, t, n, a) {
        var i = t && t.prototype instanceof p ? t : p,
          c = Object.create(i.prototype),
          o = new q(a || []);
        return r(c, "_invoke", { value: _(e, n, o) }), c;
      }
      function h(e, t, n) {
        try {
          return { type: "normal", arg: e.call(t, n) };
        } catch (U) {
          return { type: "throw", arg: U };
        }
      }
      e.wrap = f;
      var l = {};
      function p() {}
      function v() {}
      function d() {}
      var y = {};
      s(y, i, function () {
        return this;
      });
      var m = Object.getPrototypeOf,
        x = m && m(m(T([])));
      x && x !== t && n.call(x, i) && (y = x);
      var g = (d.prototype = p.prototype = Object.create(y));
      function w(e) {
        ["next", "throw", "return"].forEach(function (t) {
          s(e, t, function (e) {
            return this._invoke(t, e);
          });
        });
      }
      function k(e, t) {
        function a(r, i, c, o) {
          var s = h(e[r], e, i);
          if ("throw" !== s.type) {
            var f = s.arg,
              l = f.value;
            return l && "object" == u(l) && n.call(l, "__await")
              ? t.resolve(l.__await).then(
                  function (e) {
                    a("next", e, c, o);
                  },
                  function (e) {
                    a("throw", e, c, o);
                  }
                )
              : t.resolve(l).then(
                  function (e) {
                    (f.value = e), c(f);
                  },
                  function (e) {
                    return a("throw", e, c, o);
                  }
                );
          }
          o(s.arg);
        }
        var i;
        r(this, "_invoke", {
          value: function (e, n) {
            function r() {
              return new t(function (t, r) {
                a(e, n, t, r);
              });
            }
            return (i = i ? i.then(r, r) : r());
          },
        });
      }
      function _(e, t, n) {
        var r = "suspendedStart";
        return function (a, i) {
          if ("executing" === r)
            throw new Error("Generator is already running");
          if ("completed" === r) {
            if ("throw" === a) throw i;
            return O();
          }
          for (n.method = a, n.arg = i; ; ) {
            var c = n.delegate;
            if (c) {
              var o = R(c, n);
              if (o) {
                if (o === l) continue;
                return o;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if ("suspendedStart" === r) throw ((r = "completed"), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            r = "executing";
            var u = h(e, t, n);
            if ("normal" === u.type) {
              if (((r = n.done ? "completed" : "suspendedYield"), u.arg === l))
                continue;
              return { value: u.arg, done: n.done };
            }
            "throw" === u.type &&
              ((r = "completed"), (n.method = "throw"), (n.arg = u.arg));
          }
        };
      }
      function R(e, t) {
        var n = e.iterator[t.method];
        if (void 0 === n) {
          if (((t.delegate = null), "throw" === t.method)) {
            if (
              e.iterator.return &&
              ((t.method = "return"),
              (t.arg = void 0),
              R(e, t),
              "throw" === t.method)
            )
              return l;
            (t.method = "throw"),
              (t.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return l;
        }
        var r = h(n, e.iterator, t.arg);
        if ("throw" === r.type)
          return (t.method = "throw"), (t.arg = r.arg), (t.delegate = null), l;
        var a = r.arg;
        return a
          ? a.done
            ? ((t[e.resultName] = a.value),
              (t.next = e.nextLoc),
              "return" !== t.method && ((t.method = "next"), (t.arg = void 0)),
              (t.delegate = null),
              l)
            : a
          : ((t.method = "throw"),
            (t.arg = new TypeError("iterator result is not an object")),
            (t.delegate = null),
            l);
      }
      function E(e) {
        var t = { tryLoc: e[0] };
        1 in e && (t.catchLoc = e[1]),
          2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
          this.tryEntries.push(t);
      }
      function L(e) {
        var t = e.completion || {};
        (t.type = "normal"), delete t.arg, (e.completion = t);
      }
      function q(e) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          e.forEach(E, this),
          this.reset(!0);
      }
      function T(e) {
        if (e) {
          var t = e[i];
          if (t) return t.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var r = -1,
              a = function t() {
                for (; ++r < e.length; )
                  if (n.call(e, r)) return (t.value = e[r]), (t.done = !1), t;
                return (t.value = void 0), (t.done = !0), t;
              };
            return (a.next = a);
          }
        }
        return { next: O };
      }
      function O() {
        return { value: void 0, done: !0 };
      }
      return (
        (v.prototype = d),
        r(g, "constructor", { value: d, configurable: !0 }),
        r(d, "constructor", { value: v, configurable: !0 }),
        (v.displayName = s(d, o, "GeneratorFunction")),
        (e.isGeneratorFunction = function (e) {
          var t = "function" == typeof e && e.constructor;
          return (
            !!t &&
            (t === v || "GeneratorFunction" === (t.displayName || t.name))
          );
        }),
        (e.mark = function (e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, d)
              : ((e.__proto__ = d), s(e, o, "GeneratorFunction")),
            (e.prototype = Object.create(g)),
            e
          );
        }),
        (e.awrap = function (e) {
          return { __await: e };
        }),
        w(k.prototype),
        s(k.prototype, c, function () {
          return this;
        }),
        (e.AsyncIterator = k),
        (e.async = function (t, n, r, a, i) {
          void 0 === i && (i = Promise);
          var c = new k(f(t, n, r, a), i);
          return e.isGeneratorFunction(n)
            ? c
            : c.next().then(function (e) {
                return e.done ? e.value : c.next();
              });
        }),
        w(g),
        s(g, o, "Generator"),
        s(g, i, function () {
          return this;
        }),
        s(g, "toString", function () {
          return "[object Generator]";
        }),
        (e.keys = function (e) {
          var t = Object(e),
            n = [];
          for (var r in t) n.push(r);
          return (
            n.reverse(),
            function e() {
              for (; n.length; ) {
                var r = n.pop();
                if (r in t) return (e.value = r), (e.done = !1), e;
              }
              return (e.done = !0), e;
            }
          );
        }),
        (e.values = T),
        (q.prototype = {
          constructor: q,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = void 0),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = void 0),
              this.tryEntries.forEach(L),
              !e)
            )
              for (var t in this)
                "t" === t.charAt(0) &&
                  n.call(this, t) &&
                  !isNaN(+t.slice(1)) &&
                  (this[t] = void 0);
          },
          stop: function () {
            this.done = !0;
            var e = this.tryEntries[0].completion;
            if ("throw" === e.type) throw e.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var t = this;
            function r(n, r) {
              return (
                (c.type = "throw"),
                (c.arg = e),
                (t.next = n),
                r && ((t.method = "next"), (t.arg = void 0)),
                !!r
              );
            }
            for (var a = this.tryEntries.length - 1; a >= 0; --a) {
              var i = this.tryEntries[a],
                c = i.completion;
              if ("root" === i.tryLoc) return r("end");
              if (i.tryLoc <= this.prev) {
                var o = n.call(i, "catchLoc"),
                  u = n.call(i, "finallyLoc");
                if (o && u) {
                  if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                  if (this.prev < i.finallyLoc) return r(i.finallyLoc);
                } else if (o) {
                  if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                } else {
                  if (!u)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < i.finallyLoc) return r(i.finallyLoc);
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var a = this.tryEntries[r];
              if (
                a.tryLoc <= this.prev &&
                n.call(a, "finallyLoc") &&
                this.prev < a.finallyLoc
              ) {
                var i = a;
                break;
              }
            }
            i &&
              ("break" === e || "continue" === e) &&
              i.tryLoc <= t &&
              t <= i.finallyLoc &&
              (i = null);
            var c = i ? i.completion : {};
            return (
              (c.type = e),
              (c.arg = t),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), l)
                : this.complete(c)
            );
          },
          complete: function (e, t) {
            if ("throw" === e.type) throw e.arg;
            return (
              "break" === e.type || "continue" === e.type
                ? (this.next = e.arg)
                : "return" === e.type
                ? ((this.rval = this.arg = e.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === e.type && t && (this.next = t),
              l
            );
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var n = this.tryEntries[t];
              if (n.finallyLoc === e)
                return this.complete(n.completion, n.afterLoc), L(n), l;
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var n = this.tryEntries[t];
              if (n.tryLoc === e) {
                var r = n.completion;
                if ("throw" === r.type) {
                  var a = r.arg;
                  L(n);
                }
                return a;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (e, t, n) {
            return (
              (this.delegate = { iterator: T(e), resultName: t, nextLoc: n }),
              "next" === this.method && (this.arg = void 0),
              l
            );
          },
        }),
        e
      );
    }
    function k(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    function _(e, t) {
      if (e) {
        if ("string" === typeof e) return k(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return (
          "Object" === n && e.constructor && (n = e.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? k(e, t)
            : void 0
        );
      }
    }
    function R(e, t) {
      var n =
        ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
        e["@@iterator"];
      if (!n) {
        if (
          Array.isArray(e) ||
          (n = _(e)) ||
          (t && e && "number" === typeof e.length)
        ) {
          n && (e = n);
          var r = 0,
            a = function () {};
          return {
            s: a,
            n: function () {
              return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
            },
            e: function (e) {
              throw e;
            },
            f: a,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      var i,
        c = !0,
        o = !1;
      return {
        s: function () {
          n = n.call(e);
        },
        n: function () {
          var e = n.next();
          return (c = e.done), e;
        },
        e: function (e) {
          (o = !0), (i = e);
        },
        f: function () {
          try {
            c || null == n.return || n.return();
          } finally {
            if (o) throw i;
          }
        },
      };
    }
    function E(e, t, n, r, a, i, c) {
      try {
        var o = e[i](c),
          u = o.value;
      } catch (s) {
        return void n(s);
      }
      o.done ? t(u) : Promise.resolve(u).then(r, a);
    }
    function L(e) {
      return function () {
        var t = this,
          n = arguments;
        return new Promise(function (r, a) {
          var i = e.apply(t, n);
          function c(e) {
            E(i, r, a, c, o, "next", e);
          }
          function o(e) {
            E(i, r, a, c, o, "throw", e);
          }
          c(void 0);
        });
      };
    }
    function q() {
      return T.apply(this, arguments);
    }
    function T() {
      return (T = L(
        b().mark(function e() {
          var t, n, r;
          return b().wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    0, (t = R(d)), (e.prev = 2), t.s();
                  case 4:
                    if ((n = t.n()).done) {
                      e.next = 11;
                      break;
                    }
                    return (r = n.value), (e.next = 8), r();
                  case 8:
                    0;
                  case 9:
                    e.next = 4;
                    break;
                  case 11:
                    e.next = 16;
                    break;
                  case 13:
                    (e.prev = 13), (e.t0 = e.catch(2)), t.e(e.t0);
                  case 16:
                    return (e.prev = 16), t.f(), e.finish(16);
                  case 19:
                    0;
                  case 20:
                  case "end":
                    return e.stop();
                }
            },
            e,
            null,
            [[2, 13, 16, 19]]
          );
        })
      )).apply(this, arguments);
    }
    var O,
      U = function (e) {
        return new URL(String(e), location.href).href.replace(
          new RegExp("^".concat(location.origin)),
          ""
        );
      },
      N = function (e, t) {
        return e.filter(function (e) {
          return t in e;
        });
      },
      S = (function () {
        var e = L(
          b().mark(function e(t) {
            var n, r, a, i, c, o, u, s;
            return b().wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (n = t.request),
                        (r = t.mode),
                        (a = t.plugins),
                        (i = N(void 0 === a ? [] : a, "cacheKeyWillBeUsed")),
                        (c = n),
                        (o = R(i)),
                        (e.prev = 4),
                        o.s();
                    case 6:
                      if ((u = o.n()).done) {
                        e.next = 15;
                        break;
                      }
                      return (
                        (s = u.value),
                        (e.next = 10),
                        s.cacheKeyWillBeUsed.call(s, { mode: r, request: c })
                      );
                    case 10:
                      "string" === typeof (c = e.sent) && (c = new Request(c));
                    case 13:
                      e.next = 6;
                      break;
                    case 15:
                      e.next = 20;
                      break;
                    case 17:
                      (e.prev = 17), (e.t0 = e.catch(4)), o.e(e.t0);
                    case 20:
                      return (e.prev = 20), o.f(), e.finish(20);
                    case 23:
                      return e.abrupt("return", c);
                    case 24:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              null,
              [[4, 17, 20, 23]]
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      A = (function () {
        var e = L(
          b().mark(function e(t) {
            var n, r, a, i, c, o, u, s, f, h;
            return b().wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (n = t.request),
                        (r = t.response),
                        (a = t.event),
                        (i = t.plugins),
                        (c = r),
                        (o = !1),
                        (u = R(void 0 === i ? [] : i)),
                        (e.prev = 4),
                        u.s();
                    case 6:
                      if ((s = u.n()).done) {
                        e.next = 19;
                        break;
                      }
                      if (!("cacheWillUpdate" in (f = s.value))) {
                        e.next = 17;
                        break;
                      }
                      return (
                        (o = !0),
                        (h = f.cacheWillUpdate),
                        (e.next = 13),
                        h.call(f, { request: n, response: c, event: a })
                      );
                    case 13:
                      if ((c = e.sent)) {
                        e.next = 17;
                        break;
                      }
                      return e.abrupt("break", 19);
                    case 17:
                      e.next = 6;
                      break;
                    case 19:
                      e.next = 24;
                      break;
                    case 21:
                      (e.prev = 21), (e.t0 = e.catch(4)), u.e(e.t0);
                    case 24:
                      return (e.prev = 24), u.f(), e.finish(24);
                    case 27:
                      return (
                        o || (c = c && 200 === c.status ? c : void 0),
                        e.abrupt("return", c || null)
                      );
                    case 29:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              null,
              [[4, 21, 24, 27]]
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      j = (function () {
        var e = L(
          b().mark(function e(t) {
            var n, r, a, i, c, o, u, s, f, h, l, p, v;
            return b().wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (n = t.cacheName),
                        (r = t.request),
                        (a = t.event),
                        (i = t.matchOptions),
                        (c = t.plugins),
                        (o = void 0 === c ? [] : c),
                        (e.next = 3),
                        self.caches.open(n)
                      );
                    case 3:
                      return (
                        (u = e.sent),
                        (e.next = 6),
                        S({ plugins: o, request: r, mode: "read" })
                      );
                    case 6:
                      return (s = e.sent), (e.next = 9), u.match(s, i);
                    case 9:
                      (f = e.sent), (h = R(o)), (e.prev = 12), h.s();
                    case 14:
                      if ((l = h.n()).done) {
                        e.next = 24;
                        break;
                      }
                      if (!("cachedResponseWillBeUsed" in (p = l.value))) {
                        e.next = 22;
                        break;
                      }
                      return (
                        (v = p.cachedResponseWillBeUsed),
                        (e.next = 20),
                        v.call(p, {
                          cacheName: n,
                          event: a,
                          matchOptions: i,
                          cachedResponse: f,
                          request: s,
                        })
                      );
                    case 20:
                      f = e.sent;
                    case 22:
                      e.next = 14;
                      break;
                    case 24:
                      e.next = 29;
                      break;
                    case 26:
                      (e.prev = 26), (e.t0 = e.catch(12)), h.e(e.t0);
                    case 29:
                      return (e.prev = 29), h.f(), e.finish(29);
                    case 32:
                      return e.abrupt("return", f);
                    case 33:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              null,
              [[12, 26, 29, 32]]
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      C = (function () {
        var e = L(
          b().mark(function e(t) {
            var n, r, a, i, c, o, u, s, f, h, l, p, d, y, m;
            return b().wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (n = t.cacheName),
                        (r = t.request),
                        (a = t.response),
                        (i = t.event),
                        (c = t.plugins),
                        (o = void 0 === c ? [] : c),
                        (u = t.matchOptions),
                        (e.next = 4);
                      break;
                    case 4:
                      return (
                        (e.next = 6),
                        S({ plugins: o, request: r, mode: "write" })
                      );
                    case 6:
                      if (((s = e.sent), a)) {
                        e.next = 10;
                        break;
                      }
                      throw new v("cache-put-with-no-response", {
                        url: U(s.url),
                      });
                    case 10:
                      return (
                        (e.next = 12),
                        A({ event: i, plugins: o, response: a, request: s })
                      );
                    case 12:
                      if ((f = e.sent)) {
                        e.next = 16;
                        break;
                      }
                      return e.abrupt("return");
                    case 16:
                      return (e.next = 18), self.caches.open(n);
                    case 18:
                      if (
                        ((h = e.sent),
                        !((l = N(o, "cacheDidUpdate")).length > 0))
                      ) {
                        e.next = 26;
                        break;
                      }
                      return (
                        (e.next = 23),
                        j({ cacheName: n, matchOptions: u, request: s })
                      );
                    case 23:
                      (e.t0 = e.sent), (e.next = 27);
                      break;
                    case 26:
                      e.t0 = null;
                    case 27:
                      return (
                        (p = e.t0), (e.prev = 29), (e.next = 32), h.put(s, f)
                      );
                    case 32:
                      e.next = 40;
                      break;
                    case 34:
                      if (
                        ((e.prev = 34),
                        (e.t1 = e.catch(29)),
                        "QuotaExceededError" !== e.t1.name)
                      ) {
                        e.next = 39;
                        break;
                      }
                      return (e.next = 39), q();
                    case 39:
                      throw e.t1;
                    case 40:
                      (d = R(l)), (e.prev = 41), d.s();
                    case 43:
                      if ((y = d.n()).done) {
                        e.next = 49;
                        break;
                      }
                      return (
                        (m = y.value),
                        (e.next = 47),
                        m.cacheDidUpdate.call(m, {
                          cacheName: n,
                          event: i,
                          oldResponse: p,
                          newResponse: f,
                          request: s,
                        })
                      );
                    case 47:
                      e.next = 43;
                      break;
                    case 49:
                      e.next = 54;
                      break;
                    case 51:
                      (e.prev = 51), (e.t2 = e.catch(41)), d.e(e.t2);
                    case 54:
                      return (e.prev = 54), d.f(), e.finish(54);
                    case 57:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              null,
              [
                [29, 34],
                [41, 51, 54, 57],
              ]
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      K = { put: C, match: j };
    function P() {
      if (void 0 === O) {
        var e = new Response("");
        if ("body" in e)
          try {
            new Response(e.body), (O = !0);
          } catch (t) {
            O = !1;
          }
        O = !1;
      }
      return O;
    }
    function M(e) {
      e.then(function () {});
    }
    function I(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          var n =
            null == e
              ? null
              : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                e["@@iterator"];
          if (null != n) {
            var r,
              a,
              i = [],
              c = !0,
              o = !1;
            try {
              for (
                n = n.call(e);
                !(c = (r = n.next()).done) &&
                (i.push(r.value), !t || i.length !== t);
                c = !0
              );
            } catch (u) {
              (o = !0), (a = u);
            } finally {
              try {
                c || null == n.return || n.return();
              } finally {
                if (o) throw a;
              }
            }
            return i;
          }
        })(e, t) ||
        _(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    var W = (function () {
      function e(t, n) {
        var a = this,
          i =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          c = i.onupgradeneeded,
          o = i.onversionchange;
        r(this, e),
          (this._db = null),
          (this._name = t),
          (this._version = n),
          (this._onupgradeneeded = c),
          (this._onversionchange =
            o ||
            function () {
              return a.close();
            });
      }
      return (
        t(e, [
          {
            key: "db",
            get: function () {
              return this._db;
            },
          },
          {
            key: "open",
            value: (function () {
              var e = L(
                b().mark(function e() {
                  var t = this;
                  return b().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (!this._db) {
                              e.next = 2;
                              break;
                            }
                            return e.abrupt("return");
                          case 2:
                            return (
                              (e.next = 4),
                              new Promise(function (e, n) {
                                var r = !1;
                                setTimeout(function () {
                                  (r = !0),
                                    n(
                                      new Error(
                                        "The open request was blocked and timed out"
                                      )
                                    );
                                }, t.OPEN_TIMEOUT);
                                var a = indexedDB.open(t._name, t._version);
                                (a.onerror = function () {
                                  return n(a.error);
                                }),
                                  (a.onupgradeneeded = function (e) {
                                    r
                                      ? (a.transaction.abort(),
                                        a.result.close())
                                      : "function" ===
                                          typeof t._onupgradeneeded &&
                                        t._onupgradeneeded(e);
                                  }),
                                  (a.onsuccess = function () {
                                    var n = a.result;
                                    r
                                      ? n.close()
                                      : ((n.onversionchange =
                                          t._onversionchange.bind(t)),
                                        e(n));
                                  });
                              })
                            );
                          case 4:
                            return (
                              (this._db = e.sent), e.abrupt("return", this)
                            );
                          case 6:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: "getKey",
            value: (function () {
              var e = L(
                b().mark(function e(t, n) {
                  return b().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), this.getAllKeys(t, n, 1);
                          case 2:
                            return e.abrupt("return", e.sent[0]);
                          case 3:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function (t, n) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: "getAll",
            value: (function () {
              var e = L(
                b().mark(function e(t, n, r) {
                  return b().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.next = 2),
                              this.getAllMatching(t, { query: n, count: r })
                            );
                          case 2:
                            return e.abrupt("return", e.sent);
                          case 3:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function (t, n, r) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: "getAllKeys",
            value: (function () {
              var e = L(
                b().mark(function e(t, n, r) {
                  var a;
                  return b().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.next = 2),
                              this.getAllMatching(t, {
                                query: n,
                                count: r,
                                includeKeys: !0,
                              })
                            );
                          case 2:
                            return (
                              (a = e.sent),
                              e.abrupt(
                                "return",
                                a.map(function (e) {
                                  return e.key;
                                })
                              )
                            );
                          case 4:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function (t, n, r) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: "getAllMatching",
            value: (function () {
              var e = L(
                b().mark(function e(t) {
                  var n,
                    r,
                    a,
                    i,
                    c,
                    o,
                    u,
                    s,
                    f,
                    h = arguments;
                  return b().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (n = h.length > 1 && void 0 !== h[1] ? h[1] : {}),
                              (r = n.index),
                              (a = n.query),
                              (i = void 0 === a ? null : a),
                              (c = n.direction),
                              (o = void 0 === c ? "next" : c),
                              (u = n.count),
                              (s = n.includeKeys),
                              (f = void 0 !== s && s),
                              (e.next = 3),
                              this.transaction(
                                [t],
                                "readonly",
                                function (e, n) {
                                  var a = e.objectStore(t),
                                    c = r ? a.index(r) : a,
                                    s = [],
                                    h = c.openCursor(i, o);
                                  h.onsuccess = function () {
                                    var e = h.result;
                                    e
                                      ? (s.push(f ? e : e.value),
                                        u && s.length >= u
                                          ? n(s)
                                          : e.continue())
                                      : n(s);
                                  };
                                }
                              )
                            );
                          case 3:
                            return e.abrupt("return", e.sent);
                          case 4:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: "transaction",
            value: (function () {
              var e = L(
                b().mark(function e(t, n, r) {
                  var a = this;
                  return b().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.next = 2), this.open();
                          case 2:
                            return (
                              (e.next = 4),
                              new Promise(function (e, i) {
                                var c = a._db.transaction(t, n);
                                (c.onabort = function () {
                                  return i(c.error);
                                }),
                                  (c.oncomplete = function () {
                                    return e();
                                  }),
                                  r(c, function (t) {
                                    return e(t);
                                  });
                              })
                            );
                          case 4:
                            return e.abrupt("return", e.sent);
                          case 5:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function (t, n, r) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: "_call",
            value: (function () {
              var e = L(
                b().mark(function e(t, n, r) {
                  var a,
                    i,
                    c,
                    o,
                    u = arguments;
                  return b().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            for (
                              a = u.length,
                                i = new Array(a > 3 ? a - 3 : 0),
                                c = 3;
                              c < a;
                              c++
                            )
                              i[c - 3] = u[c];
                            return (
                              (o = function (e, r) {
                                var a = e.objectStore(n),
                                  c = a[t].apply(a, i);
                                c.onsuccess = function () {
                                  return r(c.result);
                                };
                              }),
                              (e.next = 4),
                              this.transaction([n], r, o)
                            );
                          case 4:
                            return e.abrupt("return", e.sent);
                          case 5:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return function (t, n, r) {
                return e.apply(this, arguments);
              };
            })(),
          },
          {
            key: "close",
            value: function () {
              this._db && (this._db.close(), (this._db = null));
            },
          },
        ]),
        e
      );
    })();
    W.prototype.OPEN_TIMEOUT = 2e3;
    for (
      var D = function () {
          var e,
            t = I(H[F], 2),
            n = t[0],
            r = R(t[1]);
          try {
            var a = function () {
              var t = e.value;
              (t in IDBObjectStore.prototype) &&
                (W.prototype[t] = (function () {
                  var e = L(
                    b().mark(function e(r) {
                      var a,
                        i,
                        c,
                        o = arguments;
                      return b().wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                for (
                                  a = o.length,
                                    i = new Array(a > 1 ? a - 1 : 0),
                                    c = 1;
                                  c < a;
                                  c++
                                )
                                  i[c - 1] = o[c];
                                return (
                                  (e.next = 3),
                                  this._call.apply(this, [t, r, n].concat(i))
                                );
                              case 3:
                                return e.abrupt("return", e.sent);
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })());
            };
            for (r.s(); !(e = r.n()).done; ) a();
          } catch (i) {
            r.e(i);
          } finally {
            r.f();
          }
        },
        F = 0,
        H = Object.entries({
          readonly: ["get", "count", "getKey", "getAll", "getAllKeys"],
          readwrite: ["add", "put", "clear", "delete"],
        });
      F < H.length;
      F++
    )
      D();
    var B = (function () {
        var e = L(
          b().mark(function e(t) {
            return b().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (e.next = 2),
                      new Promise(function (e, n) {
                        var r = indexedDB.deleteDatabase(t);
                        (r.onerror = function () {
                          n(r.error);
                        }),
                          (r.onblocked = function () {
                            n(new Error("Delete blocked"));
                          }),
                          (r.onsuccess = function () {
                            e();
                          });
                      })
                    );
                  case 2:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      G = (function () {
        var e = L(
          b().mark(function e(t) {
            var n, r, a, i, c, o, u, s, f, h, l, p, d, y, m, x, g, w, k, _, E;
            return b().wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (
                        ((n = t.request),
                        (r = t.fetchOptions),
                        (a = t.event),
                        (i = t.plugins),
                        (c = void 0 === i ? [] : i),
                        "string" === typeof n && (n = new Request(n)),
                        !(a instanceof FetchEvent && a.preloadResponse))
                      ) {
                        e.next = 9;
                        break;
                      }
                      return (e.next = 5), a.preloadResponse;
                    case 5:
                      if (!(o = e.sent)) {
                        e.next = 9;
                        break;
                      }
                      return e.abrupt("return", o);
                    case 9:
                      0,
                        (u = N(c, "fetchDidFail")),
                        (s = u.length > 0 ? n.clone() : null),
                        (e.prev = 12),
                        (f = R(c)),
                        (e.prev = 14),
                        f.s();
                    case 16:
                      if ((h = f.n()).done) {
                        e.next = 27;
                        break;
                      }
                      if (!("requestWillFetch" in (l = h.value))) {
                        e.next = 25;
                        break;
                      }
                      return (
                        (p = l.requestWillFetch),
                        (d = n.clone()),
                        (e.next = 23),
                        p.call(l, { request: d, event: a })
                      );
                    case 23:
                      n = e.sent;
                    case 25:
                      e.next = 16;
                      break;
                    case 27:
                      e.next = 32;
                      break;
                    case 29:
                      (e.prev = 29), (e.t0 = e.catch(14)), f.e(e.t0);
                    case 32:
                      return (e.prev = 32), f.f(), e.finish(32);
                    case 35:
                      e.next = 40;
                      break;
                    case 37:
                      throw (
                        ((e.prev = 37),
                        (e.t1 = e.catch(12)),
                        new v("plugin-error-request-will-fetch", {
                          thrownError: e.t1,
                        }))
                      );
                    case 40:
                      if (
                        ((y = n.clone()), (e.prev = 41), "navigate" !== n.mode)
                      ) {
                        e.next = 48;
                        break;
                      }
                      return (e.next = 45), fetch(n);
                    case 45:
                      (m = e.sent), (e.next = 51);
                      break;
                    case 48:
                      return (e.next = 50), fetch(n, r);
                    case 50:
                      m = e.sent;
                    case 51:
                      0, (x = R(c)), (e.prev = 53), x.s();
                    case 55:
                      if ((g = x.n()).done) {
                        e.next = 64;
                        break;
                      }
                      if (!("fetchDidSucceed" in (w = g.value))) {
                        e.next = 62;
                        break;
                      }
                      return (
                        (e.next = 60),
                        w.fetchDidSucceed.call(w, {
                          event: a,
                          request: y,
                          response: m,
                        })
                      );
                    case 60:
                      m = e.sent;
                    case 62:
                      e.next = 55;
                      break;
                    case 64:
                      e.next = 69;
                      break;
                    case 66:
                      (e.prev = 66), (e.t2 = e.catch(53)), x.e(e.t2);
                    case 69:
                      return (e.prev = 69), x.f(), e.finish(69);
                    case 72:
                      return e.abrupt("return", m);
                    case 75:
                      (e.prev = 75),
                        (e.t3 = e.catch(41)),
                        (k = R(u)),
                        (e.prev = 79),
                        k.s();
                    case 81:
                      if ((_ = k.n()).done) {
                        e.next = 87;
                        break;
                      }
                      return (
                        (E = _.value),
                        (e.next = 85),
                        E.fetchDidFail.call(E, {
                          error: e.t3,
                          event: a,
                          originalRequest: s.clone(),
                          request: y.clone(),
                        })
                      );
                    case 85:
                      e.next = 81;
                      break;
                    case 87:
                      e.next = 92;
                      break;
                    case 89:
                      (e.prev = 89), (e.t4 = e.catch(79)), k.e(e.t4);
                    case 92:
                      return (e.prev = 92), k.f(), e.finish(92);
                    case 95:
                      throw e.t3;
                    case 96:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              null,
              [
                [12, 37],
                [14, 29, 32, 35],
                [41, 75],
                [53, 66, 69, 72],
                [79, 89, 92, 95],
              ]
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })(),
      Q = { fetch: G };
    function Y(e, t) {
      return $.apply(this, arguments);
    }
    function $() {
      return ($ = L(
        b().mark(function e(t, n) {
          var r, a, i, c;
          return b().wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (
                    ((r = t.clone()),
                    (a = {
                      headers: new Headers(r.headers),
                      status: r.status,
                      statusText: r.statusText,
                    }),
                    (i = n ? n(a) : a),
                    !P())
                  ) {
                    e.next = 7;
                    break;
                  }
                  (e.t0 = r.body), (e.next = 10);
                  break;
                case 7:
                  return (e.next = 9), r.blob();
                case 9:
                  e.t0 = e.sent;
                case 10:
                  return (c = e.t0), e.abrupt("return", new Response(c, i));
                case 12:
                case "end":
                  return e.stop();
              }
          }, e);
        })
      )).apply(this, arguments);
    }
    n(190);
    var J = "cache-entries",
      V = function (e) {
        var t = new URL(e, location.href);
        return (t.hash = ""), t.href;
      },
      z = (function () {
        function e(t) {
          var n = this;
          r(this, e),
            (this._cacheName = t),
            (this._db = new W("workbox-expiration", 1, {
              onupgradeneeded: function (e) {
                return n._handleUpgrade(e);
              },
            }));
        }
        return (
          t(e, [
            {
              key: "_handleUpgrade",
              value: function (e) {
                var t = e.target.result.createObjectStore(J, { keyPath: "id" });
                t.createIndex("cacheName", "cacheName", { unique: !1 }),
                  t.createIndex("timestamp", "timestamp", { unique: !1 }),
                  B(this._cacheName);
              },
            },
            {
              key: "setTimestamp",
              value: (function () {
                var e = L(
                  b().mark(function e(t, n) {
                    var r;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (t = V(t)),
                                (r = {
                                  url: t,
                                  timestamp: n,
                                  cacheName: this._cacheName,
                                  id: this._getId(t),
                                }),
                                (e.next = 4),
                                this._db.put(J, r)
                              );
                            case 4:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function (t, n) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "getTimestamp",
              value: (function () {
                var e = L(
                  b().mark(function e(t) {
                    var n;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2), this._db.get(J, this._getId(t))
                              );
                            case 2:
                              return (
                                (n = e.sent), e.abrupt("return", n.timestamp)
                              );
                            case 4:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "expireEntries",
              value: (function () {
                var e = L(
                  b().mark(function e(t, n) {
                    var r,
                      a,
                      i,
                      c,
                      o,
                      u = this;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2),
                                this._db.transaction(
                                  J,
                                  "readwrite",
                                  function (e, r) {
                                    var a = e
                                        .objectStore(J)
                                        .index("timestamp")
                                        .openCursor(null, "prev"),
                                      i = [],
                                      c = 0;
                                    a.onsuccess = function () {
                                      var e = a.result;
                                      if (e) {
                                        var o = e.value;
                                        o.cacheName === u._cacheName &&
                                          ((t && o.timestamp < t) ||
                                          (n && c >= n)
                                            ? i.push(e.value)
                                            : c++),
                                          e.continue();
                                      } else r(i);
                                    };
                                  }
                                )
                              );
                            case 2:
                              (r = e.sent),
                                (a = []),
                                (i = R(r)),
                                (e.prev = 5),
                                i.s();
                            case 7:
                              if ((c = i.n()).done) {
                                e.next = 14;
                                break;
                              }
                              return (
                                (o = c.value),
                                (e.next = 11),
                                this._db.delete(J, o.id)
                              );
                            case 11:
                              a.push(o.url);
                            case 12:
                              e.next = 7;
                              break;
                            case 14:
                              e.next = 19;
                              break;
                            case 16:
                              (e.prev = 16), (e.t0 = e.catch(5)), i.e(e.t0);
                            case 19:
                              return (e.prev = 19), i.f(), e.finish(19);
                            case 22:
                              return e.abrupt("return", a);
                            case 23:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[5, 16, 19, 22]]
                    );
                  })
                );
                return function (t, n) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "_getId",
              value: function (e) {
                return this._cacheName + "|" + V(e);
              },
            },
          ]),
          e
        );
      })(),
      X = (function () {
        function e(t) {
          var n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          r(this, e),
            (this._isRunning = !1),
            (this._rerunRequested = !1),
            (this._maxEntries = n.maxEntries),
            (this._maxAgeSeconds = n.maxAgeSeconds),
            (this._cacheName = t),
            (this._timestampModel = new z(t));
        }
        return (
          t(e, [
            {
              key: "expireEntries",
              value: (function () {
                var e = L(
                  b().mark(function e() {
                    var t, n, r, a, i, c;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (!this._isRunning) {
                                e.next = 3;
                                break;
                              }
                              return (
                                (this._rerunRequested = !0), e.abrupt("return")
                              );
                            case 3:
                              return (
                                (this._isRunning = !0),
                                (t = this._maxAgeSeconds
                                  ? Date.now() - 1e3 * this._maxAgeSeconds
                                  : 0),
                                (e.next = 7),
                                this._timestampModel.expireEntries(
                                  t,
                                  this._maxEntries
                                )
                              );
                            case 7:
                              return (
                                (n = e.sent),
                                (e.next = 10),
                                self.caches.open(this._cacheName)
                              );
                            case 10:
                              (r = e.sent), (a = R(n)), (e.prev = 12), a.s();
                            case 14:
                              if ((i = a.n()).done) {
                                e.next = 20;
                                break;
                              }
                              return (c = i.value), (e.next = 18), r.delete(c);
                            case 18:
                              e.next = 14;
                              break;
                            case 20:
                              e.next = 25;
                              break;
                            case 22:
                              (e.prev = 22), (e.t0 = e.catch(12)), a.e(e.t0);
                            case 25:
                              return (e.prev = 25), a.f(), e.finish(25);
                            case 28:
                              0,
                                (this._isRunning = !1),
                                this._rerunRequested &&
                                  ((this._rerunRequested = !1),
                                  M(this.expireEntries()));
                            case 31:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[12, 22, 25, 28]]
                    );
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "updateTimestamp",
              value: (function () {
                var e = L(
                  b().mark(function e(t) {
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 3),
                                this._timestampModel.setTimestamp(t, Date.now())
                              );
                            case 3:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "isURLExpired",
              value: (function () {
                var e = L(
                  b().mark(function e(t) {
                    var n, r;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (this._maxAgeSeconds) {
                                e.next = 6;
                                break;
                              }
                              e.next = 3;
                              break;
                            case 3:
                              return e.abrupt("return", !1);
                            case 6:
                              return (
                                (e.next = 8),
                                this._timestampModel.getTimestamp(t)
                              );
                            case 8:
                              return (
                                (n = e.sent),
                                (r = Date.now() - 1e3 * this._maxAgeSeconds),
                                e.abrupt("return", n < r)
                              );
                            case 11:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "delete",
              value: (function () {
                var e = L(
                  b().mark(function e() {
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (this._rerunRequested = !1),
                                (e.next = 3),
                                this._timestampModel.expireEntries(1 / 0)
                              );
                            case 3:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
          ]),
          e
        );
      })(),
      Z = (function () {
        function e() {
          var t = this,
            n =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
          r(this, e),
            (this.cachedResponseWillBeUsed = (function () {
              var e = L(
                b().mark(function e(n) {
                  var r, a, i, c, o, u, s;
                  return b().wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((r = n.event),
                            (a = n.request),
                            (i = n.cacheName),
                            (c = n.cachedResponse))
                          ) {
                            e.next = 3;
                            break;
                          }
                          return e.abrupt("return", null);
                        case 3:
                          if (
                            ((o = t._isResponseDateFresh(c)),
                            M((u = t._getCacheExpiration(i)).expireEntries()),
                            (s = u.updateTimestamp(a.url)),
                            r)
                          )
                            try {
                              r.waitUntil(s);
                            } catch (f) {
                              0;
                            }
                          return e.abrupt("return", o ? c : null);
                        case 9:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })()),
            (this.cacheDidUpdate = (function () {
              var e = L(
                b().mark(function e(n) {
                  var r, a, i;
                  return b().wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (r = n.cacheName),
                            (a = n.request),
                            (i = t._getCacheExpiration(r)),
                            (e.next = 5),
                            i.updateTimestamp(a.url)
                          );
                        case 5:
                          return (e.next = 7), i.expireEntries();
                        case 7:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })()),
            (this._config = n),
            (this._maxAgeSeconds = n.maxAgeSeconds),
            (this._cacheExpirations = new Map()),
            n.purgeOnQuotaError &&
              y(function () {
                return t.deleteCacheAndMetadata();
              });
        }
        return (
          t(e, [
            {
              key: "_getCacheExpiration",
              value: function (e) {
                if (e === w()) throw new v("expire-custom-caches-only");
                var t = this._cacheExpirations.get(e);
                return (
                  t ||
                    ((t = new X(e, this._config)),
                    this._cacheExpirations.set(e, t)),
                  t
                );
              },
            },
            {
              key: "_isResponseDateFresh",
              value: function (e) {
                if (!this._maxAgeSeconds) return !0;
                var t = this._getDateHeaderTimestamp(e);
                return (
                  null === t || t >= Date.now() - 1e3 * this._maxAgeSeconds
                );
              },
            },
            {
              key: "_getDateHeaderTimestamp",
              value: function (e) {
                if (!e.headers.has("date")) return null;
                var t = e.headers.get("date"),
                  n = new Date(t).getTime();
                return isNaN(n) ? null : n;
              },
            },
            {
              key: "deleteCacheAndMetadata",
              value: (function () {
                var e = L(
                  b().mark(function e() {
                    var t, n, r, a, i;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              (t = R(this._cacheExpirations)),
                                (e.prev = 1),
                                t.s();
                            case 3:
                              if ((n = t.n()).done) {
                                e.next = 11;
                                break;
                              }
                              return (
                                (r = I(n.value, 2)),
                                (a = r[0]),
                                (i = r[1]),
                                (e.next = 7),
                                self.caches.delete(a)
                              );
                            case 7:
                              return (e.next = 9), i.delete();
                            case 9:
                              e.next = 3;
                              break;
                            case 11:
                              e.next = 16;
                              break;
                            case 13:
                              (e.prev = 13), (e.t0 = e.catch(1)), t.e(e.t0);
                            case 16:
                              return (e.prev = 16), t.f(), e.finish(16);
                            case 19:
                              this._cacheExpirations = new Map();
                            case 20:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[1, 13, 16, 19]]
                    );
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
          ]),
          e
        );
      })();
    function ee(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return k(e);
        })(e) ||
        (function (e) {
          if (
            ("undefined" !== typeof Symbol && null != e[Symbol.iterator]) ||
            null != e["@@iterator"]
          )
            return Array.from(e);
        })(e) ||
        _(e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    n(437);
    var te = [],
      ne = function () {
        return te;
      };
    function re(e) {
      if (!e) throw new v("add-to-cache-list-unexpected-type", { entry: e });
      if ("string" === typeof e)
        return { cacheKey: (t = new URL(e, location.href)).href, url: t.href };
      var t,
        n = e.revision,
        r = e.url;
      if (!r) throw new v("add-to-cache-list-unexpected-type", { entry: e });
      if (!n)
        return { cacheKey: (t = new URL(r, location.href)).href, url: t.href };
      var a = new URL(r, location.href),
        i = new URL(r, location.href);
      return (
        a.searchParams.set("__WB_REVISION__", n),
        { cacheKey: a.href, url: i.href }
      );
    }
    var ae,
      ie = (function () {
        function e(t) {
          r(this, e),
            (this._cacheName = g(t)),
            (this._urlsToCacheKeys = new Map()),
            (this._urlsToCacheModes = new Map()),
            (this._cacheKeysToIntegrities = new Map());
        }
        return (
          t(e, [
            {
              key: "addToCacheList",
              value: function (e) {
                var t,
                  n = [],
                  r = R(e);
                try {
                  for (r.s(); !(t = r.n()).done; ) {
                    var a = t.value;
                    "string" === typeof a
                      ? n.push(a)
                      : a && void 0 === a.revision && n.push(a.url);
                    var i = re(a),
                      c = i.cacheKey,
                      o = i.url,
                      u =
                        "string" !== typeof a && a.revision
                          ? "reload"
                          : "default";
                    if (
                      this._urlsToCacheKeys.has(o) &&
                      this._urlsToCacheKeys.get(o) !== c
                    )
                      throw new v("add-to-cache-list-conflicting-entries", {
                        firstEntry: this._urlsToCacheKeys.get(o),
                        secondEntry: c,
                      });
                    if ("string" !== typeof a && a.integrity) {
                      if (
                        this._cacheKeysToIntegrities.has(c) &&
                        this._cacheKeysToIntegrities.get(c) !== a.integrity
                      )
                        throw new v(
                          "add-to-cache-list-conflicting-integrities",
                          { url: o }
                        );
                      this._cacheKeysToIntegrities.set(c, a.integrity);
                    }
                    if (
                      (this._urlsToCacheKeys.set(o, c),
                      this._urlsToCacheModes.set(o, u),
                      n.length > 0)
                    ) {
                      var s =
                        "Workbox is precaching URLs without revision " +
                        "info: ".concat(
                          n.join(", "),
                          "\nThis is generally NOT safe. "
                        ) +
                        "Learn more at https://bit.ly/wb-precache";
                      console.warn(s);
                    }
                  }
                } catch (f) {
                  r.e(f);
                } finally {
                  r.f();
                }
              },
            },
            {
              key: "install",
              value: (function () {
                var e = L(
                  b().mark(function e() {
                    var t,
                      n,
                      r,
                      a,
                      i,
                      c,
                      o,
                      u,
                      s,
                      f,
                      h,
                      l,
                      p,
                      v,
                      d,
                      y = this,
                      m = arguments;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (t =
                                  m.length > 0 && void 0 !== m[0] ? m[0] : {}),
                                (n = t.event),
                                (r = t.plugins),
                                (a = []),
                                (i = []),
                                (e.next = 6),
                                self.caches.open(this._cacheName)
                              );
                            case 6:
                              return (c = e.sent), (e.next = 9), c.keys();
                            case 9:
                              (o = e.sent),
                                (u = new Set(
                                  o.map(function (e) {
                                    return e.url;
                                  })
                                )),
                                (s = R(this._urlsToCacheKeys));
                              try {
                                for (s.s(); !(f = s.n()).done; )
                                  (h = I(f.value, 2)),
                                    (l = h[0]),
                                    (p = h[1]),
                                    u.has(p)
                                      ? i.push(l)
                                      : a.push({ cacheKey: p, url: l });
                              } catch (x) {
                                s.e(x);
                              } finally {
                                s.f();
                              }
                              return (
                                (v = a.map(function (e) {
                                  var t = e.cacheKey,
                                    a = e.url,
                                    i = y._cacheKeysToIntegrities.get(t),
                                    c = y._urlsToCacheModes.get(a);
                                  return y._addURLToCache({
                                    cacheKey: t,
                                    cacheMode: c,
                                    event: n,
                                    integrity: i,
                                    plugins: r,
                                    url: a,
                                  });
                                })),
                                (e.next = 16),
                                Promise.all(v)
                              );
                            case 16:
                              return (
                                (d = a.map(function (e) {
                                  return e.url;
                                })),
                                e.abrupt("return", {
                                  updatedURLs: d,
                                  notUpdatedURLs: i,
                                })
                              );
                            case 19:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "activate",
              value: (function () {
                var e = L(
                  b().mark(function e() {
                    var t, n, r, a, i, c, o;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2), self.caches.open(this._cacheName)
                              );
                            case 2:
                              return (t = e.sent), (e.next = 5), t.keys();
                            case 5:
                              (n = e.sent),
                                (r = new Set(this._urlsToCacheKeys.values())),
                                (a = []),
                                (i = R(n)),
                                (e.prev = 9),
                                i.s();
                            case 11:
                              if ((c = i.n()).done) {
                                e.next = 19;
                                break;
                              }
                              if (((o = c.value), r.has(o.url))) {
                                e.next = 17;
                                break;
                              }
                              return (e.next = 16), t.delete(o);
                            case 16:
                              a.push(o.url);
                            case 17:
                              e.next = 11;
                              break;
                            case 19:
                              e.next = 24;
                              break;
                            case 21:
                              (e.prev = 21), (e.t0 = e.catch(9)), i.e(e.t0);
                            case 24:
                              return (e.prev = 24), i.f(), e.finish(24);
                            case 27:
                              return e.abrupt("return", { deletedURLs: a });
                            case 29:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[9, 21, 24, 27]]
                    );
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "_addURLToCache",
              value: (function () {
                var e = L(
                  b().mark(function e(t) {
                    var n, r, a, i, c, o, u, s, f, h, l, p;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.cacheKey),
                                (r = t.url),
                                (a = t.cacheMode),
                                (i = t.event),
                                (c = t.plugins),
                                (o = t.integrity),
                                (u = new Request(r, {
                                  integrity: o,
                                  cache: a,
                                  credentials: "same-origin",
                                })),
                                (e.next = 4),
                                Q.fetch({ event: i, plugins: c, request: u })
                              );
                            case 4:
                              (s = e.sent), (h = R(c || []));
                              try {
                                for (h.s(); !(l = h.n()).done; )
                                  "cacheWillUpdate" in (p = l.value) && (f = p);
                              } catch (d) {
                                h.e(d);
                              } finally {
                                h.f();
                              }
                              if (!f) {
                                e.next = 13;
                                break;
                              }
                              return (
                                (e.next = 10),
                                f.cacheWillUpdate({
                                  event: i,
                                  request: u,
                                  response: s,
                                })
                              );
                            case 10:
                              (e.t0 = e.sent), (e.next = 14);
                              break;
                            case 13:
                              e.t0 = s.status < 400;
                            case 14:
                              if (e.t0) {
                                e.next = 17;
                                break;
                              }
                              throw new v("bad-precaching-response", {
                                url: r,
                                status: s.status,
                              });
                            case 17:
                              if (!s.redirected) {
                                e.next = 21;
                                break;
                              }
                              return (e.next = 20), Y(s);
                            case 20:
                              s = e.sent;
                            case 21:
                              return (
                                (e.next = 23),
                                K.put({
                                  event: i,
                                  plugins: c,
                                  response: s,
                                  request: n === r ? u : new Request(n),
                                  cacheName: this._cacheName,
                                  matchOptions: { ignoreSearch: !0 },
                                })
                              );
                            case 23:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "getURLsToCacheKeys",
              value: function () {
                return this._urlsToCacheKeys;
              },
            },
            {
              key: "getCachedURLs",
              value: function () {
                return ee(this._urlsToCacheKeys.keys());
              },
            },
            {
              key: "getCacheKeyForURL",
              value: function (e) {
                var t = new URL(e, location.href);
                return this._urlsToCacheKeys.get(t.href);
              },
            },
            {
              key: "matchPrecache",
              value: (function () {
                var e = L(
                  b().mark(function e(t) {
                    var n, r, a;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((n = t instanceof Request ? t.url : t),
                                !(r = this.getCacheKeyForURL(n)))
                              ) {
                                e.next = 7;
                                break;
                              }
                              return (
                                (e.next = 5), self.caches.open(this._cacheName)
                              );
                            case 5:
                              return (
                                (a = e.sent), e.abrupt("return", a.match(r))
                              );
                            case 7:
                              return e.abrupt("return", void 0);
                            case 8:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "createHandler",
              value: function () {
                var e = this,
                  t =
                    !(arguments.length > 0 && void 0 !== arguments[0]) ||
                    arguments[0];
                return (function () {
                  var n = L(
                    b().mark(function n(r) {
                      var a, i;
                      return b().wrap(
                        function (n) {
                          for (;;)
                            switch ((n.prev = n.next)) {
                              case 0:
                                return (
                                  (a = r.request),
                                  (n.prev = 1),
                                  (n.next = 4),
                                  e.matchPrecache(a)
                                );
                              case 4:
                                if (!(i = n.sent)) {
                                  n.next = 7;
                                  break;
                                }
                                return n.abrupt("return", i);
                              case 7:
                                throw new v("missing-precache-entry", {
                                  cacheName: e._cacheName,
                                  url: a instanceof Request ? a.url : a,
                                });
                              case 10:
                                if (((n.prev = 10), (n.t0 = n.catch(1)), !t)) {
                                  n.next = 15;
                                  break;
                                }
                                return n.abrupt("return", fetch(a));
                              case 15:
                                throw n.t0;
                              case 16:
                              case "end":
                                return n.stop();
                            }
                        },
                        n,
                        null,
                        [[1, 10]]
                      );
                    })
                  );
                  return function (e) {
                    return n.apply(this, arguments);
                  };
                })();
              },
            },
            {
              key: "createHandlerBoundToURL",
              value: function (e) {
                var t =
                    !(arguments.length > 1 && void 0 !== arguments[1]) ||
                    arguments[1],
                  n = this.getCacheKeyForURL(e);
                if (!n) throw new v("non-precached-url", { url: e });
                var r = this.createHandler(t),
                  a = new Request(e);
                return function () {
                  return r({ request: a });
                };
              },
            },
          ]),
          e
        );
      })(),
      ce = function () {
        return ae || (ae = new ie()), ae;
      };
    function oe(e) {
      for (
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          n = function () {
            var n = a[r];
            t.some(function (e) {
              return e.test(n);
            }) && e.searchParams.delete(n);
          },
          r = 0,
          a = ee(e.searchParams.keys());
        r < a.length;
        r++
      )
        n();
      return e;
    }
    var ue = function (e, t) {
        var n,
          r = ce().getURLsToCacheKeys(),
          a = R(
            (function (e) {
              var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                n = t.ignoreURLParametersMatching,
                r = t.directoryIndex,
                a = t.cleanURLs,
                i = t.urlManipulation;
              return b().mark(function t() {
                var c, o, u, s, f, h, l, p;
                return b().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            ((c = new URL(e, location.href)).hash = ""),
                            (t.next = 4),
                            c.href
                          );
                        case 4:
                          return (o = oe(c, n)), (t.next = 7), o.href;
                        case 7:
                          if (!r || !o.pathname.endsWith("/")) {
                            t.next = 12;
                            break;
                          }
                          return (
                            ((u = new URL(o.href)).pathname += r),
                            (t.next = 12),
                            u.href
                          );
                        case 12:
                          if (!a) {
                            t.next = 17;
                            break;
                          }
                          return (
                            ((s = new URL(o.href)).pathname += ".html"),
                            (t.next = 17),
                            s.href
                          );
                        case 17:
                          if (!i) {
                            t.next = 36;
                            break;
                          }
                          (f = i({ url: c })), (h = R(f)), (t.prev = 20), h.s();
                        case 22:
                          if ((l = h.n()).done) {
                            t.next = 28;
                            break;
                          }
                          return (p = l.value), (t.next = 26), p.href;
                        case 26:
                          t.next = 22;
                          break;
                        case 28:
                          t.next = 33;
                          break;
                        case 30:
                          (t.prev = 30), (t.t0 = t.catch(20)), h.e(t.t0);
                        case 33:
                          return (t.prev = 33), h.f(), t.finish(33);
                        case 36:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[20, 30, 33, 36]]
                );
              })();
            })(e, t)
          );
        try {
          for (a.s(); !(n = a.n()).done; ) {
            var i = n.value,
              c = r.get(i);
            if (c) return c;
          }
        } catch (o) {
          a.e(o);
        } finally {
          a.f();
        }
      },
      se = !1;
    function fe(e) {
      se ||
        (!(function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            t = e.ignoreURLParametersMatching,
            n = void 0 === t ? [/^utm_/] : t,
            r = e.directoryIndex,
            a = void 0 === r ? "index.html" : r,
            i = e.cleanURLs,
            c = void 0 === i || i,
            o = e.urlManipulation,
            u = g();
          self.addEventListener("fetch", function (e) {
            var t = ue(e.request.url, {
              cleanURLs: c,
              directoryIndex: a,
              ignoreURLParametersMatching: n,
              urlManipulation: o,
            });
            if (t) {
              var r = self.caches
                .open(u)
                .then(function (e) {
                  return e.match(t);
                })
                .then(function (e) {
                  return e || fetch(t);
                });
              e.respondWith(r);
            }
          });
        })(e),
        (se = !0));
    }
    var he = function (e) {
        var t = ce(),
          n = ne();
        e.waitUntil(
          t.install({ event: e, plugins: n }).catch(function (e) {
            throw e;
          })
        );
      },
      le = function (e) {
        var t = ce();
        e.waitUntil(t.activate());
      };
    n(185);
    var pe,
      ve = function (e) {
        return e && "object" === typeof e ? e : { handle: e };
      },
      de = t(function e(t, n) {
        var a =
          arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : "GET";
        r(this, e), (this.handler = ve(n)), (this.match = t), (this.method = a);
      }),
      ye = (function (e) {
        i(a, e);
        var n = f(a);
        function a(e, t, i) {
          r(this, a);
          return n.call(
            this,
            function (t) {
              var n = t.url,
                r = e.exec(n.href);
              if (r && (n.origin === location.origin || 0 === r.index))
                return r.slice(1);
            },
            t,
            i
          );
        }
        return t(a);
      })(de),
      me = (function () {
        function e() {
          r(this, e), (this._routes = new Map());
        }
        return (
          t(e, [
            {
              key: "routes",
              get: function () {
                return this._routes;
              },
            },
            {
              key: "addFetchListener",
              value: function () {
                var e = this;
                self.addEventListener("fetch", function (t) {
                  var n = t.request,
                    r = e.handleRequest({ request: n, event: t });
                  r && t.respondWith(r);
                });
              },
            },
            {
              key: "addCacheListener",
              value: function () {
                var e = this;
                self.addEventListener("message", function (t) {
                  if (t.data && "CACHE_URLS" === t.data.type) {
                    var n = t.data.payload;
                    0;
                    var r = Promise.all(
                      n.urlsToCache.map(function (t) {
                        "string" === typeof t && (t = [t]);
                        var n = h(Request, ee(t));
                        return e.handleRequest({ request: n });
                      })
                    );
                    t.waitUntil(r),
                      t.ports &&
                        t.ports[0] &&
                        r.then(function () {
                          return t.ports[0].postMessage(!0);
                        });
                  }
                });
              },
            },
            {
              key: "handleRequest",
              value: function (e) {
                var t = this,
                  n = e.request,
                  r = e.event;
                var a = new URL(n.url, location.href);
                if (a.protocol.startsWith("http")) {
                  var i = this.findMatchingRoute({
                      url: a,
                      request: n,
                      event: r,
                    }),
                    c = i.params,
                    o = i.route,
                    u = o && o.handler;
                  if (
                    (!u && this._defaultHandler && (u = this._defaultHandler),
                    u)
                  ) {
                    var s;
                    0;
                    try {
                      s = u.handle({ url: a, request: n, event: r, params: c });
                    } catch (f) {
                      s = Promise.reject(f);
                    }
                    return (
                      s instanceof Promise &&
                        this._catchHandler &&
                        (s = s.catch(function (e) {
                          return t._catchHandler.handle({
                            url: a,
                            request: n,
                            event: r,
                          });
                        })),
                      s
                    );
                  }
                }
              },
            },
            {
              key: "findMatchingRoute",
              value: function (e) {
                var t = e.url,
                  n = e.request,
                  r = e.event;
                var a,
                  i = R(this._routes.get(n.method) || []);
                try {
                  for (i.s(); !(a = i.n()).done; ) {
                    var c = a.value,
                      o = void 0,
                      u = c.match({ url: t, request: n, event: r });
                    if (u)
                      return (
                        (o = u),
                        ((Array.isArray(u) && 0 === u.length) ||
                          (u.constructor === Object &&
                            0 === Object.keys(u).length) ||
                          "boolean" === typeof u) &&
                          (o = void 0),
                        { route: c, params: o }
                      );
                  }
                } catch (s) {
                  i.e(s);
                } finally {
                  i.f();
                }
                return {};
              },
            },
            {
              key: "setDefaultHandler",
              value: function (e) {
                this._defaultHandler = ve(e);
              },
            },
            {
              key: "setCatchHandler",
              value: function (e) {
                this._catchHandler = ve(e);
              },
            },
            {
              key: "registerRoute",
              value: function (e) {
                this._routes.has(e.method) || this._routes.set(e.method, []),
                  this._routes.get(e.method).push(e);
              },
            },
            {
              key: "unregisterRoute",
              value: function (e) {
                if (!this._routes.has(e.method))
                  throw new v("unregister-route-but-not-found-with-method", {
                    method: e.method,
                  });
                var t = this._routes.get(e.method).indexOf(e);
                if (!(t > -1))
                  throw new v("unregister-route-route-not-registered");
                this._routes.get(e.method).splice(t, 1);
              },
            },
          ]),
          e
        );
      })(),
      xe = function () {
        return (
          pe || ((pe = new me()).addFetchListener(), pe.addCacheListener()), pe
        );
      };
    function ge(e, t, n) {
      var r;
      if ("string" === typeof e) {
        var a = new URL(e, location.href);
        r = new de(
          function (e) {
            return e.url.href === a.href;
          },
          t,
          n
        );
      } else if (e instanceof RegExp) r = new ye(e, t, n);
      else if ("function" === typeof e) r = new de(e, t, n);
      else {
        if (!(e instanceof de))
          throw new v("unsupported-route-type", {
            moduleName: "workbox-routing",
            funcName: "registerRoute",
            paramName: "capture",
          });
        r = e;
      }
      return xe().registerRoute(r), r;
    }
    n(833);
    var we,
      be = {
        cacheWillUpdate: (function () {
          var e = L(
            b().mark(function e(t) {
              var n;
              return b().wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (200 !== (n = t.response).status && 0 !== n.status) {
                        e.next = 3;
                        break;
                      }
                      return e.abrupt("return", n);
                    case 3:
                      return e.abrupt("return", null);
                    case 4:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
      },
      ke = (function () {
        function e() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (
            (r(this, e),
            (this._cacheName = w(t.cacheName)),
            (this._plugins = t.plugins || []),
            t.plugins)
          ) {
            var n = t.plugins.some(function (e) {
              return !!e.cacheWillUpdate;
            });
            this._plugins = n ? t.plugins : [be].concat(ee(t.plugins));
          } else this._plugins = [be];
          (this._fetchOptions = t.fetchOptions),
            (this._matchOptions = t.matchOptions);
        }
        return (
          t(e, [
            {
              key: "handle",
              value: (function () {
                var e = L(
                  b().mark(function e(t) {
                    var n, r, a, i, c;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.event),
                                (r = t.request),
                                [],
                                "string" === typeof r && (r = new Request(r)),
                                (a = this._getFromNetwork({
                                  request: r,
                                  event: n,
                                })),
                                (e.next = 7),
                                K.match({
                                  cacheName: this._cacheName,
                                  request: r,
                                  event: n,
                                  matchOptions: this._matchOptions,
                                  plugins: this._plugins,
                                })
                              );
                            case 7:
                              if (!(i = e.sent)) {
                                e.next = 13;
                                break;
                              }
                              if (n)
                                try {
                                  n.waitUntil(a);
                                } catch (c) {
                                  0;
                                }
                              e.next = 23;
                              break;
                            case 13:
                              return (e.prev = 14), (e.next = 17), a;
                            case 17:
                              (i = e.sent), (e.next = 23);
                              break;
                            case 20:
                              (e.prev = 20), (e.t0 = e.catch(14)), (c = e.t0);
                            case 23:
                              if (i) {
                                e.next = 26;
                                break;
                              }
                              throw new v("no-response", {
                                url: r.url,
                                error: c,
                              });
                            case 26:
                              return e.abrupt("return", i);
                            case 27:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [[14, 20]]
                    );
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "_getFromNetwork",
              value: (function () {
                var e = L(
                  b().mark(function e(t) {
                    var n, r, a, i;
                    return b().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = t.request),
                                (r = t.event),
                                (e.next = 3),
                                Q.fetch({
                                  request: n,
                                  event: r,
                                  fetchOptions: this._fetchOptions,
                                  plugins: this._plugins,
                                })
                              );
                            case 3:
                              if (
                                ((a = e.sent),
                                (i = K.put({
                                  cacheName: this._cacheName,
                                  request: n,
                                  response: a.clone(),
                                  event: r,
                                  plugins: this._plugins,
                                })),
                                r)
                              )
                                try {
                                  r.waitUntil(i);
                                } catch (c) {
                                  0;
                                }
                              return e.abrupt("return", a);
                            case 7:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
            },
          ]),
          e
        );
      })();
    self.addEventListener("activate", function () {
      return self.clients.claim();
    }),
      (function (e) {
        ce().addToCacheList(e),
          e.length > 0 &&
            (self.addEventListener("install", he),
            self.addEventListener("activate", le));
      })([
        { revision: "ab6490a8e883c2c565c8089d0086e23a", url: "/index.html" },
        { revision: null, url: "/static/css/main.b0c76fdf.css" },
        { revision: null, url: "/static/js/186.8d61a4c1.chunk.js" },
        { revision: null, url: "/static/js/22.2f00329f.chunk.js" },
        { revision: null, url: "/static/js/272.58e096bc.chunk.js" },
        { revision: null, url: "/static/js/372.f865f629.chunk.js" },
        { revision: null, url: "/static/js/377.20a09993.chunk.js" },
        { revision: null, url: "/static/js/443.4f63130a.chunk.js" },
        { revision: null, url: "/static/js/738.d1548544.chunk.js" },
        { revision: null, url: "/static/js/841.d11f7d06.chunk.js" },
        { revision: null, url: "/static/js/851.9a052213.chunk.js" },
        { revision: null, url: "/static/js/856.899bbc2a.chunk.js" },
        { revision: null, url: "/static/js/main.5f4e131c.js" },
        { revision: null, url: "/static/media/1st.84cc34fe4fd43d422619.png" },
        { revision: null, url: "/static/media/2nd.23be2239502b95ef989d.png" },
        { revision: null, url: "/static/media/3rd.83e94f5a12b390e2992d.png" },
        {
          revision: null,
          url: "/static/media/coverphoto.00ab85a403f91d9b1a3c.png",
        },
        { revision: null, url: "/static/media/logo.901387f3a152b055e21a.jpeg" },
        {
          revision: null,
          url: "/static/media/mailbox.d3d43b322d45f5455252.png",
        },
        {
          revision: null,
          url: "/static/media/mission.2b53302db0edd744d95c.png",
        },
      ]),
      fe(we);
    var _e,
      Re = new RegExp("/[^/?]+\\.[^/]+$");
    ge(function (e) {
      var t = e.request,
        n = e.url;
      return (
        "navigate" === t.mode &&
        !n.pathname.startsWith("/_") &&
        !n.pathname.match(Re)
      );
    }, ((_e = "/index.html"), ce().createHandlerBoundToURL(_e))),
      ge(function (e) {
        var t = e.url;
        return t.origin === self.location.origin && t.pathname.endsWith(".png");
      }, new ke({ cacheName: "images", plugins: [new Z({ maxEntries: 50 })] })),
      self.addEventListener("message", function (e) {
        e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
      });
  })();
})();
//# sourceMappingURL=service-worker.js.map
