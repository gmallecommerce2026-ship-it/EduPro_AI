// src/types/course.ts

// Phân cấp: Khóa học -> Chương (Section) -> Bài giảng (Lesson)
export interface Course {
  id: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  instructorId: string;
  price: {
    amount: number;
    currency: string;
    isDiscounted: boolean;
    discountedPrice?: number;
  };
  thumbnailUrl: string;
  trailerVideoUrl?: string;
  level: 'Beginner' | 'Intermediate' | 'Expert' | 'All Levels';
  rating: number;
  totalReviews: number;
  totalStudents: number;
  sections: CourseSection[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseSection {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  order: number;
  type: 'video' | 'article' | 'quiz' | 'coding_exercise';
  contentUrl?: string; // Dùng cho HLS Video stream (m3u8)
  textContent?: string;
  durationInSeconds: number;
  isPreview: boolean; // Cho phép xem thử không cần mua
  resources: Attachment[]; // File đính kèm
}

export interface Attachment {
  id: string;
  name: string;
  fileSize: number;
  url: string;
}