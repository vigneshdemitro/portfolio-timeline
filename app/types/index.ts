export type TimelineType = 'work' | 'education' | 'milestone';

export interface TimelinePosition {
  title: string;
  startDate: string;
  endDate: string | null;
  description: string;
  isPromotion: boolean;
}

export interface TimelineEntry {
  id: string;
  date: string;
  endDate?: string | null;
  type: TimelineType;
  icon: string;
  location?: string;
  // work type only:
  organization?: string;
  positions?: TimelinePosition[];
  // education + milestone only:
  title?: string;
  description?: string;
}

export interface TimelineMeta {
  lastUpdated: string;
  authorName: string;
  siteTitle: string;
  siteDescription: string;
  totalEntries: number;
  careerStartYear: number;
  softwareCareerStartYear: number;
  filters: string[];
}

export interface TimelineData {
  meta: TimelineMeta;
  timeline: TimelineEntry[];
}
