// src/components/Onboarding.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState('');
  const [specificGoal, setSpecificGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateCourse = async () => {
    setIsLoading(true);
    try {
      // Gọi API Backend (VD: NestJS) gửi thông tin topic và specificGoal
      // Backend sẽ gọi AI (Gemini/ChatGPT) với Prompt yêu cầu trả về cấu trúc JSON của lộ trình học.
      /*
        const response = await fetch('http://localhost:3000/api/generate-course', {
           method: 'POST',
           body: JSON.stringify({ topic, specificGoal })
        });
        const roadmap = await response.json();
        saveToGlobalState(roadmap); // Lưu vào Zustand/Redux
      */
      
      // Giả lập delay sinh lộ trình
      setTimeout(() => {
        setIsLoading(false);
        navigate('/learn'); // Chuyển sang màn hình học chính
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="onboarding-container" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      {step === 1 && (
        <div className="step-1">
          <h2>Bạn muốn học về mảng gì?</h2>
          <div className="options">
            <button onClick={() => { setTopic('Web Development'); setStep(2); }}>Lập trình Web</button>
            <button onClick={() => { setTopic('UI/UX Design'); setStep(2); }}>Thiết kế UI/UX</button>
            <button onClick={() => { setTopic('Game Development'); setStep(2); }}>Lập trình Game</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step-2">
          <h2>Mô tả chi tiết mục tiêu của bạn</h2>
          <textarea 
            placeholder="Ví dụ: Cách xây dựng website e-commerce hoàn chỉnh với giỏ hàng và thanh toán..."
            value={specificGoal}
            onChange={(e) => setSpecificGoal(e.target.value)}
            rows={5}
            style={{ width: '100%', marginBottom: '20px' }}
          />
          <button onClick={handleGenerateCourse} className="primary-btn">
            {isLoading ? 'AI Đang soạn giáo trình...' : 'Bắt đầu tạo lộ trình học'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;