let lastPostId = localStorage.getItem("last_post_id") ? localStorage.getItem("last_post_id") : -1;

class Post {
    constructor(user, datetime, title, content) {
        this.id = ++lastPostId;
        this.user = user;
        this.datetime = datetime;
        this.title = title;
        this.content = content;
        localStorage.setItem("last_post_id", lastPostId);
    }
}

let posts = localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : [
    new Post("admin", Date.now(), "Admin Post 1", "This is an example post."),
    new Post("admin", Date.now(), "Admin Post 2", "This is another example post. This post has much more text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices, sapien sit amet ornare tincidunt, ante felis laoreet ligula, eget aliquam dui nisl at sem. Integer laoreet bibendum sapien ut tincidunt. Nam sed lacus purus. Vivamus at felis enim. Nulla aliquam felis nulla, et molestie lacus elementum nec. Proin non ante lectus. Etiam egestas mauris placerat, consectetur nibh eget, malesuada turpis. Etiam mattis velit lorem, sit amet imperdiet magna consectetur vel. Donec posuere, dui id ornare ornare, odio urna efficitur quam, et commodo nisl nunc id lorem."),
];

const user = localStorage.getItem("current_user");

document.addEventListener("DOMContentLoaded", (e) => {
    if (user) {
        document.getElementById("post-form").removeAttribute("hidden");
        document.getElementById("logout-link").removeAttribute("hidden");
        document.getElementById("login-link").setAttribute("hidden", "");
        document.getElementById("signup-link").setAttribute("hidden", "");
    }

    let postsParent = document.getElementById("posts");
    posts.forEach((post) => {
        let postElement = getPostElement(post);
        let deleteButton = postElement.querySelector(":scope > .card-footer > .btn-delete");
        if (post.user == user) {
            deleteButton.removeAttribute("hidden");
        }
        postsParent.appendChild(postElement);
    });

    localStorage.setItem("posts", JSON.stringify(posts));
});

document.getElementById("post-form").addEventListener("submit", (e) => {
    let postTitle = document.getElementById("post-title").value;
    let postContent = document.getElementById("post-content").value;

    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";

    if (postTitle.trim() === "") {
        postTitle = "Untitled Post";
    }

    let post = new Post(user, new Date(), postTitle, postContent);
    let postElement = getPostElement(post);
    let deleteButton = postElement.querySelector(":scope > .card-footer > .btn-delete");
    if (post.user == user) {
        deleteButton.removeAttribute("hidden");
    }

    document.getElementById("posts").appendChild(postElement);
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
});

function tryDelete(e) {
    let postElement = e.parentElement.parentElement;
    posts.forEach((post) => {
        if (post.id == postElement.id) {
            postElement.parentElement.removeChild(postElement);
        }
    });
    posts = posts.filter((post) => post.id != postElement.id);
    localStorage.setItem("posts", JSON.stringify(posts));
}

function logout(e) {
    localStorage.removeItem("current_user");
    window.location.reload(true);
}

function getPostHtml(post) {
    let date = new Date(post.datetime);
    return `
        <div class="post card" id="${post.id}">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text author ms-auto">posted by: ${post.user}</p>
            </div>
            <div class="card-body">
                <p class="card-text">
                ${post.content}
                </p>
            </div>
            <div class="card-footer d-flex flex-grow-1 justify-content-between align-items-center">
                <input type="button" value="Delete" class="btn btn-danger btn-delete" onclick="tryDelete(this)" hidden>
                <p class="card-text date ms-auto">posted at: ${date.toLocaleString()}</p>
            </div>
        </div>`.trim();
}

function getPostElement(post) {
    let temp = document.createElement("div");
    temp.innerHTML = getPostHtml(post);
    return temp.firstElementChild;
}

function resetLocalStorage(usersToo=false) {
    if (usersToo) {
        localStorage.clear();
        return;
    }
    localStorage.removeItem("last_post_id");
    localStorage.removeItem("posts");
    window.location.reload(true);
}