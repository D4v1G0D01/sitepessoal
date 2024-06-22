const my_token = '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';

const params = new URL(document.location.href);
const queryOwner = params.searchParams.get("owner");
const queryName = params.searchParams.get("repo");

async function loadData() {
  try {
    const response = await fetch(`https://api.github.com/repos/${queryOwner}/${queryName}`, {
      method: 'GET',
      //headers: { Authorization: `token ${my_token}` }
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.name) return alert('Erro ao carregar informações do repositório!');

    document.getElementById('repoTitle').innerHTML = 'Repositório: ' + data.name;
    document.getElementById('repoDesc').innerHTML = data.description || 'Repositório sem descrição.';

    const date = new Date(data.updated_at);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    document.getElementById('repoCreationDate').innerHTML = `${day}-${month}-${year}`;
    document.getElementById('repoMainLang').innerHTML = data.language || 'Linguagem não especificada.';
    document.getElementById('repoLink').href = data.html_url;
    document.getElementById('repoTopics').innerHTML = data.topics.join(', ') || 'Nenhum tópico especificado.';
    document.getElementById('repoStars').innerHTML = data.stargazers_count;
    document.getElementById('repoWatchers').innerHTML = data.watchers;
    document.getElementById('repoOwner').innerHTML = data.owner.login;
    document.getElementById('repoAvatar').src = data.owner.avatar_url;
    document.getElementById('repoLicense').innerHTML = data.license?.name || 'Licença não especificada';

    document.getElementById('headerCommits').href = `${data.html_url}/commits`;
    document.getElementById('headerIssues').href = `${data.html_url}/issues`;
    document.getElementById('headerInsights').href = `${data.html_url}/graphs/contributors`;
  } catch (error) {
    console.error("Erro ao carregar informações do repositório:", error);
    alert("Erro ao carregar informações do repositório. Por favor, tente novamente mais tarde.");
  }
}

window.onload = loadData;
