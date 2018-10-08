/** Class representing an employee. */
class Employee
{
    constructor(image, name, email, mobile, address, birthday)
    {
      this.image = image;
      this.name = name;
      this.email = email;
      this.mobile = mobile;
      this.address = address;
      this.birthday = birthday;
    }
}

/**
 * Retrieves employee data from https://randomuser.me.
 * @return   {Array}   employeeData - An array of employee objects.
 */
const getEmployeeData = new Promise(resolve =>
{
    const url = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob';
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
  function titleCase(sentence)
  {
    sentence = sentence.toLowerCase().split(' ');
    for (var i = 0; i < sentence.length; i++)
      sentence[i] = sentence[i].charAt(0).toUpperCase() + sentence[i].slice(1);
    return sentence.join(' ');
  }

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

  const employees = [];

  employeeData
    .map(data => [data])
    .forEach(data =>
    {
      data =
      data.map(data =>
      {
        data.picture = data.picture.large;
        data.name = `${titleCase(data.name.first + " " + data.name.last)}`;
        data.location = {street: `${titleCase(data.location.street)}`, city: `${titleCase(data.location.city)}`, state: `${titleCase(data.location.state)}`};
        data.cell = formatPhoneNumber(data.cell);
        data.dob.date = `${data.dob.date.substring(5,7)}/${data.dob.date.substring(8,10)}/${data.dob.date.substring(0,4)}`;
        return data;
      })
      .reduce((employee, data) => new Employee(data.picture, data.name, data.email, data.cell, data.location, data.dob.date),"");
      employees.push(data);
    })

  return employees;
}

/**
 * Appends the employees to the web page.
 * @param   {Array}   employees - Data to be displayed.
 * @return  {Nothing right now}    employees - An array of Employee instances.
 */
const displayEmployees = employees =>
{
  const appendEmployee = employee =>
  {
    const employeeCard = document.createElement('DIV');
    employeeCard.className = 'card';
    employeeCard.className = 'card';
    employeeCard.innerHTML =
    `<div class="card-img-container">
        <img class="card-img" src="${employee.image}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employee.name}</h3>
        <p class="card-text">${employee.email}</p>
        <p class="card-text cap">${employee.address.city}, ${employee.address.state}</p>
    </div>`;

    const galleryDiv = document.querySelector('#gallery');
    galleryDiv.appendChild(employeeCard);
  }

  employees.forEach(employee => appendEmployee(employee));
  console.log(employees);
}

getEmployeeData
  .then(employeeData => formatEmployeeData(employeeData))
  .then(employees => displayEmployees(employees));


  // console.log(searchContainer, galleryDiv, modalContainer);
