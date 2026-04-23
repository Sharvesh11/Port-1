import { r as rangeColorToHsl, a as rangeColorToRgb, g as getStyleFromRgb, i as inverseFactorNumerator, p as paintBase, b as paintImage, c as getFullScreenStyle, m as minimumLength, d as clear, e as minimumSize, z as zIndexFactorOffset, f as defaultOpacity, h as getStyleFromHsl, j as drawParticle, k as drawParticlePlugin, l as drawPlugin, s as safeMutationObserver, n as getLogger, o as generatedAttribute, q as cloneStyle, t as defaultTransformValue, u as executeOnSingleOrMultiple, v as touchDelay, w as millisecondsToSeconds, x as mouseMoveEvent, y as touchStartEvent, A as touchMoveEvent, B as touchEndEvent, C as mouseUpEvent, D as mouseDownEvent, E as touchCancelEvent, F as mouseLeaveEvent, G as visibilityChangeEvent, H as safeMatchMedia, I as resizeEvent, J as double, K as lengthOffset, L as minCoordinate, M as mouseOutEvent, N as isBoolean, O as OptionsColor, P as isNull, Q as isString, R as DivType, S as PixelMode, T as manualDefaultPosition, U as deepExtend, V as AnimationOptions, W as setRangeValue, X as isArray, Y as ValueWithRandom, Z as CollisionMode, _ as OutMode, $ as MoveDirection, a0 as isNumber, a1 as isObject, a2 as RangedAnimationOptions, a3 as DestroyType, a4 as RangedAnimationValueWithRandom, a5 as InteractorType, a6 as defaultRetryCount, a7 as Vector3d, a8 as calcExactPositionOrRandomFromSize, a9 as tryCountIncrement, aa as getParticleBaseVelocity, ab as degToRad, ac as getRangeValue, ad as randomInRange, ae as getRandom, af as minRetries, ag as errorPrefix, ah as getDistance, ai as rollFactor, aj as half, ak as none, al as alterHsl, am as clamp, an as minZ, ao as defaultRadius, ap as getPosition, aq as getParticleDirectionAngle, ar as ParticleOutType, as as Vector, at as getHslFromAnimation, au as squareExp, av as itemFromSingleOrMultiple, aw as randomColorValue, ax as initParticleNumericAnimationValue, ay as decayOffset, az as isInArray, aA as subdivideCount, aB as Rectangle, aC as Circle, aD as minLimit, aE as defaultDensityFactor, aF as deleteCount, aG as qTreeCapacity, aH as minCount, aI as defaultRemoveQuantity, aJ as minIndex, aK as countOffset, aL as posOffset, aM as sizeFactor, aN as defaultRatio, aO as defaultReduceFactor, aP as isSsr, aQ as defaultFps, aR as safeIntersectionObserver, aS as removeMinIndex, aT as removeDeleteCount, aU as animate, aV as defaultFpsLimit, aW as minFpsLimit, aX as cancelAnimation, aY as touchEndLengthOffset, aZ as clickRadius, a_ as loadRandomFactor, a$ as loadMinIndex, b0 as one, b1 as generatedTrue, b2 as canvasTag, b3 as generatedFalse, b4 as canvasFirstIndex } from "./EasingType-Ws52dl2p.js";
import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CxUBeMkh.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function setTransformValue(factor, newFactor, key) {
  const newValue = newFactor[key];
  if (newValue !== void 0) {
    factor[key] = (factor[key] ?? defaultTransformValue) * newValue;
  }
}
function setStyle(canvas, style, important = false) {
  if (!style) {
    return;
  }
  const element = canvas;
  if (!element) {
    return;
  }
  const elementStyle = element.style;
  if (!elementStyle) {
    return;
  }
  const keys = /* @__PURE__ */ new Set();
  for (const key in elementStyle) {
    if (!Object.prototype.hasOwnProperty.call(elementStyle, key)) {
      continue;
    }
    keys.add(elementStyle[key]);
  }
  for (const key in style) {
    if (!Object.prototype.hasOwnProperty.call(style, key)) {
      continue;
    }
    keys.add(style[key]);
  }
  for (const key of keys) {
    const value = style.getPropertyValue(key);
    if (!value) {
      elementStyle.removeProperty(key);
    } else {
      elementStyle.setProperty(key, value, important ? "important" : "");
    }
  }
}
class Canvas {
  constructor(container, engine) {
    this.container = container;
    this._applyPostDrawUpdaters = (particle) => {
      for (const updater of this._postDrawUpdaters) {
        updater.afterDraw?.(particle);
      }
    };
    this._applyPreDrawUpdaters = (ctx, particle, radius, zOpacity, colorStyles, transform) => {
      for (const updater of this._preDrawUpdaters) {
        if (updater.getColorStyles) {
          const { fill, stroke } = updater.getColorStyles(particle, ctx, radius, zOpacity);
          if (fill) {
            colorStyles.fill = fill;
          }
          if (stroke) {
            colorStyles.stroke = stroke;
          }
        }
        if (updater.getTransformValues) {
          const updaterTransform = updater.getTransformValues(particle);
          for (const key in updaterTransform) {
            setTransformValue(transform, updaterTransform, key);
          }
        }
        updater.beforeDraw?.(particle);
      }
    };
    this._applyResizePlugins = () => {
      for (const plugin of this._resizePlugins) {
        plugin.resize?.();
      }
    };
    this._getPluginParticleColors = (particle) => {
      let fColor, sColor;
      for (const plugin of this._colorPlugins) {
        if (!fColor && plugin.particleFillColor) {
          fColor = rangeColorToHsl(this._engine, plugin.particleFillColor(particle));
        }
        if (!sColor && plugin.particleStrokeColor) {
          sColor = rangeColorToHsl(this._engine, plugin.particleStrokeColor(particle));
        }
        if (fColor && sColor) {
          break;
        }
      }
      return [fColor, sColor];
    };
    this._initCover = async () => {
      const options = this.container.actualOptions, cover = options.backgroundMask.cover, color = cover.color;
      if (color) {
        const coverRgb = rangeColorToRgb(this._engine, color);
        if (coverRgb) {
          const coverColor = {
            ...coverRgb,
            a: cover.opacity
          };
          this._coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
        }
      } else {
        await new Promise((resolve, reject) => {
          if (!cover.image) {
            return;
          }
          const img = document.createElement("img");
          img.addEventListener("load", () => {
            this._coverImage = {
              image: img,
              opacity: cover.opacity
            };
            resolve();
          });
          img.addEventListener("error", (evt) => {
            reject(evt.error);
          });
          img.src = cover.image;
        });
      }
    };
    this._initStyle = () => {
      const element = this.element, options = this.container.actualOptions;
      if (!element) {
        return;
      }
      if (this._fullScreen) {
        this._setFullScreenStyle();
      } else {
        this._resetOriginalStyle();
      }
      for (const key in options.style) {
        if (!key || !options.style || !Object.prototype.hasOwnProperty.call(options.style, key)) {
          continue;
        }
        const value = options.style[key];
        if (!value) {
          continue;
        }
        element.style.setProperty(key, value, "important");
      }
    };
    this._initTrail = async () => {
      const options = this.container.actualOptions, trail = options.particles.move.trail, trailFill = trail.fill;
      if (!trail.enable) {
        return;
      }
      const opacity = inverseFactorNumerator / trail.length;
      if (trailFill.color) {
        const fillColor = rangeColorToRgb(this._engine, trailFill.color);
        if (!fillColor) {
          return;
        }
        this._trailFill = {
          color: {
            ...fillColor
          },
          opacity
        };
      } else {
        await new Promise((resolve, reject) => {
          if (!trailFill.image) {
            return;
          }
          const img = document.createElement("img");
          img.addEventListener("load", () => {
            this._trailFill = {
              image: img,
              opacity
            };
            resolve();
          });
          img.addEventListener("error", (evt) => {
            reject(evt.error);
          });
          img.src = trailFill.image;
        });
      }
    };
    this._paintBase = (baseColor) => {
      this.draw((ctx) => paintBase(ctx, this.size, baseColor));
    };
    this._paintImage = (image, opacity) => {
      this.draw((ctx) => paintImage(ctx, this.size, image, opacity));
    };
    this._repairStyle = () => {
      const element = this.element;
      if (!element) {
        return;
      }
      this._safeMutationObserver((observer) => observer.disconnect());
      this._initStyle();
      this.initBackground();
      const pointerEvents = this._pointerEvents;
      element.style.pointerEvents = pointerEvents;
      element.setAttribute("pointer-events", pointerEvents);
      this._safeMutationObserver((observer) => {
        if (!element || !(element instanceof Node)) {
          return;
        }
        observer.observe(element, { attributes: true });
      });
    };
    this._resetOriginalStyle = () => {
      const element = this.element, originalStyle = this._originalStyle;
      if (!element || !originalStyle) {
        return;
      }
      setStyle(element, originalStyle, true);
    };
    this._safeMutationObserver = (callback) => {
      if (!this._mutationObserver) {
        return;
      }
      callback(this._mutationObserver);
    };
    this._setFullScreenStyle = () => {
      const element = this.element;
      if (!element) {
        return;
      }
      setStyle(element, getFullScreenStyle(this.container.actualOptions.fullScreen.zIndex), true);
    };
    this._engine = engine;
    this._standardSize = {
      height: 0,
      width: 0
    };
    const pxRatio = container.retina.pixelRatio, stdSize = this._standardSize;
    this.size = {
      height: stdSize.height * pxRatio,
      width: stdSize.width * pxRatio
    };
    this._context = null;
    this._generated = false;
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
    this._pointerEvents = "none";
  }
  get _fullScreen() {
    return this.container.actualOptions.fullScreen.enable;
  }
  clear() {
    const options = this.container.actualOptions, trail = options.particles.move.trail, trailFill = this._trailFill;
    if (options.backgroundMask.enable) {
      this.paint();
    } else if (trail.enable && trail.length > minimumLength && trailFill) {
      if (trailFill.color) {
        this._paintBase(getStyleFromRgb(trailFill.color, trailFill.opacity));
      } else if (trailFill.image) {
        this._paintImage(trailFill.image, trailFill.opacity);
      }
    } else if (options.clear) {
      this.draw((ctx) => {
        clear(ctx, this.size);
      });
    }
  }
  destroy() {
    this.stop();
    if (this._generated) {
      const element = this.element;
      element?.remove();
      this.element = void 0;
    } else {
      this._resetOriginalStyle();
    }
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
  }
  draw(cb) {
    const ctx = this._context;
    if (!ctx) {
      return;
    }
    return cb(ctx);
  }
  drawAsync(cb) {
    const ctx = this._context;
    if (!ctx) {
      return void 0;
    }
    return cb(ctx);
  }
  drawParticle(particle, delta) {
    if (particle.spawning || particle.destroyed) {
      return;
    }
    const radius = particle.getRadius();
    if (radius <= minimumSize) {
      return;
    }
    const pfColor = particle.getFillColor(), psColor = particle.getStrokeColor() ?? pfColor;
    let [fColor, sColor] = this._getPluginParticleColors(particle);
    if (!fColor) {
      fColor = pfColor;
    }
    if (!sColor) {
      sColor = psColor;
    }
    if (!fColor && !sColor) {
      return;
    }
    this.draw((ctx) => {
      const container = this.container, options = container.actualOptions, zIndexOptions = particle.options.zIndex, zIndexFactor = zIndexFactorOffset - particle.zIndexFactor, zOpacityFactor = zIndexFactor ** zIndexOptions.opacityRate, opacity = particle.bubble.opacity ?? particle.opacity?.value ?? defaultOpacity, strokeOpacity = particle.strokeOpacity ?? opacity, zOpacity = opacity * zOpacityFactor, zStrokeOpacity = strokeOpacity * zOpacityFactor, transform = {}, colorStyles = {
        fill: fColor ? getStyleFromHsl(fColor, zOpacity) : void 0
      };
      colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;
      this._applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);
      drawParticle({
        container,
        context: ctx,
        particle,
        delta,
        colorStyles,
        backgroundMask: options.backgroundMask.enable,
        composite: options.backgroundMask.composite,
        radius: radius * zIndexFactor ** zIndexOptions.sizeRate,
        opacity: zOpacity,
        shadow: particle.options.shadow,
        transform
      });
      this._applyPostDrawUpdaters(particle);
    });
  }
  drawParticlePlugin(plugin, particle, delta) {
    this.draw((ctx) => drawParticlePlugin(ctx, plugin, particle, delta));
  }
  drawPlugin(plugin, delta) {
    this.draw((ctx) => drawPlugin(ctx, plugin, delta));
  }
  async init() {
    this._safeMutationObserver((obs) => obs.disconnect());
    this._mutationObserver = safeMutationObserver((records) => {
      for (const record of records) {
        if (record.type === "attributes" && record.attributeName === "style") {
          this._repairStyle();
        }
      }
    });
    this.resize();
    this._initStyle();
    await this._initCover();
    try {
      await this._initTrail();
    } catch (e) {
      getLogger().error(e);
    }
    this.initBackground();
    this._safeMutationObserver((obs) => {
      if (!this.element || !(this.element instanceof Node)) {
        return;
      }
      obs.observe(this.element, { attributes: true });
    });
    this.initUpdaters();
    this.initPlugins();
    this.paint();
  }
  initBackground() {
    const options = this.container.actualOptions, background = options.background, element = this.element;
    if (!element) {
      return;
    }
    const elementStyle = element.style;
    if (!elementStyle) {
      return;
    }
    if (background.color) {
      const color = rangeColorToRgb(this._engine, background.color);
      elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "";
    } else {
      elementStyle.backgroundColor = "";
    }
    elementStyle.backgroundImage = background.image || "";
    elementStyle.backgroundPosition = background.position || "";
    elementStyle.backgroundRepeat = background.repeat || "";
    elementStyle.backgroundSize = background.size || "";
  }
  initPlugins() {
    this._resizePlugins = [];
    for (const plugin of this.container.plugins.values()) {
      if (plugin.resize) {
        this._resizePlugins.push(plugin);
      }
      if (plugin.particleFillColor ?? plugin.particleStrokeColor) {
        this._colorPlugins.push(plugin);
      }
    }
  }
  initUpdaters() {
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    for (const updater of this.container.particles.updaters) {
      if (updater.afterDraw) {
        this._postDrawUpdaters.push(updater);
      }
      if (updater.getColorStyles ?? updater.getTransformValues ?? updater.beforeDraw) {
        this._preDrawUpdaters.push(updater);
      }
    }
  }
  loadCanvas(canvas) {
    if (this._generated && this.element) {
      this.element.remove();
    }
    this._generated = canvas.dataset && generatedAttribute in canvas.dataset ? canvas.dataset[generatedAttribute] === "true" : this._generated;
    this.element = canvas;
    this.element.ariaHidden = "true";
    this._originalStyle = cloneStyle(this.element.style);
    const standardSize = this._standardSize;
    standardSize.height = canvas.offsetHeight;
    standardSize.width = canvas.offsetWidth;
    const pxRatio = this.container.retina.pixelRatio, retinaSize = this.size;
    canvas.height = retinaSize.height = standardSize.height * pxRatio;
    canvas.width = retinaSize.width = standardSize.width * pxRatio;
    this._context = this.element.getContext("2d");
    this._safeMutationObserver((obs) => obs.disconnect());
    this.container.retina.init();
    this.initBackground();
    this._safeMutationObserver((obs) => {
      if (!this.element || !(this.element instanceof Node)) {
        return;
      }
      obs.observe(this.element, { attributes: true });
    });
  }
  paint() {
    const options = this.container.actualOptions;
    this.draw((ctx) => {
      if (options.backgroundMask.enable && options.backgroundMask.cover) {
        clear(ctx, this.size);
        if (this._coverImage) {
          this._paintImage(this._coverImage.image, this._coverImage.opacity);
        } else if (this._coverColorStyle) {
          this._paintBase(this._coverColorStyle);
        } else {
          this._paintBase();
        }
      } else {
        this._paintBase();
      }
    });
  }
  resize() {
    if (!this.element) {
      return false;
    }
    const container = this.container, currentSize = container.canvas._standardSize, newSize = {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    }, pxRatio = container.retina.pixelRatio, retinaSize = {
      width: newSize.width * pxRatio,
      height: newSize.height * pxRatio
    };
    if (newSize.height === currentSize.height && newSize.width === currentSize.width && retinaSize.height === this.element.height && retinaSize.width === this.element.width) {
      return false;
    }
    const oldSize = { ...currentSize };
    currentSize.height = newSize.height;
    currentSize.width = newSize.width;
    const canvasSize = this.size;
    this.element.width = canvasSize.width = retinaSize.width;
    this.element.height = canvasSize.height = retinaSize.height;
    if (this.container.started) {
      container.particles.setResizeFactor({
        width: currentSize.width / oldSize.width,
        height: currentSize.height / oldSize.height
      });
    }
    return true;
  }
  setPointerEvents(type) {
    const element = this.element;
    if (!element) {
      return;
    }
    this._pointerEvents = type;
    this._repairStyle();
  }
  stop() {
    this._safeMutationObserver((obs) => obs.disconnect());
    this._mutationObserver = void 0;
    this.draw((ctx) => clear(ctx, this.size));
  }
  async windowResize() {
    if (!this.element || !this.resize()) {
      return;
    }
    const container = this.container, needsRefresh = container.updateActualOptions();
    container.particles.setDensity();
    this._applyResizePlugins();
    if (needsRefresh) {
      await container.refresh();
    }
  }
}
var InteractivityDetect;
(function(InteractivityDetect2) {
  InteractivityDetect2["canvas"] = "canvas";
  InteractivityDetect2["parent"] = "parent";
  InteractivityDetect2["window"] = "window";
})(InteractivityDetect || (InteractivityDetect = {}));
function manageListener(element, event, handler, add, options) {
  if (add) {
    let addOptions = { passive: true };
    if (isBoolean(options)) {
      addOptions.capture = options;
    } else if (options !== void 0) {
      addOptions = options;
    }
    element.addEventListener(event, handler, addOptions);
  } else {
    const removeOptions = options;
    element.removeEventListener(event, handler, removeOptions);
  }
}
class EventListeners {
  constructor(container) {
    this.container = container;
    this._doMouseTouchClick = (e) => {
      const container2 = this.container, options = container2.actualOptions;
      if (this._canPush) {
        const mouseInteractivity = container2.interactivity.mouse, mousePos = mouseInteractivity.position;
        if (!mousePos) {
          return;
        }
        mouseInteractivity.clickPosition = { ...mousePos };
        mouseInteractivity.clickTime = (/* @__PURE__ */ new Date()).getTime();
        const onClick = options.interactivity.events.onClick;
        executeOnSingleOrMultiple(onClick.mode, (mode) => this.container.handleClickMode(mode));
      }
      if (e.type === "touchend") {
        setTimeout(() => this._mouseTouchFinish(), touchDelay);
      }
    };
    this._handleThemeChange = (e) => {
      const mediaEvent = e, container2 = this.container, options = container2.options, defaultThemes = options.defaultThemes, themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light, theme = options.themes.find((theme2) => theme2.name === themeName);
      if (theme?.default.auto) {
        void container2.loadTheme(themeName);
      }
    };
    this._handleVisibilityChange = () => {
      const container2 = this.container, options = container2.actualOptions;
      this._mouseTouchFinish();
      if (!options.pauseOnBlur) {
        return;
      }
      if (document?.hidden) {
        container2.pageHidden = true;
        container2.pause();
      } else {
        container2.pageHidden = false;
        if (container2.animationStatus) {
          void container2.play(true);
        } else {
          void container2.draw(true);
        }
      }
    };
    this._handleWindowResize = () => {
      if (this._resizeTimeout) {
        clearTimeout(this._resizeTimeout);
        delete this._resizeTimeout;
      }
      const handleResize = async () => {
        const canvas = this.container.canvas;
        await canvas?.windowResize();
      };
      this._resizeTimeout = setTimeout(() => void handleResize(), this.container.actualOptions.interactivity.events.resize.delay * millisecondsToSeconds);
    };
    this._manageInteractivityListeners = (mouseLeaveTmpEvent, add) => {
      const handlers = this._handlers, container2 = this.container, options = container2.actualOptions, interactivityEl = container2.interactivity.element;
      if (!interactivityEl) {
        return;
      }
      const html = interactivityEl, canvas = container2.canvas;
      canvas.setPointerEvents(html === canvas.element ? "initial" : "none");
      if (!(options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable)) {
        return;
      }
      manageListener(interactivityEl, mouseMoveEvent, handlers.mouseMove, add);
      manageListener(interactivityEl, touchStartEvent, handlers.touchStart, add);
      manageListener(interactivityEl, touchMoveEvent, handlers.touchMove, add);
      if (!options.interactivity.events.onClick.enable) {
        manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
      } else {
        manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
        manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
        manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
      }
      manageListener(interactivityEl, mouseLeaveTmpEvent, handlers.mouseLeave, add);
      manageListener(interactivityEl, touchCancelEvent, handlers.touchCancel, add);
    };
    this._manageListeners = (add) => {
      const handlers = this._handlers, container2 = this.container, options = container2.actualOptions, detectType = options.interactivity.detectsOn, canvasEl = container2.canvas.element;
      let mouseLeaveTmpEvent = mouseLeaveEvent;
      if (detectType === InteractivityDetect.window) {
        container2.interactivity.element = window;
        mouseLeaveTmpEvent = mouseOutEvent;
      } else if (detectType === InteractivityDetect.parent && canvasEl) {
        container2.interactivity.element = canvasEl.parentElement ?? canvasEl.parentNode;
      } else {
        container2.interactivity.element = canvasEl;
      }
      this._manageMediaMatch(add);
      this._manageResize(add);
      this._manageInteractivityListeners(mouseLeaveTmpEvent, add);
      if (document) {
        manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
      }
    };
    this._manageMediaMatch = (add) => {
      const handlers = this._handlers, mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)");
      if (!mediaMatch) {
        return;
      }
      if (mediaMatch.addEventListener !== void 0) {
        manageListener(mediaMatch, "change", handlers.themeChange, add);
        return;
      }
      if (mediaMatch.addListener === void 0) {
        return;
      }
      if (add) {
        mediaMatch.addListener(handlers.oldThemeChange);
      } else {
        mediaMatch.removeListener(handlers.oldThemeChange);
      }
    };
    this._manageResize = (add) => {
      const handlers = this._handlers, container2 = this.container, options = container2.actualOptions;
      if (!options.interactivity.events.resize) {
        return;
      }
      if (typeof ResizeObserver === "undefined") {
        manageListener(window, resizeEvent, handlers.resize, add);
        return;
      }
      const canvasEl = container2.canvas.element;
      if (this._resizeObserver && !add) {
        if (canvasEl) {
          this._resizeObserver.unobserve(canvasEl);
        }
        this._resizeObserver.disconnect();
        delete this._resizeObserver;
      } else if (!this._resizeObserver && add && canvasEl) {
        this._resizeObserver = new ResizeObserver((entries) => {
          const entry = entries.find((e) => e.target === canvasEl);
          if (!entry) {
            return;
          }
          this._handleWindowResize();
        });
        this._resizeObserver.observe(canvasEl);
      }
    };
    this._mouseDown = () => {
      const { interactivity } = this.container;
      if (!interactivity) {
        return;
      }
      const { mouse } = interactivity;
      mouse.clicking = true;
      mouse.downPosition = mouse.position;
    };
    this._mouseTouchClick = (e) => {
      const container2 = this.container, options = container2.actualOptions, { mouse } = container2.interactivity;
      mouse.inside = true;
      let handled = false;
      const mousePosition = mouse.position;
      if (!mousePosition || !options.interactivity.events.onClick.enable) {
        return;
      }
      for (const plugin of container2.plugins.values()) {
        if (!plugin.clickPositionValid) {
          continue;
        }
        handled = plugin.clickPositionValid(mousePosition);
        if (handled) {
          break;
        }
      }
      if (!handled) {
        this._doMouseTouchClick(e);
      }
      mouse.clicking = false;
    };
    this._mouseTouchFinish = () => {
      const interactivity = this.container.interactivity;
      if (!interactivity) {
        return;
      }
      const mouse = interactivity.mouse;
      delete mouse.position;
      delete mouse.clickPosition;
      delete mouse.downPosition;
      interactivity.status = mouseLeaveEvent;
      mouse.inside = false;
      mouse.clicking = false;
    };
    this._mouseTouchMove = (e) => {
      const container2 = this.container, options = container2.actualOptions, interactivity = container2.interactivity, canvasEl = container2.canvas.element;
      if (!interactivity?.element) {
        return;
      }
      interactivity.mouse.inside = true;
      let pos;
      if (e.type.startsWith("pointer")) {
        this._canPush = true;
        const mouseEvent = e;
        if (interactivity.element === window) {
          if (canvasEl) {
            const clientRect = canvasEl.getBoundingClientRect();
            pos = {
              x: mouseEvent.clientX - clientRect.left,
              y: mouseEvent.clientY - clientRect.top
            };
          }
        } else if (options.interactivity.detectsOn === InteractivityDetect.parent) {
          const source = mouseEvent.target, target = mouseEvent.currentTarget;
          if (source && target && canvasEl) {
            const sourceRect = source.getBoundingClientRect(), targetRect = target.getBoundingClientRect(), canvasRect = canvasEl.getBoundingClientRect();
            pos = {
              x: mouseEvent.offsetX + double * sourceRect.left - (targetRect.left + canvasRect.left),
              y: mouseEvent.offsetY + double * sourceRect.top - (targetRect.top + canvasRect.top)
            };
          } else {
            pos = {
              x: mouseEvent.offsetX ?? mouseEvent.clientX,
              y: mouseEvent.offsetY ?? mouseEvent.clientY
            };
          }
        } else if (mouseEvent.target === canvasEl) {
          pos = {
            x: mouseEvent.offsetX ?? mouseEvent.clientX,
            y: mouseEvent.offsetY ?? mouseEvent.clientY
          };
        }
      } else {
        this._canPush = e.type !== "touchmove";
        if (canvasEl) {
          const touchEvent = e, lastTouch = touchEvent.touches[touchEvent.touches.length - lengthOffset], canvasRect = canvasEl.getBoundingClientRect();
          pos = {
            x: lastTouch.clientX - (canvasRect.left ?? minCoordinate),
            y: lastTouch.clientY - (canvasRect.top ?? minCoordinate)
          };
        }
      }
      const pxRatio = container2.retina.pixelRatio;
      if (pos) {
        pos.x *= pxRatio;
        pos.y *= pxRatio;
      }
      interactivity.mouse.position = pos;
      interactivity.status = mouseMoveEvent;
    };
    this._touchEnd = (e) => {
      const evt = e, touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.delete(touch.identifier);
      }
      this._mouseTouchFinish();
    };
    this._touchEndClick = (e) => {
      const evt = e, touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.delete(touch.identifier);
      }
      this._mouseTouchClick(e);
    };
    this._touchStart = (e) => {
      const evt = e, touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.set(touch.identifier, performance.now());
      }
      this._mouseTouchMove(e);
    };
    this._canPush = true;
    this._touches = /* @__PURE__ */ new Map();
    this._handlers = {
      mouseDown: () => this._mouseDown(),
      mouseLeave: () => this._mouseTouchFinish(),
      mouseMove: (e) => this._mouseTouchMove(e),
      mouseUp: (e) => this._mouseTouchClick(e),
      touchStart: (e) => this._touchStart(e),
      touchMove: (e) => this._mouseTouchMove(e),
      touchEnd: (e) => this._touchEnd(e),
      touchCancel: (e) => this._touchEnd(e),
      touchEndClick: (e) => this._touchEndClick(e),
      visibilityChange: () => this._handleVisibilityChange(),
      themeChange: (e) => this._handleThemeChange(e),
      oldThemeChange: (e) => this._handleThemeChange(e),
      resize: () => {
        this._handleWindowResize();
      }
    };
  }
  addListeners() {
    this._manageListeners(true);
  }
  removeListeners() {
    this._manageListeners(false);
  }
}
var EventType;
(function(EventType2) {
  EventType2["configAdded"] = "configAdded";
  EventType2["containerInit"] = "containerInit";
  EventType2["particlesSetup"] = "particlesSetup";
  EventType2["containerStarted"] = "containerStarted";
  EventType2["containerStopped"] = "containerStopped";
  EventType2["containerDestroyed"] = "containerDestroyed";
  EventType2["containerPaused"] = "containerPaused";
  EventType2["containerPlay"] = "containerPlay";
  EventType2["containerBuilt"] = "containerBuilt";
  EventType2["particleAdded"] = "particleAdded";
  EventType2["particleDestroyed"] = "particleDestroyed";
  EventType2["particleRemoved"] = "particleRemoved";
})(EventType || (EventType = {}));
class Background {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "";
    this.image = "";
    this.position = "";
    this.repeat = "";
    this.size = "";
    this.opacity = 1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.image !== void 0) {
      this.image = data.image;
    }
    if (data.position !== void 0) {
      this.position = data.position;
    }
    if (data.repeat !== void 0) {
      this.repeat = data.repeat;
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
}
class BackgroundMaskCover {
  constructor() {
    this.opacity = 1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.image !== void 0) {
      this.image = data.image;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
}
class BackgroundMask {
  constructor() {
    this.composite = "destination-out";
    this.cover = new BackgroundMaskCover();
    this.enable = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.composite !== void 0) {
      this.composite = data.composite;
    }
    if (data.cover !== void 0) {
      const cover = data.cover, color = isString(data.cover) ? { color: data.cover } : data.cover;
      this.cover.load(cover.color !== void 0 || cover.image !== void 0 ? cover : { color });
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
}
class FullScreen {
  constructor() {
    this.enable = true;
    this.zIndex = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.zIndex !== void 0) {
      this.zIndex = data.zIndex;
    }
  }
}
class ClickEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
  }
}
class DivEvent {
  constructor() {
    this.selectors = [];
    this.enable = false;
    this.mode = [];
    this.type = DivType.circle;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
}
class Parallax {
  constructor() {
    this.enable = false;
    this.force = 2;
    this.smooth = 10;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.force !== void 0) {
      this.force = data.force;
    }
    if (data.smooth !== void 0) {
      this.smooth = data.smooth;
    }
  }
}
class HoverEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
    this.parallax = new Parallax();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    this.parallax.load(data.parallax);
  }
}
class ResizeEvent {
  constructor() {
    this.delay = 0.5;
    this.enable = true;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.delay !== void 0) {
      this.delay = data.delay;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
}
class Events {
  constructor() {
    this.onClick = new ClickEvent();
    this.onDiv = new DivEvent();
    this.onHover = new HoverEvent();
    this.resize = new ResizeEvent();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.onClick.load(data.onClick);
    const onDiv = data.onDiv;
    if (onDiv !== void 0) {
      this.onDiv = executeOnSingleOrMultiple(onDiv, (t) => {
        const tmp = new DivEvent();
        tmp.load(t);
        return tmp;
      });
    }
    this.onHover.load(data.onHover);
    this.resize.load(data.resize);
  }
}
class Modes {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (!this._container) {
      return;
    }
    const interactors = this._engine.interactors.get(this._container);
    if (!interactors) {
      return;
    }
    for (const interactor of interactors) {
      if (!interactor.loadModeOptions) {
        continue;
      }
      interactor.loadModeOptions(this, data);
    }
  }
}
class Interactivity {
  constructor(engine, container) {
    this.detectsOn = InteractivityDetect.window;
    this.events = new Events();
    this.modes = new Modes(engine, container);
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    const detectsOn = data.detectsOn;
    if (detectsOn !== void 0) {
      this.detectsOn = detectsOn;
    }
    this.events.load(data.events);
    this.modes.load(data.modes);
  }
}
class ManualParticle {
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.position) {
      this.position = {
        x: data.position.x ?? manualDefaultPosition,
        y: data.position.y ?? manualDefaultPosition,
        mode: data.position.mode ?? PixelMode.percent
      };
    }
    if (data.options) {
      this.options = deepExtend({}, data.options);
    }
  }
}
var ResponsiveMode;
(function(ResponsiveMode2) {
  ResponsiveMode2["screen"] = "screen";
  ResponsiveMode2["canvas"] = "canvas";
})(ResponsiveMode || (ResponsiveMode = {}));
class Responsive {
  constructor() {
    this.maxWidth = Infinity;
    this.options = {};
    this.mode = ResponsiveMode.canvas;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (!isNull(data.maxWidth)) {
      this.maxWidth = data.maxWidth;
    }
    if (!isNull(data.mode)) {
      if (data.mode === ResponsiveMode.screen) {
        this.mode = ResponsiveMode.screen;
      } else {
        this.mode = ResponsiveMode.canvas;
      }
    }
    if (!isNull(data.options)) {
      this.options = deepExtend({}, data.options);
    }
  }
}
var ThemeMode;
(function(ThemeMode2) {
  ThemeMode2["any"] = "any";
  ThemeMode2["dark"] = "dark";
  ThemeMode2["light"] = "light";
})(ThemeMode || (ThemeMode = {}));
class ThemeDefault {
  constructor() {
    this.auto = false;
    this.mode = ThemeMode.any;
    this.value = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.auto !== void 0) {
      this.auto = data.auto;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
}
class Theme {
  constructor() {
    this.name = "";
    this.default = new ThemeDefault();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.name !== void 0) {
      this.name = data.name;
    }
    this.default.load(data.default);
    if (data.options !== void 0) {
      this.options = deepExtend({}, data.options);
    }
  }
}
class ColorAnimation extends AnimationOptions {
  constructor() {
    super();
    this.offset = 0;
    this.sync = true;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.offset !== void 0) {
      this.offset = setRangeValue(data.offset);
    }
  }
}
class HslAnimation {
  constructor() {
    this.h = new ColorAnimation();
    this.s = new ColorAnimation();
    this.l = new ColorAnimation();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.h.load(data.h);
    this.s.load(data.s);
    this.l.load(data.l);
  }
}
class AnimatableColor extends OptionsColor {
  constructor() {
    super();
    this.animation = new HslAnimation();
  }
  static create(source, data) {
    const color = new AnimatableColor();
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
    super.load(data);
    if (isNull(data)) {
      return;
    }
    const colorAnimation = data.animation;
    if (colorAnimation !== void 0) {
      if (colorAnimation.enable !== void 0) {
        this.animation.h.load(colorAnimation);
      } else {
        this.animation.load(data.animation);
      }
    }
  }
}
class CollisionsAbsorb {
  constructor() {
    this.speed = 2;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
  }
}
class CollisionsOverlap {
  constructor() {
    this.enable = true;
    this.retries = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.retries !== void 0) {
      this.retries = data.retries;
    }
  }
}
class ParticlesBounceFactor extends ValueWithRandom {
  constructor() {
    super();
    this.value = 1;
  }
}
class ParticlesBounce {
  constructor() {
    this.horizontal = new ParticlesBounceFactor();
    this.vertical = new ParticlesBounceFactor();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.horizontal.load(data.horizontal);
    this.vertical.load(data.vertical);
  }
}
class Collisions {
  constructor() {
    this.absorb = new CollisionsAbsorb();
    this.bounce = new ParticlesBounce();
    this.enable = false;
    this.maxSpeed = 50;
    this.mode = CollisionMode.bounce;
    this.overlap = new CollisionsOverlap();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.absorb.load(data.absorb);
    this.bounce.load(data.bounce);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = setRangeValue(data.maxSpeed);
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    this.overlap.load(data.overlap);
  }
}
class Effect {
  constructor() {
    this.close = true;
    this.fill = true;
    this.options = {};
    this.type = [];
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    const options = data.options;
    if (options !== void 0) {
      for (const effect in options) {
        const item = options[effect];
        if (item) {
          this.options[effect] = deepExtend(this.options[effect] ?? {}, item);
        }
      }
    }
    if (data.close !== void 0) {
      this.close = data.close;
    }
    if (data.fill !== void 0) {
      this.fill = data.fill;
    }
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
}
class MoveAngle {
  constructor() {
    this.offset = 0;
    this.value = 90;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.offset !== void 0) {
      this.offset = setRangeValue(data.offset);
    }
    if (data.value !== void 0) {
      this.value = setRangeValue(data.value);
    }
  }
}
class MoveAttract {
  constructor() {
    this.distance = 200;
    this.enable = false;
    this.rotate = {
      x: 3e3,
      y: 3e3
    };
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = setRangeValue(data.distance);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.rotate) {
      const rotateX = data.rotate.x;
      if (rotateX !== void 0) {
        this.rotate.x = rotateX;
      }
      const rotateY = data.rotate.y;
      if (rotateY !== void 0) {
        this.rotate.y = rotateY;
      }
    }
  }
}
class MoveCenter {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.mode = PixelMode.percent;
    this.radius = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.x !== void 0) {
      this.x = data.x;
    }
    if (data.y !== void 0) {
      this.y = data.y;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
}
class MoveGravity {
  constructor() {
    this.acceleration = 9.81;
    this.enable = false;
    this.inverse = false;
    this.maxSpeed = 50;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.acceleration !== void 0) {
      this.acceleration = setRangeValue(data.acceleration);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.inverse !== void 0) {
      this.inverse = data.inverse;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = setRangeValue(data.maxSpeed);
    }
  }
}
class MovePath {
  constructor() {
    this.clamp = true;
    this.delay = new ValueWithRandom();
    this.enable = false;
    this.options = {};
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.clamp !== void 0) {
      this.clamp = data.clamp;
    }
    this.delay.load(data.delay);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.generator = data.generator;
    if (data.options) {
      this.options = deepExtend(this.options, data.options);
    }
  }
}
class MoveTrailFill {
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.image !== void 0) {
      this.image = data.image;
    }
  }
}
class MoveTrail {
  constructor() {
    this.enable = false;
    this.length = 10;
    this.fill = new MoveTrailFill();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.fill !== void 0) {
      this.fill.load(data.fill);
    }
    if (data.length !== void 0) {
      this.length = data.length;
    }
  }
}
class OutModes {
  constructor() {
    this.default = OutMode.out;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.default !== void 0) {
      this.default = data.default;
    }
    this.bottom = data.bottom ?? data.default;
    this.left = data.left ?? data.default;
    this.right = data.right ?? data.default;
    this.top = data.top ?? data.default;
  }
}
class Spin {
  constructor() {
    this.acceleration = 0;
    this.enable = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.acceleration !== void 0) {
      this.acceleration = setRangeValue(data.acceleration);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.position) {
      this.position = deepExtend({}, data.position);
    }
  }
}
class Move {
  constructor() {
    this.angle = new MoveAngle();
    this.attract = new MoveAttract();
    this.center = new MoveCenter();
    this.decay = 0;
    this.distance = {};
    this.direction = MoveDirection.none;
    this.drift = 0;
    this.enable = false;
    this.gravity = new MoveGravity();
    this.path = new MovePath();
    this.outModes = new OutModes();
    this.random = false;
    this.size = false;
    this.speed = 2;
    this.spin = new Spin();
    this.straight = false;
    this.trail = new MoveTrail();
    this.vibrate = false;
    this.warp = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.angle.load(isNumber(data.angle) ? { value: data.angle } : data.angle);
    this.attract.load(data.attract);
    this.center.load(data.center);
    if (data.decay !== void 0) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    if (data.distance !== void 0) {
      this.distance = isNumber(data.distance) ? {
        horizontal: data.distance,
        vertical: data.distance
      } : { ...data.distance };
    }
    if (data.drift !== void 0) {
      this.drift = setRangeValue(data.drift);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.gravity.load(data.gravity);
    const outModes = data.outModes;
    if (outModes !== void 0) {
      if (isObject(outModes)) {
        this.outModes.load(outModes);
      } else {
        this.outModes.load({
          default: outModes
        });
      }
    }
    this.path.load(data.path);
    if (data.random !== void 0) {
      this.random = data.random;
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
    this.spin.load(data.spin);
    if (data.straight !== void 0) {
      this.straight = data.straight;
    }
    this.trail.load(data.trail);
    if (data.vibrate !== void 0) {
      this.vibrate = data.vibrate;
    }
    if (data.warp !== void 0) {
      this.warp = data.warp;
    }
  }
}
class OpacityAnimation extends RangedAnimationOptions {
  constructor() {
    super();
    this.destroy = DestroyType.none;
    this.speed = 2;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.destroy !== void 0) {
      this.destroy = data.destroy;
    }
  }
}
class Opacity extends RangedAnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new OpacityAnimation();
    this.value = 1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    super.load(data);
    const animation = data.animation;
    if (animation !== void 0) {
      this.animation.load(animation);
    }
  }
}
class ParticlesDensity {
  constructor() {
    this.enable = false;
    this.width = 1920;
    this.height = 1080;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    const width = data.width;
    if (width !== void 0) {
      this.width = width;
    }
    const height = data.height;
    if (height !== void 0) {
      this.height = height;
    }
  }
}
var LimitMode;
(function(LimitMode2) {
  LimitMode2["delete"] = "delete";
  LimitMode2["wait"] = "wait";
})(LimitMode || (LimitMode = {}));
class ParticlesNumberLimit {
  constructor() {
    this.mode = LimitMode.delete;
    this.value = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
}
class ParticlesNumber {
  constructor() {
    this.density = new ParticlesDensity();
    this.limit = new ParticlesNumberLimit();
    this.value = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.density.load(data.density);
    this.limit.load(data.limit);
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
}
class Shadow {
  constructor() {
    this.blur = 0;
    this.color = new OptionsColor();
    this.enable = false;
    this.offset = {
      x: 0,
      y: 0
    };
    this.color.value = "#000";
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.blur !== void 0) {
      this.blur = data.blur;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.offset === void 0) {
      return;
    }
    if (data.offset.x !== void 0) {
      this.offset.x = data.offset.x;
    }
    if (data.offset.y !== void 0) {
      this.offset.y = data.offset.y;
    }
  }
}
class Shape {
  constructor() {
    this.close = true;
    this.fill = true;
    this.options = {};
    this.type = "circle";
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    const options = data.options;
    if (options !== void 0) {
      for (const shape in options) {
        const item = options[shape];
        if (item) {
          this.options[shape] = deepExtend(this.options[shape] ?? {}, item);
        }
      }
    }
    if (data.close !== void 0) {
      this.close = data.close;
    }
    if (data.fill !== void 0) {
      this.fill = data.fill;
    }
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
}
class SizeAnimation extends RangedAnimationOptions {
  constructor() {
    super();
    this.destroy = DestroyType.none;
    this.speed = 5;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.destroy !== void 0) {
      this.destroy = data.destroy;
    }
  }
}
class Size extends RangedAnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new SizeAnimation();
    this.value = 3;
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
class Stroke {
  constructor() {
    this.width = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = AnimatableColor.create(this.color, data.color);
    }
    if (data.width !== void 0) {
      this.width = setRangeValue(data.width);
    }
    if (data.opacity !== void 0) {
      this.opacity = setRangeValue(data.opacity);
    }
  }
}
class ZIndex extends ValueWithRandom {
  constructor() {
    super();
    this.opacityRate = 1;
    this.sizeRate = 1;
    this.velocityRate = 1;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.opacityRate !== void 0) {
      this.opacityRate = data.opacityRate;
    }
    if (data.sizeRate !== void 0) {
      this.sizeRate = data.sizeRate;
    }
    if (data.velocityRate !== void 0) {
      this.velocityRate = data.velocityRate;
    }
  }
}
class ParticlesOptions {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
    this.bounce = new ParticlesBounce();
    this.collisions = new Collisions();
    this.color = new AnimatableColor();
    this.color.value = "#fff";
    this.effect = new Effect();
    this.groups = {};
    this.move = new Move();
    this.number = new ParticlesNumber();
    this.opacity = new Opacity();
    this.reduceDuplicates = false;
    this.shadow = new Shadow();
    this.shape = new Shape();
    this.size = new Size();
    this.stroke = new Stroke();
    this.zIndex = new ZIndex();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.groups !== void 0) {
      for (const group of Object.keys(data.groups)) {
        if (!Object.hasOwn(data.groups, group)) {
          continue;
        }
        const item = data.groups[group];
        if (item !== void 0) {
          this.groups[group] = deepExtend(this.groups[group] ?? {}, item);
        }
      }
    }
    if (data.reduceDuplicates !== void 0) {
      this.reduceDuplicates = data.reduceDuplicates;
    }
    this.bounce.load(data.bounce);
    this.color.load(AnimatableColor.create(this.color, data.color));
    this.effect.load(data.effect);
    this.move.load(data.move);
    this.number.load(data.number);
    this.opacity.load(data.opacity);
    this.shape.load(data.shape);
    this.size.load(data.size);
    this.shadow.load(data.shadow);
    this.zIndex.load(data.zIndex);
    this.collisions.load(data.collisions);
    if (data.interactivity !== void 0) {
      this.interactivity = deepExtend({}, data.interactivity);
    }
    const strokeToLoad = data.stroke;
    if (strokeToLoad) {
      this.stroke = executeOnSingleOrMultiple(strokeToLoad, (t) => {
        const tmp = new Stroke();
        tmp.load(t);
        return tmp;
      });
    }
    if (this._container) {
      const updaters = this._engine.updaters.get(this._container);
      if (updaters) {
        for (const updater of updaters) {
          if (updater.loadOptions) {
            updater.loadOptions(this, data);
          }
        }
      }
      const interactors = this._engine.interactors.get(this._container);
      if (interactors) {
        for (const interactor of interactors) {
          if (interactor.loadParticlesOptions) {
            interactor.loadParticlesOptions(this, data);
          }
        }
      }
    }
  }
}
function loadOptions(options, ...sourceOptionsArr) {
  for (const sourceOptions of sourceOptionsArr) {
    options.load(sourceOptions);
  }
}
function loadParticlesOptions(engine, container, ...sourceOptionsArr) {
  const options = new ParticlesOptions(engine, container);
  loadOptions(options, ...sourceOptionsArr);
  return options;
}
class Options {
  constructor(engine, container) {
    this._findDefaultTheme = (mode) => {
      return this.themes.find((theme) => theme.default.value && theme.default.mode === mode) ?? this.themes.find((theme) => theme.default.value && theme.default.mode === ThemeMode.any);
    };
    this._importPreset = (preset) => {
      this.load(this._engine.getPreset(preset));
    };
    this._engine = engine;
    this._container = container;
    this.autoPlay = true;
    this.background = new Background();
    this.backgroundMask = new BackgroundMask();
    this.clear = true;
    this.defaultThemes = {};
    this.delay = 0;
    this.fullScreen = new FullScreen();
    this.detectRetina = true;
    this.duration = 0;
    this.fpsLimit = 120;
    this.interactivity = new Interactivity(engine, container);
    this.manualParticles = [];
    this.particles = loadParticlesOptions(this._engine, this._container);
    this.pauseOnBlur = true;
    this.pauseOnOutsideViewport = true;
    this.responsive = [];
    this.smooth = false;
    this.style = {};
    this.themes = [];
    this.zLayers = 100;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.preset !== void 0) {
      executeOnSingleOrMultiple(data.preset, (preset) => this._importPreset(preset));
    }
    if (data.autoPlay !== void 0) {
      this.autoPlay = data.autoPlay;
    }
    if (data.clear !== void 0) {
      this.clear = data.clear;
    }
    if (data.key !== void 0) {
      this.key = data.key;
    }
    if (data.name !== void 0) {
      this.name = data.name;
    }
    if (data.delay !== void 0) {
      this.delay = setRangeValue(data.delay);
    }
    const detectRetina = data.detectRetina;
    if (detectRetina !== void 0) {
      this.detectRetina = detectRetina;
    }
    if (data.duration !== void 0) {
      this.duration = setRangeValue(data.duration);
    }
    const fpsLimit = data.fpsLimit;
    if (fpsLimit !== void 0) {
      this.fpsLimit = fpsLimit;
    }
    if (data.pauseOnBlur !== void 0) {
      this.pauseOnBlur = data.pauseOnBlur;
    }
    if (data.pauseOnOutsideViewport !== void 0) {
      this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
    }
    if (data.zLayers !== void 0) {
      this.zLayers = data.zLayers;
    }
    this.background.load(data.background);
    const fullScreen = data.fullScreen;
    if (isBoolean(fullScreen)) {
      this.fullScreen.enable = fullScreen;
    } else {
      this.fullScreen.load(fullScreen);
    }
    this.backgroundMask.load(data.backgroundMask);
    this.interactivity.load(data.interactivity);
    if (data.manualParticles) {
      this.manualParticles = data.manualParticles.map((t) => {
        const tmp = new ManualParticle();
        tmp.load(t);
        return tmp;
      });
    }
    this.particles.load(data.particles);
    this.style = deepExtend(this.style, data.style);
    this._engine.loadOptions(this, data);
    if (data.smooth !== void 0) {
      this.smooth = data.smooth;
    }
    const interactors = this._engine.interactors.get(this._container);
    if (interactors) {
      for (const interactor of interactors) {
        if (interactor.loadOptions) {
          interactor.loadOptions(this, data);
        }
      }
    }
    if (data.responsive !== void 0) {
      for (const responsive of data.responsive) {
        const optResponsive = new Responsive();
        optResponsive.load(responsive);
        this.responsive.push(optResponsive);
      }
    }
    this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
    if (data.themes !== void 0) {
      for (const theme of data.themes) {
        const existingTheme = this.themes.find((t) => t.name === theme.name);
        if (!existingTheme) {
          const optTheme = new Theme();
          optTheme.load(theme);
          this.themes.push(optTheme);
        } else {
          existingTheme.load(theme);
        }
      }
    }
    this.defaultThemes.dark = this._findDefaultTheme(ThemeMode.dark)?.name;
    this.defaultThemes.light = this._findDefaultTheme(ThemeMode.light)?.name;
  }
  setResponsive(width, pxRatio, defaultOptions) {
    this.load(defaultOptions);
    const responsiveOptions = this.responsive.find((t) => t.mode === ResponsiveMode.screen && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width);
    this.load(responsiveOptions?.options);
    return responsiveOptions?.maxWidth;
  }
  setTheme(name) {
    if (name) {
      const chosenTheme = this.themes.find((theme) => theme.name === name);
      if (chosenTheme) {
        this.load(chosenTheme.options);
      }
    } else {
      const mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)"), clientDarkMode = mediaMatch?.matches, defaultTheme = this._findDefaultTheme(clientDarkMode ? ThemeMode.dark : ThemeMode.light);
      if (defaultTheme) {
        this.load(defaultTheme.options);
      }
    }
  }
}
class InteractionManager {
  constructor(engine, container) {
    this.container = container;
    this._engine = engine;
    this._interactors = [];
    this._externalInteractors = [];
    this._particleInteractors = [];
  }
  externalInteract(delta) {
    for (const interactor of this._externalInteractors) {
      if (interactor.isEnabled()) {
        interactor.interact(delta);
      }
    }
  }
  handleClickMode(mode) {
    for (const interactor of this._externalInteractors) {
      interactor.handleClickMode?.(mode);
    }
  }
  async init() {
    this._interactors = await this._engine.getInteractors(this.container, true);
    this._externalInteractors = [];
    this._particleInteractors = [];
    for (const interactor of this._interactors) {
      switch (interactor.type) {
        case InteractorType.external:
          this._externalInteractors.push(interactor);
          break;
        case InteractorType.particles:
          this._particleInteractors.push(interactor);
          break;
      }
      interactor.init();
    }
  }
  particlesInteract(particle, delta) {
    for (const interactor of this._externalInteractors) {
      interactor.clear(particle, delta);
    }
    for (const interactor of this._particleInteractors) {
      if (interactor.isEnabled(particle)) {
        interactor.interact(particle, delta);
      }
    }
  }
  reset(particle) {
    for (const interactor of this._externalInteractors) {
      if (interactor.isEnabled()) {
        interactor.reset(particle);
      }
    }
    for (const interactor of this._particleInteractors) {
      if (interactor.isEnabled(particle)) {
        interactor.reset(particle);
      }
    }
  }
}
function loadEffectData(effect, effectOptions, id, reduceDuplicates) {
  const effectData = effectOptions.options[effect];
  if (!effectData) {
    return;
  }
  return deepExtend({
    close: effectOptions.close,
    fill: effectOptions.fill
  }, itemFromSingleOrMultiple(effectData, id, reduceDuplicates));
}
function loadShapeData(shape, shapeOptions, id, reduceDuplicates) {
  const shapeData = shapeOptions.options[shape];
  if (!shapeData) {
    return;
  }
  return deepExtend({
    close: shapeOptions.close,
    fill: shapeOptions.fill
  }, itemFromSingleOrMultiple(shapeData, id, reduceDuplicates));
}
function fixOutMode(data) {
  if (!isInArray(data.outMode, data.checkModes)) {
    return;
  }
  const diameter = data.radius * double;
  if (data.coord > data.maxCoord - diameter) {
    data.setCb(-data.radius);
  } else if (data.coord < diameter) {
    data.setCb(data.radius);
  }
}
class Particle {
  constructor(engine, container) {
    this.container = container;
    this._calcPosition = (container2, position, zIndex, tryCount = defaultRetryCount) => {
      for (const plugin of container2.plugins.values()) {
        const pluginPos = plugin.particlePosition !== void 0 ? plugin.particlePosition(position, this) : void 0;
        if (pluginPos) {
          return Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
        }
      }
      const canvasSize = container2.canvas.size, exactPosition = calcExactPositionOrRandomFromSize({
        size: canvasSize,
        position
      }), pos = Vector3d.create(exactPosition.x, exactPosition.y, zIndex), radius = this.getRadius(), outModes = this.options.move.outModes, fixHorizontal = (outMode) => {
        fixOutMode({
          outMode,
          checkModes: [OutMode.bounce],
          coord: pos.x,
          maxCoord: container2.canvas.size.width,
          setCb: (value) => pos.x += value,
          radius
        });
      }, fixVertical = (outMode) => {
        fixOutMode({
          outMode,
          checkModes: [OutMode.bounce],
          coord: pos.y,
          maxCoord: container2.canvas.size.height,
          setCb: (value) => pos.y += value,
          radius
        });
      };
      fixHorizontal(outModes.left ?? outModes.default);
      fixHorizontal(outModes.right ?? outModes.default);
      fixVertical(outModes.top ?? outModes.default);
      fixVertical(outModes.bottom ?? outModes.default);
      if (this._checkOverlap(pos, tryCount)) {
        return this._calcPosition(container2, void 0, zIndex, tryCount + tryCountIncrement);
      }
      return pos;
    };
    this._calculateVelocity = () => {
      const baseVelocity = getParticleBaseVelocity(this.direction), res = baseVelocity.copy(), moveOptions = this.options.move;
      if (moveOptions.direction === MoveDirection.inside || moveOptions.direction === MoveDirection.outside) {
        return res;
      }
      const rad = degToRad(getRangeValue(moveOptions.angle.value)), radOffset = degToRad(getRangeValue(moveOptions.angle.offset)), range = {
        left: radOffset - rad * half,
        right: radOffset + rad * half
      };
      if (!moveOptions.straight) {
        res.angle += randomInRange(setRangeValue(range.left, range.right));
      }
      if (moveOptions.random && typeof moveOptions.speed === "number") {
        res.length *= getRandom();
      }
      return res;
    };
    this._checkOverlap = (pos, tryCount = defaultRetryCount) => {
      const collisionsOptions = this.options.collisions, radius = this.getRadius();
      if (!collisionsOptions.enable) {
        return false;
      }
      const overlapOptions = collisionsOptions.overlap;
      if (overlapOptions.enable) {
        return false;
      }
      const retries = overlapOptions.retries;
      if (retries >= minRetries && tryCount > retries) {
        throw new Error(`${errorPrefix} particle is overlapping and can't be placed`);
      }
      return !!this.container.particles.find((particle) => getDistance(pos, particle.position) < radius + particle.getRadius());
    };
    this._getRollColor = (color) => {
      if (!color || !this.roll || !this.backColor && !this.roll.alter) {
        return color;
      }
      const backFactor = this.roll.horizontal && this.roll.vertical ? double * rollFactor : rollFactor, backSum = this.roll.horizontal ? Math.PI * half : none, rolled = Math.floor(((this.roll.angle ?? none) + backSum) / (Math.PI / backFactor)) % double;
      if (!rolled) {
        return color;
      }
      if (this.backColor) {
        return this.backColor;
      }
      if (this.roll.alter) {
        return alterHsl(color, this.roll.alter.type, this.roll.alter.value);
      }
      return color;
    };
    this._initPosition = (position) => {
      const container2 = this.container, zIndexValue = getRangeValue(this.options.zIndex.value);
      this.position = this._calcPosition(container2, position, clamp(zIndexValue, minZ, container2.zLayers));
      this.initialPosition = this.position.copy();
      const canvasSize = container2.canvas.size;
      this.moveCenter = {
        ...getPosition(this.options.move.center, canvasSize),
        radius: this.options.move.center.radius ?? defaultRadius,
        mode: this.options.move.center.mode ?? PixelMode.percent
      };
      this.direction = getParticleDirectionAngle(this.options.move.direction, this.position, this.moveCenter);
      switch (this.options.move.direction) {
        case MoveDirection.inside:
          this.outType = ParticleOutType.inside;
          break;
        case MoveDirection.outside:
          this.outType = ParticleOutType.outside;
          break;
      }
      this.offset = Vector.origin;
    };
    this._engine = engine;
  }
  destroy(override) {
    if (this.unbreakable || this.destroyed) {
      return;
    }
    this.destroyed = true;
    this.bubble.inRange = false;
    this.slow.inRange = false;
    const container = this.container, pathGenerator = this.pathGenerator, shapeDrawer = container.shapeDrawers.get(this.shape);
    shapeDrawer?.particleDestroy?.(this);
    for (const plugin of container.plugins.values()) {
      plugin.particleDestroyed?.(this, override);
    }
    for (const updater of container.particles.updaters) {
      updater.particleDestroyed?.(this, override);
    }
    pathGenerator?.reset(this);
    this._engine.dispatchEvent(EventType.particleDestroyed, {
      container: this.container,
      data: {
        particle: this
      }
    });
  }
  draw(delta) {
    const container = this.container, canvas = container.canvas;
    for (const plugin of container.plugins.values()) {
      canvas.drawParticlePlugin(plugin, this, delta);
    }
    canvas.drawParticle(this, delta);
  }
  getFillColor() {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.color));
  }
  getMass() {
    return this.getRadius() ** squareExp * Math.PI * half;
  }
  getPosition() {
    return {
      x: this.position.x + this.offset.x,
      y: this.position.y + this.offset.y,
      z: this.position.z
    };
  }
  getRadius() {
    return this.bubble.radius ?? this.size.value;
  }
  getStrokeColor() {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.strokeColor));
  }
  init(id, position, overrideOptions, group) {
    const container = this.container, engine = this._engine;
    this.id = id;
    this.group = group;
    this.effectClose = true;
    this.effectFill = true;
    this.shapeClose = true;
    this.shapeFill = true;
    this.pathRotation = false;
    this.lastPathTime = 0;
    this.destroyed = false;
    this.unbreakable = false;
    this.isRotating = false;
    this.rotation = 0;
    this.misplaced = false;
    this.retina = {
      maxDistance: {}
    };
    this.outType = ParticleOutType.normal;
    this.ignoresResizeRatio = true;
    const pxRatio = container.retina.pixelRatio, mainOptions = container.actualOptions, particlesOptions = loadParticlesOptions(this._engine, container, mainOptions.particles), { reduceDuplicates } = particlesOptions, effectType = particlesOptions.effect.type, shapeType = particlesOptions.shape.type;
    this.effect = itemFromSingleOrMultiple(effectType, this.id, reduceDuplicates);
    this.shape = itemFromSingleOrMultiple(shapeType, this.id, reduceDuplicates);
    const effectOptions = particlesOptions.effect, shapeOptions = particlesOptions.shape;
    if (overrideOptions) {
      if (overrideOptions.effect?.type) {
        const overrideEffectType = overrideOptions.effect.type, effect = itemFromSingleOrMultiple(overrideEffectType, this.id, reduceDuplicates);
        if (effect) {
          this.effect = effect;
          effectOptions.load(overrideOptions.effect);
        }
      }
      if (overrideOptions.shape?.type) {
        const overrideShapeType = overrideOptions.shape.type, shape = itemFromSingleOrMultiple(overrideShapeType, this.id, reduceDuplicates);
        if (shape) {
          this.shape = shape;
          shapeOptions.load(overrideOptions.shape);
        }
      }
    }
    if (this.effect === randomColorValue) {
      const availableEffects = [...this.container.effectDrawers.keys()];
      this.effect = availableEffects[Math.floor(getRandom() * availableEffects.length)];
    }
    if (this.shape === randomColorValue) {
      const availableShapes = [...this.container.shapeDrawers.keys()];
      this.shape = availableShapes[Math.floor(getRandom() * availableShapes.length)];
    }
    this.effectData = loadEffectData(this.effect, effectOptions, this.id, reduceDuplicates);
    this.shapeData = loadShapeData(this.shape, shapeOptions, this.id, reduceDuplicates);
    particlesOptions.load(overrideOptions);
    const effectData = this.effectData;
    if (effectData) {
      particlesOptions.load(effectData.particles);
    }
    const shapeData = this.shapeData;
    if (shapeData) {
      particlesOptions.load(shapeData.particles);
    }
    const interactivity = new Interactivity(engine, container);
    interactivity.load(container.actualOptions.interactivity);
    interactivity.load(particlesOptions.interactivity);
    this.interactivity = interactivity;
    this.effectFill = effectData?.fill ?? particlesOptions.effect.fill;
    this.effectClose = effectData?.close ?? particlesOptions.effect.close;
    this.shapeFill = shapeData?.fill ?? particlesOptions.shape.fill;
    this.shapeClose = shapeData?.close ?? particlesOptions.shape.close;
    this.options = particlesOptions;
    const pathOptions = this.options.move.path;
    this.pathDelay = getRangeValue(pathOptions.delay.value) * millisecondsToSeconds;
    if (pathOptions.generator) {
      this.pathGenerator = this._engine.getPathGenerator(pathOptions.generator);
      if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
        this.pathGenerator.init(container);
      }
    }
    container.retina.initParticle(this);
    this.size = initParticleNumericAnimationValue(this.options.size, pxRatio);
    this.bubble = {
      inRange: false
    };
    this.slow = {
      inRange: false,
      factor: 1
    };
    this._initPosition(position);
    this.initialVelocity = this._calculateVelocity();
    this.velocity = this.initialVelocity.copy();
    this.moveDecay = decayOffset - getRangeValue(this.options.move.decay);
    const particles = container.particles;
    particles.setLastZIndex(this.position.z);
    this.zIndexFactor = this.position.z / container.zLayers;
    this.sides = 24;
    let effectDrawer = container.effectDrawers.get(this.effect);
    if (!effectDrawer) {
      effectDrawer = this._engine.getEffectDrawer(this.effect);
      if (effectDrawer) {
        container.effectDrawers.set(this.effect, effectDrawer);
      }
    }
    if (effectDrawer?.loadEffect) {
      effectDrawer.loadEffect(this);
    }
    let shapeDrawer = container.shapeDrawers.get(this.shape);
    if (!shapeDrawer) {
      shapeDrawer = this._engine.getShapeDrawer(this.shape);
      if (shapeDrawer) {
        container.shapeDrawers.set(this.shape, shapeDrawer);
      }
    }
    if (shapeDrawer?.loadShape) {
      shapeDrawer.loadShape(this);
    }
    const sideCountFunc = shapeDrawer?.getSidesCount;
    if (sideCountFunc) {
      this.sides = sideCountFunc(this);
    }
    this.spawning = false;
    this.shadowColor = rangeColorToRgb(this._engine, this.options.shadow.color);
    for (const updater of particles.updaters) {
      updater.init(this);
    }
    for (const mover of particles.movers) {
      mover.init?.(this);
    }
    effectDrawer?.particleInit?.(container, this);
    shapeDrawer?.particleInit?.(container, this);
    for (const plugin of container.plugins.values()) {
      plugin.particleCreated?.(this);
    }
  }
  isInsideCanvas() {
    const radius = this.getRadius(), canvasSize = this.container.canvas.size, position = this.position;
    return position.x >= -radius && position.y >= -radius && position.y <= canvasSize.height + radius && position.x <= canvasSize.width + radius;
  }
  isVisible() {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }
  reset() {
    for (const updater of this.container.particles.updaters) {
      updater.reset?.(this);
    }
  }
}
class Point {
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }
}
class QuadTree {
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this._subdivide = () => {
      const { x, y } = this.rectangle.position, { width, height } = this.rectangle.size, { capacity: capacity2 } = this;
      for (let i = 0; i < subdivideCount; i++) {
        const fixedIndex = i % double;
        this._subs.push(new QuadTree(new Rectangle(x + width * half * fixedIndex, y + height * half * (Math.round(i * half) - fixedIndex), width * half, height * half), capacity2));
      }
      this._divided = true;
    };
    this._points = [];
    this._divided = false;
    this._subs = [];
  }
  insert(point) {
    if (!this.rectangle.contains(point.position)) {
      return false;
    }
    if (this._points.length < this.capacity) {
      this._points.push(point);
      return true;
    }
    if (!this._divided) {
      this._subdivide();
    }
    return this._subs.some((sub) => sub.insert(point));
  }
  query(range, check) {
    const res = [];
    if (!range.intersects(this.rectangle)) {
      return [];
    }
    for (const p of this._points) {
      if (!range.contains(p.position) && getDistance(range.position, p.position) > p.particle.getRadius() && (!check || check(p.particle))) {
        continue;
      }
      res.push(p.particle);
    }
    if (this._divided) {
      for (const sub of this._subs) {
        res.push(...sub.query(range, check));
      }
    }
    return res;
  }
  queryCircle(position, radius, check) {
    return this.query(new Circle(position.x, position.y, radius), check);
  }
  queryRectangle(position, size, check) {
    return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
  }
}
const qTreeRectangle = (canvasSize) => {
  const { height, width } = canvasSize;
  return new Rectangle(posOffset * width, posOffset * height, sizeFactor * width, sizeFactor * height);
};
class Particles {
  constructor(engine, container) {
    this._addToPool = (...particles) => {
      this._pool.push(...particles);
    };
    this._applyDensity = (options, manualCount, group, groupOptions) => {
      const numberOptions = options.number;
      if (!options.number.density?.enable) {
        if (group === void 0) {
          this._limit = numberOptions.limit.value;
        } else if (groupOptions?.number.limit?.value ?? numberOptions.limit.value) {
          this._groupLimits.set(group, groupOptions?.number.limit?.value ?? numberOptions.limit.value);
        }
        return;
      }
      const densityFactor = this._initDensityFactor(numberOptions.density), optParticlesNumber = numberOptions.value, optParticlesLimit = numberOptions.limit.value > minLimit ? numberOptions.limit.value : optParticlesNumber, particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount, particlesCount = Math.min(this.count, this.filter((t) => t.group === group).length);
      if (group === void 0) {
        this._limit = numberOptions.limit.value * densityFactor;
      } else {
        this._groupLimits.set(group, numberOptions.limit.value * densityFactor);
      }
      if (particlesCount < particlesNumber) {
        this.push(Math.abs(particlesNumber - particlesCount), void 0, options, group);
      } else if (particlesCount > particlesNumber) {
        this.removeQuantity(particlesCount - particlesNumber, group);
      }
    };
    this._initDensityFactor = (densityOptions) => {
      const container2 = this._container;
      if (!container2.canvas.element || !densityOptions.enable) {
        return defaultDensityFactor;
      }
      const canvas = container2.canvas.element, pxRatio = container2.retina.pixelRatio;
      return canvas.width * canvas.height / (densityOptions.height * densityOptions.width * pxRatio ** squareExp);
    };
    this._pushParticle = (position, overrideOptions, group, initializer) => {
      try {
        let particle = this._pool.pop();
        if (!particle) {
          particle = new Particle(this._engine, this._container);
        }
        particle.init(this._nextId, position, overrideOptions, group);
        let canAdd = true;
        if (initializer) {
          canAdd = initializer(particle);
        }
        if (!canAdd) {
          return;
        }
        this._array.push(particle);
        this._zArray.push(particle);
        this._nextId++;
        this._engine.dispatchEvent(EventType.particleAdded, {
          container: this._container,
          data: {
            particle
          }
        });
        return particle;
      } catch (e) {
        getLogger().warning(`${errorPrefix} adding particle: ${e}`);
      }
    };
    this._removeParticle = (index, group, override) => {
      const particle = this._array[index];
      if (!particle || particle.group !== group) {
        return false;
      }
      const zIdx = this._zArray.indexOf(particle);
      this._array.splice(index, deleteCount);
      this._zArray.splice(zIdx, deleteCount);
      particle.destroy(override);
      this._engine.dispatchEvent(EventType.particleRemoved, {
        container: this._container,
        data: {
          particle
        }
      });
      this._addToPool(particle);
      return true;
    };
    this._engine = engine;
    this._container = container;
    this._nextId = 0;
    this._array = [];
    this._zArray = [];
    this._pool = [];
    this._limit = 0;
    this._groupLimits = /* @__PURE__ */ new Map();
    this._needsSort = false;
    this._lastZIndex = 0;
    this._interactionManager = new InteractionManager(engine, container);
    this._pluginsInitialized = false;
    const canvasSize = container.canvas.size;
    this.quadTree = new QuadTree(qTreeRectangle(canvasSize), qTreeCapacity);
    this.movers = [];
    this.updaters = [];
  }
  get count() {
    return this._array.length;
  }
  addManualParticles() {
    const container = this._container, options = container.actualOptions;
    options.manualParticles.forEach((p) => this.addParticle(p.position ? getPosition(p.position, container.canvas.size) : void 0, p.options));
  }
  addParticle(position, overrideOptions, group, initializer) {
    const limitMode = this._container.actualOptions.particles.number.limit.mode, limit = group === void 0 ? this._limit : this._groupLimits.get(group) ?? this._limit, currentCount = this.count;
    if (limit > minLimit) {
      switch (limitMode) {
        case LimitMode.delete: {
          const countToRemove = currentCount + countOffset - limit;
          if (countToRemove > minCount) {
            this.removeQuantity(countToRemove);
          }
          break;
        }
        case LimitMode.wait:
          if (currentCount >= limit) {
            return;
          }
          break;
      }
    }
    return this._pushParticle(position, overrideOptions, group, initializer);
  }
  clear() {
    this._array = [];
    this._zArray = [];
    this._pluginsInitialized = false;
  }
  destroy() {
    this._array = [];
    this._zArray = [];
    this.movers = [];
    this.updaters = [];
  }
  draw(delta) {
    const container = this._container, canvas = container.canvas;
    canvas.clear();
    this.update(delta);
    for (const plugin of container.plugins.values()) {
      canvas.drawPlugin(plugin, delta);
    }
    for (const p of this._zArray) {
      p.draw(delta);
    }
  }
  filter(condition) {
    return this._array.filter(condition);
  }
  find(condition) {
    return this._array.find(condition);
  }
  get(index) {
    return this._array[index];
  }
  handleClickMode(mode) {
    this._interactionManager.handleClickMode(mode);
  }
  async init() {
    const container = this._container, options = container.actualOptions;
    this._lastZIndex = 0;
    this._needsSort = false;
    await this.initPlugins();
    let handled = false;
    for (const plugin of container.plugins.values()) {
      handled = plugin.particlesInitialization?.() ?? handled;
      if (handled) {
        break;
      }
    }
    this.addManualParticles();
    if (!handled) {
      const particlesOptions = options.particles, groups = particlesOptions.groups;
      for (const group in groups) {
        const groupOptions = groups[group];
        for (let i = this.count, j = 0; j < groupOptions.number?.value && i < particlesOptions.number.value; i++, j++) {
          this.addParticle(void 0, groupOptions, group);
        }
      }
      for (let i = this.count; i < particlesOptions.number.value; i++) {
        this.addParticle();
      }
    }
  }
  async initPlugins() {
    if (this._pluginsInitialized) {
      return;
    }
    const container = this._container;
    this.movers = await this._engine.getMovers(container, true);
    this.updaters = await this._engine.getUpdaters(container, true);
    await this._interactionManager.init();
    for (const pathGenerator of container.pathGenerators.values()) {
      pathGenerator.init(container);
    }
  }
  push(nb, mouse, overrideOptions, group) {
    for (let i = 0; i < nb; i++) {
      this.addParticle(mouse?.position, overrideOptions, group);
    }
  }
  async redraw() {
    this.clear();
    await this.init();
    this.draw({ value: 0, factor: 0 });
  }
  remove(particle, group, override) {
    this.removeAt(this._array.indexOf(particle), void 0, group, override);
  }
  removeAt(index, quantity = defaultRemoveQuantity, group, override) {
    if (index < minIndex || index > this.count) {
      return;
    }
    let deleted = 0;
    for (let i = index; deleted < quantity && i < this.count; i++) {
      if (this._removeParticle(i, group, override)) {
        i--;
        deleted++;
      }
    }
  }
  removeQuantity(quantity, group) {
    this.removeAt(minIndex, quantity, group);
  }
  setDensity() {
    const options = this._container.actualOptions, groups = options.particles.groups, manualCount = options.manualParticles.length;
    for (const group in groups) {
      this._applyDensity(groups[group], manualCount, group);
    }
    this._applyDensity(options.particles, manualCount);
  }
  setLastZIndex(zIndex) {
    this._lastZIndex = zIndex;
    this._needsSort = this._needsSort || this._lastZIndex < zIndex;
  }
  setResizeFactor(factor) {
    this._resizeFactor = factor;
  }
  update(delta) {
    const container = this._container, particlesToDelete = /* @__PURE__ */ new Set();
    this.quadTree = new QuadTree(qTreeRectangle(container.canvas.size), qTreeCapacity);
    for (const pathGenerator of container.pathGenerators.values()) {
      pathGenerator.update();
    }
    for (const plugin of container.plugins.values()) {
      plugin.update?.(delta);
    }
    const resizeFactor = this._resizeFactor;
    for (const particle of this._array) {
      if (resizeFactor && !particle.ignoresResizeRatio) {
        particle.position.x *= resizeFactor.width;
        particle.position.y *= resizeFactor.height;
        particle.initialPosition.x *= resizeFactor.width;
        particle.initialPosition.y *= resizeFactor.height;
      }
      particle.ignoresResizeRatio = false;
      this._interactionManager.reset(particle);
      for (const plugin of this._container.plugins.values()) {
        if (particle.destroyed) {
          break;
        }
        plugin.particleUpdate?.(particle, delta);
      }
      for (const mover of this.movers) {
        if (mover.isEnabled(particle)) {
          mover.move(particle, delta);
        }
      }
      if (particle.destroyed) {
        particlesToDelete.add(particle);
        continue;
      }
      this.quadTree.insert(new Point(particle.getPosition(), particle));
    }
    if (particlesToDelete.size) {
      const checkDelete = (p) => !particlesToDelete.has(p);
      this._array = this.filter(checkDelete);
      this._zArray = this._zArray.filter(checkDelete);
      for (const particle of particlesToDelete) {
        this._engine.dispatchEvent(EventType.particleRemoved, {
          container: this._container,
          data: {
            particle
          }
        });
      }
      this._addToPool(...particlesToDelete);
    }
    this._interactionManager.externalInteract(delta);
    for (const particle of this._array) {
      for (const updater of this.updaters) {
        updater.update(particle, delta);
      }
      if (!particle.destroyed && !particle.spawning) {
        this._interactionManager.particlesInteract(particle, delta);
      }
    }
    delete this._resizeFactor;
    if (this._needsSort) {
      const zArray = this._zArray;
      zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
      this._lastZIndex = zArray[zArray.length - lengthOffset].position.z;
      this._needsSort = false;
    }
  }
}
class Retina {
  constructor(container) {
    this.container = container;
    this.pixelRatio = defaultRatio;
    this.reduceFactor = defaultReduceFactor;
  }
  init() {
    const container = this.container, options = container.actualOptions;
    this.pixelRatio = !options.detectRetina || isSsr() ? defaultRatio : devicePixelRatio;
    this.reduceFactor = defaultReduceFactor;
    const ratio = this.pixelRatio, canvas = container.canvas;
    if (canvas.element) {
      const element = canvas.element;
      canvas.size.width = element.offsetWidth * ratio;
      canvas.size.height = element.offsetHeight * ratio;
    }
    const particles = options.particles, moveOptions = particles.move;
    this.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
    this.sizeAnimationSpeed = getRangeValue(particles.size.animation.speed) * ratio;
  }
  initParticle(particle) {
    const options = particle.options, ratio = this.pixelRatio, moveOptions = options.move, moveDistance = moveOptions.distance, props = particle.retina;
    props.moveDrift = getRangeValue(moveOptions.drift) * ratio;
    props.moveSpeed = getRangeValue(moveOptions.speed) * ratio;
    props.sizeAnimationSpeed = getRangeValue(options.size.animation.speed) * ratio;
    const maxDistance = props.maxDistance;
    maxDistance.horizontal = moveDistance.horizontal !== void 0 ? moveDistance.horizontal * ratio : void 0;
    maxDistance.vertical = moveDistance.vertical !== void 0 ? moveDistance.vertical * ratio : void 0;
    props.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
  }
}
function guardCheck(container) {
  return container && !container.destroyed;
}
function initDelta(value, fpsLimit = defaultFps, smooth = false) {
  return {
    value,
    factor: smooth ? defaultFps / fpsLimit : defaultFps * value / millisecondsToSeconds
  };
}
function loadContainerOptions(engine, container, ...sourceOptionsArr) {
  const options = new Options(engine, container);
  loadOptions(options, ...sourceOptionsArr);
  return options;
}
class Container {
  constructor(engine, id, sourceOptions) {
    this._intersectionManager = (entries) => {
      if (!guardCheck(this) || !this.actualOptions.pauseOnOutsideViewport) {
        return;
      }
      for (const entry of entries) {
        if (entry.target !== this.interactivity.element) {
          continue;
        }
        if (entry.isIntersecting) {
          void this.play();
        } else {
          this.pause();
        }
      }
    };
    this._nextFrame = (timestamp) => {
      try {
        if (!this._smooth && this._lastFrameTime !== void 0 && timestamp < this._lastFrameTime + millisecondsToSeconds / this.fpsLimit) {
          this.draw(false);
          return;
        }
        this._lastFrameTime ??= timestamp;
        const delta = initDelta(timestamp - this._lastFrameTime, this.fpsLimit, this._smooth);
        this.addLifeTime(delta.value);
        this._lastFrameTime = timestamp;
        if (delta.value > millisecondsToSeconds) {
          this.draw(false);
          return;
        }
        this.particles.draw(delta);
        if (!this.alive()) {
          this.destroy();
          return;
        }
        if (this.animationStatus) {
          this.draw(false);
        }
      } catch (e) {
        getLogger().error(`${errorPrefix} in animation loop`, e);
      }
    };
    this._engine = engine;
    this.id = Symbol(id);
    this.fpsLimit = 120;
    this._smooth = false;
    this._delay = 0;
    this._duration = 0;
    this._lifeTime = 0;
    this._firstStart = true;
    this.started = false;
    this.destroyed = false;
    this._paused = true;
    this._lastFrameTime = 0;
    this.zLayers = 100;
    this.pageHidden = false;
    this._clickHandlers = /* @__PURE__ */ new Map();
    this._sourceOptions = sourceOptions;
    this._initialSourceOptions = sourceOptions;
    this.retina = new Retina(this);
    this.canvas = new Canvas(this, this._engine);
    this.particles = new Particles(this._engine, this);
    this.pathGenerators = /* @__PURE__ */ new Map();
    this.interactivity = {
      mouse: {
        clicking: false,
        inside: false
      }
    };
    this.plugins = /* @__PURE__ */ new Map();
    this.effectDrawers = /* @__PURE__ */ new Map();
    this.shapeDrawers = /* @__PURE__ */ new Map();
    this._options = loadContainerOptions(this._engine, this);
    this.actualOptions = loadContainerOptions(this._engine, this);
    this._eventListeners = new EventListeners(this);
    this._intersectionObserver = safeIntersectionObserver((entries) => this._intersectionManager(entries));
    this._engine.dispatchEvent(EventType.containerBuilt, { container: this });
  }
  get animationStatus() {
    return !this._paused && !this.pageHidden && guardCheck(this);
  }
  get options() {
    return this._options;
  }
  get sourceOptions() {
    return this._sourceOptions;
  }
  addClickHandler(callback) {
    if (!guardCheck(this)) {
      return;
    }
    const el = this.interactivity.element;
    if (!el) {
      return;
    }
    const clickOrTouchHandler = (e, pos, radius) => {
      if (!guardCheck(this)) {
        return;
      }
      const pxRatio = this.retina.pixelRatio, posRetina = {
        x: pos.x * pxRatio,
        y: pos.y * pxRatio
      }, particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
      callback(e, particles);
    }, clickHandler = (e) => {
      if (!guardCheck(this)) {
        return;
      }
      const mouseEvent = e, pos = {
        x: mouseEvent.offsetX || mouseEvent.clientX,
        y: mouseEvent.offsetY || mouseEvent.clientY
      };
      clickOrTouchHandler(e, pos, clickRadius);
    }, touchStartHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touched = true;
      touchMoved = false;
    }, touchMoveHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touchMoved = true;
    }, touchEndHandler = (e) => {
      if (!guardCheck(this)) {
        return;
      }
      if (touched && !touchMoved) {
        const touchEvent = e;
        let lastTouch = touchEvent.touches[touchEvent.touches.length - touchEndLengthOffset];
        if (!lastTouch) {
          lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - touchEndLengthOffset];
          if (!lastTouch) {
            return;
          }
        }
        const element = this.canvas.element, canvasRect = element ? element.getBoundingClientRect() : void 0, pos = {
          x: lastTouch.clientX - (canvasRect ? canvasRect.left : minCoordinate),
          y: lastTouch.clientY - (canvasRect ? canvasRect.top : minCoordinate)
        };
        clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
      }
      touched = false;
      touchMoved = false;
    }, touchCancelHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touched = false;
      touchMoved = false;
    };
    let touched = false, touchMoved = false;
    this._clickHandlers.set("click", clickHandler);
    this._clickHandlers.set("touchstart", touchStartHandler);
    this._clickHandlers.set("touchmove", touchMoveHandler);
    this._clickHandlers.set("touchend", touchEndHandler);
    this._clickHandlers.set("touchcancel", touchCancelHandler);
    for (const [key, handler] of this._clickHandlers) {
      el.addEventListener(key, handler);
    }
  }
  addLifeTime(value) {
    this._lifeTime += value;
  }
  addPath(key, generator, override = false) {
    if (!guardCheck(this) || !override && this.pathGenerators.has(key)) {
      return false;
    }
    this.pathGenerators.set(key, generator);
    return true;
  }
  alive() {
    return !this._duration || this._lifeTime <= this._duration;
  }
  clearClickHandlers() {
    if (!guardCheck(this)) {
      return;
    }
    for (const [key, handler] of this._clickHandlers) {
      this.interactivity.element?.removeEventListener(key, handler);
    }
    this._clickHandlers.clear();
  }
  destroy(remove = true) {
    if (!guardCheck(this)) {
      return;
    }
    this.stop();
    this.clearClickHandlers();
    this.particles.destroy();
    this.canvas.destroy();
    for (const effectDrawer of this.effectDrawers.values()) {
      effectDrawer.destroy?.(this);
    }
    for (const shapeDrawer of this.shapeDrawers.values()) {
      shapeDrawer.destroy?.(this);
    }
    for (const key of this.effectDrawers.keys()) {
      this.effectDrawers.delete(key);
    }
    for (const key of this.shapeDrawers.keys()) {
      this.shapeDrawers.delete(key);
    }
    this._engine.clearPlugins(this);
    this.destroyed = true;
    if (remove) {
      const mainArr = this._engine.items, idx = mainArr.findIndex((t) => t === this);
      if (idx >= removeMinIndex) {
        mainArr.splice(idx, removeDeleteCount);
      }
    }
    this._engine.dispatchEvent(EventType.containerDestroyed, { container: this });
  }
  draw(force) {
    if (!guardCheck(this)) {
      return;
    }
    let refreshTime = force;
    const frame = (timestamp) => {
      if (refreshTime) {
        this._lastFrameTime = void 0;
        refreshTime = false;
      }
      this._nextFrame(timestamp);
    };
    this._drawAnimationFrame = animate((timestamp) => frame(timestamp));
  }
  async export(type, options = {}) {
    for (const plugin of this.plugins.values()) {
      if (!plugin.export) {
        continue;
      }
      const res = await plugin.export(type, options);
      if (!res.supported) {
        continue;
      }
      return res.blob;
    }
    getLogger().error(`${errorPrefix} - Export plugin with type ${type} not found`);
  }
  handleClickMode(mode) {
    if (!guardCheck(this)) {
      return;
    }
    this.particles.handleClickMode(mode);
    for (const plugin of this.plugins.values()) {
      plugin.handleClickMode?.(mode);
    }
  }
  async init() {
    if (!guardCheck(this)) {
      return;
    }
    const effects = this._engine.getSupportedEffects();
    for (const type of effects) {
      const drawer = this._engine.getEffectDrawer(type);
      if (drawer) {
        this.effectDrawers.set(type, drawer);
      }
    }
    const shapes = this._engine.getSupportedShapes();
    for (const type of shapes) {
      const drawer = this._engine.getShapeDrawer(type);
      if (drawer) {
        this.shapeDrawers.set(type, drawer);
      }
    }
    await this.particles.initPlugins();
    this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);
    const availablePlugins = await this._engine.getAvailablePlugins(this);
    for (const [id, plugin] of availablePlugins) {
      this.plugins.set(id, plugin);
    }
    this.retina.init();
    await this.canvas.init();
    this.updateActualOptions();
    this.canvas.initBackground();
    this.canvas.resize();
    const { zLayers, duration, delay, fpsLimit, smooth } = this.actualOptions;
    this.zLayers = zLayers;
    this._duration = getRangeValue(duration) * millisecondsToSeconds;
    this._delay = getRangeValue(delay) * millisecondsToSeconds;
    this._lifeTime = 0;
    this.fpsLimit = fpsLimit > minFpsLimit ? fpsLimit : defaultFpsLimit;
    this._smooth = smooth;
    for (const drawer of this.effectDrawers.values()) {
      await drawer.init?.(this);
    }
    for (const drawer of this.shapeDrawers.values()) {
      await drawer.init?.(this);
    }
    for (const plugin of this.plugins.values()) {
      await plugin.init?.();
    }
    this._engine.dispatchEvent(EventType.containerInit, { container: this });
    await this.particles.init();
    this.particles.setDensity();
    for (const plugin of this.plugins.values()) {
      plugin.particlesSetup?.();
    }
    this._engine.dispatchEvent(EventType.particlesSetup, { container: this });
  }
  async loadTheme(name) {
    if (!guardCheck(this)) {
      return;
    }
    this._currentTheme = name;
    await this.refresh();
  }
  pause() {
    if (!guardCheck(this)) {
      return;
    }
    if (this._drawAnimationFrame !== void 0) {
      cancelAnimation(this._drawAnimationFrame);
      delete this._drawAnimationFrame;
    }
    if (this._paused) {
      return;
    }
    for (const plugin of this.plugins.values()) {
      plugin.pause?.();
    }
    if (!this.pageHidden) {
      this._paused = true;
    }
    this._engine.dispatchEvent(EventType.containerPaused, { container: this });
  }
  play(force) {
    if (!guardCheck(this)) {
      return;
    }
    const needsUpdate = this._paused || force;
    if (this._firstStart && !this.actualOptions.autoPlay) {
      this._firstStart = false;
      return;
    }
    if (this._paused) {
      this._paused = false;
    }
    if (needsUpdate) {
      for (const plugin of this.plugins.values()) {
        if (plugin.play) {
          plugin.play();
        }
      }
    }
    this._engine.dispatchEvent(EventType.containerPlay, { container: this });
    this.draw(needsUpdate ?? false);
  }
  async refresh() {
    if (!guardCheck(this)) {
      return;
    }
    this.stop();
    return this.start();
  }
  async reset(sourceOptions) {
    if (!guardCheck(this)) {
      return;
    }
    this._initialSourceOptions = sourceOptions;
    this._sourceOptions = sourceOptions;
    this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);
    return this.refresh();
  }
  async start() {
    if (!guardCheck(this) || this.started) {
      return;
    }
    await this.init();
    this.started = true;
    await new Promise((resolve) => {
      const start = async () => {
        this._eventListeners.addListeners();
        if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
          this._intersectionObserver.observe(this.interactivity.element);
        }
        for (const plugin of this.plugins.values()) {
          await plugin.start?.();
        }
        this._engine.dispatchEvent(EventType.containerStarted, { container: this });
        this.play();
        resolve();
      };
      this._delayTimeout = setTimeout(() => void start(), this._delay);
    });
  }
  stop() {
    if (!guardCheck(this) || !this.started) {
      return;
    }
    if (this._delayTimeout) {
      clearTimeout(this._delayTimeout);
      delete this._delayTimeout;
    }
    this._firstStart = true;
    this.started = false;
    this._eventListeners.removeListeners();
    this.pause();
    this.particles.clear();
    this.canvas.stop();
    if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
      this._intersectionObserver.unobserve(this.interactivity.element);
    }
    for (const plugin of this.plugins.values()) {
      plugin.stop?.();
    }
    for (const key of this.plugins.keys()) {
      this.plugins.delete(key);
    }
    this._sourceOptions = this._options;
    this._engine.dispatchEvent(EventType.containerStopped, { container: this });
  }
  updateActualOptions() {
    this.actualOptions.responsive = [];
    const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
    this.actualOptions.setTheme(this._currentTheme);
    if (this._responsiveMaxWidth === newMaxWidth) {
      return false;
    }
    this._responsiveMaxWidth = newMaxWidth;
    return true;
  }
}
class EventDispatcher {
  constructor() {
    this._listeners = /* @__PURE__ */ new Map();
  }
  addEventListener(type, listener) {
    this.removeEventListener(type, listener);
    let arr = this._listeners.get(type);
    if (!arr) {
      arr = [];
      this._listeners.set(type, arr);
    }
    arr.push(listener);
  }
  dispatchEvent(type, args) {
    const listeners = this._listeners.get(type);
    listeners?.forEach((handler) => handler(args));
  }
  hasEventListener(type) {
    return !!this._listeners.get(type);
  }
  removeAllEventListeners(type) {
    if (!type) {
      this._listeners = /* @__PURE__ */ new Map();
    } else {
      this._listeners.delete(type);
    }
  }
  removeEventListener(type, listener) {
    const arr = this._listeners.get(type);
    if (!arr) {
      return;
    }
    const length = arr.length, idx = arr.indexOf(listener);
    if (idx < minIndex) {
      return;
    }
    if (length === deleteCount) {
      this._listeners.delete(type);
    } else {
      arr.splice(idx, deleteCount);
    }
  }
}
async function getItemsFromInitializer(container, map, initializers, force = false) {
  let res = map.get(container);
  if (!res || force) {
    res = await Promise.all([...initializers.values()].map((t) => t(container)));
    map.set(container, res);
  }
  return res;
}
async function getDataFromUrl(data) {
  const url = itemFromSingleOrMultiple(data.url, data.index);
  if (!url) {
    return data.fallback;
  }
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  }
  getLogger().error(`${errorPrefix} ${response.status} while retrieving config file`);
  return data.fallback;
}
const getCanvasFromContainer = (domContainer) => {
  let canvasEl;
  if (domContainer instanceof HTMLCanvasElement || domContainer.tagName.toLowerCase() === canvasTag) {
    canvasEl = domContainer;
    if (!canvasEl.dataset[generatedAttribute]) {
      canvasEl.dataset[generatedAttribute] = generatedFalse;
    }
  } else {
    const existingCanvases = domContainer.getElementsByTagName(canvasTag);
    if (existingCanvases.length) {
      canvasEl = existingCanvases[canvasFirstIndex];
      canvasEl.dataset[generatedAttribute] = generatedFalse;
    } else {
      canvasEl = document.createElement(canvasTag);
      canvasEl.dataset[generatedAttribute] = generatedTrue;
      domContainer.appendChild(canvasEl);
    }
  }
  const fullPercent = "100%";
  if (!canvasEl.style.width) {
    canvasEl.style.width = fullPercent;
  }
  if (!canvasEl.style.height) {
    canvasEl.style.height = fullPercent;
  }
  return canvasEl;
}, getDomContainer = (id, source) => {
  let domContainer = source ?? document.getElementById(id);
  if (domContainer) {
    return domContainer;
  }
  domContainer = document.createElement("div");
  domContainer.id = id;
  domContainer.dataset[generatedAttribute] = generatedTrue;
  document.body.append(domContainer);
  return domContainer;
};
class Engine {
  constructor() {
    this._configs = /* @__PURE__ */ new Map();
    this._domArray = [];
    this._eventDispatcher = new EventDispatcher();
    this._initialized = false;
    this.plugins = [];
    this.colorManagers = /* @__PURE__ */ new Map();
    this.easingFunctions = /* @__PURE__ */ new Map();
    this._initializers = {
      interactors: /* @__PURE__ */ new Map(),
      movers: /* @__PURE__ */ new Map(),
      updaters: /* @__PURE__ */ new Map()
    };
    this.interactors = /* @__PURE__ */ new Map();
    this.movers = /* @__PURE__ */ new Map();
    this.updaters = /* @__PURE__ */ new Map();
    this.presets = /* @__PURE__ */ new Map();
    this.effectDrawers = /* @__PURE__ */ new Map();
    this.shapeDrawers = /* @__PURE__ */ new Map();
    this.pathGenerators = /* @__PURE__ */ new Map();
  }
  get configs() {
    const res = {};
    for (const [name, config] of this._configs) {
      res[name] = config;
    }
    return res;
  }
  get items() {
    return this._domArray;
  }
  get version() {
    return "3.9.1";
  }
  async addColorManager(manager, refresh = true) {
    this.colorManagers.set(manager.key, manager);
    await this.refresh(refresh);
  }
  addConfig(config) {
    const key = config.key ?? config.name ?? "default";
    this._configs.set(key, config);
    this._eventDispatcher.dispatchEvent(EventType.configAdded, { data: { name: key, config } });
  }
  async addEasing(name, easing, refresh = true) {
    if (this.getEasing(name)) {
      return;
    }
    this.easingFunctions.set(name, easing);
    await this.refresh(refresh);
  }
  async addEffect(effect, drawer, refresh = true) {
    executeOnSingleOrMultiple(effect, (type) => {
      if (!this.getEffectDrawer(type)) {
        this.effectDrawers.set(type, drawer);
      }
    });
    await this.refresh(refresh);
  }
  addEventListener(type, listener) {
    this._eventDispatcher.addEventListener(type, listener);
  }
  async addInteractor(name, interactorInitializer, refresh = true) {
    this._initializers.interactors.set(name, interactorInitializer);
    await this.refresh(refresh);
  }
  async addMover(name, moverInitializer, refresh = true) {
    this._initializers.movers.set(name, moverInitializer);
    await this.refresh(refresh);
  }
  async addParticleUpdater(name, updaterInitializer, refresh = true) {
    this._initializers.updaters.set(name, updaterInitializer);
    await this.refresh(refresh);
  }
  async addPathGenerator(name, generator, refresh = true) {
    if (!this.getPathGenerator(name)) {
      this.pathGenerators.set(name, generator);
    }
    await this.refresh(refresh);
  }
  async addPlugin(plugin, refresh = true) {
    if (!this.getPlugin(plugin.id)) {
      this.plugins.push(plugin);
    }
    await this.refresh(refresh);
  }
  async addPreset(preset, options, override = false, refresh = true) {
    if (override || !this.getPreset(preset)) {
      this.presets.set(preset, options);
    }
    await this.refresh(refresh);
  }
  async addShape(drawer, refresh = true) {
    for (const validType of drawer.validTypes) {
      if (this.getShapeDrawer(validType)) {
        continue;
      }
      this.shapeDrawers.set(validType, drawer);
    }
    await this.refresh(refresh);
  }
  checkVersion(pluginVersion) {
    if (this.version === pluginVersion) {
      return;
    }
    throw new Error(`The tsParticles version is different from the loaded plugins version. Engine version: ${this.version}. Plugin version: ${pluginVersion}`);
  }
  clearPlugins(container) {
    this.updaters.delete(container);
    this.movers.delete(container);
    this.interactors.delete(container);
  }
  dispatchEvent(type, args) {
    this._eventDispatcher.dispatchEvent(type, args);
  }
  dom() {
    return this.items;
  }
  domItem(index) {
    return this.item(index);
  }
  async getAvailablePlugins(container) {
    const res = /* @__PURE__ */ new Map();
    for (const plugin of this.plugins) {
      if (plugin.needsPlugin(container.actualOptions)) {
        res.set(plugin.id, await plugin.getPlugin(container));
      }
    }
    return res;
  }
  getEasing(name) {
    return this.easingFunctions.get(name) ?? ((value) => value);
  }
  getEffectDrawer(type) {
    return this.effectDrawers.get(type);
  }
  async getInteractors(container, force = false) {
    return getItemsFromInitializer(container, this.interactors, this._initializers.interactors, force);
  }
  async getMovers(container, force = false) {
    return getItemsFromInitializer(container, this.movers, this._initializers.movers, force);
  }
  getPathGenerator(type) {
    return this.pathGenerators.get(type);
  }
  getPlugin(plugin) {
    return this.plugins.find((t) => t.id === plugin);
  }
  getPreset(preset) {
    return this.presets.get(preset);
  }
  getShapeDrawer(type) {
    return this.shapeDrawers.get(type);
  }
  getSupportedEffects() {
    return this.effectDrawers.keys();
  }
  getSupportedShapes() {
    return this.shapeDrawers.keys();
  }
  async getUpdaters(container, force = false) {
    return getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);
  }
  init() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;
  }
  item(index) {
    const { items } = this, item = items[index];
    if (!item || item.destroyed) {
      items.splice(index, removeDeleteCount);
      return;
    }
    return item;
  }
  async load(params) {
    const id = params.id ?? params.element?.id ?? `tsparticles${Math.floor(getRandom() * loadRandomFactor)}`, { index, url } = params, options = url ? await getDataFromUrl({ fallback: params.options, url, index }) : params.options, currentOptions = itemFromSingleOrMultiple(options, index), { items } = this, oldIndex = items.findIndex((v) => v.id.description === id), newItem = new Container(this, id, currentOptions);
    if (oldIndex >= loadMinIndex) {
      const old = this.item(oldIndex), deleteCount2 = old ? one : none;
      if (old && !old.destroyed) {
        old.destroy(false);
      }
      items.splice(oldIndex, deleteCount2, newItem);
    } else {
      items.push(newItem);
    }
    const domContainer = getDomContainer(id, params.element), canvasEl = getCanvasFromContainer(domContainer);
    newItem.canvas.loadCanvas(canvasEl);
    await newItem.start();
    return newItem;
  }
  loadOptions(options, sourceOptions) {
    this.plugins.forEach((plugin) => plugin.loadOptions?.(options, sourceOptions));
  }
  loadParticlesOptions(container, options, ...sourceOptions) {
    const updaters = this.updaters.get(container);
    if (!updaters) {
      return;
    }
    updaters.forEach((updater) => updater.loadOptions?.(options, ...sourceOptions));
  }
  async refresh(refresh = true) {
    if (!refresh) {
      return;
    }
    await Promise.all(this.items.map((t) => t.refresh()));
  }
  removeEventListener(type, listener) {
    this._eventDispatcher.removeEventListener(type, listener);
  }
  setOnClickHandler(callback) {
    const { items } = this;
    if (!items.length) {
      throw new Error(`${errorPrefix} can only set click handlers after calling tsParticles.load()`);
    }
    items.forEach((item) => item.addClickHandler(callback));
  }
}
function init() {
  const engine = new Engine();
  engine.init();
  return engine;
}
var GradientType;
(function(GradientType2) {
  GradientType2["linear"] = "linear";
  GradientType2["radial"] = "radial";
  GradientType2["random"] = "random";
})(GradientType || (GradientType = {}));
const tsParticles = init();
if (!isSsr()) {
  window.tsParticles = tsParticles;
}
const f = (t) => {
  const i = t.id ?? "tsparticles";
  return reactExports.useEffect(() => {
    let e;
    return tsParticles.load({ id: i, url: t.url, options: t.options }).then((l) => {
      var a;
      e = l, (a = t.particlesLoaded) == null || a.call(t, l);
    }), () => {
      e == null || e.destroy();
    };
  }, [i, t, t.url, t.options]), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: i, className: t.className });
};
async function n(t) {
  await t(tsParticles);
}
export {
  f as Particles,
  f as default,
  n as initParticlesEngine
};
