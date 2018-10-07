const getEmployeeData =
    new Promise(function(resolve, reject)
    {
        const url = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob';
        const callback =
          function(response)
          {
            const employees = response.results;
            resolve(employees);
          };
        $.get(url, callback);
    });

const formatEmployeeData = employees =>
{
  let person1 = employees[0];
  return employees;
}

getEmployeeData
  .then(employees => formatEmployeeData(employees))
  .then(employees => console.log(employees));
