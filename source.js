function loadHeader() {
    let header = document.getElementById("header")
    header.innerHTML = `
    <a href="index.html" id="page-title-wrapper"><h1 id="page-title">Hamlet Taraz | <span class="hl">Software Developer</span></h1></a>
    <a href="index.html" id="page-title-short-wrapper"><h1 id="page-title-short">HamletTaraz<span class="hl">.dev</span></h1></a>
    <div id="navbar" class="hide-mobile">
        <a class="navbar__button" href="index.html">Home</a>
        <a class="navbar__button" href="about.html">About</a>
        <a class="navbar__button" href="projects.html">Projects</a>
    </div>
    <a id="hamburger-menu" class="hide-desktop svg-stroke" onclick="showHamburgerMenu()">
        <svg id="hamburger-icon">
            <path stroke-width="5px" stroke-linecap="round" d="M 10 10 L 40 10 M 10 25 L 40 25 M 10 40 L 40 40">
        </svg>
    </a>
    <div id="hamburger-wrapper">
        <div id="hamburger-background" onclick="hideHamburgerMenu()"></div>
        <div id="hamburger-nav">
            <a class="hamburger-nav__button" href="index.html">Home</a>
            <a class="hamburger-nav__button" href="about.html">About</a>
            <a class="hamburger-nav__button" href="projects.html">Projects</a>
        </div>
    </div>
    `
}

function showHamburgerMenu() {
    let hamburger_overlay = document.getElementById("hamburger-wrapper")
    hamburger_overlay.style["display"] = "block"
}

function hideHamburgerMenu() {
    let hamburger_overlay = document.getElementById("hamburger-wrapper")
    hamburger_overlay.style["display"] = "none"
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
            "Raspberry Pi",
            "GitHub"
        ],
        description: "A simple game where blocks rise and are placed across a grid to gain points. Includes a daily-resetting local leaderboard, a dynamic menu, and can be controlled through USB Joystick input. Was originally deployed on a Raspberry Pi."
    },
    {
        title: "Cloud Mics Website",
        language: "Shopify",
        thumbnail_path: "projects/thumbnails/cloud_site.jpg",
        href: "projects/cloud_site.html",
        tags: [
            "Shopify",
            "Liquid",
            "HTML",
            "CSS",
            "JavaScript",
            "Collaborative",
            "E-Commerce"
        ],
        description: "A website developed through Shopify in a team of 3. Provides an e-commerce marketplace for different audio products. Required editing code directly to surpass editor capabilities."
    },
    {
        title: "Data Visualizations",
        language: "JS (D3.js), HTML, CSS",
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
        title: "C to MIPS Compiler",
        language: "C",
        thumbnail_path: "projects/thumbnails/compiler.jpg",
        href: "projects/compiler.html",
        tags: [
            "C",
            "MIPS Assembly",
            "UNIX/Linux",
            "Vim",
            "Compilation"
        ],
        description: "A compiler written in C which translates a subset of C programs into a functional MIPS assembly equivalent. Supports conditional statements, loops, and function calls. Coded entirely in the Unix CLI using Vim." // Considers the main steps of compilation, including lexical and semantic analysis, abstract syntax trees, and three-address code.
    },
    {
        title: "UNO Card Game",
        language: "Java (Swing)",
        thumbnail_path: "projects/thumbnails/uno_game.jpg",
        href: "projects/uno_game.html",
        tags: [
            "Java",
            "Swing",
            "UML",
            "JUnit",
            "GitHub",
            "Object-Oriented Design"
        ],
        description: "GUI-based 2-4 player card game replicating the functionality of UNO. Focused on object-oriented principles and patterns. Created in a team of 4."
    },
]

/*
    <div class="project-wrapper">
        <a class="project-content">
            <div class="project-card" href="[href]">
                <img class="project-thumbnail" src="[path]" />
                <div class="project-overlay">
                    <h2 class="project-title">[title]</h2>
                    <h3 class="project-language">[language]</h3>
                </div>
            </div>
            <p class="project-description">[description]</p>
            <div class="project-tag-list">
                <div class="project-tag">[tag]</div>
                ...
            </div>
        </a>
    </div>
*/

function loadProjects() {
    let project_list = document.getElementById("project-list")
    for (project of projects) {
        let wrapper = document.createElement("div")
        wrapper.classList.add("project-wrapper")
        project_list.appendChild(wrapper)
        
        let content = document.createElement("a")
        content.classList.add("project-content")
        content.href = project.href
        wrapper.appendChild(content)

        let card = document.createElement("div")
        card.classList.add("project-card")
        content.appendChild(card)

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
        content.append(description)

        let tag_list = document.createElement("div")
        tag_list.classList.add("project-tag-list")
        content.append(tag_list)

        for (tag_text of project.tags) {
            let tag = document.createElement("div")
            tag.classList.add("project-tag")
            tag.innerText = tag_text
            tag_list.appendChild(tag)
        }
    }
}

var extra_info_state = 1

async function updateExtraInfo() {
    let profile_extra = document.getElementById("profile-extra")
    profile_extra.style["opacity"] = 0.0;
    await new Promise(r => setTimeout(r, 500));
    switch (extra_info_state) {
        case 0:
            profile_extra.innerText = "GPA: 3.95 / 4.0"
            extra_info_state++
            break
        case 1:
            profile_extra.innerText = "Bachelor's in CS"
            extra_info_state++
            break
        case 2:
            profile_extra.innerText = "University of Arizona"
            extra_info_state++
            break
        case 3:
            profile_extra.innerText = "Tucson, Arizona"
            extra_info_state++
            break
        default:
            profile_extra.innerText = "Undergraduate TA and RA"
            extra_info_state = 0
            break
    }
    profile_extra.style["opacity"] = 1.0;
}