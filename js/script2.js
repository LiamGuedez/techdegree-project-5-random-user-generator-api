var dosomething = "jesus";

// ///////////////////////////////////////////////////////////////////////////////
// /**
//     THIS WORKS FINE.
//     -the array is logged to the console
// **/
// let array = [];
//
// const fetchData = (x) =>
// {
//   // https://randomuser.me/api/?results=5000
//     fetch('https://randomuser.me/api/?results=50&inc=picture,name,email,location,cell,dob')
//     // fetch('https://randomuser.me/api/?results=50')
//     .then(response => response.json())
//     .then(data => console.log(data));
//     // .then(data => array.push(data.results[0]));
// }
//
// new Promise(fetchData)
//   // .then(console.log(array));
// ///////////////////////////////////////////////////////////////////////////////
//   /**
//       THIS PRINTS OUT UNDEFINED.
//       -it says that the 0 index of the array is undefined
//   **/
// let array2 = [];
//
// const fetchData2 = (x) =>
// {
//
//     fetch('https://randomuser.me/api/?inc=picture,name,email,location,cell,dob')
//     .then(response => response.json())
//     .then(data => array2.push(data.results[0]));
// }
//
// new Promise(fetchData2)
//   // .then(console.log(array2[0]));
// ///////////////////////////////////////////////////////////////////////////////
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // class Employee
// // {
// //   constructor(image, name, email, city, mobileNum, address, birthday)
// //   {
// //     new Promise(this.aFunction);
// //
// //     this.image;
// //     this.name;
// //     this.email;
// //     this.city;
// //     this.mobileNum;
// //     this.address;
// //     this.birdtay;
// //     // this.image = image;
// //     // this.name = name;
// //     // this.email = email;
// //     // this.city = city;
// //     // this.mobileNum = mobileNum;
// //     // this.address = address;
// //     // this.birdtay = birthday;
// //   }
// //
// //   aFunction = () =>
// //   {
// //       fetch('https://randomuser.me/api/?inc=picture,name,email,location,cell,dob')
// //       .then(response => response.json())
// //       .then(data => data.results)
// //       .then(data =>
// //         {
// //           this.image = data.picture;
// //           // this.name
// //           // this.email
// //           // this.city
// //           // this.mobileNum
// //           // this.address
// //           // this.birdtay
// //         });
// //   }
// //
// // }
// //
// //
// //
// //
// // // async function getEmployeeData()
// // // {
// // //   let dataArray;
// // //   const returnSomething = () =>
// // //   {
// // //
// // //     fetch('https://randomuser.me/api/?inc=picture,name,email,location,cell,dob')
// // //       .then(response => response.json())
// // //       .then(data => dataArray = data.results)
// // //     return dataArray;
// // //   }
// // //
// // //   // await returnSomething;
// // //   // setTimeout(() => console.log(returnSomething), 2000);
// // //   // console.log(dataArray);
// // //   // return dataArray;
// // //
// // // }
// // // getEmployeeData();
// //
// // // async function getEmployeeData()
// // // {
// // //
// // //   let dataArray;
// // //   await fetch('https://randomuser.me/api/?inc=picture,name,email,location,cell,dob')
// // //     .then(response => response.json())
// // //     .then(data => dataArray = data.results)
// // //
// // //
// // //   console.log(dataArray);
// // //   return dataArray;
// // //
// // // }
// //
// //
// //
// // // console.log(getEmployeeData());
// // // const employee = new Employee;
// // // console.log(employee.data);
// // // Image
// // // Name
// // // Email
// // // City or location
// // // Cell Number
// // // Detailed Address, including street name and number, state or country, and post code.
// // // Birthday
// // // employee.getEmployeeData();
// // // console.log(employee.data);
// //
// // // fetch('https://dog.ceo/api/breeds/image/random')
// // //   .then(response => console.log(response))
// // //
// // // fetch('https://randomuser.me/api/?inc=picture,name,email,location,cell,dob')
// // //   .then(response => response.json())
// // //   .then(data =>
// // //     {
// // //       console.log(data.results[0].picture);
// // //       // this.data = data;
// // //     });
