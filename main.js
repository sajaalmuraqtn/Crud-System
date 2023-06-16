var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");
var addbtn = document.getElementById("click");
var data = document.getElementById("data");
var search = document.getElementById("search");
var currentIndex=0;
var courses ;
/*
* we define local storage to set the courses array in
* we put this if statement to not give us error if the array is empty
* we  put (set data to local storge) in the function that we change the data of array in like update , add , delete
 */
if (JSON.parse(localStorage.getItem("courses")===null)) {
  courses=[];
}
else{
  courses=JSON.parse(localStorage.getItem("courses"));
}

var update=document.getElementById("update");
update.style.display="none";




addbtn.onclick = function (e) {
    e.preventDefault(); // to prevent the default refresh of the form
    addCourses();
    resetInput();
    displayData();
}

// add course to array of object 

function addCourses() {
    course = {
        courseName: courseName.value,
        courseCategory: courseCategory.value,
        coursePrice: coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value
    };
    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'course add successfully',
        showConfirmButton: false,
        timer: 1500
      });

}

// clear the input after adding the course from it to the array 
function resetInput() {
    courseName.value = " "
    courseCategory.value = " "
    coursePrice.value = " "
    courseDescription.value = " "
    courseCapacity.value = " "
}

// function to read data from the array and display it into a table in html 
function displayData() {
    var result = "";
    for (let index = 0; index < courses.length; index++) {
        result +=
            `<tr>
     <td>${index + 1}</td>
     <td>${courses[index].courseName}</td>
     <td>${courses[index].courseCategory}</td>
     <td>${courses[index].coursePrice}</th>
     <td>${courses[index].courseDescription}</td>
     <td>${courses[index].courseCapacity}</td>
     <td><button class="btn btn-info" onClick="getCourse(${index})">Update</button> </td>
     <td><button class="btn btn-danger" onClick="deleteCourse(${index})" >Delete</button></td>
     </td>`
    }
    data.innerHTML = result;
}

// delete all courses from the table 
document.getElementById("deleteBtn").onclick = function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) { 
              courses = [];
              data.innerHTML = ``;
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      localStorage.setItem("courses",JSON.stringify(courses));
 
}

// we use splice to delete the specific row index when we click on the delete button
function deleteCourse(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            displayData();

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      localStorage.setItem("courses",JSON.stringify(courses));

    
}

// search input 
/*
*we use to event that deal with keyboard -> onkeyup -> that will take all letter that we add to input 
* we use for loop to compare the input with the courses name in the array 
* toLowerCase().includes(search.value.toLowerCase())->
* includes(search.value.toLowerCase()) -> we add this to compare all element with all other name that include this letters
*toLowerCase()-> to make all letter the same level

*/

search.onkeyup = function () {
    var result = "";

    for (let index = 0; index < courses.length; index++) {
        if (courses[index].courseName.toLowerCase().includes(search.value.toLowerCase())) {
            result +=
                `<tr>
   <td>${index + 1}</td>
   <td>${courses[index].courseName}</td>
   <td>${courses[index].courseCategory}</td>
   <td>${courses[index].coursePrice}</th>
   <td>${courses[index].courseDescription}</td>
   <td>${courses[index].courseCapacity}</td>
   <td><button class="btn btn-info" onClick="getCourse(${index})">Update</button> </td>
   <td><button class="btn btn-danger" onClick="deleteCourse(${index})">Delete</button></td>
   </td>`
        }    
        data.innerHTML = result;

    }

}

// update 

function getCourse(index) {
  var course=courses[index];
  currentIndex=index;
  console.log(course);
  /*
  course.value -> the value of input
  course.courseName -> the value of row that we clicked on to update it
  display="inline" -> to show the button
  display="none"->  to hide the button
  */

  courseName.value=course.courseName;
  courseCategory.value=course.courseCategory;
  coursePrice.value=course.coursePrice;
  courseDescription.value=course.courseDescription;
  courseCapacity.value=course.courseCapacity;
  update.style.display="inline";
  addbtn.style.display="none";

}

/*
* we define a global value of index {currentIndex} to take the index of row that we want to update it

* we set   e.preventDefault();   -> to prevent refresh of page 


* we change the current value of the course ... to the new value that we add 




*/
update.onclick=function (e) {
  
  e.preventDefault();  
  var course=courses[currentIndex];

  course = {
    courseName: courseName.value,
    courseCategory: courseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value
};

 courses[currentIndex].courseName=course.courseName;
 courses[currentIndex].courseCategory=course.courseCategory;
 courses[currentIndex].coursePrice=course.coursePrice;
 courses[currentIndex].courseDescription=course.courseDescription;
 courses[currentIndex].courseCapacity=course.courseCapacity;
 localStorage.setItem("courses",JSON.stringify(courses));
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'course updated successfully',
    showConfirmButton: false,
    timer: 1500
  });
  displayData();
  update.style.display="none";
  addbtn.style.display="inline";
  resetInput();
}


