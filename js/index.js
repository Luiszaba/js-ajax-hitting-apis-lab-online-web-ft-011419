// your code here

function getRepositories() {
  event.preventDefault();
  fetch('https://api.github.com/users/octocat/repos')
  .then(res => res.json())
  .then(data => displayRepositories(data));
}

function displayRepositories(repos) {
  repos.forEach(r => {
    reposEl = document.getElementById('repositories');
    reposEL.innerHTML += 
    <div>
    <p>${r.name}</p>
    <a href="${r.html_url}">${r.html_url}</a><br>
    <a href="#" onClick="getCommits(${r.commits_url.slice(0, -6)})"</a>
    </div>
})
}

function getCommits(url) {
  fetch(url).then(r => r.json()).then(data => {
    
  })
}