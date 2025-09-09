const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url); // request
    const data = await response.json(); // parse the JSON data
    //   console.table(data.prophets); // temp output test of data response 
    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let dateBirth = document.createElement('p');
        let placeBirth = document.createElement('p');
        let portrait = document.createElement('img');

        // Build the h2 content out to show the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`; // fill in the blank
        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // fill in the blank
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        //Build the date and place of Birht
        dateBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
        placeBirth.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Append the section(card) with the created elements
        card.appendChild(fullName); //fill in the blank
        card.appendChild(dateBirth);
        card.appendChild(placeBirth);
        card.appendChild(portrait);


        cards.appendChild(card);
    }); // end of arrow function and forEach loop
}

getProphetData();