import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Layout from './components/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
import History from './pages/History';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('ltw_cuoc_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('ltw_cuoc_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    axios
      .get('/data/questions.json', { signal: controller.signal })
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem('ltw_cuoc_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('ltw_cuoc_history', JSON.stringify(history));
  }, [history]);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddHistory = (record) => {
    setHistory((prev) => [record, ...prev]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home playerName={playerName} setPlayerName={setPlayerName} history={history} />}
        />
        <Route
          path="play"
          element={
            loading ? (
              <div>Đang tải câu hỏi...</div>
            ) : error ? (
              <div>Không tải được câu hỏi</div>
            ) : (
              <Play questions={questions} playerName={playerName} onAddHistory={handleAddHistory} />
            )
          }
        />
        <Route path="result" element={<Result />} />
        <Route
          path="history"
          element={<History history={history} onClearHistory={handleClearHistory} />}
        />
        <Route
          path="questions"
          element={
            loading ? (
              <div>Đang tải câu hỏi...</div>
            ) : error ? (
              <div>Không tải được câu hỏi</div>
            ) : (
              <QuestionBank
                questions={questions}
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
              />
            )
          }
        />
        <Route
          path="questions/:id"
          element={
            loading ? (
              <div>Đang tải câu hỏi...</div>
            ) : error ? (
              <div>Không tải được câu hỏi</div>
            ) : (
              <QuestionDetail
                questions={questions}
                bookmarks={bookmarks}
                toggleBookmark={toggleBookmark}
              />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
