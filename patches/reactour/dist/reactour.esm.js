import "focus-outline-manager";
import React, { useRef, useEffect, memo, useState, useReducer } from "react";
import cn from "classnames";
import scrollSmooth from "scroll-smooth";
import "scrollparent";
import debounce from "lodash.debounce";
import useMutationObserver from "@rooks/use-mutation-observer";
import FocusLock from "react-focus-lock";
import styled, { createGlobalStyle } from "styled-components";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(
    Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw),
      },
    })
  );
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) ||
      Object.prototype.toString.call(arr) === "[object Arguments]"
    )
  ) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _templateObject() {
  var data = _taggedTemplateLiteral([
    "\n  .focus-outline-hidden :focus {\n      outline: none;\n  }\n",
  ]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var GlobalStyle = createGlobalStyle(_templateObject());

function Portal(_ref) {
  var children = _ref.children;
  var ref = useRef(null);

  if (ref.current === null) {
    ref.current = document.createElement("div");
    ref.current.setAttribute("id", "___reactour");
  }

  useEffect(
    function () {
      document.body.appendChild(ref.current);
      return function () {
        document.body.removeChild(ref.current);
      };
    },
    [ref]
  );
  return createPortal(children, ref.current);
}

function _templateObject$1() {
  var data = _taggedTemplateLiteral([
    "\n  display: block;\n  padding: 0;\n  border: 0;\n  background: none;\n  font-size: 0;\n  cursor: ",
    ";\n",
  ]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var SvgButton = styled.button(_templateObject$1(), function (props) {
  return props.disabled ? "not-allowed" : "pointer";
});

function _templateObject2() {
  var data = _taggedTemplateLiteral([
    "\n  color: ",
    ";\n\n  ",
    ";\n  ",
    ";\n\n  &:hover {\n    color: ",
    ";\n  }\n",
  ]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteral([
    "\n  font-size: 12px;\n  line-height: 1;\n",
  ]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var Label = styled.span(_templateObject$2());

function Arrow(_ref) {
  var className = _ref.className,
    onClick = _ref.onClick,
    inverted = _ref.inverted,
    label = _ref.label,
    disabled = _ref.disabled;
  return React.createElement(
    SvgButton,
    {
      className: className,
      onClick: onClick,
      "data-tour-elem": "".concat(inverted ? "right" : "left", "-arrow"),
      disabled: disabled,
    },
    label
      ? React.createElement(Label, null, label)
      : React.createElement(
          "svg",
          {
            viewBox: "0 0 18.4 14.4",
          },
          React.createElement("path", {
            d: inverted
              ? "M17 7.2H1M10.8 1L17 7.2l-6.2 6.2"
              : "M1.4 7.2h16M7.6 1L1.4 7.2l6.2 6.2",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeMiterlimit: "10",
          })
        )
  );
}

Arrow.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  inverted: PropTypes.bool,
  label: PropTypes.node,
  disabled: PropTypes.bool,
};
var Arrow$1 = styled(Arrow)(
  _templateObject2(),
  function (props) {
    return props.disabled ? "#caccce" : "#646464";
  },
  function (props) {
    return props.inverted ? "margin-left: 24px;" : "margin-right: 24px;";
  },
  function (props) {
    return (
      !props.label &&
      "\n    width: 16px;\n    height: 12px;\n    flex: 0 0 16px;\n  "
    );
  },
  function (props) {
    return props.disabled ? "#caccce" : "#000";
  }
);

function _templateObject$3() {
  var data = _taggedTemplateLiteral([
    "\n  position: absolute;\n  top: 22px;\n  right: 22px;\n  width: 9px;\n  height: 9px;\n  color: #5e5e5e;\n  &:hover {\n    color: #000;\n  }\n",
  ]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}

function Close(_ref) {
  var className = _ref.className,
    onClick = _ref.onClick,
    ariaLabel = _ref.ariaLabel;
  return React.createElement(
    SvgButton,
    {
      className: className,
      onClick: onClick,
      "aria-label": ariaLabel,
    },
    React.createElement(
      "svg",
      {
        viewBox: "0 0 9.1 9.1",
        "aria-hidden": true,
        role: "presentation",
      },
      React.createElement("path", {
        fill: "currentColor",
        d:
          "M5.9 4.5l2.8-2.8c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L4.5 3.1 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4l2.8 2.8L.3 7.4c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3L4.5 6l2.8 2.8c.3.2.5.3.8.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.9 4.5z",
      })
    )
  );
}

Close.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
};
var StyledClose = styled(Close)(_templateObject$3());

function getNodeRect(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
    top = _node$getBoundingClie.top,
    right = _node$getBoundingClie.right,
    bottom = _node$getBoundingClie.bottom,
    left = _node$getBoundingClie.left,
    width = _node$getBoundingClie.width,
    height = _node$getBoundingClie.height;

  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: width,
    height: height,
  };
}
function inView(_ref) {
  var top = _ref.top,
    right = _ref.right,
    bottom = _ref.bottom,
    left = _ref.left,
    w = _ref.w,
    h = _ref.h,
    _ref$threshold = _ref.threshold,
    threshold = _ref$threshold === void 0 ? 0 : _ref$threshold;
  return (
    top >= 0 + threshold &&
    left >= 0 + threshold &&
    bottom <= h - threshold &&
    right <= w - threshold
  );
}
var isHoriz = function isHoriz(pos) {
  return /(left|right)/.test(pos);
};
var isOutsideX = function isOutsideX(val, windowWidth) {
  return val > windowWidth;
};
var isOutsideY = function isOutsideY(val, windowHeight) {
  return val > windowHeight;
};
var safe = function safe(sum) {
  return sum < 0 ? 0 : sum;
};
function bestPositionOf(positions) {
  return Object.keys(positions)
    .map(function (p) {
      return {
        position: p,
        value: positions[p],
      };
    })
    .sort(function (a, b) {
      return b.value - a.value;
    })
    .map(function (p) {
      return p.position;
    });
}
function getWindow() {
  var w = Math.max(
    document.documentElement.offsetWidth,
    window.innerWidth || 0
  );
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return {
    w: w,
    h: h,
  };
}

function _templateObject$4() {
  var data = _taggedTemplateLiteral([
    "\n  --reactour-accent: ",
    ";\n  ",
    "\n  position: fixed;\n  transition: transform 0.5s;\n  top: 0;\n  left: 0;\n  z-index: 1000000;\n\n  transform: ",
    ";\n",
  ]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var Guide = styled.div(
  _templateObject$4(),
  function (props) {
    return props.accentColor;
  },
  function (props) {
    return props.defaultStyles
      ? "\n  max-width: 331px;\n  min-width: 150px;\n  padding-right: 40px;\n  border-radius: ".concat(
          props.rounded,
          "px;\n  background-color: #fff;\n  padding: 24px 30px;\n  box-shadow: 0 0.5em 3em rgba(0, 0, 0, 0.3);\n  color: inherit;\n  "
        )
      : "";
  },
  function (props) {
    var targetTop = props.targetTop,
      targetRight = props.targetRight,
      targetBottom = props.targetBottom,
      targetLeft = props.targetLeft,
      windowWidth = props.windowWidth,
      windowHeight = props.windowHeight,
      helperWidth = props.helperWidth,
      helperHeight = props.helperHeight,
      helperPosition = props.helperPosition,
      padding = props.padding;
    var available = {
      left: targetLeft,
      right: windowWidth - targetRight,
      top: targetTop,
      bottom: windowHeight - targetBottom,
    };

    var couldPositionAt = function couldPositionAt(position) {
      return (
        available[position] >
        (isHoriz(position)
          ? helperWidth + padding * 2
          : helperHeight + padding * 2)
      );
    };

    var autoPosition = function autoPosition(coords) {
      var positionsOrder = bestPositionOf(available);

      for (var j = 0; j < positionsOrder.length; j++) {
        if (couldPositionAt(positionsOrder[j])) {
          return coords[positionsOrder[j]];
        }
      }

      return coords.center;
    };

    var pos = function pos(helperPosition) {
      if (Array.isArray(helperPosition)) {
        var isOutX = isOutsideX(helperPosition[0], windowWidth);
        var isOutY = isOutsideY(helperPosition[1], windowHeight);

        var warn = function warn(axis, num) {
          console.warn(
            ""
              .concat(axis, ":")
              .concat(num, " is outside window, falling back to center")
          );
        };

        if (isOutX) warn("x", helperPosition[0]);
        if (isOutY) warn("y", helperPosition[1]);
        return [
          isOutX ? windowWidth / 2 - helperWidth / 2 : helperPosition[0],
          isOutY ? windowHeight / 2 - helperHeight / 2 : helperPosition[1],
        ];
      }

      var hX = isOutsideX(targetLeft + helperWidth, windowWidth)
        ? isOutsideX(targetRight + padding, windowWidth)
          ? targetRight - helperWidth
          : targetRight - helperWidth + padding
        : targetLeft - padding;
      var x = hX > padding ? hX : padding;
      var hY = isOutsideY(targetTop + helperHeight, windowHeight)
        ? isOutsideY(targetBottom + padding, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom - helperHeight + padding
        : targetTop - padding;
      var y = hY > padding ? hY : padding;
      var coords = {
        top: [x, targetTop - helperHeight - padding * 2],
        right: [targetRight + padding * 2, y],
        bottom: [x, targetBottom + padding * 2],
        left: [targetLeft - helperWidth - padding * 2, y],
        center: [
          windowWidth / 2 - helperWidth / 2,
          windowHeight / 2 - helperHeight / 2,
        ],
      };

      if (helperPosition === "center" || couldPositionAt(helperPosition)) {
        return coords[helperPosition];
      }

      return autoPosition(coords);
    };

    var p = pos(helperPosition);
    return "translate("
      .concat(Math.round(p[0]), "px, ")
      .concat(Math.round(p[1]), "px)");
  }
);

function _templateObject$5() {
  var data = _taggedTemplateLiteral([
    "\n  position: absolute;\n  font-family: monospace;\n  background: var(--reactour-accent);\n  background: ",
    ";\n  height: 1.875em;\n  line-height: 2;\n  padding-left: 0.8125em;\n  padding-right: 0.8125em;\n  font-size: 1em;\n  border-radius: 1.625em;\n  color: white;\n  text-align: center;\n  box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.3);\n  top: -0.8125em;\n  left: -0.8125em;\n",
  ]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var Badge = styled.span(_templateObject$5(), function (props) {
  return props.accentColor;
});

function _templateObject$6() {
  var data = _taggedTemplateLiteral([
    "\n  display: flex;\n  margin-top: 24px;\n  align-items: center;\n  justify-content: center;\n",
  ]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var Controls = styled.div(_templateObject$6());

function _templateObject$7() {
  var data = _taggedTemplateLiteral([
    "\n  counter-reset: dot;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n",
  ]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var Navigation = styled.nav(_templateObject$7());

function _templateObject$8() {
  var data = _taggedTemplateLiteral([
    "\n  counter-increment: dot;\n  width: 8px;\n  height: 8px;\n  border: ",
    ";\n\n  border-radius: 100%;\n  padding: 0;\n  display: block;\n  margin: 4px;\n  transition: opacity 0.3s, transform 0.3s;\n  cursor: ",
    ";\n  transform: scale(",
    ");\n\n  color: ",
    ";\n  background: ",
    ";\n\n  color: ",
    ";\n  background: ",
    ";\n\n  &:before {\n    content: counter(dot);\n    position: absolute;\n    bottom: calc(100% + 0.25em);\n    left: 50%;\n    opacity: 0;\n    transform: translate(-50%, 1em);\n    transition: 0.3s;\n    display: ",
    ";\n  }\n\n  &:hover {\n    background-color: currentColor;\n\n    &:before {\n      opacity: 0.5;\n      transform: translate(-50%, -2px);\n    }\n  }\n",
  ]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}
var Dot = styled.button(
  _templateObject$8(),
  function (props) {
    return props.current === props.index ? "0" : "1px solid #caccce";
  },
  function (props) {
    return props.disabled ? "not-allowed" : "pointer";
  },
  function (props) {
    return props.current === props.index ? 1.25 : 1;
  },
  function (props) {
    return props.current === props.index ? "var(--reactour-accent)" : "#caccce";
  },
  function (props) {
    return props.current === props.index ? "var(--reactour-accent)" : "none";
  },
  function (props) {
    return props.current === props.index ? props.accentColor : "#caccce";
  },
  function (props) {
    return props.current === props.index ? props.accentColor : "none";
  },
  function (props) {
    return props.showNumber ? "block" : "none";
  }
);

function _templateObject$9() {
  var data = _taggedTemplateLiteral([
    "\n  opacity: 0.7;\n  width: 100%;\n  left: 0;\n  top: 0;\n  height: 100%;\n  position: fixed;\n  z-index: 99999;\n  pointer-events: none;\n  color: #000;\n",
  ]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}
var SvgMaskWrapper = styled.div(_templateObject$9());
function SvgMask(_ref) {
  var windowWidth = _ref.windowWidth,
    windowHeight = _ref.windowHeight,
    targetWidth = _ref.targetWidth,
    targetHeight = _ref.targetHeight,
    targetTop = _ref.targetTop,
    targetLeft = _ref.targetLeft,
    padding = _ref.padding,
    rounded = _ref.rounded,
    disableInteraction = _ref.disableInteraction,
    disableInteractionClassName = _ref.disableInteractionClassName,
    className = _ref.className,
    onClick = _ref.onClick;
  var width = safe(targetWidth + padding * 2);
  var height = safe(targetHeight + padding * 2);
  var top = safe(targetTop - padding);
  var left = safe(targetLeft - padding);
  return React.createElement(
    SvgMaskWrapper,
    {
      onClick: onClick,
    },
    React.createElement(
      "svg",
      {
        width: windowWidth,
        height: windowHeight,
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
      },
      React.createElement(
        "defs",
        null,
        React.createElement(
          "mask",
          {
            id: "mask-main",
          },
          React.createElement("rect", {
            x: 0,
            y: 0,
            width: windowWidth,
            height: windowHeight,
            fill: "white",
          }),
          React.createElement("rect", {
            x: left,
            y: top,
            width: width,
            height: height,
            fill: "black",
          }),
          React.createElement("rect", {
            x: left - 1,
            y: top - 1,
            width: rounded,
            height: rounded,
            fill: "white",
          }),
          React.createElement("circle", {
            cx: left + rounded,
            cy: top + rounded,
            r: rounded,
            fill: "black",
          }),
          React.createElement("rect", {
            x: left + width - rounded + 1,
            y: top - 1,
            width: rounded,
            height: rounded,
            fill: "white",
          }),
          React.createElement("circle", {
            cx: left + width - rounded,
            cy: top + rounded,
            r: rounded,
            fill: "black",
          }),
          React.createElement("rect", {
            x: left - 1,
            y: top + height - rounded + 1,
            width: rounded,
            height: rounded,
            fill: "white",
          }),
          React.createElement("circle", {
            cx: left + rounded,
            cy: top + height - rounded,
            r: rounded,
            fill: "black",
          }),
          React.createElement("rect", {
            x: left + width - rounded + 1,
            y: top + height - rounded + 1,
            width: rounded,
            height: rounded,
            fill: "white",
          }),
          React.createElement("circle", {
            cx: left + width - rounded,
            cy: top + height - rounded,
            r: rounded,
            fill: "black ",
          })
        ),
        React.createElement(
          "clipPath",
          {
            id: "clip-path",
          },
          React.createElement("rect", {
            x: 0,
            y: 0,
            width: windowWidth,
            height: top,
          }),
          React.createElement("rect", {
            x: 0,
            y: top,
            width: left,
            height: height,
          }),
          React.createElement("rect", {
            x: targetLeft + targetWidth + padding,
            y: top,
            width: safe(windowWidth - targetWidth - left),
            height: height,
          }),
          React.createElement("rect", {
            x: 0,
            y: targetTop + targetHeight + padding,
            width: windowWidth,
            height: safe(windowHeight - targetHeight - top),
          })
        )
      ),
      React.createElement("rect", {
        x: 0,
        y: 0,
        width: windowWidth,
        height: windowHeight,
        fill: "currentColor",
        mask: "url(#mask-main)",
      }),
      React.createElement("rect", {
        x: 0,
        y: 0,
        width: windowWidth,
        height: windowHeight,
        fill: "currentColor",
        clipPath: "url(#clip-path)",
        pointerEvents: "auto",
      }),
      React.createElement("rect", {
        x: left,
        y: top,
        width: width,
        height: height,
        pointerEvents: "auto",
        fill: "transparent",
        display: disableInteraction ? "block" : "none",
        className: disableInteractionClassName,
      })
    )
  );
}
SvgMask.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
  targetWidth: PropTypes.number.isRequired,
  targetHeight: PropTypes.number.isRequired,
  targetTop: PropTypes.number.isRequired,
  targetLeft: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  rounded: PropTypes.number.isRequired,
  disableInteraction: PropTypes.bool.isRequired,
  disableInteractionClassName: PropTypes.string.isRequired,
};

var propTypes = {
  accessibilityOptions: PropTypes.shape({
    ariaLabelledBy: PropTypes.string,
    closeButtonAriaLabel: PropTypes.string,
    showNavigationScreenReaders: PropTypes.bool,
  }),
  badgeContent: PropTypes.func,
  highlightedMaskClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  className: PropTypes.string,
  closeWithMask: PropTypes.bool,
  inViewThreshold: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  lastStepNextButton: PropTypes.node,
  maskClassName: PropTypes.string,
  maskSpace: PropTypes.number,
  nextButton: PropTypes.node,
  onAfterOpen: PropTypes.func,
  onBeforeClose: PropTypes.func,
  onRequestClose: PropTypes.func,
  prevButton: PropTypes.node,
  scrollDuration: PropTypes.number,
  scrollOffset: PropTypes.number,
  showButtons: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  showNavigation: PropTypes.bool,
  showNavigationNumber: PropTypes.bool,
  showNumber: PropTypes.bool,
  startAt: PropTypes.number,
  goToStep: PropTypes.number,
  getCurrentStep: PropTypes.func,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      selector: PropTypes.string,
      content: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
        PropTypes.func,
      ]).isRequired,
      position: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.oneOf(["top", "right", "bottom", "left", "center"]),
      ]),
      action: PropTypes.func,
      actionBefore: PropTypes.func,
      style: PropTypes.object,
      stepInteraction: PropTypes.bool,
      navDotAriaLabel: PropTypes.string,
    })
  ),
  update: PropTypes.string,
  updateDelay: PropTypes.number,
  disableInteraction: PropTypes.bool,
  disableDotsNavigation: PropTypes.bool,
  disableKeyboardNavigation: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOf(["esc", "right", "left"])),
    PropTypes.bool,
  ]),
  rounded: PropTypes.number,
  accentColor: PropTypes.string,
};
var defaultProps = {
  accessibilityOptions: {
    closeButtonAriaLabel: "Close",
    showNavigationScreenReaders: true,
  },
  showNavigation: true,
  showNavigationNumber: true,
  showButtons: true,
  showCloseButton: true,
  showNumber: true,
  startAt: 0,
  scrollDuration: 1,
  maskSpace: 10,
  updateDelay: 1,
  disableInteraction: false,
  rounded: 0,
  accentColor: "#007aff",
  closeWithMask: true,
};

var CN = {
  mask: {
    base: "reactour__mask",
    isOpen: "reactour__mask--is-open",
    disableInteraction: "reactour__mask--disable-interaction",
  },
  helper: {
    base: "reactour__helper",
    isOpen: "reactour__helper--is-open",
  },
  dot: {
    base: "reactour__dot",
    active: "reactour__dot--is-active",
  },
};

function Tour(_ref) {
  var helperWidth = _ref.helperWidth,
    helperHeight = _ref.helperHeight,
    children = _ref.children,
    isOpen = _ref.isOpen,
    startAt = _ref.startAt,
    steps = _ref.steps,
    scrollDuration = _ref.scrollDuration,
    inViewThreshold = _ref.inViewThreshold,
    scrollOffset = _ref.scrollOffset,
    disableInteraction = _ref.disableInteraction,
    disableKeyboardNavigation = _ref.disableKeyboardNavigation,
    className = _ref.className,
    closeWithMask = _ref.closeWithMask,
    onRequestClose = _ref.onRequestClose,
    onAfterOpen = _ref.onAfterOpen,
    onBeforeClose = _ref.onBeforeClose,
    CustomHelper = _ref.CustomHelper,
    showNumber = _ref.showNumber,
    accentColor = _ref.accentColor,
    highlightedMaskClassName = _ref.highlightedMaskClassName,
    maskClassName = _ref.maskClassName,
    showButtons = _ref.showButtons,
    showNavigation = _ref.showNavigation,
    prevButton = _ref.prevButton,
    showNavigationNumber = _ref.showNavigationNumber,
    disableDotsNavigation = _ref.disableDotsNavigation,
    lastStepNextButton = _ref.lastStepNextButton,
    nextButton = _ref.nextButton,
    rounded = _ref.rounded,
    maskSpace = _ref.maskSpace,
    showCloseButton = _ref.showCloseButton,
    accessibilityOptions = _ref.accessibilityOptions;

  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    current = _useState2[0],
    setCurrent = _useState2[1];

  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    started = _useState4[0],
    setStarted = _useState4[1];

  var _useReducer = useReducer(reducer, initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    dispatch = _useReducer2[1];

  var helper = useRef(null);
  var observer = useRef(null);

  var a11yOptions = _objectSpread2(
    {},
    defaultProps.accessibilityOptions,
    {},
    accessibilityOptions
  );

  useEffect(
    function () {
      var _getWindow = getWindow(),
        w = _getWindow.w,
        h = _getWindow.h;

      var node = document.querySelector(steps[startAt].selector);
      var helperHeight = helper.current && getNodeRect(helper.current).height;
      var helperWidth = helper.current && getNodeRect(helper.current).width;
      dispatch(
        _objectSpread2(
          {
            type: "HAS_DOM_NODE",
          },
          getNodeRect(node),
          {
            right: startAt === 1?  getNodeRect(node).right - 225 : getNodeRect(node).right,
            left: startAt === 1?  getNodeRect(node).left - 225 : getNodeRect(node).left,
            helperWidth: helperWidth,
            helperHeight: helperHeight,
            helperPosition: steps[startAt].position,
            w: w,
            h: h,
            inDOM: true,
          }
        )
      );
    },
    [document.querySelector(steps[startAt].selector)]
  );
  useMutationObserver(observer, function (mutationList, observer) {
    if (isOpen) {
      showStep();
      mutationList.forEach(function (mutation) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          setTimeout(function () {
            return makeCalculations(getNodeRect(mutation.addedNodes[0]));
          }, 500);
        } else if (
          mutation.type === "childList" &&
          mutation.removedNodes.length > 0
        );
      });
    } else {
      observer.disconnect();
    }
  });
  useEffect(
    function () {
      var debouncedShowStep = debounce(showStep, 100);

      if (isOpen) {
        window.addEventListener("keydown", keyHandler, false);
        window.addEventListener("resize", debouncedShowStep, false);

        if (!started) {
          setStarted(true); // makeCalculations(
          //   {
          //     width: maskSpace * -1,
          //     height: maskSpace * -1,
          //     top: rounded * -1,
          //     left: rounded * -1,
          //   },
          //   'center'
          // )

          setCurrent(startAt);
          showStep(startAt);
        } else {
          showStep();
        }

        if (helper.current) {
          helper.current.focus();

          if (onAfterOpen && typeof onAfterOpen === "function") {
            onAfterOpen(helper.current);
          }
        }
      }

      return function () {
        window.removeEventListener("keydown", keyHandler);
        window.removeEventListener("resize", debouncedShowStep);
      };
    },
    [current, isOpen]
  );

  function keyHandler(e) {
    e.stopPropagation();

    if (disableKeyboardNavigation === true) {
      return;
    }

    var isEscDisabled, isRightDisabled, isLeftDisabled;

    if (disableKeyboardNavigation) {
      isEscDisabled = disableKeyboardNavigation.includes("esc");
      isRightDisabled = disableKeyboardNavigation.includes("right");
      isLeftDisabled = disableKeyboardNavigation.includes("left");
    }

    if (e.keyCode === 27 && !isEscDisabled) {
      // esc
      e.preventDefault();
      close();
    }

    if (e.keyCode === 39 && !isRightDisabled) {
      // right
      e.preventDefault();
      nextStep();
    }

    if (e.keyCode === 37 && !isLeftDisabled) {
      // left
      e.preventDefault();
      prevStep();
    }
  }

  function close(e) {
    if (onBeforeClose && typeof onBeforeClose === "function") {
      onBeforeClose(helper.current);
    }

    onRequestClose(e);
  }

  function nextStep() {
    setCurrent(function (prev) {
      return prev < steps.length - 1 ? prev + 1 : prev;
    });
  }

  function prevStep() {
    setCurrent(function (prev) {
      return prev > 0 ? prev - 1 : prev;
    });
  }

  function goTo(step) {
    setCurrent(step);
  }

  function showStep(nextStep) {
    var step, _getWindow2, w, h, node, nodeRect, offset;

    return regeneratorRuntime.async(function showStep$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            step = steps[nextStep] || steps[current];
            (_getWindow2 = getWindow()),
              (w = _getWindow2.w),
              (h = _getWindow2.h);

            if (
              !(step.actionBefore && typeof step.actionBefore === "function")
            ) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return regeneratorRuntime.awrap(step.actionBefore());

          case 5:
            node = step.selector ? document.querySelector(step.selector) : null;

            if (step.observe) {
              observer.current = document.querySelector(step.observe);
            }

            if (node) {
              // DOM node exists
              nodeRect = getNodeRect(node); // step is outside view

              if (
                !inView(
                  _objectSpread2({}, nodeRect, {
                    w: w,
                    h: h,
                    threshold: inViewThreshold,
                  })
                )
              ) {
                // const parentScroll = Scrollparent(node)
                offset = scrollOffset
                  ? scrollOffset
                  : nodeRect.height > h
                  ? -25
                  : -(h / 2) + nodeRect.height / 2;
                scrollSmooth.to(node, {
                  context: window,
                  duration: scrollDuration,
                  offset: offset,
                  callback: function callback(_node) {
                    setTimeout(function () {
                      makeCalculations(getNodeRect(_node), step.position);
                    }, 0);
                  },
                });
              } else {
                setTimeout(function () {
                  makeCalculations(nodeRect, step.position);
                }, 50);
              }
            } else {
              dispatch({
                type: "NO_DOM_NODE",
                helperPosition: step.position,
                w: w,
                h: h,
                inDOM: false,
              });
            }

            if (!(step.action && typeof step.action === "function")) {
              _context.next = 11;
              break;
            }

            _context.next = 11;
            return regeneratorRuntime.awrap(step.action(node));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  function makeCalculations(nodeRect, helperPosition) {
    var _getWindow3 = getWindow(),
      w = _getWindow3.w,
      h = _getWindow3.h;

    var _getNodeRect = getNodeRect(helper.current),
      helperWidth = _getNodeRect.width,
      helperHeight = _getNodeRect.height;

    dispatch(
      _objectSpread2(
        {
          type: "HAS_DOM_NODE",
        },
        nodeRect,
        {
          helperWidth: helperWidth,
          helperHeight: helperHeight,
          helperPosition: helperPosition,
          w: w,
          h: h,
          inDOM: true,
        }
      )
    );
  }

  function maskClickHandler(e) {
    if (
      closeWithMask &&
      e.target.className.baseVal
        .split(" ")
        .indexOf(CN.mask.disableInteraction) === -1
    ) {
      close(e);
    }
  }

  var stepContent =
    steps[current] &&
    (typeof steps[current].content === "function"
      ? steps[current].content({
          close: close,
          goTo: goTo,
          inDOM: state.inDOM,
          step: current + 1,
        })
      : steps[current].content);
  return isOpen
    ? React.createElement(
        Portal,
        null,
        React.createElement(GlobalStyle, null),
        React.createElement(SvgMask, {
          onClick: maskClickHandler,
          windowWidth: state.w,
          windowHeight: state.h,
          targetWidth: state.width,
          targetHeight: state.height,
          targetTop: state.top,
          targetLeft: state.left,
          padding: maskSpace,
          rounded: rounded,
          className: maskClassName,
          disableInteraction:
            steps[current].stepInteraction === false || disableInteraction
              ? !steps[current].stepInteraction
              : disableInteraction,
          disableInteractionClassName: cn(
            CN.mask.disableInteraction,
            highlightedMaskClassName
          ),
        }),
        React.createElement(
          FocusLock,
          null,
          React.createElement(
            Guide,
            {
              ref: helper,
              windowWidth: state.w,
              windowHeight: state.h,
              targetWidth: state.width,
              targetHeight: state.height,
              targetTop: state.top,
              targetLeft: state.left,
              targetRight: state.right,
              targetBottom: state.bottom,
              helperWidth: state.helperWidth,
              helperHeight: state.helperHeight,
              helperPosition: state.helperPosition,
              padding: maskSpace,
              tabIndex: -1,
              current: current,
              style: steps[current].style ? steps[current].style : {},
              rounded: rounded,
              accentColor: accentColor,
              defaultStyles: !CustomHelper,
              className: cn(
                CN.helper.base,
                className,
                _defineProperty({}, CN.helper.isOpen, isOpen)
              ),
              role: "dialog",
              "aria-labelledby": a11yOptions.ariaLabelledBy,
            },
            CustomHelper
              ? React.createElement(
                  CustomHelper,
                  {
                    current: current,
                    totalSteps: steps.length,
                    gotoStep: goTo,
                    close: close,
                    content: stepContent,
                  },
                  children
                )
              : React.createElement(
                  React.Fragment,
                  null,
                  children,
                  stepContent,
                  (showButtons || showNavigation) &&
                    React.createElement(
                      Controls,
                      {
                        "data-tour-elem": "controls",
                      },
                      showButtons &&
                        React.createElement(Arrow$1, {
                          onClick: prevStep,
                          disabled: current === 0,
                          label: prevButton ? prevButton : null,
                        }),
                      showNavigation &&
                        React.createElement(
                          Navigation,
                          {
                            "data-tour-elem": "navigation",
                            "aria-hidden": !a11yOptions.showNavigationScreenReaders,
                          },
                          steps.map(function (s, i) {
                            return React.createElement(Dot, {
                              key: ""
                                .concat(s.selector ? s.selector : "undef", "_")
                                .concat(i),
                              onClick: function onClick() {
                                return goTo(i);
                              },
                              current: current,
                              index: i,
                              disabled: current === i || disableDotsNavigation,
                              showNumber: showNavigationNumber,
                              "data-tour-elem": "dot",
                              className: cn(
                                CN.dot.base,
                                _defineProperty(
                                  {},
                                  CN.dot.active,
                                  current === i
                                )
                              ),
                              "aria-label": s.navDotAriaLabel,
                            });
                          })
                        ),
                      showButtons &&
                        React.createElement(Arrow$1, {
                          onClick:
                            current === steps.length - 1
                              ? lastStepNextButton
                                ? close
                                : function () {}
                              : typeof nextStep === "function"
                              ? nextStep
                              : this.nextStep,
                          disabled:
                            !lastStepNextButton && current === steps.length - 1,
                          inverted: true,
                          label:
                            lastStepNextButton && current === steps.length - 1
                              ? lastStepNextButton
                              : nextButton
                              ? nextButton
                              : null,
                        })
                    ),
                  showCloseButton &&
                    React.createElement(StyledClose, {
                      onClick: close,
                      ariaLabel: a11yOptions.closeButtonAriaLabel,
                      className: "reactour__close",
                    })
                )
          )
        )
      )
    : null;
}

var initialState = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
  w: 0,
  h: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "HAS_DOM_NODE":
      var type = action.type,
        newState = _objectWithoutProperties(action, ["type"]);

      return _objectSpread2({}, state, {}, newState);

    case "NO_DOM_NODE":
      return _objectSpread2({}, state, {
        top: state.h + 10,
        right: state.w / 2 + 9,
        bottom: state.h / 2 + 9,
        left: action.w / 2 - state.helperWidth ? state.helperWidth / 2 : 0,
        width: 0,
        height: 0,
        w: action.w,
        h: action.h,
        helperPosition: "center",
      });

    default:
      return state;
  }
}

Tour.propTypes = propTypes;
Tour.defaultProps = defaultProps;
var Tour$1 = memo(Tour);

export default Tour$1;
export {
  Arrow$1 as Arrow,
  Badge,
  StyledClose as Close,
  Controls,
  Dot,
  Navigation,
};
