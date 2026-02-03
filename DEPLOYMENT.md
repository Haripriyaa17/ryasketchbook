# 🚀 Deployment Guide - Netlify

This guide will walk you through deploying your flipbook portfolio to Netlify for FREE hosting.

## 📋 Prerequisites

- [ ] Portfolio customized with your content
- [ ] Tested locally (`npm run dev`)
- [ ] All images added to `/public/images/`
- [ ] Supabase configured (if using analytics)
- [ ] GitHub account (optional but recommended)

## 🎯 Method 1: GitHub + Netlify (Recommended)

### Step 1: Push to GitHub

1. **Create GitHub Repository**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it: `my-portfolio` or similar
   - Keep it public or private
   - Click "Create repository"

2. **Initialize Git in Your Project**

   ```bash
   # In VS Code terminal, from project root
   git init
   git add .
   git commit -m "Initial commit: Flipbook portfolio"
   ```

3. **Connect to GitHub**
   ```bash
   # Replace with your GitHub username and repo name
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Netlify

1. **Sign Up for Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Sign up"
   - Choose "Sign up with GitHub"
   - Authorize Netlify

2. **Import Your Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select your repository
   - Click on your portfolio repository

3. **Configure Build Settings**

   ```
   Build command: npm run build
   Publish directory: dist
   ```

   - These should auto-fill
   - Click "Deploy site"

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Click "Add a variable"
   - Add each variable:

     ```
     Key: VITE_SUPABASE_URL
     Value: [your supabase URL]

     Key: VITE_SUPABASE_ANON_KEY
     Value: [your supabase anon key]
     ```

   - Click "Save"

5. **Redeploy**
   - Go to Deploys
   - Click "Trigger deploy" → "Deploy site"
   - Wait 1-2 minutes

6. **Your Site is Live! 🎉**
   - You'll get a URL like: `random-name-123.netlify.app`
   - Click to view your live portfolio

### Step 3: Custom Domain (Optional)

1. **Buy a Domain** (optional)
   - From Netlify, Namecheap, GoDaddy, etc.
   - Example: `yourname.com`

2. **Add to Netlify**
   - Site settings → Domain management
   - Click "Add custom domain"
   - Follow the instructions
   - Update DNS settings

## 🎯 Method 2: Drag & Drop (Quick & Easy)

Perfect if you don't want to use GitHub.

### Step 1: Build Your Project

```bash
# In VS Code terminal
npm run build
```

This creates a `dist` folder with your production files.

### Step 2: Deploy to Netlify

1. **Sign Up for Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up (can use email)

2. **Drag & Drop**
   - In Netlify dashboard
   - Scroll to "Want to deploy a new site without connecting to Git?"
   - Drag your `dist` folder into the box
   - OR click "Browse to upload" and select the `dist` folder

3. **Add Environment Variables**
   - Once deployed, go to Site settings
   - Environment variables → Add variables
   - Add your Supabase credentials:
     ```
     VITE_SUPABASE_URL
     VITE_SUPABASE_ANON_KEY
     ```

4. **Rebuild with Environment Variables**
   - Go to Deploys
   - Trigger deploy → Clear cache and deploy site

5. **Done! 🎉**
   - Your site is live at the provided URL

### Updating Your Site (Drag & Drop Method)

When you make changes:

1. Make your changes locally
2. Build: `npm run build`
3. Go to Netlify → Deploys
4. Drag new `dist` folder to deploy zone
5. Site automatically updates

## ⚙️ Build Configuration

Create `netlify.toml` in project root for advanced configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

This file:

- Sets build command
- Handles SPA routing
- Adds security headers
- Optimizes caching

## 🔒 Security Checklist

Before deploying:

- [ ] `.env` file is in `.gitignore` (never commit it!)
- [ ] Environment variables added in Netlify dashboard
- [ ] Supabase Row Level Security enabled
- [ ] Admin route requires authentication
- [ ] No API keys in code

## 📊 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages flip properly
- [ ] Images load
- [ ] Mobile view works
- [ ] Admin login works
- [ ] Analytics tracking works
- [ ] Links go to correct places
- [ ] Meta tags are correct (check view source)

## 🐛 Troubleshooting

### Build Fails

**Check build logs:**

- Netlify → Deploys → Click failed deploy → View logs
- Look for error messages

**Common fixes:**

```bash
# Delete and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build

