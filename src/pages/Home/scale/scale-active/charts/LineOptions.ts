import { commafy, handleYAxisName, toFixedTwoPoint, handleCropName, formatToPoiont } from '@/utils'
import i18n from '@/i18n'
import { handleMapTo1 } from '@/charts/DoubleBarOptions'

/**
 * 线饼图联动
 * @param timeLine
 * @param sourceData
 * @param legendData
 */
const LineOptions = (timeLine, sourceData, legendData, _, permKpiDataTempArr, dateType, tabkey) => {
  const yAxisName = handleYAxisName(dateType, tabkey, ['yname_usernumber', 'yname_day_usernumber'])
  let selected = {}
  legendData.forEach((item, i) => {
    selected[item] = true
  })
  sourceData = sourceData.map(item =>
    item.map(item1 => {
      return handleMapTo1(item1)
    })
  )
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
  const series = legendData.map(item => {
    return {
      name: item.appName,
      type: 'line',
      smooth: true, //是否平滑
      showAllSymbol: false,
      symbol: 'circle',
      symbolSize: 3,
      seriesLayoutBy: 'row',
      lineStyle: {
        width: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)', //设置折线阴影
        shadowBlur: 3,
        shadowOffsetY: 3,
      },
    }
  })
  return {
    tooltip: {
      trigger: 'axis',
      transitionDuration: 0,
      showDelay: 0,
      axisPointer: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.3)',
        },
      },
      formatter: function (params) {
        var dataIndex = params[0]['dataIndex']
        var formats
        formats = params[0]['name'].replace('\n', '~') + '<br />'
        for (var i in params) {
          if (sourceData[i].slice(1, sourceData[i].length)[dataIndex] === '') {
            formats +=
              params[i]['marker'] +
              params[i]['seriesName'].split('?qmid=')[0] +
              ' : ' +
              '--' +
              '<br />'
          } else {
            formats +=
              params[i]['marker'] +
              params[i]['seriesName'].split('?qmid=')[0] +
              ' : ' +
              formatToPoiont(
                params[i]['value'].slice(1, params[i]['value'].length)[params[i].seriesIndex],
                true
              ) +
              '<br />'
          }
        }
        return formats
      },
    },
    dataset: {
      source: [['category', ...timeLine], ...sourceData],
    },
    dataZoom: [
      {
        show: true,
        // start: 0,
        // end: 30,
      },
    ],
    legend: [
      {
        x: 'center',
        data: legendData.slice(0, 5),
        selected,
        formatter: name => {
          return handleCropName(name.split('?qmid=')[0])
        },
      },
      {
        x: 'center',
        top: '5%',
        data: legendData.slice(5, 10),
        selected,
        formatter: name => {
          return handleCropName(name.split('?qmid=')[0])
        },
      },
    ],
    grid: [
      {
        left: 60,
        bottom: 50,
        right: 35,
        top: 80,
        containLabel: true,
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: timeLine,
        axisLine: {
          lineStyle: {
            color: '#212225',
          },
        },
        axisLabel: {
          textStyle: {
            fontFamily: 'PingFangSC-Regular,"Microsoft YaHei"',
          },
          fontFamily: 'PingFangSC-Regular,"Microsoft YaHei"',
        },
        boundaryGap: false,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: yAxisName,
        gridIndex: 0,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#212225',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#f2f2f2',
          },
        },
        axisLabel: {},
      },
    ],
    series,
  }
}

export default LineOptions
