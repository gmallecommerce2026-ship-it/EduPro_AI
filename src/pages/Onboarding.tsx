// src/pages/Onboarding.tsx
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useCourseStore } from '../store/useCourseStore';
import '../App.css'; 
import { useNavigate } from 'react-router-dom';

// Thay 'YOUR_GEMINI_API_KEY' bằng API key thật lấy từ Google AI Studio
const API_KEY = 'AIzaSyCa39VZEpfv6OrqiMQl0CKHdFCgBc01bHY'; 
const genAI = new GoogleGenerativeAI(API_KEY);

export default function Onboarding() {
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const setRoadmap = useCourseStore((state) => state.setRoadmap);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !goal) return alert('Vui lòng nhập đầy đủ thông tin!');
    
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `
  Đóng vai một chuyên gia giáo dục. Người dùng muốn học về: "${topic}".
  Mục tiêu cụ thể: "${goal}".
  Hãy chia nhỏ yêu cầu này thành một lộ trình học gồm đúng 3 bài học.
  BẮT BUỘC trả về duy nhất 1 chuỗi JSON hợp lệ, KHÔNG chứa markdown (như \`\`\`json), KHÔNG giải thích thêm. Cấu trúc JSON:
  {
    "topic": "${topic}",
    "goal": "${goal}",
    "lessons": [
      {
        "id": "lesson-1",
        "title": "Tên bài học",
        "content": "Nội dung bài học chi tiết (có thể dùng thẻ HTML <b>, <i>, <br/>, <ul>, <li>)",
        "exercises": [
           {"title": "Tên bài tập thực hành", "description": "Mô tả yêu cầu bài tập và cách làm"}
        ],
        "flashcards": [
           {"front": "Thuật ngữ 1", "back": "Định nghĩa 1"}
        ],
        "quiz": [
           {
             "question": "Câu hỏi trắc nghiệm?",
             "options": ["A", "B", "C", "D"],
             "correctAnswer": 0
           }
        ]
      }
    ]
  }
`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Xóa các ký tự markdown thừa nếu AI vẫn vô tình trả về
      const cleanJsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const roadmapData = JSON.parse(cleanJsonStr);
      
      setRoadmap(roadmapData);
      navigate('/learn');
    } catch (error) {
      console.error('Lỗi khi tạo lộ trình:', error);
      alert('Có lỗi khi kết nối với AI, vui lòng kiểm tra lại API Key hoặc thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-app)' }}>
      <div className="panel" style={{ width: '100%', maxWidth: '500px', padding: '30px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Khởi tạo lộ trình học AI</h2>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Chủ đề muốn học:</label>
            <input 
              type="text" 
              placeholder="VD: Lập trình ReactJS, Thiết kế Figma..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Mục tiêu cụ thể:</label>
            <textarea 
              placeholder="VD: Muốn tự làm được một website bán hàng cơ bản..." 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={4}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', resize: 'none' }}
            />
          </div>
          <button type="submit" className="task-btn primary-btn" disabled={isLoading} style={{ justifyContent: 'center' }}>
            {isLoading ? 'AI đang soạn giáo trình...' : 'Tạo lộ trình ngay ✨'}
          </button>
        </form>
      </div>
    </div>
  );
}