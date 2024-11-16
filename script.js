document.addEventListener("DOMContentLoaded", function () {
    const storyContainer = document.getElementById("story-container");
    const storyText = document.getElementById("story-text");
    const choicesDiv = document.getElementById("choices");
  
    let storyHistory = [];
  
    function loadStory() {
      const urlParams = new URLSearchParams(window.location.search);
      let currentStep = urlParams.get("step") || "intro";
  
      const story = {
        intro: {
          text: "Você acorda em uma cela fria e sombria. A cada dia, a rotina na prisão de segurança máxima parece mais sufocante. Os guardas vigiam cada movimento, e escapar nunca pareceu mais distante. Porém, uma ideia começa a se formar em sua mente: talvez haja uma chance de escapar, mas não será fácil. Você terá que ser esperto e agir com cuidado.",
          choices: [
            { text: "Investigar a cela", nextStep: "investigateCell" },
            {
              text: "Tentar conversar com o prisioneiro ao lado",
              nextStep: "talkToPrisoner",
            },
          ],
        },
        investigateCell: {
          text: "Você encontra uma faca escondida na parede. Agora tem uma ferramenta para cortar os fios da eletricidade ou abrir fechaduras.",
          choices: [
            {
              text: "Ir até o banheiro para procurar por algo útil",
              nextStep: "goToBathroom",
            },
            { text: "Tentar cortar a cerca da janela", nextStep: "cutFence" },
            {
              text: "Esperar até a noite e tentar uma fuga silenciosa",
              nextStep: "waitNight",
            },
          ],
        },
        talkToPrisoner: {
          text: "O prisioneiro ao lado parece nervoso e não quer conversar. Você sente que essa não é a melhor opção agora.",
          choices: [
            {
              text: "Ir até o banheiro para procurar por algo útil",
              nextStep: "goToBathroom",
            },
            { text: "Tentar cortar a cerca da janela", nextStep: "cutFence" },
            {
              text: "Esperar até a noite e tentar uma fuga silenciosa",
              nextStep: "waitNight",
            },
          ],
        },
        goToBathroom: {
          text: "No banheiro, você encontra uma chave enferrujada. Talvez ela abra uma das portas mais fracas da prisão.",
          choices: [
            {
              text: "Ir até a cozinha para procurar por armas ou ferramentas",
              nextStep: "goToKitchen",
            },
            {
              text: "Esconder-se e esperar o próximo turno dos guardas",
              nextStep: "hide",
            },
            {
              text: "Tentar voltar para a cela e se esconder até o próximo dia",
              nextStep: "goBackToCell",
            },
          ],
        },
        cutFence: {
          text: "A cerca da janela está bem protegida. Você consegue cortar, mas o barulho atrai a atenção dos guardas. Você é pego!",
          choices: [{ text: "Recomeçar", nextStep: "intro" }],
        },
        waitNight: {
          text: "A noite chega. Você tenta uma fuga silenciosa, mas a vigilância é maior do que imaginava. Você é pego antes de sair da cela.",
          choices: [{ text: "Recomeçar", nextStep: "intro" }],
        },
        goToKitchen: {
          text: "Na cozinha, você encontra uma panela e um pano. Isso pode servir como distração ou ferramenta para o seu plano.",
          choices: [
            {
              text: "Criar uma distração para os guardas e correr para a saída",
              nextStep: "createDistraction",
            },
            {
              text: "Tentar seduzir um dos guardas para conseguir uma chave de acesso à área restrita",
              nextStep: "seduceGuard",
            },
            {
              text: "Usar a faca para ameaçar os guardas e forçar uma saída",
              nextStep: "threatenGuards",
            },
          ],
        },
        hide: {
          text: "Você se esconde, mas o tempo passa lentamente. Nada acontece e você perde a oportunidade de agir.",
          choices: [{ text: "Recomeçar", nextStep: "intro" }],
        },
        goBackToCell: {
          text: "Decidir voltar à cela não é uma boa ideia. A vigilância está ainda mais intensa, e isso só atrasa sua fuga.",
          choices: [{ text: "Recomeçar", nextStep: "intro" }],
        },
        createDistraction: {
          text: "Você cria uma distração com a panela e corre para a saída. Você consegue escapar, mas precisa de muita sorte para não ser pego nos minutos finais!",
          choices: [
            { text: "Explorar novos lugares", nextStep: "explore" },
            {
              text: "Buscar vingança contra os que te prenderam",
              nextStep: "revenge",
            },
            {
              text: "Recomeçar a fuga em outra prisão",
              nextStep: "restartEscape",
            },
          ],
        },
        seduceGuard: {
          text: "Seduzir um dos guardas não funciona. Eles estão mais atentos e você é visto. A fuga é interrompida.",
          choices: [{ text: "Recomeçar", nextStep: "intro" }],
        },
        threatenGuards: {
          text: "Ameaçar os guardas com uma faca pode ser uma boa ideia, mas eles reagem rápido e você acaba sendo dominado.",
          choices: [{ text: "Recomeçar", nextStep: "intro" }],
        },
        explore: {
          text: "Você conseguiu escapar! Parabéns! A fuga foi difícil, mas com paciência, astúcia e um pouco de sorte, você agora está livre. Mas a jornada não termina aqui. O que o futuro reserva para você?",
          choices: [],
        },
        revenge: {
          text: "Você conseguiu escapar, mas sua mente está cheia de vingança. Agora é hora de buscar os responsáveis pela sua prisão.",
          choices: [],
        },
        restartEscape: {
          text: "Você escapou, mas agora, quer testar suas habilidades em uma nova prisão. O que você fará?",
          choices: [],
        },
      };
  
      const currentStory = story[currentStep];
  
      storyText.innerHTML = currentStory.text;
  
      choicesDiv.innerHTML = "";
      currentStory.choices.forEach((choice) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice.text;
        choiceButton.addEventListener("click", function () {
          updateStory(choice.nextStep);
        });
        choicesDiv.appendChild(choiceButton);
      });
  
      storyHistory.push(currentStep);
    }
  
    function updateStory(step) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("step", step);
      window.history.pushState(null, "", "?" + urlParams.toString());
      loadStory();
    }
  
    loadStory();
  });
  