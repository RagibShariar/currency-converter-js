const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown-container select");
const btn = document.querySelector("#btn");
const inputField = document.querySelector(".amount input");
const msgText = document.querySelector(".msg p")
const updatedDate = document.querySelector(".msg span")

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// for (country in countryList){
//   console.log(countryList[country]);
// }

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerText = currCode;
    newOptions.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOptions.selected = "selected";
    } else if (select.name === "to" && currCode === "BDT") {
      newOptions.selected = "selected";
    }

    select.append(newOptions);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (elem) => {
  let currCode = elem.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = elem.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = inputField.value;

  // console.log(amount);
  if (amount === "" || amount < 1) {
    amount = 1;
    inputField.value = "1";
  }
  
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
  const res = await fetch(URL)
  const data = await res.json();
  const exChangeRate = data[toCurr.value.toLowerCase()];
  // console.log(data);

  let totalAmount = (amount * exChangeRate).toFixed(2);
  msgText.innerText = `${amount} ${fromCurr.value} = ${totalAmount} ${toCurr.value}`
  updatedDate.innerHTML = `Updated at: ${data.date}`;

});
