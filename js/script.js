const monstro_name = document.querySelector('.monstro_name');
const monstro_image = document.querySelector('.monstro_img');
const monstro_type = document.querySelector('.monstro_type');
const monstro_elementos = document.querySelector('.monstro_elementos');
const monstro_fraquezas = document.querySelector('.monstro_fraquezas');
const monstro_resistencias = document.querySelector('.monstro_resistencias');
const monstro_habitats = document.querySelector('.monstro_habitats');
const inputMonstro = document.querySelector('#inputMonstro');
const btnPrev = document.querySelector('.btn_prev');
const btnNext = document.querySelector('.btn_next');

// Ícones de elementos
const elementIcons = {
  fire: './images/icons/fire.png',
  water: './images/icons/water.png',
  thunder: './images/icons/thunder.png',
  ice: './images/icons/ice.png',
  dragon: './images/icons/dragon.png',
  poison: './images/icons/poison.png',
  paralysis: './images/icons/paralysis.png',
  blast: './images/icons/blastblight.png',
  sleep: './images/icons/sleep.png',
  stun: './images/icons/stun.png'
};

// Tradução de espécies EN → PT
const speciesTranslation = {
  "fanged wyvern": "Wyvern Presa",
  "flying wyvern": "Wyvern Voador",
  "bird wyvern": "Wyvern Pássaro",
  "brute wyvern": "Wyvern Bruto",
  "piscine wyvern": "Wyvern Aquático",
  "elder dragon": "Dragão Ancião",
  "leviathan": "Leviatã",
  "amphibian": "Anfíbio",
  "fanged beast": "Fera Presa",
  "herbivore": "Herbívoro",
  "tempered monster": "Monstro Temperado",
  "small monster": "Monstro Pequeno",
  "neopteron": "Inseto",
  "wingdrake": "Alado",
  "endemic life": "Vida Endêmica",
  "snake wyvern": "Wyvern Serpente",
  "unknown": "Desconhecido"
};

// Variáveis globais
let allMonsters = [];
let currentIndex = 0;
let monstersLoaded = false;

// Funções de normalização
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizePTName(str) {
    return removeAccents(str)
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}

// Dicionário PT -> EN (mantenha completo)
const nomesPTtoEN = {
    "Glavenus Acido": "Acidic Glavenus",
    "Alatreon": "Alatreon",
    "Leshen Antigo": "Ancient Leshen",
    "Anjanath": "Anjanath",
    "Rathalos Azul": "Azure Rathalos",
    "Banbaro": "Banbaro",
    "Barioth": "Barioth",
    "Barroth": "Barroth",
    "Bazelgeuse": "Bazelgeuse",
    "Behemoth": "Behemoth",
    "Beotodus": "Beotodus",
    "Diablos Negro": "Black Diablos",
    "Vaal Hazak Velado": "Blackveil Vaal Hazak",
    "Brachydios": "Brachydios",
    "Tigrex Bruto": "Brute Tigrex",
    "Pukei Pukei Coralino": "Coral Pukei-Pukei",
    "Deviljho": "Deviljho",
    "Diablos": "Diablos",
    "Dodogama": "Dodogama",
    "Odogaron Negro": "Ebony Odogaron",
    "Fatalis": "Fatalis",
    "Barioth Presa Gelida": "Frostfang Barioth",
    "Anjanath Fulgurante": "Fulgur Anjanath",
    "Rajang Furioso": "Furious Rajang",
    "Glavenus": "Glavenus",
    "Rathian Dourada": "Gold Rathian",
    "Grande Girros": "Great Girros",
    "Grande Jagras": "Great Jagras",
    "Jyuratodus": "Jyuratodus",
    "Kirin": "Kirin",
    "Kulu Ya-Ku": "Kulu-Ya-Ku",
    "Kulve Taroth": "Kulve Taroth",
    "Kushala Daora": "Kushala Daora",
    "Lavasioth": "Lavasioth",
    "Legiana": "Legiana",
    "Leshen": "Leshen",
    "Lunastra": "Lunastra",
    "Namielle": "Namielle",
    "Nargacuga": "Nargacuga",
    "Nergigante": "Nergigante",
    "Paolumu Beladona": "Nightshade Paolumu",
    "Odogaron": "Odogaron",
    "Paolumu": "Paolumu",
    "Rathian Rosa": "Pink Rathian",
    "Pukei Pukei": "Pukei-Pukei",
    "Radobaan": "Radobaan",
    "Brachydios Colerico": "Raging Brachydios",
    "Rajang": "Rajang",
    "Rathalos": "Rathalos",
    "Rathian": "Rathian",
    "Nergigante Ferrenho": "Ruiner Nergigante",
    "Safi'jiiva": "Safi'jiiva",
    "Deviljho Selvagem": "Savage Deviljho",
    "Yian Garuga Cicatrizado": "Scarred Yian Garuga",
    "Bazelgeuse Vulcanico": "Seething Bazelgeuse",
    "Shara Ishvalda": "Shara Ishvalda",
    "Legiana Estridente": "Shrieking Legiana",
    "Rathalos Prateado": "Silver Rathalos",
    "Zinogre Tenebroso": "Stygian Zinogre",
    "Teostra": "Teostra",
    "Tigrex": "Tigrex",
    "Tobi Kadachi": "Tobi-Kadachi",
    "Tzitzi-Ya-Ku": "Tzitzi-Ya-Ku",
    "Uragaan": "Uragaan",
    "Vaal Hazak": "Vaal Hazak",
    "Velkhana": "Velkhana",
    "Tobi Kadachi Vipero": "Viper Tobi-Kadachi",
    "Xeno'jiiva": "Xeno'jiiva",
    "Yian Garuga": "Yian Garuga",
    "Zinogre": "Zinogre",
    "Zorah Magdaros": "Zorah Magdaros"
};

