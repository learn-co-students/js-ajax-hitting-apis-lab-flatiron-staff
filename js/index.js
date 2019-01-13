

function getRepositories() {
  const req = new XMLHttpRequest();
  let username = document.getElementById("username").value
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function displayRepositories() {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        '<h2>' + r.name + '</h2>' +
        '<a href="' + r.html_url + '">' + r.html_url + '</a>' + 
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' +
        r.name +
        '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const username = document.getElementById("username").value
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  const url = 'https://api.github.com/repos/' + username + '/' + name + '/commits'
  console.log(req)
  req.addEventListener('load', displayCommits);
  req.open('GET', url);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits)
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><h3>' +
        commit.commit.author.name +
        ' (' +
        commit.author.login +
        ')</h3>' +
        commit.commit.message +
        '</li>'    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const username = document.getElementById("username").value
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  const url = 'https://api.github.com/repos/' + username + '/' + name + '/branches'
  console.log(req)
  req.addEventListener('load', displayBranches);
  req.open('GET', url);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches)

  const branchesList = `<ul>${branches.map(branch =>
    '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
