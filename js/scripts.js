document.body.classList.add("dark");

const modeBtn = document.getElementById("display-mode-toggler");

modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        modeBtn.textContent = "Enable dark mode";
    } else {
        modeBtn.textContent = "Enable light mode";
    }
});

const headerName = document.getElementById("cu-fullname");
const headerHandle = document.getElementById("cu-handle");

if (headerName) headerName.textContent = `${user.first_name} ${user.last_name}`;
if (headerHandle) headerHandle.textContent = `@${user.username}`;

const textarea = document.getElementById("compose-text");
const count = document.getElementById("compose-count");

textarea.addEventListener("input", () => {
    const remaining = 280 - textarea.value.length;
    count.textContent = remaining;
});

const form = document.getElementById("compose-form");
const timeline = document.getElementById("timeline");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = textarea.value.trim();
    if (text === "") return;

    const hashtags = Array.from(text.matchAll(/#(\w+)/g), m => m[1]);
    const mentions = Array.from(text.matchAll(/@(\w+)/g), m => m[1]);

    const newPost = {
        username: user.username,
        content: text,
        hashtags: hashtags,
        mentions: mentions,
        timestamp: new Date().toISOString()
    };

    posts.unshift(newPost);      
    renderTimeline(posts);

    textarea.value = "";
    count.textContent = "280";
});

function renderTimeline(list) {
    timeline.innerHTML = "";
    list.forEach(post => timeline.appendChild(createPostElement(post)));
}

function initSearch() {
    const input = document.getElementById("search-input");

    input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();

        if (q === "") {
            renderTimeline(posts);
            return;
        }

        const filtered = posts.filter(p =>
            p.content.toLowerCase().includes(q) ||
            p.username.toLowerCase().includes(q) ||
            p.hashtags.some(tag => tag.toLowerCase().includes(q.replace("#", ""))) ||
            p.mentions.some(m => m.toLowerCase().includes(q.replace("@", "")))
        );

        renderTimeline(filtered);
    });
}

initSearch();

function getUserByUsername(username) {
    if (username === user.username) return user;
    return friends.find(f => f.username === username);
}

function linkify(text) {
    const escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    return escaped
        .replace(/#(\w+)/g, '<a href="#" class="tag-link">#$1</a>')
        .replace(/@(\w+)/g, '<a href="#" class="mention-link">@$1</a>');
}

function createPostElement(post) {
    const author = getUserByUsername(post.username);

    const li = document.createElement("li");
    li.classList.add("post");

    const article = document.createElement("article");
    article.classList.add("post-card");

    const header = document.createElement("header");
    header.classList.add("post-header");

    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = author.profile_pic;
    avatar.alt = `${author.username} profile picture`;

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");

    const name = document.createElement("span");
    name.classList.add("name");
    name.textContent = `${author.first_name} ${author.last_name}`;

    const handle = document.createElement("span");
    handle.classList.add("handle");
    handle.textContent = `@${author.username}`;

    authorDiv.appendChild(name);
    authorDiv.appendChild(handle);

    const time = document.createElement("time");
    time.classList.add("time");
    time.textContent = new Date(post.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    header.appendChild(avatar);
    header.appendChild(authorDiv);
    header.appendChild(time);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("post-content");

    const p = document.createElement("p");
    p.innerHTML = linkify(post.content);
    contentDiv.appendChild(p);

    if (post.hashtags && post.hashtags.length > 0) {
        const tagsP = document.createElement("p");
        tagsP.innerHTML = post.hashtags
            .map(tag => `<a href="#" class="tag-link">#${tag}</a>`)
            .join(" ");
        contentDiv.appendChild(tagsP);
    }

    if (post.mentions && post.mentions.length > 0) {
        const mentionsP = document.createElement("p");
        mentionsP.innerHTML = post.mentions
            .map(m => `<a href="#" class="mention-link">@${m}</a>`)
            .join(" ");
        contentDiv.appendChild(mentionsP);
    }

    const footer = document.createElement("footer");
    footer.classList.add("post-actions");

    ["Reply", "Repost", "Like"].forEach(label => {
        const btn = document.createElement("button");
        btn.classList.add("btn", "secondary");
        btn.type = "button";
        btn.textContent = label;
        footer.appendChild(btn);
    });

    article.appendChild(header);
    article.appendChild(contentDiv);
    article.appendChild(footer);
    li.appendChild(article);

    return li;
}

renderTimeline(posts);