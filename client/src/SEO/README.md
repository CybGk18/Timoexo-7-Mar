# SEO Implementation Examples

## 1. Home.tsx Example

```tsx
import React from 'react';
import { SEO } from '@/SEO/SEO';
import { seoConfig } from '@/SEO/seoConfig';
// ... other imports

const Home: React.FC = () => {
  return (
    <>
      <SEO {...seoConfig["/"]} />
      {/* Rest of your Home component */}
      <div>
        {/* Your home page content */}
      </div>
    </>
  );
};

export default Home;
```

## 2. About.tsx Example

```tsx
import React from 'react';
import { SEO } from '@/SEO/SEO';
import { seoConfig } from '@/SEO/seoConfig';
// ... other imports

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO {...seoConfig["/about"]} />
      {/* Remove existing Helmet component if any */}
      
      <div>
        {/* Your about page content */}
      </div>
    </>
  );
};

export default About;
```

## 3. Services.tsx Example

```tsx
import React from 'react';
import { SEO } from '@/SEO/SEO';
import { seoConfig } from '@/SEO/seoConfig';
// ... other imports

const Services: React.FC = () => {
  return (
    <>
      <SEO {...seoConfig["/services"]} />
      {/* Rest of your Services component */}
      <div>
        {/* Your services page content */}
      </div>
    </>
  );
};

export default Services;
```

## 4. Resources.tsx Example

```tsx
import React from 'react';
import { SEO } from '@/SEO/SEO';
import { seoConfig } from '@/SEO/seoConfig';
// ... other imports

const Resources: React.FC = () => {
  return (
    <>
      <SEO {...seoConfig["/resources"]} />
      {/* Rest of your Resources component */}
      <div>
        {/* Your resources page content */}
      </div>
    </>
  );
};

export default Resources;
```

## 5. Contact.tsx Example

```tsx
import React from 'react';
import { SEO } from '@/SEO/SEO';
import { seoConfig } from '@/SEO/seoConfig';
// ... other imports

const Contact: React.FC = () => {
  return (
    <>
      <SEO {...seoConfig["/contact"]} />
      {/* Rest of your Contact component */}
      <div>
        {/* Your contact page content */}
      </div>
    </>
  );
};

export default Contact;
```

## Installation Steps

1. **Install react-helmet-async** (if not already installed):
   ```bash
   npm install react-helmet-async
   ```

2. **Wrap your App with HelmetProvider** in `main.tsx` or `App.tsx`:
   ```tsx
   import { HelmetProvider } from 'react-helmet-async';
   
   ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
       <HelmetProvider>
         <App />
       </HelmetProvider>
     </React.StrictMode>,
   );
   ```

3. **Replace existing SEO components** in your pages with the new `<SEO />` component.

4. **Remove old SEO files** after migration:
   - `src/SEO/SEOhome.tsx`
   - `src/SEO/SEOabout.tsx`
   - `src/SEO/SEOcontact.tsx`
   - `src/SEO/SEOresources.tsx`
   - `src/SEO/SEOservice.tsx`

## Custom SEO for Dynamic Pages

For dynamic pages (like blog posts), you can override specific properties:

```tsx
import { SEO } from '@/SEO/SEO';
import { seoConfig } from '@/SEO/seoConfig';

const BlogPost: React.FC<{ post: BlogPost }> = ({ post }) => {
  const customSEO = {
    ...seoConfig["/resources"], // Base config
    title: post.title + " - T-Imoexo Blog",
    description: post.excerpt,
    canonical: `https://t-imoexo.com/blog/${post.slug}`,
    ogImage: post.featuredImage || seoConfig["/resources"].ogImage,
    // Add custom schema for blog post
    schema: [
      ...seoConfig["/resources"].schema,
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        author: {
          "@type": "Organization",
          name: "T-Imoexo"
        },
        datePublished: post.publishedDate,
        dateModified: post.modifiedDate
      }
    ]
  };

  return (
    <>
      <SEO {...customSEO} />
      {/* Blog post content */}
    </>
  );
};
```

## Key Features of New SEO System

✅ **Clean Configuration**: All SEO data in one centralized config file
✅ **TypeScript Support**: Full type safety for all SEO properties  
✅ **Reusable Component**: Single SEO component for all pages
✅ **Structured Data**: Proper JSON-LD schema support
✅ **HrefLang Support**: International SEO ready
✅ **Open Graph**: Complete social media optimization
✅ **Performance**: No duplicate meta tags, clean implementation

## Migration Checklist

- [ ] Install `react-helmet-async`
- [ ] Wrap App with `HelmetProvider`
- [ ] Replace old SEO components with new `<SEO />` component
- [ ] Test each page to ensure SEO tags are rendered correctly
- [ ] Remove old SEO component files
- [ ] Validate structured data using Google's Rich Results Test