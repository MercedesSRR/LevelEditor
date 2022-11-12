//Copyright (c) 2022 Mercedes Senties

export default class Object {
    
    constructor(){

        this.gameObject = {
            name: "Wood box",
            height: "70",
            width: "70",
            texture: "images/wood-box.png",
            mass: "90",
            restitution: "0",
            friction: "1",
        };
        this.Drag();
        $("#save-btn").on("click", event => this.SaveForm( event ));
    }
    
    Drag() {

        let x;
        let y;
        let dragArea = null;

        let gameObject = $(".box")
        .on("dragstart", (event) => {
            // store a ref. on the dragged elem
            x = event.offsetX;
            y = event.offsetY;
            gameObject = event.target;
            gameObject.style.position = "relative";
        });

        $("#edit-window").on("dragover", (event) => {
            // prevent default to allow drop
            event.preventDefault();
        })

        .on("drop", (event) => {
            // prevent default action
            event.preventDefault();
            
            dragArea = event.target;

            //clone object (lets you put more than 1 object of the same type)
            let box = gameObject.cloneNode(true);
            
            // move box to the game window
            event.target.appendChild(box);
            
            //set the style for the dragged item
            box.style.left = (event.clientX - event.target.offsetLeft - x + 1) + 'px';
            box.style.top = (event.clientY - event.target.offsetTop - y + 1) + 'px';
            box.style.position = "absolute";
            
            //return to default so it stops cloning
            dragArea = null;
            
        });

    }

    GetObjectEntities() {

        const gameArea = $("#edit-window");

        //store the informatin of the position of the gameArea relative to the viewport
        let parentPos = gameArea.getBoundingClientRect();
        let childPos;

        //Get the data for every object placed on editor
        let objectsPlaced = gameArea.children;
        for (let i = 0; i < objectsPlaced.length; i++)
        {
            childPos = objectsPlaced[i].getBoundingClientRect()

            collidables.push({
                "id": objectsPlaced[i].classList[1],
                "x" : childPos.left - parentPos.left,
                "y" : childPos.top - parentPos.top,
            });
        }

        let newData = {
            "collidables" : collidables,
        }
        return newData
    }

    SaveForm(event) {
        event.preventDefault();

        const levelData = $("#level-info").serialize();

        let entities = this.GetObjectEntities();

        //level data to save
        let data = {
            id: id,
            name: $("#name").value,
            maxShots: $("#shots").value,
            oneStarScore: $("#star1").value,
            twoStarScore: $("#star2").value,
            threeStarScore: $("#star3").value,
            entities: entities,
            payload: levelData

        }

        $.post(`/api/save`, data)
        .then(response =>{
            //handle the response
            const respData = JSON.parse(response);
            if(!respData.error)
                console.log(`SUCCESS: Received ${respData.bytes} from the server`)
        })
    }
}
