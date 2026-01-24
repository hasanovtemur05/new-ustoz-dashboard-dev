import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import Chart from './Chart';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { useCoinStatistics } from 'modules/statistics/hooks/useCoinStatistics';

export interface RangeData {
  from: number;
  to: number;
  count: number;
}


export default function CoinStatistics() {
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');
  const [appliedFrom, setAppliedFrom] = useState<number | undefined>();
  const [appliedTo, setAppliedTo] = useState<number | undefined>();

  const { data: rangeData, isLoading } = useCoinStatistics(appliedFrom, appliedTo);

  // Filterni qo'llash
  const handleApplyFilter = () => {
    const from = fromValue ? parseInt(fromValue) : undefined;
    const to = toValue ? parseInt(toValue) : undefined;
    
    setAppliedFrom(from);
    setAppliedTo(to);
  };

  // Filterni tozalash
  const handleClearFilter = () => {
    setFromValue('');
    setToValue('');
    setAppliedFrom(undefined);
    setAppliedTo(undefined);
  };


  // Chart uchun options
  const chartOptions = useMemo(() => {
    if (!rangeData || rangeData.length === 0) return null;

    return {
      series: [
        {
          name: 'Foydalanuvchilar soni',
          data: rangeData.map((item: RangeData) => item.count),
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
          return value.toLocaleString();
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        categories: rangeData.map((item: RangeData) => 
          `${item.from.toLocaleString()}-${item.to.toLocaleString()}`
        ),
        position: 'bottom',
        axisTicks: {
          show: true,
        },
        labels: {
          rotate: -45,
          style: {
            fontSize: '10px',
          },
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
            return value.toLocaleString();
          },
        },
      },
      title: {
        text: appliedFrom !== undefined && appliedTo !== undefined 
          ? `Oraliq: ${appliedFrom.toLocaleString()} - ${appliedTo.toLocaleString()}`
          : 'Barcha oraliqlar bo\'yicha statistika',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
        },
      },
      tooltip: {
        y: {
          formatter: function (value: number) {
            return value.toLocaleString() + ' foydalanuvchi';
          },
        },
      },
    };
  }, [rangeData, appliedFrom, appliedTo]);



  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Coinlar soni bo'yicha statistika</CardTitle>
          
          {/* Filter controls */}
          <div className="flex items-end gap-4">
            <div className="flex flex-col">
              <Label htmlFor="from" className="text-sm mb-1">Dan</Label>
              <Input
                id="from"
                type="number"
                placeholder="0"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="w-24"
              />
            </div>
            
            <div className="flex flex-col">
              <Label htmlFor="to" className="text-sm mb-1">Gacha</Label>
              <Input
                id="to"
                type="number"
                placeholder="1000"
                value={toValue}
                onChange={(e) => setToValue(e.target.value)}
                className="w-24"
              />
            </div>
            
            <Button 
              onClick={handleApplyFilter}
              disabled={isLoading}
            >
              Qo'llash
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleClearFilter}
              disabled={isLoading}
            >
              Tozalash
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-0 min-h-[400px]">
        {chartOptions && <Chart options={chartOptions} />}
      </CardContent>
    </Card>
  );
}