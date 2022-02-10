import moment from 'moment'
import store from '@/store/appStore'

export const logType = {
  LOGIN_OUT: 4,
  MENU_CLICK: 8,
  SEARCH_APP: 9,
  SEARCH_CATE: 10,
  JUMP_DETITIAL: 11,
  CATE_CLICK: 12,
  CONTRAST_CLICK: 13,
  ATTENTION_CLICK: 14,
  DOWNLOAD_CLCIK: 16,
  NOTICE_CLICK: 17,
  HELP_CLICK: 18,
  LANGUAGE_CLICK: 19,
}

export const getLatelyDay = (): string => {
  return moment()
    .week(moment().week() - 1)
    .endOf('week')
    .format('YYYY-MM-DD')
}

export const getLatelyWeek = (): string => {
  return moment()
    .week(moment().week() - 2)
    .startOf('week')
    .subtract(-1, 'days')
    .format('YYYY-MM-DD')
}

export const getLatelyMonth = (): string => {
  return moment()
    .month(moment().month() - 2)
    .startOf('month')
    .format('YYYY-MM')
}
export const clusterTypes = [
  'j_curve',
  'steady_growth',
  'w_curve',
  'stable',
  'l_curve',
  'steady_decline',
]

export const clusterActiveTypes = {
  HH: 'high_act_high_loyalty',
  HM: 'high_act_moderate_loyalty',
  MH: 'moderate_act_high_loyalty',
  HL: 'high_act_low_loyalty',
  MM: 'moderate_act_moderate_loyalty',
  LH: 'low_act_high_loyalty',
  ML: 'moderate_act_low_loyalty',
  LM: 'low_act_moderate_loyalty',
  LL: 'low_act_low_loyalty',
}

export const clusterActiveTypesKey = Object.keys(clusterActiveTypes)

export const clusterActiveTypesValue = Object.entries(clusterActiveTypes)
  .map(item => {
    return item[1]
  })
  .reverse()

/**
 * 指标说明
 */
export const scaleList = [
  {
    title: 'active_users',
    desc: 'active_users_desc',
  },
  {
    title: 'avg_daily_act_users',
    desc: 'avg_daily_act_users_desc',
  },
  {
    title: 'share_total_act_users',
    desc: 'share_total_act_users_desc',
  },
  {
    title: 'share_avg_daily_act_users',
    desc: 'share_avg_daily_act_users_desc',
  },
]

export const scaleSupplementList = [
  {
    title: 'trend_dau_growth_decl_gap',
    desc: 'trend_dau_growth_decl_gap_desc',
  },
  {
    title: 'con_level_act_users',
    desc: 'con_level_act_users_desc',
  },

  {
    title: 'con_level_penet_rate',
    desc: 'con_level_penet_rate_desc',
  },
]

export const frequencyList = [
  {
    title: 'sessions',
    desc: 'sessions_desc',
  },
  {
    title: 'share_total_sessions',
    desc: 'share_total_sessions_desc',
  },
  {
    title: 'avg_daily_sessions',
    desc: 'avg_daily_sessions_desc',
  },
  {
    title: 'share_avg_daily_sessions',
    desc: 'share_avg_daily_sessions_desc',
  },
]

export const frequencySupplementList = [
  {
    title: 'week_day_avg_sessions_user',
    desc: 'week_day_avg_sessions_user_desc',
  },
  {
    title: 'disp_avg_daily_sessions_per_user',
    desc: 'disp_avg_daily_sessions_per_user_desc',
  },

  {
    title: 'trend_daily_sessions_growth_decl_gap',
    desc: 'trend_daily_sessions_growth_decl_gap_desc',
  },
]

export const frequencyAvgList = [
  {
    title: 'avg_sessions_user',
    desc: 'avg_sessions_user_desc',
  },
  {
    title: 'avg_daily_sessions_user',
    desc: 'avg_daily_sessions_user_desc',
  },
]

export const timeSupplementList = [
  {
    title: 'week_day_avg_timespent_per_user',
    desc: 'week_day_avg_timespent_per_user_desc',
  },
  {
    title: 'disp_avg_daily_timespent_per_user',
    desc: 'disp_avg_daily_timespent_per_user_desc',
  },
  {
    title: 'trend_daily_timespent_per_user_growth_decl_gap',
    desc: 'trend_daily_timespent_per_user_growth_decl_gap_desc',
  },
]

export const timeList = [
  {
    title: 'time_spent',
    desc: 'time_spent_desc',
  },
  {
    title: 'avg_daily_time_spent',
    desc: 'avg_daily_time_spent_desc',
  },
  {
    title: 'share_time_spent',
    desc: 'share_time_spent_desc',
  },
  {
    title: 'share_avg_daily_time_spent',
    desc: 'share_avg_daily_time_spent_desc',
  },
]

export const timeAvgList = [
  {
    title: 'avg_time_spent_user',
    desc: 'avg_time_spent_user_desc',
  },
  {
    title: 'avg_daily_time_spent_user',
    desc: 'avg_daily_time_spent_user_desc',
  },
]

export const timeAvgDaysList = [
  {
    title: 'avg_usage_days_user',
    desc: 'avg_usage_days_user_desc',
  },
]

export const growthYoyList = [
  {
    title: 'spec_mon_num',
    desc: 'spec_mon_num_desc',
  },
  {
    title: 'last_year_num',
    desc: 'last_year_num_desc',
  },
  {
    title: 'yoy',
    desc: 'yoy_desc',
  },
]

export const growthMomList = [
  {
    title: 'spec_mon_num',
    desc: 'spec_mon_num_desc',
  },
  {
    title: 'prev_mon_num',
    desc: 'prev_mon_num_desc',
  },
  {
    title: 'mom',
    desc: 'mom_desc',
  },
]

