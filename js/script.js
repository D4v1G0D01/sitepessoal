const user = 'D4v1G0D01';
const my_token = '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'; // Coloque aqui o token de autenticação do GitHub

async function loadInfos() {
  try {
    const response = await fetch(`https://api.github.com/users/${user}`, {
      method: 'GET',
      headers: {
        Authorization: `token ${my_token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.login) return alert('Erro ao carregar informações do usuário!');

    document.getElementById('headerName').innerHTML = data.login;
    document.getElementById('profileName').innerHTML = data.name;
    document.getElementById('profileDescription').innerHTML = data.bio;
    document.getElementById('profileLocation').innerHTML = data.location;
    document.getElementById('profileBlog').innerHTML = data.blog;
    document.getElementById('profileBlog').href = data.blog;
    document.getElementById('profileFollowers').innerHTML = data.followers;
    document.getElementById('profileAvatar').src = data.avatar_url;
    document.getElementById('headerProfile').href = data.html_url;
    document.getElementById('headerRepos').href = data.html_url + '?tab=repositories';
    document.getElementById('headerFollowers').href = data.html_url + '?tab=followers';

    const responseRepos = await fetch(`https://api.github.com/users/${user}/repos`, {
      method: 'GET',
      headers: {
        Authorization: `token ${my_token}`
      }
    });
    const repos = await responseRepos.json();

    const specificRepos = repos.filter(repo => ['site-pessoal', 'aeds', 'aeds-2'].includes(repo.name));

    specificRepos.forEach(repo => {
      const repoElement = document.createElement('div');
      repoElement.classList.add('card');
      repoElement.innerHTML = `
        <div class="card-body">
          <a class="repo" href="repo.html?owner=${repo.owner.login}&repo=${repo.name}">
            <h1>${repo.name}</h1>
            <p>${repo.description || "Repositório sem descrição"}</p>
            <div class="status">
              <i class="fa-solid fa-star"><span>${repo.stargazers_count}</span></i>
              <i class="fa-solid fa-user"><span>${repo.watchers}</span></i>
            </div>
          </a>
        </div>
      `;
      document.getElementById('repos').appendChild(repoElement);
    });

    document.getElementById('reposTitle').innerHTML = `Repositórios (${specificRepos.length})`;

    const team = document.getElementById('team');
    const colegas = [
      { name: 'alicecazati', image: '/assets/img/alice.jpeg', github: 'https://github.com/alicecazati' },
      { name: 'filipiipereira', image: '/assets/img/filipi.jpeg', github: 'https://github.com/filipiipereira' },
      { name: 'Sofia-0812', image: '/assets/img/sofia.jpeg', github: 'https://github.com/Sofia-0812' },
      { name: 'PaulaNogueiraC', image: '/assets/img/paula.jpeg', github: 'https://github.com/PaulaNogueiraC' }
    ];

    colegas.forEach(colega => {
      const colegaElement = document.createElement('div');
      colegaElement.classList.add('card');
      colegaElement.innerHTML = `
        <div class="card-body">
          <a href=${colega.github} class="person">
            <img src="${colega.image}" alt="Avatar do colega ${colega.name}" class="rounded-circle"/>
            <p>${colega.name}</p>
          </a>
        </div>
      `;
      team.appendChild(colegaElement);
    });

    // Carrossel (carregamento dinâmico)
    const contentCarousel = document.getElementById('contentCarousel');
    const carouselInner = contentCarousel.querySelector('.carousel-inner');

    const contents = [
      { image: 'assets/img/conteudo1.png', title: 'Título 1', description: 'Descrição 1' },
      { image: 'assets/img/conteudo2.png', title: 'Título 2', description: 'Descrição 2' },
      { image: 'assets/img/conteudo3.png', title: 'Título 3', description: 'Descrição 3' },
      { image: 'assets/img/conteudo4.png', title: 'Título 4', description: 'Descrição 4' },
      { image: 'assets/img/conteudo5.png', title: 'Título 5', description: 'Descrição 5' },
    ];

    contents.forEach((content, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
        carouselItem.classList.add('active');
      }
      carouselItem.innerHTML = `
        <img src="${content.image}" class="d-block w-100" alt="Conteúdo ${index + 1}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${content.title}</h5>
          <p>${content.description}</p>
        </div>
      `;
      carouselInner.appendChild(carouselItem);
    });
  } catch (error) {
    console.error("Erro ao carregar informações:", error);
    alert("Erro ao carregar informações. Por favor, tente novamente mais tarde.");
  }
}

window.onload = loadInfos;
