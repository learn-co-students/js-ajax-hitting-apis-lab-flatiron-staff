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

function displayRepositories() {
  const res = JSON.parse(this.responseText);
  const div = document.getElementById('repositories');
  const ul = document.createElement('ul');

  res.forEach(repo => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    const commitLink = document.createElement('a');
    const branchLink = document.createElement('a');

    link.textContent = repo.name;
    link.href = repo.html_url;
    link.target = '_blank';
    link.setAttribute('data-username', repo.owner.login);
    link.setAttribute('data-repository', repo.name);

    commitLink.textContent = 'Get Commits';
    commitLink.addEventListener('click', () => displayCommits(link));
    commitLink.href = '#';

    branchLink.textContent = 'Get Branches';
    branchLink.addEventListener('click', () => displayBranches(link));
    branchLink.href = '#';

    li.appendChild(link);
    li.appendChild(document.createTextNode(' | '));
    li.appendChild(commitLink);
    li.appendChild(document.createTextNode(' | '));
    li.appendChild(branchLink);
    ul.appendChild(li);
  });

  div.appendChild(ul);
}

function request(url, cb) {
  const req = new XMLHttpRequest();

  req.addEventListener('loaded', cb);
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
