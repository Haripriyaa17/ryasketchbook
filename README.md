# 🎨 Flipbook Portfolio

A stunning, interactive portfolio website featuring a realistic 3D flipbook animation. Perfect for showcasing creative work in crochet, portrait art, and video editing.

![Portfolio Preview](./preview.png)

## ✨ Features

- **3D Flipbook Animation** - Realistic page-turning effect on desktop
- **Mobile Optimized** - Swipeable card interface on mobile devices
- **Beautiful Design** - Artistic color palette with smooth animations
- **Analytics Dashboard** - Track visitors and engagement
- **Fully Responsive** - Works seamlessly across all devices
- **Fast & Performant** - Optimized loading and animations
- **Easy to Customize** - Simple content management

## 🎯 Perfect For

- Artists & Creatives
- Photographers
- Video Editors
- Designers
- Crafters & Makers
- Anyone wanting a unique portfolio

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A code editor (VS Code recommended)

### Installation

1. **Clone or download this project**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Your flipbook portfolio is now running!

## 📝 Customization Guide

### 1. Update Your Content

Edit `/src/data/pages.js` to add your personal information:

```javascript
// Update these fields with your information
{
  title: 'YOUR NAME',
  subtitle: 'Creative Portfolio',
  tagline: 'Crochet Artist • Portrait Creator • Video Editor',
  // ... more content
}
```

### 2. Add Your Images

Place your images in the `/public/images/` directory:

- `/public/images/about-photo.jpg` - Your profile photo
- `/public/images/crochet-1.jpg`, `crochet-2.jpg`, etc. - Crochet project photos
- `/public/images/portrait-1.jpg`, `portrait-2.jpg`, etc. - Portrait artwork
- `/public/images/video-thumb-1.jpg`, etc. - Video project thumbnails

### 3. Update Contact Information

In `/src/data/pages.js`, find the contact page section:

```javascript
email: 'your.email@example.com',
social: {
  instagram: 'https://instagram.com/yourusername',
  youtube: 'https://youtube.com/@yourchannel',
  linkedin: 'https://linkedin.com/in/yourprofile',
}
```

### 4. Customize Colors (Optional)

Colors are defined in `/tailwind.config.js`. The current palette is designed for artistic/creative work with soft pinks, purples, and oranges.

## 🔐 Setting Up Analytics

### Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

### Step 2: Set Up Database

Run these SQL commands in Supabase SQL Editor:

```sql
-- Create visits table
create table visits (
  id uuid default uuid_generate_v4() primary key,
  timestamp timestamptz default now(),
  user_agent text,
  device_type text,
  browser text,
  referrer text,
  screen_resolution text
);

-- Create page_views table
create table page_views (
  id uuid default uuid_generate_v4() primary key,
  page_id integer,
  page_name text,
  timestamp timestamptz default now(),
  user_agent text,
  screen_width integer,
  screen_height integer,
  referrer text
);

-- Create interactions table
create table interactions (
  id uuid default uuid_generate_v4() primary key,
  interaction_type text,
  details jsonb,
  timestamp timestamptz default now()
);

-- Enable Row Level Security
alter table visits enable row level security;
alter table page_views enable row level security;
alter table interactions enable row level security;

-- Create policies to allow inserts from anyone
create policy "Allow anonymous inserts" on visits
  for insert with check (true);

create policy "Allow anonymous inserts" on page_views
  for insert with check (true);

create policy "Allow anonymous inserts" on interactions
  for insert with check (true);
```

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`
2. In Supabase, go to Project Settings > API
3. Copy your Project URL and Anon Key
4. Paste them into `.env`:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Set Up Admin Authentication

1. In Supabase, go to Authentication > Users
2. Click "Add user" and create your admin account
3. Use this email/password to log in at `/admin/login`

## 📊 Accessing Analytics

1. Navigate to `/admin/login`
2. Enter your Supabase admin credentials
3. View your portfolio analytics:
   - Total visits
   - Page views
   - Device breakdown
   - Recent visitor data

## 🎨 Color Scheme

The portfolio uses a carefully crafted artistic palette:

- **Primary (Pink)** - Warmth and creativity
- **Secondary (Purple)** - Artistic sophistication
- **Accent (Orange)** - Energy and enthusiasm
- **Neutral (Stone)** - Balance and elegance

Perfect for creative professionals in art, crafts, and media.

## 🌐 Deployment

### Deploy to Netlify (Recommended - Free)

1. **Build your project**

   ```bash
   npm run build
   ```

2. **Sign up at [Netlify](https://netlify.com)**

3. **Deploy via drag-and-drop**
   - Drag your `dist` folder to Netlify
   - Or connect your GitHub repository

4. **Add environment variables**
   - In Netlify dashboard, go to Site settings > Environment variables
   - Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

5. **Your site is live!**
   - You'll get a URL like `yoursite.netlify.app`
   - Can add custom domain later

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance

- **First Paint**: < 1.5s
- **Lighthouse Score**: 90+
- **Mobile Friendly**: Yes
- **SEO Optimized**: Yes

## 📁 Project Structure

```
flipbook-portfolio/
├── public/
│   └── images/          # Your portfolio images
├── src/
│   ├── animations/      # Framer Motion variants
│   ├── components/      # React components
│   │   ├── FlipBook.jsx
│   │   ├── Page.jsx
│   │   ├── Admin.jsx
│   │   └── AdminLogin.jsx
│   ├── data/
│   │   └── pages.js     # Your content (EDIT THIS)
│   ├── utils/
│   │   └── supabase.js  # Analytics configuration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎓 Customization Tips

### Add More Pages

In `/src/data/pages.js`, add new page objects:

```javascript
{
  id: 9,
  type: 'custom',
  title: 'Your New Page',
  content: {
    // Your content here
  }
}
```

Then create a new page component in `/src/components/Page.jsx`

### Change Animations

Edit `/src/animations/flipVariants.js` to customize:

- Flip duration
- Easing curves
- Page transition effects

### Modify Layout

Components in `/src/components/` control the layout:

- `FlipBook.jsx` - Main book container
- `Page.jsx` - Individual page templates
- `Admin.jsx` - Analytics dashboard

## 🐛 Troubleshooting

**Pages not flipping?**

- Check browser console for errors
- Ensure all dependencies are installed
- Try `npm install` again

**Analytics not working?**

- Verify Supabase credentials in `.env`
- Check Supabase SQL setup
- Enable Row Level Security policies

**Images not showing?**

- Place images in `/public/images/`
- Use correct paths in `pages.js`
- Rebuild with `npm run build`

## 📞 Support

If you need help:

1. Check this README thoroughly
2. Review `/src/data/pages.js` for content examples
3. Inspect browser console for errors
4. Verify all setup steps completed

## 📄 License

This project is free to use for personal portfolios. Please don't resell the template.

## 🙏 Credits

Built with:

- React + Vite
- Framer Motion
- Tailwind CSS
- Supabase
- Love and creativity ❤️

---

**Made with ❤️ for creative professionals**

Ready to showcase your amazing work in style! 🎨✨
