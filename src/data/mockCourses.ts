// src/data/mockCourses.ts
import { Course } from '../types/course';

export const mockCourses: Course[] = [
  {
    id: 'c1',
    slug: 'fullstack-nextjs-nestjs',
    title: 'Xây dựng E-commerce Fullstack với Next.js & NestJS',
    headline: 'Làm chủ kiến trúc hiện đại, SSR và API linh hoạt cho hệ thống lớn',
    description: 'Khóa học thực chiến xây dựng nền tảng thương mại điện tử từ số 0.',
    instructorId: 'Alex Dev',
    price: { amount: 129.99, currency: 'USD', isDiscounted: true, discountedPrice: 49.99 },
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    level: 'Intermediate',
    rating: 4.8,
    totalReviews: 3420,
    totalStudents: 12500,
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'c2',
    slug: 'figma-ui-ux-design',
    title: 'Thực chiến thiết kế UI/UX Web bán hàng với Figma',
    headline: 'Từ Wireframe đến Prototype hoàn chỉnh cho dự án thực tế',
    description: 'Nắm vững quy trình thiết kế giao diện chuẩn quốc tế.',
    instructorId: 'Sarah Designer',
    price: { amount: 89.99, currency: 'USD', isDiscounted: false },
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    level: 'Beginner',
    rating: 4.9,
    totalReviews: 2100,
    totalStudents: 8900,
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'c3',
    slug: 'react-native-masterclass',
    title: 'Lập trình Mobile App đa nền tảng với React Native',
    headline: 'Xây dựng ứng dụng hiệu suất cao cho iOS và Android',
    description: 'Khóa học chuyên sâu về React Native và tối ưu hóa UI.',
    instructorId: 'Mobile Expert',
    price: { amount: 99.99, currency: 'USD', isDiscounted: true, discountedPrice: 19.99 },
    thumbnailUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    level: 'All Levels',
    rating: 4.7,
    totalReviews: 1540,
    totalStudents: 6200,
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'c4',
    slug: 'advanced-typescript',
    title: 'TypeScript Nâng cao & Design Patterns',
    headline: 'Viết code an toàn, dễ bảo trì cho dự án quy mô lớn',
    description: 'Áp dụng các mẫu thiết kế kinh điển vào dự án TypeScript.',
    instructorId: 'Code Master',
    price: { amount: 109.99, currency: 'USD', isDiscounted: true, discountedPrice: 24.99 },
    thumbnailUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80',
    level: 'Expert',
    rating: 4.9,
    totalReviews: 890,
    totalStudents: 3100,
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];