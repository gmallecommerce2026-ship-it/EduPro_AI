// src/pages/Home.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard';
import { mockCourses } from '../data/mockCourses';
import { useCartStore } from '../store/useCartStore';

// Dữ liệu mock cho phần Sách (Books)
const mockBooks = [
  {
    id: 'b1',
    title: 'Clean Code in TypeScript',
    author: 'Robert C. Martin',
    price: 35.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
    rating: 4.9,
    reviews: 1250
  },
  {
    id: 'b2',
    title: 'Refactoring UI/UX Design',
    author: 'Adam Wathan',
    price: 49.00,
    thumbnailUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&q=80',
    rating: 4.8,
    reviews: 840
  },
  {
    id: 'b3',
    title: 'Advanced Next.js Architecture',
    author: 'Guillermo Rauch',
    price: 42.50,
    thumbnailUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80',
    rating: 4.7,
    reviews: 530
  },
  {
    id: 'b4',
    title: 'NestJS: Enterprise Backend',
    author: 'Kamil Myśliwiec',
    price: 39.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80',
    rating: 4.9,
    reviews: 2100
  }
];

export default function Home() {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const [activeTab, setActiveTab] = useState('React & Next.js');

  const categories = [
    'Phát triển Web', 'Thiết kế UI/UX', 'Phát triển Mobile', 
    'Data Science', 'Trí tuệ nhân tạo', 'Marketing'
  ];

  const courseTabs = ['React & Next.js', 'NestJS Backend', 'Thiết kế UI/UX', 'TypeScript'];

  return (
    <div className="udemy-layout">
      {/* Navbar */}
      <header className="udemy-navbar top-navbar">
        <div className="nav-left">
          <div className="logo-placeholder" style={{ fontSize: '1.5rem', cursor: 'pointer' }}>🚀 EduPro AI</div>
          <div className="nav-categories">Danh mục</div>
          <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm khóa học, tài liệu, sách..." />
            <button className="search-btn">🔍</button>
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-link">EduPro Business</div>
          <div className="nav-link">Dạy trên EduPro</div>
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
        {/* Section 1: Hero Banner */}
        <section className="hero-banner">
          <div className="hero-content">
            <h1>Học tập không giới hạn. Tương lai trong tay bạn.</h1>
            <p>Khám phá hàng ngàn khóa học từ chuyên gia hàng đầu và bộ sưu tập sách công nghệ chuyên sâu. Tự động hóa lộ trình học với AI.</p>
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

        {/* Section 2: Trusted Companies */}
        <section className="trusted-companies">
          <p>Được tin tưởng bởi hơn 14,400 doanh nghiệp trên toàn cầu</p>
          <div className="company-logos">
            <span className="logo-mock">Volkswagen</span>
            <span className="logo-mock">Samsung</span>
            <span className="logo-mock">Cisco</span>
            <span className="logo-mock">Vimeo</span>
            <span className="logo-mock">P&G</span>
            <span className="logo-mock">Hewlett Packard</span>
          </div>
        </section>

        {/* Section 3: Lựa chọn khóa học đa dạng (Có Tabs chuyển đổi) */}
        <section className="courses-section">
          <h2>Một sự lựa chọn rộng lớn các khóa học</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '1.1rem' }}>Lựa chọn từ hơn 210.000 khóa học video online với các video mới được bổ sung mỗi tháng.</p>
          
          <div className="course-tabs">
            {courseTabs.map(tab => (
              <button 
                key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="course-tab-content modern-card">
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Mở rộng cơ hội nghề nghiệp với {activeTab}</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '800px' }}>
                Khám phá các phương pháp tốt nhất để xây dựng hệ thống với {activeTab}. Các khóa học được thiết kế từ cơ bản đến nâng cao, phục vụ cho các dự án thực tế.
              </p>
              <button className="outline-btn" style={{ marginTop: '16px', padding: '10px 20px', fontWeight: 'bold' }}>
                Khám phá {activeTab}
              </button>
            </div>

            <div className="course-grid">
              {mockCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Danh mục hàng đầu */}
        <section className="categories-section">
          <h2>Các danh mục hàng đầu</h2>
          <div className="top-categories-grid">
            {categories.map((cat, idx) => (
              <div key={idx} className="category-card">
                <div className="category-img-placeholder">
                  📚
                </div>
                <h3>{cat}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Khu vực Bán Sách */}
        <section className="books-section courses-section" style={{ backgroundColor: '#f8fafc', padding: '40px', borderRadius: '16px', margin: '0 40px 60px' }}>
          <h2>Sách chuyên ngành bán chạy</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Củng cố kiến thức nền tảng với các ấn phẩm chất lượng cao từ các tác giả danh tiếng.</p>
          
          <div className="course-grid">
            {mockBooks.map((book) => (
              <div key={book.id} className="udemy-course-card book-card">
                <div className="course-card-image book-image-container">
                  <img src={book.thumbnailUrl} alt={book.title} className="book-image" />
                </div>
                <div className="course-card-body">
                  <h3 className="course-card-title">{book.title}</h3>
                  <p className="course-card-instructor">{book.author}</p>
                  <div className="course-card-rating">
                    <span className="rating-number">{book.rating}</span>
                    <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-reviews">({book.reviews.toLocaleString()})</span>
                  </div>
                  <div className="course-card-price">
                    <span className="price-current">${book.price}</span>
                  </div>
                </div>
                <div className="course-card-hover-overlay">
                  <h4>{book.title}</h4>
                  <p className="hover-headline">Sách bìa mềm & Bản điện tử (PDF/EPUB)</p>
                  <button className="task-btn primary-btn add-to-cart-btn">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}