# If that works locally, push to GitHub
git add .
git commit -m "Fix build"
git push
```

### Environment Variables Not Working

1. Check spelling exactly matches your code
2. Make sure you included the `VITE_` prefix
3. Redeploy after adding variables
4. Clear cache and redeploy

### Page Shows 404

1. Check `netlify.toml` exists with redirect rules
2. Or add redirect in Netlify dashboard:
   ```
   From: /*
   To: /index.html
   Status: 200
   ```

### Images Not Showing

1. Images must be in `public/images/`
2. Paths in code should start with `/images/`
3. Check image names match exactly (case-sensitive)
4. Rebuild and redeploy

## 🔄 Continuous Deployment

With GitHub method:

- Push changes to GitHub
- Netlify automatically rebuilds
- Changes live in 1-2 minutes

```bash
# Your workflow
git add .
git commit -m "Updated portfolio content"
git push
# Automatically deploys! ✨
```

## 📈 Monitor Your Site

### Netlify Analytics (Free)

- Basic traffic stats
- Page views
- Bandwidth usage
- Go to: Analytics tab in Netlify

### Supabase Analytics (Your Custom System)

- Detailed visitor tracking
- Device breakdown
- Page flow
- Access at: `yourdomain.com/admin`

## 🎨 Performance Tips

### Before Deploying:

1. **Optimize Images**
   - Use compressed JPG/PNG
   - Recommended: [TinyPNG.com](https://tinypng.com)
   - Max 500KB per image

2. **Check Bundle Size**

   ```bash
   npm run build
   # Check dist/ folder size
   # Should be < 5MB total
   ```

3. **Test Production Build**
   ```bash
   npm run build
   npm run preview
   # Test at localhost:4173
   ```

### Netlify Optimizations (Automatic)

- ✅ CDN distribution
- ✅ HTTPS/SSL certificate
- ✅ Gzip compression
- ✅ Asset optimization

## 🌐 Custom Domain Setup

### Using Netlify DNS (Easiest)

1. Buy domain from Netlify or elsewhere
2. Add to Netlify: Domain settings → Add custom domain
3. If bought elsewhere:
   - Go to your domain registrar
   - Update nameservers to Netlify's
   - Provided in Netlify dashboard

### Using External DNS

1. Add domain in Netlify
2. Get DNS records
3. Add A record or CNAME to your DNS provider
4. Wait for DNS propagation (up to 48 hours)

## 📱 Test Your Live Site

After deployment, test:

### Desktop

- Chrome
- Firefox
- Safari
- Edge

### Mobile

- iOS Safari
- Android Chrome
- Test responsive design

### Tools

- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [GTmetrix](https://gtmetrix.com)
- Lighthouse (in Chrome DevTools)

## 🎯 Success Metrics

Your site should have:

- ⚡ Load time < 2 seconds
- 🎨 Lighthouse performance > 90
- 📱 Mobile friendly
- 🔒 HTTPS enabled
- ✅ All pages working

## 📞 Support

If deployment fails:

1. **Check Netlify Docs**
   - [docs.netlify.com](https://docs.netlify.com)

2. **Netlify Community**
   - [community.netlify.com](https://community.netlify.com)

3. **Common Issues**
   - Build fails → Check error in logs
   - 404 errors → Add redirect rules
   - Env vars → Redeploy after adding

## 🎊 You're Live!

Congratulations! Your portfolio is now:

- ✅ Live on the internet
- ✅ Accessible worldwide
- ✅ Fast and secure
- ✅ Automatically backed up

Share your link:

- Add to resume
- Share on social media
- Add to LinkedIn
- Send to potential clients

---

**Need to make changes?**

1. Edit locally
2. Test: `npm run dev`
3. If using GitHub: `git push`
4. If drag & drop: rebuild and upload `dist` folder

**Your portfolio automatically updates!** 🚀
