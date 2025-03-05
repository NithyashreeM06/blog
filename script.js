document.addEventListener("DOMContentLoaded", loadReviews);

function addReview() {
    let title = document.getElementById("movieTitle").value;
    let review = document.getElementById("movieReview").value;
    let posterInput = document.getElementById("moviePoster");

    if (title === "" || review === "") {
        alert("Please enter both title and review!");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(event) {
        let poster = event.target.result; // Get image data URL
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push({ title, review, poster });
        localStorage.setItem("reviews", JSON.stringify(reviews));

        document.getElementById("movieTitle").value = "";
        document.getElementById("movieReview").value = "";
        document.getElementById("moviePoster").value = "";

        loadReviews();
    };

    if (posterInput.files.length > 0) {
        reader.readAsDataURL(posterInput.files[0]); // Read file as data URL
    } else {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push({ title, review, poster: "" });
        localStorage.setItem("reviews", JSON.stringify(reviews));

        document.getElementById("movieTitle").value = "";
        document.getElementById("movieReview").value = "";
        document.getElementById("moviePoster").value = "";

        loadReviews();
    }
}

function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    let reviewList = document.getElementById("reviewList");
    reviewList.innerHTML = "";

    reviews.forEach((review, index) => {
        let reviewElement = document.createElement("div");
        reviewElement.classList.add("review-item");
        reviewElement.innerHTML = `
            <h3>${review.title}</h3>
            ${review.poster ? `<img src="${review.poster}" alt="Movie Poster">` : ""}
            <p>${review.review}</p>
            <button onclick="deleteReview(${index})">Delete</button>
        `;
        reviewList.appendChild(reviewElement);
    });
}

function deleteReview(index) {
    let reviews = JSON.parse(localStorage.getItem("reviews"));
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    loadReviews();
}

document.getElementById('toggle-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    console.log("Toggle button clicked"); 
});