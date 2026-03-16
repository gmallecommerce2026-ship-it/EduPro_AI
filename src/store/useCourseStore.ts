// src/store/useCourseStore.ts
import { create } from 'zustand';

export interface Lesson {
  id: string;
  title: string;
  content: string;
  exercises: { title: string; description: string }[]; // Thêm phần bài tập
  flashcards: { front: string; back: string }[];
  quiz: { question: string; options: string[]; correctAnswer: number }[];
}

export interface CourseRoadmap {
  topic: string;
  goal: string;
  lessons: Lesson[];
}

interface CourseState {
  roadmap: CourseRoadmap | null;
  currentLessonIndex: number;
  setRoadmap: (roadmap: CourseRoadmap) => void;
  setCurrentLesson: (index: number) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  roadmap: null,
  currentLessonIndex: 0,
  setRoadmap: (roadmap) => set({ roadmap }),
  setCurrentLesson: (index) => set({ currentLessonIndex: index }),
}));