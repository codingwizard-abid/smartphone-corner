
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
         <h5><b>Brand:</b> ${phone.brand}</h5>
         <p class="card-text"> <b>Release Date:</b> ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
         <h4 class="fw-bold">Main Features</h4>
         <table class="table table-bordered">
            <tbody class="text-start">
               <tr>
                  <th>Chipset:</th>
                  <td>${mainFeatures.chipSet}</td>
               </tr>
               <tr>
                  <th>Display size</th>
                  <td>${mainFeatures.displaySize}</td>
               </tr>
               <tr>
                  <th>Sensors</th>
                  <td>${mainFeatures.sensors[0]}, ${mainFeatures.sensors[1]},${mainFeatures.sensors[3] == undefined ? " " : mainFeatures.sensors[3]},${mainFeatures.sensors[4] == undefined ? " " : mainFeatures.sensors[4]}</td>
               </tr>
               <tr>
                  <th>Memory</th>
                  <td>${mainFeatures.memory}</td>
               </tr>
            </tbody>
         </table>
      </div>
   `
   singleDetailsBox.appendChild(div);
   if(otherFeatures){
      let othersFeatureDiv = document.createElement('div');
      othersFeatureDiv.classList.add('p-3');
      othersFeatureDiv.innerHTML = `
         <h4 class="fw-bold text-center">Others Features</h4>
         <table class="table table-bordered">
            <tbody class="text-start">
               <tr>
                  <th>Bluetooth:</th>
                  <td>${otherFeatures.Bluetooth}</td>
               </tr>
               <tr>
                  <th>GPS:</th>
                  <td>${otherFeatures.GPS}</td>
               </tr>
               <tr>
                  <th>NFC:</th>
                  <td>${otherFeatures.NFC}</td>
               </tr>
               <tr>
                  <th>Radio:</th>
                  <td>${otherFeatures.Radio}</td>
               </tr>
               <tr>
                  <th>USB:</th>
                  <td>${otherFeatures.USB}</td>
               </tr>
               <tr>
                  <th>WLAN:</th>
                  <td>${otherFeatures.WLAN}</td>
               </tr>
            </tbody>
         </table>
      `
      div.appendChild(othersFeatureDiv);
   }
   
}

// Show single search result of phone
const singlePhoneDetails = singlePhone =>{
   let url = `https://openapi.programming-hero.com/api/phone/${singlePhone}`;
   fetch(url)
   .then(response => response.json())
   .then(data => singlePhoneShowOnUi(data.data))
}