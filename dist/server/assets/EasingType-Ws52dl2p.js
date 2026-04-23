const generatedAttribute = "generated", mouseDownEvent = "pointerdown", mouseUpEvent = "pointerup", mouseLeaveEvent = "pointerleave", mouseOutEvent = "pointerout", mouseMoveEvent = "pointermove", touchStartEvent = "touchstart", touchEndEvent = "touchend", touchMoveEvent = "touchmove", touchCancelEvent = "touchcancel", resizeEvent = "resize", visibilityChangeEvent = "visibilitychange", errorPrefix = "tsParticles - Error", percentDenominator = 100, half = 0.5, millisecondsToSeconds = 1e3, originPoint = {
  x: 0,
  y: 0,
  z: 0
}, defaultTransform = {
  a: 1,
  b: 0,
  c: 0,
  d: 1
}, randomColorValue = "random", midColorValue = "mid", double = 2, doublePI = Math.PI * double, defaultFps = 60, generatedTrue = "true", generatedFalse = "false", canvasTag = "canvas", defaultRetryCount = 0, squareExp = 2, qTreeCapacity = 4, defaultRemoveQuantity = 1, defaultRatio = 1, defaultReduceFactor = 1, subdivideCount = 4, inverseFactorNumerator = 1, rgbMax = 255, hMax = 360, sMax = 100, lMax = 100, hMin = 0, sMin = 0, hPhase = 60, empty = 0, quarter = 0.25, threeQuarter = half + quarter, minVelocity = 0, defaultTransformValue = 1, minimumSize = 0, minimumLength = 0, zIndexFactorOffset = 1, defaultOpacity = 1, clickRadius = 1, touchEndLengthOffset = 1, minCoordinate = 0, removeDeleteCount = 1, removeMinIndex = 0, defaultFpsLimit = 120, minFpsLimit = 0, canvasFirstIndex = 0, loadRandomFactor = 1e4, loadMinIndex = 0, one = 1, none = 0, decayOffset = 1, tryCountIncrement = 1, minRetries = 0, rollFactor = 1, minZ = 0, defaultRadius = 0, posOffset = -quarter, sizeFactor = 1.5, minLimit = 0, countOffset = 1, minCount = 0, minIndex = 0, lengthOffset = 1, defaultDensityFactor = 1, deleteCount = 1, touchDelay = 500, manualDefaultPosition = 50, defaultAngle = 0, identity = 1, minStrokeWidth = 0, lFactor = 1, lMin = 0, rgbFactor = 255, triple = 3, sextuple = 6, sNormalizedOffset = 1, phaseNumerator = 1, defaultRgbMin = 0, defaultVelocity = 0, defaultLoops = 0, defaultTime = 0;
var MoveDirection;
(function(MoveDirection2) {
  MoveDirection2["bottom"] = "bottom";
  MoveDirection2["bottomLeft"] = "bottom-left";
  MoveDirection2["bottomRight"] = "bottom-right";
  MoveDirection2["left"] = "left";
  MoveDirection2["none"] = "none";
  MoveDirection2["right"] = "right";
  MoveDirection2["top"] = "top";
  MoveDirection2["topLeft"] = "top-left";
  MoveDirection2["topRight"] = "top-right";
  MoveDirection2["outside"] = "outside";
  MoveDirection2["inside"] = "inside";
})(MoveDirection || (MoveDirection = {}));
function isBoolean(arg) {
  return typeof arg === "boolean";
}
function isString(arg) {
  return typeof arg === "string";
}
function isNumber(arg) {
  return typeof arg === "number";
}
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
function isArray(arg) {
  return Array.isArray(arg);
}
function isNull(arg) {
  return arg === null || arg === void 0;
}
class Vector3d {
  constructor(xOrCoords, y, z) {
    this._updateFromAngle = (angle, length) => {
      this.x = Math.cos(angle) * length;
      this.y = Math.sin(angle) * length;
    };
    if (!isNumber(xOrCoords) && xOrCoords) {
      this.x = xOrCoords.x;
      this.y = xOrCoords.y;
      const coords3d = xOrCoords;
      this.z = coords3d.z ? coords3d.z : originPoint.z;
    } else if (xOrCoords !== void 0 && y !== void 0) {
      this.x = xOrCoords;
      this.y = y;
      this.z = z ?? originPoint.z;
    } else {
      throw new Error(`${errorPrefix} Vector3d not initialized correctly`);
    }
  }
  static get origin() {
    return Vector3d.create(originPoint.x, originPoint.y, originPoint.z);
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  set angle(angle) {
    this._updateFromAngle(angle, this.length);
  }
  get length() {
    return Math.sqrt(this.getLengthSq());
  }
  set length(length) {
    this._updateFromAngle(this.angle, length);
  }
  static clone(source) {
    return Vector3d.create(source.x, source.y, source.z);
  }
  static create(x, y, z) {
    return new Vector3d(x, y, z);
  }
  add(v) {
    return Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  addTo(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  }
  copy() {
    return Vector3d.clone(this);
  }
  distanceTo(v) {
    return this.sub(v).length;
  }
  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }
  div(n) {
    return Vector3d.create(this.x / n, this.y / n, this.z / n);
  }
  divTo(n) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
  }
  getLengthSq() {
    return this.x ** squareExp + this.y ** squareExp;
  }
  mult(n) {
    return Vector3d.create(this.x * n, this.y * n, this.z * n);
  }
  multTo(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
  }
  normalize() {
    const length = this.length;
    if (length != none) {
      this.multTo(inverseFactorNumerator / length);
    }
  }
  rotate(angle) {
    return Vector3d.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle), originPoint.z);
  }
  setTo(c) {
    this.x = c.x;
    this.y = c.y;
    const v3d = c;
    this.z = v3d.z ? v3d.z : originPoint.z;
  }
  sub(v) {
    return Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
  }
}
class Vector extends Vector3d {
  constructor(xOrCoords, y) {
    super(xOrCoords, y, originPoint.z);
  }
  static get origin() {
    return Vector.create(originPoint.x, originPoint.y);
  }
  static clone(source) {
    return Vector.create(source.x, source.y);
  }
  static create(x, y) {
    return new Vector(x, y);
  }
}
let _random = Math.random;
const _animationLoop = {
  nextFrame: (cb) => requestAnimationFrame(cb),
  cancel: (idx) => cancelAnimationFrame(idx)
};
function getRandom() {
  const min = 0, max = 1;
  return clamp(_random(), min, max - Number.EPSILON);
}
function animate(fn) {
  return _animationLoop.nextFrame(fn);
}
function cancelAnimation(handle) {
  _animationLoop.cancel(handle);
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function mix(comp1, comp2, weight1, weight2) {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
  const max = getRangeMax(r), minOffset = 0;
  let min = getRangeMin(r);
  if (max === min) {
    min = minOffset;
  }
  return getRandom() * (max - min) + min;
}
function getRangeValue(value) {
  return isNumber(value) ? value : randomInRange(value);
}
function getRangeMin(value) {
  return isNumber(value) ? value : value.min;
}
function getRangeMax(value) {
  return isNumber(value) ? value : value.max;
}
function setRangeValue(source, value) {
  if (source === value || value === void 0 && isNumber(source)) {
    return source;
  }
  const min = getRangeMin(source), max = getRangeMax(source);
  return value !== void 0 ? {
    min: Math.min(min, value),
    max: Math.max(max, value)
  } : setRangeValue(min, max);
}
function getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y, squareExp2 = 2;
  return { dx, dy, distance: Math.sqrt(dx ** squareExp2 + dy ** squareExp2) };
}
function getDistance(pointA, pointB) {
  return getDistances(pointA, pointB).distance;
}
function degToRad(degrees) {
  const PIDeg = 180;
  return degrees * Math.PI / PIDeg;
}
function getParticleDirectionAngle(direction, position, center) {
  if (isNumber(direction)) {
    return degToRad(direction);
  }
  switch (direction) {
    case MoveDirection.top:
      return -Math.PI * half;
    case MoveDirection.topRight:
      return -Math.PI * quarter;
    case MoveDirection.right:
      return empty;
    case MoveDirection.bottomRight:
      return Math.PI * quarter;
    case MoveDirection.bottom:
      return Math.PI * half;
    case MoveDirection.bottomLeft:
      return Math.PI * threeQuarter;
    case MoveDirection.left:
      return Math.PI;
    case MoveDirection.topLeft:
      return -Math.PI * threeQuarter;
    case MoveDirection.inside:
      return Math.atan2(center.y - position.y, center.x - position.x);
    case MoveDirection.outside:
      return Math.atan2(position.y - center.y, position.x - center.x);
    default:
      return getRandom() * doublePI;
  }
}
function getParticleBaseVelocity(direction) {
  const baseVelocity = Vector.origin;
  baseVelocity.length = 1;
  baseVelocity.angle = direction;
  return baseVelocity;
}
function collisionVelocity(v1, v2, m1, m2) {
  return Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * double * m2 / (m1 + m2), v1.y);
}
function calcExactPositionOrRandomFromSize(data) {
  return {
    x: data.position?.x ?? getRandom() * data.size.width,
    y: data.position?.y ?? getRandom() * data.size.height
  };
}
function parseAlpha(input) {
  const defaultAlpha = 1;
  if (!input) {
    return defaultAlpha;
  }
  return input.endsWith("%") ? parseFloat(input) / percentDenominator : parseFloat(input);
}
var AnimationMode;
(function(AnimationMode2) {
  AnimationMode2["auto"] = "auto";
  AnimationMode2["increase"] = "increase";
  AnimationMode2["decrease"] = "decrease";
  AnimationMode2["random"] = "random";
})(AnimationMode || (AnimationMode = {}));
var AnimationStatus;
(function(AnimationStatus2) {
  AnimationStatus2["increasing"] = "increasing";
  AnimationStatus2["decreasing"] = "decreasing";
})(AnimationStatus || (AnimationStatus = {}));
var DestroyType;
(function(DestroyType2) {
  DestroyType2["none"] = "none";
  DestroyType2["max"] = "max";
  DestroyType2["min"] = "min";
})(DestroyType || (DestroyType = {}));
var OutModeDirection;
(function(OutModeDirection2) {
  OutModeDirection2["bottom"] = "bottom";
  OutModeDirection2["left"] = "left";
  OutModeDirection2["right"] = "right";
  OutModeDirection2["top"] = "top";
})(OutModeDirection || (OutModeDirection = {}));
var PixelMode;
(function(PixelMode2) {
  PixelMode2["precise"] = "precise";
  PixelMode2["percent"] = "percent";
})(PixelMode || (PixelMode = {}));
var StartValueType;
(function(StartValueType2) {
  StartValueType2["max"] = "max";
  StartValueType2["min"] = "min";
  StartValueType2["random"] = "random";
})(StartValueType || (StartValueType = {}));
const _logger = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  verbose: console.log,
  warning: console.warn
};
function getLogger() {
  return _logger;
}
function memoize(fn) {
  const cache = /* @__PURE__ */ new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
function rectSideBounce(data) {
  const res = { bounced: false }, { pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor } = data;
  if (pOtherSide.min < rectOtherSide.min || pOtherSide.min > rectOtherSide.max || pOtherSide.max < rectOtherSide.min || pOtherSide.max > rectOtherSide.max) {
    return res;
  }
  if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) * half && velocity > minVelocity || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) * half && velocity < minVelocity) {
    res.velocity = velocity * -factor;
    res.bounced = true;
  }
  return res;
}
function checkSelector(element, selectors) {
  const res = executeOnSingleOrMultiple(selectors, (selector) => {
    return element.matches(selector);
  });
  return isArray(res) ? res.some((t) => t) : res;
}
function isSsr() {
  return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}
