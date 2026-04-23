import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CxUBeMkh.js";
import { b as MapPin, u as useForm, a, M as Mail, C as Check, S as Send } from "./zod-C9zROrQi.js";
import { G as GradientBlobs } from "./gradient-blobs-RJGyOQaR.js";
import { G as GlowButton } from "./glow-button-Bp-BVY-u.js";
import { f as frame, a as cancelFrame, b as supportsViewTimeline, d as supportsScrollTimeline, p as progress, v as velocityPerSecond, i as isHTMLElement, e as interpolate, g as defaultOffset$1, h as clamp, n as noop, r as resize, j as frameData, u as useConstant, k as useIsomorphicLayoutEffect, l as invariant, q as motionValue, t as hasReducedMotionListener, w as initPrefersReducedMotion, x as prefersReducedMotion, c as createLucideIcon, m as motion, S as SocialLinks, G as Github, o as object, s as string } from "./router-5KyY9Blm.js";
import { b as useTransform, u as useMotionValue, a as useSpring, E as ExternalLink } from "./external-link-C7pFRlEm.js";
import { A as ArrowRight, R as Rocket, C as CodeXml } from "./rocket-CzwYaXZy.js";
import { D as Download, F as FileText, E as Eye } from "./file-text-Bl9j9cv3.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function observeTimeline(update, timeline) {
  let prevProgress;
  const onFrame = () => {
    const { currentTime } = timeline;
    const percentage = currentTime === null ? 0 : currentTime.value;
    const progress2 = percentage / 100;
    if (prevProgress !== progress2) {
      update(progress2);
    }
    prevProgress = progress2;
  };
  frame.preUpdate(onFrame, true);
  return () => cancelFrame(onFrame);
}
function canUseNativeTimeline(target) {
  if (typeof window === "undefined")
    return false;
  return target ? supportsViewTimeline() : supportsScrollTimeline();
}
const maxElapsed = 50;
const createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
const createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
const keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time) {
  const axis = info[axisName];
  const { length, position } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = Math.abs(element[`scroll${position}`]);
  axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = progress(0, axis.scrollLength, axis.current);
  const elapsed = time - prevTime;
  axis.velocity = elapsed > maxElapsed ? 0 : velocityPerSecond(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
  updateAxisInfo(element, "x", info, time);
  updateAxisInfo(element, "y", info, time);
  info.time = time;
}
function calcInset(element, container) {
  const inset = { x: 0, y: 0 };
  let current = element;
  while (current && current !== container) {
    if (isHTMLElement(current)) {
      inset.x += current.offsetLeft;
      inset.y += current.offsetTop;
      current = current.offsetParent;
    } else if (current.tagName === "svg") {
      const svgBoundingBox = current.getBoundingClientRect();
      current = current.parentElement;
      const parentBoundingBox = current.getBoundingClientRect();
      inset.x += svgBoundingBox.left - parentBoundingBox.left;
      inset.y += svgBoundingBox.top - parentBoundingBox.top;
    } else if (current instanceof SVGGraphicsElement) {
      const { x, y } = current.getBBox();
      inset.x += x;
      inset.y += y;
      let svg = null;
      let parent = current.parentNode;
      while (!svg) {
        if (parent.tagName === "svg") {
          svg = parent;
        }
        parent = current.parentNode;
      }
      current = svg;
    } else {
      break;
    }
  }
  return inset;
}
const namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
function resolveEdge(edge, length, inset = 0) {
  let delta = 0;
  if (edge in namedEdges) {
    edge = namedEdges[edge];
  }
  if (typeof edge === "string") {
    const asNumber = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber;
    } else if (edge.endsWith("%")) {
      edge = asNumber / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber;
    }
  }
  if (typeof edge === "number") {
    delta = length * edge;
  }
  return inset + delta;
}
const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
  let targetPoint = 0;
  let containerPoint = 0;
  if (typeof offset === "number") {
    offsetDefinition = [offset, offset];
  } else if (typeof offset === "string") {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
  containerPoint = resolveEdge(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}
const ScrollOffset = {
  Enter: [
    [0, 1],
    [1, 1]
  ],
  Exit: [
    [0, 0],
    [1, 0]
  ],
  Any: [
    [1, 0],
    [0, 1]
  ],
  All: [
    [0, 0],
    [1, 1]
  ]
};
const point = { x: 0, y: 0 };
function getTargetSize(target) {
  return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : { width: target.clientWidth, height: target.clientHeight };
}
function resolveOffsets(container, info, options) {
  const { offset: offsetDefinition = ScrollOffset.All } = options;
  const { target = container, axis = "y" } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? calcInset(target, container) : point;
  const targetSize = target === container ? { width: container.scrollWidth, height: container.scrollHeight } : getTargetSize(target);
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  info[axis].offset.length = 0;
  let hasChanged = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i = 0; i < numOffsets; i++) {
    const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
      hasChanged = true;
    }
    info[axis].offset[i] = offset;
  }
  if (hasChanged) {
    info[axis].interpolate = interpolate(info[axis].offset, defaultOffset$1(offsetDefinition), { clamp: false });
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = clamp(0, 1, info[axis].interpolate(info[axis].current));
}
function measure(container, target = container, info) {
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node !== container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  return {
    measure: (time) => {
      measure(element, options.target, info);
      updateScrollInfo(element, info, time);
      if (options.offset || options.target) {
        resolveOffsets(element, info, options);
      }
    },
    notify: () => onScroll(info)
  };
}
const scrollListeners = /* @__PURE__ */ new WeakMap();
const resizeListeners = /* @__PURE__ */ new WeakMap();
const onScrollHandlers = /* @__PURE__ */ new WeakMap();
const scrollSize = /* @__PURE__ */ new WeakMap();
const dimensionCheckProcesses = /* @__PURE__ */ new WeakMap();
const getEventTarget = (element) => element === document.scrollingElement ? window : element;
function scrollInfo(onScroll, { container = document.scrollingElement, trackContentSize = false, ...options } = {}) {
  if (!container)
    return noop;
  let containerHandlers = onScrollHandlers.get(container);
  if (!containerHandlers) {
    containerHandlers = /* @__PURE__ */ new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  const info = createScrollInfo();
  const containerHandler = createOnScrollHandler(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  if (!scrollListeners.has(container)) {
    const measureAll = () => {
      for (const handler of containerHandlers) {
        handler.measure(frameData.timestamp);
      }
      frame.preUpdate(notifyAll);
    };
    const notifyAll = () => {
      for (const handler of containerHandlers) {
        handler.notify();
      }
    };
    const listener2 = () => frame.read(measureAll);
    scrollListeners.set(container, listener2);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener2);
    if (container !== document.documentElement) {
      resizeListeners.set(container, resize(container, listener2));
    }
    target.addEventListener("scroll", listener2);
    listener2();
  }
  if (trackContentSize && !dimensionCheckProcesses.has(container)) {
    const listener2 = scrollListeners.get(container);
    const size = {
      width: container.scrollWidth,
      height: container.scrollHeight
    };
    scrollSize.set(container, size);
    const checkScrollDimensions = () => {
      const newWidth = container.scrollWidth;
      const newHeight = container.scrollHeight;
      if (size.width !== newWidth || size.height !== newHeight) {
        listener2();
        size.width = newWidth;
        size.height = newHeight;
      }
    };
    const dimensionCheckProcess = frame.read(checkScrollDimensions, true);
    dimensionCheckProcesses.set(container, dimensionCheckProcess);
  }
  const listener = scrollListeners.get(container);
  frame.read(listener, false, true);
  return () => {
    cancelFrame(listener);
    const currentHandlers = onScrollHandlers.get(container);
    if (!currentHandlers)
      return;
    currentHandlers.delete(containerHandler);
    if (currentHandlers.size)
      return;
    const scrollListener = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (scrollListener) {
      getEventTarget(container).removeEventListener("scroll", scrollListener);
      resizeListeners.get(container)?.();
      window.removeEventListener("resize", scrollListener);
    }
    const dimensionCheckProcess = dimensionCheckProcesses.get(container);
    if (dimensionCheckProcess) {
      cancelFrame(dimensionCheckProcess);
      dimensionCheckProcesses.delete(container);
    }
    scrollSize.delete(container);
  };
}
const presets = [
  [ScrollOffset.Enter, "entry"],
  [ScrollOffset.Exit, "exit"],
  [ScrollOffset.Any, "cover"],
  [ScrollOffset.All, "contain"]
];
const stringToProgress = {
  start: 0,
  end: 1
};
function parseStringOffset(s) {
  const parts = s.trim().split(/\s+/);
  if (parts.length !== 2)
    return void 0;
  const a2 = stringToProgress[parts[0]];
  const b = stringToProgress[parts[1]];
  if (a2 === void 0 || b === void 0)
    return void 0;
  return [a2, b];
}
function normaliseOffset(offset) {
  if (offset.length !== 2)
    return void 0;
  const result = [];
  for (const item of offset) {
    if (Array.isArray(item)) {
      result.push(item);
    } else if (typeof item === "string") {
      const parsed = parseStringOffset(item);
      if (!parsed)
        return void 0;
      result.push(parsed);
    } else {
      return void 0;
    }
  }
  return result;
}
function matchesPreset(offset, preset) {
  const normalised = normaliseOffset(offset);
  if (!normalised)
    return false;
  for (let i = 0; i < 2; i++) {
    const o = normalised[i];
    const p = preset[i];
    if (o[0] !== p[0] || o[1] !== p[1])
      return false;
  }
  return true;
}
function offsetToViewTimelineRange(offset) {
  if (!offset) {
    return { rangeStart: "contain 0%", rangeEnd: "contain 100%" };
  }
  for (const [preset, name] of presets) {
    if (matchesPreset(offset, preset)) {
      return { rangeStart: `${name} 0%`, rangeEnd: `${name} 100%` };
    }
  }
  return void 0;
}
const timelineCache = /* @__PURE__ */ new Map();
function scrollTimelineFallback(options) {
  const currentTime = { value: 0 };
  const cancel = scrollInfo((info) => {
    currentTime.value = info[options.axis].progress * 100;
  }, options);
  return { currentTime, cancel };
}
function getTimeline({ source, container, ...options }) {
  const { axis } = options;
  if (source)
    container = source;
  let containerCache = timelineCache.get(container);
  if (!containerCache) {
    containerCache = /* @__PURE__ */ new Map();
    timelineCache.set(container, containerCache);
  }
  const targetKey = options.target ?? "self";
  let targetCache = containerCache.get(targetKey);
  if (!targetCache) {
    targetCache = {};
    containerCache.set(targetKey, targetCache);
  }
  const axisKey = axis + (options.offset ?? []).join(",");
  if (!targetCache[axisKey]) {
    if (options.target && canUseNativeTimeline(options.target)) {
      const range = offsetToViewTimelineRange(options.offset);
      if (range) {
        targetCache[axisKey] = new ViewTimeline({
          subject: options.target,
          axis
        });
      } else {
        targetCache[axisKey] = scrollTimelineFallback({
          container,
          ...options
        });
      }
    } else if (canUseNativeTimeline()) {
      targetCache[axisKey] = new ScrollTimeline({
        source: container,
        axis
      });
    } else {
      targetCache[axisKey] = scrollTimelineFallback({
        container,
        ...options
      });
    }
  }
  return targetCache[axisKey];
}
function attachToAnimation(animation, options) {
  const timeline = getTimeline(options);
  const range = options.target ? offsetToViewTimelineRange(options.offset) : void 0;
  const useNative = options.target ? canUseNativeTimeline(options.target) && !!range : canUseNativeTimeline();
  return animation.attachTimeline({
    timeline: useNative ? timeline : void 0,
    ...range && useNative && {
      rangeStart: range.rangeStart,
      rangeEnd: range.rangeEnd
    },
    observe: (valueAnimation) => {
      valueAnimation.pause();
      return observeTimeline((progress2) => {
        valueAnimation.time = valueAnimation.iterationDuration * progress2;
      }, timeline);
    }
  });
}
function isOnScrollWithInfo(onScroll) {
  return onScroll.length === 2;
}
function attachToFunction(onScroll, options) {
  if (isOnScrollWithInfo(onScroll)) {
    return scrollInfo((info) => {
      onScroll(info[options.axis].progress, info);
    }, options);
  } else {
    return observeTimeline(onScroll, getTimeline(options));
  }
}
function scroll(onScroll, { axis = "y", container = document.scrollingElement, ...options } = {}) {
  if (!container)
    return noop;
  const optionsWithDefaults = { axis, container, ...options };
  return typeof onScroll === "function" ? attachToFunction(onScroll, optionsWithDefaults) : attachToAnimation(onScroll, optionsWithDefaults);
}
const createScrollMotionValues = () => ({
  scrollX: motionValue(0),
  scrollY: motionValue(0),
  scrollXProgress: motionValue(0),
  scrollYProgress: motionValue(0)
});
const isRefPending = (ref) => {
  if (!ref)
    return false;
  return !ref.current;
};
function makeAccelerateConfig(axis, options, container, target) {
  return {
    factory: (animation) => scroll(animation, {
      ...options,
      axis,
      container: container?.current || void 0,
      target: target?.current || void 0
    }),
    times: [0, 1],
    keyframes: [0, 1],
    ease: (v) => v,
    duration: 1
  };
}
function canAccelerateScroll(target, offset) {
  if (typeof window === "undefined")
    return false;
  return target ? supportsViewTimeline() && !!offsetToViewTimelineRange(offset) : supportsScrollTimeline();
}
function useScroll({ container, target, ...options } = {}) {
  const values = useConstant(createScrollMotionValues);
  if (canAccelerateScroll(target, options.offset)) {
    values.scrollXProgress.accelerate = makeAccelerateConfig("x", options, container, target);
    values.scrollYProgress.accelerate = makeAccelerateConfig("y", options, container, target);
  }
  const scrollAnimation = reactExports.useRef(null);
  const needsStart = reactExports.useRef(false);
  const start = reactExports.useCallback(() => {
    scrollAnimation.current = scroll((_progress, { x, y }) => {
      values.scrollX.set(x.current);
      values.scrollXProgress.set(x.progress);
      values.scrollY.set(y.current);
      values.scrollYProgress.set(y.progress);
    }, {
      ...options,
      container: container?.current || void 0,
      target: target?.current || void 0
    });
    return () => {
      scrollAnimation.current?.();
    };
  }, [container, target, JSON.stringify(options.offset)]);
  useIsomorphicLayoutEffect(() => {
    needsStart.current = false;
    if (isRefPending(container) || isRefPending(target)) {
      needsStart.current = true;
      return;
    } else {
      return start();
    }
  }, [start]);
  reactExports.useEffect(() => {
    if (needsStart.current) {
      invariant(!isRefPending(container));
      invariant(!isRefPending(target));
      return start();
    } else {
      return;
    }
  }, [start]);
  return values;
}
function useReducedMotion() {
  !hasReducedMotionListener.current && initPrefersReducedMotion();
  const [shouldReduceMotion] = reactExports.useState(prefersReducedMotion.current);
  return shouldReduceMotion;
}
const __iconNode$6 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M13 5h8", key: "a7qcls" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }],
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }]
];
const ListChecks = createLucideIcon("list-checks", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function ParticlesBackground() {
  const isMobile = useIsMobile();
  const [Comp, setComp] = reactExports.useState(null);
  const [ready, setReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const [{ default: Particles, initParticlesEngine }, { loadSlim }] = await Promise.all([
        import("./index-_JEdwnlm.js"),
        import("./index-Chq87NXA.js")
      ]);
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      if (cancelled) return;
      setComp(() => Particles);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  if (!ready || !Comp) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      id: "tsparticles",
      className: "absolute inset-0 -z-10",
      options: {
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: !isMobile, mode: "grab" },
            onClick: { enable: true, mode: "push" }
          },
          modes: {
            grab: { distance: 160, links: { opacity: 0.5 } },
            push: { quantity: 3 }
          }
        },
        particles: {
          color: { value: ["#c084fc", "#67e8f9", "#a78bfa"] },
          links: {
            color: "#a78bfa",
            distance: 140,
            enable: true,
            opacity: 0.25,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            outModes: { default: "out" }
          },
          number: {
            value: isMobile ? 35 : 80,
            density: { enable: true }
          },
          opacity: { value: 0.6 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true
      }
    }
  );
}
const Scene = reactExports.lazy(() => import("./hero-3d-scene-DySvbupB.js"));
function Hero3D() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scene, {}) }) });
}
function ScrollSection({
  id,
  children,
  variant = "rise",
  className = ""
}) {
  const ref = reactExports.useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [1, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 0, 0, -48]);
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [1, 1, 1, 0.98]);
  const x = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 0, 0, 40]);
  const styleByVariant = {
    rise: reduce ? {} : { opacity, y },
    zoom: reduce ? {} : { opacity, scale },
    tilt: reduce ? {} : { opacity, y, scale },
    blur: reduce ? {} : { opacity, scale },
    slide: reduce ? {} : { opacity, x }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      id,
      className: `relative min-h-screen flex items-center py-24 ${className}`,
      style: { perspective: 1400 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          style: {
            opacity: 1,
            ...styleByVariant[variant],
            transformStyle: "preserve-3d",
            willChange: "transform, opacity"
          },
          className: "w-full",
          children
        }
      )
    }
  );
}
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      style: { scaleX, transformOrigin: "0% 50%" },
      className: "fixed top-0 inset-x-0 z-[60] h-[3px] bg-neon shadow-glow pointer-events-none"
    }
  );
}
function HomePage() {
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth"
        });
      }, 250);
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GradientBlobs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ParticlesBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SkillsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EducationSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResumeSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ContactSection, {})
  ] });
}
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30
  },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};
function HeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "home", className: "relative min-h-screen flex flex-col justify-center pt-28 pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero3D, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl px-6 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { variants: fadeUp, initial: "hidden", animate: "show", custom: 0, className: "inline-flex items-center gap-2 self-start rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14, className: "text-accent" }),
        " Available for new projects · 2026"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { variants: fadeUp, initial: "hidden", animate: "show", custom: 1, className: "mt-6 text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight", children: [
        "Hi, I'm ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "Sharvesh" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Computer Science Engineer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUp, initial: "hidden", animate: "show", custom: 2, className: "mt-6 max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl sm:text-2xl font-semibold tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "Aspiring Software Developer" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Computer Science Engineer" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed", children: [
          "Driven to create",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "efficient" }),
          " and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "scalable" }),
          " web applications using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "HTML5" }),
          ",",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "CSS3" }),
          ",",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "JavaScript" }),
          ",",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "Java" }),
          ",",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "SQL" }),
          ", and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "Spring Boot" }),
          ", with a strong focus on",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "clean architecture" }),
          " and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "performance" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUp, initial: "hidden", animate: "show", custom: 3, className: "mt-10 flex flex-wrap items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", onClick: (e) => {
          e.preventDefault();
          document.getElementById("contact")?.scrollIntoView({
            behavior: "smooth"
          });
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { children: [
          "Hire me ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#resume", onClick: (e) => {
          e.preventDefault();
          document.getElementById("resume")?.scrollIntoView({
            behavior: "smooth"
          });
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { variant: "ghost", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 18 }),
          " Resume"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: fadeUp, initial: "hidden", animate: "show", custom: 4, className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialLinks, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, transition: {
      delay: 1.6
    }, className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground flex flex-col items-center gap-2", children: [
      "Scroll",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-10 w-px bg-gradient-to-b from-accent to-transparent" })
    ] })
  ] });
}
const stats = [{
  Icon: GraduationCap,
  value: "CS Engineering",
  label: "Education"
}, {
  Icon: Rocket,
  value: "2+ Built",
  label: "Projects"
}, {
  Icon: Layers,
  value: "Full Stack",
  label: "Focus"
}, {
  Icon: Briefcase,
  value: "Fresher",
  label: "Experience"
}];
function AboutSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollSection, { id: "about", variant: "tilt", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-accent", children: "About me" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 text-4xl sm:text-6xl font-bold tracking-tight", children: [
      "Driven by ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "curiosity" }),
      " and",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "powered by ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "code" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 text-lg text-muted-foreground leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "I’m a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Computer Science Engineering" }),
          " student passionate about building real-world web applications using modern technologies. My journey started with curiosity about how systems work and has grown into a strong interest in full-stack development."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Currently, I’m focused on developing projects using ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "HTML5" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "CSS3" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "JavaScript" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Java" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "SQL" }),
          ", and ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Spring Boot" }),
          ". I enjoy creating responsive user interfaces and scalable backend systems while continuously improving my skills and staying updated with industry trends."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", onClick: (e) => {
          e.preventDefault();
          document.getElementById("contact")?.scrollIntoView({
            behavior: "smooth"
          });
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { children: [
          "Let's collaborate ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { whileHover: {
        y: -6,
        scale: 1.03
      }, className: "glass rounded-2xl p-5 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.Icon, { className: "text-accent mb-3", size: 22 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-gradient", children: s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: s.label })
      ] }, s.label)) })
    ] })
  ] }) });
}
const skillCategories = [{
  title: "Programming Languages",
  items: ["Java", "JavaScript"]
}, {
  title: "Web & Mobile Development",
  items: ["HTML5", "CSS3", "Spring Boot"]
}, {
  title: "Databases & Query Languages",
  items: ["MySQL", "SQL"]
}, {
  title: "Development Tools & Platforms",
  items: ["Git", "GitHub", "Visual Studio Code", "Jupyter Notebook"]
}, {
  title: "Concepts & Methodologies",
  items: ["Object-Oriented Programming (OOP)", "RESTful APIs", "Software Development Life Cycle (SDLC)"]
}, {
  title: "Microsoft Office Suite",
  items: ["MS Office", "Word", "Excel", "PowerPoint", "Outlook", "Teams"]
}];
function SkillCategoryCard({
  title,
  items,
  i
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 18
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    amount: 0.25
  }, transition: {
    delay: i * 0.06,
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1]
  }, className: "glass rounded-2xl p-6 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base sm:text-lg font-semibold tracking-tight", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-accent", children: [
        items.length,
        " items"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs sm:text-sm px-3 py-1 rounded-full bg-primary/10 text-foreground/90 border border-primary/20", children: item }, item)) })
  ] });
}
function SkillsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollSection, { id: "skills", variant: "zoom", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-accent", children: "My toolkit" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 text-4xl sm:text-6xl font-bold tracking-tight", children: [
      "Skills & ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "tools" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-2xl", children: "A structured overview of the technologies, tools, and concepts I use to build real-world applications." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid sm:grid-cols-2 gap-4", children: skillCategories.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillCategoryCard, { title: c.title, items: c.items, i }, c.title)) })
  ] }) });
}
const projects = [{
  title: "Web-Based Marketplace for Farmers to Connect with Consumers",
  bullets: ["Built a secure platform enabling farmers to sell products directly to consumers with Face ID authentication and AES encryption, eliminating middlemen and ensuring fair trade.", "Designed an intuitive user interface and streamlined ordering process to enhance usability for both farmers and consumers."],
  tags: ["HTML", "CSS", "JavaScript", "Spring Boot", "MySQL", "OpenCV (Haar Cascade)", "AES", "Face ID"],
  gradient: "linear-gradient(135deg, #c084fc, #67e8f9)",
  liveUrl: void 0,
  codeUrl: "https://github.com/Sharvesh11"
}, {
  title: "Secure Todos Application",
  bullets: ["Designed and deployed RESTful APIs with secure token-based authentication, enabling protected CRUD operations for todos.", "Integrated frontend (HTML, CSS, JavaScript) with backend services, ensuring seamless communication and secure data handling."],
  tags: ["Spring Boot", "MySQL", "JWT", "HTML", "CSS", "JavaScript", "REST APIs"],
  gradient: "linear-gradient(135deg, #34d399, #67e8f9)",
  liveUrl: void 0,
  codeUrl: "https://github.com/Sharvesh11"
}];
function ProjectCard({
  project,
  i
}) {
  const ref = reactExports.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, {
    stiffness: 250,
    damping: 20
  });
  const sy = useSpring(y, {
    stiffness: 250,
    damping: 20
  });
  const rx = useTransform(sy, [-50, 50], [10, -10]);
  const ry = useTransform(sx, [-50, 50], [-10, 10]);
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ref, onMouseMove: onMove, onMouseLeave: onLeave, style: {
    rotateX: rx,
    rotateY: ry,
    transformStyle: "preserve-3d"
  }, initial: {
    opacity: 0,
    y: 40
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-80px"
  }, transition: {
    delay: i * 0.08,
    duration: 0.6
  }, className: "group relative glass rounded-3xl overflow-hidden shadow-card cursor-pointer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/3] w-full relative overflow-hidden", style: {
      background: project.gradient
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute inset-0 flex items-center justify-center text-7xl font-bold text-white/10", style: {
        translateZ: 30
      }, children: project.title.charAt(0) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 relative", style: {
      transform: "translateZ(30px)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: project.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5", children: project.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: b }, b)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: project.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30", children: t }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity", children: [
        project.liveUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "text-accent flex items-center gap-1 text-sm", href: project.liveUrl, target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 }),
          " Live"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1 text-sm cursor-not-allowed select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 }),
          " Live (soon)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "text-accent flex items-center gap-1 text-sm", href: project.codeUrl, target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { size: 14 }),
          " Code"
        ] })
      ] })
    ] })
  ] });
}
function ProjectsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollSection, { id: "projects", variant: "rise", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-accent", children: "Selected work" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 text-4xl sm:text-6xl font-bold tracking-tight", children: [
      "Projects in ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "motion" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6", style: {
      perspective: 1200
    }, children: projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { project: p, i }, p.title)) })
  ] }) });
}
function EducationSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollSection, { id: "education", variant: "slide", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-accent", children: "Education" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 text-4xl sm:text-6xl font-bold tracking-tight", children: [
      "Bachelor of Engineering (B.E.) - ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "Computer Science" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 sm:p-8 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-11 rounded-2xl bg-primary/15 ring-1 ring-primary/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "text-accent", size: 22 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg sm:text-xl font-semibold", children: "Vel Tech MultiTech Engineering College" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Chennai" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid sm:grid-cols-3 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 16, className: "text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Dec 2021 - May 2025" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Chennai" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 16, className: "text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "CGPA: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "7.87 / 10" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-muted-foreground leading-relaxed", children: [
        "Built a strong foundation in ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "Java" }),
        ",",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "SQL" }),
        ", and",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90 font-medium", children: "Spring Boot" }),
        " through academic coursework and self-learning."
      ] })
    ] }) })
  ] }) });
}
function ExperienceSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollSection, { id: "experience", variant: "rise", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-accent", children: "Experience & Roles" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 text-4xl sm:text-6xl font-bold tracking-tight", children: [
      "Full Stack Trainee - ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "Revature" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 glass rounded-3xl p-6 sm:p-8 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-11 rounded-2xl bg-primary/15 ring-1 ring-primary/25 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "text-accent", size: 22 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg sm:text-xl font-semibold", children: "Revature" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Completed an intensive training program focused on Java full-stack development." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { size: 18, className: "text-accent mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Solved coding labs to strengthen problem-solving skills" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { size: 18, className: "text-accent mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Worked on Java, SQL, and backend concepts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 18, className: "text-accent mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cleared 4 internal technical evaluation rounds during the program" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 18, className: "text-accent mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Successfully completed the training and received certification" })
        ] })
      ] })
    ] })
  ] }) });
}
function ResumeSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollSection, { id: "resume", variant: "tilt", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-4xl px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-accent", children: "Curriculum" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 text-4xl sm:text-6xl font-bold tracking-tight", children: [
      "Grab my ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "resume" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { whileHover: {
      rotateX: 6,
      rotateY: -6,
      scale: 1.02
    }, style: {
      transformStyle: "preserve-3d",
      perspective: 1e3
    }, className: "mt-14 mx-auto max-w-md aspect-[3/4] glass rounded-3xl p-8 shadow-card relative overflow-hidden group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 bg-neon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-shimmer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full flex flex-col items-center justify-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
          y: [0, -8, 0]
        }, transition: {
          duration: 3,
          repeat: Infinity
        }, className: "size-24 rounded-2xl bg-neon shadow-glow flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 42, className: "text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-xl", children: "Sharvesh_Resume_jan_2026.pdf" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "~ 507 KB · 1 page" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/Sharvesh_Resume_jan_2026.pdf", download: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 18 }),
        " Download PDF"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/Sharvesh_Resume_jan_2026.pdf", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlowButton, { variant: "ghost", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 }),
        " Preview"
      ] }) })
    ] })
  ] }) });
}
const schema = object({
  name: string().trim().min(2, "Name is too short").max(80),
  email: string().trim().email("Invalid email").max(160),
  message: string().trim().min(10, "Tell me a bit more").max(1e3)
});
function ContactSection() {
  const [sent, setSent] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
    reset
  } = useForm({
    resolver: a(schema)
  });
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("Contact submission:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollSection, { id: "contact", variant: "blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl px-6 grid lg:grid-cols-[1fr_1.2fr] gap-10 w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-accent", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 text-4xl sm:text-5xl font-bold tracking-tight", children: [
        "Let's make something ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-neon", children: "stellar" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Drop a line — I usually reply within 24 hours." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 18, className: "text-accent" }),
          " sharvesh4646@gmail.com"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "text-accent" }),
          " Chennai"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "glass rounded-3xl p-6 sm:p-8 space-y-5 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your name", error: errors.name?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...register("name"), className: "w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all", placeholder: "Ada Lovelace" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", error: errors.email?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", ...register("email"), className: "w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all", placeholder: "you@domain.com" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Message", error: errors.message?.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 5, ...register("message"), className: "w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent focus:shadow-glow-cyan transition-all resize-none", placeholder: "Tell me about your project…" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlowButton, { type: "submit", disabled: isSubmitting || sent, className: "w-full", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
        scale: 0
      }, animate: {
        scale: 1
      }, className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18 }),
        " Message sent!"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 18 }),
        " ",
        isSubmitting ? "Sending…" : "Send message"
      ] }) })
    ] })
  ] }) });
}
function Field({
  label,
  error,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
      opacity: 0,
      y: -4
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-xs text-destructive mt-1 block", children: error })
  ] });
}
export {
  HomePage as component
};
