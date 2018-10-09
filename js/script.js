/** Class representing an employee. */
class Employee
{
    constructor(id, image, name, email, mobile, address, birthday)
    {
      this.id = id;
      this.image = image;
      this.name = name;
      this.email = email;
      this.mobile = mobile;
      this.address = address;
      this.birthday = birthday;
    }
}

/**
 * Helper function. Changes the case of the passed string to title case.
 * @param   {String}   sentence - String to be edited.
 * @return  {String}   Edited string.
 */
function titleCase(sentence)
{
  sentence = sentence.toLowerCase().split(' ');
  for (var i = 0; i < sentence.length; i++)
    sentence[i] = sentence[i].charAt(0).toUpperCase() + sentence[i].slice(1);
  return sentence.join(' ');
}

/**
 * Retrieves employee data from https://randomuser.me.
 * @return   {Array}   employeeData - An array of employee objects.
 */
const getEmployeeData = new Promise(resolve =>
{
    const url = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob&nat=us';
    const callback = responseJsonArray =>
    {
      const employeeData = responseJsonArray.results;
      resolve(employeeData);
    };
    $.get(url, callback);
});

/**
 * Edits the received data into a more legible format.
 * @param   {Array}    employeeData - Data to be formatted.
 * @return  {Array}    employees - An array of Employee instances.
 */
const formatEmployeeData = employeeData =>
{
  const formatPhoneNumber = phoneNumber =>
  {
    phoneFormat = '';
    phoneNumber.split('').forEach(digit =>
    {
      if(Number(digit))
        phoneFormat += digit;
    });

    return (phoneFormat.length >= 10) ?
      `(${phoneFormat.substring(0,3)}) ${phoneFormat.substring(3,6)}-${phoneFormat.substring(6,10)}`:
      `(${ Math.floor(Math.random() * (1000))}) ${phoneFormat.substring(0,3)}-${phoneFormat.substring(3,7)}`;
  }

  let id = 1;
  const employees = [];
  employeeData
    .map(data => [data])
    .forEach(data =>
    {
      data =
      data.map(data =>
      {
        data.picture = data.picture.large;
        data.name = {first: titleCase(data.name.first), last: titleCase(data.name.last)};
        data.location = {street: `${titleCase(data.location.street)}`, city: `${titleCase(data.location.city)}`, state: `${titleCase(data.location.state)}`, zip: `${data.location.postcode}`};
        data.cell = formatPhoneNumber(data.cell);
        data.dob.date = `${data.dob.date.substring(5,7)}/${data.dob.date.substring(8,10)}/${data.dob.date.substring(0,4)}`;
        return data;
      })
      .reduce((employee, data) => new Employee(`emp${id}`, data.picture, data.name, data.email, data.cell, data.location, data.dob.date),"");
      employees.push(data);
      id += 1;
    });

  return employees;
}

/**
 * Appends the employees to the web page.
 * @param   {Array}   employees - Data to be displayed.
 * @return  {Array}   employees.
 */
const displayEmployees = employees =>
{
  const appendEmployee = employee =>
  {
    const employeeCard = document.createElement('DIV');
    employeeCard.id = `${employee.id}`;
    employeeCard.className = 'card';
    employeeCard.innerHTML =
    `<div id="${employee.id}" class="card-img-container">
        <img  id="${employee.id}" class="card-img" src="${employee.image}" alt="profile picture">
    </div>
    <div  id="${employee.id}" class="card-info-container">
        <h3 id="${employee.id}" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p id="${employee.id}" class="card-text">${employee.email}</p>
        <p id="${employee.id}" class="card-text cap">${employee.address.city}, ${employee.address.state}</p>
    </div>`;

    const galleryDiv = document.querySelector('#gallery');
    galleryDiv.appendChild(employeeCard);
  }

  employees.forEach(employee => appendEmployee(employee));
  return employees;
}

/**
 * Creates modal windows that pop up when the employee cards are clicked.
 * @param   {Array}   employees - Data to be displayed.
 * @return  {Array}   employees.
 */
