document.addEventListener('DOMContentLoaded', () => {
  enableCodeBlocksCopy();
  activateCopyCodeToClipboard();
});

function enableCodeBlocksCopy() {
  const preElements = document.querySelectorAll('pre:not(.no-copy)');
  preElements.forEach((el) => {
    const toolsDiv = createToolsDiv();
    el.appendChild(toolsDiv);
  });
}

function createToolsDiv() {
  const copyDiv = document.createElement('div');
  copyDiv.classList.add('copy');
  copyDiv.setAttribute('data-tooltip', 'Copier dans le presse-papier');

  const toolsDiv = document.createElement('div');
  toolsDiv.classList.add('tools');
  toolsDiv.appendChild(copyDiv);

  return toolsDiv;
}

function activateCopyCodeToClipboard() {
  const copyButtons = document.querySelectorAll('pre .copy');
  copyButtons.forEach((button) => {
    button.addEventListener('click', handleCopyButtonClick);
  });
}

function handleCopyButtonClick(e) {
  if (e.target !== e.currentTarget) return;

  const target = e.target;
  const preElement = target.closest('pre');
  const text = preElement.innerText;

  navigator.clipboard.writeText(text).then(() => {
    showCopiedMessage(target);
  });
}

function showCopiedMessage(target) {
  target.classList.add('copied');
  const span = document.createElement('span');
  const small = document.createElement('small');
  small.innerText = 'Copié!';
  span.appendChild(small);
  target.appendChild(span);

  setTimeout(() => {
    target.classList.remove('copied');
    target.removeChild(span);
  }, 500);
}