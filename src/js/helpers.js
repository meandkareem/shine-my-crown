export function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
  }
}

export function addClass(el, className) {
  if (el.classList) {
    return el.classList.add(className);
  } else if (!hasClass(el, className)) {
    return el.className += " " + className;
  }

}

export function removeClass(el, className) {
  if (el.classList) {
    return el.classList.remove(className);
  } else if (hasClass(el, className)) {
    const reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    return el.className = el.className.replace(reg, " ");
  }
}
