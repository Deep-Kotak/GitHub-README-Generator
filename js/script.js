// =========================================
// GitHub README Generator
// script.js - Part 1
// =========================================

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

// =========================================
// Load Saved Theme
// =========================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    themeSelect.value = savedTheme;
}

// =====================================
// Copy README
// =====================================

copyBtn.addEventListener("click", () => {

    if (readmeOutput.value === "") {

        alert("Please generate README first.");

        return;

    }

    navigator.clipboard.writeText(readmeOutput.value);

    message.textContent = "📋 README Copied Successfully!";

    setTimeout(() => {

        message.textContent = "";

    }, 2000);

});

// =====================================
// Download README
// =====================================

downloadBtn.addEventListener("click", () => {

    if (readmeOutput.value === "") {

        alert("Please generate README first.");

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

    message.textContent = "⬇️ README Downloaded Successfully!";

    setTimeout(() => {

        message.textContent = "";

    }, 2000);

});

// =====================================
// Reset Button
// =====================================

resetBtn.addEventListener("click", () => {

    usernameInput.value = "";

    template.selectedIndex = 0;

    profile.innerHTML = `<p>Enter GitHub username and click Generate.</p>`;

    readmeOutput.value = "";

    livePreview.innerHTML = "README Preview will appear here...";

    message.textContent = "";

    usernameInput.focus();

});

// =====================================
// Theme Selection
// =====================================

themeSelect.addEventListener("change", () => {

    localStorage.setItem(
        "theme",
        themeSelect.value
    );

});

// =====================================
// Enter Key Support
// =====================================

usernameInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        generateBtn.click();

    }

});

// =====================================
// Auto Focus
// =====================================

window.addEventListener("load", () => {

    usernameInput.focus();

});

// =========================================
// Generate README
// =========================================

generateBtn.addEventListener("click", async function() {

    const username = usernameInput.value.trim();

    if (username === "") {

        alert("Please enter GitHub Username");

        return;

    }

    // Save Theme
    localStorage.setItem("theme", themeSelect.value);

    // Loading
    profile.innerHTML = "<h3>Loading...</h3>";

    readmeOutput.value = "";

    livePreview.innerHTML = "";

    message.textContent = "";

    try {

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        const data = await response.json();
        const repoResponse = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated`
        );

        const repos = await repoResponse.json();

        if (data.message === "Not Found") {

            profile.innerHTML =
                "<h2>❌ GitHub User Not Found</h2>";

            return;

        }

        // =====================================
        // Template
        // =====================================

        let title = "";

        switch (template.value) {

            case "developer":

                title = "💻 Full Stack Developer";

                break;

            case "student":

                title = "🎓 Computer Science Student";

                break;

            case "fullstack":

                title = "🚀 Full Stack Engineer";

                break;

            default:

                title = "💻 Developer";

        }

        // =====================================
        // Profile Card
        // =====================================

        profile.innerHTML = `

            <img
                src="${data.avatar_url}"
                width="120"
                style="border-radius:50%;">

            <h2>${data.name || data.login}</h2>

            <p>${data.bio || "No Bio Available"}</p>
            <hr>



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
        // =====================================
        // Generate README
        // =====================================

        // =====================================
        // Dynconst lanamic Tech Stack
        // =====================================

        // =====================================
        // Dynamic Tech Stack
        // =====================================

        const languages = [...new Set(
            repos
            .map(repo => repo.language)
            .filter(language => language)
        )];

        let techStack = "";

        languages.forEach(language => {

            switch (language) {

                case "JavaScript":
                    techStack += `![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)\n\n`;
                    break;

                case "Python":
                    techStack += `![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)\n\n`;
                    break;

                case "HTML":
                    techStack += `![HTML5](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)\n\n`;
                    break;

                case "CSS":
                    techStack += `![CSS3](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)\n\n`;
                    break;

                case "Java":
                    techStack += `![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)\n\n`;
                    break;

                case "TypeScript":
                    techStack += `![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)\n\n`;
                    break;

                default:
                    techStack += `- ${language}\n`;
            }

        });

        let projectsMarkdown = "";

        repos.slice(0, 5).forEach(repo => {

            projectsMarkdown += `

## ${repo.name}
<p class="repo-description">
    ${repo.description || "No description available."}
</p>

Language : ${repo.language || "N/A"}

⭐ Stars : ${repo.stargazers_count}

🍴 Forks : ${repo.forks_count}

🔗 ${repo.html_url}

---
`;

        });

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

${techStack}

---




# 🌐 Connect With Me

GitHub:
${data.html_url}

---

![](https://komarev.com/ghpvc/?username=${data.login}&style=for-the-badge)

---

⭐ If you like my work, please give a ⭐ to my repositories.

Made with ❤️ using GitHub README Generator.

---

# 📂 Featured Projects

${projectsMarkdown}
                `;
        let projectHTML = "";

        repos.slice(0, 5).forEach(repo => {

            projectHTML += `
<div class="repo-card">

    <h3>${repo.name}</h3>

    <p>${repo.description || "No description available."}</p>

    <p><strong>Language:</strong> ${repo.language || "N/A"}</p>

    <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>

    <a href="${repo.html_url}" target="_blank">
        View Repository
    </a>

</div>
`;

        });

        // Show README
        readmeOutput.value = readme;
        // =====================================
        // Live Preview
        // =====================================

        livePreview.innerHTML = `
                <h1>Hi👋 I'm ${data.name || data.login}</h1>
                <h3>${title}</h3>
                <p>${data.bio || "No Bio Available"}</p>
                <hr>
                <h2>📂 Featured Projects</h2>
                ${projectHTML}
                <hr>
                <h2>🌐 Connect With Me</h2>
                <p>
                    <a href="${data.html_url}" target="_blank">${data.html_url}</a>
                </p>
                <hr>
                <img src="https://komarev.com/ghpvc/?username=${data.login}&style=for-the-badge">
                `;

    } catch (error) {

        console.error(error);

        profile.innerHTML = "<h2>❌ Something went wrong. Please try again.</h2>";

        message.textContent = "";

    }

});

// =========================================
// End of File
// =========================================