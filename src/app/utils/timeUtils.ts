export type TimePeriod = 'morning' | 'afternoon' | 'evening' | 'midnight';

export interface TimePeriodInfo {
  period: TimePeriod;
  label: string;
  description: string;
  className: string;
}

export function getCurrentTimePeriod(): TimePeriodInfo {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    return {
      period: 'morning',
      label: '人类重启区',
      description: '06:00-11:00',
      className: 'period-morning'
    };
  } else if (hour >= 12 && hour < 19) {
    return {
      period: 'afternoon',
      label: '精神下班区',
      description: '12:00-18:00',
      className: 'period-afternoon'
    };
  } else if (hour >= 19 && hour < 24) {
    return {
      period: 'evening',
      label: '终于轮到我了区',
      description: '19:00-24:00',
      className: 'period-evening'
    };
  } else {
    return {
      period: 'midnight',
      label: '真实面暴露区',
      description: '00:00-04:00',
      className: 'period-midnight'
    };
  }
}

export function getPeriodByHour(hour: number): TimePeriodInfo {
  if (hour >= 6 && hour < 12) {
    return {
      period: 'morning',
      label: '人类重启区',
      description: '06:00-11:00',
      className: 'period-morning'
    };
  } else if (hour >= 12 && hour < 19) {
    return {
      period: 'afternoon',
      label: '精神下班区',
      description: '12:00-18:00',
      className: 'period-afternoon'
    };
  } else if (hour >= 19 && hour < 24) {
    return {
      period: 'evening',
      label: '终于轮到我了区',
      description: '19:00-24:00',
      className: 'period-evening'
    };
  } else {
    return {
      period: 'midnight',
      label: '真实面暴露区',
      description: '00:00-04:00',
      className: 'period-midnight'
    };
  }
}
