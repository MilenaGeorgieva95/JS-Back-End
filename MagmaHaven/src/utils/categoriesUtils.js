export function getTypes(selType){
    const types=[
        {value:"Supervolcanoes"},
        {value:"Submarine"},
        {value:"Subglacial"},
        {value:"Mud"},
        {value:"Stratovolcanoes"},
        {value:"Shield"},
      ]

const type=types.find(el=>el.value===selType);
if(type){
    type.selected='selected'
}
return types;
}