const nomesPTNormalizados = Object.entries(nomesPTtoEN).reduce((acc, [nomePT, nomeEN]) => {
    acc[normalizePTName(nomePT)] = { nomePT, nomeEN };
    return acc;
}, {});

// Carregar todos os monstros ao iniciar
const fetchAllMonsters = async () => {
    try {
        const response = await fetch('./data/monsters.json'); // JSON local
        allMonsters = await response.json();
        monstersLoaded = true;
        console.log('Monstros carregados:', allMonsters.length);
    } catch (err) {
        console.error('Erro ao carregar monstros:', err);
    }
};

function getMonsterImageFileName(monsterName) {
    // Corrige nomes para seguir o padrão MHWI-Name_Icon.png
    const safeName = monsterName
        .replace(/\s+/g, '_')      // espaço -> _
        .replace(/'/g, '')         // remove apóstrofos
        .replace(/-+/g, '-')       // mantém hífen único
        .replace(/[^\w\-]/g, '');  // remove caracteres inválidos
    return `./images/monstros/MHWI-${safeName}_Icon.png`;
}

const setSectionLabel = (element, label) => {
    element.innerHTML = '';
    const labelStrong = document.createElement('strong');
    labelStrong.textContent = `${label}:`;
    element.appendChild(labelStrong);
    element.appendChild(document.createTextNode(' '));
};


fetchAllMonsters();

// Função para renderizar monstro
const renderMonster = (monsterEN, nomePT) => {
  if (!monstersLoaded) {
    alert("Aguarde o carregamento dos monstros...");
    return;
  }

  const monster = allMonsters.find(m => m.name.toLowerCase() === monsterEN.toLowerCase());
  const monstroInfo = document.querySelector('.monstro_info'); // ← adicione isso aqui

  if (monster) {
    currentIndex = allMonsters.indexOf(monster);
    monstro_name.textContent = nomePT;
    const especieEN = (monster.species || "unknown").toLowerCase();
    const especiePT = speciesTranslation[especieEN] || especieEN;
    monstro_type.textContent = especiePT;
    // Atualizar descrição (div separada)
    const monstro_description = document.querySelector('.monstro_description');
    if (monstro_description) {
      // limpa antes de atualizar
      monstro_description.textContent = '';
      monstro_description.textContent = monster.description || 'Descrição indisponível.';
    }

    monstro_image.src = getMonsterImageFileName(monster.name);
    monstro_image.alt = nomePT;

    // elementos, fraquezas, resistências, habitats, descrição...
    setSectionLabel(monstro_elementos, 'Elementos');
    if (Array.isArray(monster.elements) && monster.elements.length) {
      monster.elements.forEach(el => {
        const elementKey = typeof el === 'string' ? el.toLowerCase() : '';
        const img = document.createElement('img');
        img.src = elementIcons[elementKey] || '';
        img.alt = el;
        img.title = el; // tooltip ao passar o mouse

        const item = document.createElement('span');
        item.classList.add('stat_item');
        item.appendChild(img);
        monstro_elementos.appendChild(item);
      });
    } else {
      monstro_elementos.appendChild(document.createTextNode('Nenhum Elemento'));
    }

    setSectionLabel(monstro_fraquezas, 'Fraquezas');
    if (Array.isArray(monster.weaknesses) && monster.weaknesses.length) {
      monster.weaknesses.forEach(w => {
        const elementName = typeof w.element === 'string' ? w.element : '';
        const starsText = w.stars !== undefined && w.stars !== null && w.stars !== '' ? `${w.stars}★` : '';
        const img = document.createElement('img');
        img.src = elementIcons[elementName.toLowerCase()] || '';
        const displayName = elementName || 'Fraqueza';
        img.alt = starsText ? `${displayName} (${starsText})` : displayName;
        img.title = img.alt;

        const item = document.createElement('span');
        item.classList.add('stat_item');
        item.appendChild(img);

        if (starsText) {
          const starsSpan = document.createElement('span');
          starsSpan.classList.add('weakness_stars');
          starsSpan.textContent = starsText;
          item.appendChild(starsSpan);
        }

        monstro_fraquezas.appendChild(item);
      });
    } else {
      monstro_fraquezas.appendChild(document.createTextNode('Nenhuma Fraqueza'));
    }

    setSectionLabel(monstro_resistencias, 'Resistências');
    if (Array.isArray(monster.resistances) && monster.resistances.length) {
      monster.resistances.forEach(r => {
        const elementName = typeof r.element === 'string' ? r.element : '';
        const img = document.createElement('img');
        img.src = elementIcons[elementName.toLowerCase()] || '';
        const displayName = elementName || 'Resistência';
        img.alt = displayName;
        img.title = displayName;

        const item = document.createElement('span');
        item.classList.add('stat_item');
        item.appendChild(img);
        monstro_resistencias.appendChild(item);
      });
    } else {
      monstro_resistencias.appendChild(document.createTextNode('Nenhuma Resistência'));
    }

    monstro_habitats.textContent = monster.locations?.length
      ? `Habitat: ${monster.locations.map(h => h.name).join(", ")}`
      : "Habitat: Desconhecido";

    monstro_description.textContent = monster.description
      ? `Descrição: ${monster.description}`
      : "Descrição: Indisponível.";


    // ✅ mostra a div quando o monstro for encontrado
    monstroInfo.classList.add('visible');

  } else {
    // caso não encontre, ainda pode mostrar uma mensagem
    monstro_name.textContent = 'Monstro não encontrado';
    monstro_type.textContent = '';
    monstro_image.src = './images/interrogacao.png';
    monstro_image.alt = 'Bestiário';
    monstro_elementos.textContent = 'Elementos: -';
    monstro_fraquezas.textContent = 'Fraquezas: -';
    monstro_resistencias.textContent = 'Resistências: -';
    monstro_habitats.textContent = '';

    // ✅ mostra a div também, mas com erro (opcional)
    monstroInfo.classList.add('visible');
  }
};

// Evento de busca
document.querySelector('.form_search').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!monstersLoaded) return alert("Aguarde o carregamento dos monstros...");

    const inputUsuario = inputMonstro.value.trim();
    const chaveNormalizada = normalizePTName(inputUsuario);

    const resultado = nomesPTNormalizados[chaveNormalizada];
    if (!resultado) {
        monstro_name.textContent = 'Monstro desconhecido';
        monstro_image.src = './images/interrogacao.png';
        monstro_image.alt = 'Bestiário';
        return;
    }

    renderMonster(resultado.nomeEN, resultado.nomePT);
});

