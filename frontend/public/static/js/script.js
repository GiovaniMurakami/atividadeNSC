document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailField = form.querySelector(".email");
    const emailInput = emailField.querySelector("input");
    const nameField = form.querySelector(".name");
    const nameInput = nameField.querySelector("input");
    const messageField = form.querySelector(".message");
    const messageInput = messageField.querySelector("textarea");

    nameInput.onkeyup = () => {
        if (nameInput.value == "") {
            nameField.classList.add("error");
        } else {
            nameField.classList.remove("error");
        }
    };

    messageInput.onkeyup = () => {
        if (messageInput.value == "") {
            messageField.classList.add("error");
        } else {
            messageField.classList.remove("error");
        }
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        checkEmail();
        checkName();
        checkMessage();

        setTimeout(() => {
            emailField.classList.remove("shake");
            nameField.classList.remove("shake");
            messageField.classList.remove("shake");
        }, 500);

        if (
            !emailField.classList.contains("error") &&
            !nameField.classList.contains("error") &&
            !messageField.classList.contains("error")
        ) {
            submitForm(nameInput.value, emailInput.value, messageInput.value);
        }
    };

    function checkEmail() {
        let pattern = /^[^]+@[^]+\.[a-z]{2,3}$/;
        if (!emailInput.value.match(pattern)) {
            emailField.classList.add("error");
            emailField.classList.add("shake");
            let errorText = emailField.querySelector(".error-text");
            errorText.innerText =
                emailInput.value != ""
                    ? "Insira um email válido"
                    : "Email não pode ser vazio";
        } else {
            emailField.classList.remove("error");
        }
    }

    function checkName() {
        if (nameInput.value.length < 3) {
            nameField.classList.add("error");
            nameField.classList.add("shake");
            let errorText = nameField.querySelector(".error-text");
            errorText.innerText =
                nameInput.value != ""
                    ? "Nome precisa ter pelo menos 3 caracteres"
                    : "Nome não pode ser vazio";
        }
    }

    function checkMessage() {
        if (messageInput.value.length < 10) {
            messageField.classList.add("error");
            messageField.classList.add("shake");
            let errorText = messageField.querySelector(".error-text");
            errorText.innerText =
                messageInput.value != ""
                    ? "Mensagem precisa ter pelo menos 10 caracteres"
                    : "Mensagem não pode ser vazia";
        }
    }

    async function submitForm(name, email, message) {
        try {
            const response = await fetch(
                "http://localhost:3000/api/contact/submit",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, message }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao enviar os dados");
            }

            const data = await response.json();
            console.log("Resposta da API:", data);
            window.location.href = "/sucess";
            nameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
        }
    }
});
