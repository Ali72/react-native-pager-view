function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { findNodeHandle, Keyboard, UIManager } from 'react-native';
import { getReactStringKeys } from './utils';
import { getViewManagerConfig, PagerViewViewManager } from './PagerViewNative';
export class EagerPager extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "isScrolling", false);

    _defineProperty(this, "onMoveShouldSetResponderCapture", () => this.isScrolling);

    _defineProperty(this, "onPageScroll", event => {
      var _this$props$onPageScr, _this$props;

      (_this$props$onPageScr = (_this$props = this.props).onPageScroll) === null || _this$props$onPageScr === void 0 ? void 0 : _this$props$onPageScr.call(_this$props, event);

      if (this.props.keyboardDismissMode === 'on-drag') {
        Keyboard.dismiss();
      }
    });

    _defineProperty(this, "onPageScrollStateChanged", event => {
      var _this$props$onPageScr2, _this$props2;

      (_this$props$onPageScr2 = (_this$props2 = this.props).onPageScrollStateChanged) === null || _this$props$onPageScr2 === void 0 ? void 0 : _this$props$onPageScr2.call(_this$props2, event);
      this.isScrolling = event.nativeEvent.pageScrollState === 'dragging';
    });
  }

  componentDidMount() {
    if (this.props.initialPage != null && this.props.initialPage > 0) {
      this.setPage(this.props.initialPage, false);
    }
  }
  /**
   * A helper function to scroll to a specific page in the PagerView.
   * Default to animated transition between pages.
   */


  setPage(page, animated = true) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), getViewManagerConfig().Commands.setPage, [page, animated]);
  }
  /**
   * A helper function to scroll to a specific page in the PagerView.
   * The transition between pages will *not* be animated.
   */


  setPageWithoutAnimation(page) {
    this.setPage(page, false);
  }
  /**
   * A helper function to enable/disable scroll imperatively.
   * The recommended way is using the scrollEnabled prop, however, there might
   * be a case where an imperative solution is more useful (e.g. for not
   * blocking an animation)
   */


  setScrollEnabled(scrollEnabled) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this), getViewManagerConfig().Commands.setScrollEnabled, [scrollEnabled]);
  }

  render() {
    const keys = getReactStringKeys(this.props.children);
    return /*#__PURE__*/React.createElement(PagerViewViewManager, {
      childrenKeys: keys,
      count: React.Children.count(this.props.children),
      offscreenPageLimit: this.props.offscreenPageLimit,
      offset: 0,
      onMoveShouldSetResponderCapture: this.onMoveShouldSetResponderCapture,
      onPageScroll: this.onPageScroll,
      onPageScrollStateChanged: this.onPageScrollStateChanged,
      onPageSelected: this.props.onPageSelected,
      orientation: this.props.orientation,
      overdrag: this.props.overdrag,
      pageMargin: this.props.pageMargin,
      scrollEnabled: this.props.scrollEnabled,
      showPageIndicator: this.props.showPageIndicator,
      style: this.props.style,
      transitionStyle: this.props.transitionStyle
    }, this.props.children);
  }

}
//# sourceMappingURL=EagerPager.js.map