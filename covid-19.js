export const loadData = async (country = null ,date = null) =>{
    try {
        const woeid = await getwoeid(country, date);
        var select = document.getElementById('select');
        if(select.innerHTML.length == 0){
            const countries = Object.keys(woeid);  
            for(var i = 0; i < countries.length; i++){
                var option = document.createElement('option');
                option.setAttribute('value', countries[i]);
                option.innerHTML = countries[i];
                select.appendChild(option);
            }
        }
    }catch (e) {
                console.error('Error loading covid data', e);
                throw e;
        }
    }
    
const getwoeid  = async (countries, date) =>{
    if(date == null){
        const response = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${countries}`);
        if (response.status !== 200) {
            throw  'Error loading WOEID';
        }
        const jsonResponse = await response.json();
        return jsonResponse; 
    }else{
        const response = await fetch(`https://covid-api.mmediagroup.fr/v1/history?country=${countries}&status=deaths`);
        const vaccineResponse = await fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${countries}`);
        const jsonResponse = await response.json();
        const jsonVaccineResponse = await vaccineResponse.json();
        console.log(jsonVaccineResponse.All.people_vaccinated);
        addCard(jsonResponse.All.country, date, jsonResponse.All.dates[date],jsonVaccineResponse.All.people_vaccinated);
    }
}  

const addCard = (country, date, deathNr,vaccinated) => {
    const container = document.getElementById('cards-container');
    container.insertAdjacentHTML('afterbegin', `
        <zizi-card title="">
            <div class="card-content">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFoGZ2TupbSBMFAVqfeY8Dzi17MIsiN2cFQA&usqp=CAU" alt="">
                <div>${date}</div>
                <div>${country}</div>
                <div>Halottak Száma:    ${deathNr}  Fő</div>
                <div>Oltottak Száma:    ${vaccinated}  Fő</div>
            </div>
        </zizi-card>
    `)
}
