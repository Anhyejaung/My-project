document.addEventListener("DOMContentLoaded", function () {
    let lions = [];

    const introGrid = document.getElementById("introGrid");
    const detailList = document.getElementById("detailList");
    const memberCount = document.getElementById("memberCount");

    const formSection = document.getElementById("formSection");
    const toggleFormButton = document.getElementById("toggleFormButton");
    const deleteLastButton = document.getElementById("deleteLastButton");
    const cancelButton = document.getElementById("cancelButton");
    const lionForm = document.getElementById("lionForm");

    const nameInput = document.getElementById("nameInput");
    const partInput = document.getElementById("partInput");
    const techInput = document.getElementById("techInput");
    const summaryInput = document.getElementById("summaryInput");
    const introInput = document.getElementById("introInput");
    const emailInput = document.getElementById("emailInput");
    const phoneInput = document.getElementById("phoneInput");
    const websiteInput = document.getElementById("websiteInput");
    const messageInput = document.getElementById("messageInput");

    function initializeLionsFromHTML() {
        const introCards = document.querySelectorAll(".intro-card");
        const detailCards = document.querySelectorAll(".detail-card");

        introCards.forEach(function (introCard, index) {
            const detailCard = detailCards[index];

            const name = introCard.querySelector("h2").textContent.trim();
            const part = introCard.querySelector(".intro-card__part").textContent.trim();
            const summary = introCard.querySelector(".intro-card__summary").textContent.trim();
            const image = introCard.querySelector("img").getAttribute("src");
            const isMe = introCard.classList.contains("intro-card--highlight");

            let club = "LION TRACK";
            let intro = "";
            let techs = [];
            let email = "";
            let phone = "";
            let website = "";
            let message = "";

            if (detailCard) {
                club = detailCard.querySelector(".detail-card__club").textContent.trim();

                intro = detailCard.querySelector(".intro-section p").textContent.trim();

                const techItems = detailCard.querySelectorAll(".tech-section li");

                techItems.forEach(function (item) {
                    techs.push(item.textContent.trim());
                });

                const contactItems = detailCard.querySelectorAll(".contact-section li");

                contactItems.forEach(function (item) {
                    const text = item.textContent.trim();

                    if (text.startsWith("Email:")) {
                        email = text.replace("Email:", "").trim();
                    }

                    if (text.startsWith("Website:")) {
                        website = text.replace("Website:", "").trim();
                    }

                    if (text.startsWith("Phone:")) {
                        phone = text.replace("Phone:", "").trim();
                    }
                });

                message = detailCard.querySelector(".message-section p").textContent.trim();
            }

            lions.push({
                name: name,
                part: part,
                club: club,
                summary: summary,
                intro: intro,
                techs: techs,
                email: email,
                phone: phone,
                website: website,
                message: message,
                image: image,
                isMe: isMe
            });
        });
    }

    function renderLions() {
        introGrid.innerHTML = "";
        detailList.innerHTML = "";

        lions.forEach(function (lion, index) {
            const firstTech = lion.techs[0];

            const introCard = document.createElement("article");

            if (lion.isMe) {
                introCard.className = "intro-card intro-card--highlight";
            } else {
                introCard.className = "intro-card";
            }

            introCard.innerHTML = `
                <figure class="intro-card__media">
                    <img src="${lion.image}" alt="${lion.name} 프로필 이미지">
                    <figcaption class="intro-card__badge">${firstTech}</figcaption>
                </figure>

                <div class="intro-card__content">
                    <h2>${lion.name}</h2>
                    <p class="intro-card__part">${lion.part}</p>
                    <p class="intro-card__summary">${lion.summary}</p>
                </div>
            `;

            introGrid.appendChild(introCard);
introCard.addEventListener("click", function () {
    const allCards = document.querySelectorAll(".intro-card");

    allCards.forEach(function (card) {
        card.classList.remove("selected");
    });

    introCard.classList.add("selected");

    const detailCards = document.querySelectorAll(".detail-card");
    const targetDetailCard = detailCards[index];

    targetDetailCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
            introCard.addEventListener("click", function () {
    const allCards = document.querySelectorAll(".intro-card");

    allCards.forEach(function (card) {
        card.classList.remove("selected");
    });

    introCard.classList.add("selected");

    const detailCards = document.querySelectorAll(".detail-card");
    const targetDetailCard = detailCards[index];

    targetDetailCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

            const techList = lion.techs.map(function (tech) {
                return `<li>${tech}</li>`;
            }).join("");

            const detailCard = document.createElement("article");
            detailCard.className = "detail-card";

            detailCard.innerHTML = `
                <header class="detail-card__header">
                    <h3>${lion.name}</h3>
                    <p class="detail-card__part">${lion.part}</p>
                    <p class="detail-card__club">${lion.club}</p>
                </header>

                <section class="detail-card__section intro-section">
                    <h4>자기소개</h4>
                    <p>${lion.intro}</p>
                </section>

                <section class="detail-card__section tech-section">
                    <h4>관심 기술</h4>
                    <ul>
                        ${techList}
                    </ul>
                </section>

                <section class="detail-card__section contact-section">
                    <h4>연락처</h4>
                    <ul>
                        <li>Email: ${lion.email}</li>
                        <li>Website: <a href="${lion.website}" target="_blank">${lion.website}</a></li>
                        <li>Phone: ${lion.phone}</li>
                    </ul>
                </section>

                <section class="detail-card__section message-section">
                    <h4>한 마디</h4>
                    <p>${lion.message}</p>
                </section>
            `;

            detailList.appendChild(detailCard);
        });

        memberCount.textContent = lions.length;
    }

    function toggleForm() {
        formSection.classList.toggle("open");
    }

    function closeForm() {
        formSection.classList.remove("open");
        lionForm.reset();
        clearErrors();
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");

        errorMessages.forEach(function (message) {
            message.textContent = "";
        });
    }

    function showError(inputElement, message) {
        const formField = inputElement.closest(".form-field");
        const errorMessage = formField.querySelector(".error-message");

        errorMessage.textContent = message;
    }

    function validateForm() {
        clearErrors();

        let isValid = true;

        if (nameInput.value.trim() === "") {
            showError(nameInput, "이름을 입력해주세요.");
            isValid = false;
        }

        if (partInput.value.trim() === "") {
            showError(partInput, "파트를 선택해주세요.");
            isValid = false;
        }

        if (techInput.value.trim() === "") {
            showError(techInput, "관심 기술을 입력해주세요.");
            isValid = false;
        }

        if (summaryInput.value.trim() === "") {
            showError(summaryInput, "한 줄 소개를 입력해주세요.");
            isValid = false;
        }

        if (introInput.value.trim() === "") {
            showError(introInput, "자기소개를 입력해주세요.");
            isValid = false;
        }

        if (emailInput.value.trim() === "") {
            showError(emailInput, "이메일을 입력해주세요.");
            isValid = false;
        }

        if (phoneInput.value.trim() === "") {
            showError(phoneInput, "전화번호를 입력해주세요.");
            isValid = false;
        }

        if (websiteInput.value.trim() === "") {
            showError(websiteInput, "웹사이트를 입력해주세요.");
            isValid = false;
        }

        if (messageInput.value.trim() === "") {
            showError(messageInput, "한 마디를 입력해주세요.");
            isValid = false;
        }

        return isValid;
    }

    function addLion(event) {
        event.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        const techs = techInput.value.split(",").map(function (tech) {
            return tech.trim();
        }).filter(function (tech) {
            return tech !== "";
        });

        const newLion = {
            name: nameInput.value.trim(),
            part: partInput.value.trim(),
            club: "LION TRACK",
            summary: summaryInput.value.trim(),
            intro: introInput.value.trim(),
            techs: techs,
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            website: websiteInput.value.trim(),
            message: messageInput.value.trim(),
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
            isMe: false
        };

        lions.push(newLion);

        renderLions();
        closeForm();
    }

    function deleteLastLion() {
        if (lions.length === 0) {
            alert("삭제할 아기 사자가 없습니다.");
            return;
        }

        lions.pop();
        renderLions();
    }

    toggleFormButton.addEventListener("click", toggleForm);
    cancelButton.addEventListener("click", closeForm);
    deleteLastButton.addEventListener("click", deleteLastLion);
    lionForm.addEventListener("submit", addLion);

    initializeLionsFromHTML();
    renderLions();
});