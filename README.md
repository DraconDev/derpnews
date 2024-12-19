# DerpNews

DerpNews is an AI-powered satirical news generator that creates humorous, absurd news articles using Google's Gemini AI. The platform automatically generates and publishes new articles every hour, providing a fresh stream of entertaining content.

## Features

- 🤖 AI-Generated Content: Leverages Google's Gemini AI to create unique, satirical news articles
- ⏰ Hourly Updates: Automatically generates new articles every hour via GitHub Actions
- 🎯 Interactive Generation: Users can manually trigger new article generation
- 📱 Responsive Design: Modern, mobile-friendly interface
- 🔍 Article Archive: Browse through previously generated articles
- 📊 Structured Content: Each article includes a title, summary, and full content

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Google Gemini AI
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/derpnews.git
   cd derpnews
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   DATABASE_URL=your_postgres_url
   GEMINI_API_KEY=your_gemini_api_key
   CRON_SECRET=your_cron_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

- `/app`: Next.js app router pages and API routes
- `/components`: Reusable React components
- `/src/db`: Database configuration and schema
- `/src/services`: Core services including AI integration
- `/src/utils`: Utility functions and helpers

## Deployment

The application is designed to be deployed on Vercel. The GitHub Actions workflow handles automatic article generation by calling the API endpoint hourly.

To deploy:
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the required environment variables in Vercel
4. Add the required secrets in GitHub Actions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
