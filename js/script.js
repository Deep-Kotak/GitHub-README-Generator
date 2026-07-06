const generateBtn = document.getElementById("generateBtn");
const usernameInput = document.getElementById("username");
const profile = document.getElementById("profile");
const readmeOutput = document.getElementById("readmeOutput");

generateBtn.addEventListener("click", async function() {

    const username = usernameInput.value.trim();

    if (username === "") {
        alert("Please enter a GitHub username");
        return;
    }

    profile.innerHTML = "<p>Loading...</p>";
    readmeOutput.value = "";

    try {

        const response = await fetch(`https://api.github.com/users/${username}`);

        const data = await response.json();

        if (data.message === "Not Found") {

            profile.innerHTML = "<h3>❌ User Not Found</h3>";
            readmeOutput.value = "";

            return;
        }

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

        const readme = `# Hi 👋 I'm ${data.name || data.login}

## 🚀 About Me

- 💻 GitHub Username: ${data.login}
- 🌱 ${data.bio || "Passionate Developer"}
- 📦 Public Repositories: ${data.public_repos}
- 👥 Followers: ${data.followers}
- ➡️ Following: ${data.following}

## 🌐 GitHub Profile

${data.html_url}

---
⭐ Generated using GitHub README Generator
`;

        readmeOutput.value = readme;

    } catch (error) {

        profile.innerHTML = "<h3>❌ Something went wrong!</h3>";
        readmeOutput.value = "";

        console.error(error);
    }

});