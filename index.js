const script = document.querySelector("script");

const body = document.querySelector("body");

const container = document.createElement("div");
container.classList.add('container')
body.insertBefore(container, script);

let input = document.createElement("input");
input.classList.add('input')
container.appendChild(input);


const compliteContainer = document.createElement("div");
compliteContainer.classList.add('compliteContainer')
container.appendChild(compliteContainer);

let oneOptions = document.createElement("div");
let twoOptions = document.createElement("div");
let threeOptions = document.createElement("div");
let fourOptions = document.createElement("div");
let fiveOptions = document.createElement("div");

oneOptions.classList.add('options')
twoOptions.classList.add('options')
threeOptions.classList.add('options')
fourOptions.classList.add('options')
fiveOptions.classList.add('options')

compliteContainer.appendChild(oneOptions);
compliteContainer.appendChild(twoOptions);
compliteContainer.appendChild(threeOptions);
compliteContainer.appendChild(fourOptions);
compliteContainer.appendChild(fiveOptions);

const repoContainer = document.createElement("div");
repoContainer.classList.add('repoContainer')
container.appendChild(repoContainer);

let clickHandlerAdded = false;

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

function fetchRepositories(repoName) {
  const token = "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";
  return fetch(
    `https://api.github.com/search/repositories?q=${repoName}&per_page=5`,
    {
      headers: {
        // Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => data.items);
}


const debouncedFetch = debounce(function () {
  const repoName = input.value.trim();

  if (repoName.length === 0) {
    compliteContainer.style.display = "none";
    oneOptions.innerHTML = "";
    twoOptions.innerHTML = "";
    threeOptions.innerHTML = "";
    fourOptions.innerHTML = "";
    fiveOptions.innerHTML = "";
    return;
  }

  compliteContainer.style.display = "block";
  oneOptions.innerHTML = "...";
  twoOptions.innerHTML = "...";
  threeOptions.innerHTML = "...";
  fourOptions.innerHTML = "...";
  fiveOptions.innerHTML = "...";

  fetchRepositories(repoName)
    .then((arr) => {
      oneOptions.innerHTML = arr[0] ? arr[0].name : "";
      twoOptions.innerHTML = arr[1] ? arr[1].name : "";
      threeOptions.innerHTML = arr[2] ? arr[2].name : "";
      fourOptions.innerHTML = arr[3] ? arr[3].name : "";
      fiveOptions.innerHTML = arr[4] ? arr[4].name : "";

      [oneOptions, twoOptions, threeOptions, fourOptions, fiveOptions].forEach((option, index) => {
        option.onclick = () => handleClick(arr[index]);
        option.addEventListener("mouseover", () => changeColorOnHover(option, "black"));
        option.addEventListener("mouseout", () => resetColor(option));
      });
    })
    .catch((err) => {
      console.error(err);
      oneOptions.innerHTML = "";
      twoOptions.innerHTML = "";
      threeOptions.innerHTML = "";
      fourOptions.innerHTML = "";
      fiveOptions.innerHTML = "";
    });
}, 700); 

input.addEventListener("input", debouncedFetch)


function handleClick(repoObj) {
  if (!repoObj) return;
  input.value = "";
  compliteContainer.style.display = "none";

  const existingRepos = Array.from(repoContainer.children).map(
    (child) => child.innerHTML
  );
  if (!existingRepos.includes(repoObj.name)) {
    let repo = document.createElement("div");
    repo.classList.add('repo')

    let nameText = repoObj.name;
    let ownerText = repoObj.owner.login;
    let starsText = repoObj.stargazers_count;

    const textContainer = document.createElement("div");

    let name = document.createElement("div");
    let owner = document.createElement("div");
    let stars = document.createElement("div");

    name.innerHTML = `Name: ${nameText}`;
    owner.innerHTML = `Owner: ${ownerText}`;
    stars.innerHTML = `Stars: ${starsText}`;

    const closeContainer = document.createElement("button");
    closeContainer.classList.add('closeContainer')

    let segmentRight = document.createElement("div");
    segmentRight.classList.add('segment')
    segmentRight.classList.add('segment--right')

    let segmentLeft = document.createElement("div");
    segmentLeft.classList.add('segment')
    segmentLeft.classList.add('segment--left')

    closeContainer.appendChild(segmentRight);
    closeContainer.appendChild(segmentLeft);

    repoContainer.appendChild(repo);
    repo.appendChild(textContainer);
    repo.appendChild(closeContainer);

    textContainer.appendChild(name);
    textContainer.appendChild(owner);
    textContainer.appendChild(stars);

    closeContainer.addEventListener("click", () => repo.remove());

    console.log(repoObj);
  }
}

function changeColorOnHover(element, color) {
  element.style.backgroundColor = color;
}

function resetColor(element) {
  element.style.backgroundColor = "#232222";
}


