// your code here
const rootUrl = 'https://api.github.com';

function displayCommits() {
  const div = document.getElementById('details');
  const res = JSON.parse(this.responseText);
  const ul = document.createElement('ul');

  res.forEach(commit => {
    const li = document.createElement('li');
    const ghName = commit.author.login;
    const fullname = commit.commit.author.name;
    const msg = commit.commit.message;

    li.appendChild(document.createTextNode(`Commit by ${ghName} aka ${fullname}: ${msg}`));
    ul.appendChild(li);
  });

  div.appendChild(ul);
}

function displayBranches() {
  const res = JSON.parse(this.responseText);
  const div = document.getElementById('details');
  const ul = document.createElement('ul');

  res.forEach(branch => {
    const li = document.createElement('li');
    
    li.textContent = branch.name;
    ul.appendChild(li);
  });

  div.appendChild(ul);
}

function clear() {
  document.getElementById('repositories').textContent = '';
  document.getElementById('details').textContent = '';
  document.querySelector('#username').value = '';
}

function displayRepositories() {
  clear();
  const res = JSON.parse(this.responseText);
  const div = document.getElementById('repositories');
  const ul = document.createElement('ul');

  res.forEach(repo => {
    const li = document.createElement('li');
    const link = document.createElement('a');

    link.textContent = repo.name;
    link.href = repo.html_url;
    link.target = '_blank';

    const commitLink = createLink('Get Commits', getCommits);
    const branchLink = createLink('Get Branches', getBranches);

    addAttrs([commitLink, branchLink], repo.owner.login, repo.name);

    const separator = document.createTextNode(' | ');

    [link, separator, commitLink, separator.cloneNode(true), branchLink].forEach(el => (
      li.appendChild(el)
    ));

    ul.appendChild(li);
  });

  div.appendChild(ul);
}

function addAttrs(els, login, repoName) {
  els.forEach(el => {
    el.setAttribute('data-username', login);
    el.setAttribute('data-repository', repoName);
  });
}

function createLink(text, cb) {
  const link = document.createElement('a');

  link.textContent = text;
  link.addEventListener('click', function() { cb(this)});
  link.href = '#';

  return link;
}

function request(url, cb) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', cb);
  req.open('GET', url);
  req.send();
}

function getRepositories() {
  const username = document.getElementById('username').value;
  const url = `${rootUrl}/users/${username}/repos`;
  
  request(url, displayRepositories);
}

function getCommits(el) {
  const url = `${rootUrl}/repos/${el.dataset.username}/${el.dataset.repository}/commits`;
  request(url, displayCommits);
}

function getBranches(el) {
  const url = `${rootUrl}/repos/${el.dataset.username}/${el.dataset.repository}/branches`;
  request(url, displayBranches);
}
