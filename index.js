// javascript.
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://realtime-database-41399-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListIDB = ref(database, "endorsementList")

let textEl = document.getElementById("text")
let publishbtnEl = document.getElementById("publishbtn")
let endorsesEl = document.getElementById("endorses")

publishbtnEl.addEventListener("click", function(){
    let inputValue = textEl.value
    push(endorsementListIDB, inputValue)
    clearInputField()
    
})

onValue(endorsementListIDB, function(snapshot){
    
    if (snapshot.exists()){
       let commentArray = Object.entries(snapshot.val())
    
    console.log(snapshot.val())
    
    clearEndorsesEl()
    
    for(let i = 0; i < commentArray.length; i++){
        let currentComment = commentArray[i]
        
        let currentCommentID = currentComment[0]
        let currentCommentValue = currentComment[1]
      addCommentsToEndorsementList(currentComment)  
    } 
    }else{
        endorsesEl.innerHTML = `<h3 class="no-comment">No comments yet . . . </h3>`
    }
    
    
})

function clearEndorsesEl(){
    endorsesEl.innerHTML = ""
}

function clearInputField(){
         textEl.value = ""
}
 
function addCommentsToEndorsementList(comment){
    let commentID = comment[0]
    let commentValue = comment[1]
    // let commentID = comment[0]
    // let commentValue = comment[1]
    
    let newEl = document.createElement("textarea")
    newEl.textContent = commentValue
    
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfComment = ref(database, `endorsementList/${commentID}`)
        remove(exactLocationOfComment)
    })
    
    endorsesEl.append(newEl)
    // endorsesEl.innerHTML += `<textarea class="comments">${commentsList}</textarea>`
}







