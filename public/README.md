# 📸 Portfolio Images

## Add Your Images Here

Place all your portfolio images in this folder with these exact names:

### About Section

- `about-photo.jpg` - Your profile photo (recommended: 800x800px)

### Crochet Gallery

- `crochet-1.jpg` - First crochet project
- `crochet-2.jpg` - Second crochet project
- `crochet-3.jpg` - Third crochet project

### Portrait Gallery

- `portrait-1.jpg` - First portrait artwork
- `portrait-2.jpg` - Second portrait artwork
- `portrait-3.jpg` - Third portrait artwork

### Video Portfolio

- `video-thumb-1.jpg` - First video thumbnail
- `video-thumb-2.jpg` - Second video thumbnail
- `video-thumb-3.jpg` - Third video thumbnail

## Image Guidelines

### Size Recommendations

- **Profile photo:** 800x800px (square)
- **Project images:** 1200x800px (landscape) or 800x1200px (portrait)
- **Video thumbnails:** 1280x720px (16:9 ratio)

### File Format

- Use JPG for photographs
- Use PNG for graphics with transparency
- Compress images using [TinyPNG.com](https://tinypng.com)

### File Size

- Keep each image under 500KB for fast loading
- Total images folder should be under 5MB

### Quality

- High resolution (at least 1200px on longest side)
- Good lighting
- Clear subject
- Proper cropping

## Adding More Images

To add more project images:

1. Add images to this folder with sequential numbers
   - Example: `crochet-4.jpg`, `crochet-5.jpg`

2. Update `/src/data/pages.js`
   ```javascript
   projects: [
     // ... existing projects
     {
       id: 4,
       title: "NEW PROJECT NAME",
       description: "Description here",
       image: "/images/crochet-4.jpg",
       tags: ["Tag1", "Tag2"],
     },
   ];
   ```

## Image Optimization Tips

### Before Adding:

1. Resize to recommended dimensions
2. Compress using TinyPNG or similar
3. Check file size (under 500KB each)
4. Rename to match required names

### Tools:

- **Resize:** [Photopea.com](https://photopea.com) (free Photoshop alternative)
- **Compress:** [TinyPNG.com](https://tinypng.com)
- **Crop:** Built into Windows/Mac photo viewers

## Placeholder Images

If you don't have images yet:

- Use free stock photos from [Unsplash.com](https://unsplash.com)
- Use [Placeholder.com](https://placeholder.com)
- Create simple colored rectangles in any image editor

## Troubleshooting

**Images not showing?**

1. Check file names match exactly (case-sensitive)
2. Verify files are in `/public/images/` folder
3. File extensions should be lowercase (.jpg, .png)
4. Rebuild: `npm run build`

**Images load slowly?**

1. Compress images more
2. Reduce dimensions
3. Convert PNG to JPG if possible
4. Use image optimization tools

---

**Ready?** Add your images and watch your portfolio come to life! 🎨✨
