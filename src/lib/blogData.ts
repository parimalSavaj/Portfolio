export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishDate: string;
  description: string;
  content: string;
  tags: string[];
  readTime: number; // in minutes
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

// Blog Categories
export const blogCategories: BlogCategory[] = [
  {
    id: "javascript",
    name: "JavaScript",
    slug: "javascript",
    description: "Modern JavaScript development, ES6+, and best practices",
    color: "#f7df1e",
    icon: "⚡",
  },
  {
    id: "nodejs",
    name: "Node.js",
    slug: "node",
    description: "Server-side JavaScript, APIs, and backend development",
    color: "#339933",
    icon: "🚀",
  },
  {
    id: "python",
    name: "Python",
    slug: "python",
    description: "Python programming, data science, and automation",
    color: "#3776ab",
    icon: "🐍",
  },
];

// Sample Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: "js-async-patterns",
    title: "Mastering Async/Await: Modern JavaScript Patterns",
    slug: "mastering-async-await-patterns",
    category: "javascript",
    author: "Your Name",
    publishDate: "2024-01-15",
    description:
      "Learn how to effectively use async/await patterns in modern JavaScript applications, including error handling and performance optimization techniques.",
    content: `
# Mastering Async/Await: Modern JavaScript Patterns

Asynchronous programming is at the heart of modern JavaScript development. Whether you're fetching data from APIs, reading files, or handling user interactions, understanding async/await patterns is crucial for building responsive applications.

## Why Async/Await?

Before async/await, we relied on callbacks and promises, which often led to callback hell and complex promise chains. Async/await provides a cleaner, more readable syntax that makes asynchronous code look and behave more like synchronous code.

\`\`\`javascript
// Old Promise-based approach
function fetchUserData(userId) {
  return fetch(\`/api/users/\${userId}\`)
    .then(response => response.json())
    .then(user => {
      return fetch(\`/api/posts/\${user.id}\`);
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

// Modern async/await approach
async function fetchUserData(userId) {
  try {
    const userResponse = await fetch(\`/api/users/\${userId}\`);
    const user = await userResponse.json();
    
    const postsResponse = await fetch(\`/api/posts/\${user.id}\`);
    const posts = await postsResponse.json();
    
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
\`\`\`

## Error Handling Best Practices

One of the most important aspects of async programming is proper error handling. Here are some patterns I recommend:

### 1. Try-Catch Blocks
Always wrap your async operations in try-catch blocks to handle potential errors gracefully.

### 2. Custom Error Classes
Create specific error types for different scenarios to make debugging easier.

### 3. Graceful Degradation
Provide fallback mechanisms when async operations fail.

## Performance Optimization

When working with multiple async operations, consider these optimization techniques:

- **Parallel Execution**: Use \`Promise.all()\` for independent operations
- **Sequential Execution**: Use await for dependent operations
- **Timeout Handling**: Implement timeouts to prevent hanging requests

## Conclusion

Async/await has revolutionized how we write asynchronous JavaScript. By following these patterns and best practices, you'll write more maintainable and robust applications.

Happy coding! 🚀
    `,
    tags: ["javascript", "async", "promises", "es6", "best-practices"],
    readTime: 8,
    featured: true,
  },
  {
    id: "js-performance-tips",
    title: "10 JavaScript Performance Tips That Actually Matter",
    slug: "javascript-performance-tips-that-matter",
    category: "javascript",
    author: "Your Name",
    publishDate: "2024-01-10",
    description:
      "Practical JavaScript performance optimization techniques that will make a real difference in your applications, from memory management to DOM manipulation.",
    content: `
# 10 JavaScript Performance Tips That Actually Matter

Performance optimization in JavaScript isn't just about making your code run faster—it's about creating better user experiences. Here are 10 practical tips that will make a real difference in your applications.

## 1. Minimize DOM Manipulation

The DOM is slow. Every time you access or modify it, you're potentially triggering expensive operations.

\`\`\`javascript
// Slow: Multiple DOM queries
document.getElementById('title').textContent = 'New Title';
document.getElementById('subtitle').textContent = 'New Subtitle';
document.getElementById('content').textContent = 'New Content';

// Fast: Cache DOM references
const elements = {
  title: document.getElementById('title'),
  subtitle: document.getElementById('subtitle'),
  content: document.getElementById('content')
};

elements.title.textContent = 'New Title';
elements.subtitle.textContent = 'New Subtitle';
elements.content.textContent = 'New Content';
\`\`\`

## 2. Use Event Delegation

Instead of attaching event listeners to multiple elements, use event delegation to handle events at a parent level.

## 3. Debounce Expensive Operations

For operations triggered by user input (like search), use debouncing to limit how often they execute.

## 4. Optimize Loops

Choose the right loop for the job and avoid unnecessary operations inside loops.

## 5. Use Web Workers for Heavy Computations

Move CPU-intensive tasks to Web Workers to keep the main thread responsive.

## 6. Implement Lazy Loading

Load resources only when they're needed, especially for images and components.

## 7. Minimize Bundle Size

Use tree shaking, code splitting, and dynamic imports to reduce your JavaScript bundle size.

## 8. Cache API Responses

Implement intelligent caching strategies to reduce network requests.

## 9. Use RequestAnimationFrame for Animations

For smooth animations, use requestAnimationFrame instead of setTimeout or setInterval.

## 10. Profile and Measure

Use browser dev tools to identify actual performance bottlenecks rather than guessing.

## Conclusion

Performance optimization is an ongoing process. Focus on measuring real-world impact and optimizing the bottlenecks that actually affect your users.

Remember: premature optimization is the root of all evil, but informed optimization is the path to great user experiences! ⚡
    `,
    tags: ["javascript", "performance", "optimization", "dom", "web-workers"],
    readTime: 12,
    featured: false,
  },
  {
    id: "nodejs-api-design",
    title: "Building Scalable REST APIs with Node.js and Express",
    slug: "building-scalable-rest-apis-nodejs-express",
    category: "nodejs",
    author: "Your Name",
    publishDate: "2024-01-12",
    description:
      "A comprehensive guide to designing and building scalable REST APIs using Node.js and Express, including best practices for authentication, validation, and error handling.",
    content: `
# Building Scalable REST APIs with Node.js and Express

Creating robust, scalable REST APIs is a fundamental skill for backend developers. In this comprehensive guide, we'll explore best practices for building APIs with Node.js and Express that can handle real-world traffic and complexity.

## Project Setup and Structure

A well-organized project structure is the foundation of maintainable code:

\`\`\`
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── app.js
\`\`\`

## Essential Middleware

Every production API needs these middleware components:

\`\`\`javascript
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
\`\`\`

## Authentication and Authorization

Implement JWT-based authentication with proper token management:

\`\`\`javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};
\`\`\`

## Input Validation

Use Joi or similar libraries for robust input validation:

\`\`\`javascript
const Joi = require('joi');

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(50).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(detail => detail.message)
    });
  }
  next();
};
\`\`\`

## Error Handling

Implement centralized error handling:

\`\`\`javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production error response
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  }
};

module.exports = { AppError, globalErrorHandler };
\`\`\`

## Database Integration

Use connection pooling and proper error handling for database operations:

\`\`\`javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};
\`\`\`

## API Versioning

Implement proper API versioning from the start:

\`\`\`javascript
// Version 1 routes
app.use('/api/v1/users', require('./routes/v1/users'));
app.use('/api/v1/posts', require('./routes/v1/posts'));

// Version 2 routes (when needed)
app.use('/api/v2/users', require('./routes/v2/users'));
\`\`\`

## Testing

Write comprehensive tests for your API endpoints:

\`\`\`javascript
const request = require('supertest');
const app = require('../app');

describe('POST /api/v1/users', () => {
  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    };

    const response = await request(app)
      .post('/api/v1/users')
      .send(userData)
      .expect(201);

    expect(response.body.user.email).toBe(userData.email);
    expect(response.body.user.password).toBeUndefined();
  });
});
\`\`\`

## Deployment Considerations

- Use environment variables for configuration
- Implement health check endpoints
- Set up proper logging with Winston or similar
- Use PM2 for process management
- Implement graceful shutdown handling

## Conclusion

Building scalable REST APIs requires attention to security, performance, and maintainability. By following these patterns and best practices, you'll create APIs that can grow with your application's needs.

Remember to always validate input, handle errors gracefully, and test thoroughly. Happy coding! 🚀
    `,
    tags: ["nodejs", "express", "rest-api", "backend", "scalability"],
    readTime: 15,
    featured: true,
  },
  {
    id: "python-data-analysis",
    title: "Python Data Analysis: From Pandas to Insights",
    slug: "python-data-analysis-pandas-insights",
    category: "python",
    author: "Your Name",
    publishDate: "2024-01-08",
    description:
      "Master data analysis with Python using pandas, numpy, and matplotlib. Learn to clean, analyze, and visualize data to extract meaningful insights.",
    content: `
# Python Data Analysis: From Pandas to Insights

Data analysis is one of Python's strongest use cases. With libraries like pandas, numpy, and matplotlib, Python provides a powerful toolkit for extracting insights from data. Let's explore how to go from raw data to actionable insights.

## Setting Up Your Environment

First, let's set up our data analysis environment:

\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

# Set up plotting style
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")
\`\`\`

## Loading and Exploring Data

The first step in any data analysis is understanding your data:

\`\`\`python
# Load data
df = pd.read_csv('sales_data.csv')

# Basic exploration
print("Dataset shape:", df.shape)
print("\\nColumn info:")
print(df.info())
print("\\nFirst few rows:")
print(df.head())
print("\\nBasic statistics:")
print(df.describe())
\`\`\`

## Data Cleaning

Real-world data is messy. Here's how to clean it:

\`\`\`python
# Check for missing values
print("Missing values per column:")
print(df.isnull().sum())

# Handle missing values
df['price'].fillna(df['price'].median(), inplace=True)
df['category'].fillna('Unknown', inplace=True)

# Remove duplicates
df.drop_duplicates(inplace=True)

# Fix data types
df['date'] = pd.to_datetime(df['date'])
df['price'] = pd.to_numeric(df['price'], errors='coerce')

# Handle outliers using IQR method
Q1 = df['price'].quantile(0.25)
Q3 = df['price'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

df = df[(df['price'] >= lower_bound) & (df['price'] <= upper_bound)]
\`\`\`

## Exploratory Data Analysis (EDA)

Now let's explore patterns in our data:

\`\`\`python
# Distribution of numerical variables
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
df['price'].hist(bins=30, ax=axes[0,0])
axes[0,0].set_title('Price Distribution')

df['quantity'].hist(bins=30, ax=axes[0,1])
axes[0,1].set_title('Quantity Distribution')

# Category analysis
category_counts = df['category'].value_counts()
category_counts.plot(kind='bar', ax=axes[1,0])
axes[1,0].set_title('Sales by Category')
axes[1,0].tick_params(axis='x', rotation=45)

# Time series analysis
df.set_index('date')['price'].resample('M').mean().plot(ax=axes[1,1])
axes[1,1].set_title('Average Price Over Time')

plt.tight_layout()
plt.show()
\`\`\`

## Advanced Analysis Techniques

### Correlation Analysis
\`\`\`python
# Correlation matrix
correlation_matrix = df.select_dtypes(include=[np.number]).corr()
plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Correlation Matrix')
plt.show()
\`\`\`

### Groupby Operations
\`\`\`python
# Sales analysis by category
category_analysis = df.groupby('category').agg({
    'price': ['mean', 'sum', 'count'],
    'quantity': ['mean', 'sum']
}).round(2)

print("Sales Analysis by Category:")
print(category_analysis)
\`\`\`

### Time Series Analysis
\`\`\`python
# Create time-based features
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.day_name()

# Monthly trends
monthly_sales = df.groupby(['year', 'month'])['price'].sum().reset_index()
monthly_sales['date'] = pd.to_datetime(monthly_sales[['year', 'month']].assign(day=1))

plt.figure(figsize=(12, 6))
plt.plot(monthly_sales['date'], monthly_sales['price'], marker='o')
plt.title('Monthly Sales Trend')
plt.xlabel('Date')
plt.ylabel('Total Sales')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

## Statistical Analysis

### Hypothesis Testing
\`\`\`python
from scipy import stats

# Compare sales between two categories
category_a = df[df['category'] == 'Electronics']['price']
category_b = df[df['category'] == 'Clothing']['price']

# Perform t-test
t_stat, p_value = stats.ttest_ind(category_a, category_b)
print(f"T-statistic: {t_stat:.4f}")
print(f"P-value: {p_value:.4f}")

if p_value < 0.05:
    print("Significant difference between categories")
else:
    print("No significant difference between categories")
\`\`\`

## Creating Insights Dashboard

\`\`\`python
def create_dashboard(df):
    fig, axes = plt.subplots(2, 3, figsize=(18, 12))
    
    # KPI metrics
    total_sales = df['price'].sum()
    avg_order_value = df['price'].mean()
    total_orders = len(df)
    
    # Sales by category pie chart
    category_sales = df.groupby('category')['price'].sum()
    axes[0,0].pie(category_sales.values, labels=category_sales.index, autopct='%1.1f%%')
    axes[0,0].set_title('Sales Distribution by Category')
    
    # Monthly trend
    monthly_trend = df.groupby(df['date'].dt.to_period('M'))['price'].sum()
    monthly_trend.plot(kind='line', ax=axes[0,1], marker='o')
    axes[0,1].set_title('Monthly Sales Trend')
    axes[0,1].tick_params(axis='x', rotation=45)
    
    # Top products
    top_products = df.groupby('product_name')['price'].sum().nlargest(10)
    top_products.plot(kind='barh', ax=axes[0,2])
    axes[0,2].set_title('Top 10 Products by Sales')
    
    # Price distribution
    df['price'].hist(bins=30, ax=axes[1,0])
    axes[1,0].set_title('Price Distribution')
    axes[1,0].set_xlabel('Price')
    axes[1,0].set_ylabel('Frequency')
    
    # Sales by day of week
    day_sales = df.groupby('day_of_week')['price'].sum()
    day_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    day_sales = day_sales.reindex(day_order)
    day_sales.plot(kind='bar', ax=axes[1,1])
    axes[1,1].set_title('Sales by Day of Week')
    axes[1,1].tick_params(axis='x', rotation=45)
    
    # Quantity vs Price scatter
    axes[1,2].scatter(df['quantity'], df['price'], alpha=0.6)
    axes[1,2].set_title('Quantity vs Price')
    axes[1,2].set_xlabel('Quantity')
    axes[1,2].set_ylabel('Price')
    
    plt.tight_layout()
    plt.show()
    
    # Print KPIs
    print("📊 Key Performance Indicators")
    print("Total Sales: $" + str(total_sales))
    print("Average Order Value: $" + str(avg_order_value))
    print("Total Orders: " + str(total_orders))

# Create the dashboard
create_dashboard(df)
\`\`\`

## Exporting Results

\`\`\`python
# Create summary report
summary_stats = {
    'Total Sales': df['price'].sum(),
    'Average Order Value': df['price'].mean(),
    'Total Orders': len(df),
    'Top Category': df.groupby('category')['price'].sum().idxmax(),
    'Best Month': df.groupby(df['date'].dt.month)['price'].sum().idxmax()
}

# Save to Excel with multiple sheets
with pd.ExcelWriter('sales_analysis_report.xlsx') as writer:
    df.to_excel(writer, sheet_name='Raw Data', index=False)
    
    category_summary = df.groupby('category').agg({
        'price': ['sum', 'mean', 'count']
    }).round(2)
    category_summary.to_excel(writer, sheet_name='Category Analysis')
    
    pd.DataFrame([summary_stats]).to_excel(writer, sheet_name='Summary', index=False)

print("Analysis complete! Report saved to 'sales_analysis_report.xlsx'")
\`\`\`

## Best Practices for Data Analysis

1. **Always start with data exploration** - understand your data before diving into analysis
2. **Clean your data thoroughly** - garbage in, garbage out
3. **Visualize early and often** - plots reveal patterns that numbers can't
4. **Document your process** - make your analysis reproducible
5. **Validate your findings** - cross-check results with domain knowledge
6. **Tell a story with your data** - insights without context are just numbers

## Conclusion

Python's data analysis ecosystem is incredibly powerful. By combining pandas for data manipulation, matplotlib/seaborn for visualization, and scipy for statistical analysis, you can extract meaningful insights from any dataset.

The key to successful data analysis is asking the right questions and letting the data guide your exploration. Start simple, build complexity gradually, and always validate your findings.

Happy analyzing! 📊🐍
    `,
    tags: ["python", "pandas", "data-analysis", "visualization", "statistics"],
    readTime: 18,
    featured: true,
  },
];

// Helper functions
export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter((post) => post.category === category);
};

export const getBlogPostBySlug = (
  category: string,
  slug: string
): BlogPost | undefined => {
  return blogPosts.find(
    (post) => post.category === category && post.slug === slug
  );
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.featured);
};

export const getAllPosts = (): BlogPost[] => {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
};

export const getCategoryBySlug = (slug: string): BlogCategory | undefined => {
  return blogCategories.find((category) => category.slug === slug);
};
