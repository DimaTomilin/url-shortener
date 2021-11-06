document.getElementById('to-main').addEventListener('click', () => {
  document.getElementById('url-shortener').style.display = 'block';
  document.getElementById('url-input').value = '';
  document.getElementById('short-url').value = '';
  document.getElementById('url-statistic').style.display = 'none';
});

const closeButtons = document.getElementsByClassName('closebtn');

for (const button of closeButtons) {
  button.onclick = function () {
    const div = this.parentElement;
    div.style.opacity = '0';
    setTimeout(function () {
      div.style.display = 'none';
    }, 600);
  };
}

document.getElementById('execCopy').addEventListener('click', copyFunction);

function copyFunction() {
  document.getElementById('short-url').select();
  document.execCommand('copy');
}
