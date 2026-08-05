let filterContainer=document.querySelector(".filter");
let imageCanvas=document.getElementById("image-canvas");
let imgInput=document.getElementById("image-input");
const ctx=imageCanvas.getContext("2d");
const placeholder=document.querySelector(".placeholder");
let resetBtn=document.getElementById("reset-btn");
let downloadBtn=document.getElementById("download-btn");
let presetContainer=document.querySelector(".presets");

let file=null;
let image=null;

let filters={
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    
    saturation:{
        value:100,
        min:0,
        max:200,
         unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
         unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
         unit:"px"
    },
    grayScale:{
        value:0,
        min:0,
        max:100,
            unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
}

function createFilterElement(name,unit = "%",value,min,max){
    const div=document.createElement("div");
    div.classList.add("filter");

    const input=document.createElement("input");
    input.type="range";
    input.min=min;
    input.max=max;
    input.value=value;
    input.id=name;

    const p=document.createElement("p");
    p.innerText=name;

    div.appendChild(p);
    div.appendChild(input);
    
    input.addEventListener("input",(e)=>{
        filters[name].value=e.target.value;
        applyFilters();
    });
    return div;
}

function createFilter(){
    Object.keys(filters).forEach(filter=>{
   const filterElment=createFilterElement(filter,filters[filter].unit,filters[filter].value,filters[filter].min,filters[filter].max);
   filterContainer.appendChild(filterElment);
});
}


imgInput.addEventListener("change",(e)=>{
const file=e.target.files[0];
imageCanvas.style.display="block";
placeholder.style.display="none";
if(!file) {
    alert("Choose an image ");
return;
}

const img=new Image();
img.src=URL.createObjectURL(file);
img.onload=()=>{
    image=img;
    imageCanvas.width=img.width;
    imageCanvas.height=img.height;
    ctx.drawImage(img,0,0);
}
});

 
function applyFilters(){
    if(!image) return;
    ctx.clearRect(0,0,imageCanvas.width,imageCanvas.height);
    ctx.filter=` 
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayScale.value}${filters.grayScale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})`
     
    ctx.drawImage(image,0,0);
}

resetBtn.addEventListener("click",()=>{
   filters={
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    
    saturation:{
        value:100,
        min:0,
        max:200,
         unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
         unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
         unit:"px"
    },
    grayScale:{
        value:0,
        min:0,
        max:100,
            unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
}
applyFilters();

filterContainer.innerHTML="";
createFilter();
});
createFilter();

downloadBtn.addEventListener("click",()=>{
    const link=document.createElement("a");
    link.download="edited-image.png";
    link.href=imageCanvas.toDataURL();
    link.click();
});

const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  vintage: {
    brightness: 110,
    contrast: 90,
    saturation: 80,
    hueRotation: 0,
    blur: 0,
    grayScale: 0,
    sepia: 60,
    opacity: 100,
    invert: 0
  },

  blackWhite: {
    brightness: 100,
    contrast: 120,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayScale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  vivid: {
    brightness: 120,
    contrast: 130,
    saturation: 170,
    hueRotation: 0,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  warm: {
    brightness: 110,
    contrast: 105,
    saturation: 120,
    hueRotation: 15,
    blur: 0,
    grayScale: 0,
    sepia: 25,
    opacity: 100,
    invert: 0
  },

  cool: {
    brightness: 100,
    contrast: 110,
    saturation: 120,
    hueRotation: 180,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  dramatic: {
    brightness: 90,
    contrast: 170,
    saturation: 120,
    hueRotation: 0,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  dreamy: {
    brightness: 115,
    contrast: 90,
    saturation: 110,
    hueRotation: 0,
    blur: 3,
    grayScale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0
  },

  retro: {
    brightness: 105,
    contrast: 95,
    saturation: 85,
    hueRotation: 20,
    blur: 0,
    grayScale: 0,
    sepia: 50,
    opacity: 100,
    invert: 0
  },

  negative: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 100
  }
};

Object.keys(presets).forEach(presetName => {
  const presetBtn=document.createElement("button");
  presetBtn.classList.add("btn");
  presetBtn.innerText=presetName;
  presetContainer.append(presetBtn);
});

PresetBtn.addEventListener("click",()=>{
    const preset=prests[presetName];
    Object.keys(preset).forEach(filterName=>{
        filters[filterName].value=preset[filterName];
    });
    applyFilters();
    filterContainer.innerHTML="";
    createFilter();
});