let examplesStart = document.getElementById("examplesStart")
let examplesImage = document.getElementById("examplesImage")
let examplesContainer = document.getElementById("examplesContainer")
window.addEventListener("scroll", (event) => {
    let offset = examplesStart.getBoundingClientRect()
    let eStartBB = examplesStart.getBoundingClientRect()
    let eImageBB = examplesImage.getBoundingClientRect()
    let eContainerBB = examplesContainer.getBoundingClientRect()
    if(eContainerBB.y + eContainerBB.height - eImageBB.height < 0) {
        examplesImage.style.top = (eContainerBB.y + window.scrollY + eContainerBB.height - window.scrollY - eImageBB.height) + "px"
        return
    }
    if(eStartBB.y > 0)
        examplesImage.style.top =  eStartBB.y + 'px'
    else
        examplesImage.style.top =  "2em"
})



window.onload = async () => {

    const initSql = window.initSqlJs;

    const SQL = await initSql({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });

    let examples = document.getElementsByClassName("example")
    let lectureId = window.location.href.split("/").pop()

    let examplesDB = new SQL.Database();
    let databaseRequest = await fetch('/examplesDatabase/'+lectureId)
    let databaseText = await databaseRequest.text()
    examplesDB.run(databaseText)

    for (let example of examples) {
        let inputField = example.children[1].firstElementChild;
        let runButton = inputField.nextElementSibling;
        let outputField = example.children[2]

        let runFunc = function(event) {
            let inputText = inputField.value
            let result, error;
            try {
                result = examplesDB.exec(inputText)[0];
            } catch(e) {
                error = e;
            }
            if(outputField.firstElementChild)
                outputField.removeChild(outputField.firstElementChild)
            if(error) {
                let el = document.createElement('div')
                el.className = "example-error"
                el.textContent = error;
                outputField.appendChild(el)
                return
            }
            let table = document.createElement("table")
            table.className = "table table-striped"
            let header = document.createElement("thead")
            let row = document.createElement('tr')
            for(let column of result.columns) {
                let th = document.createElement("th")
                th.textContent = column
                row.appendChild(th)
            }
            header.appendChild(row)
            table.appendChild(header)
            let body = document.createElement("tbody")
            for(let value of result.values) {
                let row = document.createElement("tr")
                row.scope = "row"
                for(let column of value) {
                    let th = document.createElement("td")
                    th.textContent = column
                    row.appendChild(th)
                }
                body.appendChild(row)
            }
            table.appendChild(body)
            outputField.appendChild(table)
        }

        runButton.addEventListener('click', runFunc)
        inputField.addEventListener('keydown', function (event) {
            if(event.keyCode === 13 && (event.ctrlKey || event.shiftKey)) {
                event.preventDefault()
                runFunc();
            }
        })
    }

    let exercisesDatabasesRequest = await fetch('/exercisesDatabases/'+lectureId)
    let exercisesDatabasesText = await exercisesDatabasesRequest.json()
    let exercisesDatabases = exercisesDatabasesText.map(({model, solution}) => {
        let db = new SQL.Database();
        db.run(model)
        return {db, solution}
    })

    let exercises = document.getElementsByClassName("exercise")

    for (let i=0; i<exercises.length; i++) {
        let exercise = exercises[i]
        let inputField = exercise.children[1].firstElementChild.firstElementChild;
        let runButton = inputField.nextElementSibling;
        let outputField = exercise.children[1].children[1]
        let checkIcon = exercise.children[0].children[0].children[2]

        let runFunc = function(event) {
            let inputText = inputField.value
            let db = exercisesDatabases[i].db
            let result, error;
            try {
                result = db.exec(inputText)[0];
            } catch(e) {
                error = e;
            }
            if(outputField.firstElementChild)
                outputField.removeChild(outputField.firstElementChild)
            if(error) {
                let el = document.createElement('div')
                el.className = "example-error"
                el.textContent = error;
                outputField.appendChild(el)
                return
            }
            let table = document.createElement("table")
            table.className = "table table-striped"
            let header = document.createElement("thead")
            let row = document.createElement('tr')
            for(let column of result.columns) {
                let th = document.createElement("th")
                th.textContent = column
                row.appendChild(th)
            }
            header.appendChild(row)
            table.appendChild(header)
            let body = document.createElement("tbody")
            for(let value of result.values) {
                let row = document.createElement("tr")
                row.scope = "row"
                for(let column of value) {
                    let th = document.createElement("td")
                    th.textContent = column
                    row.appendChild(th)
                }
                body.appendChild(row)
            }
            table.appendChild(body)
            outputField.appendChild(table)

            let parsed = db.exec(exercisesDatabases[i].solution)[0].values;
            let values = result.values

            console.log(parsed, values)

            if(equalMatrices(parsed, values)) {
                checkIcon.style.display = "flex"
            }
            else {
                checkIcon.style.display = "none"
            }

        }

        runButton.addEventListener('click', runFunc)
        inputField.addEventListener('keydown', function (event) {
            if(event.keyCode === 13 && (event.ctrlKey || event.shiftKey)) {
                event.preventDefault()
                runFunc();
            }
        })
    }
}

function equalMatrices(a1, a2) {
    if(!a1 || !a2)
        return false
    if(a1.length !== a2.length)
        return false
    let l = a1.length
    for(let i=0; i<l; i++) {
        if(a1[i].length != a2[i].length)
            return false
        let len = a1[i].length
        for(let j=0; j<len; j++) {
            if(a1[i][j] != a2[i][j]) {
                return false
            }
        }
    }
    return true
}