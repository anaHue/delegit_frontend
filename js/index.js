const dialog = document.querySelector("dialog");
const showDialogButton = document.querySelector("#addBtn");
const feedbackForm = document.querySelector("#feedbackForm");
const closeDialogButton = document.querySelector("dialog button");

showDialogButton.addEventListener("click", () => {
    dialog.showModal();
    document.body.style.overflow = "hidden";
});

closeDialogButton.addEventListener("click", () => {
    document.querySelector("#course").value = "";
    document.querySelector("#feedback").value = "";
    document.querySelector("#formError").textContent = "";
    dialog.close();
    document.body.style.overflow = "visible";
});

axios.get("https://delegit.licolas.net/feedback").then((response) => {
    let feedbacks = response.data;
    const feedbacksContainer = document.querySelector("#feedbacksContainer");
    feedbacksContainer.innerHTML = ""

    feedbacks.sort((a,b) => b.Upvote - a.Upvote).forEach(feedback => {
        feedbacksContainer.innerHTML += `
            <div class="feedback">
                <div class="feedbackContent">
                    <p>${feedback.Feedback}</p>
                    <b>${feedback.Course}</b>
                </div>
                <div class="btns">
                    <button class="up"><img src="images/up.png" alt="Upvote"> Up</button>
                    <button class="down"><img src="images/down.png" alt="Downvote"> Down</button>
                </div>
            </div>
        `
    });

    feedbacksContainer.innerHTML += `
        <div id="endFeedback">
            <img src="images/feedbackIcon.png" alt="feedback icon" width="20%">
            <h3>You have read all the feedbacks !<br>We encourage you to <a href="#">add your own</a></h3>
        </div>
    `
}).catch((error) => {
    feedbacksContainer.innerHTML = `
        <div id="endFeedback">
            <img src="images/feedbackIcon.png" alt="feedback icon" width="20%">
            <h3>The list of feedback could not be loaded ! <br>We invite you to come back later</h3>
        </div>
    `
})

feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const feedback = {
        "Course": document.querySelector("#course").value,
        "Feedback": document.querySelector("#feedback").value
    }

    axios.post("https://delegit.licolas.net/feedback", feedback).then((response) => {
        document.querySelector("#course").value = "";
        document.querySelector("#feedback").value = "";
        document.querySelector("#formError").textContent = "";
        dialog.close();
    }).catch((error) => {
        document.querySelector("#formError").textContent = "Your feedback could not be added yet. Please come back later."
    })
})