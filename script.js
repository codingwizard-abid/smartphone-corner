
// display button with search 
const displayItem = ()=> {
   let inputField = document.getElementById('search-field');
   let inputFieldValue = inputField.value;

   const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`
   fetch(url)
   .then(res => res.json())
   .then(data => showResultsOnUi(data));
   inputField.value = '';
}

// Show single search result of phone
const singlePhoneDetails = singlePhone =>{
   let url = `https://openapi.programming-hero.com/api/phone/${singlePhone}`;
   fetch(url)
   .then(response => response.json())
   .then(data => console.log(data.data))
}

// show results on ui 
const showResultsOnUi = (phones) => {
   const resultsWrapper = document.getElementById('results-wrapper');
   resultsWrapper.textContent = '';
   const phoneList = phones.data;
   console.log(phoneList);
   if(phones.status){
      // result found remove error
      document.getElementById('error').style.display = 'none';

      // if the result more that 20 
      if(phoneList.length > 20){
         const sliced = phoneList.slice(0,20);
         sliced.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 p-3 rounded-3 shadow-sm">
               <img src="${item.image}" class="card-img-top w-50 mx-auto" alt="${item.phone_name}">
               <div class="card-body  text-center">
                  <h5 class="card-title">Model: ${item.phone_name}</h5>
                  <h6 class="card-title">Brand: ${item.brand}</h6>
               </div>
               <button class="btn btn-dark" onclick="singlePhoneDetails('${item.slug}')">Explore more</button>
            </div>
            `
            resultsWrapper.appendChild(div);
         })
      }else{
         phoneList.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 p-3 rounded-3 shadow-sm">
               <img src="${item.image}" class="card-img-top w-50 mx-auto" alt="${item.phone_name}">
               <div class="card-body  text-center">
                  <h5 class="card-title">Model: ${item.phone_name}</h5>
                  <h6 class="card-title">Brand: ${item.brand}</h6>
               </div>
               <button class="btn btn-dark" onclick="singlePhoneDetails('${item.slug}')">Explore more</button>
            </div>
            `
            resultsWrapper.appendChild(div);
         })
      }
   }else{
      document.getElementById('error').style.display = 'block';
   }
}
