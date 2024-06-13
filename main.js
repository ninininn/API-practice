let getBtn = document.getElementById("get-data");
let content = document.querySelector(".content-block");
let contentTable = document.getElementById("content-table");
let selectList = document.getElementById('selectList');
let optionItems

let url = "https://seat.tpml.edu.tw/sm/service/getAllArea";



//get分館名稱放入option
selectList.addEventListener("click",()=>{
    if(!optionItems){
        axios.get(url).then(function(response){
            let optionArray = [];
            for(let name of response.data){
                optionArray.push(name.branchName);
            }
            //篩選重複分館名稱
            let optionSet = new Set(optionArray);
            // console.log(optionArray,optionSet)
            for(let name of optionSet){
                let options = document.createElement('option')
                options.textContent=name
                selectList.appendChild(options)
            }
            optionItems = true;
        })
    }
})

//get座位資訊
getBtn.addEventListener("click",()=>{
    axios.get(url).then(function(response){
        printTitle(response.data);
    })
})


//顯示分館座位
function printTitle(data){
    // contentTable.style.display="none";
    contentTable.style.display="table";
    let selectValue = selectList.value;
    for (let keys of data){
        let result = Object.values(keys);
        if(keys.branchName === selectValue){
            let tr = document.createElement('tr');
            tr.setAttribute("data-name",`${keys.branchName}`)
            for(let values of result){
                let td = document.createElement('td');
                td.textContent = values;
                tr.appendChild(td);
            }
            contentTable.appendChild(tr);
        }
    }
    removeBefore(selectValue)

}


//移除舊資料
function removeBefore(value){
    let data = document.querySelectorAll("tr")
    console.log(data)
    for(let name of data){
        console.log(name.dataset.name)
        if(name.dataset.name !== value &&name.className !== "table-head"){
            name.textContent=""
        }
    }
}
