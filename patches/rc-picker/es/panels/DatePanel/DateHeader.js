import * as React from 'react';
import Header from '../Header';
import PanelContext from '../../PanelContext';

function DateHeader(props) {
  var prefixCls = props.prefixCls,
      generateConfig = props.generateConfig,
      locale = props.locale,
      viewDate = props.viewDate,
      onNextMonth = props.onNextMonth,
      onPrevMonth = props.onPrevMonth,
      onNextYear = props.onNextYear,
      onPrevYear = props.onPrevYear,
      onYearClick = props.onYearClick,
      onMonthClick = props.onMonthClick;

  var _React$useContext = React.useContext(PanelContext),
      hideHeader = _React$useContext.hideHeader;

  if (hideHeader) {
    return null;
  }

  var headerPrefixCls = "".concat(prefixCls, "-header");
  var monthsLocale = locale.shortMonths || (generateConfig.locale.getShortMonths ? generateConfig.locale.getShortMonths(locale.locale) : []);
  var month = generateConfig.getMonth(viewDate);
  /**
   * 禁用年选择器
   */
  // =================== Month & Year ===================

  var yearNode = React.createElement("button", {
    type: "button",
    key: "year",
    onClick: onYearClick,
    tabIndex: -1,
    className: "".concat(prefixCls, "-year-btn"),
    disabled: true
  }, generateConfig.locale.format(locale.locale, viewDate, locale.yearFormat));
  /**
   * 禁用月选择器
   */

  var monthNode = React.createElement("button", {
    type: "button",
    key: "month",
    onClick: onMonthClick,
    tabIndex: -1,
    className: "".concat(prefixCls, "-month-btn"),
    disabled: true
  }, locale.monthFormat ? generateConfig.locale.format(locale.locale, viewDate, locale.monthFormat) : monthsLocale[month]);
  var monthYearNodes = locale.monthBeforeYear ? [monthNode, yearNode] : [yearNode, monthNode];
  return React.createElement(Header, Object.assign({}, props, {
    prefixCls: headerPrefixCls,
    onSuperPrev: onPrevYear,
    onPrev: onPrevMonth,
    onNext: onNextMonth,
    onSuperNext: onNextYear
  }), monthYearNodes);
}

export default DateHeader;