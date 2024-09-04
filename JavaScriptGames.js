function toggleShowHide(idShow, idHide, idIFrame) {
    let elemShow = document.getElementById(idShow);
    let elemHide = document.getElementById(idHide);
    let elemIFrame = document.getElementById(idIFrame);
    if (elemShow.classList && !elemShow.classList.contains("hidden")) {
        elemShow.classList.add("hidden");
        elemHide.classList.remove("hidden");
        elemIFrame.style.display = "block";
    } else {
        elemShow.classList.remove("hidden");
        elemHide.classList.add("hidden");
        elemIFrame.style.display = "none";
    }
}
