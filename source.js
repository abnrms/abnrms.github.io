function loadHeader() {
    let header = document.getElementById("header")
    header.innerHTML = `
    <h1 id="page-title">Hamlet Taraz | <span class="highlight">Software Developer</span></h1>
    <div id="navbar">
        <a class="navbar__button" href="index.html">Home</a>
        <a class="navbar__button" href="about.html">About</a>
        <a class="navbar__button" href="projects.html">Projects</a>
    </div>
    `
}

function loadFooter() {
    let footer = document.getElementById("footer")
    footer.innerHTML = `
    <div id="footer-top">
        <div id="footer-nav">
            <a class="footer-nav__button" href="index.html">Home</a>
            <a class="footer-nav__button" href="about.html">About</a>
            <a class="footer-nav__button" href="projects.html">Projects</a>
        </div>
        <div id="footer-links">
            <a class="footer-link__link svg-stroke" id="footer-link-email" href="mailto:hamlettaraz@gmail.com" target="_blank" rel="noopener noreferrer">
                <svg class="footer-link__icon">
                    <g transform="translate(-4, -3), scale(2.4)">
                        <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                            stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                        <rect x="3" y="5" width="18" height="14" rx="2" stroke-width="2.4" stroke-linecap="round">
                        </rect>
                    </g>
                </svg>
            </a>
            <a class="footer-link__link svg-fill" id="footer-link-github" href="https://github.com/abnrms" target="_blank" rel="noopener noreferrer">
                <svg class="footer-link__icon">
                    <path transform="scale(3.125)"
                        d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
                </svg>
            </a>
            <a class="footer-link__link svg-fill" id="footer-link-linkedin" href="https://www.linkedin.com/in/hamlet-taraz/" target="_blank" rel="noopener noreferrer">
                <svg class="footer-link__icon">
                    <path transform="scale(2.2), translate(-122.5, -7317.5)"
                        d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z">
                    </path>
                </svg>
            </a>
        </div>
    </div>
    <div id="footer-copyright">
        &copy; Hamlet Taraz 2026
    </div>
    `
}

var projects = [
    {
        title: "2D Block Game",
        language: "C (SDL)",
        thumbnail_path: "projects/thumbnails/block_game.jpg",
        href: "projects/block_game.html",
        tags: [
            "C",
            "Simple DirectMedia Layer (SDL)",
            "Raspberry Pi"
        ],
        description: "A simple game where blocks rise and placed across a grid to gain points. Includes a daily-resetting local leaderboard, a dynamic menu, and can be controlled through USB Joystick input. Was originally deployed on a Raspberry Pi."
    },
    {
        title: "C to MIPS Compiler",
        language: "C",
        thumbnail_path: "projects/thumbnails/compiler.jpg",
        href: "projects/compiler.html",
        tags: [
            "C",
            "MIPS Assembly",
            "Compiler",
            "Unix",
            "Vim"
        ],
        description: "A compiler written in C which translates a subset of C programs into a functional MIPS assembly equivalent. Supports conditional statements, loops, and function calls. Coded entirely in the Unix CLI using Vim." // Considers the main steps of compilation, including lexical and semantic analysis, abstract syntax trees, and three-address code.
    },
    {
        title: "Data Visualizations",
        language: "HTML, CSS, JS (D3.js)",
        thumbnail_path: "projects/thumbnails/data_vis.jpg",
        href: "projects/data_vis.html",
        tags: [
            "HTML",
            "CSS",
            "JavaScript",
            "D3.js",
            "Data Visualization"
        ],
        description: "A suite of Data Visualizations with varying levels of complexity. Covers topics such as volumetric rendering, parallel coordinates, and scatterplots, all with dynamic interaction."
    },
    {
        title: "UNO Card Game",
        language: "Java (Swing)",
        thumbnail_path: "projects/thumbnails/uno_game.jpg",
        href: "projects/uno_game.html",
        tags: [
            "Java",
            "Swing",
            "Object-Oriented Programming",
            "Collaborative"
        ],
        description: "GUI-based 2-4 player card game replicating the functionality of UNO. Focused on object-oriented principles and patterns. Created in a team of 4."
    }
]

/*
    <div class="project-wrapper">
        <a class="project-card" href="[href]">
            <img class="project-thumbnail" src="[path]" />
            <div class="project-overlay">
                <h2 class="project-title">[title]</h2>
                <h3 class="project-language">[language]</h3>
            </div>
        </a>
        <p class="project-description">[description]</p>
        <div class="project-tag-list">
            <div class="project-tag">[tag]</div>
            ...
        </div>
    </div>
*/

function loadProjects() {
    let project_list = document.getElementById("project-list")
    for (project of projects) {
        let wrapper = document.createElement("a")
        wrapper.classList.add("project-wrapper")
        // wrapper.href = project.href
        project_list.appendChild(wrapper)

        let card = document.createElement("div")
        card.classList.add("project-card")
        wrapper.appendChild(card)

        let thumbnail = document.createElement("img")
        thumbnail.classList.add("project-thumbnail")
        thumbnail.src = project.thumbnail_path
        thumbnail.alt = "Project Thumbnail"
        card.appendChild(thumbnail)

        let overlay = document.createElement("div")
        overlay.classList.add("project-overlay")
        card.appendChild(overlay)

        let title = document.createElement("h2")
        title.classList.add("project-title")
        title.innerText = project.title
        overlay.appendChild(title)

        let language = document.createElement("h3")
        language.classList.add("project-language")
        language.innerText = project.language
        overlay.appendChild(language)

        let description = document.createElement("p")
        description.classList.add("project-description")
        description.innerText = project.description
        wrapper.append(description)

        let tag_list = document.createElement("div")
        tag_list.classList.add("project-tag-list")
        wrapper.append(tag_list)

        for (tag_text of project.tags) {
            let tag = document.createElement("div")
            tag.classList.add("project-tag")
            tag.innerText = tag_text
            tag_list.appendChild(tag)
        }
    }
}