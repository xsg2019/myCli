import { handleYAxisName, handlePieFormat, toFixedTwoPoint, handleCropName } from '@/utils'
/**
 * 条状图
 * @param timeLine
 * @param sourceData
 * @param legendData
 */
const PieOptions = (timeLine, sourceData, legendData, _, perSourceData, dateType, tabkey) => {
  const yAxisName = handleYAxisName(dateType, tabkey, [
    'share_total_act_users',
    'day_active_user_permeability',
  ])
  sourceData = perSourceData.map(item => {
    if (item === '') return '0'
    return item
  })
  timeLine = (function () {
    var timeStr = ''
    var timeSplit = ''
    var list = []
    for (var x = 0; x < timeLine.length; x++) {
      if (timeLine[x].indexOf('~') > 0) {
        timeSplit = timeLine[x].split('~')
        timeStr = timeSplit[0] + '\n' + timeSplit[1]
      } else {
        timeStr = timeLine[x]
      }
      list.push(timeStr)
    }
    return list
  })()
  return {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '9%',
      top: '16%',
      containLabel: true,
    },
    legend: {
      data: [`${timeLine[timeLine.length - 1].replace('\n', '~')} ${yAxisName}`],
      icon: 'none',
      selectedMode: false, //取消图例上的点击事件
    },

    dataset: {
      source: [['appname', ...timeLine], ...sourceData],
    },
    series: [
      {
        name: `${timeLine[timeLine.length - 1].replace('\n', '~')} ${yAxisName}`,
        type: 'pie',
        id: 'pie',
        roseType: 'area',
        radius: ['15%', '50%'],
        center: ['50%', '50%'],
        encode: {
          itemName: 'appanme',
          value: timeLine[timeLine.length - 1],
          tooltip: timeLine[timeLine.length - 1],
        },
        itemStyle: {
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 3,
          shadowOffsetY: 3,
        },
        tooltip: {
          trigger: 'item',
          formatter: param => {
            return (
              `${param.value[0].split('?qmid=')[0]}` +
              '<br/>' +
              (yAxisName + ' : ' + handlePieFormat(param.value[param.value.length - 1]))
            )
          },
        },

        label: {
          formatter: param => {
            if (sourceData.length === 1) {
              return (
                `${handleCropName(param.value[0].split('?qmid=')[0])}:` +
                handlePieFormat(param.value[param.value.length - 1])
              )
            }

            return (
              `${handleCropName(param.value[0].split('?qmid=')[0])}: \n` +
              handlePieFormat(param.value[param.value.length - 1])
            )
          },
          position: 'outer',
          color: '#111111',
          distanceToLabelLine: 5,
          align: 'center',
          lineHeight: 18,
          alignTo: 'none',
        },
        labelLine: {
          lineStyle: {
            color: '#cccccc',
          },
        },
      },
    ],
  }
}

export default PieOptions
