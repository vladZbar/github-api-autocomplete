const script = document.querySelector("script");

const body = document.querySelector("body");
body.style.display = "flex";
body.style.alignItems = "center";
body.style.justifyContent = "center";

const container = document.createElement("div");
container.style.width = "763px";
container.style.height = "661px";
container.style.background = "rgb(135 135 135)";
container.style.boxSizing = "border-box";
container.style.padding = "100px";
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";

body.insertBefore(container, script);

let input = document.createElement("input");
input.style.width = "100%";
input.style.height = "30px";
input.style.fontSize = "20px";
input.style.fontFamily =
  "Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif";
input.style.paddingLeft = '10px';
input.style.boxSizing = 'border-box'
container.appendChild(input);

const compliteContainer = document.createElement("div");
compliteContainer.style.width = "100%";
compliteContainer.style.fontFamily =
  "Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif";
compliteContainer.style.padding = '0'
container.appendChild(compliteContainer);

let oneOptions = document.createElement("div");
oneOptions.style.height = "30px";
oneOptions.style.background = "rgb(162 162 162)";
oneOptions.style.border = "1px solid #000";
oneOptions.style.display = "flex";
oneOptions.style.alignItems = "center";
oneOptions.style.fontSize = "17px";
oneOptions.style.fontFamily = "Lucida Sans'";
oneOptions.style.paddingLeft = '10px'

let twoOptions = document.createElement("div");
twoOptions.style.height = "30px";
twoOptions.style.background = "rgb(162 162 162)";
twoOptions.style.border = "1px solid #000";
twoOptions.style.display = "flex";
twoOptions.style.alignItems = "center";
twoOptions.style.fontSize = "17px";
twoOptions.style.fontFamily = "Lucida Sans'";
twoOptions.style.paddingLeft = '10px'

let threeOptions = document.createElement("div");
threeOptions.style.height = "30px";
threeOptions.style.background = "rgb(162 162 162)";
threeOptions.style.border = "1px solid #000";
threeOptions.style.display = "flex";
threeOptions.style.alignItems = "center";
threeOptions.style.fontSize = "17px";
threeOptions.style.fontFamily = "Lucida Sans'";
threeOptions.style.paddingLeft = '10px'

let fourOptions = document.createElement("div");
fourOptions.style.height = "30px";
fourOptions.style.background = "rgb(162 162 162)";
fourOptions.style.border = "1px solid #000";
fourOptions.style.display = "flex";
fourOptions.style.alignItems = "center";
fourOptions.style.fontSize = "17px";
fourOptions.style.fontFamily = "Lucida Sans'";
fourOptions.style.paddingLeft = '10px'

let fiveOptions = document.createElement("div");
fiveOptions.style.height = "30px";
fiveOptions.style.background = "rgb(162 162 162)";
fiveOptions.style.border = "1px solid #000";
fiveOptions.style.display = "flex";
fiveOptions.style.alignItems = "center";
fiveOptions.style.fontSize = "17px";
fiveOptions.style.fontFamily = "Lucida Sans'";
fiveOptions.style.paddingLeft = '10px'

compliteContainer.appendChild(oneOptions);
compliteContainer.appendChild(twoOptions);
compliteContainer.appendChild(threeOptions);
compliteContainer.appendChild(fourOptions);
compliteContainer.appendChild(fiveOptions);

compliteContainer.style.display = "none";
compliteContainer.style.marginBottom = "50px";

const repoContainer = document.createElement("div");
repoContainer.style.width = "100%";
repoContainer.style.display = "flex";
repoContainer.style.flexDirection = "column";
repoContainer.style.marginTop = "20px";

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

input.addEventListener(
  "input",
  debounce(function () {
    let repoName = input.value.trim();

    if (repoName.length === 0) {
      compliteContainer.style.display = "none";
      oneOptions.innerHTML = "";
      twoOptions.innerHTML = "";
      threeOptions.innerHTML = "";
      fourOptions.innerHTML = "";
      fiveOptions.innerHTML = "";
      return;
    }

    if (repoName.length > 0) {
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

          oneOptions.onclick = null;
          twoOptions.onclick = null;
          threeOptions.onclick = null;
          fourOptions.onclick = null;
          fiveOptions.onclick = null;

          oneOptions.onclick = () => handleClick(arr[0]);
          twoOptions.onclick = () => handleClick(arr[1]);
          threeOptions.onclick = () => handleClick(arr[2]);
          fourOptions.onclick = () => handleClick(arr[3]);
          fiveOptions.onclick = () => handleClick(arr[4]);

          const options = [
            oneOptions,
            twoOptions,
            threeOptions,
            fourOptions,
            fiveOptions,
          ];
          options.forEach((option) => {
            option.addEventListener("mouseover", () =>
              changeColorOnHover(option, "lightblue")
            ); 
            option.addEventListener("mouseout", () => resetColor(option)); 
          });
        })
        .catch((err) => {
          oneOptions.innerHTML = "";
          twoOptions.innerHTML = "";
          threeOptions.innerHTML = "";
          fourOptions.innerHTML = "";
          fiveOptions.innerHTML = "";
        });
    }
  }),
  700
);

function handleClick(repoObj) {
  if (!repoObj) return;
  input.value = "";
  compliteContainer.style.display = "none";

  const existingRepos = Array.from(repoContainer.children).map(
    (child) => child.innerHTML
  );
  if (!existingRepos.includes(repoObj.name)) {
    let repo = document.createElement("div");
    repo.style.maxWidth = "100%";
    repo.style.height = "55px";
    repo.style.background = "rgb(255 125 246)";
    repo.style.border = "1px solid black";
    repo.style.display = "flex";
    repo.style.justifyContent = "space-between";
    repo.style.alignItems = "center";
    repo.style.padding = "10px";

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

    const closeContainer = document.createElement("div");
    closeContainer.style.width = "50px";
    closeContainer.style.height = "100%";
    closeContainer.style.display = "flex";
    closeContainer.style.justifyContent = "center";

    let segmentRight = document.createElement("div");
    segmentRight.style.width = "2px";
    segmentRight.style.height = "100%";
    segmentRight.style.background = "red";
    segmentRight.style.transform = "rotate(45deg)";

    let segmentLeft = document.createElement("div");
    segmentLeft.style.width = "2px";
    segmentLeft.style.height = "100%";
    segmentLeft.style.background = "red";
    segmentLeft.style.transform = "rotate(-45deg)";

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
  element.style.backgroundColor = "rgb(162 162 162)";
}
