let form = document.querySelector(`#my-form`)
let users = document.querySelector(`#users`)
form.addEventListener(`submit`, saveToLocalStorage)

function saveToLocalStorage(e) {
    e.preventDefault()
    let name = document.querySelector(`#name`).value
    let email = document.querySelector(`#email`).value
    let obj1 = {
        name: name,
        email: email
    }

    axios.post(`https://crudcrud.com/api/5555bcdeaa2c4eaca0146b2f8c0defbb/appointmentData`,obj1)
    .then((res)=>{
        console.log(res.data);
        addToList(res.data)
    })
    .catch((err)=>{console.log(err)})

    let jsonFile = JSON.stringify(obj1)
    // localStorage.setItem(`${email}`, jsonFile)
    // addToList(obj1)
}

// Object.keys(localStorage).forEach((key) => {
//     let userDetailsString = localStorage.getItem(key)
//     let userObj = JSON.parse(userDetailsString)
//     addToList(userObj)
// })
window.addEventListener('DOMContentLoaded',()=>{
    let datas;
    axios.get(`https://crudcrud.com/api/5555bcdeaa2c4eaca0146b2f8c0defbb/appointmentData`)
    .then(res=>{
      let datas=res.data; console.log(datas);
      datas.map((data)=>{
          addToList(data)
      })
    })
    
})
function addToList(userObj) {
    
        let li = document.createElement('li')
        li.id=userObj.email
        console.log(li);
        li.className=userObj.email
        let text = document.createTextNode(`${userObj.name}:${userObj.email}`)
        li.appendChild(text)
        let editBtn=document.createElement('input')
        editBtn.type="button"
        editBtn.value="edit"
        
        editBtn.addEventListener(`click`,()=>{
         document.querySelector(`#name`).value=userObj.name
         document.querySelector(`#email`).value=userObj.email
          
            li.remove()
            
                axios.delete(`https://crudcrud.com/api/5555bcdeaa2c4eaca0146b2f8c0defbb/appointmentData/${userObj._id}`)
           
        })
        let deleteBtn=document.createElement(`input`)
        deleteBtn.type=`button`
        deleteBtn.value=`delete`
        
        deleteBtn.addEventListener(`click`,()=>{
            // localStorage.removeItem(userObj.email)
            axios.delete(`https://crudcrud.com/api/5555bcdeaa2c4eaca0146b2f8c0defbb/appointmentData/${userObj._id}`)
            console.log(userObj);
            li.remove()
            

        })
        li.appendChild(editBtn)
        li.appendChild(deleteBtn)
        users.appendChild(li)
    

   
}
