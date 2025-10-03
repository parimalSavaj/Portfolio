// Available Blog Categories - Add new categories here if needed
export const blogCategories = [
  {
    id: "javascript",
    name: "JavaScript",
    slug: "javascript",
    description: "JavaScript tips, tricks, and tutorials",
    color: "#f7df1e",
    icon: "⚡",
  },
  {
    id: "nodejs",
    name: "Node.js",
    slug: "node",
    description: "Backend development with Node.js",
    color: "#339933",
    icon: "🚀",
  },
  {
    id: "python",
    name: "Python",
    slug: "python",
    description: "Python programming and data science",
    color: "#3776ab",
    icon: "🐍",
  },
  {
    id: "web-development",
    name: "Web Development",
    slug: "web-development",
    description: "General web development topics",
    color: "#61dafb",
    icon: "🌐",
  },
];

// Blog Posts - Add your new posts here
export const blogPosts = [
  {
    id: "getting-started-javascript",
    title: "Getting Started with JavaScript",
    slug: "getting-started-javascript",
    category: "javascript",
    author: "Your Name",
    publishDate: "2024-01-15",
    description:
      "Learn the basics of JavaScript programming and start building interactive web applications.",
    content: `
# Getting Started with JavaScript

JavaScript is the programming language of the web. It's what makes websites interactive and dynamic.

## What is JavaScript?

JavaScript is a programming language that runs in web browsers. It allows you to:
- Make websites interactive
- Handle user clicks and input
- Update content without refreshing the page
- Create animations and effects

## Your First JavaScript Code

Here's a simple example:

\`\`\`javascript
// Display a message
console.log("Hello, World!");

// Change text on a webpage
document.getElementById("myText").textContent = "Welcome!";
\`\`\`

## Basic Concepts

### Variables
Store data in variables:
\`\`\`javascript
let name = "John";
let age = 25;
\`\`\`

### Functions
Create reusable code blocks:
\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\`

## Next Steps

1. Practice with simple examples
2. Learn about DOM manipulation
3. Try building small projects
4. Explore modern JavaScript features

Happy coding! 🚀
    `,
    tags: ["javascript", "beginner", "tutorial"],
    readTime: 5,
    featured: true,
  },

  {
    id: "simple-nodejs-server",
    title: "Building a Simple Node.js Server",
    slug: "simple-nodejs-server",
    category: "nodejs",
    author: "Your Name",
    publishDate: "2024-01-12",
    description:
      "Learn how to create a basic web server using Node.js in just a few lines of code.",
    content: `
# Building a Simple Node.js Server

Node.js allows you to run JavaScript on the server. Let's build a simple web server!

## What You'll Need

- Node.js installed on your computer
- A text editor
- Basic JavaScript knowledge

## Creating the Server

Create a file called \`server.js\`:

\`\`\`javascript
// Import the http module
const http = require('http');

// Create a server
const server = http.createServer((req, res) => {
  // Set response headers
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  // Send response
  res.end('<h1>Hello from Node.js!</h1>');
});

// Start the server
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
\`\`\`

## Running Your Server

1. Open terminal in your project folder
2. Run: \`node server.js\`
3. Open http://localhost:3000 in your browser
4. You should see "Hello from Node.js!"

## Adding Routes

Make your server handle different URLs:

\`\`\`javascript
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  if (req.url === '/') {
    res.end('<h1>Home Page</h1>');
  } else if (req.url === '/about') {
    res.end('<h1>About Page</h1>');
  } else {
    res.end('<h1>Page Not Found</h1>');
  }
});
\`\`\`

## Conclusion

You've built your first Node.js server! This is the foundation for building web applications, APIs, and more.

Keep experimenting and building! 🚀
    `,
    tags: ["nodejs", "server", "beginner", "tutorial"],
    readTime: 4,
    featured: false,
  },

  {
    id: "python-basics",
    title: "Python Programming Basics",
    slug: "python-basics",
    category: "python",
    author: "Your Name",
    publishDate: "2024-01-10",
    description:
      "Start your Python journey with the fundamental concepts and syntax.",
    content: `
# Python Programming Basics

Python is a beginner-friendly programming language that's powerful and versatile.

## Why Choose Python?

- Easy to read and write
- Great for beginners
- Used in web development, data science, AI, and more
- Large community and lots of resources

## Getting Started

### Variables and Data Types

\`\`\`python
# Numbers
age = 25
price = 19.99

# Text (strings)
name = "Alice"
message = "Hello, World!"

# True/False values
is_student = True
is_working = False
\`\`\`

### Lists (Arrays)

\`\`\`python
# Create a list
fruits = ["apple", "banana", "orange"]

# Add items
fruits.append("grape")

# Access items
first_fruit = fruits[0]  # "apple"
\`\`\`

### Loops

\`\`\`python
# Loop through a list
for fruit in fruits:
    print(f"I like {fruit}")

# Count from 1 to 5
for i in range(1, 6):
    print(f"Number: {i}")
\`\`\`

### Functions

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

# Use the function
message = greet("Alice")
print(message)  # "Hello, Alice!"
\`\`\`

## Simple Project: Calculator

\`\`\`python
def calculator(num1, num2, operation):
    if operation == "+":
        return num1 + num2
    elif operation == "-":
        return num1 - num2
    elif operation == "*":
        return num1 * num2
    elif operation == "/":
        return num1 / num2
    else:
        return "Invalid operation"

# Test it
result = calculator(10, 5, "+")
print(result)  # 15
\`\`\`

## Next Steps

1. Practice with simple programs
2. Learn about dictionaries and sets
3. Try building small projects
4. Explore Python libraries

Python is an amazing language to learn. Start coding today! 🐍
    `,
    tags: ["python", "beginner", "programming", "tutorial"],
    readTime: 6,
    featured: true,
  },

  {
    id: "responsive-web-design",
    title: "Responsive Web Design Tips",
    slug: "responsive-web-design",
    category: "web-development",
    author: "Your Name",
    publishDate: "2024-01-08",
    description:
      "Learn how to make websites that look great on all devices with these simple responsive design techniques.",
    content: `
# Responsive Web Design Tips

Make your websites look great on phones, tablets, and desktops with these simple techniques.

## What is Responsive Design?

Responsive design means your website automatically adjusts to different screen sizes. It looks good whether someone visits on a phone or a large desktop monitor.

## Essential Techniques

### 1. Use the Viewport Meta Tag

Add this to your HTML head:
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

### 2. Flexible Layouts with CSS Grid/Flexbox

\`\`\`css
/* Flexible container */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* Items adjust automatically */
.item {
  flex: 1;
  min-width: 300px;
}
\`\`\`

### 3. Media Queries

Change styles based on screen size:
\`\`\`css
/* Default styles for all screens */
.header {
  font-size: 24px;
  padding: 20px;
}

/* Styles for tablets and smaller */
@media (max-width: 768px) {
  .header {
    font-size: 20px;
    padding: 15px;
  }
}

/* Styles for phones */
@media (max-width: 480px) {
  .header {
    font-size: 18px;
    padding: 10px;
  }
}
\`\`\`

### 4. Responsive Images

\`\`\`css
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

## Common Breakpoints

Use these screen sizes as starting points:
- Mobile: 480px and below
- Tablet: 481px to 768px
- Desktop: 769px and above

## Quick Tips

1. **Test on real devices** - Simulators are good, but real testing is better
2. **Start mobile-first** - Design for small screens first, then expand
3. **Keep it simple** - Complex layouts are harder to make responsive
4. **Use relative units** - Use % and em instead of fixed pixels when possible

## Example: Simple Responsive Card

\`\`\`css
.card {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .card {
    width: 45%;
    display: inline-block;
    margin: 10px;
  }
}
\`\`\`

## Conclusion

Responsive design isn't just nice to have - it's essential. With these basic techniques, you can create websites that work beautifully on any device.

Start small, test often, and keep improving! 📱💻
    `,
    tags: ["css", "responsive", "web-design", "mobile"],
    readTime: 7,
    featured: false,
  },
];

