import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

interface IProps {
  options: any;
}

export default function Chart({ options }: IProps) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [options]);

  return <div ref={chartRef}></div>;
}
