export function getDefaultOption(data: any[]): any {
  const colors: string[] = [];
  data.forEach((item) => {
    colors.push(item.color);
  });
  return {
    // tooltip: {
    //   trigger: 'item',
    //   formatter: '{b}<br/>{d}%',
    //   backgroundColor: 'rgba(23,23,28,0.6)',
    //   borderWidth: 0,
    //   textStyle: { color: '#ffffff', fontWeight: 500, fontFamily: 'Roboto, Helvetica, Tahoma, Arial' },
    // },
    color: colors,
    series: [
      {
        name: 'Distribution of Tokens',
        type: 'pie',
        radius: ['50%', '80%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: 'bold'
        //   }
        // },
        data: data,
      },
    ],
  };
}
