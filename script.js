const questions = [
    {
        q: "Qual nome do homem que Cristo chama para revelar sobre si e sobre as coisas vindouras?",
        options:
            ["João Batista", "Paulo", "João", "Tiago"],
        answer: 2
    },
    {
        q: "Onde ele estava preso quando Cristo revelou todas essas coisas a ele?",
        options:
            ["Társis", "Roma", "Jerusalém", "Ilha de Patmos"],
        answer: 3
    },
    {
        q: "O livro de apocalipse começa com uma promessa de bem-aventurança aos que",
        options:
            ["Crer, guardar e ouvir", "Lê, guardar e ouvir", "Comer, ouvir e crer", "Entender, meditar"],
        answer: 1
    },
    {
        q: "Na revelação a João, Cristo revela que ele é o Alfa e Ômega. O que isso significava?",
        options: ["início e fim", "Aquele que ressuscitou", "Ele era a expressão de Deus", "Autoridade e justiça"],
        answer: 0

    },
    {
        q: "Na revelação a João, Cristo revela que é o primogênito dentre os mortos. O que isso significa?",
        options:
            ["Foi o primeiro a ressuscitar", "Foi o primeiro a vencer a morte", "Foi arrebatado vivo", "Não enfrentou a morte"],
        answer: 1

    },
    {
        q: "Jesus revela a João que em sua mão direita tinha 7 estrelas. O que isso significa?",
        options: ["7 dias da criação", "7 voltas de Jericó", "7 trombetas", "7 igrejas do apocalipse"],
        answer: 3

    },
    {
        q: "Em qual cidade se iniciou um avivamento na Ásia menor?",
        options:
            ["Filadélfia", "Laodiceia", "Éfeso", "Pérgamo"],
        answer: 2

    },
    {
        q: "O que era uma província?",
        options: ["Um território conquistado", "Uma cidade sem lei", "Uma terra sem dono", "Uma ilha isolada"],
        answer: 0

    },
    {
        q: "A antiga Asia menor, hoje está localiza em qual país na Ásia?",
        options: ["Itália", "Turquia", "Israel", "Palestina"],
        answer: 1
    },
    {
        q: "Quais os aspectos que jesus sempre usava em suas cartas as igrejas?",
        options: ["Entendimento/ Correção / Livre arbítrio", "Amor/ Fogo/ Glória", "Elogios/ Afeto/ Transformação", "Elogios/ Correção/ Recompensa"],
        answer: 3

    }
];

/*const questions = [
    { q: "", options: ["", "", "", ""], answer: 1 },
    { q: "", options: ["", "", "", ""], answer: 2 },
    { q: "", options: ["", "", "", ""], answer: 1 },
    { q: "", options: ["", "", "", ""], answer: 2 },  
    { q: "", options: ["", "", "", ""], answer: 1 },   
    { q: "", options: ["", "", "", ""], answer: 0 },    
    { q: "", options: ["", "", "", ""], answer: 1 },
    { q: "", options: ["", "", "", ""], answer: 0 },
    { q: "", options: ["", "", "", ""], answer: 2 }, 
    { q: "", options: ["", "", "", ""], answer: 2 }
];*/

let currentQuestion = 0;
let score = 0;
let answerSelected = "";
let userAnswers = [];

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

    // 4. ESPERA 3 SEGUNDOS (O delay que você pediu)
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


    // const totalQuestions = questions.length;

    // document.getElementById("current-idx").innerText = currentQuestion + 1;
    // document.getElementById("totalQuestions").innerText = totalQuestions;
    // document.getElementById("question-text").innerText = qData.q;

    // const container = document.getElementById("options-container");
    // container.innerHTML = "";

    // qData.options.forEach((opt, i) => {
    //     const btn = document.createElement("button");
    //     btn.innerText = opt;
    //     btn.onclick = () => checkAnswer(i);
    //     container.appendChild(btn);
    // });
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

    // Lógica dos Confetes
    if (percent >= 80) {
        title.innerText = "Parabéns! Você foi incrível!";
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } else if (percent >= 50) {
        title.innerText = "Bom trabalho!";
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    } else {
        title.innerText = "Poxa, não foi dessa vez.";
    }

    document.getElementById("result-score").innerText = `Você acertou ${score} de ${questions.length}`;

    // GERAR REVISÃO NO FINAL
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "<h3>Revisão:</h3>";

    questions.forEach((item, index) => {
        const userChoice = userAnswers[index];
        const isCorrect = userChoice === item.answer;

        const div = document.createElement("div");
        div.className = "review-item";
        div.innerHTML = `
            <span class="review-q">${index + 1}. ${item.q}</span>
            <div class="review-info">
                Sua resposta: <span class="${isCorrect ? 'text-success' : 'text-danger'}">
                    ${item.options[userChoice]} ${isCorrect ? '✓' : '✗'}
                </span><br>
                ${!isCorrect ? `Correta: <span class="text-success">${item.options[item.answer]}</span>` : ''}
            </div>
        `;
        reviewList.appendChild(div);
    });
}

loadQuestion();