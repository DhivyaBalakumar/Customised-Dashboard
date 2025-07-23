"use client";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from 'y@/store';
import { setCategories, toggleDarkMode } from 'y@/features/user/userSlice';
import { fetchNews } from 'y@/features/news/newsSlice';

export default function ReduxTest() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const news = useSelector((state: RootState) => state.news);
  const [input, setInput] = useState('');

  return (
    <div className="p-4 border rounded max-w-xl mx-auto my-8 bg-white dark:bg-gray-800">
      <h2 className="text-lg font-bold mb-2">Redux Test Panel</h2>
      <div className="mb-2">
        <strong>Categories:</strong> {user.categories.join(', ')}
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Comma-separated categories"
          className="border px-2 py-1 rounded mr-2"
        />
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => dispatch(setCategories(input.split(',').map(s => s.trim())))}
        >
          Set Categories
        </button>
      </div>
      <div className="mb-2">
        <strong>Dark Mode:</strong> {user.darkMode ? 'On' : 'Off'}
        <button
          className="ml-2 bg-gray-700 text-white px-2 py-1 rounded"
          onClick={() => dispatch(toggleDarkMode())}
        >
          Toggle
        </button>
      </div>
      <div className="mb-2">
        <button
          className="bg-green-600 text-white px-2 py-1 rounded"
          onClick={() => dispatch(fetchNews(user.categories))}
          disabled={news.loading}
        >
          {news.loading ? 'Loading...' : 'Fetch News'}
        </button>
      </div>
      {news.error && <div className="text-red-600">Error: {news.error}</div>}
      <div>
        <h3 className="font-semibold mt-4 mb-2">News Articles:</h3>
        <ul className="space-y-2">
          {news.articles.map((article, idx) => (
            <li key={idx} className="border p-2 rounded bg-gray-50 dark:bg-gray-900">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 dark:text-blue-300">
                {article.title}
              </a>
              <div className="text-sm">{article.description}</div>
              <div className="text-xs text-gray-500">{article.source.name} | {new Date(article.publishedAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 