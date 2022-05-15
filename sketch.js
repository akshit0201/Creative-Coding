const canvasSketch = require('canvas-sketch');
const {lerp} = require("canvas-sketch-util/math");
const random = require('canvas-sketch-util/random')
const {math} = require("canvas-sketch-util");
const settings = {
  dimensions: [ 1500, 1500 ]
};

const sketch = () => {
  const createGrid = () =>{
    const points = []
    const count = 50
    for(let x =0;x<count;++x){
      for (let y=0;y<count;++y){
        const u = count<=1?0.5: x/(count-1)
        const v = count<=1?0.5: y/(count-1)
        points.push({
            radius: Math.abs(random.gaussian()*0.01),
              position: [u,v]})
      }
    }
    return points
  }
  random.setSeed(1)
  const points = createGrid().filter(()=>random.value()>0.5)

  return ({ context, width, height }) => {
      const margin = width *0.1
context.fillStyle = 'white'
    context.fillRect(0,0,width,height)
    points.forEach(data => {
        const {
            radius,
            position
        } = data
        const [u,v] = position
const x = lerp(margin,width-margin,u)
      const y = lerp(margin,height-margin,v)

      context.beginPath()
      context.arc(x,y,radius*width,0,Math.PI*2)
      context.lineWidth = 5
context.fillStyle = "green"
    context.fill()
    })
  };
};

canvasSketch(sketch, settings);
