import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { DailyData } from 'modules/statistics/types';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { DateRangePicker } from 'components/DataRangePicker';
import Chart from './Chart';
import { getDefaultDateRange } from 'utils/defaultDateRange';
import { numToSum } from 'utils/numberFormat';
import { useDailyCertificateCount } from 'modules/statistics/hooks/useDailyCertificateCount';

export default function SertificateStatistics() {
  const [date, setDate] = useState<DateRange | undefined>(getDefaultDateRange());
  const validDate = date?.from && date.to ? date : getDefaultDateRange();
  const { data } = useDailyCertificateCount(validDate);


  const options = useMemo(() => {
    return {
      series: [
        {
          name: 'Sertifikat olganlar soni',
          data: data?.map((item: DailyData) => item.count) ?? [],
        },
      ],
      chart: {
        height: 400,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (value: number) {
          return value;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        categories: data?.map((item: DailyData) => item.date ) ?? [],
        position: 'bottom',
        axisTicks: {
          show: true,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
      },
      yaxis: {
        axisTicks: {
          show: true,
        },
        labels: {
          show: true,
          formatter: function (value: number) {
            return value;
          },
        },
      },
    };
  }, [data]);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sertifikat olgan foydalanuvchilar</CardTitle>
          <DateRangePicker date={date} setDate={setDate} />
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <Chart options={options} />
      </CardContent>
    </Card>
  );
}
