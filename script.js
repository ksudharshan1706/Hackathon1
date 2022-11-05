var globalData = []
var currentidx = 0
var maxInd = 0
var dataDict = {}
var bookNameDict = {}
const mainDiv = document.createElement('div')
const headDiv = document.createElement('div')
// headDiv.style.backgroundColor = "black"
mainDiv.className = "container mt-3"
const heading = document.createElement('h1')
heading.innerText = "BEST BOOKS TILL DATE";
heading.style.padding = "20px"
heading.style.textAlign = "center"
// heading.style.backgroundColor = "#d8050554"
heading.style.color = "rgba(78, 10, 73, 0.977)"
heading.style.height = "auto"
heading.style.width = "vw"


headDiv.append(heading);
console.log(headDiv)

const table = document.createElement("table");
table.className = "table table-hover mt-3"
const thead = document.createElement("thead");

thead.className="table table-dark"
const tbody= document.createElement("tbody");
const theadrow = document.createElement("tr");
const headFields = ['No.','BookName','ISBN','Number of Pages','Authors','Publisher Name','Released Date','Lead Charecters']
headFields.map((element)=>{
    const tdata = document.createElement("td");
    tdata.innerText = element;
    theadrow.appendChild(tdata)
})
thead.style.padding = "100px"
thead.append(theadrow)
table.append(thead)
table.append(tbody)

const btnsDiv = document.createElement('div');

const btns = [
    {type:"button",name:"prev",id:"prev"},
    {type:"button",name:"next",id:"next"}
]

btns.forEach((btn)=>{
    const newBtn = document.createElement('button');
    newBtn.id = btn.id;
    newBtn.style.margin = "20px"
    if(btn.name == "next"){
        newBtn.innerText = "Next";
        newBtn.setAttribute('onClick',"funnext()")
    }
    else{
        newBtn.innerText = "Prev";
        newBtn.setAttribute('onClick',"funprev()")

    }
    newBtn.style.width = '100px'
    newBtn.className = "btn btn-outline-primary"
    btnsDiv.append(newBtn);  

})

table.style.justifyContent="center"
table.style.textAlign = "center"
table.style.border = "2px solid"
mainDiv.append(headDiv,table,btnsDiv)
mainDiv.style.textAlign ="center"
document.body.append(mainDiv)

// creating elements
const createElements = (info,type) =>{
    const element = document.createElement(type)
    element.innerText = info
    return element
}


const fun1 = async() =>{
    const response = await fetch(`https://www.anapioficeandfire.com/api/books`)
    const books = await response.json()
    globalData = books
    maxInd = books.length
    globalData.forEach(({name,isbn,numberOfPages,publisher,released,authors,povCharacters},index)=>{
        dataDict[index+currentidx] =  `Book: ${name}\nAuthor: ${authors} \nPages: ${numberOfPages}\nReleasedOn: ${released.slice(0,10)}`;
        bookNameDict[index+currentidx] = name;
    })
    
    globalData.slice(0,5).forEach(({name,isbn,numberOfPages,publisher,released,authors,povCharacters},index)=>{
        const innertr = document.createElement('tr');
        const innerid = createElements(index+currentidx+1,'td');
        const innername = createElements(name,'td');
        const innerIsbn = createElements(isbn,'td');
        const noOfPages = createElements(numberOfPages,'td');
        const Authors = createElements(authors,'td');
        const publisherName = createElements(publisher,'td');
        const releasedDate = createElements(released,'td');
        releasedDate.innerText = released.slice(0,10)
        var charecters = ""
        const leadCharecters = document.createElement('td');
        
        Array.from(povCharacters).slice(0,5).forEach( async (povCharactersPath)=>{
            const charResponse = await fetch(`${povCharactersPath}`)
            const charName = await charResponse.json()
            charecters +=charName.name+"\n";
            leadCharecters.innerText = charecters;
        })
        console.log("characters",charecters)
        

        innertr.append(innerid,innername,innerIsbn,noOfPages,Authors,publisherName,releasedDate,leadCharecters);
        tbody.append(innertr)
        console.log(povCharacters)
        
    })  
    
}
fun1()

