// ==UserScript==
// @name         My Script
// @description  -
// @version      0.1.8
// @author       AhmadWebTech
// @icon         https://www.google.com/s2/favicons?sz=64&domain=violentmonkey.github.io
// @include      http*://*
// @require      https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js
// @updateURL    https://cdn.jsdelivr.net/gh/AhmadWebTech/UserScriptHub@main/My-Script.user.js
// @grant        GM_addStyle
// ==/UserScript==
window.addEventListener('load', () => {
  'use strict';
  //=====================
  //   Console jQuery
  //=====================
  // var jqry = document.createElement('script');
  // jqry.src = "https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js";
  // document.getElementsByTagName('head')[0].appendChild(jqry);
  // jQuery.noConflict();
  //=====================
  // Next & Prev Chapter
  //=====================
  const Madara       = document.querySelector(".nav-links");
  const MangaStream  = document.querySelector(".nextprev");
  const Team_X       = document.querySelector(".single-chapter-bottom");
  const unknow_theme = document.querySelector(".navi-change-chapter-btn");
  let nextLink, prevLink;
  if (Madara) {
    nextLink = document.querySelector(".next_page");
    prevLink = document.querySelector(".prev_page");
  } else if (MangaStream) {
    nextLink = document.querySelector(".ch-next-btn");
    prevLink = document.querySelector(".ch-prev-btn");
  } else if (Team_X) {
    nextLink = document.querySelector(".next-post");
    prevLink = document.querySelector(".prev-post");
  } else if (unknow_theme) {
    nextLink = document.querySelector(".navi-change-chapter-btn-next");
    prevLink = document.querySelector(".navi-change-chapter-btn-prev");
  }
  window.addEventListener("keydown", (event) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 135 && nextLink) {
      nextLink.click();
    } else if (keyCode === 134 && prevLink) {
      prevLink.click();
    }
  });
  //=====================
  //  Youtube
  //=====================
  if ('youtube.com' == window.location.hostname) {
    GM_addStyle(`
      ::-webkit-scrollbar {
          width: 16px;
      }
      ::-webkit-scrollbar-thumb {
          height: 56px;
          border-radius: 8px;
          border: 4px solid transparent;
          background-clip: content-box;
          background-color: var(--yt-spec-text-secondary);
      }
    `)
  }
  //=====================
  //  Avira Passwords
  //=====================
  if ('re.akwam.news' == window.location.hostname) {
    document.querySelector(".download-link").click()
  }
  //=====================
  // Avira Passwords
  //=====================
  if ('passwords.avira.com' == window.location.hostname) {
    GM_addStyle(`.kfPIoW {flex-direction:column!important}`)
  }
  //=====================
  // Shahed4u
  //=====================
  if ('shahed4u.vip' == window.location.hostname) {
    GM_addStyle(`
      @media(max-width: 1023px) {
        .no-gutter [class*=col-]:first-child,.no-gutter [class*=col-]:nth-child(4){width:100%!important}
        .WserversList{height:unset}
        .media-stream .servers-list li{width:48%;margin-left:3px}
      }
    `)
  }
  //=====================
  //  Team X
  //=====================
  if (['team1x1.fun', 'teamx.fun', 'mnhaestate.com'].some(domain => window.location.hostname.endsWith(domain))) {
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
                              email: "alkahmad230@gmail.com",
                              password: "J7HPfVXnPrrk5rHyvaY3",
                          }),
                      });
                  }
              })
              .then((response) => {
                  window.location.href = prevPageUrl;
              })
              .catch((error) => console.error(error));
      }
      function isLoggedIn() {
          const notLoggedElement = document.querySelector(".user > .not-logged");
          return !notLoggedElement;
      }
  }
  //=====================
  // Azora Manga
  //=====================
  if ('azoranov.com' == window.location.hostname) {
    GM_addStyle(`
      /*==============================
          Fonts
      ==============================*/
      @import url('https://fonts.googleapis.com/css2?family=Cairo');
      /*==============================
          Common styles
      ==============================*/
      body {
          font-family: 'Cairo', sans-serif !important;
      }
      /*==============================
          Header
      ==============================*/
      .site-header .c-sub-header-nav .c-sub-nav_wrap .c-modal_item{display:-webkit-inline-box}
      .site-header .c-sub-header-nav .c-sub-nav_wrap .c-modal_item .btn-active-modal{display:flex;align-items:center;margin:0 2px}
      .site-header .c-sub-header-nav .c-sub-nav_wrap .c-modal_item .btn-active-modal:before{padding:0!important;padding-left:5px!important}
      .site-header .main-navigation .main-navigation_wrap{padding:15.5px 0!important}
      .site-header .wrap_branding .logo img{top:-4px!important}
      .site-header .main-menu a h4{margin:0!important}
      /*==============================
          Reading Manga
      ==============================*/
      .reading-manga .select-pagination .nav-links{direction:ltr}
      .reading-manga .wp-manga-nav .select-view{width:auto}
      .reading-manga .footer .wp-manga-nav .select-pagination{float:right}
      .reading-manga .footer .wp-manga-nav.active .select-view{float:left!important}
      @media (max-width:480px){
        .reading-manga .entry-header .nav-links i{width:inherit!important;top:0!important;right:90px!important}
      }
      @media (max-width:480px){
        .reading-manga .entry-header .entry-header_wrap{margin-right:14px}
        .reading-manga .entry-header .wp-manga-nav ol{padding-bottom:30px}
        .reading-manga .entry-header .select-view{float:none!important;margin-right:30px!important}
        .reading-manga .entry-header .wp-manga-nav.active .select-pagination{position:absolute!important}
      }
    `)
  }
  //=====================
  // Mangalek
  //=====================
  if ('mangalek.com' == window.location.hostname) {
    GM_addStyle(`
      /*==============================
          Fonts
      ==============================*/
      @import url('https://fonts.googleapis.com/css2?family=Cairo');
      /*==============================
          Common styles
      ==============================*/
      body{font-family:cairo,fira sans,sans-serif!important}
      /*==============================
          Header
      ==============================*/
      .main-navigation_wrap{padding:10px 0!important}
      .site-header .img-responsive{max-height:50px!important}
      .site-header ul.main-navbar>li>a{font-size:1rem!important}
      .site-header .wrap_branding{width:20%!important}
      .site-header .main-menu{width:65%!important}
      .site-header .second-menu{text-align:right!important}
      .site-header .list-inline>li a{font-size:15px!important}
      .site-header #menu-primary-menu-1{text-align:right!important}
      @media (max-width:480px){
          .search-navigation.search-sidebar{right:60px!important}
      }

      .superpwa-sticky-banner .superpwa-stky-blk{width:100%!important;margin-left:0!important;margin-top:0!important;margin-bottom:0!important;border-radius:0!important}
      .superpwa-stky-blk h2{margin:0 35px 0 10px!important}
      .superpwa_add_home_close{top:26%!important}
      /*==============================
          User Settings
      ==============================*/
      .page-id-5 .c-sidebar.c-top-sidebar{display:none!important;}
      .page-id-5 .remove-all .checkbox{float:left!important}
      .page-id-5 .remove-all .checkbox label{margin-bottom:0!important;margin-top:4px!important}
      @media (max-width:767px){
          .page-id-5 .remove-all{float:right!important}
      }
      /*==============================
          Reading Manga
      ==============================*/
      .reading-manga .nav-links{direction:ltr!important}
      .reading-manga .nav-next .btn{line-height:1.5!important}
      .reading-manga .nav-next .btn.back:before{content:"\\f30c"!important;bottom:-17px!important;right:11px!important}
      .reading-manga .footer .select-pagination{width:100%!important;text-align:left!important}
      @media (max-width:480px){
          .reading-manga .header .select-view{width:138px!important;max-height:34px!important;margin-top:-2px!important;margin-right:85px!important}
          .reading-manga .header .select-pagination{float:right!important;position:absolute!important}
          .reading-manga .header .c-selectpicker.selectpicker_chapter{padding:0!important}
          .reading-manga .header .select-pagination .nav-links .mobile-nav-btn{top:0!important;right:auto!important;left:-30px!important}
          .reading-manga .footer .select-view{width:160px!important;max-height:0!important}
          .reading-manga .footer .select-pagination{position:initial!important}
          .reading-manga .footer .select-pagination .nav-links .mobile-nav-btn{top:5px!important}
      }
    `)
  }
});
