const usernameInput = document.getElementById('username-area');

document.getElementById('sing-in-button').addEventListener('click', userSingIn);
document.getElementById('check-button').addEventListener('click', checkUser);

async function userSingIn() {
  const username = usernameInput.value.toLowerCase();
  localStorage.setItem('username', username);

  const response = await fetch(
    `https://salty-thicket-98454.herokuapp.com/user/create/${username}`,
    {
      method: 'PUT',
    }
  );
  const body = await response.text();
  showingAlert(document.getElementById('alert1'), response.status, body);
  usernameInput.value = '';
}

async function checkUser() {
  const response = await axios.get(
    `https://salty-thicket-98454.herokuapp.com/user/info`,
    {
      headers: {
        username: localStorage.getItem('username'),
      },
    }
  );
  showingAlert(
    document.getElementById('alert1'),
    response.status,
    response.data
  );
}

function showingAlert(object, status, message) {
  object.classList.remove(object.classList.item(1));
  if (status === 200) {
    object.classList.add('success');
    object.querySelector(
      'div'
    ).innerHTML = `<strong>Success!<strong> ${message}`;
  } else {
    object.querySelector(
      'div'
    ).innerHTML = `<strong>Error!<strong> ${status} ${message}`;
  }
  object.style.display = 'block';
  object.style.opacity = '1';
}

localStorage.setItem('username', '');
document
  .getElementById('copy-button')
  .addEventListener('click', exampleRequest);

async function exampleRequest() {
  const res = await axios.put(
    'http://localhost:3000/url/create',
    { url: 'https://www.youtube.com/watch?v=eSaF8NXeNsA' },
    {
      headers: {
        username: 'dima',
      },
    }
  );
  return res;
}
