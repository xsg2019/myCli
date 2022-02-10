/*
 * Echarts主题配置
 * @Author: Chris Liu
 * @Date: 2020-04-07 16:25:37
 * @Last Modified by: your name
 * @Last Modified time: 2020-04-07 16:26:15
 */

const colorPalette = [
  '#ffbe14',
  '#888888',
  '#23a7db',
  '#ed6541',
  '#92d8d8',
  '#fcc5b4',
  '#c7bd93',
  '#ea9bad',
  '#98b7c1',
  '#ffa071',
  '#d2d6de',
  '#4d626d',
  '#fcdb59',
  '#6e7b6d',
  '#289ed2',
  '#f55469',
  '#d0779b',
  '@primary-color',
  '#a69893',
  '#f6b203',
]
export const theme = {
  color: colorPalette,
  title: {
    textStyle: {
      fontWeight: 'normal',
      color: '#008acd',
    },
  },

  visualMap: {
    itemWidth: 15,
    color: ['#ffcc03', '#fff0b3', '#ffffff'],
  },

  toolbox: {
    iconStyle: {
      normal: {
        borderColor: colorPalette[0],
      },
    },
  },
  tooltip: {
    backgroundColor: 'rgba(50,50,50,0.5)',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#008acd',
      },
      crossStyle: {
        color: '#008acd',
      },
      shadowStyle: {
        color: 'rgba(200,200,200,0.1)',
      },
    },
  },
  dataZoom: {
    // 区域缩放
    orient: 'horizontal', // 布局方式，默认为水平布局，可选为：'horizontal' ¦ 'vertical'
    backgroundColor: 'rgba(0,0,0,0)', // 背景颜色
    dataBackgroundColor: '#f4f4f4', // 数据背景颜色
    fillerColor: 'rgba(255,190,20,0.1)', // 填充颜色
    handleColor: 'rgba(255,190,20,0.8)', // 手柄颜色
    handleSize: 30, // 手柄宽度
    textStyle: {
      color: '#333',
      fontSize: 11,
    },
    showDetail: false,
    realtime: true,
    start: 0,
    end: 100,
    zoomOnMouseWheel: false,
    moveOnMouseWheel: false,
    preventDefaultMouseMove: false,
  },
  legend: {
    tooltip: {
      show: true,
      formatter: ({ name }) => {
        return name.split('?qmid=')[0]
      },
    },
  },
  grid: {
    x: 70,
    y: 60,
    x2: 70,
    y2: 80,
    borderColor: '#eee',
  },

  categoryAxis: {
    axisLine: {
      lineStyle: {
        color: '#393939', // x轴线颜色
      },
    },
    splitLine: {
      show: false, // 去掉y辆格线
      lineStyle: {
        color: ['#eee'],
      },
    },
  },

  valueAxis: {
    axisLine: {
      lineStyle: {
        color: '#393939', // y轴线颜色
      },
    },
    axisLabel: {
      show: true,
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(250,250,250,0)', 'rgba(200,200,200,0)'],
      },
    },
    splitLine: {
      lineStyle: {
        color: ['#eee'],
      },
    },
  },

  timeline: {
    lineStyle: {
      color: '#008acd',
    },
    controlStyle: {
      normal: { color: '#008acd' },
      emphasis: { color: '#008acd' },
    },
    symbol: 'emptyCircle',
    symbolSize: 3,
  },

  line: {
    smooth: true,
    symbol: 'emptyCircle',
    symbolSize: 3,
  },
  bar: {
    barMaxWidth: 50, // 固定bar最大宽度
    itemStyle: {
      normal: {
        barBorderRadius: [3, 3, 0, 0], // 设置bar的radius
      },
    },
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#d87a80',
        color0: '#2ec7c9',
        lineStyle: {
          color: '#d87a80',
          color0: '#2ec7c9',
        },
      },
    },
  },

  scatter: {
    symbol: 'circle',
    symbolSize: 4,
  },

  map: {
    label: {
      normal: {
        textStyle: {
          color: '#333',
        },
      },
    },
    itemStyle: {
      normal: {
        borderColor: '#999999',
        areaColor: '#ffcc03',
      },
      emphasis: {
        areaColor: '#ffcc03',
      },
    },
  },

  graph: {
    color: colorPalette,
  },

  gauge: {
    axisLine: {
      lineStyle: {
        color: [
          [0.2, '#ffcc03'],
          [0.8, '#ffcc03'],
          [1, '#999999'],
        ],
        width: 10,
      },
    },
    axisTick: {
      splitNumber: 10,
      length: 15,
      lineStyle: {
        color: 'auto',
      },
    },
    splitLine: {
      length: 22,
      lineStyle: {
        color: 'auto',
      },
    },
    pointer: {
      width: 5,
    },
  },
}
