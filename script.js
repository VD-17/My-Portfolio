// Nav menu toggle 
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

if (menu) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("active")
    });
}

const navLinks = document.querySelectorAll("#nav a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (nav.classList.contains("active")) {
            nav.classList.remove("active");
        }
    });
});

// Project
function initializeProjects() {
    const projectContainer = document.querySelector(".project-container");

    let projectListHTML = '<div class="project-list">';
    pCategory.forEach((project, index) => {
        const activeClass = index === 0 ? "active" : "";
        projectListHTML += `
            <div class="project-item ${activeClass}" data-index="${index}">
                <div class="pro-item">
                    <div class="project-logo"><i class='${project.icon}'></i></div>
                    <div class="pro-name">
                        <h3>${project.project}</h3>
                        <p>${project.tag}</p>
                    </div>
                </div>
                <div class="pro-arrow"><i class='bx bx-arrow-right'></i></div>
            </div>
        `;
    });
    projectListHTML += '</div>'

    const firstProject = pCategory[0];
    const techStackHTML = firstProject.tech.map(tech => `<span class="tech">${tech}</span>`).join('');

    const viewProiectButton = firstProject.link ? `<a href="${firstProject.link}" target="_blank"><i class='bx  bx-arrow-out-up-right-square'></i> View Project</a>` : '';

    const projectDetailHTML = `
    <div class="project-detail-wrapper">
        <div class="project-detail-container">
            <div class="diorama-layer-1"></div>
            <div class="diorama-layer-2"></div>

            <div class="project-detail">
                <div class="pro-image"><img src="${firstProject.image}" alt=""></div>
                <div class="pro-tag">${firstProject.tag}</div>
                <div class="detail">
                    <h3>${firstProject.project}</h3>
                    <p>${firstProject.description}</p>
                    <div class="tech-stack">
                        ${techStackHTML}
                    </div>
                </div>
                <div class="pro-actions">
                    ${viewProiectButton}
                    <a href="${firstProject.gitlink}" target="_blank"><i class='bx  bx-folder-code'></i> Source</a>
                </div>
            </div>
        </div>
    </div>
    `;

    projectContainer.innerHTML = projectListHTML + projectDetailHTML;

    const ProjectItems = document.querySelectorAll(".project-item");
    ProjectItems.forEach((item) => {
        item.addEventListener("click", () => {
            const index = parseInt(item.getAttribute("data-index"));

            ProjectItems.forEach((i) => i.classList.remove("active"));

            item.classList.add("active");

            updateProjectDeatil(index);

            moveDetailWrapperOnMobile(item);
        });
    });
}

function updateProjectDeatil(index) {
    const project = pCategory[index];
    const projectDetail = document.querySelector(".project-detail");

    const image = document.querySelector(".pro-image img");
    image.src = project.image;

    const tag = document.querySelector(".pro-tag");
    tag.textContent = project.tag;

    const title = document.querySelector(".detail h3");
    title.textContent = project.project;

    const description = document.querySelector(".detail p");
    description.textContent = project.description;

    const techStack = document.querySelector(".tech-stack");
    techStack.innerHTML = project.tech.map(tech =>
        `<span class="tech">${tech}</span>`
    ).join('');

    // const actionLinks = document.querySelectorAll('.pro-actions a');

    const proActions = document.querySelector(".pro-actions");

    const viewProjectButton = project.link 
        ? `<a href="${project.link}" target="_blank"><i class='bx bx-arrow-out-up-right-square'></i> View Project</a>` 
        : '';

    const sourceButton = project.gitlink 
        ? `<a href="${project.gitlink}" target="_blank"><i class='bx bx-folder-code'></i> Source</a>`
        : '';

    proActions.innerHTML = `
        ${viewProjectButton}
        ${sourceButton}
    `;

    // if (actionLinks[0]) actionLinks[0].href = project.link;
    // if (actionLinks[1]) actionLinks[1].href = project.gitlink;
}

function moveDetailWrapperOnMobile(clickedItem) {
    if (window.innerWidth < 1025) {
        const detailWrapper = document.querySelector(".project-detail-wrapper");
        const projectList = document.querySelector(".project-list");

        detailWrapper.remove();

        clickedItem.insertAdjacentElement('afterend', detailWrapper);
    } else {
        const detailWrapper = document.querySelector(".project-detail-wrapper");
        const projectContainer = document.querySelector(".project-container");

        if (detailWrapper.previousElementSibling) {
            detailWrapper.remove();
            projectContainer.appendChild(detailWrapper);
        }
    }
}

window.addEventListener('resize', () => {
    const activeItem = document.querySelector(".project-item.active");
    if (activeItem) {
        moveDetailWrapperOnMobile(activeItem);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    initializeProjects();
});