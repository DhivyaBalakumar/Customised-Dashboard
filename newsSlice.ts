import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
}

export interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

// Replace with your actual NewsAPI endpoint and API key
export const fetchNews = createAsyncThunk<NewsArticle[], string[], { rejectValue: string }>(
  'news/fetchNews',
  async (categories, { rejectWithValue }) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      const categoryQuery = categories.join(',');
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${categoryQuery}&apiKey=${apiKey}&country=us`
      );
      return response.data.articles;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch news');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsArticle[]>) => {
        state.articles = action.payload;
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer; 