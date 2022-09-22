document.addEventListener("DOMContentLoaded", init);

function init() {
    const contactForm = document.querySelector("#contact-form");
    if (!contactForm) return;

    let submitButton = contactForm.querySelector("button[type=submit]");
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        submitContactForm(contactForm)
    });
    document.addEventListener("keypress", (event) => submitOnMetaEnter(event, contactForm));
}

function submitOnMetaEnter(keyPressEvent, contactForm) {
    if (!keyPressEvent.metaKey || (keyPressEvent.key !== "Enter" && keyPressEvent.key !== "Return"))
        return;
    submitContactForm(contactForm);
}

async function submitContactForm(contactForm) {
    const name = contactForm.querySelector("#name").value;
    const email = contactForm.querySelector("#email").value;
    const message = contactForm.querySelector("#message").value;

    const formMessageField = contactForm.querySelector("#form-message-field");
    resetFormMessageField(formMessageField);

    if (!name || !email || !message) {
        showFormMessage(formMessageField, "Bitte fülle alle Felder des Formulars aus.", "error");
        return;
    }

    const spinner = contactForm.querySelector(".spinner");
    spinner.classList.remove("hidden");

    try {
        console.log(`Sending contact form for ${name} (${email}): ${message}`);
        const formData = new FormData(contactForm);
        const response = await fetch("https://formspree.io/f/xpznpvvd", {
            method: "POST",
            body: formData,
            headers: {'Accept': 'application/json'},
        });
        const data = await response.json();
        if (data.errors) {
            // An error occurred while sending the form
            console.error(data.errors.map(error => error.message).join(", "));
        }
    } catch (error) {
        console.error(error);
    }

    spinner.classList.add("hidden");
    showFormMessage(formMessageField, "Deine Nachricht wurde gesendet!", "success");
    contactForm.querySelector("button[type=submit]").hidden = true;
}

function showFormMessage(field, message, className) {
    field.innerText = message;
    field.classList.add(className);
    field.hidden = false;
}

function resetFormMessageField(field) {
    field.innerText = "";
    field.classList.value = "";
    field.hidden = true;
}
