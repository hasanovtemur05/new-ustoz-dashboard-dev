// Task frequency enum
export enum TaskFrequency {
  ONCE = 'ONCE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  EVERYTIME = 'EVERYTIME',
  SPECIAL = 'SPECIAL',
}

// Task event enum
export enum TaskEvent {
  RETE_ON_PLAY_MARKET_OR_APP_STORE = 'RETE_ON_PLAY_MARKET_OR_APP_STORE',
  REVIEW_ON_PLAY_MARKET_OR_APP_STORE = 'REVIEW_ON_PLAY_MARKET_OR_APP_STORE',
  INVITE_FRIEND = 'INVITE_FRIEND',
  WIN_BATTLE = 'WIN_BATTLE',
  CONNECT_INSTAGRAM = 'CONNECT_INSTAGRAM',
  CONNECT_TELEGRAM = 'CONNECT_TELEGRAM',
  CREATE_PORTFOLIO = 'CREATE_PORTFOLIO',
  SURVEY = 'SURVEY',
  COMPLETE_COURSE = 'COMPLETE_COURSE',
  ENABLE_NOTIFICATION = 'ENABLE_NOTIFICATION',
  SPIN_FORTUNA = 'SPIN_FORTUNA',
  BUY_PREMIUM = 'BUY_PREMIUM',
  COMPLETE_HALF_COURSE = 'COMPLETE_HALF_COURSE',
  RATING_LIKED = 'RATING_LIKED',
}

// Task type enum
export enum TaskType {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
  SURVEY = 'SURVEY',
}

// Frequency options for select field
export const FREQUENCY_OPTIONS = [
  { name: 'Bir marta', type: TaskFrequency.ONCE },
  { name: 'Har kuni', type: TaskFrequency.DAILY },
  { name: 'Har hafta', type: TaskFrequency.WEEKLY },
  { name: 'Har safar', type: TaskFrequency.EVERYTIME },
  { name: 'Maxsus', type: TaskFrequency.SPECIAL },
];

// Event options for select field
export const EVENT_OPTIONS = [
  { name: "Play Market yoki App Store'da baholash", type: TaskEvent.RETE_ON_PLAY_MARKET_OR_APP_STORE },
  { name: "Play Market yoki App Store'da sharh qoldirish", type: TaskEvent.REVIEW_ON_PLAY_MARKET_OR_APP_STORE },
  { name: "Do'stni taklif qilish", type: TaskEvent.INVITE_FRIEND },
  { name: 'Jangda g\'alaba qozonish', type: TaskEvent.WIN_BATTLE },
  { name: 'Instagram ulash', type: TaskEvent.CONNECT_INSTAGRAM },
  { name: 'Telegram ulash', type: TaskEvent.CONNECT_TELEGRAM },
  { name: 'Portfolio yaratish', type: TaskEvent.CREATE_PORTFOLIO },
  { name: 'So\'rovnoma', type: TaskEvent.SURVEY },
  { name: 'Kursni yakunlash', type: TaskEvent.COMPLETE_COURSE },
  { name: 'Bildirishnomani yoqish', type: TaskEvent.ENABLE_NOTIFICATION },
  { name: 'Fortuna aylantirilishi', type: TaskEvent.SPIN_FORTUNA },
  { name: 'Premium sotib olish', type: TaskEvent.BUY_PREMIUM },
  { name: 'Kursning yarmini yakunlash', type: TaskEvent.COMPLETE_HALF_COURSE },
  { name: 'Reyting yoqtirish', type: TaskEvent.RATING_LIKED },
];

// Type options for select field
export const TYPE_OPTIONS = [
  { name: 'Avtomatik', type: TaskType.AUTO },
  { name: 'Qo\'lda', type: TaskType.MANUAL },
  { name: 'So\'rovnoma', type: TaskType.SURVEY },
];
