var Rn = Array.isArray, f1 = Array.prototype.indexOf, Bi = Array.from, Si = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, Cs = Object.getOwnPropertyDescriptors, h1 = Object.prototype, p1 = Array.prototype, Hi = Object.getPrototypeOf, Dr = Object.isExtensible;
function Vt(t) {
  return typeof t == "function";
}
const J = () => {
};
function g1(t) {
  return t();
}
function _n(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function v1() {
  var t, e, n = new Promise((i, r) => {
    t = i, e = r;
  });
  return { promise: n, resolve: t, reject: e };
}
const ye = 2, Vi = 4, Ln = 8, jt = 16, Ge = 32, rt = 64, As = 128, we = 256, Sn = 512, oe = 1024, Ce = 2048, st = 4096, xe = 8192, gt = 16384, Wi = 32768, rn = 65536, Mr = 1 << 17, b1 = 1 << 18, Dt = 1 << 19, Es = 1 << 20, xi = 1 << 21, Ki = 1 << 22, ct = 1 << 23, Ve = Symbol("$state"), Ps = Symbol("legacy props"), y1 = Symbol(""), Ui = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function k1() {
  throw new Error("https://svelte.dev/e/await_outside_boundary");
}
function Ts(t) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function w1() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function _1(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function S1() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function x1(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function C1() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function A1(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function E1() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function P1() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function T1() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
const Bn = 1, Hn = 2, Os = 4, O1 = 8, Z1 = 16, z1 = 1, I1 = 2, N1 = 4, j1 = 8, D1 = 16, M1 = 1, F1 = 2, ae = Symbol(), R1 = "http://www.w3.org/1999/xhtml", Zs = "@attach";
function L1() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let B1 = !1;
function zs(t) {
  return t === this.v;
}
function Is(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function H1(t, e) {
  return t !== e;
}
function Ns(t) {
  return !Is(t, this.v);
}
let Mt = !1;
function V1() {
  Mt = !0;
}
let te = null;
function xn(t) {
  te = t;
}
function Fr(t) {
  return (
    /** @type {T} */
    Vn().get(t)
  );
}
function W1(t, e) {
  return Vn().set(t, e), e;
}
function K1(t) {
  return Vn().has(t);
}
function U1() {
  return Vn();
}
function K(t, e = !1, n) {
  te = {
    p: te,
    c: null,
    e: null,
    s: t,
    x: null,
    l: Mt && !e ? { s: null, u: null, $: [] } : null
  };
}
function U(t) {
  var e = (
    /** @type {ComponentContext} */
    te
  ), n = e.e;
  if (n !== null) {
    e.e = null;
    for (var i of n)
      Ys(i);
  }
  return te = e.p, /** @type {T} */
  {};
}
function Ft() {
  return !Mt || te !== null && te.l === null;
}
function Vn(t) {
  return te === null && Ts(), te.c ??= new Map(q1(te) || void 0);
}
function q1(t) {
  let e = t.p;
  for (; e !== null; ) {
    const n = e.c;
    if (n !== null)
      return n;
    e = e.p;
  }
  return null;
}
const G1 = /* @__PURE__ */ new WeakMap();
function Y1(t) {
  var e = V;
  if (e === null)
    return H.f |= ct, t;
  if ((e.f & Wi) === 0) {
    if ((e.f & As) === 0)
      throw !e.parent && t instanceof Error && js(t), t;
    e.b.error(t);
  } else
    qi(t, e);
}
function qi(t, e) {
  for (; e !== null; ) {
    if ((e.f & As) !== 0)
      try {
        e.b.error(t);
        return;
      } catch (n) {
        t = n;
      }
    e = e.parent;
  }
  throw t instanceof Error && js(t), t;
}
function js(t) {
  const e = G1.get(t);
  e && (Si(t, "message", {
    value: e.message
  }), Si(t, "stack", {
    value: e.stack
  }));
}
let Ye = [], Cn = [];
function Ds() {
  var t = Ye;
  Ye = [], _n(t);
}
function X1() {
  var t = Cn;
  Cn = [], _n(t);
}
function J1() {
  return Ye.length > 0 || Cn.length > 0;
}
function sn(t) {
  if (Ye.length === 0 && !Xt) {
    var e = Ye;
    queueMicrotask(() => {
      e === Ye && Ds();
    });
  }
  Ye.push(t);
}
function Q1() {
  Ye.length > 0 && Ds(), Cn.length > 0 && X1();
}
function Ms(t) {
  let e = 0, n = ht(0), i;
  return () => {
    fo() && (h(n), Js(() => (e === 0 && (i = De(() => t(() => Ze(n)))), e += 1, () => {
      sn(() => {
        e -= 1, e === 0 && (i?.(), i = void 0, Ze(n));
      });
    })));
  };
}
function $1() {
  const t = (
    /** @type {Effect} */
    V.b
  );
  return t === null && k1(), t;
}
// @__NO_SIDE_EFFECTS__
function an(t) {
  var e = ye | Ce, n = H !== null && (H.f & ye) !== 0 ? (
    /** @type {Derived} */
    H
  ) : null;
  return V === null || n !== null && (n.f & we) !== 0 ? e |= we : V.f |= Dt, {
    ctx: te,
    deps: null,
    effects: null,
    equals: zs,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      ae
    ),
    wv: 0,
    parent: n ?? V,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function eo(t, e) {
  let n = (
    /** @type {Effect | null} */
    V
  );
  n === null && w1();
  var i = (
    /** @type {Boundary} */
    n.b
  ), r = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = ht(
    /** @type {V} */
    ae
  ), a = null, o = !H;
  return vo(() => {
    try {
      var l = t();
      a && Promise.resolve(l).catch(() => {
      });
    } catch (p) {
      l = Promise.reject(p);
    }
    var d = () => l;
    r = a?.then(d, d) ?? Promise.resolve(l), a = r;
    var c = (
      /** @type {Batch} */
      Y
    ), u = i.is_pending();
    o && (i.update_pending_count(1), u || c.increment());
    const m = (p, f = void 0) => {
      a = null, u || c.activate(), f ? f !== Ui && (s.f |= ct, Jt(s, f)) : ((s.f & ct) !== 0 && (s.f ^= ct), Jt(s, p)), o && (i.update_pending_count(-1), u || c.decrement()), Bs();
    };
    if (r.then(m, (p) => m(null, p || "unknown")), c)
      return () => {
        queueMicrotask(() => c.neuter());
      };
  }), new Promise((l) => {
    function d(c) {
      function u() {
        c === r ? l(s) : d(r);
      }
      c.then(u, u);
    }
    d(r);
  });
}
// @__NO_SIDE_EFFECTS__
function P(t) {
  const e = /* @__PURE__ */ an(t);
  return ia(e), e;
}
// @__NO_SIDE_EFFECTS__
function Ct(t) {
  const e = /* @__PURE__ */ an(t);
  return e.equals = Ns, e;
}
function Fs(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var n = 0; n < e.length; n += 1)
      pe(
        /** @type {Effect} */
        e[n]
      );
  }
}
function to(t) {
  for (var e = t.parent; e !== null; ) {
    if ((e.f & ye) === 0)
      return (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function Gi(t) {
  var e, n = V;
  tt(to(t));
  try {
    Fs(t), e = oa(t);
  } finally {
    tt(n);
  }
  return e;
}
function Rs(t) {
  var e = Gi(t);
  if (t.equals(e) || (t.v = e, t.wv = sa()), !yt) {
    var n = (Xe || (t.f & we) !== 0) && t.deps !== null ? st : oe;
    he(t, n);
  }
}
function Ls(t, e, n) {
  const i = Ft() ? an : Ct;
  if (e.length === 0) {
    n(t.map(i));
    return;
  }
  var r = Y, s = (
    /** @type {Effect} */
    V
  ), a = no(), o = $1();
  Promise.all(e.map((l) => /* @__PURE__ */ eo(l))).then((l) => {
    r?.activate(), a();
    try {
      n([...t.map(i), ...l]);
    } catch (d) {
      (s.f & gt) === 0 && qi(d, s);
    }
    r?.deactivate(), Bs();
  }).catch((l) => {
    o.error(l);
  });
}
function no() {
  var t = V, e = H, n = te, i = Y;
  return function() {
    tt(t), je(e), xn(n), i?.activate();
  };
}
function Bs() {
  tt(null), je(null), xn(null);
}
const ci = /* @__PURE__ */ new Set();
let Y = null, bn = null, Rr = /* @__PURE__ */ new Set(), mt = [], Wn = null, Ci = !1, Xt = !1;
class ft {
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  #e = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #t = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #n = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #i = null;
  /**
   * True if an async effect inside this batch resolved and
   * its parent branch was already deleted
   */
  #r = !1;
  /**
   * Async effects (created inside `async_derived`) encountered during processing.
   * These run after the rest of the batch has updated, since they should
   * always have the latest values
   * @type {Effect[]}
   */
  #s = [];
  /**
   * The same as `#async_effects`, but for effects inside a newly-created
   * `<svelte:boundary>` — these do not prevent the batch from committing
   * @type {Effect[]}
   */
  #o = [];
  /**
   * Template effects and `$effect.pre` effects, which run when
   * a batch is committed
   * @type {Effect[]}
   */
  #a = [];
  /**
   * The same as `#render_effects`, but for `$effect` (which runs after)
   * @type {Effect[]}
   */
  #l = [];
  /**
   * Block effects, which may need to re-run on subsequent flushes
   * in order to update internal sources (e.g. each block items)
   * @type {Effect[]}
   */
  #d = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Effect[]}
   */
  #u = [];
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Effect[]}
   */
  #c = [];
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(e) {
    mt = [], bn = null;
    for (const r of e)
      this.#h(r);
    if (this.#s.length === 0 && this.#n === 0) {
      this.#f();
      var n = this.#a, i = this.#l;
      this.#a = [], this.#l = [], this.#d = [], bn = Y, Y = null, Lr(n), Lr(i), Y === null ? Y = this : ci.delete(this), this.#i?.resolve();
    } else
      this.#m(this.#a), this.#m(this.#l), this.#m(this.#d);
    for (const r of this.#s)
      Et(r);
    for (const r of this.#o)
      Et(r);
    this.#s = [], this.#o = [];
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   */
  #h(e) {
    e.f ^= oe;
    for (var n = e.first; n !== null; ) {
      var i = n.f, r = (i & (Ge | rt)) !== 0, s = r && (i & oe) !== 0, a = s || (i & xe) !== 0 || this.skipped_effects.has(n);
      if (!a && n.fn !== null) {
        if (r)
          n.f ^= oe;
        else if ((i & Vi) !== 0)
          this.#l.push(n);
        else if ((i & oe) === 0)
          if ((i & Ki) !== 0) {
            var o = n.b?.is_pending() ? this.#o : this.#s;
            o.push(n);
          } else Gn(n) && ((n.f & jt) !== 0 && this.#d.push(n), Et(n));
        var l = n.first;
        if (l !== null) {
          n = l;
          continue;
        }
      }
      var d = n.parent;
      for (n = n.next; n === null && d !== null; )
        n = d.next, d = d.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #m(e) {
    for (const n of e)
      ((n.f & Ce) !== 0 ? this.#u : this.#c).push(n), he(n, oe);
    e.length = 0;
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, n) {
    this.#e.has(e) || this.#e.set(e, n), this.current.set(e, e.v);
  }
  activate() {
    Y = this;
  }
  deactivate() {
    Y = null, bn = null;
    for (const e of Rr)
      if (Rr.delete(e), e(), Y !== null)
        break;
  }
  neuter() {
    this.#r = !0;
  }
  flush() {
    mt.length > 0 ? Hs() : this.#f(), Y === this && (this.#n === 0 && ci.delete(this), this.deactivate());
  }
  /**
   * Append and remove branches to/from the DOM
   */
  #f() {
    if (!this.#r)
      for (const e of this.#t)
        e();
    this.#t.clear();
  }
  increment() {
    this.#n += 1;
  }
  decrement() {
    if (this.#n -= 1, this.#n === 0) {
      for (const e of this.#u)
        he(e, Ce), Ot(e);
      for (const e of this.#c)
        he(e, st), Ot(e);
      this.#a = [], this.#l = [], this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(e) {
    this.#t.add(e);
  }
  settled() {
    return (this.#i ??= v1()).promise;
  }
  static ensure() {
    if (Y === null) {
      const e = Y = new ft();
      ci.add(Y), Xt || ft.enqueue(() => {
        Y === e && e.flush();
      });
    }
    return Y;
  }
  /** @param {() => void} task */
  static enqueue(e) {
    sn(e);
  }
}
function io(t) {
  var e = Xt;
  Xt = !0;
  try {
    for (var n; ; ) {
      if (Q1(), mt.length === 0 && !J1() && (Y?.flush(), mt.length === 0))
        return Wn = null, /** @type {T} */
        n;
      Hs();
    }
  } finally {
    Xt = e;
  }
}
function Hs() {
  var t = At;
  Ci = !0;
  try {
    var e = 0;
    for (Kr(!0); mt.length > 0; ) {
      var n = ft.ensure();
      if (e++ > 1e3) {
        var i, r;
        ro();
      }
      n.process(mt), $e.clear();
    }
  } finally {
    Ci = !1, Kr(t), Wn = null;
  }
}
function ro() {
  try {
    C1();
  } catch (t) {
    qi(t, Wn);
  }
}
let dt = null;
function Lr(t) {
  var e = t.length;
  if (e !== 0) {
    for (var n = 0; n < e; ) {
      var i = t[n++];
      if ((i.f & (gt | xe)) === 0 && Gn(i) && (dt = [], Et(i), i.deps === null && i.first === null && i.nodes_start === null && (i.teardown === null && i.ac === null ? ea(i) : i.fn = null), dt?.length > 0)) {
        $e.clear();
        for (const r of dt)
          Et(r);
        dt = [];
      }
    }
    dt = null;
  }
}
function Ot(t) {
  for (var e = Wn = t; e.parent !== null; ) {
    e = e.parent;
    var n = e.f;
    if (Ci && e === V && (n & jt) !== 0)
      return;
    if ((n & (rt | Ge)) !== 0) {
      if ((n & oe) === 0) return;
      e.f ^= oe;
    }
  }
  mt.push(e);
}
const $e = /* @__PURE__ */ new Map();
function ht(t, e) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: zs,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function N(t, e) {
  const n = ht(t);
  return ia(n), n;
}
// @__NO_SIDE_EFFECTS__
function Vs(t, e = !1, n = !0) {
  const i = ht(t);
  return e || (i.equals = Ns), Mt && n && te !== null && te.l !== null && (te.l.s ??= []).push(i), i;
}
function Br(t, e) {
  return C(
    t,
    De(() => h(t))
  ), e;
}
function C(t, e, n = !1) {
  H !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Se || (H.f & Mr) !== 0) && Ft() && (H.f & (ye | jt | Ki | Mr)) !== 0 && !We?.includes(t) && T1();
  let i = n ? ce(e) : e;
  return Jt(t, i);
}
function Jt(t, e) {
  if (!t.equals(e)) {
    var n = t.v;
    yt ? $e.set(t, e) : $e.set(t, n), t.v = e;
    var i = ft.ensure();
    i.capture(t, n), (t.f & ye) !== 0 && ((t.f & Ce) !== 0 && Gi(
      /** @type {Derived} */
      t
    ), he(t, (t.f & we) === 0 ? oe : st)), t.wv = sa(), Ws(t, Ce), Ft() && V !== null && (V.f & oe) !== 0 && (V.f & (Ge | rt)) === 0 && (ke === null ? ko([t]) : ke.push(t));
  }
  return e;
}
function Ze(t) {
  C(t, t.v + 1);
}
function Ws(t, e) {
  var n = t.reactions;
  if (n !== null)
    for (var i = Ft(), r = n.length, s = 0; s < r; s++) {
      var a = n[s], o = a.f;
      if (!(!i && a === V)) {
        var l = (o & Ce) === 0;
        l && he(a, e), (o & ye) !== 0 ? Ws(
          /** @type {Derived} */
          a,
          st
        ) : l && ((o & jt) !== 0 && dt !== null && dt.push(
          /** @type {Effect} */
          a
        ), Ot(
          /** @type {Effect} */
          a
        ));
      }
    }
}
function ce(t) {
  if (typeof t != "object" || t === null || Ve in t)
    return t;
  const e = Hi(t);
  if (e !== h1 && e !== p1)
    return t;
  var n = /* @__PURE__ */ new Map(), i = Rn(t), r = /* @__PURE__ */ N(0), s = Ke, a = (o) => {
    if (Ke === s)
      return o();
    var l = H, d = Ke;
    je(null), qr(s);
    var c = o();
    return je(l), qr(d), c;
  };
  return i && n.set("length", /* @__PURE__ */ N(
    /** @type {any[]} */
    t.length
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(o, l, d) {
        (!("value" in d) || d.configurable === !1 || d.enumerable === !1 || d.writable === !1) && E1();
        var c = n.get(l);
        return c === void 0 ? c = a(() => {
          var u = /* @__PURE__ */ N(d.value);
          return n.set(l, u), u;
        }) : C(c, d.value, !0), !0;
      },
      deleteProperty(o, l) {
        var d = n.get(l);
        if (d === void 0) {
          if (l in o) {
            const c = a(() => /* @__PURE__ */ N(ae));
            n.set(l, c), Ze(r);
          }
        } else
          C(d, ae), Ze(r);
        return !0;
      },
      get(o, l, d) {
        if (l === Ve)
          return t;
        var c = n.get(l), u = l in o;
        if (c === void 0 && (!u || Qe(o, l)?.writable) && (c = a(() => {
          var p = ce(u ? o[l] : ae), f = /* @__PURE__ */ N(p);
          return f;
        }), n.set(l, c)), c !== void 0) {
          var m = h(c);
          return m === ae ? void 0 : m;
        }
        return Reflect.get(o, l, d);
      },
      getOwnPropertyDescriptor(o, l) {
        var d = Reflect.getOwnPropertyDescriptor(o, l);
        if (d && "value" in d) {
          var c = n.get(l);
          c && (d.value = h(c));
        } else if (d === void 0) {
          var u = n.get(l), m = u?.v;
          if (u !== void 0 && m !== ae)
            return {
              enumerable: !0,
              configurable: !0,
              value: m,
              writable: !0
            };
        }
        return d;
      },
      has(o, l) {
        if (l === Ve)
          return !0;
        var d = n.get(l), c = d !== void 0 && d.v !== ae || Reflect.has(o, l);
        if (d !== void 0 || V !== null && (!c || Qe(o, l)?.writable)) {
          d === void 0 && (d = a(() => {
            var m = c ? ce(o[l]) : ae, p = /* @__PURE__ */ N(m);
            return p;
          }), n.set(l, d));
          var u = h(d);
          if (u === ae)
            return !1;
        }
        return c;
      },
      set(o, l, d, c) {
        var u = n.get(l), m = l in o;
        if (i && l === "length")
          for (var p = d; p < /** @type {Source<number>} */
          u.v; p += 1) {
            var f = n.get(p + "");
            f !== void 0 ? C(f, ae) : p in o && (f = a(() => /* @__PURE__ */ N(ae)), n.set(p + "", f));
          }
        if (u === void 0)
          (!m || Qe(o, l)?.writable) && (u = a(() => /* @__PURE__ */ N(void 0)), C(u, ce(d)), n.set(l, u));
        else {
          m = u.v !== ae;
          var g = a(() => ce(d));
          C(u, g);
        }
        var b = Reflect.getOwnPropertyDescriptor(o, l);
        if (b?.set && b.set.call(c, d), !m) {
          if (i && typeof l == "string") {
            var k = (
              /** @type {Source<number>} */
              n.get("length")
            ), y = Number(l);
            Number.isInteger(y) && y >= k.v && C(k, y + 1);
          }
          Ze(r);
        }
        return !0;
      },
      ownKeys(o) {
        h(r);
        var l = Reflect.ownKeys(o).filter((u) => {
          var m = n.get(u);
          return m === void 0 || m.v !== ae;
        });
        for (var [d, c] of n)
          c.v !== ae && !(d in o) && l.push(d);
        return l;
      },
      setPrototypeOf() {
        P1();
      }
    }
  );
}
function Hr(t) {
  try {
    if (t !== null && typeof t == "object" && Ve in t)
      return t[Ve];
  } catch {
  }
  return t;
}
function so(t, e) {
  return Object.is(Hr(t), Hr(e));
}
var Vr, Ks, Us, qs;
function ao() {
  if (Vr === void 0) {
    Vr = window, Ks = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype, n = Text.prototype;
    Us = Qe(e, "firstChild").get, qs = Qe(e, "nextSibling").get, Dr(t) && (t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__style = void 0, t.__e = void 0), Dr(n) && (n.__t = void 0);
  }
}
function vt(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function Zt(t) {
  return Us.call(t);
}
// @__NO_SIDE_EFFECTS__
function Kn(t) {
  return qs.call(t);
}
function Q(t, e) {
  return /* @__PURE__ */ Zt(t);
}
function Z(t, e) {
  {
    var n = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Zt(
        /** @type {Node} */
        t
      )
    );
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Kn(n) : n;
  }
}
function re(t, e = 1, n = !1) {
  let i = t;
  for (; e--; )
    i = /** @type {TemplateNode} */
    /* @__PURE__ */ Kn(i);
  return i;
}
function oo(t) {
  t.textContent = "";
}
function Un() {
  return !1;
}
function lo(t, e) {
  if (e) {
    const n = document.body;
    t.autofocus = !0, sn(() => {
      document.activeElement === n && t.focus();
    });
  }
}
let Wr = !1;
function co() {
  Wr || (Wr = !0, document.addEventListener(
    "reset",
    (t) => {
      Promise.resolve().then(() => {
        if (!t.defaultPrevented)
          for (
            const e of
            /**@type {HTMLFormElement} */
            t.target.elements
          )
            e.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function qn(t) {
  var e = H, n = V;
  je(null), tt(null);
  try {
    return t();
  } finally {
    je(e), tt(n);
  }
}
function uo(t, e, n, i = n) {
  t.addEventListener(e, () => qn(n));
  const r = t.__on_r;
  r ? t.__on_r = () => {
    r(), i(!0);
  } : t.__on_r = () => i(!0), co();
}
function Gs(t) {
  V === null && H === null && x1(), H !== null && (H.f & we) !== 0 && V === null && S1(), yt && _1();
}
function mo(t, e) {
  var n = e.last;
  n === null ? e.last = e.first = t : (n.next = t, t.prev = n, e.last = t);
}
function Pe(t, e, n, i = !0) {
  var r = V;
  r !== null && (r.f & xe) !== 0 && (t |= xe);
  var s = {
    ctx: te,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | Ce,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: r,
    b: r && r.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (n)
    try {
      Et(s), s.f |= Wi;
    } catch (l) {
      throw pe(s), l;
    }
  else e !== null && Ot(s);
  if (i) {
    var a = s;
    if (n && a.deps === null && a.teardown === null && a.nodes_start === null && a.first === a.last && // either `null`, or a singular child
    (a.f & Dt) === 0 && (a = a.first), a !== null && (a.parent = r, r !== null && mo(a, r), H !== null && (H.f & ye) !== 0 && (t & rt) === 0)) {
      var o = (
        /** @type {Derived} */
        H
      );
      (o.effects ??= []).push(a);
    }
  }
  return s;
}
function fo() {
  return H !== null && !Se;
}
function ho(t) {
  const e = Pe(Ln, null, !1);
  return he(e, oe), e.teardown = t, e;
}
function se(t) {
  Gs();
  var e = (
    /** @type {Effect} */
    V.f
  ), n = !H && (e & Ge) !== 0 && (e & Wi) === 0;
  if (n) {
    var i = (
      /** @type {ComponentContext} */
      te
    );
    (i.e ??= []).push(t);
  } else
    return Ys(t);
}
function Ys(t) {
  return Pe(Vi | Es, t, !1);
}
function Yi(t) {
  return Gs(), Pe(Ln | Es, t, !0);
}
function po(t) {
  ft.ensure();
  const e = Pe(rt | Dt, t, !0);
  return () => {
    pe(e);
  };
}
function go(t) {
  ft.ensure();
  const e = Pe(rt | Dt, t, !0);
  return (n = {}) => new Promise((i) => {
    n.outro ? on(e, () => {
      pe(e), i(void 0);
    }) : (pe(e), i(void 0));
  });
}
function Xs(t) {
  return Pe(Vi, t, !1);
}
function vo(t) {
  return Pe(Ki | Dt, t, !0);
}
function Js(t, e = 0) {
  return Pe(Ln | e, t, !0);
}
function et(t, e = [], n = []) {
  Ls(e, n, (i) => {
    Pe(Ln, () => t(...i.map(h)), !0);
  });
}
function bt(t, e = 0) {
  var n = Pe(jt | e, t, !0);
  return n;
}
function Ne(t, e = !0) {
  return Pe(Ge | Dt, t, !0, e);
}
function Qs(t) {
  var e = t.teardown;
  if (e !== null) {
    const n = yt, i = H;
    Ur(!0), je(null);
    try {
      e.call(null);
    } finally {
      Ur(n), je(i);
    }
  }
}
function $s(t, e = !1) {
  var n = t.first;
  for (t.first = t.last = null; n !== null; ) {
    const r = n.ac;
    r !== null && qn(() => {
      r.abort(Ui);
    });
    var i = n.next;
    (n.f & rt) !== 0 ? n.parent = null : pe(n, e), n = i;
  }
}
function bo(t) {
  for (var e = t.first; e !== null; ) {
    var n = e.next;
    (e.f & Ge) === 0 && pe(e), e = n;
  }
}
function pe(t, e = !0) {
  var n = !1;
  (e || (t.f & b1) !== 0) && t.nodes_start !== null && t.nodes_end !== null && (yo(
    t.nodes_start,
    /** @type {TemplateNode} */
    t.nodes_end
  ), n = !0), $s(t, e && !n), An(t, 0), he(t, gt);
  var i = t.transitions;
  if (i !== null)
    for (const s of i)
      s.stop();
  Qs(t);
  var r = t.parent;
  r !== null && r.first !== null && ea(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = t.ac = null;
}
function yo(t, e) {
  for (; t !== null; ) {
    var n = t === e ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Kn(t)
    );
    t.remove(), t = n;
  }
}
function ea(t) {
  var e = t.parent, n = t.prev, i = t.next;
  n !== null && (n.next = i), i !== null && (i.prev = n), e !== null && (e.first === t && (e.first = i), e.last === t && (e.last = n));
}
function on(t, e) {
  var n = [];
  Xi(t, n, !0), ta(n, () => {
    pe(t), e && e();
  });
}
function ta(t, e) {
  var n = t.length;
  if (n > 0) {
    var i = () => --n || e();
    for (var r of t)
      r.out(i);
  } else
    e();
}
function Xi(t, e, n) {
  if ((t.f & xe) === 0) {
    if (t.f ^= xe, t.transitions !== null)
      for (const a of t.transitions)
        (a.is_global || n) && e.push(a);
    for (var i = t.first; i !== null; ) {
      var r = i.next, s = (i.f & rn) !== 0 || (i.f & Ge) !== 0;
      Xi(i, e, s ? n : !1), i = r;
    }
  }
}
function Ji(t) {
  na(t, !0);
}
function na(t, e) {
  if ((t.f & xe) !== 0) {
    t.f ^= xe, (t.f & oe) === 0 && (he(t, Ce), Ot(t));
    for (var n = t.first; n !== null; ) {
      var i = n.next, r = (n.f & rn) !== 0 || (n.f & Ge) !== 0;
      na(n, r ? e : !1), n = i;
    }
    if (t.transitions !== null)
      for (const s of t.transitions)
        (s.is_global || e) && s.in();
  }
}
let At = !1;
function Kr(t) {
  At = t;
}
let yt = !1;
function Ur(t) {
  yt = t;
}
let H = null, Se = !1;
function je(t) {
  H = t;
}
let V = null;
function tt(t) {
  V = t;
}
let We = null;
function ia(t) {
  H !== null && (We === null ? We = [t] : We.push(t));
}
let de = null, ge = 0, ke = null;
function ko(t) {
  ke = t;
}
let ra = 1, Qt = 0, Ke = Qt;
function qr(t) {
  Ke = t;
}
let Xe = !1;
function sa() {
  return ++ra;
}
function Gn(t) {
  var e = t.f;
  if ((e & Ce) !== 0)
    return !0;
  if ((e & st) !== 0) {
    var n = t.deps, i = (e & we) !== 0;
    if (n !== null) {
      var r, s, a = (e & Sn) !== 0, o = i && V !== null && !Xe, l = n.length;
      if ((a || o) && (V === null || (V.f & gt) === 0)) {
        var d = (
          /** @type {Derived} */
          t
        ), c = d.parent;
        for (r = 0; r < l; r++)
          s = n[r], (a || !s?.reactions?.includes(d)) && (s.reactions ??= []).push(d);
        a && (d.f ^= Sn), o && c !== null && (c.f & we) === 0 && (d.f ^= we);
      }
      for (r = 0; r < l; r++)
        if (s = n[r], Gn(
          /** @type {Derived} */
          s
        ) && Rs(
          /** @type {Derived} */
          s
        ), s.wv > t.wv)
          return !0;
    }
    (!i || V !== null && !Xe) && he(t, oe);
  }
  return !1;
}
function aa(t, e, n = !0) {
  var i = t.reactions;
  if (i !== null && !We?.includes(t))
    for (var r = 0; r < i.length; r++) {
      var s = i[r];
      (s.f & ye) !== 0 ? aa(
        /** @type {Derived} */
        s,
        e,
        !1
      ) : e === s && (n ? he(s, Ce) : (s.f & oe) !== 0 && he(s, st), Ot(
        /** @type {Effect} */
        s
      ));
    }
}
function oa(t) {
  var e = de, n = ge, i = ke, r = H, s = Xe, a = We, o = te, l = Se, d = Ke, c = t.f;
  de = /** @type {null | Value[]} */
  null, ge = 0, ke = null, Xe = (c & we) !== 0 && (Se || !At || H === null), H = (c & (Ge | rt)) === 0 ? t : null, We = null, xn(t.ctx), Se = !1, Ke = ++Qt, t.ac !== null && (qn(() => {
    t.ac.abort(Ui);
  }), t.ac = null);
  try {
    t.f |= xi;
    var u = (
      /** @type {Function} */
      t.fn
    ), m = u(), p = t.deps;
    if (de !== null) {
      var f;
      if (An(t, ge), p !== null && ge > 0)
        for (p.length = ge + de.length, f = 0; f < de.length; f++)
          p[ge + f] = de[f];
      else
        t.deps = p = de;
      if (!Xe || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (c & ye) !== 0 && /** @type {import('#client').Derived} */
      t.reactions !== null)
        for (f = ge; f < p.length; f++)
          (p[f].reactions ??= []).push(t);
    } else p !== null && ge < p.length && (An(t, ge), p.length = ge);
    if (Ft() && ke !== null && !Se && p !== null && (t.f & (ye | st | Ce)) === 0)
      for (f = 0; f < /** @type {Source[]} */
      ke.length; f++)
        aa(
          ke[f],
          /** @type {Effect} */
          t
        );
    return r !== null && r !== t && (Qt++, ke !== null && (i === null ? i = ke : i.push(.../** @type {Source[]} */
    ke))), (t.f & ct) !== 0 && (t.f ^= ct), m;
  } catch (g) {
    return Y1(g);
  } finally {
    t.f ^= xi, de = e, ge = n, ke = i, H = r, Xe = s, We = a, xn(o), Se = l, Ke = d;
  }
}
function wo(t, e) {
  let n = e.reactions;
  if (n !== null) {
    var i = f1.call(n, t);
    if (i !== -1) {
      var r = n.length - 1;
      r === 0 ? n = e.reactions = null : (n[i] = n[r], n.pop());
    }
  }
  n === null && (e.f & ye) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (de === null || !de.includes(e)) && (he(e, st), (e.f & (we | Sn)) === 0 && (e.f ^= Sn), Fs(
    /** @type {Derived} **/
    e
  ), An(
    /** @type {Derived} **/
    e,
    0
  ));
}
function An(t, e) {
  var n = t.deps;
  if (n !== null)
    for (var i = e; i < n.length; i++)
      wo(t, n[i]);
}
function Et(t) {
  var e = t.f;
  if ((e & gt) === 0) {
    he(t, oe);
    var n = V, i = At;
    V = t, At = !0;
    try {
      (e & jt) !== 0 ? bo(t) : $s(t), Qs(t);
      var r = oa(t);
      t.teardown = typeof r == "function" ? r : null, t.wv = ra;
      var s;
    } finally {
      At = i, V = n;
    }
  }
}
async function la() {
  await Promise.resolve(), io();
}
function h(t) {
  var e = t.f, n = (e & ye) !== 0;
  if (H !== null && !Se) {
    var i = V !== null && (V.f & gt) !== 0;
    if (!i && !We?.includes(t)) {
      var r = H.deps;
      if ((H.f & xi) !== 0)
        t.rv < Qt && (t.rv = Qt, de === null && r !== null && r[ge] === t ? ge++ : de === null ? de = [t] : (!Xe || !de.includes(t)) && de.push(t));
      else {
        (H.deps ??= []).push(t);
        var s = t.reactions;
        s === null ? t.reactions = [H] : s.includes(H) || s.push(H);
      }
    }
  } else if (n && /** @type {Derived} */
  t.deps === null && /** @type {Derived} */
  t.effects === null) {
    var a = (
      /** @type {Derived} */
      t
    ), o = a.parent;
    o !== null && (o.f & we) === 0 && (a.f ^= we);
  }
  if (yt) {
    if ($e.has(t))
      return $e.get(t);
    if (n) {
      a = /** @type {Derived} */
      t;
      var l = a.v;
      return ((a.f & oe) === 0 && a.reactions !== null || da(a)) && (l = Gi(a)), $e.set(a, l), l;
    }
  } else n && (a = /** @type {Derived} */
  t, Gn(a) && Rs(a));
  if ((t.f & ct) !== 0)
    throw t.v;
  return t.v;
}
function da(t) {
  if (t.v === ae) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if ($e.has(e) || (e.f & ye) !== 0 && da(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function De(t) {
  var e = Se;
  try {
    return Se = !0, t();
  } finally {
    Se = e;
  }
}
const _o = -7169;
function he(t, e) {
  t.f = t.f & _o | e;
}
function So(t) {
  if (!(typeof t != "object" || !t || t instanceof EventTarget)) {
    if (Ve in t)
      Ai(t);
    else if (!Array.isArray(t))
      for (let e in t) {
        const n = t[e];
        typeof n == "object" && n && Ve in n && Ai(n);
      }
  }
}
function Ai(t, e = /* @__PURE__ */ new Set()) {
  if (typeof t == "object" && t !== null && // We don't want to traverse DOM elements
  !(t instanceof EventTarget) && !e.has(t)) {
    e.add(t), t instanceof Date && t.getTime();
    for (let i in t)
      try {
        Ai(t[i], e);
      } catch {
      }
    const n = Hi(t);
    if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
      const i = Cs(n);
      for (let r in i) {
        const s = i[r].get;
        if (s)
          try {
            s.call(t);
          } catch {
          }
      }
    }
  }
}
function xo() {
  return Symbol(Zs);
}
function Co(t) {
  return t.endsWith("capture") && t !== "gotpointercapture" && t !== "lostpointercapture";
}
const Ao = [
  "beforeinput",
  "click",
  "change",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart"
];
function Eo(t) {
  return Ao.includes(t);
}
const Po = {
  // no `class: 'className'` because we handle that separately
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
  srcobject: "srcObject",
  novalidate: "noValidate",
  allowfullscreen: "allowFullscreen",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback"
};
function To(t) {
  return t = t.toLowerCase(), Po[t] ?? t;
}
const Oo = ["touchstart", "touchmove"];
function Zo(t) {
  return Oo.includes(t);
}
const ca = /* @__PURE__ */ new Set(), Ei = /* @__PURE__ */ new Set();
function ua(t, e, n, i = {}) {
  function r(s) {
    if (i.capture || Gt.call(e, s), !s.cancelBubble)
      return qn(() => n?.call(this, s));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? sn(() => {
    e.addEventListener(t, r, i);
  }) : e.addEventListener(t, r, i), r;
}
function le(t, e, n, i = {}) {
  var r = ua(e, t, n, i);
  return () => {
    t.removeEventListener(e, r, i);
  };
}
function zo(t) {
  for (var e = 0; e < t.length; e++)
    ca.add(t[e]);
  for (var n of Ei)
    n(t);
}
let Gr = null;
function Gt(t) {
  var e = this, n = (
    /** @type {Node} */
    e.ownerDocument
  ), i = t.type, r = t.composedPath?.() || [], s = (
    /** @type {null | Element} */
    r[0] || t.target
  );
  Gr = t;
  var a = 0, o = Gr === t && t.__root;
  if (o) {
    var l = r.indexOf(o);
    if (l !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t.__root = e;
      return;
    }
    var d = r.indexOf(e);
    if (d === -1)
      return;
    l <= d && (a = l);
  }
  if (s = /** @type {Element} */
  r[a] || t.target, s !== e) {
    Si(t, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var c = H, u = V;
    je(null), tt(null);
    try {
      for (var m, p = []; s !== null; ) {
        var f = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var g = s["__" + i];
          if (g != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === s))
            if (Rn(g)) {
              var [b, ...k] = g;
              b.apply(s, [t, ...k]);
            } else
              g.call(s, t);
        } catch (y) {
          m ? p.push(y) : m = y;
        }
        if (t.cancelBubble || f === e || f === null)
          break;
        s = f;
      }
      if (m) {
        for (let y of p)
          queueMicrotask(() => {
            throw y;
          });
        throw m;
      }
    } finally {
      t.__root = e, delete t.currentTarget, je(c), tt(u);
    }
  }
}
function ma(t) {
  var e = document.createElement("template");
  return e.innerHTML = t.replaceAll("<!>", "<!---->"), e.content;
}
function En(t, e) {
  var n = (
    /** @type {Effect} */
    V
  );
  n.nodes_start === null && (n.nodes_start = t, n.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function q(t, e) {
  var n = (e & M1) !== 0, i = (e & F1) !== 0, r, s = !t.startsWith("<!>");
  return () => {
    r === void 0 && (r = ma(s ? t : "<!>" + t), n || (r = /** @type {Node} */
    /* @__PURE__ */ Zt(r)));
    var a = (
      /** @type {TemplateNode} */
      i || Ks ? document.importNode(r, !0) : r.cloneNode(!0)
    );
    if (n) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Zt(a)
      ), l = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      En(o, l);
    } else
      En(a, a);
    return a;
  };
}
// @__NO_SIDE_EFFECTS__
function Io(t, e, n = "svg") {
  var i = !t.startsWith("<!>"), r = `<${n}>${i ? t : "<!>" + t}</${n}>`, s;
  return () => {
    if (!s) {
      var a = (
        /** @type {DocumentFragment} */
        ma(r)
      ), o = (
        /** @type {Element} */
        /* @__PURE__ */ Zt(a)
      );
      s = /** @type {Element} */
      /* @__PURE__ */ Zt(o);
    }
    var l = (
      /** @type {TemplateNode} */
      s.cloneNode(!0)
    );
    return En(l, l), l;
  };
}
// @__NO_SIDE_EFFECTS__
function Yn(t, e) {
  return /* @__PURE__ */ Io(t, e, "svg");
}
function I() {
  var t = document.createDocumentFragment(), e = document.createComment(""), n = vt();
  return t.append(e, n), En(e, n), t;
}
function T(t, e) {
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function Fe() {
  return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
function Be(t, e) {
  var n = e == null ? "" : typeof e == "object" ? e + "" : e;
  n !== (t.__t ??= t.nodeValue) && (t.__t = n, t.nodeValue = n + "");
}
function fa(t, e) {
  return No(t, e);
}
const St = /* @__PURE__ */ new Map();
function No(t, { target: e, anchor: n, props: i = {}, events: r, context: s, intro: a = !0 }) {
  ao();
  var o = /* @__PURE__ */ new Set(), l = (u) => {
    for (var m = 0; m < u.length; m++) {
      var p = u[m];
      if (!o.has(p)) {
        o.add(p);
        var f = Zo(p);
        e.addEventListener(p, Gt, { passive: f });
        var g = St.get(p);
        g === void 0 ? (document.addEventListener(p, Gt, { passive: f }), St.set(p, 1)) : St.set(p, g + 1);
      }
    }
  };
  l(Bi(ca)), Ei.add(l);
  var d = void 0, c = go(() => {
    var u = n ?? e.appendChild(vt());
    return Ne(() => {
      if (s) {
        K({});
        var m = (
          /** @type {ComponentContext} */
          te
        );
        m.c = s;
      }
      r && (i.$$events = r), d = t(u, i) || {}, s && U();
    }), () => {
      for (var m of o) {
        e.removeEventListener(m, Gt);
        var p = (
          /** @type {number} */
          St.get(m)
        );
        --p === 0 ? (document.removeEventListener(m, Gt), St.delete(m)) : St.set(m, p);
      }
      Ei.delete(l), u !== n && u.parentNode?.removeChild(u);
    };
  });
  return Pi.set(d, c), d;
}
let Pi = /* @__PURE__ */ new WeakMap();
function jo(t, e) {
  const n = Pi.get(t);
  return n ? (Pi.delete(t), n(e)) : Promise.resolve();
}
function $(t, e, n = !1) {
  var i = t, r = null, s = null, a = ae, o = n ? rn : 0, l = !1;
  const d = (p, f = !0) => {
    l = !0, m(f, p);
  };
  var c = null;
  function u() {
    c !== null && (c.lastChild.remove(), i.before(c), c = null);
    var p = a ? r : s, f = a ? s : r;
    p && Ji(p), f && on(f, () => {
      a ? s = null : r = null;
    });
  }
  const m = (p, f) => {
    if (a !== (a = p)) {
      var g = Un(), b = i;
      if (g && (c = document.createDocumentFragment(), c.append(b = vt())), a ? r ??= f && Ne(() => f(b)) : s ??= f && Ne(() => f(b)), g) {
        var k = (
          /** @type {Batch} */
          Y
        ), y = a ? r : s, v = a ? s : r;
        y && k.skipped_effects.delete(y), v && k.skipped_effects.add(v), k.add_callback(u);
      } else
        u();
    }
  };
  bt(() => {
    l = !1, e(d), l || m(null, null);
  }, o);
}
function Do(t, e, n) {
  var i = t, r = ae, s, a, o = null, l = Ft() ? H1 : Is;
  function d() {
    s && on(s), o !== null && (o.lastChild.remove(), i.before(o), o = null), s = a;
  }
  bt(() => {
    if (l(r, r = e())) {
      var c = i, u = Un();
      u && (o = document.createDocumentFragment(), o.append(c = vt())), a = Ne(() => n(c)), u ? Y.add_callback(d) : d();
    }
  });
}
function ha(t, e) {
  return e;
}
function Mo(t, e, n) {
  for (var i = t.items, r = [], s = e.length, a = 0; a < s; a++)
    Xi(e[a].e, r, !0);
  var o = s > 0 && r.length === 0 && n !== null;
  if (o) {
    var l = (
      /** @type {Element} */
      /** @type {Element} */
      n.parentNode
    );
    oo(l), l.append(
      /** @type {Element} */
      n
    ), i.clear(), Oe(t, e[0].prev, e[s - 1].next);
  }
  ta(r, () => {
    for (var d = 0; d < s; d++) {
      var c = e[d];
      o || (i.delete(c.k), Oe(t, c.prev, c.next)), pe(c.e, !o);
    }
  });
}
function ut(t, e, n, i, r, s = null) {
  var a = t, o = { flags: e, items: /* @__PURE__ */ new Map(), first: null }, l = (e & Os) !== 0;
  if (l) {
    var d = (
      /** @type {Element} */
      t
    );
    a = d.appendChild(vt());
  }
  var c = null, u = !1, m = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ Ct(() => {
    var k = n();
    return Rn(k) ? k : k == null ? [] : Bi(k);
  }), f, g;
  function b() {
    Fo(
      g,
      f,
      o,
      m,
      a,
      r,
      e,
      i,
      n
    ), s !== null && (f.length === 0 ? c ? Ji(c) : c = Ne(() => s(a)) : c !== null && on(c, () => {
      c = null;
    }));
  }
  bt(() => {
    g ??= /** @type {Effect} */
    V, f = /** @type {V[]} */
    h(p);
    var k = f.length;
    if (!(u && k === 0)) {
      u = k === 0;
      var y, v, _, A;
      if (Un()) {
        var E = /* @__PURE__ */ new Set(), x = (
          /** @type {Batch} */
          Y
        );
        for (v = 0; v < k; v += 1) {
          _ = f[v], A = i(_, v);
          var j = o.items.get(A) ?? m.get(A);
          j ? (e & (Bn | Hn)) !== 0 && pa(j, _, v, e) : (y = ga(
            null,
            o,
            null,
            null,
            _,
            A,
            v,
            r,
            e,
            n,
            !0
          ), m.set(A, y)), E.add(A);
        }
        for (const [R, L] of o.items)
          E.has(R) || x.skipped_effects.add(L.e);
        x.add_callback(b);
      } else
        b();
      h(p);
    }
  });
}
function Fo(t, e, n, i, r, s, a, o, l) {
  var d = (a & O1) !== 0, c = (a & (Bn | Hn)) !== 0, u = e.length, m = n.items, p = n.first, f = p, g, b = null, k, y = [], v = [], _, A, E, x;
  if (d)
    for (x = 0; x < u; x += 1)
      _ = e[x], A = o(_, x), E = m.get(A), E !== void 0 && (E.a?.measure(), (k ??= /* @__PURE__ */ new Set()).add(E));
  for (x = 0; x < u; x += 1) {
    if (_ = e[x], A = o(_, x), E = m.get(A), E === void 0) {
      var j = i.get(A);
      if (j !== void 0) {
        i.delete(A), m.set(A, j);
        var R = b ? b.next : f;
        Oe(n, b, j), Oe(n, j, R), ui(j, R, r), b = j;
      } else {
        var L = f ? (
          /** @type {TemplateNode} */
          f.e.nodes_start
        ) : r;
        b = ga(
          L,
          n,
          b,
          b === null ? n.first : b.next,
          _,
          A,
          x,
          s,
          a,
          l
        );
      }
      m.set(A, b), y = [], v = [], f = b.next;
      continue;
    }
    if (c && pa(E, _, x, a), (E.e.f & xe) !== 0 && (Ji(E.e), d && (E.a?.unfix(), (k ??= /* @__PURE__ */ new Set()).delete(E))), E !== f) {
      if (g !== void 0 && g.has(E)) {
        if (y.length < v.length) {
          var F = v[0], D;
          b = F.prev;
          var z = y[0], O = y[y.length - 1];
          for (D = 0; D < y.length; D += 1)
            ui(y[D], F, r);
          for (D = 0; D < v.length; D += 1)
            g.delete(v[D]);
          Oe(n, z.prev, O.next), Oe(n, b, z), Oe(n, O, F), f = F, b = O, x -= 1, y = [], v = [];
        } else
          g.delete(E), ui(E, f, r), Oe(n, E.prev, E.next), Oe(n, E, b === null ? n.first : b.next), Oe(n, b, E), b = E;
        continue;
      }
      for (y = [], v = []; f !== null && f.k !== A; )
        (f.e.f & xe) === 0 && (g ??= /* @__PURE__ */ new Set()).add(f), v.push(f), f = f.next;
      if (f === null)
        continue;
      E = f;
    }
    y.push(E), b = E, f = E.next;
  }
  if (f !== null || g !== void 0) {
    for (var M = g === void 0 ? [] : Bi(g); f !== null; )
      (f.e.f & xe) === 0 && M.push(f), f = f.next;
    var W = M.length;
    if (W > 0) {
      var G = (a & Os) !== 0 && u === 0 ? r : null;
      if (d) {
        for (x = 0; x < W; x += 1)
          M[x].a?.measure();
        for (x = 0; x < W; x += 1)
          M[x].a?.fix();
      }
      Mo(n, M, G);
    }
  }
  d && sn(() => {
    if (k !== void 0)
      for (E of k)
        E.a?.apply();
  }), t.first = n.first && n.first.e, t.last = b && b.e;
  for (var ne of i.values())
    pe(ne.e);
  i.clear();
}
function pa(t, e, n, i) {
  (i & Bn) !== 0 && Jt(t.v, e), (i & Hn) !== 0 ? Jt(
    /** @type {Value<number>} */
    t.i,
    n
  ) : t.i = n;
}
function ga(t, e, n, i, r, s, a, o, l, d, c) {
  var u = (l & Bn) !== 0, m = (l & Z1) === 0, p = u ? m ? /* @__PURE__ */ Vs(r, !1, !1) : ht(r) : r, f = (l & Hn) === 0 ? a : ht(a), g = {
    i: f,
    v: p,
    k: s,
    a: null,
    // @ts-expect-error
    e: null,
    prev: n,
    next: i
  };
  try {
    if (t === null) {
      var b = document.createDocumentFragment();
      b.append(t = vt());
    }
    return g.e = Ne(() => o(
      /** @type {Node} */
      t,
      p,
      f,
      d
    ), B1), g.e.prev = n && n.e, g.e.next = i && i.e, n === null ? c || (e.first = g) : (n.next = g, n.e.next = g.e), i !== null && (i.prev = g, i.e.prev = g.e), g;
  } finally {
  }
}
function ui(t, e, n) {
  for (var i = t.next ? (
    /** @type {TemplateNode} */
    t.next.e.nodes_start
  ) : n, r = e ? (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ) : n, s = (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ); s !== null && s !== i; ) {
    var a = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Kn(s)
    );
    r.before(s), s = a;
  }
}
function Oe(t, e, n) {
  e === null ? t.first = n : (e.next = n, e.e.next = n && n.e), n !== null && (n.prev = e, n.e.prev = e && e.e);
}
function B(t, e, ...n) {
  var i = t, r = J, s;
  bt(() => {
    r !== (r = e()) && (s && (pe(s), s = null), s = Ne(() => (
      /** @type {SnippetFn} */
      r(i, ...n)
    )));
  }, rn);
}
function Te(t, e, n) {
  var i = t, r, s, a = null, o = null;
  function l() {
    s && (on(s), s = null), a && (a.lastChild.remove(), i.before(a), a = null), s = o, o = null;
  }
  bt(() => {
    if (r !== (r = e())) {
      var d = Un();
      if (r) {
        var c = i;
        d && (a = document.createDocumentFragment(), a.append(c = vt()), s && Y.skipped_effects.add(s)), o = Ne(() => n(c, r));
      }
      d ? Y.add_callback(l) : l();
    }
  }, rn);
}
function Ro(t, e) {
  var n = void 0, i;
  bt(() => {
    n !== (n = e()) && (i && (pe(i), i = null), n && (i = Ne(() => {
      Xs(() => (
        /** @type {(node: Element) => void} */
        n(t)
      ));
    })));
  });
}
function va(t) {
  var e, n, i = "";
  if (typeof t == "string" || typeof t == "number") i += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var r = t.length;
    for (e = 0; e < r; e++) t[e] && (n = va(t[e])) && (i && (i += " "), i += n);
  } else for (n in t) t[n] && (i && (i += " "), i += n);
  return i;
}
function yn() {
  for (var t, e, n = 0, i = "", r = arguments.length; n < r; n++) (t = arguments[n]) && (e = va(t)) && (i && (i += " "), i += e);
  return i;
}
function Lo(t) {
  return typeof t == "object" ? yn(t) : t ?? "";
}
const Yr = [...` 	
\r\f \v\uFEFF`];
function Bo(t, e, n) {
  var i = t == null ? "" : "" + t;
  if (n) {
    for (var r in n)
      if (n[r])
        i = i ? i + " " + r : r;
      else if (i.length)
        for (var s = r.length, a = 0; (a = i.indexOf(r, a)) >= 0; ) {
          var o = a + s;
          (a === 0 || Yr.includes(i[a - 1])) && (o === i.length || Yr.includes(i[o])) ? i = (a === 0 ? "" : i.substring(0, a)) + i.substring(o + 1) : a = o;
        }
  }
  return i === "" ? null : i;
}
function Xr(t, e = !1) {
  var n = e ? " !important;" : ";", i = "";
  for (var r in t) {
    var s = t[r];
    s != null && s !== "" && (i += " " + r + ": " + s + n);
  }
  return i;
}
function mi(t) {
  return t[0] !== "-" || t[1] !== "-" ? t.toLowerCase() : t;
}
function Ho(t, e) {
  if (e) {
    var n = "", i, r;
    if (Array.isArray(e) ? (i = e[0], r = e[1]) : i = e, t) {
      t = String(t).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var s = !1, a = 0, o = !1, l = [];
      i && l.push(...Object.keys(i).map(mi)), r && l.push(...Object.keys(r).map(mi));
      var d = 0, c = -1;
      const g = t.length;
      for (var u = 0; u < g; u++) {
        var m = t[u];
        if (o ? m === "/" && t[u - 1] === "*" && (o = !1) : s ? s === m && (s = !1) : m === "/" && t[u + 1] === "*" ? o = !0 : m === '"' || m === "'" ? s = m : m === "(" ? a++ : m === ")" && a--, !o && s === !1 && a === 0) {
          if (m === ":" && c === -1)
            c = u;
          else if (m === ";" || u === g - 1) {
            if (c !== -1) {
              var p = mi(t.substring(d, c).trim());
              if (!l.includes(p)) {
                m !== ";" && u++;
                var f = t.substring(d, u).trim();
                n += " " + f + ";";
              }
            }
            d = u + 1, c = -1;
          }
        }
      }
    }
    return i && (n += Xr(i)), r && (n += Xr(r, !0)), n = n.trim(), n === "" ? null : n;
  }
  return t == null ? null : String(t);
}
function Vo(t, e, n, i, r, s) {
  var a = t.__className;
  if (a !== n || a === void 0) {
    var o = Bo(n, i, s);
    o == null ? t.removeAttribute("class") : e ? t.className = o : t.setAttribute("class", o), t.__className = n;
  } else if (s && r !== s)
    for (var l in s) {
      var d = !!s[l];
      (r == null || d !== !!r[l]) && t.classList.toggle(l, d);
    }
  return s;
}
function fi(t, e = {}, n, i) {
  for (var r in n) {
    var s = n[r];
    e[r] !== s && (n[r] == null ? t.style.removeProperty(r) : t.style.setProperty(r, s, i));
  }
}
function Wo(t, e, n, i) {
  var r = t.__style;
  if (r !== e) {
    var s = Ho(e, i);
    s == null ? t.removeAttribute("style") : t.style.cssText = s, t.__style = e;
  } else i && (Array.isArray(i) ? (fi(t, n?.[0], i[0]), fi(t, n?.[1], i[1], "important")) : fi(t, n, i));
  return i;
}
function Ti(t, e, n = !1) {
  if (t.multiple) {
    if (e == null)
      return;
    if (!Rn(e))
      return L1();
    for (var i of t.options)
      i.selected = e.includes(Jr(i));
    return;
  }
  for (i of t.options) {
    var r = Jr(i);
    if (so(r, e)) {
      i.selected = !0;
      return;
    }
  }
  (!n || e !== void 0) && (t.selectedIndex = -1);
}
function Ko(t) {
  var e = new MutationObserver(() => {
    Ti(t, t.__value);
  });
  e.observe(t, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), ho(() => {
    e.disconnect();
  });
}
function Jr(t) {
  return "__value" in t ? t.__value : t.value;
}
const Wt = Symbol("class"), Kt = Symbol("style"), ba = Symbol("is custom element"), ya = Symbol("is html");
function Uo(t, e) {
  e ? t.hasAttribute("selected") || t.setAttribute("selected", "") : t.removeAttribute("selected");
}
function Pn(t, e, n, i) {
  var r = ka(t);
  r[e] !== (r[e] = n) && (e === "loading" && (t[y1] = n), n == null ? t.removeAttribute(e) : typeof n != "string" && wa(t).includes(e) ? t[e] = n : t.setAttribute(e, n));
}
function qo(t, e, n, i, r = !1, s = !1) {
  var a = ka(t), o = a[ba], l = !a[ya], d = e || {}, c = t.tagName === "OPTION";
  for (var u in e)
    u in n || (n[u] = null);
  n.class ? n.class = Lo(n.class) : n[Wt] && (n.class = null), n[Kt] && (n.style ??= null);
  var m = wa(t);
  for (const v in n) {
    let _ = n[v];
    if (c && v === "value" && _ == null) {
      t.value = t.__value = "", d[v] = _;
      continue;
    }
    if (v === "class") {
      var p = t.namespaceURI === "http://www.w3.org/1999/xhtml";
      Vo(t, p, _, i, e?.[Wt], n[Wt]), d[v] = _, d[Wt] = n[Wt];
      continue;
    }
    if (v === "style") {
      Wo(t, _, e?.[Kt], n[Kt]), d[v] = _, d[Kt] = n[Kt];
      continue;
    }
    var f = d[v];
    if (!(_ === f && !(_ === void 0 && t.hasAttribute(v)))) {
      d[v] = _;
      var g = v[0] + v[1];
      if (g !== "$$")
        if (g === "on") {
          const A = {}, E = "$$" + v;
          let x = v.slice(2);
          var b = Eo(x);
          if (Co(x) && (x = x.slice(0, -7), A.capture = !0), !b && f) {
            if (_ != null) continue;
            t.removeEventListener(x, d[E], A), d[E] = null;
          }
          if (_ != null)
            if (b)
              t[`__${x}`] = _, zo([x]);
            else {
              let j = function(R) {
                d[v].call(this, R);
              };
              d[E] = ua(x, t, j, A);
            }
          else b && (t[`__${x}`] = void 0);
        } else if (v === "style")
          Pn(t, v, _);
        else if (v === "autofocus")
          lo(
            /** @type {HTMLElement} */
            t,
            !!_
          );
        else if (!o && (v === "__value" || v === "value" && _ != null))
          t.value = t.__value = _;
        else if (v === "selected" && c)
          Uo(
            /** @type {HTMLOptionElement} */
            t,
            _
          );
        else {
          var k = v;
          l || (k = To(k));
          var y = k === "defaultValue" || k === "defaultChecked";
          if (_ == null && !o && !y)
            if (a[v] = null, k === "value" || k === "checked") {
              let A = (
                /** @type {HTMLInputElement} */
                t
              );
              const E = e === void 0;
              if (k === "value") {
                let x = A.defaultValue;
                A.removeAttribute(k), A.defaultValue = x, A.value = A.__value = E ? x : null;
              } else {
                let x = A.defaultChecked;
                A.removeAttribute(k), A.defaultChecked = x, A.checked = E ? x : !1;
              }
            } else
              t.removeAttribute(v);
          else y || m.includes(k) && (o || typeof _ != "string") ? (t[k] = _, k in a && (a[k] = ae)) : typeof _ != "function" && Pn(t, k, _);
        }
    }
  }
  return d;
}
function ue(t, e, n = [], i = [], r, s = !1, a = !1) {
  Ls(n, i, (o) => {
    var l = void 0, d = {}, c = t.nodeName === "SELECT", u = !1;
    if (bt(() => {
      var p = e(...o.map(h)), f = qo(
        t,
        l,
        p,
        r,
        s,
        a
      );
      u && c && "value" in p && Ti(
        /** @type {HTMLSelectElement} */
        t,
        p.value
      );
      for (let b of Object.getOwnPropertySymbols(d))
        p[b] || pe(d[b]);
      for (let b of Object.getOwnPropertySymbols(p)) {
        var g = p[b];
        b.description === Zs && (!l || g !== l[b]) && (d[b] && pe(d[b]), d[b] = Ne(() => Ro(t, () => g))), f[b] = g;
      }
      l = f;
    }), c) {
      var m = (
        /** @type {HTMLSelectElement} */
        t
      );
      Xs(() => {
        Ti(
          m,
          /** @type {Record<string | symbol, any>} */
          l.value,
          !0
        ), Ko(m);
      });
    }
    u = !0;
  });
}
function ka(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    t.__attributes ??= {
      [ba]: t.nodeName.includes("-"),
      [ya]: t.namespaceURI === R1
    }
  );
}
var Qr = /* @__PURE__ */ new Map();
function wa(t) {
  var e = t.getAttribute("is") || t.nodeName, n = Qr.get(e);
  if (n) return n;
  Qr.set(e, n = []);
  for (var i, r = t, s = Element.prototype; s !== r; ) {
    i = Cs(r);
    for (var a in i)
      i[a].set && n.push(a);
    r = Hi(r);
  }
  return n;
}
function Go(t, e, n = e) {
  var i = /* @__PURE__ */ new WeakSet();
  uo(t, "input", async (r) => {
    var s = r ? t.defaultValue : t.value;
    if (s = hi(t) ? pi(s) : s, n(s), Y !== null && i.add(Y), await la(), s !== (s = e())) {
      var a = t.selectionStart, o = t.selectionEnd;
      t.value = s ?? "", o !== null && (t.selectionStart = a, t.selectionEnd = Math.min(o, t.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  De(e) == null && t.value && (n(hi(t) ? pi(t.value) : t.value), Y !== null && i.add(Y)), Js(() => {
    var r = e();
    if (t === document.activeElement) {
      var s = (
        /** @type {Batch} */
        bn ?? Y
      );
      if (i.has(s))
        return;
    }
    hi(t) && r === pi(t.value) || t.type === "date" && !r && !t.value || r !== t.value && (t.value = r ?? "");
  });
}
function hi(t) {
  var e = t.type;
  return e === "number" || e === "range";
}
function pi(t) {
  return t === "" ? null : +t;
}
function Yo(t = !1) {
  const e = (
    /** @type {ComponentContextLegacy} */
    te
  ), n = e.l.u;
  if (!n) return;
  let i = () => So(e.s);
  if (t) {
    let r = 0, s = (
      /** @type {Record<string, any>} */
      {}
    );
    const a = /* @__PURE__ */ an(() => {
      let o = !1;
      const l = e.s;
      for (const d in l)
        l[d] !== s[d] && (s[d] = l[d], o = !0);
      return o && r++, r;
    });
    i = () => h(a);
  }
  n.b.length && Yi(() => {
    $r(e, i), _n(n.b);
  }), se(() => {
    const r = De(() => n.m.map(g1));
    return () => {
      for (const s of r)
        typeof s == "function" && s();
    };
  }), n.a.length && se(() => {
    $r(e, i), _n(n.a);
  });
}
function $r(t, e) {
  if (t.l.s)
    for (const n of t.l.s) h(n);
  e();
}
let hn = !1;
function Xo(t) {
  var e = hn;
  try {
    return hn = !1, [t(), hn];
  } finally {
    hn = e;
  }
}
const Jo = {
  get(t, e) {
    if (!t.exclude.includes(e))
      return t.props[e];
  },
  set(t, e) {
    return !1;
  },
  getOwnPropertyDescriptor(t, e) {
    if (!t.exclude.includes(e) && e in t.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: t.props[e]
      };
  },
  has(t, e) {
    return t.exclude.includes(e) ? !1 : e in t.props;
  },
  ownKeys(t) {
    return Reflect.ownKeys(t.props).filter((e) => !t.exclude.includes(e));
  }
};
// @__NO_SIDE_EFFECTS__
function fe(t, e, n) {
  return new Proxy(
    { props: t, exclude: e },
    Jo
  );
}
const Qo = {
  get(t, e) {
    let n = t.props.length;
    for (; n--; ) {
      let i = t.props[n];
      if (Vt(i) && (i = i()), typeof i == "object" && i !== null && e in i) return i[e];
    }
  },
  set(t, e, n) {
    let i = t.props.length;
    for (; i--; ) {
      let r = t.props[i];
      Vt(r) && (r = r());
      const s = Qe(r, e);
      if (s && s.set)
        return s.set(n), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(t, e) {
    let n = t.props.length;
    for (; n--; ) {
      let i = t.props[n];
      if (Vt(i) && (i = i()), typeof i == "object" && i !== null && e in i) {
        const r = Qe(i, e);
        return r && !r.configurable && (r.configurable = !0), r;
      }
    }
  },
  has(t, e) {
    if (e === Ve || e === Ps) return !1;
    for (let n of t.props)
      if (Vt(n) && (n = n()), n != null && e in n) return !0;
    return !1;
  },
  ownKeys(t) {
    const e = [];
    for (let n of t.props)
      if (Vt(n) && (n = n()), !!n) {
        for (const i in n)
          e.includes(i) || e.push(i);
        for (const i of Object.getOwnPropertySymbols(n))
          e.includes(i) || e.push(i);
      }
    return e;
  }
};
function zt(...t) {
  return new Proxy({ props: t }, Qo);
}
function S(t, e, n, i) {
  var r = !Mt || (n & I1) !== 0, s = (n & j1) !== 0, a = (n & D1) !== 0, o = (
    /** @type {V} */
    i
  ), l = !0, d = () => (l && (l = !1, o = a ? De(
    /** @type {() => V} */
    i
  ) : (
    /** @type {V} */
    i
  )), o), c;
  if (s) {
    var u = Ve in t || Ps in t;
    c = Qe(t, e)?.set ?? (u && e in t ? (v) => t[e] = v : void 0);
  }
  var m, p = !1;
  s ? [m, p] = Xo(() => (
    /** @type {V} */
    t[e]
  )) : m = /** @type {V} */
  t[e], m === void 0 && i !== void 0 && (m = d(), c && (r && A1(), c(m)));
  var f;
  if (r ? f = () => {
    var v = (
      /** @type {V} */
      t[e]
    );
    return v === void 0 ? d() : (l = !0, v);
  } : f = () => {
    var v = (
      /** @type {V} */
      t[e]
    );
    return v !== void 0 && (o = /** @type {V} */
    void 0), v === void 0 ? o : v;
  }, r && (n & N1) === 0)
    return f;
  if (c) {
    var g = t.$$legacy;
    return (
      /** @type {() => V} */
      (function(v, _) {
        return arguments.length > 0 ? ((!r || !_ || g || p) && c(_ ? f() : v), v) : f();
      })
    );
  }
  var b = !1, k = ((n & z1) !== 0 ? an : Ct)(() => (b = !1, f()));
  s && h(k);
  var y = (
    /** @type {Effect} */
    V
  );
  return (
    /** @type {() => V} */
    (function(v, _) {
      if (arguments.length > 0) {
        const A = _ ? h(k) : r && s ? ce(v) : v;
        return C(k, A), b = !0, o !== void 0 && (o = A), v;
      }
      return yt && b || (y.f & gt) !== 0 ? k.v : h(k);
    })
  );
}
function $o(t) {
  te === null && Ts(), Mt && te.l !== null ? e2(te).m.push(t) : se(() => {
    const e = De(t);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function e2(t) {
  var e = (
    /** @type {ComponentContextLegacy} */
    t.l
  );
  return e.u ??= { a: [], b: [], m: [] };
}
const t2 = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(t2);
V1();
const n2 = {
  en: {
    dimensions: [
      {
        id: "da0",
        name: "Being",
        description: "Cultivating our inner life and developing and deepening our relationship to our thoughts, feelings and body help us be present, intentional and non-reactive when we face complexity.",
        subtitle: "Relationship to Self",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Thinking",
        description: "Developing our cognitive skills by taking different perspectives, evaluating information and making sense of the world as an interconnected whole is essential for wise decision-making.",
        subtitle: "Cognitive Skills",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Relating",
        description: "Appreciating, caring for and feeling connected to others, such as neighbours, future generations or the biosphere, helps us create more just and sustainable systems and societies for everyone.",
        subtitle: "Caring for Others and the World",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Collaborating",
        description: "To make progress on shared concerns, we need to develop our abilities to include, hold space and communicate with stakeholders with different values, skills and competencies.",
        subtitle: "Social Skills",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Acting",
        description: "Qualities such as courage and optimism help us acquire true agency, break old patterns, generate original ideas and act with persistence in uncertain times.",
        subtitle: "Enabling Change",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Inner Compass",
        description: "Having a deeply felt sense of responsibility and commitment to values and purposes relating to the good of the whole.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Integrity and Authenticity",
        description: "A commitment and ability to act with sincerity, honesty and integrity.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Openness and Learning Mindset",
        description: "Having a basic mindset of curiosity and a willingness to be vulnerable and embrace change and grow.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Self-awareness",
        description: "Ability to be in reflective contact with own thoughts, feelings and desires; having a realistic self-image and ability to regulate oneself.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Presence",
        description: "Ability to be in the here and now, without judgement and in a state of open-ended presence.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Critical Thinking",
        description: "Skills in critically reviewing the validity of views, evidence and plans.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Complexity Awareness",
        description: "Understanding of and skills in working with complex and systemic conditions and causalities.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Perspective Skills",
        description: "Skills in seeking, understanding and actively making use of insights from contrasting perspectives.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Sense-making",
        description: "Skills in seeing patterns, structuring the unknown and being able to consciously create stories.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Long-term Orientation and Visioning",
        description: "Long-term orientation and ability to formulate and sustain commitment to visions relating to the larger context.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Appreciation",
        description: "Relating to others and to the world with a basic sense of appreciation, gratitude and joy.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Connectedness",
        description: "Having a keen sense of being connected with and/or being a part of a larger whole, such as a community, humanity or global ecosystem.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Humility",
        description: "Being able to act in accordance with the needs of the situation without concern for one's own importance.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empathy and Compassion",
        description: "Ability to relate to others, oneself and nature with kindness, empathy and compassion and address related suffering",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Communication Skills",
        description: "Ability to really listen to others, to foster genuine dialogue, to advocate own views skillfully, to manage conflicts constructively and to adapt communication to diverse groups.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Co-creation Skills",
        description: "Skills and motivation to build, develop and facilitate collaborative relationships with diverse stakeholders, characterised by psychological safety and genuine co-creation.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Inclusive Mindset and Intercultural Competence",
        description: "Willingness and competence to embrace diversity and include people and collectives with different views and backgrounds.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Trust",
        description: "Ability to show trust and to create and maintain trusting relationships.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Mobilisation Skills",
        description: "Skills in inspiring and mobilising others to engage in shared purposes.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Courage",
        description: "Ability to stand up for values, make decisions, take decisive action and, if need be, challenge and disrupt existing structures and views.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Creativity",
        description: "Ability to generate and develop original ideas, innovate and being willing to disrupt conventional patterns.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Optimism",
        description: "Ability to sustain and communicate a sense of hope, positive attitude and confidence in the possibility of meaningful change.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Perseverance",
        description: "Ability to sustain engagement and remain determined and patient even when efforts take a long time to bear fruit.",
        dimension: "da4"
      }
    ]
  },
  es: {
    dimensions: [
      {
        id: "da0",
        name: "Ser",
        description: "Cultivar nuestra vida interior y desarrollar y profundizar nuestra relación con nuestros pensamientos, sentimientos y cuerpo, nos ayuda a estar presentes, intencionales y no reactivos cuando nos enfrentamos a la complejidad.",
        subtitle: "Relación con el Yo",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Pensar",
        description: "Desarrollar nuestras habilidades cognitivas tomando diferentes perspectivas, evaluando información y dando sentido al mundo como un todo interconectado, es esencial para tomar decisiones acertadas.",
        subtitle: "Habilidades Cognitivas",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Relacionarse",
        description: "Apreciar, cuidar, y sentirse conectados a otros, como pueden ser vecinos, generaciones futuras o a la biosfera, nos ayuda a crear sistemas y sociedades más justas y sostenibles para todos.",
        subtitle: "Cuidar de Los Demás y del Mundo",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Colaborar",
        description: "Para progresar en preocupaciones colectivas, necesitamos desarrollar habilidades que incluyan, mantengan el espacio y comuniquen con grupos de interés con diversos valores, aptitudes y competencias.",
        subtitle: "Habilidades Sociales",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Actuar",
        description: "Cualidades como la valentía y el optimismo nos ayudan a adquirir un verdadero empoderamiento, romper viejos patrones, generar ideas originales y actuar con persistencia en los momentos de incertidumbre.",
        subtitle: "Facilitar el Cambio",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Brújula interior",
        description: "Tener un profundo sentido de la responsabilidad y el compromiso con valores y propósitos relacionados con el bien común.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Integridad y autenticidad",
        description: "Compromiso y capacidad para actuar con sinceridad, honestidad e integridad.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Apertura y mentalidad de aprendizaje",
        description: "Poseer una mente curiosa y una disposición a ser vulnerable y a aceptar el cambio y crecer.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Autoconciencia",
        description: "Habilidad de contactar reflexivamente con los pensamientos, sentimientos y deseos propios; tener una imagen propia realista y saber autorregularse.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Presencia",
        description: "Habilidad de estar en el aquí y ahora, sin juzgar y en un estado de presencia abierta.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Pensamiento crítico",
        description: "Aptitudes para la revisión crítica y validación de opiniones, evidencia y planes.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Conciencia de complejidad",
        description: "Comprensión y habilidades para trabajar con condiciones y causalidades complejas y sistémicas.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Habilidades de perspectiva",
        description: "Habilidades para buscar, entender y hacer uso activo de conocimientos desde perspectivas que contrasten.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Búsqueda de sentido",
        description: "Habilidades para identificar patrones, estructurar lo desconocido y ser capaz de crear historias conscientemente.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Orientación y visión a largo plazo",
        description: "Orientación a largo plazo y capacidad para formular y mantener el compromiso con visiones relacionadas con el contexto más amplio.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Aprecio",
        description: "Relacionarse con los demás y con el mundo con un sentido básico de aprecio, gratitud y alegría.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Conectividad",
        description: "Tener una profunda conexión con los demás y/o formar parte de un conjunto más amplio, como puede ser una comunidad, la humanidad o el ecosistema global.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Humildad",
        description: "Ser capaz de actuar de acuerdo con las necesidades de la situación sin preocuparse por la propia importancia.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empatía y Compasión",
        description: "Habilidad de relacionarse con los demás, con uno mismo y con la naturaleza, con bondad, empatía y compasión y abordar el sufrimiento del prójimo.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Habilidad para la comunicación",
        description: "Aptitud de realmente escuchar a los demás, promover el diálogo genuino, defender hábilmente nuestros puntos de vista, manejar conflictos constructivamente y adaptar la comunicación a grupos diversos.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Habilidades de co- creación",
        description: "Habilidad y motivación para construir, desarrollar y facilitar relaciones colaborativas con grupos de interés diversos, caracterizado por la seguridad psicológica y la co-creación genuina.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Mentalidad inclusiva y competencia intercultural",
        description: "Disposición y competencias para acoger la diversidad e incluir a personas y colectivos con perspectivas y experiencias diferentes.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Confianza",
        description: "Habilidad de demostrar confianza y crear y mantener relaciones basadas en la confianza.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Habilidades de movilización",
        description: "Habilidad de inspirar y movilizar a otras personas para participar en propósitos colectivos.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Valentía",
        description: "Habilidad de defender valores, tomar decisiones, actuar de forma decisiva y, si fuese necesario, desafiar y alterar las estructuras y perspectivas existentes.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Creatividad",
        description: "Habilidad de generar y desarrollar ideas originales, innovar y estar dispuesto a disrumpir patrones convencionales.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Optimismo",
        description: "Habilidad de mantener y comunicar un sentido de esperanza, actitud positiva y confianza en la posibilidad de un cambio significativo.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Perseverancia",
        description: "Habilidad de sostener compromiso y mantenerse determinado y paciente incluso cuando los esfuerzos tardan en dar frutos.",
        dimension: "da4"
      }
    ]
  },
  nl: {
    dimensions: [
      {
        id: "da0",
        name: "Zijn",
        description: "Door ons innerlijk leven te cultiveren en onze verbinding met gedachten, gevoelens en lichaam te ontwikkelen en te verdiepen, kunnen we aanwezig zijn, bewust en neutraal, wanneer we geconfronteerd worden met complexiteit.",
        subtitle: "Relatie tot zelf",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Denken",
        description: "Het ontwikkelen van cognitieve kwaliteiten en vaardigheden middels verschillende perspectieven, het evalueren van informatie en de wereld te ervaren als een onderling verbonden geheel als basis voor verstandige besluitvorming.",
        subtitle: "Cognitieve kwaliteiten en vaardigheden",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Verbinden",
        description: "Waardering, zorg en verbondenheid met anderen, zoals buren, toekomstige generaties of de biosfeer, helpt ons rechtvaardige en duurzame systemen en samenlevingen voor iedereen te creëren.",
        subtitle: "Zorgen voor anderen en de wereld",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Samenwerken",
        description: "Om vooruitgang te boeken met gedeelde en verschillende belangen, dienen we ons vermogen te ontwikkelen om belanghebbenden vanuit verschillende waarden, vaardigheden en competenties mee te nemen en een veilige ruimte te bieden voor verbinding en communicatie.",
        subtitle: "Sociale vaardigheden",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Handelen",
        description: "Kwaliteiten zoals moed en optimisme helpen ons om waarachtige autoriteit te verkrijgen, oude patronen te doorbreken, originele ideeën te genereren en met volharding te handelen in onzekere tijden.",
        subtitle: "Verandering teweeg brengen",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Innerlijk kompas",
        description: "Een diep gevoel van verantwoordelijkheid, en toewijding aan waarden en doelen die het grotere geheel ten goede komen.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Integriteit en Authenticiteit",
        description: "Betrokkenheid en het vermogen om te handelen vanuit oprechtheid, eerlijkheid en integriteit.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Openheid en Leergierigheid",
        description: "Een basishouding van nieuwsgierigheid en de bereidheid om kwetsbaar te zijn, verandering te omarmen en te groeien.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Zelfbewustzijn",
        description: "Het vermogen om te reflecteren op eigen gedachten, gevoelens en verlangens; het hebben van een realistisch zelfbeeld en het vermogen om zichzelf te reguleren.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Bewuste aanwezigheid",
        description: "Vermogen om in het hier en nu te zijn, zonder oordeel en zonder verwachting.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Kritisch denkvermogen",
        description: "Vaardigheid in het kritisch beoordelen en valideren van standpunten, feiten en plannen.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Complexiteitsbewustzijn",
        description: "Inzicht in en vaardigheden in het werken met complexe en systemische omstandigheden en verbanden.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Perspectieve vaardigheden",
        description: "Vaardig in het zoeken naar, begrijpen van en actief gebruik maken van inzichten vanuit contrasterende perspectieven.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Betekenisgeving",
        description: "Vaardigheden in het zien van patronen, het structureren van het onbekende en het bewust kunnen creëren van verhalen.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Langetermijn oriëntatie en Visievorming",
        description: "Langetermijn oriëntatie en het vermogen om visies in relatie tot het grotere geheel te formuleren en zich hieraan te blijven verbinden.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Waardering",
        description: "Verbinden met anderen en met de wereld vanuit een basisgevoel van waardering, dankbaarheid en vreugde.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Verbondenheid",
        description: "Een scherp gevoel hebben van verbondenheid met en/of deel uitmaken van een groter geheel, zoals een gemeenschap, de mensheid of een wereldwijd ecosysteem.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Nederigheid",
        description: "In staat zijn om te handelen in overeenstemming met de behoeften van de situatie zonder zich zorgen te maken over het eigen belang.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empathie en Compassie",
        description: "Vermogen om met vriendelijkheid, empathie en mededogen met anderen, zichzelf en de natuur om te gaan en daaraan gerelateerd lijden aan te pakken.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Communicatievaardigheden",
        description: "Vermogen om echt naar anderen te luisteren, een authentieke dialoog te bevorderen, eigen standpunten vaardig te bepleiten, conflicten constructief te benaderen en communicatie aan te passen aan diverse groepen.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Co-creatie vaardigheden",
        description: "Om voortgang te boeken op gebied van gedeelde zorgen, dienen we ons vermogen om belanghebbenden met verschillende waarden, vaardigheden en competenties te betrekken, een veilige plek te bieden en in contact te zijn.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Inclusieve mindset en Interculturele vaardigheden",
        description: "Bereidheid en vaardigheid tonen om diversiteit te omarmen, en mensen en groepen met verschillende visies en achtergronden mee te nemen.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Vertrouwen",
        description: "Het vermogen om vertrouwen te tonen en om vertrouwensrelaties te creëren en te onderhouden.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Vaardigheden om anderen in beweging te krijgen",
        description: "Vaardigheden om anderen te inspireren en te mobiliseren om zich in te zetten voor gemeenschappelijke doelen.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Moed",
        description: "Het vermogen om te staan voor onze waarden, beslissingen te nemen, doortastend op te treden en, indien nodig, bestaande structuren en zienswijzen uit te dagen en te ontwrichten.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Creativiteit",
        description: "Het vermogen om originele ideeën te genereren en te ontwikkelen, te innoveren en bereid te zijn conventionele patronen te doorbreken.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Optimisme",
        description: "Het vermogen om een gevoel van hoop, een positieve houding en vertrouwen in de mogelijkheid van zinvolle verandering vast te houden en uit te dragen.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Doorzettingsvermogen",
        description: "Het vermogen om zich te blijven inzetten en vastberaden en geduldig te blijven, zelfs wanneer het lang duurt voor de inspanningen vruchten afwerpen.",
        dimension: "da4"
      }
    ]
  },
  ca: {
    dimensions: [
      {
        id: "da0",
        name: "Ser",
        description: "Conrear la nostra vida interior i desenvolupar i aprofundir la nostra relació amb els nostres pensaments, sentiments i cos ens ajuden a estar presents, intencionals i no reactius quan ens enfrontem a la complexitat.",
        subtitle: "Relació amb el jo",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Pensar",
        description: "Desenvolupar les nostres habilitats cognitives prenent diferents perspectives, avaluant la informació i donant sentit al món com un tot interconnectat és essencial per a una presa de decisions sàvia.",
        subtitle: "Habilitats cognitives",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Relacionar-se",
        description: "Apreciar, preocupar-se per i sentir-seconnectat amb els altres, com ara elsveïns, les generacions futures o labiosfera ens ajuda a crear sistemes isocietats més justos i sostenibles per atothom.",
        subtitle: "Preocupar-se pels altres i pel món",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Col·laborar",
        description: "Per avançar en les preocupacionscol·lectives, necessitem desenvoluparhabilitats inclusives, que mantinguinl’espai i comuniquin amb grups d'interèsamb diferents valors, aptituds icompetències.",
        subtitle: "Habilitats socials",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Actuar",
        description: "Qualitats com la valentia i l'optimisme ensajuden a adquirir una veritable agència,trencar vells patrons, generar ideesoriginals i actuar amb persistència entemps d’incertesa.",
        subtitle: "Possibilitar el canvi",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Brúixola interior",
        description: "Tenir un profund sentit de responsabilitat i compromís ambvalors i propòsits relacionats amb el bé comú.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Integritat i autenticitat",
        description: "Compromís i capacitat d'actuar amb sinceritat,honestedat i integritat.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Obertura i mentalitat d'aprenentatge",
        description: "Tenir una ment curiosa i una disposició a ser vulnerablei a abraçar el canvi i créixer.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Autoconsciència",
        description: "Habilitat de contactar reflexivament amb els propis pensaments,sentiments i desitjos; tenint una imatge pròpia realista i saberautoregular-se.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Presència",
        description: "Habilitat de ser en l’aquí i l’ara, sense jutjari en un estat de presència oberta.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Pensament crític",
        description: "Aptituds per a la revisió crítica de la validesa de les opinions,evidències i plans.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Consciència de la complexitat",
        description: "Comprensió i habilitats per treballar amb condicionsi causalitats complexes i sistèmiques.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Habilitats de perspectiva",
        description: "Habilitats per buscar, comprendre i fer un ús actiu de punts devista des de perspectives que contrastin.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Donar sentit",
        description: "Habilitats per identificar patrons, estructurar allòdesconegut i ser capaç de crear històries conscientment.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Orientació i visió a llarg termini",
        description: "Orientació a llarg termini i capacitat per formular imantenir el compromís amb les visions relacionades amb elcontext més ampli.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Estima",
        description: "Relacionar-se amb els altres i amb el món amb unsentit elemental d’estima, gratitud i alegria.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Connectivitat",
        description: "Tenir un sentit de profunda connexió amb els altres i/o formarpart d'un tot més gran, com ara una comunitat, la humanitat ol’ecosistema global.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Humilitat",
        description: "Ser capaç d'actuar d'acord amb les necessitats dela situació sense preocupar-se per la pròpia importància.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empatia i compassió",
        description: "Capacitat per relacionar-se amb els altres, amb un mateix i amb lanatura amb amabilitat, empatia i compassió i abordar el patimentdel proïsme.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Habilitats comunicatives",
        description: "Aptitud de realment escoltar els altres, de promoure un diàleggenuí, de defensar hàbilment els nostres punts de vista, degestionar conflictes constructivament i d’adaptar la comunicacióa grups diversos.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Habilitats de co-creació",
        description: "Habilitat i motivació per construir, desenvolupar i facilitarrelacions col·laboratives amb grups d'interès diversos,caracteritzades per la seguretat psicològica i la co-creaciógenuïna.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Mentalitat inclusiva i competència intercultural",
        description: "Disposició i competència per acollir la diversitat iincloure persones i col·lectius amb perspectives i realitatsdiferents.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Confiança",
        description: "Habilitat de demostrar confiança i de crear i mantenirrelacions basades en la confiança.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Habilitats de mobilització",
        description: "Habilitats per inspirar i mobilitzar altres persones per participar enpropòsits compartits.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Valentia",
        description: "Habilitat de defensar valors, prendre decisions, emprendremesures decidides i, si fos necessari, desafiar i trencar amb lesestructures i perspectives existents.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Creativitat",
        description: "Habilitat de generar i desenvolupar idees originals, innovar i estardisposat trencar amb els patrons convencionals.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Optimisme",
        description: "Habilitat de mantenir i comunicar un sentit d'esperança, unaactitud positiva i confiança en la possibilitat d'un canvisignificatiu.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Perseverança",
        description: "Habilitat de mantenir el compromís i romandre determinat ipacient fins i tot quan els esforços triguen molt a donar els seusfruits.",
        dimension: "da4"
      }
    ]
  },
  uk: {
    dimensions: [
      {
        id: "da0",
        name: "Буття",
        description: "Культивування нашого внутрішнього життя, розвиток і поглиблення наших відносин з нашими думками, почуттями і тілом допомагають нам бути присутніми, цілеспрямованими і не реагувати емоційно, коли ми стикаємося зі складнощами.",
        subtitle: "Ставлення до себе",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Мислення",
        description: "Розвиток наших когнітивних навичок шляхом розгляду різних точок зору, оцінки інформації та осмислення світу як взаємопов'язаного цілого є необхідною умовою для прийняття мудрих рішень.",
        subtitle: "Когнітивні навички",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Споріднення",
        description: "Вдячність, турбота та відчуття зв'язку з іншими, такими як сусіди, майбутні покоління або біосфера, допомагають нам створювати більш справедливі та стійкі системи та суспільства для всіх.",
        subtitle: "Турбота про Інших тапро Світ",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Співпрацювання",
        description: "Щоб досягти прогресу у вирішенні спільних проблем, нам потрібно розвивати наші здібності до включення, утримання простору та спілкування із зацікавленими сторонами, які мають різні цінності, навички та компетенції.",
        subtitle: "Соціальні навички",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Діяння",
        description: "Такі якості, як сміливість і оптимізм, допомагають нам набути справжньої активності, зламати старі шаблони, генерувати оригінальні ідеї та діяти наполегливо в непевні часи.",
        subtitle: "Впровадження Змін",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Внутрішній компас",
        description: "Мати глибоке відчуття відповідальності та відданості цінностям та цілям, що сприяють добробуту цілого",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Цілісність та автентичність",
        description: "Відданість та здатність діяти щиро, чесно та цілісно",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Відкритість та мислення з фокусом на розвиток",
        description: "Мати в основі мислення що включає цікавість та бажання бут вразливими, приймати зміни та розвиватися",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Самоусвідомлення",
        description: "Здатність бути в рефлексивному контакті з власними думками, почуттями та бажаннями; мати реалістичне уявлення про себе та здатність регулювати себе",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Присутність",
        description: "Здатність бути тут і зараз, без засудження та в стані відкритої присутності",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Критичне мислення",
        description: "Навички критичного переосмислення, обгрунтованість поглядів доказів та планів",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Усвідомлення складності",
        description: "Розуміння та навички роботи зі складними системними умовами і причинно-нacлiдиковими зв'язкам",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Навички бачити перспективи",
        description: "Вміння знаходити, розуміти і активно використовувати інсайти з протилежних точок зору",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Смислотворення",
        description: "Вміння бачити закономірності, структрувати невідоме та вміти свідомо створювати історії",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Довгострокова орієнтація та візіонерство",
        description: "Довгострокова орієнтація та здатність формулювати та підтримувати відданість баченню більшого контексту",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Визнання, вдячність",
        description: "Ставлення до інших та до світу з почуттям, в основі якого визнання, вдячність та радість",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Пов'язаність",
        description: "Мати тонке відчуття зв' язку з та/або бути частиною більшого цілого, такого як спільнота, людство або глобальна екосистема",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Смирення",
        description: "Вміти діяти відповідно до потреб ситуації, не турбуючись про власну важливіст",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Емпатія і співчуття",
        description: "Вміти ставитися до інших, до себе і до природи з добротою, емпатією та співчуттям і реагувати на страждання",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Навички спілкування",
        description: "Здатність по справжньому слухати інших, підтримувати відвертий діалог, вміло відстоювати власні погляди, конструктивно керувати конфліктами та пристосовувати спілкування до різноманітних груп",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Навички спільнотворчості",
        description: "Навички та мотивація будувати, розвивати та фасилітувати відносини з різноманітними зацікавленими сторонами, засновані на співпраці, психологічній безпеці та справжній спільнотворчості",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Інклюзивне мислення та міжкультурна компетентність",
        description: "Готовність та вміння приймати різноманітність та включати людей і колективи з різними поглядами та походженням",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "довірa",
        description: "Вміння демонструвати довіру, нетинозаовени підтримувати довірливі стосунки",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Hавички мобілізації",
        description: "Вміння надихати та мобілізувати інших залучатися до досягнення спільних цілей",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Сміливість",
        description: "Здатність відстоювати цінності, вирішувати, вживати рішучих заходів та, за потреби, кидати виклик та порушувати існуючі структури та погляди",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Творчість",
        description: "Здатність генерувати та розвивати оригінальні ідеї, впроваджувати інновації, бути готовим і мати бажання порушувати традиційні моделі",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Оптимізм",
        description: "Здатність підтримувати та комунікувати відчуття надії, позитивне ставлення та виевненість у можливості значущих змін",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Наполегливість",
        description: "Здатність підтримувати залученість та залишатися рішучим і терплячим, навіть якщо витрачені зусилля потребують багато часу, щоб принести плоди",
        dimension: "da4"
      }
    ]
  },
  sv: {
    dimensions: [
      {
        id: "da0",
        name: "Vara",
        description: "Att kultivera vårt inre liv samt utveckla och fördjupa relationen till våra tankar, känslor och kropp hjälper oss att vara närvarande, intentionella och icke-reaktiva när vi möter komplexitet.",
        subtitle: "Relationen till sig själv",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Tänka",
        description: "Att utveckla våra kognitiva förmågor genom att pröva olika perspektiv, utvärdera information samt skapa förståelse för världen som en sammankopplad helhet är grundläggande för klokt beslutsfattande.",
        subtitle: "Kognitiva förmågor",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Relatera",
        description: "Att känna uppskattning, omtanke för och gemenskap med andra, såsom grannar, framtida generationer eller biosfären, hjälper oss att skapa mer rättvisa och hållbara system och samhällen för alla.",
        subtitle: "Att bry sig om andra och omvärlden",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Samarbeta",
        description: "För att göra framsteg kring delade utmaningar behöver vi utveckla förmåga att inkludera, skapa utrymme för samt kommunicera med intressenter med skilda värderingar, förmågor och kompetenser.",
        subtitle: "Sociala förmågor",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Agera",
        description: "Egenskaper såsom mod och optimism hjälper oss att agera ur vårt fulla agentskap, bryta gamla mönster, generera nya idéer samt agera med uthållighet i osäkra tider.",
        subtitle: "Att möjliggöra förändring",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Inre kompass",
        description: "Att ha en djupt förankrad känsla av ansvar för och engagemang kring värden och mål i relation till vad helheten behöver.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Integritet och autenticitet",
        description: "Ett engagemang kring och förmåga till att vara uppriktig, ärlig och agera med integritet.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Öppenhet och lärande",
        description: "Att ha ett grundläggande inställning av nyfikenhet och en villighet att vara sårbar, omfamna förändring och att vilja utvecklas.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Självmedvetenhet",
        description: "Förmåga att vara i reflekterande kontakt med egna tankar, känslor och önskemål; att ha en realistisk självbild och förmåga att reglera sig själv.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Närvaro",
        description: "Förmåga att vara här och nu, utan dömande och i ett tillstånd av utforskande och närvaro.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Kritiskt tänkande",
        description: "Förmåga att kritiskt granska åsikters, evidens och planers validitet.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Komplexitetsmedvetenhet",
        description: "Förståelse för samt förmåga att arbeta med komplexa och systemiska förhållanden och orsakssamband.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Perspektivförmågor",
        description: "Förmåga att söka upp, förstå samt aktivt använda insikter från vitt skilda perspektiv.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Meningsskapande",
        description: "Förmåga att se mönster, strukturera det okända samt medvetet skapa mening och narrativ.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Långsiktig orientering och visionerande",
        description: "Långsiktig orientering samt förmåga att formulera och upprätthålla engagemang kring visioner i relation till ett större sammanhang.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Uppskattning",
        description: "Att relatera till andra och till omvärlden med en grundläggande känsla av uppskattning, tacksamhet och glädje.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Samhörighet",
        description: "Att ha en djupt rotad känsla av samhörighet med andra och/eller att vara del av en större helhet, såsom samhället, mänskligheten eller det globala ekosystemet.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Ödmjukhet",
        description: "Förmåga att agera i enlighet med vad en situation kräver utan att vara upptagen med ens egen betydelse.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empati och medkänsla",
        description: "Förmåga att relatera till andra, sig själv samt naturen med vänlighet, empati och medkänsla samt att verka för att lindra lidande.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Kommunikationsfärdigheter",
        description: "Förmåga att verkligen lyssna på andra, att främja genuin dialog, att framföra egna åsikter på konstruktiva sätt, att konstruktivt hantera konflikter samt att anpassa kommunikationen efter olika grupper.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Samskapande",
        description: "Förmåga och motivation att med olika intressenter bygga, utveckla och facilitera samskapande relationer, karakteriserade av psykologisk trygghet och genuin samarbetsvillighet.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Inkluderande hållning och interkulturell kompetens",
        description: "Villighet och kompetens att omfamna mångfald samt inkludera personer och kollektiv av skilda åsikter och bakgrunder.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Tillit",
        description: "Förmåga att visa tillit samt skapa och upprätthålla tillitsfulla relationer.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Mobilisering",
        description: "Förmåga att inspirera och organisera andra att engagera sig i delade intressen.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Mod",
        description: "Förmåga att stå upp för sina värderingar, fatta beslut, agera kraftfullt samt, om situationen kräver, utmana och förändra existerande strukturer och synsätt.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Kreativitet",
        description: "Förmåga att generera och utveckla originella idéer, innovera samt vara villig att bryta konventionella mönster.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Optimism",
        description: "Förmåga att upprätthålla och kommunicera en känsla av hopp, positiv inställning samt tilltro till möjligheten till en meningsfull förändring.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Uthållighet",
        description: "Förmåga att bibehålla engagemang och förbli beslutsam och tålmodig även när det tar lång tid innan ens ansträngningar ger resultat.",
        dimension: "da4"
      }
    ]
  },
  pt: {
    dimensions: [
      {
        id: "da0",
        name: "Ser ",
        description: `Cultivando a nossa vida interior e desenvolvendo e aprofundando a nossa relação com os nossos pensamentos, sentimentos e corpo, ajuda-nos a estar  presentes, com intenção e não reativos quando enfrentamos a complexidade
`,
        subtitle: "Relação com nós próprios",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Pensar  ",
        description: "Desenvolver as nossas capacidades cognitivas considerando diferentes perspetivas, avaliando a informação e percebendo o mundo como um sistema global de interconexões, é essencial para uma tomada de decisão sensata",
        subtitle: "Competências cognitivas ",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Relacionar ",
        description: `Apreciar, cuidar e sentir-se ligado a outros, tais como os vizinhos, as gerações futuras ou a biosfera, ajuda-nos a criar sistemas e sociedades mais justos e sustentáveis para todos.
`,
        subtitle: "Cuidar dos outros e do mundo ",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Colaborar  ",
        description: "Para evoluir nas preocupações partilhadas, precisamos de desenvolver a nossa capacidade para incluir, sustentar espaços e comunicar com as partes interessadas que têm diferentes valores, aptidões e competências.",
        subtitle: "Competências sociais ",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Agir ",
        description: "Qualidades como a coragem e o otimismo ajudam-nos a adquirir uma verdadeira iniciativa, quebrar padrões antigos, gerar ideias originais e agir com persistência em tempos incertos.",
        subtitle: "Possibilitar a mudança ",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Bússola interior",
        description: "Ter um sentido profundo de responsabilidade e compromisso para com os valores e objetivos relacionados com o melhor para o todo.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Integridade e Autenticidade",
        description: "Compromisso e capacidade de agir com sinceridade, honestidade e integridade.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Abertura e mentalidade de aprendizagem",
        description: `Ter uma mentalidade básica de curiosidade, vontade de ser vulnerável, abraçar a mudança e crescer.
`,
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Autoconsciência",
        description: `Capacidade de reflexão com os próprios pensamentos, sentimentos e desejos; ter um sentido realista de autoimagem e capacidade de se regular a si próprio
`,
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Presença",
        description: `Capacidade de estar no aqui e agora, sem julgamento e num estado de presença aberta.
`,
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Pensamento Crítico",
        description: `Competências para efetuar uma revisão critica da validade dos pontos de vista, das evidências e dos planos
`,
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Consciência da Complexidade",
        description: `Compreensão e competências de trabalho com condições e causas complexas e sistémicas 
`,
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Competências de Perspetiva",
        description: `Competências para procurar, compreender e utilizar ativamente insights, a partir de perspetivas contrastantes  
`,
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Fazer sentido",
        description: `Competências para identificar padrões, estruturar o desconhecido e ser capaz de conscientemente criar histórias.
`,
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Orientação e Visão de Longo Prazo",
        description: `Orientação a longo prazo e capacidade de formular e sustentar o compromisso com visões relacionadas com o contexto mais amplo.
`,
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Apreciação",
        description: `Relacionar-se com os outros e com o mundo com um sentido básico de apreciação, gratidão e alegria
`,
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Conexão",
        description: `Ter uma sensação profunda de estar ligado e/ou fazer parte de um todo maior, tal como uma comunidade, a humanidade ou o ecossistema global.
`,
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Humildade",
        description: `Ser capaz de agir de acordo com as necessidades da situação sem se preocupar com a sua própria importância.
`,
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empatia e Compaixão",
        description: `Capacidade de se relacionar com os outros, consigo próprio e com a natureza com bondade, empatia e compaixão e lidar com o sofrimento associado
`,
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Competências de comunicação",
        description: `Capacidade de ouvir realmente os outros, fomentar um diálogo genuíno, argumentar os próprios pontos de vista de forma competente, gerir conflitos de forma construtiva e adaptar a comunicação a diversos tipos de grupos.
`,
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Competências de co-criação",
        description: `Competências e motivação para construir, desenvolver e facilitar as relações colaborativas com os diversos intervenientes num ambiente de segurança psicológica e genuína co-criação.
`,
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Mentalidade inclusiva e competência intercultural",
        description: `Disposição e competência para abraçar a diversidade e incluir pessoas e coletivos com opiniões e contextos diferentes
`,
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Confiança",
        description: `Capacidade de mostrar confiança e de criar e manter relações baseadas na confiança mútua.
`,
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Capacidades de mobilização",
        description: `Competências para inspirar e mobilizar os outros na envolvência e dedicação a propósitos comuns.
`,
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Coragem",
        description: `Capacidade de defender valores, tomar decisões, tomar ações decisivas e, se necessário, desafiar e destituir as estruturas e pontos de vista existentes.
`,
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Criatividade",
        description: `Capacidade de gerar e desenvolver ideias originais, inovar e estar disposto a destituir os padrões convencionais
`,
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Otimismo",
        description: `Capacidade de sustentar e comunicar um sentido de esperança, atitude positiva e confiança na possibilidade de criar uma mudança significativa
`,
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Perseverança",
        description: `Capacidade de manter o compromisso e permanecer determinado e paciente mesmo quando os esforços demoram muito tempo a dar frutos.
`,
        dimension: "da4"
      }
    ]
  },
  "pt-BR": {
    dimensions: [
      {
        id: "da0",
        name: "Ser",
        description: "Cultivar nossa vida interior, desenvolver e aprofundar nosso relacionamento com nossos pensamentos, sentimentos e corpo nos ajudam a estarmos presentes, intencionais e não reativos quando enfrentamos a complexidade.",
        subtitle: "Relacionamento Consigo",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Pensar",
        description: "Desenvolver nossas habilidades cognitivas assumindo diferentes perspectivas, avaliando informações e dando sentido ao mundo como um todo interconectado é essencial para uma tomada de decisão sábia.",
        subtitle: "Habilidades Cognitivas",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Relacionar-se",
        description: "Apreciar, cuidar e sentir-se em conexão com outros, tais como vizinhos, gerações futuras ou a biosfera, ajuda-nos a criar sistemas e sociedades mais justos e sustentáveis para todos.",
        subtitle: "Importar-se com o Outro e com o Mundo",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Colaborar",
        description: "Para progredir nas preocupações compartilhadas, precisamos desenvolver nossas habilidades para incluir, sustentar espaços e comunicar com partes interessadas com diferentes valores, habilidades e competências.",
        subtitle: "Habilidades Sociais",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Agir",
        description: "Qualidades como coragem e otimismo nos ajudam a adquirirmos o senso de termos controle sobre nossas ações e suas consequências, quebrar velhos padrões,gerar ideias originais e agir Com persistência em tempos incertos.",
        subtitle: "Possibilitar Mudanças",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Bússola Interna",
        description: "Ter um profundo senso de responsabilidade e comprometimento com valores e propósitos relacionados ao bem comum.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Integridade e Autenticidade",
        description: "Comprometimento e capacidade de agir com sinceridade, honestidade e integridade.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Abertura e Mentalidade de Aprendiz",
        description: "Ter uma mentalidade básica de curiosidade e vontade de ser vulnerável, abraçar a mudança e crescer.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Autoconsciência",
        description: "Capacidade de estar em contato reflexivo com os próprios pensamentos, sentimentos e desejos; ter uma autoimagem realista e capacidade de se regular.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Presença",
        description: "Capacidade de estar no aqui e agora, sem julgamento e em um estado de presença aberta.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Pensamento Crítico",
        description: "Habilidade de revisar criticamente a validade de pontos de vista, evidências e planos.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Consciência da Complexidade",
        description: "Compreensão e habilidades para trabalhar com condições e causalidades complexas e sistêmicas.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Olhar de Perspectiva",
        description: "Habilidades em buscar, entender e ativamente utilizar percepções obtidas a partir de perspectivas contrastantes.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Fazer Sentido",
        description: "Habilidades de ver padrões, estruturando o desconhecido e sendo capaz de criar histórias conscientemente.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Orientação e Visão de Longo Prazo",
        description: "Orientação de longo prazo e capacidade de formular e sustentar o comprometimento com as visões relacionadas ao contexto mais amplo.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Apreciação",
        description: "Relacionar-se com os outros e com o mundo com um senso básico de apreciação, gratidão e alegria.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Conexão",
        description: "Ter um senso aguçado de estar em conexão e/ou fazer parte de um todo maior, como uma comunidade, humanidade ou ecossistema global.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Humildade",
        description: "Ser capaz de agir de acordo com as necessidades da situação sem se preocupar com a própria importância.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empatia e Compaixão",
        description: "Capacidade de se relacionar com os outros, consigo e com a natureza com bondade, empatia e compaixão e lidar com o sofrimento relacionado.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Comunicação",
        description: "Capacidade de realmente ouvir os outros, promover um diálogo genuíno, defender suas próprias opiniões com habilidade, gerenciar conflitos de forma construtiva e adaptar a comunicação a diversos grupos.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Cocriação",
        description: "Competências e motivação para construir, desenvolver e facilitar relações colaborativas com diversas partes interessadas, caracterizadas pela segurança psicológica e genuína cocriação.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Mentalidade inclusiva e Competência Intercultural",
        description: "Disposição e competência para abraçar a diversidade e incluir pessoas e coletivos com diferentes visões e origens.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Confiança",
        description: "Capacidade de demonstrar confiança, de criar e manter relações de confiança.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Habilidades de mobilização",
        description: "Habilidades em inspirar e mobilizar outros para se engajarem em propósitos compartilhados.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Coragem",
        description: "Capacidade de defender valores, tomar decisões, tomar medidas decisivas e, se necessário, desafiar e romper estruturas e visões existentes.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Criatividade",
        description: "Capacidade de gerar e desenvolver ideias originais, inovar e ter disposição para romper com padrões convencionais.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Otimismo",
        description: "Capacidade de sustentar e comunicar um sentimento de esperança, atitude positiva e confiança na possibilidade de mudanças significativas.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Perseverança",
        description: "Capacidade de manter o engajamento e permanecer com determinação e paciência, mesmo quando os esforços levam muito tempo para dar frutos.",
        dimension: "da4"
      }
    ]
  },
  it: {
    dimensions: [
      {
        id: "da0",
        name: "Essere",
        description: "Coltivare la nostra vita interiore e sviluppare e approfondire la nostra relazione con i nostri pensieri, sentimenti e corpo ci aiuta a essere presenti, intenzionali e non reattivi quando affrontiamo la complessità.",
        subtitle: "Relazionarsi con il proprio sé",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Pensare",
        description: "Sviluppare le nostre capacità cognitive assumendo prospettive diverse, valutando le informazioni e dando un senso al mondo come un tutto interconnesso, è essenziale per attivare un saggio processo decisionale.",
        subtitle: "Competenze cognitive",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Relazionarsi",
        description: "Apprezzare, prendersi cura e sentirsi in contatto con gli altri, col nostro prossimo, con le generazioni future o con la biosfera, ci aiuta a creare sistemi e società più giusti e sostenibili per tutti.",
        subtitle: "Prendersi cura degli Altri e del Mondo",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Collaborare",
        description: "Per progredire sulle criticità condivise, dobbiamo sviluppare le nostre capacità di includere, tenere lo spazio e comunicare con le parti interessate attraverso valori, abilità e competenze diversificate.",
        subtitle: "Competenze sociali",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Agire",
        description: "Qualità come il coraggio e l'ottimismo ci aiutano ad acquisire un vero libero arbitrio, rompere i vecchi schemi, generare idee originali e agire con tenacia in tempi incerti.",
        subtitle: "Abilitare il cambiamento",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Bussola interiore",
        description: "Attivare un profondo senso di responsabilità e impegno per i valori e gli scopi relativi al bene comune.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Integrità e autenticità",
        description: "Impegno e capacità di agire con sincerità, onestà e integrità.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Apertura e mentalità volta allʼapprendimento",
        description: "Avere una mentalità di base curiosa, capace di accettare la vulnerabilità e abbracciare il cambiamento, per crescere.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Autoconsapevolezza",
        description: "Capacità di essere in contatto riflessivo con i propri pensieri, sentimenti e desideri; avere un'immagine di sé realistica e una capacità di autoregolarsi.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Presenza",
        description: "Capacità di essere nel qui e ora, senza giudizio e in uno stato di presenza.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Pensiero critico",
        description: "Abilità nel rivedere criticamente la validità di punti di vista, prove e piani.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Consapevolezza della complessità",
        description: "Comprensione e abilità nel lavorare con condizioni e causalità complesse e sistemiche.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Abilità prospettiche",
        description: "Abilità nel cercare, comprendere e utilizzare attivamente intuizioni da prospettive contrastanti.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Creazione di senso",
        description: "Abilità nel vedere schemi, strutturare l'ignoto ed essere in grado di creare consapevolmente storie.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Orientamento e Visione a lungo termine",
        description: "Orientamento a lungo termine e capacità di formulare e sostenere impegni relativi a visioni allʼinterno di contesti più ampi.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Apprezzamento",
        description: "Relazionarsi con gli altri e con il mondo con un fondamentale senso di apprezzamento, gratitudine e gioia.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Connessione",
        description: "Avere un acuto senso di connessione e/o consapevolezza di far parte di un insieme più ampio, come una comunità, l'umanità o un ecosistema globale.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Umiltà",
        description: "Essere in grado di agire in accordo con le esigenze della situazione senza preoccuparsi della propria importanza.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empatia e compassione",
        description: "Capacità di relazionarsi con gli altri, con se stessi e con la natura con gentilezza, empatia e compassione, affrontandone le relative sofferenze.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Competenze comunicative",
        description: "Capacità di ascoltare veramente gli altri, di promuovere un dialogo genuino, di sostenere abilmente le proprie opinioni, di gestire i conflitti in modo costruttivo e di adattare la comunicazione a contesti e gruppi differenti.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Abilità di co-creazione",
        description: "Competenze e motivazione per costruire, sviluppare e facilitare relazioni collaborative con diversi stakeholder, caratterizzate da una solida sicurezza psicologica e una genuina intenzione di co-creare.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Mentalità inclusiva e competenza interculturale",
        description: "Volontà e capacità di abbracciare la diversità e includere persone e collettivi con punti di vista e background differenti.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Fiducia",
        description: "Capacità di mostrare fiducia, creando e mantenendo relazioni basate su essa.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Capacità di mobilizzazione",
        description: "Abilità nell'ispirare e mobilitare gli altri ad impegnarsi per scopi condivisi.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Coraggio",
        description: "Capacità di difendere i propri valori, prendere decisioni, intraprendere azioni decisive e, se necessario, sfidare e cambiare le strutture e le opinioni esistenti.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Creatività",
        description: "Capacità di generare e sviluppare idee originali, innovare ed essere disposti a rompere gli schemi convenzionali.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Ottimismo",
        description: "Capacità di sostenere e comunicare un senso di speranza, atteggiamento positivo e fiducia nella possibilità di un cambiamento significativo.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Perseveranza",
        description: "Capacità di sostenere l'impegno e rimanere determinati e pazienti anche quando gli sforzi richiedono molto tempo per dare i loro frutti.",
        dimension: "da4"
      }
    ]
  },
  fi: {
    dimensions: [
      {
        id: "da0",
        name: "Oleminen",
        description: "Kun kehitämme omaa sisäistä maailmaamme ja syvennämme suhdettamme omiin ajatuksiimme, tunteisiimme ja keomme, pystymme olemmaan läsnä tietoisemmin ja kohtaamaan paremmin monimutkaisuutta.",
        subtitle: "Suhde itseen",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Ajattelu",
        description: "Tiedollisten taitojemme kehittäminen siten, että tarkastelemme eri näkökulmia, arvioimme tietoa ja hahmotamme mailman systeemisesti yhteen kytkeytyneenä kokonaisuutena, on tärkeää viisaan päätöksenteon kannalta.",
        subtitle: "Tiedolliset taidot",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Yhteys",
        description: "Muiden, kuten naapureiden, tulevien sukupolvien ja biosfäärin, arvostaminen ja näistä huolehtiminen ja yhteenkuuluvuuden tunteminen auttavat meitä luomaan oikeudenmukaisempia ja kestävämpiä järjestelmiä ja yhteiskuntia kaikille.",
        subtitle: "Suhde toisiin ja maailmaan",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Yhteistyö",
        description: "Jotta voimme edistyä yhteisten huolenaiheiden ratkaisemisessa, meidän on kehitettävä kykyämme luoda osallisuutta, tarjota tilaa ja keskustella sellaisten sidosryhmien kanssa, joilla on erilaiset arvot, taidot ja osaaminen.",
        subtitle: "Sosiaaliset taidot",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Toiminta",
        description: "Rohkeuden ja optimismin kaltaiset ominaisuudet auttavat meitä toimimaan aktiivisesti, rikkomaan vanhoja, toimimattomia malleja, luomaan omaperäisiä ideoita ja pysymään sinnikkäinä myös epävarmoina aikoina.",
        subtitle: "Muutoksen edistäminen",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Sisäinen kompassi",
        description: "Syvä vastuuntunto ja sitoutuminen sellaisiin arvoihin ja päämääriin, jotka liittyvät koko ihmiskunnan hyvinvointiin.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Tinkimättömyys ja aitous",
        description: "Sitoutuneisuus ja kyky toimia vilpittömästi, rehellisesti ja tinkimättömästi.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Avoimuus ja oppiva mieli",
        description: "Utelias mielenlaatu sekä valmius olla haavoittuvainen ja suhtautua avoimesti muutokseen ja kasvun mahdollisuuksiin.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Itsetuntemus",
        description: "Kyky pohdiskella omia ajatuksia, tunteita ja toiveita, realistinen minäkuva ja kyky itsesäätelyyn.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Läsnäolo",
        description: "Kyky olla tässä ja nyt, arvostelematta, avoimen läsnäolon tilassa.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Kriittinen ajattelu",
        description: "Tiedot arvioida kriittisesti eri näkökulmien, todisteiden ja suunnitelmien paikkansapitävyyttä.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Monimutkaisuuden tiedostaminen",
        description: "Ymmärrys ja kyky toimia monitahoisten ja systeemisten tilanteiden ja syy-yhteyksien parissa.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Näkökulmittamisen taito",
        description: "Taidot etsiä, ymmärtää ja aktiivisesti hyödyntää vastakkaisistakin näkökulmista saatuja oivalluksia.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Jaetun ymmärryksen luominen",
        description: "Kyky havaita toistuvia kaavoja, jäsennellä tuntematonta ja luoda tarinoita tietoisesti.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Pitkäjänteisyys ja visiointi",
        description: `Kyky pitkän tähtäimen ajatteluun sekä taito luoda ja ylläpitää
sitoutumista laajempaan kokonaisuuteen liittyviin visioihin`,
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Arvostus",
        description: "Suhtautuminen muihin ihmisiin ja maailmaan arvostuksen, kiitollisuuden ja ilon kautta.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Yhteenkytkeytyneisyys",
        description: "Voimakas tunne siitä, että on yhteydessä johonkin suurempaan kokonaisuuteen, kuten yhteisöön, ihmiskuntaan tai maailmanlaajuiseen ekosysteeminen, ja kokee olevansa osa sitä.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Nöyryys ja tilannetaju",
        description: "Kyky toimita tilanteen tarpeiden mukaisesti ilman oman itsensä tärkeyden korostamista.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empatia ja myötätunto",
        description: "Kyky suhtautua ja luoda yhteyksiä toisiin ihmisiin, itseensä ja luontoon empaattisesti ja myötätuntoisesti ja puuttua niihin liittyvään kärsimykseen.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Vuorovaikutustaidot",
        description: "Kyky todella kuunnella muita, edistää aitoa vuoropuhelua, ajaa omia näkemyksiään taitavasti, käsitellä konflikteja rakentavasti ja mukauttaa viestintää erilaisille ryhmille.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Yhteiskehittämistaidot",
        description: "Taidot ja motivoituneisuus rakentaa, kehittää ja edistää eri sidosryhmien kanssa yhteistyöhön perustuvia suhteita, joissa vallitsee psykologisen turvallisuuden tunne ja aito yhteiskehittäminen.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Osallisuuden luominen ja monimuotoisuustaidot",
        description: "Halukkuus ja kyky ymmärtää moninaisuutta ja ottaa mukaan erilaisista näkökannoista ja taustoista tulevia ihmisiä ja yhteisöjä.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Luottamus",
        description: "Kyky osoittaa luottamusta sekä luoda ja ylläpitää luottamuksellisia suhteita.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Innostaminen ja toimeenpanotaidot",
        description: "Taidot innostaa ja saada muut osallistumaan yhteisten päämäärien edistämiseen.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Rohkeus",
        description: "Kyky seistä omien arvojen takana, tehdä päätöksiä, toimia päättäväisesti sekä tarvittaessa haastaa ja ravistella olemassa olevia rakenteita ja näkemyksiä.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Luovuus",
        description: "Kyky tuottaa ja kehittää omaperäisiä ideoita, innovoida ja olla valmis rikkomaan perinteisiä toimintamalleja.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Optimismi",
        description: "Kyky ylläpitää ja välittää toivoa, myönteistä asennetta ja luottamusta merkityksellisen muutoksen mahdollisuuteen.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Sinnikkyys",
        description: "Kyky säilyttää sitoutuneisuus ja pysyä määrätietoisena ja kärvivällisenä silloinkin, kun toiminnan tulosten saavuttamisessa menee aikaa.",
        dimension: "da4"
      }
    ]
  },
  ja: {
    dimensions: [
      {
        id: "da0",
        name: "自分のあり方",
        description: "自身の内面(心)を耕しましょう。そして、自分自身の考え、気持ち、身体とのつながりを育て深めることで、複雑なことに直面しても、反応的にはならず、「今ここ」に存在し、意図的でいられるようになりましょう。",
        subtitle: "自己との関係性",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "考える",
        description: "認知スキルを伸ばすことは、賢く適切な意思決定のためには欠かせません。多様な視点を持ち、情報を評価し、世界を相互につながり合う全体として捉えましょう。",
        subtitle: "認知スキル",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "つながりを意 識する",
        description: "となり近所の人や未来の世代、生物が生息する空間全体など、他の存在に感謝し、思いやり、つながりを感じましょう。それは、すべての人にとってより公正で持続可能なシステムや社会 をつくることにつながります。",
        subtitle: "他者や世界を思いやる",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "協働する",
        description: "みんなの心配ごとを何とかするには、異なる価値観、スキル、能力を持つステークホルダー(関係する人たち)を受け入れ、場をつくり、コミュニケーションを取る能力が必要です。",
        subtitle: "社会的スキル",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "行動する",
        description: "勇気や楽観性といった資質は、真の主体性を獲得し、古いパターンを打ち破り、独創的なアイデアを生み出し、不確実な時代に粘り強く行動する上で役立ちます。",
        subtitle: "変化を可能にする",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "内なるコンパス (羅針盤)",
        description: "全体のためになる価値観や目的に対して、深く体感した責任とコミットメントの感覚(主体的にかかわる感覚)を持っていること",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "誠実・真摯で、本物である",
        description: "誠実さ、正直さ、統合された自己一貫性を持って行動することへのコミットメントと能力",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "オープンさと学ぼうとする意欲・姿勢",
        description: "好奇心という基本的な意欲・姿勢を持ち、進んで自分の弱さをさらけ出し、変化や成長を喜んで採り入れること",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "自分を理解する力",
        description: "自分自身の考えや気持ち、欲求に内省的につながることができること。現実的な自己イメージを持ち、自分を律する能力を持っていること",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "プレゼンス (今ここに在ること )",
        description: "今ここにいて、決めつけをせず、オープン・エンドの(結論や答えがない)状態でいられる力",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "クリティカル・シンキング (思考の偏りに気づく)",
        description: "ものごとの捉え方、結論、プランに対して、妥当かどうかをクリティカルに熟考するスキル",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "複雑さの認識",
        description: "複雑でシステム的な状況と因果的なつながりを理解し、それを活用するスキル",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "パースペクティブ・スキル (視点・見通す力)",
        description: "対照的な視点からの洞察を求め、理解し、積極的に活用するスキル",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "センス-メイキング (意味を見出す力)",
        description: "パターンを見てとり、未知のものを構造化し、ストーリーを意識的に紡ぐことができるスキル",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "長期志向とビジョニング",
        description: "長期志向を持ち、より大きな全体性の文脈につながるビジョンを描き、それにコミットメントし続ける力",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "感謝",
        description: "他の存在や世界に対し、感謝、ありがたさ、喜びの基本的な感覚を持ってつながること",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "つながっているという感覚",
        description: "コミュニティ、人類、地球の生態系など、より大きな全体とつながっている、またはその一部であるという鋭い感覚を持つこと",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "謙虚さ",
        description: "自己の重要性にとらわれることなく、その場の状況が必要としていることに応じて行動できること",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "共感と思いやり",
        description: "優しさ、共感、思いやりをもって、他の存在、自分自身、自然とつながり、それらに関わる苦しみに対処する能力",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "コミュニケーション・スキル",
        description: "他者の話を本当に聴く力、真の対話を育む力、自分の意見を上手に主張する力、対立を建設的に扱う力、多様なグループに合わせたコミュニケーションを取る力",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "共創スキル",
        description: "多様なステークホルダー(関係する人たち)と協力関係をつくり、発展、促進させるスキルと意欲。その関係性には、心理的安全性と真の共創という特徴があること",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "インクルーシブな (みんなを包み尊重する)意識や態度と異文化コンピテンス",
        description: "多様性を歓迎し、さまざまな異なった見解や背景を持つ人々や集団を受け入れ、含める意欲と能力",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "信頼",
        description: "心を寄せて、信頼関係を築き、維持する能力",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "集団を動かすスキル",
        description: "共通の目的に他の人たちが関わるように、ひらめきを与え、動員するスキル",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "勇気",
        description: "価値観を貫き、決断し、断固とした行動を取り、必要ならば、既存の構造や見解に異議を唱え、破壊する能力。",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "創造性",
        description: "独創的なアイデアを生み出し発展させ、革新をもたらし、従来のパターンを進んで破壊する能力",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "楽観性",
        description: "希望の感覚、前向きな姿勢、意味のある変化の可能性への自信を保ち、伝える力",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "粘り強さ",
        description: "努力が実を結ぶのに長い時間がかかる場合でも、決意を固め、忍耐強く関わり続ける力",
        dimension: "da4"
      }
    ]
  },
  dk: {
    dimensions: [
      {
        id: "da0",
        name: "Være",
        description: "At danne vores indre liv og videreudvikle og uddybe vores relationer til egne tanker, følelser og krop hjælper os til at være nærværende, intentionelle og ikke-reaktive, når vi møder kompleksitet.",
        subtitle: "At relatere til sig selv",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Tænke",
        description: "At udvikle vores kognitive færdigheder ved at kunne tage forskellige perspektiver, evaluere information og skabe mening om verden som en sammenhængende helhed er afgørende for klog beslutningstagning.",
        subtitle: "Kognitive færdigheder",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Relatere",
        description: "At værdsætte, drage omsorg for og føle sig forbundet med andre, f.eks. naboer, fremtidige generationer eller biosfæren, hjælper os med at skabe mere retfærdige og bæredygtige systemer og samfund for alle.",
        subtitle: "Omsorg for andre og verden",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Samarbejde",
        description: "For at gøre fremskridt med hensyn til fælles bekymringer må vi udvikle vores evner til at inkludere, holde rum og kommunikere med interessenter med forskellige værdier, færdigheder og kompetencer.",
        subtitle: "Sociale færdigheder",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Handle",
        description: "Egenskaber som mod og optimisme hjælper os til at opnå ægte handlekraft, bryde gamle mønstre, generere originale ideer og handle med vedholdenhed i usikre tider.",
        subtitle: "At muliggøre forandring",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Indre kompas",
        description: "At have en dybfølt ansvarsfølelse og et engagement i værdier og formål, der vedrører helhedens bedste.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Integritet og autenticitet",
        description: "Et engagement og en evne til at handle med oprigtighed, ærlighed og integritet.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Åbenhed og lærende mindset",
        description: "At have en grundlæggende nysgerrighed, en vilje til at være sårbar, at omfavne forandring og udvikle sig videre.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Selvbevidsthed",
        description: "At være i reflekterende kontakt med egne tanker, følelser og ønsker. At have et realistisk selvbillede og evne til at regulere sig selv.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Nærvær",
        description: "Evner til at være til stede her og nu, uden fordomme og i en tilstand af åben tilstedeværelse.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Kritisk tænkning",
        description: "Færdigheder til kritisk at forholde sig til gyldigheden af synspunkter, konklusioner og planer.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Kompleksitetsbevidsthed",
        description: "Forståelse for og færdigheder i at arbejde med komplekse og systemiske forhold og kausalitet.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Perspektiveringsfærdigheder",
        description: "Færdigheder i at opsøge, forstå og aktivt gøre brug af indsigter fra modsatrettede perspektiver.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Meningsskabelse",
        description: "Færdigheder i at se mønstre, strukturere det ukendte og være i stand til bevidst at skabe historier.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Langsigtet orientering og visionsskabelse",
        description: "Langsigtet orientering og evnen til at formulere og fastholde engagementet i de visioner, der relaterer sig til den større kontekst.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Anerkendelse",
        description: "At forholde sig til andre og til verden med en grundlæggende følelse af anerkendelse, taknemmelighed og glæde.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Forbundethed",
        description: "At have en klar følelse af at være forbundet med og/eller være en del af en større helhed, såsom et fællesskab, menneskeheden eller naturen.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Ydmyghed",
        description: "At kunne handle i overensstemmelse med situationens behov uden bekymring for sin egen vigtighed.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empati og medfølelse",
        description: "Evnen til at forholde sig til andre, sig selv og naturen med venlighed, empati og medfølelse samt intentionen om at adressere lidelse relateret hertil.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Kommunikationsfærdigheder",
        description: "Evner til virkelig at lytte til andre, skabe ægte dialog, forsvare egne synspunkter dygtigt, håndtere konflikter konstruktivt og tilpasse kommunikationen til forskellige grupper.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Samskabelse",
        description: "Færdigheder og motivation til at opbygge, udvikle og facilitere samarbejdsrelationer med forskellige interessenter, præget af psykologisk tryghed og ægte samskabelse.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Inkluderende mindset og interkulturelle kompetencer",
        description: "Vilje og kompetence til at omfavne diversitet samt inkludere mennesker og grupper med forskellige synspunkter og baggrunde.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Tillid",
        description: "Evner til at have tillid samt til at skabe og vedligeholde tillidsfulde relationer.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Evner til at mobilisere",
        description: "Færdigheder i at inspirere og mobilisere andre til at engagere sig i fælles formål.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Mod",
        description: "Evner til at forsvare værdier, træffe beslutninger, være handlekraftig og – om nødvendigt – at udfordre og nytænke eksisterende strukturer og synspunkter.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Kreativitet",
        description: "Evner til at skabe og udvikle originale idéer, være innovativ og villig til at nytænke konventionelle mønstre.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Optimisme",
        description: "Evner til at opretholde og kommunikere en følelse af håb, positiv tilgang samt tillid til at meningsfuld forandring kan finde sted.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Vedholdenhed",
        description: "Evner til at opretholde engagement og forblive beslutsom og tålmodig, selv når indsatsen tager lang tid om at bære frugt.",
        dimension: "da4"
      }
    ]
  },
  de: {
    dimensions: [
      {
        id: "da0",
        name: "Sein",
        description: "Die Pflege unseres inneren Lebens und die Entwicklung und Vertiefung unserer Beziehung zu unseren Gedanken, Gefühlen und unserem Körper helfen uns, präsent, absichtsvoll und nicht reaktiv zu sein wenn wir mit Komplexität konfrontiert sind.",
        subtitle: "Beziehung zu sich selbst",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Denken",
        description: "Das Entwickeln unserer kognitiven Fähigkeiten, indem wir verschiedene Perspektiven einnehmen, Informationen bewerten und die Welt als ein zusammenhängendes Ganzes begreifen, ist eine wesentliche Voraussetzung für kluge Entscheidungen.",
        subtitle: "Kognitive Fertigkeiten",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Beziehung",
        description: "Wertschätzung, Fürsorge und das Gefühl der Verbundenheit mit anderen, z. B. mit Nachbarn, künftigen Generationen oder der Biosphäre, helfen uns, gerechtere und nachhaltigere Systeme und Gesellschaften für alle zu schaffen.",
        subtitle: "Fürsorge für andere und die Welt",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Zusammenarbeit",
        description: "Um bei gemeinsamen Anliegen voranzukommen, müssen wir unsere Fähigkeit entwickeln, Akteure mit unterschiedlichen Werten, Fähigkeiten und Kompetenzen einzubeziehen, ihnen Raum zu geben und mit ihnen zu kommunizieren.",
        subtitle: "Soziale Kompetenzen",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Handeln",
        description: "Eigenschaften wie Mut und Optimismus helfen uns, echte Handlungsfähigkeit zu erlangen, alte Muster zu durchbrechen, originelle Ideen zu entwickeln und in unsicheren Zeiten mit Ausdauer zu handeln.",
        subtitle: "Um Wandel zu ermöglichen",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Innerer Kompass",
        description: "Ein tief empfundenes Gefühl der Verantwortung und des Engagements für Werte und Ziele, die dem Wohl des Ganzen dienen.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Integrität und Authentizität",
        description: "Die Verpflichtung und Fähigkeit, aufrichtig, ehrlich und integer zu handeln.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Offenheit und Lernbereitschaft",
        description: "Eine Grundhaltung der Neugier und die Bereitschaft, verletzlich zu sein, sich auf Veränderungen einzulassen und zu wachsen.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Selbsterkenntnis",
        description: "Fähigkeit, in reflektierendem Kontakt mit den eigenen Gedanken, Gefühlen und Wünschen zu sein; ein realistisches Selbstbild und Fähigkeit zur Selbstregulierung.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Gegenwärtigkeit",
        description: "Die Fähigkeit, im Hier und Jetzt zu sein, ohne zu urteilen und in einem Zustand der offenen Präsenz.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Kritisches Denken",
        description: "Fähigkeit, die Gültigkeit von Ansichten, Beweisen und Plänen kritisch zu überprüfen.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Bewusstsein für Komplexität",
        description: "Verständnis für und Fähigkeiten im Umgang mit komplexen und systemischen Bedingungen und Kausalzusammenhängen.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Perspektivische Fähigkeiten",
        description: "Fähigkeiten zur Suche, zum Verständnis und zur aktiven Nutzung von Erkenntnissen aus unterschiedlichen Perspektiven.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Sinnstiftung",
        description: "Fähigkeiten, Muster zu erkennen, Unbekanntes zu strukturieren und Geschichten bewusst zu gestalten.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Langfristige Orientierung und Visionen",
        description: "Langfristige Orientierung und die Fähigkeit, Visionen in Bezug auf den größeren Kontext zu formulieren und aufrechtzuerhalten.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Wertschätzung",
        description: "Mit einem grundlegenden Gefühl der Wertschätzung, Dankbarkeit und Freude auf andere und die Welt zugehen.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Verbundenheit",
        description: "Ein ausgeprägtes Gefühl, mit einem größeren Ganzen verbunden zu sein und/oder Teil eines solchen zu sein, wie z. B. einer Gemeinschaft, der Menschheit oder einem globalen Ökosystem.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Bescheidenheit",
        description: "In der Lage sein, in Übereinstimmung mit den Bedürfnissen der Situation zu handeln, ohne sich um die eigene Wichtigkeit zu kümmern.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Einfühlungsvermögen und Mitgefühl",
        description: "Die Fähigkeit, anderen, sich selbst und der Natur mit Freundlichkeit, Einfühlungsvermögen und Mitgefühl zu begegnen und das damit verbundene Leiden zu bewältigen.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Kommunikative Fähigkeiten",
        description: "Fähigkeit, anderen wirklich zuzuhören, einen echten Dialog zu förden, die eigene Meinung gekonnt zu vertreten, Konflikte konstruktiv zu lösen und die Kommunikation an unterschiedliche Gruppen anzupassen.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Mitgestaltungsfähigkeiten",
        description: "Fähigkeiten und Motivation zum Aufbau, zur Entwicklung und zum Ermöglichen von Kooperationsbeziehungen mit verschiedenen Interessengruppen, gekennzeichnet durch psychologischer Sicherheit und echter Ko-Kreation.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Integrative Denkweise und interkulturelle Kompetenz",
        description: "Bereitschaft und Kompetenz, Vielfalt anzunehmen und Menschen und Kollektive mit unterschiedlichen Ansichten und Hintergründen einzubeziehen.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Vertrauen",
        description: "Fähigkeit, Vertrauen zu zeigen und vertrauensvolle Beziehungen aufzubauen und zu pflegen.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Fähigkeiten zur Mobilisierung",
        description: "Fähigkeit, andere zu inspirieren und zu mobilisieren, sich für gemeinsame Ziele einzusetzen.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Mut",
        description: "Die Fähigkeit, für Werte einzutreten, Entscheidungen zu treffen, entschlossen zu handeln und, wenn nötig, bestehende Strukturen und Ansichten in Frage zu stellen und aufzubrechen und Ansichten in Frage zu stellen.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Kreativität",
        description: "Fähigkeit, originelle Ideen zu entwickeln, innovativ zu sein und bereit, konventionelle Muster zu durchbrechen.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Optimismus",
        description: "Fähigkeit, ein Gefühl der Hoffnung, eine positive Einstellung und Zuversicht an die Möglichkeit eines sinnhaften Wandels.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Beharrlichkeit",
        description: "Fähigkeit, das Engagement aufrechtzuerhalten und entschlossen und geduldig zu bleiben, auch wenn die Bemühungen lange Zeit brauchen, um Früchte zu tragen.",
        dimension: "da4"
      }
    ]
  },
  fr: {
    dimensions: [
      {
        id: "da0",
        name: "Etre",
        description: "Le développement de notre vie intérieure, tout comme lʼaccroissement et lʼapprofondissement de notre relation avec nos pensées, nos sentiments et notre corps, nous aident à être présents et non réactifs lorsque nous sommes confrontés à la complexité.",
        subtitle: "Notre rapport à nous- mêmes",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Penser",
        description: "Le développement de nos capacités cognitives en examinant différents angles, en évaluant les informations et en comprenant le monde en tant que tout interconnecté est essentiel pour une prise de décision sensée.",
        subtitle: "Capacité cognitives",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Interagir",
        description: "Le fait de respecter les autres, dʼen prendre soin et de se sentir connecté à eux – nos voisins, les générations futures, ou la biosphère, par exemple – nous aide à créer des systèmes et des sociétés plus justes et durables pour tout le monde.",
        subtitle: "Prendre soin des autres et du monde",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Collaborer",
        description: "Pour progresser concernant des préoccupations partagées, nous devons développer notre capacité à inclure des acteurs présentant des valeurs, des compétences et des talents différents, mais aussi notre capacité à leur faire une place et à communiquer avec eux.",
        subtitle: "Compétences sociales",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Agir",
        description: "Les qualités telles que le courage et lʼoptimisme nous aident à nous responsabiliser véritablement, à casser les vieux schémas, à produire des idées originales et à agir avec persévérance en des temps incertains.",
        subtitle: "Permettre le changement",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Boussole intérieure",
        description: "Le fait dʼéprouver un sens profond des responsabilités et un devoir dʼengagement envers des valeurs et des objectifs liés au bien de tous.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Intégrité et authenticité",
        description: "Un engagement et une capacité à agir avec sincérité, honnêteté et intégrité.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Ouverture et envie d’apprendre",
        description: "Le fait dʼêtre fondamentalement curieux et dʼaccepter dʼêtre vulnérable, dʼaccepter le changement et de grandir.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Conscience de soi",
        description: "Capacité dʼêtre en contact avec ses propres pensées, sentiments et désirs et dʼy réfléchir ; dʼavoir une image de soi réaliste et de sʼauto-réguler.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Présence",
        description: "Le fait dʼêtre capable dʼêtre là, ici et maintenant, sans jugement, avec un esprit dʼouverture.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Pensée critique",
        description: "Capacité à évaluer de manière critique la validité des opinions, des preuves et des projets.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Conscience de la complexité",
        description: "Comprendre des conditions et causalités complexes et systémiques tout en développant des compétences de travail en la matière.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Capacités de mise en perspective",
        description: "Capacités en matière de recherche, de compréhension et dʼutilisation active dʼinformations issus de perspectives contradictoires.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Donner du sens",
        description: "Capacité dʼidentification de schémas, de structuration de lʼinconnu et de création consciente dʼhistoires.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Long-term Orientation et vision à long terme",
        description: "Le fait dʼêtre axé sur le long terme et la capacité à formuler et maintenir un engagement envers des visions liées à un contexte plus vaste.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Respect",
        description: "Interagir avec les autres et le monde en faisant preuve, fondamentalement, de respect, de gratitude et de joie.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Connectivité",
        description: "Le fait dʼêtre fortement conscient de notre lien avec un tout plus vaste et/ou dʼen faire partie – par exemple, une communauté, lʼhumanité, lʼécosystème mondial.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Humilité",
        description: "Etre capable dʼagir conformément aux besoins de la situation sans se soucier de sa propre personne.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empathie et compassion",
        description: "La capacité dʼinteragir avec les autres, avec soi-même et avec la nature en faisant preuve de gentillesse, dʼempathie et de compassion, et de traiter toute souffrance éprouvée dans ce contexte.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Compétencs communicationnelles",
        description: "La capacité dʼécouter réellement les autres, dʼencourager un véritable dialogue, de défendre son propre point de vue avec habileté, de gérer les conflits de manière constructive et dʼadapter sa communication à son interlocuteur.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Compétences de co-creation",
        description: "Les compétences et la motivation permettant de construire, développer et faciliter des relations collaboratives avec différentes parties prenantes dans un contexte de sécurité psychologique et de réelle co-création.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Mentalité inclusive et compétences interculturelles",
        description: "Le désir et la capacité dʼaccueillir la diversité et dʼinclure des gens et des groupes aux origines et avis différents.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Confiance",
        description: "La capacité de manifester de la confiance et de créer et dʼentretenir des relations basées sur la confiance.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Capacités de mobilisation",
        description: "Etre capable dʼinspirer et de mobiliser les autres pour quʼils sʼinvestissent dans des objectifs communs.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Courage",
        description: "La capacité de se battre pour des valeurs, de prendre des décisions, dʼagir de manière décisive et, si nécessaire, de défier et perturber des structures et opinions existantes.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Creativité",
        description: "La capacité de générer et de développer des idées originales, dʼinnover, et dʼêtre désireux de perturber les schémas conventionnels.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Optimisme",
        description: "La capacité dʼentretenir et de communiquer un sens de lʼespoir, une attitude positive et sa confiance dans la possibilité dʼun changement significatif.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Persévérance",
        description: "La capacité de maintenir son engagement et de rester déterminé et patient lorsque nos efforts mettent du temps à porter leurs fruits.",
        dimension: "da4"
      }
    ]
  },
  "zh-CN": {
    dimensions: [
      {
        id: "da0",
        name: "存在",
        description: "培养我们的内在生活,发展并加深我们与自己思想、情感和身体的关系,有助于我们在面对复杂环境时保持临在、意图清晰并不过度反应。",
        subtitle: "与自我的关系",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "思考",
        description: "通过采取不同的视角、评估信息、 并将世界作为一个相互联系的整体来理解,从而发展我们的认知技能。这点对于明智的决策至关重要。",
        subtitle: "认知技能",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "关系",
        description: "欣赏他人、关心他人、感觉与他人的连结,如邻居、后辈、或生态圈,帮助我们创造一个对所有人而言更加公平、可持续的系统和社会。",
        subtitle: "关爱他人与世界",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "协同",
        description: "为了在共同关注的问题上取得进展,我们需要发展自己的能力,以便包容、为他人留出空间并且与有不同价值观、技能和能力的利益相关者进行沟通。",
        subtitle: "社交技能",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "行动",
        description: "例如勇气和乐观的品质能帮助我们获得真正的驱动力,打破固有模式,产生原创想法,并在不稳定的时代中持之以恒地行动。",
        subtitle: "驱动变革",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "内在指南针",
        description: "对与整体利益相关的价值观和目的,拥有深切的责任感和承诺。",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "正直与真 实 性",
        description: "带着真诚、诚实和正直的承诺与实践能力去行事。",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "开放与学习心态",
        description: "具有基本的好奇心态和接纳脆弱、接受变化和自身成长。",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "自我意识",
        description: "反思自己的思想、感受和欲望的能力;拥有现实的自我形象和自我调节的能力。",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "当下存在感",
        description: "能够活在当下, 不带评判,处于一种开放的存在状态。",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "批判性思 维",
        description: "对于审查观点、证据和计划的有效性方面的批判性技能。",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "复杂性意识",
        description: "具备处理复杂和系统性条件及其因果关系的理解和技能。",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "洞察技能",
        description: "寻求、理解并积极运用来自对立视角的见解技能。",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "意义构建",
        description: "具备观察模式,未知事物结构化诠释,以及有意识创作故事的技能。",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "长期导向与愿景构想",
        description: "长期导向、制定与更大背景相关的愿景及保持对之承诺的能力。",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "欣赏",
        description: "与他人及世界相处时具有基本的欣赏、感恩和喜悦感。",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "联结",
        description: "敏锐地感觉自己与更大的整体相连接,或作为更大的整体的一部分,例如社区、人类或全球生态系统。",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "谦逊",
        description: "能够依情况的需要而行动,而非突出自己的重要性。",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "同理与慈悲",
        description: "能以善意、同理和慈悲,待人、待己、待自然,并能处理相关的痛苦。",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "沟通技能",
        description: `能真正倾听他人,培养真诚对话,巧妙地提倡自己的观点, 建设性地
处理冲突,以及适应与多元群体沟通的能力。`,
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "共创技能",
        description: "有能力和意愿去建立、发展和促进合作关系的技能,并以心理安全感和真正的共创为特征。",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "包容心态与跨文化能力",
        description: "愿意且能够拥抱多样性,并包容不同观点和背景的个体及群体的意愿和能力。",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "信任",
        description: "能展示信任,以及建立与维持信任关系的能力。",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "动员技能",
        description: "能激励和动员他人投入共同目标。",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "勇气",
        description: "能够捍卫价值观、做出决策、采取果断行动,并在必要时挑战和颠覆现有的结构和观点的能力。",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "创造力",
        description: "能生成并发展原创想法、创新以及愿意颠覆传统模式的能力。",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "乐观",
        description: "在有意义变化的可能性当中能维持并传递希望感、积极的态度和信心的能力。",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "毅力",
        description: "即使需要很长时间的努力才能取得成果,仍然能持续投入、保持决心和耐心的能力。",
        dimension: "da4"
      }
    ]
  },
  "zh-TW": {
    dimensions: [
      {
        id: "da0",
        name: "存在",
        description: "培養我們的內在生活，發展和深化我們與自身思考、感受和身體間的關係，有助於我們在面對複雜環境時保持臨在、有意識、不過度反應。",
        subtitle: "與自我的關係",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "思考",
        description: "透過採取不同觀點、評估資訊，和理解全世界是一個相互關聯的整體，來發展我們的認知技能，這對於做出明智的決策是至關重要的。",
        subtitle: "認知能力",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "關聯",
        description: "欣賞、關心並能感受與萬物之連結，如鄰居、未來世代或生物圈，有助於我們為所有人創造更公平和永續的系統和社會。",
        subtitle: "關心他人與世界",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "協作",
        description: "為了在共同關心的議題上取得進展，我們需要發展我們的能力，以便能包容、護持空間，並與擁有不同價值觀、技能和能力的利害關係人進行溝通。",
        subtitle: "社交能力",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "行動",
        description: "勇氣和樂觀等素質有助於我們能夠獲得真正的自我驅動力，打破舊有模式，產生原創想法, 並在不確定的時刻堅持不懈地行動。",
        subtitle: "促進改變",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "內在指南針",
        description: "深刻感受到對促進整體福祉的價值觀和使命的責任與承諾。",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "正直和真實性",
        description: "以誠摯、誠實和正直的承諾和能力來行事。",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "開放和學習心態",
        description: "擁有好奇心，願意接納自身的脆弱、並擁抱改變與成長。",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "自我覺察",
        description: "能夠反思自我的思維、感受和欲望；擁有真實的自我印象和自我調節的能力。",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "臨在",
        description: "能夠活在當下，不帶評判，處於一種開放的臨在狀態。",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "批判性思維",
        description: "批判性地評估觀點、證據和計畫正確性的技能。",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "複雜性覺知",
        description: "具有處理複雜和系統性狀況及因果關係的理解和技能。",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "觀點技能",
        description: "尋求、理解和善加利用不同觀點的技能。",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "意義建構",
        description: "觀察模式、對未知事物之組織建構並有意識地創造故事的技能。",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "長期導向和願景",
        description: "長期導向，並有能力制定和堅持與更大脈絡相關願景的承諾。",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "欣賞",
        description: "以欣賞、感恩和喜悅之心與世界萬物建立連結。",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "連結感",
        description: "敏銳地感知與意識到自己與更大的整體有所連結／或是他們的一部份，如社群、人類或全球生態系統。",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "謙遜",
        description: "能根據情況的需要行事，而不在意自身的重要性。",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "同理心和慈悲",
        description: "能以仁慈、同理心和慈悲的方式與他人、自己和大自然建立連結,並能夠處理相關的痛苦。",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "溝通技能",
        description: "能真正聆聽他人，促進真誠的對話，並有技巧地提倡自己的觀點, 建設性地處理衝突，並調整與不同群體的溝通方式。",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "共同創造技能",
        description: "與多元的利害關係者建構、發展和促進合作關係的技能和動力, 並以心理安全和真誠的共同創造為其特點。",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "包容性思維與跨文化能力",
        description: "願意且能夠擁抱多樣性並包容擁有不同觀點和背景的個人和集體。",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "信任",
        description: "能展現信任並創造及維繫信任關係。",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "動員技能",
        description: "能激勵和動員他人投入共同目標。",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "勇氣",
        description: "能堅守價值觀、做出決策、果斷行動，並在必要時挑戰和打破既有結構和觀點。",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "創造力",
        description: "能產生和發展原創想法、創新和願意打破傳統模式。",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "樂觀",
        description: "能維持和傳達希望感、積極態度以及對有意義的改變之可能性具備信心。",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "毅力",
        description: "即使努力需要很長一段時間才能看見成果, 依然能堅持投入並保有決心和耐心。",
        dimension: "da4"
      }
    ]
  },
  tr: {
    dimensions: [
      {
        id: "da0",
        name: "Var Olma",
        description: "İçsel yaşantımızı besleyerek düşüncelerimiz, duygularımız ve bedenimizle olan ilişkimizi geliştirip derinleştirmek; zorluklarla karşılaştığımızda hazır ve sakin olmamıza yardımcı olur.",
        subtitle: "Benlikle İlişki",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Düşünme",
        description: "Farklı bakış açıları edinerek, bilgiyi değerlendirerek ve dünyayı birbirine bağlı bir bütün halinde anlamlandırarak bilişsel becerilerimizi geliştirmek, akıllıca karar vermek için gereklidir.",
        subtitle: "Bilişsel Beceriler",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "İlişkilendirme",
        description: "Komşular, gelecek nesiller veya üzerinde yaşadığımız katman olan biyosfer gibi farklı şeylerin değerini bilmek, önemsemek ve bağı hissetmek; herkes için daha adil, sürdürülebilir sistem ve toplumlar yaratmamıza yardımcı olur.",
        subtitle: "Başkalarına ve Dünyaya Değer Verme",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "İşbirliği Yapma",
        description: "Ortak kaygılar konusunda ilerleme kaydedebilmek için farklı değerlere, becerilere ve yetkinliklere sahip paydaşları dahil etme, onlara alan açma ve iletişim kurma becerilerimizi geliştirmemiz gerekmektedir.",
        subtitle: "Sosyal Beceriler",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Eyleme Geçme",
        description: "Cesaret ve iyimserlik gibi nitelikler, eylemlilik kazanmamıza, eski kalıpları kırmamıza, orijinal fikirler üretmemize ve belirsiz zamanlarda sebatla hareket etmemize yardımcı olur.",
        subtitle: "Değişimi Mümkün Kılma",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "İç Pusula",
        description: "Bütünlüğün iyiliğine ilişkin değerlere ve amaçlara karşı derinden hissedilen sorumluluk ve bağlılık duygusuna sahip olmak.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Doğruluk ve Güvenilirlik",
        description: "İçtenlik, dürüstlük ve doğrulukla hareket etme taahhüdü ve yeteneği.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Açıklık ve Öğrenme Alışkanlıkları",
        description: "Temel bir merak zihniyetine sahip olmak, değişimi ve büyümeyi kucaklamaya istekli olmak.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Öz Farkındalık",
        description: "Kendi düşünceleri, duyguları ve arzuları ile yansıtıcı temas halinde olma yeteneği ve gerçekçi bir benlik imajı ile kendini düzenleme becerisine sahip olmak.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Hazır Bulunuşluk",
        description: "Yargılamadan ve açık bir mevcudiyet halinde, anda ve burada olma becerisi.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Eleştirel Düşünme",
        description: "Görüşlerin, bilimsel kanıtların ve yapılması planlanan çalışmaların geçerliliğini eleştirel bir şekilde analiz etme becerileri.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Karmaşıklık Farkındalığı",
        description: "Karmaşık, sistematik koşullar ve nedenselliklerle çalışma anlayışı ve becerileri.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Bakış Açısı Becerileri",
        description: "Zıt bakış açılarından gelen içgörüleri arama, anlama ve aktif olarak kullanma becerileri.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Anlam Oluşturma",
        description: "Kalıpları görme, bilinmeyeni yapılandırma ve bilinçli olarak hikayeler oluşturabilme becerileri.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Uzun Süreli Uyum ve Vizyon Geliştirme",
        description: "Daha geniş bir çerçevede ilgili öngörülere bağlılığı açık / net ifade etmek ve sürdürebilmek için gereken uzun süreli yönelim ve yetenek.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Takdir",
        description: "Başkalarıyla ve dünyayla temel bir anlayışla; takdir, şükran ve mutlulukla ilişki kurmak.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Bağlanmışlık",
        description: "Bir toplulukla, insanlık veya küresel ekosistem gibi daha büyük bir bütünle bağlantılı olma ve /veya onun bir parçası olma konusunda keskin bir duyuya sahip olmak.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Alçakgönüllülük",
        description: "Kişinin kendinden ziyade durumun gereklerine uygun hareket edebilmesi.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Empati ve Şefkat",
        description: "Başkalarıyla, kendisiyle ve doğayla; nezaket, empati ve şefkatle ilişki kurma ve ilgili sıkıntıları ele alma becerisi.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "İletişim Becerileri",
        description: "Başkalarını dikkatle dinleyebilme, etkin diyaloğa teşvik edebilme, kendi görüşlerini ustalıkla savunabilme, çatışmaları yapıcı bir şekilde yönetebilme ve iletişimi farklı gruplara uyarlayabilme becerisi.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Birlikte Geliştirme Becerileri",
        description: "Farklı paydaşlarla, psikolojik güvenlik ve ortak yaratım ile nitelendirilen işbirliğine dayalı ilişkiler kurma, geliştirme, kolaylaştırma becerileri ve motivasyonu.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Kapsayıcı Zihniyet ve Kültürlerarası Yeterlilik",
        description: "Çeşitliliği benimseme ve farklı görüş ve geçmişlere sahip insanları ve toplulukları dahil etme konusunda isteklilik ve yetkinlik.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Güven",
        description: "Güven duyma, güvene dayalı ilişkiler kurma ve sürdürme becerisi.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Harekete Geçme Becerileri",
        description: "Ortak amaçlar doğrultusunda başkalarına ilham verme ve onları harekete geçirme becerisi.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Cesaret",
        description: "Değerleri savunabilme, kararlar alabilme, kararlı bir şekilde harekete geçebilme ve gerekirse mevcut yapılara ve görüşlere meydan okuyabilme ve bunları bozabilme becerisi.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Yaratıcılık",
        description: "Orijinal fikirler üretme ve geliştirme, yenilik yapma ve geleneksel kalıpları yıkmaya istekli olma becerisi.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "İyimserlik",
        description: "Umut duygusunu sürdürme ve iletme becerisi, anlamlı değişim olasılığına ilişkin tutum ve güven.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Azim",
        description: "Çabaların meyve vermesinin uzun zaman aldığı durumlarda bile bağlılığı sürdürme, kararlı kalma ve sabırlı olma becerisi.",
        dimension: "da4"
      }
    ]
  },
  wo: {
    dimensions: [
      {
        id: "da0",
        name: "Nekk",
        description: "Yar sunu dundug biir, gën a yokk ak gën axóotal sunu diggante ak sunuy xalaat,sunuy yëg-yëg ak sunuy yaram, ndax ñuam dal te bañ a yëngu bu nuy jànkoonteak jafe-jafe.",
        subtitle: "Sunu diggante ak sunubopp",
        skills: ["sa0", "sa1", "sa2", "sa3", "sa4"]
      },
      {
        id: "da1",
        name: "Xalaat",
        description: "Mën a xalaat ci wàll yu wuute, jàngatxibaar yi, ak xam ni àdduna bi lëkkaloo, luam solo la ngir jël dogal yu baax.",
        subtitle: "Am xel",
        skills: ["sa5", "sa6", "sa7", "sa8", "sa9"]
      },
      {
        id: "da2",
        name: "Jëflante",
        description: "Joxe cër, toppatoo ba noppi yëg ni dañujaxasoo ak ñeneen ñi – ci misaal, sunuydëkkandoo ak dund ci kaw suuf, te dibàyyiwaale xel ëllëg – dafa nuy jàppale nusos ay nekkin ak askan wu gën a jub tesax ci njub googu.",
        subtitle: "Toppatoo ñeneen ñi akàdduna bi",
        skills: ["sb0", "sb1", "sb2", "sb3"]
      },
      {
        id: "da3",
        name: "Jëlante",
        description: "Ngir nu mën a jëm kanam ci mbir yi ñubokk, fàww nu gën a liggeey ci nu ñuymënee boole ay nit ñu wuute gëm-gëm,xam-xam ak mën-mën, waaye itam ci nuñu leen di joxee seen cër tey waxtaan akñoom.",
        subtitle: "Mën a jëlante ak askan wi",
        skills: ["sb4", "sb5", "sb6", "sb7", "sb8"]
      },
      {
        id: "da4",
        name: "Jëf",
        description: "Jikko yu mel ni fit ak rafet njort dañu nuyjàppale ci gàlloo sunuy wareef, bañ awékku ci li ñu weesu, sos xalaat yu beesak bañ a xàddi bu ñu nekkee ci jaaxle.",
        subtitle: "Indi coppite",
        skills: ["sb9", "sc0", "sc1", "sc2"]
      }
    ],
    skills: [
      {
        id: "sa0",
        name: "Yëg ak déglu sa bopp",
        description: "Yëg bu baax ni danu am wareef, topp gëm-gëm ak jubluwaay yu jëm ci njariñu ñépp.",
        dimension: "da0"
      },
      {
        id: "sa1",
        name: "Njub ak dëggu",
        description: "Fas yéene jaar ci yoonu njub ak wu dëgg.",
        dimension: "da0"
      },
      {
        id: "sa2",
        name: "Ubbiku ak bëgg a jàng",
        description: "Dëñ-kumpa, nangoo néew doole, nangu coppite ak màgg.",
        dimension: "da0"
      },
      {
        id: "sa3",
        name: "Xam sa bopp",
        description: "Mën a seet bu baax say xalaat, say yëg-yëg ak say bëgg-bëggi bopp ; am gis-gis bu dëggu ci sa bopp, ak mën a yemale sa bopp.",
        dimension: "da0"
      },
      {
        id: "sa4",
        name: "Teewlu",
        description: "Teewlu saa su nekk ak fépp, rafet njort ci sa bopp, yaatu.",
        dimension: "da0"
      },
      {
        id: "sa5",
        name: "Xalaat bu xóot",
        description: "Mën a settantal bu baax wérug xalaat yi, firnde yi ak naal yi.",
        dimension: "da1"
      },
      {
        id: "sa6",
        name: "Xam jafe-jafe yi",
        description: "Xam anam ak sabab yu lëj te naqaree xam, boole ci lalu fépp, ba noppi di gën a xarañ ci liggeey bi.",
        dimension: "da1"
      },
      {
        id: "sa7",
        name: "Mën a xool mbir",
        description: "Mën a gëstu, mën a nànd ak jëfandikoo ay leeral ci anam yu wuute.",
        dimension: "da1"
      },
      {
        id: "sa8",
        name: "Def lu am solo",
        description: "Mën a ràññee tëralin yi, mën a tëral lu ñu xamagul ak sos ay jaar-jaar ci xel mu dal.",
        dimension: "da1"
      },
      {
        id: "sa9",
        name: "Gis lu sore lu ñëwagul",
        description: "Jublu ci gis lu sore lu ñëwagul ak mën a tabax ak saxook ab pas-pas bu jëm ci gis-gis yu lëkkaloo ak anam bu gën a yaatu.",
        dimension: "da1"
      },
      {
        id: "sb0",
        name: "Cër",
        description: "Jokkoo, duggante ak ñeneen ñi ci wegante, sant ak mbégte.",
        dimension: "da2"
      },
      {
        id: "sb1",
        name: "Jaxasoo",
        description: "Xam bu baax sunug booloo ak sunu bokk ci lu gën a yaatu – muy mbooloo, doomi aadama yépp wala àdduna.",
        dimension: "da2"
      },
      {
        id: "sb2",
        name: "Woyof",
        description: "Mën a def lu méngoo ak tolluwaayu jamono ji te doo ci boole rëy wala jiital say soxlay bopp rekk.",
        dimension: "da2"
      },
      {
        id: "sb3",
        name: "Xolu yërmaande",
        description: "Mën a jëflante ak sa bopp, ak ñeneen ñi ak càkkeef gi ci mbaax, xolu yërmaande, ak mën a faj bépp mettit wala tiis.",
        dimension: "da2"
      },
      {
        id: "sb4",
        name: "Mën-mëni jokkoo",
        description: "Mën a déglu bu baax ñeneen ñi, ñaax nit ñi ñu waxtaan bu baax, mën a sàmm say gis-gis bu baax, mën a saafara ŋaayoo yi bu baax, ak wax ak kenn ku nekk ca na mu tollu.",
        dimension: "da3"
      },
      {
        id: "sb5",
        name: "Mën a bokk sos am mbir",
        description: "Xam-xam ak pasteef ngir gën a suqali ak yombal liggeeyandoo ak ñeneen, boole ci sóoraale kaaraangeg xel ak sos lu dëggu.",
        dimension: "da3"
      },
      {
        id: "sb6",
        name: "Mën a boole ñépp ak boole ay cosaan ak aada",
        description: "Bëgg ak mën a boole nit ak kureel yu seeni cosaan ak xalaat wuute.",
        dimension: "da3"
      },
      {
        id: "sb7",
        name: "Kóolute",
        description: "Mën a wone kóolute ak wóolu ñeneen ñi, sos ak mën a saxal diggante yu kóolute lal.",
        dimension: "da3"
      },
      {
        id: "sb8",
        name: "Mën a dajale",
        description: "Xelal ak dajale ñeneen ñi ngir ñu yebu ci jëmu yi ñépp bokk.",
        dimension: "da3"
      },
      {
        id: "sb9",
        name: "Fit",
        description: "Xeex ngir ay gëm-gëm, mën a jël ay matuwaay yu takku, te su ko jaree, fexe xeex ak doxalin ak xalaat yu fi nekkoon bu yàgg ba léegi.",
        dimension: "da4"
      },
      {
        id: "sc0",
        name: "Sos lu bees",
        description: "Mën a sos ak gën a xelli ay xalaat yu bees, ak mën a def leneen lu wuute ak li ñu miin.",
        dimension: "da4"
      },
      {
        id: "sc1",
        name: "Rafet njort",
        description: "Mën a tëye ak yaakaarloo, gis-gis bu rafet, ak gëm bu baax ne coppite yu am solo mën nañu am.",
        dimension: "da4"
      },
      {
        id: "sc2",
        name: "Bañ a xàddi",
        description: "Mën a wéy di def sa liggeey, ba noppi nekk ku am pasteef te mën a muñ njariñ li war a tukkee ci li ñu liggeey, ak lu mu yàgg yàgg nag.",
        dimension: "da4"
      }
    ]
  }
}, i2 = {
  da0: [
    "m191.95,99.26c0,51.18-31.36,92.67-92.67,92.67-51.18,0-89.23-41.61-92.67-92.67C3.69,55.9,48.17,4,99.28,6.59c57.68,2.92,92.67,41.49,92.67,92.67Z"
  ],
  sa0: [
    "m138.36,58.78c-8.14-13.24-22.39-22.1-39.05-22.1s-31.98,9.33-40.04,23.16c-13.88,8-23.25,22.98-23.25,40.12,0,12.19,3.31,23.31,10.28,31.37,3.94,4.55,8.94,8.15,14.52,10.68,8.22,12.78,22.21,21.26,38.51,21.26,17.25,0,32.45-9.62,40.41-23.81,13.67-8.05,22.88-22.52,22.88-39.51,0-8.29-3.84-18.13-7.72-24.9-4.13-7.22-9.73-12.68-16.54-16.28Zm-39.05-19.73c15.25.83,27.9,7.64,35.64,18.13-5.54-2.3-11.77-3.51-18.62-3.51-6.37,0-12.45,1.29-17.98,3.63-4.7-1.83-10.77-3.63-16.04-3.63-6.74,0-13.13,1.46-18.91,4.06,7.96-11.29,21.08-18.68,35.91-18.68Zm29.3,60.94h0s0,0,0,0h0Zm-1.48-.14c-.45,8.26-2.76,15.77-6.48,22.16-6.33,3.52-13.6,5.37-21.33,4.88-8.62-.55-16.21-2.77-22.57-6.33-.55-1.21-1.07-2.42-1.55-3.61-2.13-5.23-3.16-10.97-2.78-16.98.54-8.52,2.72-16.05,6.21-22.36,6.18-3.3,13.23-5.01,20.71-4.54,8.53.54,16.07,2.73,22.38,6.23,3.42,6.16,5.4,13.15,5.4,20.56Zm-42.22,33.35c-.5-.49-.98-1.01-1.44-1.55l1.44,1.55Zm-8.96-55.8c-4.28,2.38-7.79,5.06-9.85,7.45-4.42,5.1-5.99,6.18-8.11,10.24-.23.45-.44.91-.65,1.36-1.26-4.2-1.93-8.72-1.93-13.48,0-8.49,2.43-16.43,6.62-23.16,5.98-3.11,12.85-4.74,20.3-4.55,4.98.12,9.84,1.1,14.41,2.78-8.78,4.13-16.06,10.93-20.79,19.36Zm-.8,45.02c.62,1.02,1.29,2,2.04,2.92,2.65,3.26,5.7,7.48,9.47,10.55,2.83,2.31,5.96,4.3,9.3,5.92-4.28,1.34-8.85,2.06-13.62,2.06-7.63,0-14.97-1.97-21.39-5.41-3.53-6.27-5.5-13.56-5.5-21.48,0-4.8.79-9.47,2.22-13.88,3.87,7.99,9.98,14.69,17.5,19.32Zm33.4,15.28c3.55-2.43,6.26-5.13,9.49-8.6,1.64-1.77,3.09-3.7,4.35-5.76,2.59-1.49,5.06-3.22,7.46-5.2,4.33-3.57,7.81-7.84,10.14-11.97.49-.86.94-1.74,1.37-2.64,1.26,4.2,1.92,8.7,1.92,13.45,0,7.81-2.06,15.15-5.65,21.51-6.23,3.46-13.44,5.38-21.27,5.38-6.67,0-9.32.59-15.6-1.84,2.75-1.22,5.36-2.67,7.8-4.34Zm30.48-44.54c-2.33-3.86-5.8-6.89-8.72-9.8-2.47-2.46-5.25-4.62-8.27-6.42-.18-.3-.35-.6-.53-.9-3.6-5.89-10.82-12.23-15.7-15.26-.74-.46-2.38-1.32-4.58-2.28,4.66-1.6,9.73-2.45,15.11-2.45,7.81,0,15.15,2.06,21.51,5.65,3.46,6.23,5.38,13.44,5.38,21.27,0,4.8-.79,9.47-2.22,13.88-.61-1.26-1.28-2.5-2-3.69Zm-100.62,6.8c1.06-16.68,8.39-30.09,19.58-37.73-3.16,6.24-4.95,13.28-4.95,20.73,0,5.78,1.08,11.32,3.02,16.43-2.13,5.47-3.21,11.41-2.99,17.59.25,7.02,1.94,13.69,4.79,19.66-12.25-7.87-20.41-21.39-19.44-36.68Zm60.94,60.94c-14.95-.81-27.39-7.39-35.18-17.53,5.72,2.08,11.92,3.1,18.15,2.88,5.68-.2,11.13-1.35,16.17-3.29,5.56,2.29,11.63,3.5,17.85,3.29,6.9-.24,13.46-1.89,19.35-4.64-7.91,11.64-21.25,19.29-36.35,19.29Zm42.13-24.84c2.66-5.82,4.16-12.28,4.16-19.08,0-5.78-1.07-11.31-3.01-16.42,2.13-5.47,3.2-11.42,2.99-17.6-.24-6.91-1.89-13.46-4.64-19.35,11.64,7.91,19.29,21.25,19.29,36.35-.84,15.56-7.93,28.4-18.78,36.1ZM99.24,6.54C45.46,6.54,6.57,48.03,6.57,99.21c-1.72,48.44,38.89,90.67,92.67,92.67,55.65,0,92.67-41.49,92.67-92.67,0-53.78-41.49-92.67-92.67-92.67Zm62.13,154.8c-16.59,16.59-38.66,25.73-62.13,25.73s-45.53-9.14-62.13-25.73c-16.59-16.59-26.47-45.07-25.73-62.13-.04-28.4,9.14-45.53,25.73-62.13,16.59-16.59,38.66-25.73,62.13-25.73,31.25,1.49,45.53,9.14,62.13,25.73,16.59,16.59,25.73,38.66,25.73,62.13-.45,23.71-8.69,48.03-25.73,62.13Z"
  ],
  sa1: [
    "m98.93,110.05c-6.04,0-10.94-4.9-10.94-10.94s5.98-10.94,10.94-10.94c6.04,0,11.59,4.78,10.94,10.94-.63,6.01-4.9,10.94-10.94,10.94Zm34.78-11.1c-.67-18.97-15.44-34.43-34.43-34.43-18.86,0-34.43,15.44-34.43,34.43s15.44,34.43,34.43,34.43c20.23,0,35.08-15.89,34.43-34.43Zm-2.33,0c0,17.7-14.44,33.22-32.1,32.1-19.65-1.25-32.1-14.4-32.1-32.1s14.4-32.1,32.1-32.1c18.73,1.02,32.1,14.4,32.1,32.1Zm29.76.26c2.4-34.01-31.11-61.83-61.83-61.83-34.09,0-61.83,31.71-61.83,61.83,0,34.09,27.74,61.83,61.83,61.83,30.99,0,59.12-23.5,61.83-61.83Zm-6.21,0c0,30.67-24.96,54.7-55.62,55.62-35.13,1.05-55.62-24.95-55.62-55.62s28.64-55.62,55.62-55.62c30.67,0,55.62,24.95,55.62,55.62ZM99.24,15.34c-22.4,0-43.46,8.72-59.3,24.56-15.84,15.84-24.6,32.19-24.56,59.3-.7,16.28,8.72,43.46,24.56,59.3,15.84,15.84,36.9,24.56,59.3,24.56s43.46-8.72,59.3-24.56c16.27-13.45,24.14-36.67,24.56-59.3,0-22.4-8.72-43.46-24.56-59.3-15.84-15.84-29.47-23.14-59.3-24.56m0-8.8c51.18,0,92.66,38.88,92.66,92.66s-37.02,92.66-92.66,92.66c-53.78-2-94.38-44.23-92.66-92.66C6.57,48.03,45.46,6.54,99.24,6.54h0Z"
  ],
  sa2: [
    "m170.16,99.76c0,1.87-1.87,3.38-3.38,3.38s-2.84-1.05-3.24-2.47c-8.34.04-30.59.12-48.09.12-.21,1.31-.52,2.58-.95,3.79l19.7,8.16c.92-.93,2.36-1.21,3.74-.83,1.59.44,2.59,2.71,1.83,4.41-.77,1.72-2.86,2.54-4.41,1.83-1.35-.62-2.15-1.96-2.06-3.35l-19.69-8.16c-.66,1.36-1.47,2.61-2.41,3.73l33.58,34.74c1.31-.65,2.97-.5,3.88.69.95,1.25,1.27,3.48-.07,4.78-1.34,1.3-3.38,1.16-4.78-.07-1.25-1.11-1.32-2.57-.68-3.77-5.5-5.81-20.43-21.59-33.21-35-1,.95-2.1,1.77-3.31,2.42,4.7,10.19,11.07,24.31,13.72,30.19,1.4-.12,2.78.68,3.45,1.96.86,1.65,0,3.7-1.71,4.46-1.7.76-3.68-.62-4.46-1.71-.87-1.22-.33-2.84.79-3.84l-13.48-30.28c-1.37.53-2.84.88-4.4.99,0,19.99-.08,46.7-.09,50.58,1.29.52,2.31,1.6,2.31,3.08s-1.51,3.38-3.38,3.38c-1.58,0-3.38-1.51-3.38-3.38,0-1.3.96-2.81,2.27-3.26-.02-4.46-.12-30.71-.12-50.4-1.54-.11-3.02-.44-4.41-.95-3.25,7.68-6.35,15.51-7.88,19.41,1.02,1.01,1.24,2.8,1.03,3.85-.37,1.83-2.69,2.54-4.41,1.83-1.72-.71-2.59-3.11-1.83-4.41.71-1.22,1.88-2.04,3.16-2.07,1.68-4.08,4.94-11.97,8.06-19.44-1.33-.69-2.55-1.56-3.64-2.58-11.88,11.42-30.22,29.24-37.06,35.9.68,1.34.42,3.11-.59,4.01-1.78,1.57-3.48,1.27-4.78-.07-1.3-1.34-1.39-3.62.07-4.78,1.03-.81,2.57-1.12,3.82-.58,6.47-6.28,24.58-23.82,37.3-35.78-1.27-1.48-2.27-3.19-2.94-5.06l-31.96,12.56c.11,1.46-.77,2.85-2.21,3.46-2.11.89-3.69-.28-4.32-2.04s.26-3.74,2.04-4.32c1.94-.64,3.03-.18,3.71.81l32.23-12.19c-.23-.97-.37-1.96-.43-2.99-14.32-.06-39.17.06-47.86.11-.3,1.44-1.36,2.5-3.28,2.5s-3.38-1.51-3.38-3.38,2.22-3.38,3.38-3.38c1.4,0,2.6.85,3.11,2.07,9.02.04,33.24.15,48.04.35.1-1.53.45-3,1-4.38l-19.76-8.18c-.91.96-2.37,1.2-3.81.91-1.37-.27-2.54-2.69-1.83-4.41.71-1.72,2.65-2.43,4.41-1.83.91.31,1.93,1.77,2.01,3.21l19.96,8.27c.72-1.26,1.6-2.42,2.6-3.46-6.14-5.96-27.43-27.92-34.33-35.05-1.07.48-2.26.23-3.71-.82-1.51-1.09-1.35-3.57.07-4.78,1.88-1.6,3.18-.9,4.78.07,1.32.8,1.31,2.68.49,4.04,7.29,7.9,29.4,30.34,34.16,35.16.82-.69,1.69-1.31,2.59-1.85-3.79-8.05-11.56-25.42-14.38-32.22-1.15.08-2.16-.56-3.2-2.05-1.07-1.53,0-3.7,1.71-4.46,1.7-.76,3.71.36,4.46,1.71.74,1.34.25,2.95-.88,3.91,2.6,6.11,8.63,20.21,13.86,32.26,1.66-.78,3.39-1.26,5.06-1.4.05-14.75-.06-39.33-.1-48.07-1.28-.53-2.29-1.6-2.29-3.07s1.51-3.38,3.38-3.38c1.58,0,3.38,1.51,3.38,3.38,0,1.32-.99,2.85-2.32,3.27-.03,8.97-.11,33.48-.08,47.86,1.47.09,2.9.35,4.27.79,3.04-7.42,6.2-15.47,7.84-19.68-1-.93-1.38-2.42-.83-3.76.71-1.72,2.09-2.94,4.41-1.83,1.68.81,2.54,2.69,1.83,4.41-.58,1.39-1.97,2.17-3.39,2.06-1.73,4.24-4.87,11.93-7.99,19.52,1.71.77,3.28,1.8,4.62,3.05,9.88-9.7,22.74-22.78,27.65-27.78-.54-1.31-.17-2.97.65-3.86,1.26-1.37,3.48-1.27,4.78.07s1.53,3.82-.07,4.78c-1.09.65-2.73,1.07-4.01.46-4.77,4.64-17.74,17.26-28.1,27.26.83.91,1.55,1.91,2.13,2.99l26.8-10.14c.16-1.25,1.15-2.35,2.18-3.04,1.55-1.04,3.69.28,4.32,2.04.63,1.76-.18,4.17-2.04,4.32-2.01.16-3.16-.13-3.86-1.14l-26.63,9.75c.62,1.71.89,3.56.75,5.51,17.59-.14,40.34-.58,48.02-.73.51-1.23,1.72-2.11,3.12-2.11,1.87,0,3.38,1.51,3.38,3.38Zm21.5-.55c0,51.18-37.02,92.67-92.67,92.67-53.78-2-94.39-44.23-92.67-92.67C6.32,48.03,45.21,6.54,98.99,6.54s92.67,38.89,92.67,92.67Zm-4.81,0c0-23.47-9.14-45.53-25.73-62.13-16.59-16.59-30.87-24.25-62.13-25.73-23.47,0-45.53,9.14-62.13,25.73-16.59,16.59-25.77,33.72-25.73,62.13-.73,17.05,9.14,45.53,25.73,62.13,16.59,16.59,38.66,25.73,62.13,25.73s45.53-9.14,62.13-25.73c17.04-14.09,25.28-38.42,25.73-62.13Z"
  ],
  sa3: [
    "m109.86,99.19c-.62,5.88-4.8,10.71-10.71,10.71s-10.71-4.8-10.71-10.71,5.85-10.71,10.71-10.71c5.92,0,11.35,4.68,10.71,10.71Zm82.05.02c0,51.18-37.02,92.67-92.67,92.67-53.78-2-94.39-44.23-92.67-92.67C6.57,48.03,45.46,6.54,99.24,6.54s92.67,38.89,92.67,92.67Zm-4.81,0c0-23.47-9.14-45.53-25.73-62.13-16.59-16.59-30.87-24.25-62.13-25.73-23.47,0-45.53,9.14-62.13,25.73-16.59,16.59-25.77,33.72-25.73,62.13-.73,17.05,9.14,45.53,25.73,62.13,16.59,16.59,38.66,25.73,62.13,25.73s45.53-9.14,62.13-25.73c17.04-14.09,25.29-38.42,25.73-62.13Zm-87.93-27.24c3.14,0,5.69-2.55,5.69-5.69s-2.56-5.36-5.69-5.69c-3.2-.34-5.69,2.55-5.69,5.69,0,2.58,2.55,5.69,5.69,5.69Zm.1-19.71c2.15.23,3.82-1.71,3.82-3.82,0-1.73-1.71-3.82-3.82-3.82s-3.82,1.71-3.82,3.82,1.72,3.6,3.82,3.82Zm-.18-15.26c1.48.22,2.7-1.38,2.7-2.7,0-1.49-1.44-2.7-2.7-2.7-1.49,0-2.7,1.48-2.7,2.7,0,1.49,1.3,2.49,2.7,2.7Zm.07,89.35c-3.14,0-5.69,3.11-5.69,5.69,0,3.14,2.49,6.02,5.69,5.69,3.12-.33,5.69-2.55,5.69-5.69s-2.55-5.69-5.69-5.69Zm.1,19.71c-2.1.22-3.82,1.71-3.82,3.82s1.71,3.82,3.82,3.82,3.82-2.09,3.82-3.82c0-2.11-1.67-4.05-3.82-3.82Zm-.18,15.26c-1.4.21-2.7,1.21-2.7,2.7,0,1.22,1.21,2.7,2.7,2.7,1.26,0,2.7-1.21,2.7-2.7,0-1.32-1.23-2.93-2.7-2.7Zm-27.19-89.43c-2.5,2.03-2.22,5.82,0,8.04,1.82,1.82,5.82,2.22,8.04,0,2.22-2.22,2.22-5.82,0-8.04-2.22-2.22-5.6-1.98-8.04,0Zm-5.82-5.97c1.68-1.36,1.49-3.91,0-5.4-1.22-1.22-3.91-1.49-5.4,0-1.49,1.49-1.49,3.91,0,5.4,1.49,1.49,3.76,1.33,5.4,0Zm-10.92-10.67c1.2-.88.93-2.89,0-3.82-1.06-1.06-2.93-.89-3.82,0-1.06,1.06-.86,2.96,0,3.82,1.06,1.06,2.68.84,3.82,0Zm63.23,63.13c-2.22,2.22-1.82,6.22,0,8.04,2.22,2.22,6.02,2.5,8.04,0,1.98-2.44,2.22-5.82,0-8.04-2.22-2.22-5.82-2.22-8.04,0Zm14.01,13.86c-1.33,1.64-1.49,3.91,0,5.4,1.49,1.49,3.91,1.49,5.4,0,1.49-1.49,1.22-4.18,0-5.4-1.49-1.49-4.04-1.68-5.4,0Zm10.67,10.92c-.84,1.14-1.06,2.77,0,3.82.86.86,2.77,1.06,3.82,0,.89-.89,1.06-2.77,0-3.82-.93-.93-2.94-1.2-3.82,0Zm-76.78-49.69c-3.14,0-5.36,2.56-5.69,5.69-.34,3.2,2.55,5.69,5.69,5.69,2.58,0,5.69-2.55,5.69-5.69s-2.55-5.69-5.69-5.69Zm-14.02,5.58c.23-2.15-1.71-3.82-3.82-3.82-1.73,0-3.82,1.71-3.82,3.82s1.71,3.82,3.82,3.82,3.6-1.72,3.82-3.82Zm-17.97-2.52c-1.49,0-2.7,1.44-2.7,2.7,0,1.49,1.48,2.7,2.7,2.7,1.49,0,2.49-1.3,2.7-2.7.22-1.48-1.38-2.7-2.7-2.7Zm103.43,2.63c-.33-3.12-2.55-5.69-5.69-5.69s-5.69,2.55-5.69,5.69,3.11,5.69,5.69,5.69c3.14,0,6.03-2.49,5.69-5.69Zm12.15-3.92c-2.11,0-4.05,1.67-3.82,3.82.22,2.1,1.71,3.82,3.82,3.82s3.82-1.71,3.82-3.82-2.09-3.82-3.82-3.82Zm14.15,1.3c-1.32,0-2.93,1.23-2.7,2.7.21,1.4,1.21,2.7,2.7,2.7,1.22,0,2.7-1.21,2.7-2.7,0-1.26-1.21-2.7-2.7-2.7Zm-92.13,21.85c-2.22,2.22-1.98,5.6,0,8.04,2.03,2.5,5.82,2.22,8.04,0,1.82-1.82,2.22-5.82,0-8.04-2.22-2.22-5.82-2.22-8.04,0Zm-11.37,13.86c-1.22,1.22-1.49,3.91,0,5.4,1.49,1.49,3.91,1.49,5.4,0,1.49-1.49,1.33-3.76,0-5.4-1.36-1.68-3.91-1.49-5.4,0Zm-9.09,10.92c-1.06,1.06-.89,2.93,0,3.82,1.06,1.06,2.96.86,3.82,0,1.06-1.06.84-2.68,0-3.82-.88-1.2-2.89-.93-3.82,0Zm74.99-63.23c2.22-2.22,2.5-6.02,0-8.04-2.44-1.98-5.82-2.22-8.04,0-2.22,2.22-2.22,5.82,0,8.04,2.22,2.22,6.22,1.82,8.04,0Zm11.22-14.01c1.49-1.49,1.49-3.91,0-5.4s-4.18-1.22-5.4,0c-1.49,1.49-1.68,4.04,0,5.4,1.64,1.33,3.91,1.49,5.4,0Zm5.52-10.67c1.14.84,2.77,1.06,3.82,0,.86-.86,1.06-2.77,0-3.82-.89-.89-2.77-1.06-3.82,0-.93.93-1.2,2.94,0,3.82Z"
  ],
  sa4: [
    "m121.76,99.21c-1.3,12.37-10.08,22.52-22.52,22.52s-22.52-10.08-22.52-22.52,12.31-22.52,22.52-22.52c12.44,0,23.86,9.85,22.52,22.52Zm-22.52,75.61c-41.69,0-75.61-33.92-75.61-75.61S57.83,23.61,99.24,23.61s74.14,33.94,75.61,75.61c1.43,40.72-31.18,75.61-75.61,75.61Zm72.57-75.61c0-40.02-30.22-70.28-72.57-72.57-40.02,0-72.57,32.56-72.57,72.57s28.14,69.76,72.57,72.57c39.94,2.53,72.57-32.56,72.57-72.57Zm-11.95,0c-2.66,37.58-30.24,60.63-60.63,60.63-33.43,0-60.63-27.2-60.63-60.63,0-29.53,27.2-60.63,60.63-60.63,30.12,0,62.98,27.28,60.63,60.63Zm-6.09,0c0-30.07-24.47-54.54-54.54-54.54-26.46,0-54.54,24.47-54.54,54.54s20.09,55.57,54.54,54.54c30.06-.9,54.54-24.47,54.54-54.54Zm-11.99-.02c0,23.46-19.09,41.45-42.55,41.45-18.74,1.37-42.55-17.99-42.55-41.45s15.19-40.73,42.55-42.55c23.41-1.56,42.55,19.09,42.55,42.55Zm-8.58.02c0-18.73-11.34-33.97-33.97-33.97-18.73,0-33.97,15.24-33.97,33.97s15.26,34.83,33.97,33.97c22.63-1.04,33.97-15.24,33.97-33.97Zm58.7,0c0,51.18-37.02,92.67-92.67,92.67-53.78-2-94.39-44.23-92.67-92.67C6.57,48.03,45.46,6.54,99.24,6.54s92.67,38.89,92.67,92.67ZM131.74,13.94c-8.77-3.03-19.13-4.76-32.5-5.39-24.22,0-46.99,9.43-64.11,26.56-17.13,17.12-26.6,34.8-26.56,64.11-.76,17.6,9.43,46.99,26.56,64.11,17.12,17.12,39.89,26.56,64.11,26.56s46.99-9.43,64.11-26.56c17.59-14.55,26.09-39.65,26.56-64.11,0-24.22-9.43-46.99-26.56-64.11-10.02-10.02-19.23-16.89-31.61-21.16"
  ],
  da1: [
    "m167.33,33.15s11.32,24.24,13.32,28.88c4.35,10.12,13.44,35.77,13.44,35.77.38.92.38,1.95,0,2.87,0,0-10.73,27-12.55,31.86-2.99,7.98-14.24,32.78-14.24,32.78-.38.92-1.11,1.65-2.03,2.03,0,0-20.32,8.1-30.51,12.97-7.59,3.63-34.14,13.79-34.14,13.79-.92.38-1.95.38-2.87,0,0,0-18.53-6.25-32.5-12.68-13.63-6.27-32.14-14.11-32.14-14.11-.92-.38-1.65-1.11-2.03-2.03,0,0-7.28-15.42-13.06-30.19-5.51-14.11-13.7-34.45-13.7-34.45-.38-.92-.38-1.95,0-2.87,0,0,11.2-28.93,14.03-35.62,2.51-5.92,12.76-29.02,12.76-29.02.38-.92,1.11-1.65,2.03-2.03,0,0,26.48-12.44,30.77-13.96,7.21-2.55,33.87-12.8,33.87-12.8.92-.38,1.95-.38,2.87,0,0,0,29.58,11.09,33.76,12.8,12.18,4.99,30.88,13.99,30.88,13.99.92.38,1.65,1.11,2.03,2.03Z"
  ],
  sa5: [
    "m194.09,97.8s-10.93-24.15-14.88-34.43c-5.54-14.41-11.88-30.22-11.88-30.22-.38-.92-1.11-1.65-2.03-2.03,0,0-18.69-9-30.88-13.99-4.18-1.71-33.76-12.8-33.76-12.8-.92-.38-1.95-.38-2.87,0,0,0-16.14,6.72-33.65,13.59-4.24,1.66-31,13.17-31,13.17-.92.38-1.65,1.11-2.03,2.03,0,0-10.24,23.1-12.76,29.02-2.84,6.69-14.03,35.62-14.03,35.62-.38.92-.38,1.95,0,2.87,0,0,8.19,20.35,13.7,34.45,5.78,14.78,13.06,30.19,13.06,30.19.38.92,1.11,1.65,2.03,2.03,0,0,18.51,7.84,32.14,14.11,13.97,6.43,32.5,12.68,32.5,12.68.92.38,1.95.38,2.87,0,26.52-11.81,25.99-11.57,33.58-14.77,14.19-5.99,31.07-11.99,31.07-11.99.92-.38,1.65-1.11,2.03-2.03,0,0,11.24-24.8,14.24-32.78,1.83-4.86,12.55-31.86,12.55-31.86.38-.92.38-1.95,0-2.87Zm-6.57,2.82s-10.68,24.62-12.38,29.15c-2.79,7.43-12.55,31.02-12.55,31.02-.35.85-1.03,1.53-1.89,1.89,0,0-18.91,7.54-28.4,12.08-7.07,3.38-31.77,12.83-31.77,12.83-.85.35-1.81.35-2.67,0,0,0-17.25-5.82-30.25-11.8-12.69-5.84-29.91-13.14-29.91-13.14-.85-.35-1.53-1.03-1.89-1.89,0,0-6.57-14.65-11.95-28.41-5.13-13.13-12.96-31.77-12.96-31.77-.35-.85-.35-1.81,0-2.67,0,0,11.12-26.59,13.77-32.82,2.34-5.51,11.17-27.35,11.17-27.35.35-.85,1.03-1.53,1.89-1.89,0,0,24.65-11.58,28.64-12.99,6.71-2.37,31.53-11.92,31.53-11.92.85-.35,1.81-.35,2.67,0,0,0,26.65,10.94,30.54,12.53,11.34,4.64,29.62,12.41,29.62,12.41.85.35,1.53,1.03,1.89,1.89,0,0,9.86,22.67,11.72,26.99,4.05,9.42,13.19,33.18,13.19,33.18.35.85.35,1.81,0,2.67Zm-92.24-33.41c.36.1,9.87,4.93,13.6,6.96,3.73,2.04,13.53,8.96,13.53,8.96.44.25.71.72.71,1.23,0,0,.21,10.64.39,15.97.22,6.43-.39,15.31-.39,15.31,0,.51-.27.97-.71,1.23,0,0-7.47,4.62-14.08,8.41-4.06,2.33-13,7.23-13,7.23-.44.25-.98.25-1.42,0,0,0-21.14-11.59-15.4-8.34,5.74,3.25-11.69-7.3-11.69-7.3-.44-.25-.71-.72-.71-1.23,0,0-.72-3.56-.46-14.86.26-11.31.46-16.41.46-16.41,0-.51.27-.97.71-1.23,0,0,7.27-4.7,12.24-7.63s14.87-8,14.99-8.08c.73-.52,1.23-.21,1.23-.21Zm-1.16-4.61c-.17.1-11.74,6.83-17.08,9.95-5.34,3.12-14.21,8.28-14.21,8.28-.44.25-.71.72-.71,1.23,0,0,.17,13.35.1,18.5-.06,5.15-.1,17.4-.1,17.4,0,.51.27.97.71,1.23,0,0,8.49,4.73,14.03,7.76,5.87,3.21,17.06,10.19,17.06,10.19.44.25.98.25,1.42,0,0,0,11.24-6.09,15.59-9,4.35-2.91,15.5-8.95,15.5-8.95.44-.25.71-.72.71-1.23,0,0,.17-12.43.05-16.95-.17-6.62-.05-19.32-.05-18.94,0-.51-.27-.97-.71-1.23,0,0-8.85-5.51-16.24-9.49-7.39-3.98-14.96-8.74-14.96-8.74,0,0-.6-.29-1.1,0Zm27.73-21.43s12.11,10.34,18.5,16.02c5.66,5.03,17.72,15.15,20.4,17.39.34.28.52.7.5,1.14-.16,3.45-.41,19.55-.43,27.06-.02,7.5-1.08,21.11-1.23,24.34-.02.42-.22.8-.56,1.06-3.12,2.36-17.39,13.93-22.6,17.62-5,3.53-16.15,11.22-18.58,13.07-.37.29-.86.37-1.3.22-3.33-1.12-16.25-2.87-25.56-5.09-7.71-1.84-21.29-6.9-24.21-7.89-.36-.12-.66-.38-.82-.73-1.34-2.8-7.58-15.93-10.6-24.02-2.96-7.93-8.73-20.07-10.16-23.04-.2-.43-.18-.91.05-1.32,1.67-2.84,7.07-14.46,10.48-21.93,3.55-7.76,11.63-20.87,13.26-23.66.2-.35.54-.59.93-.67,3-.62,17.77-4.5,25.49-5.82,8.75-1.5,24.8-3.99,25.05-4.05.83-.19,1.39.3,1.39.3Zm1.69-4.85s-.64-.94-2.13-.67c-3.32.62-20.13,3.73-26.88,4.93-6.86,1.22-24.42,4.94-27.92,5.69-.39.08-.73.33-.93.68-1.55,2.7-8.52,14.94-12.99,24.92-4.42,9.87-11.34,22.06-13,24.95-.23.4-.25.88-.05,1.3,1.5,3.17,7.95,16.93,11.32,25.66,3.39,8.79,9.92,22.7,11.36,25.74.18.39.52.66.93.76,3.45.85,19.8,4.91,26.62,7.01s24.22,6.43,27.79,7.31c.41.1.83.02,1.17-.23,2.85-2.09,14.74-11.23,20.47-15.71,5.73-4.47,21.58-15.7,24.6-17.91.36-.26.57-.67.57-1.12.03-3.34.8-17.77.89-26.87.1-9.08.94-25.92.97-29.36,0-.4-.16-.78-.46-1.05-2.79-2.53-17.08-14.01-22.36-18.58-5.51-4.76-19.98-17.46-19.98-17.46Zm-10.72,119.33"
  ],
  sa6: [
    "m194.09,97.8s-10.93-24.15-14.88-34.43c-5.54-14.41-11.88-30.22-11.88-30.22-.38-.92-1.11-1.65-2.03-2.03,0,0-18.69-9-30.88-13.99-4.18-1.71-33.76-12.8-33.76-12.8-.92-.38-1.95-.38-2.87,0,0,0-16.14,6.72-33.65,13.59-4.24,1.66-31,13.17-31,13.17-.92.38-1.65,1.11-2.03,2.03,0,0-10.24,23.1-12.76,29.02-2.84,6.69-14.03,35.62-14.03,35.62-.38.92-.38,1.95,0,2.87,0,0,8.19,20.35,13.7,34.46,5.78,14.78,13.06,30.19,13.06,30.19.38.92,1.11,1.65,2.03,2.03,0,0,18.51,7.84,32.14,14.11,13.97,6.43,32.5,12.68,32.5,12.68.92.38,1.95.38,2.87,0,26.52-11.81,25.99-11.57,33.58-14.77,14.19-5.99,31.07-11.99,31.07-11.99.92-.38,1.65-1.11,2.03-2.03,0,0,11.24-24.8,14.24-32.78,1.83-4.86,12.55-31.86,12.55-31.86.38-.92.38-1.95,0-2.87Zm-19.76-33.03c3.64,8.46,11.38,28.48,12.92,32.47l-23.38,1.96-15.5.41-6.73-8.25-6.41-7.86,2.92-26.89,13.69-10.16,11.02-8.12c1.52,3.48,9.79,22.52,11.48,26.44Zm-93.48,27.62l-18.62-10.45-.21-26.58s8.72-4.39,16.07-9.86c7.36-5.47,18.53-12.38,18.53-12.38l18.53,11.31,19.91,12.15-2.85,26.29s-16.69,6.34-22.67,9.03c-5.97,2.7-18.25,6.35-18.25,6.35l-10.45-5.86Zm8.78,8.45v30.51l-21.52,5.24-16.52,4.02s-8.93-20.37-11.21-24.19c-2.28-3.82-7.8-16.84-7.8-16.84l13.75-7.34,14.36-7.66,18.84,9.76,10.1,6.49Zm2.55,14.65c.73-13.14.51-14.49.51-14.49,0,0,4.89-1.6,18.14-7.33,12.71-5.18,22.3-7.87,22.3-7.87l6.55,8.03,6.42,7.87-.86,14.82-1.2,20.72s-9.21,4.19-16.31,6.79c-7.1,2.6-17.71,5.66-17.71,5.66l-17.33-17.75s-1.24-3.3-.51-16.44Zm8.37-104.53s26.65,10.94,30.54,12.53c11.34,4.64,29.62,12.41,29.62,12.41.06.02.1.06.16.08l-10.29,7.58-13.99,10.38-20.32-12.4-18.12-11.06.37-10.91.35-8.84c.56-.06,1.14.01,1.67.23Zm-34.2,11.92c5.52-1.95,23.3-8.76,29.42-11.11l-.28,6.91-.4,11.79s.05-.03.14-.09c-1.48.95-4.31,2.77-9.4,6.04-16.5,10.6-25.24,16.22-25.24,16.22l-11.62-9.73-9.32-7.95c5.89-2.75,23.39-10.91,26.7-12.08Zm-41.7,42.22c2.34-5.51,11.17-27.35,11.17-27.35.2-.49.52-.91.9-1.25l10.24,8.71,11.98,10.04.21,26.67-13.99,7.47-14.97,7.99s.15.59-9.61.44c-2.8-.04-7.05-.17-9.54-.29,1.36-3.24,11.15-26.64,13.6-32.43Zm-.81,67.25c-5.13-13.13-12.96-31.77-12.96-31.77-.03-.07-.04-.15-.07-.22l10.2.04,8.59.04,8.01,17.29,11.36,24.51-5.57,7.99-7.64,10.47c-.4-.88-6.72-15.04-11.93-28.36Zm43.75,43.43c-11.61-5.34-27-11.9-29.54-12.98l8.37-11.52,5.24-7.53s8.33-1.23,16.95-4.13c8.62-2.9,22.06-5.38,22.06-5.38l17.24,17.66-3.92,14.61-.72,2.66-4.98,18.54c-.15-.04-.3-.08-.45-.14,0,0-17.25-5.82-30.25-11.8Zm64.69-1.03c-7.07,3.38-31.77,12.83-31.77,12.83-.02,0-.04,0-.06.02.25-.09.61-.24,1.11-.43l4.55-19.15,4.78-15.4,17-6.22,17.07-6.25s1.76,2.33,8.64,10.72c4.26,5.19,7.08,9.42,8.06,11.16-.29.26-.62.48-.98.64q-18.49,7.37-28.4,12.08Zm42.84-44.98c-2.38,6.35-9.86,24.5-11.98,29.64l-7.74-10.36-8.33-11.19,1.23-21.17.81-14.06,14.9-.88,23.6-1.5c-.04.13-.06.25-.11.38,0,0-10.68,24.62-12.38,29.15Z"
  ],
  sa7: [
    "m194.3,98.51c-.05-.24-.12-.48-.21-.71,0,0-10.93-24.15-14.88-34.43-5.54-14.41-11.88-30.22-11.88-30.22-.28-.69-.77-1.27-1.38-1.68-.2-.14-.42-.25-.65-.35,0,0-4.67-2.25-10.87-5.12-.77-.36-1.57-.73-2.39-1.1-.82-.38-1.65-.76-2.49-1.14-5.07-2.31-10.56-4.75-15.12-6.62-1.7-.7-7.59-2.94-13.98-5.36-.98-.37-1.98-.75-2.97-1.12s-1.99-.75-2.97-1.12c-7.34-2.77-13.83-5.2-13.83-5.2-.23-.1-.47-.17-.71-.21-.24-.05-.48-.07-.73-.07-.49,0-.97.09-1.43.28,0,0-1.58.66-4.28,1.77-5.94,2.45-17.33,7.1-29.38,11.82-2.37.93-11.74,4.92-19.57,8.27-.13.05-.25.11-.38.16-1.18.51-2.32.99-3.4,1.45-.11.05-.23.1-.34.14-4.24,1.82-7.32,3.14-7.32,3.14-.46.19-.87.47-1.22.81s-.62.76-.81,1.21c0,0-.09.2-.26.58-.11.25-.25.57-.43.96-.52,1.17-1.3,2.93-2.22,5.01-2.31,5.21-5.5,12.46-7.74,17.59-.15.34-.29.67-.43,1-.7,1.61-1.28,2.95-1.68,3.88-2.84,6.69-14.03,35.62-14.03,35.62-.38.92-.38,1.95,0,2.87,0,0,.29.72.79,1.97.42,1.05.99,2.47,1.67,4.16.14.34.28.69.42,1.05.58,1.44,1.22,3.04,1.9,4.76.17.43.34.86.52,1.3,1.41,3.53,2.97,7.45,4.51,11.34.19.49.38.97.58,1.46.77,1.94,1.52,3.86,2.25,5.71.36.92.72,1.83,1.06,2.71,5.78,14.78,13.06,30.19,13.06,30.19.19.46.47.87.81,1.22.34.34.76.62,1.21.81,0,0,7.23,3.06,15.98,6.89.44.19.88.38,1.32.58,1.33.58,2.69,1.18,4.06,1.79,3.65,1.62,7.36,3.28,10.77,4.85,13.97,6.43,32.5,12.68,32.5,12.68.46.19.95.29,1.43.29.24,0,.49-.02.73-.07.24-.05.48-.12.71-.21,1.66-.74,3.21-1.43,4.66-2.08.73-.32,1.43-.64,2.11-.94,13.89-6.18,18.1-8.05,21.78-9.62.21-.09.41-.18.62-.26.15-.06.31-.13.46-.2.21-.09.41-.18.62-.27.99-.42,2.04-.86,3.33-1.41,3.1-1.31,6.34-2.62,9.49-3.87.9-.36,1.8-.71,2.68-1.05.88-.34,1.76-.68,2.62-1.01,1.29-.5,2.54-.97,3.74-1.43,2.4-.91,4.59-1.73,6.45-2.41,3.72-1.37,6.09-2.21,6.09-2.21.92-.38,1.65-1.11,2.03-2.03,0,0,.01-.02.03-.07.04-.09.13-.28.25-.55.42-.94,1.3-2.87,2.42-5.37.64-1.43,1.36-3.04,2.12-4.76.19-.43.38-.86.58-1.31,2.74-6.17,5.88-13.35,7.79-18.06.14-.34.27-.66.39-.97.25-.62.47-1.18.65-1.68,1.83-4.86,12.55-31.86,12.55-31.86.29-.69.36-1.44.21-2.16Zm-6.66,1.71c-.04.13-.07.27-.12.4,0,0-6.82,15.73-10.43,24.35-.12.28-.23.55-.34.82-.16.37-.3.73-.44,1.06-.52,1.27-.93,2.29-1.17,2.91-.11.3-.24.63-.37.98-.03.09-.07.18-.11.28-.12.31-.24.63-.38.97-.02.06-.04.11-.07.17-.16.4-.32.83-.5,1.27-.04.1-.08.21-.12.31-.15.38-.3.77-.46,1.17-.03.08-.07.17-.1.25-.2.5-.4,1.01-.61,1.54-.02.04-.03.08-.05.12-.19.48-.39.97-.59,1.47-.04.11-.09.22-.13.33-.44,1.09-.89,2.21-1.35,3.34-.05.12-.09.23-.14.35-.73,1.79-1.47,3.61-2.19,5.38-.01.03-.02.05-.03.08-.24.59-.48,1.18-.72,1.76-.02.04-.03.07-.05.11-.22.54-.44,1.08-.66,1.6-.02.04-.04.09-.05.13-.44,1.06-.85,2.07-1.24,3.02-.06.13-.11.27-.16.4-.16.38-.31.76-.46,1.12-.01.03-.02.06-.03.08.4-14.82,1.19-47.48.79-57.74-.73-18.76-.75-43.76-.7-55.81,2.23,5.14,5.8,13.35,8.01,18.45.02.06.05.11.07.16.51,1.19.95,2.2,1.28,2.95.02.04.04.08.05.12.1.24.2.46.27.64,4.05,9.42,13.19,33.18,13.19,33.18.3.72.33,1.52.12,2.27Zm-28.2,56.89c.62.62-29.9-12.07-52.07-19.17-17.72-5.67-27.93-11.31-27.93-11.31,0,0-10.02-20.87-15.54-33.81-10.17-23.83-21.48-54.43-21.48-54.43,0,0,37.92-.78,53.1-.55,25.49.37,63.07,1.22,63.07,1.22,0,0,.39,28.56.89,58.08.41,23.91-.03,59.96-.03,59.96ZM110.45,15.01c.42.17.85.35,1.28.53,1.3.53,2.64,1.08,3.99,1.64,1.35.55,2.7,1.11,4.01,1.65.88.36,1.74.71,2.57,1.05.42.17.82.34,1.22.5,2.96,1.21,5.43,2.23,6.83,2.8.3.12.56.23.76.31.45.18.91.37,1.38.56.06.03.13.05.19.08.41.17.83.34,1.25.52.08.03.16.06.24.1.94.39,1.91.79,2.89,1.2.17.07.34.14.51.21.32.13.64.26.96.4.18.07.35.15.53.22.34.14.68.28,1.02.43.3.13.6.25.9.38.31.13.61.26.92.38.24.1.48.2.71.3.26.11.53.22.79.33.21.09.42.18.63.26.3.13.6.25.9.38.35.15.7.29,1.05.44.28.12.56.23.84.35.29.12.57.24.86.36.12.05.24.1.36.15.3.13.6.25.89.37.16.07.33.14.49.21,2.26.95,4.35,1.83,6.1,2.57-15.99-.18-52.04-.56-69.18-.48-10.01.05-29.66-.46-41.2-.79.03-.01.06-.03.09-.04,7.6-3.53,18.6-8.59,21.16-9.5,6.7-2.37,31.51-11.91,31.53-11.92h0c.43-.18.88-.27,1.33-.27.02,0,.04,0,.06,0,.43,0,.87.09,1.27.26,0,0,1.93.79,4.82,1.98.28.11.56.23.85.35,1.28.52,2.7,1.11,4.22,1.73ZM10.9,100.58c-.18-.43-.27-.88-.27-1.33,0-.45.09-.91.27-1.33,0,0,.88-2.1,2.2-5.27.29-.7.61-1.46.94-2.25.26-.63.54-1.29.82-1.96,1.22-2.92,2.6-6.2,3.94-9.4.23-.54.45-1.08.68-1.62.74-1.77,1.46-3.49,2.13-5.08.55-1.31,1.06-2.52,1.51-3.6.12-.29.24-.57.35-.83.48-1.14.89-2.1,1.18-2.8.55-1.31,1.48-3.54,2.56-6.17.16-.38.32-.77.48-1.17,1.02-2.49,2.15-5.26,3.23-7.92.44-1.09.88-2.15,1.29-3.18.18-.43.35-.86.52-1.27.12-.28.23-.56.34-.84.16-.4.32-.79.47-1.17,1.34-3.31,2.28-5.62,2.28-5.62.09-.22.2-.42.33-.61,4.07,10.39,15.59,39.88,19.11,49.49,4.13,11.26,15.67,35.46,18.74,41.86-3.63,3.18-11.57,10.07-18.08,15.34-6.1,4.93-17.12,12.95-20.75,15.57-.06-.14-.13-.29-.2-.45-.02-.05-.04-.1-.07-.15-.07-.17-.15-.35-.24-.53,0-.02-.01-.03-.02-.05-.15-.34-.31-.71-.49-1.11-.04-.09-.08-.18-.12-.28-.09-.2-.18-.4-.27-.62-.12-.29-.26-.58-.39-.89-.08-.18-.16-.36-.24-.55-.09-.21-.18-.42-.27-.63-.14-.32-.28-.64-.42-.98-.1-.23-.2-.46-.3-.69-.09-.21-.18-.42-.28-.64-.17-.4-.35-.82-.53-1.24-.08-.18-.15-.36-.23-.54-.14-.34-.29-.68-.44-1.03-.1-.23-.2-.46-.29-.69-.18-.42-.36-.85-.54-1.28-.08-.19-.16-.38-.24-.57-.21-.5-.42-1.01-.64-1.52-.07-.16-.13-.31-.2-.47-.19-.44-.37-.89-.56-1.34-.07-.16-.13-.32-.2-.47-.23-.55-.46-1.11-.69-1.68-.07-.16-.13-.32-.2-.48-.24-.58-.48-1.17-.72-1.76-.04-.09-.08-.19-.12-.28-.22-.54-.44-1.08-.66-1.62-.06-.14-.11-.28-.17-.41-.24-.59-.48-1.19-.71-1.79-.06-.14-.11-.29-.17-.43-.24-.61-.48-1.23-.72-1.84,0-.01,0-.02-.01-.03-3.53-9.03-8.33-20.66-10.99-27.05-1.21-2.9-1.97-4.72-1.97-4.72Zm71.51,81.38c-1.08-.42-2.19-.85-3.3-1.29-2.03-.81-4.09-1.65-6.12-2.51-.22-.09-.44-.19-.66-.28-1.61-.69-3.19-1.39-4.72-2.09-.53-.24-1.07-.49-1.62-.74-.13-.06-.26-.12-.39-.18-.5-.23-1-.46-1.51-.69-.05-.02-.09-.04-.14-.06-.54-.24-1.09-.49-1.63-.74-.15-.07-.31-.14-.46-.21-.48-.21-.96-.43-1.44-.64-.09-.04-.17-.08-.26-.12-.54-.24-1.09-.48-1.63-.73-.16-.07-.33-.14-.49-.22-.43-.19-.87-.38-1.3-.58-.13-.06-.27-.12-.4-.18-.51-.23-1.02-.45-1.53-.67-.19-.09-.39-.17-.58-.26-.37-.16-.74-.32-1.11-.49-.18-.08-.37-.16-.55-.24-.48-.21-.96-.42-1.43-.62-.17-.07-.34-.15-.51-.22-.4-.17-.79-.34-1.18-.51-.12-.05-.24-.1-.36-.16-.48-.21-.94-.41-1.4-.61-.14-.06-.28-.12-.42-.18-.36-.16-.72-.31-1.06-.46-.12-.05-.24-.1-.36-.15-.43-.18-.84-.36-1.25-.54-.13-.06-.26-.11-.39-.17-.26-.11-.51-.22-.76-.33-.17-.07-.34-.15-.51-.22-.34-.15-.67-.29-.98-.42-.12-.05-.22-.1-.33-.14-.2-.09-.4-.17-.59-.25-.09-.04-.19-.08-.27-.12,4.13-3.51,12.99-11.04,19-16.23,6.19-5.33,14.76-11.97,18.42-14.77,3.73,1.28,16.31,5.65,30.96,11.2,10.22,3.87,40.33,15.27,50.26,19.03-4.42,1.78-19.11,7.73-27.11,11.56-7.07,3.38-31.77,12.83-31.77,12.83-.41.17-.84.25-1.27.26-.02,0-.04,0-.07,0-.45,0-.91-.09-1.33-.27,0,0-7-2.36-15.45-5.62Z"
  ],
  sa8: [
    "m194.09,97.8s-4.61-16.63-13.44-35.77c-8.83-19.14-13.32-28.88-13.32-28.88-.38-.92-1.11-1.65-2.03-2.03,0,0-7.51-4.12-31.42-14.21-24.05-10.15-33.21-12.58-33.21-12.58-.92-.38-1.95-.38-2.87,0,0,0-8.09,3.11-16.57,6.33-6.91,2.63-14.07,5.32-17.31,6.47-4.29,1.52-30.77,13.96-30.77,13.96-.92.38-1.65,1.11-2.03,2.03,0,0-3.61,8.14-7.07,15.99-2.37,5.38-4.67,10.63-5.69,13.03-1.38,3.26-4.75,11.8-7.84,19.71-3.25,8.31-6.19,15.91-6.19,15.91-.38.92-.38,1.95,0,2.87,0,0,7.43,18.57,13.7,34.45,5.83,14.76,13.06,30.19,13.06,30.19.38.92,1.11,1.65,2.03,2.03,0,0,7.83,3.82,17.06,7.86,4.96,2.17,10.32,4.56,15.08,6.75,6.34,2.92,13.62,5.8,19.69,8.08,7.29,2.74,12.81,4.1,12.81,4.1.92.38,1.95.38,2.87,0,0,0,19.81-7.58,30.1-11.98,1.62-.69,3-1.31,4.04-1.8,10.2-4.88,30.51-12.97,30.51-12.97.92-.38,1.65-1.11,2.03-2.03,0,0,11.24-24.8,14.24-32.78,1.02-2.71,4.79-12.28,7.94-20.23,2.51-6.33,4.61-11.63,4.61-11.63.38-.92.38-1.95,0-2.87Zm-4.14-.73c-5.1-4.89-10.42-9.32-15.93-13.24,2.3-3.46,4.46-7.08,6.5-10.8,3.79,9.45,8.25,20.97,9.43,24.04Zm-26.94,66.11c-7.23-.11-13.96-.65-20.27-1.58,1.01-5.56,1.64-11.2,1.9-16.9,5.66-.44,11.34-1.26,17.01-2.44,1.25,6.96,1.75,13.97,1.35,20.92Zm-15.94-63.75c1.67-2.96,3.24-6.01,4.7-9.12,3.23,2.78,6.3,5.7,9.19,8.75-2.82,3.21-5.81,6.27-8.93,9.18-1.53-2.98-3.19-5.92-4.96-8.81Zm9.01,23.12c-3.84,1.88-7.76,3.57-11.77,5.06-.29-3.43-.7-6.86-1.25-10.3,2.66-2.07,5.26-4.25,7.78-6.54,1.95,3.86,3.7,7.8,5.23,11.78Zm-12.57-54.95c-3.8-1.42-7.64-2.65-11.52-3.69-.73-2.8-1.54-5.57-2.43-8.28,4.59-.19,9.19-.13,13.77.17.24,3.93.3,7.87.17,11.8Zm.94,3.09c4.05,1.51,8.02,3.23,11.9,5.15-1.35,3.92-2.9,7.78-4.62,11.55-2.63-2.22-5.35-4.36-8.17-6.4.42-3.4.72-6.84.89-10.3Zm-8.74,42.91c.04-.39.08-.78.11-1.17.89-2.35,1.72-4.73,2.48-7.15.31,1.23.6,2.47.87,3.71-1.12,1.56-2.27,3.09-3.46,4.61Zm3.94-2.44c.44,2.12.83,4.24,1.18,6.36-2.01,1.48-4.06,2.9-6.16,4.27.25-1.61.48-3.23.67-4.86,1.48-1.88,2.91-3.81,4.3-5.77Zm-3.24-12.8c.4,1.35.78,2.72,1.15,4.08-.42,1.33-.86,2.66-1.32,3.98.12-2.4.18-4.82.18-7.25,0-.27,0-.54,0-.81Zm2.31.23c-.77-2.54-1.61-5.07-2.53-7.59-.07-1.25-.16-2.49-.26-3.73,1.45,1.88,2.86,3.79,4.23,5.74-.44,1.87-.91,3.73-1.44,5.58Zm-3.17-15.27c-.2-1.86-.44-3.7-.71-5.53,2.49,1.58,4.93,3.22,7.31,4.93-.37,2.46-.82,4.92-1.34,7.37-1.67-2.29-3.42-4.55-5.25-6.77Zm-1.18-8.44c-.46-2.68-1.01-5.33-1.63-7.94,3.6.97,7.16,2.09,10.66,3.36-.17,3.31-.48,6.62-.91,9.92-2.63-1.86-5.33-3.64-8.12-5.34Zm-.7,9.67c-.04-.11-.09-.21-.14-.32.04.05.08.1.12.15,0,.06.01.11.02.17Zm-.51-4.07c-.87-1-1.75-1.99-2.65-2.97-.54-1.13-1.1-2.24-1.66-3.34,1.23.7,2.45,1.43,3.65,2.16.24,1.38.46,2.76.66,4.15Zm-2.84-14.18c.61,2.36,1.16,4.73,1.64,7.13-1.63-.95-3.29-1.87-4.97-2.77-1.09-1.99-2.22-3.93-3.39-5.84,2.26.43,4.5.92,6.73,1.47Zm-4.6,6.22c-.08-.08-.16-.16-.25-.24.05.03.11.06.16.09.03.05.05.1.08.15Zm-2.03-3.56c-1.18-.59-2.38-1.17-3.58-1.73-1.4-1.25-2.81-2.47-4.24-3.65,1.65.21,3.3.46,4.93.73.99,1.52,1.96,3.07,2.89,4.64Zm-2.16-7.4c-1.1-1.69-2.24-3.34-3.4-4.96,2.98-.39,5.98-.68,8.97-.86.87,2.47,1.67,4.98,2.39,7.51-2.64-.65-5.3-1.21-7.97-1.69Zm-2.9-.49c-2.35-.37-4.7-.67-7.06-.9-.9-.68-1.8-1.35-2.7-2.01,2.25-.46,4.51-.87,6.78-1.21,1.02,1.35,2.02,2.73,2.99,4.12Zm-4.85,3.39c-1.28-.52-2.56-1.03-3.84-1.51.73.06,1.45.12,2.17.19.56.43,1.11.87,1.66,1.31Zm-8.07-8.52c-1.66-1.14-3.34-2.23-5.04-3.28,2.61-1.5,5.26-2.91,7.96-4.23,1.75,1.95,3.45,3.96,5.08,6.02-2.69.41-5.36.91-8.01,1.49Zm.39,2.83c.52.36,1.04.71,1.56,1.08-1.67-.11-3.34-.19-5.01-.23,1.15-.3,2.3-.58,3.45-.84Zm-10.13-.3c-1.09-.29-2.18-.56-3.26-.82,1.9-1.29,3.83-2.53,5.8-3.72,1.46.86,2.91,1.75,4.34,2.67-2.31.56-4.6,1.18-6.87,1.87Zm2.02-7.43c-2.5-1.47-5.02-2.85-7.57-4.13,2.66-2.89,5.45-5.66,8.37-8.3,2.78,2.49,5.44,5.09,7.99,7.81-3,1.43-5.93,2.98-8.79,4.62Zm-2.23,1.32c-2.33,1.41-4.61,2.89-6.83,4.44-1.97-.41-3.94-.78-5.91-1.1,1.83-2.39,3.75-4.71,5.74-6.95,2.37,1.13,4.7,2.34,7,3.62Zm-3.54,7.3c-.09.03-.19.06-.28.09-.83.05-1.66.11-2.48.17.3-.22.61-.44.91-.66.62.13,1.23.26,1.85.4Zm-5.69-1.15c-.88.64-1.75,1.29-2.61,1.96-1.62.19-3.24.41-4.85.67.8-1.16,1.6-2.3,2.43-3.43,1.68.24,3.35.5,5.03.8Zm-6.2,4.82c-.9.74-1.78,1.5-2.66,2.26-.75.36-1.49.73-2.23,1.11.63-1.02,1.27-2.03,1.92-3.03.98-.12,1.97-.24,2.97-.34Zm-5.13-1.51c-2.45.47-4.9,1.01-7.33,1.62.66-2.3,1.38-4.57,2.16-6.82,2.78.14,5.56.38,8.33.69-1.09,1.48-2.14,2.99-3.17,4.51Zm-15.86,41.92c.33,1.06.68,2.11,1.04,3.16.03.68.06,1.36.1,2.04-.63-.87-1.24-1.75-1.85-2.64.23-.85.47-1.7.71-2.56Zm-.58-13.66c.76-.99,1.54-1.98,2.34-2.97-.13,1.2-.25,2.39-.35,3.59-.38,1.09-.75,2.19-1.1,3.29-.31-1.3-.61-2.6-.88-3.91Zm2.11,24.22c.15,1.61.33,3.22.54,4.82-1.65-1.15-3.26-2.34-4.85-3.56.33-1.87.71-3.73,1.15-5.59,1.03,1.47,2.08,2.91,3.16,4.33Zm1.1,8.61c.38,2.37.84,4.73,1.35,7.06-2.74-.84-5.45-1.75-8.13-2.73.16-2.9.46-5.77.87-8.61,1.93,1.49,3.9,2.91,5.9,4.28Zm-.26-40.48c-1.21,1.54-2.39,3.1-3.53,4.69-.42-2.29-.79-4.58-1.09-6.88,1.82-1.27,3.69-2.49,5.61-3.66-.37,1.95-.7,3.9-.99,5.85Zm-4.87-4.22c-.37-3.2-.61-6.41-.73-9.63,3-1.05,6.02-1.93,9.07-2.67-.72,2.6-1.35,5.2-1.91,7.82-2.18,1.43-4.33,2.92-6.43,4.48Zm8.26-3.06c1.06-.61,2.12-1.21,3.21-1.8-.54,1.03-1.08,2.06-1.59,3.11-.78.87-1.55,1.75-2.3,2.64.21-1.32.43-2.64.68-3.95Zm.59-2.96c.48-2.28,1.02-4.53,1.63-6.77,2.08-.46,4.18-.85,6.31-1.19-1.08,1.68-2.11,3.39-3.1,5.11-1.63.92-3.24,1.87-4.84,2.86Zm.03-8.18c-3.25.88-6.48,1.88-9.67,3.02-.09-3.44-.04-6.89.15-10.33,3.97-.23,7.95-.28,11.93-.14-.88,2.47-1.68,4.96-2.41,7.45Zm-9.21,29.12c.46,2.1.98,4.19,1.55,6.26-.4,1.46-.77,2.93-1.11,4.41-1.27-1.95-2.48-3.93-3.64-5.94,1.02-1.6,2.09-3.17,3.2-4.73Zm-4.21,2.95c-1.56-2.82-3.02-5.69-4.36-8.62,2.14-1.91,4.35-3.7,6.62-5.4.36,2.79.82,5.56,1.37,8.3-1.26,1.87-2.47,3.78-3.63,5.71Zm-5.01-10.03c-1.7-3.81-3.21-7.71-4.53-11.67,3.62-1.88,7.21-3.49,10.8-4.86.11,3.57.37,7.1.77,10.61-2.41,1.88-4.76,3.86-7.05,5.92Zm3.43,12.75c-1.51,2.66-2.92,5.39-4.24,8.17-3.03-2.87-5.92-5.89-8.65-9.05,2.63-3.12,5.33-5.98,8.12-8.62,1.47,3.25,3.06,6.42,4.77,9.51Zm-4.24,11.68c2.6,2.44,5.29,4.76,8.05,6.96-.38,3.07-.64,6.17-.8,9.27-3.95-1.49-7.81-3.13-11.54-4.88,1.25-4,2.68-7.76,4.3-11.35Zm1.14-2.45c1.25-2.59,2.6-5.09,4.05-7.52,1.4,2.44,2.89,4.82,4.44,7.15-.45,2.21-.83,4.43-1.16,6.67-2.52-2.01-4.97-4.1-7.33-6.29Zm7.42,22.82c3,1.01,6.04,1.91,9.11,2.69.72,2.89,1.55,5.75,2.47,8.57-3.76.09-7.5.04-11.17-.13-.34-3.82-.48-7.52-.41-11.13Zm9.07-9.88c-.13-1-.25-2.01-.36-3.02.73.88,1.46,1.75,2.21,2.61.37.78.76,1.55,1.15,2.33-1.01-.63-2.01-1.27-3-1.92Zm5.62,6.85c.88,1.56,1.78,3.11,2.72,4.63-2.24-.53-4.47-1.11-6.68-1.75-.42-1.98-.79-3.99-1.12-6.01,1.67,1.08,3.36,2.12,5.08,3.12Zm-3.18,6.3c2.64.62,5.3,1.15,7.99,1.6,1.26,1.92,2.58,3.8,3.95,5.66-3.23.32-6.46.54-9.68.66-.86-2.61-1.6-5.25-2.25-7.92Zm7.34-3.98c1.01.54,2.02,1.06,3.04,1.57.83.75,1.67,1.48,2.52,2.21-1.29-.23-2.57-.48-3.86-.75-.58-1-1.14-2.01-1.7-3.02Zm3.5,6.03c1.88.27,3.77.51,5.67.7,1.45,1.15,2.92,2.26,4.42,3.34-2.27.37-4.55.68-6.84.94-1.12-1.63-2.2-3.29-3.25-4.99Zm13.27,6.26c1.9,1.29,3.84,2.53,5.82,3.71-2.86,1.53-5.76,2.97-8.7,4.31-1.79-2.09-3.49-4.24-5.11-6.45,2.68-.44,5.34-.97,7.99-1.58Zm13.68-.8c-1.95,1.21-3.94,2.37-5.96,3.49-1.66-1.08-3.29-2.2-4.91-3.37,1.84-.47,3.68-.97,5.5-1.52,1.78.5,3.56.97,5.36,1.4Zm-5.33-4.13c.45,0,.9-.03,1.35-.04-.27.07-.55.14-.82.21-.18-.06-.35-.11-.53-.17Zm4.28,1.34c1.73-.59,3.45-1.21,5.16-1.87,1.14-.1,2.27-.22,3.41-.36-1.57,1.13-3.17,2.23-4.8,3.29-1.25-.33-2.51-.69-3.77-1.07Zm-12.64.83c-1.03-.79-2.05-1.6-3.07-2.43.86.06,1.72.11,2.58.14,1.44.52,2.89,1.02,4.35,1.5-1.28.28-2.56.54-3.85.79Zm9.2,8.45c2.5,1.4,5.05,2.72,7.65,3.96-2.99,3.16-6.08,6.16-9.22,8.99-2.86-2.5-5.52-5.11-8.02-7.82,3.27-1.57,6.47-3.28,9.59-5.13Zm1.68-1.02c2.35-1.45,4.66-2.97,6.91-4.57,2.14.43,4.3.81,6.46,1.14-2.06,2.51-4.19,4.95-6.38,7.31-2.38-1.21-4.71-2.51-7-3.89Zm9.25-6.26c2.11-1.57,4.18-3.21,6.19-4.92,1.47-.23,2.93-.48,4.4-.76-1.63,2.32-3.33,4.6-5.1,6.83-1.83-.34-3.66-.73-5.49-1.15Zm2.64-5.9c.59-.25,1.17-.52,1.75-.78-.3.23-.61.46-.92.69-.28.03-.55.06-.83.09Zm5.54-.73c1.52-1.34,3.01-2.71,4.47-4.12.68-.37,1.36-.73,2.04-1.11-.97,1.56-1.97,3.11-3.02,4.64-1.16.21-2.32.41-3.49.59Zm6.17.19c1.65-.36,3.3-.74,4.94-1.17-.85,3.46-1.82,6.87-2.92,10.23-2.49-.21-4.96-.51-7.43-.89,1.9-2.65,3.71-5.38,5.41-8.17Zm.88-1.48c1.21-2.06,2.37-4.15,3.47-6.27.78-.47,1.56-.95,2.33-1.44-.42,2.25-.89,4.49-1.42,6.71-1.45.36-2.92.69-4.38,1Zm4.65-8.61c.65-1.31,1.28-2.63,1.88-3.97.04-.04.08-.09.11-.13-.16,1.07-.34,2.13-.52,3.2-.49.3-.98.61-1.47.91Zm.14-4.85c-1.76,1.99-3.58,3.94-5.48,5.83-1.57,1.57-3.21,3.09-4.91,4.58-2.39,1.16-4.82,2.27-7.29,3.29-2.05.85-4.15,1.63-6.29,2.35-2.65.16-5.32.25-7.99.25-1.76,0-3.53-.06-5.31-.16-2.4-.88-4.81-1.82-7.25-2.83-2.69-1.12-5.33-2.32-7.93-3.6-1.39-1.31-2.78-2.66-4.16-4.04-2.06-2.06-4.04-4.19-5.95-6.36-.78-1.75-1.55-3.52-2.3-5.33-1.12-2.69-2.13-5.41-3.06-8.15-.06-1.91-.09-3.84-.09-5.8,0-2.25.06-4.5.17-6.73.9-2.42,1.87-4.88,2.91-7.39,1.06-2.56,2.2-5.07,3.41-7.53,1.35-1.43,2.75-2.86,4.19-4.3,1.96-1.96,3.97-3.84,6.03-5.66,1.8-.8,3.63-1.59,5.52-2.37,2.56-1.06,5.14-2.03,7.74-2.92,1.97-.05,3.97-.08,6.01-.08,1.33,0,2.65.03,3.97.07,3.59,1.14,7.14,2.42,10.66,3.88,1.95.85,3.88,1.74,5.79,2.67,1.85,1.65,3.66,3.35,5.43,5.12,1.47,1.53,2.92,3.09,4.33,4.68,1.08,2.23,2.1,4.5,3.06,6.81.78,1.98,1.51,3.97,2.21,5.99.14,2.48.22,4.96.22,7.46-.09,4.75-.4,9.52-.92,14.27-.84,2.02-1.75,4.02-2.74,6.01Zm3.56,4.1c2.25-1.49,4.47-3.05,6.65-4.68.49,3.17.86,6.35,1.13,9.53-3.06,1.08-6.17,2.04-9.31,2.88.58-2.55,1.09-5.12,1.53-7.73Zm6.5-17c-.43-1.77-.89-3.54-1.39-5.31.62-2.22,1.19-4.47,1.7-6.73,1.29,1.89,2.54,3.81,3.74,5.75-1.29,2.13-2.64,4.23-4.06,6.3Zm.95-15.02c.54-2.65,1.01-5.32,1.39-8.01,2.59,1.9,5.1,3.88,7.54,5.94-1.4,2.93-2.92,5.8-4.54,8.62-1.39-2.21-2.85-4.39-4.38-6.55Zm10.88-3.3c1.73-3.85,3.3-7.81,4.71-11.87,4.96,2.51,9.76,5.35,14.39,8.5-2.9,4.39-6.05,8.59-9.45,12.57-3.04-3.21-6.26-6.28-9.65-9.2Zm4.39-14.65c-4.12-2.1-8.31-3.97-12.56-5.59.12-4.01.07-8.06-.16-12.12,5.58.42,11.15,1.21,16.67,2.35-1.01,5.21-2.33,10.34-3.96,15.36Zm-12.86-20.07c-.38-5.32-1.08-10.66-2.08-16.02,6.95-1.25,14.05-1.94,21.25-2.06-.11,7.01-.77,13.93-1.97,20.71-5.76-1.27-11.5-2.14-17.2-2.63Zm-1.08-.09c-4.87-.38-9.7-.49-14.49-.34-1.33-3.77-2.83-7.44-4.47-11.02,5.46-1.82,11.04-3.27,16.73-4.35,1.07,5.2,1.81,10.45,2.22,15.71Zm-17.02-.23c-3.32.18-6.62.48-9.89.91-1.75-2.31-3.55-4.55-5.42-6.72,3.57-1.65,7.21-3.15,10.91-4.47,1.61,3.36,3.08,6.79,4.39,10.28Zm-17.08-7.82c-2.67-2.97-5.46-5.79-8.35-8.47,3.89-3.37,7.98-6.51,12.27-9.41,2.84,4.28,5.42,8.71,7.71,13.27-3.98,1.36-7.87,2.9-11.64,4.61Zm-10.09-10.06c-4.11-3.67-8.42-7.03-12.9-10.1,3.81-5.45,8.05-10.65,12.73-15.54,4.79,5.05,9.13,10.42,13,16.05-4.52,2.98-8.8,6.18-12.82,9.58Zm-2,1.73c-3.16,2.78-6.16,5.69-8.99,8.71-3.73-1.78-7.51-3.37-11.33-4.77,2.33-4.62,4.95-9.11,7.84-13.45,4.36,2.92,8.53,6.1,12.49,9.5Zm-10.71,10.58c-2.23,2.47-4.34,5.02-6.35,7.63-3.03-.42-6.05-.74-9.05-.96,1.38-3.73,2.92-7.39,4.64-10.97,3.65,1.27,7.24,2.7,10.76,4.29Zm-17.27,6.57c-4.24-.24-8.46-.26-12.64-.09.39-5.16,1.08-10.31,2.09-15.42,5.24,1.05,10.39,2.41,15.43,4.09-1.81,3.76-3.44,7.57-4.89,11.42Zm-14.99.03c-5.36.32-10.66.98-15.86,1.96-1.16-6.55-1.84-13.22-1.99-19.99,6.85.18,13.6.89,20.22,2.1-1.12,5.33-1.91,10.65-2.37,15.93Zm-.21,2.64c-.25,3.72-.33,7.42-.27,11.1-3.81,1.44-7.57,3.07-11.27,4.87-1.45-4.55-2.66-9.19-3.6-13.9,5.02-.99,10.07-1.68,15.14-2.07Zm-8.48,31.01c-2.97,2.79-5.82,5.73-8.55,8.82-3.41-4.04-6.58-8.3-9.5-12.76,4.58-3.25,9.01-6.04,13.38-8.43,1.36,4.24,2.91,8.36,4.66,12.37Zm-10.1,10.6c-3.7,4.35-7.15,8.97-10.33,13.85-6.51-4.2-12.15-8.65-16.52-13.1,6.03-5.41,11.72-10.07,17.19-14.06,2.99,4.69,6.22,9.13,9.66,13.31Zm1.09,1.29c2.87,3.4,5.89,6.61,9.04,9.64-1.72,3.82-3.27,7.74-4.63,11.74-4.97-2.39-9.68-4.98-14.03-7.69,3.14-5.07,6.33-9.61,9.63-13.7Zm4.86,25.46c4.04,1.94,8.19,3.65,12.42,5.13-.09,3.84,0,7.69.25,11.56-5.5-.31-10.85-.9-15.91-1.74.87-5.35,1.95-10.31,3.25-14.95Zm12.93,20.17c.47,5.21,1.26,10.42,2.36,15.63-7.57,1.64-14.71,2.47-20.94,2.42.4-7.4,1.05-14.15,1.96-20.37,5.51,1.17,11.06,1.93,16.63,2.32Zm1.71.11c4,.22,8,.24,11.99.07,1.35,3.75,2.89,7.43,4.6,11.02-4.7,1.59-9.35,2.92-13.87,3.97-1.24-5.28-2.14-10.28-2.72-15.06Zm14.18-.06c3.59-.22,7.17-.59,10.74-1.12,1.81,2.31,3.71,4.57,5.69,6.77-3.97,1.77-7.97,3.37-11.96,4.78-1.7-3.45-3.18-6.92-4.46-10.43Zm19,8.43c2.66,2.79,5.46,5.47,8.38,8.04-4.29,3.8-8.67,7.26-13.02,10.31-3.16-4.39-5.9-8.79-8.27-13.21,4.41-1.48,8.72-3.19,12.91-5.15Zm11.02,10.3c3.95,3.3,8.12,6.39,12.51,9.26-4.04,5.81-8.64,11.11-13.84,15.75-4.77-4.92-8.96-9.79-12.62-14.65,4.92-3.12,9.57-6.59,13.95-10.36Zm.96-.83c3.47-3.06,6.76-6.3,9.86-9.73,3.47,1.54,7.03,2.94,10.66,4.18-2.37,5.05-5.08,9.87-8.12,14.4-4.49-2.79-8.6-5.74-12.39-8.85Zm10.81-10.79c2.38-2.69,4.65-5.49,6.8-8.38,2.69.33,5.39.57,8.11.73-1.37,4.03-2.93,7.96-4.67,11.77-3.54-1.21-6.94-2.59-10.24-4.12Zm17.18-7.54c4.48.18,8.99.13,13.52-.15-.26,5.57-.91,11.06-2,16.41-5.81-.96-11.26-2.28-16.43-3.93,1.83-4,3.47-8.11,4.91-12.32Zm.46-1.4c1.19-3.61,2.23-7.3,3.13-11.05,3.25-.9,6.48-1.92,9.69-3.06.36,4.73.46,9.44.29,14.1-4.45.28-8.8.27-13.11,0Zm11.95-34.95c1.53-2.28,3-4.62,4.41-7,1.61,2.67,3.13,5.38,4.55,8.13-2.42,2.17-4.92,4.24-7.5,6.23-.42-2.45-.91-4.9-1.46-7.35Zm3.3,34.78c.18-4.88.08-9.79-.29-14.73,4.07-1.52,8.09-3.25,12.06-5.17,2.12,5.67,3.77,11.44,4.91,17.24-5.73,1.33-11.27,2.2-16.68,2.65Zm7.84-34.22c3.17-2.96,6.23-6.1,9.16-9.39,3.9,4.19,7.45,8.62,10.59,13.25-4.59,3.15-9.36,5.99-14.28,8.51-1.6-4.19-3.43-8.31-5.48-12.37Zm10.58-11c3.44-3.99,6.69-8.21,9.74-12.65,5.8,4.03,11.31,8.56,16.48,13.57-4.78,4.63-9.86,8.86-15.19,12.65-3.34-4.74-7.03-9.28-11.02-13.57Zm13.55-34.57c.34.79.71,1.67,1.11,2.63.6,1.45,1.27,3.07,1.96,4.79-2.06,4.14-4.3,8.16-6.76,12.02-4.8-3.35-9.74-6.33-14.78-8.96,1.66-5.07,3.05-10.29,4.16-15.64,4.62,1.01,9.2,2.3,13.73,3.82.23.54.43,1,.58,1.34Zm-1.63-3.77c-4.09-1.34-8.19-2.51-12.27-3.45,1.21-6.25,2.01-12.67,2.42-19.24,1.75,4.03,6.99,16.07,9.86,22.69Zm-13.18-26.34c-6.87.17-13.57.79-20.06,1.89-.77-3.84-1.73-7.68-2.83-11.51,9.38,3.9,19.97,8.39,22.89,9.62Zm-29.75-12.46c1.55.63,3.22,1.32,4.95,2.04,1.36,4.14,2.54,8.31,3.47,12.52-5.95,1.06-11.72,2.5-17.3,4.28-2.35-4.86-4.98-9.53-7.87-13.99,3.84-2.48,7.84-4.74,11.96-6.82,2.26.93,3.99,1.64,4.79,1.97Zm-7.22-2.96c-3.69,1.89-7.27,3.9-10.69,6.06-3.71-5.51-7.84-10.67-12.32-15.5,2.1.86,6.59,2.7,11.5,4.72,3.89,1.6,8.05,3.3,11.5,4.72Zm-27.4-9.82c-4.74,5.09-9,10.42-12.82,15.94-3.69-2.45-7.51-4.68-11.41-6.72,3.05-1.15,6.5-2.45,9.82-3.72,6.68-2.54,12.87-4.92,14.4-5.51Zm-32.13,12.14c1.04-.37,2.5-.9,4.23-1.54,4.68,2.31,9.18,4.88,13.5,7.69-2.97,4.49-5.65,9.09-8.03,13.79-5.28-1.85-10.63-3.34-16.02-4.47,1.08-4.9,2.45-9.77,4.11-14.57.97-.41,1.73-.72,2.21-.89Zm-4.62,1.94c-1.47,4.37-2.73,8.74-3.74,13.11-6.62-1.28-13.29-2-19.97-2.21,2.16-1.01,6.97-3.26,12.06-5.6,4.12-1.9,8.43-3.87,11.65-5.29Zm-27,13.74c.16,0,.32,0,.48,0,.14,7,.78,13.81,1.88,20.41-4.04.83-8.02,1.87-11.93,3.08,1.02-2.48,2.26-5.52,3.51-8.58,2.69-6.61,5.43-13.36,6.06-14.92Zm-11.38,27.85c.1-.24.22-.52.35-.82,4.58-1.53,9.22-2.8,13.89-3.81.93,4.97,2.12,9.81,3.56,14.52-4.79,2.45-9.47,5.21-14.01,8.27-2.36-3.75-4.53-7.65-6.52-11.66,1.18-2.8,2.16-5.13,2.74-6.49Zm-3.74,8.88c1.82,3.61,3.75,7.11,5.82,10.46-5.37,3.74-10.53,7.94-15.46,12.55,1.01-2.41,2.85-6.81,4.87-11.63,1.58-3.78,3.28-7.82,4.77-11.38Zm-9.63,29.67c4.52,4.47,9.32,8.53,14.39,12.15-1.93,3.1-3.74,6.31-5.44,9.61-1.34-3.32-2.71-6.67-3.98-9.76-2.11-5.15-3.96-9.58-4.97-12Zm12.54,30.79c-.78-2-1.62-4.12-2.49-6.28,2.04-3.95,4.08-7.64,6.13-11.09,4.64,3.19,9.48,6.02,14.48,8.5-1.55,4.99-2.83,10.11-3.8,15.34-4.63-.84-9-1.9-13-3.14-.44-1.11-.89-2.23-1.32-3.33Zm2.39,6c3.78,1.28,7.59,2.38,11.43,3.27-1.04,6.31-1.64,12.78-1.8,19.36-.82-1.84-3.25-7.34-6.12-14.14-1.13-2.68-2.32-5.55-3.51-8.49Zm13.76,26.04c6.59-.04,13.07-.59,19.39-1.63.89,3.84,1.98,7.68,3.23,11.49-3.91-1.75-7.91-3.51-11.51-5.08-4.77-2.08-8.85-3.83-11.11-4.79Zm28.95,12.74c-1.16-.54-2.37-1.08-3.59-1.64-1.48-4.57-2.76-8.93-3.81-13.09,5.02-.92,9.94-2.15,14.74-3.66,2.47,4.82,5.27,9.46,8.4,13.89-3.76,2.54-7.48,4.74-11.06,6.57-1.59-.68-3.16-1.38-4.68-2.07Zm7.28,3.17c3.46-1.66,6.84-3.47,10.09-5.44,3.66,4.93,7.75,9.57,12.23,13.88-2.14-.74-6.26-2.19-11.16-4.04-3.47-1.31-7.33-2.81-11.16-4.41Zm29.22,8.01c4.12-4.58,7.92-9.45,11.33-14.61,3.38,2.13,6.89,4.11,10.49,5.97-2.16.89-4.49,1.83-6.83,2.76-5.86,2.34-11.75,4.62-15,5.88Zm30.2-12.25c-1.44.69-3.61,1.63-6.14,2.69-4.22-2.03-8.16-4.14-11.86-6.36,3.06-4.75,5.8-9.72,8.22-14.89,5.4,1.76,10.96,3.18,16.65,4.26-.96,4.4-2.21,8.7-3.77,12.86-1.1.5-2.15.99-3.1,1.44Zm6.48-2.95c1.04-3.6,1.93-7.25,2.64-10.94,6.18,1.06,12.52,1.7,18.97,1.92-2.32.93-7.78,3.14-13.64,5.6-2.66,1.12-5.41,2.29-7.98,3.42Zm26.35-15.34c-.36-5.69-1.12-11.36-2.26-16.96,3.44-.78,6.88-1.7,10.31-2.76-2.69,6.7-6.08,14.96-8.05,19.72Zm11.33-28.08c-.57,1.51-1.41,3.67-2.41,6.16-3.93,1.34-7.76,2.49-11.51,3.43-1.29-5.97-3.03-11.86-5.19-17.65,4.97-2.5,9.85-5.32,14.61-8.46,2.45,3.72,4.63,7.58,6.51,11.55-.94,2.24-1.67,4.03-2.02,4.97Zm3.38-8.2c-1.85-3.28-3.85-6.49-5.99-9.6,5.26-3.59,10.35-7.58,15.25-11.97-.52,1.2-2.59,5.97-4.92,11.4-1.45,3.37-3,6.99-4.34,10.16Z"
  ],
  sa9: [
    "m194.09,97.81s-10.93-24.15-14.88-34.43c-5.54-14.41-11.88-30.22-11.88-30.22-.38-.92-1.11-1.65-2.03-2.03,0,0-18.69-9-30.88-13.99-4.18-1.71-33.76-12.8-33.76-12.8-.92-.38-1.95-.38-2.87,0,0,0-16.14,6.72-33.65,13.59-4.24,1.66-30.99,13.17-30.99,13.17-.92.38-1.65,1.11-2.03,2.03,0,0-10.24,23.1-12.76,29.02-2.84,6.69-14.03,35.61-14.03,35.61-.38.92-.38,1.95,0,2.87,0,0,8.19,20.35,13.7,34.45,5.78,14.78,13.06,30.19,13.06,30.19.38.92,1.11,1.65,2.03,2.03,0,0,18.51,7.84,32.14,14.11,13.97,6.43,32.5,12.68,32.5,12.68.92.38,1.95.38,2.87,0,26.52-11.81,25.99-11.57,33.58-14.77,14.19-5.99,31.07-11.99,31.07-11.99.92-.38,1.65-1.11,2.03-2.03,0,0,11.24-24.79,14.24-32.77,1.83-4.86,12.55-31.86,12.55-31.86.38-.92.38-1.95,0-2.87Zm-6.57,2.82s-10.68,24.62-12.38,29.14c-2.79,7.43-12.55,31.02-12.55,31.02-.35.85-1.03,1.53-1.89,1.89q-18.49,7.37-28.4,12.07c-7.07,3.38-31.77,12.83-31.77,12.83-.85.35-1.81.35-2.67,0,0,0-17.25-5.82-30.25-11.8-12.69-5.84-29.91-13.14-29.91-13.14-.85-.35-1.53-1.03-1.89-1.89,0,0-6.57-14.65-11.95-28.41-5.13-13.13-12.96-31.77-12.96-31.77-.35-.85-.35-1.81,0-2.67,0,0,11.12-26.59,13.77-32.82,2.34-5.51,11.17-27.34,11.17-27.34.35-.85,1.03-1.53,1.89-1.89,0,0,24.65-11.58,28.64-12.99,6.64-2.35,31.05-11.73,31.51-11.91-6.03,4.13-19.85,13.94-26.7,18.55-8.65,5.82-24.21,16.58-24.22,16.59-1.28.76-2.1,2.12-2.57,3.47-2.1,5.08-5.15,13.68-7.29,18.84-1.27,2.91-10.77,25.18-11.85,27.56-.65,1.34-1.07,2.97-.53,4.49.4,1.11,6.59,16.35,9.89,23.82,3.3,7.46,10.62,25.51,10.62,25.51.48,1.44,1.86,2.67,3.34,3.15,7.17,2.94,18.04,7.34,23.12,9.42,8.98,3.66,18.31,7.68,25.39,10.59,1.16.52,2.51.6,3.7.17l2.91-1.2s15.3-6.42,21.28-8.85c9.06-3.69,23.65-9.84,23.65-9.84l1.4-.58c1.17-.45,2.16-1.35,2.68-2.49,2.92-7.06,6.6-16.87,9.93-24.68,3.19-7.5,9.82-23.25,10.4-24.6.48-1.09.55-2.48.09-3.61l-.6-1.45s-6.23-15.07-9.72-22.55c-2.22-4.76-7.7-19.32-10.14-25.19-.48-1.36-1.83-2.41-3.2-2.85,0,0-10.93-4.55-23.23-9.7-9-3.77-17.63-7.15-24.57-10.01-1.37-.7-3.01-.9-4.43-.21l-.19.16s-13.71,11.56-21.02,17.05c-6.36,4.77-16.86,14.07-16.86,14.07-.93.78-2.09,1.57-2.54,2.75-1.69,4.11-4.21,10.43-8.28,20.08-4.07,9.65-7.39,17.92-7.39,17.92-.18.44-.46,1.31-.34,1.87.04,1,5.16,13.14,7.82,19.29,2.34,5.42,6.47,15.47,8.73,20.92.39.74,1.04,1.33,1.8,1.65,4.96,2.07,12.9,4.96,17.14,7.07s14.23,5.83,19.98,8.24c.79.29,1.8.85,2.63.95,1.05.19,2.11-.38,3.01-.74l2.26-.94c3.64-1.52,11.91-4.65,18.27-7.06,6.35-2.41,14.28-6.49,15.68-7.06.82-.38,1.98-.66,2.6-1.44.39-.4.61-.93.82-1.43.3-.69,4.33-10.52,7.51-17.66,3.18-7.14,6.22-15.58,8.26-20.58l.06-.14.08-.22c.44-.99-.02-2.38-.4-3.18-.28-.7-7.62-18.01-9.99-24.27-2.38-6.26-3.98-9.3-5.78-13.64-.32-.83-1.05-1.6-1.91-1.9,0,0-8.52-3.01-17.92-5.91-10.03-3.09-20.81-6.95-20.84-6.96-.25-.1-.57-.27-1.09-.34-1.16-.25-2.23,1.1-2.96,1.67,0,0-5.46,3.89-11.19,9.45-5.65,5.49-14.82,13.43-15.78,14.31-.93,1-1.2,2.39-1.74,3.49-.76,1.85-2.27,6.3-4.66,11.3-3.03,6.32-5.47,13.27-5.77,14.01-.25.59-.12,1.41.11,1.94,0,0,3.79,9.35,5.51,13.24,1.72,3.89,5.95,14.5,6.31,15.03.37.65,1.24.95,1.87,1.21,0,0,6.2,2.21,10.68,4.41,4.47,2.2,13.39,5.52,16.72,6.88,1.08.41,2.16-.3,3.08-.65,1.89-.79,4.13-1.64,8.62-3.59,4.49-1.95,17.96-7.43,17.96-7.43.59-.24,1.04-.7,1.28-1.28,0,0,3.38-7.93,5.62-13.55,2.24-5.62,5.99-14.45,5.99-14.45.24-.59.24-1.23,0-1.82,0,0-3.58-7.93-5.91-14.27-2.33-6.35-5.68-13.73-5.68-13.73-.24-.59-.7-1.04-1.36-1.31,0,0-11.16-3.19-16.07-4.61-2.84-.82-11.64-3.32-11.64-3.32-.62-.26-1.57-.2-2.25.51,0,0-8.47,8.22-10.22,9.88-3.08,2.91-8.4,7.93-8.4,7.93-.27.32-.5.68-.66,1.07,0,0-2.32,6.02-3.5,8.95-1.66,4.16-3.98,9.09-3.98,9.09-.19.45-.19.95,0,1.4,0,0,2.92,7.13,3.74,9.05.82,1.92,3.92,9.48,3.92,9.48.19.45.54.8.99.99,0,0,5.73,2.44,8.68,3.6,2.95,1.16,9.85,4.08,9.85,4.08.45.19.94.19,1.39,0,0,0,7.38-2.86,10.1-4.18s8.42-3.49,8.42-3.49c.45-.19.8-.54.99-.99l5.03-12.88,2.65-5.64c.19-.45.19-.95,0-1.39l-7.61-18.5c-.19-.45-.54-.8-.99-.99l-17.46-4.26c-.9-.24-1.36-.03-2.06.57l-11.58,11.01c-.27.28-.58.62-.76,1.1,0,0-.73,1.41-2.05,4.94-1.32,3.53-2.72,6.56-2.72,6.56-.15.36-.15.76,0,1.12l4.76,11.5c.15.36.43.64.79.79l11.49,4.76c.36.15.76.15,1.12,0l11.5-4.76c.36-.15.64-.43.79-.79l4.76-11.5c.15-.36.15-.76,0-1.12l-2.91-6.55-1.85-4.95c-.15-.36-.43-.64-.79-.79l-9.82-2.07c-.58-.08-1.02.05-1.45.43,0,0-1.09,1.18-2.6,3.4-1.52,2.22-3.79,4.96-3.79,4.96l-.07.1s-.05.1-.1.21c0,0,0,0,0,0l-2.3,5.55c0,.08,0,.15,0,.23l.82,1.74c.17.37.33.74.47,1.12l.99,2.65c.06.07.12.13.19.21l2.47,1.22,3.07,1.07h.25s1.62-.54,2.79-.87c1.17-.34,2.75-1.42,2.75-1.42.06-.06.11-.11.17-.17,0,0,.67-1.16,1.43-2.99.76-1.83.86-2.55.86-2.55,0-.08,0-.16,0-.25l-2.29-5.54c-.06-.06-.11-.11-.17-.17,0,0-1.31-.69-3.03-1.39-1.71-.7-2.51-.91-2.51-.91h-.25l-2.96,1.22,4.83-6.32c.07-.02.12-.04.18-.07l4.74,1,4.75,1,4.75,11.43-1.07,3.14c-.66,1.95-1.45,3.85-2.37,5.7l-1.31,2.63-11.46,4.76-11.47-4.74-1.53-3c-1.12-2.19-2.04-4.48-2.74-6.84l-.49-1.63s1.61-3.45,2.86-6.91,1.91-4.61,1.91-4.61c.09-.24.27-.43.42-.58l11.53-10.96q.38-.32.7-.23l17.23,4.2c.06.05.14.12.2.17l7.61,18.5c0,.09,0,.16,0,.25l-7.68,18.52c-.06.06-.11.11-.17.17,0,0-2.64,1.31-8.96,4.05-6.32,2.74-9.57,3.62-9.57,3.62h-.25s-6.48-2.29-9.55-3.7c-3.08-1.41-8.97-3.98-8.97-3.98-.06-.06-.11-.11-.17-.17,0,0-2.55-5.67-3.99-9.23-1.44-3.56-3.68-9.29-3.68-9.29v-.25s2.37-6.13,3.68-9.08c1.33-2.99,3.8-8.96,3.8-8.96.1-.25.24-.47.36-.62,0,0,7.15-7.21,9.14-8.96,3.49-3.08,9.44-8.81,9.44-8.81.23-.23.49-.24.7-.16,0,0,9.91,2.4,12.14,2.94,4.41,1.08,15.57,4.99,15.57,4.99.21.09.38.26.47.47,0,0,3.55,9.11,5.81,14.03,2.26,4.92,5.78,13.97,5.78,13.97.09.21.09.45,0,.67,0,0-4.12,9.47-5.74,13.84-1.61,4.37-5.87,14.15-5.87,14.15-.09.21-.26.38-.47.47,0,0-15.91,6.8-18.73,7.75-2.82.95-6.14,2.53-8.69,3.58-.25.1-.63.27-.72.28-.32.12-.96-.25-1.24-.34-2.17-.91-12.16-5.07-16.54-6.89-4.39-1.83-8.19-3.41-10.73-4.47-.4-.19-.39-.45-.62-.95l-.34-.83s-3.26-7.83-5.46-13.26c-2.2-5.43-5.46-13.26-5.46-13.26-.23-.41-.06-.69.08-1.04,1.25-3,4.54-10.3,5.68-13.41,1.83-4.99,4.66-11.4,4.66-11.4l.69-1.65c.25-.62.38-.94.69-1.26l2.65-2.32c3.8-3.32,6.73-6.33,11.26-10.29,4.02-3.51,9.64-7.98,13-10.91l1.32-1.15c.11-.09.31.03.66.17.03.01,11.04,3.41,21.26,6.57,7.95,2.45,16.19,6.21,17.49,6.46.19.08.36.21.48.38.07.1.1.14.16.31l.23.57c2.12,5.13,4.35,11.12,7.21,17.5,2.86,6.37,6.07,14.78,8.57,20.85.14.41-.34,1.29-.47,1.64l-.94,2.26c-1.81,4.32-3.19,6.55-6.4,15.37s-5.94,14.27-8.21,19.7l-.12.28-.09.2c-.08.16-.21.3-.36.39-.07.05-.14.07-.37.17l-1.13.47c-4.47,1.84-7.4,3.57-15.55,7.06-6.9,2.96-13.64,4.96-18.45,6.94l-2.27.93-1.13.47c-.22.09-.34.1-.52.08-.09-.01-.16-.03-.25-.07l-.57-.24c-5.8-2.44-13.63-5.86-21-8.74-7.36-2.87-16.68-6.96-17.17-7.17-.17-.07-.32-.21-.41-.38,0,0-5.63-12.47-8.9-20.27-3.49-8.31-6.92-18.14-6.92-18.14l-.21-.5c-.05-.13-.06-.27-.03-.41,1.23-3.07,4.79-11.94,6.82-17.7,2.99-8.48,7.27-16.13,8.85-19.94.15-.31.29-.83.58-1.05.3-.25.97-.83,1.31-1.08,2.45-1.99,12.8-11.31,18.69-16.01,5.89-4.7,15.95-12.25,19.09-14.79.49-.11,1.05.25,1.45.38,7.39,3.06,18.15,7.89,23.8,10.23,5.65,2.34,17.34,6.94,23.93,9.66.46.23,1.11.31,1.28.94,2.5,6.07,8.68,20.58,11.09,26,2.66,5.99,8.95,22.83,9.16,23.18.24.47-.24,1.13-.35,1.54l-.58,1.4c-2.49,5.94-6.52,16.79-8.56,21.27s-7.64,17.68-10.75,25.06l-.26.63c-.07.14-.17.26-.3.35-.03.02-.07.04-.1.06l-.05.02-.16.06-1.41.58c-6.45,2.65-16.24,7.65-23.89,10.47-4.09,1.51-17.73,6.67-23.83,9.17-.16.06-.35.06-.51,0l-.23-.09-.7-.29s-16.47-6.13-25.11-9.95c-6.6-2.92-16.43-7.35-22.97-10.08-.17-.07-.39-.15-.48-.33-.05-.08-.02,0-.15-.33-2.25-5.46-8.15-18.52-11.65-26.33-3.51-7.84-7.46-20.13-8.56-22.75,0-.1,0-.18,0-.27l2.18-5.26s6.58-17.39,9.2-23.6c3.16-7.48,5.71-12.19,7.18-15.71.27-.63,1.33-3.26,1.6-3.79.11-.2.33-.27.49-.41,0,0,18.83-13.67,24.49-17.83,5.05-3.71,23.29-17.97,28.9-20.19,6.73,2.76,24.88,10.21,28.03,11.5,11.34,4.64,29.62,12.41,29.62,12.41.85.35,1.53,1.03,1.89,1.89,0,0,9.86,22.67,11.72,26.99,4.05,9.42,13.19,33.18,13.19,33.18.35.85.35,1.81,0,2.67Z"
  ],
  da2: [
    "m177.76,22.9c-19.49-20.75-47.28-14.49-79.14,3.32-13.11-7.33-22.17-12.41-39.46-14.63-18.23-2.34-33.09,1.94-39.2,9.8-13.88,17.86-12.98,46.8,4.83,78.66-17.81,31.86-21.43,63.28-4.83,78.66,11.48,10.64,42.74,16.01,78.66-4.83,31.86,17.81,60.52,18.62,77.48,6.65,14.57-10.29,14.3-32.81,11.64-43.9-2.71-11.28-7.6-22.81-15.3-36.58,17.81-31.86,21.1-60.34,5.32-77.15Z"
  ],
  sb0: [
    "m135.68,168.42c-11.1,0-24.25-3.83-38.04-11.42-25.53,14.05-48.88,15.23-61.07,3.03-12.19-12.19-11.01-35.54,3.03-61.07-14.05-25.53-15.03-48.68-2.83-60.87,11.68-11.68,33.4-11.3,57.68,1.14,2,1.03,4.38,1.03,6.39,0,24.27-12.43,45.4-12.22,57.08-.54h0s0,0,0,0c11.76,11.76,11.88,33.12-.81,57.6-.87,1.67-.99,3.74,0,5.34,15.38,24.95,17.03,47.05,1.61,58.4-7.4,5.45-13.57,8.38-23.03,8.39Zm-38.04-14.62c.25,0,.5.06.73.19,24.6,13.75,46.91,15.25,58.23,3.94,11.32-11.32,9.81-33.63-3.93-58.22-.25-.45-.25-1.01,0-1.47,13.75-24.59,15.25-46.9,3.93-58.22h0c-10.93-10.93-32.1-9.9-55.68,2.55-2.05,1.08-4.51,1.07-6.56,0-23.52-12.39-43.94-12.67-54.87-1.75-10.46,10.46-7.75,37.95,3.14,57.43.25.46.25,1.01,0,1.46-13.75,24.59-14.48,48.94-3.16,60.26,11.32,11.32,32.86,7.78,57.45-5.97.23-.13.48-.19.73-.19Zm29.23-1.16c-7.51,0-16.2-2.27-25.36-6.78-2.02-.99-4.38-1-6.4,0-18.1,8.92-34.42,9.1-43.27.25-9.37-9.37-6.54-27.46,1.9-46.46-10.52-19.36-10.17-37.04-.8-46.41,9.37-9.37,26.01-8.67,45.36,1.85,19.35-10.52,37.09-11.27,46.46-1.9h0s0,0,0,0c9.37,9.37,6.65,26.81-3.87,46.16,10.52,19.36,13.24,37.39,3.87,46.76-4.37,4.37-10.57,6.54-17.9,6.54Zm-28.55-13.77c.33,0,.65.08.95.25,17.64,9.86,33.56,11.01,41.56,3.02,8-8,6.84-23.92-3.02-41.56-.33-.59-.33-1.31,0-1.89,9.86-17.64,12.37-34.53,4.38-42.53h0c-8-8-25.28-5.87-42.92,3.99-.59.33-1.31.33-1.89,0-17.64-9.86-33.75-11.6-41.75-3.6-8,8-6.65,24.5,3.21,42.14.33.59.33,1.31,0,1.89-9.86,17.64-9.68,32.05-1.68,40.05,8,8,22.58,8.34,40.22-1.51.29-.16.62-.25.95-.25Zm17.57-5.47c-5.23,0-11.28-1.06-17.58-4.35-12.3,6.43-24.59,4.62-29.67-.69-3.68-3.84-4.32-12.44-2.58-19.67.7-2.93,2.9-5.33,4.53-8.51-6.42-12.3-6.42-23.36-.22-29.56,6.2-6.2,15.64-6.83,27.95-.41,12.3-6.42,23.63-6.62,29.83-.42h0c3.07,3.07,4.04,7.13,3.54,11.93-.53,5.15-2.39,11.71-5.64,17.92,7.18,11.25,7.16,21.72,1.69,29.01-2.56,3.42-6.87,4.73-11.86,4.73Zm-17.57-9.03c.49,0,.99.12,1.43.37,10.06,5.62,21.29,6.52,25.6,2.2,4.32-4.32,1.54-15.8-4.09-25.87-.5-.89-.5-1.97,0-2.86,5.62-10.06,6.54-22.06,1.75-24.98-5.21-3.17-13.2-2.16-23.26,3.46-.89.5-1.97.5-2.86,0-10.06-5.62-19.94-7.84-24.26-3.52-4.32,4.32-2.88,14.97,2.74,25.04.5.89.5,1.97,0,2.86-5.62,10.06-6.86,19.35-2.55,23.67,4.32,4.32,14,5.62,24.06,0,.44-.25.94-.37,1.43-.37Zm8.59-15.79c5.25-4.74,4.52-14.16,0-18.12-5.33-4.65-13.11-5-18.12,0-5.99,5.99-5,13.11,0,18.12,5,5,12.19,5.35,18.12,0Zm81.28,28.05c-4.07-10.52-6.9-22.97-15.7-36.58,17.81-31.86,21.1-60.34,5.32-77.15-19.49-20.75-47.28-14.49-79.15,3.32-13.11-7.33-22.17-12.41-39.46-14.63-18.23-2.34-33.09,1.94-39.2,9.8-13.88,17.86-12.98,46.8,4.83,78.66-17.81,31.86-22.83,64.96-4.83,78.66,18,13.7,42.74,16.01,78.66-4.83,31.86,17.81,58.93,18.02,75.89,6.05,14.57-10.29,17.4-33.57,13.63-43.3Zm-15.23,42.53c-15.76,12.29-43.09,9.75-74.29-7.69-35.16,20.4-59.63,19.29-74.22,6.36-22.28-19.75-14.65-46.6,2.78-77.8C9.8,68.85,7.87,41.84,21.47,24.36c5.98-7.69,20.71-13.21,38.56-10.92,16.93,2.17,25.8,8.28,38.64,15.45,31.19-17.44,57.21-25.89,76.94-6.19,15.98,15.95,11.64,46.15-5.79,77.34,7.53,13.48,13.46,24.77,16.11,35.82,2.6,10.85,5.58,28.85-12.97,43.31Z"
  ],
  sb1: [
    "m187.78,136.64c-2.71-11.28-7.6-22.81-15.3-36.58,17.81-31.86,21.1-60.34,5.32-77.15-19.49-20.75-47.28-14.49-79.14,3.32-13.11-7.33-22.17-12.41-39.46-14.63-18.23-2.34-33.09,1.94-39.19,9.8-13.88,17.86-12.98,46.79,4.83,78.66-17.81,31.86-22.83,64.96-4.83,78.66,18,13.7,42.74,16.01,78.66-4.83,31.86,17.81,60.52,18.62,77.48,6.65,14.57-10.29,14.3-32.81,11.64-43.89Zm-12.18-113.93c15.18,16.16,11.76,45.09-4.89,75.68-1.82-2.93-3.77-5.87-5.84-8.82,8.76-20.97,9.14-40.79-1.38-52.92-11.99-11.99-31.66-11.57-53.1-1.93-3.46-2.45-6.89-4.7-10.21-6.67,30.54-16.88,56.65-25.33,75.41-5.35Zm-22.43,95c.47,1.57.86,3.11,1.19,4.62-4.03,5-8.44,9.93-13.43,14.93-.86.78-1.7,1.52-2.53,2.27,4.07-4.27,5.94-9.98,5.8-16.53,2.74-3.29,5.3-6.64,7.66-10.02.54,1.61.99,3.19,1.32,4.73Zm-4.43,33.76c-6.14,6.14-15.74,8.18-27.43,5.97,7.12-5.8,14.3-12.27,20.88-18.93,4.66-4.66,8.84-9.23,12.64-13.78,2,11.38-.08,20.72-6.1,26.74Zm-106.55-27.42c4.71,5.58,9.98,11.24,15.83,16.9,6.11,6.11,12.36,11.77,18.65,16.85-12.17,2.48-22.16.46-28.49-5.87-6.23-6.23-8.27-15.99-5.99-27.87Zm1.99-38.95c-.61-2.04-1.09-4.02-1.47-5.95,5.28-6.77,10.65-13.04,15.36-17.96-4.31,4.97-5.85,11.61-4.99,19.12-2.63,3.17-5.09,6.35-7.35,9.53-.55-1.56-1.07-3.14-1.55-4.74Zm4.43-33.76c8.07-6.77,15.14-8.31,24.64-6.66-4.3,3.57-8.57,7.37-12.79,11.39-6.34,5.97-12.58,12.82-18.28,19.88-1.39-10.41.79-18.98,6.42-24.61Zm107.01,25.96c-4.19-5.19-8.7-10.35-13.56-15.44-5.84-5.91-12.27-11.82-18.85-17.27,11.03-1.72,20.08.44,25.97,6.33,7.18,8.57,8.55,16.01,6.44,26.38Zm-3.39,11.9c-2.48-3.42-5.15-6.82-8-10.2.38-6.88-1.27-12.99-5.24-17.55.63.64,1.24,1.26,1.82,1.87,5.37,6.08,10.05,11.56,14.21,16.69-.39,1.59-.84,3.23-1.36,4.97-.42,1.4-.9,2.81-1.42,4.23Zm-12.53,36.94c-2.7,3.2-5.36,6.07-7.85,8.45-1.95,1.95-3.85,3.79-5.72,5.54-3.67.65-7.6.74-10.84.46,4.02-3.25,8-6.81,11.88-10.69,4.46-4.46,8.45-9.01,12-13.58.71,3.56.89,6.85.53,9.81Zm-.45,2.51c-.76,3.14-2.19,5.83-4.3,7.95-1.7,1.43-4.08,2.42-6.72,3.08,1.49-1.39,2.97-2.81,4.44-4.28,2.29-2.2,4.48-4.46,6.59-6.75Zm-13.32,0c-4.21,4.13-8.68,8.06-13.25,11.61-.79-.13-1.51-.29-2.11-.47-2.48-.74-4.99-1.71-7.51-2.87,5.92-3.69,11.88-8.44,17.6-14.16,5.95-5.72,10.9-11.93,14.71-18.21,1.09,2.51,1.99,5.04,2.77,7.66.17.58.33,1.14.47,1.71-3.74,5.08-7.99,10.03-12.69,14.73Zm-40.27,11.62c-5.52-3.99-10.43-8.16-13.97-11.87-4.82-4.81-8.8-9.3-12.16-13.62.14-.83.3-1.57.49-2.19.73-2.43,1.69-4.95,2.84-7.5,3.75,5.84,8.47,11.68,14.06,17.27,6.26,6.26,12.66,11.27,18.91,15.05-2.43.78-5.08,1.38-8.56,2.42-.54.16-1.07.3-1.6.44Zm-11.77,1.13c-2.86-2.45-5.43-4.86-7.6-7.13-2.39-2.39-4.62-4.71-6.71-6.99-.53-3.32-.61-6.8-.38-9.75,3.32,4.19,6.99,8.32,11,12.33,3.91,4.06,8.02,7.76,12.23,11.1-3.07.55-5.94.69-8.55.42Zm-2.34-.36c-3.33-.71-6.17-2.17-8.37-4.38-1.54-1.83-2.57-4.47-3.21-7.36,1.78,1.94,3.62,3.87,5.52,5.78,1.98,2.06,4.01,4.04,6.07,5.96Zm-5.97-72.75c3.3-3.23,6.72-6.37,10.21-9.36,2.73.16,5.66.67,8.72,1.45-4.86,3.71-9.66,7.9-14.3,12.54-4.24,4.08-8.09,8.37-11.54,12.78-.72-3.02-1.12-5.97-1.18-8.72,2.57-2.95,5.26-5.86,8.1-8.69Zm-8.08,6.89c.18-5.02,1.6-9.3,4.46-12.16s7.07-4.14,12.01-4.14c-3.1,2.72-6.17,5.58-9.19,8.6-2.55,2.55-4.96,5.12-7.27,7.7Zm13.95-1.02c5.33-5.34,10.27-9.66,15.02-13.24.18.05.37.1.55.16,2.63.79,5.49,1.97,8.39,3.41-6.19,3.83-12.41,8.77-18.33,14.7-5.99,5.99-10.83,12.1-14.53,18.08-1.46-2.98-2.54-5.89-3.11-8.61-.03-.09-.05-.17-.07-.26,4.06-5.62,8.3-10.63,12.08-14.23Zm-11.06,26.82c-1.72,3.16-3.11,6.26-4.17,9.28-2.02-2.92-3.78-5.79-5.3-8.64,1.69-3.01,3.54-6.02,5.47-8.92,1.09,2.72,2.43,5.49,4,8.28Zm18.91,18.95c-5.7-5.82-10.88-12.33-14.58-18.66,3.75-7.18,8.97-14.44,15.18-20.65,7.45-7.45,13.01-11.94,17.88-14.92,2.55,1.38,5.1,2.94,7.53,4.62,4.34,3,9.83,7.28,13,10.6,6.95,6.94,11.53,12.97,14.77,18.93-2.41,4.37-5.26,8.7-7.77,12.16-2.8,3.86-10.84,11.79-13.09,13.93-5.23,5.24-8.72,7.94-11.93,9.62-7.24-3.75-14.45-9.09-21-15.63Zm43.58-60.93c3.3,2.83,6.54,5.83,9.7,8.98,2.51,2.56,4.97,5.2,7.34,7.89.06,3.05-.38,6.4-1.22,9.95-3.47-4.38-7.31-8.71-11.52-12.92-4.94-4.94-9.98-9.31-15.05-13.13,3.72-.91,7.37-1.12,10.75-.76Zm2.12.3c4.45.82,8.26,2.66,10.85,5.25,2.36,2.36,3.6,5.58,3.96,9.37-2.06-2.27-4.2-4.52-6.42-6.74-2.77-2.77-5.57-5.39-8.38-7.88Zm.69,15.08c4.4,4.49,8.57,9.28,12.29,14.15-.07.26-.14.52-.22.78-.65,2.16-1.63,4.52-2.81,6.93-3.72-5.96-8.49-11.95-14.24-17.71-5.9-6.14-12.33-11.22-18.81-15.1,2.52-1.22,4.94-2.11,7.46-2.9,5.63,4,11.13,8.64,16.32,13.83Zm11.86,26.34c1.41-2.64,2.61-5.29,3.58-7.89,2.02,2.89,3.87,5.78,5.49,8.64-1.52,2.77-3.21,5.53-5.05,8.26-1.04-2.95-2.39-5.97-4.02-9.02Zm4.49-10.5c1.05-3.25,1.74-6.42,2.05-9.46,2.69,3.25,5.24,6.55,7.61,9.87-1.09,2.8-2.36,5.62-3.81,8.43-1.77-2.94-3.72-5.89-5.86-8.84Zm-3.05-28.81c-4.72-4.72-11.2-6.61-18.6-6.07-3.24-2.68-6.48-5.17-9.72-7.47,1.47-.51,2.96-1,4.47-1.45,1.94-.58,3.82-1.05,5.66-1.42,7.01,5.75,13.39,11.57,18.19,16.41Zm-20.33-5.9c-2.99.37-6.11,1.1-9.31,2.2-2.9-2.07-5.8-3.95-8.68-5.65,2.8-1.39,5.6-2.59,8.45-3.64,3.22,2.19,6.4,4.56,9.54,7.08Zm-11.95,3.19c-2.36.94-4.75,2.07-7.17,3.38-2.99-1.65-5.98-3.03-8.92-4.13,2.49-1.68,4.94-3.17,7.38-4.49,2.92,1.57,5.83,3.32,8.71,5.25Zm-17.97-1.43c-2.89-.97-5.73-1.67-8.48-2.08,2.7-2.18,5.44-4.26,8.17-6.21,2.56,1.01,5.13,2.17,7.7,3.48-2.47,1.47-4.94,3.08-7.4,4.8Zm-10.22-2.3c-7.53-.78-14.23.74-19.19,4.91.89-.91,1.77-1.79,2.6-2.58,5.05-4.46,9.74-8.46,14.19-12.08,1.98.44,4.05.99,6.26,1.66,1.53.46,3.08.99,4.62,1.57-2.84,2.05-5.67,4.22-8.49,6.53Zm-25.2,26.96c.42,2.63,1.12,5.35,2.08,8.14-2.11,2.98-4.04,6-5.77,9.03-1.26-2.57-2.36-5.14-3.33-7.75,2.18-3.17,4.52-6.31,7.02-9.41Zm-4.99,19.51c-1.29,2.41-2.47,4.82-3.5,7.21-1.69-2.56-3.23-5.1-4.62-7.62,1.35-2.36,2.8-4.72,4.34-7.07,1.12,2.47,2.37,4.97,3.78,7.47Zm1.38,2.37c1.73,2.92,3.65,5.85,5.75,8.76-.84,2.8-1.39,5.51-1.65,8.1-2.8-3.36-5.28-6.62-7.5-9.83,1-2.3,2.14-4.66,3.4-7.03Zm3.98,18.27c-.42,7.25,1.54,13.47,5.93,17.9-.11-.11-.22-.22-.33-.33-5.87-6.09-11.44-12.05-16.56-18.1.29-1.22.61-2.46.98-3.72.58-1.92,1.31-3.93,2.16-5.99,2.41,3.43,5.01,6.85,7.81,10.24Zm6.04,18c4.45,4.41,10.55,6.33,17.55,6,3.62,3.05,7.32,5.89,11.05,8.48-2.08.76-4.12,1.38-6.08,1.8-1.2.36-2.37.66-3.53.94-6.44-5.25-12.79-11.05-18.98-17.22Zm19.7,5.83c2.42-.27,4.94-.78,7.52-1.54,3.26,2.34,6.57,4.45,9.89,6.32-2.2,1.17-4.37,2.22-6.5,3.09-3.81-2.54-7.5-5.2-10.92-7.88Zm10.66-2.58c2.94-1.07,5.94-2.43,8.97-4.08,3.19,1.72,6.33,3.1,9.38,4.16-2.94,2.11-5.88,4.03-8.81,5.73-3.22-1.77-6.44-3.74-9.54-5.81Zm20.6.8c3.14.93,6.16,1.51,9.03,1.7-3.53,3.01-6.95,5.67-10.31,8.04-2.53-1.04-5.14-2.27-7.76-3.65,3.01-1.84,6.03-3.88,9.03-6.1Zm10.51,1.77c5.8.14,10.88-1.3,14.86-4.31-6.58,5.86-12.41,10.91-17.59,15.21-1.14-.28-2.3-.57-3.48-.93-1.48-.44-3.01-.98-4.57-1.59,3.61-2.58,7.21-5.37,10.77-8.38Zm22.88-25.21c-.25-2.76-.84-5.65-1.74-8.63,2-2.8,3.83-5.61,5.48-8.39,1.29,2.45,2.4,4.87,3.3,7.23-2.28,3.4-4.65,6.7-7.04,9.79Zm5.12-19.44c1.56-2.8,2.94-5.58,4.13-8.32,1.62,2.35,3.14,4.71,4.55,7.05-1.58,2.79-3.28,5.58-5.04,8.31-1.09-2.33-2.29-4.68-3.64-7.04Zm4.73-9.72c1.28-3.08,2.31-6.1,3.11-9.05,2.1,2.65,4.06,5.2,5.89,7.7-1.29,2.79-2.74,5.64-4.32,8.49-1.46-2.38-3.02-4.76-4.68-7.14Zm3.77-11.7c2.91-12.92.97-24.09-6.2-31.26s-18.42-9.1-31.03-6.27c-2.85-2.29-5.71-4.48-8.55-6.53,2.78-1.08,5.49-1.93,8.1-2.52,18.21-5.69,33.11-3.94,41.96,4.91s10.6,23.75,4.91,41.96c-.8,2.55-1.82,5.23-3.01,7.97-1.96-2.75-4.01-5.51-6.17-8.26Zm-39.53-36.97c-3.19.85-6.47,1.99-9.8,3.39-2.63-1.79-5.25-3.45-7.86-5,3.2-1.81,6.37-3.38,9.45-4.69,2.78,2.04,5.52,4.15,8.2,6.3Zm-11.34,4.04c-2.68,1.18-5.38,2.53-8.1,4.05-2.57-1.44-5.11-2.72-7.62-3.84,2.64-1.8,5.27-3.47,7.89-4.99,2.62,1.48,5.23,3.08,7.83,4.78Zm-17.09-.4c-3.64-1.56-7.21-2.78-10.66-3.68,2.88-2.3,5.66-4.43,8.36-6.42,3.4,1.45,6.81,3.12,10.23,4.99-2.64,1.58-5.28,3.28-7.93,5.11Zm-13.43-4.33c-12.57-2.64-23.41-.64-30.42,6.38-7.27,7.27-9.08,18.24-6.34,30.72-2.01,2.59-3.94,5.19-5.77,7.78-.9-2.38-1.73-4.78-2.49-7.23-5.69-18.21-3.94-33.11,4.91-41.96,12.86-10.72,23.75-10.6,41.96-4.91,2.31.72,4.64,1.55,6.98,2.49-2.94,2.13-5.88,4.38-8.82,6.74Zm-36.02,40.12c.9,3.31,2.1,6.71,3.59,10.16-1.6,2.35-3.11,4.69-4.51,7.02-1.71-3.23-3.21-6.46-4.54-9.72,1.77-2.51,3.6-5.01,5.46-7.46Zm-1.58,18.32c-1.85,3.15-3.53,6.28-5.01,9.37-2.17-3.05-4.21-6.16-6.1-9.36,1.92-3.09,4.01-6.26,6.22-9.42,1.45,3.11,3.07,6.26,4.89,9.42Zm.89,1.5c1.49,2.52,3.09,5.05,4.81,7.58-1.38,3.31-2.51,6.6-3.37,9.81-2.16-2.62-4.23-5.27-6.2-7.96,1.41-3.14,2.99-6.29,4.76-9.44Zm.86,19.79c-2.91,12.84-1.41,24.44,5.43,32.3,8.08,8.08,20.16,9.6,33.73,5.89,2.65,2.06,5.3,4.02,7.94,5.86-3.32,1.36-6.68,2.55-10.13,3.63-18.21,5.69-33.11,3.94-41.96-4.91-10.72-12.86-10.6-23.75-4.91-41.96.95-3.03,2.09-6.09,3.4-9.16,2.02,2.76,4.18,5.55,6.48,8.35Zm41.06,37.63c2.97-.91,6.01-2.06,9.09-3.44,2.55,1.7,5.11,3.29,7.68,4.75-3.03,1.65-6.04,3.11-9.08,4.42-2.57-1.81-5.13-3.72-7.69-5.73Zm11-4.34c2.13-1.02,4.27-2.14,6.43-3.37,2.66,1.42,5.31,2.68,7.95,3.78-2.28,1.53-4.54,2.93-6.79,4.21-2.55-1.46-5.09-3.02-7.59-4.63Zm15.41.84c2.73,1.1,5.44,2.02,8.11,2.77-2.54,2.07-4.92,3.96-7.16,5.67-2.55-1.23-5.14-2.59-7.73-4.05,2.26-1.37,4.52-2.83,6.78-4.38Zm10.8,3.46c13.03,3.06,24.83,1.62,32.79-5.32,7.91-7.91,9.53-19.65,6.11-32.88,2.36-2.97,4.58-5.95,6.67-8.95,1.46,3.46,2.59,6.83,3.31,10.05,5.69,18.21,3.94,33.11-4.91,41.96-8.85,8.85-23.75,10.6-41.96,4.91-3.13-.98-6.44-2.29-9.83-3.84,2.57-1.86,5.18-3.84,7.82-5.93Zm38.25-40.5c-.86-2.87-1.94-5.81-3.24-8.78,1.87-2.81,3.61-5.64,5.21-8.48,1.65,2.85,3.13,5.68,4.39,8.45-2.03,2.99-4.13,5.92-6.36,8.81Zm2.69-18.6c1.6-2.92,3.06-5.85,4.35-8.76,2.07,2.87,3.98,5.67,5.77,8.46-1.79,2.97-3.62,5.85-5.51,8.69-1.38-2.78-2.93-5.58-4.61-8.39ZM98.67,28.91c3.26,2.04,6.58,4.3,9.89,6.68-3.1,1.46-6.23,3.1-9.38,4.94-3.42-1.97-6.81-3.72-10.15-5.25,3.23-2.34,6.37-4.49,9.45-6.48.06.04.12.07.18.1Zm-77.2-4.53c5.98-7.69,20.71-13.21,38.56-10.92,15.98,2.05,24.79,7.61,36.52,14.26-3.25,2.04-6.51,4.23-9.78,6.55-21.73-9.34-41.07-9-52.15,2.08-11.48,11.48-11.24,30.97-1.97,52.31-2.3,3.31-4.42,6.57-6.32,9.73-16.58-30.49-18.21-56.85-4.86-74.02Zm2.98,153.47c-21.82-19.34-14.95-45.5,1.73-75.88,1.98,3.28,4.18,6.61,6.6,10-10.29,22.59-10.31,42.84,1.13,54.28,11.98,11.98,32.66,11.2,55.08.72,2.79,1.89,5.57,3.66,8.32,5.28-34.43,19.59-58.46,18.35-72.86,5.59Zm74.21-6.36c-2.71-1.62-5.42-3.37-8.13-5.23,2.92-1.42,5.86-3.01,8.82-4.74,2.69,1.5,5.37,2.86,8.04,4.1-3.13,2.34-5.97,4.33-8.56,5.97-.06-.03-.12-.06-.17-.1Zm74.29,7.69c-15.17,12.92-42.02,9.87-72.47-6.69,2.85-1.76,5.84-3.76,8.92-5.95,21.67,9.54,42.32,10.25,54.81-.58,12.34-12.34,11.53-32.82,1.05-54.99,1.99-2.92,3.88-5.87,5.67-8.88,6.99,12.59,12.46,23.31,14.98,33.79,2.6,10.85,4.93,28.06-12.97,43.3Z"
  ],
  sb2: [
    "m187.82,136.64c-2.71-11.28-7.61-22.83-15.3-36.6,17.82-31.88,21.11-60.37,5.32-77.19-19.5-20.76-47.31-14.49-79.19,3.32-13.12-7.33-22.18-12.42-39.48-14.64-18.24-2.34-33.11,1.94-39.22,9.8-13.89,17.86-12.98,46.82,4.83,78.7-17.82,31.88-22.85,64.99-4.83,78.7,18.01,13.71,42.77,16.02,78.7-4.83,31.88,17.82,60.55,18.63,77.52,6.65,14.58-10.29,14.31-32.83,11.65-43.92Zm-12.18-113.99c14.89,15.86,11.9,44-3.93,73.95-1.12-7.69-6.45-14.74-14.77-20.53.7-3.09,1.11-6.09,1.18-8.97.2-8.27-2.64-15.57-6.8-20.56-4.65-4.65-11.99-5.44-19.66-5.44-2.95,0-6.06.33-9.3.97-6.36-8.61-14.25-13.46-22.82-13.71,30.83-17.12,57.19-25.84,76.1-5.71Zm-24.64,122.64c-.61,1.13-1.12,1.76-1.81,2.53-1.85,2.04-3.39,3.55-5.49,5.01-3.45,2.4-7.57,3.84-11.93,3.49-2.93,0-6.01-.33-9.22-.97,4.24-5.79,8.15-12.75,10.6-21.42,7.88-3.06,15.23-6.52,21.37-10.41,1.38,8.5-.09,15.47-3.52,21.77Zm-20-15.98l-1.74.55-.74,1.93c-2.52,8.92-6.05,16.61-10.3,22.52-5.86-1.64-12.05-4.25-18.38-7.78l-1-.56-1,.56c-6.33,3.54-12.52,6.15-18.38,7.78-4.25-5.91-7.77-13.6-10.3-22.52l-.55-1.93-1.93-.55c-4.68-1.32-9.5-2.38-13.43-4.22-3.16-1.48-5.85-3.32-8.28-5.24,1.8-6.04,4.63-12.53,8.37-19.23-4.04-7.23-6.87-14.32-8.45-20.89,5.81-4.02,13.24-7.36,21.79-9.78l1.93-.55.55-1.93c.65-2.28,1.58-6.76,2.36-8.88,2.09-5.72,4.66-9.96,7.57-13.75,5.97,1.63,12.3,4.28,18.76,7.89l1,.56,1-.56c6.33-3.54,12.52-6.15,18.38-7.78,4.25,5.91,7.78,13.6,10.3,22.52l.74,1.35,1.93.55c8.61,2.44,16.6,5.8,22.62,9.85-1.6,6.09-4.3,12.64-8.08,19.4l-.56,1,.56,1c3.83,6.85,6.36,12.91,7.81,18.36-5.91,4.25-13.62,7.79-22.55,10.32Zm-49.02,28.19c-.45-.51-.88-1.05-1.31-1.6,5.84-1.69,11.98-4.29,18.18-7.76,6.2,3.47,12.34,6.07,18.18,7.76-.43.55-.87,1.09-1.31,1.6-3.61,4.17-9.47,9.14-16.87,9.14s-13.26-4.97-16.87-9.14Zm-38.31-32.41c5.86,3.58,12.94,6.59,20.89,8.84,1.11,3.91,3.58,11.5,5.01,15.03,1,2.46,2.11,4.71,3.29,6.79-2.39.37-4.7.57-6.93.57-7.44,0-13.33-2.11-17.5-6.28-5.59-5.59-6.95-14.4-4.77-24.95Zm.2-40.25c1.27,4.56,3.92,10.21,6.48,14.79-3.48,6.22-6.09,12.37-7.77,18.23-.54-.46-1.07-.91-1.59-1.36-4.17-3.61-9.13-9.47-9.13-16.87s4.97-13.26,9.13-16.87c.61-.53,1.26-1.05,1.92-1.56.3,1.22.62,2.43.96,3.65Zm5.77-34.43c4.17-4.17,8.85-7.48,16.29-7.48,2.63,0,5.4.28,8.26.8-4.53,6.2-7,12.25-9.64,21.59-8.07,2.28-14.87,5.93-20.55,9.84-1.64-10.47.17-19.28,5.64-24.75Zm49.21-17.79c7.4,0,13.26,4.97,16.87,9.14.45.51.88,1.05,1.31,1.6-5.84,1.69-11.98,4.29-18.18,7.76-6.32-3.53-12.57-6.17-18.51-7.85.63-.77,1.27-1.53,1.92-2.28,3.61-4.17,9.19-8.36,16.59-8.36Zm55.98,42.04c-5.52-3.49-12.17-6.46-19.65-8.74-1.26-.38-2.24-1.36-2.62-2.62-2.34-7.68-5.4-14.26-9.01-19.57,2.85-.52,5.6-.79,8.23-.79,7.44,0,13.33,2.11,17.5,6.28,5.67,5.67,7.49,14.68,5.57,25.45Zm-7.47,24.96c3.6-6.45,6.5-12.87,8.38-19.02.68.51,1.33,1.03,1.95,1.56,4.17,3.61,8.17,10.06,8.17,17.46s-4.97,13.26-9.13,16.87c-.51.44-1.05.88-1.6,1.31-1.69-5.84-4.29-11.98-7.76-18.18ZM21.42,24.31c5.98-7.69,20.72-13.22,38.58-10.93,16.55,2.12,25.42,8.01,37.79,14.98-5.79.18-11.49,1.94-16.08,6.66-2.45,2.52-4.5,4.82-6.27,7.06-3.27-.65-6.42-.99-9.4-.99-7.67,0-14.82,1.81-19.47,6.45-6.64,6.64-6.91,17.61-4.67,29.1-3.42,2.5-6.41,5.05-8.98,7.36-4.21,3.77-6.55,8.59-7.05,13.59-16.2-30.18-17.69-56.26-4.45-73.29Zm2.99,153.55c-21.75-19.28-15.01-45.32,1.53-75.55,1.02,7.97,6.57,15.27,15.28,21.2-2.19,11.5-.41,21.44,5.95,27.81,4.65,4.65,11.2,6.85,18.88,6.85,2.5,0,5.12-.24,7.83-.7,5.92,9.45,13.8,14.47,22.79,15.16-34.11,19.22-57.94,17.92-72.25,5.23Zm148.58,1.33c-15.14,12.9-41.9,9.89-72.27-6.57,4.63-.45,8.98-2.58,12.74-6.56,2.53-2.68,5.24-5.68,7.86-9.09,3.61.78,7.07,1.18,10.33,1.18,7.67,0,14.23-2.2,18.88-6.85,6.57-6.57,8.26-16.95,5.74-28.93,8.2-5.52,13.92-11.89,15.32-19.22,6.7,12.12,11.93,22.52,14.37,32.7,2.61,10.86,4.94,28.07-12.97,43.33Z"
  ],
  sb3: [
    "m187.8,136.62c-2.71-11.28-7.6-22.82-15.3-36.59,17.81-31.87,21.11-60.36,5.32-77.17-19.5-20.76-47.3-14.49-79.17,3.32-13.11-7.33-22.18-12.42-39.47-14.63-18.24-2.34-33.1,1.94-39.21,9.8-13.89,17.86-12.98,46.81,4.83,78.68-17.81,31.87-22.84,64.98-4.83,78.68,18,13.7,42.76,16.01,78.68-4.83,31.87,17.81,60.54,18.63,77.51,6.65,14.58-10.29,14.3-32.82,11.64-43.91Zm-14.83,42.54c-15.48,13.18-43.11,9.75-74.31-7.69-35.17,20.41-59.65,19.3-74.24,6.36-22.29-19.76-14.66-46.61,2.78-77.82C9.76,68.81,7.84,41.8,21.43,24.31c5.98-7.69,20.72-13.21,38.58-10.92,16.94,2.17,25.81,8.28,38.65,15.46,31.2-17.44,57.88-26.51,76.96-6.19,15.46,16.46,11.65,46.16-5.79,77.36,7.54,13.48,13.46,24.78,16.11,35.83,2.61,10.86,4.94,28.07-12.97,43.32Z",
    "m26.43,70.65c2.21,9.23,6.22,18.66,12.51,29.92-14.57,26.06-18.15,50.25-4.35,63.1,14.94,13.92,38.68,11.85,64.74-2.72,10.72,5.99,18.06,10.83,32.28,11.97,11.43.92,24.91-1.29,33.76-10.14,11.72-11.72,8.92-36.15-5.65-62.22,14.57-26.06,15.74-54.03,3.95-64.34-12.01-10.5-34.96-13.09-64.34,3.95-26.06-14.57-49.5-15.23-63.38-5.44-11.92,8.41-11.7,26.84-9.52,35.9Zm15.09-31.57c12.03-10.25,33.52-7.58,57.78,5.98,27.35-15.87,46.38-15,57.72-4.95,17.33,15.36,11.4,36.24-2.16,60.5,13.56,24.26,17.54,43.27,6.97,56.87-4.65,5.98-18.59,12.27-32.48,10.49-13.17-1.69-20.07-6.44-30.05-12.02-24.26,13.56-44.25,20.76-61.05,3.96-12.41-12.41-7.85-35.04,5.71-59.3-5.86-10.48-10.46-19.27-12.53-27.85-2.03-8.44-3.84-21.82,10.08-33.68Z",
    "m145.23,54.22c-8.41-7.82-28.86-6.39-46.31,2.34-19.37-10.67-37.23-11.73-46.31-2.34-7.3,7.54-8.33,26.94,2.34,46.31-10.86,22.24-11.58,37.08-2.34,46.31,4.24,4.24,10.27,6.34,17.42,6.34,8.43,0,18.42-2.92,28.89-8.69,19.37,10.67,36.8,10.22,46.31,2.34,10.06-8.33,7.73-26.06-2.34-46.31,10.67-19.37,11.91-37.42,2.34-46.31Zm-46.31,4.88c1.96,1.18,9.61,5.49,9.61,11.28,0,5.04-3.76,10.39-9.63,9.52-4.98-.74-8.84-4.11-9.14-9.14-.46-7.68,7.2-10.5,9.17-11.67Zm-.05,82.89c-1.96-1.18-9.46-6.26-9.46-12.03,0-5.04,4.45-8.77,9.49-8.77s9.74,3.84,9.74,8.88c0,5.86-7.8,10.76-9.77,11.92Zm45.14,3.33c-8.4,8.4-26.42,8.07-43.11-2.12,2.99-1.91,8.85-6.69,8.85-12.91s-4.66-11.19-10.85-11.19-10.93,5.77-10.93,11.96,5.98,10.25,8.92,12.16c-18.11,9.69-35.23,11.12-43.19,2.32-9.39-10.39-7.16-24.88,2.53-43,1.91,2.99,6.65,9.23,12.88,9.23s11.22-5.03,11.22-11.22-5.03-11.22-11.22-11.22-10.96,6.24-12.88,9.19c-9.69-18.12-10.51-34.39-2.15-42.82,6.48-6.53,12.56-6.82,16.75-6.53,7.96.55,16.28,3.45,26.1,8.7-2.97,1.9-9.44,6.72-8.96,12.07.55,6.16,5.31,12.15,11.5,11.83,8.4-.44,10.89-4.82,10.65-11-.26-6.9-6.28-10.99-9.22-12.9,18.13-9.71,33.86-9.92,42.86-2.17,10.64,9.16,7.54,24.74-2.19,42.88-1.9-2.97-8.62-9.19-12.89-9.26-6.19-.1-11.22,5.03-11.22,11.22s6.77,11.29,11.22,11.22c6.21-.09,11.02-6.32,12.91-9.25,9.7,18.13,10.82,34.4,2.42,42.8Zm-86.56-44.8c1.18-1.96,5.89-9.11,11.67-9.11,5.04,0,9.14,4.1,9.14,9.14s-4.1,9.14-9.14,9.14c-5.86,0-10.5-7.19-11.67-9.16Zm82.89.05c-1.18,1.96-5.89,9.11-11.67,9.11-5.04,0-10.31-4.15-9.76-9.46.62-5.94,4.72-8.82,9.76-8.82,5.86,0,10.5,7.19,11.67,9.16Z"
  ],
  da3: [
    "m184.63,15.97c0-1.1-.9-2-2-2,0,0-26.9-.67-48.22-1.27-15.52-.44-40.74.71-40.74.71-21.06,1-38.77,8.15-52.76,20.62-16.06,14.32-26.26,35.09-26.52,58.24,0,.58-.02,1.16-.06,1.74-.3,4.66-1.72,27.9-.96,44.17.89,19.07,1.01,44.05,1.01,44.05,0,1.1.9,2,2,2,0,0,26.26.87,36.45,1.4,17.84.93,54.65-1.45,54.65-1.45,21.06-.54,40.07-9.26,53.96-23.15,14.33-14.33,23.2-34.13,23.2-56,0,0,.11-27.59.55-43.99.41-15.08-.55-45.06-.55-45.06Z"
  ],
  sb4: [
    "m117.04,81.72c8.72-8.75,19.57-19.6,26.54-26.56,1.59,1.39,3.65,2.25,5.92,2.33,5.23.16,9.05-3.99,9.76-9.17.73-5.31-3.94-9.6-9.17-9.76-4.29-.13-9.6,3.94-9.76,9.17-.07,2.17.61,4.18,1.78,5.81-6.91,7-17.74,17.96-26.57,26.82-3.44-2.89-7.7-4.92-12.28-5.78.91-3.72,1.74-7.13,2.4-9.86,1.53-.03,3.07-.53,4.2-1.66,2.43-2.43,2.43-6.38,0-8.81-2.43-2.43-6.14-2.17-8.81,0-2.74,2.22-2.43,6.38,0,8.81.56.56,1.32,1,2.16,1.28-.63,2.75-1.42,6.2-2.29,9.9-.87-.09-1.74-.13-2.62-.13-4,0-8.28,1.38-12.16,3.77-4.68-9.16-9.24-18.15-12.2-23.97.55-.37,1.06-.82,1.48-1.36,2.46-3.16,1.89-7.71-1.27-10.17-3.16-2.46-7.39-1.61-10.17,1.27-2.84,2.96-1.89,7.71,1.27,10.17,1.56,1.21,4.03,1.64,6.29,1.11,3.11,6.16,8.19,15.89,12.64,24.26-3.24,2.36-6.08,5.44-8.09,9l-19.96-8.93c1.42-3.93-.92-8.35-4.83-10.1-3.53-1.58-9.34,0-11.25,4.3-1.92,4.3,0,9.34,4.3,11.25,3.89,1.74,8.03.13,10.52-3.21l20.07,8.98c-1.21,2.76-1.9,5.76-1.9,8.88,0,2.06.25,4.07.72,5.99-2.61.73-4.41,1.23-5.04,1.42-2.54.76-5.09,1.41-7.44,2.02-.04-.06-.06-.13-.1-.19-1.39-2.01-4.01-2.3-6.15-1.13-2.2,1.2-2.52,4.14-1.13,6.15,1.14,1.65,4.14,2.52,6.15,1.13,1.33-.92,1.99-2.43,1.89-3.93,4.17-1.24,8.29-2.41,12.37-3.55,1.07,3.23,2.77,6.18,4.96,8.69-9.57,9.45-19.92,19.73-26.27,26.02-1.43-1.02-3.18-1.65-5.02-1.71-3.86-.12-8.63,3.55-8.78,8.25-.15,4.7,3.55,8.63,8.25,8.78,4.7.15,8.14-3.59,8.78-8.25.28-2.08-.35-3.98-1.55-5.48,6.38-6.26,16.75-16.43,26.3-25.83,2.41,2.27,5.25,4.06,8.4,5.25-1.18,5.83-2.31,11.59-3.12,15.7-1.47.1-2.96.69-4.22,1.71-2.74,2.22-2.43,6.38,0,8.81,2,2,6.38,2.43,8.81,0,2.43-2.43,2.43-6.38,0-8.81-.7-.7-1.51-1.17-2.37-1.44.58-3.96,1.47-9.52,2.64-15.38,2.27.67,4.66,1.03,7.15,1.03,3.34,0,6.43-.66,9.24-1.84l13.82,26.92c-.25.21-.5.43-.73.68-2.74,2.85-1.82,7.44,1.23,9.81,2.5,1.95,7.44,1.82,9.81-1.23,2.37-3.05,1.82-7.44-1.23-9.81-2.12-1.65-4.75-1.75-7.06-.72-3.67-7.03-9.39-17.97-13.97-26.53,4.6-2.44,8.3-6.37,10.78-11.17l20.53,9.19c-1.06,3.97.87,8.24,4.75,9.97,4.3,1.92,8.9-.23,11.25-4.3,2.42-4.17,0-9.33-4.3-11.25-3.22-1.44-8.33-.24-10.66,3.25l-20.49-9.17c1.16-2.81,1.94-5.85,2.28-9.03.22-2.13.12-4.19-.25-6.15,1.93-.64,3.85-1.29,5.76-1.97.09.16.16.33.27.49,1.42,2.06,5.15,3.13,7.65,1.41,2.5-1.72,3.13-5.15,1.41-7.65-1.72-2.5-4.98-2.86-7.65-1.41-1.84,1-2.6,2.98-2.39,4.94-1.74.61-3.63,1.25-5.63,1.9-1.09-3.49-3.08-6.61-5.68-9.18Zm4.52,17.42c-.68,6.47-3.31,12.38-7.4,16.65-4.27,4.45-9.75,6.81-15.86,6.81-12.82,0-23.25-10.43-23.25-23.25,0-5.92,2.73-11.75,7.7-16.39,4.58-4.29,10.4-6.85,15.55-6.85,6.92,0,13.73,2.98,18.22,7.96,3.82,4.25,5.61,9.6,5.04,15.07Zm-23.56,15.26c-8.13,0-14.72-6.59-14.72-14.72s8.04-14.72,14.72-14.72c8.13,0,15.59,6.44,14.72,14.72-.85,8.09-6.59,14.72-14.72,14.72ZM184.63,15.97c0-1.1-.9-2-2-2,0,0-26.9-.67-48.22-1.27-15.52-.44-40.74.71-40.74.71-21.06,1-38.77,8.15-52.76,20.62-16.06,14.32-26.26,35.09-26.52,58.24,0,.58-.02,1.16-.06,1.74-.3,4.66-1.72,27.9-.96,44.17.89,19.07,1.01,44.05,1.01,44.05,0,1.1.9,2,2,2,0,0,26.26.87,36.45,1.4,17.84.93,54.65-1.45,54.65-1.45,21.06-.54,40.07-9.26,53.96-23.15,14.33-14.33,23.2-34.13,23.2-56,0,0,.11-27.59.55-43.99.41-15.08-.55-45.06-.55-45.06Zm-4.42,47.27c-.42,15.46-.52,41.45-.52,41.45,0,20.61-8.35,39.26-21.86,52.77-12.04,12.04-28.19,19.97-46.15,21.55-2.02.12-1.99.32-6.61.51-.78,0-29.61,1.4-49.56,1.12-9.61-.14-34.34-1.32-34.34-1.32-1.04,0-1.88-.84-1.88-1.88,0,0-.12-23.54-.96-41.5-.71-15.2.6-36.85.9-41.5.04-.63.06-1.25.07-1.88.28-21.76,9.88-41.28,24.98-54.74,13.19-11.76,31.44-18.52,49.51-19.52,0,0,23.98-1,38.6-.58,20.08.57,45.43,1.2,45.43,1.2,1.04,0,1.88.84,1.88,1.88,0,0,.9,28.24.52,42.45Z"
  ],
  sb5: [
    "m184.63,15.97c0-1.1-.9-2-2-2,0,0-26.9-.67-48.22-1.27-15.52-.44-40.74.71-40.74.71-21.06,1-38.77,8.15-52.76,20.62-16.06,14.32-26.26,35.09-26.52,58.24,0,.58-.02,1.16-.06,1.74-.3,4.66-1.72,27.9-.96,44.17.89,19.07,1.01,44.04,1.01,44.04,0,1.1.9,2,2,2,0,0,26.26.87,36.45,1.4,17.84.93,54.65-1.45,54.65-1.45,21.06-.54,40.07-9.26,53.96-23.15,14.33-14.33,23.2-34.13,23.2-56,0,0,.11-27.59.55-43.99.41-15.08-.55-45.06-.55-45.06Zm-4.42,47.27c-.42,15.46-.52,41.45-.52,41.45,0,20.61-8.35,39.26-21.86,52.77-12.04,12.04-28.19,19.97-46.15,21.55-2.02.12-1.99.32-6.61.51-.78,0-29.61,1.4-49.56,1.12-9.61-.14-34.34-1.32-34.34-1.32-1.04,0-1.88-.84-1.88-1.88,0,0-.12-23.54-.96-41.5-.71-15.2.6-36.85.9-41.5.04-.63.06-1.25.07-1.88.28-21.76,9.88-41.28,24.98-54.74,13.19-11.76,31.44-18.52,49.51-19.52,0,0,23.98-1,38.6-.58,20.08.57,45.43,1.2,45.43,1.2,1.04,0,1.88.84,1.88,1.88,0,0,.9,28.24.52,42.45Z",
    "m126.23,37.79c-3.52-3.72-7.94-6.69-12.94-8.93-4.25-1.9-8.78-2.57-13.34-1.96-9.82,1.31-17.7,3.62-24.37,10.67-20.43,1.37-34.74,17.37-35.74,36.09-.02.48-.03.96-.03,1.43-13.15,13.29-14.27,34.42-.48,49.08.05.05.1.09.15.14-1.21,20.81,14.44,34.83,35.52,34.92,6.76,7.28,16.29,10.57,26.09,10.67,4.55.05,9.45-.62,13.65-2.75,3.76-1.9,7.26-4.5,10.33-7.64.01,0,.03,0,.04,0,20.31.3,36.21-16.12,36.18-34.58.41-.41.81-.83,1.2-1.26,13.5-11.31,11.35-35.42-1.04-51-1.5-21.16-16.98-35.5-35.22-34.88Zm33.15,35.66c.16,8.86-3.24,17.25-9.02,23.55-5.76-5.84-13.35-9.37-21.65-9.78,5.36-5.81,8.79-13.57,9.21-22.55,7.23-.03,14.36,1.93,20.3,7.14.39.41.77.83,1.15,1.26,0,.13.01.26.02.39Zm-35.8,84.08c-8.59-.36-16.27-3.49-22.01-8.57,6.12-5.79,9.93-13.45,10.37-21.45,6.47,4.37,14.6,6.47,22.82,7.27-.91,8.44-5.14,16.65-11.18,22.75Zm-47.66-.46c-5.99-6.47-9.78-14.36-10.3-22.61,8.35.38,16.68-2.51,23.34-8.12.31,8.99,3.9,16.76,9.67,22.52-5.92,5.12-12.46,7.44-22.71,8.2Zm-14.77-26.13c-7.04-.93-14.06-2.89-19.42-7.38.85-7.79,4.76-15.68,10.47-21.96,5.64,4.53,12.84,7.4,20.85,8.07-5.26,5.55-8.74,12.95-9.44,21.52-.82-.06-1.64-.14-2.45-.25Zm-19.21-54.91c.09-.09.18-.19.27-.28,9.11-9.19,12.22-10.93,22.26-11.35,0,.28,0,.57,0,.85.23,8.4,3.59,15.84,9.04,21.94-7.87,1.09-15.29,5.31-21.19,11.13-2.97-2.73-5.5-5.89-7.51-9.31-2.17-3.71-2.9-8.23-2.88-12.96Zm34.69-35.9c.16-.17.33-.33.49-.5,9.39-.35,17.91,2.96,23.93,9.54-5.99,5.92-10.19,13.56-11.45,21.48-6.65-5.68-14.8-8.57-23.01-8.46.62-7.89,4.42-15.99,10.05-22.05Zm48.71-.17c5.98,6.14,9.83,14.36,10.48,22.83-8.31.81-16.63,5.09-23.67,13.3.02-.79.02-1.59-.02-2.39-.41-9.51-3.61-17.7-8.63-23.88,5.96-5.54,13.62-9.3,21.85-9.86Zm9.58,92.71c-8.34-.18-16.63-2.99-22.94-7.58-.02-.67-.06-1.33-.13-2-.58-6.75-2.4-12.73-5.12-17.81,5.34,2.94,11.6,4.65,18.36,4.8,5.83,5.56,9.47,13.24,9.86,21.87,0,.24-.02.47-.03.71Zm-80.94-32.94c5.93-5.81,13.45-9.88,21.39-10.61.06.06.11.11.17.17,5.81,5.65,13.79,8.56,22.32,9.05.14.15.28.29.42.44-8.81.11-16.94,3.35-23.12,8.85-8.29-.22-15.46-3.25-21.16-7.9Zm12.52-35.41c8.08-.06,16.11,2.44,22.51,8.47.11.11.2.23.3.34-.02.26-.05.52-.06.79-.28,6.22.98,11.92,3.44,16.88-5.14-2.82-10.95-4.19-16.98-3.87-.18.01-.36.04-.54.05-5.47-5.87-8.42-13.57-8.67-21.75,0-.3,0-.61,0-.91Zm29.96,22.1c1.16,2.76,1.95,5.71,2.37,8.73-.77-.69-1.57-1.33-2.38-1.94-3.26-4.93-5.11-10.87-5.07-17.44,2.18,3.29,3.6,7.11,5.09,10.65Zm-.5,9.66c-7.02-.6-13.74-2.74-18.71-7.07,6.33-.12,12.34,1.76,17.43,5.28.41.61.83,1.21,1.28,1.79Zm8.12,4.94c7.04.51,13.32,2.96,18.35,6.8-6.83-.53-13.03-2.79-18.06-6.39-.1-.14-.19-.27-.29-.4Zm-7.81.04c-4.96,3.63-10.97,5.99-17.56,6.5,4.97-3.66,11.02-5.97,17.56-6.5Zm5.43.88c.52.41,1.05.81,1.6,1.2,3.47,5.22,5.77,11.7,6.39,19.13.03.29.04.6.05.93-5.16-5.78-7.81-12.32-8.27-18.87.1-.79.18-1.59.23-2.39Zm24.23,5.99c-5.75-5.29-13.42-8.66-22.26-9.12.16-.14.31-.29.47-.43,8.58-.33,16.47-3.62,22.47-9.08,8.61-.17,16.5,3.21,22.36,9.12-5.91,5.73-13.94,9.39-23.05,9.51Zm-18.61-12.04c4.59-3.25,9.87-5.49,15.47-6.28-4.43,3.28-9.73,5.47-15.47,6.28Zm18.38-8.7c-.19,0-.39,0-.58.02-6.78.39-13.2,2.86-18.71,6.67,3.1-4.64,5.08-9.98,5.61-15.6.22-.22.44-.44.66-.65,6.66-7.37,14.75-12.42,22.81-12.91.12,0,.24,0,.37-.02-.38,9.11-4.21,16.92-10.16,22.48Zm-23.56,8.4c1.14-5.12,3.58-10.03,7.15-14.35-1.15,5.31-3.65,10.23-7.15,14.35Zm7.84-22.44c.08,1.78,0,3.54-.21,5.27-4.02,4.15-6.99,8.94-8.67,14.04-1.31-7.12-4.55-14.09-9.55-19.87.89-8.05,4.95-15.83,10.91-21.79,4.37,5.54,7.14,13.05,7.52,22.35Zm-34.03,36.66s.02,0,.03,0c7.5.11,14.4-2.07,20.12-5.78-4.11,5.74-6.72,12.4-7.12,19.13-6.5,6.24-14.86,8.42-23.32,8.13.65-8.7,4.49-16.14,10.29-21.48Zm22.96-5.89c-.72,6.1-3.13,11.99-7.45,16.69.94-5.98,3.6-11.75,7.45-16.69Zm-7.8,20.43c.26-.26.53-.51.78-.78,4.16-3.87,6.95-8.69,8.48-13.94,1.26,5.17,3.88,10.31,8.08,15.13.39.36.8.7,1.21,1.04-.38,5.49-2.11,13.07-4.11,15.61-1.85,2.35-3.64,4.36-5.47,6.11-5.82-5.88-9.25-13.95-8.98-23.17Zm36.9-14.32c8.87-.5,16.76-4.19,22.66-9.78,4.93,5.8,8.07,13.58,8.44,22.59.01.22,0,.44.01.66-6.09,6.12-14.08,8.92-22.19,9.16.01-.23.04-.47.05-.7-.41-8.46-3.66-16.11-8.97-21.93Zm31.16-39.91c-6.36-5.07-13.77-7.67-21.29-7.45-.57-8.3-4.25-16.05-9.52-22.47,16.03,1.91,28.97,13.8,30.81,29.93Zm-58.9-40.45c8.88-.39,16.86,2.92,23.02,8.33-7.97.97-15.36,4.76-21.2,10.17-5.91-6.42-13.93-10.3-22.74-10.67,5.86-5.08,12.87-7.62,20.92-7.83Zm-46.52,19.57c5.82-4.64,12.38-8.23,19.76-9.3-5.08,6.36-8.44,14.59-8.97,22.32-7.99.59-15.91,4.03-22.45,10.51.77-8.64,4.69-17.96,11.66-23.52Zm-13.82,29.08c.72,8.8,4.61,16.33,10.61,21.83-5.64,6.2-9.6,13.86-10.78,21.4-9.56-11.33-9.58-30.85.17-43.23Zm1.65,47.77c6.23,4.93,14.04,7.52,21.98,8.21.5,8.22,4.06,16.12,9.64,22.85-18.4.13-32.04-13.03-31.62-31.07Zm59.61,41.44c-8.55.24-16.84-2.66-23.17-8.41,8.64-.59,16.27-3.92,22.11-8.88,5.68,5.02,13.17,8.25,21.56,9.05-5.84,5.15-13.06,8.38-20.5,8.23Zm25.72-10.03c5.28-6.16,8.95-14.03,9.87-22.59,8.02.4,15.94-2.55,22.24-7.89-1.41,15.94-14.89,29.63-32.11,30.48Zm34.23-36.14c-.77-8.99-4.08-16.71-9.05-22.53,5.86-6.2,9.43-14.37,9.5-23.02,10.09,13.93,11.27,34.56-.44,45.55Z"
  ],
  sb6: [
    "m184.63,15.97c0-1.1-.9-2-2-2,0,0-26.91-.67-48.22-1.27-15.52-.44-40.75.71-40.75.71-21.06,1-38.77,8.15-52.77,20.63-16.06,14.32-26.26,35.09-26.52,58.24,0,.58-.02,1.16-.06,1.74-.3,4.66-1.72,27.9-.96,44.17.89,19.07,1.01,44.05,1.01,44.05,0,1.1.9,2,2,2,0,0,26.26.87,36.45,1.4,17.84.93,54.65-1.45,54.65-1.45,21.06-.54,40.08-9.26,53.96-23.15,14.33-14.33,23.2-34.13,23.2-56,0,0,.11-27.59.55-44,.41-15.08-.55-45.06-.55-45.06Zm-4.42,47.27c-.42,15.46-.52,41.45-.52,41.45,0,20.61-8.35,39.26-21.86,52.77-12.04,12.04-28.19,19.97-46.16,21.55-2.02.12-1.99.32-6.61.51-.78,0-29.61,1.4-49.57,1.12-9.61-.14-34.34-1.32-34.34-1.32-1.04,0-1.88-.84-1.88-1.88,0,0-.12-23.54-.96-41.5-.71-15.2.6-36.85.9-41.5.04-.63.06-1.25.07-1.88.28-21.76,9.88-41.28,24.98-54.75,13.19-11.76,31.44-18.52,49.51-19.52,0,0,23.98-1,38.6-.58,20.08.57,45.43,1.2,45.43,1.2,1.04,0,1.88.84,1.88,1.88,0,0,.9,28.24.52,42.45Zm-35.46-7.13c.13-9.21.26-17.57.26-17.57,0-.56-.46-1.02-1.02-1.02,0,0-30.44-.08-43.15.36-7.54.44-42.06-.42-42.06-.42-.56,0-1.02.46-1.02,1.02,0,0,.05,21.93,0,35.65-3.79,1.84-7.29,4.19-10.4,6.97-9.36,8.34-15.25,20.49-15.25,34.01,0,0-1.07,15.43-.58,25.88.51,10.96.58,25.33.58,25.33,0,.64.51,1.15,1.15,1.15,0,0,15.1.5,20.96.8,12.22.63,30.39-.66,30.25-.8,12.58,0,23.96-5.1,32.21-13.34.11-.11.21-.22.32-.33,1.19.08,2.38.14,3.58.14,26.12,0,49.84-19.81,52.12-52.12,1.39-19.63-11.42-36.81-27.95-45.7Zm-83.83-14.53c0-.52.42-.95.95-.95,0,0,38.1-.44,39.72-.42,11.01.15,39.31.48,39.31.48.52,0,.95.42.95.95,0,0,.02,5.88.05,13.05-6.83-3.2-14.16-4.99-21.31-4.99-15.84,0-30.05,8.13-39.61,19.67-2.03.12-3.31.2-3.31.2-5.95,0-11.63,1.15-16.84,3.22.11-13.02.12-31.21.12-31.21Zm81.02,38.23c.31,8.1-.33,40.57-.33,40.57,0,.52-.42.95-.95.95,0,0-4.59.12-10.66.27.01-2.28.08-16.32.31-24.97.23-8.67-.32-25.91-.32-25.91,0-.63-.51-1.15-1.15-1.15,0,0-15.47-.38-27.73-.73-4.59-.13-10.68.07-15.5.29,9.4-9.83,22.37-16.01,34.94-16.01,7.64,0,14.88,1.78,21.32,4.93.03,9.3.06,19.52.05,21.77Zm-26.3,70.63c-18.82-1.04-32.26-11.37-38.95-25.85,10.42.04,22.25.09,25.89.14,4.34-.05,14.81-.12,24.11-.17-.66,9.95-4.72,18.96-11.05,25.88Zm-13.3-28.29c-4.38-.01-16.94-.26-26.88-.48-2.36-6.11-3.6-12.85-3.6-19.87,0-11.15,4.33-21.44,11.09-29.66,4.72-.25,11.98-.55,17.19-.4,11.46.33,25.58,1.02,25.58,1.02.59,0,1.08.48,1.08,1.07,0,0,.51,16.11.29,24.22-.23,8.57-.29,22.82-.29,23.61-9.15.22-20.2.47-24.46.48Zm-41.74-37.76c.07-1.61.12-4.58.16-8.24,5.32-2.39,11.22-3.73,17.43-3.73,0,0,.14,0,.39-.03-6.37,8.81-10.14,19.21-10.14,29.4,0,7.01,1.4,13.69,3.92,19.8-5.91-.13-10.28-.23-10.28-.23-.52,0-.95-.42-.95-.95,0,0-.75-31.55-.53-36.04Zm23.62,79.89c.13.13-16.86,1.34-28.28.75-5.48-.28-19.59-.75-19.59-.75-.59,0-1.08-.48-1.08-1.07,0,0-.07-13.43-.55-23.68-.45-9.77.55-24.19.55-24.19,0-12.64,5.85-24.33,14.6-32.13,2.39-2.13,5.03-4,7.86-5.55-.01,2.31-.03,4.22-.05,5.5.28,9.55.29,40.35.29,40.35,0,.56.46,1.02,1.02,1.02,0,0,6.58.02,14.68.04,7.37,15.11,21.83,26.15,39.03,28.76-7.55,6.8-17.53,10.94-28.49,10.94Zm36.34-13.77c-.22,0-.44,0-.67,0,5.8-7.18,9.46-16.16,10.02-25.97,7.66-.04,13.81-.07,13.81-.07.56,0,1.02-.46,1.02-1.02,0,0-.19-34-.34-43.9.01-2.16.14-11.07.27-20.03,14.67,8.4,24.58,24.2,24.58,42.28,0,26.85-21.86,47.9-48.7,48.7Z"
  ],
  sb7: [
    "m184.63,15.97c0-1.1-.9-2-2-2,0,0-26.9-.67-48.22-1.27-15.52-.44-40.74.71-40.74.71-21.06,1-38.77,8.15-52.76,20.62-16.06,14.32-26.26,35.09-26.52,58.24,0,.58-.02,1.16-.06,1.74-.3,4.66-1.72,27.9-.96,44.17.89,19.07,1.01,44.04,1.01,44.04,0,1.1.9,2,2,2,0,0,26.26.87,36.45,1.4,17.84.93,54.65-1.45,54.65-1.45,21.06-.54,40.07-9.26,53.96-23.15,14.33-14.33,23.2-34.13,23.2-56,0,0,.11-27.59.55-43.99.41-15.08-.55-45.06-.55-45.06Zm-73.16,66.45c-4.44-4.03-9.94-7.89-15.88-9.59-4.32-1.23-8.91-1.85-13.59-1.85-2.39,0-4.73.28-7.01.76,2.15-7.27,6.33-14.14,12.16-19.97.55-.55,1.11-1.05,1.68-1.56,14.85.94,25.9,7.4,36.62,16.85,12.92,11.39,22.14,26.06,23.76,45.04-.28.3-.55.6-.84.88-5.79,5.79-12.77,9.53-20.14,11.29.31-2.14.48-4.34.48-6.59,0-14.63-7.65-26.58-17.25-35.28Zm-20.57-33.9c4.5-3.43,9.57-5.76,14.86-7.55,16.22-5.49,32.85,1.24,42.61,11.01,16.18,16.18,16.35,41.57,2.65,58.1-3.61-32.07-28.84-58.48-60.12-61.56Zm-18.35,23.83c-5.95,1.65-11.42,4.55-16.26,7.22-2.15,1.19-4.15,2.6-6.01,4.17.09-9.11,2.04-17.87,5.48-25.86,8.69-4.8,18.44-7.59,28.67-7.65-6.14,6.36-10.1,14.04-11.88,22.13Zm-12.82,44.04c-5.5-7.96-8.68-17.75-9.33-28.01,5.68-6.12,13.12-10.58,21.52-12.6-2,13.96,2.36,28.66,13.08,39.37,10.11,10.11,24.36,14.91,38.9,12.72-2.07,8.56-6.69,16.12-13.01,21.84-22.12-1.88-39.4-16.32-51.16-33.32Zm48.93,35.18c-7.34,5.79-16.6,9.25-26.67,9.25-23.81,0-43.12-19.3-43.12-43.12,0-10.3,3.62-19.76,9.65-27.18,2.9,32.03,28.24,57.68,60.14,61.05Zm19.07-24.45c7.42-1.75,14.82-5.37,21.7-11.07.28,10.05-2.09,20.12-6.59,29.25-8.43,3.1-17.76,4.62-27.04,4.62-.23,0-.46-.01-.69-.01,6.24-6.14,10.74-13.92,12.62-22.78Zm-8.84-109.5c3.63.17,10.32.38,19.34.24,18.83.52,39.57,1.04,39.57,1.04,1.04,0,1.88.84,1.88,1.88,0,0,.9,28.24.52,42.45-.23,8.69-.37,20.72-.44,29.58l-.03-.14s-.09,2.88-.52,6.69c-.55,4.85-3.56,14.03-5.79,18.05-5.96,10.57-12.16,17.1-17.38,21.12-3.38,2.33-7.08,4.3-11,5.91,4.66-9.25,6.89-19.4,6.37-29.72,0-.13-.02-.25-.03-.38,18.32-16.96,15.16-48.7-.86-64.72-17.53-17.53-47.71-16.06-64.07-1.38-.55-.01-1.11-.04-1.66-.04h0c-9.58,0-18.97,2.3-27.62,6.63,9.82-20.02,29.2-34.66,52.06-37.05,3.08-.07,6.38-.13,9.67-.17Zm-63.39,163c-9.61-.14-34.34-1.32-34.34-1.32-1.04,0-1.88-.84-1.88-1.88,0,0-.09-17.1-.63-33.28.31-9.85.73-19.66,1.52-29.3,1.12-22.92,14.23-43.85,32.85-55.37-3.07,7.71-4.77,16.11-4.77,24.9,0,.4.02.79.03,1.18-8.24,8-12.99,19.66-12.99,32.13,0,9.13,3.63,17.25,8.17,24.45,8.28,13.13,21.91,22.26,38.54,22.26,11.8-.76,22.69-5.31,30.98-12.54.94.04,1.88.07,2.82.07,9.35,0,18.27-1.91,26.37-5.36-.31.59-.6,1.18-.93,1.76-11.08,17.24-26.02,25.71-34,29.23-3.7,1.5-9.32,2.12-13.04,2.37-10.39.39-26.27.87-38.71.69Z"
  ],
  sb8: [
    "m27.86,169.11c0,.92.75,1.67,1.67,1.67,0,0,22.46.55,40.25,1.06,12.95.37,34.08-1.06,34.08-1.06,16.88,0,32.29-6.33,43.97-16.74,13.58-12.11,22.14-29.74,22.14-49.36,0,0,1.55-22.4.85-37.56-.74-15.91-.85-36.76-.85-36.76,0-.92-.75-1.67-1.67-1.67,0,0-21.91-.72-30.42-1.17-16.99-.88-34.74-.05-44.13.8-13.72,1.25-34.59,7.8-46.51,19.72-11.96,11.96-19.36,28.49-19.36,46.74,0,0-.09,23.03-.46,36.72-.34,12.59.46,37.6.46,37.6Zm2.49-38.91c.35-13.13.44-35.21.44-35.21,0-17.5,7.1-33.35,18.57-44.82,11.44-11.44,33.95-17.98,44.63-18.85,7.2-.58,26-1.69,42.3-.84,8.16.42,29.17,1.12,29.17,1.12.88,0,1.6.72,1.6,1.6,0,0,.1,19.99.81,35.25.68,14.54-.81,36.02-.81,36.02,0,18.82-8.2,35.73-21.23,47.34-11.2,9.99-25.97,16.05-42.16,16.05,0,0-20.46.17-32.68,1.02-17.03,1.18-38.59-1.02-38.59-1.02-.88,0-1.6-.72-1.6-1.6,0,0-.77-23.99-.44-36.06Zm10.35,26.4c0,.76.61,1.37,1.37,1.37,0,0,18.41.45,33,.87,10.62.3,27.94-.87,27.94-.87,13.84,0,26.47-5.19,36.05-13.73,11.14-9.93,18.15-24.38,18.15-40.47,0,0,1.27-18.37.69-30.8-.61-13.05-.69-30.14-.69-30.14,0-.76-.61-1.37-1.37-1.37,0,0-17.97-.59-24.94-.96-14.54-.76-31.36.39-36.04.67-14.32.94-28.47,6.35-38.28,16.16-9.81,9.81-15.87,23.36-15.87,38.33,0,0-.07,18.88-.38,30.11-.28,10.32.38,30.83.38,30.83Zm3.67-32.63c.28-10.46.35-28.04.35-28.04,0-13.94,5.65-26.56,14.78-35.69,9.13-9.13,22.6-14.42,35.59-15.23,2.94-.18,20.09-1.15,33.62-.45,6.5.34,23.23.89,23.23.89.7,0,1.27.57,1.27,1.27,0,0,.08,15.92.65,28.07.54,11.58-.65,28.68-.65,28.68,0,14.99-6.53,28.45-16.9,37.69-8.92,7.95-20.68,12.78-33.57,12.78,0,0-16.13,1.09-26.02.81-13.58-.39-30.73-.81-30.73-.81-.7,0-1.27-.57-1.27-1.27,0,0-.61-19.1-.35-28.71Zm99.8-68.27c0-.58-.47-1.05-1.05-1.05,0,0-14.18-.35-25.41-.67-8.18-.23-15.72.11-21.52.67-9.85.95-20.38,4-27.76,10.57-8.58,7.64-13.98,18.77-13.98,31.16,0,0-.98,14.14-.53,23.72.47,10.05.53,23.21.53,23.21,0,.58.47,1.05,1.05,1.05,0,0,13.84.46,19.21.74,11.19.58,27.85-.6,27.72-.74,11.06-.8,21.96-4.67,29.51-12.22,7.55-7.55,12.22-17.99,12.22-29.51,0,0,.06-14.54.29-23.18.21-7.95-.29-23.74-.29-23.74Zm-4.92,26.06c-.21,7.65-.26,20.52-.26,20.52,0,10.2-4.13,19.43-10.82,26.12-6.68,6.68-15.92,10.82-26.12,10.82.11.12-14.63,1.17-24.53.65-4.75-.25-17-.65-17-.65-.52,0-.93-.42-.93-.93,0,0,.41-11.68-.47-20.54-.83-8.32.47-20.99.47-20.99,0-10.97,4.78-20.82,12.37-27.58,6.53-5.82,15.87-9,24.85-9.66,0,0,11.52-.49,18.76-.29,9.94.28,22.49.59,22.49.59.52,0,.93.42.93.93,0,0,.45,13.98.26,21.01Zm-7.8,3.65c-.17,6.12-.2,16.4-.2,16.4,0,8.15-3.31,15.54-8.65,20.88-5.06,5.06-11.94,8.27-19.57,8.6,0,0-14.7.89-20.92.57-3.8-.2-13.59-.52-13.59-.52-.41,0-.75-.33-.75-.75,0,0-.05-9.31-.38-16.42-.32-6.77.38-16.78.38-16.78,0-8.77,3.82-16.64,9.89-22.05,5.22-4.65,12.1-7.48,19.64-7.48,0,0,9.44-.64,15.22-.47,7.95.23,17.98.47,17.98.47.41,0,.75.33.75.75,0,0,.36,11.18.2,16.8ZM184.63,15.97c0-1.1-.9-2-2-2,0,0-26.9-.67-48.22-1.27-15.52-.44-40.74.71-40.74.71-21.06,1-38.77,8.15-52.76,20.62-16.06,14.32-26.26,35.09-26.52,58.24,0,.58-.02,1.16-.06,1.74-.3,4.66-1.72,27.9-.96,44.17.89,19.07,1.01,44.05,1.01,44.05,0,1.1.9,2,2,2,0,0,26.26.87,36.45,1.4,17.84.93,54.65-1.45,54.65-1.45,21.06-.54,40.07-9.26,53.96-23.15,14.33-14.33,23.2-34.13,23.2-56,0,0,.11-27.59.55-43.99.41-15.08-.55-45.06-.55-45.06Zm-1.96,46.18c-.43,15.93-.53,42.71-.53,42.71,0,21.23-8.61,40.46-22.52,54.37-12.41,12.41-29.04,20.58-47.56,22.2-2.08.12-2.05.33-6.81.52-.8,0-30.51,1.44-51.07,1.15-9.91-.14-35.38-1.36-35.38-1.36-1.07,0-1.94-.87-1.94-1.94,0,0-.12-24.25-.98-42.76-.73-15.66.61-37.97.92-42.76.04-.65.06-1.29.07-1.94.29-22.42,10.18-42.53,25.74-56.41,13.59-12.11,32.39-19.08,51.01-20.11,0,0,24.71-1.03,39.77-.6,20.69.59,46.81,1.24,46.81,1.24,1.07,0,1.94.87,1.94,1.94,0,0,.93,29.1.53,43.74Z"
  ],
  da4: [
    "m187.08,98.21s-17.22-25.46-30.34-41.12c-6.17-7.35-32.93-40.02-32.93-40.02-.7-.68-1.64-1.06-2.62-1.06,0,0-3.9-.17-9.92-.33,0,0-42.5.15-42.98.18-11.64.59-54.92.15-54.92.15-1.1,0-2,.9-2,2,0,0-.67,75-.61,86.97.05,11.97.61,75.53.61,75.53,0,1.1.9,2,2,2,0,0,40.28.43,51.92.15,27.27-.67,55.88-.15,55.88-.15.98,0,1.91-.38,2.61-1.06,0,0,17.89-21.02,30.3-37.56,13.97-18.62,33-42.81,33-42.81.81-.78.81-2.08,0-2.87Z"
  ],
  sb9: [
    "m120.46,98.38c0,19.79-12.13,35.84-35.84,35.84-19.79,0-34.51-16.09-35.84-35.84-1.13-16.77,16.07-36.84,35.84-35.84,22.31,1.13,35.84,16.05,35.84,35.84Zm66.65,2.66s-19.04,24.2-33.02,42.83c-12.41,16.54-30.31,37.58-30.31,37.58-.7.68-1.64,1.06-2.61,1.06,0,0-28.62-.52-55.9.15-11.65.28-51.94-.15-51.94-.15-.46,0-.88-.16-1.22-.43-.47-.37-.78-.93-.78-1.57,0,0-.31-34.84-.49-57.8-.06-8.4-.11-15.26-.13-18.3,0-.33,0-.72,0-1.15,0-15.44.57-80.33.61-85.04.02-.31.04-.58.08-.81.24-.84,1-1.47,1.92-1.47,0,0,38.39.39,52.59-.06l50.08-.13c3.26.11,5.2.19,5.2.19.98,0,1.92.38,2.62,1.06,0,0,26.78,32.68,32.95,40.04,6.78,8.08,14.64,18.78,20.67,27.24,5.65,7.93,9.69,13.9,9.69,13.9.81.79.81,2.08,0,2.87Zm-7.11-2.29c-3.85-5.6-17.27-25.58-28.04-38.43-5.35-6.38-26.7-32.41-31.38-38.12-.34-.41-.82-.65-1.35-.67-5.14-.2-31.28-.73-50.52-.11-9.96.32-42.39.26-51.62.18-.12,0-.21.09-.21.2-.11,12.7-.62,72.37-.58,82.75.04,10.27.48,59.95.58,71.53,0,.17.13.29.3.29,8.8.09,38.73.36,48.29.12,24.99-.61,51.44-.2,54.59-.15,2.56-3.02,18.18-21.52,29.15-36.16,11.52-15.36,27.02-34.35,30.81-40.37.21-.33.2-.74-.02-1.06Z"
  ],
  sc0: [
    "m187.11,98.17s-4.04-5.97-9.69-13.9c-6.03-8.46-13.89-19.15-20.67-27.24-6.17-7.36-32.95-40.04-32.95-40.04-.7-.68-1.64-1.06-2.62-1.06,0,0-1.94-.08-5.2-.19l-50.08.13c-14.2.45-52.59.06-52.59.06-.92,0-1.68.62-1.92,1.47-.04.24-.07.51-.08.81-.04,4.71-.61,69.6-.61,85.04,0,.43,0,.82,0,1.15.01,3.04.06,9.91.13,18.3.18,22.96.49,57.8.49,57.8,0,.64.31,1.21.78,1.57.34.26.76.43,1.22.43,0,0,40.3.43,51.94.15,27.28-.67,55.9-.15,55.9-.15.98,0,1.91-.38,2.61-1.06,0,0,17.9-21.03,30.31-37.58,13.97-18.63,33.02-42.83,33.02-42.83.81-.78.81-2.08,0-2.87Zm-29.73,33c-2.53,3.28-5.03,6.54-7.37,9.66-9.4,12.54-22.16,27.87-27.48,34.2-4.72-3.76-20.15-16.03-25.15-19.55-2.68-1.89-5.53-4.02-8.31-6.16,3.32-3.58,12.9-14.06,19.35-22.66,8.41-11.22,18.49-25.95,19.55-27.3,0,0,0,0,0,0l1.4-1.93c.27-.38.29-.89.03-1.28l-.94-1.43c-.13-.22-.28-.43-.41-.63-1.24-1.83-11.13-16.73-19.14-26.28-.46-.54-1.1-1.32-1.87-2.25,10.39-2.64,22.44-5.16,24.6-5.6,1.52,1.23,14.31,11.57,26.78,20.85,4.54,3.38,17.92,14.04,22.89,18.01.18.31.18.69-.02,1-1.19,1.89-3.53,5.05-6.53,8.97-5.84,7.3-13.35,16.74-17.39,22.37ZM15.02,104.63c-.03-7.26.21-38.28.4-61.1,7.46.06,27.74.2,34.19-.13,13.37-.68,31.03-.06,34.55.08.36.01.69.18.92.46,1.02,1.24,3.2,3.9,5.81,7.08-8.78,8.83-19.01,18.25-21.17,20.5-.36.15-.62.48-.66.87l-.13,1.58c-.03.24-.04.47-.06.69-.14,2.04-1.06,18.54-.67,30.08.19,5.58.36,30.31.36,30.56l.02.28s0,.03,0,.04l.04.88c.02.44.22.85.55,1.13l.72.61c.13.13.26.26.41.37.15.13.79.67,1.8,1.52h0c2.3,1.93,6.52,5.44,11.29,9.2-4.93-.07-20.85-.25-35.99.12-6.22.15-25.01,0-32.02-.07-.15-18.02-.32-38.52-.35-44.75ZM120.26,20.83c2.09,7.59,3.94,15.08,6.22,22.22,1.44,4.52,3.05,8.68,4.63,13.23-.21.04-.4.07-.49.08l-.23.04c-.15.03-14.5,2.97-25.98,5.96-3.09-3.75-7.01-8.52-10.25-12.47,2.39-2.55,4.7-5.11,6.94-7.72,5.8-6.79,12.22-14.35,19.16-21.34Zm-19.3,42.45c-10.49,2.81-23.1,6.07-27.52,7.2,6.7-6.42,12.81-12.33,18.46-18.22,2.92,3.56,6.24,7.6,9.06,11.02Zm51.84-3.56c7.45,8.89,16.15,21.14,22.18,29.84-2.93-2.48-6.12-5.12-8.89-7.3-2.5-1.96-4.69-3.66-6.08-4.69-10.04-7.48-24.4-18.93-27.15-21.13-.11-.09-.23-.15-.36-.2-1.69-4.91-3.98-11.3-5.46-16-2.12-6.75-3.65-11.75-5.48-18.49,5.76,7.03,26.02,31.73,31.25,37.96ZM15.82,20.38c9.37.08,42.32.15,52.43-.18,19.32-.62,45.48-.1,51.11.11-6.94,6.96-13.44,14.11-19.21,20.85-1.9,2.22-4.33,4.81-6.98,7.53-2.98-3.63-5.18-6.32-5.24-6.39l-.2-.22s-.03-.02-.04-.03l-.61-.72c-.31-.36-.75-.58-1.22-.6l-1.02-.05c-.2-.03-.39-.04-.59-.05-.21,0-1.12-.05-2.54-.09h0c-5.78-.19-20.13-.57-31.4,0-6.21.32-28.43.16-34.87.11.07-9.02.14-16.43.17-20.06,0-.12.09-.21.21-.21Zm49.14,157.33c-9.71.24-40.11-.04-49.05-.12-.17,0-.3-.13-.3-.3-.04-4.37-.12-14.06-.22-25.06,4.08.04,16.36.14,24.91.14,3.44,0,6.43-.02,8.3-.06,12.41-.3,32.3-.18,38.44-.12,2.66,2.04,5.37,4.07,7.93,5.87,4.58,3.23,19.93,15.41,25.06,19.5-4.51-.07-30.49-.44-55.07.16Z"
  ],
  sc1: [
    "m187.11,98.17s-4.04-5.97-9.69-13.9c-6.03-8.46-13.89-19.15-20.67-27.24-6.17-7.36-32.95-40.04-32.95-40.04-.7-.68-1.64-1.06-2.62-1.06,0,0-1.94-.08-5.2-.19l-50.08.13c-14.2.45-52.59.06-52.59.06-.92,0-1.68.62-1.92,1.47-.04.24-.07.51-.08.81-.04,4.71-.61,69.6-.61,85.04,0,.43,0,.82,0,1.15.01,3.04.06,9.91.13,18.3.18,22.96.49,57.8.49,57.8,0,.64.31,1.21.78,1.57.34.26.76.43,1.22.43,0,0,40.3.43,51.94.15,27.28-.67,55.9-.15,55.9-.15.98,0,1.91-.38,2.61-1.06,0,0,17.9-21.03,30.31-37.58,13.97-18.63,33.02-42.83,33.02-42.83.81-.79.81-2.08,0-2.87Zm-28.61-28.61c-9.95,1.93-24.61,4.82-34.94,6.71-29.35,4.89-54.08,9.72-87.84,14.48-.41-1.38-.93-2.7-1.55-3.96,26.22-12.99,46.08-25.6,67.01-39.06,7.97-4.72,18.63-11.73,25.98-16.53,8.17,9.96,20.43,24.88,24.29,29.48,2.27,2.71,4.66,5.74,7.05,8.88Zm-39.47-47.31c.53.02,1.01.26,1.34.67,1.16,1.42,3.36,4.1,6.09,7.43-.06,0-.11.03-.16.06-7.68,4.77-18.3,10.92-26.26,15.64-21.91,12.68-41.35,25.2-67.76,37.54-.72-1.03-1.51-2-2.37-2.9,12.42-13.14,18.96-23.25,30.23-37.57,4.2-5.12,12.96-15.82,17.1-21.16,17.59-.28,37.4.13,41.79.3Zm-50.04-.11c1.95-.06,3.97-.11,6.03-.15-4.02,5.15-8.52,10.28-12.62,15.39-9.98,12.07-24.97,29.97-30.38,35.81-1.57,1.7-3.22,3.36-4.92,5.02-1.02-.76-2.11-1.44-3.26-2.01,4.77-12.79,8.3-25.73,12.24-38.79,1.8-4.93,3.6-10.09,4.77-14.98,0-.01,0-.03,0-.04,11.13,0,22.84-.07,28.13-.24Zm-51.13.17c4.09.04,12.76.07,21.99.06-1.65,4.92-3.48,9.83-5.13,14.71-4.65,12.73-8.91,25.31-14.42,37.72-.99-.29-2.02-.52-3.07-.67.15-20.31.35-44.16.42-51.62,0-.12.09-.2.21-.2Zm-.21,153.03c-.07-8.45-.33-37.36-.47-56.07,1.2-.15,2.37-.41,3.52-.78,5.27,13.78,12.13,27.73,18.46,41.86,2.08,5.14,3.97,10.3,6.04,15.48-10.83-.04-22.35-.15-27.25-.2-.17,0-.29-.13-.29-.29Zm29.22.49c-2.19-5.24-4.72-10.67-6.8-15.83-5.41-14.44-11.68-28.72-16.15-42.85,1.32-.68,2.58-1.5,3.76-2.43,2.43,3.14,6.12,7.78,11,13.13,8.7,9.88,21.23,22.36,29.61,31.67,3.7,4.65,8.32,10.4,13.35,15.97-5.19.05-10.55.13-15.85.26-3.87.09-11.11.11-18.91.08Zm72.98-.23c-2.36-.04-17.94-.28-36.11-.13-4.85-5.47-9.85-11.46-14.55-16.82-13.41-15.63-28.19-31.06-38.89-46.31.99-1.04,1.9-2.15,2.69-3.32,4.08,2.64,11.2,7.21,21.1,12.62,15.12,8.55,37.18,20.17,51.63,28.23,8.34,4.74,15.92,8.59,24.49,13.31-5.1,6.21-9.16,11.02-10.35,12.43Zm28.88-35.82c-5.54,7.39-12.27,15.77-17.88,22.61-8.6-4.82-16.26-9.62-24.7-14.4-14.41-8.54-36.12-19.81-50.74-28.88-9.77-5.83-16.59-10.74-20.48-13.52.49-1.05.88-2.12,1.19-3.2,26.27,5.39,61.61,12.44,93.24,16.94,10.65,1.99,19.86,3.43,30.91,5.41-3.92,5.02-7.93,10.21-11.55,15.04Zm30.52-39.99c-2.44,3.88-9.81,13.22-17.8,23.46-11.05-2.04-20.93-3.97-31.89-6-16.46-2.75-35.44-6.71-51.86-9.97-15.27-2.97-28.25-5.93-40.89-8.86.03-.59.03-1.18,0-1.77-.05-.8-.14-1.6-.27-2.38,15.25-2.56,30.15-5.13,43.04-7.73,15.64-3.07,30.77-5.73,46.65-8.85,10.29-1.91,22.72-5.27,32.95-7.2.01,0,.02-.01.03-.01,8.61,11.39,17.11,24.02,20.03,28.27.22.32.22.72.02,1.05Z"
  ],
  sc2: [
    "m187.11,98.17s-4.04-5.97-9.69-13.9c-6.03-8.46-13.89-19.15-20.67-27.24-6.17-7.36-32.95-40.04-32.95-40.04-.7-.68-1.64-1.06-2.62-1.06,0,0-1.94-.08-5.2-.19l-50.08.13c-14.2.45-52.59.06-52.59.06-.92,0-1.68.62-1.92,1.47-.04.24-.07.51-.08.81-.04,4.71-.61,69.6-.61,85.04,0,.43,0,.82,0,1.15.01,3.04.06,9.91.13,18.3.18,22.96.49,57.8.49,57.8,0,.64.31,1.21.78,1.57.34.26.76.43,1.22.43,0,0,40.3.43,51.94.15,27.28-.67,55.9-.15,55.9-.15.98,0,1.91-.38,2.61-1.06,0,0,17.9-21.03,30.31-37.58,13.97-18.63,33.02-42.83,33.02-42.83.81-.79.81-2.08,0-2.87Zm-7.89.58c.09.14.14.29.16.44-15.41-.45-78.16-2.24-83.7-1.71-5.57.54-64.61-2.39-78.58-3.09.04-7.61.11-18.09.19-28.78,24,3.66,55.06,9.29,71.57,13.32,15.86,4.73,57.71,13.22,90.24,19.63.04.06.09.13.13.18Zm-.12,1.27l-161.83,31.9c-.1-12.21-.19-23.2-.2-27.43,0-.14,0-.28,0-.44,6.51-.6,22.56-1.88,34.87-1.25,14.19.73,108.29-2.68,127.43-3.39-.02.13-.06.26-.13.38-.04.07-.1.15-.14.22ZM17.6,169.65c-.06-6.82-.15-17.12-.24-27.62l161.57-41.73c-.23.35-.5.75-.79,1.17-14.68,6.15-60.38,25.4-82.95,36.19-12.07,5.77-30.06,13.69-44.13,20.3-10.72,4.69-25.61,9.35-33.45,11.69Zm13.03-109.17c-4.45-1.04-8.88-2.03-13.28-2.97.09-11.88.19-23.18.25-30.18,6.36,2.12,17.37,6.16,28.9,12.14,16.09,8.34,111.49,49.89,132.41,58.83.24.35-.2-.29,0,0-53.11-13.68-102.24-27.07-148.28-37.82Zm38.36-38.33c19.06-.61,44.95-.08,50.04.11.53.02,1.01.26,1.34.67,4.64,5.65,25.78,31.45,31.08,37.76,9.53,11.37,21.14,28.35,26.24,35.81-8.75-4.78-28.13-15.11-43.16-21.22-21.6-8.7-41.61-20.5-41.61-20.5L28.16,22.37c13.36.04,33.41.01,40.83-.23Zm79.74,117.64c-10.88,14.5-26.35,32.84-28.88,35.82-3.12-.05-29.32-.45-54.07.15-7.48.18-27.54.06-39.94-.05,7.71-3.81,18.45-9.07,25.5-12.29,10.84-4.96,83.93-41.23,87.31-42.44,2.64-.95,28.08-13.5,39.09-18.96-5.35,7.56-18.77,24.11-29.01,37.77Z"
  ]
}, r2 = {
  da0: "being",
  sa0: "being",
  sa1: "being",
  sa2: "being",
  sa3: "being",
  sa4: "being",
  da1: "thinking",
  sa5: "thinking",
  sa6: "thinking",
  sa7: "thinking",
  sa8: "thinking",
  sa9: "thinking",
  da2: "relating",
  sb0: "relating",
  sb1: "relating",
  sb2: "relating",
  sb3: "relating",
  da3: "collaborating",
  sb4: "collaborating",
  sb5: "collaborating",
  sb6: "collaborating",
  sb7: "collaborating",
  sb8: "collaborating",
  da4: "acting",
  sb9: "acting",
  sc0: "acting",
  sc1: "acting",
  sc2: "acting"
}, s2 = {
  id: "Bahasa Indonesia",
  ca: "Català",
  dk: "Dansk",
  de: "Deutsch",
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  nl: "Nederlands",
  "pt-BR": "Português (Brazil)",
  pt: "Português",
  fi: "Suomi",
  sv: "Svenska",
  tr: "Türkçe",
  ru: "Русский",
  uk: "Українська",
  ur: "اُردُو",
  ar: "لعربية",
  wo: "Wolof (Senegal)",
  hi: "हिन्दी",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
  ko: "한국어",
  ja: "日本語",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文"
}, a2 = "en";
function o2(t) {
  return typeof t == "function";
}
function ln(t) {
  return t !== null && typeof t == "object";
}
const l2 = ["string", "number", "bigint", "boolean"];
function Oi(t) {
  return t == null || l2.includes(typeof t) ? !0 : Array.isArray(t) ? t.every((e) => Oi(e)) : typeof t == "object" ? Object.getPrototypeOf(t) === Object.prototype : !1;
}
const $t = Symbol("box"), Qi = Symbol("is-writable");
function d2(t) {
  return ln(t) && $t in t;
}
function c2(t) {
  return w.isBox(t) && Qi in t;
}
function w(t) {
  let e = /* @__PURE__ */ N(ce(t));
  return {
    [$t]: !0,
    [Qi]: !0,
    get current() {
      return h(e);
    },
    set current(n) {
      C(e, n, !0);
    }
  };
}
function u2(t, e) {
  const n = /* @__PURE__ */ P(t);
  return e ? {
    [$t]: !0,
    [Qi]: !0,
    get current() {
      return h(n);
    },
    set current(i) {
      e(i);
    }
  } : {
    [$t]: !0,
    get current() {
      return t();
    }
  };
}
function m2(t) {
  return w.isBox(t) ? t : o2(t) ? w.with(t) : w(t);
}
function f2(t) {
  return Object.entries(t).reduce(
    (e, [n, i]) => w.isBox(i) ? (w.isWritableBox(i) ? Object.defineProperty(e, n, {
      get() {
        return i.current;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(r) {
        i.current = r;
      }
    }) : Object.defineProperty(e, n, {
      get() {
        return i.current;
      }
    }), e) : Object.assign(e, { [n]: i }),
    {}
  );
}
function h2(t) {
  return w.isWritableBox(t) ? {
    [$t]: !0,
    get current() {
      return t.current;
    }
  } : t;
}
w.from = m2;
w.with = u2;
w.flatten = f2;
w.readonly = h2;
w.isBox = d2;
w.isWritableBox = c2;
function _a(...t) {
  return function(e) {
    for (const n of t)
      if (n) {
        if (e.defaultPrevented)
          return;
        typeof n == "function" ? n.call(this, e) : n.current?.call(this, e);
      }
  };
}
function p2(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var xt = {}, gi, es;
function g2() {
  if (es) return gi;
  es = 1;
  var t = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, e = /\n/g, n = /^\s*/, i = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, r = /^:\s*/, s = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, a = /^[;\s]*/, o = /^\s+|\s+$/g, l = `
`, d = "/", c = "*", u = "", m = "comment", p = "declaration";
  gi = function(g, b) {
    if (typeof g != "string")
      throw new TypeError("First argument must be a string");
    if (!g) return [];
    b = b || {};
    var k = 1, y = 1;
    function v(z) {
      var O = z.match(e);
      O && (k += O.length);
      var M = z.lastIndexOf(l);
      y = ~M ? z.length - M : y + z.length;
    }
    function _() {
      var z = { line: k, column: y };
      return function(O) {
        return O.position = new A(z), j(), O;
      };
    }
    function A(z) {
      this.start = z, this.end = { line: k, column: y }, this.source = b.source;
    }
    A.prototype.content = g;
    function E(z) {
      var O = new Error(
        b.source + ":" + k + ":" + y + ": " + z
      );
      if (O.reason = z, O.filename = b.source, O.line = k, O.column = y, O.source = g, !b.silent) throw O;
    }
    function x(z) {
      var O = z.exec(g);
      if (O) {
        var M = O[0];
        return v(M), g = g.slice(M.length), O;
      }
    }
    function j() {
      x(n);
    }
    function R(z) {
      var O;
      for (z = z || []; O = L(); )
        O !== !1 && z.push(O);
      return z;
    }
    function L() {
      var z = _();
      if (!(d != g.charAt(0) || c != g.charAt(1))) {
        for (var O = 2; u != g.charAt(O) && (c != g.charAt(O) || d != g.charAt(O + 1)); )
          ++O;
        if (O += 2, u === g.charAt(O - 1))
          return E("End of comment missing");
        var M = g.slice(2, O - 2);
        return y += 2, v(M), g = g.slice(O), y += 2, z({
          type: m,
          comment: M
        });
      }
    }
    function F() {
      var z = _(), O = x(i);
      if (O) {
        if (L(), !x(r)) return E("property missing ':'");
        var M = x(s), W = z({
          type: p,
          property: f(O[0].replace(t, u)),
          value: M ? f(M[0].replace(t, u)) : u
        });
        return x(a), W;
      }
    }
    function D() {
      var z = [];
      R(z);
      for (var O; O = F(); )
        O !== !1 && (z.push(O), R(z));
      return z;
    }
    return j(), D();
  };
  function f(g) {
    return g ? g.replace(o, u) : u;
  }
  return gi;
}
var ts;
function v2() {
  if (ts) return xt;
  ts = 1;
  var t = xt && xt.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  };
  Object.defineProperty(xt, "__esModule", { value: !0 }), xt.default = n;
  var e = t(g2());
  function n(i, r) {
    var s = null;
    if (!i || typeof i != "string")
      return s;
    var a = (0, e.default)(i), o = typeof r == "function";
    return a.forEach(function(l) {
      if (l.type === "declaration") {
        var d = l.property, c = l.value;
        o ? r(d, c, l) : c && (s = s || {}, s[d] = c);
      }
    }), s;
  }
  return xt;
}
var b2 = v2();
const ns = /* @__PURE__ */ p2(b2), y2 = ns.default || ns, k2 = /\d/, w2 = ["-", "_", "/", "."];
function _2(t = "") {
  if (!k2.test(t))
    return t !== t.toLowerCase();
}
function S2(t) {
  const e = [];
  let n = "", i, r;
  for (const s of t) {
    const a = w2.includes(s);
    if (a === !0) {
      e.push(n), n = "", i = void 0;
      continue;
    }
    const o = _2(s);
    if (r === !1) {
      if (i === !1 && o === !0) {
        e.push(n), n = s, i = o;
        continue;
      }
      if (i === !0 && o === !1 && n.length > 1) {
        const l = n.at(-1);
        e.push(n.slice(0, Math.max(0, n.length - 1))), n = l + s, i = o;
        continue;
      }
    }
    n += s, i = o, r = a;
  }
  return e.push(n), e;
}
function Sa(t) {
  return t ? S2(t).map((e) => C2(e)).join("") : "";
}
function x2(t) {
  return A2(Sa(t || ""));
}
function C2(t) {
  return t ? t[0].toUpperCase() + t.slice(1) : "";
}
function A2(t) {
  return t ? t[0].toLowerCase() + t.slice(1) : "";
}
function Yt(t) {
  if (!t)
    return {};
  const e = {};
  function n(i, r) {
    if (i.startsWith("-moz-") || i.startsWith("-webkit-") || i.startsWith("-ms-") || i.startsWith("-o-")) {
      e[Sa(i)] = r;
      return;
    }
    if (i.startsWith("--")) {
      e[i] = r;
      return;
    }
    e[x2(i)] = r;
  }
  return y2(t, n), e;
}
function Pt(...t) {
  return (...e) => {
    for (const n of t)
      typeof n == "function" && n(...e);
  };
}
function E2(t, e) {
  const n = RegExp(t, "g");
  return (i) => {
    if (typeof i != "string")
      throw new TypeError(`expected an argument of type string, but got ${typeof i}`);
    return i.match(n) ? i.replace(n, e) : i;
  };
}
const P2 = E2(/[A-Z]/, (t) => `-${t.toLowerCase()}`);
function T2(t) {
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new TypeError(`expected an argument of type object, but got ${typeof t}`);
  return Object.keys(t).map((e) => `${P2(e)}: ${t[e]};`).join(`
`);
}
function $i(t = {}) {
  return T2(t).replace(`
`, " ");
}
const O2 = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
  transform: "translateX(-100%)"
}, Z2 = $i(O2), z2 = [
  "onabort",
  "onanimationcancel",
  "onanimationend",
  "onanimationiteration",
  "onanimationstart",
  "onauxclick",
  "onbeforeinput",
  "onbeforetoggle",
  "onblur",
  "oncancel",
  "oncanplay",
  "oncanplaythrough",
  "onchange",
  "onclick",
  "onclose",
  "oncompositionend",
  "oncompositionstart",
  "oncompositionupdate",
  "oncontextlost",
  "oncontextmenu",
  "oncontextrestored",
  "oncopy",
  "oncuechange",
  "oncut",
  "ondblclick",
  "ondrag",
  "ondragend",
  "ondragenter",
  "ondragleave",
  "ondragover",
  "ondragstart",
  "ondrop",
  "ondurationchange",
  "onemptied",
  "onended",
  "onerror",
  "onfocus",
  "onfocusin",
  "onfocusout",
  "onformdata",
  "ongotpointercapture",
  "oninput",
  "oninvalid",
  "onkeydown",
  "onkeypress",
  "onkeyup",
  "onload",
  "onloadeddata",
  "onloadedmetadata",
  "onloadstart",
  "onlostpointercapture",
  "onmousedown",
  "onmouseenter",
  "onmouseleave",
  "onmousemove",
  "onmouseout",
  "onmouseover",
  "onmouseup",
  "onpaste",
  "onpause",
  "onplay",
  "onplaying",
  "onpointercancel",
  "onpointerdown",
  "onpointerenter",
  "onpointerleave",
  "onpointermove",
  "onpointerout",
  "onpointerover",
  "onpointerup",
  "onprogress",
  "onratechange",
  "onreset",
  "onresize",
  "onscroll",
  "onscrollend",
  "onsecuritypolicyviolation",
  "onseeked",
  "onseeking",
  "onselect",
  "onselectionchange",
  "onselectstart",
  "onslotchange",
  "onstalled",
  "onsubmit",
  "onsuspend",
  "ontimeupdate",
  "ontoggle",
  "ontouchcancel",
  "ontouchend",
  "ontouchmove",
  "ontouchstart",
  "ontransitioncancel",
  "ontransitionend",
  "ontransitionrun",
  "ontransitionstart",
  "onvolumechange",
  "onwaiting",
  "onwebkitanimationend",
  "onwebkitanimationiteration",
  "onwebkitanimationstart",
  "onwebkittransitionend",
  "onwheel"
], I2 = new Set(z2);
function N2(t) {
  return I2.has(t);
}
function me(...t) {
  const e = { ...t[0] };
  for (let n = 1; n < t.length; n++) {
    const i = t[n];
    if (i) {
      for (const r of Object.keys(i)) {
        const s = e[r], a = i[r], o = typeof s == "function", l = typeof a == "function";
        if (o && N2(r)) {
          const d = s, c = a;
          e[r] = _a(d, c);
        } else if (o && l)
          e[r] = Pt(s, a);
        else if (r === "class") {
          const d = Oi(s), c = Oi(a);
          d && c ? e[r] = yn(s, a) : d ? e[r] = yn(s) : c && (e[r] = yn(a));
        } else if (r === "style") {
          const d = typeof s == "object", c = typeof a == "object", u = typeof s == "string", m = typeof a == "string";
          if (d && c)
            e[r] = { ...s, ...a };
          else if (d && m) {
            const p = Yt(a);
            e[r] = { ...s, ...p };
          } else if (u && c) {
            const p = Yt(s);
            e[r] = { ...p, ...a };
          } else if (u && m) {
            const p = Yt(s), f = Yt(a);
            e[r] = { ...p, ...f };
          } else d ? e[r] = s : c ? e[r] = a : u ? e[r] = s : m && (e[r] = a);
        } else
          e[r] = a !== void 0 ? a : s;
      }
      for (const r of Object.getOwnPropertySymbols(i)) {
        const s = e[r], a = i[r];
        e[r] = a !== void 0 ? a : s;
      }
    }
  }
  return typeof e.style == "object" && (e.style = $i(e.style).replaceAll(`
`, " ")), e.hidden !== !0 && (e.hidden = void 0, delete e.hidden), e.disabled !== !0 && (e.disabled = void 0, delete e.disabled), e;
}
const xa = typeof window < "u" ? window : void 0;
function j2(t) {
  let e = t.activeElement;
  for (; e?.shadowRoot; ) {
    const n = e.shadowRoot.activeElement;
    if (n === e)
      break;
    e = n;
  }
  return e;
}
class Zi extends Map {
  /** @type {Map<K, Source<number>>} */
  #e = /* @__PURE__ */ new Map();
  #t = /* @__PURE__ */ N(0);
  #n = /* @__PURE__ */ N(0);
  #i = Ke || -1;
  /**
   * @param {Iterable<readonly [K, V]> | null | undefined} [value]
   */
  constructor(e) {
    if (super(), e) {
      for (var [n, i] of e)
        super.set(n, i);
      this.#n.v = super.size;
    }
  }
  /**
   * If the source is being created inside the same reaction as the SvelteMap instance,
   * we use `state` so that it will not be a dependency of the reaction. Otherwise we
   * use `source` so it will be.
   *
   * @template T
   * @param {T} value
   * @returns {Source<T>}
   */
  #r(e) {
    return Ke === this.#i ? /* @__PURE__ */ N(e) : ht(e);
  }
  /** @param {K} key */
  has(e) {
    var n = this.#e, i = n.get(e);
    if (i === void 0) {
      var r = super.get(e);
      if (r !== void 0)
        i = this.#r(0), n.set(e, i);
      else
        return h(this.#t), !1;
    }
    return h(i), !0;
  }
  /**
   * @param {(value: V, key: K, map: Map<K, V>) => void} callbackfn
   * @param {any} [this_arg]
   */
  forEach(e, n) {
    this.#s(), super.forEach(e, n);
  }
  /** @param {K} key */
  get(e) {
    var n = this.#e, i = n.get(e);
    if (i === void 0) {
      var r = super.get(e);
      if (r !== void 0)
        i = this.#r(0), n.set(e, i);
      else {
        h(this.#t);
        return;
      }
    }
    return h(i), super.get(e);
  }
  /**
   * @param {K} key
   * @param {V} value
   * */
  set(e, n) {
    var i = this.#e, r = i.get(e), s = super.get(e), a = super.set(e, n), o = this.#t;
    if (r === void 0)
      r = this.#r(0), i.set(e, r), C(this.#n, super.size), Ze(o);
    else if (s !== n) {
      Ze(r);
      var l = o.reactions === null ? null : new Set(o.reactions), d = l === null || !r.reactions?.every(
        (c) => (
          /** @type {NonNullable<typeof v_reactions>} */
          l.has(c)
        )
      );
      d && Ze(o);
    }
    return a;
  }
  /** @param {K} key */
  delete(e) {
    var n = this.#e, i = n.get(e), r = super.delete(e);
    return i !== void 0 && (n.delete(e), C(this.#n, super.size), C(i, -1), Ze(this.#t)), r;
  }
  clear() {
    if (super.size !== 0) {
      super.clear();
      var e = this.#e;
      C(this.#n, 0);
      for (var n of e.values())
        C(n, -1);
      Ze(this.#t), e.clear();
    }
  }
  #s() {
    h(this.#t);
    var e = this.#e;
    if (this.#n.v !== e.size) {
      for (var n of super.keys())
        if (!e.has(n)) {
          var i = this.#r(0);
          e.set(n, i);
        }
    }
    for ([, i] of this.#e)
      h(i);
  }
  keys() {
    return h(this.#t), super.keys();
  }
  values() {
    return this.#s(), super.values();
  }
  entries() {
    return this.#s(), super.entries();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return h(this.#n), super.size;
  }
}
class D2 {
  #e;
  #t;
  constructor(e = {}) {
    const { window: n = xa, document: i = n?.document } = e;
    n !== void 0 && (this.#e = i, this.#t = Ms((r) => {
      const s = le(n, "focusin", r), a = le(n, "focusout", r);
      return () => {
        s(), a();
      };
    }));
  }
  get current() {
    return this.#t?.(), this.#e ? j2(this.#e) : null;
  }
}
new D2();
function M2(t) {
  return typeof t == "function";
}
class kt {
  #e;
  #t;
  /**
   * @param name The name of the context.
   * This is used for generating the context key and error messages.
   */
  constructor(e) {
    this.#e = e, this.#t = Symbol(e);
  }
  /**
   * The key used to get and set the context.
   *
   * It is not recommended to use this value directly.
   * Instead, use the methods provided by this class.
   */
  get key() {
    return this.#t;
  }
  /**
   * Checks whether this has been set in the context of a parent component.
   *
   * Must be called during component initialisation.
   */
  exists() {
    return K1(this.#t);
  }
  /**
   * Retrieves the context that belongs to the closest parent component.
   *
   * Must be called during component initialisation.
   *
   * @throws An error if the context does not exist.
   */
  get() {
    const e = Fr(this.#t);
    if (e === void 0)
      throw new Error(`Context "${this.#e}" not found`);
    return e;
  }
  /**
   * Retrieves the context that belongs to the closest parent component,
   * or the given fallback value if the context does not exist.
   *
   * Must be called during component initialisation.
   */
  getOr(e) {
    const n = Fr(this.#t);
    return n === void 0 ? e : n;
  }
  /**
   * Associates the given value with the current component and returns it.
   *
   * Must be called during component initialisation.
   */
  set(e) {
    return W1(this.#t, e);
  }
}
function F2(t, e) {
  switch (t) {
    case "post":
      se(e);
      break;
    case "pre":
      Yi(e);
      break;
  }
}
function Ca(t, e, n, i = {}) {
  const { lazy: r = !1 } = i;
  let s = !r, a = Array.isArray(t) ? [] : void 0;
  F2(e, () => {
    const o = Array.isArray(t) ? t.map((d) => d()) : t();
    if (!s) {
      s = !0, a = o;
      return;
    }
    const l = De(() => n(o, a));
    return a = o, l;
  });
}
function X(t, e, n) {
  Ca(t, "post", e, n);
}
function R2(t, e, n) {
  Ca(t, "pre", e, n);
}
X.pre = R2;
function is(t) {
  return M2(t) ? t() : t;
}
class L2 {
  // no need to use `$state` here since we are using createSubscriber
  #e = { width: 0, height: 0 };
  #t = !1;
  #n;
  #i;
  #r;
  // we use a derived here to extract the width so that if the width doesn't change we don't get a state update
  // which we would get if we would just use a getter since the version of the subscriber will be changing
  #s = /* @__PURE__ */ P(() => (h(this.#a)?.(), this.getSize().width));
  // we use a derived here to extract the height so that if the height doesn't change we don't get a state update
  // which we would get if we would just use a getter since the version of the subscriber will be changing
  #o = /* @__PURE__ */ P(() => (h(this.#a)?.(), this.getSize().height));
  // we need to use a derived here because the class will be created before the node is bound to the ref
  #a = /* @__PURE__ */ P(() => {
    const e = is(this.#i);
    if (e)
      return Ms((n) => {
        if (!this.#r) return;
        const i = new this.#r.ResizeObserver((r) => {
          this.#t = !0;
          for (const s of r) {
            const a = this.#n.box === "content-box" ? s.contentBoxSize : s.borderBoxSize, o = Array.isArray(a) ? a : [a];
            this.#e.width = o.reduce((l, d) => Math.max(l, d.inlineSize), 0), this.#e.height = o.reduce((l, d) => Math.max(l, d.blockSize), 0);
          }
          n();
        });
        return i.observe(e), () => {
          this.#t = !1, i.disconnect();
        };
      });
  });
  constructor(e, n = { box: "border-box" }) {
    this.#r = n.window ?? xa, this.#n = n, this.#i = e, this.#e = { width: 0, height: 0 };
  }
  calculateSize() {
    const e = is(this.#i);
    if (!e || !this.#r)
      return;
    const n = e.offsetWidth, i = e.offsetHeight;
    if (this.#n.box === "border-box")
      return { width: n, height: i };
    const r = this.#r.getComputedStyle(e), s = parseFloat(r.paddingLeft) + parseFloat(r.paddingRight), a = parseFloat(r.paddingTop) + parseFloat(r.paddingBottom), o = parseFloat(r.borderLeftWidth) + parseFloat(r.borderRightWidth), l = parseFloat(r.borderTopWidth) + parseFloat(r.borderBottomWidth), d = n - s - o, c = i - a - l;
    return { width: d, height: c };
  }
  getSize() {
    return this.#t ? this.#e : this.calculateSize() ?? this.#e;
  }
  get current() {
    return h(this.#a)?.(), this.getSize();
  }
  get width() {
    return h(this.#s);
  }
  get height() {
    return h(this.#o);
  }
}
class Aa {
  #e = /* @__PURE__ */ N(void 0);
  constructor(e, n) {
    n !== void 0 && C(this.#e, n, !0), X(() => e(), (i, r) => {
      C(this.#e, r, !0);
    });
  }
  get current() {
    return h(this.#e);
  }
}
function wt(t) {
  se(() => () => {
    t();
  });
}
function Ea(t, e) {
  return setTimeout(e, t);
}
function dn(t) {
  la().then(t);
}
function Pa(t) {
  se(() => De(() => t()));
}
const B2 = 1, H2 = 9, V2 = 11;
function zi(t) {
  return ln(t) && t.nodeType === B2 && typeof t.nodeName == "string";
}
function Ta(t) {
  return ln(t) && t.nodeType === H2;
}
function W2(t) {
  return ln(t) && t.constructor?.name === "VisualViewport";
}
function K2(t) {
  return ln(t) && t.nodeType !== void 0;
}
function Oa(t) {
  return K2(t) && t.nodeType === V2 && "host" in t;
}
function U2(t, e) {
  if (!t || !e || !zi(t) || !zi(e))
    return !1;
  const n = e.getRootNode?.();
  if (t === e || t.contains(e))
    return !0;
  if (n && Oa(n)) {
    let i = e;
    for (; i; ) {
      if (t === i)
        return !0;
      i = i.parentNode || i.host;
    }
  }
  return !1;
}
function q2(t) {
  return Ta(t) ? t : W2(t) ? t.document : t?.ownerDocument ?? document;
}
function Za(t) {
  return Oa(t) ? Za(t.host) : Ta(t) ? t.defaultView ?? window : zi(t) ? t.ownerDocument?.defaultView ?? window : window;
}
function G2(t) {
  let e = t.activeElement;
  for (; e?.shadowRoot; ) {
    const n = e.shadowRoot.activeElement;
    if (n === e)
      break;
    e = n;
  }
  return e;
}
class cn {
  element;
  #e = /* @__PURE__ */ P(() => this.element.current ? this.element.current.getRootNode() ?? document : document);
  get root() {
    return h(this.#e);
  }
  set root(e) {
    C(this.#e, e);
  }
  constructor(e) {
    typeof e == "function" ? this.element = w.with(e) : this.element = e;
  }
  getDocument = () => q2(this.root);
  getWindow = () => this.getDocument().defaultView ?? window;
  getActiveElement = () => G2(this.root);
  isActiveElement = (e) => e === this.getActiveElement();
  getElementById(e) {
    return this.root.getElementById(e);
  }
  querySelector = (e) => this.root ? this.root.querySelector(e) : null;
  querySelectorAll = (e) => this.root ? this.root.querySelectorAll(e) : [];
  setTimeout = (e, n) => this.getWindow().setTimeout(e, n);
  clearTimeout = (e) => this.getWindow().clearTimeout(e);
}
function _e(t, e) {
  return {
    [xo()]: (n) => w.isBox(t) ? (t.current = n, De(() => e?.(n)), () => {
      "isConnected" in n && n.isConnected || (t.current = null, e?.(null));
    }) : (t(n), De(() => e?.(n)), () => {
      "isConnected" in n && n.isConnected || (t(null), e?.(null));
    })
  };
}
function za(t) {
  return t ? "open" : "closed";
}
function Y2(t) {
  return t ? "true" : "false";
}
function Xn(t) {
  return t ? "" : void 0;
}
function X2(t) {
  return t ? "true" : "false";
}
function J2(t) {
  return t ? "true" : void 0;
}
function Q2(t) {
  return t ? !0 : void 0;
}
function Ia(t) {
  return t ? !0 : void 0;
}
function $2(t) {
  return t ? !0 : void 0;
}
class el {
  #e;
  #t;
  attrs;
  constructor(e) {
    this.#e = e.getVariant ? e.getVariant() : null, this.#t = this.#e ? `data-${this.#e}-` : `data-${e.component}-`, this.getAttr = this.getAttr.bind(this), this.selector = this.selector.bind(this), this.attrs = Object.fromEntries(e.parts.map((n) => [n, this.getAttr(n)]));
  }
  getAttr(e, n) {
    return n ? `data-${n}-${e}` : `${this.#t}${e}`;
  }
  selector(e, n) {
    return `[${this.getAttr(e, n)}]`;
  }
}
function Na(t) {
  const e = new el(t);
  return {
    ...e.attrs,
    selector: e.selector,
    getAttr: e.getAttr
  };
}
const Je = "ArrowDown", er = "ArrowLeft", tr = "ArrowRight", He = "ArrowUp", nr = "End", Ii = "Enter", tl = "Escape", ir = "Home", ja = "PageDown", Da = "PageUp", kn = " ", rs = "Tab";
function nl(t) {
  return window.getComputedStyle(t).getPropertyValue("direction");
}
function il(t = "ltr", e = "horizontal") {
  return {
    horizontal: t === "rtl" ? er : tr,
    vertical: Je
  }[e];
}
function rl(t = "ltr", e = "horizontal") {
  return {
    horizontal: t === "rtl" ? tr : er,
    vertical: He
  }[e];
}
function sl(t = "ltr", e = "horizontal") {
  return ["ltr", "rtl"].includes(t) || (t = "ltr"), ["horizontal", "vertical"].includes(e) || (e = "horizontal"), {
    nextKey: il(t, e),
    prevKey: rl(t, e)
  };
}
const Ma = typeof document < "u", Ni = al();
function al() {
  return Ma && window?.navigator?.userAgent && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || // The new iPad Pro Gen3 does not identify itself as iPad, but as Macintosh.
  window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function ji(t) {
  return t instanceof HTMLElement;
}
function ol(t) {
  return t instanceof Element;
}
function ll(t) {
  return t !== null;
}
class dl {
  #e;
  #t = w(null);
  constructor(e) {
    this.#e = e;
  }
  getCandidateNodes() {
    return this.#e.rootNode.current ? this.#e.candidateSelector ? Array.from(this.#e.rootNode.current.querySelectorAll(this.#e.candidateSelector)) : this.#e.candidateAttr ? Array.from(this.#e.rootNode.current.querySelectorAll(`[${this.#e.candidateAttr}]:not([data-disabled])`)) : [] : [];
  }
  focusFirstCandidate() {
    const e = this.getCandidateNodes();
    e.length && e[0]?.focus();
  }
  handleKeydown(e, n, i = !1) {
    const r = this.#e.rootNode.current;
    if (!r || !e)
      return;
    const s = this.getCandidateNodes();
    if (!s.length)
      return;
    const a = s.indexOf(e), o = nl(r), { nextKey: l, prevKey: d } = sl(o, this.#e.orientation.current), c = this.#e.loop.current, u = {
      [l]: a + 1,
      [d]: a - 1,
      [ir]: 0,
      [nr]: s.length - 1
    };
    if (i) {
      const f = l === Je ? tr : Je, g = d === He ? er : He;
      u[f] = a + 1, u[g] = a - 1;
    }
    let m = u[n.key];
    if (m === void 0)
      return;
    n.preventDefault(), m < 0 && c ? m = s.length - 1 : m === s.length && c && (m = 0);
    const p = s[m];
    if (p)
      return p.focus(), this.#t.current = p.id, this.#e.onCandidateFocus?.(p), p;
  }
  getTabIndex(e) {
    const n = this.getCandidateNodes(), i = this.#t.current !== null;
    return e && !i && n[0] === e ? (this.#t.current = e.id, 0) : e?.id === this.#t.current ? 0 : -1;
  }
  setCurrentTabStopId(e) {
    this.#t.current = e;
  }
  focusCurrentTabStop() {
    const e = this.#t.current;
    if (!e)
      return;
    const n = this.#e.rootNode.current?.querySelector(`#${e}`);
    !n || !ji(n) || n.focus();
  }
}
function ee() {
}
function Re(t, e) {
  return `bits-${t}`;
}
class cl {
  state;
  #e;
  constructor(e, n) {
    this.state = w(e), this.#e = n, this.dispatch = this.dispatch.bind(this);
  }
  #t(e) {
    return this.#e[this.state.current][e] ?? this.state.current;
  }
  dispatch(e) {
    this.state.current = this.#t(e);
  }
}
const ul = {
  mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
  unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
  unmounted: { MOUNT: "mounted" }
};
class ml {
  opts;
  #e = /* @__PURE__ */ N("none");
  get prevAnimationNameState() {
    return h(this.#e);
  }
  set prevAnimationNameState(e) {
    C(this.#e, e, !0);
  }
  #t = /* @__PURE__ */ N(ce({}));
  get styles() {
    return h(this.#t);
  }
  set styles(e) {
    C(this.#t, e, !0);
  }
  initialStatus;
  previousPresent;
  machine;
  present;
  constructor(e) {
    this.opts = e, this.present = this.opts.open, this.initialStatus = e.open.current ? "mounted" : "unmounted", this.previousPresent = new Aa(() => this.present.current), this.machine = new cl(this.initialStatus, ul), this.handleAnimationEnd = this.handleAnimationEnd.bind(this), this.handleAnimationStart = this.handleAnimationStart.bind(this), fl(this), hl(this), pl(this);
  }
  /**
   * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
   * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
   * make sure we only trigger ANIMATION_END for the currently active animation.
   */
  handleAnimationEnd(e) {
    if (!this.opts.ref.current) return;
    const n = Tn(this.opts.ref.current), i = n.includes(e.animationName) || n === "none";
    e.target === this.opts.ref.current && i && this.machine.dispatch("ANIMATION_END");
  }
  handleAnimationStart(e) {
    this.opts.ref.current && e.target === this.opts.ref.current && (this.prevAnimationNameState = Tn(this.opts.ref.current));
  }
  #n = /* @__PURE__ */ P(() => ["mounted", "unmountSuspended"].includes(this.machine.state.current));
  get isPresent() {
    return h(this.#n);
  }
  set isPresent(e) {
    C(this.#n, e);
  }
}
function fl(t) {
  X(() => t.present.current, () => {
    if (!t.opts.ref.current || !(t.present.current !== t.previousPresent.current)) return;
    const n = t.prevAnimationNameState, i = Tn(t.opts.ref.current);
    if (t.present.current)
      t.machine.dispatch("MOUNT");
    else if (i === "none" || t.styles.display === "none")
      t.machine.dispatch("UNMOUNT");
    else {
      const r = n !== i;
      t.previousPresent.current && r ? t.machine.dispatch("ANIMATION_OUT") : t.machine.dispatch("UNMOUNT");
    }
  });
}
function hl(t) {
  X(() => t.machine.state.current, () => {
    if (!t.opts.ref.current) return;
    const e = Tn(t.opts.ref.current);
    t.prevAnimationNameState = t.machine.state.current === "mounted" ? e : "none";
  });
}
function pl(t) {
  X(() => t.opts.ref.current, () => {
    if (t.opts.ref.current)
      return t.styles = getComputedStyle(t.opts.ref.current), Pt(le(t.opts.ref.current, "animationstart", t.handleAnimationStart), le(t.opts.ref.current, "animationcancel", t.handleAnimationEnd), le(t.opts.ref.current, "animationend", t.handleAnimationEnd));
  });
}
function Tn(t) {
  return t && getComputedStyle(t).animationName || "none";
}
function gl(t, e) {
  K(e, !0);
  const n = new ml({ open: w.with(() => e.open), ref: e.ref });
  var i = I(), r = Z(i);
  {
    var s = (a) => {
      var o = I(), l = Z(o);
      B(l, () => e.presence ?? J, () => ({ present: n.isPresent })), T(a, o);
    };
    $(r, (a) => {
      (e.forceMount || e.open || n.isPresent) && a(s);
    });
  }
  T(t, i), U();
}
class vl {
  #e;
  #t = void 0;
  #n = !1;
  constructor(e) {
    this.#e = e, wt(() => this.#i());
  }
  #i() {
    this.#t && (window.cancelAnimationFrame(this.#t), this.#t = void 0), this.#n = !1;
  }
  run(e) {
    if (this.#n)
      return;
    this.#i(), this.#n = !0;
    const n = this.#e.ref.current;
    if (!n) {
      this.#n = !1;
      return;
    }
    if (typeof n.getAnimations != "function") {
      this.#r(e);
      return;
    }
    this.#t = window.requestAnimationFrame(() => {
      const i = n.getAnimations();
      if (i.length === 0) {
        this.#r(e);
        return;
      }
      Promise.allSettled(i.map((r) => r.finished)).then(() => {
        this.#r(e);
      });
    });
  }
  #r(e) {
    const n = () => {
      e(), this.#n = !1;
    };
    this.#e.afterTick ? dn(n) : n();
  }
}
class bl {
  #e;
  #t;
  #n;
  constructor(e) {
    this.#e = e, this.#t = e.enabled ?? !0, this.#n = new vl({
      ref: this.#e.ref,
      afterTick: this.#e.open
    }), X([() => this.#e.open.current], ([n]) => {
      this.#t && this.#n.run(() => {
        n === this.#e.open.current && this.#e.onComplete();
      });
    });
  }
}
function yl(t, e) {
  var n = I(), i = Z(n);
  Do(i, () => e.children, (r) => {
    var s = I(), a = Z(s);
    B(a, () => e.children ?? J), T(r, s);
  }), T(t, n);
}
const kl = new kt("BitsConfig");
function wl() {
  const t = new _l(null, {});
  return kl.getOr(t).opts;
}
class _l {
  opts;
  constructor(e, n) {
    const i = Sl(e, n);
    this.opts = {
      defaultPortalTo: i((r) => r.defaultPortalTo),
      defaultLocale: i((r) => r.defaultLocale)
    };
  }
}
function Sl(t, e) {
  return (n) => w.with(() => {
    const r = n(e)?.current;
    if (r !== void 0)
      return r;
    if (t !== null)
      return n(t.opts)?.current;
  });
}
function xl(t, e) {
  return (n) => {
    const i = wl();
    return w.with(() => {
      const r = n();
      if (r !== void 0)
        return r;
      const s = t(i).current;
      return s !== void 0 ? s : e;
    });
  };
}
const Cl = xl((t) => t.defaultPortalTo, "body");
function Al(t, e) {
  K(e, !0);
  const n = Cl(() => e.to), i = U1();
  let r = /* @__PURE__ */ P(s);
  function s() {
    if (!Ma || e.disabled) return null;
    let u = null;
    return typeof n.current == "string" ? u = document.querySelector(n.current) : u = n.current, u;
  }
  let a;
  function o() {
    a && (jo(a), a = null);
  }
  X([() => h(r), () => e.disabled], ([u, m]) => {
    if (!u || m) {
      o();
      return;
    }
    return a = fa(yl, { target: u, props: { children: e.children }, context: i }), () => {
      o();
    };
  });
  var l = I(), d = Z(l);
  {
    var c = (u) => {
      var m = I(), p = Z(m);
      B(p, () => e.children ?? J), T(u, m);
    };
    $(d, (u) => {
      e.disabled && u(c);
    });
  }
  T(t, l), U();
}
function Fa(t, e, n, i) {
  const r = Array.isArray(e) ? e : [e];
  return r.forEach((s) => t.addEventListener(s, n, i)), () => {
    r.forEach((s) => t.removeEventListener(s, n, i));
  };
}
function Di(t, e = 500) {
  let n = null;
  const i = (...r) => {
    n !== null && clearTimeout(n), n = setTimeout(() => {
      t(...r);
    }, e);
  };
  return i.destroy = () => {
    n !== null && (clearTimeout(n), n = null);
  }, i;
}
function Ra(t, e) {
  return t === e || t.contains(e);
}
function La(t) {
  return t?.ownerDocument ?? document;
}
function El(t, e) {
  const { clientX: n, clientY: i } = t, r = e.getBoundingClientRect();
  return n < r.left || n > r.right || i < r.top || i > r.bottom;
}
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
class rr {
  static create(e) {
    return new rr(e);
  }
  opts;
  #e;
  #t;
  #n = { pointerdown: !1 };
  #i = !1;
  #r = !1;
  #s = void 0;
  #o;
  #a = ee;
  constructor(e) {
    this.opts = e, this.#t = e.interactOutsideBehavior, this.#e = e.onInteractOutside, this.#o = e.onFocusOutside, se(() => {
      this.#s = La(this.opts.ref.current);
    });
    let n = ee;
    const i = () => {
      this.#p(), globalThis.bitsDismissableLayers.delete(this), this.#c.destroy(), n();
    };
    X([() => this.opts.enabled.current, () => this.opts.ref.current], () => {
      if (!(!this.opts.enabled.current || !this.opts.ref.current))
        return Ea(1, () => {
          this.opts.ref.current && (globalThis.bitsDismissableLayers.set(this, this.#t), n(), n = this.#d());
        }), i;
    }), wt(() => {
      this.#p.destroy(), globalThis.bitsDismissableLayers.delete(this), this.#c.destroy(), this.#a(), n();
    });
  }
  #l = (e) => {
    e.defaultPrevented || this.opts.ref.current && dn(() => {
      !this.opts.ref.current || this.#g(e.target) || e.target && !this.#r && this.#o.current?.(e);
    });
  };
  #d() {
    return Pt(
      /**
       * CAPTURE INTERACTION START
       * mark interaction-start event as intercepted.
       * mark responsible layer during interaction start
       * to avoid checking if is responsible layer during interaction end
       * when a new floating element may have been opened.
       */
      le(this.#s, "pointerdown", Pt(this.#h, this.#f), { capture: !0 }),
      /**
       * BUBBLE INTERACTION START
       * Mark interaction-start event as non-intercepted. Debounce `onInteractOutsideStart`
       * to avoid prematurely checking if other events were intercepted.
       */
      le(this.#s, "pointerdown", Pt(this.#m, this.#c)),
      /**
       * HANDLE FOCUS OUTSIDE
       */
      le(this.#s, "focusin", this.#l)
    );
  }
  #u = (e) => {
    let n = e;
    n.defaultPrevented && (n = ss(e)), this.#e.current(e);
  };
  #c = Di(
    (e) => {
      if (!this.opts.ref.current) {
        this.#a();
        return;
      }
      const n = this.opts.isValidEvent.current(e, this.opts.ref.current) || Ol(e, this.opts.ref.current);
      if (!this.#i || this.#v() || !n) {
        this.#a();
        return;
      }
      let i = e;
      if (i.defaultPrevented && (i = ss(i)), this.#t.current !== "close" && this.#t.current !== "defer-otherwise-close") {
        this.#a();
        return;
      }
      e.pointerType === "touch" ? (this.#a(), this.#a = Fa(this.#s, "click", this.#u, { once: !0 })) : this.#e.current(i);
    },
    10
  );
  #h = (e) => {
    this.#n[e.type] = !0;
  };
  #m = (e) => {
    this.#n[e.type] = !1;
  };
  #f = () => {
    this.opts.ref.current && (this.#i = Tl(this.opts.ref.current));
  };
  #g = (e) => this.opts.ref.current ? Ra(this.opts.ref.current, e) : !1;
  #p = Di(
    () => {
      for (const e in this.#n)
        this.#n[e] = !1;
      this.#i = !1;
    },
    20
  );
  #v() {
    return Object.values(this.#n).some(Boolean);
  }
  #b = () => {
    this.#r = !0;
  };
  #y = () => {
    this.#r = !1;
  };
  props = {
    onfocuscapture: this.#b,
    onblurcapture: this.#y
  };
}
function Pl(t) {
  return t.findLast(([e, { current: n }]) => n === "close" || n === "ignore");
}
function Tl(t) {
  const e = [...globalThis.bitsDismissableLayers], n = Pl(e);
  if (n) return n[0].opts.ref.current === t;
  const [i] = e[0];
  return i.opts.ref.current === t;
}
function Ol(t, e) {
  if ("button" in t && t.button > 0) return !1;
  const n = t.target;
  return ol(n) ? La(n).documentElement.contains(n) && !Ra(e, n) && El(t, e) : !1;
}
function ss(t) {
  const e = t.currentTarget, n = t.target;
  let i;
  t instanceof PointerEvent ? i = new PointerEvent(t.type, t) : i = new PointerEvent("pointerdown", t);
  let r = !1;
  return new Proxy(i, {
    get: (a, o) => o === "currentTarget" ? e : o === "target" ? n : o === "preventDefault" ? () => {
      r = !0, typeof a.preventDefault == "function" && a.preventDefault();
    } : o === "defaultPrevented" ? r : o in a ? a[o] : t[o]
  });
}
function Zl(t, e) {
  K(e, !0);
  let n = S(e, "interactOutsideBehavior", 3, "close"), i = S(e, "onInteractOutside", 3, ee), r = S(e, "onFocusOutside", 3, ee), s = S(e, "isValidEvent", 3, () => !1);
  const a = rr.create({
    id: w.with(() => e.id),
    interactOutsideBehavior: w.with(() => n()),
    onInteractOutside: w.with(() => i()),
    enabled: w.with(() => e.enabled),
    onFocusOutside: w.with(() => r()),
    isValidEvent: w.with(() => s()),
    ref: e.ref
  });
  var o = I(), l = Z(o);
  B(l, () => e.children ?? J, () => ({ props: a.props })), T(t, o), U();
}
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
class sr {
  static create(e) {
    return new sr(e);
  }
  opts;
  domContext;
  constructor(e) {
    this.opts = e, this.domContext = new cn(this.opts.ref);
    let n = ee;
    X(() => e.enabled.current, (i) => (i && (globalThis.bitsEscapeLayers.set(this, e.escapeKeydownBehavior), n = this.#e()), () => {
      n(), globalThis.bitsEscapeLayers.delete(this);
    }));
  }
  #e = () => le(this.domContext.getDocument(), "keydown", this.#t, { passive: !1 });
  #t = (e) => {
    if (e.key !== tl || !zl(this)) return;
    const n = new KeyboardEvent(e.type, e);
    e.preventDefault();
    const i = this.opts.escapeKeydownBehavior.current;
    i !== "close" && i !== "defer-otherwise-close" || this.opts.onEscapeKeydown.current(n);
  };
}
function zl(t) {
  const e = [...globalThis.bitsEscapeLayers], n = e.findLast(([r, { current: s }]) => s === "close" || s === "ignore");
  if (n) return n[0] === t;
  const [i] = e[0];
  return i === t;
}
function Il(t, e) {
  K(e, !0);
  let n = S(e, "escapeKeydownBehavior", 3, "close"), i = S(e, "onEscapeKeydown", 3, ee);
  sr.create({
    escapeKeydownBehavior: w.with(() => n()),
    onEscapeKeydown: w.with(() => i()),
    enabled: w.with(() => e.enabled),
    ref: e.ref
  });
  var r = I(), s = Z(r);
  B(s, () => e.children ?? J), T(t, r), U();
}
class ar {
  static instance;
  #e = w([]);
  #t = /* @__PURE__ */ new WeakMap();
  #n = /* @__PURE__ */ new WeakMap();
  static getInstance() {
    return this.instance || (this.instance = new ar()), this.instance;
  }
  register(e) {
    const n = this.getActive();
    n && n !== e && n.pause();
    const i = document.activeElement;
    i && i !== document.body && this.#n.set(e, i), this.#e.current = this.#e.current.filter((r) => r !== e), this.#e.current.unshift(e);
  }
  unregister(e) {
    this.#e.current = this.#e.current.filter((i) => i !== e);
    const n = this.getActive();
    n && n.resume();
  }
  getActive() {
    return this.#e.current[0];
  }
  setFocusMemory(e, n) {
    this.#t.set(e, n);
  }
  getFocusMemory(e) {
    return this.#t.get(e);
  }
  isActiveScope(e) {
    return this.getActive() === e;
  }
  setPreFocusMemory(e, n) {
    this.#n.set(e, n);
  }
  getPreFocusMemory(e) {
    return this.#n.get(e);
  }
  clearPreFocusMemory(e) {
    this.#n.delete(e);
  }
}
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var Ba = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], Mi = /* @__PURE__ */ Ba.join(","), Ha = typeof Element > "u", It = Ha ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, On = !Ha && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t?.ownerDocument;
}, Zn = function t(e, n) {
  var i;
  n === void 0 && (n = !0);
  var r = e == null || (i = e.getAttribute) === null || i === void 0 ? void 0 : i.call(e, "inert"), s = r === "" || r === "true", a = s || n && e && t(e.parentNode);
  return a;
}, Nl = function(e) {
  var n, i = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "contenteditable");
  return i === "" || i === "true";
}, Va = function(e, n, i) {
  if (Zn(e))
    return [];
  var r = Array.prototype.slice.apply(e.querySelectorAll(Mi));
  return n && It.call(e, Mi) && r.unshift(e), r = r.filter(i), r;
}, Wa = function t(e, n, i) {
  for (var r = [], s = Array.from(e); s.length; ) {
    var a = s.shift();
    if (!Zn(a, !1))
      if (a.tagName === "SLOT") {
        var o = a.assignedElements(), l = o.length ? o : a.children, d = t(l, !0, i);
        i.flatten ? r.push.apply(r, d) : r.push({
          scopeParent: a,
          candidates: d
        });
      } else {
        var c = It.call(a, Mi);
        c && i.filter(a) && (n || !e.includes(a)) && r.push(a);
        var u = a.shadowRoot || // check for an undisclosed shadow
        typeof i.getShadowRoot == "function" && i.getShadowRoot(a), m = !Zn(u, !1) && (!i.shadowRootFilter || i.shadowRootFilter(a));
        if (u && m) {
          var p = t(u === !0 ? a.children : u.children, !0, i);
          i.flatten ? r.push.apply(r, p) : r.push({
            scopeParent: a,
            candidates: p
          });
        } else
          s.unshift.apply(s, a.children);
      }
  }
  return r;
}, Ka = function(e) {
  return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, Ua = function(e) {
  if (!e)
    throw new Error("No node provided");
  return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || Nl(e)) && !Ka(e) ? 0 : e.tabIndex;
}, jl = function(e, n) {
  var i = Ua(e);
  return i < 0 && n && !Ka(e) ? 0 : i;
}, Dl = function(e, n) {
  return e.tabIndex === n.tabIndex ? e.documentOrder - n.documentOrder : e.tabIndex - n.tabIndex;
}, qa = function(e) {
  return e.tagName === "INPUT";
}, Ml = function(e) {
  return qa(e) && e.type === "hidden";
}, Fl = function(e) {
  var n = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(i) {
    return i.tagName === "SUMMARY";
  });
  return n;
}, Rl = function(e, n) {
  for (var i = 0; i < e.length; i++)
    if (e[i].checked && e[i].form === n)
      return e[i];
}, Ll = function(e) {
  if (!e.name)
    return !0;
  var n = e.form || On(e), i = function(o) {
    return n.querySelectorAll('input[type="radio"][name="' + o + '"]');
  }, r;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    r = i(window.CSS.escape(e.name));
  else
    try {
      r = i(e.name);
    } catch (a) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", a.message), !1;
    }
  var s = Rl(r, e.form);
  return !s || s === e;
}, Bl = function(e) {
  return qa(e) && e.type === "radio";
}, Hl = function(e) {
  return Bl(e) && !Ll(e);
}, Vl = function(e) {
  var n, i = e && On(e), r = (n = i) === null || n === void 0 ? void 0 : n.host, s = !1;
  if (i && i !== e) {
    var a, o, l;
    for (s = !!((a = r) !== null && a !== void 0 && (o = a.ownerDocument) !== null && o !== void 0 && o.contains(r) || e != null && (l = e.ownerDocument) !== null && l !== void 0 && l.contains(e)); !s && r; ) {
      var d, c, u;
      i = On(r), r = (d = i) === null || d === void 0 ? void 0 : d.host, s = !!((c = r) !== null && c !== void 0 && (u = c.ownerDocument) !== null && u !== void 0 && u.contains(r));
    }
  }
  return s;
}, as = function(e) {
  var n = e.getBoundingClientRect(), i = n.width, r = n.height;
  return i === 0 && r === 0;
}, Wl = function(e, n) {
  var i = n.displayCheck, r = n.getShadowRoot;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  var s = It.call(e, "details>summary:first-of-type"), a = s ? e.parentElement : e;
  if (It.call(a, "details:not([open]) *"))
    return !0;
  if (!i || i === "full" || i === "legacy-full") {
    if (typeof r == "function") {
      for (var o = e; e; ) {
        var l = e.parentElement, d = On(e);
        if (l && !l.shadowRoot && r(l) === !0)
          return as(e);
        e.assignedSlot ? e = e.assignedSlot : !l && d !== e.ownerDocument ? e = d.host : e = l;
      }
      e = o;
    }
    if (Vl(e))
      return !e.getClientRects().length;
    if (i !== "legacy-full")
      return !0;
  } else if (i === "non-zero-area")
    return as(e);
  return !1;
}, Kl = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var n = e.parentElement; n; ) {
      if (n.tagName === "FIELDSET" && n.disabled) {
        for (var i = 0; i < n.children.length; i++) {
          var r = n.children.item(i);
          if (r.tagName === "LEGEND")
            return It.call(n, "fieldset[disabled] *") ? !0 : !r.contains(e);
        }
        return !0;
      }
      n = n.parentElement;
    }
  return !1;
}, zn = function(e, n) {
  return !(n.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  Zn(n) || Ml(n) || Wl(n, e) || // For a details element with a summary, the summary element gets the focus
  Fl(n) || Kl(n));
}, os = function(e, n) {
  return !(Hl(n) || Ua(n) < 0 || !zn(e, n));
}, Ul = function(e) {
  var n = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(n) || n >= 0);
}, ql = function t(e) {
  var n = [], i = [];
  return e.forEach(function(r, s) {
    var a = !!r.scopeParent, o = a ? r.scopeParent : r, l = jl(o, a), d = a ? t(r.candidates) : o;
    l === 0 ? a ? n.push.apply(n, d) : n.push(o) : i.push({
      documentOrder: s,
      tabIndex: l,
      item: r,
      isScope: a,
      content: d
    });
  }), i.sort(Dl).reduce(function(r, s) {
    return s.isScope ? r.push.apply(r, s.content) : r.push(s.content), r;
  }, []).concat(n);
}, Gl = function(e, n) {
  n = n || {};
  var i;
  return n.getShadowRoot ? i = Wa([e], n.includeContainer, {
    filter: os.bind(null, n),
    flatten: !1,
    getShadowRoot: n.getShadowRoot,
    shadowRootFilter: Ul
  }) : i = Va(e, n.includeContainer, os.bind(null, n)), ql(i);
}, Yl = function(e, n) {
  n = n || {};
  var i;
  return n.getShadowRoot ? i = Wa([e], n.includeContainer, {
    filter: zn.bind(null, n),
    flatten: !0,
    getShadowRoot: n.getShadowRoot
  }) : i = Va(e, n.includeContainer, zn.bind(null, n)), i;
}, Xl = /* @__PURE__ */ Ba.concat("iframe").join(","), Jl = function(e, n) {
  if (n = n || {}, !e)
    throw new Error("No node provided");
  return It.call(e, Xl) === !1 ? !1 : zn(n, e);
};
class or {
  #e = !1;
  #t = null;
  #n = ar.getInstance();
  #i = [];
  #r;
  constructor(e) {
    this.#r = e;
  }
  get paused() {
    return this.#e;
  }
  pause() {
    this.#e = !0;
  }
  resume() {
    this.#e = !1;
  }
  #s() {
    for (const e of this.#i)
      e();
    this.#i = [];
  }
  mount(e) {
    this.#t && this.unmount(), this.#t = e, this.#n.register(this), this.#l(), this.#o();
  }
  unmount() {
    this.#t && (this.#s(), this.#a(), this.#n.unregister(this), this.#n.clearPreFocusMemory(this), this.#t = null);
  }
  #o() {
    if (!this.#t) return;
    const e = new CustomEvent("focusScope.onOpenAutoFocus", { bubbles: !1, cancelable: !0 });
    this.#r.onOpenAutoFocus.current(e), e.defaultPrevented || requestAnimationFrame(() => {
      if (!this.#t) return;
      const n = this.#u();
      n ? (n.focus(), this.#n.setFocusMemory(this, n)) : this.#t.focus();
    });
  }
  #a() {
    const e = new CustomEvent("focusScope.onCloseAutoFocus", { bubbles: !1, cancelable: !0 });
    if (this.#r.onCloseAutoFocus.current?.(e), !e.defaultPrevented) {
      const n = this.#n.getPreFocusMemory(this);
      if (n && document.contains(n))
        try {
          n.focus();
        } catch {
          document.body.focus();
        }
    }
  }
  #l() {
    if (!this.#t || !this.#r.trap.current) return;
    const e = this.#t, n = e.ownerDocument, i = (a) => {
      if (this.#e || !this.#n.isActiveScope(this)) return;
      const o = a.target;
      if (!o) return;
      if (e.contains(o))
        this.#n.setFocusMemory(this, o);
      else {
        const d = this.#n.getFocusMemory(this);
        if (d && e.contains(d) && Jl(d))
          a.preventDefault(), d.focus();
        else {
          const c = this.#u(), u = this.#c()[0];
          (c || u || e).focus();
        }
      }
    }, r = (a) => {
      if (!this.#r.loop || this.#e || a.key !== "Tab" || !this.#n.isActiveScope(this)) return;
      const o = this.#d();
      if (o.length < 2) return;
      const l = o[0], d = o[o.length - 1];
      !a.shiftKey && n.activeElement === d ? (a.preventDefault(), l.focus()) : a.shiftKey && n.activeElement === l && (a.preventDefault(), d.focus());
    };
    this.#i.push(le(n, "focusin", i, { capture: !0 }), le(e, "keydown", r));
    const s = new MutationObserver(() => {
      const a = this.#n.getFocusMemory(this);
      if (a && !e.contains(a)) {
        const o = this.#u(), l = this.#c()[0], d = o || l;
        d ? (d.focus(), this.#n.setFocusMemory(this, d)) : e.focus();
      }
    });
    s.observe(e, { childList: !0, subtree: !0 }), this.#i.push(() => s.disconnect());
  }
  #d() {
    return this.#t ? Gl(this.#t, { includeContainer: !1, getShadowRoot: !0 }) : [];
  }
  #u() {
    return this.#d()[0] || null;
  }
  #c() {
    return this.#t ? Yl(this.#t, { includeContainer: !1, getShadowRoot: !0 }) : [];
  }
  static use(e) {
    let n = null;
    return X([() => e.ref.current, () => e.enabled.current], ([i, r]) => {
      i && r ? (n || (n = new or(e)), n.mount(i)) : n && (n.unmount(), n = null);
    }), wt(() => {
      n?.unmount();
    }), {
      get props() {
        return { tabindex: -1 };
      }
    };
  }
}
function Ql(t, e) {
  K(e, !0);
  let n = S(e, "enabled", 3, !1), i = S(e, "trapFocus", 3, !1), r = S(e, "loop", 3, !1), s = S(e, "onCloseAutoFocus", 3, ee), a = S(e, "onOpenAutoFocus", 3, ee);
  const o = or.use({
    enabled: w.with(() => n()),
    trap: w.with(() => i()),
    loop: r(),
    onCloseAutoFocus: w.with(() => s()),
    onOpenAutoFocus: w.with(() => a()),
    ref: e.ref
  });
  var l = I(), d = Z(l);
  B(d, () => e.focusScope ?? J, () => ({ props: o.props })), T(t, l), U();
}
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
class lr {
  static create(e) {
    return new lr(e);
  }
  opts;
  domContext;
  #e = ee;
  constructor(e) {
    this.opts = e, this.domContext = new cn(e.ref);
    let n = ee;
    X(() => this.opts.enabled.current, (i) => (i && (globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled), n(), n = this.#t()), () => {
      n(), this.#i(), globalThis.bitsTextSelectionLayers.delete(this);
    }));
  }
  #t() {
    return Pt(le(this.domContext.getDocument(), "pointerdown", this.#n), le(this.domContext.getDocument(), "pointerup", _a(this.#i, this.opts.onPointerUp.current)));
  }
  #n = (e) => {
    const n = this.opts.ref.current, i = e.target;
    !ji(n) || !ji(i) || !this.opts.enabled.current || !ed(this) || !U2(n, i) || (this.opts.onPointerDown.current(e), !e.defaultPrevented && (this.#e = $l(n, this.domContext.getDocument().body)));
  };
  #i = () => {
    this.#e(), this.#e = ee;
  };
}
const ls = (t) => t.style.userSelect || t.style.webkitUserSelect;
function $l(t, e) {
  const n = ls(e), i = ls(t);
  return pn(e, "none"), pn(t, "text"), () => {
    pn(e, n), pn(t, i);
  };
}
function pn(t, e) {
  t.style.userSelect = e, t.style.webkitUserSelect = e;
}
function ed(t) {
  const e = [...globalThis.bitsTextSelectionLayers];
  if (!e.length) return !1;
  const n = e.at(-1);
  return n ? n[0] === t : !1;
}
function td(t, e) {
  K(e, !0);
  let n = S(e, "preventOverflowTextSelection", 3, !0), i = S(e, "onPointerDown", 3, ee), r = S(e, "onPointerUp", 3, ee);
  lr.create({
    id: w.with(() => e.id),
    onPointerDown: w.with(() => i()),
    onPointerUp: w.with(() => r()),
    enabled: w.with(() => e.enabled && n()),
    ref: e.ref
  });
  var s = I(), a = Z(s);
  B(a, () => e.children ?? J), T(t, s), U();
}
globalThis.bitsIdCounter ??= { current: 0 };
function dr(t = "bits") {
  return globalThis.bitsIdCounter.current++, `${t}-${globalThis.bitsIdCounter.current}`;
}
class nd {
  #e;
  #t = 0;
  #n = /* @__PURE__ */ N();
  #i;
  constructor(e) {
    this.#e = e;
  }
  #r() {
    this.#t -= 1, this.#i && this.#t <= 0 && (this.#i(), C(this.#n, void 0), this.#i = void 0);
  }
  get(...e) {
    return this.#t += 1, h(this.#n) === void 0 && (this.#i = po(() => {
      C(this.#n, this.#e(...e), !0);
    })), se(() => () => {
      this.#r();
    }), h(this.#n);
  }
}
const wn = new Zi();
let gn = /* @__PURE__ */ N(null), vi = null, Ut = null, qt = !1;
const ds = w.with(() => {
  for (const t of wn.values())
    if (t) return !0;
  return !1;
});
let bi = null;
const id = new nd(() => {
  function t() {
    document.body.setAttribute("style", h(gn) ?? ""), document.body.style.removeProperty("--scrollbar-width"), Ni && vi?.(), C(gn, null);
  }
  function e() {
    Ut !== null && (window.clearTimeout(Ut), Ut = null);
  }
  function n(r, s) {
    e(), qt = !0, bi = Date.now();
    const a = bi, o = () => {
      Ut = null, bi === a && (Ga(wn) ? qt = !1 : (qt = !1, s()));
    }, l = r === null ? 24 : r;
    Ut = window.setTimeout(o, l);
  }
  function i() {
    h(gn) === null && wn.size === 0 && !qt && C(gn, document.body.getAttribute("style"), !0);
  }
  return X(() => ds.current, () => {
    if (!ds.current) return;
    i(), qt = !1;
    const r = getComputedStyle(document.body), s = window.innerWidth - document.documentElement.clientWidth, o = {
      padding: Number.parseInt(r.paddingRight ?? "0", 10) + s,
      margin: Number.parseInt(r.marginRight ?? "0", 10)
    };
    s > 0 && (document.body.style.paddingRight = `${o.padding}px`, document.body.style.marginRight = `${o.margin}px`, document.body.style.setProperty("--scrollbar-width", `${s}px`), document.body.style.overflow = "hidden"), Ni && (vi = Fa(
      document,
      "touchmove",
      (l) => {
        l.target === document.documentElement && (l.touches.length > 1 || l.preventDefault());
      },
      { passive: !1 }
    )), dn(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }), wt(() => () => {
    vi?.();
  }), {
    get lockMap() {
      return wn;
    },
    resetBodyStyle: t,
    scheduleCleanupIfNoNewLocks: n,
    cancelPendingCleanup: e,
    ensureInitialStyleCaptured: i
  };
});
class rd {
  #e = dr();
  #t;
  #n = () => null;
  #i;
  locked;
  constructor(e, n = () => null) {
    this.#t = e, this.#n = n, this.#i = id.get(), this.#i && (this.#i.cancelPendingCleanup(), this.#i.ensureInitialStyleCaptured(), this.#i.lockMap.set(this.#e, this.#t ?? !1), this.locked = w.with(() => this.#i.lockMap.get(this.#e) ?? !1, (i) => this.#i.lockMap.set(this.#e, i)), wt(() => {
      if (this.#i.lockMap.delete(this.#e), Ga(this.#i.lockMap)) return;
      const i = this.#n();
      this.#i.scheduleCleanupIfNoNewLocks(i, () => {
        this.#i.resetBodyStyle();
      });
    }));
  }
}
function Ga(t) {
  for (const [e, n] of t)
    if (n) return !0;
  return !1;
}
function cs(t, e) {
  K(e, !0);
  let n = S(e, "preventScroll", 3, !0), i = S(e, "restoreScrollDelay", 3, null);
  n() && new rd(n(), () => i()), U();
}
function sd(t, e, n = !0) {
  if (!(t.length === 0 || e < 0 || e >= t.length))
    return t.length === 1 && e === 0 ? t[0] : e === t.length - 1 ? n ? t[0] : void 0 : t[e + 1];
}
function ad(t, e, n = !0) {
  if (!(t.length === 0 || e < 0 || e >= t.length))
    return t.length === 1 && e === 0 ? t[0] : e === 0 ? n ? t[t.length - 1] : void 0 : t[e - 1];
}
function od(t, e, n, i = !0) {
  if (t.length === 0 || e < 0 || e >= t.length)
    return;
  let r = e + n;
  return i ? r = (r % t.length + t.length) % t.length : r = Math.max(0, Math.min(r, t.length - 1)), t[r];
}
function ld(t, e, n, i = !0) {
  if (t.length === 0 || e < 0 || e >= t.length)
    return;
  let r = e - n;
  return i ? r = (r % t.length + t.length) % t.length : r = Math.max(0, Math.min(r, t.length - 1)), t[r];
}
function cr(t, e, n) {
  const i = e.toLowerCase();
  if (i.endsWith(" ")) {
    const u = i.slice(0, -1);
    if (t.filter((g) => g.toLowerCase().startsWith(u)).length <= 1)
      return cr(t, u, n);
    const p = n?.toLowerCase();
    if (p && p.startsWith(u) && p.charAt(u.length) === " " && e.trim() === u)
      return n;
    const f = t.filter((g) => g.toLowerCase().startsWith(i));
    if (f.length > 0) {
      const g = n ? t.indexOf(n) : -1;
      return us(f, Math.max(g, 0)).find((y) => y !== n) || n;
    }
  }
  const s = e.length > 1 && Array.from(e).every((u) => u === e[0]) ? e[0] : e, a = s.toLowerCase(), o = n ? t.indexOf(n) : -1;
  let l = us(t, Math.max(o, 0));
  s.length === 1 && (l = l.filter((u) => u !== n));
  const c = l.find((u) => u?.toLowerCase().startsWith(a));
  return c !== n ? c : void 0;
}
function us(t, e) {
  return t.map((n, i) => t[(e + i) % t.length]);
}
var dd = /* @__PURE__ */ q("<input/>"), cd = /* @__PURE__ */ q("<input/>");
function ud(t, e) {
  K(e, !0);
  let n = S(e, "value", 15), i = /* @__PURE__ */ fe(e, ["$$slots", "$$events", "$$legacy", "value"]);
  const r = /* @__PURE__ */ P(() => me(i, {
    "aria-hidden": "true",
    tabindex: -1,
    style: Z2
  }));
  var s = I(), a = Z(s);
  {
    var o = (d) => {
      var c = dd();
      ue(c, () => ({ ...h(r), value: n() }), void 0, void 0, void 0, !0), T(d, c);
    }, l = (d) => {
      var c = cd();
      ue(c, () => ({ ...h(r) }), void 0, void 0, void 0, !0), Go(c, n), T(d, c);
    };
    $(a, (d) => {
      h(r).type === "checkbox" ? d(o) : d(l, !1);
    });
  }
  T(t, s), U();
}
const md = ["top", "right", "bottom", "left"], nt = Math.min, ve = Math.max, In = Math.round, vn = Math.floor, Ie = (t) => ({
  x: t,
  y: t
}), fd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, hd = {
  start: "end",
  end: "start"
};
function Fi(t, e, n) {
  return ve(t, nt(e, n));
}
function Ue(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function qe(t) {
  return t.split("-")[0];
}
function Rt(t) {
  return t.split("-")[1];
}
function ur(t) {
  return t === "x" ? "y" : "x";
}
function mr(t) {
  return t === "y" ? "height" : "width";
}
const pd = /* @__PURE__ */ new Set(["top", "bottom"]);
function ze(t) {
  return pd.has(qe(t)) ? "y" : "x";
}
function fr(t) {
  return ur(ze(t));
}
function gd(t, e, n) {
  n === void 0 && (n = !1);
  const i = Rt(t), r = fr(t), s = mr(r);
  let a = r === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (a = Nn(a)), [a, Nn(a)];
}
function vd(t) {
  const e = Nn(t);
  return [Ri(t), e, Ri(e)];
}
function Ri(t) {
  return t.replace(/start|end/g, (e) => hd[e]);
}
const ms = ["left", "right"], fs = ["right", "left"], bd = ["top", "bottom"], yd = ["bottom", "top"];
function kd(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? fs : ms : e ? ms : fs;
    case "left":
    case "right":
      return e ? bd : yd;
    default:
      return [];
  }
}
function wd(t, e, n, i) {
  const r = Rt(t);
  let s = kd(qe(t), n === "start", i);
  return r && (s = s.map((a) => a + "-" + r), e && (s = s.concat(s.map(Ri)))), s;
}
function Nn(t) {
  return t.replace(/left|right|bottom|top/g, (e) => fd[e]);
}
function _d(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Ya(t) {
  return typeof t != "number" ? _d(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function jn(t) {
  const {
    x: e,
    y: n,
    width: i,
    height: r
  } = t;
  return {
    width: i,
    height: r,
    top: n,
    left: e,
    right: e + i,
    bottom: n + r,
    x: e,
    y: n
  };
}
function hs(t, e, n) {
  let {
    reference: i,
    floating: r
  } = t;
  const s = ze(e), a = fr(e), o = mr(a), l = qe(e), d = s === "y", c = i.x + i.width / 2 - r.width / 2, u = i.y + i.height / 2 - r.height / 2, m = i[o] / 2 - r[o] / 2;
  let p;
  switch (l) {
    case "top":
      p = {
        x: c,
        y: i.y - r.height
      };
      break;
    case "bottom":
      p = {
        x: c,
        y: i.y + i.height
      };
      break;
    case "right":
      p = {
        x: i.x + i.width,
        y: u
      };
      break;
    case "left":
      p = {
        x: i.x - r.width,
        y: u
      };
      break;
    default:
      p = {
        x: i.x,
        y: i.y
      };
  }
  switch (Rt(e)) {
    case "start":
      p[a] -= m * (n && d ? -1 : 1);
      break;
    case "end":
      p[a] += m * (n && d ? -1 : 1);
      break;
  }
  return p;
}
const Sd = async (t, e, n) => {
  const {
    placement: i = "bottom",
    strategy: r = "absolute",
    middleware: s = [],
    platform: a
  } = n, o = s.filter(Boolean), l = await (a.isRTL == null ? void 0 : a.isRTL(e));
  let d = await a.getElementRects({
    reference: t,
    floating: e,
    strategy: r
  }), {
    x: c,
    y: u
  } = hs(d, i, l), m = i, p = {}, f = 0;
  for (let g = 0; g < o.length; g++) {
    const {
      name: b,
      fn: k
    } = o[g], {
      x: y,
      y: v,
      data: _,
      reset: A
    } = await k({
      x: c,
      y: u,
      initialPlacement: i,
      placement: m,
      strategy: r,
      middlewareData: p,
      rects: d,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    c = y ?? c, u = v ?? u, p = {
      ...p,
      [b]: {
        ...p[b],
        ..._
      }
    }, A && f <= 50 && (f++, typeof A == "object" && (A.placement && (m = A.placement), A.rects && (d = A.rects === !0 ? await a.getElementRects({
      reference: t,
      floating: e,
      strategy: r
    }) : A.rects), {
      x: c,
      y: u
    } = hs(d, m, l)), g = -1);
  }
  return {
    x: c,
    y: u,
    placement: m,
    strategy: r,
    middlewareData: p
  };
};
async function en(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: i,
    y: r,
    platform: s,
    rects: a,
    elements: o,
    strategy: l
  } = t, {
    boundary: d = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: u = "floating",
    altBoundary: m = !1,
    padding: p = 0
  } = Ue(e, t), f = Ya(p), b = o[m ? u === "floating" ? "reference" : "floating" : u], k = jn(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(b))) == null || n ? b : b.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(o.floating)),
    boundary: d,
    rootBoundary: c,
    strategy: l
  })), y = u === "floating" ? {
    x: i,
    y: r,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, v = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(o.floating)), _ = await (s.isElement == null ? void 0 : s.isElement(v)) ? await (s.getScale == null ? void 0 : s.getScale(v)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, A = jn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: o,
    rect: y,
    offsetParent: v,
    strategy: l
  }) : y);
  return {
    top: (k.top - A.top + f.top) / _.y,
    bottom: (A.bottom - k.bottom + f.bottom) / _.y,
    left: (k.left - A.left + f.left) / _.x,
    right: (A.right - k.right + f.right) / _.x
  };
}
const xd = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: i,
      placement: r,
      rects: s,
      platform: a,
      elements: o,
      middlewareData: l
    } = e, {
      element: d,
      padding: c = 0
    } = Ue(t, e) || {};
    if (d == null)
      return {};
    const u = Ya(c), m = {
      x: n,
      y: i
    }, p = fr(r), f = mr(p), g = await a.getDimensions(d), b = p === "y", k = b ? "top" : "left", y = b ? "bottom" : "right", v = b ? "clientHeight" : "clientWidth", _ = s.reference[f] + s.reference[p] - m[p] - s.floating[f], A = m[p] - s.reference[p], E = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(d));
    let x = E ? E[v] : 0;
    (!x || !await (a.isElement == null ? void 0 : a.isElement(E))) && (x = o.floating[v] || s.floating[f]);
    const j = _ / 2 - A / 2, R = x / 2 - g[f] / 2 - 1, L = nt(u[k], R), F = nt(u[y], R), D = L, z = x - g[f] - F, O = x / 2 - g[f] / 2 + j, M = Fi(D, O, z), W = !l.arrow && Rt(r) != null && O !== M && s.reference[f] / 2 - (O < D ? L : F) - g[f] / 2 < 0, G = W ? O < D ? O - D : O - z : 0;
    return {
      [p]: m[p] + G,
      data: {
        [p]: M,
        centerOffset: O - M - G,
        ...W && {
          alignmentOffset: G
        }
      },
      reset: W
    };
  }
}), Cd = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, i;
      const {
        placement: r,
        middlewareData: s,
        rects: a,
        initialPlacement: o,
        platform: l,
        elements: d
      } = e, {
        mainAxis: c = !0,
        crossAxis: u = !0,
        fallbackPlacements: m,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: f = "none",
        flipAlignment: g = !0,
        ...b
      } = Ue(t, e);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const k = qe(r), y = ze(o), v = qe(o) === o, _ = await (l.isRTL == null ? void 0 : l.isRTL(d.floating)), A = m || (v || !g ? [Nn(o)] : vd(o)), E = f !== "none";
      !m && E && A.push(...wd(o, g, f, _));
      const x = [o, ...A], j = await en(e, b), R = [];
      let L = ((i = s.flip) == null ? void 0 : i.overflows) || [];
      if (c && R.push(j[k]), u) {
        const O = gd(r, a, _);
        R.push(j[O[0]], j[O[1]]);
      }
      if (L = [...L, {
        placement: r,
        overflows: R
      }], !R.every((O) => O <= 0)) {
        var F, D;
        const O = (((F = s.flip) == null ? void 0 : F.index) || 0) + 1, M = x[O];
        if (M && (!(u === "alignment" ? y !== ze(M) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        L.every((ne) => ze(ne.placement) === y ? ne.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: L
            },
            reset: {
              placement: M
            }
          };
        let W = (D = L.filter((G) => G.overflows[0] <= 0).sort((G, ne) => G.overflows[1] - ne.overflows[1])[0]) == null ? void 0 : D.placement;
        if (!W)
          switch (p) {
            case "bestFit": {
              var z;
              const G = (z = L.filter((ne) => {
                if (E) {
                  const ie = ze(ne.placement);
                  return ie === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ie === "y";
                }
                return !0;
              }).map((ne) => [ne.placement, ne.overflows.filter((ie) => ie > 0).reduce((ie, at) => ie + at, 0)]).sort((ne, ie) => ne[1] - ie[1])[0]) == null ? void 0 : z[0];
              G && (W = G);
              break;
            }
            case "initialPlacement":
              W = o;
              break;
          }
        if (r !== W)
          return {
            reset: {
              placement: W
            }
          };
      }
      return {};
    }
  };
};
function ps(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function gs(t) {
  return md.some((e) => t[e] >= 0);
}
const Ad = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: i = "referenceHidden",
        ...r
      } = Ue(t, e);
      switch (i) {
        case "referenceHidden": {
          const s = await en(e, {
            ...r,
            elementContext: "reference"
          }), a = ps(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: gs(a)
            }
          };
        }
        case "escaped": {
          const s = await en(e, {
            ...r,
            altBoundary: !0
          }), a = ps(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: gs(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Xa = /* @__PURE__ */ new Set(["left", "top"]);
async function Ed(t, e) {
  const {
    placement: n,
    platform: i,
    elements: r
  } = t, s = await (i.isRTL == null ? void 0 : i.isRTL(r.floating)), a = qe(n), o = Rt(n), l = ze(n) === "y", d = Xa.has(a) ? -1 : 1, c = s && l ? -1 : 1, u = Ue(e, t);
  let {
    mainAxis: m,
    crossAxis: p,
    alignmentAxis: f
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return o && typeof f == "number" && (p = o === "end" ? f * -1 : f), l ? {
    x: p * c,
    y: m * d
  } : {
    x: m * d,
    y: p * c
  };
}
const Pd = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, i;
      const {
        x: r,
        y: s,
        placement: a,
        middlewareData: o
      } = e, l = await Ed(e, t);
      return a === ((n = o.offset) == null ? void 0 : n.placement) && (i = o.arrow) != null && i.alignmentOffset ? {} : {
        x: r + l.x,
        y: s + l.y,
        data: {
          ...l,
          placement: a
        }
      };
    }
  };
}, Td = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i,
        placement: r
      } = e, {
        mainAxis: s = !0,
        crossAxis: a = !1,
        limiter: o = {
          fn: (b) => {
            let {
              x: k,
              y
            } = b;
            return {
              x: k,
              y
            };
          }
        },
        ...l
      } = Ue(t, e), d = {
        x: n,
        y: i
      }, c = await en(e, l), u = ze(qe(r)), m = ur(u);
      let p = d[m], f = d[u];
      if (s) {
        const b = m === "y" ? "top" : "left", k = m === "y" ? "bottom" : "right", y = p + c[b], v = p - c[k];
        p = Fi(y, p, v);
      }
      if (a) {
        const b = u === "y" ? "top" : "left", k = u === "y" ? "bottom" : "right", y = f + c[b], v = f - c[k];
        f = Fi(y, f, v);
      }
      const g = o.fn({
        ...e,
        [m]: p,
        [u]: f
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - i,
          enabled: {
            [m]: s,
            [u]: a
          }
        }
      };
    }
  };
}, Od = function(t) {
  return t === void 0 && (t = {}), {
    options: t,
    fn(e) {
      const {
        x: n,
        y: i,
        placement: r,
        rects: s,
        middlewareData: a
      } = e, {
        offset: o = 0,
        mainAxis: l = !0,
        crossAxis: d = !0
      } = Ue(t, e), c = {
        x: n,
        y: i
      }, u = ze(r), m = ur(u);
      let p = c[m], f = c[u];
      const g = Ue(o, e), b = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const v = m === "y" ? "height" : "width", _ = s.reference[m] - s.floating[v] + b.mainAxis, A = s.reference[m] + s.reference[v] - b.mainAxis;
        p < _ ? p = _ : p > A && (p = A);
      }
      if (d) {
        var k, y;
        const v = m === "y" ? "width" : "height", _ = Xa.has(qe(r)), A = s.reference[u] - s.floating[v] + (_ && ((k = a.offset) == null ? void 0 : k[u]) || 0) + (_ ? 0 : b.crossAxis), E = s.reference[u] + s.reference[v] + (_ ? 0 : ((y = a.offset) == null ? void 0 : y[u]) || 0) - (_ ? b.crossAxis : 0);
        f < A ? f = A : f > E && (f = E);
      }
      return {
        [m]: p,
        [u]: f
      };
    }
  };
}, Zd = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      var n, i;
      const {
        placement: r,
        rects: s,
        platform: a,
        elements: o
      } = e, {
        apply: l = () => {
        },
        ...d
      } = Ue(t, e), c = await en(e, d), u = qe(r), m = Rt(r), p = ze(r) === "y", {
        width: f,
        height: g
      } = s.floating;
      let b, k;
      u === "top" || u === "bottom" ? (b = u, k = m === (await (a.isRTL == null ? void 0 : a.isRTL(o.floating)) ? "start" : "end") ? "left" : "right") : (k = u, b = m === "end" ? "top" : "bottom");
      const y = g - c.top - c.bottom, v = f - c.left - c.right, _ = nt(g - c[b], y), A = nt(f - c[k], v), E = !e.middlewareData.shift;
      let x = _, j = A;
      if ((n = e.middlewareData.shift) != null && n.enabled.x && (j = v), (i = e.middlewareData.shift) != null && i.enabled.y && (x = y), E && !m) {
        const L = ve(c.left, 0), F = ve(c.right, 0), D = ve(c.top, 0), z = ve(c.bottom, 0);
        p ? j = f - 2 * (L !== 0 || F !== 0 ? L + F : ve(c.left, c.right)) : x = g - 2 * (D !== 0 || z !== 0 ? D + z : ve(c.top, c.bottom));
      }
      await l({
        ...e,
        availableWidth: j,
        availableHeight: x
      });
      const R = await a.getDimensions(o.floating);
      return f !== R.width || g !== R.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Jn() {
  return typeof window < "u";
}
function Lt(t) {
  return Ja(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function be(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Le(t) {
  var e;
  return (e = (Ja(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Ja(t) {
  return Jn() ? t instanceof Node || t instanceof be(t).Node : !1;
}
function Ae(t) {
  return Jn() ? t instanceof Element || t instanceof be(t).Element : !1;
}
function Me(t) {
  return Jn() ? t instanceof HTMLElement || t instanceof be(t).HTMLElement : !1;
}
function vs(t) {
  return !Jn() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof be(t).ShadowRoot;
}
const zd = /* @__PURE__ */ new Set(["inline", "contents"]);
function un(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: i,
    display: r
  } = Ee(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + i + n) && !zd.has(r);
}
const Id = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Nd(t) {
  return Id.has(Lt(t));
}
const jd = [":popover-open", ":modal"];
function Qn(t) {
  return jd.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const Dd = ["transform", "translate", "scale", "rotate", "perspective"], Md = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Fd = ["paint", "layout", "strict", "content"];
function hr(t) {
  const e = pr(), n = Ae(t) ? Ee(t) : t;
  return Dd.some((i) => n[i] ? n[i] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || Md.some((i) => (n.willChange || "").includes(i)) || Fd.some((i) => (n.contain || "").includes(i));
}
function Rd(t) {
  let e = it(t);
  for (; Me(e) && !Nt(e); ) {
    if (hr(e))
      return e;
    if (Qn(e))
      return null;
    e = it(e);
  }
  return null;
}
function pr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Ld = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Nt(t) {
  return Ld.has(Lt(t));
}
function Ee(t) {
  return be(t).getComputedStyle(t);
}
function $n(t) {
  return Ae(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function it(t) {
  if (Lt(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    vs(t) && t.host || // Fallback.
    Le(t)
  );
  return vs(e) ? e.host : e;
}
function Qa(t) {
  const e = it(t);
  return Nt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Me(e) && un(e) ? e : Qa(e);
}
function tn(t, e, n) {
  var i;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const r = Qa(t), s = r === ((i = t.ownerDocument) == null ? void 0 : i.body), a = be(r);
  if (s) {
    const o = Li(a);
    return e.concat(a, a.visualViewport || [], un(r) ? r : [], o && n ? tn(o) : []);
  }
  return e.concat(r, tn(r, [], n));
}
function Li(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function $a(t) {
  const e = Ee(t);
  let n = parseFloat(e.width) || 0, i = parseFloat(e.height) || 0;
  const r = Me(t), s = r ? t.offsetWidth : n, a = r ? t.offsetHeight : i, o = In(n) !== s || In(i) !== a;
  return o && (n = s, i = a), {
    width: n,
    height: i,
    $: o
  };
}
function gr(t) {
  return Ae(t) ? t : t.contextElement;
}
function Tt(t) {
  const e = gr(t);
  if (!Me(e))
    return Ie(1);
  const n = e.getBoundingClientRect(), {
    width: i,
    height: r,
    $: s
  } = $a(e);
  let a = (s ? In(n.width) : n.width) / i, o = (s ? In(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!o || !Number.isFinite(o)) && (o = 1), {
    x: a,
    y: o
  };
}
const Bd = /* @__PURE__ */ Ie(0);
function e1(t) {
  const e = be(t);
  return !pr() || !e.visualViewport ? Bd : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function Hd(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== be(t) ? !1 : e;
}
function pt(t, e, n, i) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const r = t.getBoundingClientRect(), s = gr(t);
  let a = Ie(1);
  e && (i ? Ae(i) && (a = Tt(i)) : a = Tt(t));
  const o = Hd(s, n, i) ? e1(s) : Ie(0);
  let l = (r.left + o.x) / a.x, d = (r.top + o.y) / a.y, c = r.width / a.x, u = r.height / a.y;
  if (s) {
    const m = be(s), p = i && Ae(i) ? be(i) : i;
    let f = m, g = Li(f);
    for (; g && i && p !== f; ) {
      const b = Tt(g), k = g.getBoundingClientRect(), y = Ee(g), v = k.left + (g.clientLeft + parseFloat(y.paddingLeft)) * b.x, _ = k.top + (g.clientTop + parseFloat(y.paddingTop)) * b.y;
      l *= b.x, d *= b.y, c *= b.x, u *= b.y, l += v, d += _, f = be(g), g = Li(f);
    }
  }
  return jn({
    width: c,
    height: u,
    x: l,
    y: d
  });
}
function ei(t, e) {
  const n = $n(t).scrollLeft;
  return e ? e.left + n : pt(Le(t)).left + n;
}
function t1(t, e) {
  const n = t.getBoundingClientRect(), i = n.left + e.scrollLeft - ei(t, n), r = n.top + e.scrollTop;
  return {
    x: i,
    y: r
  };
}
function Vd(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: i,
    strategy: r
  } = t;
  const s = r === "fixed", a = Le(i), o = e ? Qn(e.floating) : !1;
  if (i === a || o && s)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = Ie(1);
  const c = Ie(0), u = Me(i);
  if ((u || !u && !s) && ((Lt(i) !== "body" || un(a)) && (l = $n(i)), Me(i))) {
    const p = pt(i);
    d = Tt(i), c.x = p.x + i.clientLeft, c.y = p.y + i.clientTop;
  }
  const m = a && !u && !s ? t1(a, l) : Ie(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - l.scrollLeft * d.x + c.x + m.x,
    y: n.y * d.y - l.scrollTop * d.y + c.y + m.y
  };
}
function Wd(t) {
  return Array.from(t.getClientRects());
}
function Kd(t) {
  const e = Le(t), n = $n(t), i = t.ownerDocument.body, r = ve(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth), s = ve(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
  let a = -n.scrollLeft + ei(t);
  const o = -n.scrollTop;
  return Ee(i).direction === "rtl" && (a += ve(e.clientWidth, i.clientWidth) - r), {
    width: r,
    height: s,
    x: a,
    y: o
  };
}
const bs = 25;
function Ud(t, e) {
  const n = be(t), i = Le(t), r = n.visualViewport;
  let s = i.clientWidth, a = i.clientHeight, o = 0, l = 0;
  if (r) {
    s = r.width, a = r.height;
    const c = pr();
    (!c || c && e === "fixed") && (o = r.offsetLeft, l = r.offsetTop);
  }
  const d = ei(i);
  if (d <= 0) {
    const c = i.ownerDocument, u = c.body, m = getComputedStyle(u), p = c.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, f = Math.abs(i.clientWidth - u.clientWidth - p);
    f <= bs && (s -= f);
  } else d <= bs && (s += d);
  return {
    width: s,
    height: a,
    x: o,
    y: l
  };
}
const qd = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Gd(t, e) {
  const n = pt(t, !0, e === "fixed"), i = n.top + t.clientTop, r = n.left + t.clientLeft, s = Me(t) ? Tt(t) : Ie(1), a = t.clientWidth * s.x, o = t.clientHeight * s.y, l = r * s.x, d = i * s.y;
  return {
    width: a,
    height: o,
    x: l,
    y: d
  };
}
function ys(t, e, n) {
  let i;
  if (e === "viewport")
    i = Ud(t, n);
  else if (e === "document")
    i = Kd(Le(t));
  else if (Ae(e))
    i = Gd(e, n);
  else {
    const r = e1(t);
    i = {
      x: e.x - r.x,
      y: e.y - r.y,
      width: e.width,
      height: e.height
    };
  }
  return jn(i);
}
function n1(t, e) {
  const n = it(t);
  return n === e || !Ae(n) || Nt(n) ? !1 : Ee(n).position === "fixed" || n1(n, e);
}
function Yd(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let i = tn(t, [], !1).filter((o) => Ae(o) && Lt(o) !== "body"), r = null;
  const s = Ee(t).position === "fixed";
  let a = s ? it(t) : t;
  for (; Ae(a) && !Nt(a); ) {
    const o = Ee(a), l = hr(a);
    !l && o.position === "fixed" && (r = null), (s ? !l && !r : !l && o.position === "static" && !!r && qd.has(r.position) || un(a) && !l && n1(t, a)) ? i = i.filter((c) => c !== a) : r = o, a = it(a);
  }
  return e.set(t, i), i;
}
function Xd(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: i,
    strategy: r
  } = t;
  const a = [...n === "clippingAncestors" ? Qn(e) ? [] : Yd(e, this._c) : [].concat(n), i], o = a[0], l = a.reduce((d, c) => {
    const u = ys(e, c, r);
    return d.top = ve(u.top, d.top), d.right = nt(u.right, d.right), d.bottom = nt(u.bottom, d.bottom), d.left = ve(u.left, d.left), d;
  }, ys(e, o, r));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Jd(t) {
  const {
    width: e,
    height: n
  } = $a(t);
  return {
    width: e,
    height: n
  };
}
function Qd(t, e, n) {
  const i = Me(e), r = Le(e), s = n === "fixed", a = pt(t, !0, s, e);
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Ie(0);
  function d() {
    l.x = ei(r);
  }
  if (i || !i && !s)
    if ((Lt(e) !== "body" || un(r)) && (o = $n(e)), i) {
      const p = pt(e, !0, s, e);
      l.x = p.x + e.clientLeft, l.y = p.y + e.clientTop;
    } else r && d();
  s && !i && r && d();
  const c = r && !i && !s ? t1(r, o) : Ie(0), u = a.left + o.scrollLeft - l.x - c.x, m = a.top + o.scrollTop - l.y - c.y;
  return {
    x: u,
    y: m,
    width: a.width,
    height: a.height
  };
}
function yi(t) {
  return Ee(t).position === "static";
}
function ks(t, e) {
  if (!Me(t) || Ee(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return Le(t) === n && (n = n.ownerDocument.body), n;
}
function i1(t, e) {
  const n = be(t);
  if (Qn(t))
    return n;
  if (!Me(t)) {
    let r = it(t);
    for (; r && !Nt(r); ) {
      if (Ae(r) && !yi(r))
        return r;
      r = it(r);
    }
    return n;
  }
  let i = ks(t, e);
  for (; i && Nd(i) && yi(i); )
    i = ks(i, e);
  return i && Nt(i) && yi(i) && !hr(i) ? n : i || Rd(t) || n;
}
const $d = async function(t) {
  const e = this.getOffsetParent || i1, n = this.getDimensions, i = await n(t.floating);
  return {
    reference: Qd(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function ec(t) {
  return Ee(t).direction === "rtl";
}
const tc = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Vd,
  getDocumentElement: Le,
  getClippingRect: Xd,
  getOffsetParent: i1,
  getElementRects: $d,
  getClientRects: Wd,
  getDimensions: Jd,
  getScale: Tt,
  isElement: Ae,
  isRTL: ec
};
function r1(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function nc(t, e) {
  let n = null, i;
  const r = Le(t);
  function s() {
    var o;
    clearTimeout(i), (o = n) == null || o.disconnect(), n = null;
  }
  function a(o, l) {
    o === void 0 && (o = !1), l === void 0 && (l = 1), s();
    const d = t.getBoundingClientRect(), {
      left: c,
      top: u,
      width: m,
      height: p
    } = d;
    if (o || e(), !m || !p)
      return;
    const f = vn(u), g = vn(r.clientWidth - (c + m)), b = vn(r.clientHeight - (u + p)), k = vn(c), v = {
      rootMargin: -f + "px " + -g + "px " + -b + "px " + -k + "px",
      threshold: ve(0, nt(1, l)) || 1
    };
    let _ = !0;
    function A(E) {
      const x = E[0].intersectionRatio;
      if (x !== l) {
        if (!_)
          return a();
        x ? a(!1, x) : i = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      x === 1 && !r1(d, t.getBoundingClientRect()) && a(), _ = !1;
    }
    try {
      n = new IntersectionObserver(A, {
        ...v,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(A, v);
    }
    n.observe(t);
  }
  return a(!0), s;
}
function ic(t, e, n, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: o = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = i, d = gr(t), c = r || s ? [...d ? tn(d) : [], ...tn(e)] : [];
  c.forEach((k) => {
    r && k.addEventListener("scroll", n, {
      passive: !0
    }), s && k.addEventListener("resize", n);
  });
  const u = d && o ? nc(d, n) : null;
  let m = -1, p = null;
  a && (p = new ResizeObserver((k) => {
    let [y] = k;
    y && y.target === d && p && (p.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var v;
      (v = p) == null || v.observe(e);
    })), n();
  }), d && !l && p.observe(d), p.observe(e));
  let f, g = l ? pt(t) : null;
  l && b();
  function b() {
    const k = pt(t);
    g && !r1(g, k) && n(), g = k, f = requestAnimationFrame(b);
  }
  return n(), () => {
    var k;
    c.forEach((y) => {
      r && y.removeEventListener("scroll", n), s && y.removeEventListener("resize", n);
    }), u?.(), (k = p) == null || k.disconnect(), p = null, l && cancelAnimationFrame(f);
  };
}
const rc = Pd, sc = Td, ac = Cd, oc = Zd, lc = Ad, dc = xd, cc = Od, uc = (t, e, n) => {
  const i = /* @__PURE__ */ new Map(), r = {
    platform: tc,
    ...n
  }, s = {
    ...r.platform,
    _c: i
  };
  return Sd(t, e, {
    ...r,
    platform: s
  });
};
function lt(t) {
  return typeof t == "function" ? t() : t;
}
function s1(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ws(t, e) {
  const n = s1(t);
  return Math.round(e * n) / n;
}
function mc(t) {
  return {
    [`--bits-${t}-content-transform-origin`]: "var(--bits-floating-transform-origin)",
    [`--bits-${t}-content-available-width`]: "var(--bits-floating-available-width)",
    [`--bits-${t}-content-available-height`]: "var(--bits-floating-available-height)",
    [`--bits-${t}-anchor-width`]: "var(--bits-floating-anchor-width)",
    [`--bits-${t}-anchor-height`]: "var(--bits-floating-anchor-height)"
  };
}
function fc(t) {
  const e = t.whileElementsMounted, n = /* @__PURE__ */ P(() => lt(t.open) ?? !0), i = /* @__PURE__ */ P(() => lt(t.middleware)), r = /* @__PURE__ */ P(() => lt(t.transform) ?? !0), s = /* @__PURE__ */ P(() => lt(t.placement) ?? "bottom"), a = /* @__PURE__ */ P(() => lt(t.strategy) ?? "absolute"), o = /* @__PURE__ */ P(() => lt(t.sideOffset) ?? 0), l = /* @__PURE__ */ P(() => lt(t.alignOffset) ?? 0), d = t.reference;
  let c = /* @__PURE__ */ N(0), u = /* @__PURE__ */ N(0);
  const m = w(null);
  let p = /* @__PURE__ */ N(ce(h(a))), f = /* @__PURE__ */ N(ce(h(s))), g = /* @__PURE__ */ N(ce({})), b = /* @__PURE__ */ N(!1);
  const k = /* @__PURE__ */ P(() => {
    const x = m.current ? ws(m.current, h(c)) : h(c), j = m.current ? ws(m.current, h(u)) : h(u);
    return h(r) ? {
      position: h(p),
      left: "0",
      top: "0",
      transform: `translate(${x}px, ${j}px)`,
      ...m.current && s1(m.current) >= 1.5 && { willChange: "transform" }
    } : {
      position: h(p),
      left: `${x}px`,
      top: `${j}px`
    };
  });
  let y;
  function v() {
    d.current === null || m.current === null || uc(d.current, m.current, {
      middleware: h(i),
      placement: h(s),
      strategy: h(a)
    }).then((x) => {
      if (!h(n) && h(c) !== 0 && h(u) !== 0) {
        const j = Math.max(Math.abs(h(o)), Math.abs(h(l)), 15);
        if (x.x <= j && x.y <= j) return;
      }
      C(c, x.x, !0), C(u, x.y, !0), C(p, x.strategy, !0), C(f, x.placement, !0), C(g, x.middlewareData, !0), C(b, !0);
    });
  }
  function _() {
    typeof y == "function" && (y(), y = void 0);
  }
  function A() {
    if (_(), e === void 0) {
      v();
      return;
    }
    d.current === null || m.current === null || (y = e(d.current, m.current, v));
  }
  function E() {
    h(n) || C(b, !1);
  }
  return se(v), se(A), se(E), se(() => _), {
    floating: m,
    reference: d,
    get strategy() {
      return h(p);
    },
    get placement() {
      return h(f);
    },
    get middlewareData() {
      return h(g);
    },
    get isPositioned() {
      return h(b);
    },
    get floatingStyles() {
      return h(k);
    },
    get update() {
      return v;
    }
  };
}
const hc = { top: "bottom", right: "left", bottom: "top", left: "right" }, vr = new kt("Floating.Root"), _s = new kt("Floating.Content"), br = new kt("Floating.Root");
class Dn {
  static create(e = !1) {
    return e ? br.set(new Dn()) : vr.set(new Dn());
  }
  anchorNode = w(null);
  customAnchorNode = w(null);
  triggerNode = w(null);
  constructor() {
    se(() => {
      this.customAnchorNode.current ? typeof this.customAnchorNode.current == "string" ? this.anchorNode.current = document.querySelector(this.customAnchorNode.current) : this.anchorNode.current = this.customAnchorNode.current : this.anchorNode.current = this.triggerNode.current;
    });
  }
}
class Mn {
  static create(e, n = !1) {
    return n ? _s.set(new Mn(e, br.get())) : _s.set(new Mn(e, vr.get()));
  }
  opts;
  root;
  // nodes
  contentRef = w(null);
  wrapperRef = w(null);
  arrowRef = w(null);
  contentAttachment = _e(this.contentRef);
  wrapperAttachment = _e(this.wrapperRef);
  arrowAttachment = _e(this.arrowRef);
  // ids
  arrowId = w(dr());
  #e = /* @__PURE__ */ P(() => {
    if (typeof this.opts.style == "string") return Yt(this.opts.style);
    if (!this.opts.style) return {};
  });
  #t = void 0;
  #n = new L2(() => this.arrowRef.current ?? void 0);
  #i = /* @__PURE__ */ P(() => this.#n?.width ?? 0);
  #r = /* @__PURE__ */ P(() => this.#n?.height ?? 0);
  #s = /* @__PURE__ */ P(() => this.opts.side?.current + (this.opts.align.current !== "center" ? `-${this.opts.align.current}` : ""));
  #o = /* @__PURE__ */ P(() => Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]);
  #a = /* @__PURE__ */ P(() => h(this.#o).length > 0);
  get hasExplicitBoundaries() {
    return h(this.#a);
  }
  set hasExplicitBoundaries(e) {
    C(this.#a, e);
  }
  #l = /* @__PURE__ */ P(() => ({
    padding: this.opts.collisionPadding.current,
    boundary: h(this.#o).filter(ll),
    altBoundary: this.hasExplicitBoundaries
  }));
  get detectOverflowOptions() {
    return h(this.#l);
  }
  set detectOverflowOptions(e) {
    C(this.#l, e);
  }
  #d = /* @__PURE__ */ N(void 0);
  #u = /* @__PURE__ */ N(void 0);
  #c = /* @__PURE__ */ N(void 0);
  #h = /* @__PURE__ */ N(void 0);
  #m = /* @__PURE__ */ P(() => [
    rc({
      mainAxis: this.opts.sideOffset.current + h(this.#r),
      alignmentAxis: this.opts.alignOffset.current
    }),
    this.opts.avoidCollisions.current && sc({
      mainAxis: !0,
      crossAxis: !1,
      limiter: this.opts.sticky.current === "partial" ? cc() : void 0,
      ...this.detectOverflowOptions
    }),
    this.opts.avoidCollisions.current && ac({ ...this.detectOverflowOptions }),
    oc({
      ...this.detectOverflowOptions,
      apply: ({ rects: e, availableWidth: n, availableHeight: i }) => {
        const { width: r, height: s } = e.reference;
        C(this.#d, n, !0), C(this.#u, i, !0), C(this.#c, r, !0), C(this.#h, s, !0);
      }
    }),
    this.arrowRef.current && dc({
      element: this.arrowRef.current,
      padding: this.opts.arrowPadding.current
    }),
    pc({
      arrowWidth: h(this.#i),
      arrowHeight: h(this.#r)
    }),
    this.opts.hideWhenDetached.current && lc({ strategy: "referenceHidden", ...this.detectOverflowOptions })
  ].filter(Boolean));
  get middleware() {
    return h(this.#m);
  }
  set middleware(e) {
    C(this.#m, e);
  }
  floating;
  #f = /* @__PURE__ */ P(() => gc(this.floating.placement));
  get placedSide() {
    return h(this.#f);
  }
  set placedSide(e) {
    C(this.#f, e);
  }
  #g = /* @__PURE__ */ P(() => vc(this.floating.placement));
  get placedAlign() {
    return h(this.#g);
  }
  set placedAlign(e) {
    C(this.#g, e);
  }
  #p = /* @__PURE__ */ P(() => this.floating.middlewareData.arrow?.x ?? 0);
  get arrowX() {
    return h(this.#p);
  }
  set arrowX(e) {
    C(this.#p, e);
  }
  #v = /* @__PURE__ */ P(() => this.floating.middlewareData.arrow?.y ?? 0);
  get arrowY() {
    return h(this.#v);
  }
  set arrowY(e) {
    C(this.#v, e);
  }
  #b = /* @__PURE__ */ P(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
  get cannotCenterArrow() {
    return h(this.#b);
  }
  set cannotCenterArrow(e) {
    C(this.#b, e);
  }
  #y = /* @__PURE__ */ N();
  get contentZIndex() {
    return h(this.#y);
  }
  set contentZIndex(e) {
    C(this.#y, e, !0);
  }
  #k = /* @__PURE__ */ P(() => hc[this.placedSide]);
  get arrowBaseSide() {
    return h(this.#k);
  }
  set arrowBaseSide(e) {
    C(this.#k, e);
  }
  #w = /* @__PURE__ */ P(() => ({
    id: this.opts.wrapperId.current,
    "data-bits-floating-content-wrapper": "",
    style: {
      ...this.floating.floatingStyles,
      transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
      minWidth: "max-content",
      zIndex: this.contentZIndex,
      "--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
      "--bits-floating-available-width": `${h(this.#d)}px`,
      "--bits-floating-available-height": `${h(this.#u)}px`,
      "--bits-floating-anchor-width": `${h(this.#c)}px`,
      "--bits-floating-anchor-height": `${h(this.#h)}px`,
      ...this.floating.middlewareData.hide?.referenceHidden && { visibility: "hidden", "pointer-events": "none" },
      ...h(this.#e)
    },
    dir: this.opts.dir.current,
    ...this.wrapperAttachment
  }));
  get wrapperProps() {
    return h(this.#w);
  }
  set wrapperProps(e) {
    C(this.#w, e);
  }
  #_ = /* @__PURE__ */ P(() => ({
    "data-side": this.placedSide,
    "data-align": this.placedAlign,
    style: $i({ ...h(this.#e) }),
    ...this.contentAttachment
  }));
  get props() {
    return h(this.#_);
  }
  set props(e) {
    C(this.#_, e);
  }
  #S = /* @__PURE__ */ P(() => ({
    position: "absolute",
    left: this.arrowX ? `${this.arrowX}px` : void 0,
    top: this.arrowY ? `${this.arrowY}px` : void 0,
    [this.arrowBaseSide]: 0,
    "transform-origin": { top: "", right: "0 0", bottom: "center 0", left: "100% 0" }[this.placedSide],
    transform: {
      top: "translateY(100%)",
      right: "translateY(50%) rotate(90deg) translateX(-50%)",
      bottom: "rotate(180deg)",
      left: "translateY(50%) rotate(-90deg) translateX(50%)"
    }[this.placedSide],
    visibility: this.cannotCenterArrow ? "hidden" : void 0
  }));
  get arrowStyle() {
    return h(this.#S);
  }
  set arrowStyle(e) {
    C(this.#S, e);
  }
  constructor(e, n) {
    this.opts = e, this.root = n, e.customAnchor && (this.root.customAnchorNode.current = e.customAnchor.current), X(() => e.customAnchor.current, (i) => {
      this.root.customAnchorNode.current = i;
    }), this.floating = fc({
      strategy: () => this.opts.strategy.current,
      placement: () => h(this.#s),
      middleware: () => this.middleware,
      reference: this.root.anchorNode,
      whileElementsMounted: (...i) => ic(...i, {
        animationFrame: this.#t?.current === "always"
      }),
      open: () => this.opts.enabled.current,
      sideOffset: () => this.opts.sideOffset.current,
      alignOffset: () => this.opts.alignOffset.current
    }), se(() => {
      this.floating.isPositioned && this.opts.onPlaced?.current();
    }), X(() => this.contentRef.current, (i) => {
      if (!i) return;
      const r = Za(i);
      this.contentZIndex = r.getComputedStyle(i).zIndex;
    }), se(() => {
      this.floating.floating.current = this.wrapperRef.current;
    });
  }
}
class Fn {
  static create(e, n = !1) {
    return n ? new Fn(e, br.get()) : new Fn(e, vr.get());
  }
  opts;
  root;
  constructor(e, n) {
    this.opts = e, this.root = n, e.virtualEl && e.virtualEl.current ? n.triggerNode = w.from(e.virtualEl.current) : n.triggerNode = e.ref;
  }
}
function pc(t) {
  return {
    name: "transformOrigin",
    options: t,
    fn(e) {
      const { placement: n, rects: i, middlewareData: r } = e, a = r.arrow?.centerOffset !== 0, o = a ? 0 : t.arrowWidth, l = a ? 0 : t.arrowHeight, [d, c] = yr(n), u = { start: "0%", center: "50%", end: "100%" }[c], m = (r.arrow?.x ?? 0) + o / 2, p = (r.arrow?.y ?? 0) + l / 2;
      let f = "", g = "";
      return d === "bottom" ? (f = a ? u : `${m}px`, g = `${-l}px`) : d === "top" ? (f = a ? u : `${m}px`, g = `${i.floating.height + l}px`) : d === "right" ? (f = `${-l}px`, g = a ? u : `${p}px`) : d === "left" && (f = `${i.floating.width + l}px`, g = a ? u : `${p}px`), { data: { x: f, y: g } };
    }
  };
}
function yr(t) {
  const [e, n = "center"] = t.split("-");
  return [e, n];
}
function gc(t) {
  return yr(t)[0];
}
function vc(t) {
  return yr(t)[1];
}
function bc(t, e) {
  K(e, !0);
  let n = S(e, "tooltip", 3, !1);
  Dn.create(n());
  var i = I(), r = Z(i);
  B(r, () => e.children ?? J), T(t, i), U();
}
const yc = { afterMs: 1e4, onChange: ee };
function a1(t, e) {
  const { afterMs: n, onChange: i, getWindow: r } = { ...yc, ...e };
  let s = null, a = /* @__PURE__ */ N(ce(t));
  function o() {
    return r().setTimeout(
      () => {
        C(a, t, !0), i?.(t);
      },
      n
    );
  }
  return se(() => () => {
    s && r().clearTimeout(s);
  }), w.with(() => h(a), (l) => {
    C(a, l, !0), i?.(l), s && r().clearTimeout(s), s = o();
  });
}
class kc {
  #e;
  #t = /* @__PURE__ */ P(() => this.#e.candidateValues());
  #n;
  constructor(e) {
    this.#e = e, this.#n = a1("", { afterMs: 1e3, getWindow: this.#e.getWindow }), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
  }
  handleTypeaheadSearch(e) {
    if (!this.#e.enabled() || !h(this.#t).length) return;
    this.#n.current = this.#n.current + e;
    const n = this.#e.getCurrentItem(), i = h(this.#t).find((o) => o === n) ?? "", r = h(this.#t).map((o) => o ?? ""), s = cr(r, this.#n.current, i), a = h(this.#t).find((o) => o === s);
    return a && this.#e.onMatch(a), a;
  }
  resetTypeahead() {
    this.#n.current = "";
  }
}
class wc {
  #e;
  #t;
  #n = /* @__PURE__ */ P(() => this.#e.onMatch ? this.#e.onMatch : (e) => e.focus());
  #i = /* @__PURE__ */ P(() => this.#e.getCurrentItem ? this.#e.getCurrentItem : this.#e.getActiveElement);
  constructor(e) {
    this.#e = e, this.#t = a1("", { afterMs: 1e3, getWindow: e.getWindow }), this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this), this.resetTypeahead = this.resetTypeahead.bind(this);
  }
  handleTypeaheadSearch(e, n) {
    if (!n.length) return;
    this.#t.current = this.#t.current + e;
    const i = h(this.#i)(), r = n.find((l) => l === i)?.textContent?.trim() ?? "", s = n.map((l) => l.textContent?.trim() ?? ""), a = cr(s, this.#t.current, r), o = n.find((l) => l.textContent?.trim() === a);
    return o && h(this.#n)(o), o;
  }
  resetTypeahead() {
    this.#t.current = "";
  }
  get search() {
    return this.#t.current;
  }
}
const _c = [Je, Da, ir], Sc = [He, ja, nr], xc = [..._c, ...Sc], Cc = Na({
  component: "select",
  parts: [
    "trigger",
    "content",
    "item",
    "viewport",
    "scroll-up-button",
    "scroll-down-button",
    "group",
    "group-label",
    "separator",
    "arrow",
    "input",
    "content-wrapper",
    "item-text",
    "value"
  ]
}), mn = new kt("Select.Root | Combobox.Root"), ti = new kt("Select.Content | Combobox.Content");
class o1 {
  opts;
  #e = /* @__PURE__ */ N(!1);
  get touchedInput() {
    return h(this.#e);
  }
  set touchedInput(e) {
    C(this.#e, e, !0);
  }
  #t = /* @__PURE__ */ N(null);
  get inputNode() {
    return h(this.#t);
  }
  set inputNode(e) {
    C(this.#t, e, !0);
  }
  #n = /* @__PURE__ */ N(null);
  get contentNode() {
    return h(this.#n);
  }
  set contentNode(e) {
    C(this.#n, e, !0);
  }
  #i = /* @__PURE__ */ N(null);
  get triggerNode() {
    return h(this.#i);
  }
  set triggerNode(e) {
    C(this.#i, e, !0);
  }
  #r = /* @__PURE__ */ N("");
  get valueId() {
    return h(this.#r);
  }
  set valueId(e) {
    C(this.#r, e, !0);
  }
  #s = /* @__PURE__ */ N(null);
  get highlightedNode() {
    return h(this.#s);
  }
  set highlightedNode(e) {
    C(this.#s, e, !0);
  }
  #o = /* @__PURE__ */ P(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-value") : null);
  get highlightedValue() {
    return h(this.#o);
  }
  set highlightedValue(e) {
    C(this.#o, e);
  }
  #a = /* @__PURE__ */ P(() => {
    if (this.highlightedNode)
      return this.highlightedNode.id;
  });
  get highlightedId() {
    return h(this.#a);
  }
  set highlightedId(e) {
    C(this.#a, e);
  }
  #l = /* @__PURE__ */ P(() => this.highlightedNode ? this.highlightedNode.getAttribute("data-label") : null);
  get highlightedLabel() {
    return h(this.#l);
  }
  set highlightedLabel(e) {
    C(this.#l, e);
  }
  isUsingKeyboard = !1;
  isCombobox = !1;
  domContext = new cn(() => null);
  constructor(e) {
    this.opts = e, this.isCombobox = e.isCombobox, new bl({
      ref: w.with(() => this.contentNode),
      open: this.opts.open,
      onComplete: () => {
        this.opts.onOpenChangeComplete.current(this.opts.open.current);
      }
    }), Yi(() => {
      this.opts.open.current || this.setHighlightedNode(null);
    });
  }
  #d = Di(this.setHighlightedToFirstCandidate.bind(this), 20);
  setHighlightedNode(e, n = !1) {
    this.highlightedNode = e, e && (this.isUsingKeyboard || n) && e.scrollIntoView({ block: this.opts.scrollAlignment.current });
  }
  getCandidateNodes() {
    const e = this.contentNode;
    return e ? Array.from(e.querySelectorAll(`[${this.getBitsAttr("item")}]:not([data-disabled])`)) : [];
  }
  setHighlightedToFirstCandidate(e = { debounced: !1 }) {
    if (e.debounced) {
      this.#d();
      return;
    }
    this.setHighlightedNode(null);
    const n = this.getCandidateNodes();
    n.length && this.setHighlightedNode(n[0]);
  }
  getNodeByValue(e) {
    return this.getCandidateNodes().find((i) => i.dataset.value === e) ?? null;
  }
  setOpen(e) {
    this.opts.open.current = e;
  }
  toggleOpen() {
    this.opts.open.current = !this.opts.open.current;
  }
  handleOpen() {
    this.setOpen(!0);
  }
  handleClose() {
    this.setHighlightedNode(null), this.setOpen(!1);
  }
  toggleMenu() {
    this.toggleOpen();
  }
  getBitsAttr = (e) => Cc.getAttr(e, this.isCombobox ? "combobox" : void 0);
}
class Ac extends o1 {
  opts;
  isMulti = !1;
  #e = /* @__PURE__ */ P(() => this.opts.value.current !== "");
  get hasValue() {
    return h(this.#e);
  }
  set hasValue(e) {
    C(this.#e, e);
  }
  #t = /* @__PURE__ */ P(() => this.opts.items.current.length ? this.opts.items.current.find((n) => n.value === this.opts.value.current)?.label ?? "" : "");
  get currentLabel() {
    return h(this.#t);
  }
  set currentLabel(e) {
    C(this.#t, e);
  }
  #n = /* @__PURE__ */ P(() => this.opts.items.current.length ? this.opts.items.current.filter((n) => !n.disabled).map((n) => n.label) : []);
  get candidateLabels() {
    return h(this.#n);
  }
  set candidateLabels(e) {
    C(this.#n, e);
  }
  #i = /* @__PURE__ */ P(() => !(this.isMulti || this.opts.items.current.length === 0));
  get dataTypeaheadEnabled() {
    return h(this.#i);
  }
  set dataTypeaheadEnabled(e) {
    C(this.#i, e);
  }
  constructor(e) {
    super(e), this.opts = e, se(() => {
      !this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
    }), X(() => this.opts.open.current, () => {
      this.opts.open.current && this.setInitialHighlightedNode();
    });
  }
  includesItem(e) {
    return this.opts.value.current === e;
  }
  toggleItem(e, n = e) {
    this.opts.value.current = this.includesItem(e) ? "" : e, this.opts.inputValue.current = n;
  }
  setInitialHighlightedNode() {
    dn(() => {
      if (this.highlightedNode && this.domContext.getDocument().contains(this.highlightedNode)) return;
      if (this.opts.value.current !== "") {
        const n = this.getNodeByValue(this.opts.value.current);
        if (n) {
          this.setHighlightedNode(n, !0);
          return;
        }
      }
      const e = this.getCandidateNodes()[0];
      e && this.setHighlightedNode(e, !0);
    });
  }
}
class Ec extends o1 {
  opts;
  isMulti = !0;
  #e = /* @__PURE__ */ P(() => this.opts.value.current.length > 0);
  get hasValue() {
    return h(this.#e);
  }
  set hasValue(e) {
    C(this.#e, e);
  }
  constructor(e) {
    super(e), this.opts = e, se(() => {
      !this.opts.open.current && this.highlightedNode && this.setHighlightedNode(null);
    }), X(() => this.opts.open.current, () => {
      this.opts.open.current && this.setInitialHighlightedNode();
    });
  }
  includesItem(e) {
    return this.opts.value.current.includes(e);
  }
  toggleItem(e, n = e) {
    this.includesItem(e) ? this.opts.value.current = this.opts.value.current.filter((i) => i !== e) : this.opts.value.current = [...this.opts.value.current, e], this.opts.inputValue.current = n;
  }
  setInitialHighlightedNode() {
    dn(() => {
      if (!this.domContext || this.highlightedNode && this.domContext.getDocument().contains(this.highlightedNode)) return;
      if (this.opts.value.current.length && this.opts.value.current[0] !== "") {
        const n = this.getNodeByValue(this.opts.value.current[0]);
        if (n) {
          this.setHighlightedNode(n, !0);
          return;
        }
      }
      const e = this.getCandidateNodes()[0];
      e && this.setHighlightedNode(e, !0);
    });
  }
}
class Pc {
  static create(e) {
    const { type: n, ...i } = e, r = n === "single" ? new Ac(i) : new Ec(i);
    return mn.set(r);
  }
}
class kr {
  static create(e) {
    return new kr(e, mn.get());
  }
  opts;
  root;
  attachment;
  #e;
  #t;
  constructor(e, n) {
    this.opts = e, this.root = n, this.attachment = _e(e.ref, (i) => this.root.triggerNode = i), this.root.domContext = new cn(e.ref), this.#e = new wc({
      getCurrentItem: () => this.root.highlightedNode,
      onMatch: (i) => {
        this.root.setHighlightedNode(i);
      },
      getActiveElement: () => this.root.domContext.getActiveElement(),
      getWindow: () => this.root.domContext.getWindow()
    }), this.#t = new kc({
      getCurrentItem: () => this.root.isMulti ? "" : this.root.currentLabel,
      onMatch: (i) => {
        if (this.root.isMulti || !this.root.opts.items.current) return;
        const r = this.root.opts.items.current.find((s) => s.label === i);
        r && (this.root.opts.value.current = r.value);
      },
      enabled: () => !this.root.isMulti && this.root.dataTypeaheadEnabled,
      candidateValues: () => this.root.isMulti ? [] : this.root.candidateLabels,
      getWindow: () => this.root.domContext.getWindow()
    }), this.onkeydown = this.onkeydown.bind(this), this.onpointerdown = this.onpointerdown.bind(this), this.onpointerup = this.onpointerup.bind(this), this.onclick = this.onclick.bind(this);
  }
  #n() {
    this.root.opts.open.current = !0, this.#t.resetTypeahead(), this.#e.resetTypeahead();
  }
  #i(e) {
    this.#n();
  }
  /**
   * Logic used to handle keyboard selection/deselection.
   *
   * If it returns true, it means the item was selected and whatever is calling
   * this function should return early
   *
   */
  #r() {
    const e = this.root.highlightedValue === this.root.opts.value.current;
    return !this.root.opts.allowDeselect.current && e && !this.root.isMulti ? (this.root.handleClose(), !0) : (this.root.highlightedValue !== null && this.root.toggleItem(this.root.highlightedValue, this.root.highlightedLabel ?? void 0), !this.root.isMulti && !e ? (this.root.handleClose(), !0) : !1);
  }
  onkeydown(e) {
    if (this.root.isUsingKeyboard = !0, (e.key === He || e.key === Je) && e.preventDefault(), !this.root.opts.open.current) {
      if (e.key === Ii || e.key === kn || e.key === Je || e.key === He)
        e.preventDefault(), this.root.handleOpen();
      else if (!this.root.isMulti && this.root.dataTypeaheadEnabled) {
        this.#t.handleTypeaheadSearch(e.key);
        return;
      }
      if (this.root.hasValue) return;
      const a = this.root.getCandidateNodes();
      if (!a.length) return;
      if (e.key === Je) {
        const o = a[0];
        this.root.setHighlightedNode(o);
      } else if (e.key === He) {
        const o = a[a.length - 1];
        this.root.setHighlightedNode(o);
      }
      return;
    }
    if (e.key === rs) {
      this.root.handleClose();
      return;
    }
    if ((e.key === Ii || // if we're currently "typing ahead", we don't want to select the item
    // just yet as the item the user is trying to get to may have a space in it,
    // so we defer handling the close for this case until further down
    e.key === kn && this.#e.search === "") && !e.isComposing && (e.preventDefault(), this.#r()))
      return;
    if (e.key === He && e.altKey && this.root.handleClose(), xc.includes(e.key)) {
      e.preventDefault();
      const a = this.root.getCandidateNodes(), o = this.root.highlightedNode, l = o ? a.indexOf(o) : -1, d = this.root.opts.loop.current;
      let c;
      if (e.key === Je ? c = sd(a, l, d) : e.key === He ? c = ad(a, l, d) : e.key === ja ? c = od(a, l, 10, d) : e.key === Da ? c = ld(a, l, 10, d) : e.key === ir ? c = a[0] : e.key === nr && (c = a[a.length - 1]), !c) return;
      this.root.setHighlightedNode(c);
      return;
    }
    const n = e.ctrlKey || e.altKey || e.metaKey, i = e.key.length === 1, r = e.key === kn, s = this.root.getCandidateNodes();
    if (e.key !== rs) {
      if (!n && (i || r)) {
        !this.#e.handleTypeaheadSearch(e.key, s) && r && (e.preventDefault(), this.#r());
        return;
      }
      this.root.highlightedNode || this.root.setHighlightedToFirstCandidate();
    }
  }
  onclick(e) {
    e.currentTarget.focus();
  }
  onpointerdown(e) {
    if (this.root.opts.disabled.current) return;
    if (e.pointerType === "touch") return e.preventDefault();
    const n = e.target;
    n?.hasPointerCapture(e.pointerId) && n?.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && (this.root.opts.open.current === !1 ? this.#i(e) : this.root.handleClose());
  }
  onpointerup(e) {
    this.root.opts.disabled.current || (e.preventDefault(), e.pointerType === "touch" && (this.root.opts.open.current === !1 ? this.#i(e) : this.root.handleClose()));
  }
  #s = /* @__PURE__ */ P(() => ({
    id: this.opts.id.current,
    disabled: this.root.opts.disabled.current ? !0 : void 0,
    "aria-haspopup": "listbox",
    "aria-expanded": Y2(this.root.opts.open.current),
    "aria-activedescendant": this.root.highlightedId,
    "data-state": za(this.root.opts.open.current),
    "data-disabled": Xn(this.root.opts.disabled.current),
    "data-placeholder": this.root.hasValue ? void 0 : "",
    [this.root.getBitsAttr("trigger")]: "",
    onpointerdown: this.onpointerdown,
    onkeydown: this.onkeydown,
    onclick: this.onclick,
    onpointerup: this.onpointerup,
    ...this.attachment
  }));
  get props() {
    return h(this.#s);
  }
  set props(e) {
    C(this.#s, e);
  }
}
class wr {
  static create(e) {
    return ti.set(new wr(e, mn.get()));
  }
  opts;
  root;
  attachment;
  #e = /* @__PURE__ */ N(null);
  get viewportNode() {
    return h(this.#e);
  }
  set viewportNode(e) {
    C(this.#e, e, !0);
  }
  #t = /* @__PURE__ */ N(!1);
  get isPositioned() {
    return h(this.#t);
  }
  set isPositioned(e) {
    C(this.#t, e, !0);
  }
  domContext;
  constructor(e, n) {
    this.opts = e, this.root = n, this.attachment = _e(e.ref, (i) => this.root.contentNode = i), this.domContext = new cn(this.opts.ref), this.root.domContext === null && (this.root.domContext = this.domContext), wt(() => {
      this.root.contentNode = null, this.isPositioned = !1;
    }), X(() => this.root.opts.open.current, () => {
      this.root.opts.open.current || (this.isPositioned = !1);
    }), this.onpointermove = this.onpointermove.bind(this);
  }
  onpointermove(e) {
    this.root.isUsingKeyboard = !1;
  }
  #n = /* @__PURE__ */ P(() => mc(this.root.isCombobox ? "combobox" : "select"));
  onInteractOutside = (e) => {
    if (e.target === this.root.triggerNode || e.target === this.root.inputNode) {
      e.preventDefault();
      return;
    }
    this.opts.onInteractOutside.current(e), !e.defaultPrevented && this.root.handleClose();
  };
  onEscapeKeydown = (e) => {
    this.opts.onEscapeKeydown.current(e), !e.defaultPrevented && this.root.handleClose();
  };
  onOpenAutoFocus = (e) => {
    e.preventDefault();
  };
  onCloseAutoFocus = (e) => {
    e.preventDefault();
  };
  #i = /* @__PURE__ */ P(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return h(this.#i);
  }
  set snippetProps(e) {
    C(this.#i, e);
  }
  #r = /* @__PURE__ */ P(() => ({
    id: this.opts.id.current,
    role: "listbox",
    "aria-multiselectable": this.root.isMulti ? "true" : void 0,
    "data-state": za(this.root.opts.open.current),
    [this.root.getBitsAttr("content")]: "",
    style: {
      display: "flex",
      flexDirection: "column",
      outline: "none",
      boxSizing: "border-box",
      pointerEvents: "auto",
      ...h(this.#n)
    },
    onpointermove: this.onpointermove,
    ...this.attachment
  }));
  get props() {
    return h(this.#r);
  }
  set props(e) {
    C(this.#r, e);
  }
  popperProps = {
    onInteractOutside: this.onInteractOutside,
    onEscapeKeydown: this.onEscapeKeydown,
    onOpenAutoFocus: this.onOpenAutoFocus,
    onCloseAutoFocus: this.onCloseAutoFocus,
    trapFocus: !1,
    loop: !1,
    onPlaced: () => {
      this.root.opts.open.current && (this.isPositioned = !0);
    }
  };
}
class _r {
  static create(e) {
    return new _r(e, mn.get());
  }
  opts;
  root;
  attachment;
  #e = /* @__PURE__ */ P(() => this.root.includesItem(this.opts.value.current));
  get isSelected() {
    return h(this.#e);
  }
  set isSelected(e) {
    C(this.#e, e);
  }
  #t = /* @__PURE__ */ P(() => this.root.highlightedValue === this.opts.value.current);
  get isHighlighted() {
    return h(this.#t);
  }
  set isHighlighted(e) {
    C(this.#t, e);
  }
  prevHighlighted = new Aa(() => this.isHighlighted);
  #n = /* @__PURE__ */ N(!1);
  get mounted() {
    return h(this.#n);
  }
  set mounted(e) {
    C(this.#n, e, !0);
  }
  constructor(e, n) {
    this.opts = e, this.root = n, this.attachment = _e(e.ref), Pa(() => {
      this.root.setHighlightedToFirstCandidate({ debounced: !0 });
    }), wt(() => {
      this.root.setHighlightedToFirstCandidate({ debounced: !0 });
    }), X([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
      this.isHighlighted ? this.opts.onHighlight.current() : this.prevHighlighted.current && this.opts.onUnhighlight.current();
    }), X(() => this.mounted, () => {
      this.mounted && this.root.setInitialHighlightedNode();
    }), this.onpointerdown = this.onpointerdown.bind(this), this.onpointerup = this.onpointerup.bind(this), this.onpointermove = this.onpointermove.bind(this);
  }
  handleSelect() {
    if (this.opts.disabled.current) return;
    const e = this.opts.value.current === this.root.opts.value.current;
    if (!this.root.opts.allowDeselect.current && e && !this.root.isMulti) {
      this.root.handleClose();
      return;
    }
    this.root.toggleItem(this.opts.value.current, this.opts.label.current), !this.root.isMulti && !e && this.root.handleClose();
  }
  #i = /* @__PURE__ */ P(() => ({ selected: this.isSelected, highlighted: this.isHighlighted }));
  get snippetProps() {
    return h(this.#i);
  }
  set snippetProps(e) {
    C(this.#i, e);
  }
  onpointerdown(e) {
    e.preventDefault();
  }
  /**
   * Using `pointerup` instead of `click` allows power users to pointerdown
   * the trigger, then release pointerup on an item to select it vs having to do
   * multiple clicks.
   */
  onpointerup(e) {
    if (!(e.defaultPrevented || !this.opts.ref.current)) {
      if (e.pointerType === "touch" && !Ni) {
        le(
          this.opts.ref.current,
          "click",
          () => {
            this.handleSelect(), this.root.setHighlightedNode(this.opts.ref.current);
          },
          { once: !0 }
        );
        return;
      }
      e.preventDefault(), this.handleSelect(), e.pointerType === "touch" && this.root.setHighlightedNode(this.opts.ref.current);
    }
  }
  onpointermove(e) {
    e.pointerType !== "touch" && this.root.highlightedNode !== this.opts.ref.current && this.root.setHighlightedNode(this.opts.ref.current);
  }
  #r = /* @__PURE__ */ P(() => ({
    id: this.opts.id.current,
    role: "option",
    "aria-selected": this.root.includesItem(this.opts.value.current) ? "true" : void 0,
    "data-value": this.opts.value.current,
    "data-disabled": Xn(this.opts.disabled.current),
    "data-highlighted": this.root.highlightedValue === this.opts.value.current && !this.opts.disabled.current ? "" : void 0,
    "data-selected": this.root.includesItem(this.opts.value.current) ? "" : void 0,
    "data-label": this.opts.label.current,
    [this.root.getBitsAttr("item")]: "",
    onpointermove: this.onpointermove,
    onpointerdown: this.onpointerdown,
    onpointerup: this.onpointerup,
    ...this.attachment
  }));
  get props() {
    return h(this.#r);
  }
  set props(e) {
    C(this.#r, e);
  }
}
class Sr {
  static create(e) {
    return new Sr(e, mn.get());
  }
  opts;
  root;
  #e = /* @__PURE__ */ P(() => this.root.opts.name.current !== "");
  get shouldRender() {
    return h(this.#e);
  }
  set shouldRender(e) {
    C(this.#e, e);
  }
  constructor(e, n) {
    this.opts = e, this.root = n, this.onfocus = this.onfocus.bind(this);
  }
  onfocus(e) {
    e.preventDefault(), this.root.isCombobox ? this.root.inputNode?.focus() : this.root.triggerNode?.focus();
  }
  #t = /* @__PURE__ */ P(() => ({
    disabled: Ia(this.root.opts.disabled.current),
    required: $2(this.root.opts.required.current),
    name: this.root.opts.name.current,
    value: this.opts.value.current,
    onfocus: this.onfocus
  }));
  get props() {
    return h(this.#t);
  }
  set props(e) {
    C(this.#t, e);
  }
}
class xr {
  static create(e) {
    return new xr(e, ti.get());
  }
  opts;
  content;
  root;
  attachment;
  #e = /* @__PURE__ */ N(0);
  get prevScrollTop() {
    return h(this.#e);
  }
  set prevScrollTop(e) {
    C(this.#e, e, !0);
  }
  constructor(e, n) {
    this.opts = e, this.content = n, this.root = n.root, this.attachment = _e(e.ref, (i) => this.content.viewportNode = i);
  }
  #t = /* @__PURE__ */ P(() => ({
    id: this.opts.id.current,
    role: "presentation",
    [this.root.getBitsAttr("viewport")]: "",
    style: {
      // we use position: 'relative' here on the `viewport` so that when we call
      // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
      // (independent of the scrollUpButton).
      position: "relative",
      flex: 1,
      overflow: "auto"
    },
    ...this.attachment
  }));
  get props() {
    return h(this.#t);
  }
  set props(e) {
    C(this.#t, e);
  }
}
class l1 {
  opts;
  content;
  root;
  attachment;
  autoScrollTimer = null;
  userScrollTimer = -1;
  isUserScrolling = !1;
  onAutoScroll = ee;
  #e = /* @__PURE__ */ N(!1);
  get mounted() {
    return h(this.#e);
  }
  set mounted(e) {
    C(this.#e, e, !0);
  }
  constructor(e, n) {
    this.opts = e, this.content = n, this.root = n.root, this.attachment = _e(e.ref), X([() => this.mounted], () => {
      if (!this.mounted) {
        this.isUserScrolling = !1;
        return;
      }
      this.isUserScrolling;
    }), se(() => {
      this.mounted || this.clearAutoScrollInterval();
    }), this.onpointerdown = this.onpointerdown.bind(this), this.onpointermove = this.onpointermove.bind(this), this.onpointerleave = this.onpointerleave.bind(this);
  }
  handleUserScroll() {
    this.content.domContext.clearTimeout(this.userScrollTimer), this.isUserScrolling = !0, this.userScrollTimer = this.content.domContext.setTimeout(
      () => {
        this.isUserScrolling = !1;
      },
      200
    );
  }
  clearAutoScrollInterval() {
    this.autoScrollTimer !== null && (this.content.domContext.clearTimeout(this.autoScrollTimer), this.autoScrollTimer = null);
  }
  onpointerdown(e) {
    if (this.autoScrollTimer !== null) return;
    const n = (i) => {
      this.onAutoScroll(), this.autoScrollTimer = this.content.domContext.setTimeout(() => n(i + 1), this.opts.delay.current(i));
    };
    this.autoScrollTimer = this.content.domContext.setTimeout(() => n(1), this.opts.delay.current(0));
  }
  onpointermove(e) {
    this.onpointerdown(e);
  }
  onpointerleave(e) {
    this.clearAutoScrollInterval();
  }
  #t = /* @__PURE__ */ P(() => ({
    id: this.opts.id.current,
    "aria-hidden": J2(!0),
    style: { flexShrink: 0 },
    onpointerdown: this.onpointerdown,
    onpointermove: this.onpointermove,
    onpointerleave: this.onpointerleave,
    ...this.attachment
  }));
  get props() {
    return h(this.#t);
  }
  set props(e) {
    C(this.#t, e);
  }
}
class Cr {
  static create(e) {
    return new Cr(new l1(e, ti.get()));
  }
  scrollButtonState;
  content;
  root;
  #e = /* @__PURE__ */ N(!1);
  get canScrollDown() {
    return h(this.#e);
  }
  set canScrollDown(e) {
    C(this.#e, e, !0);
  }
  scrollIntoViewTimer = null;
  constructor(e) {
    this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, X(
      [
        () => this.content.viewportNode,
        () => this.content.isPositioned
      ],
      () => {
        if (!(!this.content.viewportNode || !this.content.isPositioned))
          return this.handleScroll(!0), le(this.content.viewportNode, "scroll", () => this.handleScroll());
      }
    ), X(() => this.scrollButtonState.mounted, () => {
      this.scrollButtonState.mounted && (this.scrollIntoViewTimer && clearTimeout(this.scrollIntoViewTimer), this.scrollIntoViewTimer = Ea(5, () => {
        this.root.highlightedNode?.scrollIntoView({ block: this.root.opts.scrollAlignment.current });
      }));
    });
  }
  /**
   * @param manual - if true, it means the function was invoked manually outside of an event
   * listener, so we don't call `handleUserScroll` to prevent the auto scroll from kicking in.
   */
  handleScroll = (e = !1) => {
    if (e || this.scrollButtonState.handleUserScroll(), !this.content.viewportNode) return;
    const n = this.content.viewportNode.scrollHeight - this.content.viewportNode.clientHeight, i = Number.parseInt(getComputedStyle(this.content.viewportNode).paddingTop, 10);
    this.canScrollDown = Math.ceil(this.content.viewportNode.scrollTop) < n - i;
  };
  handleAutoScroll = () => {
    const e = this.content.viewportNode, n = this.root.highlightedNode;
    !e || !n || (e.scrollTop = e.scrollTop + n.offsetHeight);
  };
  #t = /* @__PURE__ */ P(() => ({
    ...this.scrollButtonState.props,
    [this.root.getBitsAttr("scroll-down-button")]: ""
  }));
  get props() {
    return h(this.#t);
  }
  set props(e) {
    C(this.#t, e);
  }
}
class Ar {
  static create(e) {
    return new Ar(new l1(e, ti.get()));
  }
  scrollButtonState;
  content;
  root;
  #e = /* @__PURE__ */ N(!1);
  get canScrollUp() {
    return h(this.#e);
  }
  set canScrollUp(e) {
    C(this.#e, e, !0);
  }
  constructor(e) {
    this.scrollButtonState = e, this.content = e.content, this.root = e.root, this.scrollButtonState.onAutoScroll = this.handleAutoScroll, X(
      [
        () => this.content.viewportNode,
        () => this.content.isPositioned
      ],
      () => {
        if (!(!this.content.viewportNode || !this.content.isPositioned))
          return this.handleScroll(!0), le(this.content.viewportNode, "scroll", () => this.handleScroll());
      }
    );
  }
  /**
   * @param manual - if true, it means the function was invoked manually outside of an event
   * listener, so we don't call `handleUserScroll` to prevent the auto scroll from kicking in.
   */
  handleScroll = (e = !1) => {
    if (e || this.scrollButtonState.handleUserScroll(), !this.content.viewportNode) return;
    const n = Number.parseInt(getComputedStyle(this.content.viewportNode).paddingTop, 10);
    this.canScrollUp = this.content.viewportNode.scrollTop - n > 0.1;
  };
  handleAutoScroll = () => {
    !this.content.viewportNode || !this.root.highlightedNode || (this.content.viewportNode.scrollTop = this.content.viewportNode.scrollTop - this.root.highlightedNode.offsetHeight);
  };
  #t = /* @__PURE__ */ P(() => ({
    ...this.scrollButtonState.props,
    [this.root.getBitsAttr("scroll-up-button")]: ""
  }));
  get props() {
    return h(this.#t);
  }
  set props(e) {
    C(this.#t, e);
  }
}
function ki(t, e) {
  K(e, !0);
  let n = S(e, "value", 15, "");
  const i = Sr.create({ value: w.with(() => n()) });
  var r = I(), s = Z(r);
  {
    var a = (o) => {
      ud(o, zt(() => i.props, {
        get autocomplete() {
          return e.autocomplete;
        },
        get value() {
          return n();
        },
        set value(l) {
          n(l);
        }
      }));
    };
    $(s, (o) => {
      i.shouldRender && o(a);
    });
  }
  T(t, r), U();
}
function Tc(t, e) {
  K(e, !0);
  let n = S(e, "tooltip", 3, !1);
  Fn.create(
    {
      id: w.with(() => e.id),
      virtualEl: w.with(() => e.virtualEl),
      ref: e.ref
    },
    n()
  );
  var i = I(), r = Z(i);
  B(r, () => e.children ?? J), T(t, i), U();
}
function Oc(t, e) {
  K(e, !0);
  let n = S(e, "side", 3, "bottom"), i = S(e, "sideOffset", 3, 0), r = S(e, "align", 3, "center"), s = S(e, "alignOffset", 3, 0), a = S(e, "arrowPadding", 3, 0), o = S(e, "avoidCollisions", 3, !0), l = S(e, "collisionBoundary", 19, () => []), d = S(e, "collisionPadding", 3, 0), c = S(e, "hideWhenDetached", 3, !1), u = S(e, "onPlaced", 3, () => {
  }), m = S(e, "sticky", 3, "partial"), p = S(e, "updatePositionStrategy", 3, "optimized"), f = S(e, "strategy", 3, "fixed"), g = S(e, "dir", 3, "ltr"), b = S(e, "style", 19, () => ({})), k = S(e, "wrapperId", 19, dr), y = S(e, "customAnchor", 3, null), v = S(e, "tooltip", 3, !1);
  const _ = Mn.create(
    {
      side: w.with(() => n()),
      sideOffset: w.with(() => i()),
      align: w.with(() => r()),
      alignOffset: w.with(() => s()),
      id: w.with(() => e.id),
      arrowPadding: w.with(() => a()),
      avoidCollisions: w.with(() => o()),
      collisionBoundary: w.with(() => l()),
      collisionPadding: w.with(() => d()),
      hideWhenDetached: w.with(() => c()),
      onPlaced: w.with(() => u()),
      sticky: w.with(() => m()),
      updatePositionStrategy: w.with(() => p()),
      strategy: w.with(() => f()),
      dir: w.with(() => g()),
      style: w.with(() => b()),
      enabled: w.with(() => e.enabled),
      wrapperId: w.with(() => k()),
      customAnchor: w.with(() => y())
    },
    v()
  ), A = /* @__PURE__ */ P(() => me(_.wrapperProps, { style: { pointerEvents: "auto" } }));
  var E = I(), x = Z(E);
  B(x, () => e.content ?? J, () => ({ props: _.props, wrapperProps: h(A) })), T(t, E), U();
}
function Zc(t, e) {
  K(e, !0), $o(() => {
    e.onPlaced?.();
  });
  var n = I(), i = Z(n);
  B(i, () => e.content ?? J, () => ({ props: {}, wrapperProps: {} })), T(t, n), U();
}
function zc(t, e) {
  let n = S(e, "isStatic", 3, !1), i = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "content",
    "isStatic",
    "onPlaced"
  ]);
  var r = I(), s = Z(r);
  {
    var a = (l) => {
      Zc(l, {
        get content() {
          return e.content;
        },
        get onPlaced() {
          return e.onPlaced;
        }
      });
    }, o = (l) => {
      Oc(l, zt(
        {
          get content() {
            return e.content;
          },
          get onPlaced() {
            return e.onPlaced;
          }
        },
        () => i
      ));
    };
    $(s, (l) => {
      n() ? l(a) : l(o, !1);
    });
  }
  T(t, r);
}
var Ic = /* @__PURE__ */ q("<!> <!>", 1);
function d1(t, e) {
  K(e, !0);
  let n = S(e, "interactOutsideBehavior", 3, "close"), i = S(e, "trapFocus", 3, !0), r = S(e, "isValidEvent", 3, () => !1), s = S(e, "customAnchor", 3, null), a = S(e, "isStatic", 3, !1), o = S(e, "tooltip", 3, !1), l = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "popper",
    "onEscapeKeydown",
    "escapeKeydownBehavior",
    "preventOverflowTextSelection",
    "id",
    "onPointerDown",
    "onPointerUp",
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "arrowPadding",
    "avoidCollisions",
    "collisionBoundary",
    "collisionPadding",
    "sticky",
    "hideWhenDetached",
    "updatePositionStrategy",
    "strategy",
    "dir",
    "preventScroll",
    "wrapperId",
    "style",
    "onPlaced",
    "onInteractOutside",
    "onCloseAutoFocus",
    "onOpenAutoFocus",
    "onFocusOutside",
    "interactOutsideBehavior",
    "loop",
    "trapFocus",
    "isValidEvent",
    "customAnchor",
    "isStatic",
    "enabled",
    "ref",
    "tooltip"
  ]);
  zc(t, {
    get isStatic() {
      return a();
    },
    get id() {
      return e.id;
    },
    get side() {
      return e.side;
    },
    get sideOffset() {
      return e.sideOffset;
    },
    get align() {
      return e.align;
    },
    get alignOffset() {
      return e.alignOffset;
    },
    get arrowPadding() {
      return e.arrowPadding;
    },
    get avoidCollisions() {
      return e.avoidCollisions;
    },
    get collisionBoundary() {
      return e.collisionBoundary;
    },
    get collisionPadding() {
      return e.collisionPadding;
    },
    get sticky() {
      return e.sticky;
    },
    get hideWhenDetached() {
      return e.hideWhenDetached;
    },
    get updatePositionStrategy() {
      return e.updatePositionStrategy;
    },
    get strategy() {
      return e.strategy;
    },
    get dir() {
      return e.dir;
    },
    get wrapperId() {
      return e.wrapperId;
    },
    get style() {
      return e.style;
    },
    get onPlaced() {
      return e.onPlaced;
    },
    get customAnchor() {
      return s();
    },
    get enabled() {
      return e.enabled;
    },
    get tooltip() {
      return o();
    },
    content: (c, u) => {
      let m = () => u?.().props, p = () => u?.().wrapperProps;
      var f = Ic(), g = Z(f);
      {
        var b = (v) => {
          cs(v, {
            get preventScroll() {
              return e.preventScroll;
            }
          });
        }, k = (v) => {
          var _ = I(), A = Z(_);
          {
            var E = (x) => {
              cs(x, {
                get preventScroll() {
                  return e.preventScroll;
                }
              });
            };
            $(
              A,
              (x) => {
                e.forceMount || x(E);
              },
              !0
            );
          }
          T(v, _);
        };
        $(g, (v) => {
          e.forceMount && e.enabled ? v(b) : v(k, !1);
        });
      }
      var y = re(g, 2);
      Ql(y, {
        get onOpenAutoFocus() {
          return e.onOpenAutoFocus;
        },
        get onCloseAutoFocus() {
          return e.onCloseAutoFocus;
        },
        get loop() {
          return e.loop;
        },
        get enabled() {
          return e.enabled;
        },
        get trapFocus() {
          return i();
        },
        get forceMount() {
          return e.forceMount;
        },
        get ref() {
          return e.ref;
        },
        focusScope: (_, A) => {
          let E = () => A?.().props;
          Il(_, {
            get onEscapeKeydown() {
              return e.onEscapeKeydown;
            },
            get escapeKeydownBehavior() {
              return e.escapeKeydownBehavior;
            },
            get enabled() {
              return e.enabled;
            },
            get ref() {
              return e.ref;
            },
            children: (x, j) => {
              Zl(x, {
                get id() {
                  return e.id;
                },
                get onInteractOutside() {
                  return e.onInteractOutside;
                },
                get onFocusOutside() {
                  return e.onFocusOutside;
                },
                get interactOutsideBehavior() {
                  return n();
                },
                get isValidEvent() {
                  return r();
                },
                get enabled() {
                  return e.enabled;
                },
                get ref() {
                  return e.ref;
                },
                children: (L, F) => {
                  let D = () => F?.().props;
                  td(L, {
                    get id() {
                      return e.id;
                    },
                    get preventOverflowTextSelection() {
                      return e.preventOverflowTextSelection;
                    },
                    get onPointerDown() {
                      return e.onPointerDown;
                    },
                    get onPointerUp() {
                      return e.onPointerUp;
                    },
                    get enabled() {
                      return e.enabled;
                    },
                    get ref() {
                      return e.ref;
                    },
                    children: (z, O) => {
                      var M = I(), W = Z(M);
                      {
                        let G = /* @__PURE__ */ P(() => ({
                          props: me(l, m(), D(), E(), { style: { pointerEvents: "auto" } }),
                          wrapperProps: p()
                        }));
                        B(W, () => e.popper ?? J, () => h(G));
                      }
                      T(z, M);
                    },
                    $$slots: { default: !0 }
                  });
                },
                $$slots: { default: !0 }
              });
            },
            $$slots: { default: !0 }
          });
        },
        $$slots: { focusScope: !0 }
      }), T(c, f);
    },
    $$slots: { content: !0 }
  }), U();
}
function Nc(t, e) {
  let n = S(e, "interactOutsideBehavior", 3, "close"), i = S(e, "trapFocus", 3, !0), r = S(e, "isValidEvent", 3, () => !1), s = S(e, "customAnchor", 3, null), a = S(e, "isStatic", 3, !1), o = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "popper",
    "open",
    "onEscapeKeydown",
    "escapeKeydownBehavior",
    "preventOverflowTextSelection",
    "id",
    "onPointerDown",
    "onPointerUp",
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "arrowPadding",
    "avoidCollisions",
    "collisionBoundary",
    "collisionPadding",
    "sticky",
    "hideWhenDetached",
    "updatePositionStrategy",
    "strategy",
    "dir",
    "preventScroll",
    "wrapperId",
    "style",
    "onPlaced",
    "onInteractOutside",
    "onCloseAutoFocus",
    "onOpenAutoFocus",
    "onFocusOutside",
    "interactOutsideBehavior",
    "loop",
    "trapFocus",
    "isValidEvent",
    "customAnchor",
    "isStatic",
    "ref"
  ]);
  gl(t, {
    get open() {
      return e.open;
    },
    get ref() {
      return e.ref;
    },
    presence: (d) => {
      d1(d, zt(
        {
          get popper() {
            return e.popper;
          },
          get onEscapeKeydown() {
            return e.onEscapeKeydown;
          },
          get escapeKeydownBehavior() {
            return e.escapeKeydownBehavior;
          },
          get preventOverflowTextSelection() {
            return e.preventOverflowTextSelection;
          },
          get id() {
            return e.id;
          },
          get onPointerDown() {
            return e.onPointerDown;
          },
          get onPointerUp() {
            return e.onPointerUp;
          },
          get side() {
            return e.side;
          },
          get sideOffset() {
            return e.sideOffset;
          },
          get align() {
            return e.align;
          },
          get alignOffset() {
            return e.alignOffset;
          },
          get arrowPadding() {
            return e.arrowPadding;
          },
          get avoidCollisions() {
            return e.avoidCollisions;
          },
          get collisionBoundary() {
            return e.collisionBoundary;
          },
          get collisionPadding() {
            return e.collisionPadding;
          },
          get sticky() {
            return e.sticky;
          },
          get hideWhenDetached() {
            return e.hideWhenDetached;
          },
          get updatePositionStrategy() {
            return e.updatePositionStrategy;
          },
          get strategy() {
            return e.strategy;
          },
          get dir() {
            return e.dir;
          },
          get preventScroll() {
            return e.preventScroll;
          },
          get wrapperId() {
            return e.wrapperId;
          },
          get style() {
            return e.style;
          },
          get onPlaced() {
            return e.onPlaced;
          },
          get customAnchor() {
            return s();
          },
          get isStatic() {
            return a();
          },
          get enabled() {
            return e.open;
          },
          get onInteractOutside() {
            return e.onInteractOutside;
          },
          get onCloseAutoFocus() {
            return e.onCloseAutoFocus;
          },
          get onOpenAutoFocus() {
            return e.onOpenAutoFocus;
          },
          get interactOutsideBehavior() {
            return n();
          },
          get loop() {
            return e.loop;
          },
          get trapFocus() {
            return i();
          },
          get isValidEvent() {
            return r();
          },
          get onFocusOutside() {
            return e.onFocusOutside;
          },
          forceMount: !1,
          get ref() {
            return e.ref;
          }
        },
        () => o
      ));
    },
    $$slots: { presence: !0 }
  });
}
function jc(t, e) {
  let n = S(e, "interactOutsideBehavior", 3, "close"), i = S(e, "trapFocus", 3, !0), r = S(e, "isValidEvent", 3, () => !1), s = S(e, "customAnchor", 3, null), a = S(e, "isStatic", 3, !1), o = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "popper",
    "onEscapeKeydown",
    "escapeKeydownBehavior",
    "preventOverflowTextSelection",
    "id",
    "onPointerDown",
    "onPointerUp",
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "arrowPadding",
    "avoidCollisions",
    "collisionBoundary",
    "collisionPadding",
    "sticky",
    "hideWhenDetached",
    "updatePositionStrategy",
    "strategy",
    "dir",
    "preventScroll",
    "wrapperId",
    "style",
    "onPlaced",
    "onInteractOutside",
    "onCloseAutoFocus",
    "onOpenAutoFocus",
    "onFocusOutside",
    "interactOutsideBehavior",
    "loop",
    "trapFocus",
    "isValidEvent",
    "customAnchor",
    "isStatic",
    "enabled"
  ]);
  d1(t, zt(
    {
      get popper() {
        return e.popper;
      },
      get onEscapeKeydown() {
        return e.onEscapeKeydown;
      },
      get escapeKeydownBehavior() {
        return e.escapeKeydownBehavior;
      },
      get preventOverflowTextSelection() {
        return e.preventOverflowTextSelection;
      },
      get id() {
        return e.id;
      },
      get onPointerDown() {
        return e.onPointerDown;
      },
      get onPointerUp() {
        return e.onPointerUp;
      },
      get side() {
        return e.side;
      },
      get sideOffset() {
        return e.sideOffset;
      },
      get align() {
        return e.align;
      },
      get alignOffset() {
        return e.alignOffset;
      },
      get arrowPadding() {
        return e.arrowPadding;
      },
      get avoidCollisions() {
        return e.avoidCollisions;
      },
      get collisionBoundary() {
        return e.collisionBoundary;
      },
      get collisionPadding() {
        return e.collisionPadding;
      },
      get sticky() {
        return e.sticky;
      },
      get hideWhenDetached() {
        return e.hideWhenDetached;
      },
      get updatePositionStrategy() {
        return e.updatePositionStrategy;
      },
      get strategy() {
        return e.strategy;
      },
      get dir() {
        return e.dir;
      },
      get preventScroll() {
        return e.preventScroll;
      },
      get wrapperId() {
        return e.wrapperId;
      },
      get style() {
        return e.style;
      },
      get onPlaced() {
        return e.onPlaced;
      },
      get customAnchor() {
        return s();
      },
      get isStatic() {
        return a();
      },
      get enabled() {
        return e.enabled;
      },
      get onInteractOutside() {
        return e.onInteractOutside;
      },
      get onCloseAutoFocus() {
        return e.onCloseAutoFocus;
      },
      get onOpenAutoFocus() {
        return e.onOpenAutoFocus;
      },
      get interactOutsideBehavior() {
        return n();
      },
      get loop() {
        return e.loop;
      },
      get trapFocus() {
        return i();
      },
      get isValidEvent() {
        return r();
      },
      get onFocusOutside() {
        return e.onFocusOutside;
      }
    },
    () => o,
    { forceMount: !0 }
  ));
}
var Dc = /* @__PURE__ */ q("<div><div><!></div></div>"), Mc = /* @__PURE__ */ q("<div><div><!></div></div>");
function Fc(t, e) {
  const n = Fe();
  K(e, !0);
  let i = S(e, "id", 19, () => Re(n)), r = S(e, "ref", 15, null), s = S(e, "forceMount", 3, !1), a = S(e, "side", 3, "bottom"), o = S(e, "onInteractOutside", 3, ee), l = S(e, "onEscapeKeydown", 3, ee), d = S(e, "preventScroll", 3, !1), c = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "id",
    "ref",
    "forceMount",
    "side",
    "onInteractOutside",
    "onEscapeKeydown",
    "children",
    "child",
    "preventScroll"
  ]);
  const u = wr.create({
    id: w.with(() => i()),
    ref: w.with(() => r(), (k) => r(k)),
    onInteractOutside: w.with(() => o()),
    onEscapeKeydown: w.with(() => l())
  }), m = /* @__PURE__ */ P(() => me(c, u.props));
  var p = I(), f = Z(p);
  {
    var g = (k) => {
      jc(k, zt(() => h(m), () => u.popperProps, {
        get ref() {
          return u.opts.ref;
        },
        get side() {
          return a();
        },
        get enabled() {
          return u.root.opts.open.current;
        },
        get id() {
          return i();
        },
        get preventScroll() {
          return d();
        },
        forceMount: !0,
        popper: (v, _) => {
          let A = () => _?.().props, E = () => _?.().wrapperProps;
          const x = /* @__PURE__ */ P(() => me(A(), { style: u.props.style }));
          var j = I(), R = Z(j);
          {
            var L = (D) => {
              var z = I(), O = Z(z);
              {
                let M = /* @__PURE__ */ P(() => ({
                  props: h(x),
                  wrapperProps: E(),
                  ...u.snippetProps
                }));
                B(O, () => e.child, () => h(M));
              }
              T(D, z);
            }, F = (D) => {
              var z = Dc();
              ue(z, () => ({ ...E() }));
              var O = Q(z);
              ue(O, () => ({ ...h(x) }));
              var M = Q(O);
              B(M, () => e.children ?? J), T(D, z);
            };
            $(R, (D) => {
              e.child ? D(L) : D(F, !1);
            });
          }
          T(v, j);
        },
        $$slots: { popper: !0 }
      }));
    }, b = (k) => {
      var y = I(), v = Z(y);
      {
        var _ = (A) => {
          Nc(A, zt(() => h(m), () => u.popperProps, {
            get ref() {
              return u.opts.ref;
            },
            get side() {
              return a();
            },
            get open() {
              return u.root.opts.open.current;
            },
            get id() {
              return i();
            },
            get preventScroll() {
              return d();
            },
            forceMount: !1,
            popper: (x, j) => {
              let R = () => j?.().props, L = () => j?.().wrapperProps;
              const F = /* @__PURE__ */ P(() => me(R(), { style: u.props.style }));
              var D = I(), z = Z(D);
              {
                var O = (W) => {
                  var G = I(), ne = Z(G);
                  {
                    let ie = /* @__PURE__ */ P(() => ({
                      props: h(F),
                      wrapperProps: L(),
                      ...u.snippetProps
                    }));
                    B(ne, () => e.child, () => h(ie));
                  }
                  T(W, G);
                }, M = (W) => {
                  var G = Mc();
                  ue(G, () => ({ ...L() }));
                  var ne = Q(G);
                  ue(ne, () => ({ ...h(F) }));
                  var ie = Q(ne);
                  B(ie, () => e.children ?? J), T(W, G);
                };
                $(z, (W) => {
                  e.child ? W(O) : W(M, !1);
                });
              }
              T(x, D);
            },
            $$slots: { popper: !0 }
          }));
        };
        $(
          v,
          (A) => {
            s() || A(_);
          },
          !0
        );
      }
      T(k, y);
    };
    $(f, (k) => {
      s() ? k(g) : k(b, !1);
    });
  }
  T(t, p), U();
}
function Er(t, e) {
  K(e, !0);
  let n = S(e, "mounted", 15, !1), i = S(e, "onMountedChange", 3, ee);
  Pa(() => (n(!0), i()(!0), () => {
    n(!1), i()(!1);
  })), U();
}
var Rc = /* @__PURE__ */ q("<div><!></div>"), Lc = /* @__PURE__ */ q("<!> <!>", 1);
function Ss(t, e) {
  const n = Fe();
  K(e, !0);
  let i = S(e, "id", 19, () => Re(n)), r = S(e, "ref", 15, null), s = S(e, "label", 19, () => e.value), a = S(e, "disabled", 3, !1), o = S(e, "onHighlight", 3, ee), l = S(e, "onUnhighlight", 3, ee), d = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "id",
    "ref",
    "value",
    "label",
    "disabled",
    "children",
    "child",
    "onHighlight",
    "onUnhighlight"
  ]);
  const c = _r.create({
    id: w.with(() => i()),
    ref: w.with(() => r(), (k) => r(k)),
    value: w.with(() => e.value),
    disabled: w.with(() => a()),
    label: w.with(() => s()),
    onHighlight: w.with(() => o()),
    onUnhighlight: w.with(() => l())
  }), u = /* @__PURE__ */ P(() => me(d, c.props));
  var m = Lc(), p = Z(m);
  {
    var f = (k) => {
      var y = I(), v = Z(y);
      {
        let _ = /* @__PURE__ */ P(() => ({ props: h(u), ...c.snippetProps }));
        B(v, () => e.child, () => h(_));
      }
      T(k, y);
    }, g = (k) => {
      var y = Rc();
      ue(y, () => ({ ...h(u) }));
      var v = Q(y);
      B(v, () => e.children ?? J, () => c.snippetProps), T(k, y);
    };
    $(p, (k) => {
      e.child ? k(f) : k(g, !1);
    });
  }
  var b = re(p, 2);
  Er(b, {
    get mounted() {
      return c.mounted;
    },
    set mounted(k) {
      c.mounted = k;
    }
  }), T(t, m), U();
}
var Bc = /* @__PURE__ */ q("<div><!></div>");
function Hc(t, e) {
  const n = Fe();
  K(e, !0);
  let i = S(e, "id", 19, () => Re(n)), r = S(e, "ref", 15, null), s = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "id",
    "ref",
    "children",
    "child"
  ]);
  const a = xr.create({
    id: w.with(() => i()),
    ref: w.with(() => r(), (m) => r(m))
  }), o = /* @__PURE__ */ P(() => me(s, a.props));
  var l = I(), d = Z(l);
  {
    var c = (m) => {
      var p = I(), f = Z(p);
      B(f, () => e.child, () => ({ props: h(o) })), T(m, p);
    }, u = (m) => {
      var p = Bc();
      ue(p, () => ({ ...h(o) }));
      var f = Q(p);
      B(f, () => e.children ?? J), T(m, p);
    };
    $(d, (m) => {
      e.child ? m(c) : m(u, !1);
    });
  }
  T(t, l), U();
}
var Vc = /* @__PURE__ */ q("<div><!></div>"), Wc = /* @__PURE__ */ q("<!> <!>", 1);
function Kc(t, e) {
  const n = Fe();
  K(e, !0);
  let i = S(e, "id", 19, () => Re(n)), r = S(e, "ref", 15, null), s = S(e, "delay", 3, () => 50), a = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "id",
    "ref",
    "delay",
    "child",
    "children"
  ]);
  const o = Cr.create({
    id: w.with(() => i()),
    ref: w.with(() => r(), (m) => r(m)),
    delay: w.with(() => s())
  }), l = /* @__PURE__ */ P(() => me(a, o.props));
  var d = I(), c = Z(d);
  {
    var u = (m) => {
      var p = Wc(), f = Z(p);
      Er(f, {
        get mounted() {
          return o.scrollButtonState.mounted;
        },
        set mounted(y) {
          o.scrollButtonState.mounted = y;
        }
      });
      var g = re(f, 2);
      {
        var b = (y) => {
          var v = I(), _ = Z(v);
          B(_, () => e.child, () => ({ props: a })), T(y, v);
        }, k = (y) => {
          var v = Vc();
          ue(v, () => ({ ...h(l) }));
          var _ = Q(v);
          B(_, () => e.children ?? J), T(y, v);
        };
        $(g, (y) => {
          e.child ? y(b) : y(k, !1);
        });
      }
      T(m, p);
    };
    $(c, (m) => {
      o.canScrollDown && m(u);
    });
  }
  T(t, d), U();
}
var Uc = /* @__PURE__ */ q("<div><!></div>"), qc = /* @__PURE__ */ q("<!> <!>", 1);
function Gc(t, e) {
  const n = Fe();
  K(e, !0);
  let i = S(e, "id", 19, () => Re(n)), r = S(e, "ref", 15, null), s = S(e, "delay", 3, () => 50), a = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "id",
    "ref",
    "delay",
    "child",
    "children"
  ]);
  const o = Ar.create({
    id: w.with(() => i()),
    ref: w.with(() => r(), (m) => r(m)),
    delay: w.with(() => s())
  }), l = /* @__PURE__ */ P(() => me(a, o.props));
  var d = I(), c = Z(d);
  {
    var u = (m) => {
      var p = qc(), f = Z(p);
      Er(f, {
        get mounted() {
          return o.scrollButtonState.mounted;
        },
        set mounted(y) {
          o.scrollButtonState.mounted = y;
        }
      });
      var g = re(f, 2);
      {
        var b = (y) => {
          var v = I(), _ = Z(v);
          B(_, () => e.child, () => ({ props: a })), T(y, v);
        }, k = (y) => {
          var v = Uc();
          ue(v, () => ({ ...h(l) }));
          var _ = Q(v);
          B(_, () => e.children ?? J), T(y, v);
        };
        $(g, (y) => {
          e.child ? y(b) : y(k, !1);
        });
      }
      T(m, p);
    };
    $(c, (m) => {
      o.canScrollUp && m(u);
    });
  }
  T(t, d), U();
}
var Yc = /* @__PURE__ */ q("<!> <!>", 1);
function Xc(t, e) {
  K(e, !0);
  let n = S(e, "value", 15), i = S(e, "onValueChange", 3, ee), r = S(e, "name", 3, ""), s = S(e, "disabled", 3, !1), a = S(e, "open", 15, !1), o = S(e, "onOpenChange", 3, ee), l = S(e, "onOpenChangeComplete", 3, ee), d = S(e, "loop", 3, !1), c = S(e, "scrollAlignment", 3, "nearest"), u = S(e, "required", 3, !1), m = S(e, "items", 19, () => []), p = S(e, "allowDeselect", 3, !1);
  function f() {
    n() === void 0 && n(e.type === "single" ? "" : []);
  }
  f(), X.pre(() => n(), () => {
    f();
  });
  let g = /* @__PURE__ */ N("");
  const b = Pc.create({
    type: e.type,
    value: w.with(() => n(), (E) => {
      n(E), i()(E);
    }),
    disabled: w.with(() => s()),
    required: w.with(() => u()),
    open: w.with(() => a(), (E) => {
      a(E), o()(E);
    }),
    loop: w.with(() => d()),
    scrollAlignment: w.with(() => c()),
    name: w.with(() => r()),
    isCombobox: !1,
    items: w.with(() => m()),
    allowDeselect: w.with(() => p()),
    inputValue: w.with(() => h(g), (E) => C(g, E, !0)),
    onOpenChangeComplete: w.with(() => l())
  });
  var k = Yc(), y = Z(k);
  bc(y, {
    children: (E, x) => {
      var j = I(), R = Z(j);
      B(R, () => e.children ?? J), T(E, j);
    },
    $$slots: { default: !0 }
  });
  var v = re(y, 2);
  {
    var _ = (E) => {
      var x = I(), j = Z(x);
      {
        var R = (F) => {
          ki(F, {
            get autocomplete() {
              return e.autocomplete;
            }
          });
        }, L = (F) => {
          var D = I(), z = Z(D);
          ut(z, 16, () => b.opts.value.current, (O) => O, (O, M) => {
            ki(O, {
              get value() {
                return M;
              },
              get autocomplete() {
                return e.autocomplete;
              }
            });
          }), T(F, D);
        };
        $(j, (F) => {
          b.opts.value.current.length === 0 ? F(R) : F(L, !1);
        });
      }
      T(E, x);
    }, A = (E) => {
      ki(E, {
        get autocomplete() {
          return e.autocomplete;
        },
        get value() {
          return b.opts.value.current;
        },
        set value(x) {
          b.opts.value.current = x;
        }
      });
    };
    $(v, (E) => {
      Array.isArray(b.opts.value.current) ? E(_) : E(A, !1);
    });
  }
  T(t, k), U();
}
var Jc = /* @__PURE__ */ q("<button><!></button>");
function Qc(t, e) {
  const n = Fe();
  K(e, !0);
  let i = S(e, "id", 19, () => Re(n)), r = S(e, "ref", 15, null), s = S(e, "type", 3, "button"), a = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "id",
    "ref",
    "child",
    "children",
    "type"
  ]);
  const o = kr.create({
    id: w.with(() => i()),
    ref: w.with(() => r(), (u) => r(u))
  }), l = /* @__PURE__ */ P(() => me(a, o.props, { type: s() }));
  var d = I(), c = Z(d);
  Te(c, () => Tc, (u, m) => {
    m(u, {
      get id() {
        return i();
      },
      get ref() {
        return o.opts.ref;
      },
      children: (p, f) => {
        var g = I(), b = Z(g);
        {
          var k = (v) => {
            var _ = I(), A = Z(_);
            B(A, () => e.child, () => ({ props: h(l) })), T(v, _);
          }, y = (v) => {
            var _ = Jc();
            ue(_, () => ({ ...h(l) }));
            var A = Q(_);
            B(A, () => e.children ?? J), T(v, _);
          };
          $(b, (v) => {
            e.child ? v(k) : v(y, !1);
          });
        }
        T(p, g);
      },
      $$slots: { default: !0 }
    });
  }), T(t, d), U();
}
const nn = Na({
  component: "tabs",
  parts: ["root", "list", "trigger", "content"]
}), ni = new kt("Tabs.Root");
class Pr {
  static create(e) {
    return ni.set(new Pr(e));
  }
  opts;
  attachment;
  rovingFocusGroup;
  #e = /* @__PURE__ */ N(ce([]));
  get triggerIds() {
    return h(this.#e);
  }
  set triggerIds(e) {
    C(this.#e, e, !0);
  }
  valueToTriggerId = new Zi();
  valueToContentId = new Zi();
  constructor(e) {
    this.opts = e, this.attachment = _e(e.ref), this.rovingFocusGroup = new dl({
      candidateAttr: nn.trigger,
      rootNode: this.opts.ref,
      loop: this.opts.loop,
      orientation: this.opts.orientation
    });
  }
  registerTrigger(e, n) {
    return this.triggerIds.push(e), this.valueToTriggerId.set(n, e), () => {
      this.triggerIds = this.triggerIds.filter((i) => i !== e), this.valueToTriggerId.delete(n);
    };
  }
  registerContent(e, n) {
    return this.valueToContentId.set(n, e), () => {
      this.valueToContentId.delete(n);
    };
  }
  setValue(e) {
    this.opts.value.current = e;
  }
  #t = /* @__PURE__ */ P(() => ({
    id: this.opts.id.current,
    "data-orientation": this.opts.orientation.current,
    [nn.root]: "",
    ...this.attachment
  }));
  get props() {
    return h(this.#t);
  }
  set props(e) {
    C(this.#t, e);
  }
}
class Tr {
  static create(e) {
    return new Tr(e, ni.get());
  }
  opts;
  root;
  attachment;
  #e = /* @__PURE__ */ P(() => this.root.opts.disabled.current);
  constructor(e, n) {
    this.opts = e, this.root = n, this.attachment = _e(e.ref);
  }
  #t = /* @__PURE__ */ P(() => ({
    id: this.opts.id.current,
    role: "tablist",
    "aria-orientation": this.root.opts.orientation.current,
    "data-orientation": this.root.opts.orientation.current,
    [nn.list]: "",
    "data-disabled": Xn(h(this.#e)),
    ...this.attachment
  }));
  get props() {
    return h(this.#t);
  }
  set props(e) {
    C(this.#t, e);
  }
}
class Or {
  static create(e) {
    return new Or(e, ni.get());
  }
  opts;
  root;
  attachment;
  #e = /* @__PURE__ */ N(0);
  #t = /* @__PURE__ */ P(() => this.root.opts.value.current === this.opts.value.current);
  #n = /* @__PURE__ */ P(() => this.opts.disabled.current || this.root.opts.disabled.current);
  #i = /* @__PURE__ */ P(() => this.root.valueToContentId.get(this.opts.value.current));
  constructor(e, n) {
    this.opts = e, this.root = n, this.attachment = _e(e.ref), X([() => this.opts.id.current, () => this.opts.value.current], ([i, r]) => this.root.registerTrigger(i, r)), se(() => {
      this.root.triggerIds.length, h(this.#t) || !this.root.opts.value.current ? C(this.#e, 0) : C(this.#e, -1);
    }), this.onfocus = this.onfocus.bind(this), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
  }
  #r() {
    this.root.opts.value.current !== this.opts.value.current && this.root.setValue(this.opts.value.current);
  }
  onfocus(e) {
    this.root.opts.activationMode.current !== "automatic" || h(this.#n) || this.#r();
  }
  onclick(e) {
    h(this.#n) || this.#r();
  }
  onkeydown(e) {
    if (!h(this.#n)) {
      if (e.key === kn || e.key === Ii) {
        e.preventDefault(), this.#r();
        return;
      }
      this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
    }
  }
  #s = /* @__PURE__ */ P(() => ({
    id: this.opts.id.current,
    role: "tab",
    "data-state": c1(h(this.#t)),
    "data-value": this.opts.value.current,
    "data-orientation": this.root.opts.orientation.current,
    "data-disabled": Xn(h(this.#n)),
    "aria-selected": X2(h(this.#t)),
    "aria-controls": h(this.#i),
    [nn.trigger]: "",
    disabled: Ia(h(this.#n)),
    tabindex: h(this.#e),
    //
    onclick: this.onclick,
    onfocus: this.onfocus,
    onkeydown: this.onkeydown,
    ...this.attachment
  }));
  get props() {
    return h(this.#s);
  }
  set props(e) {
    C(this.#s, e);
  }
}
class Zr {
  static create(e) {
    return new Zr(e, ni.get());
  }
  opts;
  root;
  attachment;
  #e = /* @__PURE__ */ P(() => this.root.opts.value.current === this.opts.value.current);
  #t = /* @__PURE__ */ P(() => this.root.valueToTriggerId.get(this.opts.value.current));
  constructor(e, n) {
    this.opts = e, this.root = n, this.attachment = _e(e.ref), X([() => this.opts.id.current, () => this.opts.value.current], ([i, r]) => this.root.registerContent(i, r));
  }
  #n = /* @__PURE__ */ P(() => ({
    id: this.opts.id.current,
    role: "tabpanel",
    hidden: Q2(!h(this.#e)),
    tabindex: 0,
    "data-value": this.opts.value.current,
    "data-state": c1(h(this.#e)),
    "aria-labelledby": h(this.#t),
    "data-orientation": this.root.opts.orientation.current,
    [nn.content]: "",
    ...this.attachment
  }));
  get props() {
    return h(this.#n);
  }
  set props(e) {
    C(this.#n, e);
  }
}
function c1(t) {
  return t ? "active" : "inactive";
}
var $c = /* @__PURE__ */ q("<div><!></div>");
function e3(t, e) {
  const n = Fe();
  K(e, !0);
  let i = S(e, "id", 19, () => Re(n)), r = S(e, "ref", 15, null), s = S(e, "value", 15, ""), a = S(e, "onValueChange", 3, ee), o = S(e, "orientation", 3, "horizontal"), l = S(e, "loop", 3, !0), d = S(e, "activationMode", 3, "automatic"), c = S(e, "disabled", 3, !1), u = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "id",
    "ref",
    "value",
    "onValueChange",
    "orientation",
    "loop",
    "activationMode",
    "disabled",
    "children",
    "child"
  ]);
  const m = Pr.create({
    id: w.with(() => i()),
    value: w.with(() => s(), (y) => {
      s(y), a()(y);
    }),
    orientation: w.with(() => o()),
    loop: w.with(() => l()),
    activationMode: w.with(() => d()),
    disabled: w.with(() => c()),
    ref: w.with(() => r(), (y) => r(y))
  }), p = /* @__PURE__ */ P(() => me(u, m.props));
  var f = I(), g = Z(f);
  {
    var b = (y) => {
      var v = I(), _ = Z(v);
      B(_, () => e.child, () => ({ props: h(p) })), T(y, v);
    }, k = (y) => {
      var v = $c();
      ue(v, () => ({ ...h(p) }));
      var _ = Q(v);
      B(_, () => e.children ?? J), T(y, v);
    };
    $(g, (y) => {
      e.child ? y(b) : y(k, !1);
    });
  }
  T(t, f), U();
}
var t3 = /* @__PURE__ */ q("<div><!></div>");
function n3(t, e) {
  const n = Fe();
  K(e, !0);
  let i = S(e, "id", 19, () => Re(n)), r = S(e, "ref", 15, null), s = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "children",
    "child",
    "id",
    "ref",
    "value"
  ]);
  const a = Zr.create({
    value: w.with(() => e.value),
    id: w.with(() => i()),
    ref: w.with(() => r(), (m) => r(m))
  }), o = /* @__PURE__ */ P(() => me(s, a.props));
  var l = I(), d = Z(l);
  {
    var c = (m) => {
      var p = I(), f = Z(p);
      B(f, () => e.child, () => ({ props: h(o) })), T(m, p);
    }, u = (m) => {
      var p = t3();
      ue(p, () => ({ ...h(o) }));
      var f = Q(p);
      B(f, () => e.children ?? J), T(m, p);
    };
    $(d, (m) => {
      e.child ? m(c) : m(u, !1);
    });
  }
  T(t, l), U();
}
var i3 = /* @__PURE__ */ q("<div><!></div>");
function r3(t, e) {
  const n = Fe();
  K(e, !0);
  let i = S(e, "id", 19, () => Re(n)), r = S(e, "ref", 15, null), s = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "child",
    "children",
    "id",
    "ref"
  ]);
  const a = Tr.create({
    id: w.with(() => i()),
    ref: w.with(() => r(), (m) => r(m))
  }), o = /* @__PURE__ */ P(() => me(s, a.props));
  var l = I(), d = Z(l);
  {
    var c = (m) => {
      var p = I(), f = Z(p);
      B(f, () => e.child, () => ({ props: h(o) })), T(m, p);
    }, u = (m) => {
      var p = i3();
      ue(p, () => ({ ...h(o) }));
      var f = Q(p);
      B(f, () => e.children ?? J), T(m, p);
    };
    $(d, (m) => {
      e.child ? m(c) : m(u, !1);
    });
  }
  T(t, l), U();
}
var s3 = /* @__PURE__ */ q("<button><!></button>");
function a3(t, e) {
  const n = Fe();
  K(e, !0);
  let i = S(e, "disabled", 3, !1), r = S(e, "id", 19, () => Re(n)), s = S(e, "type", 3, "button"), a = S(e, "ref", 15, null), o = /* @__PURE__ */ fe(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "child",
    "children",
    "disabled",
    "id",
    "type",
    "value",
    "ref"
  ]);
  const l = Or.create({
    id: w.with(() => r()),
    disabled: w.with(() => i() ?? !1),
    value: w.with(() => e.value),
    ref: w.with(() => a(), (f) => a(f))
  }), d = /* @__PURE__ */ P(() => me(o, l.props, { type: s() }));
  var c = I(), u = Z(c);
  {
    var m = (f) => {
      var g = I(), b = Z(g);
      B(b, () => e.child, () => ({ props: h(d) })), T(f, g);
    }, p = (f) => {
      var g = s3();
      ue(g, () => ({ ...h(d) }));
      var b = Q(g);
      B(b, () => e.children ?? J), T(f, g);
    };
    $(u, (f) => {
      e.child ? f(m) : f(p, !1);
    });
  }
  T(t, c), U();
}
function o3(t) {
  const e = t - 1;
  return e * e * e + 1;
}
const l3 = (t) => {
  var e = d3();
  T(t, e);
}, wi = (t) => {
  var e = c3();
  T(t, e);
};
var d3 = /* @__PURE__ */ Yn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.038 48.038 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.75 9a.75.75 0 01.68.433l5.25 11.25a.75.75 0 01-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 01-1.36-.634l5.25-11.25A.75.75 0 0115.75 9zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726z" clip-rule="evenodd"></path></svg>'), c3 = /* @__PURE__ */ Yn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>'), u3 = /* @__PURE__ */ q("<!> <!>", 1), m3 = /* @__PURE__ */ q("<span> </span>"), f3 = /* @__PURE__ */ q("<span> </span>"), h3 = /* @__PURE__ */ q("<!> <hr/> <!>", 1), p3 = /* @__PURE__ */ q("<!> <!> <!>", 1), g3 = /* @__PURE__ */ q("<!> <!>", 1);
function v3(t, e) {
  K(e, !0);
  const n = Object.entries(e.supportedLocales).map(([f, g]) => ({ value: f, label: g })).sort((f, g) => [f.value, g.value].every((b) => b.includes("pt")) ? f.value === "pt-BR" ? -1 : 1 : f.label.localeCompare(g.label));
  let i = /* @__PURE__ */ N(null);
  function r(f) {
    const y = Math.min(f / 30, 1);
    return 200 - 175 * o3(y);
  }
  function s() {
    const f = [
      "en",
      "zh-CN",
      "es",
      "fr",
      "pt-BR",
      "pt",
      "de",
      "ja",
      "zh-TW"
    ], g = [];
    for (const { value: b } of n)
      navigator.languages.some((k) => b === k || b.startsWith(k.split("-")[0])) && g.push(b);
    return Array.from(/* @__PURE__ */ new Set([...g, ...f]));
  }
  const a = "-r", o = s().map((f) => ({ value: f, label: e.supportedLocales[f] })), l = (f) => {
    !f && h(i) && h(i).classList.add("invisible");
  }, d = async () => {
    h(i) && (await new Promise((f) => setTimeout(f, 10)), h(i).scrollTop = 0, h(i).classList.remove("invisible"));
  };
  var c = I(), u = Z(c), m = () => e.locale, p = (f) => e.onChangeLocale(f.replace(a, ""));
  Te(u, () => Xc, (f, g) => {
    g(f, {
      type: "single",
      get value() {
        return m();
      },
      set value(b) {
        p(b);
      },
      get items() {
        return n;
      },
      onOpenChange: l,
      onOpenChangeComplete: d,
      children: (b, k) => {
        var y = g3(), v = Z(y);
        Te(v, () => Qc, (A, E) => {
          E(A, {
            "aria-label": "Change language",
            title: "Change language",
            class: "locale",
            children: (x, j) => {
              var R = u3(), L = Z(R);
              l3(L);
              var F = re(L), D = re(F);
              wi(D), et(() => Be(F, ` ${e.supportedLocales[e.locale] ?? ""} `)), T(x, R);
            },
            $$slots: { default: !0 }
          });
        });
        var _ = re(v, 2);
        Te(_, () => Al, (A, E) => {
          E(A, {
            children: (x, j) => {
              var R = I(), L = Z(R);
              Te(L, () => Fc, (F, D) => {
                D(F, {
                  class: "idg-locale-list",
                  children: (z, O) => {
                    var M = p3(), W = Z(M);
                    Te(W, () => Gc, (ie, at) => {
                      at(ie, {
                        delay: r,
                        children: (ot, zr) => {
                          wi(ot);
                        },
                        $$slots: { default: !0 }
                      });
                    });
                    var G = re(W, 2);
                    Te(G, () => Hc, (ie, at) => {
                      at(ie, {
                        class: "invisible",
                        get ref() {
                          return h(i);
                        },
                        set ref(ot) {
                          C(i, ot, !0);
                        },
                        children: (ot, zr) => {
                          var Ir = h3(), Nr = Z(Ir);
                          ut(Nr, 17, () => o, ha, (Bt, _t) => {
                            let ii = () => h(_t).value, ri = () => h(_t).label;
                            var Ht = I(), si = Z(Ht);
                            {
                              let ai = /* @__PURE__ */ P(() => ii() + a);
                              Te(si, () => Ss, (oi, li) => {
                                li(oi, {
                                  get value() {
                                    return h(ai);
                                  },
                                  children: (jr, di) => {
                                    var fn = m3(), m1 = Q(fn);
                                    et(() => Be(m1, ri())), T(jr, fn);
                                  },
                                  $$slots: { default: !0 }
                                });
                              });
                            }
                            T(Bt, Ht);
                          });
                          var u1 = re(Nr, 4);
                          ut(u1, 17, () => n, ({ value: Bt, label: _t }) => Bt, (Bt, _t) => {
                            let ii = () => h(_t).value, ri = () => h(_t).label;
                            var Ht = I(), si = Z(Ht);
                            Te(si, () => Ss, (ai, oi) => {
                              oi(ai, {
                                get value() {
                                  return ii();
                                },
                                children: (li, jr) => {
                                  var di = f3(), fn = Q(di);
                                  et(() => Be(fn, ri())), T(li, di);
                                },
                                $$slots: { default: !0 }
                              });
                            }), T(Bt, Ht);
                          }), T(ot, Ir);
                        },
                        $$slots: { default: !0 }
                      });
                    });
                    var ne = re(G, 2);
                    Te(ne, () => Kc, (ie, at) => {
                      at(ie, {
                        delay: r,
                        children: (ot, zr) => {
                          wi(ot);
                        },
                        $$slots: { default: !0 }
                      });
                    }), T(z, M);
                  },
                  $$slots: { default: !0 }
                });
              }), T(x, R);
            },
            $$slots: { default: !0 }
          });
        }), T(b, y);
      },
      $$slots: { default: !0 }
    });
  }), T(t, c), U();
}
const b3 = typeof window < "u";
class y3 {
  #e;
  get dimensions() {
    return h(this.#e);
  }
  set dimensions(e) {
    C(this.#e, e);
  }
  #t;
  get skills() {
    return h(this.#t);
  }
  set skills(e) {
    C(this.#t, e);
  }
  #n;
  get selectedDimensionId() {
    return h(this.#n);
  }
  set selectedDimensionId(e) {
    C(this.#n, e, !0);
  }
  #i;
  get selectedDimension() {
    return h(this.#i);
  }
  set selectedDimension(e) {
    C(this.#i, e);
  }
  #r;
  #s;
  supportedLocales;
  #o;
  constructor(e) {
    const {
      defaultLocale: n = a2,
      locales: i,
      persistLocale: r = !0
    } = e;
    this.#s = i, this.#o = b3 && r, this.#r = /* @__PURE__ */ N(ce(this.#o ? localStorage["idg-locale"] ?? n : n)), this.supportedLocales = k3(i), this.#e = /* @__PURE__ */ P(() => i[h(this.#r)].dimensions), this.#t = /* @__PURE__ */ P(() => i[h(this.#r)].skills), this.#n = /* @__PURE__ */ N(ce(this.dimensions[0].id)), this.#i = /* @__PURE__ */ P(() => this.dimensions.find(({ id: s }) => s === this.selectedDimensionId) ?? this.dimensions[0]);
  }
  get locale() {
    return h(this.#r);
  }
  set locale(e) {
    const { dimensions: n } = this.#s[e], i = n.find(({ id: r }) => r === this.selectedDimensionId) ?? n[0];
    C(this.#r, e, !0), this.selectedDimensionId = i.id, this.#o && (localStorage["idg-locale"] = e);
  }
}
function k3(t) {
  const e = {};
  for (const n of Object.keys(t))
    e[n] = s2[n];
  return e;
}
const _i = (t, e) => {
  let n = () => e?.().id, i = () => e?.().name;
  var r = x3();
  ut(r, 5, () => i2[n()], ha, (s, a) => {
    var o = S3();
    et(() => Pn(o, "d", h(a))), T(s, o);
  }), et(() => Pn(r, "aria-label", i())), T(t, r);
};
function w3(t) {
  return r2[t];
}
function xs(t) {
  return `--color: var(--${w3(t)});`;
}
function _3(t, e) {
  return e.filter((n) => n.dimension === t);
}
var S3 = /* @__PURE__ */ Yn("<path></path>"), x3 = /* @__PURE__ */ Yn('<svg class="idg-symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198.43 198.43"></svg>'), C3 = /* @__PURE__ */ q("<!> <p> </p>", 1), A3 = /* @__PURE__ */ q("<!> <div><h2> </h2> <p> </p></div>", 1), E3 = /* @__PURE__ */ q('<div class="dimension"><!> <h2> </h2> <h3> </h3> <p> </p></div> <div class="skills"></div>', 1), P3 = /* @__PURE__ */ q("<!> <!>", 1), T3 = /* @__PURE__ */ q('<div class="idg-framework"><!>  <!></div>');
function O3(t, e) {
  K(e, !1);
  const n = /* @__PURE__ */ Vs(new y3({ locales: n2 }));
  Yo();
  var i = T3(), r = Q(i);
  v3(r, {
    get supportedLocales() {
      return h(n).supportedLocales;
    },
    get locale() {
      return h(n).locale;
    },
    onChangeLocale: (a) => Br(n, h(n).locale = a)
  });
  var s = re(r, 2);
  e3(s, {
    get value() {
      return h(n).selectedDimensionId;
    },
    set value(a) {
      Br(n, h(n).selectedDimensionId = a);
    },
    children: (a, o) => {
      var l = P3(), d = Z(l);
      r3(d, {
        children: (u, m) => {
          var p = I(), f = Z(p);
          ut(f, 1, () => h(n).dimensions, (g) => g.id, (g, b) => {
            {
              let k = /* @__PURE__ */ Ct(() => xs(h(b).id));
              a3(g, {
                get value() {
                  return h(b).id;
                },
                get title() {
                  return h(b).name;
                },
                get style() {
                  return h(k);
                },
                children: (y, v) => {
                  var _ = C3(), A = Z(_);
                  _i(A, () => h(b));
                  var E = re(A, 2), x = Q(E);
                  et(() => Be(x, h(b).name)), T(y, _);
                },
                $$slots: { default: !0 }
              });
            }
          }), T(u, p);
        },
        $$slots: { default: !0 }
      });
      var c = re(d, 2);
      ut(c, 1, () => h(n).dimensions, (u) => u.id, (u, m) => {
        const p = /* @__PURE__ */ Ct(() => _3(h(m).id, h(n).skills));
        {
          let f = /* @__PURE__ */ Ct(() => xs(h(m).id));
          n3(u, {
            get value() {
              return h(m).id;
            },
            get style() {
              return h(f);
            },
            children: (g, b) => {
              var k = E3(), y = Z(k), v = Q(y);
              _i(v, () => h(m));
              var _ = re(v, 2), A = Q(_), E = re(_, 2), x = Q(E), j = re(E, 2), R = Q(j), L = re(y, 2);
              ut(L, 5, () => h(p), (F) => F.id, (F, D) => {
                var z = A3(), O = Z(z);
                _i(O, () => h(D));
                var M = re(O, 2), W = Q(M), G = Q(W), ne = re(W, 2), ie = Q(ne);
                et(() => {
                  Be(G, h(D).name), Be(ie, h(D).description);
                }), T(F, z);
              }), et(() => {
                Be(A, h(m).name), Be(x, h(m).subtitle), Be(R, h(m).description);
              }), T(g, k);
            },
            $$slots: { default: !0 }
          });
        }
      }), T(a, l);
    },
    $$slots: { default: !0 },
    $$legacy: !0
  }), T(t, i), U();
}
function z3(t) {
  fa(O3, { target: t });
}
export {
  z3 as default
};
