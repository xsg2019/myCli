const productListInfo = [
  {
    name: 'TRUTH-专业版',
    enName: 'TRUTH-Professional',
    code: 'classic',
    img: 'https://cdn.questmobile.cn/assets/common/apply/t1.jpg',
    title: '超过160个权威指标，全面理解市场趋势和竞争环境',
    enTitle:
      'Over 160 authoritative indicators give you a full view of market trend and competitive landscape.',
    cont: [
      'App综合价值度评估：整合App全运营指标，从下载、安装直至卸载的全生命周期指标，洞察App综合价值度。',
      'App用户全行为健康度评估：综合评估App用户使用习惯、粘性等指标，深度解析App用户行为健康度。',
      'App用户生命周期转化漏斗分析：深度评估App用户从下载、激活直至留存流失的行为转化漏斗。',
      'App受众画像变化洞察：从受众性别、年龄以及地域等，深度洞察App受众全景画像。',
    ],
    enCont: [
      'App Comprehensive Performance Evaluation. This Database offers a variety of data metrics including but not limited to, downloads, installations, uninstallations etc., that help professionals to evaluate the comprehensive performance of Apps.',
      "App User Quality Evaluation. This Database helps professionals to evaluate the quality of target App's user base by observing the behavior of App users.",
      "App User Conversion Analysis. This database monitors the target App's users' conversion from downloads to being active and eventually to leaving the App.",
      "App User Profile Analysis. This database offers App Users' demographic and geographic profile data.",
    ],
  },

  {
    name: 'TRUTH-极速版',
    enName: 'TRUTH-Flash',
    code: 'flash',
    img: 'https://cdn.questmobile.cn/assets/common/apply/t2.jpg',
    title: '第一时间获取App核心指标，多维动态分析场景模型',
    enTitle: 'First Hand Data of App Performance in Multi-Scenario.',
    cont: [
      '极速到天核心指标：行业内及时的数据更新速度，细化到每一天的App精确核心指标，帮助您多维全面分析App运营状态。',
      '高效分析场景洞察：多种数据联动图表与数据分析模型，带来更多维的场景分析应用与更极致的数据呈现体验，覆盖运营分析、产品分析、市场分析、行业分析等多重场景洞察。',
      '智能模型辅助判断：AI算法升级，智能动态模型自动聚类App，一键洞察App分类和增长模型，辅助判断未来趋势。',
    ],
    enCont: [
      'Actual daily metrics that help users track the performance of mobile Apps from multiple angles.',
      'Highly efficient analysis tools and charts that help users to perform operation analysis, product competition analysis, market analysis and a variety of other use cases.',
      'Upgraded algorithms with AI features that help users to identify and track Apps with similar growth patterns.',
    ],
  },
  {
    name: 'TRUTH-品牌版',
    enName: '',
    code: 'brand',
    img: 'https://cdn.questmobile.cn/assets/common/apply/t12.png',
    title: '洞察品牌用户真相，提升数字化营运效率',
    enTitle: '',
    cont: [
      '横纵对比行业：覆盖四大行业，27个品类，全景式展现行业、品类、品牌用户流转变化。',
      '关联各类渠道：展现品牌在内容、电商、私域多渠道的营运数据，发现关键趋势，明确发展方向。',
      '串联营运闭环：构建四大模型、三大指标体系，对品牌营销各个环节进行量化评估，展现转化效率。',
      '洞察用户价值：分层描绘品类品牌的用户画像，关联用户行为偏好，指导不同平台流量与用户运营的精根细作。',
    ],
    enCont: [],
  },

  {
    name: 'TRUTH-渠道版',
    enName: '',
    code: 'channeldata',
    img: 'https://cdn.questmobile.cn/assets/common/apply/t3.jpg',
    title: '覆盖全部主流下载渠道，投入产出一目了然',
    enTitle: '',
    cont: [
      '深度评估App分发渠道综合价值度：应用商店综合引流用户能力以及安装激活转化成功率分析。',
      '解析App受众与分发渠道用户契合度：基于用户属性、行为偏好等，深度解析应用商店受众画像与App受众用户契合度。',
      '渠道分发引流用户忠诚度与粘性评估：不同应用商店或分发渠道引流用户产品使用粘性差异化研究。',
      '洞察竞品分发渠道与渠道流失影响：锁定同类型竞品分发渠道，洞察渠道分发推荐导致徘徊用户竞品转移。',
    ],
    enCont: [],
  },

  {
    name: 'TRUTH-营销版',
    enName: '',
    code: 'marketing',
    img: 'https://cdn.questmobile.cn/assets/common/apply/t4.jpg',
    title: '基于上千人群画像标签，移动营销原生策略平台',
    enTitle: '',
    cont: [
      '用户画像深度洞察：150+高置信度属性标签，结合移动互联网属性行为，快捷展现不同时期TA特征。',
      '全面挖掘媒介价值：清晰展现各媒介行业市场覆盖度，多属性指标详细展现各媒介间的潜在价值。',
      '媒介策略预判分析：快速锁定目标用户的媒介使用频率，精分不同组合下的属性维度、分时段媒介覆盖计划，计算投放周期与重复曝光ROI。',
      '用户触媒偏好分析：从媒介-用户和用户-媒介双向分析，掌握触达目标市场最佳渠道。',
    ],
    enCont: [],
  },

  {
    name: 'TRUTH-跨屏版',
    enName: '',
    code: 'matrix',
    img: 'https://cdn.questmobile.cn/assets/common/apply/t5.jpg',
    title: '移动+PC多屏展现，体现全网资产价值',
    enTitle: '',
    cont: [
      '流量全面整合：整合移动端和PC端流量，能够帮助您更全面地评估整体流量资产。',
      '频道流量价值：拆解到PC端垂直频道的流量，帮助您了解不同频道间的流量价值。',
      '媒介资源配置：通过对移动端和PC端的整合，更有效地支撑广告预算在不同媒介间的分配，提升广告投放效率。',
    ],
    enCont: [],
  },

  {
    name: 'TRUTH-黑马榜',
    enName: 'TRUTH-Dark Horse List',
    code: 'horse',
    img: 'https://cdn.questmobile.cn/assets/common/apply/t6.jpg',
    title: '把握爆发赛道机遇，寻找潜力增长选手',
    enTitle:
      'A Compass That Points You to The Right Direction. A Radar That Detects The Player With The Highest Potential.',
    cont: [
      '爆发赛道扫描，抢占市场先机：扫描最新的爆发赛道，先于对手抢占市场先机。',
      '挖掘黑马，锁定投资标的：挖掘各赛道综合复合增长率潜力黑马App，快速精准锁定投资标的。',
      '跟踪App用户规模与增长趋势：持续跟踪高增长App用户规模与增长率连续趋势，为投资判断提供有效数据支撑。',
      '全网App扫描，快速掌握增长动态：全网App扫描，上至头部App下至中小App全涵盖，快速掌握全行业App增长动态。',
      '深度指标预判：深度指标预判选型App未来增长/流失与行业增速/衰减研究。',
    ],
    enCont: [
      'A Compass that helps professionals to sense the early trend of the next high potential sector.',
      'A Laser Pointer that helps professionals to identify the fastest growing Apps in target sectors.',
      'A Scale that tracks the user number and growth trend of target Apps.',
      'A Radar that scans the entire mobile internet and no App is too small for it to track.',
      'An Analytical Tool that helps professionals to predict the future growth of target App/Sector.',
    ],
  },

  {
    name: 'TRUTH-小程序',
    enName: 'TRUTH-Mini Program',
    code: 'mini-program',
    img: 'https://cdn.questmobile.cn/assets/common/apply/t8.jpg',
    title: '微信生态全洞察，探索营销新玩法',
    enTitle: 'Dive Deep into the WeChat Ecosystem and Explore More Play Rules of Online Marketing.',
    cont: [
      '小程序细分领域发展趋势：覆盖小程序24大细分行业主流的微信小程序，洞察小程序行业整体发展以及细分行业格局，发掘新生态下优秀黑马。',
      '小程序竞品深度洞察：展示细分行业内各小程序的全生命周期趋势，洞察小程序间重合独占情况，帮助企业设定有针对性的竞争策略。',
      '小程序洞察核心运营指标体系：用户活跃长期监控：月/周活跃用户数、月/周日均活跃用户数等；用户质量常规分析：多节点监控用户留存情况，综合评估产品运营质量。',
      '用户画像模块：通过分析目标小程序媒体的多维度用户属性分布，以及用户行为偏好等，能够更全面、深度地洞察目标小程序媒体的用户特征，挖掘小程序的用户价值，进行目标小程序与其他小程序的契合度评估。',
    ],
    enCont: [
      'Performance of Different Sectors. This database categorizes all Mini Programs into 24 categories and helps users to evaluate the performance of each category and identify the fastest growing product in each category.',
      'Competition analysis. This database helps professionals to understand the competition and overlap between different Mini Programs.',
      'Operation Analysis. This database offers a variety of metrics including but not limited to, number of users, time spent, sessions and retention rate etc., all of which can be used in day to day operation work.',
      'User Profile Analysis. This database offers Mini Program users demographic and geographic profile metrics.',
    ],
  },

  {
    name: 'TRUTH-全景版',
    enName: 'TRUTH-Fullview',
    code: 'fullview',
    img: 'https://cdn.questmobile.cn/assets/common/apply/t9.png',
    title: '移动全景数据洞察，展现生态流量新价值',
    enTitle: 'Discover The Value of Traffic Across All Platforms.',
    cont: [
      '全景生态流量洞察，站在决策制高点：覆盖移动端主要流量入口，全景掌握移动端流量分布；洞察行业及竞品的流量的战略布局。',
      'App/微信小程序/阿里小程序/百度小程序，多平台重合分析：深度分析App与各个小程序平台间的受众重合关系，全盘把握用户整体价值。',
      '洞察流量流转趋势，把握流量风口：展示App与各个小程序平台间流量流转趋势，帮助企业有效做好流量拓展布局，把握流量风口。',
      '移动端用户全景画像：全面还原移动端整体特征，精细化运营各渠道用户，给流量赋能新价值。',
    ],
    enCont: [
      'Command the highest ground of strategic decision making by grasping the trend across all platforms of the mobile internet.',
      'Understand the value of users by analyzing the trend on Standalone App, WeChat Mini Programs, AliPay Mini Programs, Baidu Mini Programs and other platforms.',
      'Spot the next opportunity by understanding the flow of user traffic among different platforms.',
      'Make better operation decisions by understanding the demographic features of users across all platforms.',
    ],
  },

  {
    name: 'TRUTH-新媒版',
    enName: '',
    code: 'kol',
    img: 'https://cdn.questmobile.cn/assets/common/apply/t10.jpg',
    title: '精准锁定，高效筛选，加速品牌数字化转型助力KOL营销',
    enTitle: '',
    cont: [
      '合作KOL筛选：品牌及KOL平台受众分析，快速输出适合各KOL平台的合作达人推荐名单。',
      '媒介投放规划：精准判断KOL带货能力，洞察KOL与品牌行业之间的关联性，优化KOL组合投放策略。',
      '营销活动规划：挖掘KOL画像、平台画像与品牌受众画像间的交互关系，策划提升用户互动转化的营销活动。',
      '效果预估及监测：行业及竞品营销数据分析，完善投放效果预测+追踪，包括流量、转评赞，直播带货以及ROI。',
    ],
    enCont: [],
  },

  {
    name: 'TRUTH-广告版',
    enName: '',
    code: 'media',
    img: 'https://cdn.questmobile.cn/assets/common/apply/t11.png',
    title: '还原数千品牌商真实广告投放数据，洞察媒介广告价值',
    enTitle: '',
    cont: [
      '广告投放市场趋势掌握：覆盖品牌和效果广告，跟进新媒介发展，全面展示核心资源广告预算投放趋势。',
      '广告投放策略跟进分析：覆盖全面广告主所在行业，聚焦对比分析竞品营销动作，帮助理解（投放市场）并根据市场变化动态优化策略。',
      '媒介价值分析：从媒介在投品牌、广告收入和用户属性特征（等角度）全面展现价值，帮助精准理解和分配广告花费。',
      '广告主与媒介双向对应分析，充分理解和发掘广告市场价值：从媒介行业到广告主行业，从媒介类型到产品分类，从媒介到品牌，从广告点位到子品牌，全方位多角度分析互联网广告市场。',
    ],
    enCont: [],
  },
]

export default productListInfo
