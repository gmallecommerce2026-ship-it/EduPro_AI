// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard';
import { mockCourses } from '../data/mockCourses';
import { useCartStore } from '../store/useCartStore';

export default function Home() {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);

  const categories = [
    'Phát triển Web', 'React & Next.js', 'NestJS Backend', 
    'Thiết kế UI/UX', 'Phát triển Mobile', 'Data Science'
  ];

  return (
    <div className="udemy-layout">
      {/* Navbar Mở rộng */}
      <header className="udemy-navbar top-navbar">
        <div className="nav-left">
          <div className="logo-placeholder" style={{ fontSize: '1.5rem' }}>🚀 EduPro AI</div>
          <div className="nav-categories">Danh mục</div>
          <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm nội dung bất kỳ..." />
            <button className="search-btn">🔍</button>
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-link">Dạy học trên EduPro</div>
          <div className="cart-icon-wrapper">
            🛒 {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </div>
          <div className="nav-actions">
            <button className="outline-btn login-btn">Đăng nhập</button>
            <button className="primary-btn signup-btn">Đăng ký</button>
          </div>
        </div>
      </header>

      <main className="udemy-main-content">
        {/* Hero Banner Cỡ Lớn */}
        <section className="hero-banner">
          <div className="hero-content">
            <h1>Học tập kỹ năng tương lai, thiết kế riêng cho bạn</h1>
            <p>Hàng ngàn khóa học từ chuyên gia. Hoặc sử dụng AI để tự động tạo giáo trình cá nhân hóa dựa trên mục tiêu thực tế của dự án.</p>
            <div className="hero-actions">
              <button 
                className="task-btn primary-btn ai-generate-btn"
                onClick={() => navigate('/ai-builder')}
              >
                ✨ Tạo Lộ trình với AI
              </button>
            </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=80" 
            alt="Students learning" 
            className="hero-image"
          />
        </section>

        {/* Categories Bar */}
        <section className="categories-section">
          <h2>Các chủ đề nổi bật</h2>
          <div className="category-pills">
            {categories.map((cat, idx) => (
              <button key={idx} className="category-pill">{cat}</button>
            ))}
          </div>
        </section>

        {/* Course Grid */}
        <section className="courses-section">
          <h2>Học viên đang xem</h2>
          <div className="course-grid">
            {mockCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}