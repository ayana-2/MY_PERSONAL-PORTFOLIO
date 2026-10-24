
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Mobile Navigation
menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close menu when clicking a link
const links = navLinks.querySelectorAll("a");

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");
    });
}

// Letter animation for hero heading
const heroTitle = document.querySelector(".hero h1");

if (heroTitle) {
    const walker = document.createTreeWalker(
        heroTitle,
        NodeFilter.SHOW_TEXT
    );

    const textNodes = [];

    while (walker.nextNode()) {
        if (walker.currentNode.textContent.trim() !== "") {
            textNodes.push(walker.currentNode);
        }
    }

    let letterIndex = 0;

    for (let i = 0; i < textNodes.length; i++) {
        const textNode = textNodes[i];
        const fragment = document.createDocumentFragment();
        const text = textNode.textContent;

        for (let j = 0; j < text.length; j++) {
            const letter = document.createElement("span");
            letter.className = "letter";
            letter.textContent = text[j];

            letter.style.animationDelay =
                (letterIndex * 0.025) + "s";

            fragment.appendChild(letter);
            letterIndex++;
        }

        textNode.parentNode.replaceChild(fragment, textNode);
    }
}

// Reveal animation when scrolling
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(function (entries) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            entries[i].target.classList.add("show");
            observer.unobserve(entries[i].target);
        }
    }
}, {
    threshold: 0.12
});

for (let i = 0; i < revealElements.length; i++) {
    observer.observe(revealElements[i]);
}

// Stagger skill and project cards
const animatedCards = document.querySelectorAll(
    ".skill-card, .project-card, .info-card"
);

for (let i = 0; i < animatedCards.length; i++) {
    animatedCards[i].style.setProperty(
        "--card-delay",
        (i % 6) * 90 + "ms"
    );
}

// Automatic footer year
document.getElementById("year").textContent =
    new Date().getFullYear();
