//Copyright (c) 2022 Mercedes Senties

'use strict';

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

        $("#edit-window")
            .on("dragover", (event) => {
                // prevent default to allow drop
                event.preventDefault();
            })

            .on("drop", (event) => {
                // prevent default action
                event.preventDefault();
                
                dragArea = event.target;

                //clone object (lets you put more than 1 object of the same type)
                let box = gameObject.cloneNode();

                // move box to the game window
                dragArea.appendChild(box);
                
                //set the style for the dragged item
                box.style.left = (event.clientX - event.target.offsetLeft - x) + 'px';
                box.style.top = (event.clientY - event.target.offsetTop - y) + 'px';
                box.style.position = "absolute";
                box.classList.add("placed");
                //Set the draggable attribute to false so it stops cloning itself
                box.setAttribute("draggable", false);
                
                //return to default so it stops cloning
                dragArea = null;
                
            });           
    }
}
