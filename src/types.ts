export interface Course {
  title: string;
  instructor: string;
  img: string;
  locked: boolean;
  progress?: number;
  category: string;
}

export interface Message {
  id: string;
  sender: string;
  timestamp: string;
  text: string;
  isMe: boolean;
  isBot?: boolean;
  isIa?: boolean;
}

export interface ActiveModule {
  id: string;
  title: string;
  moduleNum: string;
  progress: number;
  description: string;
  timeLeft: string;
  img: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  award: string;
  img: string;
}

export interface Certificate {
  id: string;
  title: string;
  date: string;
  verified: boolean;
  img: string;
}

export interface Announcement {
  id: string;
  title: string;
  relativeTime: string;
  isNew: boolean;
  text: string;
  icon: string;
}

export interface Topic {
  id: string;
  tag: string;
  count: number;
}
