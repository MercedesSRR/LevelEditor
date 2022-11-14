//Copyright (c) 2022 Mercedes Senties

export default class App {
    
    constructor(){

        $("#save-btn").on("click", event => this.SaveForm(event));
    }

    GetObjectEntities() {

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

    SaveForm(event) {
        event.preventDefault();

        const levelData = $("#level-info").serialize();

        let entities = this.GetObjectEntities();

        //level data to save
        let data = {
            id: "Level",
            name: $("#name").value,
            maxShots: $("#shots").value,
            oneStarScore: $("#star1").value,
            twoStarScore: $("#star2").value,
            threeStarScore: $("#star3").value,
            entities: entities,
            payload: levelData

        }

        fetch("/api/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }
}