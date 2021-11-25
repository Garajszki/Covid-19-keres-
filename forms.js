import { loadData } from "./covid-19";

export const initform =() => {
    const form =document.getElementById('form');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.getElementById('submit');
    const datePicker = document.getElementById('date');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    loadData();
    const cardsContainer = document.getElementById('cards-container');
    datePicker.max = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    form.addEventListener('submit', async e =>{
        const country = document.getElementById('select').value;
        const date = document.getElementById('date').value;
        cardsContainer.insertAdjacentHTML('afterbegin', `<div id="loading-indicator" class="loader"></div>`);
        e.preventDefault();
        submitButton.disabled = true;
       
        try {
         const covidData = await loadData(country, date);
            form.reset();
        } catch {
            errorMessage.style.display = 'block';
            setTimeout(() => errorMessage.style.display = 'none', 2000);
        }
        submitButton.disabled = false;
        cardsContainer.removeChild(document.getElementById('loading-indicator'))
        });
    }
 