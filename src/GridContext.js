import React, { Component, createContext } from "react";
import Samples from './Samples';
import { useGlobalState } from './GlobalState';
import { useState, useEffect } from 'react';


// Helper functions
function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

function moveElement(array, index, offset) {
  const newIndex = index + offset;

  return move(array, index, newIndex);
}

function VALUES() {
  var val = useGlobalState('done');
  // var t = JSON.parse(val)
  return val[0];
}

// Context
const GridContext = createContext({ items: [] });


export function GridProvider(props) {
  var proj = useGlobalState('items');
  var [items, setItems] = useState([]);


  console.log("itms" + proj)

  var [moveItem, moveItemm] = useState(() => () => { });
  var [DONEE, checkDone] = useState(false);
  const providerValue = React.useMemo(() => ({
    items, setItems,
    moveItem, moveItemm,
  }), [items, moveItem]);
  const tt = () => (sourceId, destinationId) => {
    const sourceIndex = items.findIndex(
      item => item.id === sourceId

    );
    const destinationIndex = items.findIndex(
      item => item.id === destinationId
    );

    // If source/destination is unknown, do nothing.
    if (sourceId === -1 || destinationId === -1) {
      return;
    }

    const offset = destinationIndex - sourceIndex;
    //  this.setState(state => ({
    //    items: moveElement(state.items, sourceIndex, offset)
    //  }));
    //setItems(items =>{{ moveElement(items, sourceIndex, offset)}})
    setItems(moveElement(items, sourceIndex, offset))

    // setItems = 
  };
  var val = VALUES();
  console.log("VAL" + val);
  useEffect(() => {
    // Update the document title using the browser API
    //setItems( items );
    console.log("VAL22" + val);

    if (val == true) {

      console.log("khara")
      moveItemm(tt);
      setItems(items);
      // val  = false
      // DONE = false;


    }

  });


   useEffect(() => {
     // Update the document title using the browser API
     if (proj && proj[0]) {
       setItems(proj[0]);
     //  items = proj[0]
       console.log("this is " +JSON.stringify(items) )

       return function cleanup() {
         setItems([])
       }
     }
   }, [proj]);




  var v = useGlobalState('items');
  return (
    <GridContext.Provider value={providerValue}>
      {props.children}
    </GridContext.Provider>
  );
}

export default GridContext;