// ===== HOW TO ADD NEW BLOG POSTS =====
//
// 1. Copy the template below
// 2. Replace all the placeholder text with your content
// 3. Add it to the blogPosts array above (inside the square brackets)
// 4. Make sure to add a comma after the previous post
//
// TEMPLATE FOR NEW BLOG POST:
/*
{
  id: "your-post-id",                    // Use lowercase with dashes, like "my-awesome-post"
  title: "Your Blog Post Title",         // The title that appears on the page
  slug: "your-post-url",                 // URL-friendly version (same as id usually)
  category: "javascript",                // Must match one of the categories above
  author: "Your Name",                   // Your name
  publishDate: "2024-01-15",             // Date in YYYY-MM-DD format
  description: "A short description of your post that appears in previews.",
  content: `
# Your Blog Post Title

Write your blog post content here using Markdown.

## You can use headings

### And subheadings

You can write paragraphs normally.

You can add code blocks like this:

\`\`\`javascript
function example() {
  console.log("Hello, World!");
}
\`\`\`

- You can make lists
- With bullet points
- Like this

1. Or numbered lists
2. Like this
3. Easy!

**Bold text** and *italic text* work too.

Add links: [Link text](https://example.com)

That's it! Keep it simple and helpful.
  `,
  tags: ["javascript", "tutorial", "beginner"],    // Array of relevant tags
  readTime: 5,                                     // Estimated reading time in minutes
  featured: false,                                 // Set to true if you want it featured
},
*/

// EXAMPLE: How to add a new post
// Just copy this example, modify it, and add it to the blogPosts array above:
/*
{
  id: "my-first-post",
  title: "My First Blog Post",
  slug: "my-first-post",
  category: "web-development",
  author: "Your Name",
  publishDate: "2024-01-20",
  description: "This is my very first blog post where I share my thoughts on web development.",
  content: `
# My First Blog Post

Welcome to my blog! I'm excited to share my journey in web development.

## What I'm Learning

I'm currently learning:
- HTML and CSS
- JavaScript basics
- React framework

## My Goals

1. Build awesome websites
2. Help other developers
3. Keep learning new things

Stay tuned for more posts!
  `,
  tags: ["personal", "web-development", "goals"],
  readTime: 2,
  featured: true,
},
*/
