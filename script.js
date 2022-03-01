
// display button with search 
const displayItem = ()=> {
   let inputField = document.getElementById('search-field');
   let inputFieldValue = inputField.value.toLowerCase();

   const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`
   fetch(url)
   .then(res => res.json())
   .then(data => showResultsOnUi(data));
   inputField.value = '';
}

// show results on ui 
const showResultsOnUi = (phones) => {
   const resultsWrapper = document.getElementById('results-wrapper');
   resultsWrapper.textContent = '';
   const singleDetailsBox = document.getElementById('singleDetails');
   singleDetailsBox.textContent = '';
   const phoneList = phones.data;

   // if result is available
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

// Show single search result of phone
const singlePhoneDetails = singlePhone =>{
   let url = `https://openapi.programming-hero.com/api/phone/${singlePhone}`;
   fetch(url)
   .then(response => response.json())
   .then(data => singlePhoneShowOnUi(data.data))
}

// single phone details show on ui
const singlePhoneShowOnUi = phone => {
   const singleDetailsBox = document.getElementById('singleDetails');
   singleDetailsBox.textContent = '';
   console.log(phone);
   const mainFeatures = phone.mainFeatures;
   // others features
   const otherFeatures = phone.others;
   console.log(otherFeatures);
   const div = document.createElement('div');
   div.classList.add('card');
   div.classList.add('p-3');
   div.classList.add('shadow-lg');
   div.innerHTML = `
      <h5 class="text-center my-3 pb-4">Full Details</h5>
      <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="">
      <div class="card-body text-center">
         <h5><b>Model:</b> ${phone.name}</h5>
         <p class="card-text"> <b>Release Date:</b> ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
         <h5><b>Brand:</b> ${phone.brand}</h5>
         <h4 class="fw-bold">Main Features</h4>
            <ul class="list-group list-group-flush text-start">
               <li class="list-group-item"><b>Chipset:</b> ${mainFeatures.chipSet ? mainFeatures.chipSet : "not mentioned"}</li>
               <li class="list-group-item"><b>Display size:</b> ${mainFeatures.displaySize}</li>
               <li class="list-group-item"><b>Memory:</b> ${mainFeatures.memory}</li>
               <li class="list-group-item"><b>Sensors:</b> ${mainFeatures.sensors[0]}, ${mainFeatures.sensors[1]},${mainFeatures.sensors[3] == undefined ? " " : mainFeatures.sensors[3]},${mainFeatures.sensors[4] == undefined ? " " : mainFeatures.sensors[4]}</li>
            </ul>
         </div>
   `
   singleDetailsBox.appendChild(div);
   if(otherFeatures){
      let othersFeatureDiv = document.createElement('div');
      othersFeatureDiv.classList.add('p-3');
      othersFeatureDiv.innerHTML = `
         <h4 class="fw-bold text-center">Others Features</h4>
         <ul class="list-group list-group-flush text-start">
            <li class="list-group-item"><b>Bluetooth:</b> ${otherFeatures.Bluetooth}</li>
            <li class="list-group-item"><b>GPS:</b> ${otherFeatures.GPS}</li>
            <li class="list-group-item"><b>NFC:</b> ${otherFeatures.NFC}</li>
            <li class="list-group-item"><b>Radio:</b> ${otherFeatures.Radio}</li>
            <li class="list-group-item"><b>USB:</b> ${otherFeatures.USB}</li>
            <li class="list-group-item"><b>WLAN:</b> ${otherFeatures.WLAN}</li>
         </ul>
      `
      div.appendChild(othersFeatureDiv);
   }
   
}