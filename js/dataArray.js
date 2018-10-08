/** Class representing an employee. */
class Vemployee
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
//for working on the laptop
const getDataArray = () =>
{
  const dataArray =
  [
    {
      cell: "045-011-87-66",
      dob:{age: 35, date: "1983-09-12T06:00:55Z"},
      email: "nella.kyllo@example.com",
      location:
      {
        city: "porvoo",
        coordinates:{latitude: "-14.7153", longitude: "137.4249",},
        postcode: 75792,
        state: "finland proper",
        street: "2679 korkeavuorenkatu",
        timezone: {offset: "+1:00", description: "Brussels, Copenhagen, Madrid, Paris"},
      },
      name: {title: "miss", first: "nella", last: "kyllo"},
      picture:
      {
        large: "https://randomuser.me/api/portraits/women/38.jpg",
        medium: "https://randomuser.me/api/portraits/med/women/38.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/women/38.jpg",
      }
    }
  ];

  return dataArray;
}

/**
 * Edits the received data into a more legible format.
 * @param   {Array}    employee - Data to be formatted.
 * @return  {Array}    NAME NEEDED - An array of Employee instances.
 */
const formatEmployeeDatas = employees =>
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
    var cleaned = ('' + phoneNumber).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match)
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    return null;
  }

  let person1 = [employees[0]];

  person1 =
    person1
    .map(data =>
    {
      data.picture = data.picture.large;
      data.name = `${titleCase(data.name.first + " " + data.name.last)}`;
      data.location.city = titleCase(data.location.city);
      data.address = `${titleCase(data.location.street)}, ${titleCase(data.location.city)}, ${titleCase(data.location.state)}`;
      data.cell = formatPhoneNumber(data.cell);
      data.dob.date = `${data.dob.date.substring(5,7)}/${data.dob.date.substring(8,10)}/${data.dob.date.substring(0,4)}`;
      return data;
    })
    .reduce((employee, data) => new Vemployee(data.picture, data.name, data.email, data.location.city, data.cell, data.address, data.dob.date),"");

  return person1;
}

const sendTheData = new Promise(resolve =>
{
    const someArray = getDataArray();
    resolve(someArray);
});

sendTheData
  .then(employeeData => formatEmployeeDatas(employeeData))
  .then(employees => console.log(employees));
