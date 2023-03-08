const addLiveEventListeners = (selector, event, handler) => {
  const rootElement = document.querySelector('body');
  rootElement.addEventListener(event, function (evt) {
    let targetElement = evt.target;

    while (targetElement != null) {
      if (targetElement.matches(selector)) {
          handler(targetElement);
          return;
      }
      targetElement = targetElement.parentElement;
    }
  }, true);
}

export default addLiveEventListeners;
