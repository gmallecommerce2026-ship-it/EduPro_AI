// src/components/CourseCard.tsx
import React from 'react';
import { Course } from '../types/course';
import { useCartStore } from '../store/useCartStore';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="udemy-course-card">
      <div className="course-card-image">
        <img src={course.thumbnailUrl} alt={course.title} />
        {course.level === 'Beginner' && <span className="badge-bestseller">Bán chạy</span>}
      </div>
      <div className="course-card-body">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-instructor">{course.instructorId}</p>
        
        <div className="course-card-rating">
          <span className="rating-number">{course.rating}</span>
          <span className="rating-stars">⭐⭐⭐⭐⭐</span>
          <span className="rating-reviews">({course.totalReviews.toLocaleString()})</span>
        </div>
        
        <div className="course-card-price">
          <span className="price-current">
            ${course.price.isDiscounted ? course.price.discountedPrice : course.price.amount}
          </span>
          {course.price.isDiscounted && (
            <span className="price-old">${course.price.amount}</span>
          )}
        </div>
      </div>
      
      {/* Lớp overlay hiện lên khi hover giống Udemy */}
      <div className="course-card-hover-overlay">
        <h4>{course.title}</h4>
        <p className="hover-headline">{course.headline}</p>
        <button 
          className="task-btn primary-btn add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            addItem(course);
          }}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};