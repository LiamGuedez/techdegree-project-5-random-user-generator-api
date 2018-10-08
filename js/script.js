/** Class representing an employee. */
class Employee
{
    constructor(image, name, email, city, mobile, address, birthday)
    {
      this.image = image;
      this.name = name;
      this.email = email;
      this.city = city;
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
        data.location.city = titleCase(data.location.city);
        data.address = `${titleCase(data.location.street)}, ${titleCase(data.location.city)}, ${titleCase(data.location.state)}`;
        data.cell = formatPhoneNumber(data.cell);
        data.dob.date = `${data.dob.date.substring(5,7)}/${data.dob.date.substring(8,10)}/${data.dob.date.substring(0,4)}`;
        return data;
      })
      .reduce((employee, data) => new Employee(data.picture, data.name, data.email, data.location.city, data.cell, data.address, data.dob.date),"");
      employees.push(data);
    })

  return employees;
}

getEmployeeData
  .then(employeeData => formatEmployeeData(employeeData))
  .then(employees => console.log(employees));
