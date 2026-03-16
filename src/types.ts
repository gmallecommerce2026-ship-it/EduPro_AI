// types.ts
export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string; // Có thể lấy video YouTube hoặc video minh họa
  flashcards: { front: string; back: string }[];
  quiz: { question: string; options: string[]; answer: number }[];
}

export interface CourseRoadmap {
  topic: string;
  progress: number;
  lessons: Lesson[];
}