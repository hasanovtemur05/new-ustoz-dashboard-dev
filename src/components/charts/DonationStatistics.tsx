import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useNewUsers } from 'modules/statistics/hooks/useNewUsers';
import { DailyData } from 'modules/statistics/types';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { DateRangePicker } from 'components/DataRangePicker';
import Chart from './Chart';
import { getDefaultDateRange } from 'utils/defaultDateRange';
import { useDalyDonation } from 'modules/statistics/hooks/useDailyPuzzleSubmission';
import { numToSum } from 'utils/numberFormat';

export default function DonationStatistics() {

  const [date, setDate] = useState<DateRange | undefined>(getDefaultDateRange());
  const validDate = date?.from && date.to ? date : getDefaultDateRange();
  const { data: donations } = useDalyDonation(validDate);

  const options = useMemo(() => {
    return {
      series: [
        {
          name: 'Donaterlar soni',
          data: donations?.map((item: DailyData) => item.count) ?? [],
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
        categories: donations?.map((item: DailyData) => item.date +" "+ numToSum(item.amount)) ?? [],
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
  }, [donations]);


  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Donate  qilgan foydalanuvchilar</CardTitle>
          <DateRangePicker date={date} setDate={setDate} />
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <Chart options={options} />
      </CardContent>
    </Card>
  );
}
