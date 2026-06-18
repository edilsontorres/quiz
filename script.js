import { questions } from "./data.js";
import { resultMessages } from "./resultMessages.js";

let currentQuestion = 0;
let score = 0;
let answerSelected = "";
let userAnswers = [];

const sonsSucesso = ['sons/bom/1.mp3', 'sons/bom/2.mp3', 'sons/bom/3.mp3'];
const sonsMedio = ['sons/medio/1.mp3', 'sons/medio/2.mp3', 'sons/medio/3.mp3'];
const sonsErro = ['sons/ruim/1.mp3', 'sons/ruim/2.mp3', 'sons/ruim/3.mp3', 'sons/ruim/4.mp3', 'sons/ruim/5.mp3'];


function getRandomMessage(category) {
    const messages = resultMessages[category];
    const randomIndex = Math.floor(Math.random() * messages.length);

    return messages[randomIndex];
}

function tocarSomAleatorio(listaDeSons) {
    // Escolhe um índice aleatório da lista passada
    const indiceAleatorio = Math.floor(Math.random() * listaDeSons.length);
    const caminhoDoSom = listaDeSons[indiceAleatorio];

    // Cria o elemento de áudio e toca
    const audio = new Audio(caminhoDoSom);
    audio.play().catch(error => {
        console.log("O navegador bloqueou o áudio automático. O usuário precisa interagir com a tela antes.", error);
    });
}


function handleSelection(index, element) {
    const optionsContainer = document.getElementById("options-container");

    // 1. Trava os cliques para o usuário não clicar em várias
    optionsContainer.classList.add("disabled");

    // 2. Aplica a cor de "selecionado" com o degradê suave do CSS
    element.classList.add("selected");

    userAnswers.push(index);

    const answer = questions[currentQuestion].answer;

    const isCorrect =
        (Array.isArray(answer) && answer.includes(index)) ||
        (!Array.isArray(answer) && index === answer);

    if (isCorrect) {
        score++;
    }

    // 4. ESPERA 3 SEGUNDOS 
    setTimeout(() => {
        const container = document.getElementById("quiz-container");

        // Inicia o fade-out para a troca de tela
        container.classList.add("fade-out");

        // Pequeno tempo para o fade-out completar antes de carregar a nova
        setTimeout(() => {
            optionsContainer.classList.remove("disabled");
            currentQuestion++;

            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }, 500);

    }, 1500); // 3000ms = 3 segundos de exibição da escolha
}

const loadQuestion = () => {
    const qData = questions[currentQuestion];
    const container = document.getElementById("quiz-container");
    const totalQuestions = questions.length;

    // Mostra a pergunta com suavidade
    container.classList.remove("fade-out");

    document.getElementById("current-idx").innerText = currentQuestion + 1;
    document.getElementById("totalQuestions").innerText = totalQuestions;
    document.getElementById("question-text").innerText = qData.q;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    qData.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = (e) => handleSelection(i, e.target);
        optionsContainer.appendChild(btn);
    });
}

function showResult() {
    document.getElementById("quiz-container").classList.add("hidden");

    const resDiv = document.getElementById("result-container");
    resDiv.classList.remove("hidden");

    const percent = (score / questions.length) * 100;

    const title = document.getElementById("result-title");
    const scoreText = document.getElementById("result-score");

    let randomMessage = "";

    // RESULTADO + CONFETES
    if (percent >= 80) {
        randomMessage = getRandomMessage("excellent");

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        tocarSomAleatorio(sonsSucesso);

    } else if (percent >= 50) {
        randomMessage = getRandomMessage("medium");

        confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.6 }
        });
        tocarSomAleatorio(sonsMedio);

    } else {
        randomMessage = getRandomMessage("bad");
        tocarSomAleatorio(sonsErro);
    }

    title.innerText = randomMessage;

    scoreText.innerText =
        `Você acertou ${score} de ${questions.length} (${Math.round(percent)}%)`;

    // GERAR REVISÃO FINAL
    const reviewList = document.getElementById("review-list");

    reviewList.innerHTML = "<h3>Revisão:</h3>";

    questions.forEach((item, index) => {
        const userChoice = userAnswers[index];
        const isCorrect =
            (Array.isArray(item.answer) && item.answer.includes(userChoice)) ||
            (!Array.isArray(item.answer) && userChoice === item.answer);


        const div = document.createElement("div");

        div.className = "review-item";

        div.innerHTML = `
            <span class="review-q">
                ${index + 1}. ${item.q}
            </span>

            <div class="review-info">
                Sua resposta:
                <span class="${isCorrect ? 'text-success' : 'text-danger'}">
                    ${item.options[userChoice]} ${isCorrect ? '✓' : '✗'}
                </span>

                <br>
                ${!isCorrect
                ? `Correta:
                    <span class="text-success">
                        ${Array.isArray(item.answer)
                                ? item.answer.map(i => item.options[i]).join(" ou ")
                                : item.options[item.answer]
                            }
                    </span>`
                : ''
            }

            
            </div>
        `;

        reviewList.appendChild(div);
    });
}

loadQuestion();