export const growthCompoundList = [
  {
    title: 'mon_dau_end_mon',
    desc: 'mon_dau_end_mon_desc',
  },
  {
    title: 'mon_comp_growth',
    desc: 'mon_comp_growth_desc',
  },
]

export const growthSupplementList = [
  {
    title: 'mon_dau_begin_mon',
    desc: 'mon_dau_begin_mon_desc',
  },

  {
    title: 'dau_spec_mon',
    desc: 'dau_spec_mon_desc',
  },
  {
    title: 'dau_last_year',
    desc: 'dau_last_year_desc',
  },
]

export const detailGrowthCompoundList = [
  {
    title: 'yoy',
    desc: 'yoy_desc',
  },
  {
    title: 'mom',
    desc: 'mom_desc',
  },
  {
    title: 'dau_spec_mon',
    desc: 'dau_spec_mon_desc',
  },
  {
    title: 'DAU_of_last_year',
    desc: 'DAU_of_last_year_help',
  },
  {
    title: 'mon_dau_begin_mon',
    desc: 'mon_dau_begin_mon_desc',
  },
  {
    title: 'mon_dau_end_mon',
    desc: 'mon_dau_end_mon_desc',
  },
  {
    title: 'mon_comp_growth',
    desc: 'mon_comp_growth_desc',
  },
]

export const qualityList = [
  {
    title: 'avg_daily_act_users',
    desc: 'avg_daily_act_users_desc',
  },
  {
    title: 'avg_usage_days_user',
    desc: 'avg_usage_days_user_desc',
  },
  {
    title: 'avg_daily_sessions_user',
    desc: 'avg_daily_sessions_user_desc',
  },
  {
    title: 'avg_daily_time_spent_user',
    desc: 'avg_daily_time_spent_user_desc',
  },
  { title: 'user_qual_type_dist', desc: 'user_qual_type_dist_desc' },

  {
    title: 'high_act_high_loyalty',
    desc: 'high_act_high_loyalty_desc',
  },
  {
    title: 'high_act_moderate_loyalty',
    desc: 'high_act_moderate_loyalty_desc',
  },
  {
    title: 'moderate_act_high_loyalty',
    desc: 'moderate_act_high_loyalty_desc',
  },
  {
    title: 'high_act_low_loyalty',
    desc: 'high_act_low_loyalty_desc',
  },
  {
    title: 'moderate_act_moderate_loyalty',
    desc: 'moderate_act_moderate_loyalty_desc',
  },
  {
    title: 'low_act_high_loyalty',
    desc: 'low_act_high_loyalty_desc',
  },
  {
    title: 'moderate_act_low_loyalty',
    desc: 'moderate_act_low_loyalty_desc',
  },
  {
    title: 'low_act_moderate_loyalty',
    desc: 'low_act_moderate_loyalty_desc',
  },
  {
    title: 'low_act_low_loyalty',
    desc: 'low_act_low_loyalty_desc',
  },
]

export const modeList = [
  {
    title: 'mon_dau_end_mon',
    desc: 'mon_dau_end_mon_desc',
  },
  {
    title: 'growth_pattern_dist',
    desc: 'growth_pattern_dist_desc',
  },
  {
    title: 'j_curve',
    desc: 'j_curve_desc',
    img: 'help_3',
  },
  {
    title: 'steady_growth',
    desc: 'steady_growth_desc',
    img: 'help_2',
  },
  {
    title: 'w_curve',
    desc: 'w_curve_desc',
    img: 'help_5',
  },
  {
    title: 'stable',
    desc: 'stable_desc',
    img: 'help_1',
  },
  {
    title: 'l_curve',
    desc: 'l_curve_desc',
    img: 'help_4',
  },
  {
    title: 'steady_decline',
    desc: 'steady_decline_desc',
    img: 'help_6',
  },
]

export const compoundDailyList = [
  {
    title: 'compound_daily_growth_rat',
    desc: 'compound_daily_growth_rat_desc',
  },
]

export const detailQualityList = [
  {
    title: 'avg_daily_act_users',
    desc: 'avg_daily_act_users_desc',
  },
  {
    title: 'avg_usage_days_user',
    desc: 'avg_usage_days_user_desc',
  },
  {
    title: 'avg_daily_sessions_user',
    desc: 'avg_daily_sessions_user_desc',
  },
  {
    title: 'avg_daily_time_spent_user',
    desc: 'avg_daily_time_spent_user_desc',
  },
  {
    title: 'high_act_high_loyalty',
    desc: 'high_act_high_loyalty_desc',
  },
  {
    title: 'high_act_moderate_loyalty',
    desc: 'high_act_moderate_loyalty_desc',
  },
  {
    title: 'moderate_act_high_loyalty',
    desc: 'moderate_act_high_loyalty_desc',
  },
  {
    title: 'high_act_low_loyalty',
    desc: 'high_act_low_loyalty_desc',
  },
  {
    title: 'moderate_act_moderate_loyalty',
    desc: 'moderate_act_moderate_loyalty_desc',
  },
  {
    title: 'low_act_high_loyalty',
    desc: 'low_act_high_loyalty_desc',
  },
  {
    title: 'moderate_act_low_loyalty',
    desc: 'moderate_act_low_loyalty_desc',
  },
  {
    title: 'low_act_moderate_loyalty',
    desc: 'low_act_moderate_loyalty_desc',
  },
  {
    title: 'low_act_low_loyalty',
    desc: 'low_act_low_loyalty_desc',
  },
]

export const detailModeListList = [
  {
    title: 'avg_daily_act_users',
    desc: 'avg_daily_act_users_desc',
  },
  ...compoundDailyList,
  ...modeList.slice(2, modeList.length),
]

export const formatPatten = 'YYYY-MM-DD'
