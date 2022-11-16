//Copyright (c) 2022 Mercedes Senties

export default class App {
    
    constructor(){

        $("#save-btn").on("click", event => this.SaveForm(event));

        $("#level-list").on("click", event => this.GetLevelList());
    }

    
    SaveForm(event) {
        event.preventDefault();
        
        let id = "pg23Mercedes"
        let entities = {};
        let name = $("#name").value;
                
        entities = this.GetObjectAttr();
        
        //level data to save
        let data = {
            "id": id,
            "name": name,
            "payload": {
                "name": name,
                "maxShots": $("#shots").value,
                "oneStarScore": $("#star1").value,
                "twoStarScore": $("#star2").value,
                "threeStarScore": $("#star3").value,
                "entities": entities
            }
            
        }
        
        this.SaveData('/api/post', data);
    }
    
    GetObjectAttr() {

        const gameArea = $("#edit-window");
        let gameObjects = $(".placed");
        let gameObjectsArray = [];

        //Get the data for every object placed on editor
        for (let i = 0; i < gameObjects.length; i++)
        {
            let objectsPos = gameObjects[i]

            gameObjectsArray.push({
                "id": gameObjects[i].classList[1],
                "x" : objectsPos.left,
                "y" : objectsPos.top
            });
        }

        return gameObjectsArray;
    }
    
    //code from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    async SaveData(url ='/api/post', req_data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(req_data) 
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    GetLevelList(){
        $.post("/api/get_level_list").then(data => {  
            var namesDataList = $("#names"); 
            let name = $("#name").value;
            data = data.payload; 
           
            data.forEach(function (file) {
                var option = document.createElement('option');
                option.value = file.name; 
                namesDataList.appendChild(option);
            });
        })
    }
}