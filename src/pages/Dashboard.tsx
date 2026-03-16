// src/pages/Dashboard.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useCourseStore } from '../store/useCourseStore';
import '../App.css';

// Dùng chung API Key bạn đã cấu hình
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string; 
const genAI = new GoogleGenerativeAI(API_KEY);

interface ChatMessage {
  role: 'ai' | 'user';
  text: string;
}

export default function Dashboard() {
  const { roadmap, currentLessonIndex, setCurrentLesson } = useCourseStore();
  const [activeTool, setActiveTool] = useState<'none' | 'flashcard' | 'quiz'>('none');
  
  // State cho Chat AI
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: 'Chào bạn, bạn có thắc mắc gì về bài học này không? Cứ hỏi mình nhé!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cuộn xuống cuối cùng khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  if (!roadmap) return <Navigate to="/" />;
  const currentLesson = roadmap.lessons[currentLessonIndex];
  const progressPercent = Math.round(((currentLessonIndex + 1) / roadmap.lessons.length) * 100);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      // Cung cấp Context (ngữ cảnh) của bài học hiện tại để AI trả lời sát nhất
      const prompt = `
        Bạn là một trợ giảng AI trong ứng dụng EduPro AI.
        Học viên đang học khóa: "${roadmap.topic}".
        Bài học hiện tại: "${currentLesson.title}".
        Nội dung bài học: "${currentLesson.content}".
        
        Học viên hỏi: "${userMessage}".
        Hãy trả lời ngắn gọn, súc tích, dễ hiểu và thân thiện để giúp học viên hiểu bài hơn.
      `;
      
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();
      
      setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Xin lỗi, mình đang gặp sự cố kết nối. Bạn thử lại sau nhé!' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="app-container">
      <header className="top-navbar">
        <div className="nav-left">
          <div className="logo-placeholder">🚀 EduPro AI</div>
          <div className="nav-divider"></div>
          <span className="current-path">{roadmap.topic} / Bài {currentLessonIndex + 1}</span>
        </div>
      </header>

      <div className="learning-layout">
        {/* Lộ trình học */}
        <aside className="panel ai-coach-panel">
          <div className="panel-header"><h2>Lộ trình học</h2></div>
          <div className="panel-content">
            <div className="progress-section modern-card">
              <div className="progress-header">
                <span>Tiến độ</span>
                <span className="progress-percent">{progressPercent}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill gradient-primary" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
            <div className="suggested-tasks">
              {roadmap.lessons.map((lesson, index) => (
                <button 
                  key={lesson.id} 
                  onClick={() => {
                    setCurrentLesson(index);
                    // Reset chat khi chuyển bài mới
                    setChatMessages([{ role: 'ai', text: `Bạn có câu hỏi nào cho Bài ${index + 1}: ${lesson.title} không?` }]);
                  }}
                  className={`task-btn ${index === currentLessonIndex ? 'primary-btn' : 'outline-btn'}`}
                  style={{ marginBottom: '8px', textAlign: 'left', display: 'block' }}
                >
                  Bài {index + 1}: {lesson.title}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Nội dung bài học + CHAT AI */}
        <main className="center-learning-panel">
          
          {/* Nửa trên: Nội dung học & Bài tập */}
          <div className="panel learning-screen custom-scrollbar">
            <div className="lesson-header">
              <div className="lesson-meta">
                <span className="course-tag">{roadmap.topic}</span>
                <h1 className="lesson-title">{currentLesson.title}</h1>
              </div>
            </div>
            
            <div className="lesson-description" style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', marginBottom: '24px' }}>
              <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
            </div>

            {/* Khu vực hiển thị Bài Tập */}
            {currentLesson.exercises && currentLesson.exercises.length > 0 && (
              <div className="exercises-section">
                <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🎯</span> Bài tập thực hành
                </h3>
                {currentLesson.exercises.map((ex, idx) => (
                  <div key={idx} className="modern-card" style={{ borderLeft: '4px solid var(--accent-blue)', marginBottom: '12px' }}>
                    <h4 style={{ marginBottom: '8px', color: 'var(--text-main)' }}>{idx + 1}. {ex.title}</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{ex.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nửa dưới: Khu vực Chat Trợ giảng AI */}
          <div className="panel chat-section" style={{ flex: '0 0 350px' }}>
            <div className="chat-section-header">
              <div className="chat-title-wrap">
                <span className="sparkle-icon">✨</span>
                <h3>Trợ giảng AI</h3>
              </div>
              <span className="online-status">Đang trực tuyến</span>
            </div>
            
            <div className="chat-messages custom-scrollbar">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.role === 'ai' ? 'ai-bubble' : 'user-bubble'}`}>
                  {msg.role === 'ai' && <div className="msg-avatar">🤖</div>}
                  <div className="msg-wrapper">
                    <div className="msg-content">{msg.text}</div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message ai-bubble typing-indicator-wrap">
                  <div className="msg-avatar small-av">🤖</div>
                  <div className="typing-dots"><span></span><span></span><span></span></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
              <input 
                type="text" 
                placeholder="Hỏi AI để làm rõ kiến thức..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="send-button-premium" onClick={handleSendMessage}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </main>

        {/* Cột Công cụ (Giữ nguyên) */}
        <aside className="panel tools-panel">
          <div className="panel-header"><h2>Công cụ học tập</h2></div>
          <div className="panel-content custom-scrollbar">
            {/* ... Giữ nguyên phần Tool Panel như code ở bước trước ... */}
            <div className="tools-grid">
              <div className="tool-card-premium" onClick={() => setActiveTool('flashcard')}>
                <div className="icon-wrapper bg-purple">🗂️</div>
                <span className="tool-name">Flashcards ({currentLesson.flashcards?.length || 0})</span>
              </div>
              <div className="tool-card-premium" onClick={() => setActiveTool('quiz')}>
                <div className="icon-wrapper bg-orange">❓</div>
                <span className="tool-name">Quiz ({currentLesson.quiz?.length || 0})</span>
              </div>
            </div>

            {activeTool === 'flashcard' && (
               <div className="notes-preview-premium">
                 <h3 style={{ marginBottom: '10px' }}>Flashcard</h3>
                 {currentLesson.flashcards?.map((card, idx) => (
                   <div key={idx} className="note-item-modern" style={{ flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
                     <strong>Hỏi: {card.front}</strong>
                     <span style={{ color: 'var(--text-muted)' }}>Đáp: {card.back}</span>
                   </div>
                 ))}
               </div>
            )}
            {activeTool === 'quiz' && (
              <div className="notes-preview-premium" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
                <h3 style={{ marginBottom: '10px', color: '#1e3a8a' }}>Trắc nghiệm</h3>
                {currentLesson.quiz?.map((q, idx) => (
                  <div key={idx} style={{ marginBottom: '16px' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{idx + 1}. {q.question}</p>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px' }}>
                      {q.options.map((opt, oIdx) => (
                        <li key={oIdx} style={{ fontSize: '0.85rem', padding: '4px 0' }}>- {opt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}