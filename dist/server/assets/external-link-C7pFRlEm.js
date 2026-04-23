import { r as reactExports } from "./worker-entry-CxUBeMkh.js";
import { e as interpolate, f as frame, y as isMotionValue, J as JSAnimation, u as useConstant, q as motionValue, M as MotionConfigContext, k as useIsomorphicLayoutEffect, a as cancelFrame, z as collectMotionValues, c as createLucideIcon } from "./router-5KyY9Blm.js";
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, options);
  return useImmediate ? interpolator(inputValue) : interpolator;
}
function attachFollow(value, source, options = {}) {
  const initialValue = value.get();
  let activeAnimation = null;
  let latestValue = initialValue;
  let latestSetter;
  const unit = typeof initialValue === "string" ? initialValue.replace(/[\d.-]/g, "") : void 0;
  const stopAnimation = () => {
    if (activeAnimation) {
      activeAnimation.stop();
      activeAnimation = null;
    }
    value.animation = void 0;
  };
  const startAnimation = () => {
    const currentValue = asNumber(value.get());
    const targetValue = asNumber(latestValue);
    if (currentValue === targetValue) {
      stopAnimation();
      return;
    }
    const velocity = activeAnimation ? activeAnimation.getGeneratorVelocity() : value.getVelocity();
    stopAnimation();
    activeAnimation = new JSAnimation({
      keyframes: [currentValue, targetValue],
      velocity,
      // Default to spring if no type specified (matches useSpring behavior)
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...options,
      onUpdate: latestSetter
    });
  };
  const scheduleAnimation = () => {
    startAnimation();
    value.animation = activeAnimation ?? void 0;
    value["events"].animationStart?.notify();
    activeAnimation?.then(() => {
      value.animation = void 0;
      value["events"].animationComplete?.notify();
    });
  };
  value.attach((v, set) => {
    latestValue = v;
    latestSetter = (latest) => set(parseValue(latest, unit));
    frame.postRender(scheduleAnimation);
  }, stopAnimation);
  if (isMotionValue(source)) {
    let skipNextAnimation = options.skipInitialAnimation === true;
    const removeSourceOnChange = source.on("change", (v) => {
      if (skipNextAnimation) {
        skipNextAnimation = false;
        value.jump(parseValue(v, unit), false);
      } else {
        value.set(parseValue(v, unit));
      }
    });
    const removeValueOnDestroy = value.on("destroy", removeSourceOnChange);
    return () => {
      removeSourceOnChange();
      removeValueOnDestroy();
    };
  }
  return stopAnimation;
}
function parseValue(v, unit) {
  return unit ? v + unit : v;
}
function asNumber(v) {
  return typeof v === "number" ? v : parseFloat(v);
}
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame(updateValue);
    };
  });
  return value;
}
function useComputed(compute) {
  collectMotionValues.current = [];
  compute();
  const value = useCombineMotionValues(collectMotionValues.current, compute);
  collectMotionValues.current = void 0;
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRangeOrMap, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  const isOutputMap = outputRangeOrMap !== void 0 && !Array.isArray(outputRangeOrMap) && typeof inputRangeOrTransformer !== "function";
  if (isOutputMap) {
    return useMapTransform(input, inputRangeOrTransformer, outputRangeOrMap, options);
  }
  const outputRange = outputRangeOrMap;
  const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  const result = Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
  const inputAccelerate = !Array.isArray(input) ? input.accelerate : void 0;
  if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRangeOrMap) && options?.clamp !== false) {
    result.accelerate = {
      ...inputAccelerate,
      times: inputRangeOrTransformer,
      keyframes: outputRangeOrMap,
      isTransformed: true,
      ...{}
    };
  }
  return result;
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}
function useMapTransform(inputValue, inputRange, outputMap, options) {
  const keys = useConstant(() => Object.keys(outputMap));
  const output = useConstant(() => ({}));
  for (const key of keys) {
    output[key] = useTransform(inputValue, inputRange, outputMap[key], options);
  }
  return output;
}
function useFollowValue(source, options = {}) {
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  const getFromSource = () => isMotionValue(source) ? source.get() : source;
  if (isStatic) {
    return useTransform(getFromSource);
  }
  const value = useMotionValue(getFromSource());
  reactExports.useInsertionEffect(() => {
    return attachFollow(value, source, options);
  }, [value, JSON.stringify(options)]);
  return value;
}
function useSpring(source, options = {}) {
  return useFollowValue(source, { type: "spring", ...options });
}
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
export {
  ExternalLink as E,
  useSpring as a,
  useTransform as b,
  useMotionValue as u
};