// Navegação com botões
btnPrev.addEventListener('click', () => {
    if (!monstersLoaded) return alert("Aguarde o carregamento dos monstros...");
    if (allMonsters.length === 0) return;

    currentIndex = (currentIndex - 1 + allMonsters.length) % allMonsters.length;
    const monster = allMonsters[currentIndex];
    const nomePT = Object.values(nomesPTNormalizados).find(m => m.nomeEN.toLowerCase() === monster.name.toLowerCase())?.nomePT || monster.name;
    renderMonster(monster.name, nomePT);
});

btnNext.addEventListener('click', () => {
    if (!monstersLoaded) return alert("Aguarde o carregamento dos monstros...");
    if (allMonsters.length === 0) return;

    currentIndex = (currentIndex + 1) % allMonsters.length;
    const monster = allMonsters[currentIndex];
    const nomePT = Object.values(nomesPTNormalizados).find(m => m.nomeEN.toLowerCase() === monster.name.toLowerCase())?.nomePT || monster.name;
    renderMonster(monster.name, nomePT);
});

// Esconde a div se apagar o texto
inputMonstro.addEventListener('input', () => {
  const monstroInfo = document.querySelector('.monstro_info');
  if (inputMonstro.value.trim() === '') {
    monstroInfo.classList.remove('visible');
  }
}); 
