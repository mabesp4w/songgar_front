/** @format */

// news
interface NewsTypes {
  id: string;
  title: string;
  slug: string;
  author: string;
  img_news: string;
  news_date: Date | string;
  content: string;
}

export default NewsTypes;
