document.addEventListener("DOMContentLoaded", () => {
    const collapsibles = document.querySelectorAll(".collapsible");
    collapsibles.forEach((element) => {
        element.addEventListener("click", function () {
            this.classList.toggle("expanded");
        });
    });


    const sliderContainers = document.querySelectorAll(".slider-container");

    sliderContainers.forEach((container) => {
        const slides = container.querySelectorAll(".slide");
        const slideControls = container.querySelector(".slideControls");
        let currentIndex = 0;
        const slider = container.querySelector(".slider");

        function updateSlider() {
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.style.left = "0%";
                } else {
                    slide.style.left = "100%";
                }
            });

            slideControls
                .querySelectorAll(".slide-control")
                .forEach((control, index) => {
                    control.classList.toggle("active", index === currentIndex);
                });
        }

        slider.addEventListener("click", () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        });

        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) {
                if (currentIndex < slides.length - 1) {
                    currentIndex++;
                }
            } else if (touchEndX > touchStartX + 50) {
                if (currentIndex > 0) {
                    currentIndex--;
                }
            }
            updateSlider();
        });

        slides.forEach((_, index) => {
            const control = document.createElement("div");
            control.className = "slide-control";
            control.addEventListener("click", () => {
                currentIndex = index;
                updateSlider();
            });
            slideControls.appendChild(control);
        });

        updateSlider();
    });
});