// your code here

function getRepositories() {
  // retrieve the input value
  const input = document.getElementById('username').value;
  // const req = to new XML HTTP request
  const req = new XMLHttpRequest();

  // activate on load
  req.addEventListener('load', displayRepositories);
  // open url to user input username
  req.open('GET', `https://api.github.com/users/${input}/repos`);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList =
    '<ul>' +
    repos
      .map(repo => {
        const dataUsername = 'data-username="' +
          repo.owner.login + '"';
        const dataRepoName = 'data-repository=' + repo.name + '"';
        return `
        <li>
<h2>${repo.name}</h2>

<a href="${repo.html_url}">${repo.html_url}</a><br>

<a href="#" ${dataRepoName} ${dataUsername}
onclick="getCommits(this)">Get Commits</a><br>

<a href="#" ${dataRepoName} ${dataUsername}
onclick="getBranches(this)">Get Branches<a/></li>
</li>`;
})
.join('') +
    '</ul>';
document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
    const repoName = el.dataset.repository;
    const userName = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + userName + '/' + repoName + '/commits');
    req.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
        .map(
            commit =>
                '<li><h3>' +
                commit.commit.author.name +
                ' (' +
                commit.author.login +
                ')</h3>' +
                commit.commit.message +
                '</li>'
        )
        .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
    const repoName = el.dataset.repository;
    const userName = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + userName + '/' + repoName + '/branches');
    req.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches
        .map(branch => '<li>' + branch.name + '</li>')
        .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}
