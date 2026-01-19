# CSCI 1170: Assignment 3

## Developer info

* Full name:Pramodh Kumar Vankayala
* B00/B01 number:B01031812
* Dal email address:pr901093@dal.ca

## Description of Assignment

* For this assignment, I implemented a client‑side micro‑post feed that lets the current user (Rey) view, search, and create short posts using only JavaScript and CSS, without changing the provided HTML or data files. I load all posts from the starter posts.js file, render them as styled “cards” in a responsive grid timeline, and display the current user information from users.js. I added live searching across post content, hashtags, and mentions, and built a composer that shows a live 280‑character counter, validates input, and inserts new posts at the top of the feed.

To improve readability and accessibility, I designed a cohesive dark/light colour theme using CSS variables and wired it to a footer toggle button so the site starts in dark mode and can switch modes instantly with updated button text. I used flexbox and CSS grid to align the header, navigation, compose form, and timeline, created card‑style posts with clear grouping of avatar, author, time, text, and actions, and added hover/focus styles to interactive buttons and links. I also ensured the header is sticky while scrolling and made the layout mobile‑first, with a single‑column feed on small screens and automatic expansion to two and three columns at the 720px and 840px breakpoints

## Setup and test instructions

* Download the Assignment 3 starter code and ensure the folder is named a3 with the original structure (including index.html, admin/users.js, admin/posts.js, assets/css/styles.css, and js/scripts.js).

* Do not modify index.html or the files in the admin folder; all behaviour is implemented in js/scripts.js and all styling in assets/css/styles.css.

* Open the a3 folder in your code editor to view or edit the JavaScript and CSS files.

* To run the app, open index.html in a modern web browser (for example, by double‑clicking the file or using “Open With” in your file explorer).

* Test the features by:

* Confirming the current user information shows “Rey Skywalker” and @rey in the header.

* Scrolling the page to see the sticky header and responsive timeline layout.

* Using the search bar to filter posts by text, #hashtag, or @mention.

* Composing a new post, watching the live character counter, and submitting to see the new post appear at the top.

* Clicking “Enable light mode” / “Enable dark mode” in the footer to switch colour themes.

## References/citations

1. MDN Web Docs. (n.d.). Introduction to the DOM. Mozilla. https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

2. MDN Web Docs. (n.d.). Using media queries. Mozilla. https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries

3. MDN Web Docs. (n.d.). ARIA: aria-live attribute. Mozilla. https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live
