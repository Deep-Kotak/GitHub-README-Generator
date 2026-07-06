const generateBtn =
    document.getElementById("generateBtn");

const usernameInput =
    document.getElementById("username");

const profile =
    document.getElementById("profile");

generateBtn.addEventListener("click", async function() {

    const username =
        usernameInput.value.trim();

    if (username === "") {

        alert("Please enter GitHub username");

        return;

    }

    try {

        const response =
            await fetch(
                `https://api.github.com/users/${username}`
            );

        const data =
            await response.json();

        if (data.message === "Not Found") {

            profile.innerHTML =
                "<h3>User Not Found</h3>";

            return;

        }

        profile.innerHTML = `

            <img
                src="${data.avatar_url}"
                width="120"
                style="border-radius:50%;margin-bottom:15px;">

            <h2>${data.name ?? "No Name"}</h2>

            <p>${data.bio ?? "No Bio Available"}</p>

            <hr>

            <p><b>Followers:</b> ${data.followers}</p>

            <p><b>Following:</b> ${data.following}</p>

            <p><b>Repositories:</b> ${data.public_repos}</p>

        `;

    } catch (error) {

        profile.innerHTML =
            "<h3>Something went wrong.</h3>";

    }

});