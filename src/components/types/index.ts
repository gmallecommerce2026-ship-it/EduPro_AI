// src/types/index.ts
export interface Flashcard {
  front: string;
  back: string;
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Nội dung bài học chi tiết do AI sinh ra
  flashcards: Flashcard[];
  quiz: Quiz[];
}

export interface CourseRoadmap {
  topic: string;
  goal: string;
  lessons: Lesson[];
}