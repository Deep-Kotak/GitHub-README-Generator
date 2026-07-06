// ================================
// GitHub README Generator
// Part 1
// ================================

// Buttons
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const themeBtn =
    document.getElementById("themeBtn");

const resetBtn =
    document.getElementById("resetBtn");

const message =
    document.getElementById("message");

// Inputs
const usernameInput = document.getElementById("username");
const template = document.getElementById("template");

// Output Areas
const profile = document.getElementById("profile");
const readmeOutput = document.getElementById("readmeOutput");
const livePreview = document.getElementById("livePreview");

// ================================
// Generate README
// ================================

generateBtn.addEventListener("click", async function() {

    const username = usernameInput.value.trim();

    if (username === "") {

        alert("Please enter GitHub Username");

        return;

    }

    profile.innerHTML = "<h3>Loading...</h3>";

    readmeOutput.value = "";

    livePreview.innerHTML = "";

    try {

        const response =
            await fetch(`https://api.github.com/users/${username}`);

        const data = await response.json();

        if (data.message === "Not Found") {

            profile.innerHTML =
                "<h3>❌ GitHub User Not Found</h3>";

            return;
        }

        // ===========================
        // Profile Card
        // ===========================

        profile.innerHTML = `

        <img
            src="${data.avatar_url}"
            width="120"
            style="border-radius:50%;margin-bottom:15px;">

        <h2>${data.name || data.login}</h2>

        <p>${data.bio || "No Bio Available"}</p>

        <hr>

        <p><strong>Repositories :</strong> ${data.public_repos}</p>

        <p><strong>Followers :</strong> ${data.followers}</p>

        <p><strong>Following :</strong> ${data.following}</p>

        <p>

            <a
                href="${data.html_url}"
                target="_blank">

                Visit GitHub Profile

            </a>

        </p>

        `;

        // ===========================
        // Template Selection
        // ===========================

        let title = "";

        if (template.value === "developer") {

            title = "💻 Full Stack Developer";

        } else if (template.value === "student") {

            title = "🎓 Computer Science Student";

        } else {

            title = "🚀 Full Stack Engineer";

        }
        // ===========================
        // Generate README
        // ===========================

        const readme = `# Hi 👋 I'm ${data.name || data.login}

${title}

---

# 💻 Tech Stack

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![HTML5](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)

![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask)

---

# 📊 GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${data.login}&show_icons=true&theme=github_dark)

---

# 💻 Most Used Languages

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${data.login}&layout=compact&theme=github_dark)

---

# 🌐 Connect With Me

GitHub:
${data.html_url}

---

![](https://komarev.com/ghpvc/?username=${data.login}&style=for-the-badge)

⭐ Generated using GitHub README Generator
`;

        // Show generated README
        readmeOutput.value = readme;

        // ===========================
        // Live Preview
        // ===========================

        livePreview.innerHTML = `

            <h1>Hi 👋 I'm ${data.name || data.login}</h1>

            <h3>${title}</h3>

            <img
                src="${data.avatar_url}"
                width="120"
                style="border-radius:50%;margin:15px 0;">

            <p>${data.bio || "No Bio Available"}</p>

            <hr>

            <p><strong>Repositories:</strong> ${data.public_repos}</p>

            <p><strong>Followers:</strong> ${data.followers}</p>

            <p><strong>Following:</strong> ${data.following}</p>

            <p>

                <a
                    href="${data.html_url}"
                    target="_blank">

                    Visit GitHub Profile

                </a>

            </p>

        `;

    } catch (error) {

        profile.innerHTML =
            "<h2>❌ Something Went Wrong!</h2>";

        console.log(error);

    }

});
// ================================
// Copy README
// ================================

copyBtn.addEventListener("click", function() {

    if (readmeOutput.value === "") {

        alert("Generate README First!");

        return;
    }

    navigator.clipboard.writeText(readmeOutput.value);

    message.textContent =
        "✅ README Copied Successfully!";

    setTimeout(function() {

        message.textContent = "";

    }, 2000);

});

// ================================
// Download README
// ================================

downloadBtn.addEventListener("click", function() {

    if (readmeOutput.value === "") {

        alert("Generate README First!");

        return;
    }

    const blob = new Blob(
        [readmeOutput.value], { type: "text/markdown" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "README.md";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

});

// ================================
// Press Enter to Generate README
// ================================

usernameInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        generateBtn.click();

    }

});

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent =
            "☀ Light Mode";

    } else {

        themeBtn.textContent =
            "🌙 Dark Mode";

    }

});