function hasMatchMedia() {
  return !isSsr() && typeof matchMedia !== "undefined";
}
function safeMatchMedia(query) {
  if (!hasMatchMedia()) {
    return;
  }
  return matchMedia(query);
}
function safeIntersectionObserver(callback) {
  if (isSsr() || typeof IntersectionObserver === "undefined") {
    return;
  }
  return new IntersectionObserver(callback);
}
function safeMutationObserver(callback) {
  if (isSsr() || typeof MutationObserver === "undefined") {
    return;
  }
  return new MutationObserver(callback);
}
function isInArray(value, array) {
  const invalidIndex = -1;
  return value === array || isArray(array) && array.indexOf(value) > invalidIndex;
}
async function loadFont(font, weight) {
  try {
    await document.fonts.load(`${weight ?? "400"} 36px '${font ?? "Verdana"}'`);
  } catch {
  }
}
function arrayRandomIndex(array) {
  return Math.floor(getRandom() * array.length);
}
function itemFromArray(array, index, useIndex = true) {
  return array[index !== void 0 && useIndex ? index % array.length : arrayRandomIndex(array)];
}
function isPointInside(point, size, offset, radius, direction) {
  const minRadius = 0;
  return areBoundsInside(calculateBounds(point, radius ?? minRadius), size, offset, direction);
}
function areBoundsInside(bounds, size, offset, direction) {
  let inside = true;
  if (!direction || direction === OutModeDirection.bottom) {
    inside = bounds.top < size.height + offset.x;
  }
  if (inside && (!direction || direction === OutModeDirection.left)) {
    inside = bounds.right > offset.x;
  }
  if (inside && (!direction || direction === OutModeDirection.right)) {
    inside = bounds.left < size.width + offset.y;
  }
  if (inside && (!direction || direction === OutModeDirection.top)) {
    inside = bounds.bottom > offset.y;
  }
  return inside;
}
function calculateBounds(point, radius) {
  return {
    bottom: point.y + radius,
    left: point.x - radius,
    right: point.x + radius,
    top: point.y - radius
  };
}
function deepExtend(destination, ...sources) {
  for (const source of sources) {
    if (source === void 0 || source === null) {
      continue;
    }
    if (!isObject(source)) {
      destination = source;
      continue;
    }
    const sourceIsArray = Array.isArray(source);
    if (sourceIsArray && (isObject(destination) || !destination || !Array.isArray(destination))) {
      destination = [];
    } else if (!sourceIsArray && (isObject(destination) || !destination || Array.isArray(destination))) {
      destination = {};
    }
    for (const key in source) {
      if (key === "__proto__") {
        continue;
      }
      const sourceDict = source, value = sourceDict[key], destDict = destination;
      destDict[key] = isObject(value) && Array.isArray(value) ? value.map((v) => deepExtend(destDict[key], v)) : deepExtend(destDict[key], value);
    }
  }
  return destination;
}
function isDivModeEnabled(mode, divs) {
  return !!findItemFromSingleOrMultiple(divs, (t) => t.enable && isInArray(mode, t.mode));
}
function divModeExecute(mode, divs, callback) {
  executeOnSingleOrMultiple(divs, (div) => {
    const divMode2 = div.mode, divEnabled = div.enable;
    if (divEnabled && isInArray(mode, divMode2)) {
      singleDivModeExecute(div, callback);
    }
  });
}
function singleDivModeExecute(div, callback) {
  const selectors = div.selectors;
  executeOnSingleOrMultiple(selectors, (selector) => {
    callback(selector, div);
  });
}
function divMode(divs, element) {
  if (!element || !divs) {
    return;
  }
  return findItemFromSingleOrMultiple(divs, (div) => {
    return checkSelector(element, div.selectors);
  });
}
function circleBounceDataFromParticle(p) {
  return {
    position: p.getPosition(),
    radius: p.getRadius(),
    mass: p.getMass(),
    velocity: p.velocity,
    factor: Vector.create(getRangeValue(p.options.bounce.horizontal.value), getRangeValue(p.options.bounce.vertical.value))
  };
}
function circleBounce(p1, p2) {
  const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity), [pos1, pos2] = [p1.position, p2.position], { dx: xDist, dy: yDist } = getDistances(pos2, pos1), minimumDistance = 0;
  if (xVelocityDiff * xDist + yVelocityDiff * yDist < minimumDistance) {
    return;
  }
  const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = collisionVelocity(u1, u2, m1, m2), v2 = collisionVelocity(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
  p1.velocity.x = vFinal1.x * p1.factor.x;
  p1.velocity.y = vFinal1.y * p1.factor.y;
  p2.velocity.x = vFinal2.x * p2.factor.x;
  p2.velocity.y = vFinal2.y * p2.factor.y;
}
function rectBounce(particle, divBounds) {
  const pPos = particle.getPosition(), size = particle.getRadius(), bounds = calculateBounds(pPos, size), bounceOptions = particle.options.bounce, resH = rectSideBounce({
    pSide: {
      min: bounds.left,
      max: bounds.right
    },
    pOtherSide: {
      min: bounds.top,
      max: bounds.bottom
    },
    rectSide: {
      min: divBounds.left,
      max: divBounds.right
    },
    rectOtherSide: {
      min: divBounds.top,
      max: divBounds.bottom
    },
    velocity: particle.velocity.x,
    factor: getRangeValue(bounceOptions.horizontal.value)
  });
  if (resH.bounced) {
    if (resH.velocity !== void 0) {
      particle.velocity.x = resH.velocity;
    }
    if (resH.position !== void 0) {
      particle.position.x = resH.position;
    }
  }
  const resV = rectSideBounce({
    pSide: {
      min: bounds.top,
      max: bounds.bottom
    },
    pOtherSide: {
      min: bounds.left,
      max: bounds.right
    },
    rectSide: {
      min: divBounds.top,
      max: divBounds.bottom
    },
    rectOtherSide: {
      min: divBounds.left,
      max: divBounds.right
    },
    velocity: particle.velocity.y,
    factor: getRangeValue(bounceOptions.vertical.value)
  });
  if (resV.bounced) {
    if (resV.velocity !== void 0) {
      particle.velocity.y = resV.velocity;
    }
    if (resV.position !== void 0) {
      particle.position.y = resV.position;
    }
  }
}
function executeOnSingleOrMultiple(obj, callback) {
  const defaultIndex = 0;
  return isArray(obj) ? obj.map((item, index) => callback(item, index)) : callback(obj, defaultIndex);
}
function itemFromSingleOrMultiple(obj, index, useIndex) {
  return isArray(obj) ? itemFromArray(obj, index, useIndex) : obj;
}
function findItemFromSingleOrMultiple(obj, callback) {
  if (isArray(obj)) {
    return obj.find((t, index) => callback(t, index));
  }
  const defaultIndex = 0;
  return callback(obj, defaultIndex) ? obj : void 0;
}
function initParticleNumericAnimationValue(options, pxRatio) {
  const valueRange = options.value, animationOptions = options.animation, res = {
    delayTime: getRangeValue(animationOptions.delay) * millisecondsToSeconds,
    enable: animationOptions.enable,
    value: getRangeValue(options.value) * pxRatio,
    max: getRangeMax(valueRange) * pxRatio,
    min: getRangeMin(valueRange) * pxRatio,
    loops: 0,
    maxLoops: getRangeValue(animationOptions.count),
    time: 0
  }, decayOffset2 = 1;
  if (animationOptions.enable) {
    res.decay = decayOffset2 - getRangeValue(animationOptions.decay);
    switch (animationOptions.mode) {
      case AnimationMode.increase:
        res.status = AnimationStatus.increasing;
        break;
      case AnimationMode.decrease:
        res.status = AnimationStatus.decreasing;
        break;
      case AnimationMode.random:
        res.status = getRandom() >= half ? AnimationStatus.increasing : AnimationStatus.decreasing;
        break;
    }
    const autoStatus = animationOptions.mode === AnimationMode.auto;
    switch (animationOptions.startValue) {
      case StartValueType.min:
        res.value = res.min;
        if (autoStatus) {
          res.status = AnimationStatus.increasing;
        }
        break;
      case StartValueType.max:
        res.value = res.max;
        if (autoStatus) {
          res.status = AnimationStatus.decreasing;
        }
        break;
      case StartValueType.random:
      default:
        res.value = randomInRange(res);
        if (autoStatus) {
          res.status = getRandom() >= half ? AnimationStatus.increasing : AnimationStatus.decreasing;
        }
        break;
    }
  }
  res.initialValue = res.value;
  return res;
}
function getPositionOrSize(positionOrSize, canvasSize) {
  const isPercent = positionOrSize.mode === PixelMode.percent;
  if (!isPercent) {
    const { mode: _, ...rest } = positionOrSize;
    return rest;
  }
  const isPosition = "x" in positionOrSize;
  if (isPosition) {
    return {
      x: positionOrSize.x / percentDenominator * canvasSize.width,
      y: positionOrSize.y / percentDenominator * canvasSize.height
    };
  } else {
    return {
      width: positionOrSize.width / percentDenominator * canvasSize.width,
      height: positionOrSize.height / percentDenominator * canvasSize.height
    };
  }
}
function getPosition(position, canvasSize) {
  return getPositionOrSize(position, canvasSize);
}
function checkDestroy(particle, destroyType, value, minValue, maxValue) {
  switch (destroyType) {
    case DestroyType.max:
      if (value >= maxValue) {
        particle.destroy();
      }
      break;
    case DestroyType.min:
      if (value <= minValue) {
        particle.destroy();
      }
      break;
  }
}
function updateAnimation(particle, data, changeDirection, destroyType, delta) {
  const minLoops = 0, minDelay = 0, identity2 = 1, minVelocity2 = 0, minDecay = 1;
  if (particle.destroyed || !data || !data.enable || (data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops)) {
    return;
  }
  const velocity = (data.velocity ?? minVelocity2) * delta.factor, minValue = data.min, maxValue = data.max, decay = data.decay ?? minDecay;
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    return;
  }
  switch (data.status) {
    case AnimationStatus.increasing:
      if (data.value >= maxValue) {
        if (changeDirection) {
          data.status = AnimationStatus.decreasing;
        } else {
          data.value -= maxValue;
        }
        if (!data.loops) {
          data.loops = minLoops;
        }
        data.loops++;
      } else {
        data.value += velocity;
      }
      break;
    case AnimationStatus.decreasing:
      if (data.value <= minValue) {
        if (changeDirection) {
          data.status = AnimationStatus.increasing;
        } else {
          data.value += maxValue;
        }
        if (!data.loops) {
          data.loops = minLoops;
        }
        data.loops++;
      } else {
        data.value -= velocity;
      }
  }
  if (data.velocity && decay !== identity2) {
    data.velocity *= decay;
  }
  checkDestroy(particle, destroyType, data.value, minValue, maxValue);
  if (!particle.destroyed) {
    data.value = clamp(data.value, minValue, maxValue);
  }
}
function cloneStyle(style) {
  const clonedStyle = document.createElement("div").style;
  if (!style) {
    return clonedStyle;
  }
  for (const key in style) {
    const styleKey = style[key];
    if (!Object.prototype.hasOwnProperty.call(style, key) || isNull(styleKey)) {
      continue;
    }
    const styleValue = style.getPropertyValue?.(styleKey);
    if (!styleValue) {
      continue;
    }
    const stylePriority = style.getPropertyPriority?.(styleKey);
    if (!stylePriority) {
      clonedStyle.setProperty?.(styleKey, styleValue);
    } else {
      clonedStyle.setProperty?.(styleKey, styleValue, stylePriority);
    }
  }
  return clonedStyle;
}
function computeFullScreenStyle(zIndex) {
  const fullScreenStyle = document.createElement("div").style, radix = 10, style = {
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    borderWidth: "0",
    position: "fixed",
    zIndex: zIndex.toString(radix),
    "z-index": zIndex.toString(radix),
    top: "0",
    left: "0"
  };
  for (const key in style) {
    const value = style[key];
    fullScreenStyle.setProperty(key, value);
  }
  return fullScreenStyle;
}
const getFullScreenStyle = memoize(computeFullScreenStyle);
var AlterType;
(function(AlterType2) {
  AlterType2["darken"] = "darken";
  AlterType2["enlighten"] = "enlighten";
})(AlterType || (AlterType = {}));
function stringToRgba(engine, input) {
  if (!input) {
    return;
  }
  for (const manager of engine.colorManagers.values()) {
    if (input.startsWith(manager.stringPrefix)) {
      return manager.parseString(input);
    }
  }
}
function rangeColorToRgb(engine, input, index, useIndex = true) {
  if (!input) {
    return;
  }
  const color = isString(input) ? { value: input } : input;
  if (isString(color.value)) {
    return colorToRgb(engine, color.value, index, useIndex);
  }
  if (isArray(color.value)) {
    return rangeColorToRgb(engine, {
      value: itemFromArray(color.value, index, useIndex)
    });
  }
  for (const manager of engine.colorManagers.values()) {
    const res = manager.handleRangeColor(color);
    if (res) {
      return res;
    }
  }
}
function colorToRgb(engine, input, index, useIndex = true) {
  if (!input) {
    return;
  }
  const color = isString(input) ? { value: input } : input;
  if (isString(color.value)) {
    return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(engine, color.value);
  }
  if (isArray(color.value)) {
    return colorToRgb(engine, {
      value: itemFromArray(color.value, index, useIndex)
    });
  }
  for (const manager of engine.colorManagers.values()) {
    const res = manager.handleColor(color);
    if (res) {
      return res;
    }
  }
}
function rangeColorToHsl(engine, color, index, useIndex = true) {
  const rgb = rangeColorToRgb(engine, color, index, useIndex);
  return rgb ? rgbToHsl(rgb) : void 0;
}
function rgbToHsl(color) {
  const r1 = color.r / rgbMax, g1 = color.g / rgbMax, b1 = color.b / rgbMax, max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1), res = {
    h: hMin,
    l: (max + min) * half,
    s: sMin
  };
  if (max !== min) {
    res.s = res.l < half ? (max - min) / (max + min) : (max - min) / (double - max - min);
    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? double + (b1 - r1) / (max - min) : double * double + (r1 - g1) / (max - min);
  }
  res.l *= lMax;
  res.s *= sMax;
  res.h *= hPhase;
  if (res.h < hMin) {
    res.h += hMax;
  }
  if (res.h >= hMax) {
    res.h -= hMax;
  }
  return res;
}
function stringToRgb(engine, input) {
  return stringToRgba(engine, input);
}
function hslToRgb(hsl) {
  const h = (hsl.h % hMax + hMax) % hMax, s = Math.max(sMin, Math.min(sMax, hsl.s)), l = Math.max(lMin, Math.min(lMax, hsl.l)), hNormalized = h / hMax, sNormalized = s / sMax, lNormalized = l / lMax;
  if (s === sMin) {
    const grayscaleValue = Math.round(lNormalized * rgbFactor);
    return { r: grayscaleValue, g: grayscaleValue, b: grayscaleValue };
  }
  const channel = (temp12, temp22, temp3) => {
    const temp3Min = 0, temp3Max = 1;
    if (temp3 < temp3Min) {
      temp3++;
    }
    if (temp3 > temp3Max) {
      temp3--;
    }
    if (temp3 * sextuple < temp3Max) {
      return temp12 + (temp22 - temp12) * sextuple * temp3;
    }
    if (temp3 * double < temp3Max) {
      return temp22;
    }
    if (temp3 * triple < temp3Max * double) {
      const temp3Offset = double / triple;
      return temp12 + (temp22 - temp12) * (temp3Offset - temp3) * sextuple;
    }
    return temp12;
  }, temp1 = lNormalized < half ? lNormalized * (sNormalizedOffset + sNormalized) : lNormalized + sNormalized - lNormalized * sNormalized, temp2 = double * lNormalized - temp1, phaseThird = phaseNumerator / triple, red = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized + phaseThird)), green = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized)), blue = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized - phaseThird));
  return { r: Math.round(red), g: Math.round(green), b: Math.round(blue) };
}
function hslaToRgba(hsla) {
  const rgbResult = hslToRgb(hsla);
  return {
    a: hsla.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}
function getRandomRgbColor(min) {
  const fixedMin = defaultRgbMin, fixedMax = rgbMax + identity;
  return {
    b: Math.floor(randomInRange(setRangeValue(fixedMin, fixedMax))),
    g: Math.floor(randomInRange(setRangeValue(fixedMin, fixedMax))),
    r: Math.floor(randomInRange(setRangeValue(fixedMin, fixedMax)))
  };
}
function getStyleFromRgb(color, opacity) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity ?? defaultOpacity})`;
}
function getStyleFromHsl(color, opacity) {
  return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity ?? defaultOpacity})`;
}
function colorMix(color1, color2, size1, size2) {
  let rgb1 = color1, rgb2 = color2;
  if (rgb1.r === void 0) {
    rgb1 = hslToRgb(color1);
  }
  if (rgb2.r === void 0) {
    rgb2 = hslToRgb(color2);
  }
  return {
    b: mix(rgb1.b, rgb2.b, size1, size2),
    g: mix(rgb1.g, rgb2.g, size1, size2),
    r: mix(rgb1.r, rgb2.r, size1, size2)
  };
}
function getLinkColor(p1, p2, linkColor) {
  if (linkColor === randomColorValue) {
    return getRandomRgbColor();
  } else if (linkColor === midColorValue) {
    const sourceColor = p1.getFillColor() ?? p1.getStrokeColor(), destColor = p2?.getFillColor() ?? p2?.getStrokeColor();
    if (sourceColor && destColor && p2) {
      return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
    } else {
      const hslColor = sourceColor ?? destColor;
      if (hslColor) {
        return hslToRgb(hslColor);
      }
    }
  } else {
    return linkColor;
  }
}
function getLinkRandomColor(engine, optColor, blink, consent) {
  const color = isString(optColor) ? optColor : optColor.value;
  if (color === randomColorValue) {
    if (consent) {
      return rangeColorToRgb(engine, {
        value: color
      });
    }
    if (blink) {
      return randomColorValue;
    }
    return midColorValue;
  } else if (color === midColorValue) {
    return midColorValue;
  } else {
    return rangeColorToRgb(engine, {
      value: color
    });
  }
}
function getHslFromAnimation(animation) {
  return animation !== void 0 ? {
    h: animation.h.value,
    s: animation.s.value,
    l: animation.l.value
  } : void 0;
}
function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
  const resColor = {
    h: {
      enable: false,
      value: hsl.h
    },
    s: {
      enable: false,
      value: hsl.s
    },
    l: {
      enable: false,
      value: hsl.l
    }
  };
  if (animationOptions) {
    setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
    setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
    setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
  }
  return resColor;
}
function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
  colorValue.enable = colorAnimation.enable;
  if (colorValue.enable) {
    colorValue.velocity = getRangeValue(colorAnimation.speed) / percentDenominator * reduceFactor;
    colorValue.decay = decayOffset - getRangeValue(colorAnimation.decay);
    colorValue.status = AnimationStatus.increasing;
    colorValue.loops = defaultLoops;
    colorValue.maxLoops = getRangeValue(colorAnimation.count);
    colorValue.time = defaultTime;
    colorValue.delayTime = getRangeValue(colorAnimation.delay) * millisecondsToSeconds;
    if (!colorAnimation.sync) {
      colorValue.velocity *= getRandom();
      colorValue.value *= getRandom();
    }
    colorValue.initialValue = colorValue.value;
    colorValue.offset = setRangeValue(colorAnimation.offset);
  } else {
    colorValue.velocity = defaultVelocity;
  }
}
function updateColorValue(data, range, decrease, delta) {
  const minLoops = 0, minDelay = 0, identity2 = 1, minVelocity2 = 0, minOffset = 0, velocityFactor = 3.6;
  if (!data || !data.enable || (data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops)) {
    return;
  }
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    return;
  }
  const offset = data.offset ? randomInRange(data.offset) : minOffset, velocity = (data.velocity ?? minVelocity2) * delta.factor + offset * velocityFactor, decay = data.decay ?? identity2, max = getRangeMax(range), min = getRangeMin(range);
  if (!decrease || data.status === AnimationStatus.increasing) {
    data.value += velocity;
    if (data.value > max) {
      if (!data.loops) {
        data.loops = 0;
      }
      data.loops++;
      if (decrease) {
        data.status = AnimationStatus.decreasing;
      } else {
        data.value -= max;
      }
    }
  } else {
    data.value -= velocity;
    const minValue = 0;
    if (data.value < minValue) {
      if (!data.loops) {
        data.loops = 0;
      }
      data.loops++;
      data.status = AnimationStatus.increasing;
    }
  }
  if (data.velocity && decay !== identity2) {
    data.velocity *= decay;
  }
  data.value = clamp(data.value, min, max);
}
function updateColor(color, delta) {
  if (!color) {
    return;
  }
  const { h, s, l } = color, ranges = {
    h: { min: 0, max: 360 },
    s: { min: 0, max: 100 },
    l: { min: 0, max: 100 }
  };
  if (h) {
    updateColorValue(h, ranges.h, false, delta);
  }
  if (s) {
    updateColorValue(s, ranges.s, true, delta);
  }
  if (l) {
    updateColorValue(l, ranges.l, true, delta);
  }
}
function drawLine(context, begin, end) {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.closePath();
}
function paintBase(context, dimension, baseColor) {
  context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
  context.fillRect(originPoint.x, originPoint.y, dimension.width, dimension.height);
}
function paintImage(context, dimension, image, opacity) {
  if (!image) {
    return;
  }
  context.globalAlpha = opacity;
  context.drawImage(image, originPoint.x, originPoint.y, dimension.width, dimension.height);
  context.globalAlpha = 1;
}
function clear(context, dimension) {
  context.clearRect(originPoint.x, originPoint.y, dimension.width, dimension.height);
}
function drawParticle(data) {
  const { container, context, particle, delta, colorStyles, backgroundMask, composite, radius, opacity, shadow, transform } = data, pos = particle.getPosition(), angle = particle.rotation + (particle.pathRotation ? particle.velocity.angle : defaultAngle), rotateData = {
    sin: Math.sin(angle),
    cos: Math.cos(angle)
  }, rotating = !!angle, transformData = {
    a: rotateData.cos * (transform.a ?? defaultTransform.a),
    b: rotating ? rotateData.sin * (transform.b ?? identity) : transform.b ?? defaultTransform.b,
    c: rotating ? -rotateData.sin * (transform.c ?? identity) : transform.c ?? defaultTransform.c,
    d: rotateData.cos * (transform.d ?? defaultTransform.d)
  };
  context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);
  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }
  const shadowColor = particle.shadowColor;
  if (shadow.enable && shadowColor) {
    context.shadowBlur = shadow.blur;
    context.shadowColor = getStyleFromRgb(shadowColor);
    context.shadowOffsetX = shadow.offset.x;
    context.shadowOffsetY = shadow.offset.y;
  }
  if (colorStyles.fill) {
    context.fillStyle = colorStyles.fill;
  }
  const strokeWidth = particle.strokeWidth ?? minStrokeWidth;
  context.lineWidth = strokeWidth;
  if (colorStyles.stroke) {
    context.strokeStyle = colorStyles.stroke;
  }
  const drawData = {
    container,
    context,
    particle,
    radius,
    opacity,
    delta,
    transformData,
    strokeWidth
  };
  drawShape(drawData);
  drawShapeAfterDraw(drawData);
  drawEffect(drawData);
  context.globalCompositeOperation = "source-over";
  context.resetTransform();
}
function drawEffect(data) {
  const { container, context, particle, radius, opacity, delta, transformData } = data;
  if (!particle.effect) {
    return;
  }
  const drawer = container.effectDrawers.get(particle.effect);
  if (!drawer) {
    return;
  }
  drawer.draw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: { ...transformData }
  });
}
function drawShape(data) {
  const { container, context, particle, radius, opacity, delta, strokeWidth, transformData } = data;
  if (!particle.shape) {
    return;
  }
  const drawer = container.shapeDrawers.get(particle.shape);
  if (!drawer) {
    return;
  }
  context.beginPath();
  drawer.draw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: { ...transformData }
  });
  if (particle.shapeClose) {
    context.closePath();
  }
  if (strokeWidth > minStrokeWidth) {
    context.stroke();
  }
  if (particle.shapeFill) {
    context.fill();
  }
}
function drawShapeAfterDraw(data) {
  const { container, context, particle, radius, opacity, delta, transformData } = data;
  if (!particle.shape) {
    return;
  }
  const drawer = container.shapeDrawers.get(particle.shape);
  if (!drawer?.afterDraw) {
    return;
  }
  drawer.afterDraw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: { ...transformData }
  });
}
function drawPlugin(context, plugin, delta) {
  if (!plugin.draw) {
    return;
  }
  plugin.draw(context, delta);
}
function drawParticlePlugin(context, plugin, particle, delta) {
  if (!plugin.drawParticle) {
    return;
  }
  plugin.drawParticle(context, particle, delta);
}
function alterHsl(color, type, value) {
  return {
    h: color.h,
    s: color.s,
    l: color.l + (type === AlterType.darken ? -lFactor : lFactor) * value
  };
}
class OptionsColor {
  constructor() {
    this.value = "";
  }
  static create(source, data) {
    const color = new OptionsColor();
    color.load(source);
    if (data !== void 0) {
      if (isString(data) || isArray(data)) {
        color.load({ value: data });
      } else {
        color.load(data);
      }
    }
    return color;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (!isNull(data.value)) {
      this.value = data.value;
    }
  }
}
var DivType;
(function(DivType2) {
  DivType2["circle"] = "circle";
  DivType2["rectangle"] = "rectangle";
})(DivType || (DivType = {}));
class AnimationOptions {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 1;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.count !== void 0) {
      this.count = setRangeValue(data.count);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== void 0) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.delay !== void 0) {
      this.delay = setRangeValue(data.delay);
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
}
class RangedAnimationOptions extends AnimationOptions {
  constructor() {
    super();
    this.mode = AnimationMode.auto;
    this.startValue = StartValueType.random;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.startValue !== void 0) {
      this.startValue = data.startValue;
    }
  }
}
var CollisionMode;
(function(CollisionMode2) {
  CollisionMode2["absorb"] = "absorb";
  CollisionMode2["bounce"] = "bounce";
  CollisionMode2["destroy"] = "destroy";
})(CollisionMode || (CollisionMode = {}));
class ValueWithRandom {
  constructor() {
    this.value = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (!isNull(data.value)) {
      this.value = setRangeValue(data.value);
    }
  }
}
class AnimationValueWithRandom extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new AnimationOptions();
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    const animation = data.animation;
    if (animation !== void 0) {
      this.animation.load(animation);
    }
  }
}
class RangedAnimationValueWithRandom extends AnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new RangedAnimationOptions();
  }
  load(data) {
    super.load(data);
  }
}
var OutMode;
(function(OutMode2) {
  OutMode2["bounce"] = "bounce";
  OutMode2["none"] = "none";
  OutMode2["out"] = "out";
  OutMode2["destroy"] = "destroy";
  OutMode2["split"] = "split";
})(OutMode || (OutMode = {}));
var InteractorType;
(function(InteractorType2) {
  InteractorType2["external"] = "external";
  InteractorType2["particles"] = "particles";
})(InteractorType || (InteractorType = {}));
var ParticleOutType;
(function(ParticleOutType2) {
  ParticleOutType2["normal"] = "normal";
  ParticleOutType2["inside"] = "inside";
  ParticleOutType2["outside"] = "outside";
})(ParticleOutType || (ParticleOutType = {}));
var RangeType;
(function(RangeType2) {
  RangeType2["circle"] = "circle";
  RangeType2["rectangle"] = "rectangle";
})(RangeType || (RangeType = {}));
class BaseRange {
  constructor(x, y, type) {
    this.position = {
      x,
      y
    };
    this.type = type;
  }
}
class Circle extends BaseRange {
  constructor(x, y, radius) {
    super(x, y, RangeType.circle);
    this.radius = radius;
  }
  contains(point) {
    return getDistance(point, this.position) <= this.radius;
  }
  intersects(range) {
    const pos1 = this.position, pos2 = range.position, distPos = { x: Math.abs(pos2.x - pos1.x), y: Math.abs(pos2.y - pos1.y) }, r = this.radius;
    if (range instanceof Circle || range.type === RangeType.circle) {
      const circleRange = range, rSum = r + circleRange.radius, dist = Math.sqrt(distPos.x ** squareExp + distPos.y ** squareExp);
      return rSum > dist;
    } else if (range instanceof Rectangle || range.type === RangeType.rectangle) {
      const rectRange = range, { width, height } = rectRange.size, edges = Math.pow(distPos.x - width, squareExp) + Math.pow(distPos.y - height, squareExp);
      return edges <= r ** squareExp || distPos.x <= r + width && distPos.y <= r + height || distPos.x <= width || distPos.y <= height;
    }
    return false;
  }
}
class Rectangle extends BaseRange {
  constructor(x, y, width, height) {
    super(x, y, RangeType.rectangle);
    this.size = {
      height,
      width
    };
  }
  contains(point) {
    const w = this.size.width, h = this.size.height, pos = this.position;
    return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
  }
  intersects(range) {
    if (range instanceof Circle) {
      return range.intersects(this);
    }
    const w = this.size.width, h = this.size.height, pos1 = this.position, pos2 = range.position, size2 = range instanceof Rectangle ? range.size : { width: 0, height: 0 }, w2 = size2.width, h2 = size2.height;
    return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
  }
}
var RotateDirection;
(function(RotateDirection2) {
  RotateDirection2["clockwise"] = "clockwise";
  RotateDirection2["counterClockwise"] = "counter-clockwise";
  RotateDirection2["random"] = "random";
})(RotateDirection || (RotateDirection = {}));
var EasingType;
(function(EasingType2) {
  EasingType2["easeInBack"] = "ease-in-back";
  EasingType2["easeInCirc"] = "ease-in-circ";
  EasingType2["easeInCubic"] = "ease-in-cubic";
  EasingType2["easeInLinear"] = "ease-in-linear";
  EasingType2["easeInQuad"] = "ease-in-quad";
  EasingType2["easeInQuart"] = "ease-in-quart";
  EasingType2["easeInQuint"] = "ease-in-quint";
  EasingType2["easeInExpo"] = "ease-in-expo";
  EasingType2["easeInSine"] = "ease-in-sine";
  EasingType2["easeOutBack"] = "ease-out-back";
  EasingType2["easeOutCirc"] = "ease-out-circ";
  EasingType2["easeOutCubic"] = "ease-out-cubic";
  EasingType2["easeOutLinear"] = "ease-out-linear";
  EasingType2["easeOutQuad"] = "ease-out-quad";
  EasingType2["easeOutQuart"] = "ease-out-quart";
  EasingType2["easeOutQuint"] = "ease-out-quint";
  EasingType2["easeOutExpo"] = "ease-out-expo";
  EasingType2["easeOutSine"] = "ease-out-sine";
  EasingType2["easeInOutBack"] = "ease-in-out-back";
  EasingType2["easeInOutCirc"] = "ease-in-out-circ";
  EasingType2["easeInOutCubic"] = "ease-in-out-cubic";
  EasingType2["easeInOutLinear"] = "ease-in-out-linear";
  EasingType2["easeInOutQuad"] = "ease-in-out-quad";
  EasingType2["easeInOutQuart"] = "ease-in-out-quart";
  EasingType2["easeInOutQuint"] = "ease-in-out-quint";
  EasingType2["easeInOutExpo"] = "ease-in-out-expo";
  EasingType2["easeInOutSine"] = "ease-in-out-sine";
})(EasingType || (EasingType = {}));
export {
  MoveDirection as $,
  touchMoveEvent as A,
  touchEndEvent as B,
  mouseUpEvent as C,
  mouseDownEvent as D,
  touchCancelEvent as E,
  mouseLeaveEvent as F,
  visibilityChangeEvent as G,
  safeMatchMedia as H,
  resizeEvent as I,
  double as J,
  lengthOffset as K,
  minCoordinate as L,
  mouseOutEvent as M,
  isBoolean as N,
  OptionsColor as O,
  isNull as P,
  isString as Q,
  DivType as R,
  PixelMode as S,
  manualDefaultPosition as T,
  deepExtend as U,
  AnimationOptions as V,
  setRangeValue as W,
  isArray as X,
  ValueWithRandom as Y,
  CollisionMode as Z,
  OutMode as _,
  rangeColorToRgb as a,
  loadMinIndex as a$,
  isNumber as a0,
  isObject as a1,
  RangedAnimationOptions as a2,
  DestroyType as a3,
  RangedAnimationValueWithRandom as a4,
  InteractorType as a5,
  defaultRetryCount as a6,
  Vector3d as a7,
  calcExactPositionOrRandomFromSize as a8,
  tryCountIncrement as a9,
  subdivideCount as aA,
  Rectangle as aB,
  Circle as aC,
  minLimit as aD,
  defaultDensityFactor as aE,
  deleteCount as aF,
  qTreeCapacity as aG,
  minCount as aH,
  defaultRemoveQuantity as aI,
  minIndex as aJ,
  countOffset as aK,
  posOffset as aL,
  sizeFactor as aM,
  defaultRatio as aN,
  defaultReduceFactor as aO,
  isSsr as aP,
  defaultFps as aQ,
  safeIntersectionObserver as aR,
  removeMinIndex as aS,
  removeDeleteCount as aT,
  animate as aU,
  defaultFpsLimit as aV,
  minFpsLimit as aW,
  cancelAnimation as aX,
  touchEndLengthOffset as aY,
  clickRadius as aZ,
  loadRandomFactor as a_,
  getParticleBaseVelocity as aa,
  degToRad as ab,
  getRangeValue as ac,
  randomInRange as ad,
  getRandom as ae,
  minRetries as af,
  errorPrefix as ag,
  getDistance as ah,
  rollFactor as ai,
  half as aj,
  none as ak,
  alterHsl as al,
  clamp as am,
  minZ as an,
  defaultRadius as ao,
  getPosition as ap,
  getParticleDirectionAngle as aq,
  ParticleOutType as ar,
  Vector as as,
  getHslFromAnimation as at,
  squareExp as au,
  itemFromSingleOrMultiple as av,
  randomColorValue as aw,
  initParticleNumericAnimationValue as ax,
  decayOffset as ay,
  isInArray as az,
  paintImage as b,
  one as b0,
  generatedTrue as b1,
  canvasTag as b2,
  generatedFalse as b3,
  canvasFirstIndex as b4,
  RotateDirection as b5,
  getDistances as b6,
  getRangeMax as b7,
  getHslAnimationFromHsl as b8,
  updateColor as b9,
  hslToRgb as ba,
  hslaToRgba as bb,
  parseAlpha as bc,
  percentDenominator as bd,
  updateAnimation as be,
  OutModeDirection as bf,
  calculateBounds as bg,
  isPointInside as bh,
  EasingType as bi,
  loadFont as bj,
  divModeExecute as bk,
  circleBounce as bl,
  circleBounceDataFromParticle as bm,
  rectBounce as bn,
  isDivModeEnabled as bo,
  rgbToHsl as bp,
  colorMix as bq,
  divMode as br,
  drawLine as bs,
  getLinkRandomColor as bt,
  getLinkColor as bu,
  itemFromArray as bv,
  AnimationStatus as bw,
  getFullScreenStyle as c,
  clear as d,
  minimumSize as e,
  defaultOpacity as f,
  getStyleFromRgb as g,
  getStyleFromHsl as h,
  inverseFactorNumerator as i,
  drawParticle as j,
  drawParticlePlugin as k,
  drawPlugin as l,
  minimumLength as m,
  getLogger as n,
  generatedAttribute as o,
  paintBase as p,
  cloneStyle as q,
  rangeColorToHsl as r,
  safeMutationObserver as s,
  defaultTransformValue as t,
  executeOnSingleOrMultiple as u,
  touchDelay as v,
  millisecondsToSeconds as w,
  mouseMoveEvent as x,
  touchStartEvent as y,
  zIndexFactorOffset as z
};