const createModalWindows = employees =>
{
  const makeWindow = employeeId =>
  {
    //select employee from array using employee id
    const selectEmployee = (employeeId) =>
    {
      let selectedEmployee = {};
      employees.forEach(employee =>
      {
        if (employee.id === employeeId)
          selectedEmployee = employee;
      });
      return selectedEmployee;
    }

    //make modal window for the selected employee
    const employee = selectEmployee(employeeId);
    const modalContainer = document.createElement('DIV');
    modalContainer.className = 'modal-container';
    modalContainer.innerHTML =
       `<div class="modal">
           <button type="button" id="modal-close-btn" class="modal-close-btn">X</button>
           <div class="modal-info-container">
               <img class="modal-img" src="${employee.image}" alt="profile picture">
               <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
               <p class="modal-text">${employee.email}</p>
               <p class="modal-text cap">${employee.address.city}</p>
               <hr>
               <p class="modal-text">${employee.mobile}</p>
               <p class="modal-text">${employee.address.street}, ${employee.address.city}, ${employee.address.state} ${employee.address.zip}</p>
               <p class="modal-text">Birthday: ${employee.birthday}</p>
           </div>
       </div>

       <div class="modal-btn-container">
           <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
           <button type="button" id="modal-next" class="modal-next btn">Next</button>
       </div>`;
    document.querySelector('body').appendChild(modalContainer);

    //add button events
    modalContainer.addEventListener('click', (event) =>
    {
      if(event.target.tagName === 'BUTTON')
      {
        if((event.target.id ==="modal-close-btn") || (event.target.textContent === 'X'))
          document.querySelector('body').removeChild(modalContainer);

        else if((event.target.id ==="modal-prev"))
        {
          document.querySelector('body').removeChild(modalContainer);
          let id = null;
          employeeId === 'emp1'? id = 12 : id = Number(employeeId.substring(3,5)) - 1;
          return makeWindow(`emp${id}`);
        }

        else if((event.target.id ==="modal-next"))
        {
          document.querySelector('body').removeChild(modalContainer);
          let id = null;
          employeeId === 'emp12'? id = 1 : id = Number(employeeId.substring(3,5)) + 1;
          return makeWindow(`emp${id}`);
        }
      }
    });
  }

    document.querySelector('#gallery').addEventListener('click', (event)=>
    {
      if (event.target.id.includes('emp'))
        makeWindow(event.target.id);
    });

    return {emp: employees, function: makeWindow};
}

/**
 * Creates and enables search bar.
 * @param   {Object}   data - Contains the employees array and the makeWindow function.
 */
const addSearchFeature = data =>
{
  //extract contents from data object
  let employees = data.emp;
  let makeWindow = data.function;

  //check if items is inside employees array
  const inDirectory = items =>
  {
    items = items.split(' ');
    let id = null;
    employees.forEach(employee =>
    {
      console.log(items);
      items.forEach(item =>
      {
        if ((employee.name.first === item) || (employee.name.last === item))
        {
          id = employee.id;
          console.log(employee.id);
        }
      });
    });
    return id !== null? id : false;
  }

  //add search bar
  const searchContainer = document.querySelector('.search-container');
  const searchBar =
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
  searchContainer.innerHTML = searchBar;
  const searchField = searchContainer.querySelector('#search-input');
  const searchButton = searchContainer.querySelector('#search-submit');

  searchButton.addEventListener('click', (event) =>
  {
    if (event.target.id = 'search-submit')
    {
      const foundEmployee = inDirectory(titleCase(searchField.value));
      if(foundEmployee)
        makeWindow(foundEmployee);
      else
        alert('Employee not found');
    }
  });
}

getEmployeeData
  .then(employeeData => formatEmployeeData(employeeData))
  .then(employees => displayEmployees(employees))
  .then(employees => createModalWindows(employees))
  .then(employees => addSearchFeature(employees));
