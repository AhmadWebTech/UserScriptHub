const linkShowElements = document.querySelectorAll(".link-show");
const linkDownloadElements = document.querySelectorAll(".link-download");
const currentMovieId = location.href.split("/")[4];
linkShowElements.forEach((linkShowElement, index) => {
  const movieId = linkShowElement.href.split("/").pop();
  const movieId2 = (movieId === currentMovieId) ? location.href.split("/")[5] : currentMovieId;
  const baseUrl = location.origin;
  linkShowElement.href = `${baseUrl}/watch/${movieId}/${movieId2}`;
  linkDownloadElements[index].href = `${baseUrl}/download/${movieId}/${movieId2}`;
});
