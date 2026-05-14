import { questions } from "./data.js";

let currentQuestion = 0;
let score = 0;
let answerSelected = "";
let userAnswers = [];


const resultMessages = {
    excellent: [
        "🧠 Seu cérebro entrou no modo turbo hoje. Resultado digno de mestre do quiz!",
        "🚀 Você não respondeu… você simplesmente dominou o desafio!",
        "👑 Isso aqui foi praticamente uma aula. Parabéns pelo desempenho incrível!",
        "🔥 Você acertou tanto que o quiz ficou até com medo de você.",
        "⚡ Precisão absurda! Parece que estudou com download direto no cérebro.",
        "🏆 Resultado de campeão! Continue assim e ninguém te segura.",
        "😎 Quando o conhecimento bate forte, o resultado aparece desse jeito.",
        "🌟 Seu desempenho brilhou mais que pergunta fácil em prova.",
        "💡 Você mostrou que estudar realmente faz diferença!",
        "🎉 Excelente! Dá até vontade de aumentar a dificuldade."
    ],

    medium: [
        "🙂 “Mandou bem! Com mais um pouco de estudo, você voa.",
        "📖 “Você está no caminho certo. Falta pouco para dominar tudo!",
        "🔧 “Bom resultado! Alguns ajustes e você chega no topo.",
        "💪 “Nada mal! Seu conhecimento já está tomando forma.",
        "🌱 “Você plantou bons resultados. Agora é hora de evoluir ainda mais.",
        "🎯 “Foi um bom desempenho, mas ainda existem algumas pegadinhas te esperando.",
        "🧩 “Você encaixou várias respostas certas, só faltou completar o quebra-cabeça.",
        "🔥 “Tem potencial de sobra aí. Só precisa lapidar mais.",
        "🚶 “Você já saiu do básico. Agora é continuar avançando.",
        "😅 “Quase lá! O próximo quiz já vai te encontrar mais forte."
    ],

    bad: [
        "📚 “O quiz venceu dessa vez… mas a revanche já pode começar.",
        "😵 “Parece que algumas respostas fugiram de você hoje.",
        "🫠 “Foi difícil… mas todo especialista já começou errando também.",
        "☕ “Talvez esteja faltando um café e uma boa revisão.",
        "🧐 “Hora de revisitar os estudos e voltar mais preparado.",
        "🌧️ “Hoje o desempenho ficou meio nublado… mas dá para abrir o céu.",
        "🪫 “Seu conhecimento está carregando… tente novamente daqui a pouco.",
        "😬 “As perguntas pegaram pesado dessa vez.",
        "🛠️ “Resultado abaixo do esperado, mas isso só mostra onde melhorar.",
        "🔄 “Errar faz parte do aprendizado. Bora tentar outra vez!"
    ]
};

function getRandomMessage(category) {
    const messages = resultMessages[category];
    const randomIndex = Math.floor(Math.random() * messages.length);

    return messages[randomIndex];
}


function handleSelection(index, element) {
    const optionsContainer = document.getElementById("options-container");

    // 1. Trava os cliques para o usuário não clicar em várias
    optionsContainer.classList.add("disabled");

    // 2. Aplica a cor de "selecionado" com o degradê suave do CSS
    element.classList.add("selected");

    // 3. Salva a resposta e pontuação
    userAnswers.push(index);
    if (index === questions[currentQuestion].answer) {
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

function checkAnswer(selected) {
    // Salva a resposta do usuário
    userAnswers.push(selected);

    if (selected === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
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

    } else if (percent >= 50) {
        randomMessage = getRandomMessage("medium");

        confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.6 }
        });

    } else {
        randomMessage = getRandomMessage("bad");
    }

    title.innerText = randomMessage;

    scoreText.innerText =
        `Você acertou ${score} de ${questions.length} (${Math.round(percent)}%)`;

    // GERAR REVISÃO FINAL
    const reviewList = document.getElementById("review-list");

    reviewList.innerHTML = "<h3>Revisão:</h3>";

    questions.forEach((item, index) => {
        const userChoice = userAnswers[index];
        const isCorrect = userChoice === item.answer;

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
                            ${item.options[item.answer]}
                        </span>`
                : ''
            }
            </div>
        `;

        reviewList.appendChild(div);
    });
}

loadQuestion();