// =====================================
// GitHub README Generator
// script.js - Part 1
// =====================================

// Buttons
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");

// Inputs
const usernameInput = document.getElementById("username");
const template = document.getElementById("template");
const themeSelect = document.getElementById("themeSelect");

// Output
const profile = document.getElementById("profile");
const readmeOutput = document.getElementById("readmeOutput");
const livePreview = document.getElementById("livePreview");
const message = document.getElementById("message");

// ================================
// Load Saved Theme
// ================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {

    themeSelect.value = savedTheme;

}

// ================================
// Generate Button
// ================================

generateBtn.addEventListener("click", async function() {

    const username = usernameInput.value.trim();

    if (username === "") {

        alert("Please enter GitHub Username");

        return;

    }

    localStorage.setItem(
        "theme",
        themeSelect.value
    );

    profile.innerHTML = "<h3>Loading...</h3>";

    readmeOutput.value = "";

    livePreview.innerHTML = `

<h1>Hi 👋 I'm ${data.name || data.login}</h1>

<h3>${title}</h3>

<p>${data.bio || ""}</p>

<hr>

<h2>💻 Tech Stack</h2>

<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white">

<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white">

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white">

<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white">

<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask">

<hr>

<h2>📊 GitHub Stats</h2>

<img
src="https://github-readme-stats.vercel.app/api?username=${data.login}&show_icons=true&theme=${themeSelect.value}"
width="100%">

<hr>

<h2>💻 Top Languages</h2>

<img
src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.login}&layout=compact&theme=${themeSelect.value}"
width="100%">

<hr>

<h2>🌐 Connect</h2>

<a href="${data.html_url}" target="_blank">

${data.html_url}

</a>

<hr>

<img
src="https://komarev.com/ghpvc/?username=${data.login}&style=for-the-badge">

`;
    try {

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        const data = await response.json();

        if (data.message === "Not Found") {

            profile.innerHTML =
                "<h2>❌ GitHub User Not Found</h2>";

            return;

        }

        // ===========================
        // Profile Card
        // ===========================

        profile.innerHTML = `

        <img
            src="${data.avatar_url}"
            width="120">

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
        // README Template
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

## 🚀 About Me

${data.bio || "Passionate Developer"}

- 🔭 GitHub Username: ${data.login}
- 📦 Public Repositories: ${data.public_repos}
- 👥 Followers: ${data.followers}
- ➡️ Following: ${data.following}

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

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${data.login}&show_icons=true&theme=${themeSelect.value})

---

# 💻 Most Used Languages

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${data.login}&layout=compact&theme=${themeSelect.value})

---

# 🌐 Connect With Me

GitHub:
${data.html_url}

---

![](https://komarev.com/ghpvc/?username=${data.login}&style=for-the-badge)

---

⭐ If you like my work, please give a ⭐ to my repositories.

Made with ❤️ using GitHub README Generator.
`;

        // Show README
        readmeOutput.value = readme;

        // ===========================
        // Live Preview
        // ===========================

        livePreview.innerHTML = `

            <img
                src="${data.avatar_url}"
                width="120">

            <h2>${data.name || data.login}</h2>

            <h3>${title}</h3>

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
        // ===========================
        // Success Message
        // ===========================

        message.textContent = "✅ README Generated Successfully!";

        setTimeout(function() {

            message.textContent = "";

        }, 3000);

    }

    // ===========================
    // Error Handling
    // ===========================
    catch (error) {

        console.error(error);

        profile.innerHTML = `
            <h2>❌ Something Went Wrong</h2>
            <p>Please check your internet connection or try again later.</p>
        `;

        readmeOutput.value = "";

        livePreview.innerHTML = "";

    }

});

// =====================================
// Copy README
// =====================================

copyBtn.addEventListener("click", function() {

    if (readmeOutput.value === "") {

        alert("Please generate a README first.");

        return;

    }

    navigator.clipboard.writeText(readmeOutput.value);

    message.textContent = "📋 README Copied Successfully!";

    setTimeout(function() {

        message.textContent = "";

    }, 2000);

});

// =====================================
// Download README
// =====================================

downloadBtn.addEventListener("click", function() {

    if (readmeOutput.value === "") {

        alert("Please generate a README first.");

        return;

    }

    const blob = new Blob(
        [readmeOutput.value], {
            type: "text/markdown"
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "README.md";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    message.textContent = "⬇ README Downloaded Successfully!";

    setTimeout(function() {

        message.textContent = "";

    }, 2000);

});
// =====================================
// Reset Button
// =====================================

resetBtn.addEventListener("click", function() {

    usernameInput.value = "";

    template.selectedIndex = 0;

    themeSelect.selectedIndex = 0;

    profile.innerHTML = `
        <p>
            Enter GitHub username and click Generate.
        </p>
    `;

    readmeOutput.value = "";

    livePreview.innerHTML = `
        README Preview will appear here...
    `;

    message.textContent = "";

    localStorage.removeItem("theme");

});

// =====================================
// Enter Key Support
// =====================================

usernameInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        generateBtn.click();

    }

});

// =====================================
// Theme Change
// =====================================

themeSelect.addEventListener("change", function() {

    localStorage.setItem(
        "theme",
        themeSelect.value
    );

});

// =====================================
// Auto Focus
// =====================================

window.addEventListener("load", function() {

    usernameInput.focus();

});

// =====================================
// End of File
// =====================================