let allBtn = document.getElementById("allBtn")
    let openBtn = document.getElementById("openBtn")
    let closedBtn = document.getElementById("closedBtn")
    let issueCount = document.getElementById("issueContainer")
    let cardContainer = document.getElementById("cardContainer")
    let allIssues = []
    
    // Active 
function setActive(btn){

    allBtn.classList.remove("bg-violet-700","text-white")
    openBtn.classList.remove("bg-violet-700","text-white")
    closedBtn.classList.remove("bg-violet-700","text-white")


    btn.classList.add("bg-violet-700","text-white")
}

    // Display
function displayIssues(issues){

    cardContainer.innerHTML = ""

    issueCount.innerText = `${issues.length} issues`

    if(issues.length === 0){
        cardContainer.innerHTML = `<p class="col-span-4 text-center">No issues found</p>`
        return ; 
    }
 


function closeModal(){
    const modal = document.getElementById("issueModal")

    modal.classList.remove("modal-open")
    modal.classList.add("hidden")
}

document.getElementById("closeModalBtn").addEventListener("click",closeModal)


    issues.forEach(issue => {

        const borderColor = 
        issue.status === "open"
        ?"border-green-500"
        :"border-purple-500"

        const priorityColor = 
        issue.priority === "high"
        ?"bg-red-100 text-red-500"
        :"bg-yellow-100 text-yellow-500"

        const div = document.createElement("div")
        div.innerHTML = `

        <div class="bg-white ${borderColor} border-y-6 border-b-0 rounded shadow-2xl h-full">

            <div class="flex justify-between items-center p-2 mb-2">

                <img class="mx-2 my-2"
                src="/assets/${issue.status === "open" ? "Open-Status.png" : "Closed- Status .png"}">

                <div class="badge ${priorityColor}">
                ${issue.priority}
                </div>

            </div>

            <div class="px-4 py-2 mt-2">

                <h2 class="text-base font-semibold">
                ${issue.title}
                </h2>

                <p class="text-gray-500 mb-2">
                ${issue.description.substring(0,80)}...
                </p>

                <div class="badge badge-outline ${issue.label === "bug" ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-500"}">${issue.label}</div>

                <hr class="mt-5 mb-2">

                <div class="mt-2 text-gray-500">
                #${issue.id} by ${issue.author}
                </div>

                <div class="text-gray-500">
                ${new Date(issue.createdAt).toLocaleDateString()}
                </div>
            </div>
        </div>
        `
// Modal


      div.addEventListener("click",function(){

document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalStatus").innerText = issue.status
document.getElementById("modalAuthor").innerText = issue.author
document.getElementById("modalDate").innerText = new Date(issue.createdAt).toLocaleDateString()
document.getElementById("modalAssignee").innerText = issue.assignee || "Not assigned"
document.getElementById("modalPriority").innerText = issue.priority.toUpperCase()
document.getElementById("modalDescription").innerText = issue.description


const modalPriority = document.getElementById("modalPriority")
const modalStatus = document.getElementById("modalStatus")

// status color
if(modalStatus.innerText === "open"){
    modalStatus.classList.remove("bg-purple-600")
    modalStatus.classList.add("bg-green-600")
}
else{
    modalStatus.classList.remove("bg-green-600")
    modalStatus.classList.add("bg-purple-600")
}

// Priority color
if(modalPriority.innerText === "HIGH"){
    modalPriority.classList.remove("bg-yellow-500")
    modalPriority.classList.add("bg-red-500")
}
else{
    modalPriority.classList.remove("bg-red-500")
    modalPriority.classList.add("bg-yellow-500")
}

const modal = document.getElementById("issueModal")

modal.classList.remove("hidden")
modal.classList.add("modal-open")

})
        cardContainer.appendChild(div)
    });

}


// All
allBtn.addEventListener("click",function(){
    setActive(allBtn)
    displayIssues(allIssues)
})

// Open
openBtn.addEventListener("click",function(){
    setActive(openBtn)
    const openIssues = allIssues.filter(issue => issue.status === "open")
    displayIssues(openIssues)
})

// Closed
closedBtn.addEventListener("click",function(){
    setActive(closedBtn)
    const closedIssues = allIssues.filter(issue => issue.status === "closed")
    displayIssues(closedIssues)
})



cardContainer.innerHTML =`
<div class="col-span-4 flex justify-center p-10 " ><span class="loading loading-bars loading-xl"></span>
</div>
`



fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then(res=>res.json())
.then(data=> {
    allIssues = data.data;
    setActive(allBtn)
    displayIssues(allIssues)
})
.catch(err=>{
    console.error("Error fetching issues : " , err)
    cardContainer.innerHTML = `<p> Failed to load </p>`
})


// Search Bar

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase(); // case-insensitive search

    // filter issues by title or description
    const filteredIssues = allIssues.filter(issue => 
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query)
    );

    displayIssues(filteredIssues);
});
