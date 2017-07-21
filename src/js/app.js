// import $ from "jquery";
import {TweenMax} from "gsap";
import SplitText from "./SplitText";
import * as helpers from "./helpers";

class App {

  constructor() {
    this.mySplitTitles = undefined;
  }


  toggleMenu() {
    const _body = document.body;
    const _nav = document.getElementById("nav-overlay");
    const _toggle = document.getElementById("hamburger-toggle");

    if (helpers.hasClass(_body, "menu-opened")) {
      helpers.removeClass(_body, "menu-opened");
      helpers.removeClass(_toggle, "is-active");
      TweenMax.to(_nav, .3, {
        autoAlpha: 0
      });
    } else {
      helpers.addClass(_body, "menu-opened");
      helpers.addClass(_toggle, "is-active");
      TweenMax.to(_nav, .3, {
        autoAlpha: 1
      });
    }

  }


  initTitles() {
    // set a breakpoint at this line
    if (typeof this.mySplitTitles !== "undefined" && this.mySplitTitles.words.length > 0) {
      this.mySplitTitles.revert();
    }

    this.mySplitTitles = new SplitText(".article-title", {
      type: "words,lines",
      linesClass: "title-line",
      wordsClass: "title-word"
    });

    const words = this.mySplitTitles.words;

    for (const word of words) {
      const txt = word.innerHTML;
      switch (txt.charAt(0)) {
        case "@":
          helpers.addClass(word, "username");
          break;
        case "#":
          helpers.addClass(word, "tag");
          break;
        default:
          //
      }
    }
  }

}

const app = new App();
app.initTitles();
document.getElementById("menu-toggle").addEventListener("click", app.toggleMenu);

// Window Resize
window.addEventListener("resize", function(event) {
  app.initTitles();
});
