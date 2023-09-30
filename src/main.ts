import { Blueprint } from "./bp/blueprint";
import { Node, StartNode, Types, GenericNode } from "./bp/node";
import { RenderBlueprint } from "./GUI/render";
import { SetupUserInteractions } from "./GUI/userInteractions";
import { Vector2 } from "./bp/generics";

const bp = new Blueprint();

let StartingNode = new StartNode();
StartingNode._position = new Vector2(0, 0); // not required if not using GUI
bp.addNode(StartingNode);

let constNumb = new GenericNode();
constNumb.inputs = [];
constNumb.outputs = [];
constNumb.addOutput("10", Types.Number);
constNumb.addOutput("5", Types.Number);
constNumb.addOutput("1", Types.Number);
constNumb.name = "Numbers";
constNumb._width = 100;
constNumb._position = new Vector2(100, 100); // not required if not using GUI
constNumb.run = async () => {

    constNumb.setOutput("10", 10);
    constNumb.setOutput("5", 5);
    constNumb.setOutput("1", 1);

}
bp.addNode(constNumb);

let testNode2 = new GenericNode();
testNode2.outputs = [];
testNode2.inputs = [];
testNode2.addInput("Number 1", Types.Number);
testNode2.addInput("Number 2", Types.Number);
testNode2.addOutput("Output 1", Types.Number);
testNode2.name = "Addition";
testNode2._position = new Vector2(500, 500); // not required if not using GUI
testNode2.run = async () => {

    let inputs: any = testNode2.getInputs()

    let number1 = inputs["Number 1"];
    let number2 = inputs["Number 2"];

    testNode2.setOutput("Output 1", number1 + number2);

}
bp.addNode(testNode2);

let testNode3 = new GenericNode();
testNode3.addInput("Number", Types.Number);
testNode3.name = "Log Number";
testNode3._position = new Vector2(500, 100); // not required if not using GUI
testNode3.run = async () => {

    let inputs: any = testNode3.getInputs()

    let number = inputs["Number"];

    console.log(number);

    testNode4.setOutput("Signal", null);

}
bp.addNode(testNode3);

let testNode4 = new GenericNode();
testNode4.addInput("Number", Types.Number);
testNode4.name = "Wait";
testNode4._position = new Vector2(500, 100); // not required if not using GUI
testNode4.run = async () => {

    let inputs: any = testNode4.getInputs()

    let number = inputs["Number"];

    testNode4.setOutput("Signal", null);
    await new Promise(resolve => setTimeout(resolve, number*1000));

}
bp.addNode(testNode4);


// when blueprint is run it will log 15!

SetupUserInteractions(bp);

setInterval(() => {

    RenderBlueprint(bp);

}, 1000 / 60)

declare global {

    interface Window {
        runExicutionOrder: () => void;
        runBlueprint: () => void;
    }

}

window.runExicutionOrder = () => {

    console.log(bp.getNodeExicutionOrder(StartingNode));

}
window.runBlueprint = () => {

    bp.runBlueprint();

}