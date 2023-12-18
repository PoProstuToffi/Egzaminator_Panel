document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    const resultDisplay = document.getElementById("result");
    const verdictDisplay = document.getElementById("verdict");
    const userNameInput = document.getElementById("idUzytkownika");
    const dateStart = document.getElementById("dataRozpoczecia");

    let examStarted = false;
    let originalButtonColor = getComputedStyle(startButton).backgroundColor;

    function getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();

        return `${day}.${month}.${year}`;
    }

    startButton.addEventListener("click", function () {
        if (!examStarted) {
            if (!userNameInput.value.trim() || !dateStart.value.trim()) {
                alert("Proszę wypełnić wszystkie pola.");
                return;
            }

            startButton.style.backgroundColor = "#e74c3c";
            startButton.innerHTML = "Zakończ egzamin";
            examStarted = true;
        } else {
            const checkedCount = Array.from(checkBoxes).filter(checkbox => checkbox.checked).length;
            const resultPercentage = Math.floor((checkedCount / 20) * 100);
            resultDisplay.innerHTML = `Wynik: ${resultPercentage}%`;

            if (resultPercentage >= 80) {
                verdictDisplay.innerHTML = `:DobryPing: I INSTYTUT PRZYWÓDZTWA - WYNIKI EGZAMINU

Wraz z dniem ${getCurrentDate()} Egzamin Instytutu Przywództwa zdały poniżej wymienione osoby:

:Aplikant: - <@${userNameInput.value}> - Z wynikiem ${resultPercentage}%

*Po ukończeniu Instytutu Przywództwa proszę zgłosić się na Ticketa po odbiór roli :StAplikant: - Starszego Aplikanta, gratulujemy oraz życzymy dalszych sukcesów w Straży Marszałkowskiej.*`;
            } else {
                verdictDisplay.innerHTML = `:Odmowa: I INSTYTUT PRZYWÓDZTWA - WYNIKI EGZAMINU

Wraz z dniem ${getCurrentDate()} Egzamin Instytutu Przywództwa nie zdały poniżej wymienione osoby:

:Aplikant: - <@${userNameInput.value}> - ${resultPercentage}%

*Osoby która nie zaliczyła Egzaminu Aplikanckiego musi zgłosić się do obecnie dostępnego Egzaminatora w celu zdania ponownych Szkoleń ( Aplikant ma przeprowadzane szkolenia od Etapu I, do Etapu III )*`;
            }

            startButton.style.backgroundColor = originalButtonColor;
            startButton.innerHTML = "Rozpocznij egzamin";
            examStarted = false;
        }
    });
});
