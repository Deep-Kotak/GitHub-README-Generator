const generateBtn = document.getElementById("generateBtn");
const usernameInput = document.getElementById("username");
const profile = document.getElementById("profile");
const readmeOutput = document.getElementById("readmeOutput");

const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

// Generate README
generateBtn.addEventListener("click", async function() {

    const username = usernameInput.value.trim();

    if (username === "") {
        alert("Please enter a GitHub username.");
        return;
    }

    profile.innerHTML = "<p>Loading...</p>";
    readmeOutput.value = "";

    try {

        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        if (data.message === "Not Found") {

            profile.innerHTML = "<h3>❌ GitHub User Not Found</h3>";
            readmeOutput.value = "";

            return;
        }

        // Profile Card
        profile.innerHTML = `
            <img
                src="${data.avatar_url}"
                alt="Avatar"
                width="120"
                style="border-radius:50%; margin-bottom:15px;">

            <h2>${data.name || data.login}</h2>

            <p>${data.bio || "No bio available"}</p>

            <hr>

            <p><strong>Repositories:</strong> ${data.public_repos}</p>

            <p><strong>Followers:</strong> ${data.followers}</p>

            <p><strong>Following:</strong> ${data.following}</p>

            <p>
                <a href="${data.html_url}" target="_blank">
                    Visit GitHub Profile
                </a>
            </p>
        `;

        // README Generator
        const readme = `# Hi 👋 I'm ${data.name || data.login}

${data.bio || "Passionate Developer"}

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

        readmeOutput.value = readme;

    } catch (error) {

        profile.innerHTML = "<h3>❌ Something went wrong!</h3>";
        readmeOutput.value = "";

        console.error(error);

    }

});

// Copy Button
copyBtn.addEventListener("click", function() {

    if (readmeOutput.value === "") {

        alert("Generate README First!");
        return;

    }

    navigator.clipboard.writeText(readmeOutput.value);

    alert("README Copied Successfully!");

});

// Download Button
downloadBtn.addEventListener("click", function() {

    if (readmeOutput.value === "") {

        alert("Generate README First!");
        return;

    }

    const blob = new Blob(
        [readmeOutput.value], { type: "text/markdown" }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "README.md";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);

});