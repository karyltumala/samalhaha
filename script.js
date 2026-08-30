/* =====================================================
   SAMAL ESCAPE WEBSITE
===================================================== */


/* =====================================================
   COUNTDOWN
===================================================== */

const tripDate =
    new Date(
        "September 5, 2026 10:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();


    const difference =
        tripDate - now;


    if (difference <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            )
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            )
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            )
            /
            1000
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);



/* =====================================================
   BUDGET CALCULATOR
===================================================== */

const expenses =
    document.querySelectorAll(
        ".expense"
    );


const total =
    document.getElementById(
        "total"
    );


function calculateBudget() {

    let sum = 0;


    expenses.forEach(
        input => {

            sum +=
                parseFloat(
                    input.value
                ) || 0;

        }
    );


    total.textContent =
        sum.toLocaleString(
            "en-PH"
        );

}


expenses.forEach(
    input => {

        input.addEventListener(
            "input",
            calculateBudget
        );

    }
);



/* =====================================================
   SAVE BUDGET TO BROWSER
===================================================== */

expenses.forEach(
    (input, index) => {

        const saved =
            localStorage.getItem(
                `samal-expense-${index}`
            );


        if (saved !== null) {

            input.value = saved;

        }


        input.addEventListener(
            "input",
            () => {

                localStorage.setItem(
                    `samal-expense-${index}`,
                    input.value
                );


            }
        );

    }
);


calculateBudget();



/* =====================================================
   PACKING CHECKLIST
===================================================== */

const checkboxes =
    document.querySelectorAll(
        '.check-item input[type="checkbox"]'
    );


checkboxes.forEach(
    (checkbox, index) => {

        const saved =
            localStorage.getItem(
                `samal-packing-${index}`
            );


        if (saved === "true") {

            checkbox.checked = true;

        }


        checkbox.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    `samal-packing-${index}`,
                    checkbox.checked
                );

            }
        );

    }
);



/* =====================================================
   SCROLL ANIMATIONS
===================================================== */

const animatedElements =
    document.querySelectorAll(
        `
        .timeline-card,
        .tour-activity,
        .inspo-card,
        .inspo-tip,
        .budget-box,
        .check-item
        `
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(
    element => {

        element.classList.add(
            "animate"
        );


        observer.observe(
            element
        );

    }
);



/* =====================================================
   FULLSCREEN PHOTO VIEWER
===================================================== */

const clickableImages =
    document.querySelectorAll(
        ".clickable-image"
    );


clickableImages.forEach(
    image => {

        image.addEventListener(
            "click",
            () => {

                openImageViewer(
                    image.src,
                    image.alt
                );

            }
        );

    }
);



function openImageViewer(
    imageSource,
    imageAlt
) {

    const viewer =
        document.createElement(
            "div"
        );


    viewer.className =
        "image-viewer";


    viewer.innerHTML = `

        <button
            class="viewer-close"
            aria-label="Close image"
        >
            ×
        </button>

        <img
            src="${imageSource}"
            alt="${imageAlt}"
        >

    `;


    document.body.appendChild(
        viewer
    );


    /* CLOSE BUTTON */

    viewer
        .querySelector(
            ".viewer-close"
        )
        .addEventListener(
            "click",
            () => {

                viewer.remove();

            }
        );


    /* CLICK OUTSIDE PHOTO */

    viewer.addEventListener(
        "click",
        event => {

            if (
                event.target === viewer
            ) {

                viewer.remove();

            }

        }
    );


    /* ESC KEY */

    function closeWithEscape(
        event
    ) {

        if (
            event.key === "Escape"
        ) {

            viewer.remove();

            document.removeEventListener(
                "keydown",
                closeWithEscape
            );

        }

    }


    document.addEventListener(
        "keydown",
        closeWithEscape
    );

}