const funnext = ()=> {
    
    currentidx += 5
    var nextidx = currentidx + 5
    if(currentidx < maxInd){
        tbody.innerText = ""
        globalData.slice(currentidx,nextidx).forEach(({name,isbn,numberOfPages,publisher,released,authors,povCharacters},index)=>{
            const innertr = document.createElement('tr');
            const innerid = createElements(index+currentidx+1,'td');
            const innername = createElements(name,'td');
            const innerIsbn = createElements(isbn,'td');
            const noOfPages = createElements(numberOfPages,'td');
            const Authors = createElements(authors,'td');
            const publisherName = createElements(publisher,'td');
            const releasedDate = createElements(released,'td');
            releasedDate.innerText = released.slice(0,10)
            var charecters = ""
            const leadCharecters = document.createElement('td');
         
            Array.from(povCharacters).slice(0,5).forEach( async (povCharactersPath)=>{
                const charResponse = await fetch(`${povCharactersPath}`)
                const charName = await charResponse.json()
                charecters +=charName.name+"\n";
                leadCharecters.innerText = charecters;
            })
            console.log("characters",charecters)
            if(charecters === ""){
                leadCharecters.innerText = "No Characters as mentioned"
                
            }
            innertr.append(innerid,innername,innerIsbn,noOfPages,Authors,publisherName,releasedDate,leadCharecters);
            tbody.append(innertr)
            console.log(povCharacters)
            
        })  
}
else{
    currentidx = maxInd-5;
    window.alert('there are only 10 books in the API')
}
}



const funprev = ()=> {
    currentidx -= 5
    var nextidx = currentidx + 5
    console.log(currentidx,nextidx)
    console.log("here")
    if(currentidx >= 0){
        tbody.innerText = ""
        globalData.slice(currentidx,nextidx).forEach(({name,isbn,numberOfPages,publisher,released,authors,povCharacters},index)=>{
            const innertr = document.createElement('tr');
            const innerid = createElements(index+currentidx+1,'td');
            const innername = createElements(name,'td');
            const innerIsbn = createElements(isbn,'td');
            const noOfPages = createElements(numberOfPages,'td');
            const Authors = createElements(authors,'td');
            const publisherName = createElements(publisher,'td');
            const releasedDate = createElements(released,'td');
            releasedDate.innerText = released.slice(0,10)
            var charecters = ""
            const leadCharecters = document.createElement('td');

            Array.from(povCharacters).slice(0,5).forEach( async (povCharactersPath)=>{
                const charResponse = await fetch(`${povCharactersPath}`)
                const charName = await charResponse.json()
                charecters +=charName.name+"\n";
                leadCharecters.innerText = charecters;
            })
            console.log("characters",charecters)
            if(charecters === ""){
                leadCharecters.innerText = "No Characters as mentioned"
                
            }
            innertr.append(innerid,innername,innerIsbn,noOfPages,Authors,publisherName,releasedDate,leadCharecters);
            tbody.append(innertr)
            console.log(povCharacters)
            
        })  
    }
    else{
        currentidx = 0;
    }
}
//////////////////////////////////////////////////////////////////////////////// after resolution reduction
// const createElements = (info,type) =>{
//     const element = document.createElement(type)
//     element.innerText = info
//     return element
// }



const divSmall = createElements('','div');

divSmall.className = "row container mt-4"
divSmall.style.height = "auto";
divSmall.style.display = "flex"
// divSmall.style.border = "2px solid red";
// table.style.display ="none"
windows = 10
console.log(bookNameDict)

for(var i = 0;i<windows;i++){
    const divChild = createElements('','div');
    divChild.id = i
    divChild.className = "mt-2 simple-transition"
    if((i+1)%4==0){
        divChild.classList.add("hover-1")
    }
    else if((i+1)%3==0){
        divChild.classList.add("hover-3")
    }
    else if((i+1)%2==0){
        divChild.classList.add("hover-2")
    }
    divChild.style.height = "100px";
    divChild.style.border = "2px solid";
    
    divChild.innerText = "Book "+(parseInt(divChild.id)+1)
    console.log(divChild.innerText)
    divChild.addEventListener('mouseover',()=>{
        divChild.innerText = dataDict[divChild.id]
    })
    divChild.addEventListener('mouseleave',()=>{
        divChild.innerText = "Book "+(parseInt(divChild.id)+1)
    })
    divSmall.append(divChild)
}

mainDiv.append(divSmall)
divSmall.style.display = "none"
const functionName=()=>{
    
    var w = window.innerWidth;
    var h = window.innerHeight;
    if(w < 780){
        table.style.display = "none";
        btnsDiv.style.display = "none"
        divSmall.style.display ="block"
    }     
    else{
        divSmall.style.display ="none"
        table.style.display = "block";
        btnsDiv.style.display = "block"
    }  
}

window.addEventListener('resize', functionName);