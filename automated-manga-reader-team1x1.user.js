// ==UserScript==
// @name         Automated Manga Reader - Team1x1
// @description  -
// @version      0.1.2
// @author       AhmadWebTech
// @include      *://team1x1.fun/series/*/*
// @match        *://team1x1.fun/series/*/*
// @updateURL    https://cdn.jsdelivr.net/gh/AhmadWebTech/UserScriptHub@main/automated-manga-reader-team1x1.user.js
// ==/UserScript==
const USE_AUTOMATED_MANGA_READER = true;
const CHECK_IF_LOGGED_IN = true;
const SCROLL_DOWN = true;
const EMAIL = "";
const PASSWORD = "";
const mangaList = [
  { url: 'https://team1x1.fun/series/unordinary', start: 1, end: 203 },
];

function init() {
  if (USE_AUTOMATED_MANGA_READER) {
    automateMangaReading();
  } else {
    automateMangaReading_2();
  }

  if (!isLoggedIn()) {
    const loginUrl = "/login";
    const prevPageUrl = window.location.href;
    fetch(loginUrl)
      .then((response) => response.text())
      .then((html) => {
        const tokenRegex = /<input type="hidden" name="_token" value="(.+?)">/;
        const match = html.match(tokenRegex);
        if (match) {
          let csrfToken = match[1];
          return fetch(loginUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _token: csrfToken,
              email: EMAIL,
              password: PASSWORD,
            }),
          });
        }
      })
      .then((response) => {
        window.location.href = prevPageUrl;
      })
      .catch((error) => console.error(error));
  }

  const storedMangaList = JSON.parse(localStorage.getItem('mangaList'));
  if (JSON.stringify(storedMangaList) !== JSON.stringify(mangaList)) {
    localStorage.removeItem('mangaIndex');
    localStorage.removeItem('linkCounter');
    localStorage.setItem('mangaList', JSON.stringify(mangaList));
  }
}

function isLoggedIn() {
  if (CHECK_IF_LOGGED_IN) {
    return !document.querySelector('.user > .not-logged');
  }
  return true;
}

function automateMangaReading() {
  const mangaIndex = Number(localStorage.getItem('mangaIndex')) || 0;
  const currentManga = mangaList[mangaIndex];
  const { start = 0, end = Infinity, url } = currentManga || {};
  let linkCounter = Number(localStorage.getItem('linkCounter')) || 0;

  function goToNextManga() {
    if (mangaIndex < mangaList.length - 1) {
      localStorage.setItem('mangaIndex', mangaIndex + 1);
      const nextManga = mangaList[mangaIndex + 1];
      const nextMangaUrl = `${nextManga.url}/${nextManga.start || ''}`;
      window.location.href = nextMangaUrl;
    } else {
      localStorage.removeItem('mangaIndex');
    }
  }

  setTimeout(() => {
    const currentUrl = window.location.href.replace(/\/(\d+(?:\.\d+)?)$/, '');
    if (isLoggedIn() && currentUrl === url.replace(/\/(\d+(?:\.\d+)?)$/, '')) {
      const nextChapterLink = document.querySelector('.next-post');
      const currentChapter = parseFloat(window.location.href.match(/\/(\d+(?:\.\d+)?)$/)?.[1]) || 0;
      if (currentChapter === end || !nextChapterLink) {
        goToNextManga();
        localStorage.removeItem('linkCounter');
      } else {
        linkCounter++;
        if (linkCounter % 5 === 0) {
          localStorage.removeItem('linkCounter');
          const newTab = window.open(nextChapterLink.getAttribute('href'), '_blank');
          newTab.opener = window;
          setTimeout(() => { window.close(); }, 500);
        } else {
          if (SCROLL_DOWN) {
            window.scrollTo(0, document.body.scrollHeight);
          }
          setTimeout(() => { nextChapterLink.click(); }, 500);
          localStorage.setItem('linkCounter', linkCounter);
        }
      }
    }
  }, 3000);
}

function automateMangaReading_2() {
  if (isLoggedIn()) {
    setTimeout(() => {
      if (SCROLL_DOWN) {
        window.scrollTo(0, document.body.scrollHeight);
      }
      const nextChapterLink = document.querySelector('.next-post');
      if (nextChapterLink && nextChapterLink.getAttribute('href') !== '#') {
        nextChapterLink.click();
      }
    }, 3000);
  }
}

init();
