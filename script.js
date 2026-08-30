/* =========================================
   COUNTDOWN
========================================= */

// Trip starts September 5, 2026 at 10:00 AM
const tripDate = new Date("September 5, 2026 10:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = tripDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60))
        / 1000
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   BUDGET CALCULATOR
========================================= */

const expenses =
    document.querySelectorAll(".expense");

const total =
    document.getElementById("total");


function calculateBudget() {

    let sum = 0;


    expenses.forEach(input => {

        const value =
            parseFloat(input.value) || 0;

        sum += value;

    });


    total.textContent =
        sum.toLocaleString("en-PH");
}


expenses.forEach(input => {

    input.addEventListener(
        "input",
        calculateBudget
    );

});


/* =========================================
   SAVE PACKING CHECKLIST
========================================= */

const checkboxes =
    document.querySelectorAll(
        '.check-item input[type="checkbox"]'
    );


checkboxes.forEach((checkbox, index) => {

    const saved =
        localStorage.getItem(
            `packing-${index}`
        );

    if (saved === "true") {
        checkbox.checked = true;
    }


    checkbox.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                `packing-${index}`,
                checkbox.checked
            );

        }
    );

});


/* =========================================
   SCROLL ANIMATION
========================================= */

const cards =
    document.querySelectorAll(
        ".timeline-card, .tour-feature, .gallery-item"
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


cards.forEach(card => {

    card.classList.add("animate");

    observer.observe(card);

});
